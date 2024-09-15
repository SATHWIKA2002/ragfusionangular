import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Dummy API URL

  constructor(private http: HttpClient) { }

  search(query: string, fusionMethod: string): Observable<any> {
    // Simulating sending both query and fusion method via POST request to the backend
    const requestBody = {
      query: query,
      fusionMethod: fusionMethod
    };
    return this.http.post<any>(`${this.apiUrl}`, requestBody);
  }
}
