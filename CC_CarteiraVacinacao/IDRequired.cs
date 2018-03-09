using Microsoft.AspNetCore.Mvc.Filters;
using CC_CarteiraVacinacao.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace CC_CarteiraVacinacao
{
    public class IDRequired : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            UsuarioModel user = JsonConvert.DeserializeObject<UsuarioModel>(context.HttpContext.Session.GetString("User") ?? "");
            if (user == null)
            {
                context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { action = "Login", controller = "Usuario" }));
            }
        }
    }
}
