import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleStockComponent } from './detalle-stock.component';

describe('DetalleStockComponent', () => {
  let component: DetalleStockComponent;
  let fixture: ComponentFixture<DetalleStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
