class OggettoPersistente {
	constructor(nomeChiave, valoreDefault) {
		this.chiave = nomeChiave
		var s = localStorage.getItem(this.chiave);
 		if (s !== null) {
			this.proprieta = JSON.parse(s);
 		} else if(typeof((valoreDefault) !== 'undefined') &&
 			(valoreDefault !== null)) {
			this.proprieta = valoreDefault;
 		} else {
 			this.proprieta = {};
 		}
	}
	
	salva() {
		localStorage.setItem(this.chiave. JSON.stringify(proprieta));
	}
}