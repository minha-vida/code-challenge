using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VacinaMinhaDeCadaDia.ViewModel
{
    public class VacinaViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo Nome Obrigatório")]
        public string Nome { get; set; }        

        [Required(ErrorMessage = "Campo Criada em Obrigatorio")]
        public string CriadaEm { get; set; }
    }
}
