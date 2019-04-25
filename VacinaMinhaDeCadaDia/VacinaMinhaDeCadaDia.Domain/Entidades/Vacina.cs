using System;
using System.Collections.Generic;
using System.Text;

namespace VacinaMinhaDeCadaDia.Domain.Entidades
{
    public class Vacina
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime CriadaEm { get; set; }
        public DateTime AlteradaEm { get; set; }

        public List<PessoaVacina> Pessoas { get; set; } = new List<PessoaVacina>();
    }
}
