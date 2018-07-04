using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using challenge.Data;
using challenge.Models;
using challenge.Shared;

namespace challenge.Features.Persons.Create
{
    public class Created : INotification
    {
        public Guid PersonId { get; set; }

        public string AccessToken { get; set; }

    }
}