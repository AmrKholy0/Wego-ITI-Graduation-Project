import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../_models/generic-response';
import { GetAirplane } from '../_models/airplane/get-airplane';
import { PostAirplane } from '../_models/airplane/post-airplane';
import { PutAirplane } from '../_models/airplane/put-airplane';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'Airplanes';

  getAirplanes(pageIndex: number, pageSize: number) {
    return this.client.get<GenericResponse<GetAirplane>>(
      this.baseUrl + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getAirplaneById(id: number) {
    return this.client.get<GetAirplane>(this.baseUrl + `/${id}`);
  }
  addNewAirplane(formData: PostAirplane) {
    return this.client.post<GetAirplane>(this.baseUrl, formData);
  }
  updateAirplane(id: number, formData: PutAirplane) {
    return this.client.put<GetAirplane>(this.baseUrl + `/${id}`, formData);
  }
  deleteAirplane(id: number) {
    return this.client.delete<void>(this.baseUrl + `/${id}`);
  }
}
