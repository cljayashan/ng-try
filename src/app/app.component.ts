import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { KeyValue } from '@angular/common';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CounterComponent,
    CalculatorComponent,
    FormsModule,
    AutocompleteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dataService: DataServiceService) {
    this.loadNames('');
  }

  title = 'ng-try';
  parentCount: number = 5;

  autoCompleteDataSetCtrl = new FormControl<string>('', Validators.required);

  names: KeyValue<string, string>[] = [];

  async loadNames(searchKey: string): Promise<void> {
    const data = await this.dataService.getData(searchKey);
    this.names = data.map((item) => ({
      key: item.id,
      value: item.name,
    }));
    console.log('names loaded:', this.names);
  }

  onOptionChanged(selectedOption: KeyValue<string, string>) {
    console.log('selected option changed in parent component:', selectedOption);
  }

  onSearchValueChanged(value: string) {
    console.log('search value changed in parent component:', value);
    this.loadNames(value);
  }

}
