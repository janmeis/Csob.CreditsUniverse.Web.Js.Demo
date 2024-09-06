import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonGroupModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs'; // Import DateInputsModule
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns'; // Import DropDownsModule
import { GridModule } from '@progress/kendo-angular-grid'; // Import GridModule from the correct package
import { InputsModule } from '@progress/kendo-angular-inputs'; // Import LabelModule from the correct package
import { IntlModule } from "@progress/kendo-angular-intl";
import { LabelModule } from '@progress/kendo-angular-label'; // Import LabelModule from the correct package
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export'; // Import PDFExportModule
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipModule } from '@progress/kendo-angular-tooltip'; // Import TooltipModule from the correct package
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { UploadsModule } from '@progress/kendo-angular-upload'; // Import UploadsModule from the correct package

@NgModule({
  declarations: [],
  exports: [
    ButtonGroupModule,
    ButtonsModule,
    DateInputsModule,
    DialogModule,
    DropDownsModule, // Add DropDownsModule to the imports array
    GridModule,
    InputsModule,
    IntlModule,
    LabelModule,
    LayoutModule,
    PDFExportModule,
    PopupModule,
    TooltipModule, // Add TooltipModule to the imports array
    TreeViewModule,
    UploadsModule,
    WindowModule,

    BrowserModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule to imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
