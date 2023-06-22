import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarImgDialogComponent } from './adjuntar-img-dialog.component';

describe('AdjuntarImgDialogComponent', () => {
  let component: AdjuntarImgDialogComponent;
  let fixture: ComponentFixture<AdjuntarImgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjuntarImgDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjuntarImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
