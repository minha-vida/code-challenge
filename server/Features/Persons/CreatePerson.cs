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

namespace server.Features.Persons
{
    public class CreatePerson
    {
        public class Command : IRequest<CommandResult<Guid>>
        {
            [Required]
            public string Name { get; set; }

            [Required]
            public int Age { get; set; }

            [Required]
            public string Photo { get; set; }

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
                var person = new Person
                {
                    Name = request.Name,
                    Age = request.Age,
                    Photo = request.Photo
                };

                // Add the new person on the database
                await _dbContext.Persons.AddAsync(person);

                // Commit the data transaction
                await _dbContext.SaveChangesAsync();

                // Return the result of the command with the new person Id
                return CommandResult<Guid>.Success(person.Id);
            }
        }
    }
}