const userText = document.getElementById("userText");
const btn = document.getElementById("btn");
const langNames = document.getElementById("langNames");
const playPauseBtn = document.getElementById("playPauseBtn");

if ("speechSynthesis" in window) {
  const speech = window.speechSynthesis;
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.innerText = `${voice.voiceURI}`;
      langNames.appendChild(option);
    });
  };
  btn.addEventListener("click", () => {
    const value = new SpeechSynthesisUtterance(userText.value);
    speech.speak(value);
    if (speech.speaking === true) {
      playPauseBtn.classList.add("fa-pause");
      playPauseBtn.classList.remove("fa-play");
    }
    setInterval(() => {
      if (speech.speaking === false) {
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");
        clearInterval();
      }
    }, 1000);
  });

  langNames.addEventListener("change", () => {
    speech.voice = langNames.value;
  });
} else {
  console.log("Text-to-speech not supported.");
}
