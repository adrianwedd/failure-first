import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_B7WDX-dJ.mjs';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/adrian/repos/failure-first/site/","cacheDir":"file:///Users/adrian/repos/failure-first/site/node_modules/.astro/","outDir":"file:///Users/adrian/repos/failure-first/docs/","srcDir":"file:///Users/adrian/repos/failure-first/site/src/","publicDir":"file:///Users/adrian/repos/failure-first/site/public/","buildClientDir":"file:///Users/adrian/repos/failure-first/docs/client/","buildServerDir":"file:///Users/adrian/repos/failure-first/docs/server/","adapterName":"","routes":[{"file":"file:///Users/adrian/repos/failure-first/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://adrianwedd.github.io","base":"/failure-first","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/adrian/repos/failure-first/site/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_HNaLpd_g.mjs","/Users/adrian/repos/failure-first/site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"assets/BaseLayout.astro_astro_type_script_index_0_lang.o6MBIgCh.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/adrian/repos/failure-first/site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","function g(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function m(){return Math.floor(new Date/(1e3*60*60*24))*1013}function w(e,t,n,o){const a=Math.ceil(t/60)+2,r=Math.ceil(n/(40*Math.sqrt(3)))+2;e.strokeStyle=\"rgba(0, 210, 255, 0.03)\",e.lineWidth=.5;for(let c=-1;c<r;c++)for(let d=-1;d<a;d++){const l=d*40*1.5,i=c*40*Math.sqrt(3)+(d%2===0?0:40*Math.sqrt(3)/2);o()>.7&&S(e,l,i,40)}}function S(e,t,n,o){e.beginPath();for(let h=0;h<6;h++){const a=Math.PI/3*h-Math.PI/2,r=t+o*Math.cos(a),c=n+o*Math.sin(a);h===0?e.moveTo(r,c):e.lineTo(r,c)}e.closePath(),e.stroke()}function f(e,t,n){e.strokeStyle=\"rgba(0, 210, 255, 0.02)\",e.lineWidth=1;for(let o=0;o<n;o+=4)e.beginPath(),e.moveTo(0,o),e.lineTo(t,o),e.stroke()}class p{constructor(t,n,o){this.x=t,this.y=n,this.phase=o()*Math.PI*2,this.period=8e3+o()*12e3,this.maxRadius=60+o()*40,this.color=o()>.7?\"rgba(255, 71, 87,\":\"rgba(0, 210, 255,\",this.birthTime=Date.now()}draw(t,n){const h=(n-this.birthTime)%this.period/this.period,a=Math.sin(h*Math.PI*2)*.5+.5,r=this.maxRadius*a,c=a*.08;t.strokeStyle=`${this.color} ${c})`,t.lineWidth=1,t.beginPath(),t.arc(this.x,this.y,r,0,Math.PI*2),t.stroke(),t.strokeStyle=`${this.color} ${c*.5})`,t.beginPath(),t.arc(this.x,this.y,r*.6,0,Math.PI*2),t.stroke()}}function y(){const e=document.getElementById(\"sensor-grid-bg\");if(!e)return;const t=e.getContext(\"2d\",{alpha:!0}),n=m(),o=g(n);function h(){const i=window.devicePixelRatio||1,s=e.getBoundingClientRect();return e.width=s.width*i,e.height=s.height*i,t.scale(i,i),{w:s.width,h:s.height}}const{w:a,h:r}=h(),c=3+Math.floor(o()*3),d=[];for(let i=0;i<c;i++){const s=o()*a,u=o()*r;d.push(new p(s,u,g(n+i*1013)))}w(t,a,r,o),f(t,a,r);function l(){const{w:i,h:s}=h();t.clearRect(0,0,e.width,e.height),w(t,i,s,o),f(t,i,s);const u=Date.now();for(const M of d)M.draw(t,u);requestAnimationFrame(l)}l(),window.addEventListener(\"resize\",()=>{const{w:i,h:s}=h();w(t,i,s,o),f(t,i,s)})}typeof document<\"u\"&&(document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",y):y());"]],"assets":["/failure-first/file:///Users/adrian/repos/failure-first/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"hnAspkZ5sN0LiZKpZKjVZsdMWtX0v+jfwZAtcYTnQAQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
