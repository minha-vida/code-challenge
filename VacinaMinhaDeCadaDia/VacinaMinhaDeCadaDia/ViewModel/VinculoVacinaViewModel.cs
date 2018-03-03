using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacinaMinhaDeCadaDia.Domain.Entidades;

namespace VacinaMinhaDeCadaDia.ViewModel
{
    public class VinculoVacinaViewModel
    {
        public int idPessoa { get; set; }

        public List<int> IdsVacinas { get; set; }
    }
}
