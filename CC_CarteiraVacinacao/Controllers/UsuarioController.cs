using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CC_CarteiraVacinacao.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CC_CarteiraVacinacao.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Visualizar");
            return RedirectToAction("Login");
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ValidateLogin(string email, string password)
        {
            if (!(string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)))
            {
                UsuarioModel user = new UsuarioModel
                {
                    Email = email,
                    Password = password
                };

                user = user.Search();

                if (user != null)
                {
                    if (user.IsUserActive)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Email, user.Email),
                            new Claim(ClaimTypes.Name, user.Name),
                            new Claim(ClaimTypes.DateOfBirth, user.DateOfBirth.ToString("dd/MM/yyyy"))
                        };

                        ClaimsIdentity identity = new ClaimsIdentity(claims, "login");
                        ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                        await HttpContext.SignInAsync(principal);

                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ViewBag.Error = "Usuário Desativado :/";
                        return View("Login");
                    }
                }
            }
            ViewBag.Error = "Usuário ou senha inválidas!";
            return View("Login");
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Redirect("/");
        }

        //Criacao do usuario
        public IActionResult Registro()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        public IActionResult CreateUser(UsuarioModel user)
        {
            if (!EmailExists(user.Email))
            {
                user.IsUserActive = true;
                user.Save();
                                
                return Redirect("/");
            }
            return RedirectToAction("Registro");
        }
        
        private bool EmailExists(string email)
        {
            UsuarioModel user = new UsuarioModel();

            IEnumerable<UsuarioModel> users = user.GetUsers(email);
            bool exists = false;
            if (users != null)
                exists = users.Count() > 0;

            return exists;
        }

        //Visualizacao e Edição
        [Authorize]
        public IActionResult Visualizar()
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));
            return View(user);
        }

        [Authorize]
        public IActionResult Editar()
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));
            return View(user);
        }

        [HttpPost]
        public JsonResult CheckIfExists(string email)
        {
            return Json(EmailExists(email));
        }

        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult EditUser(UsuarioModel user)
        {
            UsuarioModel userFull = new UsuarioModel();
            userFull = userFull.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            if (!EmailExists(user.Email))
            {
                user.Id = userFull.Id;
                user.Password = userFull.Password;
                user.Vaccines = userFull.Vaccines;

                user.Update();
            }

            return RedirectToAction("Visualizar");
        }

        [Authorize]
        public IActionResult AltSenha()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        [Authorize]
        public IActionResult AlterPass(string newPass)
        {
            if (!string.IsNullOrEmpty(newPass))
            {
                UsuarioModel userFull = new UsuarioModel();
                userFull = userFull.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

                if (newPass != userFull.Password)
                {
                    userFull.Password = newPass;

                    userFull.Update();
                }

                return RedirectToAction("Visualizar");
            }
            return RedirectToAction("AltSenha");
        }

        [Authorize]
        public async Task<IActionResult> DeactivateUser()
        {
            UsuarioModel user = new UsuarioModel();
            user = user.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            user.IsUserActive = false;
            user.Update();

            await Logout();

            return Redirect("/");
        }
    }
}