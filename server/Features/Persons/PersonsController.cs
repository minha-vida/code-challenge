using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Shared;
using server.Models;
using Microsoft.AspNetCore.Authorization;

namespace server.Features.Persons
{

    [Route("persons")]
    [Authorize]
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
            ModelState.Clear();

            command.OwnerId = User.Identity.Name;

            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            CommandResult<Guid> result = await _mediator.Send(command);

            return Created($"/persons/{result.Data}", new { personId = result.Data });
        }


        [Route("")]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetPersons.Query query)
        {
            ModelState.Clear();

            query.OwnerId = User.Identity.Name;

            if (!TryValidateModel(query))
                return BadRequest(ModelState);

            IEnumerable<PersonViewModel> persons = await _mediator.Send(query);

            return Ok(persons);
        }

        [Route("{personId}")]
        public async Task<IActionResult> GetPersonById(Get.Query query)
        {
            ModelState.Clear();

            query.OwnerId = User.Identity.Name;

            if (!TryValidateModel(query))
                return BadRequest(ModelState);

            var person = await _mediator.Send(query);
            if (person == null)
                return NotFound();
            return Ok(person);
        }

        [Route("{personId}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(
            [FromRoute] DeletePerson.Command command)
        {
            ModelState.Clear();

            command.OwnerId = User.Identity.Name;

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
            command.OwnerId = User.Identity.Name;

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
            command.OwnerId = User.Identity.Name;

            if (!TryValidateModel(command))
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
            query.OwnerId = User.Identity.Name;

            if (!TryValidateModel(query))
                return BadRequest(ModelState);

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
            command.OwnerId = User.Identity.Name;

            if (!TryValidateModel(command))
                return BadRequest(ModelState);

            var result = await _mediator.Send(command);
            if (result.IsSuccess)
                return NoContent();

            return BadRequest();
        }

        [Route("{personId}/vaccines/{vaccineId}")]
        [HttpPut]
        public async Task<IActionResult> UpdatePersonVaccine(
            Guid personId,
            Guid vaccineId,
            [FromBody] UpdatePersonVaccine.Command command
        )
        {
            ModelState.Clear();

            command.PersonId = personId;
            command.VaccineId = vaccineId;
            command.OwnerId = User.Identity.Name;

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

        [Route("{personId}/vaccines/{vaccineId}")]
        [HttpGet]
        public async Task<IActionResult> GetVaccineById(
            Guid personId,
            Guid vaccineId,
            [FromQuery]GetVaccine.Query query)
        {
            ModelState.Clear();

            query.PersonId = personId;
            query.VaccineId = vaccineId;
            query.OwnerId = User.Identity.Name;

            if (!TryValidateModel(query))
                return BadRequest(ModelState);

            var vaccine = await _mediator.Send(query);
            if (vaccine == null)
                return NotFound();
            return Ok(vaccine);
        }

    }
}