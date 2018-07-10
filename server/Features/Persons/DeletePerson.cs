using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server.Data;
using server.Shared;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace server.Features.Persons
{
    public class DeletePerson
    {
        public class Command : IRequest<CommandResult>
        {   
            [Required]
            public string OwnerId { get; set; }

            [Required]
            public Guid? PersonId { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommandResult>
        {
            readonly IMediator _mediator;
            readonly ApplicationDbContext _dbContext;

            public Handler(IMediator mediator, ApplicationDbContext dbContext)
            {
                _mediator = mediator;
                _dbContext = dbContext;
            }
            public async Task<CommandResult> Handle(Command deletePerson, CancellationToken cancellationToken)
            {
                Person person = await _dbContext.Persons
                    .Where(p => p.OwnerId == deletePerson.OwnerId)
                    .FirstOrDefaultAsync(p => p.Id == deletePerson.PersonId);

                if (person == null)
                    return CommandResult.Fail($"Person not found with Id: {deletePerson.PersonId}");

                _dbContext.Remove(person);

                await _dbContext.SaveChangesAsync();
                return CommandResult.Success;
            }
        }
    }
}