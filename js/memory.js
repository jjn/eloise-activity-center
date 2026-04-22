// ── Memory Card Game ──

App.register('memory', {
  title: '🃏 Memory Game',
  init(container) {
    const animals = ['🐶', '🐱', '🐸', '🐵', '🐰', '🐻'];
    const cards = App.shuffle([...animals, ...animals]);

    let flipped = [];
    let matched = 0;
    let locked = false;

    const board = document.createElement('div');
    board.className = 'memory-board';

    cards.forEach((emoji, i) => {
      const cell = document.createElement('button');
      cell.className = 'memory-cell';
      cell.setAttribute('aria-label', 'Hidden card');
      cell.innerHTML = `
        <div class="memory-inner">
          <div class="memory-front">❓</div>
          <div class="memory-back">${emoji}</div>
        </div>
      `;
      cell.addEventListener('click', () => flipCard(cell, emoji, i));
      board.appendChild(cell);
    });

    container.appendChild(board);

    function flipCard(cell, emoji, index) {
      if (locked || cell.classList.contains('flipped') || cell.classList.contains('matched')) return;

      cell.classList.add('flipped');
      cell.setAttribute('aria-label', emoji);
      flipped.push({ cell, emoji, index });

      if (flipped.length === 2) {
        locked = true;
        const [a, b] = flipped;

        if (a.emoji === b.emoji) {
          a.cell.classList.add('matched');
          b.cell.classList.add('matched');
          matched++;
          flipped = [];
          locked = false;

          if (matched === animals.length) {
            setTimeout(() => App.celebrate('You did it! 🎉'), 400);
          }
        } else {
          setTimeout(() => {
            a.cell.classList.remove('flipped');
            b.cell.classList.remove('flipped');
            a.cell.setAttribute('aria-label', 'Hidden card');
            b.cell.setAttribute('aria-label', 'Hidden card');
            flipped = [];
            locked = false;
          }, 800);
        }
      }
    }
  }
});
