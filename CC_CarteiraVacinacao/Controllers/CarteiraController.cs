using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CC_CarteiraVacinacao.Controllers
{
    public class CarteiraController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CriarCarteira()
        {
            return View();
        }
    }
}