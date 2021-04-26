import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorDetailComponent } from './debtor-detail.component';

describe('DebtorDetailComponent', () => {
  let component: DebtorDetailComponent;
  let fixture: ComponentFixture<DebtorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
