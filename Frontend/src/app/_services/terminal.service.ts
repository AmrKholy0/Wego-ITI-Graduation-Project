import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenericResponse } from '../_models/generic-response';
import { GetTerminal } from '../_models/terminal/get-terminal';
import { PostTerminal } from '../_models/terminal/post-terminal';
import { PutTerminal } from '../_models/terminal/put-terminal';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  private baseUrl = environment.apiUrl + '/terminals';
  private client = inject(HttpClient);

  getTerminals(pageIndex: number, pageSize: number) {
    return this.client.get<GenericResponse<GetTerminal>>(
      this.baseUrl + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getTerminalById(id: number) {
    return this.client.get<GetTerminal>(this.baseUrl + `/${id}`);
  }
  addNewTerminal(formData: PostTerminal) {
    return this.client.post<GetTerminal>(this.baseUrl, formData);
  }
  updateTerminal(id: number, formData: PutTerminal) {
    return this.client.put<GetTerminal>(this.baseUrl + `/${id}`, formData);
  }
  deleteTerminal(id: number) {
    return this.client.delete<void>(this.baseUrl + `/${id}`);
  }
}
