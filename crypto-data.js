/* ==========================================================================
   VaultRail — mock market data
   All prices are static demo values, not a live feed.
   ========================================================================== */

const CRYPTO_LIST = [
  { id: 'btc',  name: 'Bitcoin',  symbol: 'BTC',  price: 67250.40, change: 2.31,  color: '#F7931A' },
  { id: 'eth',  name: 'Ethereum', symbol: 'ETH',  price: 3504.18,  change: 1.42,  color: '#9FB3E8' },
  { id: 'xrp',  name: 'XRP',      symbol: 'XRP',  price: 0.612,    change: -0.84, color: '#6FA7D8' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.1428,   change: 4.07,  color: '#E7C24A' },
  { id: 'usdt', name: 'Tether',   symbol: 'USDT', price: 1.00,     change: 0.01,  color: '#3DDC97' }
];

function vrFindCoin(id) {
  return CRYPTO_LIST.find(c => c.id === id) || null;
}

function vrFormatUSD(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
