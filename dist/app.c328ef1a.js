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
})({"node_modules/@firebase/util/dist/index.esm2017.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.issuedAtTime = exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.validateArgCount = exports.uuidv4 = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,

  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,

  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws an error if the provided assertion is falsy
 */

exports.CONSTANTS = CONSTANTS;

const assert = function (assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */


exports.assert = assert;

const assertionError = function (message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.assertionError = assertionError;

const stringToByteArray$1 = function (str) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */


const byteArrayToString = function (bytes) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let pos = 0,
      c = 0;

  while (pos < bytes.length) {
    const c1 = bytes[pos++];

    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }

  return out.join('');
}; // We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()


const base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,

  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,

  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,

  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,

  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',

  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },

  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },

  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',

  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }

    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];

    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 0x3f;

      if (!haveByte3) {
        outByte4 = 64;

        if (!haveByte2) {
          outByte3 = 64;
        }
      }

      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }

    return output.join('');
  },

  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }

    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },

  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }

    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },

  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];

    for (let i = 0; i < input.length;) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;

      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }

      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);

      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);

        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }

    return output;
  },

  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {}; // We want quick mappings back and forth, so we precompute two maps.

      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i; // Be forgiving when decoding and correctly decode both encodings.

        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }

};
/**
 * URL-safe base64 encoding
 */

exports.base64 = base64;

const base64Encode = function (str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */


exports.base64Encode = base64Encode;

const base64urlEncodeWithoutPadding = function (str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */


exports.base64urlEncodeWithoutPadding = base64urlEncodeWithoutPadding;

const base64Decode = function (str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }

  return null;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */


exports.base64Decode = base64Decode;

function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */


function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      const dateValue = source;
      return new Date(dateValue.getTime());

    case Object:
      if (target === undefined) {
        target = {};
      }

      break;

    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;

    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }

  for (const prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }

    target[prop] = deepExtend(target[prop], source[prop]);
  }

  return target;
}

function isValidKey(key) {
  return key !== '__proto__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Deferred {
  constructor() {
    this.reject = () => {};

    this.resolve = () => {};

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */


  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }

      if (typeof callback === 'function') {
        // Attaching noop handler just in case developer wasn't expecting
        // promises
        this.promise.catch(() => {}); // Some of our callbacks don't expect a value and our own tests
        // assert that the parameter length is 1

        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }

}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Deferred = Deferred;

function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  } // Unsecured JWTs use "none" as the algorithm.


  const header = {
    alg: 'none',
    type: 'JWT'
  };
  const project = projectId || 'demo-project';
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;

  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }

  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token); // Unsecured JWTs use the empty string as a signature.

  const signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */


function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */


function isMobileCordova() {
  return typeof window !== 'undefined' && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/


function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment
 */


function isBrowser() {
  return typeof self === 'object' && self.self === self;
}

function isBrowserExtension() {
  const runtime = typeof chrome === 'object' ? chrome.runtime : typeof browser === 'object' ? browser.runtime : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */


function isReactNative() {
  return typeof navigator === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */


function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */


function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */


function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */


function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */


function isSafari() {
  return !isNode() && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */


function isIndexedDBAvailable() {
  return typeof indexedDB === 'object';
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */


function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);

      request.onsuccess = () => {
        request.result.close(); // delete database only when it doesn't pre-exist

        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }

        resolve(true);
      };

      request.onupgradeneeded = () => {
        preExist = false;
      };

      request.onerror = () => {
        var _a;

        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */


function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }

  return true;
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */


function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if ((e as FirebaseError)?.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */


const ERROR_NAME = 'FirebaseError'; // Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

class FirebaseError extends Error {
  constructor(
  /** The error code for this error. */
  code, message,
  /** Custom data for this error. */
  customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    /** The custom name for all FirebaseErrors. */

    this.name = ERROR_NAME; // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, FirebaseError.prototype); // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }

}

exports.FirebaseError = FirebaseError;

class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }

  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : 'Error'; // Service Name: Error message (service/code).

    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }

}

exports.ErrorFactory = ErrorFactory;

function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}

const PATTERN = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */

function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */


function stringify(data) {
  return JSON.stringify(data);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


const decode = function (token) {
  let header = {},
      claims = {},
      data = {},
      signature = '';

  try {
    const parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}

  return {
    header,
    claims,
    data,
    signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.decode = decode;

const isValidTimestamp = function (token) {
  const claims = decode(token).claims;
  const now = Math.floor(new Date().getTime() / 1000);
  let validSince = 0,
      validUntil = 0;

  if (typeof claims === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }

    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }

  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidTimestamp = isValidTimestamp;

const issuedAtTime = function (token) {
  const claims = decode(token).claims;

  if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }

  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.issuedAtTime = issuedAtTime;

const isValidFormat = function (token) {
  const decoded = decode(token),
        claims = decoded.claims;
  return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidFormat = isValidFormat;

const isAdmin = function (token) {
  const claims = decode(token).claims;
  return typeof claims === 'object' && claims['admin'] === true;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.isAdmin = isAdmin;

function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function map(obj, fn, contextObj) {
  const res = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }

  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }

    const aProp = a[k];
    const bProp = b[k];

    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }

  return true;
}

function isObject(thing) {
  return thing !== null && typeof thing === 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */


function querystring(querystringParams) {
  const params = [];

  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach(arrayVal => {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */


function querystringDecode(querystring) {
  const obj = {};
  const tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(token => {
    if (token) {
      const [key, value] = token.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */


function extractQuerystring(url) {
  const queryStart = url.indexOf('?');

  if (!queryStart) {
    return '';
  }

  const fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */

/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */


class Sha1 {
  constructor() {
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */

    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */

    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */

    this.pad_ = [];
    /**
     * @private {number}
     */

    this.inbuf_ = 0;
    /**
     * @private {number}
     */

    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;

    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }

    this.reset();
  }

  reset() {
    this.chain_[0] = 0x67452301;
    this.chain_[1] = 0xefcdab89;
    this.chain_[2] = 0x98badcfe;
    this.chain_[3] = 0x10325476;
    this.chain_[4] = 0xc3d2e1f0;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */


  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }

    const W = this.W_; // get 16 big endian words

    if (typeof buf === 'string') {
      for (let i = 0; i < 16; i++) {
        // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
        // have a bug that turns the post-increment ++ operator into pre-increment
        // during JIT compilation.  We have code that depends heavily on SHA-1 for
        // correctness and which is affected by this bug, so I've removed all uses
        // of post-increment ++ in which the result value is used.  We can revert
        // this change once the Safari bug
        // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
        // most clients have been updated.
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    } // expand to 80 words


    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 0xffffffff;
    }

    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k; // TODO(user): Try to unroll this loop to speed up the computation.

    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 0x5a827999;
        } else {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
      }

      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 0xffffffff;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 0xffffffff;
      b = a;
      a = t;
    }

    this.chain_[0] = this.chain_[0] + a & 0xffffffff;
    this.chain_[1] = this.chain_[1] + b & 0xffffffff;
    this.chain_[2] = this.chain_[2] + c & 0xffffffff;
    this.chain_[3] = this.chain_[3] + d & 0xffffffff;
    this.chain_[4] = this.chain_[4] + e & 0xffffffff;
  }

  update(bytes, length) {
    // TODO(johnlenz): tighten the function signature and remove this check
    if (bytes == null) {
      return;
    }

    if (length === undefined) {
      length = bytes.length;
    }

    const lengthMinusBlock = length - this.blockSize;
    let n = 0; // Using local instead of member variables gives ~5% speedup on Firefox 16.

    const buf = this.buf_;
    let inbuf = this.inbuf_; // The outer while loop should execute at most twice.

    while (n < length) {
      // When we have no data in the block to top up, we can directly process the
      // input buffer (assuming it contains sufficient data). This gives ~25%
      // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
      // the data is provided in large chunks (or in multiples of 64 bytes).
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }

      if (typeof bytes === 'string') {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      }
    }

    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */


  digest() {
    const digest = [];
    let totalBits = this.total_ * 8; // Add pad 0x80 0x00*.

    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    } // Add # bits.


    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256; // Don't use bit-shifting here!
    }

    this.compress_(this.buf_);
    let n = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }

    return digest;
  }

}
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */


exports.Sha1 = Sha1;

function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */


class ObserverProxy {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0; // Micro-task scheduling by calling task.then().

    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers; // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.

    this.task.then(() => {
      executor(this);
    }).catch(e => {
      this.error(e);
    });
  }

  next(value) {
    this.forEachObserver(observer => {
      observer.next(value);
    });
  }

  error(error) {
    this.forEachObserver(observer => {
      observer.error(error);
    });
    this.close(error);
  }

  complete() {
    this.forEachObserver(observer => {
      observer.complete();
    });
    this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */


  subscribe(nextOrObserver, error, complete) {
    let observer;

    if (nextOrObserver === undefined && error === undefined && complete === undefined) {
      throw new Error('Missing Observer.');
    } // Assemble an Observer object when passed as callback functions.


    if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }

    if (observer.next === undefined) {
      observer.next = noop;
    }

    if (observer.error === undefined) {
      observer.error = noop;
    }

    if (observer.complete === undefined) {
      observer.complete = noop;
    }

    const unsub = this.unsubscribeOne.bind(this, this.observers.length); // Attempt to subscribe to a terminated Observable - we
    // just respond to the Observer with the final error or complete
    // event.

    if (this.finalized) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {// nothing
        }

        return;
      });
    }

    this.observers.push(observer);
    return unsub;
  } // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.


  unsubscribeOne(i) {
    if (this.observers === undefined || this.observers[i] === undefined) {
      return;
    }

    delete this.observers[i];
    this.observerCount -= 1;

    if (this.observerCount === 0 && this.onNoObservers !== undefined) {
      this.onNoObservers(this);
    }
  }

  forEachObserver(fn) {
    if (this.finalized) {
      // Already closed by previous event....just eat the additional values.
      return;
    } // Since sendOne calls asynchronously - there is no chance that
    // this.observers will become undefined.


    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  } // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.


  sendOne(i, fn) {
    // Execute the callback asynchronously
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      if (this.observers !== undefined && this.observers[i] !== undefined) {
        try {
          fn(this.observers[i]);
        } catch (e) {
          // Ignore exceptions raised in Observers or missing methods of an
          // Observer.
          // Log error to console. b/31404806
          if (typeof console !== 'undefined' && console.error) {
            console.error(e);
          }
        }
      }
    });
  }

  close(err) {
    if (this.finalized) {
      return;
    }

    this.finalized = true;

    if (err !== undefined) {
      this.finalError = err;
    } // Proxy is no longer needed - garbage collect references
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    this.task.then(() => {
      this.observers = undefined;
      this.onNoObservers = undefined;
    });
  }

}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(fn, onError) {
  return (...args) => {
    Promise.resolve(true).then(() => {
      fn(...args);
    }).catch(error => {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */


function implementsAnyMethods(obj, methods) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const method of methods) {
    if (method in obj && typeof obj[method] === 'function') {
      return true;
    }
  }

  return false;
}

function noop() {// do nothing
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */


const validateArgCount = function (fnName, minCount, maxCount, argCount) {
  let argError;

  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }

  if (argError) {
    const error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */


exports.validateArgCount = validateArgCount;

function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */


function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }

  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}

function validateCallback(fnName, argumentName, // eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }

  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}

function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }

  if (typeof context !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3

/**
 * @param {string} str
 * @return {Array}
 */


const stringToByteArray = function (str) {
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i); // Is this the lead surrogate in a surrogate pair?

    if (c >= 0xd800 && c <= 0xdbff) {
      const high = c - 0xd800; // the high 10 bits.

      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.

      c = 0x10000 + (high << 10) + low;
    }

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */


exports.stringToByteArray = stringToByteArray;

const stringLength = function (str) {
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }

  return p;
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copied from https://stackoverflow.com/a/2117523
 * Generates a new uuid.
 * @public
 */


exports.stringLength = stringLength;

const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The amount of milliseconds to exponentially increase.
 */


exports.uuidv4 = uuidv4;
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */

const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */

const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.

/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */

exports.MAX_VALUE_MILLIS = MAX_VALUE_MILLIS;
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */

exports.RANDOM_FACTOR = RANDOM_FACTOR;

function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount); // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.

  const randomWait = Math.round( // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * ( // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2); // Limits backoff to max to avoid effectively permanent backoff.

  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provide English ordinal letters after a number
 */


function ordinal(i) {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }

  return i + indicator(i);
}

function indicator(i) {
  i = Math.abs(i);
  const cent = i % 100;

  if (cent >= 10 && cent <= 20) {
    return 'th';
  }

  const dec = i % 10;

  if (dec === 1) {
    return 'st';
  }

  if (dec === 2) {
    return 'nd';
  }

  if (dec === 3) {
    return 'rd';
  }

  return 'th';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{}],"node_modules/@firebase/component/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;

var _util = require("@firebase/util");

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */

    this.serviceProps = {};
    this.instantiationMode = "LAZY"
    /* LAZY */
    ;
    this.onInstanceCreated = null;
  }

  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }

  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }

  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }

  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */

