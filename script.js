let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
//o context renderiza o canvas em 2d
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
  //math.floor tira a parte flutuante do mathRandom, ou seja, num inteiro.
  //math.random retorna sempre um número aleatório ate 1. 15 é o tamanho do canvas
};

function criarBG() {
  context.fillStyle = 'lightgreen';
  //fillstyle trabalha com o estilo do canvas
  context.fillRect(0, 0, 16 * box, 16 * box);
  //fillrect desenha o retagulo onde acontece o jogo.
  //trabalha com 4 parametros: a posição de x e y, altura e largura.
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  // 37 é direita, 38 pra baixo, 39 esquerda e 40 cima
  // a direção nao pode ser oposta a que esta sendo criada, exemplo:
  //se é pra direita, nao pode voltar pra tras.
  //o if acima significa: se direcao nao for right, muda pra left e assim segue a logica:
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
  //essa é a lógica para a cobra não "fugir" do quadrado verde (canvas)
  //quando a cobra atingir o ultimo numero(pixel do canvas), ela volta pro zero
  //sempre lembrar do plano cartesiano

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over :(');
      alert('Recarregue a página para iniciar novamente');
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'right') snakeX += box; //se a direcao for right acrescenta um quadradinho a mais
  if (direction == 'left') snakeX -= box;
  //lógica do plano cartesiano(a direita aumenta e a esquerda diminui)
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
