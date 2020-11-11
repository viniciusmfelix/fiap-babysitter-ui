import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAcao } from './../model/IAcao';

import { environment } from './../../../../environments/environment.prod';

const ACAO_URI = `${environment.api_url}/acoes`;

@Injectable()
export class AcaoService {

  constructor(private http: HttpClient) { }

  index(): Observable<IAcao[]> {
    return this.http.get<IAcao[]>(ACAO_URI);
  }

  show(id: number): Observable<IAcao> {
    return this.http.get<IAcao>(`${ACAO_URI}/${id}`);
  }

  store(acao: IAcao): Observable<IAcao> {
    return this.http.post<IAcao>(ACAO_URI, acao);
  }

  update(acao: IAcao): Observable<IAcao> {
    return this.http.put<IAcao>(`${ACAO_URI}/${acao.id}`, acao);
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${ACAO_URI}/${id}`);
  }

}
