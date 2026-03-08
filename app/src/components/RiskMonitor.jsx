import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { VAULTS, RISK_METRICS } from '../data';

const RADAR_DATA = [
    { metric: 'Concentration', value: 68 }, { metric: 'Liquidity', value: 87 },
    { metric: 'Counterparty', value: 76 }, { metric: 'Reg. Capital', value: 92 },
    { metric: 'Smart Contract', value: 96 }, { metric: 'Market', value: 82 },
];

const ALERTS = [
    { type: 'warning', icon: '⚠️', title: 'Concentration Risk Elevated', sub: 'Single-entity exposure at 32% — approaching 35% threshold', ts: '2m ago' },
    { type: 'info', icon: 'ℹ️', title: 'Strategy Rebalance Triggered', sub: 'T-Bills allocation auto-adjusted to 40% per optimizer rules', ts: '47m ago' },
    { type: 'success', icon: '✅', title: 'Smart Contract Audit Complete', sub: 'OtterSec audit passed — 0 critical, 2 low severity resolved', ts: '3h ago' },
];

const COMPLIANCE = [
    { label: 'FATF Travel Rule', status: 'Compliant', sub: 'Counterparty data on-chain', ok: true },
    { label: 'Basel III', status: 'Monitored', sub: 'Liquidity coverage ratio tracked', ok: true },
    { label: 'MiCA (EU)', status: 'Aligned', sub: 'Token classification: e-money', ok: true },
    { label: 'FINMA (CH)', status: 'Aligned', sub: 'Payment token framework', ok: true },
    { label: 'OtterSec Audit', status: 'Passed', sub: '0 critical findings', ok: true },
    { label: 'Fireblocks MPC', status: 'Active', sub: 'Institutional key management', ok: true },
];

export default function RiskMonitor() {
    return (
        <div className="fade-in">
            <div style={{ marginBottom: 22 }}>
                {ALERTS.map((a, i) => (
                    <div key={i} className={`alert alert-${a.type === 'warning' ? 'warning' : a.type === 'info' ? 'info' : 'success'}`}>
                        <span style={{ flexShrink: 0, fontSize: 16 }}>{a.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, marginBottom: 2, fontSize: 13 }}>{a.title}</div>
                            <div style={{ fontSize: 12, opacity: 0.9 }}>{a.sub}</div>
                        </div>
                        <div style={{ fontSize: 11, opacity: 0.7, flexShrink: 0 }}>{a.ts}</div>
                    </div>
                ))}
            </div>

            <div className="content-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Risk Framework</span><span className="badge badge-active">Monitoring Active</span></div>
                        <div className="card-body">
                            {RISK_METRICS.map(m => (
                                <div className="risk-bar-wrap" key={m.label} style={{ marginBottom: 18 }}>
                                    <div className="risk-bar-header">
                                        <div>
                                            <div className="risk-bar-label" style={{ fontSize: 13 }}>{m.label}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.desc}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div className="risk-bar-value">{m.value}%</div>
                                            <div style={{ fontSize: 10, color: m.value > m.threshold ? 'var(--red)' : 'var(--green)', fontWeight: 700 }}>{m.value > m.threshold ? '▲ Elevated' : '● Normal'}</div>
                                        </div>
                                    </div>
                                    <div className="risk-bar-track"><div className="risk-bar-fill" style={{ width: `${(m.value / m.max) * 100}%`, background: m.color }} /></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontSize: 10, color: 'var(--text-muted)' }}>
                                        <span>0%</span>
                                        <span style={{ color: m.value > m.threshold ? 'var(--red)' : 'var(--text-muted)' }}>Threshold: {m.threshold}%</span>
                                        <span>{m.max}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><span className="card-title">Per-Vault Risk Breakdown</span></div>
                        <table className="data-table">
                            <thead><tr><th>Vault</th><th>Concentration</th><th>Liquidity Ratio</th><th>Risk Level</th></tr></thead>
                            <tbody>
                                {[
                                    { sym: 'aiUSDC', conc: 32, liq: 87, risk: 'Medium' },
                                    { sym: 'cbEURC', conc: 28, liq: 91, risk: 'Low' },
                                    { sym: 'rwaCOM', conc: 41, liq: 78, risk: 'High' },
                                    { sym: 'ppUSD', conc: 19, liq: 95, risk: 'Low' },
                                ].map(v => (
                                    <tr key={v.sym}>
                                        <td><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.sym}</span></td>
                                        <td><span style={{ fontWeight: 700, fontFamily: 'JetBrains Mono', color: v.conc > 35 ? 'var(--red)' : v.conc > 28 ? 'var(--amber)' : 'var(--green)' }}>{v.conc}%</span></td>
                                        <td><span style={{ fontWeight: 700, fontFamily: 'JetBrains Mono', color: v.liq > 85 ? 'var(--green)' : 'var(--amber)' }}>{v.liq}%</span></td>
                                        <td><span className={`badge ${v.risk === 'Low' ? 'badge-active' : v.risk === 'Medium' ? 'badge-pending' : 'badge-restricted'}`}>{v.risk}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Risk Radar</span></div>
                        <div className="card-body">
                            <div style={{ height: 230 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={RADAR_DATA}>
                                        <PolarGrid stroke="#252a3d" />
                                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 10.5, fontWeight: 600 }} />
                                        <Tooltip contentStyle={{ background: '#1a1d2a', border: '1px solid #252a3d', borderRadius: 8, color: '#f1f5f9', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                                        <Radar name="Score" dataKey="value" stroke="#4f6ef7" fill="#4f6ef7" fillOpacity={0.15} strokeWidth={2} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                                {RADAR_DATA.map(d => (
                                    <div key={d.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: 'var(--bg-surface-2)', borderRadius: 6 }}>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{d.metric}</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'JetBrains Mono', color: 'var(--blue)' }}>{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><span className="card-title">Institutional Compliance</span></div>
                        <div style={{ padding: '0 22px' }}>
                            {COMPLIANCE.map(c => (
                                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 18 }}>{c.ok ? '✅' : '⚠️'}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{c.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.sub}</div>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: c.ok ? 'var(--green)' : 'var(--amber)' }}>{c.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
