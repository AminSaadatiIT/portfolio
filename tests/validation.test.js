/**
 * Unit Tests — Form Validation & AI Generator
 *
 * Run with: node tests/validation.test.js
 * (Simple test runner without Jest dependency)
 */

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✅ ${message}`);
        passed++;
    } else {
        console.log(`  ❌ ${message}`);
        failed++;
    }
}

// ─── Email Validation ───
console.log('\n📧 Email Validation Tests:');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

assert(isValidEmail('test@example.com') === true, 'Valid email passes');
assert(isValidEmail('user@domain.co.ir') === true, 'Valid .co.ir email passes');
assert(isValidEmail('') === false, 'Empty string fails');
assert(isValidEmail('notanemail') === false, 'No @ fails');
assert(isValidEmail('no@domain') === false, 'No TLD fails');
assert(isValidEmail('@domain.com') === false, 'No local part fails');

// ─── Password Strength ───
console.log('\n🔒 Password Strength Tests:');

function isStrongPassword(pass) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).{8,}$/.test(pass);
}

assert(isStrongPassword('Admin@1234') === true, 'Strong password passes');
assert(isStrongPassword('Str0ng!Pass') === true, 'Another strong password passes');
assert(isStrongPassword('weak') === false, 'Weak password fails');
assert(isStrongPassword('12345678') === false, 'Numbers only fails');
assert(isStrongPassword('abcdefgh') === false, 'Lowercase only fails');
assert(isStrongPassword('ABCDEFGH') === false, 'Uppercase only fails');
assert(isStrongPassword('Ab1!') === false, 'Too short fails');

// ─── XSS Prevention ───
console.log('\n🛡️ XSS Prevention Tests:');

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

assert(escapeHTML('<script>alert("xss")</script>') === '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', 'Script tags escaped');
assert(escapeHTML('<img onerror="alert(1)">') === '&lt;img onerror=&quot;alert(1)&quot;&gt;', 'IMG onerror escaped');
assert(escapeHTML('Normal text') === 'Normal text', 'Normal text unchanged');
assert(escapeHTML("it's a test") === "it&#039;s a test", 'Single quotes escaped');

// ─── AI Generator (Template) ───
console.log('\n🤖 AI Generator Tests:');

// Simulate the generator logic
const templates = {
    cabling: ['Template about cabling project.'],
    cctv: ['Template about CCTV installation.']
};

function generateDesc(title, categories) {
    if (!title || !categories.length) return '';
    let desc = `Project: ${title}. `;
    categories.forEach(cat => {
        if (templates[cat]) desc += templates[cat][0] + ' ';
    });
    return desc.trim();
}

assert(generateDesc('Test', ['cabling']).includes('cabling'), 'Cabling template included');
assert(generateDesc('Test', ['cctv']).includes('CCTV'), 'CCTV template included');
assert(generateDesc('', []) === '', 'Empty input returns empty');
assert(generateDesc('My Project', ['cabling', 'cctv']).includes('My Project'), 'Title included');

// ─── Results ───
console.log(`\n═══════════════════════════════`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`═══════════════════════════════\n`);

process.exit(failed > 0 ? 1 : 0);