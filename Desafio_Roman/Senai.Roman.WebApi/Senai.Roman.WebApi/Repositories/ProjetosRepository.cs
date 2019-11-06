using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebApi.Repositories
{
    public class ProjetosRepository : IProjetosRepository
    {
        public void Cadastrar(Projetos projeto)
        {
            using (RomanContext ctx = new RomanContext())
            {
                ctx.Projetos.Add(projeto);
                ctx.SaveChanges();
            }
        }

        public List<Projetos> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Projetos.ToList();
            }
        }
    }
}
