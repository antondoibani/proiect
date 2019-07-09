import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormularComponent } from './product-formular.component';

describe('ProductFormularComponent', () => {
  let component: ProductFormularComponent;
  let fixture: ComponentFixture<ProductFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
