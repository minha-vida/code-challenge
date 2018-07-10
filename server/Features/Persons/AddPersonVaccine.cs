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
    public class AddPersonVaccine
    {
        public class Command : IRequest<CommandResult<Guid>>
        {
            [Required]
            public string OwnerId { get; set; }

            public Guid PersonId { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            public DateTime AppliedAt { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommandResult<Guid>>
        {
            readonly IMediator _mediator;
            readonly ApplicationDbContext _dbContext;

            public Handler(IMediator mediator, ApplicationDbContext dbContext)
            {
                _mediator = mediator;
                _dbContext = dbContext;
            }

            public async Task<CommandResult<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                var person = _dbContext.Persons
                    .Where(p => p.OwnerId == request.OwnerId)
                    .Include(p => p.Vaccines)
                    .FirstOrDefault(p => p.Id == request.PersonId);

                if(person == null)
                    return CommandResult<Guid>.Fail("Person Not Found");

                var vaccine = new Vaccine
                {
                    Name = request.Name,
                    AppliedAt = request.AppliedAt
                };
                
                person.Vaccines.Add(vaccine);

                await _dbContext.SaveChangesAsync();

                return CommandResult<Guid>.Success(vaccine.Id);
            }

        }
    }
}