import { TestBed, async, inject } from '@angular/core/testing';

import { MapGuard } from './map.guard';

xdescribe('MapGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapGuard]
    });
  });

  it('should ...', inject([MapGuard], (guard: MapGuard) => {
    expect(guard).toBeTruthy();
  }));
});
