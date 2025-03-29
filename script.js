const numDiscs = 3;
let moveCount = 0;
const moveCounterEl = document.getElementById('moveCounter');
const gameBoard = document.getElementById('gameBoard');
const menuOverlay = document.getElementById('menuOverlay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function initGame() {
  moveCount = 0;
  moveCounterEl.textContent = 'Movimentos: 0';
  document.querySelectorAll('.column').forEach(col => col.innerHTML = '');
  resetBtn.style.display = 'none';

  for (let i = numDiscs; i >= 1; i--) {
    const disc = document.createElement('div');
    disc.classList.add('disc');
    disc.setAttribute('draggable', 'true');
    disc.dataset.size = i;
    disc.style.width = (i * 30 + 40) + 'px';
    disc.textContent = i;
    addDragEvents(disc);
    document.getElementById('col1').appendChild(disc);
  }
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
    if (document.getElementById('col3').children.length === numDiscs)
      setTimeout(() => resetBtn.style.display = 'flex', 100);
  });
});

startBtn.addEventListener('click', () => {
  menuOverlay.style.display = 'none';
  gameBoard.style.display = 'flex';
  initGame();
});

resetBtn.addEventListener('click', initGame);
