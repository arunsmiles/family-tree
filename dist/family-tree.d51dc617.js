// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"hsGyZ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "06b291ed9d368ec5";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "46b762fad51dc617";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            if (err.message) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"CZVuU":[function(require,module,exports,__globalThis) {
// Main entry point for the Family Tree Visualization application
var _i18NJs = require("./i18n.js");
var _csvParserJs = require("./csvParser.js");
var _familyTreeBuilderJs = require("./familyTreeBuilder.js");
var _treeRendererJs = require("./treeRenderer.js");
var _configManagerJs = require("./configManager.js");
var _sampleDataJs = require("./sampleData.js");
// Debug logs flag - set to true to see debug messages
const DEBUG = true;
// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[App] ${message}`);
        if (data) console.log(data);
    }
}
// DOM elements
const fileInput = document.getElementById('csv-file');
const languageSelect = document.getElementById('language-select');
const loadSampleBtn = document.getElementById('load-sample');
const generateTreeBtn = document.getElementById('generate-tree');
const exportSvgBtn = document.getElementById('export-svg');
const resetViewBtn = document.getElementById('reset-view');
const visualizationContainer = document.getElementById('visualization-container');
// Application state
let familyData = null;
let familyTree = null;
let renderer = null;
let currentLanguage = 'en';
// Initialize the application
async function initApp() {
    debugLog('Initializing application');
    // Check if all DOM elements are found
    validateDOMElements();
    // Initialize internationalization
    await (0, _i18NJs.initI18n)();
    // Setup configuration options
    (0, _configManagerJs.setupConfig)();
    // Set initial language
    changeLanguage(currentLanguage);
    // Add event listeners
    addEventListeners();
    debugLog('Application initialized successfully');
    showStatusMessage('Application initialized. Please load data or sample to begin.', 'info');
}
// Validate that all required DOM elements exist
function validateDOMElements() {
    debugLog('Validating DOM elements');
    const requiredElements = [
        {
            id: 'csv-file',
            name: 'CSV File Input'
        },
        {
            id: 'language-select',
            name: 'Language Selector'
        },
        {
            id: 'load-sample',
            name: 'Load Sample Button'
        },
        {
            id: 'generate-tree',
            name: 'Generate Tree Button'
        },
        {
            id: 'export-svg',
            name: 'Export SVG Button'
        },
        {
            id: 'reset-view',
            name: 'Reset View Button'
        },
        {
            id: 'visualization-container',
            name: 'Visualization Container'
        }
    ];
    const missingElements = [];
    requiredElements.forEach((element)=>{
        const domElement = document.getElementById(element.id);
        if (!domElement) {
            missingElements.push(element.name);
            debugLog(`Missing DOM element: ${element.id}`);
        }
    });
    if (missingElements.length > 0) {
        const error = `Some required DOM elements were not found: ${missingElements.join(', ')}`;
        debugLog(error);
        console.error(error);
        // Try to show an error message even if the status container might be missing
        try {
            showStatusMessage(`Application initialization error: Missing DOM elements - ${missingElements.join(', ')}`, 'error');
        } catch (e) {
            // If showStatusMessage fails, create a basic error display
            const errorDiv = document.createElement('div');
            errorDiv.style.backgroundColor = '#ffebee';
            errorDiv.style.color = '#c62828';
            errorDiv.style.padding = '15px';
            errorDiv.style.margin = '15px';
            errorDiv.style.border = '1px solid #ef9a9a';
            errorDiv.style.borderRadius = '4px';
            errorDiv.textContent = error;
            // Try to add to the body or any available container
            const container = document.querySelector('.container') || document.body;
            container.prepend(errorDiv);
        }
        return false;
    }
    debugLog('All required DOM elements found');
    return true;
}
// Add event listeners to DOM elements
function addEventListeners() {
    debugLog('Setting up event listeners');
    // Language selection
    languageSelect.addEventListener('change', (e)=>{
        changeLanguage(e.target.value);
    });
    // File input
    fileInput.addEventListener('change', handleFileUpload);
    // Load sample data
    loadSampleBtn.addEventListener('click', loadSampleData);
    // Generate tree
    generateTreeBtn.addEventListener('click', generateFamilyTree);
    // Export SVG
    exportSvgBtn.addEventListener('click', exportSVG);
    // Reset view
    resetViewBtn.addEventListener('click', resetView);
}
// Handle CSV file upload
async function handleFileUpload(event) {
    debugLog('File upload initiated');
    const file = event.target.files[0];
    if (!file) {
        debugLog('No file selected');
        return;
    }
    debugLog('Processing file', {
        name: file.name,
        size: file.size,
        type: file.type
    });
    try {
        // Show loading indicator
        showStatusMessage('Parsing CSV file...', 'info');
        familyData = await (0, _csvParserJs.parseCSV)(file);
        debugLog('CSV data parsed successfully', {
            records: familyData.length
        });
        // Show success message
        showStatusMessage(`Successfully loaded ${familyData.length} records from CSV file.`, 'success');
        // Auto-generate tree when data is loaded
        generateFamilyTree();
    } catch (error) {
        debugLog('Error parsing CSV file', error);
        showStatusMessage('Error parsing CSV file: ' + error.message, 'error');
    }
}
// Load sample data
function loadSampleData() {
    debugLog('Loading sample data');
    try {
        familyData = (0, _sampleDataJs.sampleData);
        debugLog('Sample data loaded successfully', {
            records: familyData.length
        });
        // Show success message
        showStatusMessage(`Successfully loaded ${familyData.length} sample records.`, 'success');
        // Auto-generate tree when data is loaded
        generateFamilyTree();
    } catch (error) {
        debugLog('Error loading sample data', error);
        showStatusMessage('Error loading sample data: ' + error.message, 'error');
    }
}
// Generate the family tree visualization
function generateFamilyTree() {
    debugLog('Generate family tree requested');
    if (!familyData || familyData.length === 0) {
        debugLog('No family data available');
        showStatusMessage('Please upload a CSV file or load sample data first.', 'error');
        return;
    }
    try {
        // Show loading message
        showStatusMessage('Generating family tree...', 'info');
        // Clear previous visualization
        visualizationContainer.innerHTML = '';
        debugLog('Visualization container cleared');
        // Make sure the visualization container is visible
        visualizationContainer.style.display = 'block';
        visualizationContainer.style.minHeight = '500px';
        visualizationContainer.style.border = '1px solid #ccc';
        // Get configuration options
        const config = {
            orientation: document.getElementById('orientation').value,
            nodeSize: parseFloat(document.getElementById('node-size').value),
            nodeSpacing: parseFloat(document.getElementById('node-spacing').value),
            colorScheme: document.getElementById('color-scheme').value,
            fontSize: parseInt(document.getElementById('font-size').value),
            lineStyle: document.getElementById('line-style').value,
            svgWidth: parseInt(document.getElementById('svg-width').value),
            svgHeight: parseInt(document.getElementById('svg-height').value),
            language: currentLanguage
        };
        debugLog('Using configuration', config);
        // Build the family tree data structure
        debugLog('Building family tree');
        try {
            familyTree = (0, _familyTreeBuilderJs.buildFamilyTree)(familyData);
            debugLog('Family tree built successfully', {
                individuals: familyTree.individuals.length,
                generations: familyTree.generations
            });
        } catch (error) {
            debugLog('Error building family tree', error);
            showStatusMessage('Error building family tree: ' + error.message, 'error');
            return;
        }
        // Render the family tree
        debugLog('Rendering family tree');
        try {
            renderer = (0, _treeRendererJs.renderFamilyTree)(familyTree, visualizationContainer, config);
            debugLog('Family tree rendered successfully');
            // Show success message
            showStatusMessage('Family tree generated successfully.', 'success');
            // Scroll to visualization
            visualizationContainer.scrollIntoView({
                behavior: 'smooth'
            });
        } catch (error) {
            debugLog('Error rendering family tree', error);
            showStatusMessage('Error rendering family tree: ' + error.message, 'error');
        }
    } catch (error) {
        debugLog('Error generating family tree', error);
        showStatusMessage('Error generating family tree: ' + error.message, 'error');
    }
}
// Export the SVG
function exportSVG() {
    if (!renderer) {
        alert('Please generate a family tree first.');
        return;
    }
    try {
        renderer.exportSVG();
    } catch (error) {
        console.error('Error exporting SVG:', error);
        alert('Error exporting SVG: ' + error.message);
    }
}
// Reset the view
function resetView() {
    if (renderer) renderer.resetView();
}
// Change the application language
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    // Update text content based on selected language
    (0, _i18NJs.translate)();
    // Update class for language-specific styling
    document.body.classList.remove('tamil');
    if (lang === 'ta') document.body.classList.add('tamil');
    // If tree is already rendered, update it
    if (renderer && familyTree) renderer.updateLanguage(lang);
}
// Show status messages to the user
function showStatusMessage(message, type = 'info') {
    // Create status container if it doesn't exist
    let statusContainer = document.getElementById('status-container');
    if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.id = 'status-container';
        statusContainer.style.marginTop = '10px';
        statusContainer.style.padding = '10px';
        statusContainer.style.borderRadius = '4px';
        statusContainer.style.fontWeight = 'bold';
        // Insert after file input
        const inputSection = document.querySelector('.input-section');
        inputSection.appendChild(statusContainer);
    }
    // Set message and style based on type
    statusContainer.textContent = message;
    // Style based on message type
    if (type === 'error') {
        statusContainer.style.backgroundColor = '#ffebee';
        statusContainer.style.color = '#c62828';
        statusContainer.style.border = '1px solid #ef9a9a';
    } else if (type === 'success') {
        statusContainer.style.backgroundColor = '#e8f5e9';
        statusContainer.style.color = '#2e7d32';
        statusContainer.style.border = '1px solid #a5d6a7';
    } else {
        statusContainer.style.backgroundColor = '#e3f2fd';
        statusContainer.style.color = '#1565c0';
        statusContainer.style.border = '1px solid #90caf9';
    }
    // Scroll to message
    statusContainer.scrollIntoView({
        behavior: 'smooth'
    });
}
// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

},{"./i18n.js":"cf9IZ","./csvParser.js":"aN9wh","./familyTreeBuilder.js":"aFvtd","./treeRenderer.js":"9Op1N","./configManager.js":"li9ym","./sampleData.js":"c3T5N"}],"cf9IZ":[function(require,module,exports,__globalThis) {
// Internationalization module for the Family Tree Visualization application
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Initialize i18next
parcelHelpers.export(exports, "initI18n", ()=>initI18n);
// Translate all elements with translation keys
parcelHelpers.export(exports, "translate", ()=>translate);
// Get translation for a key
parcelHelpers.export(exports, "t", ()=>t);
// Get current language
parcelHelpers.export(exports, "getCurrentLanguage", ()=>getCurrentLanguage);
// Change language
parcelHelpers.export(exports, "changeLanguage", ()=>changeLanguage);
var _i18Next = require("i18next");
var _i18NextDefault = parcelHelpers.interopDefault(_i18Next);
var _i18NextBrowserLanguagedetector = require("i18next-browser-languagedetector");
var _i18NextBrowserLanguagedetectorDefault = parcelHelpers.interopDefault(_i18NextBrowserLanguagedetector);
// Translations
const resources = {
    en: {
        translation: {
            // Application title and headers
            appTitle: "Family Tree Visualization",
            inputTitle: "Input Data",
            configTitle: "Configuration",
            layoutTitle: "Layout Options",
            visualTitle: "Visual Options",
            exportTitle: "Export Options",
            visTitle: "Family Tree Visualization",
            // Input section
            fileLabel: "Choose CSV File:",
            loadSample: "Load Sample Data",
            // Configuration - Layout
            orientation: "Orientation:",
            topDown: "Top Down",
            bottomUp: "Bottom Up",
            leftRight: "Left to Right",
            rightLeft: "Right to Left",
            nodeSize: "Node Size:",
            nodeSpacing: "Node Spacing:",
            // Configuration - Visual
            colorScheme: "Color Scheme:",
            default: "Default",
            genderBased: "Gender-Based",
            generationBased: "Generation-Based",
            custom: "Custom",
            fontSize: "Font Size:",
            lineStyle: "Line Style:",
            straight: "Straight",
            curved: "Curved",
            angled: "Angled",
            // Configuration - Export
            svgWidth: "SVG Width (pixels):",
            svgHeight: "SVG Height (pixels):",
            // Controls
            generateTree: "Generate Tree",
            exportSVG: "Export SVG",
            resetView: "Reset View",
            // Languages
            language: "Language:",
            // Node information
            born: "Born:",
            died: "Died:",
            age: "Age:",
            nativePlace: "Native Place:",
            spouse: "Spouse:",
            father: "Father:",
            mother: "Mother:",
            // Relationship terminology
            son: "Son",
            daughter: "Daughter",
            husband: "Husband",
            wife: "Wife",
            // Alerts and messages
            uploadFirst: "Please upload a CSV file or load sample data first.",
            generateFirst: "Please generate a family tree first.",
            parseError: "Error parsing CSV file:",
            generateError: "Error generating family tree:",
            exportError: "Error exporting SVG:",
            // Footer
            footerText: "Family Tree Visualization Tool - Multilingual Support"
        }
    },
    ta: {
        translation: {
            // Application title and headers
            appTitle: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0BB0 \u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD",
            inputTitle: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BCD\u0B9F\u0BC1 \u0BA4\u0BB0\u0BB5\u0BC1",
            configTitle: "\u0B95\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1",
            layoutTitle: "\u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
            visualTitle: "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
            exportTitle: "\u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BA4\u0BBF \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
            visTitle: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0BB0 \u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF",
            // Input section
            fileLabel: "CSV \u0B95\u0BCB\u0BAA\u0BCD\u0BAA\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
            loadSample: "\u0BAE\u0BBE\u0BA4\u0BBF\u0BB0\u0BBF \u0BA4\u0BB0\u0BB5\u0BC8 \u0B8F\u0BB1\u0BCD\u0BB1\u0BB5\u0BC1\u0BAE\u0BCD",
            // Configuration - Layout
            orientation: "\u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1:",
            topDown: "\u0BAE\u0BC7\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BC0\u0BB4\u0BCD",
            bottomUp: "\u0B95\u0BC0\u0BB4\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC7\u0BB2\u0BCD",
            leftRight: "\u0B87\u0B9F\u0BAE\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BB5\u0BB2\u0BAE\u0BCD",
            rightLeft: "\u0BB5\u0BB2\u0BAE\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0B87\u0B9F\u0BAE\u0BCD",
            nodeSize: "\u0BAE\u0BC1\u0BA9\u0BC8 \u0B85\u0BB3\u0BB5\u0BC1:",
            nodeSpacing: "\u0BAE\u0BC1\u0BA9\u0BC8 \u0B87\u0B9F\u0BC8\u0BB5\u0BC6\u0BB3\u0BBF:",
            // Configuration - Visual
            colorScheme: "\u0BB5\u0BA3\u0BCD\u0BA3 \u0BA4\u0BBF\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD:",
            default: "\u0B87\u0BAF\u0BB2\u0BCD\u0BAA\u0BC1\u0BA8\u0BBF\u0BB2\u0BC8",
            genderBased: "\u0BAA\u0BBE\u0BB2\u0BBF\u0BA9 \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD",
            generationBased: "\u0BA4\u0BB2\u0BC8\u0BAE\u0BC1\u0BB1\u0BC8 \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD",
            custom: "\u0BA4\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0BAF\u0BA9\u0BCD",
            fontSize: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B85\u0BB3\u0BB5\u0BC1:",
            lineStyle: "\u0B95\u0BCB\u0B9F\u0BCD\u0B9F\u0BC1 \u0BAA\u0BBE\u0BA3\u0BBF:",
            straight: "\u0BA8\u0BC7\u0BB0\u0BBE\u0BA9",
            curved: "\u0BB5\u0BB3\u0BC8\u0BA8\u0BCD\u0BA4",
            angled: "\u0B95\u0BCB\u0BA3\u0BAE\u0BBE\u0BA9",
            // Configuration - Export
            svgWidth: "SVG \u0B85\u0B95\u0BB2\u0BAE\u0BCD (\u0BAA\u0BBF\u0B95\u0BCD\u0B9A\u0BB2\u0BCD\u0B95\u0BB3\u0BCD):",
            svgHeight: "SVG \u0B89\u0BAF\u0BB0\u0BAE\u0BCD (\u0BAA\u0BBF\u0B95\u0BCD\u0B9A\u0BB2\u0BCD\u0B95\u0BB3\u0BCD):",
            // Controls
            generateTree: "\u0BAE\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1",
            exportSVG: "SVG \u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BA4\u0BBF",
            resetView: "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF\u0BAF\u0BC8 \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8",
            // Languages
            language: "\u0BAE\u0BCA\u0BB4\u0BBF:",
            // Node information
            born: "\u0BAA\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0BA4\u0BBF:",
            died: "\u0B87\u0BB1\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0BA4\u0BBF:",
            age: "\u0BB5\u0BAF\u0BA4\u0BC1:",
            nativePlace: "\u0B9A\u0BCA\u0BA8\u0BCD\u0BA4 \u0B8A\u0BB0\u0BCD:",
            spouse: "\u0BA4\u0BC1\u0BA3\u0BC8\u0BB5\u0BB0\u0BCD:",
            father: "\u0BA4\u0BA8\u0BCD\u0BA4\u0BC8:",
            mother: "\u0BA4\u0BBE\u0BAF\u0BCD:",
            // Relationship terminology
            son: "\u0BAE\u0B95\u0BA9\u0BCD",
            daughter: "\u0BAE\u0B95\u0BB3\u0BCD",
            husband: "\u0B95\u0BA3\u0BB5\u0BB0\u0BCD",
            wife: "\u0BAE\u0BA9\u0BC8\u0BB5\u0BBF",
            // Alerts and messages
            uploadFirst: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BBF\u0BB2\u0BCD CSV \u0B95\u0BCB\u0BAA\u0BCD\u0BAA\u0BC8 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC7\u0BB1\u0BCD\u0BB1\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAE\u0BBE\u0BA4\u0BBF\u0BB0\u0BBF \u0BA4\u0BB0\u0BB5\u0BC8 \u0B8F\u0BB1\u0BCD\u0BB1\u0BB5\u0BC1\u0BAE\u0BCD.",
            generateFirst: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BBF\u0BB2\u0BCD \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
            parseError: "CSV \u0B95\u0BCB\u0BAA\u0BCD\u0BAA\u0BC8 \u0BAA\u0B95\u0BC1\u0BAA\u0BCD\u0BAA\u0BBE\u0BAF\u0BCD\u0BB5\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB4\u0BC8:",
            generateError: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB4\u0BC8:",
            exportError: "SVG \u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BA4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB4\u0BC8:",
            // Footer
            footerText: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0BB0 \u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD \u0B95\u0BB0\u0BC1\u0BB5\u0BBF - \u0BAA\u0BB2 \u0BAE\u0BCA\u0BB4\u0BBF \u0B86\u0BA4\u0BB0\u0BB5\u0BC1"
        }
    }
};
async function initI18n() {
    await (0, _i18NextDefault.default).use((0, _i18NextBrowserLanguagedetectorDefault.default)).init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false // not needed for HTML
        }
    });
    return 0, _i18NextDefault.default;
}
function translate() {
    // App title
    document.getElementById('app-title').textContent = (0, _i18NextDefault.default).t('appTitle');
    // Section titles
    document.getElementById('input-title').textContent = (0, _i18NextDefault.default).t('inputTitle');
    document.getElementById('config-title').textContent = (0, _i18NextDefault.default).t('configTitle');
    document.getElementById('layout-title').textContent = (0, _i18NextDefault.default).t('layoutTitle');
    document.getElementById('visual-title').textContent = (0, _i18NextDefault.default).t('visualTitle');
    document.getElementById('export-title').textContent = (0, _i18NextDefault.default).t('exportTitle');
    document.getElementById('vis-title').textContent = (0, _i18NextDefault.default).t('visTitle');
    // Labels
    document.querySelector('label[for="language-select"]').textContent = (0, _i18NextDefault.default).t('language');
    document.getElementById('file-label').textContent = (0, _i18NextDefault.default).t('fileLabel');
    document.getElementById('load-sample').textContent = (0, _i18NextDefault.default).t('loadSample');
    // Configuration options
    document.querySelector('label[for="orientation"]').textContent = (0, _i18NextDefault.default).t('orientation');
    document.querySelector('label[for="node-size"]').textContent = (0, _i18NextDefault.default).t('nodeSize');
    document.querySelector('label[for="node-spacing"]').textContent = (0, _i18NextDefault.default).t('nodeSpacing');
    document.querySelector('label[for="color-scheme"]').textContent = (0, _i18NextDefault.default).t('colorScheme');
    document.querySelector('label[for="font-size"]').textContent = (0, _i18NextDefault.default).t('fontSize');
    document.querySelector('label[for="line-style"]').textContent = (0, _i18NextDefault.default).t('lineStyle');
    document.querySelector('label[for="svg-width"]').textContent = (0, _i18NextDefault.default).t('svgWidth');
    document.querySelector('label[for="svg-height"]').textContent = (0, _i18NextDefault.default).t('svgHeight');
    // Orientation options
    const orientationSelect = document.getElementById('orientation');
    orientationSelect.options[0].textContent = (0, _i18NextDefault.default).t('topDown');
    orientationSelect.options[1].textContent = (0, _i18NextDefault.default).t('bottomUp');
    orientationSelect.options[2].textContent = (0, _i18NextDefault.default).t('leftRight');
    orientationSelect.options[3].textContent = (0, _i18NextDefault.default).t('rightLeft');
    // Color scheme options
    const colorSchemeSelect = document.getElementById('color-scheme');
    colorSchemeSelect.options[0].textContent = (0, _i18NextDefault.default).t('default');
    colorSchemeSelect.options[1].textContent = (0, _i18NextDefault.default).t('genderBased');
    colorSchemeSelect.options[2].textContent = (0, _i18NextDefault.default).t('generationBased');
    colorSchemeSelect.options[3].textContent = (0, _i18NextDefault.default).t('custom');
    // Line style options
    const lineStyleSelect = document.getElementById('line-style');
    lineStyleSelect.options[0].textContent = (0, _i18NextDefault.default).t('straight');
    lineStyleSelect.options[1].textContent = (0, _i18NextDefault.default).t('curved');
    lineStyleSelect.options[2].textContent = (0, _i18NextDefault.default).t('angled');
    // Buttons
    document.getElementById('generate-tree').textContent = (0, _i18NextDefault.default).t('generateTree');
    document.getElementById('export-svg').textContent = (0, _i18NextDefault.default).t('exportSVG');
    document.getElementById('reset-view').textContent = (0, _i18NextDefault.default).t('resetView');
    // Footer
    document.querySelector('footer p').textContent = (0, _i18NextDefault.default).t('footerText');
}
function t(key, options = {}) {
    return (0, _i18NextDefault.default).t(key, options);
}
function getCurrentLanguage() {
    return (0, _i18NextDefault.default).language;
}
function changeLanguage(lang) {
    return (0, _i18NextDefault.default).changeLanguage(lang);
}
exports.default = {
    initI18n,
    translate,
    t,
    getCurrentLanguage,
    changeLanguage
};

},{"i18next":"i18next","i18next-browser-languagedetector":"i18next-browser-languagedetector","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aN9wh":[function(require,module,exports,__globalThis) {
// CSV parser module for Family Tree Visualization
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Parse CSV data into structured format
parcelHelpers.export(exports, "parseCSV", ()=>parseCSV);
// Detect language from text (simplified version)
parcelHelpers.export(exports, "detectLanguage", ()=>detectLanguage);
// Format date according to locale
parcelHelpers.export(exports, "formatDate", ()=>formatDate);
// Calculate age based on birth and death dates
parcelHelpers.export(exports, "calculateAge", ()=>calculateAge);
var _papaparse = require("papaparse");
var _papaparseDefault = parcelHelpers.interopDefault(_papaparse);
// Debug logs flag - set to true to see debug messages
const DEBUG = true;
// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[CSVParser] ${message}`);
        if (data) console.log(data);
    }
}
// CSV field definitions
const REQUIRED_FIELDS = [
    'id',
    'name',
    'gender'
];
const OPTIONAL_FIELDS = [
    'spouse_name',
    'father_name',
    'mother_name',
    'birth_date',
    'death_date',
    'native_place',
    'father_id',
    'mother_id',
    'spouse_id'
];
function parseCSV(csvData) {
    debugLog('Starting CSV parsing');
    try {
        // Determine if csvData is a File object or a string
        let isFile = csvData instanceof File;
        debugLog(`Input is ${isFile ? 'a File object' : 'a string'}`);
        if (isFile) // Handle File object
        return parseCSVFile(csvData);
        else // Handle string data
        return parseCSVString(csvData);
    } catch (error) {
        debugLog('Error in parseCSV', error);
        throw error;
    }
}
// Parse CSV from a File object
function parseCSVFile(file) {
    debugLog(`Parsing CSV file: ${file.name}`);
    return new Promise((resolve, reject)=>{
        (0, _papaparseDefault.default).parse(file, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
            transform: (value)=>value.trim(),
            complete: function(results) {
                try {
                    debugLog(`Papa parse complete with ${results.data.length} rows`);
                    // Check for parsing errors
                    if (results.errors && results.errors.length > 0) {
                        // Log the errors
                        debugLog('CSV parsing errors found', results.errors);
                        // Check if errors are critical
                        const criticalErrors = results.errors.filter((e)=>e.type !== 'FieldMismatch');
                        if (criticalErrors.length > 0) {
                            reject(new Error(`CSV parsing error: ${criticalErrors[0].message}`));
                            return;
                        }
                        // If only FieldMismatch errors, we can proceed with warning
                        debugLog('Non-critical parsing errors found, proceeding with data');
                    }
                    // Validate required fields
                    validateCSVFields(results.meta.fields);
                    // Process and validate the data
                    const processedData = processCSVData(results.data);
                    debugLog(`Successfully parsed ${processedData.length} rows from CSV`);
                    resolve(processedData);
                } catch (error) {
                    debugLog('Error during CSV parsing', error);
                    reject(error);
                }
            },
            error: function(error) {
                debugLog('Error during CSV parsing', error);
                reject(error);
            }
        });
    });
}
// Parse CSV from a string
function parseCSVString(csvString) {
    debugLog('Parsing CSV from string');
    try {
        const result = (0, _papaparseDefault.default).parse(csvString, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
            transform: (value)=>value.trim()
        });
        if (result.errors && result.errors.length > 0) {
            debugLog('CSV parsing errors found', result.errors);
            const criticalErrors = result.errors.filter((e)=>e.type !== 'FieldMismatch');
            if (criticalErrors.length > 0) throw new Error(`CSV parsing error: ${criticalErrors[0].message}`);
        }
        // Validate required fields
        validateCSVFields(result.meta.fields);
        // Process data
        const processedData = processCSVData(result.data);
        debugLog(`Successfully parsed ${processedData.length} rows from CSV string`);
        return processedData;
    } catch (error) {
        debugLog('Error parsing CSV string', error);
        throw error;
    }
}
// Validate that CSV has required fields
function validateCSVFields(fields) {
    debugLog('Validating CSV fields', fields);
    const requiredFields = [
        'id',
        'name',
        'gender'
    ];
    const missingFields = requiredFields.filter((field)=>!fields.includes(field));
    if (missingFields.length > 0) throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    debugLog('All required fields present');
}
// Process CSV data after parsing
function processCSVData(data) {
    debugLog(`Processing ${data.length} rows of CSV data`);
    const processedData = data.map((row)=>{
        try {
            return {
                id: row.id,
                name: row.name.trim(),
                gender: row.gender.trim(),
                spouse_name: row.spouse_name ? row.spouse_name.trim() : null,
                father_name: row.father_name ? row.father_name.trim() : null,
                mother_name: row.mother_name ? row.mother_name.trim() : null,
                birth_date: row.birth_date ? row.birth_date.trim() : null,
                death_date: row.death_date ? row.death_date.trim() : null,
                native_place: row.native_place ? row.native_place.trim() : null,
                father_id: row.father_id ? row.father_id.trim() : null,
                mother_id: row.mother_id ? row.mother_id.trim() : null,
                spouse_id: row.spouse_id ? row.spouse_id.trim() : null
            };
        } catch (error) {
            debugLog('Error processing row', {
                row,
                error
            });
            throw new Error(`Error processing row with ID ${row.id || 'unknown'}: ${error.message}`);
        }
    });
    debugLog(`Successfully processed ${processedData.length} rows`);
    return processedData;
}
function detectLanguage(text) {
    if (!text) return 'en';
    // Check for Tamil characters (basic check)
    const tamilPattern = /[\u0B80-\u0BFF]/;
    if (tamilPattern.test(text)) return 'ta';
    // Default to English
    return 'en';
}
function formatDate(date, locale = 'en') {
    if (!date) return '';
    if (typeof date === 'string') return date;
    try {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString(locale === 'ta' ? 'ta-IN' : locale, options);
    } catch (e) {
        console.warn('Date formatting error:', e);
        return date.toISOString().split('T')[0];
    }
}
function calculateAge(birthDate, deathDate = null) {
    if (!birthDate) return null;
    if (typeof birthDate === 'string') return null; // Can't calculate with string dates
    const endDate = deathDate || new Date();
    let age = endDate.getFullYear() - birthDate.getFullYear();
    // Adjust age if birthday hasn't occurred yet this year
    const m = endDate.getMonth() - birthDate.getMonth();
    if (m < 0 || m === 0 && endDate.getDate() < birthDate.getDate()) age--;
    return age;
}
exports.default = {
    parseCSV,
    detectLanguage,
    formatDate,
    calculateAge
};

},{"papaparse":"papaparse","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aFvtd":[function(require,module,exports,__globalThis) {
// Family Tree Builder module
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Build a family tree data structure from parsed CSV data
parcelHelpers.export(exports, "buildFamilyTree", ()=>buildFamilyTree);
var _csvParserJs = require("./csvParser.js");
// Debug logs flag - set to true to see debug messages
const DEBUG = true;
// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[FamilyTreeBuilder] ${message}`);
        if (data) console.log(data);
    }
}
function buildFamilyTree(csvData) {
    debugLog('Starting tree construction with data:', csvData);
    if (!csvData || !Array.isArray(csvData) || csvData.length === 0) throw new Error('Invalid or empty data provided to buildFamilyTree');
    // Create a map of individuals by ID for faster lookup
    debugLog('Creating individuals map');
    const individualsMap = createIndividualsMap(csvData);
    debugLog('Individuals map created', Object.keys(individualsMap).length);
    // Build relationships
    debugLog('Building relationships');
    buildRelationships(individualsMap);
    // Calculate generations
    debugLog('Calculating generations');
    calculateGenerations(individualsMap);
    // Count individuals with parents, children, and spouses
    let withParents = 0, withChildren = 0, withSpouses = 0;
    Object.values(individualsMap).forEach((individual)=>{
        if (individual.parents.length > 0) withParents++;
        if (individual.children.length > 0) withChildren++;
        if (individual.spouses.length > 0) withSpouses++;
    });
    debugLog(`Relationship stats: ${withParents} with parents, ${withChildren} with children, ${withSpouses} with spouses`);
    // Convert map to array for d3 consumption
    const maxGen = findMaxGeneration(individualsMap);
    const familyTree = {
        individuals: Object.values(individualsMap),
        generations: maxGen + 1
    };
    debugLog(`Tree construction complete with ${familyTree.individuals.length} individuals and ${familyTree.generations} generations`);
    return familyTree;
}
// Create a map of individuals from CSV data
function createIndividualsMap(csvData) {
    const individualsMap = {};
    csvData.forEach((record)=>{
        // Basic individual information
        const individual = {
            id: record.id,
            name: record.name,
            gender: normalizeGender(record.gender),
            spouseName: record.spouse_name || null,
            fatherName: record.father_name || null,
            motherName: record.mother_name || null,
            birthDate: record.birth_date,
            deathDate: record.death_date,
            nativePlace: record.native_place || null,
            // IDs for relationships
            fatherId: record.father_id || null,
            motherId: record.mother_id || null,
            spouseId: record.spouse_id || null,
            // Relationship collections
            parents: [],
            children: [],
            spouses: [],
            // For tree building
            generation: null,
            language: (0, _csvParserJs.detectLanguage)(record.name),
            hasSpouse: !!record.spouse_name || !!record.spouse_id
        };
        individualsMap[record.id] = individual;
    });
    return individualsMap;
}
// Normalize gender values
function normalizeGender(gender) {
    if (!gender) return 'unknown';
    const normalizedGender = gender.toString().trim().toLowerCase();
    if (normalizedGender === 'm' || normalizedGender === 'male' || normalizedGender === "\u0BAE" || normalizedGender === "\u0B86\u0BA3\u0BCD") return 'male';
    else if (normalizedGender === 'f' || normalizedGender === 'female' || normalizedGender === "\u0BAA\u0BC6" || normalizedGender === "\u0BAA\u0BC6\u0BA3\u0BCD") return 'female';
    else return 'unknown';
}
// Build relationships between individuals
function buildRelationships(individualsMap) {
    // Process parent-child relationships
    Object.values(individualsMap).forEach((individual)=>{
        // Add parent-child relationships by ID
        addParentChildRelationshipById(individualsMap, individual, 'father');
        addParentChildRelationshipById(individualsMap, individual, 'mother');
        // Add spouse relationships by ID
        addSpouseRelationshipById(individualsMap, individual);
    });
    // After ID-based relationships are established,
    // try to resolve relationships by name if IDs aren't available
    Object.values(individualsMap).forEach((individual)=>{
        // Add parent-child relationships by name
        addParentChildRelationshipByName(individualsMap, individual, 'father');
        addParentChildRelationshipByName(individualsMap, individual, 'mother');
        // Add spouse relationships by name
        addSpouseRelationshipByName(individualsMap, individual);
    });
}
// Add parent-child relationship by ID
function addParentChildRelationshipById(individualsMap, individual, parentType) {
    const parentIdKey = parentType + 'Id';
    const parentId = individual[parentIdKey];
    if (parentId && individualsMap[parentId]) {
        const parent = individualsMap[parentId];
        // Add parent to individual's parents
        if (!individual.parents.includes(parent)) individual.parents.push(parent);
        // Add individual to parent's children
        if (!parent.children.includes(individual)) parent.children.push(individual);
    }
}
// Add parent-child relationship by name
function addParentChildRelationshipByName(individualsMap, individual, parentType) {
    // Skip if relationship already established by ID
    if (individual.parents.length > 0) return;
    const parentNameKey = parentType + 'Name';
    const parentName = individual[parentNameKey];
    if (parentName) {
        // Find parent by name (might be ambiguous, just take first match)
        const parent = Object.values(individualsMap).find((p)=>p.name.toLowerCase() === parentName.toLowerCase() && (parentType === 'father' ? p.gender === 'male' : p.gender === 'female'));
        if (parent) {
            // Add parent to individual's parents
            if (!individual.parents.includes(parent)) individual.parents.push(parent);
            // Add individual to parent's children
            if (!parent.children.includes(individual)) parent.children.push(individual);
        }
    }
}
// Add spouse relationship by ID
function addSpouseRelationshipById(individualsMap, individual) {
    const spouseId = individual.spouseId;
    if (spouseId && individualsMap[spouseId]) {
        const spouse = individualsMap[spouseId];
        // Add spouse to individual's spouses
        if (!individual.spouses.includes(spouse)) individual.spouses.push(spouse);
        // Add individual to spouse's spouses
        if (!spouse.spouses.includes(individual)) spouse.spouses.push(individual);
    }
}
// Add spouse relationship by name
function addSpouseRelationshipByName(individualsMap, individual) {
    // Skip if relationship already established by ID
    if (individual.spouses.length > 0) return;
    const spouseName = individual.spouseName;
    if (spouseName) {
        // Find spouse by name (might be ambiguous, just take first match)
        const spouse = Object.values(individualsMap).find((p)=>p.name.toLowerCase() === spouseName.toLowerCase() && p.gender !== individual.gender);
        if (spouse) {
            // Add spouse to individual's spouses
            if (!individual.spouses.includes(spouse)) individual.spouses.push(spouse);
            // Add individual to spouse's spouses
            if (!spouse.spouses.includes(individual)) spouse.spouses.push(individual);
        }
    }
}
// Calculate generation levels for each individual
function calculateGenerations(individualsMap) {
    // Find individuals with no parents (root nodes)
    const rootNodes = Object.values(individualsMap).filter((individual)=>individual.parents.length === 0);
    // If no root nodes, try to find oldest individuals
    if (rootNodes.length === 0) {
        // Just assign generation 0 to all
        Object.values(individualsMap).forEach((individual)=>{
            individual.generation = 0;
        });
        return;
    }
    // Set generation 0 for root nodes
    rootNodes.forEach((individual)=>{
        individual.generation = 0;
    });
    // Process generations starting from root nodes
    let hasChanges = true;
    let maxIterations = 100; // Safety limit
    while(hasChanges && maxIterations > 0){
        hasChanges = false;
        maxIterations--;
        Object.values(individualsMap).forEach((individual)=>{
            // Skip individuals with already assigned generations
            if (individual.generation !== null) {
                // Calculate children's generation
                individual.children.forEach((child)=>{
                    const newGeneration = individual.generation + 1;
                    if (child.generation === null || child.generation < newGeneration) {
                        child.generation = newGeneration;
                        hasChanges = true;
                    }
                });
                // Ensure spouses are at the same generation
                individual.spouses.forEach((spouse)=>{
                    if (spouse.generation === null) {
                        spouse.generation = individual.generation;
                        hasChanges = true;
                    } else if (spouse.generation !== individual.generation) {
                        // Adjust generations for consistency if they differ
                        const maxGen = Math.max(spouse.generation, individual.generation);
                        spouse.generation = maxGen;
                        individual.generation = maxGen;
                        hasChanges = true;
                    }
                });
            }
        });
    }
    // Handle any missed individuals (assign them to generation 0)
    Object.values(individualsMap).forEach((individual)=>{
        if (individual.generation === null) individual.generation = 0;
    });
}
// Find the maximum generation in the tree
function findMaxGeneration(individualsMap) {
    let maxGeneration = 0;
    Object.values(individualsMap).forEach((individual)=>{
        if (individual.generation > maxGeneration) maxGeneration = individual.generation;
    });
    return maxGeneration;
}
exports.default = {
    buildFamilyTree
};

},{"./csvParser.js":"aN9wh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9Op1N":[function(require,module,exports,__globalThis) {
// Tree Renderer module using d3.js for Family Tree Visualization
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Render the family tree using d3.js
parcelHelpers.export(exports, "renderFamilyTree", ()=>renderFamilyTree);
var _d3 = require("d3");
var _csvParserJs = require("./csvParser.js");
var _i18NJs = require("./i18n.js");
// Debug logs flag - set to true to see debug messages
const DEBUG = true;
// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[TreeRenderer] ${message}`);
        if (data) console.log(data);
    }
}
function renderFamilyTree(familyTree, container, config) {
    debugLog('Starting tree rendering');
    if (!familyTree || !familyTree.individuals || familyTree.individuals.length === 0) throw new Error('Invalid family tree data provided');
    if (!container) throw new Error('No container element provided for rendering');
    // Default configuration
    const defaultConfig = {
        orientation: 'top-down',
        nodeSize: 1.5,
        nodeSpacing: 1.5,
        colorScheme: 'default',
        fontSize: 14,
        lineStyle: 'straight',
        svgWidth: 2000,
        svgHeight: 1500,
        language: 'en'
    };
    // Merge with provided config
    const renderConfig = {
        ...defaultConfig,
        ...config
    };
    debugLog('Rendering with config', renderConfig);
    // Create the renderer object
    const renderer = new FamilyTreeRenderer(familyTree, container, renderConfig);
    // Render the tree
    try {
        renderer.render();
        debugLog('Tree rendering complete');
    } catch (error) {
        debugLog('Error during tree rendering', error);
        throw error;
    }
    return renderer;
}
// Family Tree Renderer class
class FamilyTreeRenderer {
    constructor(familyTree, container, config){
        this.familyTree = familyTree;
        this.container = container;
        this.config = config;
        // D3 selections
        this.svg = null;
        this.treeGroup = null;
        this.nodesGroup = null;
        this.linksGroup = null;
        // D3 layouts
        this.treeLayout = null;
        this.root = null;
        // Node dimensions
        this.nodeWidth = 180 * this.config.nodeSize;
        this.nodeHeight = 100 * this.config.nodeSize;
        this.nodeSpacing = 20 * this.config.nodeSpacing;
        // Keep track of converted data
        this.hierarchyData = null;
        debugLog(`Initialized renderer with ${familyTree.individuals.length} individuals and ${familyTree.generations} generations`);
    }
    // Main render method
    render() {
        // Convert family tree to hierarchy
        debugLog('Converting to hierarchy');
        this.hierarchyData = this.convertToHierarchy();
        // Create SVG container
        debugLog('Creating SVG container');
        this.createSvg();
        // Set up tree layout
        debugLog('Setting up tree layout');
        this.setupTreeLayout();
        // Create links
        debugLog('Creating links');
        this.createLinks();
        // Create nodes
        debugLog('Creating nodes');
        this.createNodes();
        // Set up zoom behavior
        debugLog('Setting up zoom behavior');
        this.setupZoom();
    }
    // Convert family tree data to d3 hierarchy format
    convertToHierarchy() {
        // Find or create root node
        const generations = Array(this.familyTree.generations).fill().map(()=>[]);
        // Group individuals by generation
        this.familyTree.individuals.forEach((individual)=>{
            generations[individual.generation].push(individual);
        });
        debugLog('Individuals grouped by generation', generations.map((g)=>g.length));
        // Root is an artificial node representing the whole tree
        const root = {
            id: 'root',
            name: 'Family Tree',
            children: []
        };
        // If we have oldest generation, add them as children of root
        if (generations[0].length > 0) {
            // Process oldest generation first (those with no parents)
            const oldest = generations[0];
            debugLog(`Processing oldest generation with ${oldest.length} individuals`);
            // Group individuals and their spouses
            const processedIds = new Set();
            oldest.forEach((individual)=>{
                if (processedIds.has(individual.id)) return;
                const familyUnit = {
                    id: `unit-${individual.id}`,
                    name: 'Family Unit',
                    individuals: [
                        individual
                    ],
                    children: []
                };
                processedIds.add(individual.id);
                // Add spouses to the family unit
                individual.spouses.forEach((spouse)=>{
                    if (!processedIds.has(spouse.id)) {
                        familyUnit.individuals.push(spouse);
                        processedIds.add(spouse.id);
                    }
                });
                // Find all children of this family unit
                const children = this.findChildren(individual);
                debugLog(`Individual ${individual.id} has ${children.length} children`);
                // Process each child and add to family unit
                children.forEach((child)=>{
                    this.processChild(child, familyUnit, processedIds);
                });
                // Add family unit to root
                root.children.push(familyUnit);
            });
            debugLog(`Created ${root.children.length} family units at root level`);
        } else debugLog('No individuals in oldest generation, empty tree');
        return _d3.hierarchy(root);
    }
    // Find children of an individual, including spouse's children
    findChildren(individual) {
        const allChildren = [
            ...individual.children
        ];
        // Add children from all spouses
        individual.spouses.forEach((spouse)=>{
            spouse.children.forEach((child)=>{
                if (!allChildren.includes(child)) allChildren.push(child);
            });
        });
        return allChildren;
    }
    // Process a child and add to family unit
    processChild(child, familyUnit, processedIds) {
        if (processedIds.has(child.id)) return;
        const childFamilyUnit = {
            id: `unit-${child.id}`,
            name: 'Family Unit',
            individuals: [
                child
            ],
            children: []
        };
        processedIds.add(child.id);
        // Add spouses to the child's family unit
        child.spouses.forEach((spouse)=>{
            if (!processedIds.has(spouse.id)) {
                childFamilyUnit.individuals.push(spouse);
                processedIds.add(spouse.id);
            }
        });
        // Find all children of this family unit
        const grandchildren = this.findChildren(child);
        // Process each grandchild and add to family unit
        grandchildren.forEach((grandchild)=>{
            this.processChild(grandchild, childFamilyUnit, processedIds);
        });
        // Add child family unit to parent family unit
        familyUnit.children.push(childFamilyUnit);
    }
    // Create SVG container
    createSvg() {
        // Clear existing SVG
        _d3.select(this.container).selectAll('svg').remove();
        // Create new SVG
        this.svg = _d3.select(this.container).append('svg').attr('width', this.config.svgWidth).attr('height', this.config.svgHeight).attr('viewBox', `0 0 ${this.config.svgWidth} ${this.config.svgHeight}`).attr('class', 'family-tree-svg');
        // Add defs for markers
        const defs = this.svg.append('defs');
        // Add parent-child marker
        defs.append('marker').attr('id', 'arrow').attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('class', 'arrow-head');
        // Create container groups
        this.treeGroup = this.svg.append('g').attr('class', 'tree-group').attr('transform', `translate(${this.config.svgWidth / 2}, 60)`);
        this.linksGroup = this.treeGroup.append('g').attr('class', 'links-group');
        this.nodesGroup = this.treeGroup.append('g').attr('class', 'nodes-group');
    }
    // Set up tree layout
    setupTreeLayout() {
        // Create tree layout based on orientation
        if (this.config.orientation === 'top-down') this.treeLayout = _d3.tree().nodeSize([
            this.nodeWidth + this.nodeSpacing,
            this.nodeHeight + this.nodeSpacing * 2
        ]).separation((a, b)=>{
            // Increase separation for nodes with many individuals
            return a.data.individuals && b.data.individuals ? (a.data.individuals.length + b.data.individuals.length) / 2 : 1;
        });
        else if (this.config.orientation === 'bottom-up') {
            this.treeLayout = _d3.tree().nodeSize([
                this.nodeWidth + this.nodeSpacing,
                this.nodeHeight + this.nodeSpacing * 2
            ]).separation((a, b)=>{
                return a.data.individuals && b.data.individuals ? (a.data.individuals.length + b.data.individuals.length) / 2 : 1;
            });
            // Reverse the y direction
            this.hierarchyData.descendants().forEach((d)=>{
                d.y = -d.y;
            });
        } else if (this.config.orientation === 'left-right') {
            this.treeLayout = _d3.tree().nodeSize([
                this.nodeHeight + this.nodeSpacing * 2,
                this.nodeWidth + this.nodeSpacing
            ]).separation((a, b)=>{
                return a.data.individuals && b.data.individuals ? (a.data.individuals.length + b.data.individuals.length) / 2 : 1;
            });
            // Swap x and y for horizontal layout
            this.treeGroup.attr('transform', `translate(60, ${this.config.svgHeight / 2})`);
        } else if (this.config.orientation === 'right-left') {
            this.treeLayout = _d3.tree().nodeSize([
                this.nodeHeight + this.nodeSpacing * 2,
                this.nodeWidth + this.nodeSpacing
            ]).separation((a, b)=>{
                return a.data.individuals && b.data.individuals ? (a.data.individuals.length + b.data.individuals.length) / 2 : 1;
            });
            // Swap x and y and reverse x for right-to-left layout
            this.treeGroup.attr('transform', `translate(${this.config.svgWidth - 60}, ${this.config.svgHeight / 2})`);
            this.hierarchyData.descendants().forEach((d)=>{
                d.y = -d.y;
            });
        }
        // Apply the layout
        this.root = this.treeLayout(this.hierarchyData);
    }
    // Create links between nodes
    createLinks() {
        // Generate link paths based on lineStyle
        const linkGenerator = this.getLinkGenerator();
        // Create links
        this.linksGroup.selectAll('.link').data(this.root.links()).enter().append('path').attr('class', 'link').attr('d', linkGenerator);
        // Create marriage links for family units with multiple individuals
        this.root.descendants().forEach((node)=>{
            if (node.data.individuals && node.data.individuals.length > 1) {
                const marriageLinkGenerator = this.getMarriageLinkGenerator(node);
                // Create a single marriage link for the family unit
                this.linksGroup.append('path').attr('class', 'link link-marriage').attr('d', marriageLinkGenerator);
            }
        });
    }
    // Get link generator based on line style and orientation
    getLinkGenerator() {
        const orientation = this.config.orientation;
        const lineStyle = this.config.lineStyle;
        if (lineStyle === 'straight') return _d3.linkVertical().x((d)=>this.isHorizontalOrientation() ? d.y : d.x).y((d)=>this.isHorizontalOrientation() ? d.x : d.y);
        else if (lineStyle === 'curved') return _d3.linkVertical().x((d)=>this.isHorizontalOrientation() ? d.y : d.x).y((d)=>this.isHorizontalOrientation() ? d.x : d.y).curve(_d3.curveBasis);
        else return _d3.linkVertical().x((d)=>this.isHorizontalOrientation() ? d.y : d.x).y((d)=>this.isHorizontalOrientation() ? d.x : d.y).curve(_d3.curveStepAfter);
    }
    // Get marriage link generator
    getMarriageLinkGenerator(node) {
        const individuals = node.data.individuals;
        const orientation = this.config.orientation;
        if (this.isHorizontalOrientation()) // For horizontal layout
        return _d3.line().x((d)=>node.y).y((d, i)=>node.x - (individuals.length - 1) * 15 / 2 + i * 15);
        else // For vertical layout
        return _d3.line().x((d, i)=>node.x - (individuals.length - 1) * 15 / 2 + i * 15).y((d)=>node.y);
    }
    // Create nodes for individuals
    createNodes() {
        // Determine color scheme
        const colorScale = this.getColorScale();
        // Create node groups
        const nodeGroups = this.nodesGroup.selectAll('.node').data(this.root.descendants().filter((d)=>d.data.id !== 'root')).enter().append('g').attr('class', 'node').attr('transform', (d)=>{
            return this.isHorizontalOrientation() ? `translate(${d.y},${d.x})` : `translate(${d.x},${d.y})`;
        });
        // For each family unit, create individual nodes
        nodeGroups.each((d, i, nodes)=>{
            const nodeGroup = _d3.select(nodes[i]);
            const familyUnit = d.data;
            if (familyUnit.individuals && familyUnit.individuals.length > 0) {
                // Calculate positions for individuals in the family unit
                const spacing = 15;
                const totalWidth = (familyUnit.individuals.length - 1) * spacing;
                const startX = -totalWidth / 2;
                // Create individual nodes
                familyUnit.individuals.forEach((individual, idx)=>{
                    const x = startX + idx * spacing;
                    this.createIndividualNode(nodeGroup, individual, x, 0, colorScale);
                });
            }
        });
    }
    // Create node for a single individual
    createIndividualNode(nodeGroup, individual, offsetX, offsetY, colorScale) {
        const nodeClass = `node-${individual.gender}`;
        // Create individual sub-group
        const individualGroup = nodeGroup.append('g').attr('class', `individual ${nodeClass}`).attr('transform', `translate(${offsetX}, ${offsetY})`).attr('data-id', individual.id);
        // Get color based on scheme
        let color = this.getIndividualColor(individual, colorScale);
        // Create node rectangle
        individualGroup.append('rect').attr('x', -this.nodeWidth / 2).attr('y', -this.nodeHeight / 2).attr('width', this.nodeWidth).attr('height', this.nodeHeight).attr('rx', 5).attr('ry', 5).style('fill', this.config.colorScheme === 'gender' ? color : '#fff').style('stroke', this.config.colorScheme !== 'gender' ? color : null);
        // Add text class based on language
        const textClass = individual.language === 'ta' ? 'tamil' : '';
        // Name
        individualGroup.append('text').attr('class', `name ${textClass}`).attr('y', -this.nodeHeight / 2 + 20).attr('text-anchor', 'middle').style('font-size', `${this.config.fontSize}px`).style('font-weight', 'bold').text(individual.name);
        // Birth date
        if (individual.birthDate) {
            const birthLabel = (0, _i18NJs.t)('born', {
                lng: this.config.language
            });
            const formattedBirthDate = (0, _csvParserJs.formatDate)(individual.birthDate, this.config.language);
            individualGroup.append('text').attr('class', `birth-date ${textClass}`).attr('y', -this.nodeHeight / 2 + 40).attr('text-anchor', 'middle').style('font-size', `${this.config.fontSize - 2}px`).text(`${birthLabel} ${formattedBirthDate}`);
        }
        // Death date
        if (individual.deathDate) {
            const deathLabel = (0, _i18NJs.t)('died', {
                lng: this.config.language
            });
            const formattedDeathDate = (0, _csvParserJs.formatDate)(individual.deathDate, this.config.language);
            individualGroup.append('text').attr('class', `death-date ${textClass}`).attr('y', -this.nodeHeight / 2 + 60).attr('text-anchor', 'middle').style('font-size', `${this.config.fontSize - 2}px`).text(`${deathLabel} ${formattedDeathDate}`);
            // Calculate age at death
            const age = (0, _csvParserJs.calculateAge)(individual.birthDate, individual.deathDate);
            if (age !== null) {
                const ageLabel = (0, _i18NJs.t)('age', {
                    lng: this.config.language
                });
                individualGroup.append('text').attr('class', `age ${textClass}`).attr('y', -this.nodeHeight / 2 + 80).attr('text-anchor', 'middle').style('font-size', `${this.config.fontSize - 2}px`).text(`${ageLabel} ${age}`);
            }
        }
        // Native place
        if (individual.nativePlace) {
            const yPos = individual.deathDate ? -this.nodeHeight / 2 + 100 : -this.nodeHeight / 2 + 60;
            individualGroup.append('text').attr('class', `native-place ${textClass}`).attr('y', yPos).attr('text-anchor', 'middle').style('font-size', `${this.config.fontSize - 2}px`).text(individual.nativePlace);
        }
    }
    // Get color scale based on configuration
    getColorScale() {
        const scheme = this.config.colorScheme;
        if (scheme === 'gender') return (d)=>{
            if (d.gender === 'male') return '#add8e6'; // Light blue
            if (d.gender === 'female') return '#ffcccb'; // Light red
            return '#d3d3d3'; // Light gray for unknown
        };
        else if (scheme === 'generation') {
            const generations = this.familyTree.generations;
            const colorScale = _d3.scaleOrdinal(_d3.schemeCategory10).domain(_d3.range(generations));
            return (d)=>colorScale(d.generation);
        } else // Default scheme - just return node default color
        return (d)=>'#555';
    }
    // Get color for individual based on color scheme
    getIndividualColor(individual, colorScale) {
        return colorScale(individual);
    }
    // Setup zoom behavior
    setupZoom() {
        const zoom = _d3.zoom().scaleExtent([
            0.1,
            3
        ]).on('zoom', (event)=>{
            this.treeGroup.attr('transform', event.transform);
        });
        this.svg.call(zoom);
        // Initial zoom to fit
        this.resetView();
    }
    // Reset view to fit the tree
    resetView() {
        // Get descendants excluding the root node
        const nodes = this.root.descendants().filter((d)=>d.data.id !== 'root');
        if (nodes.length === 0) return;
        // Calculate bounds
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        nodes.forEach((node)=>{
            const x = this.isHorizontalOrientation() ? node.y : node.x;
            const y = this.isHorizontalOrientation() ? node.x : node.y;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        });
        // Add padding
        const padding = 100;
        minX -= padding;
        maxX += padding;
        minY -= padding;
        maxY += padding;
        // Calculate dimensions
        const width = maxX - minX;
        const height = maxY - minY;
        // Calculate scale to fit
        const scale = Math.min(this.config.svgWidth / width, this.config.svgHeight / height, 1 // Limit max scale to 1
        );
        // Calculate transform
        const translateX = this.config.svgWidth / 2 - (minX + width / 2) * scale;
        const translateY = this.config.svgHeight / 2 - (minY + height / 2) * scale;
        // Apply transform
        const transform = _d3.zoomIdentity.translate(translateX, translateY).scale(scale);
        this.svg.transition().duration(750).call(_d3.zoom().transform, transform);
    }
    // Check if using horizontal orientation
    isHorizontalOrientation() {
        return this.config.orientation === 'left-right' || this.config.orientation === 'right-left';
    }
    // Update language of the visualization
    updateLanguage(language) {
        this.config.language = language;
        this.render();
    }
    // Export SVG to file
    exportSVG() {
        // Create a copy of the SVG with embedded styles
        const svgCopy = this.svg.node().cloneNode(true);
        // Add necessary CSS styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .node rect {
                fill: #fff;
                stroke: #555;
                stroke-width: 1px;
            }
            
            .node-male rect {
                stroke: #3498db;
            }
            
            .node-female rect {
                stroke: #e74c3c;
            }
            
            .node-unknown rect {
                stroke: #95a5a6;
            }
            
            .node text {
                font-family: Arial, sans-serif;
                font-size: ${this.config.fontSize}px;
            }
            
            .tamil {
                font-family: 'Noto Sans Tamil', sans-serif;
            }
            
            .link {
                fill: none;
                stroke: #95a5a6;
                stroke-width: 1.5px;
            }
            
            .link-marriage {
                stroke-dasharray: 5;
            }
        `;
        svgCopy.insertBefore(styleElement, svgCopy.firstChild);
        // Add Google Fonts stylesheet link
        const linkElement = document.createElement('link');
        linkElement.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&display=swap');
        linkElement.setAttribute('rel', 'stylesheet');
        svgCopy.insertBefore(linkElement, svgCopy.firstChild);
        // Set width and height attributes
        svgCopy.setAttribute('width', this.config.svgWidth);
        svgCopy.setAttribute('height', this.config.svgHeight);
        // Convert SVG to string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgCopy);
        // Add XML declaration
        const svgBlob = new Blob([
            '<?xml version="1.0" standalone="no"?>',
            '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
            svgString
        ], {
            type: 'image/svg+xml'
        });
        // Create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(svgBlob);
        link.download = 'family-tree.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
exports.default = {
    renderFamilyTree
};

},{"d3":"d3","./csvParser.js":"aN9wh","./i18n.js":"cf9IZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"li9ym":[function(require,module,exports,__globalThis) {
// Configuration Manager for Family Tree Visualization
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Set up configuration options and event handlers
parcelHelpers.export(exports, "setupConfig", ()=>setupConfig);
// Get current configuration from UI
parcelHelpers.export(exports, "getCurrentConfig", ()=>getCurrentConfig);
var _i18NJs = require("./i18n.js");
function setupConfig() {
    setupInputHandlers();
    loadSavedConfig();
}
// Set up event handlers for configuration inputs
function setupInputHandlers() {
    // Layout options
    setupRangeInput('node-size', 'node-size-value', (value)=>`${value}x`);
    setupRangeInput('node-spacing', 'node-spacing-value', (value)=>`${value}x`);
    // Visual options
    setupRangeInput('font-size', 'font-size-value', (value)=>`${value}px`);
    // Export options
    document.getElementById('svg-width').addEventListener('change', saveConfig);
    document.getElementById('svg-height').addEventListener('change', saveConfig);
    // Other select inputs
    document.getElementById('orientation').addEventListener('change', saveConfig);
    document.getElementById('color-scheme').addEventListener('change', saveConfig);
    document.getElementById('line-style').addEventListener('change', saveConfig);
}
// Set up a range input with a value display
function setupRangeInput(inputId, valueDisplayId, formatter = (value)=>value) {
    const input = document.getElementById(inputId);
    // Create value display if it doesn't exist
    let valueDisplay = document.getElementById(valueDisplayId);
    if (!valueDisplay) {
        valueDisplay = document.createElement('span');
        valueDisplay.id = valueDisplayId;
        valueDisplay.className = 'range-value';
        input.parentNode.insertBefore(valueDisplay, input.nextSibling);
    }
    // Initial value
    valueDisplay.textContent = formatter(input.value);
    // Update on input
    input.addEventListener('input', ()=>{
        valueDisplay.textContent = formatter(input.value);
    });
    // Save config on change
    input.addEventListener('change', saveConfig);
}
function getCurrentConfig() {
    return {
        orientation: document.getElementById('orientation').value,
        nodeSize: parseFloat(document.getElementById('node-size').value),
        nodeSpacing: parseFloat(document.getElementById('node-spacing').value),
        colorScheme: document.getElementById('color-scheme').value,
        fontSize: parseInt(document.getElementById('font-size').value),
        lineStyle: document.getElementById('line-style').value,
        svgWidth: parseInt(document.getElementById('svg-width').value),
        svgHeight: parseInt(document.getElementById('svg-height').value)
    };
}
// Save configuration to localStorage
function saveConfig() {
    try {
        const config = getCurrentConfig();
        localStorage.setItem('familyTreeConfig', JSON.stringify(config));
    } catch (e) {
        console.warn('Failed to save configuration:', e);
    }
}
// Load saved configuration from localStorage
function loadSavedConfig() {
    try {
        const savedConfig = localStorage.getItem('familyTreeConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            applyConfig(config);
        }
    } catch (e) {
        console.warn('Failed to load saved configuration:', e);
    }
}
// Apply configuration to UI elements
function applyConfig(config) {
    if (config.orientation) document.getElementById('orientation').value = config.orientation;
    if (config.nodeSize) document.getElementById('node-size').value = config.nodeSize;
    if (config.nodeSpacing) document.getElementById('node-spacing').value = config.nodeSpacing;
    if (config.colorScheme) document.getElementById('color-scheme').value = config.colorScheme;
    if (config.fontSize) document.getElementById('font-size').value = config.fontSize;
    if (config.lineStyle) document.getElementById('line-style').value = config.lineStyle;
    if (config.svgWidth) document.getElementById('svg-width').value = config.svgWidth;
    if (config.svgHeight) document.getElementById('svg-height').value = config.svgHeight;
    // Update range value displays
    document.getElementById('node-size-value').textContent = `${config.nodeSize}x`;
    document.getElementById('node-spacing-value').textContent = `${config.nodeSpacing}x`;
    document.getElementById('font-size-value').textContent = `${config.fontSize}px`;
}
// Export functions
exports.default = {
    setupConfig,
    getCurrentConfig
};

},{"./i18n.js":"cf9IZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"c3T5N":[function(require,module,exports,__globalThis) {
// Sample data for Family Tree Visualization
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sampleData", ()=>sampleData);
parcelHelpers.export(exports, "sampleCSV", ()=>sampleCSV);
const sampleData = [
    {
        id: 1,
        name: 'Rajan Kumar',
        gender: 'Male',
        spouse_name: 'Priya Kumar',
        father_name: 'Mohan Kumar',
        mother_name: 'Lakshmi Kumar',
        birth_date: '1945-05-15',
        death_date: '2015-10-23',
        native_place: 'Chennai',
        father_id: 5,
        mother_id: 6,
        spouse_id: 2
    },
    {
        id: 2,
        name: 'Priya Kumar',
        gender: 'Female',
        spouse_name: 'Rajan Kumar',
        father_name: 'Venkat Rao',
        mother_name: 'Saraswati Rao',
        birth_date: '1948-09-30',
        death_date: null,
        native_place: 'Madurai',
        father_id: 7,
        mother_id: 8,
        spouse_id: 1
    },
    {
        id: 3,
        name: 'Arjun Kumar',
        gender: 'Male',
        spouse_name: 'Deepa Kumar',
        father_name: 'Rajan Kumar',
        mother_name: 'Priya Kumar',
        birth_date: '1970-03-22',
        death_date: null,
        native_place: 'Chennai',
        father_id: 1,
        mother_id: 2,
        spouse_id: 4
    },
    {
        id: 4,
        name: 'Deepa Kumar',
        gender: 'Female',
        spouse_name: 'Arjun Kumar',
        father_name: 'Ramesh Sharma',
        mother_name: 'Anita Sharma',
        birth_date: '1972-11-08',
        death_date: null,
        native_place: 'Bangalore',
        father_id: 9,
        mother_id: 10,
        spouse_id: 3
    },
    {
        id: 5,
        name: 'Mohan Kumar',
        gender: 'Male',
        spouse_name: 'Lakshmi Kumar',
        father_name: null,
        mother_name: null,
        birth_date: '1920-01-05',
        death_date: '1990-12-15',
        native_place: 'Chennai',
        father_id: null,
        mother_id: null,
        spouse_id: 6
    },
    {
        id: 6,
        name: 'Lakshmi Kumar',
        gender: 'Female',
        spouse_name: 'Mohan Kumar',
        father_name: null,
        mother_name: null,
        birth_date: '1925-04-20',
        death_date: '1995-08-10',
        native_place: 'Chennai',
        father_id: null,
        mother_id: null,
        spouse_id: 5
    },
    {
        id: 7,
        name: 'Venkat Rao',
        gender: 'Male',
        spouse_name: 'Saraswati Rao',
        father_name: null,
        mother_name: null,
        birth_date: '1922-07-12',
        death_date: '1992-03-18',
        native_place: 'Madurai',
        father_id: null,
        mother_id: null,
        spouse_id: 8
    },
    {
        id: 8,
        name: 'Saraswati Rao',
        gender: 'Female',
        spouse_name: 'Venkat Rao',
        father_name: null,
        mother_name: null,
        birth_date: '1926-11-30',
        death_date: '1998-05-22',
        native_place: 'Madurai',
        father_id: null,
        mother_id: null,
        spouse_id: 7
    },
    {
        id: 9,
        name: 'Ramesh Sharma',
        gender: 'Male',
        spouse_name: 'Anita Sharma',
        father_name: null,
        mother_name: null,
        birth_date: '1945-08-16',
        death_date: '2010-02-28',
        native_place: 'Bangalore',
        father_id: null,
        mother_id: null,
        spouse_id: 10
    },
    {
        id: 10,
        name: 'Anita Sharma',
        gender: 'Female',
        spouse_name: 'Ramesh Sharma',
        father_name: null,
        mother_name: null,
        birth_date: '1947-12-03',
        death_date: null,
        native_place: 'Bangalore',
        father_id: null,
        mother_id: null,
        spouse_id: 9
    },
    {
        id: 11,
        name: 'Vikram Kumar',
        gender: 'Male',
        spouse_name: 'Kavita Kumar',
        father_name: 'Arjun Kumar',
        mother_name: 'Deepa Kumar',
        birth_date: '1995-06-20',
        death_date: null,
        native_place: 'Chennai',
        father_id: 3,
        mother_id: 4,
        spouse_id: 12
    },
    {
        id: 12,
        name: 'Kavita Kumar',
        gender: 'Female',
        spouse_name: 'Vikram Kumar',
        father_name: 'Dinesh Patel',
        mother_name: 'Sunita Patel',
        birth_date: '1997-09-15',
        death_date: null,
        native_place: 'Mumbai',
        father_id: null,
        mother_id: null,
        spouse_id: 11
    },
    {
        id: 13,
        name: 'Meera Kumar',
        gender: 'Female',
        spouse_name: null,
        father_name: 'Arjun Kumar',
        mother_name: 'Deepa Kumar',
        birth_date: '1998-04-12',
        death_date: null,
        native_place: 'Chennai',
        father_id: 3,
        mother_id: 4,
        spouse_id: null
    },
    {
        id: 14,
        name: "\u0BB0\u0BBE\u0B9C\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0B86\u0BA3\u0BCD",
        spouse_name: "\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: "\u0BAE\u0BCB\u0B95\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        mother_name: "\u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        birth_date: '1945-05-15',
        death_date: '2015-10-23',
        native_place: "\u0B9A\u0BC6\u0BA9\u0BCD\u0BA9\u0BC8",
        father_id: 18,
        mother_id: 19,
        spouse_id: 15
    },
    {
        id: 15,
        name: "\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0BAA\u0BC6\u0BA3\u0BCD",
        spouse_name: "\u0BB0\u0BBE\u0B9C\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: "\u0BB5\u0BC6\u0B99\u0BCD\u0B95\u0B9F\u0BCD \u0BB0\u0BBE\u0BB5\u0BCD",
        mother_name: "\u0B9A\u0BB0\u0BB8\u0BCD\u0BB5\u0BA4\u0BBF \u0BB0\u0BBE\u0BB5\u0BCD",
        birth_date: '1948-09-30',
        death_date: null,
        native_place: "\u0BAE\u0BA4\u0BC1\u0BB0\u0BC8",
        father_id: 20,
        mother_id: 21,
        spouse_id: 14
    },
    {
        id: 16,
        name: "\u0B85\u0BB0\u0BCD\u0B9C\u0BC1\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0B86\u0BA3\u0BCD",
        spouse_name: "\u0BA4\u0BC0\u0BAA\u0BBE \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: "\u0BB0\u0BBE\u0B9C\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        mother_name: "\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        birth_date: '1970-03-22',
        death_date: null,
        native_place: "\u0B9A\u0BC6\u0BA9\u0BCD\u0BA9\u0BC8",
        father_id: 14,
        mother_id: 15,
        spouse_id: 17
    },
    {
        id: 17,
        name: "\u0BA4\u0BC0\u0BAA\u0BBE \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0BAA\u0BC6\u0BA3\u0BCD",
        spouse_name: "\u0B85\u0BB0\u0BCD\u0B9C\u0BC1\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: "\u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0B9A\u0BB0\u0BCD\u0BAE\u0BBE",
        mother_name: "\u0B85\u0BA9\u0BBF\u0BA4\u0BBE \u0B9A\u0BB0\u0BCD\u0BAE\u0BBE",
        birth_date: '1972-11-08',
        death_date: null,
        native_place: "\u0BAA\u0BC6\u0B99\u0BCD\u0B95\u0BB3\u0BC2\u0BB0\u0BCD",
        father_id: null,
        mother_id: null,
        spouse_id: 16
    },
    {
        id: 18,
        name: "\u0BAE\u0BCB\u0B95\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0B86\u0BA3\u0BCD",
        spouse_name: "\u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: null,
        mother_name: null,
        birth_date: '1920-01-05',
        death_date: '1990-12-15',
        native_place: "\u0B9A\u0BC6\u0BA9\u0BCD\u0BA9\u0BC8",
        father_id: null,
        mother_id: null,
        spouse_id: 19
    },
    {
        id: 19,
        name: "\u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        gender: "\u0BAA\u0BC6\u0BA3\u0BCD",
        spouse_name: "\u0BAE\u0BCB\u0B95\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
        father_name: null,
        mother_name: null,
        birth_date: '1925-04-20',
        death_date: '1995-08-10',
        native_place: "\u0B9A\u0BC6\u0BA9\u0BCD\u0BA9\u0BC8",
        father_id: null,
        mother_id: null,
        spouse_id: 18
    },
    {
        id: 20,
        name: "\u0BB5\u0BC6\u0B99\u0BCD\u0B95\u0B9F\u0BCD \u0BB0\u0BBE\u0BB5\u0BCD",
        gender: "\u0B86\u0BA3\u0BCD",
        spouse_name: "\u0B9A\u0BB0\u0BB8\u0BCD\u0BB5\u0BA4\u0BBF \u0BB0\u0BBE\u0BB5\u0BCD",
        father_name: null,
        mother_name: null,
        birth_date: '1922-07-12',
        death_date: '1992-03-18',
        native_place: "\u0BAE\u0BA4\u0BC1\u0BB0\u0BC8",
        father_id: null,
        mother_id: null,
        spouse_id: 21
    },
    {
        id: 21,
        name: "\u0B9A\u0BB0\u0BB8\u0BCD\u0BB5\u0BA4\u0BBF \u0BB0\u0BBE\u0BB5\u0BCD",
        gender: "\u0BAA\u0BC6\u0BA3\u0BCD",
        spouse_name: "\u0BB5\u0BC6\u0B99\u0BCD\u0B95\u0B9F\u0BCD \u0BB0\u0BBE\u0BB5\u0BCD",
        father_name: null,
        mother_name: null,
        birth_date: '1926-11-30',
        death_date: '1998-05-22',
        native_place: "\u0BAE\u0BA4\u0BC1\u0BB0\u0BC8",
        father_id: null,
        mother_id: null,
        spouse_id: 20
    }
];
const sampleCSV = `id,name,gender,spouse_name,father_name,mother_name,birth_date,death_date,native_place,father_id,mother_id,spouse_id
1,Rajan Kumar,Male,Priya Kumar,Mohan Kumar,Lakshmi Kumar,1945-05-15,2015-10-23,Chennai,5,6,2
2,Priya Kumar,Female,Rajan Kumar,Venkat Rao,Saraswati Rao,1948-09-30,,Madurai,7,8,1
3,Arjun Kumar,Male,Deepa Kumar,Rajan Kumar,Priya Kumar,1970-03-22,,Chennai,1,2,4
4,Deepa Kumar,Female,Arjun Kumar,Ramesh Sharma,Anita Sharma,1972-11-08,,Bangalore,9,10,3
5,Mohan Kumar,Male,Lakshmi Kumar,,,1920-01-05,1990-12-15,Chennai,,,6
6,Lakshmi Kumar,Female,Mohan Kumar,,,1925-04-20,1995-08-10,Chennai,,,5
7,Venkat Rao,Male,Saraswati Rao,,,1922-07-12,1992-03-18,Madurai,,,8
8,Saraswati Rao,Female,Venkat Rao,,,1926-11-30,1998-05-22,Madurai,,,7
9,Ramesh Sharma,Male,Anita Sharma,,,1945-08-16,2010-02-28,Bangalore,,,10
10,Anita Sharma,Female,Ramesh Sharma,,,1947-12-03,,Bangalore,,,9
11,Vikram Kumar,Male,Kavita Kumar,Arjun Kumar,Deepa Kumar,1995-06-20,,Chennai,3,4,12
12,Kavita Kumar,Female,Vikram Kumar,Dinesh Patel,Sunita Patel,1997-09-15,,Mumbai,,,11
13,Meera Kumar,Female,,Arjun Kumar,Deepa Kumar,1998-04-12,,Chennai,3,4,
14,\u{BB0}\u{BBE}\u{B9C}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{B86}\u{BA3}\u{BCD},\u{BAA}\u{BBF}\u{BB0}\u{BBF}\u{BAF}\u{BBE} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BAE}\u{BCB}\u{B95}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BB2}\u{B95}\u{BCD}\u{BB7}\u{BCD}\u{BAE}\u{BBF} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},1945-05-15,2015-10-23,\u{B9A}\u{BC6}\u{BA9}\u{BCD}\u{BA9}\u{BC8},18,19,15
15,\u{BAA}\u{BBF}\u{BB0}\u{BBF}\u{BAF}\u{BBE} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BAA}\u{BC6}\u{BA3}\u{BCD},\u{BB0}\u{BBE}\u{B9C}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BB5}\u{BC6}\u{B99}\u{BCD}\u{B95}\u{B9F}\u{BCD} \u{BB0}\u{BBE}\u{BB5}\u{BCD},\u{B9A}\u{BB0}\u{BB8}\u{BCD}\u{BB5}\u{BA4}\u{BBF} \u{BB0}\u{BBE}\u{BB5}\u{BCD},1948-09-30,,\u{BAE}\u{BA4}\u{BC1}\u{BB0}\u{BC8},20,21,14
16,\u{B85}\u{BB0}\u{BCD}\u{B9C}\u{BC1}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{B86}\u{BA3}\u{BCD},\u{BA4}\u{BC0}\u{BAA}\u{BBE} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BB0}\u{BBE}\u{B9C}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BAA}\u{BBF}\u{BB0}\u{BBF}\u{BAF}\u{BBE} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},1970-03-22,,\u{B9A}\u{BC6}\u{BA9}\u{BCD}\u{BA9}\u{BC8},14,15,17
17,\u{BA4}\u{BC0}\u{BAA}\u{BBE} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BAA}\u{BC6}\u{BA3}\u{BCD},\u{B85}\u{BB0}\u{BCD}\u{B9C}\u{BC1}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BB0}\u{BAE}\u{BC7}\u{BB7}\u{BCD} \u{B9A}\u{BB0}\u{BCD}\u{BAE}\u{BBE},\u{B85}\u{BA9}\u{BBF}\u{BA4}\u{BBE} \u{B9A}\u{BB0}\u{BCD}\u{BAE}\u{BBE},1972-11-08,,\u{BAA}\u{BC6}\u{B99}\u{BCD}\u{B95}\u{BB3}\u{BC2}\u{BB0}\u{BCD},,,16
18,\u{BAE}\u{BCB}\u{B95}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{B86}\u{BA3}\u{BCD},\u{BB2}\u{B95}\u{BCD}\u{BB7}\u{BCD}\u{BAE}\u{BBF} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},,,1920-01-05,1990-12-15,\u{B9A}\u{BC6}\u{BA9}\u{BCD}\u{BA9}\u{BC8},,,19
19,\u{BB2}\u{B95}\u{BCD}\u{BB7}\u{BCD}\u{BAE}\u{BBF} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},\u{BAA}\u{BC6}\u{BA3}\u{BCD},\u{BAE}\u{BCB}\u{B95}\u{BA9}\u{BCD} \u{B95}\u{BC1}\u{BAE}\u{BBE}\u{BB0}\u{BCD},,,1925-04-20,1995-08-10,\u{B9A}\u{BC6}\u{BA9}\u{BCD}\u{BA9}\u{BC8},,,18
20,\u{BB5}\u{BC6}\u{B99}\u{BCD}\u{B95}\u{B9F}\u{BCD} \u{BB0}\u{BBE}\u{BB5}\u{BCD},\u{B86}\u{BA3}\u{BCD},\u{B9A}\u{BB0}\u{BB8}\u{BCD}\u{BB5}\u{BA4}\u{BBF} \u{BB0}\u{BBE}\u{BB5}\u{BCD},,,1922-07-12,1992-03-18,\u{BAE}\u{BA4}\u{BC1}\u{BB0}\u{BC8},,,21
21,\u{B9A}\u{BB0}\u{BB8}\u{BCD}\u{BB5}\u{BA4}\u{BBF} \u{BB0}\u{BBE}\u{BB5}\u{BCD},\u{BAA}\u{BC6}\u{BA3}\u{BCD},\u{BB5}\u{BC6}\u{B99}\u{BCD}\u{B95}\u{B9F}\u{BCD} \u{BB0}\u{BBE}\u{BB5}\u{BCD},,,1926-11-30,1998-05-22,\u{BAE}\u{BA4}\u{BC1}\u{BB0}\u{BC8},,,20`;
exports.default = {
    sampleData,
    sampleCSV
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["hsGyZ","CZVuU"], "CZVuU", "parcelRequirea7a4")

//# sourceMappingURL=family-tree.d51dc617.js.map
