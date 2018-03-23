import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsIndexComponent } from './events-index.component';

describe('EventsIndexComponent', () => {
  let component: EventsIndexComponent;
  let fixture: ComponentFixture<EventsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
