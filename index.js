document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration");
  
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const usernameInput = registrationForm.elements["username"];
      const emailInput = registrationForm.elements["email"];
      const passwordInput = registrationForm.elements["password"];
      const passwordCheckInput = registrationForm.elements["passwordCheck"];
      const termsInput = registrationForm.elements["terms"];