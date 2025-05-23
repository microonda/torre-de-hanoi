let fases = 1;
let numDiscs = 3;
let moveCount = 0;

const moveCounterEl = document.getElementById('moveCounter');
const gameBoard = document.getElementById('gameBoard');
const menuOverlay = document.getElementById('menuOverlay');
const startBtn = document.getElementById('startBtn');
const avancBtn = document.getElementById('avancBtn');
const resetBtn = document.getElementById('resetBtn');

function startGame() {
  // resetando css dos botões e pop up
  resetBtn.style.display = 'hidden';
  avancBtn.style.display = "hidden";

  moveCounterEl.textContent = 'Movimentos: 0';
  document.querySelectorAll('.column').forEach(col => col.innerHTML = '');
  resetBtn.style.display = 'none';
  
  for (let i = numDiscs; i >= 1; i--) {
    const disc = document.createElement('div');
    const cor = gerarCorPorNivel(numDiscs);
    
    // Cria os discos e muda suas propriedades automaticamente
    disc.classList.add('disc');
    disc.setAttribute('draggable', 'true');
    disc.dataset.size = i;
    disc.style.width = (i * 30 + 40) + 'px';
    disc.textContent = i;
    disc.style.backgroundColor = cor;
    
    // Adiciona os discos na Tela
    addDragEvents(disc);
    document.getElementById('col1').appendChild(disc);
  }
  // reset nas variáveis de ambiente
  fase.textContent = 'Você concluiu com sucesso a fase ' + fases + '!';
  moveCount = 0;
}

function addDragEvents(disc) {
  disc.addEventListener('dragstart', dragStart);
  disc.addEventListener('dragend', dragEnd);
}

let draggedDisc = null;
function dragStart(e) {
  if (this !== this.parentElement.lastElementChild) return e.preventDefault();
  draggedDisc = this;
  setTimeout(() => this.style.visibility = 'hidden', 0);
}

function dragEnd() {
  this.style.visibility = 'visible';
  draggedDisc = null;
}

document.querySelectorAll('.column').forEach(column => {
  column.addEventListener('dragover', e => e.preventDefault());
  column.addEventListener('drop', function() {
    if (!draggedDisc) return;
    const topDisc = this.lastElementChild;
    if (topDisc && parseInt(draggedDisc.dataset.size) > parseInt(topDisc.dataset.size)) return;
    this.appendChild(draggedDisc);
    moveCounterEl.textContent = 'Movimentos: ' + (++moveCount);
    let win = document.getElementById('col3').children.length === numDiscs
    if (win) {
      resetBtn.style.display = 'flex';
      avancBtn.style.display = "flex";
    }
  });
});

startBtn.addEventListener('click', () => {
  menuOverlay.style.display = 'none';
  gameBoard.style.display = 'flex';
  startGame();
});

avancBtn.addEventListener('click', vitoria);
resetBtn.addEventListener('click', startGame);

const popup = document.getElementById('victoryPopup');
const fase = document.getElementById('fase');

function vitoria() {
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('show'), 10);
}

function sumirVitoria() {
  avancBtn.style.display = 'none'
  popup.classList.add('hidden')
}

function proximaFase() {
  // Aumenta o número de discos
  numDiscs += 1;
  fases++;
}

function gerarCorPorNivel(nivel) {
    const hue = (nivel * 137.508) % 360; // bom espaçamento de cores
    return `hsl(${hue}, 70%, 50%)`;
  }
