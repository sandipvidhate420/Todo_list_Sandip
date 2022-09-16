var todo = (function () {// immediatly involed function . scope of all below variables are limited to this function not global scope so it will ot override anything from global scoe
    //it creates anothe EC so outside this we cant access anything

    // two todo list for display only
    let tasks = [];
    const task1 = {
        title: "Complete the Major nodeJs Project",
        id: Date.now().toString(),
        completed: false

    }
    tasks.push(task1);
    const task2 = {
        title: "Complete your Portfolio",
        id: Date.now().toString(),
        completed: false

    }
    tasks.push(task2);


    let a = 1;
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    const del = document.getElementsByClassName('delete');

    /* uncooment this line to use below function
    async function fetchTodos() {
        //for get method and getch gave the dummy promise
        /*fetch("https://jsonplaceholder.typicode.com/todos").then(function (response) {//fetch return promise so use  then to collect resonse
            return response.json();//this return again promise so use  then
        }).then(function (data) {
            tasks = data.slice(0, 10);
            renderList();
            console.log(data.slice(0, 10));
        }).catch(function (error) {
            console.log('error: ', error);

        }) // add comment for function
        //using async await 
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        }
        catch (error) {//if any error the it will catch in catch block
            console.log('error: ', error);
        }

    


    }*/ //end of function
    function addTaskToDom(task) {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="radio" id="${task.id}" ${task.completed ? 'checked ' : ''}data-id="${task.id}" class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="img/circle-xmark.svg" class="delete" data-id="${task.id}" />
            `
        taskList.append(li);

    }
    function renderList(type) {
        taskList.innerHTML = "";
        if (type == "all") {
            for (let task of tasks) {
                addTaskToDom(task);
            }
            tasksCounter.innerHTML = tasks.length;
            return;
        }
        else if (type == "completed") {
            let completedTask = tasks.filter(function (task) {
                return task.completed == true;
            })
            for (let task of completedTask) {
                addTaskToDom(task);
            }
            tasksCounter.innerHTML = completedTask.length;
            return;

        }
        else if (type == "uncompleted") {
            let unCompletedTask = tasks.filter(function (task) {
                return task.completed == false;
            })
            for (let task of unCompletedTask) {
                addTaskToDom(task);
            }
            tasksCounter.innerHTML = unCompletedTask.length;
            return;

        } else {
            for (let task of tasks) {
                addTaskToDom(task);
            }
            tasksCounter.innerHTML = tasks.length;
        }


    }

    function completeAllTask(toggle) {
        // let newTasks = tasks.filter(function (task) {
        //     return task.id == taskId;
        // });
        let newTasks = tasks;
        for (let task of tasks) {
            task.completed = toggle
            renderList();

        }
        if (toggle) {
            showNotification(" ALL Task Completed successfully..");
        }

        else {
            showNotification(" ALL Task Cleared successfully..");
        }


        // for (let task of tasks) {
        //     if (task.id == taskId) {
        //         task.done = true;
        //     }

        // }
        console.log(tasks);
    }

    function toggleTask(taskId) {
        let newTasks = tasks.filter(function (task) {
            return task.id == taskId;
        });
        if (newTasks.length > 0) {
            let currentTask = newTasks[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification("Task Toggle successfully.."); return;

        }
        // for (let task of tasks) {
        //     if (task.id == taskId) {
        //         task.done = true;
        //     }

        // }
        console.log(tasks);
    }

    function deleteTask(taskId) {
        console.log('taskId: ', taskId);
        let newTasks = tasks.filter(function (task) {
            return task.id != taskId;
        });
        tasks = newTasks;
        renderList();
        showNotification("Task Deleted successfully..");

    }

    function addTask(task) {
        if (task) {
            //add to json
            fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            }).then(function (response) {
                return response.json();//this return again promise so use  then
            }).then(function (data) {
                tasks.push(task);
                renderList();
                showNotification("Task added successfully..");
            }).catch(function (error) {
                console.log('error: ', error);

            })

            // tasks.push(task);
            // renderList();
            // showNotification("Task added successfully..");
            // return;
        }
        else
            showNotification("Task can not be added");
        // taskList.innerHTML += `<li>${task.title}</li>`

    }

    function showNotification(text) {
        alert(text);
    }

    function HandleInputKeyPress(event) {
        if (event.key == "Enter") {
            // const text = event.target.value;//addTaskInput.value;
            const text = addTaskInput.value;
            console.log('text: ', text);
            if (!text) {
                const msg = "Task Text cannot be Empty";
                showNotification(msg);
                return;
            }
            const task = {
                title: text,
                id: Date.now().toString(),
                completed: false

            }
            addTask(task);
            addTaskInput.value = "";


        }

    }
    let checkedALL = document.getElementById('checked-all')
    let doubleTick = checkedALL.querySelector('i');
    let clearedALL = document.getElementById('clear-all');
    let displayAll = document.getElementById('all');
    let uncompleted = document.getElementById('uncompleted');
    let completed = document.getElementById('completed');
    renderList();

    function handleClick(event) {
        const click = event.target;
        //set default color
        clearedALL.style.color = "#797a7e";
        displayAll.style.color = "#797a7e";
        uncompleted.style.color = "#797a7e";
        completed.style.color = "#797a7e";

        if (click.className === "delete") {
            const idForDelete = click.dataset.id;
            console.log('idForDelete: ', idForDelete);
            deleteTask(idForDelete);
            return;

        }
        else if (click.className === 'custom-checkbox') {
            const idForToggle = click.id;
            console.log('idForToggle: ', idForToggle);
            toggleTask(idForToggle);
            return;
        }
        else if (click.id == 'checked-all' || click.tagName == 'I') {
            // checkedALL = document.getElementById(click.id)
            // let doubleTick = checkedALL.querySelector('i');
            doubleTick.style.color = "red";
            click.style.color = "red";


            console.log('click.id: ', click);
            completeAllTask(true)

        }
        else if (click.id == 'clear-all') {
            click.style.color = "red";
            completeAllTask(false)

            checkedALL.style.color = "#797a7e";
            doubleTick.style.color = "#797a7e";

        }
        else if (click.id == 'all') {
            displayAll.style.color = "red";
            uncompleted.style.color = "#797a7e";
            completed.style.color = "#797a7e";
            renderList("all");
        }
        else if (click.id == 'uncompleted') {
            displayAll.style.color = "#797a7e";
            uncompleted.style.color = "red";
            completed.style.color = "#797a7e";
            renderList("uncompleted");

        }
        else if (click.id == 'completed') {
            displayAll.style.color = "#797a7e";
            uncompleted.style.color = "#797a7e";
            completed.style.color = "red";
            renderList("completed");
        }
        else {

        }

        // console.log('click.id: ', click.tagName);
        //console.log('click: ', click.className);
    }
    function initializeApp() {
        //fetchTodos();
        addTaskInput.addEventListener('keydown', HandleInputKeyPress)
        document.addEventListener('click', handleClick);
    }
    //initializeApp(); we are calling from html
    return { // we reveal some code to outside from this function i.e to global ec SO THAT IN OTHER PLACE WE CAN THESE TWO VARABILES
        initialize: initializeApp,
        a: a
    }

}())

