import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetFeature } from '../_models/feature/get-feature';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'Features';
  getFeatures() {
    return this.client.get<GetFeature[]>(this.baseUrl);
  }
}
