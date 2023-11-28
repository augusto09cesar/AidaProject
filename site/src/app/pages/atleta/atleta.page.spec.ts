import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtletaPage } from './atleta.page';

describe('AtletaPage', () => {
  let component: AtletaPage;
  let fixture: ComponentFixture<AtletaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
