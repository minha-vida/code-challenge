using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VacinaMinhaDeCadaDia.ViewModel;
using VacinaMinhaDeCadaDia.Data;
using VacinaMinhaDeCadaDia.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace VacinaMinhaDeCadaDia.Controllers
{
    public class PessoaController : Controller
    {
        private readonly PessoaContext _context;

        public PessoaController(PessoaContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public List<Pessoa> ObterPessoas()
        {
            return _context.Pessoa.ToList();
        }

        [HttpGet]
        public IActionResult Cadastrar(int id = 0)
        {
            var pessoa = _context.Pessoa.FirstOrDefault(p => p.Id == id);

            if (pessoa != null)
            {
                var model = new PessoaViewModel()
                {
                    Id = pessoa.Id,
                    Nome = pessoa.Nome,
                    Foto = pessoa.Foto,
                    Idade = pessoa.Idade
                };

                return View("Cadastro", model);
            }

            return View("Cadastro");            
        }

        [HttpGet]
        public IActionResult VincularVacinas(int id)
        {
            var model = new VinculoVacinaViewModel()
            {
                idPessoa = id
            };

            return View("VinculoVacina", model);
        }

        [HttpGet]
        public JsonResult ObterVinculosVacina(int idPessoa)
        {
            var pessoaVacina = _context.PessoaVacina.Where(pv => pv.Pessoa.Id == idPessoa).Include(pv => pv.Vacina).ToList();

            var JsonPessoaVacina = pessoaVacina.Select(pv => new VinculoVacinaViewModel() { Id = pv.Id, Nome = _context.Vacina.Find(pv.Vacina.Id).Nome, DataDeAplicacao = pv.DataDeAplicacao.ToString("dd/MM/yyy") });

            return Json(JsonPessoaVacina);
        }

        [HttpPost]
        public IActionResult Cadastrar(PessoaViewModel model)
        {
            if (ModelState.IsValid)
            {
                if(model.Id <= 0)
                {
                    CadastrarPessoa(model);
                }
                else
                {
                    EditarPessoa(model);
                }
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public JsonResult VincularVacinas(int idPessoa, int idVacina, string dataDeAplicacao)
        {
            var pessoa = _context.Pessoa.Find(idPessoa);

            var vacina = _context.Vacina.Find(idVacina);

            var culture = new System.Globalization.CultureInfo("pt-br", true);

            var pessoaVacina = new PessoaVacina
            {
                DataDeAplicacao = DateTime.Parse(dataDeAplicacao, culture, System.Globalization.DateTimeStyles.AssumeLocal),
                Pessoa = pessoa,
                Vacina = vacina
            };

            pessoa.Vacinas.Add(pessoaVacina);

            _context.SaveChanges();

            return Json(new { success= "true" });
        }

        private void CadastrarPessoa(PessoaViewModel model)
        {
            var pessoa = new Pessoa()
            {
                Nome = model.Nome,
                Foto = model.Foto,
                Idade = model.Idade
            };

            _context.Pessoa.Add(pessoa);
            _context.SaveChanges();
        }

        private void EditarPessoa(PessoaViewModel model)
        {
            var pessoa = _context.Pessoa.Find(model.Id);

            pessoa.Nome = model.Nome;
            pessoa.Idade = model.Idade;
            pessoa.Foto = model.Foto;

            _context.SaveChanges();
        }

        public void ExcluirPessoa(int id)
        {
            var pessoa = _context.Pessoa.Find(id);

            var pessoaVacina = _context.PessoaVacina.Include(x => x.Pessoa).Where(pv => pv.Pessoa == pessoa).ToList();

            _context.PessoaVacina.RemoveRange(pessoaVacina);

            _context.Pessoa.Remove(pessoa);

            _context.SaveChanges();
        }

        public void ExcluirVinculoVacina(int id)
        {
            var pessoaVacina = _context.PessoaVacina.Find(id);

            _context.PessoaVacina.Remove(pessoaVacina);

            _context.SaveChanges();
        }
    }
}