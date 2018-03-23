import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsWorkshopComponent } from './events-workshop.component';

describe('EventsWorkshopComponent', () => {
  let component: EventsWorkshopComponent;
  let fixture: ComponentFixture<EventsWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
