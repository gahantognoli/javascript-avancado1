class ListaNegociacoes {
    
    constructor() {
        this._negociacoes = [];
    }

    adicionar(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes); //cria uma copia do array da minha instancia.
    }

}