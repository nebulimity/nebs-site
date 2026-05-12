const messages = [
  "this is \n a website \n i think",
  // "i make \n games \n and stuff",
  "text 1 \n text 2 \n text 3",
  "hi",
  "welcome",
];

const randomIndex = Math.floor(Math.random() * messages.length);

const homeText = document.querySelector("#home-text");
homeText.textContent = messages[randomIndex];
