let search = document.getElementById("search");
let select1 = document.getElementById("select");
let photo_data = document.getElementById("show-photo-data");
const search1 = (e) => {
  setTimeout(() => {
    fetch(
      `http://localhost:8080/photographer/search?title=${e.target.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        display(res.data);
      })
      .catch((err) => console.log(err));
  }, 300);
};
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
    title.innerText = element.title;
    price.innerText=element.charges
    photo_data.append(title,price);
  });
}

search.addEventListener("change", search1);
select1.addEventListener("change", select);
window.addEventListener("load", getdata);
