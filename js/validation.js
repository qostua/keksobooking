class CustomValidation {
  constructor(validityChecks) {
    this.invalidities = [];
    this.validityChecks = validityChecks;
  }

  addInvalidity(message) {
    this.invalidities.push(message);
  }

  getInvalidities() {
    return this.invalidities.join('. \n');
  }

  checkValidity(input) {
    this.validityChecks.forEach((validityCheck) => {
      const message = validityCheck.getInvalidityMessage(input);
      if (message !== '') {
        this.addInvalidity(message);
      }
    });
  }
}

const resetValidityInput = (input) => {
  if (!input.CustomValidation) {
    return;
  }
  input.CustomValidation.invalidities = [];
  input.classList.remove('invalid');
  input.setCustomValidity('');
};

const checkInput = (input) => {
  if (!input.CustomValidation) {
    return;
  }
  resetValidityInput(input);
  input.CustomValidation.checkValidity(input);

  if (input.CustomValidation.invalidities.length !== 0 || input.value === '') {
    const message = input.CustomValidation.getInvalidities();
    input.setCustomValidity(message);
    input.classList.add('invalid');
  }
  input.reportValidity();
};

export {
  CustomValidation,
  resetValidityInput,
  checkInput
};
