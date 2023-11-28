import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalidadePage } from './modalidade.page';

describe('ModalidadePage', () => {
  let component: ModalidadePage;
  let fixture: ComponentFixture<ModalidadePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
