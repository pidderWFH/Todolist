const apiurl = "https://todoo.5xcamp.us";  
const todoUser = document.querySelector(".todoUser");
const btnLogout = document.querySelector(".logout");

btnLogout.addEventListener("click", logout);


// 登出
function logout(){
    axios.delete(`${ apiurl }/users/sign_out`,{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    }).then((res) =>{
        Swal.fire({
            icon: "success",
            title: res.data.message,
        }).then(() =>{
            localStorage.clear();
            window.location = "./index.html";
            // window.location = "/Todolist/login.html";
        })
    }).catch((err) =>{
        let errTxt = err.response.data.error ? error.response.data.err : "";
        Swal.fire({
            icon: "error",
            title: err.response.data.message,
            text: errTxt
        })
    })
}

// if( window.localStorage.pathname === "todolist.html"){
//     getTodos();
//     todoUser.textContent = `${localStorage.getItem("nickName")} 的待辦`;
// }
// todoUser.addEventListener("click", (e) =>{
//     e.preventDefault();
//     todoUser.textContent = `${localStorage.getItem("nickName")} 的待辦`;
//     window.location = "./todolist.html";
// })
// getTodo
let data = [];
// axios get Todo
function getTodos(){
    let todos = {};
    axios.get(`${apiurl}/todos`,{
        headers:{
            Authorization : localStorage.getItem("token")
        },
    })
    .then((res) => {
        document.querySelector(".inputTodo").value = "";
        data = res.data.todos;
        // todos.data = res.data.content;
        // todos.id = res.data.id;
        renderTodos(data);
        // console.log(data);
    })
}
let tabStatus = "all";

// 渲染畫面
function renderTodos(data){
    // console.log(data);
    let showTodo = [];
    if(tabStatus === "all"){
        showTodo = data;
    }else if(tabStatus === "undo"){
        showTodo = data.filter((item) => item.completed_at === null);
    }else if(tabStatus === "complete"){
        showTodo = data.filter((item) => item.completed_at !== null);
    }
    
    // console.log(showTodo);
    let str = "";
    showTodo.forEach(function(item){
        str += `<li class="todos-item"  data-id="${ item.id }">
        <div class="txt">
            <i class="bx ${item.completed_at === null ? "bx-checkbox" : "bx-checkbox-checked" }"></i>
            <span>
                ${ item.content }
            </span>
        </div>
        <div>
            <i class="bx bxs-edit editTodo"></i>
            <i class="bx bx-x delTodo"></i>
        </div>
    </li>`
    });
    todoUser.textContent = `${localStorage.getItem("nickName")} 的待辦`;
    const todosList = document.querySelector(".todosList");
    todosList.innerHTML = str;
    // const todosContainer = document.querySelector(".card-todos");
    // const undoNum = data.filter((item) => item.completed_at !== null).length;
    // document.querySelector(".js-undoNum").textContent = undoNum;
    // todosContainer.innerHTML = str;
    undoCounter(data);
}
// 待完成事項
function undoCounter(data){
    let undoTotal = 0;
    data.forEach(item =>{
        if(item.completed_at === null ){ undoTotal++ };
    })
    const undoNum = document.querySelector(".js-undoNum");
    undoNum.textContent = `${ undoTotal }`;
}
// addTodo


// 滑鼠點擊新增
// const onMouse = document.querySelector(".addTodo").addEventListener("click", function(e){
//     addTodo();
// });
const onMouse = document.querySelector(".addTodo");
onMouse.addEventListener("click", addTodo);

// 鍵盤 Enter 新增
// const onKeyboard = document.querySelector(".inputTodo").addEventListener("keypress", function(e){
//     if(e.which === 13){
//         addTodo();
//     }
// });
const onKeyboard = document.querySelector(".keyboardInput");
onKeyboard.addEventListener("keyup", function(e){
    if(e.which === 13){
        addTodo();
    }
});

// axios add Todo
function addTodo(){
    const inputTxt = document.querySelector(".inputTodo").value;
    // console.log(inputTxt.value);
    axios.defaults.headers.common["Authorization"]= localStorage.getItem("token");
    if(inputTxt.trim() === ""){
        Swal.fire(`請輸入待辦事項`, "輸入內容為空", "warning")
        return;
    }
    axios.post(`${apiurl}/todos`,{
        "todo":{
            "content": inputTxt
        }
    
    })
    .then((res) => {
        // console.log(res)
        getTodos();
        // let obj = {};
        // obj.content =  inputTxt.value.trim();
        // obj.check = "";
        // data.unshift(obj);
    })
    .catch(err => console.log(err.response))
}

