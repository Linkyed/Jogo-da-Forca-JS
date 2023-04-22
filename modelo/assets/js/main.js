let palavras = ['Barril', 'Churrasco'];
let listaLetrasForca = [];
let escolhaPalavra = palavras[parseFloat(Math.floor((Math.random() * palavras.length)))];

let player = {
    nome: "Anonimo", chances: 6, acertos: 0
};

let letraDaForca = (letra, descoberta) => {
    let objeto = {letra: letra,
    descoberta: descoberta};
    return objeto;
}

function atualizarEspacosVazios(listaLetras) {
    let espacosVazios = '';
    listaLetras.forEach(caracter => {
        if (caracter.descoberta === false){
            espacosVazios += '_ ';
        } else {
            espacosVazios += caracter.letra + ' ';
        }
    });
    return espacosVazios;
}

function perguntarLetra() {
    let letra = ''
    let achou = false;
    while (letra.length !== 1 || !/^[a-zA-Z]+$/.test(letra)){
        letra = window.prompt("Digite a letra que você acha que existe na palavra");
    }
    listaLetrasForca.forEach(caracter => {
        if (caracter.letra.toLowerCase() === letra.toLowerCase()){
            caracter.descoberta = true;
            achou = true;
        }
    });
    if (achou === false){
        player.chances -= 1;
        if (player.chances === -1){
            alert('JOGO ACABOU!')
        }
        playerChances.innerHTML = 'Chances Restantes: ' + player.chances
    }
    palavraHtml.innerHTML = atualizarEspacosVazios(listaLetrasForca);
}

for(let i = 0; i < escolhaPalavra.length; i++){
    listaLetrasForca.push(letraDaForca(escolhaPalavra[i], false))
}

const playerNome = document.querySelector('.nomePlayer');
const playerChances = document.querySelector('.chancesPlayer');
const playerPalavrasAcertadas = document.querySelector('.palavrasAcertadasPlayer');
const palavraHtml = document.querySelector('.palavra');

player.nome = window.prompt("Digite o nome do seu player"); 

playerNome.innerHTML = 'Player: ' + player.nome;

palavraHtml.innerHTML = atualizarEspacosVazios(listaLetrasForca);


