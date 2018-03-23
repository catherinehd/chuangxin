import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorkshopComponent } from './detail-workshop.component';

describe('DetailWorkshopComponent', () => {
  let component: DetailWorkshopComponent;
  let fixture: ComponentFixture<DetailWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
