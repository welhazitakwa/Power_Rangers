import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVeterinaireComponent } from './detail-veterinaire.component';

describe('DetailVeterinaireComponent', () => {
  let component: DetailVeterinaireComponent;
  let fixture: ComponentFixture<DetailVeterinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVeterinaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
