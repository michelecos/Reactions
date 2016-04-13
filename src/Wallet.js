/////////////////////////////////////////////////////////////////////////////////////////////
//
// Gestione del wallet
//
/////////////////////////////////////////////////////////////////////////////////////////////

export class Wallet {

    // Carica il wallet, dal localStorage, oppure lo crea
    constructor() {
        var wlt = localStorage.getItem('OYM.wallet');

        // XXX se il wallet contiene meno elementi dei musei inizializzare comunque
        if (wlt === 'undefined' || wlt === null) {
            foto = inizializzaWallet();
            salvaWallet();
        } else {
            foto = JSON.parse(wlt);
            if (percorsi.museo.length != wallet.length) {
                wallwr = inizializzaWallet();
            }
        }
    }

    // Inizializza il wallet, copiando dai percorsi, un wallet per ogni museo
    inizializzaWallet() {
        var foto = []; // new Array(app.percorsi.museo.length);

        // // Si potrebbe fare un wallet per museo, ma poi bisogna tenere traccia del museo 
        // // corrente, o passarsi il museo per diverse funzioni.
        // for (var i = 0; i < app.percorsi.museo.length; i++) {
        //     foto[i] = [];
        // }

        return foto;
    }

    // aggiunge una struttura all'archivio delle foto
    aggiungiFoto(path) {
        // Costruisco un oggetto perché è più facile da utilizzare nel template
        // XXX qui si dovrebbe annotare la foto con altri dati; museo, data ..
        var d = new Date();
        var data = {};
        data.immagine = path;
        data.data = d.toLocaleDateString();
        data.ora = d.toLocaleTimeString();
        data.testo = app.camera.testo;
        foto.push(data);
        salvaWallet();
    }

    salvaWallet() {
        localStorage.setItem('OYM.wallet', JSON.stringify(foto));
    }

    //
    // Spazzola l'array di un museo eliminando foto che non esistono più
    //
    leggi(museo, indice) {
        assert(typeof app.wallet !== 'undefined');
        assert(typeof foto !== 'undefined');
        var laFoto = foto[museo][indice];
        var reply = null;
        var that = this;
        // var img = new Image();
        // img.onLoad() {
        //     laFoto = null;
        // };
        // img.src = laFoto;

        return laFoto;
    }
}

module.exports = {
    Wallet: Wallet
};