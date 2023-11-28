import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAtletaPage } from './lista-atleta.page';

describe('ListaAtletaPage', () => {
  let component: ListaAtletaPage;
  let fixture: ComponentFixture<ListaAtletaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaAtletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
