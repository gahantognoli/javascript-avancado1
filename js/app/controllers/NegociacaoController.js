class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
    }

    adicionar(event){
        event.preventDefault();

        this._listaNegociacoes.adicionar(this._criaNegociacao());

        this._limpaFormulario();
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._data.value), 
            this._quantidade.value,
            this._valor.value
        );
    }

    _limpaFormulario(){
        this._data.value = '';
        this._quantidade = 1;
        this._valor = 0.0;

        this._data.focus();
    }
}