using Senai.Roman.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebApi.Interfaces
{
    public interface ITemasRepository
    {
        List<Temas> Listar();
        void Cadastrar(Temas tema);
    }
}
