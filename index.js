//+ ===== Registration Form =====

const registrationForm = document.getElementById('registration');

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Get input values
  const username = getInputValue('username');
  const email = getInputValue('email').toLowerCase();
  const password = getInputValue('password');
  const passwordCheck = getInputValue('passwordCheck');
  const terms = getCheckboxValue('terms');

  // Get the error display element
  const errorDisplay = document.getElementById('errorDisplay');
  let errorMessage = '';

  // Validations Below
  errorMessage += validateUsername(username);
  errorMessage += validateEmail(email);
  errorMessage += validatePassword(password, username);
  errorMessage += validatePasswordMatch(password, passwordCheck);
  errorMessage += validateTerms(terms);

  // Display error message if any
  if (errorMessage) {
    displayError(errorMessage, errorDisplay);
  } else {
    // Clear form fields
    registrationForm.reset();

    // Show success message
    displaySuccess('Registration successful!', errorDisplay);
  }
});

// Function to get input value by name
function getInputValue(name) {
  return registrationForm.elements[name].value.trim();
}

// Function to get checkbox value by name
function getCheckboxValue(name) {
  return registrationForm.elements[name].checked;
}

// Function to validate username
function validateUsername(username) {
  let errorMessage = '';
  if (!username) {
    errorMessage += 'You forgot to tell us your username.<br>';
  } else if (username.length < 4) {
    errorMessage += 'Make your username at least 4 letters long.<br>';
  } else if (!hasTwoUniqueCharacters(username)) {
    errorMessage += 'Your username needs at least two different letters.<br>';
  } else if (!isAlphanumeric(username)) {
    errorMessage +=
      "Special characters or spaces aren't allowed in your username.<br>";
  }
  return errorMessage;
}

// Function to validate email
function validateEmail(email) {
  let errorMessage = '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage += "That doesn't look like a valid email.<br>";
  } else if (email.endsWith('@example.com')) {
    errorMessage += "Please use a real email, not one from 'example.com'.<br>";
  }
  return errorMessage;
}

// Function to validate password
function validatePassword(password, username) {
  let errorMessage = '';
  if (password.length < 12) {
    errorMessage += 'Make your password at least 12 characters long.<br>';
  } else if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/\W/.test(password)
  ) {
    errorMessage +=
      'Include at least one uppercase letter, lowercase letter, number, and special character in your password.<br>';
  } else if (password.toLowerCase().includes('password')) {
    errorMessage +=
      "Don't use 'password' in your password, that's too easy to guess.<br>";
  } else if (password.includes(username)) {
    errorMessage +=
      "Don't include your username in your password, that's not safe.<br>";
  }
  return errorMessage;
}

// Function to validate password match
function validatePasswordMatch(password, passwordCheck) {
  let errorMessage = '';
  if (password !== passwordCheck) {
    errorMessage += "Your passwords don't match. Try again.<br>";
  }
  return errorMessage;
}

// Function to validate terms acceptance
function validateTerms(terms) {
  let errorMessage = '';
  if (!terms) {
    errorMessage += 'You gotta agree to the terms before you can register.<br>';
  }
  return errorMessage;
}

// Function to display error message
function displayError(errorMessage, errorDisplay) {
  errorDisplay.innerHTML = errorMessage;
  errorDisplay.style.display = 'block';
}

// Function to display success message
function displaySuccess(message, errorDisplay) {
  errorDisplay.innerHTML = message;
  errorDisplay.style.color = 'green';
  errorDisplay.style.display = 'block';
  // Automatically hide success message after 3 seconds
  setTimeout(function () {
    errorDisplay.style.display = 'none';
  }, 3000);
}

// Function to check if a username has at least two unique characters
function hasTwoUniqueCharacters(str) {
  const uniqueChars = new Set(str);
  return uniqueChars.size >= 2;
}

// Function to check if a string is alphanumeric
function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]*$/.test(str);
}
