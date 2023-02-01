import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasComponent } from './resenas.component';

describe('ResenasComponent', () => {
  let component: ResenasComponent;
  let fixture: ComponentFixture<ResenasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResenasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
