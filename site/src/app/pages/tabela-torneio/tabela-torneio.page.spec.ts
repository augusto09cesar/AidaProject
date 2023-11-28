import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaTorneioPage } from './tabela-torneio.page';

describe('TabelaTorneioPage', () => {
  let component: TabelaTorneioPage;
  let fixture: ComponentFixture<TabelaTorneioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabelaTorneioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
