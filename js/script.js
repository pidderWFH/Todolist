const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".hide-icon");
const links = document.querySelectorAll(".link");
  
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