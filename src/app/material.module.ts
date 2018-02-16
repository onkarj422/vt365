import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatButtonModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatGridListModule, 
    MatListModule,
    MatExpansionModule, 
    MatTabsModule, 
    MatDialogModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule
  ],
  declarations: []
})
export class MaterialModule { }
