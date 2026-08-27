/**
 * AI Description Generator Module
 *
 * In production: connects to OpenAI API
 * In demo: uses template-based generation
 *
 * API Example (for production):
 * ─────────────────────────────
 * const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${API_KEY}`
 *   },
 *   body: JSON.stringify({
 *     model: 'gpt-4',
 *     messages: [{
 *       role: 'system',
 *       content: 'You are a professional technical writer for network infrastructure projects.'
 *     }, {
 *       role: 'user',
 *       content: `Write a professional project description for: "${title}". Categories: ${categories.join(', ')}. Include: scope, methodology, equipment used, results. Write in Persian (Farsi). 150-200 words.`
 *     }],
 *     temperature: 0.7,
 *     max_tokens: 500
 *   })
 * });
 */

window.AIGenerator = (function () {
    'use strict';

    const templates = {
        cabling: [
            'این پروژه شامل طراحی و اجرای کامل زیرساخت کابل‌کشی ساختاریافته بر اساس استانداردهای TIA/EIA-568 می‌باشد.',
            'کابل‌کشی افقی و عمودی با استفاده از کابل‌های Cat6A/Cat6 انجام شده و تمامی لینک‌ها تست و تأیید گردیده‌اند.',
            'نصب پچ‌پنل‌ها، فیس‌پلیت‌ها و مدیریت کابل در رک با رعایت استانداردهای بین‌المللی انجام شده است.'
        ],
        cctv: [
            'سیستم نظارت تصویری شامل دوربین‌های IP با کیفیت بالا، NVR مرکزی و نرم‌افزار مدیریت تصویر پیاده‌سازی شده است.',
            'طراحی نقشه جانمایی دوربین‌ها بر اساس تحلیل ریسک و پوشش‌دهی کامل محیط انجام شده است.',
            'امکان دسترسی ریموت از طریق اپلیکیشن موبایل و وب برای مانیتورینگ ۲۴/۷ فراهم شده است.'
        ],
        rack: [
            'طراحی و ساخت رک‌روم استاندارد شامل نصب رک‌ها، پچ‌پنل‌ها، سوئیچ‌های مدیریتی و سیستم UPS.',
            'سیستم خنک‌کننده و مانیتورینگ محیطی (دما، رطوبت) برای حفاظت از تجهیزات نصب شده است.',
            'مدیریت کابل و برچسب‌گذاری استاندارد برای نگهداری آسان انجام شده است.'
        ],
        fiber: [
            'پیاده‌سازی شبکه فیبر نوری شامل فیوژن‌اسپلایسینگ، نصب ODF و تست OTDR.',
            'استفاده از فیبر Single-mode/Multi-mode بسته به نیاز پروژه و فاصله.',
            'تمامی اتصالات تست شده و مستندات فنی کامل ارائه گردیده است.'
        ],
        security: [
            'پیاده‌سازی سیستم‌های امنیتی شامل کنترل دسترسی، دزدگیر و سیستم اعلام حریق.',
            'یکپارچه‌سازی سیستم‌های امنیتی با نرم‌افزار مدیریت مرکزی برای نظارت یکپارچه.',
            'آموزش پرسنل و ارائه مستندات فنی و دفترچه راهنمای بهره‌برداری.'
        ]
    };

    const intros = [
        'پروژه {title} با هدف ارتقای زیرساخت فناوری اطلاعات مشتری طراحی و اجرا شد.',
        'این پروژه با عنوان {title} شامل مراحل طراحی، تأمین تجهیزات و اجرای عملیاتی می‌باشد.',
        'پروژه {title} یکی از پروژه‌های موفق در حوزه زیرساخت شبکه و امنیت بوده است.'
    ];

    const conclusions = [
        'پروژه در موعد مقرر و با رضایت کامل مشتری تحویل داده شد.',
        'نتیجه نهایی شامل عملکرد پایدار، مستندسازی کامل و ارائه گارانتی پشتیبانی می‌باشد.',
        'این پروژه با کیفیت بالا و مطابق با استانداردهای بین‌المللی به اتمام رسید.'
    ];

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Generate a project description
     * @param {string} title - Project title
     * @param {string[]} categories - Project categories
     * @returns {string} Generated description
     */
    function generate(title, categories) {
        if (!title) title = 'پروژه';
        if (!categories || !categories.length) categories = ['cabling'];

        let desc = pickRandom(intros).replace('{title}', title) + '\n\n';

        categories.forEach(cat => {
            const catTemplates = templates[cat] || templates.cabling;
            desc += pickRandom(catTemplates) + ' ';
        });

        desc += '\n\n' + pickRandom(conclusions);

        return desc;
    }

    /**
     * Generate OpenAI-compatible prompt
     * @param {string} title
     * @param {string[]} categories
     * @returns {object} API request body
     */
    function getAPIPrompt(title, categories) {
        return {
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional technical writer specializing in network infrastructure, CCTV systems, and IT security projects. Write detailed, professional project descriptions in Persian (Farsi).'
                },
                {
                    role: 'user',
                    content: `Write a professional project description for: "${title}".
Categories: ${categories.join(', ')}.

Include the following in your description:
1. Project scope and objectives
2. Methodology and approach
3. Equipment and technologies used
4. Key challenges and solutions
5. Results and outcomes

Requirements:
- Write in Persian (Farsi)
- Professional and technical tone
- 150-200 words
- Use proper technical terminology`
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        };
    }

    return { generate, getAPIPrompt };

})();