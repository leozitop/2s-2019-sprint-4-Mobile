using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Interfaces;
using Senai.Roman.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebApi.Repositories
{
    public class UsuariosRepository : IUsuariosRepository
    {
        public void Cadastrar(Usuarios usuario)
        {
            using (RomanContext ctx = new RomanContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public List<Usuarios> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        public Usuarios Login(LoginViewModel login)
        {
            using (RomanContext ctx = new RomanContext())
            {
                Usuarios usuario = ctx.Usuarios.FirstOrDefault(x =>
                x.Email == login.Email && x.Senha == login.Senha);
                if (usuario == null)
                    return null;
                return usuario;
            }
        }
    }
}
