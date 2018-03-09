using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CC_CarteiraVacinacao.Models
{
    public class VacinaModel
    {
        public string VaccineName { get; set; }
        public DateTime AppliedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