class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */


  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);

    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);

      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });

          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {// when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }

    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }

  getImmediate(options) {
    var _a; // if multipleInstances is not supported, use the default name


    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;

    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }

  getComponent() {
    return this.component;
  }

  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }

    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }

    this.component = component; // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)

    if (!this.shouldAutoInitialize()) {
      return;
    } // if the service is eager, initialize the default instance


    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {// when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    } // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.


    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {// when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }

  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  } // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?


  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }

  isComponentSet() {
    return this.component != null;
  }

  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }

  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }

  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);

    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }

    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }

    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    }); // resolve any pending promise waiting for the service instance

    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }

    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */


  onInit(callback, identifier) {
    var _a;

    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);

    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }

    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */


  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {// ignore errors in the onInit callback
      }
    }
  }

  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);

    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */

      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */

      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {// ignore errors in the onInstanceCreatedCallback
        }
      }
    }

    return instance || null;
  }

  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }

  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    /* EXPLICIT */
    ;
  }

} // undefined should be passed to the service factory for the default instance


exports.Provider = Provider;

function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}

function isComponentEager(component) {
  return component.instantiationMode === "EAGER"
  /* EAGER */
  ;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */


class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */


  addComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }

    provider.setComponent(component);
  }

  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }

    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */


  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    } // create a Provider for a service that hasn't registered with Firebase


    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }

  getProviders() {
    return Array.from(this.providers.values());
  }

}

exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"node_modules/@firebase/util/dist/index.esm2017.js"}],"node_modules/@firebase/logger/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */

var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */

const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */

const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */

const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }

  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];

  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};

class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */

    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */

    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */

    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */

    instances.push(this);
  }

  get logLevel() {
    return this._logLevel;
  }

  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }

    this._logLevel = val;
  } // Workaround for setter/getter having to be the same type.


  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }

  get logHandler() {
    return this._logHandler;
  }

  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }

    this._logHandler = val;
  }

  get userLogHandler() {
    return this._userLogHandler;
  }

  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */


  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);

    this._logHandler(this, LogLevel.DEBUG, ...args);
  }

  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);

    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }

  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);

    this._logHandler(this, LogLevel.INFO, ...args);
  }

  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);

    this._logHandler(this, LogLevel.WARN, ...args);
  }

  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);

    this._logHandler(this, LogLevel.ERROR, ...args);
  }

}

exports.Logger = Logger;

function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}

function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;

    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }

    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');

        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}
},{}],"node_modules/idb/build/wrap-idb-value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i = exports.a = void 0;
exports.r = replaceTraps;
exports.u = void 0;
exports.w = wrap;

const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods; // This is a function to prevent it throwing up in node environments.

function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
} // This is a function to prevent it throwing up in node environments.


function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}

const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
exports.a = reverseTransformCache;

function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };

    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };

    const error = () => {
      reject(request.error);
      unlisten();
    };

    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    } // Catching to avoid "Uncaught Promise exceptions"

  }).catch(() => {}); // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.

  reverseTransformCache.set(promise, request);
  return promise;
}

function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };

    const complete = () => {
      resolve();
      unlisten();
    };

    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };

    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  }); // Cache it for later retrieval.

  transactionDoneMap.set(tx, done);
}

let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target); // Polyfill for objectStoreNames because of Edge.

      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      } // Make tx.store return the only store in the transaction, or undefined if there are many.


      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    } // Else transform whatever we get back.


    return wrap(target[prop]);
  },

  set(target, prop, value) {
    target[prop] = value;
    return true;
  },

  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }

    return prop in target;
  }

};

function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}

function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  } // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.


  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }

  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}

function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value); // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).

  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps); // Return the same value back if we're not going to transform it.

  return value;
}

function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value); // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.

  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value); // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.

  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }

  return newValue;
}

const unwrap = value => reverseTransformCache.get(value);

exports.u = unwrap;
},{}],"node_modules/idb/build/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.w;
  }
});

var _wrapIdbValue = require("./wrap-idb-value.js");

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);

  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction));
    });
  }

  if (blocked) request.addEventListener('blocked', () => blocked());
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) db.addEventListener('versionchange', () => blocking());
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */


function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) request.addEventListener('blocked', () => blocked());
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();

function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }

  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);

  if ( // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }

  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift()); // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)

    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };

  cachedMethods.set(prop, method);
  return method;
}

(0, _wrapIdbValue.r)(oldTraps => ({ ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
},{"./wrap-idb-value.js":"node_modules/idb/build/wrap-idb-value.js"}],"node_modules/@firebase/app/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

var _idb = require("idb");

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  } // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.


  getPlatformInfoString() {
    const providers = this.container.getProviders(); // Loop through providers and get library/version pairs from any that are
    // version components.

    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }

}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */


function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION"
  /* VERSION */
  ;
}

const name$o = "@firebase/app";
const version$1 = "0.7.27";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const logger = new _logger.Logger('@firebase/app');
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "9.8.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default app name
 *
 * @internal
 */

const DEFAULT_ENTRY_NAME = '[DEFAULT]';
exports._DEFAULT_ENTRY_NAME = DEFAULT_ENTRY_NAME;
const PLATFORM_LOG_STRING = {
  [name$o]: 'fire-core',
  [name$n]: 'fire-core-compat',
  [name$l]: 'fire-analytics',
  [name$m]: 'fire-analytics-compat',
  [name$j]: 'fire-app-check',
  [name$k]: 'fire-app-check-compat',
  [name$i]: 'fire-auth',
  [name$h]: 'fire-auth-compat',
  [name$g]: 'fire-rtdb',
  [name$f]: 'fire-rtdb-compat',
  [name$e]: 'fire-fn',
  [name$d]: 'fire-fn-compat',
  [name$c]: 'fire-iid',
  [name$b]: 'fire-iid-compat',
  [name$a]: 'fire-fcm',
  [name$9]: 'fire-fcm-compat',
  [name$8]: 'fire-perf',
  [name$7]: 'fire-perf-compat',
  [name$6]: 'fire-rc',
  [name$5]: 'fire-rc-compat',
  [name$4]: 'fire-gcs',
  [name$3]: 'fire-gcs-compat',
  [name$2]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  'fire-js': 'fire-js',
  [name]: 'fire-js-all'
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */

const _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


exports._apps = _apps;

const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */


exports._components = _components;

function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */


function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */


function _registerComponent(component) {
  const componentName = component.name;

  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }

  _components.set(componentName, component); // add the component to existing app instances


  for (const app of _apps.values()) {
    _addComponent(app, component);
  }

  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */


function _getProvider(app, name) {
  const heartbeatController = app.container.getProvider('heartbeat').getImmediate({
    optional: true
  });

  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }

  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */


function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 * Test only
 *
 * @internal
 */


function _clearComponents() {
  _components.clear();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const ERRORS = {
  ["no-app"
  /* NO_APP */
  ]: "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()',
  ["bad-app-name"
  /* BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}",
  ["duplicate-app"
  /* DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"
  /* APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  ["invalid-app-argument"
  /* INVALID_APP_ARGUMENT */
  ]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument"
  /* INVALID_LOG_ARGUMENT */
  ]: 'First argument to `onLog` must be null or a function.',
  ["storage-open"
  /* STORAGE_OPEN */
  ]: 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
  ["storage-get"
  /* STORAGE_GET */
  ]: 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
  ["storage-set"
  /* STORAGE_WRITE */
  ]: 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
  ["storage-delete"
  /* STORAGE_DELETE */
  ]: 'Error thrown when deleting from storage. Original error: {$originalErrorMessage}.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC"
    /* PUBLIC */
    ));
  }

  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }

  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }

  get name() {
    this.checkDestroyed();
    return this._name;
  }

  get options() {
    this.checkDestroyed();
    return this._options;
  }

  get config() {
    this.checkDestroyed();
    return this._config;
  }

  get container() {
    return this._container;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */


  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted"
      /* APP_DELETED */
      , {
        appName: this._name
      });
    }
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The current SDK version.
 *
 * @public
 */


const SDK_VERSION = version;
exports.SDK_VERSION = SDK_VERSION;

function initializeApp(options, rawConfig = {}) {
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }

  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;

  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name"
    /* BAD_APP_NAME */
    , {
      appName: String(name)
    });
  }

  const existingApp = _apps.get(name);

  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app"
      /* DUPLICATE_APP */
      , {
        appName: name
      });
    }
  }

  const container = new _component.ComponentContainer(name);

  for (const component of _components.values()) {
    container.addComponent(component);
  }

  const newApp = new FirebaseAppImpl(options, config, container);

  _apps.set(name, newApp);

  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */


function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);

  if (!app) {
    throw ERROR_FACTORY.create("no-app"
    /* NO_APP */
    , {
      appName: name
    });
  }

  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */


function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */


async function deleteApp(app) {
  const name = app.name;

  if (_apps.has(name)) {
    _apps.delete(name);

    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */


function registerVersion(libraryKeyOrName, version, variant) {
  var _a; // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.


  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;

  if (variant) {
    library += `-${variant}`;
  }

  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);

  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];

    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }

    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }

    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }

    logger.warn(warning.join(' '));
    return;
  }

  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION"
  /* VERSION */
  ));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */


function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument"
    /* INVALID_LOG_ARGUMENT */
    );
  }

  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */


function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;

function getDbPromise() {
  if (!dbPromise) {
    dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        // We don't use 'break' in this switch statement, the fall-through
        // behavior is what we want, because if there are multiple versions between
        // the old version and the current version, we want ALL the migrations
        // that correspond to those versions to run, not only the last one.
        // eslint-disable-next-line default-case
        switch (oldVersion) {
          case 0:
            db.createObjectStore(STORE_NAME);
        }
      }
    }).catch(e => {
      throw ERROR_FACTORY.create("storage-open"
      /* STORAGE_OPEN */
      , {
        originalErrorMessage: e.message
      });
    });
  }

  return dbPromise;
}

async function readHeartbeatsFromIndexedDB(app) {
  var _a;

  try {
    const db = await getDbPromise();
    return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app));
  } catch (e) {
    throw ERROR_FACTORY.create("storage-get"
    /* STORAGE_GET */
    , {
      originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
    });
  }
}

async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  var _a;

  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    return tx.done;
  } catch (e) {
    throw ERROR_FACTORY.create("storage-set"
    /* STORAGE_WRITE */
    , {
      originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
    });
  }
}

function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const MAX_HEADER_BYTES = 1024; // 30 days

const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1000;

class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    /**
     * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
     * the header string.
     * Stores one record per date. This will be consolidated into the standard
     * format of one record per user agent string before being sent as a header.
     * Populated from indexedDB when the controller is instantiated and should
     * be kept in sync with indexedDB.
     * Leave public for easier testing.
     */

    this._heartbeatsCache = null;
    const app = this.container.getProvider('app').getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then(result => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */


  async triggerHeartbeat() {
    const platformLogger = this.container.getProvider('platform-logger').getImmediate(); // This is the "Firebase user agent" string from the platform logger
    // service, not the browser user agent.

    const agent = platformLogger.getPlatformInfoString();
    const date = getUTCDateString();

    if (this._heartbeatsCache === null) {
      this._heartbeatsCache = await this._heartbeatsCachePromise;
    } // Do not store a heartbeat if one is already stored for this day
    // or if a header has already been sent today.


    if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
      return;
    } else {
      // There is no entry for this date. Create one.
      this._heartbeatsCache.heartbeats.push({
        date,
        agent
      });
    } // Remove entries older than 30 days.


    this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(singleDateHeartbeat => {
      const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
      const now = Date.now();
      return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
    });
    return this._storage.overwrite(this._heartbeatsCache);
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */


  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null) {
      await this._heartbeatsCachePromise;
    } // If it's still null or the array is empty, there is no data to send.


    if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
      return '';
    }

    const date = getUTCDateString(); // Extract as many heartbeats from the cache as will fit under the size limit.

    const {
      heartbeatsToSend,
      unsentEntries
    } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
    const headerString = (0, _util.base64urlEncodeWithoutPadding)(JSON.stringify({
      version: 2,
      heartbeats: heartbeatsToSend
    })); // Store last sent date to prevent another being logged/sent for the same day.

    this._heartbeatsCache.lastSentHeartbeatDate = date;

    if (unsentEntries.length > 0) {
      // Store any unsent entries if they exist.
      this._heartbeatsCache.heartbeats = unsentEntries; // This seems more likely than emptying the array (below) to lead to some odd state
      // since the cache isn't empty and this will be called again on the next request,
      // and is probably safest if we await it.

      await this._storage.overwrite(this._heartbeatsCache);
    } else {
      this._heartbeatsCache.heartbeats = []; // Do not wait for this, to reduce latency.

      void this._storage.overwrite(this._heartbeatsCache);
    }

    return headerString;
  }

}

function getUTCDateString() {
  const today = new Date(); // Returns date format 'YYYY-MM-DD'

  return today.toISOString().substring(0, 10);
}

function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  // Heartbeats grouped by user agent in the standard format to be sent in
  // the header.
  const heartbeatsToSend = []; // Single date format heartbeats that are not sent.

  let unsentEntries = heartbeatsCache.slice();

  for (const singleDateHeartbeat of heartbeatsCache) {
    // Look for an existing entry with the same user agent.
    const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);

    if (!heartbeatEntry) {
      // If no entry for this user agent exists, create one.
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });

      if (countBytes(heartbeatsToSend) > maxSize) {
        // If the header would exceed max size, remove the added heartbeat
        // entry and stop adding to the header.
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date); // If the header would exceed max size, remove the added date
      // and stop adding to the header.

      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    } // Pop unsent entry from queue. (Skipped if adding the entry exceeded
    // quota and the loop breaks early.)


    unsentEntries = unsentEntries.slice(1);
  }

  return {
    heartbeatsToSend,
    unsentEntries
  };
}

