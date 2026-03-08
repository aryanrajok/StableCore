import { TICKER_DATA } from '../data';

export default function Ticker() {
    const items = [...TICKER_DATA, ...TICKER_DATA];
    return (
        <div className="ticker-bar">
            <div className="ticker-inner">
                {items.map((t, i) => (
                    <div className="ticker-item" key={i}>
                        <span className="ticker-name">{t.name}</span>
                        <span className="ticker-price">{t.price}</span>
                        <span className={`ticker-change ${t.up ? 'up' : 'down'}`}>
                            {t.up ? '▲' : '▼'} {t.change}
                        </span>
                        <span style={{ color: '#334155', fontSize: 12, margin: '0 4px' }}>·</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, flexShrink: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
                    <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>SOL Devnet</span>
                    <span style={{ color: '#34d399', fontSize: 11, fontWeight: 700, background: 'rgba(52,211,153,0.1)', padding: '1px 7px', borderRadius: 10 }}>LIVE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 16px', flexShrink: 0 }}>
                    <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>AMINA Oracle</span>
                    <span style={{ color: '#34d399', fontSize: 11, fontWeight: 700 }}>ACTIVE</span>
                </div>
            </div>
        </div>
    );
}
