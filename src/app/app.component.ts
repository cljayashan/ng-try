import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent,CalculatorComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-try';
  parentCount: number = 5;

}
