import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCursoPage } from './add-curso.page';

describe('AddCursoPage', () => {
  let component: AddCursoPage;
  let fixture: ComponentFixture<AddCursoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
