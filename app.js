const button = document.querySelector(".start");
const quot = document.querySelector(".quot");
const quotDiv = document.querySelector(".quotDiv");
const input = document.querySelector(".textarea");
let seconds = 0;
let typingFinished = false;

button.addEventListener("click", fetchaQuote);
window.addEventListener("load", loadFunction);
async function loadFunction() {
  const req = await fetch("https://quots.glitch.me/quots/random");
  let res = await req.json();
  console.log(res);
}

function typingStarted() {
  const quotSpans = document.querySelectorAll(".spans");
  let value = input.value;
  const inputSpan = value.split("");

  for (i = 0; i < quotSpans.length; i++) {
    let inputs = inputSpan[i];

    if (inputs == null) {
      quotSpans[i].classList.add("span");
      //   typingFinished=false
    } else if (quotSpans[i].textContent === inputs) {
      quotSpans[i].classList.add("correct");
      quotSpans[i].classList.remove("wrong");
      // typingFinished=false
    } else {
      quotSpans[i].classList.add("wrong");
      quotSpans[i].classList.remove("correct");
      // typingFinished=false
    }
  }
  if (quotSpans.length === inputSpan.length) {
    typingFinished = true;
  }
  if (typingFinished) {
    typingFinished = false;
    const result = document.querySelector(".result");
    result.style.display = "block";

    //calling the measure speed function

    let typedChar = quotSpans.length;
    let time = seconds;
    console.log(seconds);
    let calledFunction = measureSpeed(typedChar, time);
    console.log(typedChar, calledFunction);
    fetchaQuote();
  }
  input.addEventListener("input", () => {
    return true;
  });
}

async function fetchaQuote() {
  quot.innerHTML = null;
  input.value = null;

  let url = "https://quots.glitch.me/quots/random";
  const request = await fetch(url);
  const response = await request.json();
  console.log(response);

  let randomIndex = Math.floor(Math.random() * response.length);

  const responseQuot = response.text;
  const onespan = responseQuot.split("");

  for (i = 0; i < onespan.length; i++) {
    const span = document.createElement("span");
    const node = document.createTextNode(onespan[i]);
    span.appendChild(node);
    quot.appendChild(span);
    span.classList.add("spans");
  }
  //calling the function after the button is pressed
  input.addEventListener("input", typingStarted);
  typingStarted();
  if (typingStarted()) {
    setInterval(() => {
      let d = new Date();
      let sec = d.getSeconds();
      console.log(sec);
    }, 1000);
  }
}

function measureSpeed(charTyped, time) {
  let speed = (charTyped * 60) / (5 * time);
  return speed;
}
