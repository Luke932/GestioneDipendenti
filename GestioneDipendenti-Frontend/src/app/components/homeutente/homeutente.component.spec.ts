import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeutenteComponent } from './homeutente.component';

describe('HomeutenteComponent', () => {
  let component: HomeutenteComponent;
  let fixture: ComponentFixture<HomeutenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeutenteComponent]
    });
    fixture = TestBed.createComponent(HomeutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
