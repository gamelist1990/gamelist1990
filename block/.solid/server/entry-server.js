import { createComponent as createComponent$1, ssr } from 'solid-js/web';
import { getOwner, runWithOwner, createMemo, createContext, useContext, createComponent, children, on, createRoot, Show, createSignal, sharedConfig } from 'solid-js';
import '@tomphttp/bare-client';
import 'prismjs';

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    env: {},
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

function renderAsync(fn, options) {
  return () => async (event) => {
    {
      const getStaticHTML = event.env.getStaticHTML;
      return await getStaticHTML("/index");
    }
  };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function createMatcher(path, partial) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            if (segment[0] === ":") {
                match.params[segment.slice(1)] = locSegment;
            }
            else if (segment.localeCompare(locSegment, undefined, { sensitivity: "base" }) !== 0) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            match.params[splat] = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
        }
        return match;
    };
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useNavigate = () => useRouter().navigatorFactory();
const useLocation = () => useRouter().location;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createRouteContext(router, parent, child, match) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    const params = createMemoObject(() => match().params);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Routes = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i]);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent$1(Show, {
    get when() {
      return routeStates() && root;
    },
    children: route => createComponent$1(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent$1(Show, {
    get when() {
      return route.child;
    },
    children: child => createComponent$1(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};

createSignal([]);
createSignal(/* @__PURE__ */ new Set());
createSignal();
createSignal([]);
createSignal(true);
const [protocols, setProtocols] = createSignal([]);

class Protocol {
  #match;
  #domains = /* @__PURE__ */ new Map();
  #prefix;
  constructor(prefix) {
    this.#match = new RegExp(`^${prefix}:`);
    this.#prefix = prefix;
    setProtocols([...protocols(), this]);
  }
  register(domain, path) {
    this.#domains.set(domain, path);
  }
  find(query) {
    return this.#domains.get(query) || (this.#domains.get("*") ? `${this.#domains.get("*")}?q=${query}` : void 0);
  }
  reverse(path) {
    for (const [domain, p] of this.#domains) {
      let match = false;
      try {
        if (new URL(path).pathname === p)
          match = true;
      } catch {
      }
      if (p === path || match) {
        if (domain === "*") {
          try {
            return `${this.#prefix}:${new URL(path).searchParams.get("q")}`;
          } catch {
          }
        }
        return `${this.#prefix}:${domain}`;
      }
    }
  }
  get match() {
    return this.#match;
  }
}

const about = new Protocol("about");
about.register("blank", "about:blank");
about.register("newTab", "/internal/newTab");
about.register("preferences", "/internal/preferences");
const viewSource = new Protocol("view-source");
viewSource.register("*", "/internal/view-source");

createSignal(0);
createSignal(0);
createSignal(0);
createSignal(0);
createSignal(false);
createSignal([]);

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

createContext({});

createContext();
createContext();

Routes;
Outlet;
useLocation;
useNavigate;

const prismOneDark = '';

const root = '';

const api = [
  {
    GET: "skip",
    path: "/"
  },
  {
    GET: "skip",
    path: "/internal/newTab"
  },
  {
    GET: "skip",
    path: "/internal/view-source"
  },
  {
    GET: "skip",
    path: "/internal/preferences/General"
  },
  {
    GET: "skip",
    path: "/internal/preferences/"
  },
  {
    GET: "skip",
    path: "/internal/preferences/NavButton"
  },
  {
    GET: "skip",
    path: "/internal/preferences/Search"
  },
  {
    GET: "skip",
    path: "/internal/preferences/inputs/Dropdown"
  },
  {
    GET: "skip",
    path: "/internal/preferences/inputs/Toggle"
  }
];
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = route.path.endsWith("/") ? 4 : 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "fetch_event") {
            return event;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        let e = await _fn.call(ctx, ...args);
        return e;
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware([apiRoutes, inlineServerFunctions, ...exchanges]);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
ssr("<!DOCTYPE html>");

const entryServer = createHandler(renderAsync());

export { entryServer as default };
