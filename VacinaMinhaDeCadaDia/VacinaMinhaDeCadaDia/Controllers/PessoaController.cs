using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VacinaMinhaDeCadaDia.ViewModel;
using VacinaMinhaDeCadaDia.Data;
using VacinaMinhaDeCadaDia.Domain.Entidades;

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
        public IActionResult VincularVacinas(int idPessoa)
        {
            var model = new VinculoVacinaViewModel()
            {
                idPessoa = idPessoa
            };

            return View("VinculoVacina", model);
        }

        [HttpGet]
        public List<PessoaVacina> ObterVinculosVacina(int idPessoa)
        {
            var pessoa = _context.Pessoa.Find(idPessoa);

            var pessoaVacina = pessoa.Vacinas;

            return pessoaVacina;
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

            _context.Remove(pessoa);

            _context.SaveChanges();
        }
    }
}