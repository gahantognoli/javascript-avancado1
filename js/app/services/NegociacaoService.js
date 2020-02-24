class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(
                        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(`Falha ao realizar requisição. Detalhes: ${erro}`);
                    reject('Não foi possivel obter as negociações da semana!')
                });
        });
    }

    obterNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(
                        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(`Falha ao realizar requisição. Detalhes: ${erro}`);
                    reject('Não foi possivel obter as negociações da semana anterior!')
                });
        });
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(
                        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(`Falha ao realizar requisição. Detalhes: ${erro}`);
                    reject('Não foi possivel obter as negociações da semana retrasada!')
                });
        });
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    }
}