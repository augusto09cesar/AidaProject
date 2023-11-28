import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEquipePage } from './add-equipe.page';

describe('AddEquipePage', () => {
  let component: AddEquipePage;
  let fixture: ComponentFixture<AddEquipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEquipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
