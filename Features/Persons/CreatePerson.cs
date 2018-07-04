using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using challenge.Data;
using challenge.Models;
using challenge.Shared;
using System.Collections.Generic;
using challenge.Features.Persons;

namespace challenge.Features.Persons.Create
{
    public class CreatePerson
    {
        public class Command : IRequest<CommandResult<Guid>>
        {
            string _accessToken;

            [Required]
            public string AccessToken
            {
                get => _accessToken;
                set => _accessToken = $"Bearer {value}";
            }
            public string Name { get; set; }

            public string Age { get; set; }

            public string Photo { get; set; }

            public ICollection<Vaccine> Vaccines { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command, CommandResult<Guid>>
        {
            readonly IMediator _mediator;
            readonly ApplicationDbContext _dbContext;

            public Handler(IMediator mediator, ApplicationDbContext dbContext)
            {
                _mediator = mediator;
                _dbContext = dbContext;
            }

            protected async override Task<CommandResult<Guid>> Handle(Command command)
            {
                //Intantiate a new person
                var person = new Person
                {
                    Name = command.Name,
                    Age = command.Age,
                    Photo = command.Photo,
                    Vaccines = command.Vaccines
                };

                // Add the new person on the database
                await _dbContext.Persons.AddAsync(person);

                // Notify about the new person creation
                await _mediator.Publish(new Created { PersonId = person.Id, AccessToken = command.AccessToken});

                // Commit the data transaction
                await _dbContext.SaveChangesAsync();

                // Return the result of the command with the new person Id
                return CommandResult<Guid>.Success(person.Id);
            }
        }
    }
}