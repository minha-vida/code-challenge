using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CC_CarteiraVacinacao.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CC_CarteiraVacinacao.Controllers
{
    public class CarteiraController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            ViewBag.Birth = DateTime.Parse(User.FindFirstValue(ClaimTypes.DateOfBirth)).ToString("MM/dd/yyyy");
            return View();
        }

        [HttpPost]
        [Authorize]
        public JsonResult CriarVacina(string VaccineName, DateTime AppliedAt)
        {
            VacinaModel vacina = new VacinaModel
            {
                VaccineName = VaccineName.Trim(),
                AppliedAt = AppliedAt,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            if (user.Vaccines == null)
                user.Vaccines = new List<VacinaModel>() { vacina };
            else
            {
                IEnumerable<VacinaModel> EqVacc = user.Vaccines.Where(v => (v.VaccineName.IndexOf('-') > 0 ? 
                v.VaccineName.Substring(0, v.VaccineName.IndexOf('-')).Trim() : v.VaccineName) == vacina.VaccineName);
                if (EqVacc.Count() == 0)
                    user.Vaccines.Add(vacina);
                else
                {
                    vacina.VaccineName = string.Format("{0} - {1}", VaccineName, EqVacc.Count().ToString());
                    user.Vaccines.Add(vacina);
                }

            }
                
            user.Update();

            return Json(vacina);
        }

        [HttpPost]
        [Authorize]
        public JsonResult AlterarVacina(string VaccineOldName, DateTime AppliedAtOld, string VaccineName, DateTime AppliedAt)
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            VacinaModel vacc = new VacinaModel();
            vacc = user.Vaccines.First(v => v.VaccineName == VaccineOldName && v.AppliedAt == AppliedAtOld);

            if ((vacc.VaccineName == VaccineName && vacc.AppliedAt == AppliedAt) || vacc.AppliedAt < user.DateOfBirth)
                return Json("");
            else
            {
                if (user.Vaccines.Remove(vacc))
                {
                    vacc.VaccineName = VaccineName.Trim();
                    vacc.AppliedAt = AppliedAt;
                    vacc.UpdatedAt = DateTime.Now;

                    IEnumerable<VacinaModel> EqVacc = user.Vaccines.Where(v => (v.VaccineName.IndexOf('-') > 0 ?
                v.VaccineName.Substring(0, v.VaccineName.IndexOf('-')).Trim() : v.VaccineName) == vacc.VaccineName);
                    if (EqVacc.Count() == 0)
                        user.Vaccines.Add(vacc);
                    else
                    {
                        vacc.VaccineName = string.Format("{0} - {1}", VaccineName, EqVacc.Count().ToString());
                        user.Vaccines.Add(vacc);
                    }

                    user.Update();

                    return Json(vacc);
                }
                return Json("");   
            }
        }

        [HttpPost]
        [Authorize]
        public JsonResult VisualizarVacinas()
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));
            return Json(user.Vaccines);
        }

        [HttpPost]
        [Authorize]
        public JsonResult RemoverVacina(string VaccineName, DateTime AppliedAt)
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            VacinaModel vacc = new VacinaModel();
            vacc = user.Vaccines.First(v => v.VaccineName == VaccineName && v.AppliedAt == AppliedAt);

            user.Vaccines.Remove(vacc);

            user.Update();

            return Json(vacc);
        }
    }
}