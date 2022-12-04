import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVeterinaireComponent } from './dashboard-veterinaire.component';

describe('DashboardVeterinaireComponent', () => {
  let component: DashboardVeterinaireComponent;
  let fixture: ComponentFixture<DashboardVeterinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVeterinaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
