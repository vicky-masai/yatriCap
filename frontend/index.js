let ar = document.querySelector(".fa-angle-right");
ar.addEventListener("click",()=>{

    if(document.querySelector(".box").style.display !="flex"){
        document.querySelector(".box").style.display="flex"
        ar.setAttribute("class","fa fa-angle-down");
    ar.style.color="red";
    document.querySelector(".box").style.paddingTop="0px"


    }else{
    document.querySelector(".box").style.display="none"
    ar.setAttribute("class","fa fa-angle-right");
    ar.style.color="black";
    }
})