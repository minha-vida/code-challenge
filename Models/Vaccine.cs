using System;

namespace challenge.Models
{
    public class Vaccine
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }

        public DateTime appliedAt { get; set; }

        public DateTime createdAt { get; set; }

        public DateTime updatedAt { get; set; }
    }
}