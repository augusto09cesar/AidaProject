import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAtletaPage } from './add-atleta.page';

describe('AddAtletaPage', () => {
  let component: AddAtletaPage;
  let fixture: ComponentFixture<AddAtletaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAtletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
