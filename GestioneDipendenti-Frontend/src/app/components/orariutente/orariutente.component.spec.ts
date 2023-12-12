import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrariutenteComponent } from './orariutente.component';

describe('OrariutenteComponent', () => {
  let component: OrariutenteComponent;
  let fixture: ComponentFixture<OrariutenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrariutenteComponent]
    });
    fixture = TestBed.createComponent(OrariutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
