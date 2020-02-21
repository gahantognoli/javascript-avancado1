class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
        
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        console.log(this._listaNegociacoes);
        

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._negociacoesView.update(this._listaNegociacoes);
    }

    adicionar(event){
        event.preventDefault();

        this._listaNegociacoes.adicionar(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação inserida com sucesso!';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    apaga(){
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Negociações apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
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
        this._quantidade.value = 1;
        this._valor.value = 0.0;

        this._data.focus();
    }
}