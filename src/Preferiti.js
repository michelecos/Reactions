/////////////////////////////////////////////////////////////////////////////////////////////
//
// Gestione dei percorsi preferiti
//
/////////////////////////////////////////////////////////////////////////////////////////////

class Preferiti {
    constructor() {
        var preferiti = localStorage.getItem('OYM.preferiti');
        var percorsi;

        // Carica i preferiti, dal localStorage, oppure li crea
        if (preferiti === 'undefined' || preferiti === null) {
            percorsi = inizializzaPercorsi();
            localStorage.setItem('OYM.preferiti', JSON.stringify(percorsi));
        } else {
            percorsi = JSON.parse(preferiti);
            // potremmo avere un nuovo museo, o averne cancellato uno
            if (percorsi.museo.length != preferiti.museo.length) {
                percorsi = inizializzaPercorsi();
            }
        }

        this.percorsi = percorsi;
    }

    // Inizializza i preferiti, copiando dai percorsi, un museo fra i preferiti 
    // per ogni percorso.
    inizializzaPercorsi() {
        var percorsi = {};
        percorsi.museo = new Array(app.percorsi.museo.length);

        for (var i = 0; i < app.percorsi.museo.length; i++) {
            percorsi.museo[i] = {};
            percorsi.museo[i].ordine = i;
            percorsi.museo[i].nome = app.percorsi.museo[i].nome;
            percorsi.museo[i].percorso = [];
        }

        return percorsi;
    }

    // estrae un percorso preferito
    leggi(museo, indice) {
        var ilMuseo = this.percorsi.museo[museo];
        return ilMuseo.percorso[indice];
    }

    // crea un percorso
    crea(museo) {
        var ilMuseo = this.percorsi.museo[museo];

        var primoLibero = ilMuseo.percorso.length;
        var dt = new Date();

        ilMuseo.percorso[primoLibero] = {};
        ilMuseo.percorso[primoLibero].ordine = primoLibero;
        ilMuseo.percorso[primoLibero].by = app.user;
        ilMuseo.percorso[primoLibero].tappa = [];

        /* aggiunto by Max */
        var titolo = $('#preferiti_titolo').val();
        var sottotitollo = $('#preferiti_sottotitolo').val();

        if (titolo === undefined || titolo === null || titolo === '') {
            ilMuseo.percorso[primoLibero].id = ilMuseo.nome + ' - ' +
                dt.toLocaleDateString() + ' ' + primoLibero;
        } else {
            ilMuseo.percorso[primoLibero].id = titolo;
        }
        if (sottotitollo === undefined || sottotitollo === null || sottotitollo === '') {
            ilMuseo.percorso[primoLibero].sottotitolo = app.stringhe.percorso_sottotitolo_default;
        } else {
            ilMuseo.percorso[primoLibero].sottotitolo = sottotitollo;
        }

        salvaPercorsi();

        return primoLibero;
    }

    // Elenco dei percorsi preferiti creati per un dato museo
    elenca(museo) {
        return percorsi.museo[museo].percorso;
    }

    //
    // salva una tappa nei preferiti
    //
    aggiungiTappa(museo, indice, tappa) {
        var percorso = leggi(museo, indice);

        percorso.immagine = tappa.immagine;
        var i = percorso.tappa.push(tappa);
        salvaPercorsi();

        return i - 1;
    }

    salvaPercorsi() {
        localStorage.setItem('OYM.preferiti', JSON.stringify(percorsi));
    }

    salvaPercorsoA(museo, indice, percorso, tappa) {
        aggiungiTappa(museo, indice, app.percorsi.museo[museo].percorso[percorso].tappa[tappa]);
        chiudiDialog();
    }

    creaPreferito(museo, percorso, tappa) {
        var i = crea(museo);
        aggiungiTappa(museo, i, app.percorsi.museo[museo].percorso[percorso].tappa[tappa]);
        chiudiDialog();
    }
}
