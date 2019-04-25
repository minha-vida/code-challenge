using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using VacinaMinhaDeCadaDia.Domain.Entidades;

namespace VacinaMinhaDeCadaDia.ViewModel
{
    public class PessoaViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome obrigatorio")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Idade obrigatoria")]
        public int Idade { get; set; }

        [Required(ErrorMessage = "Foto obrigatoria")]
        [Url(ErrorMessage = "Foto deve ser uma url da imagem")]
        public string Foto { get; set; }
    }
}
