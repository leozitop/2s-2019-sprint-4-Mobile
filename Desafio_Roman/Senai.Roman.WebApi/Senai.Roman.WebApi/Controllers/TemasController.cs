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
    public class TemasController : ControllerBase
    {
        private ITemasRepository TemasRepository { get; set; }

        public TemasController()
        {
            TemasRepository = new TemasRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(TemasRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(Temas tema)
        {
            try
            {
                TemasRepository.Cadastrar(tema);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mansagem = ex.Message });
            }
        }
    }
}