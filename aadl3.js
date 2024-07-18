const player = require("play-sound");
const sound = player();
const { ipcRenderer } = require('electron');

let isRunning = false;
let retryCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const addDataButton = document.getElementById("addDataButton");
  const showDataButton = document.getElementById("showData");
  const saveNewDataButton = document.getElementById("saveNewDataButton");
  const saveUpdateDataButton = document.getElementById("saveUpdateDataButton");

  const NINField = document.getElementById("a22");
  const TELField = document.getElementById("a13");

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

  addDataButton.addEventListener("click", () => {
    const addDataModal = new bootstrap.Modal(document.getElementById('addDataModal'));
    addDataModal.show();
  });

  saveNewDataButton.addEventListener("click", async () => {
    const newData = collectNewFormData();
    const data = {
      NOM: newData.NOM,
      WIL: newData.WIL,
      NIN: newData.NIN,
      NSS: newData.NSS,
      TEL: newData.TEL,
      processed: false,
    }

    await ipcRenderer.invoke("add-data", data);
    alert("Data added successfully!");
    const addDataModal = bootstrap.Modal.getInstance(document.getElementById('addDataModal'));
    addDataModal.hide();
    showDataButton.click();
  });

  saveUpdateDataButton.addEventListener("click", async () => {
    const updatedData = collectUpdateFormData();
    await ipcRenderer.invoke("update-data", updatedData);
    alert("Data updated successfully!");
    const updateDataModal = bootstrap.Modal.getInstance(document.getElementById('updateDataModal'));
    updateDataModal.hide();
    showDataButton.click();
  });

  showDataButton.addEventListener("click", () => {
    ipcRenderer.invoke("get-data").then((data) => {
      const cardsContainer = document.getElementById("cardsContainer");
      cardsContainer.innerHTML = ''; // Clear existing cards
      data.forEach((item) => {
        const card = `
        <div class="card mb-3">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${item.NOM}</h6>
            <p class="card-text">${item.WIL} <span style="cursor: pointer;">📋</span></p>
            <p class="card-text text-primary">${item.NIN} <span style="cursor: pointer;">📋</span></p>
            <p class="card-text">${item.NSS} <span style="cursor: pointer;">📋</span></p>
            <p class="card-text">${item.TEL} <span style="cursor: pointer;">📋</span></p>
            <button class="btn btn-warning btn-sm update-btn" data-nom="${item.NOM}" data-wil="${item.WIL}" data-nin="${item.NIN}" data-nss="${item.NSS}" data-tel="${item.TEL}">تعديل</button>
            <button class="btn btn-danger btn-sm delete-btn" data-nin="${item.NIN}">حذف</button>
            <button class="btn btn-primary btn-sm select-btn" data-nom="${item.NOM}" data-wil="${item.WIL}" data-nin="${item.NIN}" data-nss="${item.NSS}" data-tel="${item.TEL}">اختيار</button>
          </div>
        </div>
        `;
        cardsContainer.insertAdjacentHTML("beforeend", card);
      });

      document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
          document.getElementById('updateNom').value = event.target.getAttribute('data-nom');
          document.getElementById('updateWil').value = event.target.getAttribute('data-wil');
          document.getElementById('updateNin').value = event.target.getAttribute('data-nin');
          document.getElementById('updateNss').value = event.target.getAttribute('data-nss');
          document.getElementById('updateTel').value = event.target.getAttribute('data-tel');
          updateDataModal.show();
        });
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
          const NIN = event.target.getAttribute('data-nin');
          if (confirm("هل أنت متأكد أنك تريد حذف هذه البيانات؟")) {
            await ipcRenderer.invoke("delete-data", NIN);
            alert("Data deleted successfully!");
            showDataButton.click();
          }
        });
      });

      document.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          document.getElementById("a17").value = parseInt(event.target.getAttribute('data-wil'), 10) + 1;
          document.getElementById("a22").value = event.target.getAttribute('data-nin');
          document.getElementById("a27").value = event.target.getAttribute('data-nss');
          document.getElementById("a13").value = event.target.getAttribute('data-tel');
          const modal = bootstrap.Modal.getInstance(document.getElementById('showDataModal'));
          modal.hide();
        });
      });

      const modal = new bootstrap.Modal(document.getElementById('showDataModal'));
      modal.show();
    });
  });
});

