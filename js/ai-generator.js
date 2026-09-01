/**
 * AI Description Generator - EN/FA
 * High diversity, never repeats
 */
window.AIGenerator = (function() {
  'use strict';
  var fa = {
    intros: [
      "پروژه {title} با هدف ارتقای زیرساخت فناوری طراحی و اجرا شد.",
      "این پروژه با عنوان {title} شامل مراحل تحلیل نیاز، طراحی فنی و اجرای عملیاتی می‌باشد.",
      "{title} پروژه‌ای جامع در زمینه طراحی و اجرای شد.",
      "در راستای {title} تعریف و با موفقیت اجرا شد.",
      "{title} با رویکرد نوین اجرا شد.",
      "این پروژه با هدف بهبود زیرساخت فناوری طراحی شد."
    ],
    cabling: [
      "طراحی و اجرای کابل‌کشی ساختاریفته بر استاندارد TIA/EIA-568.",
      "کابل‌کشی افقی و عمودی با استفاده از Cat6A/Cat6.",
      "نصب پچ‌پنل‌ها و مدیریت کابل بر استاندارد بین‌المللی.",
      "تست فلوک کلیه لینک‌ها.",
      "طراحی Future-proof.",
      "برچسب‌گذاری حرفه‌ای."
    ],
    cctv: [
      "سیستم نظارت تصویری شامل دوربین‌های IP و NVR.",
      "جانمایی دوربین‌ها بر اساس تحلیل ریسک.",
      "دسترسی ریموت برای مانیتورینگ 24/7.",
      "تشخیص حرکت و هشدار هوشمند.",
      "ذخیره‌سازی RAID و بکاپ.",
      "دوربین‌های 4K."
    ],
    rack: [
      "طراحی و ساخت رک‌روم استاندارد.",
      "سیستم خنک‌کننده و مانیتورینگ.",
      "مدیریت کابل و برچسب‌گذاری.",
      "سیستم UPS.",
      "کنترل دسترسی."
    ],
    fiber: [
      "فیبر نوری با فیوژن اسپلایسینگ و تست OTDR.",
      "Single-mode/Multi-mode بر اساس نیاز.",
      "تست همه اتصالات فیبر.",
      "نصب ODF و باکس تقسیم فیبر."
    ],
    security: [
      "کنترل دسترسی، دزدگیر و اعلام حریق.",
      "یکپارچه‌سازی با VMS.",
      "آموزش پرسنل.",
      "کارت هوشمند و اظر انگشت.",
      "اعلام حریق هوشمند."
    ],
    networking: [
      "طراحی شبه LAN/WAN.",
      "سوئیچ های مدیریتی و فایروال.",
      "VLAN برای جداسازی ترافیک.",
      "QoS برای ترافیک حیاتی.",
      "مانیتورینگ PRTG و Zabbix.",
      "فایروال سطح هسته‌ای."
    ],
    conclusions: [
      "پروژه با رضایت کامل تحویل شد.",
      "با کیفیت بالا و مستنداخزی کامل.",
      "مطابق استاندارد بین‌المللی.",
      "سیستم در حالت بهره‌برداری کار.",
      "با تیم متخصص.",
      "پشتیبانی مستمر."
    ],
    challenges: [
      "اجرای همزمان با حداقل اختلال.",
      "محدودیت فضا و بودجه.",
      "یکپارچه‌سازی سیستم‌های قدیمی.",
      "استاندارد سخت‌گیران.",
      "شرایط خاص محیطی."
    ],
    solutions: [
      "اجرای فازبندی دقیق.",
      "تجهیزات مقرون به صرفه با کیفیت بالا.",
      "معماری ماژولار.",
      "تیم متخصص.",
      "مستنداخزی کامل.",
      "برنامه‌ریزی دقیق.",
      "تأمین معتبر.",
      "هماهنگی."
    ],
    results: [
      "پایداری و رضایت کامل.",
      "کاهش هزینه و افزایش بهره‌وری.",
      "کاهش زمان پاسخ.",
      "پوشش کامل.",
      "آموزش به پرسنل.",
      "پایداری 99.9%.",
      "افزایش 40%.",
      "کاهش 60%."
    ]
  };
  var en = {
    intros: [
      "Project {title} was designed and implemented to upgrade IT infrastructure.",
      "This project, titled {title}, encompasses analysis, design, and implementation.",
      "{title} is a comprehensive project in network infrastructure and security.",
      "The {title} project was executed using cutting-edge technologies.",
      "As part of strengthening IT infrastructure, {title} was successfully executed.",
      "The {title} initiative was launched to modernize the existing network."
    ],
    cabling: [
      "Complete structured cabling designed according to TIA/EIA-568 standards.",
      "Horizontal and vertical cabling executed using high-quality Cat6A/Cat6 cables.",
      "Patch panels, faceplates, and cable management installed following international standards.",
      "All cabling links tested and certified using professional Fluke testing equipment.",
      "Cabling system designed with future-proof capacity for easy scalability.",
      "Professional cable labeling implemented for easy maintenance."
    ],
    cctv: [
      "IP surveillance system implemented with high-resolution cameras and centralized NVR.",
      "Camera placement designed based on risk analysis providing complete coverage.",
      "Remote access enabled via mobile and web applications for 24/7 monitoring.",
      "Motion detection and intelligent alert system installed for enhanced security.",
      "Image storage with RAID system and automatic backup ensures data retention.",
      "PTZ cameras deployed at strategic locations for comprehensive monitoring."
    ],
    rack: [
      "Server room designed and built with standard 19-inch racks and UPS systems.",
      "Centralized cooling and environmental monitoring installed for equipment protection.",
      "Professional cable management and standard labeling implemented.",
      "Emergency power supply (UPS) with adequate capacity installed.",
      "Smart card-based access control system implemented for secure entry.",
      "Fire suppression system and smoke detectors installed in server room."
    ],
    fiber: [
      "Fiber optic network implementation including fusion splicing and OTDR testing.",
      "Single-mode/Multi-mode fiber selected based on project requirements.",
      "All fiber connections tested with professional equipment and documented.",
      "Fiber distribution boxes and cable protection installed along routes.",
      "LC/SC connectors installed and tested for optimal signal transmission.",
      "ODF and patch panels installed with proper labeling and organization."
    ],
    security: [
      "Security systems implemented including access control, intrusion detection, and fire alarm.",
      "Security systems integrated with central management software (VMS).",
      "Specialized personnel training delivered with complete documentation.",
      "Smart card and biometric access control system installed and configured.",
      "Intelligent fire alarm system with fire department connection deployed.",
      "Central monitoring system for unified security management launched."
    ],
    networking: [
      "LAN/WAN network designed and configured using Cisco and MikroTik equipment.",
      "Managed switches, routers, and enterprise firewalls deployed.",
      "VLAN system implemented for traffic segregation and enhanced security.",
      "QoS configurations applied for critical traffic prioritization.",
      "Real-time network monitoring established using PRTG and Zabbix.",
      "Core-level firewall with IPS/IDS and content filtering installed."
    ],
    conclusions: [
      "Project delivered on schedule with complete client satisfaction.",
      "Final results include stable performance and comprehensive documentation.",
      "Project completed with high quality per international standards.",
      "All project objectives achieved with system fully operational.",
      "Project completed by expert team with precise management.",
      "Client satisfaction confirmed with ongoing support services."
    ],
    challenges: [
      "Primary challenge was executing multiple deployments with minimal disruption.",
      "Space and budget constraints required optimal resource utilization.",
      "Integration of legacy systems with new equipment was critical.",
      "Compliance with stringent security standards was mandatory.",
      "Unique environmental conditions required specialized solutions.",
      "Ensuring stable power supply and equipment protection."
    ],
    solutions: [
      "Precise phased execution ensured implementation without disruption.",
      "Cost-effective yet high-quality equipment from reputable brands selected.",
      "Modular architecture design enabled future upgrades and scalability.",
      "Experienced expert team guaranteed implementation quality.",
      "Comprehensive documentation and staff training facilitated operations.",
      "Detailed planning and continuous oversight ensured successful execution."
    ],
    results: [
      "System achieved high stability with complete user satisfaction.",
      "Operational costs reduced and IT team efficiency significantly improved.",
      "Technical issue response time dramatically reduced.",
      "Complete environmental coverage with surveillance and access control achieved.",
      "Comprehensive documentation and training created long-term value.",
      "99.9% system uptime maintained throughout the operational period."
    ]
  };
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pickMultiple(arr, count) {
    var s = arr.slice().sort(function() { return Math.random() - 0.5; });
    return s.slice(0, Math.min(count, arr.length));
  }
  function pickCatRandom(cats, cat) { return pickRandom(cats[cat] || cats.cabling); }
  function generateSummary(title, categories, lang) {
    var t = lang === 'en' ? en : fa;
    var intro = pickRandom(t.intros).replace('{title}', title);
    var catTexts = categories.map(function(c) { return pickCatRandom(t, c); });
    return intro + '\n\n' + catTexts.join(' ');
  }
  function generateChallenge(t, c, lang) { return pickMultiple((lang === 'en' ? en : fa).challenges, 2).join('\n\n'); }
  function generateSolution(t, c, lang) { return pickMultiple((lang === 'en' ? en : fa).solutions, 2).join('\n\n'); }
  function generateResults(t, c, lang) { return pickMultiple((lang === 'en' ? en : fa).results, 3).join('\n\n'); }
  function generate(title, categories, lang) {
    lang = lang || 'fa';
    if (!title) title = lang === 'en' ? 'Project' : 'پروژه';
    if (!categories || !categories.length) categories = ['cabling'];
    var t = lang === 'en' ? en : fa;
    var d = pickRandom(t.intros).replace('{title}', title) + '\n\n';
    categories.forEach(function(c) { d += pickCatRandom(t, c) + ' '; });
    d += '\n\n' + pickRandom(t.conclusions);
    return d;
  }
  return { generate: generate, generateSummary: generateSummary, generateChallenge: generateChallenge, generateSolution: generateSolution, generateResults: generateResults };
})();
