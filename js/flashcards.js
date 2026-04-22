// ── Flashcards ──

App.register('flashcards', {
  title: '📖 Flashcards',
  init(container) {
    const words = [
      { word: 'Cat', emoji: '🐱' },
      { word: 'Dog', emoji: '🐶' },
      { word: 'Sun', emoji: '☀️' },
      { word: 'Fish', emoji: '🐟' },
      { word: 'Ball', emoji: '⚽' },
      { word: 'Tree', emoji: '🌳' },
      { word: 'Moon', emoji: '🌙' },
      { word: 'Star', emoji: '⭐' },
      { word: 'Bird', emoji: '🐦' },
      { word: 'Frog', emoji: '🐸' },
      { word: 'Bear', emoji: '🐻' },
      { word: 'Apple', emoji: '🍎' },
      { word: 'Cake', emoji: '🎂' },
      { word: 'Hat', emoji: '🎩' },
      { word: 'Rain', emoji: '🌧️' },
      { word: 'Boat', emoji: '⛵' },
      { word: 'Duck', emoji: '🦆' },
      { word: 'Egg', emoji: '🥚' },
    ];

    const shuffled = App.shuffle(words);
    let current = 0;

    const wrap = document.createElement('div');
    wrap.className = 'flashcard-container';

    const progress = document.createElement('div');
    progress.className = 'flashcard-progress';

    const card = document.createElement('div');
    card.className = 'flashcard';

    const nav = document.createElement('div');
    nav.className = 'flashcard-nav';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Prev';
    prevBtn.addEventListener('click', () => go(-1));

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.addEventListener('click', () => go(1));

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    wrap.appendChild(progress);
    wrap.appendChild(card);
    wrap.appendChild(nav);
    container.appendChild(wrap);

    function render() {
      const item = shuffled[current];
      const first = item.word[0];
      const rest = item.word.slice(1);
      card.innerHTML = `
        <div class="flashcard-emoji">${item.emoji}</div>
        <div class="flashcard-word"><span class="first-letter">${first}</span>${rest}</div>
        <div class="flashcard-hint">Starts with the letter <strong>${first}</strong>!</div>
      `;
      progress.textContent = `${current + 1} / ${shuffled.length}`;
      prevBtn.disabled = current === 0;
    }

    function go(dir) {
      current = Math.max(0, Math.min(shuffled.length - 1, current + dir));
      render();
      if (dir > 0 && current === shuffled.length - 1) {
        App.celebrate('All done! 🌟');
      }
    }

    render();
  }
});