function toggleButtons() {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.disabled = isRunning;
  startButton.setAttribute("aria-busy", isRunning);
  stopButton.disabled = !isRunning;
}

function collectFormData() {
  return {
    NOM: document.getElementById("a22").value,
    WIL: document.getElementById("a17").value,
    NIN: document.getElementById("a22").value,
    NSS: document.getElementById("a27").value,
    TEL: document.getElementById("a13").value,
  };
}

function collectNewFormData() {
  return {
    NOM: document.getElementById("newNom").value,
    WIL: document.getElementById("newWil").value,
    NIN: document.getElementById("newNin").value,
    NSS: document.getElementById("newNss").value,
    TEL: document.getElementById("newTel").value,
  };
}

function collectUpdateFormData() {
  return {
    NOM: document.getElementById("updateNom").value,
    WIL: document.getElementById("updateWil").value,
    NIN: document.getElementById("updateNin").value,
    NSS: document.getElementById("updateNss").value,
    TEL: document.getElementById("updateTel").value,
  };
}

async function loadData() {
  const data = await ipcRenderer.invoke("get-data");
  return data;
}

let dataQueue = [];

async function initializeDataQueue() {
  const data = await loadData();
  dataQueue = data.filter(item => !item.processed);
}

async function saveResponse(NIN, TEL, text) {
  await ipcRenderer.invoke("save-response", { NIN, TEL, responseText: text });
}

function markDataAsProcessed(NIN) {
  dataQueue = dataQueue.map(item => {
    if (item.NIN === NIN) {
      return { ...item, processed: true };
    }
    return item;
  });
}

async function makeRequest() {
  if (!isRunning) return;

  if (dataQueue.length === 0) {
    await initializeDataQueue();
  }

  const currentData = dataQueue.find(item => !item.processed);

  if (!currentData) {
    console.log("All data processed.");
    isRunning = false;
    toggleButtons();
    return;
  }

  document.getElementById("a22").value = currentData.NIN;
  document.getElementById("a27").value = currentData.NSS;
  document.getElementById("a13").value = currentData.TEL;
  document.getElementById("a17").value = parseInt(currentData.WIL, 10) + 1;



  const formData = {
    NOM: currentData.NOM,
    WIL: currentData.WIL,
    NIN: currentData.NIN,
    NSS: currentData.NSS,
    TEL: currentData.TEL,
  };

  const responseElement = document.getElementById("response");
  const retryMessage = document.getElementById("retryMessage");
  let retryInterval = parseInt(document.getElementById("retryInterval").value, 10);
  let maxRetries = parseInt(document.getElementById("maxRetries").value, 10);
  let cookie = document.getElementById("cookie").value;

  const postData = {
    WD_ACTION_: "AJAXPAGE",
    EXECUTE: 16,
    WD_CONTEXTE_: "A138",
    WD_BUTTON_CLICK_: "",
    WD_JSON_PROPRIETE_: '{"m_oProprietesSecurisees":{"A12":{"118":2}},"m_oChampsModifies":{},"m_oVariablesProjet":{},"m_oVariablesPage":{}}',
    A17: formData.WIL,
    A22: formData.NIN,
    A27: formData.NSS,
    A13: formData.TEL,
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
    controller.abort("الحد الأقصى للانتظار");
  }, retryInterval);

  try {
    const response = await fetch("https://aadl3inscription2024.dz/AR/Inscription-desktop.php", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": encodeURIComponent(cookie), // تأكد من ترميز القيمة بالشكل المناسب
      },
      body: new URLSearchParams(postData).toString(),
      signal: controller.signal,
    });
   

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const text = await response.text();

    if (text) {
      responseElement.innerHTML = text;
      sound.play("./notification.wav", (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
      });

      await saveResponse(formData.NIN, formData.TEL, text);
      markDataAsProcessed(formData.NIN);

      makeRequest();
    }
  } catch (error) {
    clearTimeout(timeout);
    retryCount++;
    responseElement.innerHTML = error;
    retryMessage.innerHTML = `اعادة المحاولة رقم... (${retryCount})`;
    setTimeout(() => {
      makeRequest();
    }, 1000);
  }
}
