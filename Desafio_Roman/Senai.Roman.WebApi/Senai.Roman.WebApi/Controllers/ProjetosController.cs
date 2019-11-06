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
    public class ProjetosController : ControllerBase
    {
        private IProjetosRepository ProjetosRepository { get; set; }

        public ProjetosController()
        {
            ProjetosRepository = new ProjetosRepository();
        }
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(ProjetosRepository.Listar());
        }

        public IActionResult Cadastrar(Projetos projeto)
        {
            try
            {
                ProjetosRepository.Cadastrar(projeto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    }
}