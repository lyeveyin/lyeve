const clickArea = document.getElementById("clickArea");

clickArea.addEventListener("click", () => {
  document.body.classList.add("big-cursor");
  setTimeout(() => {
    document.body.classList.remove("big-cursor");
  }, 1000);
});
