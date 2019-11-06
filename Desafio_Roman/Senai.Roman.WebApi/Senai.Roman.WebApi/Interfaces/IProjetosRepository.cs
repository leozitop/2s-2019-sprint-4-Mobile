using Senai.Roman.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebApi.Interfaces
{
    public interface IProjetosRepository
    {
        List<Projetos> Listar();
        void Cadastrar(Projetos projeto);
    }
}