class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }

  async runIndexedDBEnvironmentCheck() {
    if (!(0, _util.isIndexedDBAvailable)()) {
      return false;
    } else {
      return (0, _util.validateIndexedDBOpenable)().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */


  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return {
        heartbeats: []
      };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      return idbHeartbeatObject || {
        heartbeats: []
      };
    }
  } // overwrite the storage with the provided heartbeats


  async overwrite(heartbeatsObject) {
    var _a;

    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  } // add heartbeats


  async add(heartbeatsObject) {
    var _a;

    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
      });
    }
  }

}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */


function countBytes(heartbeatsCache) {
  // base64 has a restricted set of characters, all of which should be 1 byte.
  return (0, _util.base64urlEncodeWithoutPadding)( // heartbeatsCache wrapper properties
  JSON.stringify({
    version: 2,
    heartbeats: heartbeatsCache
  })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  ));

  _registerComponent(new _component.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  )); // Register `app` package.


  registerVersion(name$o, version$1, variant); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  registerVersion(name$o, version$1, 'esm2017'); // Register platform SDK identifier (no version).

  registerVersion('fire-js', '');
}
/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */


registerCoreComponents('');
},{"@firebase/component":"node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"node_modules/@firebase/util/dist/index.esm2017.js","idb":"node_modules/idb/build/index.js"}],"node_modules/firebase/app/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("@firebase/app");

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "9.8.4";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"node_modules/@firebase/app/dist/esm/index.esm2017.js"}],"node_modules/@firebase/storage/dist/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._UploadTask = exports._TaskState = exports._TaskEvent = exports._Location = exports._FbsBlob = exports.StringFormat = void 0;
exports._dataFromString = dataFromString;
exports._getChild = _getChild;
exports._invalidArgument = invalidArgument;
exports._invalidRootOperation = invalidRootOperation;
exports.connectStorageEmulator = connectStorageEmulator;
exports.deleteObject = deleteObject;
exports.getBlob = getBlob;
exports.getBytes = getBytes;
exports.getDownloadURL = getDownloadURL;
exports.getMetadata = getMetadata;
exports.getStorage = getStorage;
exports.getStream = getStream;
exports.list = list;
exports.listAll = listAll;
exports.ref = ref;
exports.updateMetadata = updateMetadata;
exports.uploadBytes = uploadBytes;
exports.uploadBytesResumable = uploadBytesResumable;
exports.uploadString = uploadString;

var _app = require("@firebase/app");

var _util = require("@firebase/util");

var _component = require("@firebase/component");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Constants used in the Firebase Storage library.
 */

/**
 * Domain name for firebase storage.
 */
const DEFAULT_HOST = 'firebasestorage.googleapis.com';
/**
 * The key in Firebase config json for the storage bucket.
 */

const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';
/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */

const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;
/**
 * 10 minutes
 *
 * The timeout for upload.
 */

const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */

class StorageError extends _util.FirebaseError {
  /**
   * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
   *  added to the end of the message.
   * @param message  - Error message.
   */
  constructor(code, message) {
    super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
    /**
     * Stores custom error data unque to StorageError.
     */

    this.customData = {
      serverResponse: null
    };
    this._baseMessage = this.message; // Without this, `instanceof StorageError`, in tests for example,
    // returns false.

    Object.setPrototypeOf(this, StorageError.prototype);
  }
  /**
   * Compares a StorageErrorCode against this error's code, filtering out the prefix.
   */


  _codeEquals(code) {
    return prependCode(code) === this.code;
  }
  /**
   * Optional response message that was added by the server.
   */


  get serverResponse() {
    return this.customData.serverResponse;
  }

  set serverResponse(serverResponse) {
    this.customData.serverResponse = serverResponse;

    if (this.customData.serverResponse) {
      this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
    } else {
      this.message = this._baseMessage;
    }
  }

}

function prependCode(code) {
  return 'storage/' + code;
}

function unknown() {
  const message = 'An unknown error occurred, please check the error payload for ' + 'server response.';
  return new StorageError("unknown"
  /* UNKNOWN */
  , message);
}

function objectNotFound(path) {
  return new StorageError("object-not-found"
  /* OBJECT_NOT_FOUND */
  , "Object '" + path + "' does not exist.");
}

function quotaExceeded(bucket) {
  return new StorageError("quota-exceeded"
  /* QUOTA_EXCEEDED */
  , "Quota for bucket '" + bucket + "' exceeded, please view quota on " + 'https://firebase.google.com/pricing/.');
}

function unauthenticated() {
  const message = 'User is not authenticated, please authenticate using Firebase ' + 'Authentication and try again.';
  return new StorageError("unauthenticated"
  /* UNAUTHENTICATED */
  , message);
}

function unauthorizedApp() {
  return new StorageError("unauthorized-app"
  /* UNAUTHORIZED_APP */
  , 'This app does not have permission to access Firebase Storage on this project.');
}

function unauthorized(path) {
  return new StorageError("unauthorized"
  /* UNAUTHORIZED */
  , "User does not have permission to access '" + path + "'.");
}

function retryLimitExceeded() {
  return new StorageError("retry-limit-exceeded"
  /* RETRY_LIMIT_EXCEEDED */
  , 'Max retry time for operation exceeded, please try again.');
}

function canceled() {
  return new StorageError("canceled"
  /* CANCELED */
  , 'User canceled the upload/download.');
}

function invalidUrl(url) {
  return new StorageError("invalid-url"
  /* INVALID_URL */
  , "Invalid URL '" + url + "'.");
}

function invalidDefaultBucket(bucket) {
  return new StorageError("invalid-default-bucket"
  /* INVALID_DEFAULT_BUCKET */
  , "Invalid default bucket '" + bucket + "'.");
}

function noDefaultBucket() {
  return new StorageError("no-default-bucket"
  /* NO_DEFAULT_BUCKET */
  , 'No default bucket ' + "found. Did you set the '" + CONFIG_STORAGE_BUCKET_KEY + "' property when initializing the app?");
}

function cannotSliceBlob() {
  return new StorageError("cannot-slice-blob"
  /* CANNOT_SLICE_BLOB */
  , 'Cannot slice blob for upload. Please retry the upload.');
}

function serverFileWrongSize() {
  return new StorageError("server-file-wrong-size"
  /* SERVER_FILE_WRONG_SIZE */
  , 'Server recorded incorrect upload file size, please retry the upload.');
}

function noDownloadURL() {
  return new StorageError("no-download-url"
  /* NO_DOWNLOAD_URL */
  , 'The given file does not have any download URLs.');
}
/**
 * @internal
 */


function invalidArgument(message) {
  return new StorageError("invalid-argument"
  /* INVALID_ARGUMENT */
  , message);
}

function appDeleted() {
  return new StorageError("app-deleted"
  /* APP_DELETED */
  , 'The Firebase app was deleted.');
}
/**
 * @param name - The name of the operation that was invalid.
 *
 * @internal
 */


function invalidRootOperation(name) {
  return new StorageError("invalid-root-operation"
  /* INVALID_ROOT_OPERATION */
  , "The operation '" + name + "' cannot be performed on a root reference, create a non-root " + "reference using child, such as .child('file.png').");
}
/**
 * @param format - The format that was not valid.
 * @param message - A message describing the format violation.
 */


function invalidFormat(format, message) {
  return new StorageError("invalid-format"
  /* INVALID_FORMAT */
  , "String does not match format '" + format + "': " + message);
}
/**
 * @param message - A message describing the internal error.
 */


function internalError(message) {
  throw new StorageError("internal-error"
  /* INTERNAL_ERROR */
  , 'Internal error: ' + message);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Firebase Storage location data.
 *
 * @internal
 */


class Location {
  constructor(bucket, path) {
    this.bucket = bucket;
    this.path_ = path;
  }

  get path() {
    return this.path_;
  }

  get isRoot() {
    return this.path.length === 0;
  }

  fullServerUrl() {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
  }

  bucketOnlyServerUrl() {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o';
  }

  static makeFromBucketSpec(bucketString, host) {
    let bucketLocation;

    try {
      bucketLocation = Location.makeFromUrl(bucketString, host);
    } catch (e) {
      // Not valid URL, use as-is. This lets you put bare bucket names in
      // config.
      return new Location(bucketString, '');
    }

    if (bucketLocation.path === '') {
      return bucketLocation;
    } else {
      throw invalidDefaultBucket(bucketString);
    }
  }

  static makeFromUrl(url, host) {
    let location = null;
    const bucketDomain = '([A-Za-z0-9.\\-_]+)';

    function gsModify(loc) {
      if (loc.path.charAt(loc.path.length - 1) === '/') {
        loc.path_ = loc.path_.slice(0, -1);
      }
    }

    const gsPath = '(/(.*))?$';
    const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
    const gsIndices = {
      bucket: 1,
      path: 3
    };

    function httpModify(loc) {
      loc.path_ = decodeURIComponent(loc.path);
    }

    const version = 'v[A-Za-z0-9_]+';
    const firebaseStorageHost = host.replace(/[.]/g, '\\.');
    const firebaseStoragePath = '(/([^?#]*).*)?$';
    const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`, 'i');
    const firebaseStorageIndices = {
      bucket: 1,
      path: 3
    };
    const cloudStorageHost = host === DEFAULT_HOST ? '(?:storage.googleapis.com|storage.cloud.google.com)' : host;
    const cloudStoragePath = '([^?#]*)';
    const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, 'i');
    const cloudStorageIndices = {
      bucket: 1,
      path: 2
    };
    const groups = [{
      regex: gsRegex,
      indices: gsIndices,
      postModify: gsModify
    }, {
      regex: firebaseStorageRegExp,
      indices: firebaseStorageIndices,
      postModify: httpModify
    }, {
      regex: cloudStorageRegExp,
      indices: cloudStorageIndices,
      postModify: httpModify
    }];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const captures = group.regex.exec(url);

      if (captures) {
        const bucketValue = captures[group.indices.bucket];
        let pathValue = captures[group.indices.path];

        if (!pathValue) {
          pathValue = '';
        }

        location = new Location(bucketValue, pathValue);
        group.postModify(location);
        break;
      }
    }

    if (location == null) {
      throw invalidUrl(url);
    }

    return location;
  }

}
/**
 * A request whose promise always fails.
 */


exports._Location = Location;

class FailRequest {
  constructor(error) {
    this.promise_ = Promise.reject(error);
  }
  /** @inheritDoc */


  getPromise() {
    return this.promise_;
  }
  /** @inheritDoc */


  cancel(_appDelete = false) {}

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param f May be invoked
 *     before the function returns.
 * @param callback Get all the arguments passed to the function
 *     passed to f, including the initial boolean.
 */


function start(f, // eslint-disable-next-line @typescript-eslint/no-explicit-any
callback, timeout) {
  // TODO(andysoto): make this code cleaner (probably refactor into an actual
  // type instead of a bunch of functions with state shared in the closure)
  let waitSeconds = 1; // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
  // TODO: find a way to exclude Node type definition for storage because storage only works in browser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  let retryTimeoutId = null; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  let globalTimeoutId = null;
  let hitTimeout = false;
  let cancelState = 0;

  function canceled() {
    return cancelState === 2;
  }

  let triggeredCallback = false;

  function triggerCallback(...args) {
    if (!triggeredCallback) {
      triggeredCallback = true;
      callback.apply(null, args);
    }
  }

  function callWithDelay(millis) {
    retryTimeoutId = setTimeout(() => {
      retryTimeoutId = null;
      f(handler, canceled());
    }, millis);
  }

  function clearGlobalTimeout() {
    if (globalTimeoutId) {
      clearTimeout(globalTimeoutId);
    }
  }

  function handler(success, ...args) {
    if (triggeredCallback) {
      clearGlobalTimeout();
      return;
    }

    if (success) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }

    const mustStop = canceled() || hitTimeout;

    if (mustStop) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }

    if (waitSeconds < 64) {
      /* TODO(andysoto): don't back off so quickly if we know we're offline. */
      waitSeconds *= 2;
    }

    let waitMillis;

    if (cancelState === 1) {
      cancelState = 2;
      waitMillis = 0;
    } else {
      waitMillis = (waitSeconds + Math.random()) * 1000;
    }

    callWithDelay(waitMillis);
  }

  let stopped = false;

  function stop(wasTimeout) {
    if (stopped) {
      return;
    }

    stopped = true;
    clearGlobalTimeout();

    if (triggeredCallback) {
      return;
    }

    if (retryTimeoutId !== null) {
      if (!wasTimeout) {
        cancelState = 2;
      }

      clearTimeout(retryTimeoutId);
      callWithDelay(0);
    } else {
      if (!wasTimeout) {
        cancelState = 1;
      }
    }
  }

  callWithDelay(0);
  globalTimeoutId = setTimeout(() => {
    hitTimeout = true;
    stop(true);
  }, timeout);
  return stop;
}
/**
 * Stops the retry loop from repeating.
 * If the function is currently "in between" retries, it is invoked immediately
 * with the second parameter as "true". Otherwise, it will be invoked once more
 * after the current invocation finishes iff the current invocation would have
 * triggered another retry.
 */


function stop(id) {
  id(false);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function isJustDef(p) {
  return p !== void 0;
} // eslint-disable-next-line @typescript-eslint/ban-types


function isFunction(p) {
  return typeof p === 'function';
}

function isNonArrayObject(p) {
  return typeof p === 'object' && !Array.isArray(p);
}

function isString(p) {
  return typeof p === 'string' || p instanceof String;
}

function isNativeBlob(p) {
  return isNativeBlobDefined() && p instanceof Blob;
}

function isNativeBlobDefined() {
  return typeof Blob !== 'undefined';
}

function validateNumber(argument, minValue, maxValue, value) {
  if (value < minValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
  }

  if (value > maxValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function makeUrl(urlPart, host, protocol) {
  let origin = host;

  if (protocol == null) {
    origin = `https://${host}`;
  }

  return `${protocol}://${origin}/v0${urlPart}`;
}

function makeQueryString(params) {
  const encode = encodeURIComponent;
  let queryPart = '?';

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const nextPart = encode(key) + '=' + encode(params[key]);
      queryPart = queryPart + nextPart + '&';
    }
  } // Chop off the extra '&' or '?' on the end


  queryPart = queryPart.slice(0, -1);
  return queryPart;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Error codes for requests made by the the XhrIo wrapper.
 */


