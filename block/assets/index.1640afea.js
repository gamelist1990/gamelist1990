(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        s(r);
    new MutationObserver(r=>{
        for (const o of r)
            if (o.type === "childList")
                for (const l of o.addedNodes)
                    l.tagName === "LINK" && l.rel === "modulepreload" && s(l)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(r) {
        const o = {};
        return r.integrity && (o.integrity = r.integrity),
        r.referrerpolicy && (o.referrerPolicy = r.referrerpolicy),
        r.crossorigin === "use-credentials" ? o.credentials = "include" : r.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function s(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const o = n(r);
        fetch(r.href, o)
    }
}
)();
const S = {};
function U(e) {
    S.context = e
}
const Et = (e,t)=>e === t
  , Ee = Symbol("solid-proxy")
  , At = Symbol("solid-track")
  , pe = {
    equals: Et
};
let W = null
  , Ye = ot;
const j = 1
  , z = 2
  , Ze = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
}
  , xe = {};
var m = null;
let f = null
  , v = null
  , R = null
  , $ = null
  , Te = 0;
const [lr,je] = k(!1);
function Z(e, t) {
    const n = v
      , s = m
      , r = e.length === 0
      , o = r ? Ze : {
        owned: null,
        cleanups: null,
        context: null,
        owner: t || s
    }
      , l = r ? e : ()=>e(()=>I(()=>ee(o)));
    m = o,
    v = null;
    try {
        return V(l, !0)
    } finally {
        v = n,
        m = s
    }
}
function k(e, t) {
    t = t ? Object.assign({}, pe, t) : pe;
    const n = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: t.equals || void 0
    }
      , s = r=>(typeof r == "function" && (f && f.running && f.sources.has(n) ? r = r(n.tValue) : r = r(n.value)),
    st(n, r));
    return [rt.bind(n), s]
}
function Ve(e, t, n) {
    const s = we(e, t, !0, j);
    se(s)
}
function H(e, t, n) {
    const s = we(e, t, !1, j);
    se(s)
}
function Le(e, t, n) {
    Ye = Nt;
    const s = we(e, t, !1, j)
      , r = X && de(m, X.id);
    r && (s.suspense = r),
    s.user = !0,
    $ ? $.push(s) : se(s)
}
function A(e, t, n) {
    n = n ? Object.assign({}, pe, n) : pe;
    const s = we(e, t, !0, 0);
    return s.observers = null,
    s.observerSlots = null,
    s.comparator = n.equals || void 0,
    se(s),
    rt.bind(s)
}
function Pt(e, t, n) {
    let s, r, o;
    arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (s = !0,
    r = e,
    o = t || {}) : (s = e,
    r = t,
    o = n || {});
    let l = null
      , i = xe
      , u = null
      , a = !1
      , c = !1
      , h = "initialValue"in o
      , g = typeof s == "function" && A(s);
    const w = new Set
      , [y,C] = (o.storage || k)(o.initialValue)
      , [O,L] = k(void 0)
      , [E,_] = k(void 0, {
        equals: !1
    })
      , [T,N] = k(h ? "ready" : "unresolved");
    if (S.context) {
        u = `${S.context.id}${S.context.count++}`;
        let d;
        o.ssrLoadFrom === "initial" ? i = o.initialValue : S.load && (d = S.load(u)) && (i = d[0])
    }
    function M(d, b, P, B) {
        return l === d && (l = null,
        h = !0,
        (d === i || b === i) && o.onHydrated && queueMicrotask(()=>o.onHydrated(B, {
            value: b
        })),
        i = xe,
        f && d && a ? (f.promises.delete(d),
        a = !1,
        V(()=>{
            f.running = !0,
            oe(b, P)
        }
        , !1)) : oe(b, P)),
        b
    }
    function oe(d, b) {
        V(()=>{
            b || C(()=>d),
            N(b ? "errored" : "ready"),
            L(b);
            for (const P of w.keys())
                P.decrement();
            w.clear()
        }
        , !1)
    }
    function ie() {
        const d = X && de(m, X.id)
          , b = y()
          , P = O();
        if (P && !l)
            throw P;
        return v && !v.user && d && Ve(()=>{
            E(),
            l && (d.resolved && f && a ? f.promises.add(l) : w.has(d) || (d.increment(),
            w.add(d)))
        }
        ),
        b
    }
    function x(d=!0) {
        if (d !== !1 && c)
            return;
        c = !1;
        const b = g ? g() : s;
        if (a = f && f.running,
        b == null || b === !1) {
            M(l, I(y));
            return
        }
        f && l && f.promises.delete(l);
        const P = i !== xe ? i : I(()=>r(b, {
            value: y(),
            refetching: d
        }));
        return typeof P != "object" || !(P && "then"in P) ? (M(l, P, void 0, b),
        P) : (l = P,
        c = !0,
        queueMicrotask(()=>c = !1),
        V(()=>{
            N(h ? "refreshing" : "pending"),
            _()
        }
        , !1),
        P.then(B=>M(P, B, void 0, b), B=>M(P, void 0, ct(B), b)))
    }
    return Object.defineProperties(ie, {
        state: {
            get: ()=>T()
        },
        error: {
            get: ()=>O()
        },
        loading: {
            get() {
                const d = T();
                return d === "pending" || d === "refreshing"
            }
        },
        latest: {
            get() {
                if (!h)
                    return ie();
                const d = O();
                if (d && !l)
                    throw d;
                return y()
            }
        }
    }),
    g ? Ve(()=>x(!1)) : x(!1),
    [ie, {
        refetch: x,
        mutate: C
    }]
}
function cr(e) {
    return V(e, !1)
}
function I(e) {
    const t = v;
    v = null;
    try {
        return e()
    } finally {
        v = t
    }
}
function et(e, t, n) {
    const s = Array.isArray(e);
    let r, o = n && n.defer;
    return l=>{
        let i;
        if (s) {
            i = Array(e.length);
            for (let a = 0; a < e.length; a++)
                i[a] = e[a]()
        } else
            i = e();
        if (o) {
            o = !1;
            return
        }
        const u = I(()=>t(i, r, l));
        return r = i,
        u
    }
}
function kt(e) {
    Le(()=>I(e))
}
function ne(e) {
    return m === null || (m.cleanups === null ? m.cleanups = [e] : m.cleanups.push(e)),
    e
}
function Be(e) {
    W || (W = Symbol("error")),
    m === null || (m.context === null ? m.context = {
        [W]: [e]
    } : m.context[W] ? m.context[W].push(e) : m.context[W] = [e])
}
function ar() {
    return v
}
function tt() {
    return m
}
function Ct(e, t) {
    const n = m;
    m = e;
    try {
        return V(t, !0)
    } catch (s) {
        _e(s)
    } finally {
        m = n
    }
}
function Ot(e) {
    if (f && f.running)
        return e(),
        f.done;
    const t = v
      , n = m;
    return Promise.resolve().then(()=>{
        v = t,
        m = n;
        let s;
        return X && (s = f || (f = {
            sources: new Set,
            effects: [],
            promises: new Set,
            disposed: new Set,
            queue: new Set,
            running: !0
        }),
        s.done || (s.done = new Promise(r=>s.resolve = r)),
        s.running = !0),
        V(e, !1),
        v = m = null,
        s ? s.done : void 0
    }
    )
}
function Tt(e) {
    $.push.apply($, e),
    e.length = 0
}
function re(e, t) {
    const n = Symbol("context");
    return {
        id: n,
        Provider: $t(n),
        defaultValue: e
    }
}
function G(e) {
    let t;
    return (t = de(m, e.id)) !== void 0 ? t : e.defaultValue
}
function nt(e) {
    const t = A(e)
      , n = A(()=>Ae(t()));
    return n.toArray = ()=>{
        const s = n();
        return Array.isArray(s) ? s : s != null ? [s] : []
    }
    ,
    n
}
let X;
function Lt() {
    return X || (X = re({}))
}
function rt() {
    const e = f && f.running;
    if (this.sources && (!e && this.state || e && this.tState))
        if (!e && this.state === j || e && this.tState === j)
            se(this);
        else {
            const t = R;
            R = null,
            V(()=>ye(this), !1),
            R = t
        }
    if (v) {
        const t = this.observers ? this.observers.length : 0;
        v.sources ? (v.sources.push(this),
        v.sourceSlots.push(t)) : (v.sources = [this],
        v.sourceSlots = [t]),
        this.observers ? (this.observers.push(v),
        this.observerSlots.push(v.sources.length - 1)) : (this.observers = [v],
        this.observerSlots = [v.sources.length - 1])
    }
    return e && f.sources.has(this) ? this.tValue : this.value
}
function st(e, t, n) {
    let s = f && f.running && f.sources.has(e) ? e.tValue : e.value;
    if (!e.comparator || !e.comparator(s, t)) {
        if (f) {
            const r = f.running;
            (r || !n && f.sources.has(e)) && (f.sources.add(e),
            e.tValue = t),
            r || (e.value = t)
        } else
            e.value = t;
        e.observers && e.observers.length && V(()=>{
            for (let r = 0; r < e.observers.length; r += 1) {
                const o = e.observers[r]
                  , l = f && f.running;
                l && f.disposed.has(o) || ((l && !o.tState || !l && !o.state) && (o.pure ? R.push(o) : $.push(o),
                o.observers && it(o)),
                l ? o.tState = j : o.state = j)
            }
            if (R.length > 1e6)
                throw R = [],
                new Error
        }
        , !1)
    }
    return t
}
function se(e) {
    if (!e.fn)
        return;
    ee(e);
    const t = m
      , n = v
      , s = Te;
    v = m = e,
    Me(e, f && f.running && f.sources.has(e) ? e.tValue : e.value, s),
    f && !f.running && f.sources.has(e) && queueMicrotask(()=>{
        V(()=>{
            f && (f.running = !0),
            v = m = e,
            Me(e, e.tValue, s),
            v = m = null
        }
        , !1)
    }
    ),
    v = n,
    m = t
}
function Me(e, t, n) {
    let s;
    try {
        s = e.fn(t)
    } catch (r) {
        e.pure && (f && f.running ? e.tState = j : e.state = j),
        _e(r)
    }
    (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers"in e ? st(e, s, !0) : f && f.running && e.pure ? (f.sources.add(e),
    e.tValue = s) : e.value = s,
    e.updatedAt = n)
}
function we(e, t, n, s=j, r) {
    const o = {
        fn: e,
        state: s,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: m,
        context: null,
        pure: n
    };
    return f && f.running && (o.state = 0,
    o.tState = s),
    m === null || m !== Ze && (f && f.running && m.pure ? m.tOwned ? m.tOwned.push(o) : m.tOwned = [o] : m.owned ? m.owned.push(o) : m.owned = [o]),
    o
}
function me(e) {
    const t = f && f.running;
    if (!t && e.state === 0 || t && e.tState === 0)
        return;
    if (!t && e.state === z || t && e.tState === z)
        return ye(e);
    if (e.suspense && I(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const n = [e];
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Te); ) {
        if (t && f.disposed.has(e))
            return;
        (!t && e.state || t && e.tState) && n.push(e)
    }
    for (let s = n.length - 1; s >= 0; s--) {
        if (e = n[s],
        t) {
            let r = e
              , o = n[s + 1];
            for (; (r = r.owner) && r !== o; )
                if (f.disposed.has(r))
                    return
        }
        if (!t && e.state === j || t && e.tState === j)
            se(e);
        else if (!t && e.state === z || t && e.tState === z) {
            const r = R;
            R = null,
            V(()=>ye(e, n[0]), !1),
            R = r
        }
    }
}
function V(e, t) {
    if (R)
        return e();
    let n = !1;
    t || (R = []),
    $ ? n = !0 : $ = [],
    Te++;
    try {
        const s = e();
        return _t(n),
        s
    } catch (s) {
        R || ($ = null),
        _e(s)
    }
}
function _t(e) {
    if (R && (ot(R),
    R = null),
    e)
        return;
    let t;
    if (f) {
        if (!f.promises.size && !f.queue.size) {
            const s = f.sources
              , r = f.disposed;
            $.push.apply($, f.effects),
            t = f.resolve;
            for (const o of $)
                "tState"in o && (o.state = o.tState),
                delete o.tState;
            f = null,
            V(()=>{
                for (const o of r)
                    ee(o);
                for (const o of s) {
                    if (o.value = o.tValue,
                    o.owned)
                        for (let l = 0, i = o.owned.length; l < i; l++)
                            ee(o.owned[l]);
                    o.tOwned && (o.owned = o.tOwned),
                    delete o.tValue,
                    delete o.tOwned,
                    o.tState = 0
                }
                je(!1)
            }
            , !1)
        } else if (f.running) {
            f.running = !1,
            f.effects.push.apply(f.effects, $),
            $ = null,
            je(!0);
            return
        }
    }
    const n = $;
    $ = null,
    n.length && V(()=>Ye(n), !1),
    t && t()
}
function ot(e) {
    for (let t = 0; t < e.length; t++)
        me(e[t])
}
function Nt(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const s = e[t];
        s.user ? e[n++] = s : me(s)
    }
    for (S.context && U(),
    t = 0; t < n; t++)
        me(e[t])
}
function ye(e, t) {
    const n = f && f.running;
    n ? e.tState = 0 : e.state = 0;
    for (let s = 0; s < e.sources.length; s += 1) {
        const r = e.sources[s];
        r.sources && (!n && r.state === j || n && r.tState === j ? r !== t && me(r) : (!n && r.state === z || n && r.tState === z) && ye(r, t))
    }
}
function it(e) {
    const t = f && f.running;
    for (let n = 0; n < e.observers.length; n += 1) {
        const s = e.observers[n];
        (!t && !s.state || t && !s.tState) && (t ? s.tState = z : s.state = z,
        s.pure ? R.push(s) : $.push(s),
        s.observers && it(s))
    }
}
function ee(e) {
    let t;
    if (e.sources)
        for (; e.sources.length; ) {
            const n = e.sources.pop()
              , s = e.sourceSlots.pop()
              , r = n.observers;
            if (r && r.length) {
                const o = r.pop()
                  , l = n.observerSlots.pop();
                s < r.length && (o.sourceSlots[l] = s,
                r[s] = o,
                n.observerSlots[s] = l)
            }
        }
    if (f && f.running && e.pure) {
        if (e.tOwned) {
            for (t = 0; t < e.tOwned.length; t++)
                ee(e.tOwned[t]);
            delete e.tOwned
        }
        lt(e, !0)
    } else if (e.owned) {
        for (t = 0; t < e.owned.length; t++)
            ee(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = 0; t < e.cleanups.length; t++)
            e.cleanups[t]();
        e.cleanups = null
    }
    f && f.running ? e.tState = 0 : e.state = 0,
    e.context = null
}
function lt(e, t) {
    if (t || (e.tState = 0,
    f.disposed.add(e)),
    e.owned)
        for (let n = 0; n < e.owned.length; n++)
            lt(e.owned[n])
}
function ct(e) {
    return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error")
}
function _e(e) {
    e = ct(e);
    const t = W && de(m, W);
    if (!t)
        throw e;
    for (const n of t)
        n(e)
}
function de(e, t) {
    return e ? e.context && e.context[t] !== void 0 ? e.context[t] : de(e.owner, t) : void 0
}
function Ae(e) {
    if (typeof e == "function" && !e.length)
        return Ae(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const s = Ae(e[n]);
            Array.isArray(s) ? t.push.apply(t, s) : t.push(s)
        }
        return t
    }
    return e
}
function $t(e, t) {
    return function(s) {
        let r;
        return H(()=>r = I(()=>(m.context = {
            [e]: s.value
        },
        nt(()=>s.children))), void 0),
        r
    }
}
const Rt = Symbol("fallback");
function qe(e) {
    for (let t = 0; t < e.length; t++)
        e[t]()
}
function It(e, t, n={}) {
    let s = []
      , r = []
      , o = []
      , l = 0
      , i = t.length > 1 ? [] : null;
    return ne(()=>qe(o)),
    ()=>{
        let u = e() || [], a, c;
        return u[At],
        I(()=>{
            let g = u.length, w, y, C, O, L, E, _, T, N;
            if (g === 0)
                l !== 0 && (qe(o),
                o = [],
                s = [],
                r = [],
                l = 0,
                i && (i = [])),
                n.fallback && (s = [Rt],
                r[0] = Z(M=>(o[0] = M,
                n.fallback())),
                l = 1);
            else if (l === 0) {
                for (r = new Array(g),
                c = 0; c < g; c++)
                    s[c] = u[c],
                    r[c] = Z(h);
                l = g
            } else {
                for (C = new Array(g),
                O = new Array(g),
                i && (L = new Array(g)),
                E = 0,
                _ = Math.min(l, g); E < _ && s[E] === u[E]; E++)
                    ;
                for (_ = l - 1,
                T = g - 1; _ >= E && T >= E && s[_] === u[T]; _--,
                T--)
                    C[T] = r[_],
                    O[T] = o[_],
                    i && (L[T] = i[_]);
                for (w = new Map,
                y = new Array(T + 1),
                c = T; c >= E; c--)
                    N = u[c],
                    a = w.get(N),
                    y[c] = a === void 0 ? -1 : a,
                    w.set(N, c);
                for (a = E; a <= _; a++)
                    N = s[a],
                    c = w.get(N),
                    c !== void 0 && c !== -1 ? (C[c] = r[a],
                    O[c] = o[a],
                    i && (L[c] = i[a]),
                    c = y[c],
                    w.set(N, c)) : o[a]();
                for (c = E; c < g; c++)
                    c in C ? (r[c] = C[c],
                    o[c] = O[c],
                    i && (i[c] = L[c],
                    i[c](c))) : r[c] = Z(h);
                r = r.slice(0, l = g),
                s = u.slice(0)
            }
            return r
        }
        );
        function h(g) {
            if (o[c] = g,
            i) {
                const [w,y] = k(c);
                return i[c] = y,
                t(u[c], w)
            }
            return t(u[c])
        }
    }
}
function p(e, t) {
    return I(()=>e(t || {}))
}
function he() {
    return !0
}
const jt = {
    get(e, t, n) {
        return t === Ee ? n : e.get(t)
    },
    has(e, t) {
        return t === Ee ? !0 : e.has(t)
    },
    set: he,
    deleteProperty: he,
    getOwnPropertyDescriptor(e, t) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(t)
            },
            set: he,
            deleteProperty: he
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};
function ve(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}
function Vt(...e) {
    let t = !1;
    for (let s = 0; s < e.length; s++) {
        const r = e[s];
        t = t || !!r && Ee in r,
        e[s] = typeof r == "function" ? (t = !0,
        A(r)) : r
    }
    if (t)
        return new Proxy({
            get(s) {
                for (let r = e.length - 1; r >= 0; r--) {
                    const o = ve(e[r])[s];
                    if (o !== void 0)
                        return o
                }
            },
            has(s) {
                for (let r = e.length - 1; r >= 0; r--)
                    if (s in ve(e[r]))
                        return !0;
                return !1
            },
            keys() {
                const s = [];
                for (let r = 0; r < e.length; r++)
                    s.push(...Object.keys(ve(e[r])));
                return [...new Set(s)]
            }
        },jt);
    const n = {};
    for (let s = e.length - 1; s >= 0; s--)
        if (e[s]) {
            const r = Object.getOwnPropertyDescriptors(e[s]);
            for (const o in r)
                o in n || Object.defineProperty(n, o, {
                    enumerable: !0,
                    get() {
                        for (let l = e.length - 1; l >= 0; l--) {
                            const i = (e[l] || {})[o];
                            if (i !== void 0)
                                return i
                        }
                    }
                })
        }
    return n
}
function q(e) {
    let t, n;
    const s = r=>{
        const o = S.context;
        if (o) {
            const [i,u] = k();
            (n || (n = e())).then(a=>{
                U(o),
                u(()=>a.default),
                U()
            }
            ),
            t = i
        } else if (!t) {
            const [i] = Pt(()=>(n || (n = e())).then(u=>u.default));
            t = i
        }
        let l;
        return A(()=>(l = t()) && I(()=>{
            if (!o)
                return l(r);
            const i = S.context;
            U(o);
            const u = l(r);
            return U(i),
            u
        }
        ))
    }
    ;
    return s.preload = ()=>n || ((n = e()).then(r=>t = ()=>r.default),
    n),
    s
}
let Bt = 0;
function Mt() {
    const e = S.context;
    return e ? `${e.id}${e.count++}` : `cl-${Bt++}`
}
function ur(e) {
    const t = "fallback"in e && {
        fallback: ()=>e.fallback
    };
    return A(It(()=>e.each, e.children, t || void 0))
}
function Ne(e) {
    let t = !1;
    const n = e.keyed
      , s = A(()=>e.when, void 0, {
        equals: (r,o)=>t ? r === o : !r == !o
    });
    return A(()=>{
        const r = s();
        if (r) {
            const o = e.children
              , l = typeof o == "function" && o.length > 0;
            return t = n || l,
            l ? I(()=>o(r)) : o
        }
        return e.fallback
    }
    , void 0, void 0)
}
let Y;
function at() {
    Y && [...Y].forEach(e=>e())
}
function qt(e) {
    let t, n;
    S.context && S.load && (n = S.load(S.context.id + S.context.count)) && (t = n[0]);
    const [s,r] = k(t, void 0);
    return Y || (Y = new Set),
    Y.add(r),
    ne(()=>Y.delete(r)),
    A(()=>{
        let o;
        if (o = s()) {
            const l = e.fallback
              , i = typeof l == "function" && l.length ? I(()=>l(o, ()=>r())) : l;
            return Be(r),
            i
        }
        return Be(r),
        e.children
    }
    , void 0, void 0)
}
const Dt = re();
function Ft(e) {
    let t = 0, n, s, r, o, l;
    const [i,u] = k(!1)
      , a = Lt()
      , c = {
        increment: ()=>{
            ++t === 1 && u(!0)
        }
        ,
        decrement: ()=>{
            --t === 0 && u(!1)
        }
        ,
        inFallback: i,
        effects: [],
        resolved: !1
    }
      , h = tt();
    if (S.context && S.load) {
        const y = S.context.id + S.context.count;
        let C = S.load(y);
        if (C && (r = C[0]) && r !== "$$f") {
            (typeof r != "object" || !("then"in r)) && (r = Promise.resolve(r));
            const [O,L] = k(void 0, {
                equals: !1
            });
            o = O,
            r.then(E=>{
                if (E || S.done)
                    return E && (l = E),
                    L();
                S.gather(y),
                U(s),
                L(),
                U()
            }
            )
        }
    }
    const g = G(Dt);
    g && (n = g.register(c.inFallback));
    let w;
    return ne(()=>w && w()),
    p(a.Provider, {
        value: c,
        get children() {
            return A(()=>{
                if (l)
                    throw l;
                if (s = S.context,
                o)
                    return o(),
                    o = void 0;
                s && r === "$$f" && U();
                const y = A(()=>e.children);
                return A(C=>{
                    const O = c.inFallback()
                      , {showContent: L=!0, showFallback: E=!0} = n ? n() : {};
                    if ((!O || r && r !== "$$f") && L)
                        return c.resolved = !0,
                        w && w(),
                        w = s = r = void 0,
                        Tt(c.effects),
                        y();
                    if (!!E)
                        return w ? C : Z(_=>(w = _,
                        s && (U({
                            id: s.id + "f",
                            count: 0
                        }),
                        s = void 0),
                        e.fallback), h)
                }
                )
            }
            )
        }
    })
}
const Ut = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]
  , Ht = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Ut])
  , Kt = new Set(["innerHTML", "textContent", "innerText", "children"])
  , Jt = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for"
})
  , De = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: "formNoValidate",
    ismap: "isMap",
    nomodule: "noModule",
    playsinline: "playsInline",
    readonly: "readOnly"
})
  , Wt = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
  , zt = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
};
function Xt(e, t, n) {
    let s = n.length
      , r = t.length
      , o = s
      , l = 0
      , i = 0
      , u = t[r - 1].nextSibling
      , a = null;
    for (; l < r || i < o; ) {
        if (t[l] === n[i]) {
            l++,
            i++;
            continue
        }
        for (; t[r - 1] === n[o - 1]; )
            r--,
            o--;
        if (r === l) {
            const c = o < s ? i ? n[i - 1].nextSibling : n[o - i] : u;
            for (; i < o; )
                e.insertBefore(n[i++], c)
        } else if (o === i)
            for (; l < r; )
                (!a || !a.has(t[l])) && t[l].remove(),
                l++;
        else if (t[l] === n[o - 1] && n[i] === t[r - 1]) {
            const c = t[--r].nextSibling;
            e.insertBefore(n[i++], t[l++].nextSibling),
            e.insertBefore(n[--o], c),
            t[r] = n[o]
        } else {
            if (!a) {
                a = new Map;
                let h = i;
                for (; h < o; )
                    a.set(n[h], h++)
            }
            const c = a.get(t[l]);
            if (c != null)
                if (i < c && c < o) {
                    let h = l, g = 1, w;
                    for (; ++h < r && h < o && !((w = a.get(t[h])) == null || w !== c + g); )
                        g++;
                    if (g > c - i) {
                        const y = t[l];
                        for (; i < c; )
                            e.insertBefore(n[i++], y)
                    } else
                        e.replaceChild(n[i++], t[l++])
                } else
                    l++;
            else
                t[l++].remove()
        }
    }
}
const Fe = "_$DX_DELEGATE";
function Gt(e, t, n, s={}) {
    let r;
    return Z(o=>{
        r = o,
        t === document ? e() : Pe(t, e(), t.firstChild ? null : void 0, n)
    }
    , s.owner),
    ()=>{
        r(),
        t.textContent = ""
    }
}
function be(e, t, n) {
    const s = document.createElement("template");
    s.innerHTML = e;
    let r = s.content.firstChild;
    return n && (r = r.firstChild),
    r
}
function $e(e, t=window.document) {
    const n = t[Fe] || (t[Fe] = new Set);
    for (let s = 0, r = e.length; s < r; s++) {
        const o = e[s];
        n.has(o) || (n.add(o),
        t.addEventListener(o, rn))
    }
}
function ut(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}
function Qt(e, t, n, s) {
    s == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, s)
}
function Yt(e, t) {
    t == null ? e.removeAttribute("class") : e.className = t
}
function ft(e, t, n, s) {
    if (s)
        Array.isArray(n) ? (e[`$$${t}`] = n[0],
        e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
    else if (Array.isArray(n)) {
        const r = n[0];
        e.addEventListener(t, n[0] = o=>r.call(e, n[1], o))
    } else
        e.addEventListener(t, n)
}
function Zt(e, t, n={}) {
    const s = Object.keys(t || {})
      , r = Object.keys(n);
    let o, l;
    for (o = 0,
    l = r.length; o < l; o++) {
        const i = r[o];
        !i || i === "undefined" || t[i] || (Ue(e, i, !1),
        delete n[i])
    }
    for (o = 0,
    l = s.length; o < l; o++) {
        const i = s[o]
          , u = !!t[i];
        !i || i === "undefined" || n[i] === u || !u || (Ue(e, i, !0),
        n[i] = u)
    }
    return n
}
function en(e, t, n) {
    if (!t)
        return n ? ut(e, "style") : t;
    const s = e.style;
    if (typeof t == "string")
        return s.cssText = t;
    typeof n == "string" && (s.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
    let r, o;
    for (o in n)
        t[o] == null && s.removeProperty(o),
        delete n[o];
    for (o in t)
        r = t[o],
        r !== n[o] && (s.setProperty(o, r),
        n[o] = r);
    return n
}
function ue(e, t={}, n, s) {
    const r = {};
    return s || H(()=>r.children = te(e, t.children, r.children)),
    H(()=>t.ref && t.ref(e)),
    H(()=>tn(e, t, n, !0, r, !0)),
    r
}
function fr(e, t, n) {
    return I(()=>e(t, n))
}
function Pe(e, t, n, s) {
    if (n !== void 0 && !s && (s = []),
    typeof t != "function")
        return te(e, t, s, n);
    H(r=>te(e, t(), r, n), s)
}
function tn(e, t, n, s, r={}, o=!1) {
    t || (t = {});
    for (const l in r)
        if (!(l in t)) {
            if (l === "children")
                continue;
            r[l] = He(e, l, null, r[l], n, o)
        }
    for (const l in t) {
        if (l === "children") {
            s || te(e, t.children);
            continue
        }
        const i = t[l];
        r[l] = He(e, l, i, r[l], n, o)
    }
}
function nn(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (t,n)=>n.toUpperCase())
}
function Ue(e, t, n) {
    const s = t.trim().split(/\s+/);
    for (let r = 0, o = s.length; r < o; r++)
        e.classList.toggle(s[r], n)
}
function He(e, t, n, s, r, o) {
    let l, i, u;
    if (t === "style")
        return en(e, n, s);
    if (t === "classList")
        return Zt(e, n, s);
    if (n === s)
        return s;
    if (t === "ref")
        o || n(e);
    else if (t.slice(0, 3) === "on:") {
        const a = t.slice(3);
        s && e.removeEventListener(a, s),
        n && e.addEventListener(a, n)
    } else if (t.slice(0, 10) === "oncapture:") {
        const a = t.slice(10);
        s && e.removeEventListener(a, s, !0),
        n && e.addEventListener(a, n, !0)
    } else if (t.slice(0, 2) === "on") {
        const a = t.slice(2).toLowerCase()
          , c = Wt.has(a);
        if (!c && s) {
            const h = Array.isArray(s) ? s[0] : s;
            e.removeEventListener(a, h)
        }
        (c || n) && (ft(e, a, n, c),
        c && $e([a]))
    } else if ((u = Kt.has(t)) || !r && (De[t] || (i = Ht.has(t))) || (l = e.nodeName.includes("-")))
        t === "class" || t === "className" ? Yt(e, n) : l && !i && !u ? e[nn(t)] = n : e[De[t] || t] = n;
    else {
        const a = r && t.indexOf(":") > -1 && zt[t.split(":")[0]];
        a ? Qt(e, a, t, n) : ut(e, Jt[t] || t, n)
    }
    return n
}
function rn(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
        configurable: !0,
        value: n
    }),
    Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
            return n || document
        }
    }),
    S.registry && !S.done && (S.done = !0,
    document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove())); n; ) {
        const s = n[t];
        if (s && !n.disabled) {
            const r = n[`${t}Data`];
            if (r !== void 0 ? s.call(n, r, e) : s.call(n, e),
            e.cancelBubble)
                return
        }
        n = n._$host || n.parentNode || n.host
    }
}
function te(e, t, n, s, r) {
    for (S.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
        n = n();
    if (t === n)
        return n;
    const o = typeof t
      , l = s !== void 0;
    if (e = l && n[0] && n[0].parentNode || e,
    o === "string" || o === "number") {
        if (S.context)
            return n;
        if (o === "number" && (t = t.toString()),
        l) {
            let i = n[0];
            i && i.nodeType === 3 ? i.data = t : i = document.createTextNode(t),
            n = Q(e, n, s, i)
        } else
            n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t
    } else if (t == null || o === "boolean") {
        if (S.context)
            return n;
        n = Q(e, n, s)
    } else {
        if (o === "function")
            return H(()=>{
                let i = t();
                for (; typeof i == "function"; )
                    i = i();
                n = te(e, i, n, s)
            }
            ),
            ()=>n;
        if (Array.isArray(t)) {
            const i = []
              , u = n && Array.isArray(n);
            if (ke(i, t, n, r))
                return H(()=>n = te(e, i, n, s, !0)),
                ()=>n;
            if (S.context) {
                if (!i.length)
                    return n;
                for (let a = 0; a < i.length; a++)
                    if (i[a].parentNode)
                        return n = i
            }
            if (i.length === 0) {
                if (n = Q(e, n, s),
                l)
                    return n
            } else
                u ? n.length === 0 ? Ke(e, i, s) : Xt(e, n, i) : (n && Q(e),
                Ke(e, i));
            n = i
        } else if (t instanceof Node) {
            if (S.context && t.parentNode)
                return n = l ? [t] : t;
            if (Array.isArray(n)) {
                if (l)
                    return n = Q(e, n, s, t);
                Q(e, n, null, t)
            } else
                n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
            n = t
        }
    }
    return n
}
function ke(e, t, n, s) {
    let r = !1;
    for (let o = 0, l = t.length; o < l; o++) {
        let i = t[o]
          , u = n && n[o];
        if (i instanceof Node)
            e.push(i);
        else if (!(i == null || i === !0 || i === !1))
            if (Array.isArray(i))
                r = ke(e, i, u) || r;
            else if (typeof i == "function")
                if (s) {
                    for (; typeof i == "function"; )
                        i = i();
                    r = ke(e, Array.isArray(i) ? i : [i], Array.isArray(u) ? u : [u]) || r
                } else
                    e.push(i),
                    r = !0;
            else {
                const a = String(i);
                u && u.nodeType === 3 && u.data === a ? e.push(u) : e.push(document.createTextNode(a))
            }
    }
    return r
}
function Ke(e, t, n=null) {
    for (let s = 0, r = t.length; s < r; s++)
        e.insertBefore(t[s], n)
}
function Q(e, t, n, s) {
    if (n === void 0)
        return e.textContent = "";
    const r = s || document.createTextNode("");
    if (t.length) {
        let o = !1;
        for (let l = t.length - 1; l >= 0; l--) {
            const i = t[l];
            if (r !== i) {
                const u = i.parentNode === e;
                !o && !l ? u ? e.replaceChild(r, i) : e.insertBefore(r, n) : u && i.remove()
            } else
                o = !0
        }
    } else
        e.insertBefore(r, n);
    return [r]
}
function sn(e) {
    return S.context ? void 0 : e.children
}
const dt = !1
  , on = "modulepreload"
  , ln = function(e) {
    return "/" + e
}
  , Je = {}
  , D = function(t, n, s) {
    if (!n || n.length === 0)
        return t();
    const r = document.getElementsByTagName("link");
    return Promise.all(n.map(o=>{
        if (o = ln(o),
        o in Je)
            return;
        Je[o] = !0;
        const l = o.endsWith(".css")
          , i = l ? '[rel="stylesheet"]' : "";
        if (!!s)
            for (let c = r.length - 1; c >= 0; c--) {
                const h = r[c];
                if (h.href === o && (!l || h.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${o}"]${i}`))
            return;
        const a = document.createElement("link");
        if (a.rel = l ? "stylesheet" : on,
        l || (a.as = "script",
        a.crossOrigin = ""),
        a.href = o,
        document.head.appendChild(a),
        l)
            return new Promise((c,h)=>{
                a.addEventListener("load", c),
                a.addEventListener("error", ()=>h(new Error(`Unable to preload CSS for ${o}`)))
            }
            )
    }
    )).then(()=>t())
};
function cn(e, t) {
    e && t && Gt(e, t === document ? t.body : t)
}
const Re = re()
  , an = ["title", "meta"]
  , We = e=>e.tag + (e.name ? `.${e.name}"` : "")
  , un = e=>{
    if (!S.context) {
        const r = document.head.querySelectorAll("[data-sm]");
        Array.prototype.forEach.call(r, o=>o.parentNode.removeChild(o))
    }
    const t = new Map;
    function n(r) {
        if (r.ref)
            return r.ref;
        let o = document.querySelector(`[data-sm="${r.id}"]`);
        return o ? (o.tagName.toLowerCase() !== r.tag && (o.parentNode && o.parentNode.removeChild(o),
        o = document.createElement(r.tag)),
        o.removeAttribute("data-sm")) : o = document.createElement(r.tag),
        o
    }
    const s = {
        addClientTag: r=>{
            let o = We(r);
            if (an.indexOf(r.tag) !== -1) {
                t.has(o) || t.set(o, []);
                let i = t.get(o)
                  , u = i.length;
                i = [...i, r],
                t.set(o, i);
                {
                    let a = n(r);
                    r.ref = a,
                    ue(a, r.props);
                    let c = null;
                    for (var l = u - 1; l >= 0; l--)
                        if (i[l] != null) {
                            c = i[l];
                            break
                        }
                    a.parentNode != document.head && document.head.appendChild(a),
                    c && c.ref && document.head.removeChild(c.ref)
                }
                return u
            }
            {
                let i = n(r);
                r.ref = i,
                ue(i, r.props),
                i.parentNode != document.head && document.head.appendChild(i)
            }
            return -1
        }
        ,
        removeClientTag: (r,o)=>{
            const l = We(r);
            if (r.ref) {
                const i = t.get(l);
                if (i) {
                    if (r.ref.parentNode) {
                        r.ref.parentNode.removeChild(r.ref);
                        for (let u = o - 1; u >= 0; u--)
                            i[u] != null && document.head.appendChild(i[u].ref)
                    }
                    i[o] = null,
                    t.set(l, i)
                } else
                    r.ref.parentNode && r.ref.parentNode.removeChild(r.ref)
            }
        }
    };
    return p(Re.Provider, {
        value: s,
        get children() {
            return e.children
        }
    })
}
  , Ie = (e,t)=>{
    const n = Mt();
    if (!G(Re))
        throw new Error("<MetaProvider /> should be in the tree");
    return fn({
        tag: e,
        props: t,
        id: n,
        get name() {
            return t.name || t.property
        }
    }),
    null
}
;
function fn(e) {
    const {addClientTag: t, removeClientTag: n, addServerTag: s} = G(Re);
    H(()=>{
        {
            let r = t(e);
            ne(()=>n(e, r))
        }
    }
    )
}
const dn = e=>Ie("title", e)
  , F = e=>Ie("meta", e)
  , hn = e=>Ie("link", e);
function gn(e, t, n) {
    return e.addEventListener(t, n),
    ()=>e.removeEventListener(t, n)
}
function pn([e,t], n, s) {
    return [n ? ()=>n(e()) : e, s ? r=>t(s(r)) : t]
}
function mn(e) {
    try {
        return document.querySelector(e)
    } catch {
        return null
    }
}
function yn(e, t) {
    const n = mn(`#${e}`);
    n ? n.scrollIntoView() : t && window.scrollTo(0, 0)
}
function wn(e, t, n, s) {
    let r = !1;
    const o = i=>typeof i == "string" ? {
        value: i
    } : i
      , l = pn(k(o(e()), {
        equals: (i,u)=>i.value === u.value
    }), void 0, i=>(!r && t(i),
    i));
    return n && ne(n((i=e())=>{
        r = !0,
        l[1](o(i)),
        r = !1
    }
    )),
    {
        signal: l,
        utils: s
    }
}
function bn(e) {
    if (e) {
        if (Array.isArray(e))
            return {
                signal: e
            }
    } else
        return {
            signal: k({
                value: ""
            })
        };
    return e
}
function Sn() {
    return wn(()=>({
        value: window.location.pathname + window.location.search + window.location.hash,
        state: history.state
    }), ({value: e, replace: t, scroll: n, state: s})=>{
        t ? window.history.replaceState(s, "", e) : window.history.pushState(s, "", e),
        yn(window.location.hash.slice(1), n)
    }
    , e=>gn(window, "popstate", ()=>e()), {
        go: e=>window.history.go(e)
    })
}
function xn() {
    let e = new Set;
    function t(r) {
        return e.add(r),
        ()=>e.delete(r)
    }
    let n = !1;
    function s(r, o) {
        if (n)
            return !(n = !1);
        const l = {
            to: r,
            options: o,
            defaultPrevented: !1,
            preventDefault: ()=>l.defaultPrevented = !0
        };
        for (const i of e)
            i.listener({
                ...l,
                from: i.location,
                retry: u=>{
                    u && (n = !0),
                    i.navigate(r, o)
                }
            });
        return !l.defaultPrevented
    }
    return {
        subscribe: t,
        confirm: s
    }
}
const vn = /^(?:[a-z0-9]+:)?\/\//i
  , En = /^\/+|\/+$/g;
function ae(e, t=!1) {
    const n = e.replace(En, "");
    return n ? t || /^[?#]/.test(n) ? n : "/" + n : ""
}
function ge(e, t, n) {
    if (vn.test(t))
        return;
    const s = ae(e)
      , r = n && ae(n);
    let o = "";
    return !r || t.startsWith("/") ? o = s : r.toLowerCase().indexOf(s.toLowerCase()) !== 0 ? o = s + r : o = r,
    (o || "/") + ae(t, !o)
}
function An(e, t) {
    if (e == null)
        throw new Error(t);
    return e
}
function ht(e, t) {
    return ae(e).replace(/\/*(\*.*)?$/g, "") + ae(t)
}
function Pn(e) {
    const t = {};
    return e.searchParams.forEach((n,s)=>{
        t[s] = n
    }
    ),
    t
}
function kn(e, t) {
    const [n,s] = e.split("/*", 2)
      , r = n.split("/").filter(Boolean)
      , o = r.length;
    return l=>{
        const i = l.split("/").filter(Boolean)
          , u = i.length - o;
        if (u < 0 || u > 0 && s === void 0 && !t)
            return null;
        const a = {
            path: o ? "" : "/",
            params: {}
        };
        for (let c = 0; c < o; c++) {
            const h = r[c]
              , g = i[c];
            if (h[0] === ":")
                a.params[h.slice(1)] = g;
            else if (h.localeCompare(g, void 0, {
                sensitivity: "base"
            }) !== 0)
                return null;
            a.path += `/${g}`
        }
        return s && (a.params[s] = u ? i.slice(-u).join("/") : ""),
        a
    }
}
function Cn(e) {
    const [t,n] = e.pattern.split("/*", 2)
      , s = t.split("/").filter(Boolean);
    return s.reduce((r,o)=>r + (o.startsWith(":") ? 2 : 3), s.length - (n === void 0 ? 0 : 1))
}
function gt(e) {
    const t = new Map
      , n = tt();
    return new Proxy({},{
        get(s, r) {
            return t.has(r) || Ct(n, ()=>t.set(r, A(()=>e()[r]))),
            t.get(r)()
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: !0,
                configurable: !0
            }
        },
        ownKeys() {
            return Reflect.ownKeys(e())
        }
    })
}
function pt(e) {
    let t = /(\/?\:[^\/]+)\?/.exec(e);
    if (!t)
        return [e];
    let n = e.slice(0, t.index)
      , s = e.slice(t.index + t[0].length);
    const r = [n, n += t[1]];
    for (; t = /^(\/\:[^\/]+)\?/.exec(s); )
        r.push(n += t[1]),
        s = s.slice(t[0].length);
    return pt(s).reduce((o,l)=>[...o, ...r.map(i=>i + l)], [])
}
const On = 100
  , mt = re()
  , Se = re()
  , yt = ()=>An(G(mt), "Make sure your app is wrapped in a <Router />");
let fe;
const wt = ()=>fe || G(Se) || yt().base;
function Tn(e, t="", n) {
    const {component: s, data: r, children: o} = e
      , l = !o || Array.isArray(o) && !o.length
      , i = {
        key: e,
        element: s ? ()=>p(s, {}) : ()=>{
            const {element: u} = e;
            return u === void 0 && n ? p(n, {}) : u
        }
        ,
        preload: e.component ? s.preload : e.preload,
        data: r
    };
    return bt(e.path).reduce((u,a)=>{
        for (const c of pt(a)) {
            const h = ht(t, c)
              , g = l ? h : h.split("/*", 1)[0];
            u.push({
                ...i,
                originalPath: c,
                pattern: g,
                matcher: kn(g, !l)
            })
        }
        return u
    }
    , [])
}
function Ln(e, t=0) {
    return {
        routes: e,
        score: Cn(e[e.length - 1]) * 1e4 - t,
        matcher(n) {
            const s = [];
            for (let r = e.length - 1; r >= 0; r--) {
                const o = e[r]
                  , l = o.matcher(n);
                if (!l)
                    return null;
                s.unshift({
                    ...l,
                    route: o
                })
            }
            return s
        }
    }
}
function bt(e) {
    return Array.isArray(e) ? e : [e]
}
function St(e, t="", n, s=[], r=[]) {
    const o = bt(e);
    for (let l = 0, i = o.length; l < i; l++) {
        const u = o[l];
        if (u && typeof u == "object" && u.hasOwnProperty("path")) {
            const a = Tn(u, t, n);
            for (const c of a) {
                s.push(c);
                const h = Array.isArray(u.children) && u.children.length === 0;
                if (u.children && !h)
                    St(u.children, c.pattern, n, s, r);
                else {
                    const g = Ln([...s], r.length);
                    r.push(g)
                }
                s.pop()
            }
        }
    }
    return s.length ? r : r.sort((l,i)=>i.score - l.score)
}
function _n(e, t) {
    for (let n = 0, s = e.length; n < s; n++) {
        const r = e[n].matcher(t);
        if (r)
            return r
    }
    return []
}
function Nn(e, t) {
    const n = new URL("http://sar")
      , s = A(u=>{
        const a = e();
        try {
            return new URL(a,n)
        } catch {
            return console.error(`Invalid path ${a}`),
            u
        }
    }
    , n, {
        equals: (u,a)=>u.href === a.href
    })
      , r = A(()=>s().pathname)
      , o = A(()=>s().search, !0)
      , l = A(()=>s().hash)
      , i = A(()=>"");
    return {
        get pathname() {
            return r()
        },
        get search() {
            return o()
        },
        get hash() {
            return l()
        },
        get state() {
            return t()
        },
        get key() {
            return i()
        },
        query: gt(et(o, ()=>Pn(s())))
    }
}
function $n(e, t="", n, s) {
    const {signal: [r,o], utils: l={}} = bn(e)
      , i = l.parsePath || (x=>x)
      , u = l.renderPath || (x=>x)
      , a = l.beforeLeave || xn()
      , c = ge("", t)
      , h = void 0;
    if (c === void 0)
        throw new Error(`${c} is not a valid base path`);
    c && !r().value && o({
        value: c,
        replace: !0,
        scroll: !1
    });
    const [g,w] = k(!1)
      , y = async x=>{
        w(!0);
        try {
            await Ot(x)
        } finally {
            w(!1)
        }
    }
      , [C,O] = k(r().value)
      , [L,E] = k(r().state)
      , _ = Nn(C, L)
      , T = []
      , N = {
        pattern: c,
        params: {},
        path: ()=>c,
        outlet: ()=>null,
        resolvePath(x) {
            return ge(c, x)
        }
    };
    if (n)
        try {
            fe = N,
            N.data = n({
                data: void 0,
                params: {},
                location: _,
                navigate: oe(N)
            })
        } finally {
            fe = void 0
        }
    function M(x, d, b) {
        I(()=>{
            if (typeof d == "number") {
                d && (l.go ? a.confirm(d, b) && l.go(d) : console.warn("Router integration does not support relative routing"));
                return
            }
            const {replace: P, resolve: B, scroll: K, state: le} = {
                replace: !1,
                resolve: !0,
                scroll: !0,
                ...b
            }
              , J = B ? x.resolvePath(d) : ge("", d);
            if (J === void 0)
                throw new Error(`Path '${d}' is not a routable path`);
            if (T.length >= On)
                throw new Error("Too many redirects");
            const ce = C();
            if ((J !== ce || le !== L()) && !dt) {
                if (a.confirm(J, b)) {
                    const vt = T.push({
                        value: ce,
                        replace: P,
                        scroll: K,
                        state: L()
                    });
                    y(()=>{
                        O(J),
                        E(le),
                        at()
                    }
                    ).then(()=>{
                        T.length === vt && ie({
                            value: J,
                            state: le
                        })
                    }
                    )
                }
            }
        }
        )
    }
    function oe(x) {
        return x = x || G(Se) || N,
        (d,b)=>M(x, d, b)
    }
    function ie(x) {
        const d = T[0];
        d && ((x.value !== d.value || x.state !== d.state) && o({
            ...x,
            replace: d.replace,
            scroll: d.scroll
        }),
        T.length = 0)
    }
    H(()=>{
        const {value: x, state: d} = r();
        I(()=>{
            x !== C() && y(()=>{
                O(x),
                E(d)
            }
            )
        }
        )
    }
    );
    {
        let x = function(d) {
            if (d.defaultPrevented || d.button !== 0 || d.metaKey || d.altKey || d.ctrlKey || d.shiftKey)
                return;
            const b = d.composedPath().find(ce=>ce instanceof Node && ce.nodeName.toUpperCase() === "A");
            if (!b || !b.hasAttribute("link"))
                return;
            const P = b.href;
            if (b.target || !P && !b.hasAttribute("state"))
                return;
            const B = (b.getAttribute("rel") || "").split(/\s+/);
            if (b.hasAttribute("download") || B && B.includes("external"))
                return;
            const K = new URL(P);
            if (K.origin !== window.location.origin || c && K.pathname && !K.pathname.toLowerCase().startsWith(c.toLowerCase()))
                return;
            const le = i(K.pathname + K.search + K.hash)
              , J = b.getAttribute("state");
            d.preventDefault(),
            M(N, le, {
                resolve: !1,
                replace: b.hasAttribute("replace"),
                scroll: !b.hasAttribute("noscroll"),
                state: J && JSON.parse(J)
            })
        };
        $e(["click"]),
        document.addEventListener("click", x),
        ne(()=>document.removeEventListener("click", x))
    }
    return {
        base: N,
        out: h,
        location: _,
        isRouting: g,
        renderPath: u,
        parsePath: i,
        navigatorFactory: oe,
        beforeLeave: a
    }
}
function Rn(e, t, n, s) {
    const {base: r, location: o, navigatorFactory: l} = e
      , {pattern: i, element: u, preload: a, data: c} = s().route
      , h = A(()=>s().path)
      , g = gt(()=>s().params);
    a && a();
    const w = {
        parent: t,
        pattern: i,
        get child() {
            return n()
        },
        path: h,
        params: g,
        data: t.data,
        outlet: u,
        resolvePath(y) {
            return ge(r.path(), y, h())
        }
    };
    if (c)
        try {
            fe = w,
            w.data = c({
                data: t.data,
                params: g,
                location: o,
                navigate: l(w)
            })
        } finally {
            fe = void 0
        }
    return w
}
const In = e=>{
    const {source: t, url: n, base: s, data: r, out: o} = e
      , l = t || Sn()
      , i = $n(l, s, r);
    return p(mt.Provider, {
        value: i,
        get children() {
            return e.children
        }
    })
}
  , jn = e=>{
    const t = yt()
      , n = wt()
      , s = nt(()=>e.children)
      , r = A(()=>St(s(), ht(n.pattern, e.base || ""), Vn))
      , o = A(()=>_n(r(), t.location.pathname));
    t.out && t.out.matches.push(o().map(({route: a, path: c, params: h})=>({
        originalPath: a.originalPath,
        pattern: a.pattern,
        path: c,
        params: h
    })));
    const l = [];
    let i;
    const u = A(et(o, (a,c,h)=>{
        let g = c && a.length === c.length;
        const w = [];
        for (let y = 0, C = a.length; y < C; y++) {
            const O = c && c[y]
              , L = a[y];
            h && O && L.route.key === O.route.key ? w[y] = h[y] : (g = !1,
            l[y] && l[y](),
            Z(E=>{
                l[y] = E,
                w[y] = Rn(t, w[y - 1] || n, ()=>u()[y + 1], ()=>o()[y])
            }
            ))
        }
        return l.splice(a.length).forEach(y=>y()),
        h && g ? h : (i = w[0],
        w)
    }
    ));
    return p(Ne, {
        get when() {
            return u() && i
        },
        children: a=>p(Se.Provider, {
            value: a,
            get children() {
                return a.outlet()
            }
        })
    })
}
  , Vn = ()=>{
    const e = wt();
    return p(Ne, {
        get when() {
            return e.child
        },
        children: t=>p(Se.Provider, {
            value: t,
            get children() {
                return t.outlet()
            }
        })
    })
}
  , Bn = [{
    component: q(()=>D(()=>import("./index.b2bcc769.js").then(e=>e.i), ["assets/index.b2bcc769.js", "assets/url.e5e1fed9.js", "assets/BareClient.06787bc0.js"])),
    path: "/"
}, {
    component: q(()=>D(()=>import("./newTab.a09e215e.js"), ["assets/newTab.a09e215e.js", "assets/url.e5e1fed9.js"])),
    path: "/internal/newTab"
}, {
    component: q(()=>D(()=>import("./view-source.68193af3.js"), ["assets/view-source.68193af3.js", "assets/BareClient.06787bc0.js", "assets/view-source.5c045b07.css"])),
    path: "/internal/view-source"
}, {
    component: q(()=>D(()=>import("./General.28dff7a3.js"), ["assets/General.28dff7a3.js", "assets/Toggle.680161c0.js"])),
    path: "/internal/preferences/General"
}, {
    component: q(()=>D(()=>import("./NavButton.2c2f8418.js"), [])),
    path: "/internal/preferences/NavButton"
}, {
    component: q(()=>D(()=>import("./Search.4fa40a8e.js"), ["assets/Search.4fa40a8e.js", "assets/Dropdown.12217b0d.js"])),
    path: "/internal/preferences/Search"
}, {
    component: q(()=>D(()=>import("./index.b9165a43.js"), ["assets/index.b9165a43.js", "assets/NavButton.2c2f8418.js", "assets/General.28dff7a3.js", "assets/Toggle.680161c0.js", "assets/Search.4fa40a8e.js", "assets/Dropdown.12217b0d.js"])),
    path: "/internal/preferences/"
}, {
    component: q(()=>D(()=>import("./Dropdown.12217b0d.js"), [])),
    path: "/internal/preferences/inputs/Dropdown"
}, {
    component: q(()=>D(()=>import("./Toggle.680161c0.js"), [])),
    path: "/internal/preferences/inputs/Toggle"
}]
  , Mn = ()=>Bn
  , xt = re({})
  , qn = jn
  , Dn = "$FETCH"
  , Fn = be('<div><div><p id="error-message"></p><button id="reset-errors">Clear errors and retry</button><pre></pre></div></div>');
function Un(e) {
    return p(qt, {
        fallback: (t,n)=>p(Ne, {
            get when() {
                return !e.fallback
            },
            get fallback() {
                return A(()=>!!e.fallback)() && e.fallback(t, n)
            },
            get children() {
                return p(Hn, {
                    error: t
                })
            }
        }),
        get children() {
            return e.children
        }
    })
}
function Hn(e) {
    return Le(()=>console.error(e.error)),
    (()=>{
        const t = Fn.cloneNode(!0)
          , n = t.firstChild
          , s = n.firstChild
          , r = s.nextSibling
          , o = r.nextSibling;
        return t.style.setProperty("padding", "16px"),
        n.style.setProperty("background-color", "rgba(252, 165, 165)"),
        n.style.setProperty("color", "rgb(153, 27, 27)"),
        n.style.setProperty("border-radius", "5px"),
        n.style.setProperty("overflow", "scroll"),
        n.style.setProperty("padding", "16px"),
        n.style.setProperty("margin-bottom", "8px"),
        s.style.setProperty("font-weight", "bold"),
        Pe(s, ()=>e.error.message),
        ft(r, "click", at, !0),
        r.style.setProperty("color", "rgba(252, 165, 165)"),
        r.style.setProperty("background-color", "rgb(153, 27, 27)"),
        r.style.setProperty("border-radius", "5px"),
        r.style.setProperty("padding", "4px 8px"),
        o.style.setProperty("margin-top", "8px"),
        o.style.setProperty("width", "100%"),
        Pe(o, ()=>e.error.stack),
        t
    }
    )()
}
$e(["click"]);
const Kn = !1
  , Jn = !1
  , Wn = !1;
function zn() {
    return G(xt),
    [Jn, Wn, p(sn, {
        get children() {
            return dt
        }
    }), Kn]
}
function Xn(e) {
    return ue(document.documentElement, e, !1, !0),
    e.children
}
function Gn(e) {
    return ue(document.head, e, !1, !0),
    e.children
}
function Qn(e) {
    return ue(document.body, e, !1, !0),
    e.children
}
function Yn() {
    return [p(F, {
        charset: "utf-8"
    }), p(F, {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
    }), p(F, {
        name: "theme-color",
        content: "#00ddff"
    }), p(dn, {
        children: "Velocity"
    }), p(F, {
        property: "og:title",
        content: "Velocity"
    }), p(hn, {
        rel: "icon",
        href: "/icons/newTab.png"
    }), p(F, {
        name: "robots",
        content: "index, follow"
    }), p(F, {
        name: "revisit-after",
        content: "7 days"
    }), p(F, {
        name: "description",
        content: "A highly customizable tabbed proxy for evading internet censorship."
    }), p(F, {
        property: "og:description",
        content: "A highly customizable tabbed proxy for evading internet censorship."
    }), p(F, {
        name: "keywords",
        content: "proxy,velocity,tabbed,proxy,unblocker"
    })]
}
const [ze,dr] = k([])
  , [hr,gr] = k(new Set)
  , [pr,mr] = k()
  , [Ce,Oe] = k([])
  , [Zn,er] = k(!0)
  , [yr,wr] = k([]);
function Xe() {
    return localStorage.getItem("preferences") ? JSON.parse(localStorage.getItem("preferences")) : {
        "general.startup.openPreviousTabs": !0,
        "general.tabs.openWindowLinksInTab": !0,
        "general.tabs.switchToMedia": !1,
        "general.tabs.confirmBeforeClosing": !0,
        "search.defaults.searchEngine": "google",
        "search.defaults.proxy": "ultraviolet",
        "bookmarks.shown": !0
    }
}
class tr {
    name;
    url;
    icon;
    id;
    constructor(t) {
        this.name = t.name,
        this.url = t.url,
        this.icon = t.icon,
        this.id = t.id ?? Math.floor(Math.random() * 1e15),
        Oe([...Ce(), this])
    }
    delete() {
        Oe(Ce().filter(t=>t.id !== this.id))
    }
}
const nr = be('<script src="/pro.fontawesome.js" defer><\/script>')
  , rr = be('<script src="/uv/uv.bundle.js"><\/script>')
  , sr = be('<script src="/uv/uv.config.js"><\/script>');
function Ge() {
    return kt(()=>{
        Oe(JSON.parse(localStorage.getItem("bookmarks") || "[]").map(e=>new tr(e))),
        er(Xe()["bookmarks.shown"] ?? !0)
    }
    ),
    Le(()=>{
        localStorage.setItem("tabs", JSON.stringify(Array.from(ze()).map(e=>e.url()))),
        localStorage.setItem("activeTab", Array.from(ze()).findIndex(e=>e.focus()).toString()),
        localStorage.setItem("bookmarks", JSON.stringify(Array.from(Ce()))),
        localStorage.setItem("preferences", JSON.stringify(Object.assign(Xe(), {
            ["bookmarks.shown"]: Zn()
        })))
    }
    ),
    p(Xn, {
        lang: "en",
        get children() {
            return [p(Gn, {
                get children() {
                    return [nr.cloneNode(!0), rr.cloneNode(!0), sr.cloneNode(!0), p(Yn, {})]
                }
            }), p(Qn, {
                class: "h-screen",
                get children() {
                    return [p(Ft, {
                        get children() {
                            return p(Un, {
                                get children() {
                                    return p(qn, {
                                        get children() {
                                            return p(Mn, {})
                                        }
                                    })
                                }
                            })
                        }
                    }), p(zn, {})]
                }
            })]
        }
    })
}
const Qe = Object.values(Object.assign({}))[0]
  , or = Qe ? Qe.default : void 0
  , ir = ()=>{
    let e = {
        get request() {},
        get prevUrl() {},
        get responseHeaders() {},
        get tags() {},
        get env() {},
        get routerContext() {},
        setStatusCode(n) {},
        getStatusCode() {},
        $type: Dn,
        fetch
    };
    function t(n) {
        return p(In, Vt(n, {
            get children() {
                return p(Ge, {})
            }
        }))
    }
    return p(xt.Provider, {
        value: e,
        get children() {
            return p(un, {
                get children() {
                    return p(t, {
                        data: or,
                        get children() {
                            return p(Ge, {})
                        }
                    })
                }
            })
        }
    })
}
;
cn(()=>p(ir, {}), document);
export {Ee as$, gr as A, tr as B, pr as C, mr as D, fr as E, ur as F, ut as G, Ce as H, Oe as I, wr as J, yr as K, hn as L, Ne as S, dn as T, D as _, At as a, cr as b, k as c, p as d, A as e, Le as f, ar as g, I as h, ne as i, re as j, Zn as k, ft as l, Vt as m, Pe as n, kt as o, Xe as p, be as q, $e as r, er as s, hr as t, G as u, H as v, Yt as w, en as x, dr as y, ze as z};
