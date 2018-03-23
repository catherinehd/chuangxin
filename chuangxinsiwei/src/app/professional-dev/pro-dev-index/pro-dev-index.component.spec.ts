import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDevIndexComponent } from './pro-dev-index.component';

describe('ProDevIndexComponent', () => {
  let component: ProDevIndexComponent;
  let fixture: ComponentFixture<ProDevIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProDevIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDevIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
