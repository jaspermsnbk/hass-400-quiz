import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputBComponent } from './question-input-b.component';

describe('QuestionInputBComponent', () => {
  let component: QuestionInputBComponent;
  let fixture: ComponentFixture<QuestionInputBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
