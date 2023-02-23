import {$as H, a as Oe, g as Le, b as q, c as$, m as st, d as p, u as Be, e as it, f as R, h as P, o as X, i as Q, j as Me, t as u, s as Ne, k as me, p as ke, l as Re, n as C, q as L, r as Y, F as $e, v as Z, w as F, x as We, y as pe, z as U, A as ie, B as lt, C as Te, D as ct, E as De, S as le, G as dt, H as be, I as ut, _ as je, T as ft} from "./index.1640afea.js";
import {g as gt, n as Ke, e as bt} from "./url.e5e1fed9.js";
import {B as ht} from "./BareClient.06787bc0.js";
const ye = Symbol("store-raw")
  , oe = Symbol("store-node")
  , vt = Symbol("store-name");
function qe(e, t) {
    let r = e[H];
    if (!r && (Object.defineProperty(e, H, {
        value: r = new Proxy(e,yt)
    }),
    !Array.isArray(e))) {
        const n = Object.keys(e)
          , a = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, l = n.length; o < l; o++) {
            const i = n[o];
            a[i].get && Object.defineProperty(e, i, {
                enumerable: a[i].enumerable,
                get: a[i].get.bind(r)
            })
        }
    }
    return r
}
function ce(e) {
    let t;
    return e != null && typeof e == "object" && (e[H] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}
function se(e, t=new Set) {
    let r, n, a, o;
    if (r = e != null && e[ye])
        return r;
    if (!ce(e) || t.has(e))
        return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let l = 0, i = e.length; l < i; l++)
            a = e[l],
            (n = se(a, t)) !== a && (e[l] = n)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const l = Object.keys(e)
          , i = Object.getOwnPropertyDescriptors(e);
        for (let c = 0, v = l.length; c < v; c++)
            o = l[c],
            !i[o].get && (a = e[o],
            (n = se(a, t)) !== a && (e[o] = n))
    }
    return e
}
function _e(e) {
    let t = e[oe];
    return t || Object.defineProperty(e, oe, {
        value: t = {}
    }),
    t
}
function we(e, t, r) {
    return e[t] || (e[t] = Ue(r))
}
function mt(e, t) {
    const r = Reflect.getOwnPropertyDescriptor(e, t);
    return !r || r.get || !r.configurable || t === H || t === oe || t === vt || (delete r.value,
    delete r.writable,
    r.get = ()=>e[H][t]),
    r
}
function Fe(e) {
    if (Le()) {
        const t = _e(e);
        (t._ || (t._ = Ue()))()
    }
}
function pt(e) {
    return Fe(e),
    Reflect.ownKeys(e)
}
function Ue(e) {
    const [t,r] = $(e, {
        equals: !1,
        internal: !0
    });
    return t.$ = r,
    t
}
const yt = {
    get(e, t, r) {
        if (t === ye)
            return e;
        if (t === H)
            return r;
        if (t === Oe)
            return Fe(e),
            r;
        const n = _e(e)
          , a = n.hasOwnProperty(t);
        let o = a ? n[t]() : e[t];
        if (t === oe || t === "__proto__")
            return o;
        if (!a) {
            const l = Object.getOwnPropertyDescriptor(e, t);
            Le() && (typeof o != "function" || e.hasOwnProperty(t)) && !(l && l.get) && (o = we(n, t, o)())
        }
        return ce(o) ? qe(o) : o
    },
    has(e, t) {
        return t === ye || t === H || t === Oe || t === oe || t === "__proto__" ? !0 : (this.get(e, t, e),
        t in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: pt,
    getOwnPropertyDescriptor: mt
};
function de(e, t, r, n=!1) {
    if (!n && e[t] === r)
        return;
    const a = e[t]
      , o = e.length;
    r === void 0 ? delete e[t] : e[t] = r;
    let l = _e(e), i;
    (i = we(l, t, a)) && i.$(()=>r),
    Array.isArray(e) && e.length !== o && (i = we(l, "length", o)) && i.$(e.length),
    (i = l._) && i.$()
}
function ze(e, t) {
    const r = Object.keys(t);
    for (let n = 0; n < r.length; n += 1) {
        const a = r[n];
        de(e, a, t[a])
    }
}
function wt(e, t) {
    if (typeof t == "function" && (t = t(e)),
    t = se(t),
    Array.isArray(t)) {
        if (e === t)
            return;
        let r = 0
          , n = t.length;
        for (; r < n; r++) {
            const a = t[r];
            e[r] !== a && de(e, r, a)
        }
        de(e, "length", n)
    } else
        ze(e, t)
}
function re(e, t, r=[]) {
    let n, a = e;
    if (t.length > 1) {
        n = t.shift();
        const l = typeof n
          , i = Array.isArray(e);
        if (Array.isArray(n)) {
            for (let c = 0; c < n.length; c++)
                re(e, [n[c]].concat(t), r);
            return
        } else if (i && l === "function") {
            for (let c = 0; c < e.length; c++)
                n(e[c], c) && re(e, [c].concat(t), r);
            return
        } else if (i && l === "object") {
            const {from: c=0, to: v=e.length - 1, by: y=1} = n;
            for (let m = c; m <= v; m += y)
                re(e, [m].concat(t), r);
            return
        } else if (t.length > 1) {
            re(e[n], t, [n].concat(r));
            return
        }
        a = e[n],
        r = [n].concat(r)
    }
    let o = t[0];
    typeof o == "function" && (o = o(a, r),
    o === a) || n === void 0 && o == null || (o = se(o),
    n === void 0 || ce(a) && ce(o) && !Array.isArray(o) ? ze(a, o) : de(e, n, o))
}
function He(...[e,t]) {
    const r = se(e || {})
      , n = Array.isArray(r)
      , a = qe(r);
    function o(...l) {
        q(()=>{
            n && l.length === 1 ? wt(r, l[0]) : re(r, l)
        }
        )
    }
    return [a, o]
}
var ue = class {
    x;
    y;
    width;
    height;
    constructor(e) {
        this.x = Math.floor(e.x),
        this.y = Math.floor(e.y),
        this.width = Math.floor(e.width),
        this.height = Math.floor(e.height)
    }
    get rect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }
    get left() {
        return this.x
    }
    get top() {
        return this.y
    }
    get right() {
        return this.x + this.width
    }
    get bottom() {
        return this.y + this.height
    }
    get center() {
        return {
            x: this.x + this.width * .5,
            y: this.y + this.height * .5
        }
    }
    get corners() {
        return {
            topLeft: {
                x: this.left,
                y: this.top
            },
            topRight: {
                x: this.right,
                y: this.top
            },
            bottomRight: {
                x: this.left,
                y: this.bottom
            },
            bottomLeft: {
                x: this.right,
                y: this.bottom
            }
        }
    }
}
  , ae = e=>{
    let t = new ue(e.getBoundingClientRect());
    const {transform: r} = getComputedStyle(e);
    return r && (t = xt(t, r)),
    t
}
  , xt = (e,t)=>{
    let r, n;
    if (t.startsWith("matrix3d(")) {
        const a = t.slice(9, -1).split(/, /);
        r = +a[12],
        n = +a[13]
    } else if (t.startsWith("matrix(")) {
        const a = t.slice(7, -1).split(/, /);
        r = +a[4],
        n = +a[5]
    } else
        r = 0,
        n = 0;
    return new ue({
        ...e,
        x: e.x - r,
        y: e.y - n
    })
}
  , W = ()=>({
    x: 0,
    y: 0
})
  , Ae = (e,t)=>e.x === t.x && e.y === t.y
  , he = (e,t)=>new ue({
    ...e,
    x: e.x + t.x,
    y: e.y + t.y
})
  , kt = (e,t)=>Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
  , $t = (e,t)=>{
    const r = Math.max(e.top, t.top)
      , n = Math.max(e.left, t.left)
      , a = Math.min(e.right, t.right)
      , o = Math.min(e.bottom, t.bottom)
      , l = a - n
      , i = o - r;
    if (n < a && r < o) {
        const c = e.width * e.height
          , v = t.width * t.height
          , y = l * i;
        return y / (c + v - y)
    }
    return 0
}
  , ve = (e,t)=>e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  , Xe = (e,t,r)=>{
    const n = e.transformed.center
      , a = {
        distance: 1 / 0,
        droppable: null
    };
    for (const o of t) {
        const l = kt(n, o.layout.center);
        l < a.distance ? (a.distance = l,
        a.droppable = o) : l === a.distance && o.id === r.activeDroppableId && (a.droppable = o)
    }
    return a.droppable
}
  , Dt = (e,t,r)=>{
    const n = e.transformed
      , a = {
        ratio: 0,
        droppable: null
    };
    for (const o of t) {
        const l = $t(n, o.layout);
        l > a.ratio ? (a.ratio = l,
        a.droppable = o) : l > 0 && l === a.ratio && o.id === r.activeDroppableId && (a.droppable = o)
    }
    return a.droppable
}
  , Ye = Me()
  , Ve = e=>{
    const t = st({
        collisionDetector: Dt
    }, e)
      , [r,n] = He({
        draggables: {},
        droppables: {},
        sensors: {},
        active: {
            draggableId: null,
            get draggable() {
                return r.active.draggableId !== null ? r.draggables[r.active.draggableId] : null
            },
            droppableId: null,
            get droppable() {
                return r.active.droppableId !== null ? r.droppables[r.active.droppableId] : null
            },
            sensorId: null,
            get sensor() {
                return r.active.sensorId !== null ? r.sensors[r.active.sensorId] : null
            },
            overlay: null
        }
    })
      , a = (s,d,f)=>{
        s.substring(0, s.length - 1),
        P(()=>r[s][d]) && n(s, d, "transformers", f.id, f)
    }
      , o = (s,d,f)=>{
        s.substring(0, s.length - 1),
        P(()=>r[s][d]) && (!P(()=>r[s][d].transformers[f]) || n(s, d, "transformers", f, void 0))
    }
      , l = ({id: s, node: d, layout: f, data: E})=>{
        const b = r.draggables[s]
          , g = {
            id: s,
            node: d,
            layout: f,
            data: E,
            _pendingCleanup: !1
        };
        let k;
        if (!b)
            Object.defineProperties(g, {
                transformers: {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                },
                transform: {
                    enumerable: !0,
                    configurable: !0,
                    get: ()=>{
                        if (r.active.overlay)
                            return W();
                        const A = Object.values(r.draggables[s].transformers);
                        return A.sort((N,V)=>N.order - V.order),
                        A.reduce((N,V)=>V.callback(N), W())
                    }
                },
                transformed: {
                    enumerable: !0,
                    configurable: !0,
                    get: ()=>he(r.draggables[s].layout, r.draggables[s].transform)
                }
            });
        else if (r.active.draggableId === s && !r.active.overlay) {
            const A = {
                x: b.layout.x - f.x,
                y: b.layout.y - f.y
            }
              , N = "addDraggable-existing-offset"
              , V = b.transformers[N]
              , Se = V ? V.callback(A) : A;
            k = {
                id: N,
                order: 100,
                callback: Ee=>({
                    x: Ee.x + Se.x,
                    y: Ee.y + Se.y
                })
            },
            ge(()=>o("draggables", s, N))
        }
        q(()=>{
            n("draggables", s, g),
            k && a("draggables", s, k)
        }
        ),
        r.active.draggable && x()
    }
      , i = s=>{
        !P(()=>r.draggables[s]) || (n("draggables", s, "_pendingCleanup", !0),
        queueMicrotask(()=>c(s)))
    }
      , c = s=>{
        if (r.draggables[s]?._pendingCleanup) {
            const d = r.active.draggableId === s;
            q(()=>{
                d && n("active", "draggableId", null),
                n("draggables", s, void 0)
            }
            )
        }
    }
      , v = ({id: s, node: d, layout: f, data: E})=>{
        const b = r.droppables[s]
          , g = {
            id: s,
            node: d,
            layout: f,
            data: E,
            _pendingCleanup: !1
        };
        b || Object.defineProperties(g, {
            transformers: {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            },
            transform: {
                enumerable: !0,
                configurable: !0,
                get: ()=>{
                    const k = Object.values(r.droppables[s].transformers);
                    return k.sort((A,N)=>A.order - N.order),
                    k.reduce((A,N)=>N.callback(A), W())
                }
            },
            transformed: {
                enumerable: !0,
                configurable: !0,
                get: ()=>he(r.droppables[s].layout, r.droppables[s].transform)
            }
        }),
        n("droppables", s, g),
        r.active.draggable && x()
    }
      , y = s=>{
        !P(()=>r.droppables[s]) || (n("droppables", s, "_pendingCleanup", !0),
        queueMicrotask(()=>m(s)))
    }
      , m = s=>{
        if (r.droppables[s]?._pendingCleanup) {
            const d = r.active.droppableId === s;
            q(()=>{
                d && n("active", "droppableId", null),
                n("droppables", s, void 0)
            }
            )
        }
    }
      , _ = ({id: s, activators: d})=>{
        n("sensors", s, {
            id: s,
            activators: d,
            coordinates: {
                origin: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                },
                get delta() {
                    return {
                        x: r.sensors[s].coordinates.current.x - r.sensors[s].coordinates.origin.x,
                        y: r.sensors[s].coordinates.current.y - r.sensors[s].coordinates.origin.y
                    }
                }
            }
        })
    }
      , S = s=>{
        if (!P(()=>r.sensors[s]))
            return;
        const d = r.active.sensorId === s;
        q(()=>{
            d && n("active", "sensorId", null),
            n("sensors", s, void 0)
        }
        )
    }
      , D = ({node: s, layout: d})=>{
        const f = r.active.overlay
          , E = {
            node: s,
            layout: d
        };
        f || Object.defineProperties(E, {
            id: {
                enumerable: !0,
                configurable: !0,
                get: ()=>r.active.draggable?.id
            },
            data: {
                enumerable: !0,
                configurable: !0,
                get: ()=>r.active.draggable?.data
            },
            transformers: {
                enumerable: !0,
                configurable: !0,
                get: ()=>Object.fromEntries(Object.entries(r.active.draggable ? r.active.draggable.transformers : {}).filter(([b])=>b !== "addDraggable-existing-offset"))
            },
            transform: {
                enumerable: !0,
                configurable: !0,
                get: ()=>{
                    const b = Object.values(r.active.overlay ? r.active.overlay.transformers : []);
                    return b.sort((g,k)=>g.order - k.order),
                    b.reduce((g,k)=>k.callback(g), W())
                }
            },
            transformed: {
                enumerable: !0,
                configurable: !0,
                get: ()=>r.active.overlay ? he(r.active.overlay.layout, r.active.overlay.transform) : new ue({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                })
            }
        }),
        n("active", "overlay", E)
    }
      , T = ()=>n("active", "overlay", null)
      , h = (s,d)=>{
        q(()=>{
            n("sensors", s, "coordinates", {
                origin: {
                    ...d
                },
                current: {
                    ...d
                }
            }),
            n("active", "sensorId", s)
        }
        )
    }
      , j = s=>{
        const d = r.active.sensorId;
        !d || n("sensors", d, "coordinates", "current", {
            ...s
        })
    }
      , B = ()=>n("active", "sensorId", null)
      , M = (s,d)=>{
        const f = {};
        for (const b of Object.values(r.sensors))
            if (b)
                for (const [g,k] of Object.entries(b.activators))
                    f[g] ??= [],
                    f[g].push({
                        sensor: b,
                        activator: k
                    });
        const E = {};
        for (const b in f) {
            let g = b;
            d && (g = `on${b}`),
            E[g] = k=>{
                for (const {activator: A} of f[b]) {
                    if (r.active.sensor)
                        break;
                    A(k, s)
                }
            }
        }
        return E
    }
      , x = ()=>{
        let s = !1;
        const d = Object.values(r.draggables)
          , f = Object.values(r.droppables)
          , E = r.active.overlay;
        return q(()=>{
            const b = new WeakMap;
            for (const g of d)
                if (g) {
                    const k = g.layout;
                    b.has(g.node) || b.set(g.node, ae(g.node));
                    const A = b.get(g.node);
                    ve(k, A) || (n("draggables", g.id, "layout", A),
                    s = !0)
                }
            for (const g of f)
                if (g) {
                    const k = g.layout;
                    b.has(g.node) || b.set(g.node, ae(g.node));
                    const A = b.get(g.node);
                    ve(k, A) || (n("droppables", g.id, "layout", A),
                    s = !0)
                }
            if (E) {
                const g = E.layout
                  , k = ae(E.node);
                ve(g, k) || (n("active", "overlay", "layout", k),
                s = !0)
            }
        }
        ),
        s
    }
      , I = ()=>{
        const s = r.active.overlay ?? r.active.draggable;
        if (s) {
            const d = t.collisionDetector(s, Object.values(r.droppables), {
                activeDroppableId: r.active.droppableId
            })
              , f = d ? d.id : null;
            r.active.droppableId !== f && n("active", "droppableId", f)
        }
    }
      , K = s=>{
        const d = {
            id: "sensorMove",
            order: 0,
            callback: f=>r.active.sensor ? {
                x: f.x + r.active.sensor.coordinates.delta.x,
                y: f.y + r.active.sensor.coordinates.delta.y
            } : f
        };
        x(),
        q(()=>{
            n("active", "draggableId", s),
            a("draggables", s, d)
        }
        ),
        I()
    }
      , z = ()=>{
        const s = P(()=>r.active.draggableId);
        q(()=>{
            s !== null && o("draggables", s, "sensorMove"),
            n("active", ["draggableId", "droppableId"], null)
        }
        ),
        x()
    }
      , te = s=>{
        R(()=>{
            const d = r.active.draggable;
            d && P(()=>s({
                draggable: d
            }))
        }
        )
    }
      , fe = s=>{
        R(()=>{
            const d = r.active.draggable;
            if (d) {
                const f = P(()=>r.active.overlay);
                Object.values(f ? f.transform : d.transform),
                P(()=>s({
                    draggable: d,
                    overlay: f
                }))
            }
        }
        )
    }
      , Ce = s=>{
        R(()=>{
            const d = r.active.draggable
              , f = r.active.droppable;
            d && P(()=>s({
                draggable: d,
                droppable: f,
                overlay: r.active.overlay
            }))
        }
        )
    }
      , ge = s=>{
        R(({previousDraggable: d, previousDroppable: f, previousOverlay: E})=>{
            const b = r.active.draggable
              , g = b ? r.active.droppable : null
              , k = b ? r.active.overlay : null;
            return !b && d && P(()=>s({
                draggable: d,
                droppable: f,
                overlay: E
            })),
            {
                previousDraggable: b,
                previousDroppable: g,
                previousOverlay: k
            }
        }
        , {
            previousDraggable: null,
            previousDroppable: null,
            previousOverlay: null
        })
    }
    ;
    fe(()=>I()),
    t.onDragStart && te(t.onDragStart),
    t.onDragMove && fe(t.onDragMove),
    t.onDragOver && Ce(t.onDragOver),
    t.onDragEnd && ge(t.onDragEnd);
    const ot = [r, {
        addTransformer: a,
        removeTransformer: o,
        addDraggable: l,
        removeDraggable: i,
        addDroppable: v,
        removeDroppable: y,
        addSensor: _,
        removeSensor: S,
        setOverlay: D,
        clearOverlay: T,
        recomputeLayouts: x,
        detectCollisions: I,
        draggableActivators: M,
        sensorStart: h,
        sensorMove: j,
        sensorEnd: B,
        dragStart: K,
        dragEnd: z,
        onDragStart: te,
        onDragMove: fe,
        onDragOver: Ce,
        onDragEnd: ge
    }];
    return p(Ye.Provider, {
        value: ot,
        get children() {
            return t.children
        }
    })
}
  , ee = ()=>Be(Ye) || null
  , _t = (e="pointer-sensor")=>{
    const [t,{addSensor: r, removeSensor: n, sensorStart: a, sensorMove: o, sensorEnd: l, dragStart: i, dragEnd: c}] = ee()
      , v = 250
      , y = 10;
    X(()=>{
        r({
            id: e,
            activators: {
                pointerdown: T
            }
        })
    }
    ),
    Q(()=>{
        n(e)
    }
    );
    const m = ()=>t.active.sensorId === e
      , _ = {
        x: 0,
        y: 0
    };
    let S = null
      , D = null;
    const T = (I,K)=>{
        I.button === 0 && (document.addEventListener("pointermove", B),
        document.addEventListener("pointerup", M),
        D = K,
        _.x = I.clientX,
        _.y = I.clientY,
        S = window.setTimeout(j, v))
    }
      , h = ()=>{
        S && (clearTimeout(S),
        S = null),
        document.removeEventListener("pointermove", B),
        document.removeEventListener("pointerup", M),
        document.removeEventListener("selectionchange", x)
    }
      , j = ()=>{
        t.active.sensor ? m() || h() : (a(e, _),
        i(D),
        x(),
        document.addEventListener("selectionchange", x))
    }
      , B = I=>{
        const K = {
            x: I.clientX,
            y: I.clientY
        };
        if (!t.active.sensor) {
            const z = {
                x: K.x - _.x,
                y: K.y - _.y
            };
            Math.sqrt(z.x ** 2 + z.y ** 2) > y && j()
        }
        m() && (I.preventDefault(),
        o(K))
    }
      , M = I=>{
        h(),
        m() && (I.preventDefault(),
        c(),
        l())
    }
      , x = ()=>{
        window.getSelection()?.removeAllRanges()
    }
}
  , Ge = e=>(_t(),
it(()=>e.children))
  , Ie = e=>({
    transform: `translate3d(${e.x}px, ${e.y}px, 0)`
})
  , At = (e,t={})=>{
    const [r,{addDraggable: n, removeDraggable: a, draggableActivators: o}] = ee()
      , [l,i] = $(null);
    X(()=>{
        const m = l();
        m && n({
            id: e,
            node: m,
            layout: ae(m),
            data: t
        })
    }
    ),
    Q(()=>a(e));
    const c = ()=>r.active.draggableId === e
      , v = ()=>r.draggables[e]?.transform || W();
    return Object.defineProperties((m,_)=>{
        const S = _ ? _() : {};
        R(()=>{
            const D = l()
              , T = o(e);
            if (D)
                for (const h in T)
                    D.addEventListener(h, T[h]);
            Q(()=>{
                if (D)
                    for (const h in T)
                        D.removeEventListener(h, T[h])
            }
            )
        }
        ),
        i(m),
        S.skipTransform || R(()=>{
            const D = v();
            if (Ae(D, W()))
                m.style.removeProperty("transform");
            else {
                const T = Ie(v());
                m.style.setProperty("transform", T.transform ?? null)
            }
        }
        )
    }
    , {
        ref: {
            enumerable: !0,
            value: i
        },
        isActiveDraggable: {
            enumerable: !0,
            get: c
        },
        dragActivators: {
            enumerable: !0,
            get: ()=>o(e, !0)
        },
        transform: {
            enumerable: !0,
            get: v
        }
    })
}
  , It = (e,t={})=>{
    const [r,{addDroppable: n, removeDroppable: a}] = ee()
      , [o,l] = $(null);
    X(()=>{
        const y = o();
        y && n({
            id: e,
            node: y,
            layout: ae(y),
            data: t
        })
    }
    ),
    Q(()=>a(e));
    const i = ()=>r.active.droppableId === e
      , c = ()=>r.droppables[e]?.transform || W();
    return Object.defineProperties((y,m)=>{
        const _ = m ? m() : {};
        l(y),
        _.skipTransform || R(()=>{
            const S = c();
            if (Ae(S, W()))
                y.style.removeProperty("transform");
            else {
                const D = Ie(c());
                y.style.setProperty("transform", D.transform ?? null)
            }
        }
        )
    }
    , {
        ref: {
            enumerable: !0,
            value: l
        },
        isActiveDroppable: {
            enumerable: !0,
            get: i
        },
        transform: {
            enumerable: !0,
            get: c
        }
    })
}
  , Ct = (e,t,r)=>{
    const n = e.slice();
    return n.splice(r, 0, ...n.splice(t, 1)),
    n
}
  , Je = Me()
  , Qe = e=>{
    const [t] = ee()
      , [r,n] = He({
        initialIds: [],
        sortedIds: []
    })
      , a = i=>i >= 0 && i < r.initialIds.length;
    R(()=>{
        n("initialIds", [...e.ids]),
        n("sortedIds", [...e.ids])
    }
    ),
    R(()=>{
        t.active.draggableId && t.active.droppableId ? P(()=>{
            const i = r.sortedIds.indexOf(t.active.draggableId)
              , c = r.initialIds.indexOf(t.active.droppableId);
            if (!a(i) || !a(c))
                n("sortedIds", [...e.ids]);
            else if (i !== c) {
                const v = Ct(r.sortedIds, i, c);
                n("sortedIds", v)
            }
        }
        ) : n("sortedIds", [...e.ids])
    }
    );
    const l = [r, {}];
    return p(Je.Provider, {
        value: l,
        get children() {
            return e.children
        }
    })
}
  , St = ()=>Be(Je) || null
  , Et = (e,t)=>r=>{
    e(r),
    t(r)
}
  , Ze = (e,t={})=>{
    const [r,{addTransformer: n, removeTransformer: a}] = ee()
      , [o] = St()
      , l = At(e, t)
      , i = It(e, t)
      , c = Et(l.ref, i.ref)
      , v = ()=>o.initialIds.indexOf(e)
      , y = ()=>o.sortedIds.indexOf(e)
      , m = h=>r.droppables[h]?.layout || null
      , _ = ()=>{
        const h = W()
          , j = v()
          , B = y();
        if (B !== j) {
            const M = m(e)
              , x = m(o.initialIds[B]);
            M && x && (h.x = x.x - M.x,
            h.y = x.y - M.y)
        }
        return h
    }
      , S = {
        id: "sortableOffset",
        order: 100,
        callback: h=>{
            const j = _();
            return {
                x: h.x + j.x,
                y: h.y + j.y
            }
        }
    };
    X(()=>n("droppables", e, S)),
    Q(()=>a("droppables", e, S.id));
    const D = ()=>(e === r.active.draggableId && !r.active.overlay ? r.draggables[e]?.transform : r.droppables[e]?.transform) || W();
    return Object.defineProperties(h=>{
        l(h, ()=>({
            skipTransform: !0
        })),
        i(h, ()=>({
            skipTransform: !0
        })),
        R(()=>{
            const j = D();
            if (Ae(j, W()))
                h.style.removeProperty("transform");
            else {
                const B = Ie(D());
                h.style.setProperty("transform", B.transform ?? null)
            }
        }
        )
    }
    , {
        ref: {
            enumerable: !0,
            value: c
        },
        transform: {
            enumerable: !0,
            get: D
        },
        isActiveDraggable: {
            enumerable: !0,
            get: ()=>l.isActiveDraggable
        },
        dragActivators: {
            enumerable: !0,
            get: ()=>l.dragActivators
        },
        isActiveDroppable: {
            enumerable: !0,
            get: ()=>i.isActiveDroppable
        }
    })
}
;
function et(e) {
    const t = e.key.toLowerCase();
    if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        if (t === "r")
            e.preventDefault(),
            Array.from(u())[0].reload();
        else if (t === "d")
            e.preventDefault(),
            Array.from(u())[0].bookmark();
        else if (t === "u")
            e.preventDefault(),
            new O(`view-source:${Array.from(u())[0].url()}`,!0);
        else if (t === "e") {
            e.preventDefault();
            const r = document.querySelector("#url_bar");
            r?.focus(),
            r?.select(),
            Array.from(u())[0].search = Array.from(u())[0].search() !== !1 ? Array.from(u())[0].search : ""
        }
    } else
        !e.ctrlKey && !e.shiftKey && e.altKey && !e.metaKey ? t === "t" ? (e.preventDefault(),
        new O("about:newTab",!0)) : t === "w" ? (e.preventDefault(),
        Array.from(u())[0].close()) : t === "ArrowLeft" ? (e.preventDefault(),
        Array.from(u())[0].goBack()) : t === "ArrowRight" && (e.preventDefault(),
        Array.from(u())[0].goForward()) : e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey && (t === "i" ? (e.preventDefault(),
        Array.from(u())[0].setDevTools()) : t === "b" && (e.preventDefault(),
        Ne(!me()),
        localStorage.setItem("preferences", JSON.stringify(Object.assign(ke(), {
            ["bookmarks.shown"]: me()
        })))))
}
function Ot(e) {
    const t = tt(e.target);
    t && t.href && (e.ctrlKey ? J(e, t.href, !1, !1) : e.shiftKey ? J(e, t.href, !0, !1) : t.target === "_blank" ? J(e, t.href, !1, !0) : (t.target === "_parent" || t.target === "_top") && Pe(e, t.href))
}
function J(e, t, r, n) {
    e && e.preventDefault();
    const a = JSON.parse(localStorage.getItem("preferences") || "{}");
    r && !a["general.tabs.openWindowLinksInTab"] ? window.open(`${location.origin}?url=${encodeURIComponent(t)}`) : new O(t,a["general.tabs.switchToMedia"] || n)
}
function Pe(e, t) {
    e.preventDefault(),
    Array.from(u())[0].navigate(t)
}
function tt(e) {
    if (!e)
        return;
    const t = e;
    return t.tagName === "A" ? t : t.parentElement ? tt(t.parentElement) : void 0
}
const Tt = L('<div class="w-full hover:bg-[#52525E] text-white text-[11px] px-2 py-1 cursor-default select-none"></div>');
function jt(e) {
    return (()=>{
        const t = Tt.cloneNode(!0);
        return Re(t, "click", e.onClick, !0),
        C(t, ()=>e.text),
        t
    }
    )()
}
Y(["click"]);
const Pt = L('<div id="context-menu"></div>')
  , Lt = L('<hr class="border-[#b5b5b5] my-1">')
  , [Bt,Mt] = $(0)
  , [Nt,Rt] = $(0)
  , [Wt,Kt] = $(0)
  , [qt,Ft] = $(0)
  , [Ut,G] = $(!1)
  , [zt,Ht] = $([]);
