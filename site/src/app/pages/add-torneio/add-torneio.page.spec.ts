import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTorneioPage } from './add-torneio.page';

describe('AddTorneioPage', () => {
  let component: AddTorneioPage;
  let fixture: ComponentFixture<AddTorneioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTorneioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
