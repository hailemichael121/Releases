let catalogData = null;
let currentFilter = 'all';

const SVG_ICONS = {
  box: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
  book: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  music: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  note: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  clock: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  store: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
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

function getAppIconSvg(iconKey) {
  return SVG_ICONS[iconKey] || SVG_ICONS.box;
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
    const iconSvg = getAppIconSvg(app.icon);
    return `
      <div class="app-card" id="card-${app.id}">
        <div>
          <div class="app-head">
            <div class="app-icon-box">${iconSvg}</div>
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

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterAndRenderApps);
  }

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

  if (hash.startsWith('#app=') || hash.startsWith('#apk=')) {
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
  const iconSvg = getAppIconSvg(app.icon);

  const modalBody = document.getElementById('modalContent');
  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <div class="app-icon-box" style="width:48px; height:48px;">${iconSvg}</div>
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
  if (window.location.hash) {
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
