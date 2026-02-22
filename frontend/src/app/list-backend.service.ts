import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from './model/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ListBackendService {
  constructor(private http: HttpClient) {}

  getCategories(url: string, apiKey?: string): Observable<Category[]> {
    const options = apiKey ? {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      }),
    } : httpOptions;
    return this.http.get<Category[]>(url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error running http request: ' + error.message));
  }

  saveCategories(url: string, categories: Category[], apiKey?: string): Observable<boolean> {
    const options = apiKey ? {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      }),
    } : httpOptions;
    return this.http.put<boolean>(url, categories, options).pipe(catchError(this.handleError));
  }
}
