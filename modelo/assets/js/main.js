const palavras = [
  'abacaxi', 'abajur', 'amigo', 'amor', 'anjo', 'ano', 'apito', 'areia', 'arma', 'arte',
  'asa', 'ave', 'azul', 'bala', 'barco', 'batata', 'beijo', 'bife', 'bola', 'bolacha',
  'boneca', 'borboleta', 'brilho', 'cabelo', 'cachorro', 'cafe', 'caixa', 'cama', 'camisa', 'caneca',
  'caneta', 'capa', 'carro', 'carta', 'casa', 'chapéu', 'chinelo', 'cidade', 'cobertor', 'coelho',
  'colher', 'comida', 'computador', 'copo', 'coração', 'corpo', 'corte', 'criança', 'cruz', 'dança',
  'dedo', 'dente', 'dia', 'dinheiro', 'doce', 'dor', 'dragão', 'elefante', 'escada', 'escola',
  'esporte', 'estrela', 'faca', 'fada', 'fala', 'família', 'festa', 'fogo', 'folha', 'foto',
  'frango', 'frio', 'futebol', 'garfo', 'gato', 'gelo', 'girafa', 'gota', 'grama', 'guerra',
  'guitarra', 'hora', 'igreja', 'ilha', 'imagem', 'infância', 'inverno', 'janela', 'joelho', 'jogo',
  'lado', 'lago', 'laranja', 'leite', 'letra', 'livro', 'lua', 'maçã', 'mala', 'mar',
  'médico', 'mel', 'menina', 'mesa', 'mexerica', 'mochila', 'moda', 'mola', 'monstro', 'morte',
  'mundo', 'nadar', 'navio', 'neve', 'noite', 'nome', 'notícia', 'novo', 'olho', 'ovo',
  'pão', 'palhaço', 'papagaio', 'parede', 'passarinho', 'pato', 'pé', 'peixe', 'piano', 'pincel',
  'pintar', 'pirata', 'piscina', 'pote', 'prato', 'professor', 'princesa', 'pular', 'quarto', 'queijo',
  'quente', 'quieto', 'raiva', 'rainha', 'rato', 'relógio', 'rio', 'riso', 'roda', 'roupa',
  'sabor', 'sair', 'sangue', 'sapato', 'saudade', 'seis', 'selva', 'sentir', 'sereia', 'sinal',
  'sono', 'sorriso', 'telefone', 'terra', 'tigre', 'tinta', 'tio', 'tiro', 'toca', 'tubarão',
  'unha', 'urso', 'vaso', 'verão']
// const escolhaPalavra = palavras[parseFloat(Math.floor((Math.random() * palavras.length)))]
let listaLetrasPalavra = []
let palavraAtual = ''

const player = {
  nome: 'Anonimo', chances: 6, acertos: 0
}

const letraDaForca = (letra, descoberta) => {
  const objeto = {
    letra,
    descoberta
  }
  return objeto
}

const randomizarPalavra = () => palavras[parseFloat(Math.floor((Math.random() * palavras.length)))]
const resetarPlayer = () => { player.chances = 6; player.acertos = 0 }

const criarListaLetras = (palavraEscolhida) => {
  const lista = []
  for (let i = 0; i < palavraEscolhida.length; i++) {
    lista.push(letraDaForca(palavraEscolhida[i], false))
  }
  return lista
}

const gerarPalavra = () => {
  palavraAtual = randomizarPalavra()
  listaLetrasPalavra = criarListaLetras(palavraAtual)
  palavraHtml.innerHTML = atualizarEspacosVazios(listaLetrasPalavra)
}

function gameOver () {
  if (player.chances === -1) {
    window.alert('SUAS CHANCES ACABARAM!!\nREINICIANDO O JOGO...')
    resetarPlayer()
    gerarPalavra()
  }
}

function palavraCompleta (listaLetras) {
  let completada = true
  listaLetras.forEach(element => {
    if (element.descoberta === false) {
      completada = false
    }
  })
  if (completada === true) {
    player.acertos += 1
    playerPalavrasAcertadas.innerHTML = 'Palavras Acertadas : ' + player.acertos
    gerarPalavra()
    window.alert('Parabens!!!!!\nAgora descubra a proxima palavra!')
  }
}

function diminuirChances (acerto) {
  if (acerto === false) {
    player.chances -= 1
    gameOver()
    playerChances.innerHTML = 'Chances Restantes: ' + player.chances
    playerPalavrasAcertadas.innerHTML = 'Palavras Acertadas : ' + player.acertos
  }
}

function atualizarEspacosVazios (listaLetras) {
  let espacosVazios = ''
  listaLetras.forEach(caracter => {
    if (caracter.descoberta === false) {
      espacosVazios += '_ '
    } else {
      espacosVazios += caracter.letra + ' '
    }
  })
  return espacosVazios
}

function perguntarLetra () {
  let letra = ''
  let achou = false
  while (letra.length !== 1 || !/^[a-zA-Z]+$/.test(letra)) {
    letra = window.prompt('Digite a letra que você acha que existe na palavra')
  }
  listaLetrasPalavra.forEach(caracter => {
    if (caracter.letra.toLowerCase() === letra.toLowerCase()) {
      caracter.descoberta = true
      achou = true
    }
  })
  palavraHtml.innerHTML = atualizarEspacosVazios(listaLetrasPalavra)
  diminuirChances(achou)
  palavraCompleta(listaLetrasPalavra)
}

const playerNome = document.querySelector('.nomePlayer')
const playerChances = document.querySelector('.chancesPlayer')
const playerPalavrasAcertadas = document.querySelector('.palavrasAcertadasPlayer')
const palavraHtml = document.querySelector('.palavra')

player.nome = window.prompt('Digite o nome do seu player')

playerNome.innerHTML = 'Player: ' + player.nome

gerarPalavra()
