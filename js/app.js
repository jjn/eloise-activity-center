// ── App Navigation & Shared Utilities ──

const App = (() => {
  const landing = document.getElementById('landing');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayContent = document.getElementById('overlay-content');
  const backBtn = document.getElementById('back-btn');
  const celebrationEl = document.getElementById('celebration');

  const activities = {};
  let currentActivity = null;

  function register(name, activity) {
    activities[name] = activity;
  }

  function open(name) {
    const activity = activities[name];
    if (!activity) return;

    currentActivity = name;
    overlayTitle.textContent = activity.title;
    overlayContent.innerHTML = '';
    overlay.classList.remove('hidden');
    landing.style.display = 'none';
    activity.init(overlayContent);
  }

  function close() {
    overlay.classList.add('hidden');
    landing.style.display = '';
    if (currentActivity && activities[currentActivity].cleanup) {
      activities[currentActivity].cleanup();
    }
    currentActivity = null;
  }

  function celebrate(message = '⭐ Great Job! ⭐') {
    celebrationEl.classList.remove('hidden');
    celebrationEl.innerHTML = '';

    const emojis = ['⭐', '🌟', '✨', '🎉', '💫', '🥳', '🎊'];
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 200;
      star.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      star.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      star.style.animationDelay = `${Math.random() * 0.3}s`;
      celebrationEl.appendChild(star);
    }

    const text = document.createElement('div');
    text.className = 'big-text';
    text.textContent = message;
    celebrationEl.appendChild(text);

    setTimeout(() => {
      celebrationEl.classList.add('hidden');
    }, 1800);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Event listeners
  document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => open(card.dataset.activity));
  });

  backBtn.addEventListener('click', close);

  return { register, open, close, celebrate, shuffle };
})();
