$(document).ready(function() {

    var element = $("#listfilm");
    var btnEl = $("#btncine");
    var historique = $("#histo");
    let load = "<img src='../img/load.svg'>"
    let load2 = "<img src='../img/load.svg' width='30%'>"
    element.append(load);
    btnEl.append(load2);
    historique.append(load2);

    document.addEventListener('backbutton', function (){
        return 0;
    });

    function welcome() {
        if (localStorage.getItem("first") == "1") {
            setTimeout(function () {
                window.plugins.toast.showWithOptions(
                    {
                        message: "Hello " + localStorage.getItem("nom") + " !",
                        duration: "short",
                        position: "bottom",
                        addPixelsY: -40
                    }
                );
                localStorage.setItem("first", "0");
            }, 500);
        }
    }

    function getList() {
        $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=a0caecbf1ff75ddf1a021a87fa73d5e0&language=fr-FR&region=FR&primary_release_year=2022", function (result) {
            document.getElementById('listfilm').innerHTML = "";
            element.append("<div class='collection' id='listfilmT'></div>");
            element = $("#listfilmT");

            for (let i = 0; i < 10; i++) {
                var current = "<a id='btn"+ i + "' class='collection-item' onclick='monClic(this.id)'>" + result.results[i].title + "</a><input type='hidden' id='btn"+ i +"id' value='"+ result.results[i].id +"' />";
                element.append(current);
            }
        });
    }

    function getPosition() {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) {
            $.getJSON("https://open.mapquestapi.com/geocoding/v1/reverse?key=GSmTRAQQrWM2LvXIM2HAQS5odeL05GGv&location=" + position.coords.latitude + ", " + position.coords.longitude, function(result) {
                document.getElementById('btncine').innerHTML = "";
                btnEl.append("<a class='waves-effect waves-light btn purple' href='https://maps.google.com/?q=cinéma près de "+ result.results[0].locations[0].adminArea5 +"'><i class='material-icons left'>map</i>Ciné près de "+ result.results[0].locations[0].adminArea5 + "</a>");
            });
        }

        function onError(error) {
            alert('Code erreur : '+ error.code + '\n' + 'Message: ' + error.message + '\n');
            location.reload();
        }
    }

    $.ajax({
        type: "POST",
        url: "https://blushful-eligibilit.000webhostapp.com/getData.php",
        data: {nom: localStorage.getItem("nom")},
        async: false,
        success: function(text) {
            var list = eval(text);
            var contenu = "<table class='centered'><thead class='purple'><tr><th>Historique de Film</th></tr></thead><tbody>";
            for (var i = 0 ; i < 5 ; i++){
                if (typeof list[i] == 'undefined'){
                    contenu += "<tr><td></td></tr>";
                } else {
                    contenu += "<tr><td>" + list[i] + "</td></tr>";
                }
            }
            contenu += "</tbody></table>";
            document.getElementById('histo').innerHTML = "";
            historique.append(contenu);
        }
    });

    welcome();
    getList();
    getPosition();
});
