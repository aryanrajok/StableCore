import { useState } from 'react';
import { VAULTS, formatUSD } from '../data';

const STRATEGIES = [
    { id: 'conservative', name: 'Conservative Treasury', desc: 'T-Bills + Money Market · Low risk', apy: '4–6%' },
    { id: 'crossborder', name: 'Cross-Border Optimized', desc: 'Multi-currency routing · Medium risk', apy: '5–7%' },
    { id: 'rwa', name: 'RWA-Backed Commodities', desc: 'Tokenized real-world assets · Higher yield', apy: '8–12%' },
    { id: 'payments', name: 'Programmable Payments', desc: 'Instant settlement · Batch processing', apy: '3–5%' },
];
const KYC_LEVELS = [
    { id: 'KYC-1', sub: 'Basic' }, { id: 'KYC-2', sub: 'Standard' },
    { id: 'KYC-3', sub: 'Institutional' }, { id: 'KYC-4', sub: 'Regulated Bank' },
];
const JURS = ['CH', 'EU', 'US', 'SG', 'GLOBAL'];

export default function VaultManager() {
    const [selected, setSelected] = useState(VAULTS[0]);
    const [showCreate, setShowCreate] = useState(false);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', asset: 'USDC', strategy: '', kycLevel: 'KYC-3', minDeposit: '', jurisdictions: [] });
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(false);

    const handleCreate = async () => {
        setCreating(true);
        await new Promise(r => setTimeout(r, 2200));
        setCreating(false); setCreated(true);
        setTimeout(() => { setShowCreate(false); setCreated(false); setStep(1); }, 2000);
    };

    return (
        <div className="fade-in">
            <div className="two-col">

                {/* Left: Vault List */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Permissioned Vaults</h2>
                        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>+ Create Vault</button>
                    </div>
                    <div className="alert alert-info" style={{ marginBottom: 16 }}>
                        <span>ℹ️</span>
                        <div>All vaults deployed on <strong>Solana Devnet</strong>. KYC gates enforced on-chain by Anchor.</div>
                    </div>
                    <div className="card">
                        {VAULTS.map(v => (
                            <div key={v.id} className="vault-item" onClick={() => setSelected(v)}
                                style={{ borderLeft: selected.id === v.id ? `3px solid ${v.color}` : '3px solid transparent', paddingLeft: 18 }}>
                                <div className="vault-icon" style={{ background: `${v.color}16`, border: `1px solid ${v.color}30` }}>{v.emoji}</div>
                                <div className="vault-info">
                                    <div className="vault-name">{v.name}</div>
                                    <div className="vault-meta" style={{ display: 'flex', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                                        <span className="badge badge-kyc">{v.asset}</span>
                                        <span className="badge badge-neutral">{v.kycLevel}</span>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                                    <div className="vault-tvl">{formatUSD(v.tvl)}</div>
                                    <div className="vault-apy">{v.apy}% APY</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Vault Detail */}
                {selected && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div className="card">
                            <div className="card-header" style={{ borderBottom: `2px solid ${selected.color}` }}>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>{selected.emoji} {selected.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.strategy}</div>
                                </div>
                                <span className="badge badge-active">Active</span>
                            </div>
                            <div className="card-body">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                                    {[
                                        { label: 'TVL', value: formatUSD(selected.tvl) },
                                        { label: 'APY', value: `${selected.apy}%` },
                                        { label: 'Participants', value: selected.participants },
                                        { label: 'Min Deposit', value: formatUSD(selected.minDeposit) },
                                        { label: 'KYC Level', value: selected.kycLevel },
                                        { label: 'Created', value: selected.created },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{ background: 'var(--bg-surface-2)', borderRadius: 8, padding: '11px 13px', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 4 }}>{label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 10 }}>Asset Allocation</div>
                                    {Object.entries(selected.allocation).map(([k, v]) => (
                                        <div className="risk-bar-wrap" key={k}>
                                            <div className="risk-bar-header">
                                                <span className="risk-bar-label">{k}</span>
                                                <span className="risk-bar-value">{v}%</span>
                                            </div>
                                            <div className="risk-bar-track"><div className="risk-bar-fill" style={{ width: `${v}%`, background: selected.color }} /></div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 }}>Jurisdictions</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {selected.jurisdiction.map(j => <span key={j} className="badge badge-neutral">{j}</span>)}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn btn-primary" style={{ flex: 1 }}>Deposit</button>
                                    <button className="btn btn-secondary">Withdraw</button>
                                    <button className="btn btn-ghost">Configure</button>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header"><span className="card-title">On-Chain Program</span></div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="form-label">Program ID (Devnet)</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <span className="chain-addr" style={{ flex: 1, padding: '9px 12px', fontSize: 11 }}>{selected.programId}</span>
                                        <button className="btn btn-ghost btn-sm">Copy</button>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    {['create_vault', 'add_participant', 'deposit', 'withdraw', 'rebalance_strategy', 'emit_audit_event'].map(fn => (
                                        <div key={fn} style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ color: 'var(--blue)', fontSize: 10, fontWeight: 700, background: 'var(--blue-light)', borderRadius: 3, padding: '1px 5px' }}>fn</span>
                                            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-secondary)' }}>{fn}()</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Vault Modal */}
            {showCreate && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
                    <div className="modal slide-up">
                        <div className="modal-header">
                            <span className="modal-title">Create Permissioned Vault</span>
                            <button className="modal-close" onClick={() => setShowCreate(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            {!created ? (
                                <>
                                    <div className="stepper">
                                        {['Vault Config', 'Compliance', 'Deploy'].map((label, i) => (
                                            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 0 }}>
                                                <div className={`step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                                                    <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
                                                    <div className="step-label">{label}</div>
                                                </div>
                                                {i < 2 && <div className="step-divider" />}
                                            </div>
                                        ))}
                                    </div>

                                    {step === 1 && (
                                        <>
                                            <div className="form-group">
                                                <label className="form-label">Vault Name</label>
                                                <input className="form-input" placeholder="e.g. AMINA Institutional USDC Vault" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Base Asset</label>
                                                <select className="form-select" value={form.asset} onChange={e => setForm({ ...form, asset: e.target.value })}>
                                                    {['USDC', 'EURC', 'USDG'].map(a => <option key={a}>{a}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Yield Strategy</label>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {STRATEGIES.map(s => (
                                                        <div key={s.id} className={`select-card ${form.strategy === s.id ? 'selected' : ''}`} onClick={() => setForm({ ...form, strategy: s.id })}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span className="select-card-title">{s.name}</span>
                                                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'var(--green-dim)', padding: '2px 8px', borderRadius: 12 }}>{s.apy}</span>
                                                            </div>
                                                            <div className="select-card-desc">{s.desc}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <>
                                            <div className="form-group">
                                                <label className="form-label">KYC Level Required</label>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                                    {KYC_LEVELS.map(k => (
                                                        <div key={k.id} className={`select-card ${form.kycLevel === k.id ? 'selected' : ''}`} style={{ padding: '10px 14px', textAlign: 'center' }} onClick={() => setForm({ ...form, kycLevel: k.id })}>
                                                            <div className="select-card-title">{k.id}</div>
                                                            <div className="select-card-desc">{k.sub}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Minimum Deposit (USD)</label>
                                                <input className="form-input" type="number" placeholder="e.g. 100000" value={form.minDeposit} onChange={e => setForm({ ...form, minDeposit: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Allowed Jurisdictions</label>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {JURS.map(j => (
                                                        <div key={j} style={{ padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12, fontWeight: 700, border: `1.5px solid ${form.jurisdictions.includes(j) ? 'var(--blue)' : 'var(--border)'}`, background: form.jurisdictions.includes(j) ? 'var(--blue-light)' : 'transparent', color: form.jurisdictions.includes(j) ? 'var(--blue)' : 'var(--text-muted)', transition: 'var(--transition)' }}
                                                            onClick={() => setForm({ ...form, jurisdictions: form.jurisdictions.includes(j) ? form.jurisdictions.filter(x => x !== j) : [...form.jurisdictions, j] })}>
                                                            {j}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {step === 3 && (
                                        <>
                                            <div className="alert alert-info" style={{ marginBottom: 18 }}><span>🔗</span><div>Deploying to <strong>Solana Devnet</strong> via Anchor.</div></div>
                                            <div style={{ background: 'var(--bg-surface-2)', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
                                                {[
                                                    { label: 'Vault Name', value: form.name || 'Unnamed Vault' },
                                                    { label: 'Asset', value: form.asset },
                                                    { label: 'Strategy', value: STRATEGIES.find(s => s.id === form.strategy)?.name || '—' },
                                                    { label: 'KYC Level', value: form.kycLevel },
                                                    { label: 'Min Deposit', value: form.minDeposit ? `$${Number(form.minDeposit).toLocaleString()}` : '—' },
                                                    { label: 'Jurisdictions', value: form.jurisdictions.join(', ') || 'GLOBAL' },
                                                ].map((item, i) => (
                                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                                                        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>{item.label}</span>
                                                        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '28px 0' }}>
                                    <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>Vault Deployed!</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Live on Solana Devnet</div>
                                </div>
                            )}
                        </div>
                        {!created && (
                            <div className="modal-footer">
                                {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
                                <div style={{ flex: 1 }} />
                                {step < 3
                                    ? <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Continue →</button>
                                    : <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>{creating ? 'Deploying...' : 'Deploy Vault →'}</button>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
