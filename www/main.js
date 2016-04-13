/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Test = __webpack_require__(2);
	var Preferiti = __webpack_require__(3);
	var Wallet = __webpack_require__(4);
	
	var p = Preferiti.elenca();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Test = function Test() {
		_classCallCheck(this, Test);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Gestione dei percorsi preferiti
	//
	/////////////////////////////////////////////////////////////////////////////////////////////
	
	var Preferiti = exports.Preferiti = function () {
	    function Preferiti() {
	        _classCallCheck(this, Preferiti);
	
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
	
	
	    _createClass(Preferiti, [{
	        key: 'inizializzaPercorsi',
	        value: function inizializzaPercorsi() {
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
	
	    }, {
	        key: 'leggi',
	        value: function leggi(museo, indice) {
	            var ilMuseo = this.percorsi.museo[museo];
	            return ilMuseo.percorso[indice];
	        }
	
	        // crea un percorso
	
	    }, {
	        key: 'crea',
	        value: function crea(museo) {
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
	                ilMuseo.percorso[primoLibero].id = ilMuseo.nome + ' - ' + dt.toLocaleDateString() + ' ' + primoLibero;
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
	
	    }, {
	        key: 'elenca',
	        value: function elenca(museo) {
	            return percorsi.museo[museo].percorso;
	        }
	
	        //
	        // salva una tappa nei preferiti
	        //
	
	    }, {
	        key: 'aggiungiTappa',
	        value: function aggiungiTappa(museo, indice, tappa) {
	            var percorso = leggi(museo, indice);
	
	            percorso.immagine = tappa.immagine;
	            var i = percorso.tappa.push(tappa);
	            salvaPercorsi();
	
	            return i - 1;
	        }
	    }, {
	        key: 'salvaPercorsi',
	        value: function salvaPercorsi() {
	            localStorage.setItem('OYM.preferiti', JSON.stringify(percorsi));
	        }
	    }, {
	        key: 'salvaPercorsoA',
	        value: function salvaPercorsoA(museo, indice, percorso, tappa) {
	            aggiungiTappa(museo, indice, app.percorsi.museo[museo].percorso[percorso].tappa[tappa]);
	            chiudiDialog();
	        }
	    }, {
	        key: 'creaPreferito',
	        value: function creaPreferito(museo, percorso, tappa) {
	            var i = crea(museo);
	            aggiungiTappa(museo, i, app.percorsi.museo[museo].percorso[percorso].tappa[tappa]);
	            chiudiDialog();
	        }
	    }]);
	
	    return Preferiti;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Gestione del wallet
	//
	/////////////////////////////////////////////////////////////////////////////////////////////
	
	var Wallet = exports.Wallet = function () {
	
	    // Carica il wallet, dal localStorage, oppure lo crea
	
	    function Wallet() {
	        _classCallCheck(this, Wallet);
	
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
	
	
	    _createClass(Wallet, [{
	        key: 'inizializzaWallet',
	        value: function inizializzaWallet() {
	            var foto = []; // new Array(app.percorsi.museo.length);
	
	            // // Si potrebbe fare un wallet per museo, ma poi bisogna tenere traccia del museo
	            // // corrente, o passarsi il museo per diverse funzioni.
	            // for (var i = 0; i < app.percorsi.museo.length; i++) {
	            //     foto[i] = [];
	            // }
	
	            return foto;
	        }
	
	        // aggiunge una struttura all'archivio delle foto
	
	    }, {
	        key: 'aggiungiFoto',
	        value: function aggiungiFoto(path) {
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
	    }, {
	        key: 'salvaWallet',
	        value: function salvaWallet() {
	            localStorage.setItem('OYM.wallet', JSON.stringify(foto));
	        }
	
	        //
	        // Spazzola l'array di un museo eliminando foto che non esistono più
	        //
	
	    }, {
	        key: 'leggi',
	        value: function leggi(museo, indice) {
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
	    }]);
	
	    return Wallet;
	}();
	
	module.exports = {
	    Wallet: Wallet
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map