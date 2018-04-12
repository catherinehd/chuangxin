import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContradictionIndexComponent } from './contradiction-index.component';

describe('ContradictionIndexComponent', () => {
  let component: ContradictionIndexComponent;
  let fixture: ComponentFixture<ContradictionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContradictionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContradictionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
