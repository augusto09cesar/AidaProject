import { TestBed } from '@angular/core/testing';

import { EquipeTorneioService } from './equipe-torneio.service';

describe('EquipeTorneioService', () => {
  let service: EquipeTorneioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeTorneioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
