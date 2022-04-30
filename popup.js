$(function () {
    var tasksList = new Array();
    var checkedList = {};
    chrome.storage.sync.get(['list1'], function (val) {
        if (val.list1.length > 0)
            tasksList = val.list1;
        console.log("val.list1 :" + val.list1);
        //displaying the old items
        for (var i = 0; i < tasksList.length; i++) {
            addListItem(tasksList[i]);
        }

    })


    $('#addButtonTask').click(function () {

        var newTask = $('#taskInput').val();
        //adding the new item to tasklist array
        tasksList.push(newTask);
        console.log("tasksList under click :" + tasksList);
        addListItem(newTask);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list1': tasksList
        })


    });



    function addListItem(value) {
        console.log("addListItem");
        document.getElementById("taskInput").value = "";
        var ul = document.getElementById("todo-listUl");

        addUI(ul, value)
    }



    function addUI(ul, value) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        var text = document.createTextNode(value);
        li.appendChild(text);

        if (value === '') {
            //do nothing
            //alert("You must write something!");
        } else {
            
            var span = document.createElement("SPAN");
            span.className = "check1";
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.yes = false;
            checkbox.checked = false;
            checkbox.id = "id";
    
            span.appendChild(checkbox);
            // li.appendChild(checkbox);
            li.appendChild(span);
            $(".check1").unbind().click(function () {
                var index = $(this).index(".check1");
                
                $(this).find(':checkbox').prop('yes', !($(this).find(':checkbox').prop('yes')) );
                if($(this).find(':checkbox').prop('yes')){
                    checkedList[index] = true;
                } else{
                    checkedList[index] = false;
                }
                // console.log(checkedList);

            })
            ul.appendChild(li);

            }
    }


        var obj = $("ul").find(':checkbox');
        var checkedCount =  obj.filter(':checked').length;
        console.log(checkedCount);


        $('#removeDoneTask').click(function () {
            if (!($.isEmptyObject(checkedList)) ){
                for (let k in checkedList){
                    let item = checkedList[k] 
                    // if(checkedList[k]){
                        var div = this.parentElement;
                        // div.style.display = "none";
                        removeItem(k);
                        let checkBox = $(".check1").eq(k).children("input");
                            console.log(checkBox.get(0));
                            console.log(checkBox.prop("checked"));
                            if(checkBox.prop("checked")){
                                let listItem = checkBox.parent().parent();
                                listItem.remove();
                            }
                    console.log(k);
                }
            }
        });
        // for remove finished button
                    // div.style.display = "none";
                    // removeItem(index);
                    // $(".check1").eq(index).remove();

        function removeItem(itemIndex) {
            console.log("removeitem");
            chrome.storage.sync.get(['list1'], function (val) {
                tasksList = val.list1;
                // tasksList.splice(itemIndex, 1);
                // tasksList.remove(itemIndex);
                console.log(itemIndex);
                console.log("new list", tasksList);

                chrome.storage.sync.set({
                    'list1': tasksList
                })

            })

        }


        function setDate() {
            var todayDate = new Date();
            console.log(todayDate);
            var locale = "en-us";
            var month = todayDate.toLocaleString(locale, {month: "long"});
            var day = todayDate.toLocaleString(locale, {weekday: "long"});

            document.getElementById('date').innerHTML = "Task checklist for " + day + ", " + todayDate.getDate() + " "
                + month;
        }
    }

)



// function countItems(){

//     for (let k in checkedList){
//         let item = checkedList[k] 
//         // if(checkedList[k]){
//             var div = this.parentElement;
//             // div.style.display = "none";
//             removeItem(k);
//             let checkBox = $(".check1").eq(k).children("input");
//                 console.log(checkBox.get(0));
//                 console.log(checkBox.prop("checked"));
//                 if(checkBox.prop("checked")){
//                     let listItem = checkBox.parent().parent();
//                     listItem.remove();
//                 }
        

//         console.log(k);
//     }
// }