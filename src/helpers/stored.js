// local storage

export function getStorageData(key, blank = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) || blank;
  } catch (e) {
    console.log("Cannot get local storage data");
    return blank;
  }
}

export function setStorageData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Cannot set local storage data");
  }
}

export function removeStorageData(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log("Cannot remove");
  }
}

export function getSessionStorageData(key, blank = {}) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) || blank;
  } catch (e) {
    console.log("Cannot get session storage data");
    return blank;
  }
}

// session storage

export function setSessionStorageData(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Cannot set session storage data");
  }
}

export function removeSessionStorageData(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {
    console.log("Cannot remove session storage data");
  }
}
