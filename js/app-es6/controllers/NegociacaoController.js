class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvazia');

        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagemView')), 'texto');

        this._service = new NegociacaoService();
        this._init();
    }

    _init() {
        this._service
            .listar()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)))
            .catch(erro => {
                this._mensagem.texto = erro;
            });

        setInterval(() => { this.importaNegociacoes() }, 3000)
    }

    adicionar(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        this._service
            .apagar()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._data.value),
            parseInt(this._quantidade.value),
            parseFloat(this._valor.value)
        );
    }

    _limpaFormulario() {
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }
}