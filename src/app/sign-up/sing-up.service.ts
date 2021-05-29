import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SingUpRequestData} from './types';
import {Observable, of} from 'rxjs';
import {API} from './constants';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  singUp(singUpRequestData: SingUpRequestData): Observable<any> {
    return this.httpClient.post(API.singUp, singUpRequestData).pipe(
      catchError(error => of(error) )
    );
  }

}
