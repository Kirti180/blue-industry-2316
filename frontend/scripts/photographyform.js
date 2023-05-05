const photography_register = async () => {
  const occasions = [...document.querySelectorAll('[name="occasions[]"]')].map(
    (el) => {
      return {
        name: el.value,
        slots: [...el.parentNode.querySelectorAll('[name="time[]"]')].map(
          (slot) => {
            return {
              time: slot.value,
            };
          }
        ),
      };
    }
  );

  const payload = {
    email: document.getElementById("email").value,
    pass: document.getElementById("pass").value,
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    occasion: occasions,
    address: document.getElementById("address").value,
    charges: document.getElementById("charges").value,
    location: document.getElementById("location").value,
    workingtime: document.getElementById("workingtime").value,
    contact: document.getElementById("contact").value,
  };

  console.log(payload);

  await fetch("http://localhost:8080/photographer/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

let occasionCount = 0;

function addOccasion() {
  occasionCount++;
  const div = document.createElement("div");
  div.innerHTML = `<label for="occasion_${occasionCount}">Occasion:</label>
                     <input type="text" id="occasion_${occasionCount}" name="occasions[]">
                     <div class="slots">
                       <div class="slot">
                         <label for="time_${occasionCount}_0">Time:</label>
                         <input type="text" id="time_${occasionCount}_0" name="time[]">
                       </div>
                     </div>
                     <button type="button" onclick="addSlot(${occasionCount})">Add Slot</button><br>`;
  document.getElementById("occasions").appendChild(div);
}

function addSlot(occasionIndex) {
  const occasionDiv = document.getElementById(
    `occasion_${occasionIndex}`
  ).parentNode;
  const slotCount = occasionDiv.querySelectorAll(".slot").length;
  const div = document.createElement("div");
  div.innerHTML = `<div class="slot">
                       <label for="time_${occasionIndex}_${slotCount}">Time:</label>
                       <input type="text" id="time_${occasionIndex}_${slotCount}" name="time[]">
                     </div>`;
  occasionDiv.querySelector(".slots").appendChild(div);
}
