import { TestBed, async, inject } from '@angular/core/testing';

import { ItemNavGuard } from './item-nav.guard';

xdescribe('ItemNavGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemNavGuard]
    });
  });

  it('should ...', inject([ItemNavGuard], (guard: ItemNavGuard) => {
    expect(guard).toBeTruthy();
  }));
});
