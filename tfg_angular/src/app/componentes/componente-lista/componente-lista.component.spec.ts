import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListaComponent } from './componente-lista.component';

describe('ComponenteListaComponent', () => {
  let component: ComponenteListaComponent;
  let fixture: ComponentFixture<ComponenteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
