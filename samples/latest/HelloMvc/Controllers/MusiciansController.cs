using Microsoft.AspNet.Mvc;
using MvcSample.Web.Models;

namespace MvcSample.Web
{
    public class MusiciansController : Controller
    {
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

            // In a real app, you would persist the musician here.
            return RedirectToAction("Success", musician);
        }

        public IActionResult Success(Musician musician)
        {
            return View(musician);
        }
    }
}