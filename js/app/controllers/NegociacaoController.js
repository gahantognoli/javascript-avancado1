class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvazia');

        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagemView')), 'texto');

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });
    }

    adicionar(event) {
        event.preventDefault();

        ConnectionFactory.getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection).adicionar(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adicionar(negociacao);
                        this._mensagem.texto = 'Negociação inserida com sucesso!';
                        this._limpaFormulario();
                    });
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente => 
                        JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao))))
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });
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