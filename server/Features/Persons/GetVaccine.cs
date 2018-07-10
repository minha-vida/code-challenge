using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Features.Persons
{
    public class GetVaccine
    {
        public class Query : IRequest<VaccineViewModel>
        {   
            [Required]
            public string OwnerId { get; set; }
            
            [Required]
            public Guid? VaccineId { get; set; }
            
            [Required]
            public Guid? PersonId { get; set; }
        }

        public class Handler : IRequestHandler<Query, VaccineViewModel>
        {
            readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<VaccineViewModel> Handle(Query request, CancellationToken cancellationToken)
            {
                var person = await _context.Persons
                    .Where(p => p.OwnerId == request.OwnerId)
                    .Include(v => v.Vaccines)
                    .FirstOrDefaultAsync(p => p.Id == request.PersonId);

                var vaccine = person.Vaccines.FirstOrDefault(v => v.Id == request.VaccineId);

                return vaccine != null ? new VaccineViewModel(vaccine) : null;
            }
        }

    }
}