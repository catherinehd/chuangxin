import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeDescriptionComponent } from './knowledge-description.component';

describe('KnowledgeDescriptionComponent', () => {
  let component: KnowledgeDescriptionComponent;
  let fixture: ComponentFixture<KnowledgeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
