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
    public class UpdatePersonVaccine
    {
        public class Command : IRequest<CommandResult<Vaccine>>
        {
            [Required]
            public string OwnerId { get; set; }

            [Required]
            public Guid PersonId { get; set; }

            [Required]
            public Guid? VaccineId { get; set; }

            public string Name { get; set; }

            public DateTime AppliedAt { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommandResult<Vaccine>>
        {
            readonly IMediator _mediator;
            readonly ApplicationDbContext _dbContext;

            public Handler(IMediator mediator, ApplicationDbContext dbContext)
            {
                _mediator = mediator;
                _dbContext = dbContext;
            }

            public async Task<CommandResult<Vaccine>> Handle(Command command, CancellationToken cancellationToken)
            {
                Person person = await _dbContext.Persons
                    .Where(p => p.OwnerId == command.OwnerId)
                    .Include(p => p.Vaccines)
                    .FirstOrDefaultAsync(p => p.Id == command.PersonId);
                    
                var vaccine = person.Vaccines
                    .FirstOrDefault(v => v.Id == command.VaccineId);
                
                if (vaccine == null)
                    return CommandResult<Vaccine>.Fail($"Vaccine not found with id: {command.VaccineId}");

                vaccine.Name = command.Name;
                vaccine.AppliedAt = command.AppliedAt;
                vaccine.UpdatedAt = DateTime.Now;

                _dbContext.Update(vaccine);

                await _dbContext.SaveChangesAsync();

                return CommandResult<Vaccine>.Success(vaccine);
            }
        }
    }
}