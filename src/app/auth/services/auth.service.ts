import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interfaces';

import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl: string = environment.BaseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor( private http: HttpClient ) { }

  register( email: string, name: string, password: string ){

    const url = `${this.BaseUrl}/auth/new`;
    const body = { email, name, password }

    return this.http.post<AuthResponse>( url, body )
    .pipe(
      tap( res => {
        if( res.ok ){
          localStorage.setItem('token', res.token!);
        }
      } ),
      map( res => res.ok ),
      catchError( err => of(err.error.msg) )
    )

  }


  login( email: string, password: string ){

    const url  = `${this.BaseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( res => {
          if( res.ok ){
            localStorage.setItem('token', res.token!);
          }
        } ),
        map( res => res.ok ),
        catchError( err => of(err.error.msg) )
        );

  }


  validateToken(): Observable<boolean> {

    const url  = `${this.BaseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set( 'x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>( url, { headers } )
              .pipe(
                map( res => {
                  this.saveUserLocalStorage(res);
                  return res.ok
                }),
                catchError( err => of(false) )
              );

  }

  logout(){
    localStorage.clear();
  }

  saveUserLocalStorage(res:AuthResponse){
    localStorage.setItem('token', res.token!);
    this._user = {
      name: res.name!,
      uid: res.uid!,
      email: res.email!
    }
  }

}
