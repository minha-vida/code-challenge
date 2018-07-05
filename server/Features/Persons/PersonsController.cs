using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Shared;

namespace server.Features.Persons
{

    [Route("persons")]
    public class PersonsController : Controller
    {
        readonly IMediator _mediator;

        public PersonsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(
            [FromBody] CreatePerson.Command command)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            CommandResult<Guid> result = await _mediator.Send(command);

            return Created($"/persons/{result.Data}", new { personId = result.Data });
        }
    }
}