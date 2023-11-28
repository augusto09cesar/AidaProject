import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TorneioPage } from './torneio.page';

describe('TorneioPage', () => {
  let component: TorneioPage;
  let fixture: ComponentFixture<TorneioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TorneioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
