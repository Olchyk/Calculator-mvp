class CalculatorModel {
  constructor() {
    this.currentValue = "";
  }

  appendValue(value) {
    this.currentValue += value;
  }

  clear() {
    this.currentValue = "";
  }

  calculate() {
    try {
      this.currentValue = eval(this.currentValue); // Виконує обчислення
    } catch {
      this.currentValue = "Error";
    }
  }

  getValue() {
    return this.currentValue;
  }
}
