function updateProgressBar(progressBar, value){
  value = Math.round(value);
  progressBar.querySelector(".progress-fill").style.width = `${value}%`;
  progressBar.querySelector(".progress-text").textContent = `${value}%`;
}

const myProgressBar = document.querySelector(".progress");

updateProgressBar(myProgressBar, 72);   //how to update progressbar example number 




const taskList = document.getElementsByClassName("list-group-item"); 
console.log(taskList);
console.log(taskList.length);   // ???? does not work gives 0 for collection
console.log(taskList.item(0));

var task = taskList[0].getElementsByTagName("input"); // ???? does not work  should have give first item on list

// const task = taskList[0].getElementsByTagName("input")[0].checked;
console.log(task);


function completion(){
}