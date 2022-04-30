$(function () {
    var tasksList = new Array();
    var learnList = new Array();
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

        addUI(ul, value, 1)
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
            // var txt = document.createTextNode("\u00D7");
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.checked = 0;
            checkbox.id = "id";
    
                span.className = "check1";
                // span.appendChild(checkbox);
                li.appendChild(checkbox);
                li.appendChild(span);
    
                // $(".check1").click(function () {
                //     var index = $(this).index(".check1");
                //     console.log(index);
                //     var div = this.parentElement;
                //     div.style.setProperty("text-decoration","line-through")
                    
                // })
                $("li").on("click", "li", function(){
                    $(this).wrap("<strike>");
                });
                ul.appendChild(li);
        }

        }

        $('#addButtonTask').click(function () {
            
    
        });
        // for remove finished button
                    // div.style.display = "none";
                    // removeItem(index);
                    // $(".check1").eq(index).remove();

        function removeItem(itemIndex) {
            console.log("removeitem");
            chrome.storage.sync.get(['list1'], function (val) {
                tasksList = val.list1;
                tasksList.splice(itemIndex, 1);
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