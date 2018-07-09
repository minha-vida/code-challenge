using System;
using Newtonsoft.Json;

namespace server.Models
{
    public class Vaccine
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }

        public DateTime AppliedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}