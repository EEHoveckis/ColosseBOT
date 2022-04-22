export function GetDarkMode() {
  if (JSON.parse(localStorage.getItem("__MODE_DARK__") || "")) return true;
  else false;
}
export function UpdateDarkMode(enabled: boolean) {
  localStorage.setItem("__MODE_DARK__", JSON.stringify(enabled));
}
