import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModalidadePage } from './add-modalidade.page';

describe('AddModalidadePage', () => {
  let component: AddModalidadePage;
  let fixture: ComponentFixture<AddModalidadePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddModalidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
