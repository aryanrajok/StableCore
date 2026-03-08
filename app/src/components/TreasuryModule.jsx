import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PAYMENT_FLOWS, formatUSD } from '../data';

const CORRIDORS = [
    { from: '🇨🇭 CH', to: '🇸🇬 SG', currency: 'USDC', volume: 1_500_000, time: '< 2s', fees: '$0.00025', trend: '+12%' },
    { from: '🇪🇺 EU', to: '🇺🇸 US', currency: 'EURC', volume: 2_800_000, time: '< 2s', fees: '$0.00031', trend: '+8%' },
    { from: '🇺🇸 US', to: '🇪🇺 EU', currency: 'USDC', volume: 950_000, time: '< 2s', fees: '$0.00028', trend: '+5%' },
    { from: '🇨🇭 CH', to: '🇪🇺 EU', currency: 'EURC', volume: 3_200_000, time: '< 2s', fees: '$0.00019', trend: '+21%' },
];

const SCHEDULED = [
    { id: 'TX-4421', from: 'AMINA Bank AG', to: 'UBS Treasury', amount: 500_000, currency: 'USDC', status: 'scheduled' },
    { id: 'TX-4422', from: 'Keyrock Capital', to: 'Swiss Pension Fund', amount: 250_000, currency: 'EURC', status: 'scheduled' },
    { id: 'TX-4423', from: 'FX Corp', to: 'AMINA Bank AG', amount: 100_000, currency: 'USDC', status: 'pending' },
    { id: 'TX-4419', from: 'UBS Asset Mgmt', to: 'Keyrock Capital', amount: 1_200_000, currency: 'USDC', status: 'completed' },
];

const ChartTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#1a1d2a', border: '1px solid #252a3d', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{label}</div>
            {payload.map((p, i) => <div key={i} style={{ color: p.color, fontSize: 13, fontWeight: 700 }}>{p.name}: ${p.value}M</div>)}
        </div>
    );
};

