import { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell,
} from 'recharts';
import { VAULTS, AUDIT_LOG, TVL_HISTORY, RISK_METRICS, formatUSD } from '../data';

const PIE_COLORS = ['#4f6ef7', '#10b981', '#f59e0b', '#06b6d4'];

const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#1a1d2a', border: '1px solid #252a3d', borderRadius: 8, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{label}</div>
            <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>${payload[0].value}M TVL</div>
        </div>
    );
};

const METRICS = [
    { label: 'Total Value Locked', value: '$26.67M', change: '+18.3%', dir: 'up', icon: '🏛️', cls: 'ic-blue', note: 'vs last month' },
    { label: 'Active Vaults', value: '4', change: '+2', dir: 'up', icon: '⬡', cls: 'ic-purple', note: 'this month' },
    { label: 'KYC Participants', value: '49', change: '+6', dir: 'up', icon: '👥', cls: 'ic-green', note: 'this week' },
    { label: 'Average APY', value: '6.40%', change: '+2.3%', dir: 'up', icon: '📈', cls: 'ic-amber', note: 'vs TradFi avg' },
];

export default function Dashboard({ onNavigate }) {
    const totalTVL = VAULTS.reduce((s, v) => s + v.tvl, 0);
    const pieData = VAULTS.map(v => ({ name: v.symbol, value: v.tvl }));

    return (
        <div className="fade-in">

            {/* Metric Cards */}
            <div className="metrics-grid">
                {METRICS.map(m => (
                    <div className="metric-card" key={m.label}>
                        <div className="metric-card-top">
                            <span className="metric-label">{m.label}</span>
                            <div className={`metric-icon-wrap ${m.cls}`}>{m.icon}</div>
                        </div>
                        <div className="metric-value">{m.value}</div>
                        <div className={`metric-change ${m.dir}`}>
                            <span>{m.dir === 'up' ? '↑' : '↓'} {m.change}</span>
                            <span className="metric-change-label">{m.note}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main 2-col grid */}
            <div className="content-grid">

                {/* Left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* TVL Chart */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Total Value Locked</span>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span className="badge badge-active">● Live</span>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Jan 15 → Mar 4</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div style={{ marginBottom: 14 }}>
                                <span style={{ fontSize: 28, fontWeight: 800, fontFamily: 'JetBrains Mono', color: 'var(--text-primary)', letterSpacing: -1 }}>$26.67M</span>
                                <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>↑ +18.3%</span>
                            </div>
                            <div className="chart-wrap">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={TVL_HISTORY}>
                                        <defs>
                                            <linearGradient id="tvlGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4f6ef7" stopOpacity={0.18} />
                                                <stop offset="100%" stopColor="#4f6ef7" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}M`} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Area type="monotone" dataKey="tvl" stroke="#4f6ef7" strokeWidth={2.5} fill="url(#tvlGrad)" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Active Vaults */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Active Vaults</span>
                            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('vaults')}>Manage →</button>
                        </div>
                        {VAULTS.map(v => (
                            <div className="vault-item" key={v.id} onClick={() => onNavigate('vaults')}>
                                <div className="vault-icon" style={{ background: `${v.color}18`, border: `1px solid ${v.color}33` }}>
                                    {v.emoji}
                                </div>
                                <div className="vault-info">
                                    <div className="vault-name">{v.name}</div>
                                    <div className="vault-meta">{v.strategy} · {v.participants} participants · {v.kycLevel}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                                    <div className="vault-tvl">{formatUSD(v.tvl)}</div>
                                    <div className="vault-apy">{v.apy}% APY</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Partner strip */}
                    <div className="card">
                        <div style={{ padding: '12px 22px 6px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
                            Ecosystem Partners
                        </div>
                        <div className="partner-row">
                            {['🏦 AMINA Bank', '◎ Solana Foundation', '🔷 Fireblocks', '📊 Keyrock', '🏛️ UBS', '💰 Steakhouse', '🌐 Solstice'].map(p => (
                                <div className="partner-item" key={p}>{p}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Treasury snapshot */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Treasury Assets</span>
                            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('treasury')}>View All →</button>
                        </div>
                        {[
                            { icon: '💵', name: 'USDC', chain: 'Solana (SPL)', amount: '12,450,000', color: '#2775ca' },
                            { icon: '💶', name: 'EURC', chain: 'Solana (SPL)', amount: '7,820,000', color: '#0052b4' },
                            { icon: '💴', name: 'USDG', chain: 'Solana (SPL)', amount: '4,100,000', color: '#10b981' },
                            { icon: '◎', name: 'SOL', chain: 'Native', amount: '16,240.50', color: '#9945ff' },
                        ].map(a => (
                            <div className="asset-row" key={a.name}>
                                <div className="asset-logo" style={{ color: a.color, fontSize: 20 }}>{a.icon}</div>
                                <div>
                                    <div className="asset-name">{a.name}</div>
                                    <div className="asset-chain">{a.chain}</div>
                                </div>
                                <div className="asset-amount">{a.amount}</div>
                                <span className="asset-arrow">↗</span>
                            </div>
                        ))}
                    </div>

                    {/* Vault Distribution Pie */}
                    <div className="card">
                        <div className="card-header"><span className="card-title">Vault Distribution</span></div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: 160 }}>
                                <ResponsiveContainer width={160} height={160}>
                                    <PieChart>
                                        <Pie data={pieData} cx={75} cy={75} innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="value">
                                            {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ width: '100%', marginTop: 8 }}>
                                {VAULTS.map((v, i) => (
                                    <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i], flexShrink: 0 }} />
                                        <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, fontWeight: 500 }}>{v.symbol}</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'JetBrains Mono', color: 'var(--text-primary)' }}>
                                            {((v.tvl / totalTVL) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Risk Snapshot */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Risk Snapshot</span>
                            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('risk')}>Full Report →</button>
                        </div>
                        <div className="card-body">
                            {RISK_METRICS.slice(0, 4).map(m => (
                                <div className="risk-bar-wrap" key={m.label}>
                                    <div className="risk-bar-header">
                                        <span className="risk-bar-label">{m.label}</span>
                                        <span className="risk-bar-value">{m.value}%</span>
                                    </div>
                                    <div className="risk-bar-track">
                                        <div className="risk-bar-fill" style={{ width: `${(m.value / m.max) * 100}%`, background: m.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Recent Activity</span>
                            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('audit')}>View All →</button>
                        </div>
                        {AUDIT_LOG.slice(0, 4).map(a => {
                            const colors = { deposit: '#10b981', withdraw: '#f59e0b', kyc: '#4f6ef7', strategy: '#7c3aed', alert: '#ef4444' };
                            const icons = { deposit: '💰', withdraw: '📤', kyc: '🔐', strategy: '⚙️', alert: '⚠️' };
                            return (
                                <div className="audit-entry" key={a.id} style={{ padding: '12px 22px' }}>
                                    <div className="audit-icon-wrap" style={{ background: `${colors[a.type]}16`, border: `1px solid ${colors[a.type]}30` }}>
                                        {icons[a.type]}
                                    </div>
                                    <div className="audit-content">
                                        <div className="audit-action">{a.action}</div>
                                        <div className="audit-detail">{a.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
