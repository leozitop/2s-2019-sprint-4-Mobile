using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebApi.Repositories
{
    public class TemasRepository : ITemasRepository
    {
        public void Cadastrar(Temas tema)
        {
            using (RomanContext ctx = new RomanContext())
            {
                ctx.Temas.Add(tema);
                ctx.SaveChanges();
            }
        }

        public List<Temas> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Temas.ToList();
            }
        }
    }
}
