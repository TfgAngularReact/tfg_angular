import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasLikesComponent } from './listas-likes.component';

describe('ListasLikesComponent', () => {
  let component: ListasLikesComponent;
  let fixture: ComponentFixture<ListasLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasLikesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
