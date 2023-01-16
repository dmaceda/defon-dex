import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environments';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTotal() {
    return this.http.get<any>(`${this.baseUrl}/pokemon`);
  }

  getPokemons(index: number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
}
