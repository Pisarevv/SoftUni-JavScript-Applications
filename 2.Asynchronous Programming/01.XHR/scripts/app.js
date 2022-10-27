function loadRepos() {
   let divElement = document.getElementById("res");
   let xhttps = new XMLHttpRequest();
   xhttps.open("GET","https://api.github.com/users/testnakov/repos");
   xhttps.send();
   xhttps.onload = function(){
      if(xhttps.status == 200){
         divElement.textContent = xhttps.responseText;
      }
   }

}