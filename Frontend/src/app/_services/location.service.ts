import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenericResponse } from '../_models/generic-response';
import { CategoryLocation } from '../_models/Category/category-location';
import { GetLocation } from '../_models/Location/get-location';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'locations';

  getLocations() {
    return this.client.get<GetLocation[]>(this.baseUrl);
  }
  getLocationById(id: number) {
    return this.client.get<GetLocation>(this.baseUrl + `/${id}`);
  }
  newLocation(formData: FormData) {
    return this.client.post(this.baseUrl, formData);
  }
  updateLocation(id: number, formData: FormData) {
    return this.client.put(this.baseUrl + `/${id}`, formData);
  }
  deleteLocation(id: number) {
    return this.client.delete(this.baseUrl + `/${id}`);
  }
}
