window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(
    ".user".forEach((el) => {
      el.addEventListener("click", (event) => {
        console.log(event.target.innerHTML);
      });
    })
  );
});
