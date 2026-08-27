#!/usr/bin/env node

/**
 * GitHub Auto-Publish Script
 *
 * Usage:
 *   node scripts/publish.js
 *
 * Environment Variables:
 *   GITHUB_PAT    — Personal Access Token
 *   GITHUB_REPO   — e.g. "username/repo"
 *   GITHUB_BRANCH — e.g. "main" (default)
 *
 * ⚠️ Never commit your PAT to version control!
 *    Use environment variables or .env file.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PAT = process.env.GITHUB_PAT;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';

if (!PAT || !REPO) {
    console.error('❌ Missing GITHUB_PAT or GITHUB_REPO environment variables.');
    console.error('Usage: GITHUB_PAT=ghp_xxx GITHUB_REPO=user/repo node scripts/publish.js');
    process.exit(1);
}

const FILES_TO_PUBLISH = [
    'index.html',
    'css/styles.css',
    'js/app.js',
    'images/placeholder.svg'
];

/**
 * Create or update a file on GitHub via API
 */
async function publishFile(filePath) {
    const content = fs.readFileSync(path.resolve(__dirname, '..', filePath));
    const base64Content = content.toString('base64');

    // First, get current file SHA (if exists)
    let sha = null;
    try {
        const existing = await apiRequest('GET', `/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`);
        sha = existing.sha;
    } catch (e) {
        // File doesn't exist yet, that's OK
    }

    const body = {
        message: `Update ${filePath} via auto-publish`,
        content: base64Content,
        branch: BRANCH
    };

    if (sha) body.sha = sha;

    const result = await apiRequest('PUT', `/repos/${REPO}/contents/${filePath}`, body);
    console.log(`✅ Published: ${filePath}`);
    return result;
}

function apiRequest(method, endpoint, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: endpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${PAT}`,
                'User-Agent': 'Portfolio-Publisher/1.0',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', reject);

        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

// Main
(async () => {
    console.log(`📤 Publishing to ${REPO} (${BRANCH})...\n`);

    for (const file of FILES_TO_PUBLISH) {
        try {
            await publishFile(file);
        } catch (e) {
            console.error(`❌ Failed: ${file} — ${e.message}`);
        }
    }

    console.log('\n🎉 Done!');
})();