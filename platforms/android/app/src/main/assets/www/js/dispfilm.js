$(document).ready(function() {

    document.addEventListener('backbutton', function (){
        window.location.href = "../index.html";
    });

    var idfilm = localStorage.getItem("idFilm");
    var element = $("#afficheFilm");
    var img = "";

    let load = "<img src='../img/load.svg'>"
    element.append(load);

    var titre;

    $.getJSON("https://api.themoviedb.org/3/movie/"+ idfilm +"?api_key=a0caecbf1ff75ddf1a021a87fa73d5e0&language=fr-FR", function (result) {
        let imdb = result.imdb_id;
        $.getJSON("https://www.omdbapi.com/?i="+ imdb +"&apikey=ff9c90c3", function (resu) {
            img = resu.Poster;
            document.getElementById('afficheFilm').innerHTML = "";
            let current = "<span class=\"card-title\">"+ result.title +"</span>";
            current += "<img src='"+ img +"' width='70%'>";
            current += "<p>"+ result.overview +"</p>";
            current += "<h5>Date de sortie : "+ result.release_date +"</h5>";
            current += "<h5>Note : "+ result.vote_average +" sur  "+ result.vote_count +" votes</h5>";
            current += "<a href='"+ result.homepage +"' class='btn'>Se rendre sur le site du film</a>";
            element.append(current);

            titre = result.title;

            $.post("https://blushful-eligibilit.000webhostapp.com/sendData.php", { titre: titre, nom: localStorage.getItem("nom") });
        });
    });
});
