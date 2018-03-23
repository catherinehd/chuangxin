import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorSchooldetailComponent } from './senior-schooldetail.component';

describe('SeniorSchooldetailComponent', () => {
  let component: SeniorSchooldetailComponent;
  let fixture: ComponentFixture<SeniorSchooldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorSchooldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorSchooldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
