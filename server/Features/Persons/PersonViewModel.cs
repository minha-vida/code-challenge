using System;
using server.Models;

namespace server.Features.Persons
{
    public class PersonViewModel
    {
        public PersonViewModel(Person person)
        {
            this.Id = person.Id;
            this.Name = person.Name;
            this.Age = person.Age;
            this.Photo = person.Photo;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Photo { get; set; }
    }
}