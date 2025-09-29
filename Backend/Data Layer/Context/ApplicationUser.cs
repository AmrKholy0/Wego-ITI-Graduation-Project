using Data_Layer.Entities.Booking;
using Data_Layer.Entities.Room;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Data_Layer.Context
{
    public class ApplicationUser:IdentityUser
    {
        public virtual ICollection<Booking> Bookings { get; set; } = [];
        public virtual ICollection<FlightBooking> FlightBookings { get; set; } = [];
    }
}
