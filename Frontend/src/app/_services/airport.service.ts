import { inject, Injectable } from '@angular/core';
import { GetAirport } from '../_models/Airport/get-airport';
import { HttpClient } from '@angular/common/http';
import { PostAirport } from '../_models/Airport/post-airport';
import { PutAirport } from '../_models/Airport/put-airport';
import { GenericResponse } from '../_models/generic-response';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'airports';

  getAirports(pageIndex: number, pageSize: number) {
    return this.client.get<GenericResponse<GetAirport>>(
      this.baseUrl + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getAirportById(id: number) {
    return this.client.get<GetAirport>(this.baseUrl + `/${id}`);
  }
  addNewAirport(formData: PostAirport) {
    return this.client.post<GetAirport>(this.baseUrl, formData);
  }
  updateAirport(id: number, formData: PutAirport) {
    return this.client.put<GetAirport>(this.baseUrl + `/${id}`, formData);
  }
  deleteAirport(id: number) {
    return this.client.delete<void>(this.baseUrl + `/${id}`);
  }
}
