#!/usr/bin/env node

/**
 * Social Media Content Generator
 *
 * Usage:
 *   node scripts/social-generator.js --platform linkedin --project "Project Title"
 *   node scripts/social-generator.js --platform instagram --project "Project Title"
 */

const args = process.argv.slice(2);
const platform = args.find((_, i) => args[i - 1] === '--platform') || 'linkedin';
const projectTitle = args.find((_, i) => args[i - 1] === '--project') || 'Sample Project';

function generateLinkedIn(title) {
    return `
🚀 Excited to share my latest project!

📌 ${title}

As a network infrastructure specialist, I recently completed this project focusing on delivering high-quality, reliable solutions for our client.

Key highlights:
✅ Professional design and implementation
✅ Industry-standard compliance
✅ Thorough testing and documentation
✅ On-time delivery

Looking forward to more challenging projects!

#Networking #Infrastructure #IT #CCTV #Security #FiberOptic #ProjectManagement
#شبکه #زیرساخت #پروژه #فناوری_اطلاعات
    `.trim();
}

function generateInstagram(title) {
    return `
✨ ${title}

Another successful project completed! 🎯

Swipe to see the details ➡️

📍 Location: [Add location]
🏢 Client: [Add client name]

What do you think? Let me know in the comments! 👇

.
.
.
#networking #infrastructure #cabling #cctv #security #fiberoptic
#rack #datacenter #IT #technology #project #portfolio
#شبکه #زیرساخت #امنیت #دوربین_مداربسته #فیبرنوری
#تکنولوژی #پروژه
    `.trim();
}

if (platform === 'linkedin') {
    console.log(generateLinkedIn(projectTitle));
} else if (platform === 'instagram') {
    console.log(generateInstagram(projectTitle));
} else {
    console.error('Unknown platform. Use: linkedin or instagram');
}