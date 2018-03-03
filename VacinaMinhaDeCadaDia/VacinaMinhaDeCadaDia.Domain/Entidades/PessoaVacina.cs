using System;
using System.Collections.Generic;
using System.Text;

namespace VacinaMinhaDeCadaDia.Domain.Entidades
{
    public class PessoaVacina
    {
        public int IdPessoa { get; set; }
        public Pessoa Pessoa { get; set; }
        public int IdVacina { get; set; }
        public Vacina Vacina { get; set; }

        public DateTime DataDeAplicacao { get; set; }
    }
}
