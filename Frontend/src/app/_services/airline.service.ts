import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenericResponse } from '../_models/generic-response';
import { GetAirline } from '../_models/Airline/get-airline';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'Airlines';
  getAirlines(pageIndex: number, pageSize: number) {
    return this.client.get<GenericResponse<GetAirline>>(
      this.baseUrl + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getAirlineById(id: number) {
    return this.client.get<GetAirline>(this.baseUrl + `/${id}`);
  }
  addNewAirline(formData: FormData) {
    return this.client.post<GetAirline>(this.baseUrl, formData);
  }
  updateAirline(id: number, formData: FormData) {
    return this.client.put<GetAirline>(this.baseUrl + `/${id}`, formData);
  }
  deleteAirline(id: number) {
    return this.client.delete<void>(this.baseUrl + `/${id}`);
  }
}
