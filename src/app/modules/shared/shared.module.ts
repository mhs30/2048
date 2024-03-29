import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from './footer/share-bottom-sheet/share-bottom-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { LoseDialogComponent } from './lose-dialog/lose-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { InfoBottomSheetComponent } from './footer/info-bottom-sheet/info-bottom-sheet.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ShareBottomSheetComponent, WinDialogComponent, LoseDialogComponent, InfoBottomSheetComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    NavbarComponent,
    FooterComponent,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
  ],
  entryComponents: [WinDialogComponent, LoseDialogComponent],
})
export class SharedModule {}