var ErrorCode;

(function (ErrorCode) {
  ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
  ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
  ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Handles network logic for all Storage Requests, including error reporting and
 * retries with backoff.
 *
 * @param I - the type of the backend's network response.
 * @param - O the output type used by the rest of the SDK. The conversion
 * happens in the specified `callback_`.
 */


class NetworkRequest {
  constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_) {
    this.url_ = url_;
    this.method_ = method_;
    this.headers_ = headers_;
    this.body_ = body_;
    this.successCodes_ = successCodes_;
    this.additionalRetryCodes_ = additionalRetryCodes_;
    this.callback_ = callback_;
    this.errorCallback_ = errorCallback_;
    this.timeout_ = timeout_;
    this.progressCallback_ = progressCallback_;
    this.connectionFactory_ = connectionFactory_;
    this.pendingConnection_ = null;
    this.backoffId_ = null;
    this.canceled_ = false;
    this.appDelete_ = false;
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
      this.start_();
    });
  }
  /**
   * Actually starts the retry loop.
   */


  start_() {
    const doTheRequest = (backoffCallback, canceled) => {
      if (canceled) {
        backoffCallback(false, new RequestEndStatus(false, null, true));
        return;
      }

      const connection = this.connectionFactory_();
      this.pendingConnection_ = connection;

      const progressListener = progressEvent => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.lengthComputable ? progressEvent.total : -1;

        if (this.progressCallback_ !== null) {
          this.progressCallback_(loaded, total);
        }
      };

      if (this.progressCallback_ !== null) {
        connection.addUploadProgressListener(progressListener);
      } // connection.send() never rejects, so we don't need to have a error handler or use catch on the returned promise.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises


      connection.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
        if (this.progressCallback_ !== null) {
          connection.removeUploadProgressListener(progressListener);
        }

        this.pendingConnection_ = null;
        const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
        const status = connection.getStatus();

        if (!hitServer || this.isRetryStatusCode_(status)) {
          const wasCanceled = connection.getErrorCode() === ErrorCode.ABORT;
          backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
          return;
        }

        const successCode = this.successCodes_.indexOf(status) !== -1;
        backoffCallback(true, new RequestEndStatus(successCode, connection));
      });
    };
    /**
     * @param requestWentThrough - True if the request eventually went
     *     through, false if it hit the retry limit or was canceled.
     */


    const backoffDone = (requestWentThrough, status) => {
      const resolve = this.resolve_;
      const reject = this.reject_;
      const connection = status.connection;

      if (status.wasSuccessCode) {
        try {
          const result = this.callback_(connection, connection.getResponse());

          if (isJustDef(result)) {
            resolve(result);
          } else {
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      } else {
        if (connection !== null) {
          const err = unknown();
          err.serverResponse = connection.getErrorText();

          if (this.errorCallback_) {
            reject(this.errorCallback_(connection, err));
          } else {
            reject(err);
          }
        } else {
          if (status.canceled) {
            const err = this.appDelete_ ? appDeleted() : canceled();
            reject(err);
          } else {
            const err = retryLimitExceeded();
            reject(err);
          }
        }
      }
    };

    if (this.canceled_) {
      backoffDone(false, new RequestEndStatus(false, null, true));
    } else {
      this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
    }
  }
  /** @inheritDoc */


  getPromise() {
    return this.promise_;
  }
  /** @inheritDoc */


  cancel(appDelete) {
    this.canceled_ = true;
    this.appDelete_ = appDelete || false;

    if (this.backoffId_ !== null) {
      stop(this.backoffId_);
    }

    if (this.pendingConnection_ !== null) {
      this.pendingConnection_.abort();
    }
  }

  isRetryStatusCode_(status) {
    // The codes for which to retry came from this page:
    // https://cloud.google.com/storage/docs/exponential-backoff
    const isFiveHundredCode = status >= 500 && status < 600;
    const extraRetryCodes = [// Request Timeout: web server didn't receive full request in time.
    408, // Too Many Requests: you're getting rate-limited, basically.
    429];
    const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
    const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
    return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
  }

}
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled - Defaults to false.
 */


class RequestEndStatus {
  constructor(wasSuccessCode, connection, canceled) {
    this.wasSuccessCode = wasSuccessCode;
    this.connection = connection;
    this.canceled = !!canceled;
  }

}

function addAuthHeader_(headers, authToken) {
  if (authToken !== null && authToken.length > 0) {
    headers['Authorization'] = 'Firebase ' + authToken;
  }
}

function addVersionHeader_(headers, firebaseVersion) {
  headers['X-Firebase-Storage-Version'] = 'webjs/' + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : 'AppManager');
}

function addGmpidHeader_(headers, appId) {
  if (appId) {
    headers['X-Firebase-GMPID'] = appId;
  }
}

function addAppCheckHeader_(headers, appCheckToken) {
  if (appCheckToken !== null) {
    headers['X-Firebase-AppCheck'] = appCheckToken;
  }
}

