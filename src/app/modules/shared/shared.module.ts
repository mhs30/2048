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
@NgModule({
  declarations: [NavbarComponent, FooterComponent, ShareBottomSheetComponent],
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
  ],
})
export class SharedModule {}
