using server.Models;
using MediatR;
using System;
using server.Shared;
using System.Threading;
using System.Threading.Tasks;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Features.Persons
{
    public class Get
    {
        public class Query : IRequest<PersonViewModel>
        {
            public Guid? PersonId { get; set; }
        }

        public class Handler : IRequestHandler<Query, PersonViewModel>
        {
            readonly ApplicationDbContext _context;

            public Handler()
            {
            }

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<PersonViewModel> Handle(Query request, CancellationToken cancellationToken)
            {
                var person = await _context.Persons
                    .FirstOrDefaultAsync(p => p.Id == request.PersonId);

                return person != null ? new PersonViewModel(person) : null;
            }
        }

        public class PersonViewModel : Person
        {
            public PersonViewModel(Person person)
            {
                base.Id = person.Id;
                base.Name = person.Name;
                base.Age = person.Age;
                base.Vaccines = person.Vaccines;
            }
        }
    }
}