function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion) {
  const queryPart = makeQueryString(requestInfo.urlParams);
  const url = requestInfo.url + queryPart;
  const headers = Object.assign({}, requestInfo.headers);
  addGmpidHeader_(headers, appId);
  addAuthHeader_(headers, authToken);
  addVersionHeader_(headers, firebaseVersion);
  addAppCheckHeader_(headers, appCheckToken);
  return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getBlobBuilder() {
  if (typeof BlobBuilder !== 'undefined') {
    return BlobBuilder;
  } else if (typeof WebKitBlobBuilder !== 'undefined') {
    return WebKitBlobBuilder;
  } else {
    return undefined;
  }
}
/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * @param args The values that will make up the resulting blob.
 * @return The blob.
 */


function getBlob$1(...args) {
  const BlobBuilder = getBlobBuilder();

  if (BlobBuilder !== undefined) {
    const bb = new BlobBuilder();

    for (let i = 0; i < args.length; i++) {
      bb.append(args[i]);
    }

    return bb.getBlob();
  } else {
    if (isNativeBlobDefined()) {
      return new Blob(args);
    } else {
      throw new StorageError("unsupported-environment"
      /* UNSUPPORTED_ENVIRONMENT */
      , "This browser doesn't seem to support creating Blobs");
    }
  }
}
/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
 *
 * @param blob The blob to be sliced.
 * @param start Index of the starting byte.
 * @param end Index of the ending byte.
 * @return The blob slice or null if not supported.
 */


function sliceBlob(blob, start, end) {
  if (blob.webkitSlice) {
    return blob.webkitSlice(start, end);
  } else if (blob.mozSlice) {
    return blob.mozSlice(start, end);
  } else if (blob.slice) {
    return blob.slice(start, end);
  }

  return null;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Converts a Base64 encoded string to a binary string. */


function decodeBase64(encoded) {
  return atob(encoded);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An enumeration of the possible string formats for upload.
 * @public
 */


const StringFormat = {
  /**
   * Indicates the string should be interpreted "raw", that is, as normal text.
   * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
   * sequence.
   * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
   * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
   */
  RAW: 'raw',

  /**
   * Indicates the string should be interpreted as base64-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64: 'base64',

  /**
   * Indicates the string should be interpreted as base64url-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64URL: 'base64url',

  /**
   * Indicates the string is a data URL, such as one obtained from
   * canvas.toDataURL().
   * Example: the string 'data:application/octet-stream;base64,aaaa'
   * becomes the byte sequence
   * 69 a6 9a
   * (the content-type "application/octet-stream" is also applied, but can
   * be overridden in the metadata object).
   */
  DATA_URL: 'data_url'
};
exports.StringFormat = StringFormat;

class StringData {
  constructor(data, contentType) {
    this.data = data;
    this.contentType = contentType || null;
  }

}
/**
 * @internal
 */


function dataFromString(format, stringData) {
  switch (format) {
    case StringFormat.RAW:
      return new StringData(utf8Bytes_(stringData));

    case StringFormat.BASE64:
    case StringFormat.BASE64URL:
      return new StringData(base64Bytes_(format, stringData));

    case StringFormat.DATA_URL:
      return new StringData(dataURLBytes_(stringData), dataURLContentType_(stringData));
    // do nothing
  } // assert(false);


  throw unknown();
}

function utf8Bytes_(value) {
  const b = [];

  for (let i = 0; i < value.length; i++) {
    let c = value.charCodeAt(i);

    if (c <= 127) {
      b.push(c);
    } else {
      if (c <= 2047) {
        b.push(192 | c >> 6, 128 | c & 63);
      } else {
        if ((c & 64512) === 55296) {
          // The start of a surrogate pair.
          const valid = i < value.length - 1 && (value.charCodeAt(i + 1) & 64512) === 56320;

          if (!valid) {
            // The second surrogate wasn't there.
            b.push(239, 191, 189);
          } else {
            const hi = c;
            const lo = value.charCodeAt(++i);
            c = 65536 | (hi & 1023) << 10 | lo & 1023;
            b.push(240 | c >> 18, 128 | c >> 12 & 63, 128 | c >> 6 & 63, 128 | c & 63);
          }
        } else {
          if ((c & 64512) === 56320) {
            // Invalid low surrogate.
            b.push(239, 191, 189);
          } else {
            b.push(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
          }
        }
      }
    }
  }

  return new Uint8Array(b);
}

function percentEncodedBytes_(value) {
  let decoded;

  try {
    decoded = decodeURIComponent(value);
  } catch (e) {
    throw invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
  }

  return utf8Bytes_(decoded);
}

function base64Bytes_(format, value) {
  switch (format) {
    case StringFormat.BASE64:
      {
        const hasMinus = value.indexOf('-') !== -1;
        const hasUnder = value.indexOf('_') !== -1;

        if (hasMinus || hasUnder) {
          const invalidChar = hasMinus ? '-' : '_';
          throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64url encoded?");
        }

        break;
      }

    case StringFormat.BASE64URL:
      {
        const hasPlus = value.indexOf('+') !== -1;
        const hasSlash = value.indexOf('/') !== -1;

        if (hasPlus || hasSlash) {
          const invalidChar = hasPlus ? '+' : '/';
          throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64 encoded?");
        }

        value = value.replace(/-/g, '+').replace(/_/g, '/');
        break;
      }
    // do nothing
  }

  let bytes;

  try {
    bytes = decodeBase64(value);
  } catch (e) {
    throw invalidFormat(format, 'Invalid character found');
  }

  const array = new Uint8Array(bytes.length);

  for (let i = 0; i < bytes.length; i++) {
    array[i] = bytes.charCodeAt(i);
  }

  return array;
}

class DataURLParts {
  constructor(dataURL) {
    this.base64 = false;
    this.contentType = null;
    const matches = dataURL.match(/^data:([^,]+)?,/);

    if (matches === null) {
      throw invalidFormat(StringFormat.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
    }

    const middle = matches[1] || null;

    if (middle != null) {
      this.base64 = endsWith(middle, ';base64');
      this.contentType = this.base64 ? middle.substring(0, middle.length - ';base64'.length) : middle;
    }

    this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
  }

}

function dataURLBytes_(dataUrl) {
  const parts = new DataURLParts(dataUrl);

  if (parts.base64) {
    return base64Bytes_(StringFormat.BASE64, parts.rest);
  } else {
    return percentEncodedBytes_(parts.rest);
  }
}

function dataURLContentType_(dataUrl) {
  const parts = new DataURLParts(dataUrl);
  return parts.contentType;
}

function endsWith(s, end) {
  const longEnough = s.length >= end.length;

  if (!longEnough) {
    return false;
  }

  return s.substring(s.length - end.length) === end;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */


class FbsBlob {
  constructor(data, elideCopy) {
    let size = 0;
    let blobType = '';

    if (isNativeBlob(data)) {
      this.data_ = data;
      size = data.size;
      blobType = data.type;
    } else if (data instanceof ArrayBuffer) {
      if (elideCopy) {
        this.data_ = new Uint8Array(data);
      } else {
        this.data_ = new Uint8Array(data.byteLength);
        this.data_.set(new Uint8Array(data));
      }

      size = this.data_.length;
    } else if (data instanceof Uint8Array) {
      if (elideCopy) {
        this.data_ = data;
      } else {
        this.data_ = new Uint8Array(data.length);
        this.data_.set(data);
      }

      size = data.length;
    }

    this.size_ = size;
    this.type_ = blobType;
  }

  size() {
    return this.size_;
  }

  type() {
    return this.type_;
  }

  slice(startByte, endByte) {
    if (isNativeBlob(this.data_)) {
      const realBlob = this.data_;
      const sliced = sliceBlob(realBlob, startByte, endByte);

      if (sliced === null) {
        return null;
      }

      return new FbsBlob(sliced);
    } else {
      const slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
      return new FbsBlob(slice, true);
    }
  }

  static getBlob(...args) {
    if (isNativeBlobDefined()) {
      const blobby = args.map(val => {
        if (val instanceof FbsBlob) {
          return val.data_;
        } else {
          return val;
        }
      });
      return new FbsBlob(getBlob$1.apply(null, blobby));
    } else {
      const uint8Arrays = args.map(val => {
        if (isString(val)) {
          return dataFromString(StringFormat.RAW, val).data;
        } else {
          // Blobs don't exist, so this has to be a Uint8Array.
          return val.data_;
        }
      });
      let finalLength = 0;
      uint8Arrays.forEach(array => {
        finalLength += array.byteLength;
      });
      const merged = new Uint8Array(finalLength);
      let index = 0;
      uint8Arrays.forEach(array => {
        for (let i = 0; i < array.length; i++) {
          merged[index++] = array[i];
        }
      });
      return new FbsBlob(merged, true);
    }
  }

  uploadData() {
    return this.data_;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */


exports._FbsBlob = FbsBlob;

function jsonObjectOrNull(s) {
  let obj;

  try {
    obj = JSON.parse(s);
  } catch (e) {
    return null;
  }

  if (isNonArrayObject(obj)) {
    return obj;
  } else {
    return null;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Contains helper methods for manipulating paths.
 */

/**
 * @return Null if the path is already at the root.
 */


function parent(path) {
  if (path.length === 0) {
    return null;
  }

  const index = path.lastIndexOf('/');

  if (index === -1) {
    return '';
  }

  const newPath = path.slice(0, index);
  return newPath;
}

function child(path, childPath) {
  const canonicalChildPath = childPath.split('/').filter(component => component.length > 0).join('/');

  if (path.length === 0) {
    return canonicalChildPath;
  } else {
    return path + '/' + canonicalChildPath;
  }
}
/**
 * Returns the last component of a path.
 * '/foo/bar' -> 'bar'
 * '/foo/bar/baz/' -> 'baz/'
 * '/a' -> 'a'
 */


function lastComponent(path) {
  const index = path.lastIndexOf('/', path.length - 2);

  if (index === -1) {
    return path;
  } else {
    return path.slice(index + 1);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function noXform_(metadata, value) {
  return value;
}

class Mapping {
  constructor(server, local, writable, xform) {
    this.server = server;
    this.local = local || server;
    this.writable = !!writable;
    this.xform = xform || noXform_;
  }

}

let mappings_ = null;

function xformPath(fullPath) {
  if (!isString(fullPath) || fullPath.length < 2) {
    return fullPath;
  } else {
    return lastComponent(fullPath);
  }
}

function getMappings() {
  if (mappings_) {
    return mappings_;
  }

  const mappings = [];
  mappings.push(new Mapping('bucket'));
  mappings.push(new Mapping('generation'));
  mappings.push(new Mapping('metageneration'));
  mappings.push(new Mapping('name', 'fullPath', true));

  function mappingsXformPath(_metadata, fullPath) {
    return xformPath(fullPath);
  }

  const nameMapping = new Mapping('name');
  nameMapping.xform = mappingsXformPath;
  mappings.push(nameMapping);
  /**
   * Coerces the second param to a number, if it is defined.
   */

  function xformSize(_metadata, size) {
    if (size !== undefined) {
      return Number(size);
    } else {
      return size;
    }
  }

  const sizeMapping = new Mapping('size');
  sizeMapping.xform = xformSize;
  mappings.push(sizeMapping);
  mappings.push(new Mapping('timeCreated'));
  mappings.push(new Mapping('updated'));
  mappings.push(new Mapping('md5Hash', null, true));
  mappings.push(new Mapping('cacheControl', null, true));
  mappings.push(new Mapping('contentDisposition', null, true));
  mappings.push(new Mapping('contentEncoding', null, true));
  mappings.push(new Mapping('contentLanguage', null, true));
  mappings.push(new Mapping('contentType', null, true));
  mappings.push(new Mapping('metadata', 'customMetadata', true));
  mappings_ = mappings;
  return mappings_;
}

function addRef(metadata, service) {
  function generateRef() {
    const bucket = metadata['bucket'];
    const path = metadata['fullPath'];
    const loc = new Location(bucket, path);
    return service._makeStorageReference(loc);
  }

  Object.defineProperty(metadata, 'ref', {
    get: generateRef
  });
}

function fromResource(service, resource, mappings) {
  const metadata = {};
  metadata['type'] = 'file';
  const len = mappings.length;

  for (let i = 0; i < len; i++) {
    const mapping = mappings[i];
    metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
  }

  addRef(metadata, service);
  return metadata;
}

function fromResourceString(service, resourceString, mappings) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  const resource = obj;
  return fromResource(service, resource, mappings);
}

function downloadUrlFromResourceString(metadata, resourceString, host, protocol) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  if (!isString(obj['downloadTokens'])) {
    // This can happen if objects are uploaded through GCS and retrieved
    // through list, so we don't want to throw an Error.
    return null;
  }

  const tokens = obj['downloadTokens'];

  if (tokens.length === 0) {
    return null;
  }

  const encode = encodeURIComponent;
  const tokensList = tokens.split(',');
  const urls = tokensList.map(token => {
    const bucket = metadata['bucket'];
    const path = metadata['fullPath'];
    const urlPart = '/b/' + encode(bucket) + '/o/' + encode(path);
    const base = makeUrl(urlPart, host, protocol);
    const queryString = makeQueryString({
      alt: 'media',
      token
    });
    return base + queryString;
  });
  return urls[0];
}

function toResourceString(metadata, mappings) {
  const resource = {};
  const len = mappings.length;

  for (let i = 0; i < len; i++) {
    const mapping = mappings[i];

    if (mapping.writable) {
      resource[mapping.server] = metadata[mapping.local];
    }
  }

  return JSON.stringify(resource);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const PREFIXES_KEY = 'prefixes';
const ITEMS_KEY = 'items';

function fromBackendResponse(service, bucket, resource) {
  const listResult = {
    prefixes: [],
    items: [],
    nextPageToken: resource['nextPageToken']
  };

  if (resource[PREFIXES_KEY]) {
    for (const path of resource[PREFIXES_KEY]) {
      const pathWithoutTrailingSlash = path.replace(/\/$/, '');

      const reference = service._makeStorageReference(new Location(bucket, pathWithoutTrailingSlash));

      listResult.prefixes.push(reference);
    }
  }

  if (resource[ITEMS_KEY]) {
    for (const item of resource[ITEMS_KEY]) {
      const reference = service._makeStorageReference(new Location(bucket, item['name']));

      listResult.items.push(reference);
    }
  }

  return listResult;
}

function fromResponseString(service, bucket, resourceString) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  const resource = obj;
  return fromBackendResponse(service, bucket, resource);
}
/**
 * Contains a fully specified request.
 *
 * @param I - the type of the backend's network response.
 * @param O - the output response type used by the rest of the SDK.
 */


class RequestInfo {
  constructor(url, method,
  /**
   * Returns the value with which to resolve the request's promise. Only called
   * if the request is successful. Throw from this function to reject the
   * returned Request's promise with the thrown error.
   * Note: The XhrIo passed to this function may be reused after this callback
   * returns. Do not keep a reference to it in any way.
   */
  handler, timeout) {
    this.url = url;
    this.method = method;
    this.handler = handler;
    this.timeout = timeout;
    this.urlParams = {};
    this.headers = {};
    this.body = null;
    this.errorHandler = null;
    /**
     * Called with the current number of bytes uploaded and total size (-1 if not
     * computable) of the request body (i.e. used to report upload progress).
     */

    this.progressCallback = null;
    this.successCodes = [200];
    this.additionalRetryCodes = [];
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws the UNKNOWN StorageError if cndn is false.
 */


function handlerCheck(cndn) {
  if (!cndn) {
    throw unknown();
  }
}

function metadataHandler(service, mappings) {
  function handler(xhr, text) {
    const metadata = fromResourceString(service, text, mappings);
    handlerCheck(metadata !== null);
    return metadata;
  }

  return handler;
}

function listHandler(service, bucket) {
  function handler(xhr, text) {
    const listResult = fromResponseString(service, bucket, text);
    handlerCheck(listResult !== null);
    return listResult;
  }

  return handler;
}

function downloadUrlHandler(service, mappings) {
  function handler(xhr, text) {
    const metadata = fromResourceString(service, text, mappings);
    handlerCheck(metadata !== null);
    return downloadUrlFromResourceString(metadata, text, service.host, service._protocol);
  }

  return handler;
}

function sharedErrorHandler(location) {
  function errorHandler(xhr, err) {
    let newErr;

    if (xhr.getStatus() === 401) {
      if ( // This exact message string is the only consistent part of the
      // server's error response that identifies it as an App Check error.
      xhr.getErrorText().includes('Firebase App Check token is invalid')) {
        newErr = unauthorizedApp();
      } else {
        newErr = unauthenticated();
      }
    } else {
      if (xhr.getStatus() === 402) {
        newErr = quotaExceeded(location.bucket);
      } else {
        if (xhr.getStatus() === 403) {
          newErr = unauthorized(location.path);
        } else {
          newErr = err;
        }
      }
    }

    newErr.serverResponse = err.serverResponse;
    return newErr;
  }

  return errorHandler;
}

function objectErrorHandler(location) {
  const shared = sharedErrorHandler(location);

  function errorHandler(xhr, err) {
    let newErr = shared(xhr, err);

    if (xhr.getStatus() === 404) {
      newErr = objectNotFound(location.path);
    }

    newErr.serverResponse = err.serverResponse;
    return newErr;
  }

  return errorHandler;
}

function getMetadata$2(service, location, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function list$2(service, location, delimiter, pageToken, maxResults) {
  const urlParams = {};

  if (location.isRoot) {
    urlParams['prefix'] = '';
  } else {
    urlParams['prefix'] = location.path + '/';
  }

  if (delimiter && delimiter.length > 0) {
    urlParams['delimiter'] = delimiter;
  }

  if (pageToken) {
    urlParams['pageToken'] = pageToken;
  }

  if (maxResults) {
    urlParams['maxResults'] = maxResults;
  }

  const urlPart = location.bucketOnlyServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, listHandler(service, location.bucket), timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}

function getBytes$1(service, location, maxDownloadSizeBytes) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol) + '?alt=media';
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, (_, data) => data, timeout);
  requestInfo.errorHandler = objectErrorHandler(location);

  if (maxDownloadSizeBytes !== undefined) {
    requestInfo.headers['Range'] = `bytes=0-${maxDownloadSizeBytes}`;
    requestInfo.successCodes = [200
    /* OK */
    , 206
    /* Partial Content */
    ];
  }

  return requestInfo;
}

function getDownloadUrl(service, location, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, downloadUrlHandler(service, mappings), timeout);
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function updateMetadata$2(service, location, metadata, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'PATCH';
  const body = toResourceString(metadata, mappings);
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.headers = headers;
  requestInfo.body = body;
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function deleteObject$2(service, location) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'DELETE';
  const timeout = service.maxOperationRetryTime;

  function handler(_xhr, _text) {}

  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.successCodes = [200, 204];
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function determineContentType_(metadata, blob) {
  return metadata && metadata['contentType'] || blob && blob.type() || 'application/octet-stream';
}

function metadataForUpload_(location, blob, metadata) {
  const metadataClone = Object.assign({}, metadata);
  metadataClone['fullPath'] = location.path;
  metadataClone['size'] = blob.size();

  if (!metadataClone['contentType']) {
    metadataClone['contentType'] = determineContentType_(null, blob);
  }

  return metadataClone;
}
/**
 * Prepare RequestInfo for uploads as Content-Type: multipart.
 */


function multipartUpload(service, location, mappings, blob, metadata) {
  const urlPart = location.bucketOnlyServerUrl();
  const headers = {
    'X-Goog-Upload-Protocol': 'multipart'
  };

  function genBoundary() {
    let str = '';

    for (let i = 0; i < 2; i++) {
      str = str + Math.random().toString().slice(2);
    }

    return str;
  }

  const boundary = genBoundary();
  headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
  const metadata_ = metadataForUpload_(location, blob, metadata);
  const metadataString = toResourceString(metadata_, mappings);
  const preBlobPart = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=utf-8\r\n\r\n' + metadataString + '\r\n--' + boundary + '\r\n' + 'Content-Type: ' + metadata_['contentType'] + '\r\n\r\n';
  const postBlobPart = '\r\n--' + boundary + '--';
  const body = FbsBlob.getBlob(preBlobPart, blob, postBlobPart);

  if (body === null) {
    throw cannotSliceBlob();
  }

  const urlParams = {
    name: metadata_['fullPath']
  };
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.headers = headers;
  requestInfo.body = body.uploadData();
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 */


class ResumableUploadStatus {
  constructor(current, total, finalized, metadata) {
    this.current = current;
    this.total = total;
    this.finalized = !!finalized;
    this.metadata = metadata || null;
  }

}

function checkResumeHeader_(xhr, allowed) {
  let status = null;

  try {
    status = xhr.getResponseHeader('X-Goog-Upload-Status');
  } catch (e) {
    handlerCheck(false);
  }

  const allowedStatus = allowed || ['active'];
  handlerCheck(!!status && allowedStatus.indexOf(status) !== -1);
  return status;
}

function createResumableUpload(service, location, mappings, blob, metadata) {
  const urlPart = location.bucketOnlyServerUrl();
  const metadataForUpload = metadataForUpload_(location, blob, metadata);
  const urlParams = {
    name: metadataForUpload['fullPath']
  };
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'POST';
  const headers = {
    'X-Goog-Upload-Protocol': 'resumable',
    'X-Goog-Upload-Command': 'start',
    'X-Goog-Upload-Header-Content-Length': `${blob.size()}`,
    'X-Goog-Upload-Header-Content-Type': metadataForUpload['contentType'],
    'Content-Type': 'application/json; charset=utf-8'
  };
  const body = toResourceString(metadataForUpload, mappings);
  const timeout = service.maxUploadRetryTime;

  function handler(xhr) {
    checkResumeHeader_(xhr);
    let url;

    try {
      url = xhr.getResponseHeader('X-Goog-Upload-URL');
    } catch (e) {
      handlerCheck(false);
    }

    handlerCheck(isString(url));
    return url;
  }

  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.headers = headers;
  requestInfo.body = body;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */


function getResumableUploadStatus(service, location, url, blob) {
  const headers = {
    'X-Goog-Upload-Command': 'query'
  };

  function handler(xhr) {
    const status = checkResumeHeader_(xhr, ['active', 'final']);
    let sizeString = null;

    try {
      sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
    } catch (e) {
      handlerCheck(false);
    }

    if (!sizeString) {
      // null or empty string
      handlerCheck(false);
    }

    const size = Number(sizeString);
    handlerCheck(!isNaN(size));
    return new ResumableUploadStatus(size, blob.size(), status === 'final');
  }

  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.headers = headers;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */


const RESUMABLE_UPLOAD_CHUNK_SIZE = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */

function continueResumableUpload(location, service, url, blob, chunkSize, mappings, status, progressCallback) {
  // TODO(andysoto): standardize on internal asserts
  // assert(!(opt_status && opt_status.finalized));
  const status_ = new ResumableUploadStatus(0, 0);

  if (status) {
    status_.current = status.current;
    status_.total = status.total;
  } else {
    status_.current = 0;
    status_.total = blob.size();
  }

  if (blob.size() !== status_.total) {
    throw serverFileWrongSize();
  }

  const bytesLeft = status_.total - status_.current;
  let bytesToUpload = bytesLeft;

  if (chunkSize > 0) {
    bytesToUpload = Math.min(bytesToUpload, chunkSize);
  }

  const startByte = status_.current;
  const endByte = startByte + bytesToUpload;
  const uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
  const headers = {
    'X-Goog-Upload-Command': uploadCommand,
    'X-Goog-Upload-Offset': `${status_.current}`
  };
  const body = blob.slice(startByte, endByte);

  if (body === null) {
    throw cannotSliceBlob();
  }

  function handler(xhr, text) {
    // TODO(andysoto): Verify the MD5 of each uploaded range:
    // the 'x-range-md5' header comes back with status code 308 responses.
    // We'll only be able to bail out though, because you can't re-upload a
    // range that you previously uploaded.
    const uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
    const newCurrent = status_.current + bytesToUpload;
    const size = blob.size();
    let metadata;

    if (uploadStatus === 'final') {
      metadata = metadataHandler(service, mappings)(xhr, text);
    } else {
      metadata = null;
    }

    return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
  }

  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.headers = headers;
  requestInfo.body = body.uploadData();
  requestInfo.progressCallback = progressCallback || null;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An event that is triggered on a task.
 * @internal
 */


const TaskEvent = {
  /**
   * For this event,
   * <ul>
   *   <li>The `next` function is triggered on progress updates and when the
   *       task is paused/resumed with an `UploadTaskSnapshot` as the first
   *       argument.</li>
   *   <li>The `error` function is triggered if the upload is canceled or fails
   *       for another reason.</li>
   *   <li>The `complete` function is triggered if the upload completes
   *       successfully.</li>
   * </ul>
   */
  STATE_CHANGED: 'state_changed'
}; // type keys = keyof TaskState

/**
 * Represents the current state of a running upload.
 * @internal
 */

exports._TaskEvent = TaskEvent;
const TaskState = {
  /** The task is currently transferring data. */
  RUNNING: 'running',

  /** The task was paused by the user. */
  PAUSED: 'paused',

  /** The task completed successfully. */
  SUCCESS: 'success',

  /** The task was canceled. */
  CANCELED: 'canceled',

  /** The task failed with an error. */
  ERROR: 'error'
};
exports._TaskState = TaskState;

function taskStateFromInternalTaskState(state) {
  switch (state) {
    case "running"
    /* RUNNING */
    :
    case "pausing"
    /* PAUSING */
    :
    case "canceling"
    /* CANCELING */
    :
      return TaskState.RUNNING;

    case "paused"
    /* PAUSED */
    :
      return TaskState.PAUSED;

    case "success"
    /* SUCCESS */
    :
      return TaskState.SUCCESS;

    case "canceled"
    /* CANCELED */
    :
      return TaskState.CANCELED;

    case "error"
    /* ERROR */
    :
      return TaskState.ERROR;

    default:
      // TODO(andysoto): assert(false);
      return TaskState.ERROR;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Observer {
  constructor(nextOrObserver, error, complete) {
    const asFunctions = isFunction(nextOrObserver) || error != null || complete != null;

    if (asFunctions) {
      this.next = nextOrObserver;
      this.error = error !== null && error !== void 0 ? error : undefined;
      this.complete = complete !== null && complete !== void 0 ? complete : undefined;
    } else {
      const observer = nextOrObserver;
      this.next = observer.next;
      this.error = observer.error;
      this.complete = observer.complete;
    }
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a function that invokes f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(f) {
  return (...argsToForward) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.resolve().then(() => f(...argsToForward));
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** An override for the text-based Connection. Used in tests. */


let textFactoryOverride = null;
/**
 * Network layer for browsers. We use this instead of goog.net.XhrIo because
 * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
 */

class XhrConnection {
  constructor() {
    this.sent_ = false;
    this.xhr_ = new XMLHttpRequest();
    this.initXhr();
    this.errorCode_ = ErrorCode.NO_ERROR;
    this.sendPromise_ = new Promise(resolve => {
      this.xhr_.addEventListener('abort', () => {
        this.errorCode_ = ErrorCode.ABORT;
        resolve();
      });
      this.xhr_.addEventListener('error', () => {
        this.errorCode_ = ErrorCode.NETWORK_ERROR;
        resolve();
      });
      this.xhr_.addEventListener('load', () => {
        resolve();
      });
    });
  }

  send(url, method, body, headers) {
    if (this.sent_) {
      throw internalError('cannot .send() more than once');
    }

    this.sent_ = true;
    this.xhr_.open(method, url, true);

    if (headers !== undefined) {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          this.xhr_.setRequestHeader(key, headers[key].toString());
        }
      }
    }

    if (body !== undefined) {
      this.xhr_.send(body);
    } else {
      this.xhr_.send();
    }

    return this.sendPromise_;
  }

  getErrorCode() {
    if (!this.sent_) {
      throw internalError('cannot .getErrorCode() before sending');
    }

    return this.errorCode_;
  }

  getStatus() {
    if (!this.sent_) {
      throw internalError('cannot .getStatus() before sending');
    }

    try {
      return this.xhr_.status;
    } catch (e) {
      return -1;
    }
  }

  getResponse() {
    if (!this.sent_) {
      throw internalError('cannot .getResponse() before sending');
    }

    return this.xhr_.response;
  }

  getErrorText() {
    if (!this.sent_) {
      throw internalError('cannot .getErrorText() before sending');
    }

    return this.xhr_.statusText;
  }
  /** Aborts the request. */


  abort() {
    this.xhr_.abort();
  }

  getResponseHeader(header) {
    return this.xhr_.getResponseHeader(header);
  }

  addUploadProgressListener(listener) {
    if (this.xhr_.upload != null) {
      this.xhr_.upload.addEventListener('progress', listener);
    }
  }

  removeUploadProgressListener(listener) {
    if (this.xhr_.upload != null) {
      this.xhr_.upload.removeEventListener('progress', listener);
    }
  }

}

class XhrTextConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'text';
  }

}

function newTextConnection() {
  return textFactoryOverride ? textFactoryOverride() : new XhrTextConnection();
}

class XhrBytesConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'arraybuffer';
  }

}

function newBytesConnection() {
  return new XhrBytesConnection();
}

class XhrBlobConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'blob';
  }

}

function newBlobConnection() {
  return new XhrBlobConnection();
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */


class UploadTask {
  /**
   * @param ref - The firebaseStorage.Reference object this task came
   *     from, untyped to avoid cyclic dependencies.
   * @param blob - The blob to upload.
   */
  constructor(ref, blob, metadata = null) {
    /**
     * Number of bytes transferred so far.
     */
    this._transferred = 0;
    this._needToFetchStatus = false;
    this._needToFetchMetadata = false;
    this._observers = [];
    this._error = undefined;
    this._uploadUrl = undefined;
    this._request = undefined;
    this._chunkMultiplier = 1;
    this._resolve = undefined;
    this._reject = undefined;
    this._ref = ref;
    this._blob = blob;
    this._metadata = metadata;
    this._mappings = getMappings();
    this._resumable = this._shouldDoResumable(this._blob);
    this._state = "running"
    /* RUNNING */
    ;

    this._errorHandler = error => {
      this._request = undefined;
      this._chunkMultiplier = 1;

      if (error._codeEquals("canceled"
      /* CANCELED */
      )) {
        this._needToFetchStatus = true;
        this.completeTransitions_();
      } else {
        this._error = error;

        this._transition("error"
        /* ERROR */
        );
      }
    };

    this._metadataErrorHandler = error => {
      this._request = undefined;

      if (error._codeEquals("canceled"
      /* CANCELED */
      )) {
        this.completeTransitions_();
      } else {
        this._error = error;

        this._transition("error"
        /* ERROR */
        );
      }
    };

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;

      this._start();
    }); // Prevent uncaught rejections on the internal promise from bubbling out
    // to the top level with a dummy handler.

    this._promise.then(null, () => {});
  }

  _makeProgressCallback() {
    const sizeBefore = this._transferred;
    return loaded => this._updateProgress(sizeBefore + loaded);
  }

  _shouldDoResumable(blob) {
    return blob.size() > 256 * 1024;
  }

  _start() {
    if (this._state !== "running"
    /* RUNNING */
    ) {
      // This can happen if someone pauses us in a resume callback, for example.
      return;
    }

    if (this._request !== undefined) {
      return;
    }

    if (this._resumable) {
      if (this._uploadUrl === undefined) {
        this._createResumable();
      } else {
        if (this._needToFetchStatus) {
          this._fetchStatus();
        } else {
          if (this._needToFetchMetadata) {
            // Happens if we miss the metadata on upload completion.
            this._fetchMetadata();
          } else {
            this._continueUpload();
          }
        }
      }
    } else {
      this._oneShotUpload();
    }
  }

  _resolveToken(callback) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all([this._ref.storage._getAuthToken(), this._ref.storage._getAppCheckToken()]).then(([authToken, appCheckToken]) => {
      switch (this._state) {
        case "running"
        /* RUNNING */
        :
          callback(authToken, appCheckToken);
          break;

        case "canceling"
        /* CANCELING */
        :
          this._transition("canceled"
          /* CANCELED */
          );

          break;

        case "pausing"
        /* PAUSING */
        :
          this._transition("paused"
          /* PAUSED */
          );

          break;
      }
    });
  } // TODO(andysoto): assert false


  _createResumable() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = createResumableUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);

      const createRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = createRequest;
      createRequest.getPromise().then(url => {
        this._request = undefined;
        this._uploadUrl = url;
        this._needToFetchStatus = false;
        this.completeTransitions_();
      }, this._errorHandler);
    });
  }

  _fetchStatus() {
    // TODO(andysoto): assert(this.uploadUrl_ !== null);
    const url = this._uploadUrl;

    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = getResumableUploadStatus(this._ref.storage, this._ref._location, url, this._blob);

      const statusRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = statusRequest;
      statusRequest.getPromise().then(status => {
        status = status;
        this._request = undefined;

        this._updateProgress(status.current);

        this._needToFetchStatus = false;

        if (status.finalized) {
          this._needToFetchMetadata = true;
        }

        this.completeTransitions_();
      }, this._errorHandler);
    });
  }

  _continueUpload() {
    const chunkSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
    const status = new ResumableUploadStatus(this._transferred, this._blob.size()); // TODO(andysoto): assert(this.uploadUrl_ !== null);

    const url = this._uploadUrl;

    this._resolveToken((authToken, appCheckToken) => {
      let requestInfo;

      try {
        requestInfo = continueResumableUpload(this._ref._location, this._ref.storage, url, this._blob, chunkSize, this._mappings, status, this._makeProgressCallback());
      } catch (e) {
        this._error = e;

        this._transition("error"
        /* ERROR */
        );

        return;
      }

      const uploadRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = uploadRequest;
      uploadRequest.getPromise().then(newStatus => {
        this._increaseMultiplier();

        this._request = undefined;

        this._updateProgress(newStatus.current);

        if (newStatus.finalized) {
          this._metadata = newStatus.metadata;

          this._transition("success"
          /* SUCCESS */
          );
        } else {
          this.completeTransitions_();
        }
      }, this._errorHandler);
    });
  }

  _increaseMultiplier() {
    const currentSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier; // Max chunk size is 32M.

    if (currentSize < 32 * 1024 * 1024) {
      this._chunkMultiplier *= 2;
    }
  }

  _fetchMetadata() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = getMetadata$2(this._ref.storage, this._ref._location, this._mappings);

      const metadataRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = metadataRequest;
      metadataRequest.getPromise().then(metadata => {
        this._request = undefined;
        this._metadata = metadata;

        this._transition("success"
        /* SUCCESS */
        );
      }, this._metadataErrorHandler);
    });
  }

  _oneShotUpload() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = multipartUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);

      const multipartRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = multipartRequest;
      multipartRequest.getPromise().then(metadata => {
        this._request = undefined;
        this._metadata = metadata;

        this._updateProgress(this._blob.size());

        this._transition("success"
        /* SUCCESS */
        );
      }, this._errorHandler);
    });
  }

  _updateProgress(transferred) {
    const old = this._transferred;
    this._transferred = transferred; // A progress update can make the "transferred" value smaller (e.g. a
    // partial upload not completed by server, after which the "transferred"
    // value may reset to the value at the beginning of the request).

    if (this._transferred !== old) {
      this._notifyObservers();
    }
  }

  _transition(state) {
    if (this._state === state) {
      return;
    }

    switch (state) {
      case "canceling"
      /* CANCELING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING);
        this._state = state;

        if (this._request !== undefined) {
          this._request.cancel();
        }

        break;

      case "pausing"
      /* PAUSING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING);
        this._state = state;

        if (this._request !== undefined) {
          this._request.cancel();
        }

        break;

      case "running"
      /* RUNNING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSED ||
        //        this.state_ === InternalTaskState.PAUSING);
        const wasPaused = this._state === "paused"
        /* PAUSED */
        ;
        this._state = state;

        if (wasPaused) {
          this._notifyObservers();

          this._start();
        }

        break;

      case "paused"
      /* PAUSED */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSING);
        this._state = state;

        this._notifyObservers();

        break;

      case "canceled"
      /* CANCELED */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSED ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._error = canceled();
        this._state = state;

        this._notifyObservers();

        break;

      case "error"
      /* ERROR */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._state = state;

        this._notifyObservers();

        break;

      case "success"
      /* SUCCESS */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._state = state;

        this._notifyObservers();

        break;
    }
  }

  completeTransitions_() {
    switch (this._state) {
      case "pausing"
      /* PAUSING */
      :
        this._transition("paused"
        /* PAUSED */
        );

        break;

      case "canceling"
      /* CANCELING */
      :
        this._transition("canceled"
        /* CANCELED */
        );

        break;

      case "running"
      /* RUNNING */
      :
        this._start();

        break;
    }
  }
  /**
   * A snapshot of the current task state.
   */


  get snapshot() {
    const externalState = taskStateFromInternalTaskState(this._state);
    return {
      bytesTransferred: this._transferred,
      totalBytes: this._blob.size(),
      state: externalState,
      metadata: this._metadata,
      task: this,
      ref: this._ref
    };
  }
  /**
   * Adds a callback for an event.
   * @param type - The type of event to listen for.
   * @param nextOrObserver -
   *     The `next` function, which gets called for each item in
   *     the event stream, or an observer object with some or all of these three
   *     properties (`next`, `error`, `complete`).
   * @param error - A function that gets called with a `StorageError`
   *     if the event stream ends due to an error.
   * @param completed - A function that gets called if the
   *     event stream ends normally.
   * @returns
   *     If only the event argument is passed, returns a function you can use to
   *     add callbacks (see the examples above). If more than just the event
   *     argument is passed, returns a function you can call to unregister the
   *     callbacks.
   */


  on(type, nextOrObserver, error, completed) {
    const observer = new Observer(nextOrObserver || undefined, error || undefined, completed || undefined);

    this._addObserver(observer);

    return () => {
      this._removeObserver(observer);
    };
  }
  /**
   * This object behaves like a Promise, and resolves with its snapshot data
   * when the upload completes.
   * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
   * @param onRejected - The rejection callback.
   */


  then(onFulfilled, onRejected) {
    // These casts are needed so that TypeScript can infer the types of the
    // resulting Promise.
    return this._promise.then(onFulfilled, onRejected);
  }
  /**
   * Equivalent to calling `then(null, onRejected)`.
   */


  catch(onRejected) {
    return this.then(null, onRejected);
  }
  /**
   * Adds the given observer.
   */


  _addObserver(observer) {
    this._observers.push(observer);

    this._notifyObserver(observer);
  }
  /**
   * Removes the given observer.
   */


  _removeObserver(observer) {
    const i = this._observers.indexOf(observer);

    if (i !== -1) {
      this._observers.splice(i, 1);
    }
  }

  _notifyObservers() {
    this._finishPromise();

    const observers = this._observers.slice();

    observers.forEach(observer => {
      this._notifyObserver(observer);
    });
  }

  _finishPromise() {
    if (this._resolve !== undefined) {
      let triggered = true;

      switch (taskStateFromInternalTaskState(this._state)) {
        case TaskState.SUCCESS:
          async(this._resolve.bind(null, this.snapshot))();
          break;

        case TaskState.CANCELED:
        case TaskState.ERROR:
          const toCall = this._reject;
          async(toCall.bind(null, this._error))();
          break;

        default:
          triggered = false;
          break;
      }

      if (triggered) {
        this._resolve = undefined;
        this._reject = undefined;
      }
    }
  }

  _notifyObserver(observer) {
    const externalState = taskStateFromInternalTaskState(this._state);

    switch (externalState) {
      case TaskState.RUNNING:
      case TaskState.PAUSED:
        if (observer.next) {
          async(observer.next.bind(observer, this.snapshot))();
        }

        break;

      case TaskState.SUCCESS:
        if (observer.complete) {
          async(observer.complete.bind(observer))();
        }

        break;

      case TaskState.CANCELED:
      case TaskState.ERROR:
        if (observer.error) {
          async(observer.error.bind(observer, this._error))();
        }

        break;

      default:
        // TODO(andysoto): assert(false);
        if (observer.error) {
          async(observer.error.bind(observer, this._error))();
        }

    }
  }
  /**
   * Resumes a paused task. Has no effect on a currently running or failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  resume() {
    const valid = this._state === "paused"
    /* PAUSED */
    || this._state === "pausing"
    /* PAUSING */
    ;

    if (valid) {
      this._transition("running"
      /* RUNNING */
      );
    }

    return valid;
  }
  /**
   * Pauses a currently running task. Has no effect on a paused or failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  pause() {
    const valid = this._state === "running"
    /* RUNNING */
    ;

    if (valid) {
      this._transition("pausing"
      /* PAUSING */
      );
    }

    return valid;
  }
  /**
   * Cancels a currently running or paused task. Has no effect on a complete or
   * failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  cancel() {
    const valid = this._state === "running"
    /* RUNNING */
    || this._state === "pausing"
    /* PAUSING */
    ;

    if (valid) {
      this._transition("canceling"
      /* CANCELING */
      );
    }

    return valid;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @internal
 * @param _location - An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */


