import { useState, useEffect } from 'react';
import './index.css';
import Ticker from './components/Ticker';
import Dashboard from './components/Dashboard';
import VaultManager from './components/VaultManager';
import KYCPanel from './components/KYCPanel';
import TreasuryModule from './components/TreasuryModule';
import AuditTrail from './components/AuditTrail';
import RiskMonitor from './components/RiskMonitor';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: '▦', section: 'PLATFORM' },
  { id: 'vaults', label: 'Vault Manager', icon: '⬡', section: 'PLATFORM' },
  { id: 'kyc', label: 'KYC & Access', icon: '⊕', section: 'PLATFORM' },
  { id: 'treasury', label: 'Treasury', icon: '⇄', section: 'OPERATIONS' },
  { id: 'audit', label: 'Audit Trail', icon: '≡', section: 'OPERATIONS' },
  { id: 'risk', label: 'Risk Monitor', icon: '◈', section: 'OPERATIONS' },
];

const PAGE_META = {
  dashboard: { title: 'Overview', subtitle: 'Institutional DeFi Operations Dashboard' },
  vaults: { title: 'Vault Manager', subtitle: 'Create and configure permissioned stablecoin vaults' },
  kyc: { title: 'KYC & Access Control', subtitle: 'Whitelist management and participant compliance' },
  treasury: { title: 'Treasury', subtitle: 'Cross-border stablecoin payment corridors' },
  audit: { title: 'Audit Trail', subtitle: 'Immutable on-chain compliance record' },
  risk: { title: 'Risk Monitor', subtitle: 'Real-time vault risk and regulatory metrics' },
};

const WALLETS = [
  {
    id: 'phantom',
    name: 'Phantom',
    desc: 'The most popular Solana wallet',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="26" fill="url(#ph_grad)" />
        <defs>
          <linearGradient id="ph_grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#534BB1" /><stop offset="1" stopColor="#551BF9" />
          </linearGradient>
        </defs>
        <path d="M110.5 64c0 25.7-20.8 46.5-46.5 46.5S17.5 89.7 17.5 64 38.3 17.5 64 17.5 110.5 38.3 110.5 64Z" fill="white" fillOpacity="0.15" />
        <ellipse cx="64" cy="58" rx="26" ry="20" fill="white" />
        <circle cx="55" cy="56" r="5" fill="#534BB1" />
        <circle cx="73" cy="56" r="5" fill="#534BB1" />
        <path d="M44 70c4 10 36 10 40 0" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    ),
    recommended: true,
  },
  {
    id: 'solflare',
    name: 'Solflare',
    desc: "Solana's native web & hardware wallet",
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="26" fill="#FC6514" />
        <path d="M64 20 L100 90 H28 Z" fill="white" fillOpacity="0.9" />
        <path d="M64 45 L85 85 H43 Z" fill="#FC6514" />
      </svg>
    ),
  },
  {
    id: 'backpack',
    name: 'Backpack',
    desc: 'Multi-chain wallet by Coral',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="26" fill="#E33E3F" />
        <rect x="36" y="48" width="56" height="44" rx="10" fill="white" />
        <path d="M50 48 C50 36 78 36 78 48" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="57" y="65" width="14" height="10" rx="3" fill="#E33E3F" />
      </svg>
    ),
  },
  {
    id: 'ledger',
    name: 'Ledger',
    desc: 'Connect your hardware wallet',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="26" fill="#1D1D1D" />
        <rect x="22" y="36" width="84" height="56" rx="8" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
        <rect x="34" y="50" width="36" height="28" rx="4" fill="white" fillOpacity="0.9" />
        <circle cx="88" cy="64" r="6" fill="white" fillOpacity="0.6" />
      </svg>
    ),
  },
];

