//Criando a classe
class Produto{
    //Chamando a função construtora nativa do JS
    constructor(){
        this.id = 1
        
        //Criando Array que vai receber os dados dos produtos
        this.arrayProdutos = [];
    }

    Adicionar(){
        //Chamando a função de Ler Dados
        let produto = this.lerDados()

        /* *************************************************
            O this está validando se os campos foram preenhidos coretamete
            se não estiverem preenchidos não entra aqui 
        *************************************************** */
        if(this.validar(produto) == true){
            this.Salvar(produto)
        }
        //Chama a função listar criada nesta classe para adicionar os itens no grid
        this.Listar()
        this.Cancelar()
    }

    //Criando a função Ler Dados
    lerDados(){
        //Criando o Ojeteo Produto
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('pdNome').value
        produto.precoProduto = document.getElementById('pdPreco').value

        return produto
    }

    validar(produto){
        let msg = '';

        if(produto.nomeProduto == ''){
            msg += 'Produto não pode ser vazio. \nPor favor insira corretamete o nome do produto! \n'
        }

        if(produto.precoProduto == ''){
            msg += 'O Preço não pode ser vazio. \nPor favor insira corretamete o preço do produto! \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }

        return true
    }

    /* ***************************************************
        Esta função vai mandar as informações para o 
        Array Produtos criado no metodo construtor no inicio 
        desta classe 
    ***************************************************** */
    Salvar(produto){

        /* *************************************************
            O *PUSH* é utilizado para mandar os dados para dentro do produto populando o Array
        ************************************************* */
        this.arrayProdutos.push(produto)
        this.id++
    }

    Listar(){
        let tbody = window.document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++){
            //insertRow é uma função nativa do JavaScript que permita inserir no DOM uma nova linha
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_del = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].precoProduto;
            
            //Criando o eletemddo img para cada linha nova do grid
            let imagem = document.createElement('img');
            imagem.src = './Icone/del.png'

            //Definindo a a função do click e agarantindo que use o id do produto selecionado
            imagem.setAttribute("onclick", "produto.Deletar("+ this.arrayProdutos[i].id +")")
            td_del.appendChild(imagem)
        }
    }

    Cancelar(){
        document.getElementById('pdNome').value = ''
        document.getElementById('pdPreco').value = ''
    }

    Deletar(id){
        let tbody = document.getElementById('tbody')

        for(let i = 0; i < this.arrayProdutos.length; i++){
            
            if(this.arrayProdutos[i].id == id){
                //Aqui é utilizado a função *SPLICE* nativa do JavaScript para excluir oitem selecionado
                this.arrayProdutos.splice(i, 1)
                //Aqui deleta a linha correnspondente ao id selecionado na lixeira
                tbody.deleteRow(i)
            }
            
        }
        alert(`O item ${id} foi deletetado com sucesso!`)
    }
}

/* ***********************************************
    Instanciando a Classe
    + A variável produto criada a segui é um objeto da CLASSE
    + O objeto aciona a função adicionar e o o bjeto aciona a 
      CLASSE, e cria um novo produto
*************************************************** */
var produto = new Produto();
