using System;
using System.Collections.Generic;
using System.Text;

namespace VacinaMinhaDeCadaDia.Domain.Entidades
{
    public class PessoaVacina
    {
        public int Id { get; set; }
        public Pessoa Pessoa { get; set; }
        public Vacina Vacina { get; set; }

        public DateTime DataDeAplicacao { get; set; }
    }
}
