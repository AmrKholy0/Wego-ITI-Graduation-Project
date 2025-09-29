import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FlightBookingDto } from '../_models/FlightBookingDto';
import { UserBookingDto } from '../_models/user-Bookings';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FlightBookingService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/FlightBookings';

  createFlightBooking(data: FlightBookingDto) {
    return this.client.post<{ bookingIds: number[]; totalPrice: number }>(
      this.baseUrl,
      data
    );
  }

  getUserBookings() {
    return this.client.get<UserBookingDto[]>(this.baseUrl + '/my-bookings');
  }
}
