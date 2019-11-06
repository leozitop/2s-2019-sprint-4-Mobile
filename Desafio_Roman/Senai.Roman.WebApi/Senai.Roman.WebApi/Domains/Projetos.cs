using System;
using System.Collections.Generic;

namespace Senai.Roman.WebApi.Domains
{
    public partial class Projetos
    {
        public int IdProjeto { get; set; }
        public string Projeto { get; set; }
        public string Descricao { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdTema { get; set; }

        public Usuarios IdUsuarioNavigation { get; set; }
        public Temas IdTemaNavigation { get; set; }
    }
}
