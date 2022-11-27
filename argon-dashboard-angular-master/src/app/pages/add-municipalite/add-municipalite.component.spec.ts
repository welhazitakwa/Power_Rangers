import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMunicipaliteComponent } from './add-municipalite.component';

describe('AddMunicipaliteComponent', () => {
  let component: AddMunicipaliteComponent;
  let fixture: ComponentFixture<AddMunicipaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMunicipaliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMunicipaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
