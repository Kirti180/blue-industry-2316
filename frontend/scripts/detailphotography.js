let detail_main=document.getElementById("detail_main")
const data=JSON.parse(localStorage.getItem("element"))
let title =document.getElementById("title")
let location_detail =document.getElementById("location_detail")
let charges =document.getElementById("charges")
let workingtime =document.getElementById("workingtime")
let address =document.getElementById("address")
let contact =document.getElementById("contact")
let detail_img =document.getElementById("detail_img")
let image = document.createElement("img");
// const occasionData = data.occasion;
// let occasionsList = document.createElement('ul');
// let occasionsContainer = document.getElementById('occasions-container');
// occasionData.map((occasion) => {
//     let occasionListItem = document.createElement('li');
//     let occasionName = document.createElement('h3');
//     occasionName.innerText = "Occasion : "+occasion.name;
//     occasionListItem.appendChild(occasionName);
  
//     let slotsList = document.createElement('ul');
//     occasion.slots.map((slot) => {
//       let slotListItem = document.createElement('li');
  
//       if (slot.booked) {
//         slotListItem.innerText = `${slot.time} - Booked`;
//       } else {
//         let bookButton = document.createElement('button');
//         bookButton.innerText = `Book ${slot.time}`;
//         bookButton.addEventListener('click', async () => {
//             slot.booked = true;
//             // Update the backend schema with the new data
//             try {
//               const response = await fetch(`https://faithful-ox-sock.cyclic.app/update/${data._id}/occasions/${occasion.name}/slots/${slot.time}`, {
//                 method: 'PATCH',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   Authorization:JSON.parse(localStorage.getItem("phototoken"))
//                 },
//                 body: JSON.stringify({
//                   booked: true
//                 })
//               });
//               if (!response.ok) {
//                 throw new Error('Failed to update slot');
//               }
//               slotListItem.innerText = `${slot.time} - Booked`;
//               bookButton.disabled = true;
//             } catch (err) {
//               console.error(err);
//               alert('Failed to update slot');
//             }
//           });
//         slotListItem.appendChild(bookButton);
//       }
  
//       slotsList.appendChild(slotListItem);
//     });
  
//     occasionListItem.appendChild(slotsList);
//     occasionsList.appendChild(occasionListItem);
//   });
image.setAttribute("src", data.image);
detail_img.append(image)
title.innerHTML=data.title
location_detail.innerText="Location : "+data.location
charges.innerText="₹ "+data.charges
workingtime.innerText="Working-Time : "+data.workingtime
address.innerText="Address : "+data.address
contact.innerText="Contact : "+data.contact
//occasionsContainer.appendChild(occasionsList);
