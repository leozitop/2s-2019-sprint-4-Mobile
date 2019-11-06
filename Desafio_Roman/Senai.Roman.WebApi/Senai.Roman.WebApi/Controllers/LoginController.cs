using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Interfaces;
using Senai.Roman.WebApi.Repositories;
using Senai.Roman.WebApi.ViewModels;

namespace Senai.Roman.WebApi.Controllers
{
    [Produces ("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuariosRepository UsuariosRepository { get; set; }

        public LoginController()
        {
            UsuariosRepository = new UsuariosRepository();
        }
        
        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuarios usuario = UsuariosRepository.Login(login);
                if (usuario == null)
                    return NotFound(new { mensagem = "Email ou senha inválidos." });

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                    new Claim("chave", "valor"),
                    new Claim(JwtRegisteredClaimNames.Jti, usuario.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuario.Permissao)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Roman.WebApi",
                    audience: "Roman.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro." + ex.Message });
            }
        }
    }
}