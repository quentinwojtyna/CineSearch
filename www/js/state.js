document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function onPause() { // Action qui suit la pause de l'application quand on quitte sans fermer l'app.
    setTimeout(function () {
        cordova.plugins.notification.local.schedule({ // Affichage d'une notification.
            title: 'Reviens vite ' + localStorage.getItem("nom") + ' !',
            text: 'Clique ici pour continuer ta recherche ',
            foreground: true,
            priority: 1,
            sound: "default"
        });
    }, 2500);
}

function onResume(){ // Fonction qui s'active au retour sur l'app.
    setTimeout(function(){
        window.plugins.toast.showWithOptions( // Afficher un message toast en bas de l'écran.
            {
                message: "Ah ! Te revoilà enfin !",
                duration: "short",
                position: "bottom",
                addPixelsY: -40
            }
        );
    }, 500);
}
