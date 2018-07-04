using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace challenge.Models
{
    public class Person
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }

        public string Age { get; set; }

        public string Photo { get; set; }

        public ICollection<Vaccine> Vaccines { get; set; }
    }
}