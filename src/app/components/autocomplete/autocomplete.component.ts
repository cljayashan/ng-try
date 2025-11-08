import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-autocomplete',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  @Input() label: string = 'Default Label';
  @Input() placeholder: string = 'Default Placeholder';
  @Input() autoCompleteControl!: FormControl;
  @Input() options: KeyValue<string, string>[] = [];
  @Input() filterProperty: string = '';
  
  @Output() searchKeyChanged = new EventEmitter<string>();
  @Output() selectedOptionChanged = new EventEmitter<KeyValue<string, string>>();

  filteredOptions: KeyValue<string, string>[] = [];

  onSearchKeyChange(value: string) {
    this.searchKeyChanged.emit(value);

    //search value is emppty.
    if (!value) {
      this.filteredOptions = [...this.options];
      return;
    }
    //user typed a search value in text box..
    else {
      //converted search key into lower case for case insensitive search
      const searchKey = value.toLowerCase();
      
      //checking the filter property is provided or not
      this.filteredOptions = this.options.filter((option: any) => {
        if (this.filterProperty && option[this.filterProperty]) {
          //if filter property is provided then search in that property only
          return option[this.filterProperty].toLowerCase().includes(searchKey);
        } else {
          //if filter property is not provided then search in whole object
          return String(option).toLowerCase().includes(searchKey);
        }
      });
    }
  }

  onOptionSelected(selectedOption: any) {
    console.log('option selected:- ', selectedOption);
    this.selectedOptionChanged.emit(selectedOption);
    this.autoCompleteControl.setValue(selectedOption.value);
    // Print key and value as separate console logs
    if (selectedOption.option) {
      console.log('option key:', selectedOption.option.key);
      console.log('option ViewValue:', selectedOption.option.ViewValue);
      console.log('option value:', selectedOption.option.value);
      this.selectedOptionChanged.emit(selectedOption);
      this.autoCompleteControl.setValue(selectedOption.option.value);
    } else {
      // fallback if structure is different
      console.log('option key:', selectedOption.key);
      console.log('option value:', selectedOption.value);
      this.selectedOptionChanged.emit(selectedOption);
      this.autoCompleteControl.setValue(selectedOption.value);
    }
  }

  displayFn(item: any): string {
    // Check if item exists, otherwise the input might show 'null' or 'undefined'
    return item ? item.value : ''; 
  }

}

interface MyObject {
  id: number;
  name: string;
  value: string; // The value you want to show in the input
}