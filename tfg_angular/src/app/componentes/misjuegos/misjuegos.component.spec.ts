import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisjuegosComponent } from './misjuegos.component';

describe('MisjuegosComponent', () => {
  let component: MisjuegosComponent;
  let fixture: ComponentFixture<MisjuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisjuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisjuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