function rt(e) {
    const t = e instanceof HTMLIFrameElement ? e.contentWindow : e;
    !t || (t.addEventListener("visibilitychange", ()=>{
        G(!1)
    }
    ),
    t.addEventListener("mousemove", r=>{
        let n = 0
          , a = 0;
        if (e instanceof HTMLIFrameElement) {
            const o = e.getBoundingClientRect();
            n = o.left,
            a = o.top
        }
        Mt(r.clientX + n),
        Rt(r.clientY + a)
    }
    ),
    t.addEventListener("contextmenu", r=>{
        if (r.preventDefault(),
        r.data) {
            G(!0),
            Ht(r.data);
            let n = document.querySelector("#context-menu")?.offsetWidth
              , a = document.querySelector("#context-menu")?.offsetHeight
              , o = Bt()
              , l = Nt();
            n && o > window.innerWidth - n && (o -= n),
            a && l > window.innerHeight - a && (l -= a),
            Kt(o),
            Ft(l)
        } else
            G(!1)
    }
    ),
    t.addEventListener("click", ()=>{
        G(!1)
    }
    ),
    t.addEventListener("keydown", r=>{
        G(!1)
    }
    ))
}
function Xt() {
    X(()=>{
        rt(window)
    }
    );
    function e(t) {
        t.preventDefault(),
        t.stopPropagation()
    }
    return (()=>{
        const t = Pt.cloneNode(!0);
        return t.$$click = e,
        t.$$contextmenu = e,
        C(t, p($e, {
            get each() {
                return zt()
            },
            children: r=>r.separator ? Lt.cloneNode(!0) : p(jt, {
                get text() {
                    return r.text
                },
                onClick: ()=>{
                    G(!1),
                    r.onClick()
                }
            })
        })),
        Z(r=>{
            const n = `fixed ${Ut() ? "display" : "hidden"} w-48 bg-[#2B2A33] shadow-lg rounded border border-[#b5b5b5] py-1`
              , a = `left: ${Wt()}px; top: ${qt()}px;`;
            return n !== r._v$ && F(t, r._v$ = n),
            r._v$2 = We(t, a, r._v$2),
            r
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        t
    }
    )()
}
Y(["contextmenu", "click"]);
class w {
    #t;
    #r;
    #e;
    constructor(t) {
        if ("separator"in t) {
            this.#e = t.separator;
            return
        }
        this.#t = t.text,
        this.#r = t.onClick
    }
    get text() {
        return this.#t
    }
    get onClick() {
        return this.#r
    }
    get separator() {
        return this.#e
    }
}
function Yt(e) {
    const t = [];
    xe(e, "a") && t.push(new w({
        text: "Open link in new tab",
        onClick: ()=>{
            J(void 0, ne(e, "href"), !0, !1)
        }
    }), new w({
        text: "Copy link address",
        onClick: ()=>{
            navigator.clipboard.writeText(ne(e, "href"))
        }
    }), new w({
        separator: !0
    })),
    xe(e, "img") && t.push(new w({
        text: "Open image in new tab",
        onClick: ()=>{
            J(void 0, ne(e, "src"), !0, !1)
        }
    }), new w({
        text: "Copy image address",
        onClick: ()=>{
            navigator.clipboard.writeText(ne(e, "src"))
        }
    }), new w({
        separator: !0
    }));
    const r = Array.from(u())[0].iframe.contentWindow?.getSelection()?.toString();
    return r && t.push(new w({
        text: "Copy",
        onClick: ()=>{
            navigator.clipboard.writeText(r)
        }
    }), new w({
        separator: !0
    })),
    t.length === 0 && t.push(new w({
        text: "Back",
        onClick: ()=>{
            Array.from(u())[0].goBack()
        }
    }), new w({
        text: "Forward",
        onClick: ()=>{
            Array.from(u())[0].goForward()
        }
    }), new w({
        text: "Reload",
        onClick: ()=>{
            Array.from(u())[0].reload()
        }
    }), new w({
        separator: !0
    })),
    t.push(new w({
        text: "View Page Source",
        onClick: ()=>{
            new O("view-source:" + Array.from(u())[0].url(),!0)
        }
    }), new w({
        text: "Inspect",
        onClick: ()=>{
            Array.from(u())[0].setDevTools(!0)
        }
    })),
    t
}
function xe(e, t) {
    return e.tagName.toLowerCase() === t ? !0 : e.parentElement ? xe(e.parentElement, t) : !1
}
function ne(e, t) {
    return e[t] ? e[t] : e.parentElement ? ne(e.parentElement, t) : ""
}
class O {
    iframe = document.createElement("iframe");
    id = Math.floor(Math.random() * 1e15);
    #t = $(!1);
    #r = $(!1);
    #e = $("");
    #n = $("");
    #o = $(!1);
    #a = $("");
    #s = $(!1);
    #i = $(!0);
    #l = $(!1);
    #c = 0;
    constructor(t, r) {
        this.iframe.classList.add("w-full", "h-full", "border-0"),
        r || this.iframe.classList.add("hidden"),
        document.querySelector("#content")?.appendChild(this.iframe),
        this.#d(),
        this.navigate(t || "about:newTab"),
        requestAnimationFrame(this.#u.bind(this)),
        pe([...U(), this]),
        r ? (this.focus = !0,
        ie(new Set([this, ...u()]))) : ie(new Set([...u(), this]))
    }
    goBack() {
        this.iframe.contentWindow?.history.back()
    }
    goForward() {
        this.iframe.contentWindow?.history.forward()
    }
    pin() {}
    reload() {
        this.iframe.contentWindow?.location.reload()
    }
    stop() {
        this.loading = !1,
        this.iframe.contentWindow?.stop()
    }
    navigate(t) {
        let r = gt(t);
        this.iframe.onload = ()=>{
            this.loading = !1
        }
        ,
        this.iframe.src = r
    }
    close(t) {
        t && t.stopPropagation(),
        U().length === 1 && new O("about:newTab",!0),
        this.#f(),
        ie(new Set(Array.from(u()).filter(r=>r !== this))),
        pe(U().filter(r=>r !== this)),
        Array.from(u())[0].focus = !0
    }
    bookmark() {
        new lt({
            name: this.#e[0](),
            url: this.#n[0](),
            icon: this.#a[0]()
        })
    }
    executeScript(t) {
        return this.iframe.contentWindow?.window.eval(t)
    }
    setDevTools(t) {
        const r = this.iframe.contentWindow;
        if (!r.eruda) {
            const a = document.createElement("script");
            a.src = "https://cdn.jsdelivr.net/npm/eruda",
            a.onload = ()=>{
                this.setDevTools(t)
            }
            ,
            this.iframe.contentDocument?.body.appendChild(a);
            return
        }
        r.eruda._isInit || r.eruda.init();
        const n = r.eruda._entryBtn._$el[0].cloneNode(!0);
        n.style.display = "none",
        r.eruda._entryBtn._$el[0].parentElement.replaceChild(n, r.eruda._entryBtn._$el[0]),
        n.onclick = ()=>{
            n.style.display = "none",
            r.eruda.hide()
        }
        ,
        r.eruda._entryBtn._$el[0] = n,
        t ? (n.style.display = "flex",
        r.eruda.show()) : t !== void 0 || r.eruda._shadowRoot.querySelector(".eruda-dev-tools").style.display !== "none" ? (n.style.display = "none",
        r.eruda.hide()) : (n.style.display = "flex",
        r.eruda.show())
    }
    #f() {
        document.querySelector("#content")?.removeChild(this.iframe)
    }
    #d() {
        this.iframe.contentWindow?.addEventListener("keydown", et),
        this.iframe.contentWindow?.addEventListener("click", Ot),
        (this.iframe.contentWindow || {}).open = t=>new O(t,!0).iframe.contentWindow,
        (this.iframe.contentWindow || {}).close = ()=>{
            this.close()
        }
        ,
        this.iframe.contentWindow?.addEventListener("unload", ()=>{
            setTimeout(()=>{
                this.#d()
            }
            ),
            this.loading = !0
        }
        ),
        this.iframe.contentWindow?.addEventListener("wheel", ()=>{
            setTimeout(()=>{
                this.#c = this.iframe.contentDocument?.documentElement.scrollTop || 0
            }
            )
        }
        ),
        this.iframe.contentWindow?.addEventListener("contextmenu", t=>{
            t.target && (t.data = Yt(t.target))
        }
        ),
        this.iframe.contentWindow?.addEventListener("load", ()=>{
            this.setDevTools(!1)
        }
        ),
        rt(this.iframe)
    }
    #u() {
        this.#n[1](Ke(this.iframe.contentWindow?.__uv$location?.toString() || this.iframe.src)),
        this.title = this.iframe.contentDocument?.title || this.#n[0]();
        const t = this.iframe.contentDocument?.head.querySelectorAll("link[rel='favicon'], link[rel='shortcut icon'], link[rel='icon']")
          , r = t?.[t.length - 1]?.href;
        r && /^data:/.test(r) ? this.icon = r : r ? this.icon = r : this.icon = "/icons/earth.svg";
        const n = Array.from(this.iframe.contentDocument?.querySelectorAll("audio, video") ?? []);
        this.playing = n.some(a=>!a.paused && !a.muted),
        setTimeout(this.#u.bind(this), 100)
    }
    get url() {
        return this.#n[0]
    }
    set focus(t) {
        t && (U().forEach(r=>{
            r.focus = !1,
            r.iframe.classList.add("hidden")
        }
        ),
        ie(new Set([this, ...u()])),
        this.iframe.classList.remove("hidden"),
        (this.iframe.contentDocument || {
            documentElement: {}
        }).documentElement.scrollTop = this.#c),
        this.#s[1](t)
    }
    get focus() {
        return this.#s[0]
    }
    get search() {
        return this.#o[0]
    }
    set search(t) {
        this.#o[1](t)
    }
    get pinned() {
        return this.#t[0]
    }
    set pinned(t) {
        this.#t[1](t)
    }
    get title() {
        return this.#e[0]
    }
    set title(t) {
        this.#e[1](t)
    }
    get icon() {
        return this.#a[0]
    }
    set icon(t) {
        this.#a[1](t)
    }
    get loading() {
        return this.#i[0]
    }
    set loading(t) {
        this.#i[1](t)
    }
    get playing() {
        return this.#l[0]
    }
    set playing(t) {
        this.#l[1](t)
    }
    get small() {
        return this.#r[0]
    }
}
const Vt = L('<div class="w-full h-full bg-cover bg-no-repeat"></div>');
function nt(e) {
    const [t,r] = $(/^data:/.test(e.src()) ? void 0 : e.src());
    return R(()=>{
        const n = new AbortController;
        if (/^data:/.test(e.src()))
            return r(e.src());
        try {
            new URL(e.src())
        } catch {
            return
        }
        if (new URL(e.src()).origin === location.origin)
            return r(e.src());
        Te() || ct(new ht(new URL(window.__uv$config.bare,location.toString())));
        const a = (async()=>{
            const o = await Te().fetch(e.src(), {
                signal: n.signal
            })
              , l = URL.createObjectURL(await o.blob());
            return r(l),
            l
        }
        )();
        Q(()=>{
            n.abort(),
            a?.then(o=>URL.revokeObjectURL(o))
        }
        )
    }
    ),
    (()=>{
        const n = Vt.cloneNode(!0);
        return Z(a=>We(n, `background-image: url("${t()}")`, a)),
        n
    }
    )()
}
const Gt = L('<div class="w-4 h-4 overflow-hidden"><div class="loading-animation w-[960px] h-4 bg-white"></div></div>')
  , Jt = L("<div></div>")
  , Qt = L('<i class="text-[10px] fa-regular fa-volume mt-[2px]"></i>')
  , Zt = L('<div><div class="w-4 h-4"></div><div><p class="text-clip whitespace-nowrap w-full text-xs font-light" style="-webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);"></p></div><div><i class="fa-light fa-xmark text-[10px] mt-[2px] text-white"></i></div></div>');
function er(e) {
    const {sortable: t} = e;
    return (()=>{
        const r = Zt.cloneNode(!0)
          , n = r.firstChild
          , a = n.nextSibling
          , o = a.firstChild
          , l = a.nextSibling;
        return r.$$contextmenu = i=>{
            i.data = [new w({
                text: "New tab",
                onClick: ()=>{
                    new O("about:newTab",!0)
                }
            }), new w({
                separator: !0
            }), new w({
                text: "Reload",
                onClick: ()=>{
                    e.tab.reload()
                }
            }), new w({
                text: "Duplicate",
                onClick: ()=>{
                    new O(e.tab.url(),!0)
                }
            }), new w({
                separator: !0
            }), new w({
                text: "Close",
                onClick: ()=>{
                    e.tab.close()
                }
            })]
        }
        ,
        r.$$mousedown = ()=>{
            e.tab.focus = !0
        }
        ,
        De(t, r, ()=>!0),
        C(n, p(le, {
            get when() {
                return e.tab.loading()
            },
            get children() {
                return Gt.cloneNode(!0)
            }
        }), null),
        C(n, p(le, {
            get when() {
                return !e.tab.loading()
            },
            get children() {
                const i = Jt.cloneNode(!0);
                return C(i, p(nt, {
                    get src() {
                        return e.tab.icon
                    }
                })),
                Z(()=>F(i, `h-full w-full ${e.tab.small() && e.tab.focus() ? "hidden" : ""}`)),
                i
            }
        }), null),
        C(r, p(le, {
            get when() {
                return e.tab.playing()
            },
            get children() {
                return Qt.cloneNode(!0)
            }
        }), a),
        C(o, ()=>e.tab.title()),
        l.$$mousedown = i=>i.stopPropagation(),
        Re(l, "click", e.tab.close.bind(e.tab), !0),
        Z(i=>{
            const c = `text-white h-9 ${e.tab.focus() ? "bg-[#42414D]" : "hover:bg-[#35343A]"} ${e.tab.pinned() || e.tab.small() ? "" : "w-48"} p-2 pr-1 flex items-center gap-[5px] text-sm rounded shadow-inner-lg overflow-hidden`
              , v = `flex-1 overflow-hidden ${e.tab.small() || e.tab.pinned() ? "hidden" : ""}`
              , y = `h-6 w-6 flex items-center justify-center hover:bg-neutral-500 hover:bg-opacity-50 transition-all rounded ${e.tab.small() && !e.tab.focus() || e.tab.pinned() ? "hidden" : ""}`;
            return c !== i._v$ && F(r, i._v$ = c),
            v !== i._v$2 && F(a, i._v$2 = v),
            y !== i._v$3 && F(l, i._v$3 = y),
            i
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0
        }),
        r
    }
    )()
}
Y(["mousedown", "contextmenu", "click"]);
function at() {
    const [,{onDragStart: e, onDragEnd: t, addTransformer: r, removeTransformer: n}] = ee()
      , a = {
        id: "constrain-y-axis",
        order: 100,
        callback: o=>({
            ...o,
            y: 0
        })
    };
    return e(({draggable: o})=>{
        r("draggables", o.id, a)
    }
    ),
    t(({draggable: o})=>{
        n("draggables", o.id, a.id)
    }
    ),
    []
}
const tr = L('<div class="flex w-full bg-[#1C1B22]"><div class="flex w-full items-center h-11  px-[2px] cursor-default select-none gap-1"><div class="flex items-center justify-center"><div class="h-9 w-9 rounded hover:bg-[#52525E] text-white flex items-center justify-center"><i class="fa-regular fa-plus text-xs mt-[2px]"></i></div></div></div></div>');
function rr() {
    const e = ({draggable: n, droppable: a})=>{
        if (n.node.classList.remove("z-20"),
        n && a) {
            const o = U()
              , l = o.findIndex(c=>c.id === n.id)
              , i = o.findIndex(c=>c.id === a.id);
            if (l !== i) {
                const c = o.slice();
                c.splice(i, 0, ...c.splice(l, 1)),
                pe(c)
            }
        }
    }
      , t = ({draggable: n})=>n.node.classList.add("z-20");
    X(()=>{
        const a = new URLSearchParams(window.location.search).get("url")
          , o = JSON.parse(localStorage.getItem("tabs") || "[]");
        if (a)
            new O(a,!0),
            window.history.replaceState({}, document.title, "/");
        else if (o.length && ke()["general.startup.openPreviousTabs"]) {
            const l = parseInt(localStorage.getItem("activeTab") || "0");
            o.forEach(c=>{
                new O(c,!1)
            }
            );
            const i = Array.from(u())[l];
            i && (i.focus = !0)
        } else
            new O("about:newTab",!0)
    }
    );
    function r() {
        new O("about:newTab",!0)
    }
    return (()=>{
        const n = tr.cloneNode(!0)
          , a = n.firstChild
          , o = a.firstChild
          , l = o.firstChild;
        return C(a, p(Ve, {
            onDragEnd: e,
            onDragStart: t,
            collisionDetector: Xe,
            get children() {
                return [p(at, {}), p(Ge, {}), p(Qe, {
                    get ids() {
                        return U().map(i=>i.id)
                    },
                    get children() {
                        return p($e, {
                            get each() {
                                return U()
                            },
                            children: i=>{
                                const c = Ze(i.id);
                                return p(er, {
                                    sortable: c,
                                    tab: i
                                })
                            }
                        })
                    }
                })]
            }
        }), o),
        l.$$click = r,
        n
    }
    )()
}
Y(["click"]);
const nr = L('<div class="flex items-center gap-2 w-full h-10 bg-[#2B2A33] p-2 text-white"><div class="flex gap-1 items-center"><div><i class="fa-light fa-arrow-left mt-[2px]"></i></div><div><i class="fa-light fa-arrow-right mt-[2px]"></i></div><div class="h-8 w-8 rounded hover:bg-[#52525E] flex items-center justify-center"><i></i></div></div><div class="flex items-center flex-1 h-[32px] text-sm rounded bg-[#1C1B22]"><div class="flex h-8 w-8 rounded items-center justify-center mx-[2px]"><i class="fa-light fa-magnifying-glass mt-[2px]"></i></div><input id="url_bar" class="flex-1 flex items-center leading-8 h-full text-sm rounded bg-transparent focus:outline-none placeholder-[#B0B3B3]"></div><div class="flex gap-1 items-center"><div class="h-8 w-8 rounded hover:bg-[#6E6E79] flex items-center justify-center"><i class="fa-light fa-gear mt-[2px] text-sm"></i></div><a target="_blank" href="https://github.com/cohenerickson/Velocity"><div class="h-8 w-8 rounded hover:bg-[#6E6E79] flex items-center justify-center"><i class="fa-brands fa-github mt-[2px] text-sm"></i></div></a></div></div>');
function ar() {
    const [e,t] = $(!1)
      , [r,n] = $(!1);
    function a() {
        Array.from(u())[0]?.loading() ? Array.from(u())[0]?.stop() : (Array.from(u())[0].search = !1,
        Array.from(u())[0]?.reload())
    }
    function o() {
        Array.from(u())[0].search = !1,
        Array.from(u())[0]?.goForward()
    }
    function l() {
        Array.from(u())[0].search = !1,
        Array.from(u())[0]?.goBack()
    }
    function i(c) {
        c.addEventListener("keydown", v=>{
            v.key === "Enter" ? (v.preventDefault(),
            c.value && (Array.from(u())[0]?.navigate(c.value),
            Array.from(u())[0].search = !1,
            c.blur())) : v.key === "Escape" ? (Array.from(u())[0].search = !1,
            c.blur()) : setTimeout(()=>Array.from(u())[0].search = c.value, 0)
        }
        )
    }
    return (()=>{
        const c = nr.cloneNode(!0)
          , v = c.firstChild
          , y = v.firstChild
          , m = y.nextSibling
          , _ = m.nextSibling
          , S = _.firstChild
          , D = v.nextSibling
          , T = D.firstChild
          , h = T.nextSibling
          , j = D.nextSibling
          , B = j.firstChild;
        y.$$click = l,
        m.$$click = o,
        _.$$click = a;
        const M = i;
        return typeof M == "function" ? De(M, h) : i = h,
        B.$$click = ()=>{
            new O("about:preferences",!0)
        }
        ,
        Z(x=>{
            const I = `h-8 w-8 rounded ${e() ? "hover:bg-[#52525E]" : "text-[#95959E]"} flex items-center justify-center`
              , K = `h-8 w-8 rounded ${r() ? "hover:bg-[#52525E]" : "text-[#95959E]"} flex items-center justify-center`
              , z = `fa-light ${Array.from(u())[0]?.loading() ? "fa-xmark" : "fa-rotate-right"} mt-[2px]`
              , te = `Search with ${bt[ke()["search.defaults.searchEngine"] || "google"].name} or enter address`;
            return I !== x._v$ && F(y, x._v$ = I),
            K !== x._v$2 && F(m, x._v$2 = K),
            z !== x._v$3 && F(S, x._v$3 = z),
            te !== x._v$4 && dt(h, "placeholder", x._v$4 = te),
            x
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0
        }),
        Z(()=>h.value = Array.from(u())[0]?.search() !== !1 ? Array.from(u())[0]?.search() : Ke(Array.from(u())[0]?.url() || "")),
        c
    }
    )()
}
Y(["click"]);
const or = L('<div class="h-6 flex items-center gap-1 rounded hover:bg-[#60606e] cursor-default px-1 select-none"><div class="w-[15px] h-[15px]"></div></div>');
function sr(e) {
    const {sortable: t, bookmark: r} = e;
    function n(a) {
        /^javascript:/.test(r.url) ? Array.from(u())[0].executeScript(decodeURIComponent(r.url.replace(/^javascript:/, ""))) : a.ctrlKey ? new O(r.url,!1) : Array.from(u())[0].navigate(r.url)
    }
    return (()=>{
        const a = or.cloneNode(!0)
          , o = a.firstChild;
        return a.$$contextmenu = l=>{
            l.data = [new w({
                text: "Open in new tab",
                onClick: ()=>{
                    J(l, r.url, !1, !0)
                }
            }), new w({
                separator: !0
            }), new w({
                text: "Delete",
                onClick: ()=>{
                    r.delete()
                }
            }), new w({
                separator: !0
            })]
        }
        ,
        a.$$click = n,
        De(t, a, ()=>!0),
        C(o, p(nt, {
            get src() {
                return $(r.icon)[0]
            }
        })),
        C(a, ()=>r.name, null),
        a
    }
    )()
}
Y(["click", "contextmenu"]);
const ir = L('<div class="flex items-center h-7 w-full bg-[#2B2A33] text-white text-[11px] px-2 gap-2"></div>');
function lr() {
    const e = ({draggable: r, droppable: n})=>{
        if (r.node.classList.remove("z-20"),
        r && n) {
            const a = be()
              , o = a.findIndex(i=>i.id === r.id)
              , l = a.findIndex(i=>i.id === n.id);
            if (o !== l) {
                const i = a.slice();
                i.splice(l, 0, ...i.splice(o, 1)),
                ut(i)
            }
        }
    }
      , t = ({draggable: r})=>r.node.classList.add("z-20");
    return p(le, {
        get when() {
            return me()
        },
        get children() {
            const r = ir.cloneNode(!0);
            return r.$$contextmenu = n=>{
                n.data || (n.data = []),
                n.data.push(new w({
                    text: "Hide bookmarks",
                    onClick: ()=>{
                        Ne(!1)
                    }
                }))
            }
            ,
            C(r, p(Ve, {
                onDragEnd: e,
                onDragStart: t,
                collisionDetector: Xe,
                get children() {
                    return [p(at, {}), p(Ge, {}), p(Qe, {
                        get ids() {
                            return be().map(n=>n.id)
                        },
                        get children() {
                            return p($e, {
                                get each() {
                                    return be()
                                },
                                children: n=>{
                                    const a = Ze(n.id);
                                    return p(sr, {
                                        sortable: a,
                                        bookmark: n
                                    })
                                }
                            })
                        }
                    })]
                }
            })),
            r
        }
    })
}
Y(["contextmenu"]);
const cr = L('<main class="h-full flex flex-col"><div class="h-[0px] w-full border-b border-[#0C0C0D]"></div><main id="content" class="w-full bg-white flex-1"></main></main>');
function dr() {
    return X(async()=>{
        await je(()=>import("./registerSW.86cc5ffa.js"), []),
        await je(()=>import("./index.7bacaf5d.js"), ["assets/index.7bacaf5d.js", "assets/url.e5e1fed9.js", "assets/index.1640afea.js", "assets/index.c991f45b.css", "assets/BareClient.06787bc0.js"]),
        window.addEventListener("keydown", et),
        addEventListener("beforeunload", e=>{
            const t = JSON.parse(localStorage.getItem("preferences") || "{}");
            if (U().length > 1 && t["general.tabs.confirmBeforeClosing"])
                return e.preventDefault(),
                e.returnValue = "Confirm before closing multiple tabs"
        }
        , {
            capture: !0
        })
    }
    ),
    (()=>{
        const e = cr.cloneNode(!0)
          , t = e.firstChild;
        return C(e, p(ft, {
            children: "Velocity"
        }), t),
        C(e, p(rr, {}), t),
        C(e, p(ar, {}), t),
        C(e, p(lr, {}), t),
        C(e, p(Xt, {}), t),
        e
    }
    )()
}
const hr = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: dr
}, Symbol.toStringTag, {
    value: "Module"
}));
export {w as C, O as T, rt as b, hr as i};
