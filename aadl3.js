const player = require("play-sound");
const sound = player();

let isRunning = false;
let retryCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", () => {
    isRunning = true;
    retryCount = 0;
    toggleButtons();
    makeRequest();
  });

  stopButton.addEventListener("click", () => {
    isRunning = false;
    toggleButtons();
  });
});

function toggleButtons() {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const responseElement = document.getElementById("response");
  const retryMessage = document.getElementById("retryMessage");

  startButton.disabled = isRunning;
  startButton.setAttribute("aria-busy", isRunning);
  stopButton.disabled = !isRunning;
  if (!isRunning) {
    responseElement.innerHTML = "";
    retryMessage.innerHTML = "";
  }
}
const headers = new Headers({
  "content-type": "application/x-www-form-urlencoded",
  cookie:
    "cookiesession1=678A3E144B1A9B57793FB32FA8A19977; PHPSESSID=o2cgnhppekmkgor3jpm0pb2mg3; wbNavigateurLargeur=1426",
});
const url = "https://aadl3inscription2024.dz/AR/Inscription-desktop.php";

async function makeRequest() {
  if (!isRunning) return;

  const a22 = document.getElementById("a22").value;
  const a27 = document.getElementById("a27").value;
  const a13 = document.getElementById("a13").value;
  const a17 = document.getElementById("a17").value;

  const responseElement = document.getElementById("response");
  const retryMessage = document.getElementById("retryMessage");
  let retryInterval = parseInt(
    document.getElementById("retryInterval").value,
    10
  );
  let maxRetries = parseInt(document.getElementById("maxRetries").value, 10);
  let cookie = document.getElementById("cookie").value;

  const formData = {
    WD_ACTION_: "AJAXPAGE",
    EXECUTE: 16,
    WD_CONTEXTE_: "A138",
    WD_BUTTON_CLICK_: "",
    WD_JSON_PROPRIETE_:
      '{"m_oProprietesSecurisees":{"A12":{"118":2}},"m_oChampsModifies":{},"m_oVariablesProjet":{},"m_oVariablesPage":{}}',
    A17: a17,
    A22: a22,
    A27: a27,
    A13: a13,
    A64: "213+",
    A33: "xxxxxx",
    A79: "",

    "A91[]": "",
    "A91[]": "1",
    A62: "15",
    A82: "300.00",
    A83: "300.00",
    "A7[]": "",
    A5: "",
    A10: "0",
    A65: "",
    A108: "1",
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, retryInterval); // Set a timeout of 5 seconds

  try {
    if (!a22 || !a27 || !a13 || !a17) {
      throw Error("المعلومات ناقصة");
    } else {
      responseElement.innerHTML = "";
    }
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(formData).toString(),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const text = await response.text();

    // Play sound and show notification if data is good
    if (text) {
      responseElement.innerHTML = text;
      sound.play("./notification.wav", (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
      });
      isRunning = false; // Stop further requests
      toggleButtons();

      return; // Exit the function
    }
  } catch (error) {
    clearTimeout(timeout);
    if (
      (error.name === "AbortError" || error.code === "ETIMEDOUT") &&
      retryCount < maxRetries
    ) {
      retryCount++;
      retryMessage.innerHTML = `اعادة المحاولة رقم... (${retryCount})`; // Show retry message
      setTimeout(() => {
        // retryMessage.innerHTML = ""; // Clear the message after a short delay
        makeRequest(); // Wait 1 second before retrying
      }, 1000); // Delay before retrying
    } else {
      responseElement.innerHTML = error;
      retryMessage.innerHTML = ""; // Clear the message if not retrying
      isRunning = false;
      toggleButtons();
    }
  }
}