// function addTodo(){
//     const inputTodo = document.querySelector(".inputTodo").value;
//     // 判斷 Input 是否為空
//     if(inputTodo.trim().length === 0 ){
//         Swal.fire("輸入錯誤", "待辦事項不能為空白", "warning")
        
//         return;
//     } 
        
//     let obj = {};
//     obj.content = inputTodo;
//     data.push(obj);
//     renderTodos();

    // 清空 Input
//     document.querySelector(".inputTodo").value = "";
// }

// todoList 全部
const todoList = document.querySelector(".todosList");
todoList.addEventListener("click", (e) =>{
    e.preventDefault();
    const target = e.target;
    let todoId = e.target.closest("li").dataset.id;
    if(target.classList.contains("delTodo")){
        deleteTodo(todoId);
    }else if(target.classList.contains("editTodo")){
        editTodo(todoId);
    }else{
        toggleTodo(todoId);
    }
})
// 編輯 todo
function editTodo(id){
    Swal.fire({
        icon: "info",
        title: "請編輯內容",
        input: "text"
    }).then((content) =>{
        if(content.value.trim() === undefined || content.value.trim() ==="" ){
            Swal.fire("請輸入內容", "內容無法為空白，請重新輸入", "warning");
            // return;
        }
    
        axios.put(`${ apiurl }/todos/${ id }`,{
            todo:{
                "content": content.value
            }
        })
        .then((res) =>{
            getTodos();
            // Swal.fire(`${ res.data.message }`, "編輯成功", "success")
        })
        .catch((err) =>{
            console.log(err);
        })
    })
}

// deleteTodo
function deleteTodo(id){
    // console.log(data);
    axios.defaults.headers.common["Authorization"]= localStorage.getItem("token");
    axios.delete(`${ apiurl }/todos/${ id }`)
    .then((res) =>{
        // Swal.fire(`${ res.data.message }`, "刪除成功", "success")
        getTodos();
    })
    .catch((err) =>{
        console.log(err.response);
    })
}

// delete all Todos
const deleteAllTodos = document.querySelector(".js-deletAllTodos");
deleteAllTodos.addEventListener("click", deleteTodos);
function deleteTodos(e){
    e.preventDefault();
    axios.defaults.headers.common["Authorization"]= localStorage.getItem("token");
    axios.get(`${ apiurl }/todos`)
    .then((res) =>{
        // filter 待完成( completed_at == null )的，就是已完成的
        const completeTodo = res.data.todos.filter((item) => item.completed_at !== null);
        const delAllUrl = completeTodo.map((item) => `${ apiurl }/todos/${ item.id }`);

        Promise.all(delAllUrl.map((url) =>{
            return axios.delete(url);
        })).then((res) =>{
            // console.log(res);
            Swal.fire("刪除成功", "已完成項目已刪除", "success");
            getTodos();
        }).catch((err) =>{
            console.log(err);
        })
    })
}

// updateTodo
// function updateTodo(id){
//     axios.defaults.headers.common["Authorization"]= localStorage.getItem("token");
//     axios.put(`${ apiurl }/todos/${ id }`, {
//         todos:{
//             content: 
//         }
//     })
//     .then((res) =>{

//     })
// }
// document.querySelector(".todosList").addEventListener("click", function(e){
//     const target = e.target;
//     // delete todo
//     if(target.classList.contains("delTodo")){
//         // target.parentNode.remove();
//         console.log(target);
        
//     }
// })

// toggle Todo
function toggleTodo(id){
    
    axios.defaults.headers.common["Authorization"]= localStorage.getItem("token");
    axios.patch(`${ apiurl }/todos/${ id }/toggle`, {})
    .then((res) =>{
        getTodos();
    })
    .catch((err) =>{
        let reason = error.response.data.error ? error.response.data.error : "";
        alert(error.response.data.message + "" + reason)
    })
}

// Tab changeTodo
const todoTab = document.querySelector(".card-header"); 
todoTab.addEventListener("click", (e) =>{
    e.preventDefault();
    if(todoTab){
        tabStatus = e.target.dataset.tab;
        const elems = document.querySelectorAll(".card-header span");
        elems.forEach((item) => item.classList.remove("active"));
        e.target.classList.add("active");
        // console.log(tabStatus);
        getTodos();
    }
})