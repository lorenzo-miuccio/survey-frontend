import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'any'
})
export class RestApiService {

  constructor(private http: HttpClient) {

  }

  callApi(url: string, method: string, body: any) {
    return new Promise<void>((resolve, reject) => {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      switch (method.toUpperCase()) {
        case 'GET':
          this.http.get(url).subscribe({
            next: (res: any) => {
              resolve(res);
            },
            error: (err: any) => {
              reject(err);
            },
            complete: () => {
              console.log('complete');
            },
          });
          break;
        case 'POST':
          this.http.post(url, JSON.stringify(body), {headers: headers}).subscribe({
            next: (res: any) => {
              resolve(res);
            },
            error: (err: any) => {
              reject(err);
            },
            complete: () => {
              //console.log('complete');
            },
          });
          break;
        case 'PUT':
          this.http.put(url, JSON.stringify(body), {headers: headers}).subscribe({
            next: (res: any) => {
              resolve(res);
            },
            error: (err: any) => {
              reject(err);
            },
            complete: () => {
              //console.log('complete');
            },
          });
          break;
        case 'DELETE':
          this.http.delete(url).subscribe({
            next: (res: any) => {
              resolve(res);
            },
            error: (err: any) => {
              reject(err);
            },
            complete: () => {
              //console.log('complete');
            },
          });
          break;
      }

    });
  }

}
