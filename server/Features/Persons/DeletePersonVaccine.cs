using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server.Data;
using server.Shared;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace server.Features.Persons
{
    public class DeletePersonVaccine
    {
        public class Command : IRequest<CommandResult>
        {
            [Required]
            public string OwnerId { get; set; }

            [Required]
            public Guid PersonId { get; set; }

            [Required]
            public Guid? VaccineId { get; set; }
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

            public async Task<CommandResult> Handle(Command command, CancellationToken cancellationToken)
            {
                Person person = await _dbContext.Persons
                    .Where(p => p.OwnerId == command.OwnerId)
                    .Include(p => p.Vaccines)
                    .FirstOrDefaultAsync(p => p.Id == command.PersonId);

                var vaccine = person.Vaccines
                    .FirstOrDefault(v => v.Id == command.VaccineId);

                person.Vaccines.Remove(vaccine);

                await _dbContext.SaveChangesAsync();
                return CommandResult.Success;
            }
        }
    }
}