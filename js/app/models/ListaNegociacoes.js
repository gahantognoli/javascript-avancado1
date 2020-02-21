class ListaNegociacoes {
    
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adicionar(negociacao){
        this._negociacoes.push(negociacao);
        this._armadilha();
    }

    get negociacoes() {
        return [].concat(this._negociacoes); //cria uma copia do array da minha instancia.
    }

    esvazia() {
        this._negociacoes = [];
        this._armadilha();
    }

}