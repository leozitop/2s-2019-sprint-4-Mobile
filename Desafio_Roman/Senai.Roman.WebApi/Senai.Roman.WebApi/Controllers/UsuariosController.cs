using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Interfaces;
using Senai.Roman.WebApi.Repositories;

namespace Senai.Roman.WebApi.Controllers
{
    [Produces ("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuariosRepository UsuariosRepository { get; set; }

        public UsuariosController()
        {
            UsuariosRepository = new UsuariosRepository();
        }
        
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(UsuariosRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuarios usuario)
        {
            try
            {
                UsuariosRepository.Cadastrar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    }
}