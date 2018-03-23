import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorSchoolComponent } from './senior-school.component';

describe('SeniorSchoolComponent', () => {
  let component: SeniorSchoolComponent;
  let fixture: ComponentFixture<SeniorSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
