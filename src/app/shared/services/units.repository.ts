import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Unit } from '@models/units.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsRepository {
  readonly #apiUrl = environment.apiUrl;
  readonly #http = inject(HttpClient);

  getUnits(): Observable<Unit[]> {
    return this.#http.get<Unit[]>(`${this.#apiUrl}/units.json`);
  }
}
