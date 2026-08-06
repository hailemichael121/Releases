let catalogData = null;
let currentFilter = 'all';

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
    btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }
}

async function loadCatalogData() {
  // First check if global window.APP_CATALOG script fallback exists
  if (window.APP_CATALOG && window.APP_CATALOG.apps) {
    catalogData = window.APP_CATALOG;
  }
  
  // Try fetching JSON if running on http server
  try {
    const res = await fetch('./data/apps.json');
    if (res.ok) {
      catalogData = await res.json();
    }
  } catch (err) {
    // If fetch failed (e.g. file:// CORS restriction), catalogData remains window.APP_CATALOG
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
    return `
      <div class="app-card" id="card-${app.id}">
        <div>
          <div class="app-head">
            <div class="app-icon-box">${app.icon}</div>
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
            ⬇️ Download APK
          </a>
          <button class="btn" onclick="openSingleApkModal('${app.id}')">
            🔗 Share APK
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

  const modalBody = document.getElementById('modalContent');
  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <div class="app-icon-box" style="width:52px; height:52px; font-size:1.8rem;">${app.icon}</div>
      <div>
        <h2 style="font-size: 1.4rem; color:var(--text-main); font-weight:800;">${app.name}</h2>
        <p style="color:var(--text-muted); font-size:0.85rem;">Version: <strong>${latest.version}</strong> • ${app.category}</p>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">
      ${app.description}
    </p>

    <div style="margin-bottom: 16px;">
      <h4 style="font-size: 0.88rem; color:var(--text-main); margin-bottom: 6px;">Release Notes:</h4>
      <ul style="padding-left: 18px; color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
        ${(latest.changelog || []).map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 12px;">
      SHA256 Checksum:
    </div>
    <div class="sha256-box">${latest.sha256}</div>

    <div style="margin-bottom: 20px;">
      <a href="${latest.apkPath}" download class="btn btn-solid" style="width:100%; justify-content:center; padding:12px;">
        ⬇️ Download ${latest.apkFileName} (${latest.fileSize})
      </a>
    </div>

    <hr style="border:none; border-top:1px solid var(--border-color); margin:16px 0;" />

    <h4 style="font-size: 0.9rem; color:var(--text-main); margin-bottom: 6px;">🔗 Single APK Direct Share Link:</h4>
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
    showToast('✨ Share link copied to clipboard!');
  }).catch(() => {
    const input = document.getElementById('shareInput');
    if (input) {
      input.select();
      document.execCommand('copy');
    }
    showToast('✨ Link copied!');
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  container.innerHTML = `<div class="toast-msg">${message}</div>`;
  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}
