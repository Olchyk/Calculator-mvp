class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init() {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.handleButtonClick(button.dataset.value);
      });
    });
  }

  handleButtonClick(value) {
    if (value === "C") {
      this.model.clear();
      this.view.clearDisplay();
    } else if (value === "=") {
      this.model.calculate();
      this.view.updateDisplay(this.model.getValue());
    } else {
      this.model.appendValue(value);
      this.view.updateDisplay(this.model.getValue());
    }
  }
}
