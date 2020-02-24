class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvazia');

        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagemView')), 'texto');
    }

    adicionar(event){
        event.preventDefault();
        this._listaNegociacoes.adicionar(this._criaNegociacao());
        this._mensagem.texto = 'Negociação inserida com sucesso!';
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        service.obterNegociacoesSemana((erro, negociacoes) => {
            if(erro){
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!';
        });
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações removidas com sucesso!';
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