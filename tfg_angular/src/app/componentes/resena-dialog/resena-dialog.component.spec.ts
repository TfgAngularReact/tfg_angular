import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaDialogComponent } from './resena-dialog.component';

describe('ResenaDialogComponent', () => {
  let component: ResenaDialogComponent;
  let fixture: ComponentFixture<ResenaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResenaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
