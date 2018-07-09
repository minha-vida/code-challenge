using server.Models;
using System;

namespace server.Features.Persons
{
    public class VaccineViewModel
    {
        public VaccineViewModel(Vaccine vaccine) {
            this.Id = vaccine.Id;
            this.Name = vaccine.Name;
            this.AppliedAt = vaccine.AppliedAt;
            this.CreatedAt = vaccine.CreatedAt;
            this.UpdatedAt = vaccine.UpdatedAt;
        }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public DateTime AppliedAt { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}