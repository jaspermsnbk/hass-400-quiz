import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputTfComponent } from './question-input-tf.component';

describe('QuestionInputTfComponent', () => {
  let component: QuestionInputTfComponent;
  let fixture: ComponentFixture<QuestionInputTfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputTfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
