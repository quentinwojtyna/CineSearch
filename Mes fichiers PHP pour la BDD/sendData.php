<?php
$con = mysqli_connect('localhost','id18523468_admin','3{rbim4zQrLImPzR','id18523468_mesfilms') or die ('Impossible de se connecter à la base de donnée.');

    $titre = $_POST['titre'];
    $nom = $_POST['nom'];
    $titre = addslashes($titre);

    $sql = "INSERT INTO `historique` (`film`, `nom`) VALUES ('$titre', '$nom');";
    $result = mysqli_query($con,$sql);
?>
