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

        [Range(0, 100)]
        public int YearsActive { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Url]
        public string Website { get; set; }
    }
}