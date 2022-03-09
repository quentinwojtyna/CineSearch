$(document).ready(function() {

    var element = $("#listfilm");
    var btnEl = $("#btncine");
    var historique = $("#histo");
    let load = "<img src='../img/load.svg'>"
    let load2 = "<img src='../img/load.svg' width='30%'>"
    element.append(load);
    btnEl.append(load2);
    historique.append(load2);

    function getList() {
        $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=a0caecbf1ff75ddf1a021a87fa73d5e0&language=fr-FR&region=FR&primary_release_year=2022", function (result) {
            document.getElementById('listfilm').innerHTML = "";
            element.append("<div class='collection' id='listfilmT'></div>");
            element = $("#listfilmT");

            function monClic(id) {
                alert(id);
                let btn = document.getElementById(id +'id').value;
                localStorage.setItem("idFilm", btn);
                window.location.href = "../second.html";
            }

            for (let i = 0; i < 5; i++) {
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
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?APPID=7e181b27cf94564bb5e54c5402ff9bb7&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&lang=fr&units=metric", function(result) {
                document.getElementById('btncine').innerHTML = "";
                btnEl.append("<a class='waves-effect waves-light btn purple' href='http://maps.google.com/?q=cinéma près de "+ result.name +"'><i class='material-icons left'>map</i>Ciné près de "+ result.name + "</a>");
            });
        }

        function onError(error) {
            alert('Code erreur : '+ error.code + '\n' + 'Message: ' + error.message + '\n');
            location.reload();
        }
    }

    $.ajax({
        type: "GET",
        url: "https://blushful-eligibilit.000webhostapp.com/getData.php",
        async: false,
        success: function(text) {
            var list = eval(text);
            var contenu = "<table class='centered'><thead class='purple'><tr><th>Historique de Film</th></tr></thead><tbody>";
            for (var i = 0 ; i < 5 ; i++){
                contenu += "<tr><td>" + list[i] + "</td></tr>";
            }
            contenu += "</tbody></table>";
            document.getElementById('histo').innerHTML = "";
            historique.append(contenu);
        }
    });

    getList();
    getPosition();
});
