import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Details } from '../_models/details';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private readonly baseUrl = environment.apiUrl + 'RoomBookingDetails';
  httpClient = inject(HttpClient);
  booking = signal<Details[] | undefined>(undefined);

  creatRoomDetails(details: Details) {
    return this.httpClient.post<{ bookId: number }>(this.baseUrl, details);
  }
  getUserBooking() {
    this.httpClient.get<Details[]>(this.baseUrl + '/user-booking').subscribe({
      next: (data) => this.booking.set(data),
      error: (err) => console.log(err),
      complete: () => console.log('getUserBooking  : complete '),
    });
  }

  isReserved(roomId: string, checkin: string, checkout: string) {
    return this.httpClient.get<Details[]>(
      this.baseUrl +
        `/RoomAvailable?roomId=${roomId}&checkin=${checkin}&checkout=${checkout}`
    );
  }

  getReservedDates(roomId: string) {
    return this.httpClient.get<string[]>(
      this.baseUrl + `/reservedDates?roomId=${roomId}`
    );
  }
}
