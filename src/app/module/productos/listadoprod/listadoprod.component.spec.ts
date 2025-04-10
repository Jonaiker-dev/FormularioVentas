import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoprodComponent } from './listadoprod.component';

describe('ListadoprodComponent', () => {
  let component: ListadoprodComponent;
  let fixture: ComponentFixture<ListadoprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoprodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
