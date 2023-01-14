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
            window.location = "../login.html";
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

if( window.localStorage.pathname = "index.html"){
    getTodos();
    todoUser.textContent = `${localStorage.getItem("nickName")} 的待辦`; 
}

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
    })
}


// 渲染畫面
function renderTodos(data){
    // console.log(data);
    let str = "";
    data.forEach(function(item){
        str += `<li class="todos-item"  data-id="${ item.id }">
        <div class="txt">
            <i class="bx bx-checkbox"></i>
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
    const todosList = document.querySelector(".todosList");
    todosList.innerHTML = str;
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
    }
    
    // else if(target.classList.contains("editTodo")){
    //     editTodo(todoId);
    // }
})
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
// const deleteAllTodos = document.querySelector(".js-deletAllTodos");
// deleteAllTodos.addEventListener("click", deleteTodos);
// function deleteTodos(){
//     e.preventDefault();

// }

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