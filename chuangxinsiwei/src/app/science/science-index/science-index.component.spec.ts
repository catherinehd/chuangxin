import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceIndexComponent } from './science-index.component';

describe('ScienceIndexComponent', () => {
  let component: ScienceIndexComponent;
  let fixture: ComponentFixture<ScienceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
