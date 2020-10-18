import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinDialogComponent } from './win-dialog.component';

describe('WinDialogComponent', () => {
  let component: WinDialogComponent;
  let fixture: ComponentFixture<WinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
