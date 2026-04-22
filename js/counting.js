// ── Counting Objects ──

App.register('counting', {
  title: '🔢 Counting',
  init(container) {
    const items = [
      { name: 'apples', emoji: '🍎' },
      { name: 'stars', emoji: '⭐' },
      { name: 'fish', emoji: '🐟' },
      { name: 'flowers', emoji: '🌸' },
      { name: 'butterflies', emoji: '🦋' },
      { name: 'bananas', emoji: '🍌' },
      { name: 'hearts', emoji: '❤️' },
      { name: 'cookies', emoji: '🍪' },
    ];

    let score = 0;
    let rounds = 0;
    const totalRounds = 8;

    const wrap = document.createElement('div');
    wrap.className = 'counting-container';

    const scoreEl = document.createElement('div');
    scoreEl.className = 'counting-score';

    const prompt = document.createElement('div');
    prompt.className = 'counting-prompt';

    const objectsEl = document.createElement('div');
    objectsEl.className = 'counting-objects';

    const feedback = document.createElement('div');
    feedback.className = 'counting-feedback';

    const buttonsEl = document.createElement('div');
    buttonsEl.className = 'counting-buttons';

    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement('button');
      btn.className = 'counting-btn';
      btn.textContent = i;
      btn.addEventListener('click', () => answer(i));
      buttonsEl.appendChild(btn);
    }

    wrap.appendChild(scoreEl);
    wrap.appendChild(prompt);
    wrap.appendChild(objectsEl);
    wrap.appendChild(feedback);
    wrap.appendChild(buttonsEl);
    container.appendChild(wrap);

    let correctAnswer = 0;
    let answered = false;

    function newRound() {
      answered = false;
      feedback.textContent = '';
      const item = items[Math.floor(Math.random() * items.length)];
      correctAnswer = 1 + Math.floor(Math.random() * 5);

      prompt.textContent = `How many ${item.name}?`;
      objectsEl.innerHTML = '';

      for (let i = 0; i < correctAnswer; i++) {
        const span = document.createElement('span');
        span.className = 'counting-item';
        span.textContent = item.emoji;
        span.style.animationDelay = `${i * 0.1}s`;
        objectsEl.appendChild(span);
      }

      scoreEl.textContent = `Round ${rounds + 1} / ${totalRounds}  •  Score: ${score}`;
      enableButtons(true);
    }

    function answer(n) {
      if (answered) return;

      if (n === correctAnswer) {
        answered = true;
        score++;
        feedback.textContent = '✅ That\'s right! Great job!';
        feedback.style.color = '#4caf50';
        rounds++;

        if (rounds >= totalRounds) {
          enableButtons(false);
          setTimeout(() => App.celebrate(`${score}/${totalRounds} 🏆`), 600);
        } else {
          setTimeout(newRound, 1200);
        }
      } else {
        feedback.textContent = '🤔 Try again!';
        feedback.style.color = '#ff9800';
      }
    }

    function enableButtons(enabled) {
      buttonsEl.querySelectorAll('button').forEach(b => b.disabled = !enabled);
    }

    newRound();
  }
});