exports._UploadTask = UploadTask;

class Reference {
  constructor(_service, location) {
    this._service = _service;

    if (location instanceof Location) {
      this._location = location;
    } else {
      this._location = Location.makeFromUrl(location, _service.host);
    }
  }
  /**
   * Returns the URL for the bucket and path this object references,
   *     in the form gs://<bucket>/<object-path>
   * @override
   */


  toString() {
    return 'gs://' + this._location.bucket + '/' + this._location.path;
  }

  _newRef(service, location) {
    return new Reference(service, location);
  }
  /**
   * A reference to the root of this object's bucket.
   */


  get root() {
    const location = new Location(this._location.bucket, '');
    return this._newRef(this._service, location);
  }
  /**
   * The name of the bucket containing this reference's object.
   */


  get bucket() {
    return this._location.bucket;
  }
  /**
   * The full path of this object.
   */


  get fullPath() {
    return this._location.path;
  }
  /**
   * The short name of this object, which is the last component of the full path.
   * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
   */


  get name() {
    return lastComponent(this._location.path);
  }
  /**
   * The `StorageService` instance this `StorageReference` is associated with.
   */


  get storage() {
    return this._service;
  }
  /**
   * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
   * this reference is the root.
   */


  get parent() {
    const newPath = parent(this._location.path);

    if (newPath === null) {
      return null;
    }

    const location = new Location(this._location.bucket, newPath);
    return new Reference(this._service, location);
  }
  /**
   * Utility function to throw an error in methods that do not accept a root reference.
   */


