import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMunicipaliteComponent } from './update-municipalite.component';

describe('UpdateMunicipaliteComponent', () => {
  let component: UpdateMunicipaliteComponent;
  let fixture: ComponentFixture<UpdateMunicipaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMunicipaliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMunicipaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
