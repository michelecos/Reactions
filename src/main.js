console.log('Hello, world!');
var React = require('react');
var ReactDOM = require('react-dom');

var percorsi = {
	museo: [
		{
			nome: 'il mio museo',
			indirizzo: 'via di Qua',
			percorso: [
				{
					linkUrl: 'prima',
					immagine: 'prima',
					titolo: 'la prima foto',
					abstract: 'questa è la prima foto'
				},
				{
					linkUrl: 'seconda',
					immagine: 'seconda',
					titolo: 'la seconda foto',
					abstract: 'questa è la seconda foto'
				},
				{
					linkUrl: 'terza',
					immagine: 'terza',
					titolo: 'la terza foto',
					abstract: 'questa è la terza foto'
				},
				{
					linkUrl: 'quarta',
					immagine: 'quarta',
					titolo: 'la quarta foto',
					abstract: 'questa è la quarta foto'
				},
			]
		}
	]
};

var telaioPagina = React.createClass({
	render: function() {
		var schede = [];
		this.props.percorsi.museo[0].percorso.forEach(function(percorso) {
			schede.push(<schedaElemento percorso={percorso} />);
			lastCategory = percorso.category;
		});
		return (
			<div>
				<h1>{this.props.percorsi.percorso[0].nome}</h1>
				<div>{schede}</div>
			</div>
		);
	}
});

var schedaElemento = React.createClass({
	render: function() {
		<div class="mdl-card_media mdl-shadow--2dp mdl-cell mdl-cell--2-col oym-tappa-card">
			<a class="oym-image-background" href="{this.props.percorso.linkUrl}">
				<div class="oym-percorso-card__image" style="background: url('assets/{this.props.percorso.immagine}') center / cover;"></div>
				<div class="mdl-card__title">
					{this.props.titolo}
				</div>
			</a>
			<div class="mdl-card__supporting-text">
				{this.props.percorso.abstract}
			</div>
		</div>		
	}
})


ReactDOM.render(
	<telaioPagina percorsi={percorsi} />,
	document.getElementById('container')
);
