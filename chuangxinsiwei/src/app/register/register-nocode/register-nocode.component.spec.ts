import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNocodeComponent } from './register-nocode.component';

describe('RegisterNocodeComponent', () => {
  let component: RegisterNocodeComponent;
  let fixture: ComponentFixture<RegisterNocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
