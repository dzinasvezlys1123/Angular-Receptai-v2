import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartToSelectComponent } from './start-to-select.component';

describe('StartToSelectComponent', () => {
  let component: StartToSelectComponent;
  let fixture: ComponentFixture<StartToSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartToSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartToSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
