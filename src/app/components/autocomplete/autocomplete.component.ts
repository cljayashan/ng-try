import { CommonModule, KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
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
export class AutocompleteComponent  implements OnInit,  OnChanges{
  @Input() label: string = 'Default Label';
  @Input() placeholder: string = 'Default Placeholder';
  @Input() autoCompleteControl!: FormControl;
  @Input() options: KeyValue<string, string>[] = [];
  @Input() filterProperty: string = '';
  @Input() displayWith: (option: KeyValue<string, string> | null) => string = (opt) => (opt ? String(opt.value) : '');

  @Output() searchKeyChanged = new EventEmitter<string>();
  @Output() selectedOptionChanged = new EventEmitter<
    KeyValue<string, string>
  >();

  filteredOptions: KeyValue<string, string>[] = [];

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(): void {
    // Update filtered options when input options change
    this.filteredOptions = [...this.options];
  }

  onInput(value: string) {    

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
    this.searchKeyChanged.emit(value);
  }

  onOptionSelected(autocompleteSelected: any) {
    console.log('option selected:- ', autocompleteSelected);
    
  // Material Autocomplete wraps the value in event.option.value
  const selectedOption = autocompleteSelected.option.value;

  // console.log('option key:', selectedOption.key);
  // console.log('option value:', selectedOption.value);

  // Set the control value to the whole option object, not just its value
  // this.autoCompleteControl.setValue(selectedOption);
  // this.selectedOptionChanged.emit(selectedOption);  
  
  this.autoCompleteControl.setValue(autocompleteSelected.option.value);
  this.selectedOptionChanged.emit(autocompleteSelected.option.value);
  }
}
