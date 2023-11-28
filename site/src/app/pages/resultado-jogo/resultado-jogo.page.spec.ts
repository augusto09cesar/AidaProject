import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoJogoPage } from './resultado-jogo.page';

describe('ResultadoJogoPage', () => {
  let component: ResultadoJogoPage;
  let fixture: ComponentFixture<ResultadoJogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResultadoJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
