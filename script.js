import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";
  //loads answers and loads the three dots that will show; this will repeat every 300 milliseconds
  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}
//this function makes the letters of the answers appear
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//create a unique id to map over them; using a timestamp and function to create a random number I get a unique id
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//creating a function for the different lines of chat

function chatStripe(isAi, value, uniqueId) {
  return ( `
    <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
    <div className="profile">
    <img src="${isAi ? bot : user}"
    alt="${isAi ? 'bot' : 'user'}"
    />
    </div>
    <div class="message" id=${uniqueId}>${value}></div>
    </div>
    </div>
    `);
}

//creates the submission to get the AI response
//prevents the reload of the browser
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();
  //this clears the form

  //bot's chatstripe

  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  //puts message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);


}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e); 
  }
})
