using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CC_CarteiraVacinacao
{
    public static class SessionControl
    {
        //Check it tomorrow
        public static void GetSession<T>(this ISession _context, string key)
        {
            JsonConvert.DeserializeObject<T>(_context.GetString(key) ?? "");
        }

        public static void SetSession<T>(this ISession _context, T obj, string key)
        {
            _context.SetString(key, JsonConvert.SerializeObject(obj));
        }
    }
}
