import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IExecucao } from './../model/IExecucao';

import { environment } from './../../../../environments/environment.prod';

const EXECUCAO_URI = `${environment.api_url}/execucoes`;

@Injectable()
export class ExecucaoService {

  constructor(private http: HttpClient) { }

  index(): Observable<IExecucao[]> {
    return this.http.get<IExecucao[]>(EXECUCAO_URI);
  }

  show(id: number): Observable<IExecucao> {
    return this.http.get<IExecucao>(`${EXECUCAO_URI}/${id}`);
  }

  store(execucao: IExecucao): Observable<IExecucao> {
    return this.http.post<IExecucao>(EXECUCAO_URI, execucao);
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${EXECUCAO_URI}/${id}`);
  }

}
