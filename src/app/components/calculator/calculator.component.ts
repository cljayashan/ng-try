import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  num1: number = 0;
  num2: number = 0
  result: number = 0;
  @Output() calculationPerformed = new EventEmitter<number>();

  add() {
    console.log("Add called");
    this.result = this.num1 + this.num2;
    this.calculationPerformed.emit(this.result);
  }

  subtract() {
    console.log("Subtract called");
    this.result = this.num1 - this.num2;
    this.calculationPerformed.emit(this.result);
  }
}
