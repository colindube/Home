using Microsoft.AspNet.Mvc;
using MvcSample.Web.Models;
using System.Collections.Generic;

namespace MvcSample.Web
{
    public class MusiciansController : Controller
    {
        private static readonly List<Musician> Musicians = new List<Musician>();

        [HttpGet]
        public IActionResult Index()
        {
            return View(Musicians);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new Musician());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Musician musician)
        {
            if (!ModelState.IsValid)
            {
                return View(musician);
            }

            Musicians.Add(musician);
            return RedirectToAction("Index");
        }
    }
}