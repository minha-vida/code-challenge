using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using server.Data;
using server.Models;
using server.Shared;
using System.Collections.Generic;
using server.Features.Persons;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace server.Features.Persons
{
    public class GetPersons
    {
        public class Query : IRequest<IEnumerable<PersonViewModel>>
        {
            public string Q { get; set; }

            [Required]
            public string OwnerId { get; set; }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<PersonViewModel>>
        {
            readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<PersonViewModel>> Handle(Query request, CancellationToken cancellationToken) =>
                await _context.Persons
                    .Where(p => p.OwnerId == request.OwnerId)
                    .OrderBy(p => p.Name)
                    .Include(p => p.Vaccines)
                    .Select(p => new PersonViewModel(p))
                    .ToListAsync();
        }
    }
}