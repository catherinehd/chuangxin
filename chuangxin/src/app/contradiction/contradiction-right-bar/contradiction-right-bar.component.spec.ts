import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContradictionRightBarComponent } from './contradiction-right-bar.component';

describe('ContradictionRightBarComponent', () => {
  let component: ContradictionRightBarComponent;
  let fixture: ComponentFixture<ContradictionRightBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContradictionRightBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContradictionRightBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
