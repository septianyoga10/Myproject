import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeranjangDetailComponent } from './keranjang-detail.component';

describe('KeranjangDetailComponent', () => {
  let component: KeranjangDetailComponent;
  let fixture: ComponentFixture<KeranjangDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeranjangDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeranjangDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
