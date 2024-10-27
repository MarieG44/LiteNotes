document.addEventListener('DOMContentLoaded', () => {
    const noteArea = document.getElementById('noteArea');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const status = document.getElementById('status');
  
    // Get the current active tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab.url;
  
      // Retrieve existing note for this URL
      chrome.storage.sync.get([url], (result) => {
        if (result[url]) {
          noteArea.value = result[url];
        }
      });
    });
  
    // Save the note
    saveBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
        const note = noteArea.value;
  
        let data = {};
        data[url] = note;
  
        chrome.storage.sync.set(data, () => {
          status.textContent = 'Note saved!';
          setTimeout(() => {
            status.textContent = '';
          }, 2000);
        });
      });
    });
  
    // Delete the note
    deleteBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
  
        chrome.storage.sync.remove(url, () => {
          noteArea.value = '';
          status.textContent = 'Note deleted!';
          setTimeout(() => {
            status.textContent = '';
          }, 2000);
        });
      });
    });
  });
  