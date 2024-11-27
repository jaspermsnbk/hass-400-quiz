import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputAComponent } from './question-input-a.component';

describe('QuestionInputAComponent', () => {
  let component: QuestionInputAComponent;
  let fixture: ComponentFixture<QuestionInputAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
