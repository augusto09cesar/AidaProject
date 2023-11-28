import { TestBed } from '@angular/core/testing';

import { AtletaEquipeService } from './atleta-equipe.service';

describe('AtletaEquipeService', () => {
  let service: AtletaEquipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtletaEquipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
