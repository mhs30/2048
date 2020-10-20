import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBottomSheetComponent } from './info-bottom-sheet.component';

describe('InfoBottomSheetComponent', () => {
  let component: InfoBottomSheetComponent;
  let fixture: ComponentFixture<InfoBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
