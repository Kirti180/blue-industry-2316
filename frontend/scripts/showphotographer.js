// let searchInput  = document.getElementById("search");
// let select1 = document.getElementById("select");
let photo_data = document.getElementById("show-photo-data");
// let searchTimeoutId;

// const searchPhotos = (value) => {
//   fetch(`https://faithful-ox-sock.cyclic.app/photographer/search?location=${value}`)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       display(res.data);
//     })
//     .catch((err) => console.log(err));
// };

// searchInput.addEventListener("input", (event) => {
//   const { value } = event.target;
//   clearTimeout(searchTimeoutId);
//   searchTimeoutId = setTimeout(() => {
//     searchPhotos(value);
//   }, 300);
// });

// const high = () => {
//   fetch("https://faithful-ox-sock.cyclic.app/photographer/high")
//     .then((res) => res.json())
//     .then((res) => {
//       //    console.log(res)
//       display(res.data);
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// };
// const low = () => {
//   fetch("https://faithful-ox-sock.cyclic.app/photographer/low")
//     .then((res) => res.json())
//     .then((res) => {
//       //    console.log(res)
//       display(res.data);
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// };
// const select = (e) => {
//   console.log(e.target.value);
//   if (e.target.value == "") {
//     getdata();
//   } else if (e.target.value == "low") {
//     low();
//   } else {
//     high();
//   }
// };
const getdata = () => {
  fetch("https://faithful-ox-sock.cyclic.app/photographer/")
    .then((res) => res.json())
    .then((res) => {
      // console.log("hello");
         console.log(res)
      display(res.data);
    })
    .catch((err) => console.log(err));
};

function display(data) {
    photo_data.innerHTML = null;
  data.forEach((element) => {
    //   console.log(element)
   let card_img=document.createElement("div")
   let main_card=document.createElement("div")
   main_card.setAttribute("id", "main_card");
   let occasion_add=document.createElement("div")
   occasion_add.setAttribute("id", "occasion_add");
   card_img.setAttribute("id", "card_img");
   let card_info=document.createElement("div")
   card_info.setAttribute("id", "card_info");
   let image = document.createElement("img");
   image.setAttribute("src", element.image);
   let title=document.createElement("h1")
   let location=document.createElement("p")
   let workingtime=document.createElement("p")
   let charges=document.createElement("p")
   let occasion=document.createElement("p")
   
   occasion.innerHTML = "Occasion : ";
   element.occasion.forEach((occ) => {
     occasion.innerHTML += occ.name + " ";
   });
   charges.innerHTML="Charges : "+element.charges
   workingtime.innerHTML="Timing : "+element.workingtime
   location.innerHTML="Location : "+element.location
   title.innerHTML=element.title
   occasion_add.append(occasion)
   card_info.append(title,location,workingtime,charges,occasion_add)
   card_img.append(image)
   main_card.append(card_img,card_info)
   main_card.addEventListener("click",()=>{
    localStorage.setItem("element", JSON.stringify(element));
    window.location.href = "./detailphotography.html";
   })
    photo_data.append(main_card);
  });
}

// search.addEventListener("change", searchPhotos);
// select1.addEventListener("change", select);
window.addEventListener("load", getdata);
// navbar2
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
