using System;
using System.Collections.Generic;
using VacinaMinhaDeCadaDia.Domain.Entidades;

namespace VacinaMinhaDeCadaDia.Domain.Entidades
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public string Foto { get; set; }
        public List<PessoaVacina> Vacinas { get; set; } = new List<PessoaVacina>();
    }
}
