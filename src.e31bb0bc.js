// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\assets\\wave-path.svg":[["wave-path.c8df777f.svg","assets/wave-path.svg"],"assets/wave-path.svg"],"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/parallax-js/dist/parallax.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var process = require("process");
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.Parallax = f();
  }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof require == "function" && require;

    for (var o = 0; o < r.length; o++) s(r[o]);

    return s;
  }({
    1: [function (require, module, exports) {
      /*
      object-assign
      (c) Sindre Sorhus
      @license MIT
      */
      'use strict';
      /* eslint-disable no-unused-vars */

      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;

      function toObject(val) {
        if (val === null || val === undefined) {
          throw new TypeError('Object.assign cannot be called with null or undefined');
        }

        return Object(val);
      }

      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          } // Detect buggy property enumeration order in older V8 versions.
          // https://bugs.chromium.org/p/v8/issues/detail?id=4118


          var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

          test1[5] = 'de';

          if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
          } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


          var test2 = {};

          for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
          }

          var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
          });

          if (order2.join('') !== '0123456789') {
            return false;
          } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


          var test3 = {};
          'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            test3[letter] = letter;
          });

          if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
            return false;
          }

          return true;
        } catch (err) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
        }
      }

      module.exports = shouldUseNative() ? Object.assign : function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }

          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);

            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }

        return to;
      };
    }, {}],
    2: [function (require, module, exports) {
      (function (process) {
        // Generated by CoffeeScript 1.12.2
        (function () {
          var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

          if (typeof performance !== "undefined" && performance !== null && performance.now) {
            module.exports = function () {
              return performance.now();
            };
          } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
            module.exports = function () {
              return (getNanoSeconds() - nodeLoadTime) / 1e6;
            };

            hrtime = process.hrtime;

            getNanoSeconds = function () {
              var hr;
              hr = hrtime();
              return hr[0] * 1e9 + hr[1];
            };

            moduleLoadTime = getNanoSeconds();
            upTime = process.uptime() * 1e9;
            nodeLoadTime = moduleLoadTime - upTime;
          } else if (Date.now) {
            module.exports = function () {
              return Date.now() - loadTime;
            };

            loadTime = Date.now();
          } else {
            module.exports = function () {
              return new Date().getTime() - loadTime;
            };

            loadTime = new Date().getTime();
          }
        }).call(this);
      }).call(this, require('_process'));
    }, {
      "_process": 3
    }],
    3: [function (require, module, exports) {
      // shim for using process in browser
      var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }

      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }

      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }

        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();

      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        } // if setTimeout wasn't available but was latter defined


        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }

        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }

      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        } // if clearTimeout wasn't available but was latter defined


        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }

        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }

      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }

        draining = false;

        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }

        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }

        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;

        while (len) {
          currentQueue = queue;
          queue = [];

          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }

          queueIndex = -1;
          len = queue.length;
        }

        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);

        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }

        queue.push(new Item(fun, args));

        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      }; // v8 likes predictible objects


      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }

      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };

      process.title = 'browser';
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues

      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };

      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };

      process.umask = function () {
        return 0;
      };
    }, {}],
    4: [function (require, module, exports) {
      (function (global) {
        var now = require('performance-now'),
            root = typeof window === 'undefined' ? global : window,
            vendors = ['moz', 'webkit'],
            suffix = 'AnimationFrame',
            raf = root['request' + suffix],
            caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

        for (var i = 0; !raf && i < vendors.length; i++) {
          raf = root[vendors[i] + 'Request' + suffix];
          caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
        } // Some versions of FF have rAF but not cAF


        if (!raf || !caf) {
          var last = 0,
              id = 0,
              queue = [],
              frameDuration = 1000 / 60;

          raf = function (callback) {
            if (queue.length === 0) {
              var _now = now(),
                  next = Math.max(0, frameDuration - (_now - last));

              last = next + _now;
              setTimeout(function () {
                var cp = queue.slice(0); // Clear queue here to prevent
                // callbacks from appending listeners
                // to the current frame's queue

                queue.length = 0;

                for (var i = 0; i < cp.length; i++) {
                  if (!cp[i].cancelled) {
                    try {
                      cp[i].callback(last);
                    } catch (e) {
                      setTimeout(function () {
                        throw e;
                      }, 0);
                    }
                  }
                }
              }, Math.round(next));
            }

            queue.push({
              handle: ++id,
              callback: callback,
              cancelled: false
            });
            return id;
          };

          caf = function (handle) {
            for (var i = 0; i < queue.length; i++) {
              if (queue[i].handle === handle) {
                queue[i].cancelled = true;
              }
            }
          };
        }

        module.exports = function (fn) {
          // Wrap in a new function to prevent
          // `cancel` potentially being assigned
          // to the native rAF function
          return raf.call(root, fn);
        };

        module.exports.cancel = function () {
          caf.apply(root, arguments);
        };

        module.exports.polyfill = function () {
          root.requestAnimationFrame = raf;
          root.cancelAnimationFrame = caf;
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "performance-now": 2
    }],
    5: [function (require, module, exports) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
      * Parallax.js
      * @author Matthew Wagerfield - @wagerfield, René Roth - mail@reneroth.org
      * @description Creates a parallax effect between an array of layers,
      *              driving the motion from the gyroscope output of a smartdevice.
      *              If no gyroscope is available, the cursor position is used.
      */


      var rqAnFr = require('raf');

      var objectAssign = require('object-assign');

      var helpers = {
        propertyCache: {},
        vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],
        clamp: function clamp(value, min, max) {
          return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
        },
        data: function data(element, name) {
          return helpers.deserialize(element.getAttribute('data-' + name));
        },
        deserialize: function deserialize(value) {
          if (value === 'true') {
            return true;
          } else if (value === 'false') {
            return false;
          } else if (value === 'null') {
            return null;
          } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
          } else {
            return value;
          }
        },
        camelCase: function camelCase(value) {
          return value.replace(/-+(.)?/g, function (match, character) {
            return character ? character.toUpperCase() : '';
          });
        },
        accelerate: function accelerate(element) {
          helpers.css(element, 'transform', 'translate3d(0,0,0) rotate(0.0001deg)');
          helpers.css(element, 'transform-style', 'preserve-3d');
          helpers.css(element, 'backface-visibility', 'hidden');
        },
        transformSupport: function transformSupport(value) {
          var element = document.createElement('div'),
              propertySupport = false,
              propertyValue = null,
              featureSupport = false,
              cssProperty = null,
              jsProperty = null;

          for (var i = 0, l = helpers.vendors.length; i < l; i++) {
            if (helpers.vendors[i] !== null) {
              cssProperty = helpers.vendors[i][0] + 'transform';
              jsProperty = helpers.vendors[i][1] + 'Transform';
            } else {
              cssProperty = 'transform';
              jsProperty = 'transform';
            }

            if (element.style[jsProperty] !== undefined) {
              propertySupport = true;
              break;
            }
          }

          switch (value) {
            case '2D':
              featureSupport = propertySupport;
              break;

            case '3D':
              if (propertySupport) {
                var body = document.body || document.createElement('body'),
                    documentElement = document.documentElement,
                    documentOverflow = documentElement.style.overflow,
                    isCreatedBody = false;

                if (!document.body) {
                  isCreatedBody = true;
                  documentElement.style.overflow = 'hidden';
                  documentElement.appendChild(body);
                  body.style.overflow = 'hidden';
                  body.style.background = '';
                }

                body.appendChild(element);
                element.style[jsProperty] = 'translate3d(1px,1px,1px)';
                propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
                featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== 'none';
                documentElement.style.overflow = documentOverflow;
                body.removeChild(element);

                if (isCreatedBody) {
                  body.removeAttribute('style');
                  body.parentNode.removeChild(body);
                }
              }

              break;
          }

          return featureSupport;
        },
        css: function css(element, property, value) {
          var jsProperty = helpers.propertyCache[property];

          if (!jsProperty) {
            for (var i = 0, l = helpers.vendors.length; i < l; i++) {
              if (helpers.vendors[i] !== null) {
                jsProperty = helpers.camelCase(helpers.vendors[i][1] + '-' + property);
              } else {
                jsProperty = property;
              }

              if (element.style[jsProperty] !== undefined) {
                helpers.propertyCache[property] = jsProperty;
                break;
              }
            }
          }

          element.style[jsProperty] = value;
        }
      };
      var MAGIC_NUMBER = 30,
          DEFAULTS = {
        relativeInput: false,
        clipRelativeInput: false,
        inputElement: null,
        hoverOnly: false,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10.0,
        scalarY: 10.0,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
        pointerEvents: false,
        precision: 1,
        onReady: null,
        selector: null
      };

      var Parallax = function () {
        function Parallax(element, options) {
          _classCallCheck(this, Parallax);

          this.element = element;
          var data = {
            calibrateX: helpers.data(this.element, 'calibrate-x'),
            calibrateY: helpers.data(this.element, 'calibrate-y'),
            invertX: helpers.data(this.element, 'invert-x'),
            invertY: helpers.data(this.element, 'invert-y'),
            limitX: helpers.data(this.element, 'limit-x'),
            limitY: helpers.data(this.element, 'limit-y'),
            scalarX: helpers.data(this.element, 'scalar-x'),
            scalarY: helpers.data(this.element, 'scalar-y'),
            frictionX: helpers.data(this.element, 'friction-x'),
            frictionY: helpers.data(this.element, 'friction-y'),
            originX: helpers.data(this.element, 'origin-x'),
            originY: helpers.data(this.element, 'origin-y'),
            pointerEvents: helpers.data(this.element, 'pointer-events'),
            precision: helpers.data(this.element, 'precision'),
            relativeInput: helpers.data(this.element, 'relative-input'),
            clipRelativeInput: helpers.data(this.element, 'clip-relative-input'),
            hoverOnly: helpers.data(this.element, 'hover-only'),
            inputElement: document.querySelector(helpers.data(this.element, 'input-element')),
            selector: helpers.data(this.element, 'selector')
          };

          for (var key in data) {
            if (data[key] === null) {
              delete data[key];
            }
          }

          objectAssign(this, DEFAULTS, data, options);

          if (!this.inputElement) {
            this.inputElement = this.element;
          }

          this.calibrationTimer = null;
          this.calibrationFlag = true;
          this.enabled = false;
          this.depthsX = [];
          this.depthsY = [];
          this.raf = null;
          this.bounds = null;
          this.elementPositionX = 0;
          this.elementPositionY = 0;
          this.elementWidth = 0;
          this.elementHeight = 0;
          this.elementCenterX = 0;
          this.elementCenterY = 0;
          this.elementRangeX = 0;
          this.elementRangeY = 0;
          this.calibrationX = 0;
          this.calibrationY = 0;
          this.inputX = 0;
          this.inputY = 0;
          this.motionX = 0;
          this.motionY = 0;
          this.velocityX = 0;
          this.velocityY = 0;
          this.onMouseMove = this.onMouseMove.bind(this);
          this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
          this.onDeviceMotion = this.onDeviceMotion.bind(this);
          this.onOrientationTimer = this.onOrientationTimer.bind(this);
          this.onMotionTimer = this.onMotionTimer.bind(this);
          this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
          this.onAnimationFrame = this.onAnimationFrame.bind(this);
          this.onWindowResize = this.onWindowResize.bind(this);
          this.windowWidth = null;
          this.windowHeight = null;
          this.windowCenterX = null;
          this.windowCenterY = null;
          this.windowRadiusX = null;
          this.windowRadiusY = null;
          this.portrait = false;
          this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
          this.motionSupport = !!window.DeviceMotionEvent && !this.desktop;
          this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop;
          this.orientationStatus = 0;
          this.motionStatus = 0;
          this.initialise();
        }

        _createClass(Parallax, [{
          key: 'initialise',
          value: function initialise() {
            if (this.transform2DSupport === undefined) {
              this.transform2DSupport = helpers.transformSupport('2D');
              this.transform3DSupport = helpers.transformSupport('3D');
            } // Configure Context Styles


            if (this.transform3DSupport) {
              helpers.accelerate(this.element);
            }

            var style = window.getComputedStyle(this.element);

            if (style.getPropertyValue('position') === 'static') {
              this.element.style.position = 'relative';
            } // Pointer events


            if (!this.pointerEvents) {
              this.element.style.pointerEvents = 'none';
            } // Setup


            this.updateLayers();
            this.updateDimensions();
            this.enable();
            this.queueCalibration(this.calibrationDelay);
          }
        }, {
          key: 'doReadyCallback',
          value: function doReadyCallback() {
            if (this.onReady) {
              this.onReady();
            }
          }
        }, {
          key: 'updateLayers',
          value: function updateLayers() {
            if (this.selector) {
              this.layers = this.element.querySelectorAll(this.selector);
            } else {
              this.layers = this.element.children;
            }

            if (!this.layers.length) {
              console.warn('ParallaxJS: Your scene does not have any layers.');
            }

            this.depthsX = [];
            this.depthsY = [];

            for (var index = 0; index < this.layers.length; index++) {
              var layer = this.layers[index];

              if (this.transform3DSupport) {
                helpers.accelerate(layer);
              }

              layer.style.position = index ? 'absolute' : 'relative';
              layer.style.display = 'block';
              layer.style.left = 0;
              layer.style.top = 0;
              var depth = helpers.data(layer, 'depth') || 0;
              this.depthsX.push(helpers.data(layer, 'depth-x') || depth);
              this.depthsY.push(helpers.data(layer, 'depth-y') || depth);
            }
          }
        }, {
          key: 'updateDimensions',
          value: function updateDimensions() {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.windowCenterX = this.windowWidth * this.originX;
            this.windowCenterY = this.windowHeight * this.originY;
            this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX);
            this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY);
          }
        }, {
          key: 'updateBounds',
          value: function updateBounds() {
            this.bounds = this.inputElement.getBoundingClientRect();
            this.elementPositionX = this.bounds.left;
            this.elementPositionY = this.bounds.top;
            this.elementWidth = this.bounds.width;
            this.elementHeight = this.bounds.height;
            this.elementCenterX = this.elementWidth * this.originX;
            this.elementCenterY = this.elementHeight * this.originY;
            this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX);
            this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY);
          }
        }, {
          key: 'queueCalibration',
          value: function queueCalibration(delay) {
            clearTimeout(this.calibrationTimer);
            this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
          }
        }, {
          key: 'enable',
          value: function enable() {
            if (this.enabled) {
              return;
            }

            this.enabled = true;

            if (this.orientationSupport) {
              this.portrait = false;
              window.addEventListener('deviceorientation', this.onDeviceOrientation);
              this.detectionTimer = setTimeout(this.onOrientationTimer, this.supportDelay);
            } else if (this.motionSupport) {
              this.portrait = false;
              window.addEventListener('devicemotion', this.onDeviceMotion);
              this.detectionTimer = setTimeout(this.onMotionTimer, this.supportDelay);
            } else {
              this.calibrationX = 0;
              this.calibrationY = 0;
              this.portrait = false;
              window.addEventListener('mousemove', this.onMouseMove);
              this.doReadyCallback();
            }

            window.addEventListener('resize', this.onWindowResize);
            this.raf = rqAnFr(this.onAnimationFrame);
          }
        }, {
          key: 'disable',
          value: function disable() {
            if (!this.enabled) {
              return;
            }

            this.enabled = false;

            if (this.orientationSupport) {
              window.removeEventListener('deviceorientation', this.onDeviceOrientation);
            } else if (this.motionSupport) {
              window.removeEventListener('devicemotion', this.onDeviceMotion);
            } else {
              window.removeEventListener('mousemove', this.onMouseMove);
            }

            window.removeEventListener('resize', this.onWindowResize);
            rqAnFr.cancel(this.raf);
          }
        }, {
          key: 'calibrate',
          value: function calibrate(x, y) {
            this.calibrateX = x === undefined ? this.calibrateX : x;
            this.calibrateY = y === undefined ? this.calibrateY : y;
          }
        }, {
          key: 'invert',
          value: function invert(x, y) {
            this.invertX = x === undefined ? this.invertX : x;
            this.invertY = y === undefined ? this.invertY : y;
          }
        }, {
          key: 'friction',
          value: function friction(x, y) {
            this.frictionX = x === undefined ? this.frictionX : x;
            this.frictionY = y === undefined ? this.frictionY : y;
          }
        }, {
          key: 'scalar',
          value: function scalar(x, y) {
            this.scalarX = x === undefined ? this.scalarX : x;
            this.scalarY = y === undefined ? this.scalarY : y;
          }
        }, {
          key: 'limit',
          value: function limit(x, y) {
            this.limitX = x === undefined ? this.limitX : x;
            this.limitY = y === undefined ? this.limitY : y;
          }
        }, {
          key: 'origin',
          value: function origin(x, y) {
            this.originX = x === undefined ? this.originX : x;
            this.originY = y === undefined ? this.originY : y;
          }
        }, {
          key: 'setInputElement',
          value: function setInputElement(element) {
            this.inputElement = element;
            this.updateDimensions();
          }
        }, {
          key: 'setPosition',
          value: function setPosition(element, x, y) {
            x = x.toFixed(this.precision) + 'px';
            y = y.toFixed(this.precision) + 'px';

            if (this.transform3DSupport) {
              helpers.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)');
            } else if (this.transform2DSupport) {
              helpers.css(element, 'transform', 'translate(' + x + ',' + y + ')');
            } else {
              element.style.left = x;
              element.style.top = y;
            }
          }
        }, {
          key: 'onOrientationTimer',
          value: function onOrientationTimer() {
            if (this.orientationSupport && this.orientationStatus === 0) {
              this.disable();
              this.orientationSupport = false;
              this.enable();
            } else {
              this.doReadyCallback();
            }
          }
        }, {
          key: 'onMotionTimer',
          value: function onMotionTimer() {
            if (this.motionSupport && this.motionStatus === 0) {
              this.disable();
              this.motionSupport = false;
              this.enable();
            } else {
              this.doReadyCallback();
            }
          }
        }, {
          key: 'onCalibrationTimer',
          value: function onCalibrationTimer() {
            this.calibrationFlag = true;
          }
        }, {
          key: 'onWindowResize',
          value: function onWindowResize() {
            this.updateDimensions();
          }
        }, {
          key: 'onAnimationFrame',
          value: function onAnimationFrame() {
            this.updateBounds();
            var calibratedInputX = this.inputX - this.calibrationX,
                calibratedInputY = this.inputY - this.calibrationY;

            if (Math.abs(calibratedInputX) > this.calibrationThreshold || Math.abs(calibratedInputY) > this.calibrationThreshold) {
              this.queueCalibration(0);
            }

            if (this.portrait) {
              this.motionX = this.calibrateX ? calibratedInputY : this.inputY;
              this.motionY = this.calibrateY ? calibratedInputX : this.inputX;
            } else {
              this.motionX = this.calibrateX ? calibratedInputX : this.inputX;
              this.motionY = this.calibrateY ? calibratedInputY : this.inputY;
            }

            this.motionX *= this.elementWidth * (this.scalarX / 100);
            this.motionY *= this.elementHeight * (this.scalarY / 100);

            if (!isNaN(parseFloat(this.limitX))) {
              this.motionX = helpers.clamp(this.motionX, -this.limitX, this.limitX);
            }

            if (!isNaN(parseFloat(this.limitY))) {
              this.motionY = helpers.clamp(this.motionY, -this.limitY, this.limitY);
            }

            this.velocityX += (this.motionX - this.velocityX) * this.frictionX;
            this.velocityY += (this.motionY - this.velocityY) * this.frictionY;

            for (var index = 0; index < this.layers.length; index++) {
              var layer = this.layers[index],
                  depthX = this.depthsX[index],
                  depthY = this.depthsY[index],
                  xOffset = this.velocityX * (depthX * (this.invertX ? -1 : 1)),
                  yOffset = this.velocityY * (depthY * (this.invertY ? -1 : 1));
              this.setPosition(layer, xOffset, yOffset);
            }

            this.raf = rqAnFr(this.onAnimationFrame);
          }
        }, {
          key: 'rotate',
          value: function rotate(beta, gamma) {
            // Extract Rotation
            var x = (beta || 0) / MAGIC_NUMBER,
                //  -90 :: 90
            y = (gamma || 0) / MAGIC_NUMBER; // -180 :: 180
            // Detect Orientation Change

            var portrait = this.windowHeight > this.windowWidth;

            if (this.portrait !== portrait) {
              this.portrait = portrait;
              this.calibrationFlag = true;
            }

            if (this.calibrationFlag) {
              this.calibrationFlag = false;
              this.calibrationX = x;
              this.calibrationY = y;
            }

            this.inputX = x;
            this.inputY = y;
          }
        }, {
          key: 'onDeviceOrientation',
          value: function onDeviceOrientation(event) {
            var beta = event.beta;
            var gamma = event.gamma;

            if (beta !== null && gamma !== null) {
              this.orientationStatus = 1;
              this.rotate(beta, gamma);
            }
          }
        }, {
          key: 'onDeviceMotion',
          value: function onDeviceMotion(event) {
            var beta = event.rotationRate.beta;
            var gamma = event.rotationRate.gamma;

            if (beta !== null && gamma !== null) {
              this.motionStatus = 1;
              this.rotate(beta, gamma);
            }
          }
        }, {
          key: 'onMouseMove',
          value: function onMouseMove(event) {
            var clientX = event.clientX,
                clientY = event.clientY; // reset input to center if hoverOnly is set and we're not hovering the element

            if (this.hoverOnly && (clientX < this.elementPositionX || clientX > this.elementPositionX + this.elementWidth || clientY < this.elementPositionY || clientY > this.elementPositionY + this.elementHeight)) {
              this.inputX = 0;
              this.inputY = 0;
              return;
            }

            if (this.relativeInput) {
              // Clip mouse coordinates inside element bounds.
              if (this.clipRelativeInput) {
                clientX = Math.max(clientX, this.elementPositionX);
                clientX = Math.min(clientX, this.elementPositionX + this.elementWidth);
                clientY = Math.max(clientY, this.elementPositionY);
                clientY = Math.min(clientY, this.elementPositionY + this.elementHeight);
              } // Calculate input relative to the element.


              if (this.elementRangeX && this.elementRangeY) {
                this.inputX = (clientX - this.elementPositionX - this.elementCenterX) / this.elementRangeX;
                this.inputY = (clientY - this.elementPositionY - this.elementCenterY) / this.elementRangeY;
              }
            } else {
              // Calculate input relative to the window.
              if (this.windowRadiusX && this.windowRadiusY) {
                this.inputX = (clientX - this.windowCenterX) / this.windowRadiusX;
                this.inputY = (clientY - this.windowCenterY) / this.windowRadiusY;
              }
            }
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.disable();
            clearTimeout(this.calibrationTimer);
            clearTimeout(this.detectionTimer);
            this.element.removeAttribute('style');

            for (var index = 0; index < this.layers.length; index++) {
              this.layers[index].removeAttribute('style');
            }

            delete this.element;
            delete this.layers;
          }
        }, {
          key: 'version',
          value: function version() {
            return '3.1.0';
          }
        }]);

        return Parallax;
      }();

      module.exports = Parallax;
    }, {
      "object-assign": 1,
      "raf": 4
    }]
  }, {}, [5])(5);
});
},{"process":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/*! smooth-scroll v16.1.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o)}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(q){"use strict";var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a)}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A)},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e)};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b))}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n=r(a.hash);if("#"===n){if(!A.topOnEmptyHash)return;t=document.documentElement}else t=document.querySelector(n);(t=t||"#top"!==n?t:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href)}})(A),M.animateScroll(t,a))}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1})}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null)};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1)})(),M}}));
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.scss");

var _parallaxJs = _interopRequireDefault(require("parallax-js"));

var _smoothScroll = _interopRequireDefault(require("smooth-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libraries
var libs = {
  parallaxes: function parallaxes() {
    var phoneBg = document.querySelector(".phone-bg__scene");
    return new _parallaxJs.default(phoneBg);
  },
  smmothScroll: function smmothScroll() {
    var scroll = new _smoothScroll.default('a[href*="#"]');
    return scroll;
  },
  init: function init() {
    this.parallaxes();
    this.smmothScroll();
  }
};
libs.init();
},{"./styles/main.scss":"styles/main.scss","parallax-js":"../node_modules/parallax-js/dist/parallax.js","smooth-scroll":"../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60841" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map