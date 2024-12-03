import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchProcessComponent } from './research-process.component';

describe('ResearchProcessComponent', () => {
  let component: ResearchProcessComponent;
  let fixture: ComponentFixture<ResearchProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
