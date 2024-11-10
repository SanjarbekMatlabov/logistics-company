'use strict';
/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
fetch('navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    const navbar = document.querySelector("[data-navbar]");
    const navToggler = document.querySelectorAll("[data-nav-toggler]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const overlay = document.querySelector("[data-overlay]");

    for (let i = 0; i < navToggler.length; i++) { 
      navToggler[i].addEventListener("click", function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
      });
    }

    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
      });
    }

  });
  fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });
  fetch('form.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('form').innerHTML = html;
  })
  .then(html => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwmdlk8UQS8Q79CDLNvrPFWl_YZZEZhAJm6-ttuoy6KfiEmFt8qErh1shIqcuBtz15r/exec";
    const form = document.forms["submit-to-google-sheet"];
    const submitButton = document.querySelector('input[type="submit"]'); // Submit tugmasini tanlash

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Submit tugmasini o'chirib qo'yish
      submitButton.disabled = true; 
      submitButton.style.cursor = "not-allowed"; 

      const formData = new FormData(form);

      fetch(scriptURL, { method: "POST", body: formData })
        .then(response => {
          swal("Done", "Submitted Successfully.", "success");
          form.reset(); 
        })
        .catch(error => {
          swal("Error", "Something went wrong. Please try again!", "error");
          console.error("Error:", error);
        })
        .finally(() => {
          // Submit tugmasini qayta yoqish
          submitButton.disabled = false;
          submitButton.style.cursor = "pointer"; 
        });
    });
  })