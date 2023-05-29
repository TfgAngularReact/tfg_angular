import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosLikesComponent } from './juegos-likes.component';

describe('JuegosLikesComponent', () => {
  let component: JuegosLikesComponent;
  let fixture: ComponentFixture<JuegosLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegosLikesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegosLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
