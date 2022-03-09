$(document).ready(function() {
    $('#goto').on('click', function (){ // Action résultant d'un clic sur le bouton "Se connecter".
       var name = document.getElementById('nom').value;
       if (name == ""){ // Si aucun nom n'est entré et qu'un clic est effectué.
           alert("Un nom est nécessaire pour se connecter à l'application !");
       } else if (name != ""){
           localStorage.setItem("nom", name); // Sauvegarde du nom temporairement.
           localStorage.setItem("first", "1"); // Initialisation de la variable test pour le "welcome".
           window.location.href = "../index.html"; // Redirection vers la page principale.
       }
    });
});
