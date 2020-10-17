import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule],
  exports: [FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule, NavbarComponent],
})
export class SharedModule {}
