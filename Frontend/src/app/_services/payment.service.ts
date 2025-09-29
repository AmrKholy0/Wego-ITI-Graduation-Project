import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CheckoutDto } from '../_models/checkoutDto';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = environment.apiUrl;
  private readonly client = inject(HttpClient);

  payNow(reqData: CheckoutDto) {
    return this.client.post<{ url: string }>(this.baseUrl +'Payment/checkout', reqData);
  }
}
