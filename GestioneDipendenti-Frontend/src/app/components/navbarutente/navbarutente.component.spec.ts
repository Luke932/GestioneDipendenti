import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarutenteComponent } from './navbarutente.component';

describe('NavbarutenteComponent', () => {
  let component: NavbarutenteComponent;
  let fixture: ComponentFixture<NavbarutenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarutenteComponent]
    });
    fixture = TestBed.createComponent(NavbarutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
