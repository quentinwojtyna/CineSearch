document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function onPause() {
    setTimeout(function () {
        cordova.plugins.notification.local.schedule({
            title: 'Reviens vite !',
            text: 'Clique ici pour continuer ta recherche ',
            foreground: true,
            priority: 1,
            sound: "default"
        });
    }, 2500);
}

function onResume(){
    setTimeout(function(){
        window.plugins.toast.showWithOptions(
            {
                message: "Ah ! Te revoilà enfin !",
                duration: "short",
                position: "bottom",
                addPixelsY: -40
            }
        );
    }, 500);
}
