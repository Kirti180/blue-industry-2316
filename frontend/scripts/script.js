let ham = document.getElementById("hamburger");

ham.addEventListener("click", function () {
    this.classList.toggle("is-active");
    if (this.classList.contains("is-active")) {
      openNav();
    } else {
      closeNav();
    }
  });
  function openNav() {
    console.log("open");
    document.getElementById("burger").style.display = "initial";
    document.getElementById("burger").style.transition =
      "transform 250ms ease-in-out";
  }
  function closeNav() {
    console.log("close nav");
    document.getElementById("burger").style.display = "none";
  }

