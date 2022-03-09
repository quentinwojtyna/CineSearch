$(document).ready(function() {


    /* Affichage des icone de chargement en attendant les infos à afficher */
    var element = $("#listfilm");
    var btnEl = $("#btncine");
    var historique = $("#histo");
    let load = "<img src='../img/load.svg'>"
    let load2 = "<img src='../img/load.svg' width='30%'>"
    element.append(load);
    btnEl.append(load2);
    historique.append(load2);

    /* Désactivation du bouton retour après le login */
    document.addEventListener('backbutton', function (){
        return 0;
    });

    /* Fonction d'affichage d'un message de bienvenue */
    function welcome() {
        if (localStorage.getItem("first") == "1") { // Element servant à vérifier si le message a déjà été affiché ou non.
            setTimeout(function () {
                window.plugins.toast.showWithOptions( // Affichage du message toast de bienvenue.
                    {
                        message: "Hello " + localStorage.getItem("nom") + " !",
                        duration: "short",
                        position: "bottom",
                        addPixelsY: -40
                    }
                );
                localStorage.setItem("first", "0");
            }, 500); // Timer pour lancer le toast 500 ms après.
        }
    }

    /* Fonction d'obtention de la liste des films récemment sortis */
    function getList() {
        $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=a0caecbf1ff75ddf1a021a87fa73d5e0&language=fr-FR&region=FR&primary_release_year=2022", function (result) {
            document.getElementById('listfilm').innerHTML = ""; // Suppression du logo de chargement pour le remplacer par le contenu retourné par l'API.
            element.append("<div class='collection' id='listfilmT'></div>");
            element = $("#listfilmT");

            for (let i = 0; i < 10; i++) {
                var current = "<a id='btn"+ i + "' class='collection-item' onclick='monClic(this.id)'>" + result.results[i].title + "</a><input type='hidden' id='btn"+ i +"id' value='"+ result.results[i].id +"' />"; // Affichage des éléments de la liste de films.
                element.append(current);
            }
        });
    }

    /* Fonction servant à récupérer la position du téléphone */
    function getPosition() {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) { // Utilisation du plugin servant à récupérer les coordonnées GPS du téléphone
            $.getJSON("https://open.mapquestapi.com/geocoding/v1/reverse?key=GSmTRAQQrWM2LvXIM2HAQS5odeL05GGv&location=" + position.coords.latitude + ", " + position.coords.longitude, function(result) { //Appel de l'API pour obtenir la ville correspondant aux coordonnées GPS.
                document.getElementById('btncine').innerHTML = "";
                btnEl.append("<a class='waves-effect waves-light btn purple' href='https://maps.google.com/?q=cinéma près de "+ result.results[0].locations[0].adminArea5 +"'><i class='material-icons left'>map</i>Ciné près de "+ result.results[0].locations[0].adminArea5 + "</a>");
            });
        }

        function onError(error) {
            alert('Code erreur : '+ error.code + '\n' + 'Message: ' + error.message + '\n');
            location.reload();
        }
    }

    /* Requête Ajax pour obtenir l'historique de la personne connectée */
    $.ajax({
        type: "POST",
        url: "https://blushful-eligibilit.000webhostapp.com/getData.php",
        data: {nom: localStorage.getItem("nom")}, // Envoi du nom de la personne pour récupérer l'historique de la personne uniquement.
        async: false,
        success: function(text) {
            var list = eval(text);
            var contenu = "<table class='centered'><thead class='purple'><tr><th>Historique de Film</th></tr></thead><tbody>";
            for (var i = 0 ; i < 5 ; i++){
                if (typeof list[i] == 'undefined'){ // Si l'historique de la personne est inférieur à 5, alors afficher une onglet vide.
                    contenu += "<tr><td></td></tr>";
                } else {
                    contenu += "<tr><td>" + list[i] + "</td></tr>";
                }
            }
            contenu += "</tbody></table>";
            document.getElementById('histo').innerHTML = "";
            historique.append(contenu); // Affichage de la liste.
        }
    });

    /* Execution des fonctions */
    welcome();
    getList();
    getPosition();
});
