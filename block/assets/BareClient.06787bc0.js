const H = globalThis.fetch
  , j = globalThis.WebSocket
  , U = globalThis.Request
  , C = globalThis.Response
  , O = [101, 204, 205, 304]
  , V = [301, 302, 303, 307, 308];
class E extends Error {
    status;
    body;
    constructor(n, e) {
        super(e.message || e.code),
        this.status = n,
        this.body = e
    }
}
class I {
    base;
    constructor(n, e) {
        this.base = new URL(`./v${n}/`,e)
    }
}
const N = "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~"
  , $ = "%";
function _(a) {
    for (let n = 0; n < a.length; n++) {
        const e = a[n];
        if (!N.includes(e))
            return !1
    }
    return !0
}
function q(a) {
    let n = "";
    for (let e = 0; e < a.length; e++) {
        const t = a[e];
        if (N.includes(t) && t !== $)
            n += t;
        else {
            const s = t.charCodeAt(0);
            n += $ + s.toString(16).padStart(2, "0")
        }
    }
    return n
}
class F extends I {
    ws;
    http;
    newMeta;
    getMeta;
    constructor(n) {
        super(1, n),
        this.ws = new URL(this.base),
        this.http = new URL(this.base),
        this.newMeta = new URL("ws-new-meta",this.base),
        this.getMeta = new URL("ws-meta",this.base),
        this.ws.protocol === "https:" ? this.ws.protocol = "wss:" : this.ws.protocol = "ws:"
    }
    async connect(n, e, t, s, r) {
        const o = await H(this.newMeta, {
            method: "GET"
        });
        if (!o.ok)
            throw new E(o.status,await o.json());
        const c = await o.text()
          , h = new j(this.ws,["bare", q(JSON.stringify({
            remote: {
                protocol: e,
                host: t,
                port: s,
                path: r
            },
            headers: n,
            forward_headers: ["accept-encoding", "accept-language", "sec-websocket-extensions", "sec-websocket-key", "sec-websocket-version"],
            id: c
        }))]);
        return h.meta = new Promise((i,d)=>{
            h.addEventListener("open", async()=>{
                const g = await H(this.getMeta, {
                    headers: {
                        "x-bare-id": c
                    },
                    method: "GET"
                });
                g.ok || d(new E(g.status,await g.json())),
                i(await g.json())
            }
            ),
            h.addEventListener("error", d)
        }
        ),
        h
    }
    async request(n, e, t, s, r, o, c, h, i) {
        if (s.startsWith("blob:")) {
            const b = await H(`${s}${r}${c}`)
              , S = new C(b.body,b);
            return S.rawHeaders = Object.fromEntries(b.headers),
            S.rawResponse = b,
            S
        }
        const d = {};
        if (e instanceof Headers)
            for (const [b,S] of e)
                d[b] = S;
        else
            for (const b in e)
                d[b] = e[b];
        const g = ["accept-encoding", "accept-language"]
          , M = {
            credentials: "omit",
            method: n,
            signal: i
        };
        t !== void 0 && (M.body = t);
        const L = new U(this.http,M);
        this.writeBareRequest(L, s, r, c, o, d, g);
        const m = await H(L)
          , R = await this.readBareResponse(m)
          , p = new C(O.includes(R.status) ? void 0 : m.body,{
            status: R.status,
            statusText: R.statusText ?? void 0,
            headers: R.headers
        });
        return p.rawHeaders = R.rawHeaders,
        p.rawResponse = m,
        p
    }
    async readBareResponse(n) {
        if (!n.ok)
            throw new E(n.status,await n.json());
        const e = ["x-bare-status", "x-bare-status-text", "x-bare-headers"];
        for (const c of e)
            if (!n.headers.has(c))
                throw new E(500,{
                    code: "IMPL_MISSING_BARE_HEADER",
                    id: `response.headers.${c}`
                });
        const t = parseInt(n.headers.get("x-bare-status"))
          , s = n.headers.get("x-bare-status-text")
          , r = JSON.parse(n.headers.get("x-bare-headers"))
          , o = new Headers(r);
        return {
            status: t,
            statusText: s,
            rawHeaders: r,
            headers: o
        }
    }
    writeBareRequest(n, e, t, s, r, o, c) {
        n.headers.set("x-bare-protocol", e),
        n.headers.set("x-bare-host", t),
        n.headers.set("x-bare-path", s),
        n.headers.set("x-bare-port", r.toString()),
        n.headers.set("x-bare-headers", JSON.stringify(o)),
        n.headers.set("x-bare-forward-headers", JSON.stringify(c))
    }
}
function y(a, n) {
    const e = (a & 65535) + (n & 65535);
    return (a >> 16) + (n >> 16) + (e >> 16) << 16 | e & 65535
}
function x(a, n) {
    return a << n | a >>> 32 - n
}
function k(a, n, e, t, s, r) {
    return y(x(y(y(n, a), y(t, r)), s), e)
}
function f(a, n, e, t, s, r, o) {
    return k(n & e | ~n & t, a, n, s, r, o)
}
function u(a, n, e, t, s, r, o) {
    return k(n & t | e & ~t, a, n, s, r, o)
}
function w(a, n, e, t, s, r, o) {
    return k(n ^ e ^ t, a, n, s, r, o)
}
function l(a, n, e, t, s, r, o) {
    return k(e ^ (n | ~t), a, n, s, r, o)
}
function v(a, n) {
    a[n >> 5] |= 128 << n % 32,
    a[(n + 64 >>> 9 << 4) + 14] = n;
    let e = 1732584193
      , t = -271733879
      , s = -1732584194
      , r = 271733878;
    for (let o = 0; o < a.length; o += 16) {
        const c = e
          , h = t
          , i = s
          , d = r;
        e = f(e, t, s, r, a[o], 7, -680876936),
        r = f(r, e, t, s, a[o + 1], 12, -389564586),
        s = f(s, r, e, t, a[o + 2], 17, 606105819),
        t = f(t, s, r, e, a[o + 3], 22, -1044525330),
        e = f(e, t, s, r, a[o + 4], 7, -176418897),
        r = f(r, e, t, s, a[o + 5], 12, 1200080426),
        s = f(s, r, e, t, a[o + 6], 17, -1473231341),
        t = f(t, s, r, e, a[o + 7], 22, -45705983),
        e = f(e, t, s, r, a[o + 8], 7, 1770035416),
        r = f(r, e, t, s, a[o + 9], 12, -1958414417),
        s = f(s, r, e, t, a[o + 10], 17, -42063),
        t = f(t, s, r, e, a[o + 11], 22, -1990404162),
        e = f(e, t, s, r, a[o + 12], 7, 1804603682),
        r = f(r, e, t, s, a[o + 13], 12, -40341101),
        s = f(s, r, e, t, a[o + 14], 17, -1502002290),
        t = f(t, s, r, e, a[o + 15], 22, 1236535329),
        e = u(e, t, s, r, a[o + 1], 5, -165796510),
        r = u(r, e, t, s, a[o + 6], 9, -1069501632),
        s = u(s, r, e, t, a[o + 11], 14, 643717713),
        t = u(t, s, r, e, a[o], 20, -373897302),
        e = u(e, t, s, r, a[o + 5], 5, -701558691),
        r = u(r, e, t, s, a[o + 10], 9, 38016083),
        s = u(s, r, e, t, a[o + 15], 14, -660478335),
        t = u(t, s, r, e, a[o + 4], 20, -405537848),
        e = u(e, t, s, r, a[o + 9], 5, 568446438),
        r = u(r, e, t, s, a[o + 14], 9, -1019803690),
        s = u(s, r, e, t, a[o + 3], 14, -187363961),
        t = u(t, s, r, e, a[o + 8], 20, 1163531501),
        e = u(e, t, s, r, a[o + 13], 5, -1444681467),
        r = u(r, e, t, s, a[o + 2], 9, -51403784),
        s = u(s, r, e, t, a[o + 7], 14, 1735328473),
        t = u(t, s, r, e, a[o + 12], 20, -1926607734),
        e = w(e, t, s, r, a[o + 5], 4, -378558),
        r = w(r, e, t, s, a[o + 8], 11, -2022574463),
        s = w(s, r, e, t, a[o + 11], 16, 1839030562),
        t = w(t, s, r, e, a[o + 14], 23, -35309556),
        e = w(e, t, s, r, a[o + 1], 4, -1530992060),
        r = w(r, e, t, s, a[o + 4], 11, 1272893353),
        s = w(s, r, e, t, a[o + 7], 16, -155497632),
        t = w(t, s, r, e, a[o + 10], 23, -1094730640),
        e = w(e, t, s, r, a[o + 13], 4, 681279174),
        r = w(r, e, t, s, a[o], 11, -358537222),
        s = w(s, r, e, t, a[o + 3], 16, -722521979),
        t = w(t, s, r, e, a[o + 6], 23, 76029189),
        e = w(e, t, s, r, a[o + 9], 4, -640364487),
        r = w(r, e, t, s, a[o + 12], 11, -421815835),
        s = w(s, r, e, t, a[o + 15], 16, 530742520),
        t = w(t, s, r, e, a[o + 2], 23, -995338651),
        e = l(e, t, s, r, a[o], 6, -198630844),
        r = l(r, e, t, s, a[o + 7], 10, 1126891415),
        s = l(s, r, e, t, a[o + 14], 15, -1416354905),
        t = l(t, s, r, e, a[o + 5], 21, -57434055),
        e = l(e, t, s, r, a[o + 12], 6, 1700485571),
        r = l(r, e, t, s, a[o + 3], 10, -1894986606),
        s = l(s, r, e, t, a[o + 10], 15, -1051523),
        t = l(t, s, r, e, a[o + 1], 21, -2054922799),
        e = l(e, t, s, r, a[o + 8], 6, 1873313359),
        r = l(r, e, t, s, a[o + 15], 10, -30611744),
        s = l(s, r, e, t, a[o + 6], 15, -1560198380),
        t = l(t, s, r, e, a[o + 13], 21, 1309151649),
        e = l(e, t, s, r, a[o + 4], 6, -145523070),
        r = l(r, e, t, s, a[o + 11], 10, -1120210379),
        s = l(s, r, e, t, a[o + 2], 15, 718787259),
        t = l(t, s, r, e, a[o + 9], 21, -343485551),
        e = y(e, c),
        t = y(t, h),
        s = y(s, i),
        r = y(r, d)
    }
    return [e, t, s, r]
}
function W(a) {
    let n = "";
    const e = a.length * 32;
    for (let t = 0; t < e; t += 8)
        n += String.fromCharCode(a[t >> 5] >>> t % 32 & 255);
    return n
}
function D(a) {
    const n = []
      , e = a.length >> 2;
    for (let s = 0; s < e; s += 1)
        n[s] = 0;
    const t = a.length * 8;
    for (let s = 0; s < t; s += 8)
        n[s >> 5] |= (a.charCodeAt(s / 8) & 255) << s % 32;
    return n
}
function X(a) {
    return W(v(D(a), a.length * 8))
}
function z(a, n) {
    let e = D(a);
    const t = []
      , s = [];
    e.length > 16 && (e = v(e, a.length * 8));
    for (let o = 0; o < 16; o += 1)
        t[o] = e[o] ^ 909522486,
        s[o] = e[o] ^ 1549556828;
    const r = v(t.concat(D(n)), 512 + n.length * 8);
    return W(v(s.concat(r), 512 + 128))
}
function P(a) {
    const n = "0123456789abcdef";
    let e = "";
    for (let t = 0; t < a.length; t += 1) {
        const s = a.charCodeAt(t);
        e += n.charAt(s >>> 4 & 15) + n.charAt(s & 15)
    }
    return e
}
function T(a) {
    return unescape(encodeURIComponent(a))
}
function J(a) {
    return X(T(a))
}
function K(a) {
    return P(J(a))
}
function G(a, n) {
    return z(T(a), T(n))
}
function Q(a, n) {
    return P(G(a, n))
}
function Y(a, n, e) {
    return n ? e ? G(n, a) : Q(n, a) : e ? J(a) : K(a)
}
const A = 3072;
function Z(a) {
    const n = new Headers(a);
    if (a.has("x-bare-headers")) {
        const e = a.get("x-bare-headers");
        if (e.length > A) {
            n.delete("x-bare-headers");
            let t = 0;
            for (let s = 0; s < e.length; s += A) {
                const r = e.slice(s, s + A)
                  , o = t++;
                n.set(`x-bare-headers-${o}`, `;${r}`)
            }
        }
    }
    return n
}
function ee(a) {
    const n = new Headers(a)
      , e = "x-bare-headers";
    if (a.has(`${e}-0`)) {
        const t = [];
        for (const [s,r] of a) {
            if (!s.startsWith(e))
                continue;
            if (!r.startsWith(";"))
                throw new E(400,{
                    code: "INVALID_BARE_HEADER",
                    id: `request.headers.${s}`,
                    message: "Value didn't begin with semi-colon."
                });
            const o = parseInt(s.slice(e.length + 1));
            t[o] = r.slice(1),
            n.delete(s)
        }
        n.set(e, t.join(""))
    }
    return n
}
class te extends I {
    ws;
    http;
    newMeta;
    getMeta;
    constructor(n) {
        super(2, n),
        this.ws = new URL(this.base),
        this.http = new URL(this.base),
        this.newMeta = new URL("./ws-new-meta",this.base),
        this.getMeta = new URL("./ws-meta",this.base),
        this.ws.protocol === "https:" ? this.ws.protocol = "wss:" : this.ws.protocol = "ws:"
    }
    async connect(n, e, t, s, r) {
        const o = new U(this.newMeta,{
            headers: this.createBareHeaders(e, t, r, s, n)
        })
          , c = await H(o);
        if (!c.ok)
            throw new E(c.status,await c.json());
        const h = await c.text()
          , i = new j(this.ws,[h]);
        return i.meta = new Promise((d,g)=>{
            i.addEventListener("open", async()=>{
                const M = await H(this.getMeta, {
                    headers: {
                        "x-bare-id": h
                    },
                    method: "GET"
                });
                d(await this.readBareResponse(M))
            }
            ),
            i.addEventListener("error", g)
        }
        ),
        i
    }
    async request(n, e, t, s, r, o, c, h, i) {
        if (s.startsWith("blob:")) {
            const p = await H(`${s}${r}${c}`)
              , b = new C(p.body,p);
            return b.rawHeaders = Object.fromEntries(p.headers),
            b.rawResponse = p,
            b
        }
        const d = {};
        if (e instanceof Headers)
            for (const [p,b] of e)
                d[p] = b;
        else
            for (const p in e)
                d[p] = e[p];
        const g = {
            credentials: "omit",
            method: n,
            signal: i
        };
        h !== "only-if-cached" && (g.cache = h),
        t !== void 0 && (g.body = t),
        g.headers = this.createBareHeaders(s, r, c, o, d);
        const M = new U(this.http + "?cache=" + Y(`${s}${r}${o}${c}`),g)
          , L = await H(M)
          , m = await this.readBareResponse(L)
          , R = new C(O.includes(m.status) ? void 0 : L.body,{
            status: m.status,
            statusText: m.statusText ?? void 0,
            headers: m.headers
        });
        return R.rawHeaders = m.rawHeaders,
        R.rawResponse = L,
        R
    }
    async readBareResponse(n) {
        if (!n.ok)
            throw new E(n.status,await n.json());
        const e = ee(n.headers)
          , t = {};
        return e.has("x-bare-status") && (t.status = parseInt(e.get("x-bare-status"))),
        e.has("x-bare-status-text") && (t.statusText = e.get("x-bare-status-text")),
        e.has("x-bare-headers") && (t.rawHeaders = JSON.parse(e.get("x-bare-headers")),
        t.headers = new Headers(t.rawHeaders)),
        t
    }
    createBareHeaders(n, e, t, s, r, o=[], c=[], h=[]) {
        const i = new Headers;
        i.set("x-bare-protocol", n),
        i.set("x-bare-host", e),
        i.set("x-bare-path", t),
        i.set("x-bare-port", s.toString()),
        i.set("x-bare-headers", JSON.stringify(r));
        for (const d of o)
            i.append("x-bare-forward-headers", d);
        for (const d of c)
            i.append("x-bare-pass-headers", d);
        for (const d of h)
            i.append("x-bare-pass-status", d.toString());
        return Z(i),
        i
    }
}
const se = [["v2", te], ["v1", F]]
  , ne = 20;
