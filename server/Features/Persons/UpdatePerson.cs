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
using System.Runtime.ExceptionServices;

namespace server.Features.Persons
{
    public class UpdatePerson
    {
        public class Command : IRequest<CommandResult<Person>>
        {
            public Guid PersonId { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            public int Age { get; set; }

            [Required]
            public string Photo { get; set; }

        }

        public class Handler : IRequestHandler<Command, CommandResult<Person>>
        {
            readonly IMediator _mediator;
            readonly ApplicationDbContext _dbContext;

            public Handler(IMediator mediator, ApplicationDbContext dbContext)
            {
                _mediator = mediator;
                _dbContext = dbContext;
            }

            public async Task<CommandResult<Person>> Handle(Command command, CancellationToken cancellationToken)
            {
                Person person = await _dbContext.Persons
                    .FirstOrDefaultAsync(p => p.Id == command.PersonId);

                if (person == null)
                    return CommandResult<Person>.Fail($"Person not found with id: {command.PersonId}");

                person.Name = command.Name;
                person.Age = command.Age;
                person.Photo = command.Photo;

                // Update the person on the database
                _dbContext.Update(person);

                // Commit the data transaction
                await _dbContext.SaveChangesAsync();

                // Return the result of the command
                return CommandResult<Person>.Success(person);
            }
        }
    }
}