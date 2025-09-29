import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  httpClient = inject(HttpClient);
  private readonly port = 7024;


  /* createBooking(booking:Booking){

    return this.httpClient.post(this.url,booking);
  }
 */
}
