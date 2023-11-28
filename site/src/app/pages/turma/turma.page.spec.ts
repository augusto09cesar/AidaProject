import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurmaPage } from './turma.page';

describe('TurmaPage', () => {
  let component: TurmaPage;
  let fixture: ComponentFixture<TurmaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
