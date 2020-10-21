import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelNavigatorComponent } from './level-navigator.component';

xdescribe('LevelNavigatorComponent', () => {
  let component: LevelNavigatorComponent;
  let fixture: ComponentFixture<LevelNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
