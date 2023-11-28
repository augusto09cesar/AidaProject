import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTurmaPage } from './add-turma.page';

describe('AddTurmaPage', () => {
  let component: AddTurmaPage;
  let fixture: ComponentFixture<AddTurmaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
