/* ==========================================================================
   VaultRail — card preview logic
   Cosmetic only: detects network from prefix and formats the live card
   visual. No validation here is real; this never leaves the browser tab.
   ========================================================================== */

const CardLogic = {
  // Returns 'visa' | 'mastercard' | 'amex' | 'verve' | null based on prefix
  detectNetwork(digits) {
    if (!digits) return null;
    if (/^4/.test(digits)) return 'visa';
    if (/^(5[1-5]|22[2-9]|2[3-6]\d|27[01]\d|2720)/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^(506099|5061[0-9]{2}|5078[0-9]{2}|6500[0-2][0-9])/.test(digits)) return 'verve';
    return null;
  },

  networkLabel(network) {
    return { visa: 'VISA', mastercard: 'Mastercard', amex: 'American Express', verve: 'Verve' }[network] || 'Card';
  },

  // Groups digits per-network (Amex = 4-6-5, everyone else = 4-4-4-4)
  formatNumber(digits, network) {
    const clean = digits.replace(/\D/g, '');
    if (network === 'amex') {
      const parts = [clean.slice(0, 4), clean.slice(4, 10), clean.slice(10, 15)].filter(Boolean);
      return parts.join(' ');
    }
    const parts = clean.match(/.{1,4}/g) || [];
    return parts.join(' ').slice(0, 19);
  },

  maxDigits(network) {
    return network === 'amex' ? 15 : 16;
  },

  maskedNumber(digits, network) {
    const clean = digits.replace(/\D/g, '');
    const last4 = clean.slice(-4) || '••••';
    return network === 'amex' ? `•••• •••••• ${last4}` : `•••• •••• •••• ${last4}`;
  },

  formatExpiry(value) {
    const clean = value.replace(/\D/g, '').slice(0, 4);
    if (clean.length <= 2) return clean;
    return clean.slice(0, 2) + ' / ' + clean.slice(2);
  },

  // Cosmetic Luhn check — only used to show a small "format looks valid" hint,
  // never a real validation and nothing is ever sent anywhere.
  luhnPasses(digits) {
    const clean = digits.replace(/\D/g, '');
    if (clean.length < 12) return false;
    let sum = 0;
    let alt = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let n = parseInt(clean[i], 10);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }
};
