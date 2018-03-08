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
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.Name)
                    };

                    ClaimsIdentity identity = new ClaimsIdentity(claims, "login");
                    ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                    await HttpContext.SignInAsync(principal);

                    return RedirectToAction("Index", "Home");
                }
            }
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
            user.IsUserActive = true;
            user.Save();

            return Redirect("/");
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

        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult EditUser(UsuarioModel user)
        {
            UsuarioModel userFull = new UsuarioModel();
            userFull = userFull.SearchWithoutPass(User.FindFirstValue(ClaimTypes.Email));

            user.Id = userFull.Id;
            user.Password = userFull.Password;
            user.Vaccines = userFull.Vaccines;

            user.Update();

            return RedirectToAction("Visualizar");
        }

        [Authorize]
        public IActionResult DeactivateUser()
        {
            return View();
        }
    }
}