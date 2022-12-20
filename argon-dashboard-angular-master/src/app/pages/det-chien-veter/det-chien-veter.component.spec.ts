import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetChienVeterComponent } from './det-chien-veter.component';

describe('DetChienVeterComponent', () => {
  let component: DetChienVeterComponent;
  let fixture: ComponentFixture<DetChienVeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetChienVeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetChienVeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
