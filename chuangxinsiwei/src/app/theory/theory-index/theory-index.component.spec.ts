import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryIndexComponent } from './theory-index.component';

describe('TheoryIndexComponent', () => {
  let component: TheoryIndexComponent;
  let fixture: ComponentFixture<TheoryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
