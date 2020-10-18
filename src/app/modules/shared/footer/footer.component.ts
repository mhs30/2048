import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from './share-bottom-sheet/share-bottom-sheet.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private bottomSheetService: MatBottomSheet) {}

  ngOnInit(): void {}
  openShareBottomSheet(): void {
    this.bottomSheetService.open(ShareBottomSheetComponent);
  }
}