export default function TreasuryModule() {
    const [tab, setTab] = useState('flows');
    const [showModal, setShowModal] = useState(false);
    const [bf, setBf] = useState({ from: '', to: '', amount: '', currency: 'USDC' });
    const [exec, setExec] = useState(false);

    const handleExec = async () => { setExec(true); await new Promise(r => setTimeout(r, 1800)); setExec(false); setShowModal(false); };

    return (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 22 }}>
                {[
                    { label: '24h Volume', value: '$8.4M', sub: '47 transactions', icon: '💸', color: 'var(--blue)' },
                    { label: 'Avg Settlement', value: '1.8s', sub: 'vs 2–5d SWIFT', icon: '⚡', color: 'var(--green)' },
                    { label: 'Active Corridors', value: '4', sub: 'CH · EU · US · SG', icon: '🌍', color: '#7c3aed' },
                    { label: 'Fees Saved', value: '$142K', sub: 'vs SWIFT this month', icon: '💰', color: 'var(--amber)' },
                ].map(s => (
                    <div key={s.label} className="metric-card">
                        <div className="metric-card-top"><span className="metric-label">{s.label}</span><span style={{ fontSize: 22 }}>{s.icon}</span></div>
                        <div className="metric-value" style={{ color: s.color, fontSize: 22 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            <div className="content-grid">
                <div>
                    <div className="tabs tabs-full">
                        {[{ id: 'flows', label: 'Payment Flows' }, { id: 'corridors', label: 'Corridors' }, { id: 'scheduled', label: 'Scheduled' }].map(t => (
                            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
                        ))}
                    </div>

                    {tab === 'flows' && (
                        <div className="card">
                            <div className="card-header"><span className="card-title">Weekly Payment Flows</span></div>
                            <div className="card-body">
                                <div style={{ height: 260 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={PAYMENT_FLOWS} barGap={6}>
                                            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}M`} />
                                            <Tooltip content={<ChartTip />} />
                                            <Legend formatter={v => <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{v}</span>} />
                                            <Bar dataKey="incoming" name="Incoming" fill="#10b981" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="outgoing" name="Outgoing" fill="#4f6ef7" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 'corridors' && (
                        <div className="card">
                            <div className="card-header"><span className="card-title">Active Corridors</span><span className="badge badge-active">{CORRIDORS.length} Active</span></div>
                            <table className="data-table">
                                <thead><tr><th>Route</th><th>Currency</th><th>30d Volume</th><th>Settlement</th><th>Fee/TX</th><th>Trend</th></tr></thead>
                                <tbody>
                                    {CORRIDORS.map((c, i) => (
                                        <tr key={i}>
                                            <td><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.from} → {c.to}</span></td>
                                            <td><span className="badge badge-kyc">{c.currency}</span></td>
                                            <td><span className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatUSD(c.volume)}</span></td>
                                            <td><span style={{ color: 'var(--green)', fontWeight: 700 }}>{c.time}</span></td>
                                            <td><span className="mono" style={{ color: 'var(--text-muted)' }}>{c.fees}</span></td>
                                            <td><span style={{ color: 'var(--green)', fontWeight: 700 }}>↑ {c.trend}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {tab === 'scheduled' && (
                        <div className="card">
                            <div className="card-header"><span className="card-title">Scheduled Payments</span><button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Schedule</button></div>
                            <table className="data-table">
                                <thead><tr><th>TX ID</th><th>From → To</th><th>Amount</th><th>Status</th></tr></thead>
                                <tbody>
                                    {SCHEDULED.map(tx => (
                                        <tr key={tx.id}>
                                            <td><span className="mono">{tx.id}</span></td>
                                            <td><div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 12 }}>{tx.from} → {tx.to}</div></td>
                                            <td><span className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatUSD(tx.amount)}</span> <span className="badge badge-kyc">{tx.currency}</span></td>
                                            <td><span className={`badge ${tx.status === 'completed' ? 'badge-active' : tx.status === 'scheduled' ? 'badge-kyc' : 'badge-pending'}`}>{tx.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Payment Rules</span></div>
                        <div className="card-body">
                            {[
                                { label: 'Max Single Transfer', value: '$5M / tx', icon: '🔒' },
                                { label: 'Daily Limit/Entity', value: '$20M', icon: '📊' },
                                { label: 'AML Auto-Screen', value: 'Enabled', icon: '🛡️', ok: true },
                                { label: 'Multi-sig Threshold', value: '2-of-3 > $1M', icon: '✍️' },
                                { label: 'Whitelist-Only', value: 'Enforced', icon: '✅', ok: true },
                                { label: 'Settlement', value: '< 2 seconds', icon: '⚡', ok: true },
                            ].map(r => (
                                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 17 }}>{r.icon}</span>
                                    <span style={{ flex: 1, fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{r.label}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: r.ok ? 'var(--green)' : 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{r.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Infrastructure Partners</span></div>
                        <div style={{ padding: '0 22px' }}>
                            {[
                                { name: 'Fireblocks', role: 'MPC Custody & Transfer', logo: '🔷' },
                                { name: 'AMINA Bank', role: 'Regulated Banking Rails', logo: '🏦' },
                                { name: 'Keyrock', role: 'Liquidity Provision', logo: '📉' },
                                { name: 'Solana Pay', role: 'Payment Protocol', logo: '◎' },
                            ].map(p => (
                                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 22 }}>{p.logo}</span>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.role}</div>
                                    </div>
                                    <span className="badge badge-active" style={{ marginLeft: 'auto' }}>Active</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="modal slide-up">
                        <div className="modal-header"><span className="modal-title">Schedule Payment</span><button className="modal-close" onClick={() => setShowModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label className="form-label">From Institution</label><input className="form-input" placeholder="e.g. AMINA Bank AG" value={bf.from} onChange={e => setBf({ ...bf, from: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">To Institution</label><input className="form-input" placeholder="e.g. UBS Treasury" value={bf.to} onChange={e => setBf({ ...bf, to: e.target.value })} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                                <div className="form-group"><label className="form-label">Amount (USD)</label><input className="form-input" type="number" placeholder="500000" value={bf.amount} onChange={e => setBf({ ...bf, amount: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Currency</label><select className="form-select" value={bf.currency} onChange={e => setBf({ ...bf, currency: e.target.value })}><option>USDC</option><option>EURC</option><option>USDG</option></select></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleExec} disabled={exec}>{exec ? 'Submitting...' : 'Schedule on Solana →'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
