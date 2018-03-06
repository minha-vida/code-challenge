using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VacinaMinhaDeCadaDia.Data;
using VacinaMinhaDeCadaDia.Domain.Entidades;
using VacinaMinhaDeCadaDia.ViewModel;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace VacinaMinhaDeCadaDia.Controllers
{
    public class VacinaController : Controller
    {
        private readonly PessoaContext _context;

        public VacinaController(PessoaContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterVacinas()
        {
            var model = _context.Vacina.Select(x => new ListagemVacinaViewModel()
            {
                Id = x.Id,
                Nome = x.Nome,
                AlteradaEm = x.AlteradaEm == DateTime.MinValue ? "--" : x.AlteradaEm.ToString("dd/MM/yyyy"),
                CriadaEm = x.CriadaEm.ToString("dd/MM/yyyy")
            });

            return Json(model);
        }

        [HttpGet]
        public IActionResult Cadastrar(int id = 0)
        {
            var vacina = _context.Vacina.FirstOrDefault(p => p.Id == id);

            if (vacina != null)
            {
                var model = new VacinaViewModel()
                {
                    Id = vacina.Id,
                    Nome = vacina.Nome,
                    CriadaEm = vacina.CriadaEm.ToString("dd/MM/yyyy")
                };

                return View("Cadastro", model);
            }

            return View("Cadastro");
        }

        [HttpPost]
        public IActionResult Cadastrar(VacinaViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id <= 0)
                {
                    CadastrarVacina(model);
                }
                else
                {
                    EditarVacina(model);
                }
            }

            return RedirectToAction("Index");
        }

        private void CadastrarVacina(VacinaViewModel model)
        {
            var culture = new System.Globalization.CultureInfo("pt-br", true);

            var vacina = new Vacina()
            {
                Nome = model.Nome,
                CriadaEm = DateTime.Parse(model.CriadaEm, culture, System.Globalization.DateTimeStyles.AssumeLocal)
            };

            _context.Vacina.Add(vacina);
            _context.SaveChanges();
        }

        private void EditarVacina(VacinaViewModel model)
        {
            var vacina = _context.Vacina.Find(model.Id);

            var culture = new System.Globalization.CultureInfo("pt-br", true);

            vacina.Nome = model.Nome;
            vacina.CriadaEm = DateTime.Parse(model.CriadaEm, culture, System.Globalization.DateTimeStyles.AssumeLocal);

            vacina.AlteradaEm = DateTime.Now;

            _context.SaveChanges();
        }

        public void ExcluirVacina(int id)
        {        
            var vacina = _context.Vacina.Find(id);

            var pessoaVacina = _context.PessoaVacina.Include(x => x.Pessoa).Where(pv => pv.Vacina == vacina).ToList();

            _context.PessoaVacina.RemoveRange(pessoaVacina);

            _context.Remove(vacina);

            _context.SaveChanges();
        }
    }
}