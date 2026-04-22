// ── Color by Numbers ──

App.register('coloring', {
  title: '🎨 Color by Numbers',
  init(container) {
    const colors = [
      { num: 1, name: 'Red', hex: '#ef5350' },
      { num: 2, name: 'Blue', hex: '#42a5f5' },
      { num: 3, name: 'Green', hex: '#66bb6a' },
      { num: 4, name: 'Yellow', hex: '#ffee58' },
      { num: 5, name: 'Purple', hex: '#ab47bc' },
      { num: 6, name: 'Orange', hex: '#ffa726' },
    ];

    // Each picture: { name, viewBox, regions: [{ d, colorNum, labelX, labelY }] }
    const pictures = [
      {
        name: 'House',
        viewBox: '0 0 300 300',
        regions: [
          // Roof (triangle)
          { d: 'M150 30 L30 140 L270 140 Z', colorNum: 1, labelX: 150, labelY: 110 },
          // Front wall
          { d: 'M50 140 L250 140 L250 270 L50 270 Z', colorNum: 3, labelX: 150, labelY: 205 },
          // Door
          { d: 'M125 180 L175 180 L175 270 L125 270 Z', colorNum: 4, labelX: 150, labelY: 230 },
          // Left window
          { d: 'M65 160 L110 160 L110 200 L65 200 Z', colorNum: 2, labelX: 87, labelY: 180 },
          // Right window
          { d: 'M190 160 L235 160 L235 200 L190 200 Z', colorNum: 2, labelX: 212, labelY: 180 },
          // Chimney
          { d: 'M210 30 L240 30 L240 100 L210 100 Z', colorNum: 6, labelX: 225, labelY: 65 },
        ]
      },
      {
        name: 'Butterfly',
        viewBox: '0 0 300 300',
        regions: [
          // Body
          { d: 'M140 80 L160 80 L155 260 L145 260 Z', colorNum: 5, labelX: 150, labelY: 170 },
          // Upper left wing
          { d: 'M140 100 Q40 30 30 120 Q50 170 140 150 Z', colorNum: 2, labelX: 85, labelY: 110 },
          // Upper right wing
          { d: 'M160 100 Q260 30 270 120 Q250 170 160 150 Z', colorNum: 2, labelX: 215, labelY: 110 },
          // Lower left wing
          { d: 'M140 150 Q50 170 40 230 Q80 280 140 210 Z', colorNum: 6, labelX: 85, labelY: 210 },
          // Lower right wing
          { d: 'M160 150 Q250 170 260 230 Q220 280 160 210 Z', colorNum: 6, labelX: 215, labelY: 210 },
          // Left wing dot
          { d: 'M75 105 A15 15 0 1 1 75 135 A15 15 0 1 1 75 105 Z', colorNum: 1, labelX: 75, labelY: 120 },
          // Right wing dot
          { d: 'M225 105 A15 15 0 1 1 225 135 A15 15 0 1 1 225 105 Z', colorNum: 1, labelX: 225, labelY: 120 },
        ]
      },
      {
        name: 'Flower',
        viewBox: '0 0 300 300',
        regions: [
          // Stem
          { d: 'M140 170 L160 170 L155 290 L145 290 Z', colorNum: 3, labelX: 150, labelY: 240 },
          // Left leaf
          { d: 'M145 220 Q100 200 90 230 Q110 260 145 240 Z', colorNum: 3, labelX: 115, labelY: 230 },
          // Right leaf
          { d: 'M155 200 Q200 180 210 210 Q190 240 155 220 Z', colorNum: 3, labelX: 185, labelY: 210 },
          // Top petal
          { d: 'M150 50 Q185 70 180 110 Q150 130 120 110 Q115 70 150 50 Z', colorNum: 1, labelX: 150, labelY: 85 },
          // Right petal
          { d: 'M185 100 Q210 80 230 110 Q240 145 210 155 Q180 150 185 100 Z', colorNum: 4, labelX: 210, labelY: 120 },
          // Bottom right petal
          { d: 'M200 155 Q230 165 225 200 Q210 225 180 210 Q170 175 200 155 Z', colorNum: 6, labelX: 200, labelY: 185 },
          // Bottom left petal
          { d: 'M100 155 Q70 165 75 200 Q90 225 120 210 Q130 175 100 155 Z', colorNum: 6, labelX: 100, labelY: 185 },
          // Left petal
          { d: 'M115 100 Q90 80 70 110 Q60 145 90 155 Q120 150 115 100 Z', colorNum: 4, labelX: 90, labelY: 120 },
          // Center
          { d: 'M150 115 A30 30 0 1 1 150 175 A30 30 0 1 1 150 115 Z', colorNum: 4, labelX: 150, labelY: 145 },
        ]
      },
      {
        name: 'Star',
        viewBox: '0 0 300 300',
        regions: [
          // Outer star
          { d: 'M150 20 L180 110 L270 110 L195 165 L220 260 L150 205 L80 260 L105 165 L30 110 L120 110 Z', colorNum: 4, labelX: 150, labelY: 130 },
          // Inner pentagon
          { d: 'M150 90 L175 150 L155 195 L145 195 L125 150 Z', colorNum: 6, labelX: 150, labelY: 155 },
        ]
      }
    ];

    let currentPic = 0;
    let selectedColor = null;

    const wrap = document.createElement('div');
    wrap.className = 'coloring-container';

    const nav = document.createElement('div');
    nav.className = 'coloring-nav';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Prev';
    prevBtn.addEventListener('click', () => changePic(-1));

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.addEventListener('click', () => changePic(1));

    const picLabel = document.createElement('span');
    picLabel.className = 'coloring-label';

    nav.appendChild(prevBtn);
    nav.appendChild(picLabel);
    nav.appendChild(nextBtn);

    const canvas = document.createElement('div');
    canvas.className = 'coloring-canvas';

    const palette = document.createElement('div');
    palette.className = 'color-palette';

    colors.forEach(c => {
      const swatch = document.createElement('button');
      swatch.className = 'color-swatch';
      swatch.style.background = c.hex;
      swatch.textContent = c.num;
      swatch.setAttribute('aria-label', `${c.name} (${c.num})`);
      swatch.addEventListener('click', () => {
        palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        selectedColor = c;
      });
      palette.appendChild(swatch);
    });

    wrap.appendChild(nav);
    wrap.appendChild(canvas);
    wrap.appendChild(palette);
    container.appendChild(wrap);

    function renderPicture() {
      const pic = pictures[currentPic];
      picLabel.textContent = pic.name;
      prevBtn.disabled = currentPic === 0;
      nextBtn.disabled = currentPic === pictures.length - 1;

      let svg = `<svg viewBox="${pic.viewBox}" xmlns="http://www.w3.org/2000/svg">`;
      pic.regions.forEach((r, i) => {
        svg += `<path d="${r.d}" data-region="${i}" data-color-num="${r.colorNum}" fill="white"/>`;
        svg += `<text x="${r.labelX}" y="${r.labelY}">${r.colorNum}</text>`;
      });
      svg += '</svg>';
      canvas.innerHTML = svg;

      canvas.querySelectorAll('[data-region]').forEach(region => {
        region.addEventListener('click', () => {
          if (!selectedColor) return;
          region.setAttribute('fill', selectedColor.hex);
          // Hide number label when colored correctly
          const num = parseInt(region.dataset.colorNum);
          if (selectedColor.num === num) {
            const text = region.nextElementSibling;
            if (text && text.tagName === 'text') {
              text.style.display = 'none';
            }
          }
          checkComplete();
        });
      });
    }

    function checkComplete() {
      const regions = canvas.querySelectorAll('[data-region]');
      const allCorrect = [...regions].every(r => {
        const expected = colors.find(c => c.num === parseInt(r.dataset.colorNum));
        return r.getAttribute('fill') === expected.hex;
      });
      if (allCorrect) {
        setTimeout(() => App.celebrate('Beautiful! 🎨'), 300);
      }
    }

    function changePic(dir) {
      currentPic = Math.max(0, Math.min(pictures.length - 1, currentPic + dir));
      selectedColor = null;
      palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      renderPicture();
    }

    renderPicture();
  }
});
