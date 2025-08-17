using System.ComponentModel.DataAnnotations;

namespace MvcSample.Web.Models
{
    public class Musician
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        public string Instrument { get; set; }

        public string Genre { get; set; }

        [Range(1900, 2100)]
        public int? DebutYear { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Url]
        public string Website { get; set; }
    }
}