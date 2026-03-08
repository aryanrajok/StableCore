export const formatUSD = (n) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M`
        : n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K`
            : `$${n.toLocaleString()}`;

export const VAULTS = [
    { id: 'vault-001', name: 'AMINA Institutional USDC Vault', symbol: 'aiUSDC', emoji: '🏦', asset: 'USDC', tvl: 12_500_000, apy: 6.82, strategy: 'Conservative Treasury', kycLevel: 'KYC-3', participants: 14, minDeposit: 100_000, created: '2026-01-15', color: '#4655f5', jurisdiction: ['CH', 'EU', 'SG'], programId: 'StCoreProg111111111111111111111111111111111', allocation: { 'T-Bills': 55, 'Money Market': 30, 'DeFi LP': 15 } },
    { id: 'vault-002', name: 'Cross-Border EURC Treasury', symbol: 'cbEURC', emoji: '🌍', asset: 'EURC', tvl: 7_820_000, apy: 5.14, strategy: 'Cross-Border Optimized', kycLevel: 'KYC-3', participants: 8, minDeposit: 250_000, created: '2026-01-22', color: '#0ea5e9', jurisdiction: ['EU', 'CH', 'US'], programId: 'StCoreProg222222222222222222222222222222222', allocation: { 'FX Hedging': 40, 'DeFi Yield': 35, 'Liquidity': 25 } },
    { id: 'vault-003', name: 'RWA Commodity Stablecoin Vault', symbol: 'rwaCOM', emoji: '⚡', asset: 'USDC', tvl: 4_100_000, apy: 9.45, strategy: 'RWA-Backed Commodities', kycLevel: 'KYC-4', participants: 5, minDeposit: 500_000, created: '2026-02-01', color: '#f79009', jurisdiction: ['CH', 'GLOBAL'], programId: 'StCoreProg333333333333333333333333333333333', allocation: { 'Tokenized Gold': 50, 'Energy RWA': 30, 'Reserve': 20 } },
    { id: 'vault-004', name: 'Permissioned Payments Vault', symbol: 'ppUSD', emoji: '⚡', asset: 'USDC', tvl: 2_250_000, apy: 4.20, strategy: 'Programmable Payments', kycLevel: 'KYC-2', participants: 22, minDeposit: 50_000, created: '2026-02-10', color: '#12b76a', jurisdiction: ['GLOBAL'], programId: 'StCoreProg444444444444444444444444444444444', allocation: { 'Liquidity Buffer': 60, 'Yield Farming': 25, 'Reserve': 15 } },
];

export const PARTICIPANTS = [
    { id: 'p1', name: 'AMINA Bank AG', wallet: '7xKXt...9pQR', role: 'Lead Depositor', kyc: 'KYC-3', status: 'active', allocation: 4_500_000, joined: '2026-01-18' },
    { id: 'p2', name: 'UBS Asset Mgmt', wallet: 'AqLmP...3rST', role: 'Institutional', kyc: 'KYC-3', status: 'active', allocation: 3_200_000, joined: '2026-01-20' },
    { id: 'p3', name: 'Keyrock Capital', wallet: 'BnRvW...5kUV', role: 'Market Maker', kyc: 'KYC-3', status: 'active', allocation: 1_800_000, joined: '2026-01-25' },
    { id: 'p4', name: 'Fireblocks Custody', wallet: 'CmFxT...8mMX', role: 'Custodian', kyc: 'KYC-4', status: 'active', allocation: 0, joined: '2026-01-28' },
    { id: 'p5', name: 'Swiss Pension Fund', wallet: 'DpUzZ...2nYA', role: 'Institutional', kyc: 'KYC-3', status: 'pending', allocation: 2_000_000, joined: '2026-02-14' },
    { id: 'p6', name: 'FX Corp Treasury', wallet: 'EqVaA...4oB8', role: 'Corporate', kyc: 'KYC-2', status: 'active', allocation: 750_000, joined: '2026-02-20' },
];

