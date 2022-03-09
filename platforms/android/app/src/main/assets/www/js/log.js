$(document).ready(function() {
    $('#goto').on('click', function (){
       var name = document.getElementById('nom').value;
       if (name == ""){
           alert("Un nom est nécessaire pour se connecter à l'application !");
       } else if (name != ""){
           localStorage.setItem("nom", name);
           localStorage.setItem("first", "1");
           window.location.href = "../index.html";
       }
    });
});
