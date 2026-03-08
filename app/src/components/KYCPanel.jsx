import { useState } from 'react';
import { PARTICIPANTS, formatUSD } from '../data';

const ROLES = ['Institutional', 'Market Maker', 'Custodian', 'Corporate', 'Lead Depositor'];

export default function KYCPanel() {
    const [participants, setParticipants] = useState(PARTICIPANTS);
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: '', wallet: '', role: 'Institutional', kyc: 'KYC-3' });
    const [adding, setAdding] = useState(false);

    const filtered = filter === 'all' ? participants : participants.filter(p => p.status === filter);

    const handleAdd = async () => {
        setAdding(true);
        await new Promise(r => setTimeout(r, 1600));
        setParticipants(prev => [...prev, { id: `p${Date.now()}`, name: form.name || 'New Institution', wallet: form.wallet || '9zXpR...4kNQ', role: form.role, kyc: form.kyc, status: 'pending', allocation: 0, joined: new Date().toISOString().split('T')[0] }]);
        setAdding(false); setShowAdd(false);
        setForm({ name: '', wallet: '', role: 'Institutional', kyc: 'KYC-3' });
    };

    const counts = { all: participants.length, active: participants.filter(p => p.status === 'active').length, pending: participants.filter(p => p.status === 'pending').length, restricted: participants.filter(p => p.status === 'restricted').length };

    return (
        <div className="fade-in">
            <div className="two-col">
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>KYC Whitelist</h2>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-secondary btn-sm">📥 Import CSV</button>
                            <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Participant</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {Object.entries(counts).map(([key, count]) => (
                            <button key={key} onClick={() => setFilter(key)}
                                style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)', border: `1.5px solid ${filter === key ? 'var(--blue)' : 'var(--border)'}`, background: filter === key ? 'var(--blue-light)' : 'var(--bg-surface-2)', color: filter === key ? 'var(--blue)' : 'var(--text-muted)', fontFamily: 'Inter,sans-serif' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
                            </button>
                        ))}
                    </div>
                    <div className="card">
                        <table className="data-table">
                            <thead><tr><th>Institution</th><th>KYC</th><th>Allocation</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div className="participant-avatar">{p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13 }}>{p.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{p.wallet}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-kyc">{p.kyc}</span></td>
                                        <td><span className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatUSD(p.allocation)}</span></td>
                                        <td><span className={`badge ${p.status === 'active' ? 'badge-active' : p.status === 'pending' ? 'badge-pending' : 'badge-restricted'}`}>{p.status}</span></td>
                                        <td onClick={e => e.stopPropagation()}>
                                            {p.status === 'pending' && <button className="btn btn-primary btn-sm" onClick={() => setParticipants(prev => prev.map(x => x.id === p.id ? { ...x, status: 'active' } : x))}>Approve</button>}
                                            {p.status === 'active' && <button className="btn btn-danger  btn-sm" onClick={() => setParticipants(prev => prev.map(x => x.id === p.id ? { ...x, status: 'restricted' } : x))}>Revoke</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[
                            { label: 'Whitelisted', val: counts.active, icon: '✅', color: 'var(--green)' },
                            { label: 'Pending', val: counts.pending, icon: '⏳', color: 'var(--amber)' },
                            { label: 'Restricted', val: counts.restricted, icon: '🚫', color: 'var(--red)' },
                            { label: 'KYC-3/4', val: participants.filter(p => ['KYC-3', 'KYC-4'].includes(p.kyc)).length, icon: '🏅', color: 'var(--blue)' },
                        ].map(s => (
                            <div key={s.label} className="stat-mini">
                                <div className="stat-mini-icon">{s.icon}</div>
                                <div className="stat-mini-val" style={{ color: s.color }}>{s.val}</div>
                                <div className="stat-mini-label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {selected ? (
                        <div className="card">
                            <div className="card-header">
                                <span className="card-title">{selected.name}</span>
                                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
                            </div>
                            <div className="card-body">
                                {[['Role', selected.role], ['Wallet', selected.wallet, true], ['KYC Level', selected.kyc], ['Status', selected.status], ['Allocation', formatUSD(selected.allocation), true], ['Member Since', selected.joined]].map(([label, value, mono]) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
                                        <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 700, fontFamily: mono ? 'JetBrains Mono' : 'Inter' }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-header"><span className="card-title">Compliance Framework</span></div>
                            <div className="card-body">
                                {['Smart Contract Whitelist', 'Jurisdiction Filter', 'AML Oracle Screening', 'On-Chain Audit Trail', 'FATF Travel Rule'].map(title => (
                                    <div key={title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                        <span>✅</span>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showAdd && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
                    <div className="modal slide-up">
                        <div className="modal-header">
                            <span className="modal-title">Add KYC Participant</span>
                            <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group"><label className="form-label">Institution Name</label><input className="form-input" placeholder="e.g. Goldman Sachs Treasury" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Solana Wallet Address</label><input className="form-input" placeholder="e.g. 7xKXt2pLm..." value={form.wallet} onChange={e => setForm({ ...form, wallet: e.target.value })} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div className="form-group"><label className="form-label">Role</label><select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>{ROLES.map(r => <option key={r}>{r}</option>)}</select></div>
                                <div className="form-group"><label className="form-label">KYC Level</label><select className="form-select" value={form.kyc} onChange={e => setForm({ ...form, kyc: e.target.value })}>{['KYC-1', 'KYC-2', 'KYC-3', 'KYC-4'].map(k => <option key={k}>{k}</option>)}</select></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>{adding ? 'Submitting...' : 'Add & Whitelist →'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
