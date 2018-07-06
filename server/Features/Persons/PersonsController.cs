using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Shared;
using server.Models;

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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            CommandResult<Guid> result = await _mediator.Send(command);

            return Created($"/persons/{result.Data}", new { personId = result.Data });
        }


        [Route("")]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetPersons.Query query)
        {
            IEnumerable<Models.Person> persons = await _mediator.Send(query);

            return Ok(persons);
        }

        [Route("{personId}")]
        public async Task<IActionResult> GetPersonById(Get.Query query)
        {
            var person = await _mediator.Send(query);
            if (person == null)
                return NotFound();
            return Ok(person);
        }

        [Route("{personId}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(
            [FromRoute] DeletPerson.Command command)
        {
            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            var result = await _mediator.Send(command);
            if (result.IsSuccess)
                return NoContent();

            return BadRequest();
        }

        [Route("{personId}")]
        [HttpPut]
        public async Task<IActionResult> UpdatePerson(
            Guid personId,
            [FromBody] UpdatePerson.Command command
        )
        {
            ModelState.Clear();

            command.PersonId = personId;

            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            var result = await _mediator.Send(command);

            if (!result)
            {
                ModelState.AddModelError("person", result.FailureReason);
                return BadRequest(ModelState);
            }

            return Ok(result.Data);
        }

        [Route("{personId}/vaccines")]
        [HttpPost]
        public async Task<IActionResult> AddPersonVaccine(
            Guid personId,
            [FromBody] AddPersonVaccine.Command command)
        {
            ModelState.Clear();

            command.PersonId = personId;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            CommandResult<Guid> result = await _mediator.Send(command);

            return Created($"/persons/{{personId}}/{result.Data}", new { vaccineId = result.Data });
        }

        [Route("{personId}/vaccines")]
        public async Task<IActionResult> GetPersonVaccines(
            Guid personId,
            [FromQuery] GetPersonVaccines.Query query)
        {
            ModelState.Clear();

            query.PersonId = personId;

            IEnumerable<Models.Vaccine> vaccines = await _mediator.Send(query);

            if (vaccines == null)
                return NotFound();

            return Ok(vaccines);
        }

        [Route("{personId}/vaccines/{vaccineId}")]
        [HttpDelete]
        public async Task<IActionResult> DeletePersonVaccine(
            Guid personId,
            Guid vaccineId,
            [FromRoute] DeletePersonVaccine.Command command)
        {

             ModelState.Clear();

            command.PersonId = personId;
            command.VaccineId = vaccineId;

            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            var result = await _mediator.Send(command);
            if (result.IsSuccess)
                return NoContent();

            return BadRequest();
        }
    }
}