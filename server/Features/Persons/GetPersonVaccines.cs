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
    public class GetPersonVaccines
    {
        public class Query : IRequest<IEnumerable<Vaccine>>
        {
            [Required]
            public string OwnerId { get; set; }

            [Required]
            public Guid PersonId { get; set; }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Vaccine>>
        {
            readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Vaccine>> Handle(Query request, CancellationToken cancellationToken)
            {
                Person person = await _context.Persons
                    .Where(p => p.OwnerId == request.OwnerId)
                    .Include(p => p.Vaccines)
                    .FirstOrDefaultAsync(p => p.Id == request.PersonId);

                return person.Vaccines;
            }
        }
    }
}