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
    MatStepperModule,
    MatSelectModule } from '@angular/material';


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
    MatStepperModule,
    MatSelectModule
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
    MatStepperModule,
    MatSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
