import { useState } from 'react';
import { AUDIT_LOG } from '../data';

const TYPE_COLORS = { deposit: '#10b981', withdraw: '#f59e0b', kyc: '#4f6ef7', strategy: '#7c3aed', alert: '#ef4444' };
const TYPE_ICONS = { deposit: '💰', withdraw: '📤', kyc: '🔐', strategy: '⚙️', alert: '⚠️' };
const TYPE_BG = { deposit: 'rgba(16,185,129,0.12)', withdraw: 'rgba(245,158,11,0.12)', kyc: 'rgba(79,110,247,0.12)', strategy: 'rgba(124,58,237,0.12)', alert: 'rgba(239,68,68,0.12)' };

export default function AuditTrail() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = AUDIT_LOG.filter(a =>
        (filter === 'all' || a.type === filter) &&
        (search === '' || a.action.toLowerCase().includes(search.toLowerCase()) || a.detail.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '0 0 260px' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 14 }}>🔍</span>
                    <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Search audit entries..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['all', 'deposit', 'withdraw', 'kyc', 'strategy', 'alert'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)', border: `1.5px solid ${filter === f ? (TYPE_COLORS[f] || 'var(--blue)') : 'var(--border)'}`, background: filter === f ? (TYPE_BG[f] || 'var(--blue-light)') : 'var(--bg-surface-2)', color: filter === f ? (TYPE_COLORS[f] || 'var(--blue)') : 'var(--text-muted)', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
                            {f !== 'all' && <span>{TYPE_ICONS[f]}</span>}
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
                <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>📥 Export CSV</button>
            </div>

            <div className="content-grid">
                <div>
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Compliance Audit Log</span>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <span className="badge badge-active">● Live</span>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} entries</span>
                            </div>
                        </div>
                        {filtered.length === 0 ? (
                            <div className="empty-state"><div className="empty-state-icon">📋</div><div className="empty-state-text">No entries match your filter</div></div>
                        ) : (
                            filtered.map((a, i) => (
                                <div key={a.id} className="audit-entry">
                                    <div className="audit-icon-wrap" style={{ background: TYPE_BG[a.type], border: `1px solid ${TYPE_COLORS[a.type]}30` }}>{TYPE_ICONS[a.type]}</div>
                                    <div className="audit-content">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <span className="audit-action">{a.action}</span>
                                            <span className="badge" style={{ background: TYPE_BG[a.type], color: TYPE_COLORS[a.type], border: `1px solid ${TYPE_COLORS[a.type]}30`, textTransform: 'capitalize' }}>{a.type}</span>
                                        </div>
                                        <div className="audit-detail">{a.detail}</div>
                                        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                            <span>Actor: {a.actor}</span>
                                            <span>Vault: {a.vault}</span>
                                        </div>
                                    </div>
                                    <div className="audit-time">{a.time}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Activity Summary</span></div>
                        <div className="card-body">
                            {Object.entries(TYPE_ICONS).map(([type, icon]) => {
                                const count = AUDIT_LOG.filter(a => a.type === type).length;
                                return (
                                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, fontSize: 15, background: TYPE_BG[type], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                                        <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'capitalize' }}>{type}</span>
                                        <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'JetBrains Mono', color: TYPE_COLORS[type] }}>{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><span className="card-title">Regulatory Status</span></div>
                        <div className="card-body">
                            {[['FATF Travel Rule', 'Compliant', true], ['MiCA (EU)', 'Aligned', true], ['FINMA (CH)', 'Aligned', true], ['SEC Reporting', 'In Progress', false], ['Basel III', 'Monitored', true]].map(([label, status, ok]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: ok ? 'var(--green)' : 'var(--amber)' }}>{status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><span className="card-title">On-Chain Verification</span></div>
                        <div className="card-body">
                            <div className="chain-addr" style={{ display: 'block', padding: '10px 12px', marginBottom: 12, wordBreak: 'break-all', lineHeight: 1.7 }}>
                                devnet.solscan.io/tx/5xKpL9mNQr2wBv8...
                            </div>
                            <button className="btn btn-secondary" style={{ width: '100%' }}>View on Solscan Devnet ↗</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
