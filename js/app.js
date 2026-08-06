let catalogData = null;
let currentFilter = 'all';
let activeView = 'apps'; // 'apps', 'readme', 'json'

const SVG_ICONS = {
  box: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
  download: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  share: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`,
  sun: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
};

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await loadCatalogData();
  setupEventListeners();
  checkHashNavigation();
});

function initTheme() {
  const savedTheme = localStorage.getItem('releases_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('releases_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? `${SVG_ICONS.sun} Light` : `${SVG_ICONS.moon} Dark`;
  }
}

async function loadCatalogData() {
  if (window.APP_CATALOG && window.APP_CATALOG.apps) {
    catalogData = window.APP_CATALOG;
  }
  
  try {
    const res = await fetch('./data/apps.json');
    if (res.ok) {
      catalogData = await res.json();
    }
  } catch (err) {
    console.log('Serving from bundled local data catalog.');
  }

  if (catalogData && catalogData.apps) {
    renderRealStats(catalogData);
    renderCategoryFilters(catalogData.apps);
    renderAppGrid(catalogData.apps);
    renderBeautifiedJsonView(catalogData);
  } else {
    document.getElementById('appGrid').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: #ef4444; padding: 40px;">
        <h3>Unable to load catalog data.</h3>
      </div>
    `;
  }
}

function renderRealStats(data) {
  const totalApps = data.apps.length;
  let totalBuilds = 0;
  let totalMbSum = 0;
  let latestDate = "2026-08-06";

  data.apps.forEach(app => {
    totalBuilds += (app.releases || []).length;
    (app.releases || []).forEach(rel => {
      if (rel.fileSize) {
        const mb = parseFloat(rel.fileSize);
        if (!isNaN(mb)) totalMbSum += mb;
      }
      if (rel.releaseDate && rel.releaseDate > latestDate) {
        latestDate = rel.releaseDate;
      }
    });
  });

  document.getElementById('statTotalApps').textContent = totalApps;
  document.getElementById('statTotalBuilds').textContent = totalBuilds;
  document.getElementById('statTotalSize').textContent = `${totalMbSum.toFixed(1)} MB`;
  document.getElementById('statLastUpdate').textContent = latestDate;
}

function renderCategoryFilters(apps) {
  const categories = ['all', ...new Set(apps.map(a => a.category))];
  const container = document.getElementById('categoryFilters');
  
  container.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === currentFilter ? 'active' : ''}" data-category="${cat}">
      ${cat === 'all' ? 'All Applications' : cat}
    </button>
  `).join('');

  container.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.category;
      filterAndRenderApps();
    });
  });
}

function switchViewTab(view) {
  activeView = view;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  const appsSection = document.getElementById('appsSection');
  const readmeSection = document.getElementById('readmeSection');
  const jsonSection = document.getElementById('jsonSection');

  appsSection.style.display = view === 'apps' ? 'block' : 'none';
  readmeSection.style.display = view === 'readme' ? 'block' : 'none';
  jsonSection.style.display = view === 'json' ? 'block' : 'none';

  if (view === 'readme' && !readmeSection.getAttribute('data-loaded')) {
    loadReadmeMarkdown();
  }
}

function renderAppGrid(apps) {
  const container = document.getElementById('appGrid');
  if (!apps || apps.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
        <p>No matching applications found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = apps.map(app => {
    const latest = app.releases[0] || {};
    const brandColor = app.brandColor || '#ffffff';
    return `
      <div class="app-card" id="card-${app.id}" style="--app-brand-color: ${brandColor};">
        <div>
          <div class="app-head">
            <img src="${app.iconUrl}" alt="${app.name}" class="app-icon-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' fill=\'none\' stroke=\'%23a3a3a3\' stroke-width=\'2\' viewBox=\'0 0 24 24\'><rect width=\'18\' height=\'18\' x=\'3\' y=\'3\' rx=\'4\'/></svg>'" />
            <div>
              <h3 class="app-name">${app.name}</h3>
              <span class="app-cat">${app.category}</span>
            </div>
          </div>
          <p class="app-desc">${app.tagline}</p>
          
          <div class="app-details-list">
            <span>Tag: <strong>${latest.version || 'v1.0.0'}</strong></span>
            <span>•</span>
            <span>Size: <strong>${latest.fileSize || 'APK'}</strong></span>
          </div>
        </div>

        <div class="app-card-actions">
          <a href="${latest.apkPath}" download class="btn btn-solid">
            ${SVG_ICONS.download} Download APK
          </a>
          <button class="btn" onclick="openSingleApkModal('${app.id}')">
            ${SVG_ICONS.share} Share APK
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function loadReadmeMarkdown() {
  const container = document.getElementById('readmeContent');
  try {
    const res = await fetch('./README.md');
    if (!res.ok) throw new Error('README fetch failed');
    const mdText = await res.text();
    
    if (window.marked) {
      container.innerHTML = window.marked.parse(mdText);
    } else {
      container.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace;">${escapeHtml(mdText)}</pre>`;
    }
    document.getElementById('readmeSection').setAttribute('data-loaded', 'true');
  } catch (err) {
    container.innerHTML = `<p style="color:var(--text-muted);">View repository details in <a href="./README.md">README.md</a>.</p>`;
  }
}

