using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Person
    {
        [Required]
        public string OwnerId { get; set; }

        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string Photo { get; set; }

        public ICollection<Vaccine> Vaccines { get; set; }
    }
}