// Login forms
const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".hide-icon");
const links = document.querySelectorAll(".link");
// login API
const apiurl = "https://todoo.5xcamp.us";  

// 切換頁面
let currentPage = window.location.pathname;

// if( currentPage.includes("login")){

// }else{
//     btnLogout.addEventListener("click", logout);
// }

// 註冊 API
const signup = document.querySelector(".js-signup");
signup.addEventListener("click", (e) =>{
    e.preventDefault();
    const signupEmail = document.querySelector("#signup-email").value.trim();
    const nickname = document.querySelector("#name").value.trim();
    const signupPassword = document.querySelector("#signup-password").value.trim();
    const checkedPassword = document.querySelector("#checked-password").value.trim();
    if ( signupEmail === "" || nickname === "" || signupPassword === "" || checkedPassword === ""){
        Swal.fire({
            icon: "error",
            title: "尚有未輸入欄位，請填寫",
        });
        console.log(signupEmail, nickname, signupPassword, checkedPassword);
        return;
    }else if ( signupPassword !== checkedPassword ){
        Swal.fire({
            icon: "error",
            title: "密碼不一致 !!",
        });
        console.log(signupPassword, checkedPassword);
        return;
    }
    axios.post(`${ apiurl }/users`, {
        user: {
            "email": signupEmail,
            "nickname": nickname,
            "password": signupPassword
          }
    })
    .then((res) =>{
        axios.defaults.headers.common["Authorization"] = res.headers.authorization;
        // console.log(res.data);
        let token = res.headers.authorization;
        let nickName = res.data.nickname;
        localStorage.setItem("token", token);
        localStorage.setItem("nickName", nickName);
        Swal.fire({
            icon: "success",
            title: `${ nickName }，你好 !`
        }).then(() =>{
            window.location = "../todolist.html";
            // window.location = "/Todolist/todolist.html";
        })
    })
    .catch((err) =>{
        console.log(err);
        Swal.fire({
            icon: "error",
            text: err.response.data.message,
            text: "帳號已被註冊，請重新填寫"
        })
    })
})
// function signUp(email, nickname, pwd){
//     axios.post(`${apiurl}/users`,{
//         "user": {
//             "email": email,
//             "nickname": nickname,
//             "password": pwd
//         }
//     })
//     .then(res => console.log(res))
//     .catch(error => console.log(error.response))
// };


// 登入 API
const signin = document.querySelector(".js-signin");
signin.addEventListener("click", (e) =>{
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if( email === "" || password ===""){
        Swal.fire({
            icon: "error",
            title: "尚有未輸入欄位，請填寫"
        });
        return;
    }
    axios.post(` ${ apiurl }/users/sign_in`, {
        user:{
            email,
            password
        }
    })
    .then((res) =>{
        // console.log(res.data);
        axios.defaults.headers.common["Authorization"] = res.headers.authorization;
        let token = res.headers.authorization;
        let nickName = res.data.nickname;
        localStorage.setItem("token", token);
        localStorage.setItem("nickName", nickName);
        Swal.fire({
            icon: "success",
            title: `${ nickName }，你好 !`
        }).then(() =>{
            // window.location = "../todolist.html";
            window.location = "../todolist.html";
        })
    })
    .catch((err) =>{
        console.log(err.response);
        Swal.fire(` ${err.response.data.message} `, "帳號密碼錯誤或無此帳號", "error");
    })
})

// function signIn(email, pwd){
//     axios.post(`${apiurl}/users/sign_in`,{
//         "user": {
//             "email": email,
//             "password": pwd
//         }
//     })
//     .then(res => console.log(res))
//     .catch(error => console.log(error.response))
// }



pwShowHide.forEach(hideIcon => {
    hideIcon.addEventListener("click", ()=>{
        let pwFields = hideIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password =>{
            if(password.type === "password"){
                password.type = "text";
                hideIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
                hideIcon.classList.replace("bx-show", "bx-hide");
        })
    })
})

links.forEach(link =>{
    link.addEventListener("click", e =>{
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})

