import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChienComponent } from './detail-chien.component';

describe('DetailChienComponent', () => {
  let component: DetailChienComponent;
  let fixture: ComponentFixture<DetailChienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailChienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
