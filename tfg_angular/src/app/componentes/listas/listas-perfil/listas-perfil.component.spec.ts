import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasPerfilComponent } from './listas-perfil.component';

describe('ListasPerfilComponent', () => {
  let component: ListasPerfilComponent;
  let fixture: ComponentFixture<ListasPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