function renderBeautifiedJsonView(data) {
  const container = document.getElementById('jsonCodeContainer');
  if (!container) return;
  const jsonStr = JSON.stringify(data, null, 2);
  container.innerHTML = syntaxHighlightJson(jsonStr);
}

function syntaxHighlightJson(jsonStr) {
  jsonStr = escapeHtml(jsonStr);
  return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterAndRenderApps);
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchViewTab(e.target.dataset.view);
    });
  });

  window.addEventListener('hashchange', checkHashNavigation);

  const backdrop = document.getElementById('singleApkModal');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSingleApkModal();
    });
  }
}

function filterAndRenderApps() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  if (!catalogData) return;

  const filtered = catalogData.apps.filter(app => {
    const matchesCategory = currentFilter === 'all' || app.category === currentFilter;
    const matchesSearch = app.name.toLowerCase().includes(query) ||
                          app.tagline.toLowerCase().includes(query) ||
                          app.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  renderAppGrid(filtered);
}

function checkHashNavigation() {
  const hash = window.location.hash;
  if (!hash || !catalogData) return;

  if (hash === '#readme' || hash === '#matrix') {
    switchViewTab('readme');
  } else if (hash === '#json') {
    switchViewTab('json');
  } else if (hash.startsWith('#app=') || hash.startsWith('#apk=')) {
    const targetId = hash.split('=')[1];
    if (targetId) {
      openSingleApkModal(targetId);
    }
  }
}

function openSingleApkModal(appId) {
  if (!catalogData) return;
  const app = catalogData.apps.find(a => a.id === appId || a.id === appId.split('-v')[0]);
  if (!app) return;

  const latest = app.releases[0] || {};
  const shareUrl = `${window.location.origin}${window.location.pathname}#app=${app.id}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(shareUrl)}`;

  const modalBody = document.getElementById('modalContent');
  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <img src="${app.iconUrl}" alt="${app.name}" style="width:48px; height:48px; border-radius:8px; border:1px solid var(--border-color); object-fit:cover;" />
      <div>
        <h2 style="font-size: 1.35rem; color:var(--text-main); font-weight:800;">${app.name}</h2>
        <p style="color:var(--text-muted); font-size:0.85rem;">Version: <strong>${latest.version}</strong> • ${app.category}</p>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px; line-height: 1.5;">
      ${app.description}
    </p>

    <div style="margin-bottom: 16px;">
      <h4 style="font-size: 0.88rem; color:var(--text-main); margin-bottom: 6px;">Release Notes:</h4>
      <ul style="padding-left: 18px; color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
        ${(latest.changelog || []).map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 6px;">
      SHA256 Checksum:
    </div>
    <div class="sha256-box">${latest.sha256}</div>

    <div style="margin-bottom: 20px;">
      <a href="${latest.apkPath}" download class="btn btn-solid" style="width:100%; justify-content:center; padding:12px;">
        ${SVG_ICONS.download} Download ${latest.apkFileName} (${latest.fileSize})
      </a>
    </div>

    <hr style="border:none; border-top:1px solid var(--border-color); margin:16px 0;" />

    <h4 style="font-size: 0.88rem; color:var(--text-main); margin-bottom: 6px;">Single APK Direct Share Link:</h4>
    <div class="share-link-row">
      <input type="text" readonly value="${shareUrl}" id="shareInput" />
      <button class="btn btn-solid" onclick="copyShareUrl('${shareUrl}')">Copy Link</button>
    </div>

    <div style="display:flex; align-items:center; gap:16px; margin-top:20px; background:var(--bg-secondary); border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md);">
      <img src="${qrApiUrl}" alt="QR" style="width:90px; height:90px; border-radius:4px; background:#fff; padding:4px;" />
      <div style="font-size:0.8rem; color:var(--text-muted);">
        <strong style="color:var(--text-main); display:block; margin-bottom:4px;">Scan with Phone Camera</strong>
        Scan this QR code from your monitor screen to open this direct APK download link on your phone.
      </div>
    </div>
  `;

  document.getElementById('singleApkModal').classList.add('active');
}

function closeSingleApkModal() {
  document.getElementById('singleApkModal').classList.remove('active');
  if (window.location.hash && window.location.hash.startsWith('#app=')) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function copyShareUrl(url) {
  navigator.clipboard.writeText(url).then(() => {
    showToast('Share link copied to clipboard.');
  }).catch(() => {
    const input = document.getElementById('shareInput');
    if (input) {
      input.select();
      document.execCommand('copy');
    }
    showToast('Link copied.');
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  container.innerHTML = `<div class="toast-msg">${message}</div>`;
  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}
