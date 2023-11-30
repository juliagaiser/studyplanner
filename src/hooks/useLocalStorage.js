export function useLocalStorage() {
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getItem(key) {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  }

  return {
    setItem,
    getItem,
  };
}
