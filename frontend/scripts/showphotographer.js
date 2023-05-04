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
    let title = document.createElement("h2");
    let price= document.createElement("h1")
    let location= document.createElement("h2")
    
    title.innerText = element.title;
    price.innerText=element.charges
    location.innerText=element.location
    photo_data.append(title,price,location);
  });
}

search.addEventListener("change", searchPhotos);
select1.addEventListener("change", select);
window.addEventListener("load", getdata);
