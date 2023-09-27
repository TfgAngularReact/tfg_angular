import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListaDialogComponent } from './new-lista-dialog.component';

describe('NewListaDialogComponent', () => {
  let component: NewListaDialogComponent;
  let fixture: ComponentFixture<NewListaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewListaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