async function ae(a, n) {
    const e = await H(a, {
        signal: n
    });
    if (!e.ok)
        throw new Error(`Unable to fetch Bare meta: ${e.status} ${await e.text()}`);
    return await e.json()
}
function B(a) {
    if (a.port)
        return Number(a.port);
    switch (a.protocol) {
    case "ws:":
    case "http:":
        return 80;
    case "wss:":
    case "https:":
        return 443;
    default:
        return 0
    }
}
class re {
    get data() {
        return this.manfiest
    }
    manfiest;
    client;
    server;
    working;
    onDemand;
    onDemandSignal;
    constructor(n, e) {
        this.server = new URL(n),
        !e || e instanceof AbortSignal ? (this.onDemand = !0,
        this.onDemandSignal = e) : (this.onDemand = !1,
        this.manfiest = e,
        this.getClient())
    }
    demand() {
        if (!!this.onDemand)
            return this.working || (this.working = ae(this.server, this.onDemandSignal).then(n=>{
                this.manfiest = n,
                this.getClient()
            }
            ).catch(n=>{
                throw delete this.working,
                n
            }
            )),
            this.working
    }
    getClient() {
        for (const [n,e] of se)
            if (this.data.versions.includes(n)) {
                this.client = new e(this.server);
                return
            }
        throw new Error("Unable to find compatible client version.")
    }
    async request(n, e, t, s, r, o, c, h, i) {
        return await this.demand(),
        await this.client.request(n, e, t, s, r, o, c, h, i)
    }
    async connect(n, e, t, s, r) {
        return await this.demand(),
        this.client.connect(n, e, t, s, r)
    }
    createWebSocket(n, e={}, t=[]) {
        const s = e instanceof Headers ? Object.fromEntries(e) : e;
        n = new URL(n),
        s.Host = n.host,
        s.Pragma = "no-cache",
        s["Cache-Control"] = "no-cache",
        s.Upgrade = "websocket",
        s.Connection = "Upgrade",
        typeof t == "string" && (t = [t]);
        for (const r of t)
            if (!_(r))
                throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${r}' is invalid.`);
        return t.length && (s["Sec-Websocket-Protocol"] = t.join(", ")),
        this.connect(s, n.protocol, n.hostname, B(n), n.pathname + n.search)
    }
    async fetch(n, e={}) {
        n instanceof U ? e ? n = new URL(n.url) : (e = n,
        n = new URL(n.url)) : n = new URL(n);
        let t;
        typeof e.method == "string" ? t = e.method : t = "GET";
        let s;
        e.body !== void 0 && e.body !== null && (s = e.body);
        let r;
        typeof e.headers == "object" && e.headers !== null ? e.headers instanceof Headers ? r = Object.fromEntries(e.headers) : r = e.headers : r = {};
        let o;
        typeof e.cache == "string" ? o = e.cache : o = "default";
        let c;
        e.signal instanceof AbortSignal && (c = e.signal);
        for (let h = 0; ; h++) {
            "host"in r ? r.host = n.host : r.Host = n.host;
            const i = await this.request(t, r, s, n.protocol, n.hostname, B(n), n.pathname + n.search, o, c);
            if (i.finalURL = n.toString(),
            V.includes(i.status))
                switch (e.redirect) {
                default:
                case "follow":
                    if (ne > h && i.headers.has("location")) {
                        n = new URL(i.headers.get("location"),n);
                        continue
                    } else
                        throw new TypeError("Failed to fetch");
                case "error":
                    throw new TypeError("Failed to fetch");
                case "manual":
                    return i
                }
            else
                return i
        }
    }
}
export {re as B};