export const AUDIT_LOG = [
    { id: 'a1', type: 'deposit', action: 'Vault Deposit Executed', detail: 'vault-001 · $500K USDC · tx 5xKpL9...', actor: 'AMINA Bank AG', vault: 'vault-001', time: '2m ago' },
    { id: 'a2', type: 'kyc', action: 'KYC-3 Participant Approved', detail: 'wallet 7xKXt...9pQR whitelisted on-chain', actor: 'Admin', vault: 'vault-001', time: '10m ago' },
    { id: 'a3', type: 'strategy', action: 'Yield Strategy Rebalanced', detail: 'T-Bills 40%, MM 35%, DeFi LP 25%', actor: 'Optimizer', vault: 'vault-001', time: '1h ago' },
    { id: 'a4', type: 'deposit', action: 'Cross-Border EURC Deposit', detail: 'vault-002 · €250K EURC · Corridor EU→CH', actor: 'UBS Asset Mgmt', vault: 'vault-002', time: '2h ago' },
    { id: 'a5', type: 'alert', action: 'Concentration Alert Triggered', detail: 'Single-entity at 32% — threshold 35%', actor: 'Risk Engine', vault: 'vault-001', time: '3h ago' },
    { id: 'a6', type: 'kyc', action: 'KYC-4 Participant Verified', detail: 'Fireblocks Custody · wallet CmFxT...8mMX', actor: 'AMINA KYC', vault: 'vault-003', time: '5h ago' },
    { id: 'a7', type: 'withdraw', action: 'Compliance-Hooked Withdrawal', detail: 'vault-003 · $100K USDC · FATF note attached', actor: 'Keyrock Capital', vault: 'vault-003', time: '6h ago' },
    { id: 'a8', type: 'deposit', action: 'RWA Vault Deposit Executed', detail: 'vault-003 · $500K USDC · Gold-backed RWA', actor: 'Swiss Pension Fund', vault: 'vault-003', time: '8h ago' },
    { id: 'a9', type: 'strategy', action: 'Cross-Border Corridor Opened', detail: 'CH → SG route activated · $1.5M cap', actor: 'Treasury Mgr', vault: 'vault-002', time: '12h ago' },
    { id: 'a10', type: 'alert', action: 'Smart Contract Audit Passed', detail: 'OtterSec: 0 critical, 2 low severity fixed', actor: 'OtterSec', vault: 'ALL', time: '1d ago' },
];

export const TVL_HISTORY = [
    { date: 'Jan 15', tvl: 0.5 }, { date: 'Jan 22', tvl: 2.1 }, { date: 'Jan 29', tvl: 5.8 },
    { date: 'Feb 5', tvl: 9.4 }, { date: 'Feb 12', tvl: 12.2 }, { date: 'Feb 19', tvl: 16.5 },
    { date: 'Feb 26', tvl: 22.1 }, { date: 'Mar 4', tvl: 26.67 },
];

export const PAYMENT_FLOWS = [
    { date: 'Feb 26', incoming: 1.2, outgoing: 0.8 }, { date: 'Feb 27', incoming: 2.1, outgoing: 1.4 },
    { date: 'Feb 28', incoming: 1.8, outgoing: 1.1 }, { date: 'Mar 1', incoming: 3.2, outgoing: 2.3 },
    { date: 'Mar 2', incoming: 2.4, outgoing: 1.7 }, { date: 'Mar 3', incoming: 4.1, outgoing: 3.0 },
    { date: 'Mar 4', incoming: 3.8, outgoing: 2.6 },
];

export const RISK_METRICS = [
    { label: 'Concentration Risk', value: 32, max: 100, threshold: 35, color: '#f79009', desc: 'Max single-entity exposure by TVL' },
    { label: 'Liquidity Coverage', value: 87, max: 100, threshold: 75, color: '#12b76a', desc: 'Liquid assets vs. instant redemptions' },
    { label: 'Counterparty Exposure', value: 41, max: 100, threshold: 50, color: '#0ea5e9', desc: 'Max exposure to a single counterparty' },
    { label: 'Regulatory Capital', value: 78, max: 100, threshold: 70, color: '#7c3aed', desc: 'Basel III capital adequacy ratio' },
    { label: 'Smart Contract Audit', value: 96, max: 100, threshold: 80, color: '#4655f5', desc: 'OtterSec security score' },
];

export const TICKER_DATA = [
    { name: 'USDC/USD', price: '1.0000', change: '+0.00%', up: true },
    { name: 'EURC/EUR', price: '1.0001', change: '+0.01%', up: true },
    { name: 'SOL/USD', price: '142.38', change: '+3.21%', up: true },
    { name: 'BTC/USD', price: '87,420', change: '-1.14%', up: false },
    { name: 'ETH/USD', price: '3,241', change: '+0.87%', up: true },
    { name: 'USDT/USD', price: '1.0000', change: '+0.00%', up: true },
];
