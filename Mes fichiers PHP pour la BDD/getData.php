<?php
$con = mysqli_connect('localhost','id18523468_admin','3{rbim4zQrLImPzR','id18523468_mesfilms') or die ('Impossible de se connecter à la base de donnée.');

$nom = $_POST['nom'];

$sql = "SELECT * FROM historique WHERE nom = '$nom' ORDER BY id DESC";
$result = mysqli_query($con,$sql);

$listFilm = array();
$ind = 0;

while ($film = mysqli_fetch_array($result)) {
    $listFilm[$ind] = $film['film'];
    $ind++;
}

echo json_encode($listFilm);
?>
