import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooldetailComponent } from './schooldetail.component';

describe('SchooldetailComponent', () => {
  let component: SchooldetailComponent;
  let fixture: ComponentFixture<SchooldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchooldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
