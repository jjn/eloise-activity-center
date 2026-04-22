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
          { d: 'M150 30 L30 140 L270 140 Z', colorNum: 1, labelX: 150, labelY: 100 },
          // Front wall
          { d: 'M50 140 L250 140 L250 270 L50 270 Z', colorNum: 3, labelX: 85, labelY: 250 },
          // Door
          { d: 'M125 180 L175 180 L175 270 L125 270 Z', colorNum: 4, labelX: 150, labelY: 220 },
          // Left window
          { d: 'M65 155 L115 155 L115 200 L65 200 Z', colorNum: 2, labelX: 90, labelY: 178 },
          // Right window
          { d: 'M185 155 L235 155 L235 200 L185 200 Z', colorNum: 2, labelX: 210, labelY: 178 },
          // Chimney
          { d: 'M210 30 L245 30 L245 100 L210 100 Z', colorNum: 6, labelX: 228, labelY: 65 },
        ]
      },
      {
        name: 'Butterfly',
        viewBox: '0 0 340 320',
        regions: [
          // Body (wider for label visibility)
          { d: 'M155 70 L185 70 L180 280 L160 280 Z', colorNum: 5, labelX: 170, labelY: 190 },
          // Upper left wing
          { d: 'M155 100 Q40 20 25 130 Q45 185 155 155 Z', colorNum: 2, labelX: 85, labelY: 120 },
          // Upper right wing
          { d: 'M185 100 Q300 20 315 130 Q295 185 185 155 Z', colorNum: 2, labelX: 255, labelY: 120 },
          // Lower left wing
          { d: 'M155 160 Q45 185 35 245 Q75 295 155 225 Z', colorNum: 6, labelX: 85, labelY: 230 },
          // Lower right wing
          { d: 'M185 160 Q295 185 305 245 Q265 295 185 225 Z', colorNum: 6, labelX: 255, labelY: 230 },
          // Left wing dot
          { d: 'M80 110 A20 20 0 1 1 80 150 A20 20 0 1 1 80 110 Z', colorNum: 1, labelX: 80, labelY: 130 },
          // Right wing dot
          { d: 'M260 110 A20 20 0 1 1 260 150 A20 20 0 1 1 260 110 Z', colorNum: 1, labelX: 260, labelY: 130 },
        ]
      },
      {
        name: 'Flower',
        viewBox: '0 0 340 340',
        regions: [
          // Stem
          { d: 'M155 200 L185 200 L180 330 L160 330 Z', colorNum: 3, labelX: 170, labelY: 275 },
          // Left leaf
          { d: 'M160 255 Q100 230 85 265 Q105 300 160 275 Z', colorNum: 3, labelX: 115, labelY: 268 },
          // Right leaf
          { d: 'M180 235 Q240 215 250 248 Q230 280 180 255 Z', colorNum: 3, labelX: 220, labelY: 250 },
          // Top petal
          { d: 'M170 40 Q215 65 208 115 Q170 140 132 115 Q125 65 170 40 Z', colorNum: 1, labelX: 170, labelY: 85 },
          // Right petal
          { d: 'M210 95 Q245 70 270 110 Q280 155 245 170 Q210 162 210 95 Z', colorNum: 4, labelX: 248, labelY: 128 },
          // Bottom right petal
          { d: 'M235 175 Q270 188 265 228 Q248 258 215 240 Q200 205 235 175 Z', colorNum: 6, labelX: 240, labelY: 210 },
          // Bottom left petal
          { d: 'M105 175 Q70 188 75 228 Q92 258 125 240 Q140 205 105 175 Z', colorNum: 6, labelX: 100, labelY: 210 },
          // Left petal
          { d: 'M130 95 Q95 70 70 110 Q60 155 95 170 Q130 162 130 95 Z', colorNum: 4, labelX: 92, labelY: 128 },
          // Center
          { d: 'M170 120 A35 35 0 1 1 170 190 A35 35 0 1 1 170 120 Z', colorNum: 4, labelX: 170, labelY: 155 },
        ]
      },
      {
        name: 'Star',
        viewBox: '0 0 300 300',
        regions: [
          // Outer star
          { d: 'M150 20 L180 110 L270 110 L195 165 L220 260 L150 205 L80 260 L105 165 L30 110 L120 110 Z', colorNum: 4, labelX: 230, labelY: 240 },
          // Inner pentagon
          { d: 'M150 100 L175 150 L165 195 L135 195 L125 150 Z', colorNum: 6, labelX: 150, labelY: 155 },
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
      });
      // Render labels on top of all regions so they're never hidden behind shapes
      pic.regions.forEach((r, i) => {
        svg += `<circle cx="${r.labelX}" cy="${r.labelY}" r="12" fill="white" stroke="#999" stroke-width="1" class="label-bg" data-label-for="${i}"/>`;
        svg += `<text x="${r.labelX}" y="${r.labelY}" data-label-for="${i}">${r.colorNum}</text>`;
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
            const idx = region.dataset.region;
            canvas.querySelectorAll(`[data-label-for="${idx}"]`).forEach(el => {
              el.style.display = 'none';
            });
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