  _throwIfRoot(name) {
    if (this._location.path === '') {
      throw invalidRootOperation(name);
    }
  }

}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded bytes.
 */


function getBytesInternal(ref, maxDownloadSizeBytes) {
  ref._throwIfRoot('getBytes');

  const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
  return ref.storage.makeRequestWithTokens(requestInfo, newBytesConnection).then(bytes => maxDownloadSizeBytes !== undefined ? // GCS may not honor the Range header for small files
  bytes.slice(0, maxDownloadSizeBytes) : bytes);
}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded blob.
 */


function getBlobInternal(ref, maxDownloadSizeBytes) {
  ref._throwIfRoot('getBlob');

  const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
  return ref.storage.makeRequestWithTokens(requestInfo, newBlobConnection).then(blob => maxDownloadSizeBytes !== undefined ? // GCS may not honor the Range header for small files
  blob.slice(0, maxDownloadSizeBytes) : blob);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 *
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns A Promise containing an UploadResult
 */


function uploadBytes$1(ref, data, metadata) {
  ref._throwIfRoot('uploadBytes');

  const requestInfo = multipartUpload(ref.storage, ref._location, getMappings(), new FbsBlob(data, true), metadata);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection).then(finalMetadata => {
    return {
      metadata: finalMetadata,
      ref
    };
  });
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns An UploadTask
 */


function uploadBytesResumable$1(ref, data, metadata) {
  ref._throwIfRoot('uploadBytesResumable');

  return new UploadTask(ref, new FbsBlob(data), metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the newly uploaded string.
 * @returns A Promise containing an UploadResult
 */


function uploadString$1(ref, value, format = StringFormat.RAW, metadata) {
  ref._throwIfRoot('uploadString');

  const data = dataFromString(format, value);
  const metadataClone = Object.assign({}, metadata);

  if (metadataClone['contentType'] == null && data.contentType != null) {
    metadataClone['contentType'] = data.contentType;
  }

  return uploadBytes$1(ref, data.data, metadataClone);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: listAll may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - StorageReference to get list from.
 *
 * @returns A Promise that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */


function listAll$1(ref) {
  const accumulator = {
    prefixes: [],
    items: []
  };
  return listAllHelper(ref, accumulator).then(() => accumulator);
}
/**
 * Separated from listAll because async functions can't use "arguments".
 * @param ref
 * @param accumulator
 * @param pageToken
 */


async function listAllHelper(ref, accumulator, pageToken) {
  const opt = {
    // maxResults is 1000 by default.
    pageToken
  };
  const nextPage = await list$1(ref, opt);
  accumulator.prefixes.push(...nextPage.prefixes);
  accumulator.items.push(...nextPage.items);

  if (nextPage.nextPageToken != null) {
    await listAllHelper(ref, accumulator, nextPage.nextPageToken);
  }
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - StorageReference to get list from.
 * @param options - See ListOptions for details.
 * @returns A Promise that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */


function list$1(ref, options) {
  if (options != null) {
    if (typeof options.maxResults === 'number') {
      validateNumber('options.maxResults',
      /* minValue= */
      1,
      /* maxValue= */
      1000, options.maxResults);
    }
  }

  const op = options || {};
  const requestInfo = list$2(ref.storage, ref._location,
  /*delimiter= */
  '/', op.pageToken, op.maxResults);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - StorageReference to get metadata from.
 */


function getMetadata$1(ref) {
  ref._throwIfRoot('getMetadata');

  const requestInfo = getMetadata$2(ref.storage, ref._location, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - StorageReference to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves
 *     with the new metadata for this object.
 *     See `firebaseStorage.Reference.prototype.getMetadata`
 */


function updateMetadata$1(ref, metadata) {
  ref._throwIfRoot('updateMetadata');

  const requestInfo = updateMetadata$2(ref.storage, ref._location, metadata, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns the download URL for the given Reference.
 * @public
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */


function getDownloadURL$1(ref) {
  ref._throwIfRoot('getDownloadURL');

  const requestInfo = getDownloadUrl(ref.storage, ref._location, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection).then(url => {
    if (url === null) {
      throw noDownloadURL();
    }

    return url;
  });
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */


function deleteObject$1(ref) {
  ref._throwIfRoot('deleteObject');

  const requestInfo = deleteObject$2(ref.storage, ref._location);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns reference for object obtained by appending `childPath` to `ref`.
 *
 * @param ref - StorageReference to get child of.
 * @param childPath - Child path from provided ref.
 * @returns A reference to the object obtained by
 * appending childPath, removing any duplicate, beginning, or trailing
 * slashes.
 *
 */


function _getChild$1(ref, childPath) {
  const newPath = child(ref._location.path, childPath);
  const location = new Location(ref._location.bucket, newPath);
  return new Reference(ref.storage, location);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function isUrl(path) {
  return /^[A-Za-z]+:\/\//.test(path);
}
/**
 * Returns a firebaseStorage.Reference for the given url.
 */


function refFromURL(service, url) {
  return new Reference(service, url);
}
/**
 * Returns a firebaseStorage.Reference for the given path in the default
 * bucket.
 */


function refFromPath(ref, path) {
  if (ref instanceof FirebaseStorageImpl) {
    const service = ref;

    if (service._bucket == null) {
      throw noDefaultBucket();
    }

    const reference = new Reference(service, service._bucket);

    if (path != null) {
      return refFromPath(reference, path);
    } else {
      return reference;
    }
  } else {
    // ref is a Reference
    if (path !== undefined) {
      return _getChild$1(ref, path);
    } else {
      return ref;
    }
  }
}

function ref$1(serviceOrRef, pathOrUrl) {
  if (pathOrUrl && isUrl(pathOrUrl)) {
    if (serviceOrRef instanceof FirebaseStorageImpl) {
      return refFromURL(serviceOrRef, pathOrUrl);
    } else {
      throw invalidArgument('To use ref(service, url), the first argument must be a Storage instance.');
    }
  } else {
    return refFromPath(serviceOrRef, pathOrUrl);
  }
}

function extractBucket(host, config) {
  const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];

  if (bucketString == null) {
    return null;
  }

  return Location.makeFromBucketSpec(bucketString, host);
}

function connectStorageEmulator$1(storage, host, port, options = {}) {
  storage.host = `${host}:${port}`;
  storage._protocol = 'http';
  const {
    mockUserToken
  } = options;

  if (mockUserToken) {
    storage._overrideAuthToken = typeof mockUserToken === 'string' ? mockUserToken : (0, _util.createMockUserToken)(mockUserToken, storage.app.options.projectId);
  }
}
/**
 * A service that provides Firebase Storage Reference instances.
 * @param opt_url - gs:// url to a custom Storage Bucket
 *
 * @internal
 */


class FirebaseStorageImpl {
  constructor(
  /**
   * FirebaseApp associated with this StorageService instance.
   */
  app, _authProvider,
  /**
   * @internal
   */
  _appCheckProvider,
  /**
   * @internal
   */
  _url, _firebaseVersion) {
    this.app = app;
    this._authProvider = _authProvider;
    this._appCheckProvider = _appCheckProvider;
    this._url = _url;
    this._firebaseVersion = _firebaseVersion;
    this._bucket = null;
    /**
     * This string can be in the formats:
     * - host
     * - host:port
     */

    this._host = DEFAULT_HOST;
    this._protocol = 'https';
    this._appId = null;
    this._deleted = false;
    this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
    this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
    this._requests = new Set();

    if (_url != null) {
      this._bucket = Location.makeFromBucketSpec(_url, this._host);
    } else {
      this._bucket = extractBucket(this._host, this.app.options);
    }
  }
  /**
   * The host string for this service, in the form of `host` or
   * `host:port`.
   */


  get host() {
    return this._host;
  }

  set host(host) {
    this._host = host;

    if (this._url != null) {
      this._bucket = Location.makeFromBucketSpec(this._url, host);
    } else {
      this._bucket = extractBucket(host, this.app.options);
    }
  }
  /**
   * The maximum time to retry uploads in milliseconds.
   */


  get maxUploadRetryTime() {
    return this._maxUploadRetryTime;
  }

  set maxUploadRetryTime(time) {
    validateNumber('time',
    /* minValue=*/
    0,
    /* maxValue= */
    Number.POSITIVE_INFINITY, time);
    this._maxUploadRetryTime = time;
  }
  /**
   * The maximum time to retry operations other than uploads or downloads in
   * milliseconds.
   */


  get maxOperationRetryTime() {
    return this._maxOperationRetryTime;
  }

  set maxOperationRetryTime(time) {
    validateNumber('time',
    /* minValue=*/
    0,
    /* maxValue= */
    Number.POSITIVE_INFINITY, time);
    this._maxOperationRetryTime = time;
  }

  async _getAuthToken() {
    if (this._overrideAuthToken) {
      return this._overrideAuthToken;
    }

    const auth = this._authProvider.getImmediate({
      optional: true
    });

    if (auth) {
      const tokenData = await auth.getToken();

      if (tokenData !== null) {
        return tokenData.accessToken;
      }
    }

    return null;
  }

  async _getAppCheckToken() {
    const appCheck = this._appCheckProvider.getImmediate({
      optional: true
    });

    if (appCheck) {
      const result = await appCheck.getToken(); // TODO: What do we want to do if there is an error getting the token?
      // Context: appCheck.getToken() will never throw even if an error happened. In the error case, a dummy token will be
      // returned along with an error field describing the error. In general, we shouldn't care about the error condition and just use
      // the token (actual or dummy) to send requests.

      return result.token;
    }

    return null;
  }
  /**
   * Stop running requests and prevent more from being created.
   */


  _delete() {
    if (!this._deleted) {
      this._deleted = true;

      this._requests.forEach(request => request.cancel());

      this._requests.clear();
    }

    return Promise.resolve();
  }
  /**
   * Returns a new firebaseStorage.Reference object referencing this StorageService
   * at the given Location.
   */


  _makeStorageReference(loc) {
    return new Reference(this, loc);
  }
  /**
   * @param requestInfo - HTTP RequestInfo object
   * @param authToken - Firebase auth token
   */


  _makeRequest(requestInfo, requestFactory, authToken, appCheckToken) {
    if (!this._deleted) {
      const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion);

      this._requests.add(request); // Request removes itself from set when complete.


      request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
      return request;
    } else {
      return new FailRequest(appDeleted());
    }
  }

  async makeRequestWithTokens(requestInfo, requestFactory) {
    const [authToken, appCheckToken] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
    return this._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
  }

}

const name = "@firebase/storage";
const version = "0.9.8";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Type constant for Firebase Storage.
 */

const STORAGE_TYPE = 'storage';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise containing the object's bytes
 */

function getBytes(ref, maxDownloadSizeBytes) {
  ref = (0, _util.getModularInstance)(ref);
  return getBytesInternal(ref, maxDownloadSizeBytes);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an UploadResult
 */


function uploadBytes(ref, data, metadata) {
  ref = (0, _util.getModularInstance)(ref);
  return uploadBytes$1(ref, data, metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the string to upload.
 * @returns A Promise containing an UploadResult
 */


function uploadString(ref, value, format, metadata) {
  ref = (0, _util.getModularInstance)(ref);
  return uploadString$1(ref, value, format, metadata);
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns An UploadTask
 */


function uploadBytesResumable(ref, data, metadata) {
  ref = (0, _util.getModularInstance)(ref);
  return uploadBytesResumable$1(ref, data, metadata);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - {@link StorageReference} to get metadata from.
 */


function getMetadata(ref) {
  ref = (0, _util.getModularInstance)(ref);
  return getMetadata$1(ref);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - {@link StorageReference} to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves with the new metadata for this object.
 */


function updateMetadata(ref, metadata) {
  ref = (0, _util.getModularInstance)(ref);
  return updateMetadata$1(ref, metadata);
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - {@link StorageReference} to get list from.
 * @param options - See {@link ListOptions} for details.
 * @returns A `Promise` that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */


function list(ref, options) {
  ref = (0, _util.getModularInstance)(ref);
  return list$1(ref, options);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: `listAll` may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - {@link StorageReference} to get list from.
 *
 * @returns A `Promise` that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */


function listAll(ref) {
  ref = (0, _util.getModularInstance)(ref);
  return listAll$1(ref);
}
/**
 * Returns the download URL for the given {@link StorageReference}.
 * @public
 * @param ref - {@link StorageReference} to get the download URL for.
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */


function getDownloadURL(ref) {
  ref = (0, _util.getModularInstance)(ref);
  return getDownloadURL$1(ref);
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - {@link StorageReference} for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */


function deleteObject(ref) {
  ref = (0, _util.getModularInstance)(ref);
  return deleteObject$1(ref);
}

function ref(serviceOrRef, pathOrUrl) {
  serviceOrRef = (0, _util.getModularInstance)(serviceOrRef);
  return ref$1(serviceOrRef, pathOrUrl);
}
/**
 * @internal
 */


function _getChild(ref, childPath) {
  return _getChild$1(ref, childPath);
}
/**
 * Gets a {@link FirebaseStorage} instance for the given Firebase app.
 * @public
 * @param app - Firebase app to get {@link FirebaseStorage} instance for.
 * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
 * If not passed, uses the app's default Storage Bucket.
 * @returns A {@link FirebaseStorage} instance.
 */


function getStorage(app = (0, _app.getApp)(), bucketUrl) {
  app = (0, _util.getModularInstance)(app);
  const storageProvider = (0, _app._getProvider)(app, STORAGE_TYPE);
  const storageInstance = storageProvider.getImmediate({
    identifier: bucketUrl
  });
  return storageInstance;
}
/**
 * Modify this {@link FirebaseStorage} instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The {@link FirebaseStorage} instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @param options - Emulator options. `options.mockUserToken` is the mock auth
 * token to use for unit testing Security Rules.
 * @public
 */


function connectStorageEmulator(storage, host, port, options = {}) {
  connectStorageEmulator$1(storage, host, port, options);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * This API is not available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise that resolves with a Blob containing the object's bytes
 */


function getBlob(ref, maxDownloadSizeBytes) {
  ref = (0, _util.getModularInstance)(ref);
  return getBlobInternal(ref, maxDownloadSizeBytes);
}
/**
 * Downloads the data at the object's location. Raises an error event if the
 * object is not found.
 *
 * This API is only available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A stream with the object's data as bytes
 */


function getStream(ref, maxDownloadSizeBytes) {
  throw new Error('getStream() is only supported by NodeJS builds');
}
/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */


function factory(container, {
  instanceIdentifier: url
}) {
  const app = container.getProvider('app').getImmediate();
  const authProvider = container.getProvider('auth-internal');
  const appCheckProvider = container.getProvider('app-check-internal');
  return new FirebaseStorageImpl(app, authProvider, appCheckProvider, url, _app.SDK_VERSION);
}

function registerStorage() {
  (0, _app._registerComponent)(new _component.Component(STORAGE_TYPE, factory, "PUBLIC"
  /* PUBLIC */
  ).setMultipleInstances(true)); //RUNTIME_ENV will be replaced during the compilation to "node" for nodejs and an empty string for browser

  (0, _app.registerVersion)(name, version, ''); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  (0, _app.registerVersion)(name, version, 'esm2017');
}

registerStorage();
},{"@firebase/app":"node_modules/@firebase/app/dist/esm/index.esm2017.js","@firebase/util":"node_modules/@firebase/util/dist/index.esm2017.js","@firebase/component":"node_modules/@firebase/component/dist/esm/index.esm2017.js"}],"node_modules/firebase/storage/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = require("@firebase/storage");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _storage[key];
    }
  });
});
},{"@firebase/storage":"node_modules/@firebase/storage/dist/index.esm2017.js"}],"upload.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = upload;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (!bytes) {
    return '0 Byte';
  }

  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

var element = function element(tag) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var content = arguments.length > 2 ? arguments[2] : undefined;
  var node = document.createElement(tag);

  if (classes.length) {
    var _node$classList;

    (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(classes));
  }

  if (content) {
    node.textContent = content;
  }

  return node;
};

function upload(selector, options) {
  var _options$loading;

  var files = [];
  var onUpload = (_options$loading = options.loading) !== null && _options$loading !== void 0 ? _options$loading : noop;
  var input = document.querySelector(selector);
  var preview = element('div', ['preview']);
  var openBtn = element('button', ['btn'], 'Открыть');
  var uploadBtn = element('button', ['btn', 'primary'], 'Загрузить');
  uploadBtn.style.display = 'none';

  if (options.multi) {
    input.setAttribute('multiple', true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', uploadBtn);
  input.insertAdjacentElement('afterend', openBtn);

  var triggerInput = function triggerInput() {
    return input.click();
  };

  var changeHandler = function changeHandler(event) {
    if (!event.target.files.length) {
      return;
    }

    files = Array.from(event.target.files);
    preview.innerHTML = '';
    uploadBtn.style.display = 'inline';
    files.forEach(function (f) {
      if (!f.type.match('image')) {
        return;
      }

      var reader = new FileReader();

      reader.onload = function (event) {
        var src = event.target.result;
        preview.insertAdjacentHTML('afterbegin', "\n        <div class=\"preview-image\">\n        <div class=\"preview-remove\" data-name=\"".concat(f.name, "\">&times;</div>\n        <img src=\"").concat(src, "\"/>\n        <div class=\"preview-info\">\n        <span>").concat(f.name, "</span>\n        <span>").concat(bytesToSize(f.size), "</span>\n        </div>\n        </div>\n        "));
      };

      reader.readAsDataURL(f);
    });
  };

  var removeHandler = function removeHandler(event) {
    if (!event.target.dataset.name) {
      return;
    }

    var name = event.target.dataset.name;
    files = files.filter(function (f) {
      return f.name !== name;
    });

    if (!files.length) {
      uploadBtn.style.display = 'none';
    }

    var block = preview.querySelector("[data-name=\"".concat(name, "\"]")).closest('.preview-image');
    block.classList.add('removing');
    setTimeout(function () {
      return block.remove();
    }, 300);
  };

  var clearPreview = function clearPreview(el) {
    el.style.bottom = '4px';
    el.innerHTML = '<div class="preview-info-progress"></div>';
  };

  var uploadHandler = function uploadHandler() {
    preview.querySelectorAll('.preview-remove').forEach(function (e) {
      return e.remove();
    });
    var previewInfo = preview.querySelectorAll('.preview-info');
    previewInfo.forEach(clearPreview);
    onUpload(files, previewInfo);
  };

  openBtn.addEventListener('click', triggerInput);
  input.addEventListener('change', changeHandler);
  preview.addEventListener('click', removeHandler);
  uploadBtn.addEventListener('click', uploadHandler);
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _app = require("firebase/app");

var _storage = require("firebase/storage");

var _upload = require("./upload.js");

var firebaseConfig = {
  apiKey: 'AIzaSyCTxwFPHF6ahbTH3EgMS4b8toqmJ072DLE',
  authDomain: 'training-download.firebaseapp.com',
  projectId: 'training-download',
  storageBucket: 'training-download.appspot.com',
  messagingSenderId: '597602799587',
  appId: '1:597602799587:web:5d1df1f6afcb2cdb731ad6'
};
var app = (0, _app.initializeApp)(firebaseConfig);
(0, _upload.upload)('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  loading: function loading(smth, blocks) {
    smth.forEach(function (f, index) {
      var storage = (0, _storage.getStorage)();
      var storageRef = (0, _storage.ref)(storage, "images/".concat(f.name));
      var uploadTask = (0, _storage.uploadBytesResumable)(storageRef, f);
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(0);
        var block = blocks[index].querySelector('.preview-info-progress');
        block.textContent = progress;
        block.style.width = progress + '%';
        console.log('Upload is ' + progress + '% done');
      }, function (error) {
        console.log(error);
      }, function () {
        (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (url) {
          console.log('File available at', url);
        });
      });
    });
  }
});
},{"firebase/app":"node_modules/firebase/app/dist/index.esm.js","firebase/storage":"node_modules/firebase/storage/dist/index.esm.js","./upload.js":"upload.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50297" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map