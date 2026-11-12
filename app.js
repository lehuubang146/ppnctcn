(function () {
  'use strict';

  const QUESTIONS = window.QUIZ_QUESTIONS || [];
  const TOPICS = window.QUIZ_TOPICS || [];
  const STORAGE_PROGRESS = 'ppnctcn_gh_quiz_progress_v1';
  const STORAGE_THEME = 'ppnctcn_gh_quiz_theme_v1';

  const ICONS = {
    flag: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    flagFilled: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    cross: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    image: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    zoom: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    prev: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    next: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
    play: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    award: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    shuffle: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  };

  const PRESETS = [
    { id: 'quick', title: 'Đề nhanh 30 câu', count: 30, minutes: 20, desc: 'Kiểm tra phản xạ nhanh theo giờ thi' },
    { id: 'standard', title: 'Đề tiêu chuẩn 50 câu', count: 50, minutes: 35, desc: 'Mô phỏng cấu trúc đề thi học phần' },
    { id: 'full', title: 'Full 107 câu', count: 107, minutes: 70, desc: 'Tổng duyệt toàn bộ ngân hàng câu hỏi' }
  ];

  const state = {
    mode: 'practice',
    theme: loadTheme(),
    progress: loadProgress(),
    practice: {
      topic: 'all',
      smart: 'all',
      instantFeedback: true,
      autoProof: true,
      shuffleQuestions: false,
      shuffleOptions: false,
      orderIds: QUESTIONS.map((q) => q.id),
      shuffledOptionsCache: {},
      currentIndex: 0,
      revealedIds: {},
      proofOpenIds: {},
      confirmReset: false
    },
    exam: {
      phase: 'setup',
      presetId: 'standard',
      topic: 'all',
      shuffleOptions: true,
      items: [],
      answers: {},
      flagged: {},
      currentIndex: 0,
      totalSeconds: 0,
      secondsLeft: 0,
      timerId: null,
      confirmSubmit: false,
      reviewFilter: 'all',
      reviewProofIds: {},
      savedWrongNotice: false
    },
    bank: {
      query: '',
      topic: 'all',
      subset: 'all',
      showAllAnswers: true,
      revealedSingle: {},
      proofOpenIds: {}
    }
  };

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS);
      if (!raw) return { answered: {}, wrongIds: [], flaggedIds: [] };
      const p = JSON.parse(raw);
      return {
        answered: p.answered || {},
        wrongIds: Array.isArray(p.wrongIds) ? p.wrongIds : [],
        flaggedIds: Array.isArray(p.flaggedIds) ? p.flaggedIds : []
      };
    } catch {
      return { answered: {}, wrongIds: [], flaggedIds: [] };
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(state.progress));
    } catch {}
    updateMasteryPill();
  }

  function loadTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return 'light';
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    try {
      localStorage.setItem(STORAGE_THEME, state.theme);
    } catch {}
    const moon = document.getElementById('themeIconMoon');
    const sun = document.getElementById('themeIconSun');
    if (moon && sun) {
      moon.classList.toggle('hidden', state.theme === 'dark');
      sun.classList.toggle('hidden', state.theme !== 'dark');
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatRichText(text, query) {
    const latexRe = /(\\[a-zA-Z]+(?:\[[^\]]*\])?(?:\{[^}]*\})*)/g;
    const q = (query || '').trim();
    const qEsc = q ? q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
    const qRe = qEsc ? new RegExp(`(${qEsc})`, 'gi') : null;

    function highlightPart(raw) {
      const safe = escapeHtml(raw);
      if (!qRe) return safe;
      return safe.replace(qRe, '<mark class="search-hit">$1</mark>');
    }

    return String(text)
      .split(latexRe)
      .map((part) => {
        if (!part) return '';
        if (part.startsWith('\\') && /^\\[a-zA-Z]+/.test(part)) {
          return `<code class="font-code">${highlightPart(part)}</code>`;
        }
        return highlightPart(part);
      })
      .join('');
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatTime(secs) {
    const s = Math.max(0, Math.floor(secs));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  }

  function updateMasteryPill() {
    const el = document.getElementById('masteryText');
    if (!el) return;
    const mastered = Object.values(state.progress.answered).filter((r) => r.isCorrect).length;
    el.textContent = `${mastered}/${QUESTIONS.length} đã thuộc`;
  }

  function getQuestionById(id) {
    return QUESTIONS.find((q) => q.id === id);
  }

  function getPracticeFilteredQuestions() {
    const p = state.practice;
    const wrongSet = new Set(state.progress.wrongIds);
    const flagSet = new Set(state.progress.flaggedIds);

    const ordered = p.shuffleQuestions
      ? p.orderIds.map(getQuestionById).filter(Boolean)
      : QUESTIONS;

    return ordered.filter((q) => {
      if (p.topic !== 'all' && q.topicId !== p.topic) return false;
      if (p.smart === 'unanswered' && state.progress.answered[q.id]) return false;
      if (p.smart === 'wrong' && !wrongSet.has(q.id)) return false;
      if (p.smart === 'flagged' && !flagSet.has(q.id)) return false;
      return true;
    });
  }

  function getRenderedOptions(q, useShuffle, cacheObj) {
    if (!useShuffle) {
      return q.options.map((opt) => ({
        displayKey: opt.key,
        originalKey: opt.key,
        text: opt.text
      }));
    }
    if (!cacheObj[q.id]) {
      const baseKeys = q.options.map((o) => o.key);
      const shuffled = shuffleArray(q.options);
      cacheObj[q.id] = shuffled.map((opt, idx) => ({
        displayKey: baseKeys[idx],
        originalKey: opt.key,
        text: opt.text
      }));
    }
    return cacheObj[q.id];
  }

  function openImageModal(src, title) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    const ttl = document.getElementById('imageModalTitle');
    img.src = src;
    img.alt = title;
    ttl.textContent = title;
    modal.classList.remove('hidden');
  }

  function closeModals() {
    document.getElementById('imageModal').classList.add('hidden');
    document.getElementById('navModal').classList.add('hidden');
  }

  function renderNavGridHtml(items, title) {
    const cells = items
      .map((it) => {
        const cls = ['nav-cell'];
        if (it.status === 'correct') cls.push('is-correct');
        else if (it.status === 'wrong') cls.push('is-wrong');
        else if (it.status === 'answered') cls.push('is-answered');
        if (it.isCurrent) cls.push('is-current');
        const flagDot = it.isFlagged ? '<span class="nav-flag-dot" aria-hidden="true"></span>' : '';
        return `<button type="button" class="${cls.join(' ')} tabular-nums" data-nav-idx="${it.idx}" aria-label="Câu ${it.label}">${it.label}${flagDot}</button>`;
      })
      .join('');

    return `
      <div class="nav-head">
        <h2 class="nav-title">${escapeHtml(title)}</h2>
        <span class="tabular-nums" style="font-size:12px;color:var(--text-muted)">${items.length} câu</span>
      </div>
      <div class="nav-grid">${cells}</div>
      <div class="nav-legend">
        <span class="legend-item"><span class="legend-box" style="background:var(--state-correct)"></span>Đúng</span>
        <span class="legend-item"><span class="legend-box" style="background:var(--state-wrong)"></span>Sai</span>
        <span class="legend-item"><span class="legend-box" style="background:var(--state-warn)"></span>Gắn cờ</span>
      </div>
    `;
  }

  // =========================================================================
  // RENDER PRACTICE MODE
  // =========================================================================
  function renderPractice() {
    const root = document.getElementById('appRoot');
    const p = state.practice;
    const list = getPracticeFilteredQuestions();
    const safeIdx = Math.min(p.currentIndex, Math.max(0, list.length - 1));
    p.currentIndex = safeIdx;
    const q = list[safeIdx];

    const smartCounts = {
      all: QUESTIONS.length,
      unanswered: QUESTIONS.filter((it) => !state.progress.answered[it.id]).length,
      wrong: state.progress.wrongIds.length,
      flagged: state.progress.flaggedIds.length
    };

    const topicOptions = TOPICS.map(
      (t) => `<option value="${t.id}" ${p.topic === t.id ? 'selected' : ''}>${escapeHtml(t.label)} (${t.count})</option>`
    ).join('');

    const smartButtons = [
      { id: 'all', label: 'Tất cả', count: smartCounts.all },
      { id: 'unanswered', label: 'Chưa làm', count: smartCounts.unanswered },
      { id: 'wrong', label: 'Câu làm sai', count: smartCounts.wrong },
      { id: 'flagged', label: 'Đã gắn cờ', count: smartCounts.flagged }
    ]
      .map(
        (f) => `
        <button type="button" class="pill-btn ${p.smart === f.id ? 'is-active' : ''}" data-smart="${f.id}">
          <span>${f.label}</span>
          <span class="pill-count tabular-nums">${f.count}</span>
        </button>`
      )
      .join('');

    const navItems = list.map((item, idx) => {
      const rec = state.progress.answered[item.id];
      let status = 'unanswered';
      if (rec) {
        status = p.instantFeedback || p.revealedIds[item.id] ? (rec.isCorrect ? 'correct' : 'wrong') : 'answered';
      }
      return {
        idx,
        label: item.id,
        status,
        isFlagged: state.progress.flaggedIds.includes(item.id),
        isCurrent: idx === safeIdx
      };
    });

    let mainHtml = '';
    if (!q) {
      let emptyTitle = 'Không có câu hỏi nào phù hợp bộ lọc';
      let emptyDesc = 'Hãy chuyển lại bộ lọc Tất cả để ôn tập tiếp toàn bộ 107 câu.';
      if (p.smart === 'wrong') {
        emptyTitle = 'Chưa có câu nào trong mục Câu làm sai';
        emptyDesc = 'Khi bạn chọn sai một câu trong lúc ôn luyện, câu đó sẽ tự động lưu tại đây để bạn luyện lại.';
      } else if (p.smart === 'flagged') {
        emptyTitle = 'Chưa có câu nào được gắn cờ';
        emptyDesc = 'Bấm nút Gắn cờ (hoặc phím F) ở góc trên mỗi câu để đánh dấu các câu cần xem lại.';
      } else if (p.smart === 'unanswered') {
        emptyTitle = 'Bạn đã hoàn thành hết các câu trong bộ lọc này';
        emptyDesc = 'Tuyệt vời! Bạn có thể đặt lại tiến độ hoặc chuyển sang chế độ Thi thử để kiểm tra tổng hợp.';
      }
      mainHtml = `
        <div class="card empty-box">
          <div style="color:var(--state-correct);margin-bottom:10px">${ICONS.check}</div>
          <h2 style="margin:0 0 6px;font-size:16px">${emptyTitle}</h2>
          <p style="margin:0 auto 18px;max-width:440px;font-size:14px;color:var(--text-secondary)">${emptyDesc}</p>
          <button type="button" class="btn-primary" id="resetFilterBtn">Quay lại tất cả 107 câu</button>
        </div>
      `;
    } else {
      const rec = state.progress.answered[q.id];
      const isFlagged = state.progress.flaggedIds.includes(q.id);
      const isRevealed = Boolean(p.revealedIds[q.id]) || (p.instantFeedback && Boolean(rec));
      const renderedOpts = getRenderedOptions(q, p.shuffleOptions, p.shuffledOptionsCache);
      const showProof = p.proofOpenIds[q.id] !== undefined ? p.proofOpenIds[q.id] : (p.autoProof && isRevealed);

      const optionsHtml = renderedOpts
        .map((opt, idx) => {
          const isSelected = rec && rec.selected === opt.originalKey;
          const isTrue = opt.originalKey === q.answer;
          const cls = ['opt-btn'];
          let trailing = `<span class="opt-hint">${idx + 1}</span>`;

          if (isRevealed) {
            if (isTrue) {
              cls.push('is-correct');
              trailing = `<span style="color:var(--state-correct)">${ICONS.check}</span>`;
            } else if (isSelected && !isTrue) {
              cls.push('is-wrong');
              trailing = `<span style="color:var(--state-wrong)">${ICONS.cross}</span>`;
            } else {
              trailing = '';
            }
          } else if (isSelected) {
            cls.push('is-selected');
          }

          return `
            <button type="button" class="${cls.join(' ')}" data-orig-key="${opt.originalKey}" role="radio" aria-checked="${Boolean(isSelected)}">
              <span class="opt-key">${escapeHtml(opt.displayKey)}</span>
              <span class="opt-text">${formatRichText(opt.text)}</span>
              ${trailing}
            </button>
          `;
        })
        .join('');

      const correctDisp = (renderedOpts.find((o) => o.originalKey === q.answer) || { displayKey: q.answer }).displayKey;

      let feedbackHtml = '';
      if (isRevealed) {
        const bannerCls = rec ? (rec.isCorrect ? 'is-correct' : 'is-wrong') : 'is-info';
        const badgeTag = rec
          ? rec.isCorrect
            ? '<span class="status-pill is-correct">Đúng</span>'
            : '<span class="status-pill is-wrong">Sai</span>'
          : '';
        const msg = rec
          ? rec.isCorrect
            ? `Đáp án đúng là <strong>${correctDisp}</strong>.`
            : `Đáp án đúng là <strong>${correctDisp}</strong>. Câu này đã được lưu vào mục Câu làm sai.`
          : `Đáp án đúng là <strong>${correctDisp}</strong>.`;
        const retryBtn = rec
          ? `<button type="button" class="link-btn" id="retrySingleBtn">${ICONS.reset}<span>Làm lại câu này</span></button>`
          : '';
        feedbackHtml = `<div class="feedback-banner ${bannerCls}"><span style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap">${badgeTag}<span>${msg}</span></span>${retryBtn}</div>`;
      }

      const proofPanelHtml = showProof
        ? `
          <div class="proof-panel">
            <div class="proof-header">
              <span>Ảnh chụp nguyên văn từ <strong>Phương pháp nghiên cứu khoa học.docx</strong> (Câu ${q.id})</span>
              <button type="button" class="link-btn" data-zoom-src="${q.image}" data-zoom-title="Tài liệu gốc (.docx) · Câu ${q.id}">
                ${ICONS.zoom}<span>Phóng to ảnh</span>
              </button>
            </div>
            <div class="proof-img-wrap" data-zoom-src="${q.image}" data-zoom-title="Tài liệu gốc (.docx) · Câu ${q.id}">
              <img src="${q.image}" alt="Ảnh chụp nguyên văn Câu ${q.id} từ file Word gốc" loading="lazy" />
            </div>
          </div>
        `
        : '';

      mainHtml = `
        <article class="card question-card">
          <div class="q-header">
            <div class="q-badges">
              <span class="q-num-badge tabular-nums">Câu ${q.id}</span>
              <span class="q-topic-badge">${escapeHtml(q.topicLabel)}</span>
              <span class="q-pos tabular-nums">(${safeIdx + 1}/${list.length})</span>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button type="button" class="btn-outline btn-sm" id="toggleProofBtn" title="Xem ảnh chụp gốc từ file Word (Phím I)">
                ${ICONS.image}<span>${showProof ? 'Ẩn ảnh gốc' : 'Xem ảnh gốc'}</span>
              </button>
              <button type="button" class="btn-outline btn-sm btn-flag ${isFlagged ? 'is-flagged' : ''}" id="toggleFlagBtn" title="Đánh dấu câu cần xem lại (Phím F)">
                ${isFlagged ? ICONS.flagFilled : ICONS.flag}<span>${isFlagged ? 'Đã gắn cờ' : 'Gắn cờ'}</span>
              </button>
            </div>
          </div>

          <h2 class="q-stem">${formatRichText(q.question)}</h2>

          <div class="options-list" role="radiogroup" aria-label="Các lựa chọn cho câu ${q.id}">
            ${optionsHtml}
          </div>

          ${feedbackHtml}
          ${proofPanelHtml}

          <div class="q-footer">
            <button type="button" class="btn-outline" id="prevQBtn" ${safeIdx <= 0 ? 'disabled' : ''}>
              ${ICONS.prev}<span>Câu trước</span>
            </button>
            <div class="q-footer-right">
              ${
                !p.instantFeedback
                  ? `<button type="button" class="btn-subtle" id="revealAnsBtn">${isRevealed ? ICONS.eyeOff : ICONS.eye}<span>${isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}</span></button>`
                  : ''
              }
              <button type="button" class="btn-primary" id="nextQBtn" ${safeIdx >= list.length - 1 ? 'disabled' : ''}>
                <span>Câu tiếp</span>${ICONS.next}
              </button>
            </div>
          </div>

          <p class="shortcut-note">
            Phím tắt: nhấn <code class="font-code">1–4</code> hoặc <code class="font-code">A–D</code> chọn đáp án, <code class="font-code">← / →</code> chuyển câu, <code class="font-code">F</code> gắn cờ, <code class="font-code">I</code> bật/tắt ảnh gốc.
          </p>
        </article>
      `;
    }

    const resetSection = !p.confirmReset
      ? `<button type="button" class="btn-outline btn-sm" style="width:100%" id="askResetBtn">${ICONS.reset}<span>Đặt lại tiến độ ôn tập</span></button>`
      : `
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:var(--state-wrong)">Xóa toàn bộ tiến độ &amp; câu sai?</p>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn-primary btn-sm" style="flex:1;background:var(--state-wrong)" id="confirmResetBtn">Xóa hết</button>
          <button type="button" class="btn-outline btn-sm" style="flex:1" id="cancelResetBtn">Hủy</button>
        </div>
      `;

    root.innerHTML = `
      <section class="card filter-strip" aria-label="Bộ lọc ôn tập">
        <div class="filter-top">
          <div class="pill-group">${smartButtons}</div>
          <select id="practiceTopicSel" class="select-control" aria-label="Lọc theo chuyên đề">
            <option value="all" ${p.topic === 'all' ? 'selected' : ''}>Tất cả 5 chuyên đề (107 câu)</option>
            ${topicOptions}
          </select>
        </div>
        <div class="filter-bottom">
          <div class="check-group">
            <label class="check-label">
              <input type="checkbox" id="chkInstant" ${p.instantFeedback ? 'checked' : ''} />
              <span>Chấm ngay khi chọn</span>
            </label>
            <label class="check-label">
              <input type="checkbox" id="chkAutoProof" ${p.autoProof ? 'checked' : ''} />
              <span>Tự hiện ảnh gốc khi chấm</span>
            </label>
            <label class="check-label">
              <input type="checkbox" id="chkShuffleQ" ${p.shuffleQuestions ? 'checked' : ''} />
              <span>Trộn thứ tự câu</span>
            </label>
            <label class="check-label">
              <input type="checkbox" id="chkShuffleO" ${p.shuffleOptions ? 'checked' : ''} />
              <span>Đảo đáp án</span>
            </label>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            ${p.shuffleQuestions ? `<button type="button" class="btn-outline btn-sm" id="reshuffleBtn">${ICONS.shuffle}<span>Xáo lại</span></button>` : ''}
            <button type="button" class="btn-subtle btn-sm mobile-map-btn" id="openMobileNav">${ICONS.grid}<span>Bản đồ (${list.length})</span></button>
          </div>
        </div>
      </section>

      <div class="workspace-grid">
        <div>${mainHtml}</div>
        <aside class="sidebar-desktop">
          <div class="card sidebar-card">
            ${renderNavGridHtml(navItems, 'Bản đồ câu hỏi')}
            <div class="reset-box">${resetSection}</div>
          </div>
        </aside>
      </div>
    `;

    bindPracticeEvents(root, q, list, navItems);
  }

  function bindPracticeEvents(root, q, list, navItems) {
    root.querySelectorAll('[data-smart]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.practice.smart = btn.getAttribute('data-smart');
        state.practice.currentIndex = 0;
        render();
      });
    });

    const topicSel = root.querySelector('#practiceTopicSel');
    if (topicSel) {
      topicSel.addEventListener('change', () => {
        state.practice.topic = topicSel.value;
        state.practice.currentIndex = 0;
        render();
      });
    }

    const chkInstant = root.querySelector('#chkInstant');
    if (chkInstant) {
      chkInstant.addEventListener('change', () => {
        state.practice.instantFeedback = chkInstant.checked;
        render();
      });
    }

    const chkAutoProof = root.querySelector('#chkAutoProof');
    if (chkAutoProof) {
      chkAutoProof.addEventListener('change', () => {
        state.practice.autoProof = chkAutoProof.checked;
        render();
      });
    }

    const chkShuffleQ = root.querySelector('#chkShuffleQ');
    if (chkShuffleQ) {
      chkShuffleQ.addEventListener('change', () => {
        state.practice.shuffleQuestions = chkShuffleQ.checked;
        if (chkShuffleQ.checked) {
          state.practice.orderIds = shuffleArray(QUESTIONS.map((it) => it.id));
        }
        state.practice.currentIndex = 0;
        render();
      });
    }

    const chkShuffleO = root.querySelector('#chkShuffleO');
    if (chkShuffleO) {
      chkShuffleO.addEventListener('change', () => {
        state.practice.shuffleOptions = chkShuffleO.checked;
        state.practice.shuffledOptionsCache = {};
        render();
      });
    }

    const reshuffleBtn = root.querySelector('#reshuffleBtn');
    if (reshuffleBtn) {
      reshuffleBtn.addEventListener('click', () => {
        state.practice.orderIds = shuffleArray(QUESTIONS.map((it) => it.id));
        state.practice.currentIndex = 0;
        render();
      });
    }

    const openMobileNav = root.querySelector('#openMobileNav');
    if (openMobileNav) {
      openMobileNav.addEventListener('click', () => {
        const body = document.getElementById('navModalBody');
        body.innerHTML = renderNavGridHtml(navItems, 'Chọn câu hỏi nhanh');
        body.querySelectorAll('[data-nav-idx]').forEach((cell) => {
          cell.addEventListener('click', () => {
            state.practice.currentIndex = Number(cell.getAttribute('data-nav-idx'));
            closeModals();
            render();
          });
        });
        document.getElementById('navModal').classList.remove('hidden');
      });
    }

    root.querySelectorAll('[data-nav-idx]').forEach((cell) => {
      cell.addEventListener('click', () => {
        state.practice.currentIndex = Number(cell.getAttribute('data-nav-idx'));
        render();
      });
    });

    const resetFilterBtn = root.querySelector('#resetFilterBtn');
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        state.practice.smart = 'all';
        state.practice.topic = 'all';
        state.practice.currentIndex = 0;
        render();
      });
    }

    const askReset = root.querySelector('#askResetBtn');
    if (askReset) {
      askReset.addEventListener('click', () => {
        state.practice.confirmReset = true;
        render();
      });
    }

    const cancelReset = root.querySelector('#cancelResetBtn');
    if (cancelReset) {
      cancelReset.addEventListener('click', () => {
        state.practice.confirmReset = false;
        render();
      });
    }

    const confirmReset = root.querySelector('#confirmResetBtn');
    if (confirmReset) {
      confirmReset.addEventListener('click', () => {
        state.progress = { answered: {}, wrongIds: [], flaggedIds: [] };
        state.practice.revealedIds = {};
        state.practice.proofOpenIds = {};
        state.practice.confirmReset = false;
        state.practice.currentIndex = 0;
        saveProgress();
        render();
      });
    }

    if (!q) return;

    root.querySelectorAll('[data-orig-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-orig-key');
        if (state.practice.instantFeedback && state.progress.answered[q.id]) return;
        const isCorrect = chosen === q.answer;
        state.progress.answered[q.id] = { selected: chosen, isCorrect };
        const wrongSet = new Set(state.progress.wrongIds);
        if (isCorrect) wrongSet.delete(q.id);
        else wrongSet.add(q.id);
        state.progress.wrongIds = Array.from(wrongSet);
        saveProgress();
        render();
      });
    });

    const toggleFlagBtn = root.querySelector('#toggleFlagBtn');
    if (toggleFlagBtn) {
      toggleFlagBtn.addEventListener('click', () => {
        toggleFlag(q.id);
        render();
      });
    }

    const toggleProofBtn = root.querySelector('#toggleProofBtn');
    if (toggleProofBtn) {
      toggleProofBtn.addEventListener('click', () => {
        const rec = state.progress.answered[q.id];
        const isRevealed = Boolean(state.practice.revealedIds[q.id]) || (state.practice.instantFeedback && Boolean(rec));
        const currentlyOpen =
          state.practice.proofOpenIds[q.id] !== undefined
            ? state.practice.proofOpenIds[q.id]
            : state.practice.autoProof && isRevealed;
        state.practice.proofOpenIds[q.id] = !currentlyOpen;
        render();
      });
    }

    const retrySingleBtn = root.querySelector('#retrySingleBtn');
    if (retrySingleBtn) {
      retrySingleBtn.addEventListener('click', () => {
        delete state.progress.answered[q.id];
        delete state.practice.revealedIds[q.id];
        delete state.practice.proofOpenIds[q.id];
        saveProgress();
        render();
      });
    }

    const revealAnsBtn = root.querySelector('#revealAnsBtn');
    if (revealAnsBtn) {
      revealAnsBtn.addEventListener('click', () => {
        state.practice.revealedIds[q.id] = !state.practice.revealedIds[q.id];
        render();
      });
    }

    const prevBtn = root.querySelector('#prevQBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.practice.currentIndex > 0) {
          state.practice.currentIndex -= 1;
          render();
        }
      });
    }

    const nextBtn = root.querySelector('#nextQBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.practice.currentIndex < list.length - 1) {
          state.practice.currentIndex += 1;
          render();
        }
      });
    }

    root.querySelectorAll('[data-zoom-src]').forEach((el) => {
      el.addEventListener('click', () => {
        openImageModal(el.getAttribute('data-zoom-src'), el.getAttribute('data-zoom-title'));
      });
    });
  }

  function toggleFlag(qid) {
    const idx = state.progress.flaggedIds.indexOf(qid);
    if (idx >= 0) state.progress.flaggedIds.splice(idx, 1);
    else state.progress.flaggedIds.push(qid);
    saveProgress();
  }

  // =========================================================================
  // RENDER EXAM MODE
  // =========================================================================
  function startExam() {
    const ex = state.exam;
    const preset = PRESETS.find((p) => p.id === ex.presetId) || PRESETS[1];
    let pool = QUESTIONS;
    if (ex.topic !== 'all') {
      pool = pool.filter((q) => q.topicId === ex.topic);
    }
    const targetCount = Math.min(preset.count, pool.length);
    const chosen = shuffleArray(pool).slice(0, targetCount);
    const cache = {};
    ex.items = chosen.map((q) => ({
      question: q,
      options: getRenderedOptions(q, ex.shuffleOptions, cache)
    }));
    ex.answers = {};
    ex.flagged = {};
    ex.currentIndex = 0;
    ex.confirmSubmit = false;
    ex.reviewFilter = 'all';
    ex.reviewProofIds = {};
    ex.savedWrongNotice = false;

    const secs =
      ex.topic === 'all'
        ? preset.minutes * 60
        : Math.max(5, Math.ceil((targetCount / preset.count) * preset.minutes)) * 60;
    ex.totalSeconds = secs;
    ex.secondsLeft = secs;
    ex.phase = 'running';

    if (ex.timerId) clearInterval(ex.timerId);
    ex.timerId = setInterval(() => {
      if (state.exam.phase !== 'running') {
        clearInterval(state.exam.timerId);
        return;
      }
      state.exam.secondsLeft -= 1;
      const timerEl = document.getElementById('examTimerText');
      const timerPill = document.getElementById('examTimerPill');
      if (timerEl) timerEl.textContent = formatTime(state.exam.secondsLeft);
      if (timerPill && state.exam.secondsLeft <= 120) timerPill.classList.add('is-low');
      if (state.exam.secondsLeft <= 0) {
        clearInterval(state.exam.timerId);
        state.exam.phase = 'result';
        if (state.mode === 'exam') render();
      }
    }, 1000);

    render();
  }

  function renderExam() {
    const root = document.getElementById('appRoot');
    const ex = state.exam;

    if (ex.phase === 'setup') {
      const preset = PRESETS.find((p) => p.id === ex.presetId) || PRESETS[1];
      const poolCount =
        ex.topic === 'all' ? QUESTIONS.length : QUESTIONS.filter((q) => q.topicId === ex.topic).length;

      const presetsHtml = PRESETS.map(
        (p) => `
          <button type="button" class="preset-card ${ex.presetId === p.id ? 'is-active' : ''}" data-preset="${p.id}">
            <span style="font-size:14px;font-weight:700;color:var(--text-primary)">${p.title}</span>
            <span class="tabular-nums" style="font-size:12px;color:var(--text-muted);font-weight:600">${p.minutes} phút · ${p.count} câu</span>
            <span style="font-size:12px;color:var(--text-secondary);margin-top:4px">${p.desc}</span>
          </button>
        `
      ).join('');

      const topicOptions = TOPICS.map(
        (t) => `<option value="${t.id}" ${ex.topic === t.id ? 'selected' : ''}>${escapeHtml(t.label)} (${t.count} câu)</option>`
      ).join('');

      root.innerHTML = `
        <section class="card exam-setup">
          <h2 style="margin:0 0 6px;font-size:18px">Thiết lập bài thi thử tính giờ</h2>
          <p style="margin:0;font-size:14px;color:var(--text-secondary)">
            Các câu hỏi được trộn ngẫu nhiên từ bộ 107 câu gốc. Ảnh đối chiếu và đáp án sẽ ẩn trong khi làm bài và hiển thị đầy đủ sau khi nộp.
          </p>

          <div class="preset-grid">${presetsHtml}</div>

          <div style="border-top:1px solid var(--border-subtle);padding-top:16px;margin-bottom:20px;display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;align-items:center">
            <div style="display:flex;flex-direction:column;gap:6px">
              <label for="examTopicSel" style="font-size:12px;font-weight:600;color:var(--text-secondary)">Phạm vi câu hỏi</label>
              <select id="examTopicSel" class="select-control">
                <option value="all" ${ex.topic === 'all' ? 'selected' : ''}>Toàn bộ môn học (${QUESTIONS.length} câu)</option>
                ${topicOptions}
              </select>
            </div>
            <label class="check-label" style="font-size:13px">
              <input type="checkbox" id="chkExamShuffleO" ${ex.shuffleOptions ? 'checked' : ''} />
              <span>Đảo thứ tự lựa chọn</span>
            </label>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
            <span class="tabular-nums" style="font-size:12px;color:var(--text-muted)">
              Đề thi sẽ lấy ${Math.min(preset.count, poolCount)} câu trong phạm vi đã chọn.
            </span>
            <button type="button" class="btn-primary" id="startExamBtn" style="height:40px;padding:0 20px">
              ${ICONS.play}<span>Bắt đầu làm bài</span>
            </button>
          </div>
        </section>
      `;

      root.querySelectorAll('[data-preset]').forEach((b) => {
        b.addEventListener('click', () => {
          ex.presetId = b.getAttribute('data-preset');
          render();
        });
      });
      root.querySelector('#examTopicSel').addEventListener('change', (e) => {
        ex.topic = e.target.value;
        render();
      });
      root.querySelector('#chkExamShuffleO').addEventListener('change', (e) => {
        ex.shuffleOptions = e.target.checked;
      });
      root.querySelector('#startExamBtn').addEventListener('click', startExam);
      return;
    }

    if (ex.phase === 'running') {
      const item = ex.items[ex.currentIndex];
      const q = item.question;
      const answeredCount = Object.keys(ex.answers).length;
      const lowTime = ex.secondsLeft <= 120;

      const navItems = ex.items.map((it, idx) => ({
        idx,
        label: idx + 1,
        status: ex.answers[it.question.id] ? 'answered' : 'unanswered',
        isFlagged: Boolean(ex.flagged[it.question.id]),
        isCurrent: idx === ex.currentIndex
      }));

      const optsHtml = item.options
        .map((opt) => {
          const selected = ex.answers[q.id] === opt.originalKey;
          return `
            <button type="button" class="opt-btn ${selected ? 'is-selected' : ''}" data-exam-key="${opt.originalKey}">
              <span class="opt-key">${escapeHtml(opt.displayKey)}</span>
              <span class="opt-text">${formatRichText(opt.text)}</span>
            </button>
          `;
        })
        .join('');

      const submitControl = !ex.confirmSubmit
        ? `<button type="button" class="btn-primary" id="askSubmitBtn">${ICONS.send}<span>Nộp bài</span></button>`
        : `
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            <span style="font-size:12px;color:var(--text-secondary)">
              ${answeredCount < ex.items.length ? `Còn ${ex.items.length - answeredCount} câu chưa chọn.` : 'Xác nhận nộp?'}
            </span>
            <button type="button" class="btn-primary btn-sm" style="background:var(--state-correct)" id="confirmSubmitBtn">Xác nhận nộp</button>
            <button type="button" class="btn-outline btn-sm" id="cancelSubmitBtn">Làm tiếp</button>
          </div>
        `;

      root.innerHTML = `
        <div class="card exam-bar">
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
            <div id="examTimerPill" class="timer-pill tabular-nums ${lowTime ? 'is-low' : ''}">
              ${ICONS.clock}<span id="examTimerText">${formatTime(ex.secondsLeft)}</span>
            </div>
            <span class="tabular-nums" style="font-size:14px;color:var(--text-secondary)">
              Đã chọn: <strong style="color:var(--text-primary)">${answeredCount}</strong>/${ex.items.length} câu
            </span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button type="button" class="btn-subtle btn-sm mobile-map-btn" id="openExamMobileNav">${ICONS.grid}<span>Phiếu (${ex.items.length})</span></button>
            ${submitControl}
          </div>
        </div>

        <div class="workspace-grid">
          <article class="card question-card">
            <div class="q-header">
              <div class="q-badges">
                <span class="q-num-badge tabular-nums">Câu ${ex.currentIndex + 1}/${ex.items.length}</span>
                <span class="q-pos tabular-nums">(Tài liệu gốc: Câu ${q.id})</span>
              </div>
              <button type="button" class="btn-outline btn-sm btn-flag ${ex.flagged[q.id] ? 'is-flagged' : ''}" id="examFlagBtn">
                ${ex.flagged[q.id] ? ICONS.flagFilled : ICONS.flag}<span>${ex.flagged[q.id] ? 'Đã gắn cờ' : 'Xem lại sau'}</span>
              </button>
            </div>
            <h2 class="q-stem">${formatRichText(q.question)}</h2>
            <div class="options-list">${optsHtml}</div>
            <div class="q-footer">
              <button type="button" class="btn-outline" id="examPrevBtn" ${ex.currentIndex <= 0 ? 'disabled' : ''}>${ICONS.prev}<span>Câu trước</span></button>
              <button type="button" class="btn-primary" id="examNextBtn" ${ex.currentIndex >= ex.items.length - 1 ? 'disabled' : ''}><span>Câu tiếp</span>${ICONS.next}</button>
            </div>
          </article>

          <aside class="sidebar-desktop">
            <div class="card sidebar-card">${renderNavGridHtml(navItems, 'Phiếu trả lời')}</div>
          </aside>
        </div>
      `;

      root.querySelectorAll('[data-exam-key]').forEach((b) => {
        b.addEventListener('click', () => {
          ex.answers[q.id] = b.getAttribute('data-exam-key');
          render();
        });
      });
      root.querySelector('#examFlagBtn').addEventListener('click', () => {
        ex.flagged[q.id] = !ex.flagged[q.id];
        render();
      });
      root.querySelector('#examPrevBtn').addEventListener('click', () => {
        if (ex.currentIndex > 0) {
          ex.currentIndex -= 1;
          render();
        }
      });
      root.querySelector('#examNextBtn').addEventListener('click', () => {
        if (ex.currentIndex < ex.items.length - 1) {
          ex.currentIndex += 1;
          render();
        }
      });
      root.querySelectorAll('[data-nav-idx]').forEach((c) => {
        c.addEventListener('click', () => {
          ex.currentIndex = Number(c.getAttribute('data-nav-idx'));
          render();
        });
      });

      const openExamMob = root.querySelector('#openExamMobileNav');
      if (openExamMob) {
        openExamMob.addEventListener('click', () => {
          const body = document.getElementById('navModalBody');
          body.innerHTML = renderNavGridHtml(navItems, 'Phiếu trả lời');
          body.querySelectorAll('[data-nav-idx]').forEach((cell) => {
            cell.addEventListener('click', () => {
              ex.currentIndex = Number(cell.getAttribute('data-nav-idx'));
              closeModals();
              render();
            });
          });
          document.getElementById('navModal').classList.remove('hidden');
        });
      }

      const askSub = root.querySelector('#askSubmitBtn');
      if (askSub) {
        askSub.addEventListener('click', () => {
          ex.confirmSubmit = true;
          render();
        });
      }
      const cancelSub = root.querySelector('#cancelSubmitBtn');
      if (cancelSub) {
        cancelSub.addEventListener('click', () => {
          ex.confirmSubmit = false;
          render();
        });
      }
      const confSub = root.querySelector('#confirmSubmitBtn');
      if (confSub) {
        confSub.addEventListener('click', () => {
          if (ex.timerId) clearInterval(ex.timerId);
          ex.phase = 'result';
          render();
        });
      }
      return;
    }

    // RESULT PHASE
    let correct = 0;
    const wrongIds = [];
    const byTopic = {};
    ex.items.forEach((it) => {
      const q = it.question;
      if (!byTopic[q.topicId]) byTopic[q.topicId] = { label: q.topicLabel, correct: 0, total: 0 };
      byTopic[q.topicId].total += 1;
      if (ex.answers[q.id] === q.answer) {
        correct += 1;
        byTopic[q.topicId].correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });

    const total = ex.items.length;
    const score10 = total > 0 ? ((correct / total) * 10).toFixed(1) : '0.0';
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const spent = Math.max(0, ex.totalSeconds - ex.secondsLeft);

    const barsHtml = Object.values(byTopic)
      .map((tb) => {
        const tp = tb.total > 0 ? Math.round((tb.correct / tb.total) * 100) : 0;
        return `
          <div class="topic-bar-item">
            <div style="display:flex;justify-content:space-between;gap:8px;font-size:12px">
              <span style="font-weight:600">${escapeHtml(tb.label)}</span>
              <span class="tabular-nums" style="color:var(--text-secondary)">${tb.correct}/${tb.total} (${tp}%)</span>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:${tp}%;background:${tp >= 70 ? 'var(--state-correct)' : 'var(--accent-action)'}"></div></div>
          </div>
        `;
      })
      .join('');

    const reviewList = ex.items.filter((it) => {
      const q = it.question;
      if (ex.reviewFilter === 'wrong') return ex.answers[q.id] !== q.answer;
      if (ex.reviewFilter === 'flagged') return Boolean(ex.flagged[q.id]);
      return true;
    });

    const reviewHtml = reviewList
      .map((it) => {
        const q = it.question;
        const chosen = ex.answers[q.id];
        const isRight = chosen === q.answer;
        const proofOpen = Boolean(ex.reviewProofIds[q.id]);

        const optsHtml = it.options
          .map((opt) => {
            const cls = ['review-opt'];
            if (opt.originalKey === q.answer) cls.push('is-right');
            else if (chosen === opt.originalKey) cls.push('is-wrong');
            return `<div class="${cls.join(' ')}"><strong>${escapeHtml(opt.displayKey)}.</strong><span>${formatRichText(opt.text)}</span></div>`;
          })
          .join('');

        return `
          <article class="card review-card">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-bottom:8px">
              <span class="tabular-nums" style="font-size:12px;font-weight:600;color:var(--text-muted)">Câu ${q.id} · ${escapeHtml(q.topicLabel)}</span>
              <div style="display:flex;gap:8px;align-items:center">
                <button type="button" class="btn-outline btn-sm" data-rev-proof="${q.id}">${ICONS.image}<span>${proofOpen ? 'Ẩn ảnh gốc' : 'Xem ảnh gốc'}</span></button>
                <span class="status-pill ${isRight ? 'is-correct' : 'is-wrong'}">
                  ${isRight ? 'Đúng' : chosen ? 'Sai' : 'Chưa chọn'}
                </span>
              </div>
            </div>
            <h3 style="margin:0;font-size:15px;line-height:1.5">${formatRichText(q.question)}</h3>
            <div class="review-opts">${optsHtml}</div>
            ${
              proofOpen
                ? `<div class="proof-panel"><div class="proof-img-wrap" data-zoom-src="${q.image}" data-zoom-title="Tài liệu gốc (.docx) · Câu ${q.id}"><img src="${q.image}" alt="Ảnh gốc Câu ${q.id}" loading="lazy" /></div></div>`
                : ''
            }
          </article>
        `;
      })
      .join('');

    const saveWrongBtn =
      wrongIds.length > 0
        ? `<button type="button" class="btn-outline" id="saveWrongBtn" ${ex.savedWrongNotice ? 'disabled' : ''}>
            ${ex.savedWrongNotice ? `Đã lưu ${wrongIds.length} câu sai vào mục Ôn luyện` : `Lưu ${wrongIds.length} câu sai vào sổ ôn lại`}
          </button>`
        : `<span style="font-size:14px;font-weight:600;color:var(--state-correct)">Xuất sắc — bạn trả lời đúng 100% câu hỏi!</span>`;

    root.innerHTML = `
      <section class="card result-summary">
        <div class="result-top">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="brand-badge" style="width:46px;height:46px">${ICONS.award}</div>
            <div>
              <h2 style="margin:0 0 2px;font-size:18px">Kết quả bài thi thử</h2>
              <p class="tabular-nums" style="margin:0;font-size:13px;color:var(--text-secondary)">
                Thời gian làm bài: ${formatTime(spent)} · Đúng ${correct}/${total} câu
              </p>
            </div>
          </div>
          <div style="text-align:right">
            <div class="score-big tabular-nums">${score10} / 10</div>
            <div class="tabular-nums" style="font-size:12px;color:var(--text-muted)">Tỷ lệ chính xác: ${pct}%</div>
          </div>
        </div>

        <div class="topic-bars">${barsHtml}</div>

        <div style="border-top:1px solid var(--border-subtle);padding-top:14px;display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center">
          ${saveWrongBtn}
          <button type="button" class="btn-primary" id="newExamBtn">${ICONS.reset}<span>Tạo đề thi mới</span></button>
        </div>
      </section>

      <div style="max-width:896px;margin:0 auto 12px;display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" class="pill-btn ${ex.reviewFilter === 'all' ? 'is-active' : ''}" data-rev-filter="all">Tất cả (${total})</button>
        <button type="button" class="pill-btn ${ex.reviewFilter === 'wrong' ? 'is-active' : ''}" data-rev-filter="wrong">Câu sai / bỏ qua (${wrongIds.length})</button>
        <button type="button" class="pill-btn ${ex.reviewFilter === 'flagged' ? 'is-active' : ''}" data-rev-filter="flagged">Đã gắn cờ (${Object.values(ex.flagged).filter(Boolean).length})</button>
      </div>

      <div class="review-list">${reviewHtml}</div>
    `;

    root.querySelector('#newExamBtn').addEventListener('click', () => {
      ex.phase = 'setup';
      render();
    });
    const swb = root.querySelector('#saveWrongBtn');
    if (swb) {
      swb.addEventListener('click', () => {
        const merged = new Set([...state.progress.wrongIds, ...wrongIds]);
        state.progress.wrongIds = Array.from(merged);
        saveProgress();
        ex.savedWrongNotice = true;
        render();
      });
    }
    root.querySelectorAll('[data-rev-filter]').forEach((b) => {
      b.addEventListener('click', () => {
        ex.reviewFilter = b.getAttribute('data-rev-filter');
        render();
      });
    });
    root.querySelectorAll('[data-rev-proof]').forEach((b) => {
      b.addEventListener('click', () => {
        const id = Number(b.getAttribute('data-rev-proof'));
        ex.reviewProofIds[id] = !ex.reviewProofIds[id];
        render();
      });
    });
    root.querySelectorAll('[data-zoom-src]').forEach((el) => {
      el.addEventListener('click', () => {
        openImageModal(el.getAttribute('data-zoom-src'), el.getAttribute('data-zoom-title'));
      });
    });
  }

  // =========================================================================
  // RENDER BANK MODE
  // =========================================================================
  function renderBank() {
    const root = document.getElementById('appRoot');
    const b = state.bank;
    const qLower = b.query.trim().toLowerCase();
    const wrongSet = new Set(state.progress.wrongIds);
    const flagSet = new Set(state.progress.flaggedIds);

    const list = QUESTIONS.filter((q) => {
      if (b.topic !== 'all' && q.topicId !== b.topic) return false;
      if (b.subset === 'wrong' && !wrongSet.has(q.id)) return false;
      if (b.subset === 'flagged' && !flagSet.has(q.id)) return false;
      if (!qLower) return true;
      if (`câu ${q.id}`.includes(qLower) || String(q.id) === qLower.replace('#', '')) return true;
      if (q.question.toLowerCase().includes(qLower)) return true;
      return q.options.some((o) => o.text.toLowerCase().includes(qLower));
    });

    const topicOptions = TOPICS.map(
      (t) => `<option value="${t.id}" ${b.topic === t.id ? 'selected' : ''}>${escapeHtml(t.label)} (${t.count})</option>`
    ).join('');

    const cardsHtml =
      list.length === 0
        ? `
          <div class="card empty-box">
            <p style="margin:0 0 14px;font-size:14px;font-weight:500">Không tìm thấy câu hỏi nào khớp với điều kiện lọc hiện tại.</p>
            <button type="button" class="btn-primary" id="bankResetBtn">Đặt lại bộ lọc</button>
          </div>
        `
        : list
            .map((q) => {
              const showAns = b.showAllAnswers || Boolean(b.revealedSingle[q.id]);
              const isFlagged = state.progress.flaggedIds.includes(q.id);
              const isWrong = state.progress.wrongIds.includes(q.id);
              const proofOpen = Boolean(b.proofOpenIds[q.id]);

              const optsHtml = q.options
                .map((o) => {
                  const isRight = showAns && o.key === q.answer;
                  return `<div class="review-opt ${isRight ? 'is-right' : ''}"><strong>${escapeHtml(o.key)}.</strong><span>${formatRichText(o.text, b.query)}</span></div>`;
                })
                .join('');

              return `
                <article class="card review-card">
                  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-bottom:8px">
                    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                      <span class="q-num-badge tabular-nums">Câu ${q.id}</span>
                      <span style="font-size:12px;color:var(--text-muted);font-weight:500">${escapeHtml(q.topicLabel)}</span>
                      ${isWrong ? '<span class="status-pill is-wrong" style="font-size:11px">Hay sai</span>' : ''}
                    </div>
                    <div style="display:flex;gap:6px;align-items:center">
                      ${
                        !b.showAllAnswers
                          ? `<button type="button" class="btn-outline btn-sm" data-bank-rev="${q.id}">${showAns ? 'Ẩn' : 'Xem đáp án'}</button>`
                          : ''
                      }
                      <button type="button" class="btn-outline btn-sm" data-bank-proof="${q.id}">${ICONS.image}<span>${proofOpen ? 'Ẩn ảnh gốc' : 'Ảnh gốc'}</span></button>
                      <button type="button" class="icon-btn ${isFlagged ? 'is-flagged' : ''}" style="width:32px;height:32px" data-bank-flag="${q.id}" aria-label="Gắn cờ câu ${q.id}">
                        ${isFlagged ? ICONS.flagFilled : ICONS.flag}
                      </button>
                    </div>
                  </div>
                  <h3 style="margin:0;font-size:15px;line-height:1.5">${formatRichText(q.question, b.query)}</h3>
                  <div class="review-opts">${optsHtml}</div>
                  ${
                    proofOpen
                      ? `<div class="proof-panel"><div class="proof-img-wrap" data-zoom-src="${q.image}" data-zoom-title="Tài liệu gốc (.docx) · Câu ${q.id}"><img src="${q.image}" alt="Ảnh gốc Câu ${q.id}" loading="lazy" /></div></div>`
                      : ''
                  }
                </article>
              `;
            })
            .join('');

    root.innerHTML = `
      <div class="bank-wrap">
        <section class="card filter-strip">
          <div class="search-row">
            <div class="search-box">
              <span class="search-icon">${ICONS.search}</span>
              <input type="search" id="bankSearchInput" class="search-input" value="${escapeHtml(b.query)}" placeholder="Tìm từ khóa (ví dụ: SQ3R, LaTeX, đạo văn, 103)..." aria-label="Tìm kiếm trong 107 câu hỏi" />
            </div>
            <button type="button" class="btn-outline" id="toggleAllAnsBtn" style="height:40px">
              ${b.showAllAnswers ? ICONS.eyeOff : ICONS.eye}<span>${b.showAllAnswers ? 'Ẩn đáp án để tự nhẩm' : 'Hiện tất cả đáp án'}</span>
            </button>
          </div>
          <div class="filter-top">
            <div class="pill-group">
              <button type="button" class="pill-btn ${b.subset === 'all' ? 'is-active' : ''}" data-bank-sub="all">Tất cả (${QUESTIONS.length})</button>
              <button type="button" class="pill-btn ${b.subset === 'wrong' ? 'is-active' : ''}" data-bank-sub="wrong">Câu làm sai (${state.progress.wrongIds.length})</button>
              <button type="button" class="pill-btn ${b.subset === 'flagged' ? 'is-active' : ''}" data-bank-sub="flagged">Đã gắn cờ (${state.progress.flaggedIds.length})</button>
            </div>
            <select id="bankTopicSel" class="select-control" aria-label="Chọn chuyên đề">
              <option value="all" ${b.topic === 'all' ? 'selected' : ''}>Mọi chuyên đề</option>
              ${topicOptions}
            </select>
          </div>
        </section>

        <div class="tabular-nums" style="margin-bottom:10px;padding:0 4px;font-size:12px;color:var(--text-muted)">
          Hiển thị ${list.length} / ${QUESTIONS.length} câu hỏi
        </div>

        <div style="display:flex;flex-direction:column;gap:12px" id="bankCardsContainer">${cardsHtml}</div>
      </div>
    `;

    const inp = root.querySelector('#bankSearchInput');
    inp.addEventListener('input', () => {
      b.query = inp.value;
      const pos = inp.selectionStart;
      renderBank();
      const newInp = document.getElementById('bankSearchInput');
      if (newInp) {
        newInp.focus();
        if (pos !== null) newInp.setSelectionRange(pos, pos);
      }
    });

    root.querySelector('#toggleAllAnsBtn').addEventListener('click', () => {
      b.showAllAnswers = !b.showAllAnswers;
      renderBank();
    });
    root.querySelectorAll('[data-bank-sub]').forEach((btn) => {
      btn.addEventListener('click', () => {
        b.subset = btn.getAttribute('data-bank-sub');
        renderBank();
      });
    });
    root.querySelector('#bankTopicSel').addEventListener('change', (e) => {
      b.topic = e.target.value;
      renderBank();
    });

    const resetBtn = root.querySelector('#bankResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        b.query = '';
        b.topic = 'all';
        b.subset = 'all';
        renderBank();
      });
    }

    root.querySelectorAll('[data-bank-rev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-bank-rev'));
        b.revealedSingle[id] = !b.revealedSingle[id];
        renderBank();
      });
    });
    root.querySelectorAll('[data-bank-proof]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-bank-proof'));
        b.proofOpenIds[id] = !b.proofOpenIds[id];
        renderBank();
      });
    });
    root.querySelectorAll('[data-bank-flag]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleFlag(Number(btn.getAttribute('data-bank-flag')));
        renderBank();
      });
    });
    root.querySelectorAll('[data-zoom-src]').forEach((el) => {
      el.addEventListener('click', () => {
        openImageModal(el.getAttribute('data-zoom-src'), el.getAttribute('data-zoom-title'));
      });
    });
  }

  function render() {
    document.querySelectorAll('.tab-btn').forEach((tab) => {
      const isActive = tab.getAttribute('data-mode') === state.mode;
      tab.classList.toggle('is-active', isActive);
      if (isActive) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });

    updateMasteryPill();
    if (state.mode === 'practice') renderPractice();
    else if (state.mode === 'exam') renderExam();
    else renderBank();
  }

  // Global Listeners
  document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.mode = tab.getAttribute('data-mode');
      render();
    });
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
  });

  document.getElementById('closeImageModal').addEventListener('click', closeModals);
  document.getElementById('closeNavModal').addEventListener('click', closeModals);
  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.id === 'imageModal') closeModals();
  });
  document.getElementById('navModal').addEventListener('click', (e) => {
    if (e.target.id === 'navModal') closeModals();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModals();
      return;
    }
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (state.mode !== 'practice') return;

    const list = getPracticeFilteredQuestions();
    const q = list[state.practice.currentIndex];
    if (!q) return;

    const k = e.key.toLowerCase();
    if (e.key === 'ArrowRight') {
      if (state.practice.currentIndex < list.length - 1) {
        e.preventDefault();
        state.practice.currentIndex += 1;
        render();
      }
    } else if (e.key === 'ArrowLeft') {
      if (state.practice.currentIndex > 0) {
        e.preventDefault();
        state.practice.currentIndex -= 1;
        render();
      }
    } else if (k === 'f') {
      e.preventDefault();
      toggleFlag(q.id);
      render();
    } else if (k === 'i') {
      e.preventDefault();
      const rec = state.progress.answered[q.id];
      const isRevealed = Boolean(state.practice.revealedIds[q.id]) || (state.practice.instantFeedback && Boolean(rec));
      const currentlyOpen =
        state.practice.proofOpenIds[q.id] !== undefined
          ? state.practice.proofOpenIds[q.id]
          : state.practice.autoProof && isRevealed;
      state.practice.proofOpenIds[q.id] = !currentlyOpen;
      render();
    } else if (['1', '2', '3', '4'].includes(k)) {
      const rendered = getRenderedOptions(q, state.practice.shuffleOptions, state.practice.shuffledOptionsCache);
      const opt = rendered[Number(k) - 1];
      if (opt && !(state.practice.instantFeedback && state.progress.answered[q.id])) {
        const isCorrect = opt.originalKey === q.answer;
        state.progress.answered[q.id] = { selected: opt.originalKey, isCorrect };
        const wrongSet = new Set(state.progress.wrongIds);
        if (isCorrect) wrongSet.delete(q.id);
        else wrongSet.add(q.id);
        state.progress.wrongIds = Array.from(wrongSet);
        saveProgress();
        render();
      }
    } else if (['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].includes(k)) {
      // Skip 'f' if it wasn't an E-H option on Q34; F is flag everywhere except Q34 option F
      if (k === 'f' && !q.options.some((o) => o.key === 'F')) return;
      const rendered = getRenderedOptions(q, state.practice.shuffleOptions, state.practice.shuffledOptionsCache);
      const opt = rendered.find((o) => o.displayKey.toLowerCase() === k);
      if (opt && !(state.practice.instantFeedback && state.progress.answered[q.id])) {
        const isCorrect = opt.originalKey === q.answer;
        state.progress.answered[q.id] = { selected: opt.originalKey, isCorrect };
        const wrongSet = new Set(state.progress.wrongIds);
        if (isCorrect) wrongSet.delete(q.id);
        else wrongSet.add(q.id);
        state.progress.wrongIds = Array.from(wrongSet);
        saveProgress();
        render();
      }
    }
  });

  applyTheme();
  render();
})();
