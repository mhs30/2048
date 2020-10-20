import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoBottomSheetComponent } from './info-bottom-sheet/info-bottom-sheet.component';
import { ShareBottomSheetComponent } from './share-bottom-sheet/share-bottom-sheet.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private bottomSheetService: MatBottomSheet) {}

  ngOnInit(): void {}

  public openShareBottomSheet(): void {
    this.bottomSheetService.open(ShareBottomSheetComponent);
  }

  public openInfoBottomSheet(): void {
    this.bottomSheetService.open(InfoBottomSheetComponent);
  }
}
