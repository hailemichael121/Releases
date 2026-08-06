let catalogData = null;
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadCatalogData();
  setupEventListeners();
  checkHashNavigation();
});

async function loadCatalogData() {
  try {
    const res = await fetch('./data/apps.json');
    catalogData = await res.json();
    updateStats(catalogData);
    renderCategoryFilters(catalogData.apps);
    renderAppGrid(catalogData.apps);
  } catch (err) {
    console.error('Failed to load apps catalog:', err);
    document.getElementById('appGrid').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: #ef4444; padding: 40px;">
        <h3>Unable to load release data.</h3>
        <p>Please ensure data/apps.json exists and is valid JSON.</p>
      </div>
    `;
  }
}

function updateStats(data) {
  const totalApps = data.apps.length;
  const totalDownloads = data.apps.reduce((acc, app) => {
    return acc + (app.releases[0]?.downloadCount || 0);
  }, 0);
  
  document.getElementById('statTotalApps').textContent = totalApps;
  document.getElementById('statTotalDownloads').textContent = totalDownloads.toLocaleString() + '+';
  document.getElementById('statLastUpdate').textContent = 'Today';
}

function renderCategoryFilters(apps) {
  const categories = ['all', ...new Set(apps.map(a => a.category))];
  const container = document.getElementById('categoryFilters');
  
  container.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === currentFilter ? 'active' : ''}" data-category="${cat}">
      ${cat === 'all' ? 'All Releases' : cat}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
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
        <p>No application releases matched your query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = apps.map(app => {
    const latest = app.releases[0] || {};
    return `
      <div class="app-card" id="card-${app.id}">
        <div>
          <div class="app-header">
            <div class="app-icon">${app.icon}</div>
            <div class="app-title-wrapper">
              <h3 class="app-title">${app.name}</h3>
              <span class="app-category-badge">${app.category}</span>
            </div>
          </div>
          <p class="app-tagline">${app.tagline}</p>
          
          <div class="app-meta-tags">
            <span class="meta-chip">🏷️ ${latest.version || 'v1.0.0'}</span>
            <span class="meta-chip">📦 ${latest.fileSize || 'APK'}</span>
            <span class="meta-chip">📅 ${latest.releaseDate || '2026'}</span>
          </div>
        </div>

        <div class="app-actions">
          <a href="${latest.apkPath}" download class="btn btn-emerald">
            <span>⬇️ Download APK</span>
          </a>
          <button class="btn btn-glass" onclick="openSingleApkModal('${app.id}')">
            <span>🔗 Details & Share</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterAndRenderApps();
    });
  }

  window.addEventListener('hashchange', checkHashNavigation);

  // Close modal when clicking overlay background
  const modal = document.getElementById('singleApkModal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeSingleApkModal();
    }
  });
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
  
  // Quick QR code API URL
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`;

  const modalBody = document.getElementById('modalContent');
  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
      <div class="app-icon" style="width:64px; height:64px; font-size:2.4rem;">${app.icon}</div>
      <div>
        <h2 style="font-size: 1.6rem; color:#fff; font-weight:700;">${app.name} <span style="font-size:0.9rem; color:var(--primary);">${latest.version}</span></h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">By ${app.authors.join(', ')} • ${app.category}</p>
      </div>
    </div>

    <p style="color: var(--text-main); font-size: 0.98rem; margin-bottom: 20px; line-height: 1.6;">
      ${app.description}
    </p>

    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
      <h4 style="color:#fff; margin-bottom: 8px; font-size: 0.95rem;">🚀 Release Notes (${latest.version})</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.88rem;">
        ${(latest.changelog || []).map(item => `<li style="margin-bottom:4px;">${item}</li>`).join('')}
      </ul>
    </div>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; font-size: 0.85rem; color: var(--text-muted);">
      <div>📦 <strong>File Size:</strong> ${latest.fileSize}</div>
      <div>📱 <strong>Requires:</strong> ${latest.minAndroid}</div>
      <div>🏗️ <strong>Arch:</strong> ${latest.architecture}</div>
      <div>📅 <strong>Released:</strong> ${latest.releaseDate}</div>
    </div>

    <div style="margin-bottom: 20px;">
      <label style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:6px;">Checksum (SHA256):</label>
      <div style="background:rgba(0,0,0,0.4); padding:8px 12px; border-radius:6px; font-family:monospace; font-size:0.75rem; color:var(--accent-emerald); word-break:break-all;">
        ${latest.sha256}
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <a href="${latest.apkPath}" download class="btn btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;">
        ⬇️ Direct Download APK (${latest.fileSize})
      </a>
    </div>

    <hr style="border: none; border-top: 1px solid var(--border-glass); margin: 24px 0;" />

    <h4 style="color:#fff; font-size: 1rem; margin-bottom: 8px;">🔗 Share This Single APK Release</h4>
    <p style="font-size:0.85rem; color:var(--text-muted);">Anyone opening this link will view this direct APK release card and download:</p>
    
    <div class="share-link-box">
      <input type="text" readonly value="${shareUrl}" class="share-link-input" id="shareInput" />
      <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.82rem;" onclick="copyShareUrl('${shareUrl}')">
        📋 Copy Link
      </button>
    </div>

    <div style="display:flex; gap:10px;">
      <button class="btn btn-emerald" style="flex:1; justify-content:center;" onclick="triggerNativeShare('${app.name}', '${shareUrl}')">
        📲 Share via Telegram / App
      </button>
    </div>

    <div class="qr-section">
      <img src="${qrApiUrl}" alt="QR Code" class="qr-code-img" />
      <div class="qr-info">
        <h5>Scan with Phone Camera</h5>
        <p>Scan this QR code from your mobile device screen to instantly open and download this single APK build on your phone.</p>
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
    showToast('✨ Single APK share link copied to clipboard!');
  }).catch(() => {
    const input = document.getElementById('shareInput');
    input.select();
    document.execCommand('copy');
    showToast('✨ Link copied!');
  });
}

function triggerNativeShare(appName, url) {
  if (navigator.share) {
    navigator.share({
      title: `Download ${appName} APK`,
      text: `Get the latest Android release build of ${appName} directly from our Releases hub:`,
      url: url
    }).catch(err => console.log('Share canceled', err));
  } else {
    copyShareUrl(url);
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
