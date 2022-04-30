function updateProgressBar(progressBar, value){
  value = Math.round(value);
  progressBar.querySelector(".progress-fill").style.width = `${value}%`;
  progressBar.querySelector(".progress-text").textContent = `${value}%`;
}

const myProgressBar = document.querySelector(".progress");

updateProgressBar(myProgressBar, 72);   //how to update progressbar example number 