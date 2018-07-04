using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using challenge.Shared;
using challenge.Models;
using challenge.Features.Persons;
using Microsoft.AspNetCore.Authorization;
using System.Collections;
using System.Collections.Generic;
using challenge.Features.Persons.Create;

namespace challenge.Features.Persons
{

    [Route("persons")]
    public class PersonsController : Controller
    {
        readonly IMediator _mediator;

        public PersonsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("person")]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(
            [FromBody] CreatePerson.Command command,
            [FromHeader] string accessToken)
        {
            ModelState.Clear();

            command.AccessToken = accessToken;

            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            CommandResult<Guid> result = await _mediator.Send(command);

            return Created($"/persons/{result.Data}", new { personId = result.Data });
        }

    }
}