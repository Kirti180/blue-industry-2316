// slide 

function one(){
    document.querySelector(".slide_image").src="https://images.pexels.com/photos/1603884/pexels-photo-1603884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
function two(){
    document.querySelector(".slide_image").src="https://images.pexels.com/photos/11785233/pexels-photo-11785233.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
function three(){
    document.querySelector(".slide_image").src="https://images.pexels.com/photos/4066900/pexels-photo-4066900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
function four(){
    document.querySelector(".slide_image").src="https://images.pexels.com/photos/3715086/pexels-photo-3715086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
function five(){
    document.querySelector(".slide_image").src="https://images.pexels.com/photos/4066900/pexels-photo-4066900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
setInterval(one,3000)
setInterval(two,6000)
setInterval(three,9000)
setInterval(four,12000)
setInterval(five,15000)
//navbar
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
    document.getElementById("burger").style.display = "none";
  }
  const nav_button=document.querySelector(".nav-button")
  nav_button.addEventListener("click",()=>{
    window.location.herf="./showphotgrapher.html"
  })