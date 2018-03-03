using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VacinaMinhaDeCadaDia.Data;
using VacinaMinhaDeCadaDia.Domain.Entidades;
using VacinaMinhaDeCadaDia.ViewModel;

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
        public List<Vacina> ObterVacinas()
        {
            return _context.Vacina.ToList();
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
                    CriadaEm = vacina.CriadaEm
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
            var vacina = new Vacina()
            {
                Nome = model.Nome,
                CriadaEm = model.CriadaEm
            };

            _context.Vacina.Add(vacina);
            _context.SaveChanges();
        }

        private void EditarVacina(VacinaViewModel model)
        {
            var vacina = _context.Vacina.Find(model.Id);

            vacina.Nome = model.Nome;
            vacina.CriadaEm = model.CriadaEm;
            vacina.AlteradaEm = DateTime.Now;

            _context.SaveChanges();
        }

        public void ExcluirVacina(int id)
        {
            var vacina = _context.Vacina.Find(id);

            _context.Remove(vacina);

            _context.SaveChanges();
        }
    }
}