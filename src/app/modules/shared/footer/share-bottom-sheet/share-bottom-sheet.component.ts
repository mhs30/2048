import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SOCIAL_LINKS } from 'src/app/entities/constants.entities';

@Component({
  selector: 'app-share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.scss'],
})
export class ShareBottomSheetComponent implements OnInit {
  constructor(private bottomSheetRefService: MatBottomSheetRef<ShareBottomSheetComponent>) {}

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRefService.dismiss();
    event.preventDefault();
  }

  get socialLinks(): any {
    return SOCIAL_LINKS;
  }
}
