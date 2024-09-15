import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { Unit } from '@models/units.model';
import { UnitsRepository } from './units.repository';

describe('UnitsRepository', () => {
  let service: UnitsRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnitsRepository],
    });

    service = TestBed.inject(UnitsRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch units as an Observable', () => {
    const mockUnits: Unit[] = [
      {
        id: 1,
        name: 'Archer',
        description:
          'Quick and light. Weak at close range; excels at battle from distance',
        expansion: 'Age of Kings',
        age: 'Feudal',
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 35,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 6,
        hit_points: 4,
        range: 30,
        attack: 4,
        armor: '0/0',
        accuracy: '80%',
      },
    ];

    service.getUnits().subscribe((units) => {
      expect(units.length).toBe(1);
      expect(units).toEqual(mockUnits);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/units.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUnits);
  });

  it('should handle an error response correctly', () => {
    const errorMessage = 'Failed to load units';

    service.getUnits().subscribe({
      next: () => fail('expected an error, not units'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/units.json`);
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
