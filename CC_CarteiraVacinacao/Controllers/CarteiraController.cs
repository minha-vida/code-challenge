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
            return View();
        }

        [HttpPost]
        [Authorize]
        public JsonResult CriarCarteira(string VacinaNome, DateTime Date)
        {
            VacinaModel vacina = new VacinaModel
            {
                VaccineName = VacinaNome,
                AppliedAt = Date,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            if (user.Vaccines == null)
                user.Vaccines = new List<VacinaModel>() { vacina };
            else
                user.Vaccines.Add(vacina);

            user.Save();

            return Json(vacina);
        }
    }
}