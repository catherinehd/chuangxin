import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeIndexComponent } from './knowledge-index.component';

describe('KnowledgeIndexComponent', () => {
  let component: KnowledgeIndexComponent;
  let fixture: ComponentFixture<KnowledgeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
