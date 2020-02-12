class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this.data = $('#data').value;
        this.quantidade = $('#quantidade').value;
        this.valor = $('#valor').value;
    }

    adicionar(event){
        event.preventDefault();
                
    }
}