$(function () {
    // chrome.storage.sync.set({
    //                     'list': []
    //                 })
    var tasksList = new Array();
    var checkedList = {};
    try {
        chrome.storage.sync.get(['list'], function (val) {
        if (val.list.length > 0)
            tasksList = val.list;
        for (var i = 0; i < tasksList.length; i++) {
            addListItem(tasksList[i]);
        }

        })
    }
    catch(err){
        tasksList = [];
    }   


    $('#addButtonTask').click(function () {

        var newTask = {text:$('#taskInput').val(), checked: false};
        console.log(newTask)
        //adding the new item to tasklist array
        tasksList.push(newTask);
        chrome.storage.sync.set({
            'list': tasksList
        })
        console.log(tasksList);
        addListItem(newTask);
        //adding the new list back to chrome storage
        
    });



    function addListItem(task) {
        document.getElementById("taskInput").value = "";
        var ul = document.getElementById("todo-listUl");

        addUI(ul, task)
    }



    function addUI(ul, task) {
        if (task === '') {
            //do nothing
            //alert("You must write something!");
        } else {
            var li = document.createElement("li");
            $("li").addClass("taskitem");
            var text = document.createTextNode(task.text);
            li.appendChild(text);
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            $("input[type='checkbox']").addClass("taskcheckbox")
            task.checked = checkbox.checked;
            li.appendChild(checkbox);
            ul.appendChild(li);
            // $("ul").off().on('change',".taskcheckbox",function () {
                $(".taskcheckbox").unbind().click(function () {

                var index = $(this).index(".taskcheckbox");
                console.log(index);
                console.log(tasksList);
                // console.log(tasksList[index]);
                tasksList[index].checked = $(this).prop("checked");
                // console.log(tasksList[index]);
            })
            }
    }
    function getCheckedCount() {
        var obj = $("ul").find(':checkbox');
        var checkedCount =  obj.filter(':checked').length;
        return checkedCount;
    }

    $('#removeDoneTask').click(function () {
        for (let k in tasksList){
            console.log("checked in tasklist"+tasksList[parseInt(k)].checked);
            if(tasksList[parseInt(k)].checked == true){
                tasksList.splice(parseInt(k),1);
                chrome.storage.sync.set({
                    'list': tasksList
                })
                console.log("new tasklist afterbeing spliced and stored:"+tasksList);

            }
        }
        if (tasksList.length ==0){
            document.getElementById("todo-listUl").innerHTML = "";
        }
        document.getElementById("todo-listUl").innerHTML = "";
        for (var i = 0; i < tasksList.length; i++) {
            addUI(document.getElementById("todo-listUl"),tasksList[i]);
        }
    });
 

    //     function setDate() {
    //         var todayDate = new Date();
    //         console.log(todayDate);
    //         var locale = "en-us";
    //         var month = todayDate.toLocaleString(locale, {month: "long"});
    //         var day = todayDate.toLocaleString(locale, {weekday: "long"});

    //         document.getElementById('date').innerHTML = "Task checklist for " + day + ", " + todayDate.getDate() + " "
    //             + month;
    //     }
        
    //     function updateProgressBar(progressBar, value){
    //         value = Math.round(value);
    //         progressBar.querySelector(".progress-fill").style.width = `${value}%`;
    //         progressBar.querySelector(".progress-text").textContent = `${value}%`;
    //     }
        
        // const myProgressBar = document.querySelector(".progress");
        
        // updateProgressBar(myProgressBar, 72);   //how to update progressbar example number
        // console.log(tasksList);
        // console.log(tasksList.length);   // ???? does not work gives 0 for collection
        // console.log(tasksList[0]);

        // // var task = taskList[0].getElementsByTagName("input"); // ???? does not work  should have give first item on list

        // // const task = taskList[0].getElementsByTagName("input")[0].checked;
        // // console.log(task);


        // function completion(){
        // }
    })


