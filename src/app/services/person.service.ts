import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`http://${this.apiServerUrl}/person/all`);
  }

  public addPeople(person: Person): Observable<Person> {
    return this.http.post<Person>(
      `http://${this.apiServerUrl}/person/add`,
      person
    );
  }
}
