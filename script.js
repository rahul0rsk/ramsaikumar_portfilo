document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("thank-you").style.display = "block";
  this.reset();
});