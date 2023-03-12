// This is a JavaScript code that implements various functionalities for a web page, such as registering a service worker, registering custom elements, changing the theme of the page, and implementing secret themes.
// Service Worker Registration:
// The code first registers a service worker with the path "/sw.js". A Service Worker is a script that acts as a client-side proxy for network requests and can be used for offline support and push notifications.


async function isBlocked(url) {
  try {
    var README = await fetch(url + '/README.md');
    var content = await README.text();
    if (content.startsWith('# 3kh0 Assets')) {
      return false;
    } else {
      return true;
    }
  } catch {
    return true;
  }
}

async function getCDN(cdns) {
  for (let cdn in cdns) {
    var blocked = await isBlocked(cdns[cdn]);
    if (!blocked) {
      return cdns[cdn];
    }
  }

  return cdns[0];
}

const path = location.pathname;
const origin = localStorage.getItem('instance');
const cdn = localStorage.getItem('cdn');
const queryString = window.location.search;
window.history.pushState({}, '', path);
const urlParams = new URLSearchParams(queryString);
const onLoadData = urlParams.get('onload');

const base = document.createElement('base');
base.href = location.origin + path.replace(path.split('\\').pop().split('/').pop(), '');
document.head.appendChild(base);

if (!origin) {
  localStorage.setItem('instance', base.href);
  location.reload();
}

if (!cdn) {
  fetch('./assets/json/cdns.json')
    .then(res => res.json())
    .then(async cdns => {
      localStorage.setItem('cdn', await getCDN(cdns));
      location.reload();
    });
}

const instance = encodeURIComponent(origin.replace(location.origin, ''));

window.onload = () => {
  if (onLoadData) {
    eval(onLoadData);
  }
}

/*navigator.serviceWorker.getRegistrations()
  .then((registrations) => {
    if (!registrations[0]) {
      try {
        //if (origin) {
        navigator.serviceWorker.register(`${location.origin}/sw.js`);
        } else {
          throw 'No origin was provided';
        }
      } catch (e) {
        alert(`Service Worker registration failed. Many site features will not work.`);
        console.warn("Since the registration of the serivce worker failed, many things will also break.");
        throw new Error(`Service Worker registration failed: ${e}`);
      }
    } else {
      console.log('sw.js is registered');
    }
  });*/

window.onerror = (e) => {
  throw new Error(e);
}

const jsdelivr = document.createElement("script");
jsdelivr.setAttribute("src", "");
document.head.append(jsdelivr);

var tab = localStorage.getItem("tab");
if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

if (tabData.title) {
  document.title = tabData.title;
}

if (tabData.icon) {
  document.querySelector("link[rel='icon']").href = tabData.icon;
}

function getContrastHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#1c1c1c' : 'white';
}

function getColorHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'white' : 'black';
}

var theme = localStorage.getItem("theme") || "default";
let themes;

fetch(origin + 'assets/json/themes.json')
  .then(res => res.json())
  .then(data_themes => {
    themes = data_themes;

    if (theme !== 'custom') {
      document.body.setAttribute("theme", theme);

      if (location.pathname.includes('/settings')) {
        themes.forEach(palette => {
          if (palette.theme == theme) {
            console.log(palette.theme);
            document.querySelector('#theme_color').value = palette.color;
          }
        });
      }
    } else {
      const theme = localStorage.getItem('theme_color');

      document.body.setAttribute('theme', 'custom');
      document.body.style = `--theme: ${theme}; --background: ${getContrastHex(theme)}; --text: ${getColorHex(theme)}; --text-secondary: ${getColorHex(theme)};`;

      if (location.pathname.includes('/settings')) {
        document.querySelector('#theme_color').value = theme;
      }
    }
  }).catch(e => {
    console.error(e);
    throw new Error('Failed to load themes');
  })

class changelogAdded extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" added></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-added", changelogAdded);

class changelogRemoved extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" removed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-removed", changelogRemoved);

class changelogChanged extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" changed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-changed", changelogChanged);

function foundSecretTheme(name) {
  document.body.setAttribute("theme", name);
  localStorage.setItem("theme", name);
  localStorage.setItem(name, "true");
  if (document.querySelector("." + name)) {
    document.querySelector("." + name).removeAttribute("hidden");
  }
}

function secretThemeButton(name) {
  if (localStorage.getItem(name) == "true") {
    if (document.querySelector("." + name)) {
      document.querySelector("." + name).removeAttribute("hidden");
    }
  }
}

function createSecretThemeType(name, pattern) {
  window[name + "pattern"] = pattern;
  window[name + "current"] = 0;

  var themePattern = window[name + "pattern"]
  var themeCurrent = window[name + "current"]

  document.addEventListener("keydown", function (e) {
    if (e.key !== themePattern[themeCurrent]) {
      return (themeCurrent = 0);
    }

    themeCurrent++;

    if (themePattern.length == themeCurrent) {
      themeCurrent = 0;
      foundSecretTheme(name);
    }
  });

  secretThemeButton(name)
}

createSecretThemeType("nebelung", ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"])
createSecretThemeType("piplup", ["p", "i", "p", "l", "u", "p", "i", "s", "c", "o", "o", "l"])
createSecretThemeType("forternish", ["c", "o", "m", "i", "c", "s", "a", "n", "s"])
createSecretThemeType("russell2259", ["l", "o", "l"]);

secretThemeButton("hacker")

window.nebelung_the_hacker = function () {
  foundSecretTheme("hacker")
}
