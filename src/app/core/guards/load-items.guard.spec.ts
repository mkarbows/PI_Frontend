import { TestBed, async, inject } from '@angular/core/testing';

import { LoadItemsGuard } from './load-items.guard';

xdescribe('LoadItemsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadItemsGuard]
    });
  });

  it('should ...', inject([LoadItemsGuard], (guard: LoadItemsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
