let searchInput  = document.getElementById("search");
let select1 = document.getElementById("select");
let photo_data = document.getElementById("show-photo-data");
let searchTimeoutId;
const searchPhotos = (value) => {
  fetch(`http://localhost:8080/photographer/search?location=${value}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      display(res.data);
    })
    .catch((err) => console.log(err));
};

searchInput.addEventListener("input", (event) => {
  const { value } = event.target;
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => {
    searchPhotos(value);
  }, 300);
});

const high = () => {
  fetch("http://localhost:8080/photographer/high")
    .then((res) => res.json())
    .then((res) => {
      //    console.log(res)
      display(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
const low = () => {
  fetch("http://localhost:8080/photographer/low")
    .then((res) => res.json())
    .then((res) => {
      //    console.log(res)
      display(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
const select = (e) => {
  console.log(e.target.value);
  if (e.target.value == "") {
    getdata();
  } else if (e.target.value == "low") {
    low();
  } else {
    high();
  }
};
const getdata = () => {
  fetch("http://localhost:8080/photographer/")
    .then((res) => res.json())
    .then((res) => {
      // console.log("hello");
      //    console.log(res)
      display(res.data);
    })
    .catch((err) => console.log(err));
};

function display(data) {
    photo_data.innerHTML = null;
  data.forEach((element) => {
    //   console.log(element)
   let card_img=document.createElement("div")
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
    photo_data.append(card_img,card_info);
  });
}

search.addEventListener("change", searchPhotos);
select1.addEventListener("change", select);
window.addEventListener("load", getdata);