function WalletModal({ onClose, onConnect }) {
  const [connecting, setConnecting] = useState(null);
  const [error, setError] = useState('');
  const [detected, setDetected] = useState({});

  // ---------- provider helpers ----------
  const getPhantomProvider = () => {
    if (typeof window === 'undefined') return null;
    // Phantom v22+ injects on window.phantom.solana (non-enumerable!)
    if (window.phantom?.solana?.isPhantom) return window.phantom.solana;
    // Legacy path — older Phantom versions inject directly on window.solana
    if (window.solana?.isPhantom) return window.solana;
    return null;
  };

  // Poll for Phantom provider — it injects asynchronously and may not be ready immediately
  const waitForPhantomProvider = (timeoutMs = 3000) => {
    return new Promise((resolve) => {
      const provider = getPhantomProvider();
      if (provider) return resolve(provider);

      const interval = 200;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += interval;
        const p = getPhantomProvider();
        if (p) { clearInterval(timer); resolve(p); }
        else if (elapsed >= timeoutMs) { clearInterval(timer); resolve(null); }
      }, interval);
    });
  };

  const getSolflareProvider = () => (typeof window !== 'undefined' && window.solflare?.isSolflare) ? window.solflare : null;
  const getBackpackProvider = () => (typeof window !== 'undefined' && window.backpack?.isBackpack) ? window.backpack : null;

  // Detect badges (visual only — does NOT gate the connection attempt)
  useEffect(() => {
    const detect = () => setDetected({
      phantom: !!getPhantomProvider(),
      solflare: !!getSolflareProvider(),
      backpack: !!getBackpackProvider(),
      ledger: false,
    });
    detect();
    // Extensions inject asynchronously — run multiple passes
    const t1 = setTimeout(detect, 500);
    const t2 = setTimeout(detect, 1500);
    const t3 = setTimeout(detect, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // ---- INSTALL URLS ----
  const INSTALL_URLS = {
    phantom: 'https://phantom.app/download',
    solflare: 'https://solflare.com',
    backpack: 'https://backpack.app',
  };

  // Helper: attempt Phantom Solana connect with retry
  const connectPhantom = async (provider) => {
    try {
      const resp = await provider.connect();
      return resp;
    } catch (firstErr) {
      // If user explicitly rejected, don't retry
      if (firstErr?.code === 4001 || /user rejected|cancelled/i.test(firstErr?.message)) {
        throw firstErr;
      }
      // Retry once after a short delay — Phantom's Solana provider
      // can throw from its EVM module if not fully ready
      await new Promise(r => setTimeout(r, 600));
      const retryProvider = getPhantomProvider();
      if (!retryProvider) throw firstErr;
      return await retryProvider.connect();
    }
  };

  const handleSelect = async (wallet) => {
    setError('');
    setConnecting(wallet.id);

    try {
      if (wallet.id === 'phantom') {
        // Wait for the provider — Phantom injects asynchronously
        const provider = await waitForPhantomProvider(3000);
        if (!provider) {
          // Only open install page if provider truly not found after waiting
          window.open(INSTALL_URLS.phantom, '_blank');
          setError('Phantom not detected. Install the extension, enable it for this site, and refresh.');
          return;
        }
        const resp = await connectPhantom(provider);
        if (resp) {
          wallet.address = resp.publicKey.toString();
          onConnect(wallet);
        }

      } else if (wallet.id === 'solflare') {
        const provider = getSolflareProvider();
        if (!provider) { window.open(INSTALL_URLS.solflare, '_blank'); setError('Solflare not detected. Install and refresh.'); return; }
        await provider.connect();
        wallet.address = provider.publicKey?.toString();
        onConnect(wallet);

      } else if (wallet.id === 'backpack') {
        const provider = getBackpackProvider();
        if (!provider) { window.open(INSTALL_URLS.backpack, '_blank'); setError('Backpack not detected. Install and refresh.'); return; }
        await provider.connect();
        wallet.address = provider.publicKey?.toString();
        onConnect(wallet);

      } else if (wallet.id === 'ledger') {
        setError('Connect your Ledger device, open the Solana app, then retry.');
        return;
      }

    } catch (err) {
      const msg = err?.message || '';
      if (err?.code === 4001 || /user rejected|cancelled/i.test(msg)) {
        setError('Connection cancelled. Click the wallet again to retry.');
      } else if (/unexpected/i.test(msg)) {
        setError('Wallet connection failed. Try refreshing the page or re-opening your wallet extension.');
      } else {
        setError(msg || 'Connection failed. Please try again.');
      }
    } finally {
      setConnecting(null);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ alignItems: 'flex-start', paddingTop: 80 }}
    >
      <div className="modal slide-up" style={{ width: 420 }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>◎</span> Connect Wallet
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
              Choose your Solana wallet to continue
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Wallet list */}
        <div style={{ padding: '14px 20px 8px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Available Wallets
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {WALLETS.map(wallet => {
              const installed = detected[wallet.id];
              const isConnecting = connecting === wallet.id;
              return (
                <button
                  key={wallet.id}
                  disabled={!!connecting}
                  onClick={() => handleSelect(wallet)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 16px',
                    background: isConnecting ? 'var(--blue-light)' : 'var(--bg-surface-2)',
                    border: `1.5px solid ${isConnecting ? 'var(--blue)' : installed ? 'rgba(16,185,129,0.3)' : 'var(--border)'}`,
                    borderRadius: 12,
                    cursor: connecting ? 'wait' : 'pointer',
                    transition: 'all 0.18s ease', textAlign: 'left', width: '100%',
                    opacity: connecting && !isConnecting ? 0.45 : 1,
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { if (!connecting) { e.currentTarget.style.background = installed ? 'rgba(16,185,129,0.06)' : 'var(--blue-muted)'; e.currentTarget.style.borderColor = installed ? 'rgba(16,185,129,0.5)' : 'var(--blue)'; } }}
                  onMouseLeave={e => { if (!connecting) { e.currentTarget.style.background = 'var(--bg-surface-2)'; e.currentTarget.style.borderColor = installed ? 'rgba(16,185,129,0.3)' : 'var(--border)'; } }}
                >
                  {/* Icon */}
                  <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isConnecting
                      ? <div style={{ width: 24, height: 24, border: '2.5px solid var(--blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'walletSpin 0.7s linear infinite' }} />
                      : wallet.icon
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{wallet.name}</span>
                      {wallet.recommended && !installed && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(79,110,247,0.15)', color: 'var(--blue)', padding: '1px 7px', borderRadius: 10, border: '1px solid var(--blue-mid)' }}>
                          Recommended
                        </span>
                      )}
                      {installed ? (
                        <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 7px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)' }}>
                          ● Detected
                        </span>
                      ) : wallet.id !== 'ledger' ? (
                        <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '1px 7px', borderRadius: 10, border: '1px solid rgba(245,158,11,0.3)' }}>
                          Not Installed
                        </span>
                      ) : null}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {isConnecting ? 'Connecting — approve in your wallet…' : installed ? 'Click to connect' : wallet.id === 'ledger' ? wallet.desc : `Click to install ${wallet.name}`}
                    </div>
                  </div>

                  {/* Right action */}
                  {!isConnecting && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: installed ? 'var(--green)' : 'var(--text-muted)', flexShrink: 0 }}>
                      {installed ? 'Connect →' : wallet.id === 'ledger' ? '›' : 'Install ↗'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-info" style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
              <span>💡</span><div>{error}</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px 20px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            By connecting, you agree to StableCore's{' '}
            <span style={{ color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</span>.
            <br />All vault interactions require institutional KYC verification.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes walletSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function WalletDropdown({ wallet, onDisconnect }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        className="wallet-btn connected"
        style={{ gap: 8 }}
        onClick={() => setOpen(v => !v)}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', flexShrink: 0 }} />
        {wallet.name} · 7xKXt...9pQR
        <span style={{ fontSize: 10, marginLeft: 2 }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 200,
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 12, width: 240, boxShadow: 'var(--shadow-xl)',
          padding: '8px 0', animation: 'slideUp 0.15s ease',
        }}>
          {/* Wallet info header */}
          <div style={{ padding: '10px 16px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden' }}>{wallet.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{wallet.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>7xKXt...9pQR</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <div style={{ flex: 1, background: 'var(--bg-surface-2)', borderRadius: 8, padding: '7px 10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 1 }}>BALANCE</div>
                <div style={{ fontSize: 13, fontWeight: 800, fontFamily: 'JetBrains Mono', color: 'var(--text-primary)' }}>4.25 SOL</div>
              </div>
              <div style={{ flex: 1, background: 'var(--bg-surface-2)', borderRadius: 8, padding: '7px 10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 1 }}>NETWORK</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>Devnet</div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          {[
            { icon: '📋', label: 'Copy Address' },
            { icon: '🔗', label: 'View on Solscan' },
            { icon: '⚙️', label: 'Wallet Settings' },
          ].map(item => (
            <div key={item.label} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span>{item.icon}</span>{item.label}
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <div onClick={() => { onDisconnect(); setOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--red)', transition: 'var(--transition)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dim)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <span>🔌</span> Disconnect
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const sections = [...new Set(NAV_ITEMS.map(i => i.section))];

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />;
      case 'vaults': return <VaultManager />;
      case 'kyc': return <KYCPanel />;
      case 'treasury': return <TreasuryModule />;
      case 'audit': return <AuditTrail />;
      case 'risk': return <RiskMonitor />;
      default: return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">⬡</div>
          <div className="logo-text">
            <div className="logo-title">StableCore</div>
            <div className="logo-subtitle">Institutional DeFi</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sections.map(section => (
            <div key={section}>
              <div className="sidebar-section-label">{section}</div>
              {NAV_ITEMS.filter(i => i.section === section).map(item => (
                <div
                  key={item.id}
                  className={`nav-item ${page === item.id ? 'active' : ''}`}
                  onClick={() => setPage(item.id)}
                  id={`nav-${item.id}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.id === 'kyc' && <span className="nav-badge-blue">KYC</span>}
                  {item.id === 'audit' && <span className="nav-badge">LIVE</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="network-badge">
            <div className="pulse-dot" />
            <div>
              <div className="network-label">Solana Devnet</div>
              <div className="network-sub">Anchor Program Active</div>
            </div>
          </div>
          <div style={{ marginTop: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>StableCore v1.0</span>
            <span style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>Docs →</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Ticker />

        <header className="topbar">
          <div className="topbar-left">
            <div>
              <div className="page-title">{PAGE_META[page]?.title}</div>
              <div className="page-subtitle">{PAGE_META[page]?.subtitle}</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-chip">
              <span className="topbar-chip-label">TVL</span>
              <span className="topbar-chip-value">$26.67M</span>
            </div>
            <div className="topbar-chip">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', marginRight: 2 }} />
              <span className="topbar-chip-label">Devnet</span>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)' }}>
              🔔
            </button>

            {connectedWallet ? (
              <WalletDropdown wallet={connectedWallet} onDisconnect={() => setConnectedWallet(null)} />
            ) : (
              <button
                className="wallet-btn"
                id="wallet-connect-btn"
                onClick={() => setShowWalletModal(true)}
              >
                <span>◎</span> Connect Wallet
              </button>
            )}
          </div>
        </header>

        <div className="page-content">{renderPage()}</div>

        <footer className="app-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>⬡</span>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>StableCore</span>
            <span>— Built on Solana · StableHacks 2026 · Organised by Tenity</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['AMINA Bank Partner', 'Solana Foundation', 'Fireblocks Custody', 'Keyrock Liquidity'].map(p => (
              <span key={p} style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }}>{p}</span>
            ))}
          </div>
        </footer>
      </main>

      {showWalletModal && (
        <WalletModal
          onClose={() => setShowWalletModal(false)}
          onConnect={(wallet) => {
            setConnectedWallet(wallet);
            setShowWalletModal(false);
          }}
        />
      )}
    </div>
  );
}
