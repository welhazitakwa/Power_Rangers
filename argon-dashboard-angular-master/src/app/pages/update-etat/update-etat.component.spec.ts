import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtatComponent } from './update-etat.component';

describe('UpdateEtatComponent', () => {
  let component: UpdateEtatComponent;
  let fixture: ComponentFixture<UpdateEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEtatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
