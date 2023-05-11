import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListaDialogComponent } from './add-lista-dialog.component';

describe('AddListaDialogComponent', () => {
  let component: AddListaDialogComponent;
  let fixture: ComponentFixture<AddListaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
