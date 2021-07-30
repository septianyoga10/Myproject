import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircareDetailComponent } from './haircare-detail.component';

describe('HaircareDetailComponent', () => {
  let component: HaircareDetailComponent;
  let fixture: ComponentFixture<HaircareDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaircareDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaircareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
