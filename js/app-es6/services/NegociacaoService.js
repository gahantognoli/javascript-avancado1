import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    cadastrar(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adicionar(negociacao))
            .then(() => 'Negociacao adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Erro('Não foi possível adicionar a negociação')
            });
    }

    listar() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            });
    }

    apagar() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente))))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar negociações');
            })
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