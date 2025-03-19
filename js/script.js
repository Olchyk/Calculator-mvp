document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const trigToggle = document.querySelector(".trig-toggle");
  const trigFunctions = document.querySelector(".trig-functions");
  let currentValue = "";

  function updateDisplay() {
    display.value = currentValue;
  }

  // ✅ Перемикання тригонометричних функцій
  trigToggle.addEventListener("click", () => {
    trigFunctions.classList.toggle("show");
  });

  function appendToDisplay(value) {
    if (value === "." && currentValue.includes(".")) return;
    currentValue += value;
    updateDisplay();
  }

  function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    updateDisplay();
  }

  function clearAll() {
    currentValue = "";
    updateDisplay();
  }

  function calculateResult() {
    try {
      let result = currentValue.replace(/%/g, "/100");
      display.value = eval(result);
      currentValue = display.value;
    } catch (error) {
      display.value = "Помилка";
      currentValue = "";
    }
  }

  function handleTrigFunction(value) {
    if (!currentValue || isNaN(parseFloat(currentValue))) {
      console.error("Некоректне значення для тригонометричної функції");
      display.value = "Помилка";
      currentValue = "";
      return;
    }
    console.log("handleTrigFunction викликана!", value);
    display.value = "ТЕСТ";
    console.log("Викликано handleTrigFunction для:", value);
    console.log("Поточне значення currentValue:", currentValue); // Додано log currentValue

    if (currentValue === "" || isNaN(parseFloat(currentValue))) {
      display.value = "Помилка";
      return;
    }

    const angleMode = document.querySelector(
      'input[name="angleMode"]:checked'
    )?.value;
    let num = parseFloat(currentValue);
    console.log("Число для тригонометрії (num):", num); // Додано log num
    console.log("Режим кутів:", angleMode); // Додано log angleMode

    if (angleMode === "degrees") {
      num = num * (Math.PI / 180);
      console.log("Число в радіанах (num після конвертації):", num); // Додано log після конвертації
    }

    let result;
    switch (value) {
      case "sin":
        result = Math.sin(num).toFixed(5);
        break;
      case "cos":
        result = Math.cos(num).toFixed(5);
        break;
      case "tan":
        result = Math.tan(num).toFixed(5);
        break;
      case "ctg":
        result =
          Math.tan(num) === 0
            ? "Ділення на нуль (ctg)"
            : (1 / Math.tan(num)).toFixed(5);
        break;
      case "arcsin":
        result = Math.asin(num).toFixed(5);
        break;
      case "arccos":
        result = Math.acos(num).toFixed(5);
        break;
      case "arctg":
        result = Math.atan(num).toFixed(5);
        break;

      case "arcctg":
        result =
          num === 0 ? "Не визначено (arcctg)" : Math.atan(1 / num).toFixed(5);
        break;
    }

    console.log("Результат до toFixed:", result);
    console.log("Результат після toFixed:", result);

    currentValue = result.toString();
    updateDisplay();
  }

  function handleButtonClick(value) {
    console.log("Клікнута кнопка:", value);

    if (!value) {
      console.warn(
        "⚠️ Натиснута кнопка без data-value, вона не виконує обчислення."
      );
      return;
    }

    if (value === "C") {
      clearAll();
    } else if (value === "⌫") {
      deleteLast();
    } else if (value === "=") {
      calculateResult();
    } else if (
      [
        "sin",
        "cos",
        "tan",
        "ctg",
        "arcsin",
        "arccos",
        "arctg",
        "arcctg",
      ].includes(value)
    ) {
      handleTrigFunction(value);
    } else {
      appendToDisplay(value);
    }
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        handleButtonClick(value);
      }
    });
  });
});
