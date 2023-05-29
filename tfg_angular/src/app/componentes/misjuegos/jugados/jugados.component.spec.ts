import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadosComponent } from './jugados.component';

describe('JugadosComponent', () => {
  let component: JugadosComponent;
  let fixture: ComponentFixture<JugadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
