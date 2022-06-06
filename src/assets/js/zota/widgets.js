if (!window.location.hostname.match('cloudflare.works') || "//static.zotabox.com/9/5/9538b289eeb024c3e03b31bf47611be6".match('a641227e8963155fcc57d87f55ee1cb0')) {
    window.Zotabox_Init = function() {
        var ZB_STORAGE = {
            sessionStorage: function(name, value) {
                var isInIframe = this.isIframe();
                if (isInIframe == true) {
                    var topWindow = window;
                } else {
                    var topWindow = parent.window;
                }
                if (typeof topWindow.ztb_no_have_ss_storage != 'undefined') {
                    return this.localStorage(name, value);
                }
                try {
                    if (typeof value != 'undefined') {
                        topWindow.sessionStorage.setItem(name, value);
                    }
                    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                    var sessionValue = v ? v[2] : topWindow.sessionStorage.getItem(name);
                    if (v) {
                        this.deleteCookie(name);
                        this.sessionStorage(name, v[2]);
                    }
                    return sessionValue != null ? sessionValue : false;
                } catch (err) {
                    if (typeof value != 'undefined') {
                        return this.setCookie(name, value);
                    }
                    return this.getCookie(name);
                }
            },
            deleteSessionStorage: function(name) {
                var isInIframe = this.isIframe();
                if (isInIframe == true) {
                    var topWindow = window;
                } else {
                    var topWindow = parent.window;
                }
                try {
                    return topWindow.sessionStorage.removeItem(name);
                } catch (err) {}
            },
            setCookie: function(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                } else
                    var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            getCookie: function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            deleteCookie: function(name) {
                document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                return true;
            },
            localStorage: function(name, value) {
                var isInIframe = this.isIframe();
                if (isInIframe == true) {
                    var topWindow = window;
                } else {
                    var topWindow = parent.window;
                }
                try {
                    if (typeof value != 'undefined') {
                        topWindow.localStorage.setItem(name, value);
                    }
                    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                    var localValue = v ? v[2] : topWindow.localStorage.getItem(name);
                    if (v) {
                        this.deleteCookie(name);
                        this.localStorage(name, v[2]);
                    }
                    return localValue != null ? localValue : false;
                } catch (err) {
                    if (typeof value != 'undefined') {
                        return this.setCookie(name, value);
                    }
                    return this.getCookie(name);
                }
            },
            deleteLocalStorage: function(name) {
                var isInIframe = this.isIframe();
                if (isInIframe == true) {
                    var topWindow = window;
                } else {
                    var topWindow = parent.window;
                }
                return topWindow.localStorage.removeItem(name);
            },
            isIframe: function() {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true
                }
            }
        };
        !(function(bootstrap) {
            (function() {
                (function() {
                    var Admin = function() {
                        this.status = 'ok';
                        this.time_stamp = null;
                        this.attrPre = '_ZB_STATIC_';
                    };
                    Admin.prototype = {
                        isOK: function() {
                            if (window.location.hash == "#zbstop") {
                                console.log('Stop loading Zotabox!');
                                return false;
                            }
                            if (navigator.userAgent.match(/Opera Mini/i)) {
                                console.log('Zotabox do not support on Opera Mini Browser!');
                                return false;
                            }
                            if (this.status !== 'ok') return false;
                            return true;
                        },
                        process: function() {
                            if (!this.isOK()) return false;
                            if (window.location.hash == "#zbrefresh") {
                                ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                this.refreshCookies(false);
                                this.refreshSessionStorage(false);
                            }
                            var _super = this;
                            if (window.location.hash == "#zbrc") {
                                var timeinterval = setInterval(function() {
                                    if (window.Zotabox && window.__ZBDT__) {
                                        clearInterval(timeinterval);
                                        ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                        _super.refreshCookies(false);
                                        _super.refreshSessionStorage(false);
                                        _super.refreshCache();
                                    }
                                }, 500);
                            }
                            window.addEventListener('hashchange', function zbxEventHandler() {
                                if (window.location.hash == "#zbrefresh") {
                                    ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                    _super.refreshCookies(true);
                                    _super.refreshSessionStorage(true);
                                }
                                if (window.location.hash == "#zbrc") {
                                    ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                    _super.refreshCookies(false);
                                    _super.refreshSessionStorage(false);
                                    _super.refreshCache();
                                }
                            }, false);
                            var time_stamp = ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_');
                            if (time_stamp != false && Date.now() - time_stamp > 3600000) {
                                time_stamp = false;
                                ZB_STORAGE.deleteSessionStorage('_ZB_ADMIN_TIME_STAMP_');
                            } else {
                                var last_url = ZB_STORAGE.sessionStorage('_ZB_ADMIN_LAST_URL_');
                                if (last_url == window.location.href && this.time_stamp == null) {
                                    time_stamp = Date.now();
                                    ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', time_stamp);
                                }
                            }
                            if (time_stamp == false && window.CloudFlare && document.querySelector('script[type="text/rocketscript"]')) {
                                time_stamp = Date.now();
                                ZB_STORAGE.sessionStorage('_ZB_ADMIN_TIME_STAMP_', time_stamp);
                            }
                            if (time_stamp != false && this.time_stamp != time_stamp) {
                                this.status = 'refreshing';
                                this.time_stamp = time_stamp;
                                var script_name = typeof zb_script_name != "undefined" ? zb_script_name : "widgets.js";
                                (function(d, s, id) {
                                    var z = d.createElement(s);
                                    z.type = "text/javascript";
                                    z.id = id;
                                    z.onload = function() {
                                        window.zb_admin.status = 'ok';
                                        window.Zotabox_Init();
                                    };
                                    z.setAttribute('data-cfasync', false);
                                    z.src = bootstrap.root + "/" + script_name + "?" + time_stamp;
                                    var sz = d.getElementsByTagName(s)[0];
                                    sz.parentNode.insertBefore(z, sz)
                                }(document, "script", "zb-embed-code"));
                                return false;
                            }
                            ZB_STORAGE.sessionStorage('_ZB_ADMIN_LAST_URL_', window.location.href);
                            return true;
                        },
                        onHashChange: function() {
                            var _super = this;
                            Zotabox.addEvent('hashchange', window, function(e) {
                                if (window.location.hash == "#zbrefresh") {
                                    _super.refreshCookies();
                                    _super.refreshSessionStorage();
                                }
                                if (window.location.hash == "#zbrc") {
                                    _super.refreshCache();
                                }
                            })
                        },
                        refreshCache: function() {
                            if (typeof window.Zotabox == 'undefined') return;
                            var domainSecureId = __ZBDT__.domain.secure_id;
                            var refreshDomainUrl = __ZBDU__.static + "/refresh/" + domainSecureId;
                            var originUrl = window.location.origin + window.location.pathname;
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (xhttp.readyState == 4 && xhttp.status == 200) {
                                    location.reload(true);
                                }
                            };
                            xhttp.open("GET", refreshDomainUrl, true);
                            xhttp.send();
                            window.location.hash = 'ok';
                        },
                        refreshCookies: function(reload) {
                            var pairs = document.cookie.split(";");
                            for (var i = 0; i < pairs.length; i++) {
                                var pair = pairs[i].split("=");
                                var cookieName = pair[0];
                                if (cookieName.indexOf(this.attrPre) >= 0) {
                                    this.deleteCookie(cookieName);
                                }
                            }
                            window.location.hash = 'ok';
                            if (reload) location.reload(true);
                        },
                        refreshSessionStorage: function(reload) {
                            var pairs = Object.keys(sessionStorage);
                            for (var i = 0; i < pairs.length; i++) {
                                var sessionName = pairs[i];
                                if (sessionName.indexOf(this.attrPre) >= 0) {
                                    ZB_STORAGE.deleteSessionStorage(sessionName);
                                }
                            }
                            window.location.hash = 'ok';
                            if (reload) location.reload(true);
                        },
                        setCookie: function(name, value, days) {
                            if (days) {
                                var date = new Date();
                                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                                var expires = "; expires=" + date.toGMTString();
                            } else
                                var expires = "";
                            document.cookie = name + "=" + value + expires + "; path=/";
                        },
                        getCookie: function(name) {
                            var nameEQ = name + "=";
                            var ca = document.cookie.split(';');
                            for (var i = 0; i < ca.length; i++) {
                                var c = ca[i];
                                while (c.charAt(0) == ' ')
                                    c = c.substring(1, c.length);
                                if (c.indexOf(nameEQ) == 0)
                                    return c.substring(nameEQ.length, c.length);
                            }
                            return null;
                        },
                        deleteCookie: function(name) {
                            this.setCookie(name, "", -1);
                        },
                    };
                    if (typeof window.zb_admin == 'undefined') {
                        window.zb_admin = new Admin();
                    }
                }.call(this));
                window.__ZOTABOX__ = {
                    clickEventExist: false,
                    adWidgetID: null,
                    onReady: function(error, widgets) {
                        var _this = this;
                    },
                    clickEvent: function(event) {
                        var _this = this;
                        if (window.__ZOTABOX__.adWidgetID != null) {
                            var targetElement = event.target || event.srcElement;
                            event.preventDefault();
                            var xmlHttp = new XMLHttpRequest();
                            var _params = "advanced_discount_widget_id=" + window.__ZOTABOX__.adWidgetID + "&zbad=" + encodeURIComponent(JSON.stringify(window.zbad));
                            xmlHttp.onreadystatechange = function() {
                                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                                        var checkout = JSON.parse(xmlHttp.responseText);
                                        if (typeof(checkout) == "string") {
                                            checkout = JSON.parse(checkout);
                                            location.href = checkout.draft_order.invoice_url;
                                        } else if (typeof(checkout) == "object" && checkout.offers == false) {
                                            document.getElementsByTagName("input").checkout.removeEventListener("click", window.__ZOTABOX__.clickEvent);
                                            location.href = "/checkout";
                                        }
                                    }
                            }
                            xmlHttp.timeout = 20000;
                            xmlHttp.open("POST", window.__ZBDU__.actions + "/advanceddiscount/createcheckout", true);
                            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xmlHttp.send(_params);
                        }
                    }
                };
            }.call(this));
            if (true && true && !zb_admin.process()) return false;
            var require, define;
            var _isInitialized = false;
            var __userConfig = window.__ZOTABOX__ || {};
            var proto = (function() {
                var requirejs = {
                    skipDataMain: true
                }
                var requirejs, require, define;
                (function(global) {
                    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = '2.1.16',
                        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
                        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
                        jsSuffixRegExp = /\.js$/,
                        currDirRegExp = /^\.\//,
                        op = Object.prototype,
                        ostring = op.toString,
                        hasOwn = op.hasOwnProperty,
                        ap = Array.prototype,
                        apsp = ap.splice,
                        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
                        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
                        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/,
                        defContextName = '_',
                        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
                        contexts = {},
                        cfg = {},
                        globalDefQueue = [],
                        useInteractive = false;

                    function isFunction(it) {
                        return ostring.call(it) === '[object Function]';
                    }

                    function isArray(it) {
                        return ostring.call(it) === '[object Array]';
                    }

                    function each(ary, func) {
                        if (ary) {
                            var i;
                            for (i = 0; i < ary.length; i += 1) {
                                if (ary[i] && func(ary[i], i, ary)) {
                                    break;
                                }
                            }
                        }
                    }

                    function eachReverse(ary, func) {
                        if (ary) {
                            var i;
                            for (i = ary.length - 1; i > -1; i -= 1) {
                                if (ary[i] && func(ary[i], i, ary)) {
                                    break;
                                }
                            }
                        }
                    }

                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }

                    function getOwn(obj, prop) {
                        return hasProp(obj, prop) && obj[prop];
                    }

                    function eachProp(obj, func) {
                        var prop;
                        for (prop in obj) {
                            if (hasProp(obj, prop)) {
                                if (func(obj[prop], prop)) {
                                    break;
                                }
                            }
                        }
                    }

                    function mixin(target, source, force, deepStringMixin) {
                        if (source) {
                            eachProp(source, function(value, prop) {
                                if (force || !hasProp(target, prop)) {
                                    if (deepStringMixin && typeof value === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                                        if (!target[prop]) {
                                            target[prop] = {};
                                        }
                                        mixin(target[prop], value, force, deepStringMixin);
                                    } else {
                                        target[prop] = value;
                                    }
                                }
                            });
                        }
                        return target;
                    }

                    function bind(obj, fn) {
                        return function() {
                            return fn.apply(obj, arguments);
                        };
                    }

                    function scripts() {
                        return document.getElementsByTagName('script');
                    }

                    function defaultOnError(err) {
                        throw err;
                    }

                    function getGlobal(value) {
                        if (!value) {
                            return value;
                        }
                        var g = global;
                        each(value.split('.'), function(part) {
                            g = g[part];
                        });
                        return g;
                    }

                    function makeError(id, msg, err, requireModules) {
                        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
                        e.requireType = id;
                        e.requireModules = requireModules;
                        if (err) {
                            e.originalError = err;
                        }
                        return e;
                    }
                    if (typeof define !== 'undefined') {
                        return;
                    }
                    if (typeof requirejs !== 'undefined') {
                        if (isFunction(requirejs)) {
                            return;
                        }
                        cfg = requirejs;
                        requirejs = undefined;
                    }
                    if (typeof require !== 'undefined' && !isFunction(require)) {
                        cfg = require;
                        require = undefined;
                    }

                    function newContext(contextName) {
                        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
                                waitSeconds: 7,
                                baseUrl: './',
                                paths: {},
                                bundles: {},
                                pkgs: {},
                                shim: {},
                                config: {}
                            },
                            registry = {},
                            enabledRegistry = {},
                            undefEvents = {},
                            defQueue = [],
                            defined = {},
                            urlFetched = {},
                            bundlesMap = {},
                            requireCounter = 1,
                            unnormalizedCounter = 1;

                        function trimDots(ary) {
                            var i, part;
                            for (i = 0; i < ary.length; i++) {
                                part = ary[i];
                                if (part === '.') {
                                    ary.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {
                                    if (i === 0 || (i == 1 && ary[2] === '..') || ary[i - 1] === '..') {
                                        continue;
                                    } else if (i > 0) {
                                        ary.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }
                        }

                        function normalize(name, baseName, applyMap) {
                            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, normalizedBaseParts, baseParts = (baseName && baseName.split('/')),
                                map = config.map,
                                starMap = map && map['*'];
                            if (name) {
                                name = name.split('/');
                                lastIndex = name.length - 1;
                                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                                }
                                if (name[0].charAt(0) === '.' && baseParts) {
                                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                    name = normalizedBaseParts.concat(name);
                                }
                                trimDots(name);
                                name = name.join('/');
                            }
                            if (applyMap && map && (baseParts || starMap)) {
                                nameParts = name.split('/');
                                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                                    nameSegment = nameParts.slice(0, i).join('/');
                                    if (baseParts) {
                                        for (j = baseParts.length; j > 0; j -= 1) {
                                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));
                                            if (mapValue) {
                                                mapValue = getOwn(mapValue, nameSegment);
                                                if (mapValue) {
                                                    foundMap = mapValue;
                                                    foundI = i;
                                                    break outerLoop;
                                                }
                                            }
                                        }
                                    }
                                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                                        foundStarMap = getOwn(starMap, nameSegment);
                                        starI = i;
                                    }
                                }
                                if (!foundMap && foundStarMap) {
                                    foundMap = foundStarMap;
                                    foundI = starI;
                                }
                                if (foundMap) {
                                    nameParts.splice(0, foundI, foundMap);
                                    name = nameParts.join('/');
                                }
                            }
                            pkgMain = getOwn(config.pkgs, name);
                            return pkgMain ? pkgMain : name;
                        }

                        function removeScript(name) {
                            if (isBrowser) {
                                each(scripts(), function(scriptNode) {
                                    if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                                        scriptNode.parentNode.removeChild(scriptNode);
                                        return true;
                                    }
                                });
                            }
                        }

                        function hasPathFallback(id) {
                            var pathConfig = getOwn(config.paths, id);
                            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                                pathConfig.shift();
                                context.require.undef(id);
                                context.makeRequire(null, {
                                    skipMap: true
                                })([id]);
                                return true;
                            }
                        }

                        function splitPrefix(name) {
                            var prefix, index = name ? name.indexOf('!') : -1;
                            if (index > -1) {
                                prefix = name.substring(0, index);
                                name = name.substring(index + 1, name.length);
                            }
                            return [prefix, name];
                        }

                        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
                            var url, pluginModule, suffix, nameParts, prefix = null,
                                parentName = parentModuleMap ? parentModuleMap.name : null,
                                originalName = name,
                                isDefine = true,
                                normalizedName = '';
                            if (!name) {
                                isDefine = false;
                                name = '_@r' + (requireCounter += 1);
                            }
                            nameParts = splitPrefix(name);
                            prefix = nameParts[0];
                            name = nameParts[1];
                            if (prefix) {
                                prefix = normalize(prefix, parentName, applyMap);
                                pluginModule = getOwn(defined, prefix);
                            }
                            if (name) {
                                if (prefix) {
                                    if (pluginModule && pluginModule.normalize) {
                                        normalizedName = pluginModule.normalize(name, function(name) {
                                            return normalize(name, parentName, applyMap);
                                        });
                                    } else {
                                        normalizedName = name.indexOf('!') === -1 ? normalize(name, parentName, applyMap) : name;
                                    }
                                } else {
                                    normalizedName = normalize(name, parentName, applyMap);
                                    nameParts = splitPrefix(normalizedName);
                                    prefix = nameParts[0];
                                    normalizedName = nameParts[1];
                                    isNormalized = true;
                                    url = context.nameToUrl(normalizedName);
                                }
                            }
                            suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';
                            return {
                                prefix: prefix,
                                name: normalizedName,
                                parentMap: parentModuleMap,
                                unnormalized: !!suffix,
                                url: url,
                                originalName: originalName,
                                isDefine: isDefine,
                                id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
                            };
                        }

                        function getModule(depMap) {
                            var id = depMap.id,
                                mod = getOwn(registry, id);
                            if (!mod) {
                                mod = registry[id] = new context.Module(depMap);
                            }
                            return mod;
                        }

                        function on(depMap, name, fn) {
                            var id = depMap.id,
                                mod = getOwn(registry, id);
                            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                                if (name === 'defined') {
                                    fn(defined[id]);
                                }
                            } else {
                                mod = getModule(depMap);
                                if (mod.error && name === 'error') {
                                    fn(mod.error);
                                } else {
                                    mod.on(name, fn);
                                }
                            }
                        }

                        function onError(err, errback) {
                            var ids = err.requireModules,
                                notified = false;
                            if (errback) {
                                errback(err);
                            } else {
                                each(ids, function(id) {
                                    var mod = getOwn(registry, id);
                                    if (mod) {
                                        mod.error = err;
                                        if (mod.events.error) {
                                            notified = true;
                                            mod.emit('error', err);
                                        }
                                    }
                                });
                                if (!notified) {
                                    req.onError(err);
                                }
                            }
                        }

                        function takeGlobalQueue() {
                            if (globalDefQueue.length) {
                                apsp.apply(defQueue, [defQueue.length, 0].concat(globalDefQueue));
                                globalDefQueue = [];
                            }
                        }
                        handlers = {
                            'require': function(mod) {
                                if (mod.require) {
                                    return mod.require;
                                } else {
                                    return (mod.require = context.makeRequire(mod.map));
                                }
                            },
                            'exports': function(mod) {
                                mod.usingExports = true;
                                if (mod.map.isDefine) {
                                    if (mod.exports) {
                                        return (defined[mod.map.id] = mod.exports);
                                    } else {
                                        return (mod.exports = defined[mod.map.id] = {});
                                    }
                                }
                            },
                            'module': function(mod) {
                                if (mod.module) {
                                    return mod.module;
                                } else {
                                    return (mod.module = {
                                        id: mod.map.id,
                                        uri: mod.map.url,
                                        config: function() {
                                            return getOwn(config.config, mod.map.id) || {};
                                        },
                                        exports: mod.exports || (mod.exports = {})
                                    });
                                }
                            }
                        };

                        function cleanRegistry(id) {
                            delete registry[id];
                            delete enabledRegistry[id];
                        }

                        function breakCycle(mod, traced, processed) {
                            var id = mod.map.id;
                            if (mod.error) {
                                mod.emit('error', mod.error);
                            } else {
                                traced[id] = true;
                                each(mod.depMaps, function(depMap, i) {
                                    var depId = depMap.id,
                                        dep = getOwn(registry, depId);
                                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                                        if (getOwn(traced, depId)) {
                                            mod.defineDep(i, defined[depId]);
                                            mod.check();
                                        } else {
                                            breakCycle(dep, traced, processed);
                                        }
                                    }
                                });
                                processed[id] = true;
                            }
                        }

                        function checkLoaded() {
                            var err, usingPathFallback, waitInterval = config.waitSeconds * 1000,
                                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                                noLoads = [],
                                reqCalls = [],
                                stillLoading = false,
                                needCycleCheck = true;
                            if (inCheckLoaded) {
                                return;
                            }
                            inCheckLoaded = true;
                            eachProp(enabledRegistry, function(mod) {
                                var map = mod.map,
                                    modId = map.id;
                                if (!mod.enabled) {
                                    return;
                                }
                                if (!map.isDefine) {
                                    reqCalls.push(mod);
                                }
                                if (!mod.error) {
                                    if (!mod.inited && expired) {
                                        if (hasPathFallback(modId)) {
                                            usingPathFallback = true;
                                            stillLoading = true;
                                        } else {
                                            noLoads.push(modId);
                                            removeScript(modId);
                                        }
                                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                                        stillLoading = true;
                                        if (!map.prefix) {
                                            return (needCycleCheck = false);
                                        }
                                    }
                                }
                            });
                            if (expired && noLoads.length) {
                                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                                err.contextName = context.contextName;
                                return onError(err);
                            }
                            if (needCycleCheck) {
                                each(reqCalls, function(mod) {
                                    breakCycle(mod, {}, {});
                                });
                            }
                            if ((!expired || usingPathFallback) && stillLoading) {
                                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                                    checkLoadedTimeoutId = setTimeout(function() {
                                        checkLoadedTimeoutId = 0;
                                        checkLoaded();
                                    }, 50);
                                }
                            }
                            inCheckLoaded = false;
                        }
                        Module = function(map) {
                            this.events = getOwn(undefEvents, map.id) || {};
                            this.map = map;
                            this.shim = getOwn(config.shim, map.id);
                            this.depExports = [];
                            this.depMaps = [];
                            this.depMatched = [];
                            this.pluginMaps = {};
                            this.depCount = 0;
                        };
                        Module.prototype = {
                            init: function(depMaps, factory, errback, options) {
                                options = options || {};
                                if (this.inited) {
                                    return;
                                }
                                this.factory = factory;
                                if (errback) {
                                    this.on('error', errback);
                                } else if (this.events.error) {
                                    errback = bind(this, function(err) {
                                        this.emit('error', err);
                                    });
                                }
                                this.depMaps = depMaps && depMaps.slice(0);
                                this.errback = errback;
                                this.inited = true;
                                this.ignore = options.ignore;
                                if (options.enabled || this.enabled) {
                                    this.enable();
                                } else {
                                    this.check();
                                }
                            },
                            defineDep: function(i, depExports) {
                                if (!this.depMatched[i]) {
                                    this.depMatched[i] = true;
                                    this.depCount -= 1;
                                    this.depExports[i] = depExports;
                                }
                            },
                            fetch: function() {
                                if (this.fetched) {
                                    return;
                                }
                                this.fetched = true;
                                context.startTime = (new Date()).getTime();
                                var map = this.map;
                                if (this.shim) {
                                    context.makeRequire(this.map, {
                                        enableBuildCallback: true
                                    })(this.shim.deps || [], bind(this, function() {
                                        return map.prefix ? this.callPlugin() : this.load();
                                    }));
                                } else {
                                    return map.prefix ? this.callPlugin() : this.load();
                                }
                            },
                            load: function() {
                                var url = this.map.url;
                                if (!urlFetched[url]) {
                                    urlFetched[url] = true;
                                    context.load(this.map.id, url);
                                }
                            },
                            check: function() {
                                if (!this.enabled || this.enabling) {
                                    return;
                                }
                                var err, cjsModule, id = this.map.id,
                                    depExports = this.depExports,
                                    exports = this.exports,
                                    factory = this.factory;
                                if (!this.inited) {
                                    this.fetch();
                                } else if (this.error) {
                                    this.emit('error', this.error);
                                } else if (!this.defining) {
                                    this.defining = true;
                                    if (this.depCount < 1 && !this.defined) {
                                        if (isFunction(factory)) {
                                            if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError) {
                                                try {
                                                    exports = context.execCb(id, factory, depExports, exports);
                                                } catch (e) {
                                                    err = e;
                                                }
                                            } else {
                                                exports = context.execCb(id, factory, depExports, exports);
                                            }
                                            if (this.map.isDefine && exports === undefined) {
                                                cjsModule = this.module;
                                                if (cjsModule) {
                                                    exports = cjsModule.exports;
                                                } else if (this.usingExports) {
                                                    exports = this.exports;
                                                }
                                            }
                                            if (err) {
                                                err.requireMap = this.map;
                                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                                return onError((this.error = err));
                                            }
                                        } else {
                                            exports = factory;
                                        }
                                        this.exports = exports;
                                        if (this.map.isDefine && !this.ignore) {
                                            defined[id] = exports;
                                            if (req.onResourceLoad) {
                                                req.onResourceLoad(context, this.map, this.depMaps);
                                            }
                                        }
                                        cleanRegistry(id);
                                        this.defined = true;
                                    }
                                    this.defining = false;
                                    if (this.defined && !this.defineEmitted) {
                                        this.defineEmitted = true;
                                        this.emit('defined', this.exports);
                                        this.defineEmitComplete = true;
                                    }
                                }
                            },
                            callPlugin: function() {
                                var map = this.map,
                                    id = map.id,
                                    pluginMap = makeModuleMap(map.prefix);
                                this.depMaps.push(pluginMap);
                                on(pluginMap, 'defined', bind(this, function(plugin) {
                                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id),
                                        name = this.map.name,
                                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                                        localRequire = context.makeRequire(map.parentMap, {
                                            enableBuildCallback: true
                                        });
                                    if (this.map.unnormalized) {
                                        if (plugin.normalize) {
                                            name = plugin.normalize(name, function(name) {
                                                return normalize(name, parentName, true);
                                            }) || '';
                                        }
                                        normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap);
                                        on(normalizedMap, 'defined', bind(this, function(value) {
                                            this.init([], function() {
                                                return value;
                                            }, null, {
                                                enabled: true,
                                                ignore: true
                                            });
                                        }));
                                        normalizedMod = getOwn(registry, normalizedMap.id);
                                        if (normalizedMod) {
                                            this.depMaps.push(normalizedMap);
                                            if (this.events.error) {
                                                normalizedMod.on('error', bind(this, function(err) {
                                                    this.emit('error', err);
                                                }));
                                            }
                                            normalizedMod.enable();
                                        }
                                        return;
                                    }
                                    if (bundleId) {
                                        this.map.url = context.nameToUrl(bundleId);
                                        this.load();
                                        return;
                                    }
                                    load = bind(this, function(value) {
                                        this.init([], function() {
                                            return value;
                                        }, null, {
                                            enabled: true
                                        });
                                    });
                                    load.error = bind(this, function(err) {
                                        this.inited = true;
                                        this.error = err;
                                        err.requireModules = [id];
                                        eachProp(registry, function(mod) {
                                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                                cleanRegistry(mod.map.id);
                                            }
                                        });
                                        onError(err);
                                    });
                                    load.fromText = bind(this, function(text, textAlt) {
                                        var moduleName = map.name,
                                            moduleMap = makeModuleMap(moduleName),
                                            hasInteractive = useInteractive;
                                        if (textAlt) {
                                            text = textAlt;
                                        }
                                        if (hasInteractive) {
                                            useInteractive = false;
                                        }
                                        getModule(moduleMap);
                                        if (hasProp(config.config, id)) {
                                            config.config[moduleName] = config.config[id];
                                        }
                                        try {
                                            req.exec(text);
                                        } catch (e) {
                                            return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
                                        }
                                        if (hasInteractive) {
                                            useInteractive = true;
                                        }
                                        this.depMaps.push(moduleMap);
                                        context.completeLoad(moduleName);
                                        localRequire([moduleName], load);
                                    });
                                    plugin.load(map.name, localRequire, load, config);
                                }));
                                context.enable(pluginMap, this);
                                this.pluginMaps[pluginMap.id] = pluginMap;
                            },
                            enable: function() {
                                enabledRegistry[this.map.id] = this;
                                this.enabled = true;
                                this.enabling = true;
                                each(this.depMaps, bind(this, function(depMap, i) {
                                    var id, mod, handler;
                                    if (typeof depMap === 'string') {
                                        depMap = makeModuleMap(depMap, (this.map.isDefine ? this.map : this.map.parentMap), false, !this.skipMap);
                                        this.depMaps[i] = depMap;
                                        handler = getOwn(handlers, depMap.id);
                                        if (handler) {
                                            this.depExports[i] = handler(this);
                                            return;
                                        }
                                        this.depCount += 1;
                                        on(depMap, 'defined', bind(this, function(depExports) {
                                            this.defineDep(i, depExports);
                                            this.check();
                                        }));
                                        if (this.errback) {
                                            on(depMap, 'error', bind(this, this.errback));
                                        } else if (this.events.error) {
                                            on(depMap, 'error', bind(this, function(err) {
                                                this.emit('error', err);
                                            }));
                                        }
                                    }
                                    id = depMap.id;
                                    mod = registry[id];
                                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                                        context.enable(depMap, this);
                                    }
                                }));
                                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                                    var mod = getOwn(registry, pluginMap.id);
                                    if (mod && !mod.enabled) {
                                        context.enable(pluginMap, this);
                                    }
                                }));
                                this.enabling = false;
                                this.check();
                            },
                            on: function(name, cb) {
                                var cbs = this.events[name];
                                if (!cbs) {
                                    cbs = this.events[name] = [];
                                }
                                cbs.push(cb);
                            },
                            emit: function(name, evt) {
                                each(this.events[name], function(cb) {
                                    cb(evt);
                                });
                                if (name === 'error') {
                                    delete this.events[name];
                                }
                            }
                        };

                        function callGetModule(args) {
                            if (!hasProp(defined, args[0])) {
                                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
                            }
                        }

                        function removeListener(node, func, name, ieName) {
                            if (node.detachEvent && !isOpera) {
                                if (ieName) {
                                    node.detachEvent(ieName, func);
                                }
                            } else {
                                node.removeEventListener(name, func, false);
                            }
                        }

                        function getScriptData(evt) {
                            var node = evt.currentTarget || evt.srcElement;
                            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
                            removeListener(node, context.onScriptError, 'error');
                            return {
                                node: node,
                                id: node && node.getAttribute('data-requiremodule')
                            };
                        }

                        function intakeDefines() {
                            var args;
                            takeGlobalQueue();
                            while (defQueue.length) {
                                args = defQueue.shift();
                                if (args[0] === null) {
                                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                                } else {
                                    callGetModule(args);
                                }
                            }
                        }
                        context = {
                            config: config,
                            contextName: contextName,
                            registry: registry,
                            defined: defined,
                            urlFetched: urlFetched,
                            defQueue: defQueue,
                            Module: Module,
                            makeModuleMap: makeModuleMap,
                            nextTick: req.nextTick,
                            onError: onError,
                            configure: function(cfg) {
                                if (cfg.baseUrl) {
                                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                                        cfg.baseUrl += '/';
                                    }
                                }
                                var shim = config.shim,
                                    objs = {
                                        paths: true,
                                        bundles: true,
                                        config: true,
                                        map: true
                                    };
                                eachProp(cfg, function(value, prop) {
                                    if (objs[prop]) {
                                        if (!config[prop]) {
                                            config[prop] = {};
                                        }
                                        mixin(config[prop], value, true, true);
                                    } else {
                                        config[prop] = value;
                                    }
                                });
                                if (cfg.bundles) {
                                    eachProp(cfg.bundles, function(value, prop) {
                                        each(value, function(v) {
                                            if (v !== prop) {
                                                bundlesMap[v] = prop;
                                            }
                                        });
                                    });
                                }
                                if (cfg.shim) {
                                    eachProp(cfg.shim, function(value, id) {
                                        if (isArray(value)) {
                                            value = {
                                                deps: value
                                            };
                                        }
                                        if ((value.exports || value.init) && !value.exportsFn) {
                                            value.exportsFn = context.makeShimExports(value);
                                        }
                                        shim[id] = value;
                                    });
                                    config.shim = shim;
                                }
                                if (cfg.packages) {
                                    each(cfg.packages, function(pkgObj) {
                                        var location, name;
                                        pkgObj = typeof pkgObj === 'string' ? {
                                            name: pkgObj
                                        } : pkgObj;
                                        name = pkgObj.name;
                                        location = pkgObj.location;
                                        if (location) {
                                            config.paths[name] = pkgObj.location;
                                        }
                                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '');
                                    });
                                }
                                eachProp(registry, function(mod, id) {
                                    if (!mod.inited && !mod.map.unnormalized) {
                                        mod.map = makeModuleMap(id);
                                    }
                                });
                                if (cfg.deps || cfg.callback) {
                                    context.require(cfg.deps || [], cfg.callback);
                                }
                            },
                            makeShimExports: function(value) {
                                function fn() {
                                    var ret;
                                    if (value.init) {
                                        ret = value.init.apply(global, arguments);
                                    }
                                    return ret || (value.exports && getGlobal(value.exports));
                                }
                                return fn;
                            },
                            makeRequire: function(relMap, options) {
                                options = options || {};

                                function localRequire(deps, callback, errback) {
                                    var id, map, requireMod;
                                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                                        callback.__requireJsBuild = true;
                                    }
                                    if (typeof deps === 'string') {
                                        if (isFunction(callback)) {
                                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                                        }
                                        if (relMap && hasProp(handlers, deps)) {
                                            return handlers[deps](registry[relMap.id]);
                                        }
                                        if (req.get) {
                                            return req.get(context, deps, relMap, localRequire);
                                        }
                                        map = makeModuleMap(deps, relMap, false, true);
                                        id = map.id;
                                        if (!hasProp(defined, id)) {
                                            return onError(makeError('notloaded', 'Module name "' +
                                                id + '" has not been loaded yet for context: ' +
                                                contextName +
                                                (relMap ? '' : '. Use require([])')));
                                        }
                                        return defined[id];
                                    }
                                    intakeDefines();
                                    context.nextTick(function() {
                                        intakeDefines();
                                        requireMod = getModule(makeModuleMap(null, relMap));
                                        requireMod.skipMap = options.skipMap;
                                        requireMod.init(deps, callback, errback, {
                                            enabled: true
                                        });
                                        checkLoaded();
                                    });
                                    return localRequire;
                                }
                                mixin(localRequire, {
                                    isBrowser: isBrowser,
                                    toUrl: function(moduleNamePlusExt) {
                                        var ext, index = moduleNamePlusExt.lastIndexOf('.'),
                                            segment = moduleNamePlusExt.split('/')[0],
                                            isRelative = segment === '.' || segment === '..';
                                        if (index !== -1 && (!isRelative || index > 1)) {
                                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                                        }
                                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                                    },
                                    defined: function(id) {
                                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                                    },
                                    specified: function(id) {
                                        id = makeModuleMap(id, relMap, false, true).id;
                                        return hasProp(defined, id) || hasProp(registry, id);
                                    }
                                });
                                if (!relMap) {
                                    localRequire.undef = function(id) {
                                        takeGlobalQueue();
                                        var map = makeModuleMap(id, relMap, true),
                                            mod = getOwn(registry, id);
                                        removeScript(id);
                                        delete defined[id];
                                        delete urlFetched[map.url];
                                        delete undefEvents[id];
                                        eachReverse(defQueue, function(args, i) {
                                            if (args[0] === id) {
                                                defQueue.splice(i, 1);
                                            }
                                        });
                                        if (mod) {
                                            if (mod.events.defined) {
                                                undefEvents[id] = mod.events;
                                            }
                                            cleanRegistry(id);
                                        }
                                    };
                                }
                                return localRequire;
                            },
                            enable: function(depMap) {
                                var mod = getOwn(registry, depMap.id);
                                if (mod) {
                                    getModule(depMap).enable();
                                }
                            },
                            completeLoad: function(moduleName) {
                                var found, args, mod, shim = getOwn(config.shim, moduleName) || {},
                                    shExports = shim.exports;
                                takeGlobalQueue();
                                while (defQueue.length) {
                                    args = defQueue.shift();
                                    if (args[0] === null) {
                                        args[0] = moduleName;
                                        if (found) {
                                            break;
                                        }
                                        found = true;
                                    } else if (args[0] === moduleName) {
                                        found = true;
                                    }
                                    callGetModule(args);
                                }
                                mod = getOwn(registry, moduleName);
                                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                                        if (hasPathFallback(moduleName)) {
                                            return;
                                        } else {
                                            return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
                                        }
                                    } else {
                                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                                    }
                                }
                                checkLoaded();
                            },
                            nameToUrl: function(moduleName, ext, skipExt) {
                                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                                if (pkgMain) {
                                    moduleName = pkgMain;
                                }
                                bundleId = getOwn(bundlesMap, moduleName);
                                if (bundleId) {
                                    return context.nameToUrl(bundleId, ext, skipExt);
                                }
                                if (req.jsExtRegExp.test(moduleName)) {
                                    url = moduleName + (ext || '');
                                } else {
                                    paths = config.paths;
                                    syms = moduleName.split('/');
                                    for (i = syms.length; i > 0; i -= 1) {
                                        parentModule = syms.slice(0, i).join('/');
                                        parentPath = getOwn(paths, parentModule);
                                        if (parentPath) {
                                            if (isArray(parentPath)) {
                                                parentPath = parentPath[0];
                                            }
                                            syms.splice(0, i, parentPath);
                                            break;
                                        }
                                    }
                                    url = syms.join('/');
                                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                                }
                                return config.urlArgs ? url +
                                    ((url.indexOf('?') === -1 ? '?' : '&') +
                                        config.urlArgs) : url;
                            },
                            load: function(id, url) {
                                req.load(context, id, url);
                            },
                            execCb: function(name, callback, args, exports) {
                                return callback.apply(exports, args);
                            },
                            onScriptLoad: function(evt) {
                                if (evt.type === 'load' || (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                                    interactiveScript = null;
                                    var data = getScriptData(evt);
                                    context.completeLoad(data.id);
                                }
                            },
                            onScriptError: function(evt) {
                                var data = getScriptData(evt);
                                if (!hasPathFallback(data.id)) {
                                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                                }
                            }
                        };
                        context.require = context.makeRequire();
                        return context;
                    }
                    req = requirejs = function(deps, callback, errback, optional) {
                        var context, config, contextName = defContextName;
                        if (!isArray(deps) && typeof deps !== 'string') {
                            config = deps;
                            if (isArray(callback)) {
                                deps = callback;
                                callback = errback;
                                errback = optional;
                            } else {
                                deps = [];
                            }
                        }
                        if (config && config.context) {
                            contextName = config.context;
                        }
                        context = getOwn(contexts, contextName);
                        if (!context) {
                            context = contexts[contextName] = req.s.newContext(contextName);
                        }
                        if (config) {
                            context.configure(config);
                        }
                        return context.require(deps, callback, errback);
                    };
                    req.config = function(config) {
                        return req(config);
                    };
                    req.nextTick = typeof setTimeout !== 'undefined' ? function(fn) {
                        setTimeout(fn, 4);
                    } : function(fn) {
                        fn();
                    };
                    if (!require) {
                        require = req;
                    }
                    req.version = version;
                    req.jsExtRegExp = /^\/|:|\?|\.js$/;
                    req.isBrowser = isBrowser;
                    s = req.s = {
                        contexts: contexts,
                        newContext: newContext
                    };
                    req({});
                    each(['toUrl', 'undef', 'defined', 'specified'], function(prop) {
                        req[prop] = function() {
                            var ctx = contexts[defContextName];
                            return ctx.require[prop].apply(ctx, arguments);
                        };
                    });
                    if (isBrowser) {
                        head = s.head = document.getElementsByTagName('head')[0];
                        baseElement = document.getElementsByTagName('base')[0];
                        if (baseElement) {
                            head = s.head = baseElement.parentNode;
                        }
                    }
                    req.onError = defaultOnError;
                    req.createNode = function(config, moduleName, url) {
                        var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
                        node.type = config.scriptType || 'text/javascript';
                        node.charset = 'utf-8';
                        node.async = true;
                        return node;
                    };
                    req.load = function(context, moduleName, url) {
                        var config = (context && context.config) || {},
                            node;
                        if (isBrowser) {
                            node = req.createNode(config, moduleName, url);
                            node.setAttribute('data-requirecontext', context.contextName);
                            node.setAttribute('data-requiremodule', moduleName);
                            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
                                useInteractive = true;
                                node.attachEvent('onreadystatechange', context.onScriptLoad);
                            } else {
                                node.addEventListener('load', context.onScriptLoad, false);
                                node.addEventListener('error', context.onScriptError, false);
                            }
                            node.src = url;
                            currentlyAddingScript = node;
                            if (baseElement) {
                                head.insertBefore(node, baseElement);
                            } else {
                                head.appendChild(node);
                            }
                            currentlyAddingScript = null;
                            return node;
                        } else if (isWebWorker) {
                            try {
                                importScripts(url);
                                context.completeLoad(moduleName);
                            } catch (e) {
                                context.onError(makeError('importscripts', 'importScripts failed for ' +
                                    moduleName + ' at ' + url, e, [moduleName]));
                            }
                        }
                    };

                    function getInteractiveScript() {
                        if (interactiveScript && interactiveScript.readyState === 'interactive') {
                            return interactiveScript;
                        }
                        eachReverse(scripts(), function(script) {
                            if (script.readyState === 'interactive') {
                                return (interactiveScript = script);
                            }
                        });
                        return interactiveScript;
                    }
                    if (isBrowser && !cfg.skipDataMain) {
                        eachReverse(scripts(), function(script) {
                            if (!head) {
                                head = script.parentNode;
                            }
                            dataMain = script.getAttribute('data-main');
                            if (dataMain) {
                                mainScript = dataMain;
                                if (!cfg.baseUrl) {
                                    src = mainScript.split('/');
                                    mainScript = src.pop();
                                    subPath = src.length ? src.join('/') + '/' : './';
                                    cfg.baseUrl = subPath;
                                }
                                mainScript = mainScript.replace(jsSuffixRegExp, '');
                                if (req.jsExtRegExp.test(mainScript)) {
                                    mainScript = dataMain;
                                }
                                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
                                return true;
                            }
                        });
                    }
                    define = function(name, deps, callback) {
                        var node, context;
                        if (typeof name !== 'string') {
                            callback = deps;
                            deps = name;
                            name = null;
                        }
                        if (!isArray(deps)) {
                            callback = deps;
                            deps = null;
                        }
                        if (!deps && isFunction(callback)) {
                            deps = [];
                            if (callback.length) {
                                callback.toString().replace(commentRegExp, '').replace(cjsRequireRegExp, function(match, dep) {
                                    deps.push(dep);
                                });
                                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
                            }
                        }
                        if (useInteractive) {
                            node = currentlyAddingScript || getInteractiveScript();
                            if (node) {
                                if (!name) {
                                    name = node.getAttribute('data-requiremodule');
                                }
                                context = contexts[node.getAttribute('data-requirecontext')];
                            }
                        }
                        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
                    };
                    define.amd = {
                        jQuery: true
                    };
                    req.exec = function(text) {
                        return eval(text);
                    };
                    req(cfg);
                }(this));
                return {
                    require: require.config({
                        waitSeconds: 3000,
                        baseUrl: bootstrap.staticURL,
                        context: this.Zotabox
                    }),
                    define: define
                }
            }.call(this));
            var Zotabox = function() {
                this.initialize();
                return this;
            }
            Zotabox.prototype.ZB_STORAGE = ZB_STORAGE;
            Zotabox.prototype.require = require = proto.require;
            Zotabox.prototype.define = define = proto.define;
            Zotabox.prototype.Widgets = {};
            Zotabox.prototype.Cookies = {};
            Zotabox.prototype.Stats = {};
            Zotabox.prototype.Captcha = {};
            Zotabox.prototype.onInitialized = function() {};
            Zotabox.prototype.isInitialized = function() {
                return _isInitialized;
            };
            Zotabox.prototype.initialize = function() {
                var _super = this;
                var urls = [bootstrap.bundleURL, (!_super.isPreview() ? (bootstrap.dataURL) : null)].concat(bootstrap.widgetURLs);

                function getCookie(cname) {
                    var name = cname + "=";
                    var decodedCookie = decodeURIComponent(document.cookie);
                    var ca = decodedCookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                }
                var hash = window.location.hash;
                var patt = new RegExp("#zotabox$|#zotabox\/$|#\/zotabox$|#\/zotabox\/$|#zotabox-demo$|#zotabox-demo\/$|#\/zotabox-demo$|#\/zotabox-demo\/$|#zotabox-embed-check$|#zotabox-embed-check\/$");
                window.onhashchange = function() {
                    if (patt.test(location.hash)) {
                        location.reload();
                    }
                }
                if (getCookie("zb-demo") == 1 || getCookie("zb-settings") == 1 || patt.test(hash) || bootstrap.data.embedWidgets.length != 0) {
                    require([bootstrap.staticURL + "/embed_widgets/bootstrap.js?" + 'cqxnjiy'], function() {
                        ZotaboxEmbedWidget.init(bootstrap);
                    })
                }
                require(urls, function(bundleScript, rawData) {
                    return bundleScript(rawData, bootstrap, function(initialize, data) {
                        return require(['Location', 'Stats', 'Captcha', 'Depd.MobileButton', 'GetSocialEmailDialog'], function(Location, Stats, Captcha, MobileButton, GetSocialEmailDialog) {
                            var captchaOptions = {
                                disable: true
                            };
                            var captchaVersion;
                            if (_super.getData().domain.use_captcha == 1) {
                                captchaOptions = {
                                    sitekey: _super.getConfig().gCaptchaSiteKeyV2,
                                    size: "normal"
                                }
                                captchaVersion = 2;
                            }
                            if (_super.getData().domain.use_captcha == 2) {
                                captchaOptions = {
                                    sitekey: _super.getConfig().gCaptchaSiteKeyV3,
                                }
                                captchaVersion = 3
                            }
                            _super.Captcha = new Captcha("Zotabox-Captcha", captchaVersion, captchaOptions);
                            _super.GetSocialEmailDialog = new GetSocialEmailDialog();
                            var statUri = _super.getDomainURIs().stats + '/api/';
                            var stats = _super.Stats = new Stats(_super.getData().customer.id, _super.getData().domain.id, statUri, _super.isPreview(), undefined, _super.getDomainURIs().statsVersion);
                            stats.addVisitor();
                            window.__ZBMBT__ = new MobileButton();
                            window.__ZBLOC__ = new Location();
                            return initialize(function() {
                                const bodyTag = document.getElementsByTagName("BODY")[0];
                                bodyTag.addEventListener('mousemove', handler, false);

                                function handler(event) {
                                    stats.init()
                                    this.removeEventListener('mousemove', handler, false);
                                }
                                return (_isInitialized = true) & _super.onInitialized();
                            });
                        }, console.error);
                    });
                }, console.error);
                (function(history) {
                    var pushState = history.pushState;
                    history.pushState = function(state) {
                        pushState.apply(history, arguments);
                        if (window.Muse) {
                            window.require(['jquery'], function(jQuery) {
                                if (jQuery('.breakpoint.active').length == 0) {
                                    jQuery('.breakpoint').registerBreakpoint();
                                }
                            });
                        }
                        if (typeof __ZBX_INSTALL__ == "function") {
                            __ZBX_INSTALL__(true);
                        }
                    }
                })(window.history);
                if (window.Ecwid) {
                    window.__ZB_COUNT_CHECK_EMBED = 0;
                    var actionLoadEcwid = function() {
                        window.Ecwid.OnPageLoaded.add(function(page) {
                            if (typeof __ZBX_INSTALL__ == "function") {
                                __ZBX_INSTALL__(true);
                            }
                        });
                    }
                    if (typeof window.Ecwid.OnPageLoaded != 'undefined') {
                        actionLoadEcwid();
                    } else {
                        var countInterval = 0;
                        var intervalEcwid = setInterval(function() {
                            if (countInterval >= 30) {
                                clearInterval(intervalEcwid);
                            }
                            if (typeof window.Ecwid.OnPageLoaded != 'undefined') {
                                clearInterval(intervalEcwid);
                                actionLoadEcwid();
                            }
                            countInterval++;
                        }, 500);
                    }
                }
            };
            Zotabox.prototype.getWidgets = function() {
                return window.__ZBWG__ || {};
            };
            Zotabox.prototype.getDomainRules = function() {
                return window.__ZBRL__ || null;
            };
            Zotabox.prototype.getData = function() {
                return window.__ZBDT__ || {};
            };
            Zotabox.prototype.getBaseCSS = function(name) {
                return name ? (window.__ZBCSS__ || {})[name] : window.__ZBCSS__ || {};
            };
            Zotabox.prototype.getStyles = function(name) {
                return name ? (window.__ZBSTY__ || {})[name] : window.__ZBSTY__ || {};
            };
            Zotabox.prototype.getTemplates = function(name) {
                return name ? (window.__ZBTPL__ || {})[name] : (window.__ZBTPL__ || {});
            };
            Zotabox.prototype.getDomainRoot = function() {
                return window.__ZBDR__;
            };
            Zotabox.prototype.getDomainURIs = function(name) {
                return name ? (window.__ZBDU__ || {})[name] : (window.__ZBDU__ || {});
            };
            Zotabox.prototype.getMobileButton = function() {
                return window.__ZBMBT__;
            };
            Zotabox.prototype.getConfig = function() {
                return bootstrap;
            };
            Zotabox.prototype.getWidgetById = function(widgetId) {
                return this._.findWhere(this.getWidgets(), {
                    '_id': parseInt(widgetId),
                    'container': 'default'
                });
            };
            Zotabox.prototype.getShareURL = function() {
                var url = window.location.origin + window.location.pathname;
                if (window.Ecwid) {
                    url = window.location.href;
                }
                if (parent !== window) {
                    url = document.referrer;
                }
                return url;
            }
            Zotabox.prototype.getTotalShare = function(_urlGet) {
                var totalShare = 0;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://clients6.google.com/rpc", false);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        console.log("Google Share: " + xhr.responseText);
                        totalShare += response.result.metadata.globalCounts.count;
                    }
                }
                var googleData = JSON.stringify({
                    "method": "pos.plusones.get",
                    "id": _urlGet,
                    "params": {
                        "nolog": true,
                        "id": _urlGet,
                        "source": "widget",
                        "userId": "@viewer",
                        "groupId": "@self"
                    },
                    "jsonrpc": "2.0",
                    "key": "p",
                    "apiVersion": "v1"
                });
                xhr.send(googleData);
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=" + encodeURIComponent(_urlGet), false);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                        var newString = xhr.responseText;
                        newString = newString.match(new RegExp("{.*}"));
                        var count = JSON.parse(newString[0]).count;
                        console.log("Pinterest Share: " + xhr.responseText);
                        totalShare += count;
                    }
                }
                xhr.send();
                this.Core.jQuery.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    async: false,
                    url: "https://www.linkedin.com/countserv/count/share?url=" + encodeURIComponent(_urlGet),
                    complete: function(response) {
                        console.log("Linkedin Share: ", response);
                        totalShare += response.responseJSON.count;
                    }
                });
                return totalShare;
            }
            Zotabox.prototype.showShareCount = function(url) {
                var totalShare = 0;
                var _urlGet = typeof url != 'undefined' ? url : this.getShareURL();
                var fbUrl = _urlGet.replace("https://", "");
                fbUrl = fbUrl.replace("http://", "");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", window.__ZBDU__.actions + "/sharecount/getfacebooksharecount?url=" + encodeURIComponent(fbUrl), false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        console.log("Facebook Share count: ", xhr.responseText);
                        totalShare += response.engagement.reaction_count + response.engagement.share_count + response.engagement.comment_count;
                    }
                }
                xhr.send();
                totalShare += this.getTotalShare(_urlGet);
                if (window.location.protocol == 'http:') {
                    _urlGet = _urlGet.replace("http://", "https://");
                    totalShare += this.getTotalShare(_urlGet);
                }
                return totalShare;
            };
            Zotabox.prototype.getWidgeDatatById = function(widgetId) {
                return this._.chain(this.getData().widgets).values().findWhere({
                    'id': widgetId
                }).value();
            };
            Zotabox.prototype.show = function(widgetId) {
                if (this.getWidgetById(widgetId)) {
                    this.getWidgetById(widgetId).show();
                    if (typeof this.getWidgetById(widgetId).doShowPopup == 'function') {
                        this.getWidgetById(widgetId).doShowPopup();
                    } else if (typeof this.getWidgetById(widgetId).showChatBox == 'function') {
                        this.getWidgetById(widgetId).showChatBox();
                    }
                    return true;
                } else {
                    return false;
                }
            };
            Zotabox.prototype.hide = function(widgetId) {
                if (this.getWidgetById(widgetId)) {
                    return this.getWidgetById(widgetId).hide();
                } else {
                    return false;
                }
            };
            Zotabox.prototype.removeAllWidgets = function() {
                var elements = this.Core.Sly('[data-wzb]').search(document.body) || [];
                return this._.each(elements, function(element) {
                    element.parentNode.removeChild(element);
                });
            };
            Zotabox.prototype.isDevelopment = function() {
                return false;
            };
            Zotabox.prototype.isPreview = function() {
                return false;
            };
            Zotabox.prototype.isPJAX = function() {
                return window.__ZB_IS_PJAX__ || false;
            };
            Zotabox.prototype.removeZotaboxEvents = function(eventType) {
                var eventHandlers = window.__ZB_EVENT_HANDLERS__;
                this._.each(eventHandlers, function(handler, evtKey) {
                    var pattern = new RegExp('^(' + (eventType ? eventType : '.+') + ')\_.+$', 'gi');
                    if (pattern.test(evtKey) && this._.isFunction(handler)) {
                        var evtName = new RegExp(pattern).exec(String(evtKey));
                        evtName = !this._.isEmpty(evtName) ? evtName[1] : null;
                        if (!evtName) return;
                        else this.removeEvent(evtName, window, handler);
                        delete window.__ZB_EVENT_HANDLERS__[evtKey];
                    }
                }, this);
            };
            Zotabox.prototype.getBaseFonts = function() {
                return "@font-face {\n  font-display: swap;\n  font-family: 'Zotabox';\n  src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox/ztb.eot'); /* IE9 Compat Modes */\n  src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox/ztb.eot') format('embedded-opentype'), /* IE6-IE8 */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox/ztb.woff') format('woff'), /* Pretty Modern Browsers */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox/ztb.ttf')  format('truetype'), /* Safari, Android, iOS */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox/ztb.svg') format('svg'); /* Legacy iOS */\n}\n@font-face {\n  font-display: swap;\n  font-family: 'Zotabox2';\n  src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox2/ztb2.eot'); /* IE9 Compat Modes */\n  src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox2/ztb2.eot') format('embedded-opentype'), /* IE6-IE8 */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox2/ztb2.woff') format('woff'), /* Pretty Modern Browsers */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox2/ztb2.ttf')  format('truetype'), /* Safari, Android, iOS */\n       url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox2/ztb2.svg') format('svg'); /* Legacy iOS */\n}\n\n@font-face {\n  font-display: swap;\n    font-family: 'ztb3';\n    src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox3/ztb3.eot');\n    src: url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox3/ztb3.eot') format('embedded-opentype'),\n        url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox3/ztb3.ttf') format('truetype'),\n        url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox3/ztb3.woff') format('woff'),\n        url('//static.zotabox.com/__cqxnjiy/asset/font/Zotabox3/ztb3.svg') format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\n@font-face {\n  font-display: swap;\n  font-family: 'zb-icons';\n  src:  url('//static.zotabox.com/__cqxnjiy/asset/font/zb-icons/zb-icons.eot');\n  src:  url('//static.zotabox.com/__cqxnjiy/asset/font/zb-icons/zb-icons.eot') format('embedded-opentype'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-icons/zb-icons.ttf') format('truetype'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-icons/zb-icons.woff') format('woff'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-icons/zb-icons.svg') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-display: swap;\n  font-family: 'zb-all';\n  src:  url('//static.zotabox.com/__cqxnjiy/asset/font/zb-all/zb-all.eot');\n  src:  url('//static.zotabox.com/__cqxnjiy/asset/font/zb-all/zb-all.eot') format('embedded-opentype'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-all/zb-all.ttf') format('truetype'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-all/zb-all.woff') format('woff'),\n    url('//static.zotabox.com/__cqxnjiy/asset/font/zb-all/zb-all.svg') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n    font-family: 'roboto-ZTB';\n    src: url('//static.zotabox.com/__cqxnjiy/asset/font/roboto/Roboto-Medium.eot');\n    src: local('☺'), url('//static.zotabox.com/__cqxnjiy/asset/font/roboto/Roboto-Medium.woff') format('woff'),\n        url('//static.zotabox.com/__cqxnjiy/asset/font/roboto/Roboto-Medium.ttf') format('truetype'),\n        url('//static.zotabox.com/__cqxnjiy/asset/font/roboto/Roboto-Medium.svg') format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\n.zb-icon,\n.zb-icon:before,\n.zb-icon:after {\n    font-family: 'Zotabox' !important;\n    background: unset !important;\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    font-size: 34px;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n[data-wzb] .icon-iconmonstr-lock-1-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-1-icon:before {\n    content: \"\\e807\";\n}\n[data-wzb] .icon-iconmonstr-lock-2-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-2-icon:before {\n    content: \"\\e808\";\n}\n[data-wzb] .icon-iconmonstr-lock-3-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-3-icon:before {\n    content: \"\\e809\";\n}\n[data-wzb] .icon-iconmonstr-lock-4-icon .path1:before,\n#ztb-widget-container .icon-iconmonstr-lock-4-icon .path1:before {\n    content: \"\\e80a\";\n    color: rgb(255, 255, 255);\n}\n[data-wzb] .icon-iconmonstr-lock-4-icon .path2:before,\n#ztb-widget-container .icon-iconmonstr-lock-4-icon .path2:before {\n    content: \"\\e80b\";\n    margin-left: -1.14453125em;\n    color: rgb(0, 0, 0);\n}\n[data-wzb] .icon-iconmonstr-lock-5-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-5-icon:before {\n    content: \"\\e80c\";\n}\n[data-wzb] .icon-iconmonstr-lock-6-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-6-icon:before {\n    content: \"\\e80d\";\n}\n[data-wzb] .icon-iconmonstr-lock-7-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-7-icon:before {\n    content: \"\\e80e\";\n}\n[data-wzb] .icon-arrow-left:before,\n#ztb-widget-container .icon-arrow-left:before {\n    content: \"\\e600\";\n}\n[data-wzb] .icon-arrow-right:before,\n#ztb-widget-container .icon-arrow-right:before {\n    content: \"\\e601\";\n}\n[data-wzb] .icon-close:before,\n#ztb-widget-container .icon-close:before {\n    content: \"\\e602\";\n    left: -7px;\n    position: absolute;\n    top: -21px;\n    margin: 0 !important;\n}\n.zb-tab-icon {\n    background: unset !important;\n}\n[id*=\"zbwid-\"] .icon-zotabox-logo:before,\n[data-wzb] .icon-zotabox-logo:before,\n#ztb-widget-container .icon-zotabox-logo:before {\n    content: \"\\e603\";\n}\n[data-wzb] .icon-tab-icon-1:before,\n#ztb-widget-container .icon-tab-icon-1:before {\n    content: \"\\e800\";\n}\n[data-wzb] .icon-tab-icon-2:before,\n#ztb-widget-container .icon-tab-icon-2:before {\n    content: \"\\e801\";\n}\n[data-wzb] .icon-tab-icon-3:before,\n#ztb-widget-container .icon-tab-icon-3:before {\n    content: \"\\e802\";\n}\n[data-wzb] .icon-tab-icon-4:before,\n#ztb-widget-container .icon-tab-icon-4:before {\n    content: \"\\e803\";\n}\n[data-wzb] .icon-tab-icon-5:before,\n#ztb-widget-container .icon-tab-icon-5:before {\n    content: \"\\e804\";\n}\n[data-wzb] .icon-tab-icon-6:before,\n#ztb-widget-container .icon-tab-icon-6:before {\n    content: \"\\e805\";\n}\n[data-wzb] .icon-tab-icon-7:before,\n#ztb-widget-container .icon-tab-icon-7:before {\n    content: \"\\e806\";\n}\n[data-wzb] .icon-iconmonstr-lock-1-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-1-icon:before {\n    content: \"\\e807\";\n}\n[data-wzb] .icon-iconmonstr-lock-2-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-2-icon:before {\n    content: \"\\e808\";\n}\n[data-wzb] .icon-iconmonstr-lock-3-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-3-icon:before {\n    content: \"\\e809\";\n}\n[data-wzb] .icon-iconmonstr-lock-4-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-4-icon:before {\n    content: \"\\e80b\";\n}\n[data-wzb] .icon-iconmonstr-lock-5-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-5-icon:before {\n    content: \"\\e80c\";\n}\n[data-wzb] .icon-iconmonstr-lock-6-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-6-icon:before {\n    content: \"\\e80d\";\n}\n[data-wzb] .icon-iconmonstr-lock-7-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-7-icon:before {\n    content: \"\\e80e\";\n}\n[data-wzb] .icon-iconmonstr-lock-16-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-16-icon:before {\n    content: \"\\e80f\";\n}\n[data-wzb] .icon-iconmonstr-lock-17-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-17-icon:before {\n    content: \"\\e810\";\n}\n[data-wzb] .icon-iconmonstr-lock-icon:before,\n#ztb-widget-container .icon-iconmonstr-lock-icon:before {\n    content: \"\\e811\";\n}\n[data-wzb] .icon-facebook-1-icon:before,\n#ztb-widget-container .icon-facebook-1-icon:before {\n    content: \"\\e90e\";\n}\n[data-wzb] .icon-facebook-2-icon:before,\n#ztb-widget-container .icon-facebook-2-icon:before {\n    content: \"\\e90f\";\n}\n[data-wzb] .icon-padlock18:before,\n#ztb-widget-container .icon-padlock18:before {\n    content: \"\\e812\";\n}\n[data-wzb] .icon-zotabox-logo:before,\n#ztb-widget-container .icon-zotabox-logo:before {\n    content: \"\\e603\";\n}\n\n.zb2-icon,\n.zb2-icon:before,\n.zb2-icon:after {\n    font-family: 'Zotabox2' !important;\n    background: unset !important;\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    font-size: 34px;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n[data-wzb] .icon-facebook-messenger-icon-01:before,\n#ztb-widget-container .icon-facebook-messenger-icon-01:before {\n    content: \"\\e90a\";\n}\n[data-wzb] .icon-facebook-messenger-icon-02:before,\n#ztb-widget-container .icon-facebook-messenger-icon-02:before {\n    content: \"\\e90b\";\n}\n[data-wzb] .icon-facebook-messenger-icon-03:before,\n#ztb-widget-container .icon-facebook-messenger-icon-03:before {\n    content: \"\\e90c\";\n}\n[data-wzb] .icon-facebook-messenger-icon-04:before,\n#ztb-widget-container .icon-facebook-messenger-icon-04:before {\n    content: \"\\e90d\";\n}\n[data-wzb] [data-wzb] .icon-close:before,\n#ztb-widget-container .icon-close:before {\n    content: \"\\e602\";\n    margin: 0 !important;\n}\n[data-wzb] .icon-ztb-company:before,\n#ztb-widget-container .icon-ztb-company:before {\n    content: \"\\e900\";\n}\n[data-wzb] .icon-ztb-earth:before,\n#ztb-widget-container .icon-ztb-earth:before {\n    content: \"\\e901\";\n}\n[data-wzb] .icon-ztb-icon-chat1:before,\n#ztb-widget-container .icon-ztb-icon-chat1:before {\n    content: \"\\e902\";\n}\n[data-wzb] .icon-ztb-icon-chat2:before,\n#ztb-widget-container .icon-ztb-icon-chat2:before {\n    content: \"\\e903\";\n}\n[data-wzb] .icon-ztb-icon-chat4:before,\n#ztb-widget-container .icon-ztb-icon-chat4:before {\n    content: \"\\e904\";\n}\n[data-wzb] .icon-ztb-icon-email2:before,\n#ztb-widget-container .icon-ztb-icon-email2:before {\n    content: \"\\e905\";\n}\n[data-wzb] .icon-ztb-icon-mail:before,\n#ztb-widget-container .icon-ztb-icon-mail:before {\n    content: \"\\e906\";\n}\n[data-wzb] .icon-ztb-icon-send-mail:before,\n#ztb-widget-container .icon-ztb-icon-send-mail:before {\n    content: \"\\e907\";\n}\n[data-wzb] .icon-ztb-mail:before,\n#ztb-widget-container .icon-ztb-mail:before {\n    content: \"\\e908\";\n}\n[data-wzb] .icon-ztb-pencil:before,\n#ztb-widget-container .icon-ztb-pencil:before {\n    content: \"\\e909\";\n}\n[data-wzb] .icon-ztb-phone:before,\n#ztb-widget-container .icon-ztb-phone:before {\n    content: \"\\e90a\";\n}\n[data-wzb] .icon-ztb-star:before,\n#ztb-widget-container .icon-ztb-star:before {\n    content: \"\\e90b\";\n}\n[data-wzb] .icon-ztb-user:before,\n#ztb-widget-container .icon-ztb-user:before {\n    content: \"\\e90c\";\n}\n[data-wzb] .icon-icon-ztb-chat-01:before,\n#ztb-widget-container .icon-icon-ztb-chat-01:before {\n    content: \"\\e913\";\n}\n[data-wzb] .icon-icon-ztb-chat-02:before,\n#ztb-widget-container .icon-icon-ztb-chat-02:before {\n    content: \"\\e914\";\n}\n[data-wzb] .icon-tab-icon-none:before,\n#ztb-widget-container .icon-tab-icon-none:before {\n    content: \"\";\n    color: #d8d8d8;\n    font-size: 50px;\n    left: -6px;\n    position: absolute;\n    top: 6px;\n    font-family: 'Zotabox' !important;\n}\n\n.zb3-icon,\n.zb3-icon:before,\n.zb3-icon:after {\n    font-family: 'ztb3' !important;\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n[data-wzb] .icon-0:before,\n#ztb-widget-container .icon-0:before {\n  content: \"\\e900\";\n}\n[data-wzb] .icon-001:before,\n#ztb-widget-container .icon-001:before {\n  content: \"\\e901\";\n}\n[data-wzb] .icon-002:before,\n#ztb-widget-container .icon-002:before {\n  content: \"\\e902\";\n}\n[data-wzb] .icon-003:before,\n#ztb-widget-container .icon-003:before {\n  content: \"\\e903\";\n}\n[data-wzb] .icon-004:before,\n#ztb-widget-container .icon-004:before {\n  content: \"\\e904\";\n}\n[data-wzb] .icon-005:before,\n#ztb-widget-container .icon-005:before {\n  content: \"\\e905\";\n}\n[data-wzb] .icon-006:before,\n#ztb-widget-container .icon-006:before {\n  content: \"\\e906\";\n}\n[data-wzb] .icon-007:before,\n#ztb-widget-container .icon-007:before {\n  content: \"\\e907\";\n}\n[data-wzb] .icon-008:before,\n#ztb-widget-container .icon-008:before {\n  content: \"\\e908\";\n}\n[data-wzb] .icon-009:before,\n#ztb-widget-container .icon-009:before {\n  content: \"\\e909\";\n}\n[data-wzb] .icon-010:before,\n#ztb-widget-container .icon-010:before {\n  content: \"\\e90a\";\n}\n[data-wzb] .icon-011:before,\n#ztb-widget-container .icon-011:before {\n  content: \"\\e90b\";\n}\n[data-wzb] .icon-012:before,\n#ztb-widget-container .icon-012:before {\n  content: \"\\e90c\";\n}\n[data-wzb] .icon-013:before,\n#ztb-widget-container .icon-013:before {\n  content: \"\\e90d\";\n}\n[data-wzb] .icon-014:before,\n#ztb-widget-container .icon-014:before {\n  content: \"\\e90e\";\n}\n[data-wzb] .icon-015:before,\n#ztb-widget-container .icon-015:before {\n  content: \"\\e90f\";\n}\n[data-wzb] .icon-016:before,\n#ztb-widget-container .icon-016:before {\n  content: \"\\e910\";\n}\n[data-wzb] .icon-017:before,\n#ztb-widget-container .icon-017:before {\n  content: \"\\e911\";\n}\n[data-wzb] .icon-018:before,\n#ztb-widget-container .icon-018:before {\n  content: \"\\e912\";\n}\n[data-wzb] .icon-019:before,\n#ztb-widget-container .icon-019:before {\n  content: \"\\e913\";\n}\n[data-wzb] .icon-020:before,\n#ztb-widget-container .icon-020:before {\n  content: \"\\e914\";\n}\n[data-wzb] .icon-021:before,\n#ztb-widget-container .icon-021:before {\n  content: \"\\e915\";\n}\n[data-wzb] .icon-022:before,\n#ztb-widget-container .icon-022:before {\n  content: \"\\e916\";\n}\n[data-wzb] .icon-023:before,\n#ztb-widget-container .icon-023:before {\n  content: \"\\e917\";\n}\n[data-wzb] .icon-024:before,\n#ztb-widget-container .icon-024:before {\n  content: \"\\e918\";\n}\n[data-wzb] .icon-025:before,\n#ztb-widget-container .icon-025:before {\n  content: \"\\e919\";\n}\n[data-wzb] .icon-026:before,\n#ztb-widget-container .icon-026:before {\n  content: \"\\e91a\";\n}\n[data-wzb] .icon-027:before,\n#ztb-widget-container .icon-027:before {\n  content: \"\\e91b\";\n}\n[data-wzb] .icon-028:before,\n#ztb-widget-container .icon-028:before {\n  content: \"\\e91c\";\n}\n[data-wzb] .icon-029:before,\n#ztb-widget-container .icon-029:before {\n  content: \"\\e91d\";\n}\n[data-wzb] .icon-030:before,\n#ztb-widget-container .icon-030:before {\n  content: \"\\e91e\";\n}\n[data-wzb] .icon-031:before,\n#ztb-widget-container .icon-031:before {\n  content: \"\\e91f\";\n}\n[data-wzb] .icon-032:before,\n#ztb-widget-container .icon-032:before {\n  content: \"\\e920\";\n}\n[data-wzb] .icon-033:before,\n#ztb-widget-container .icon-033:before {\n  content: \"\\e921\";\n}\n[data-wzb] .icon-034:before,\n#ztb-widget-container .icon-034:before {\n  content: \"\\e922\";\n}\n[data-wzb] .icon-035:before,\n#ztb-widget-container .icon-035:before {\n  content: \"\\e923\";\n}\n[data-wzb] .icon-036:before,\n#ztb-widget-container .icon-036:before {\n  content: \"\\e924\";\n}\n[data-wzb] .icon-037:before,\n#ztb-widget-container .icon-037:before {\n  content: \"\\e925\";\n}\n[data-wzb] .icon-038:before,\n#ztb-widget-container .icon-038:before {\n  content: \"\\e926\";\n}\n[data-wzb] .icon-039:before,\n#ztb-widget-container .icon-039:before {\n  content: \"\\e927\";\n}\n[data-wzb] .icon-040:before,\n#ztb-widget-container .icon-040:before {\n  content: \"\\e928\";\n}\n[data-wzb] .icon-041:before,\n#ztb-widget-container .icon-041:before {\n  content: \"\\e929\";\n}\n[data-wzb] .icon-042:before,\n#ztb-widget-container .icon-042:before {\n  content: \"\\e92a\";\n}\n[data-wzb] .icon-043:before,\n#ztb-widget-container .icon-043:before {\n  content: \"\\e92b\";\n}\n[data-wzb] .icon-044:before,\n#ztb-widget-container .icon-044:before {\n  content: \"\\e92c\";\n}\n[data-wzb] .icon-045:before,\n#ztb-widget-container .icon-045:before {\n  content: \"\\e92d\";\n}\n[data-wzb] .icon-046:before,\n#ztb-widget-container .icon-046:before {\n  content: \"\\e92e\";\n}\n[data-wzb] .icon-047:before,\n#ztb-widget-container .icon-047:before {\n  content: \"\\e92f\";\n}\n[data-wzb] .icon-048:before,\n#ztb-widget-container .icon-048:before {\n  content: \"\\e930\";\n}\n[data-wzb] .icon-049:before,\n#ztb-widget-container .icon-049:before {\n  content: \"\\e931\";\n}\n[data-wzb] .icon-050:before,\n#ztb-widget-container .icon-050:before {\n  content: \"\\e932\";\n}\n[data-wzb] .icon-051:before,\n#ztb-widget-container .icon-051:before {\n  content: \"\\e933\";\n}\n[data-wzb] .icon-052:before,\n#ztb-widget-container .icon-052:before {\n  content: \"\\e934\";\n}\n[data-wzb] .icon-053:before,\n#ztb-widget-container .icon-053:before {\n  content: \"\\e935\";\n}\n[data-wzb] .icon-054:before,\n#ztb-widget-container .icon-054:before {\n  content: \"\\e936\";\n}\n[data-wzb] .icon-055:before,\n#ztb-widget-container .icon-055:before {\n  content: \"\\e937\";\n}\n[data-wzb] .icon-056:before,\n#ztb-widget-container .icon-056:before {\n  content: \"\\e938\";\n}\n[data-wzb] .icon-057:before,\n#ztb-widget-container .icon-057:before {\n  content: \"\\e939\";\n}\n[data-wzb] .icon-058:before,\n#ztb-widget-container .icon-058:before {\n  content: \"\\e93a\";\n}\n[data-wzb] .icon-059:before,\n#ztb-widget-container .icon-059:before {\n  content: \"\\e93b\";\n}\n[data-wzb] .icon-060:before,\n#ztb-widget-container .icon-060:before {\n  content: \"\\e93c\";\n}\n[data-wzb] .icon-061:before,\n#ztb-widget-container .icon-061:before {\n  content: \"\\e93d\";\n}\n[data-wzb] .icon-062:before,\n#ztb-widget-container .icon-062:before {\n  content: \"\\e93e\";\n}\n[data-wzb] .icon-063:before,\n#ztb-widget-container .icon-063:before {\n  content: \"\\e93f\";\n}\n[data-wzb] .icon-064:before,\n#ztb-widget-container .icon-064:before {\n  content: \"\\e940\";\n}\n[data-wzb] .icon-065:before,\n#ztb-widget-container .icon-065:before {\n  content: \"\\e941\";\n}\n[data-wzb] .icon-066:before,\n#ztb-widget-container .icon-066:before {\n  content: \"\\e942\";\n}\n[data-wzb] .icon-067:before,\n#ztb-widget-container .icon-067:before {\n  content: \"\\e943\";\n}\n[data-wzb] .icon-068:before,\n#ztb-widget-container .icon-068:before {\n  content: \"\\e944\";\n}\n[data-wzb] .icon-069:before,\n#ztb-widget-container .icon-069:before {\n  content: \"\\e945\";\n}\n[data-wzb] .icon-070:before,\n#ztb-widget-container .icon-070:before {\n  content: \"\\e946\";\n}\n[data-wzb] .icon-071:before,\n#ztb-widget-container .icon-071:before {\n  content: \"\\e947\";\n}\n[data-wzb] .icon-072:before,\n#ztb-widget-container .icon-072:before {\n  content: \"\\e948\";\n}\n[data-wzb] .icon-073:before,\n#ztb-widget-container .icon-073:before {\n  content: \"\\e949\";\n}\n[data-wzb] .icon-074:before,\n#ztb-widget-container .icon-074:before {\n  content: \"\\e94a\";\n}\n[data-wzb] .icon-075:before,\n#ztb-widget-container .icon-075:before {\n  content: \"\\e94b\";\n}\n[data-wzb] .icon-076:before,\n#ztb-widget-container .icon-076:before {\n  content: \"\\e94c\";\n}\n[data-wzb] .icon-077:before,\n#ztb-widget-container .icon-077:before {\n  content: \"\\e94d\";\n}\n[data-wzb] .icon-078:before,\n#ztb-widget-container .icon-078:before {\n  content: \"\\e94e\";\n}\n[data-wzb] .icon-079:before,\n#ztb-widget-container .icon-079:before {\n  content: \"\\e94f\";\n}\n[data-wzb] .icon-080:before,\n#ztb-widget-container .icon-080:before {\n  content: \"\\e950\";\n}\n[data-wzb] .icon-081:before,\n#ztb-widget-container .icon-081:before {\n  content: \"\\e951\";\n}\n[data-wzb] .icon-082:before,\n#ztb-widget-container .icon-082:before {\n  content: \"\\e952\";\n}\n[data-wzb] .icon-083:before,\n#ztb-widget-container .icon-083:before {\n  content: \"\\e953\";\n}\n[data-wzb] .icon-084:before,\n#ztb-widget-container .icon-084:before {\n  content: \"\\e954\";\n}\n[data-wzb] .icon-085:before,\n#ztb-widget-container .icon-085:before {\n  content: \"\\e955\";\n}\n[data-wzb] .icon-086:before,\n#ztb-widget-container .icon-086:before {\n  content: \"\\e956\";\n}\n[data-wzb] .icon-087:before,\n#ztb-widget-container .icon-087:before {\n  content: \"\\e957\";\n}\n[data-wzb] .icon-088:before,\n#ztb-widget-container .icon-088:before {\n  content: \"\\e958\";\n}\n[data-wzb] .icon-089:before,\n#ztb-widget-container .icon-089:before {\n  content: \"\\e959\";\n}\n[data-wzb] .icon-090:before,\n#ztb-widget-container .icon-090:before {\n  content: \"\\e95a\";\n}\n[data-wzb] .icon-091:before,\n#ztb-widget-container .icon-091:before {\n  content: \"\\e95b\";\n}\n[data-wzb] .icon-092:before,\n#ztb-widget-container .icon-092:before {\n  content: \"\\e95c\";\n}\n[data-wzb] .icon-094:before,\n#ztb-widget-container .icon-094:before {\n  content: \"\\e95d\";\n}\n[data-wzb] .icon-095:before,\n#ztb-widget-container .icon-095:before {\n  content: \"\\e95e\";\n}\n[data-wzb] .icon-096:before,\n#ztb-widget-container .icon-096:before {\n  content: \"\\e95f\";\n}\n[data-wzb] .icon-097:before,\n#ztb-widget-container .icon-097:before {\n  content: \"\\e960\";\n}\n[data-wzb] .icon-098:before,\n#ztb-widget-container .icon-098:before {\n  content: \"\\e961\";\n}\n[data-wzb] .icon-099:before,\n#ztb-widget-container .icon-099:before {\n  content: \"\\e962\";\n}\n[data-wzb] .icon-100:before,\n#ztb-widget-container .icon-100:before {\n  content: \"\\e963\";\n}\n[data-wzb] .icon-101:before,\n#ztb-widget-container .icon-101:before {\n  content: \"\\e964\";\n}\n[data-wzb] .icon-102:before,\n#ztb-widget-container .icon-102:before {\n  content: \"\\e965\";\n}\n[data-wzb] .icon-103:before,\n#ztb-widget-container .icon-103:before {\n  content: \"\\e966\";\n}\n[data-wzb] .icon-104:before,\n#ztb-widget-container .icon-104:before {\n  content: \"\\e967\";\n}\n[data-wzb] .icon-105:before,\n#ztb-widget-container .icon-105:before {\n  content: \"\\e968\";\n}\n[data-wzb] .icon-106:before,\n#ztb-widget-container .icon-106:before {\n  content: \"\\e969\";\n}\n[data-wzb] .icon-107:before,\n#ztb-widget-container .icon-107:before {\n  content: \"\\e96a\";\n}\n[data-wzb] .icon-108:before,\n#ztb-widget-container .icon-108:before {\n  content: \"\\e96b\";\n}\n[data-wzb] .icon-109:before,\n#ztb-widget-container .icon-109:before {\n  content: \"\\e96c\";\n}\n[data-wzb] .icon-110:before,\n#ztb-widget-container .icon-110:before {\n  content: \"\\e96d\";\n}\n[data-wzb] .icon-111:before,\n#ztb-widget-container .icon-111:before {\n  content: \"\\e96e\";\n}\n[data-wzb] .icon-112:before,\n#ztb-widget-container .icon-112:before {\n  content: \"\\e96f\";\n}\n[data-wzb] .icon-113:before,\n#ztb-widget-container .icon-113:before {\n  content: \"\\e970\";\n}\n[data-wzb] .icon-114:before,\n#ztb-widget-container .icon-114:before {\n  content: \"\\e971\";\n}\n[data-wzb] .icon-115:before,\n#ztb-widget-container .icon-115:before {\n  content: \"\\e972\";\n}\n[data-wzb] .icon-116:before,\n#ztb-widget-container .icon-116:before {\n  content: \"\\e973\";\n}\n[data-wzb] .icon-117:before,\n#ztb-widget-container .icon-117:before {\n  content: \"\\e974\";\n}\n[data-wzb] .icon-119:before,\n#ztb-widget-container .icon-119:before {\n  content: \"\\e975\";\n}\n[data-wzb] .icon-120:before,\n#ztb-widget-container .icon-120:before {\n  content: \"\\e976\";\n}\n[data-wzb] .icon-121:before,\n#ztb-widget-container .icon-121:before {\n  content: \"\\e977\";\n}\n[data-wzb] .icon-122:before,\n#ztb-widget-container .icon-122:before {\n  content: \"\\e978\";\n}\n[data-wzb] .icon-123:before,\n#ztb-widget-container .icon-123:before {\n  content: \"\\e979\";\n}\n[data-wzb] .icon-124:before,\n#ztb-widget-container .icon-124:before {\n  content: \"\\e97a\";\n}\n[data-wzb] .icon-125:before,\n#ztb-widget-container .icon-125:before {\n  content: \"\\e97b\";\n}\n[data-wzb] .icon-126:before,\n#ztb-widget-container .icon-126:before {\n  content: \"\\e97c\";\n}\n[data-wzb] .icon-127:before,\n#ztb-widget-container .icon-127:before {\n  content: \"\\e97d\";\n}\n[data-wzb] .icon-128:before,\n#ztb-widget-container .icon-128:before {\n  content: \"\\e97e\";\n}\n[data-wzb] .icon-129:before,\n#ztb-widget-container .icon-129:before {\n  content: \"\\e97f\";\n}\n[data-wzb] .icon-130:before,\n#ztb-widget-container .icon-130:before {\n  content: \"\\e980\";\n}\n[data-wzb] .icon-131:before,\n#ztb-widget-container .icon-131:before {\n  content: \"\\e981\";\n}\n[data-wzb] .icon-zotabox_logo:before,\n#ztb-widget-container .icon-zotabox_logo:before {\n  content: \"\\e982\";\n}\n\n\n\n[class^=\"zb-all-\"], [class*=\" zb-all-\"],\n[class*=\" zb-all-\"]:before,\n[class^=\"zb-all-\"]:before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'zb-all' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.zb-all-align:before {\n  content: \"\\e900\";\n}\n.zb-all-align-1:before {\n  content: \"\\e901\";\n}\n.zb-all-align-2:before {\n  content: \"\\e902\";\n}\n.zb-all-arrow_2:before {\n  content: \"\\e903\";\n}\n.zb-all-arrow_3:before {\n  content: \"\\e904\";\n}\n.zb-all-arrow_4:before {\n  content: \"\\e905\";\n}\n.zb-all-arrow_5:before {\n  content: \"\\e906\";\n}\n.zb-all-arrow_6:before {\n  content: \"\\e907\";\n}\n.zb-all-arrow_7:before {\n  content: \"\\e908\";\n}\n.zb-all-arrow_8:before {\n  content: \"\\e909\";\n}\n.zb-all-arrow_9:before {\n  content: \"\\e90a\";\n}\n.zb-all-arrow_10:before {\n  content: \"\\e90b\";\n}\n.zb-all-btn_google_light_normal_ios .path1:before {\n  content: \"\\e90c\";\n  color: rgb(255, 255, 255);\n}\n.zb-all-btn_google_light_normal_ios .path2:before {\n  content: \"\\e90d\";\n  margin-left: -1em;\n  color: rgb(66, 133, 244);\n}\n.zb-all-btn_google_light_normal_ios .path3:before {\n  content: \"\\e90e\";\n  margin-left: -1em;\n  color: rgb(52, 168, 83);\n}\n.zb-all-btn_google_light_normal_ios .path4:before {\n  content: \"\\e90f\";\n  margin-left: -1em;\n  color: rgb(251, 188, 5);\n}\n.zb-all-btn_google_light_normal_ios .path5:before {\n  content: \"\\e910\";\n  margin-left: -1em;\n  color: rgb(234, 67, 53);\n}\n.zb-all-cart:before {\n  content: \"\\e911\";\n}\n.zb-all-check-dashboard:before {\n  content: \"\\e912\";\n}\n.zb-all-checked:before {\n  content: \"\\e913\";\n}\n.zb-all-checkk:before {\n  content: \"\\e914\";\n}\n.zb-all-chevrons-left:before {\n  content: \"\\e915\";\n}\n.zb-all-chevrons-right:before {\n  content: \"\\e916\";\n}\n.zb-all-close-button:before {\n  content: \"\\e917\";\n}\n.zb-all-closee:before {\n  content: \"\\e918\";\n}\n.zb-all-dashboard:before {\n  content: \"\\e919\";\n}\n.zb-all-database:before {\n  content: \"\\e91a\";\n}\n.zb-all-duplicate:before {\n  content: \"\\e91b\";\n}\n.zb-all-edit:before {\n  content: \"\\e91c\";\n}\n.zb-all-edit_field:before {\n  content: \"\\e91d\";\n}\n.zb-all-editt:before {\n  content: \"\\e91e\";\n}\n.zb-all-embed-data:before {\n  content: \"\\e91f\";\n}\n.zb-all-embed-display:before {\n  content: \"\\e920\";\n}\n.zb-all-embed-edit:before {\n  content: \"\\e921\";\n}\n.zb-all-embed-edit-form:before {\n  content: \"\\e922\";\n}\n.zb-all-embed-move:before {\n  content: \"\\e923\";\n}\n.zb-all-embed-setting:before {\n  content: \"\\e924\";\n}\n.zb-all-embed-trash:before {\n  content: \"\\e925\";\n}\n.zb-all-facebook-icon-06:before {\n  content: \"\\e926\";\n}\n.zb-all-flogo-HexRBG-Wht-58:before {\n  content: \"\\e927\";\n  color: #fff;\n}\n.zb-all-Free-Shipping:before {\n  content: \"\\e928\";\n}\n.zb-all-global_icon:before {\n  content: \"\\e929\";\n}\n.zb-all-icon_bullhorn:before {\n  content: \"\\e92a\";\n}\n.zb-all-icon_comments:before {\n  content: \"\\e92b\";\n}\n.zb-all-icon_users .path1:before {\n  content: \"\\e92c\";\n  color: rgb(0, 0, 0);\n}\n.zb-all-icon_users .path2:before {\n  content: \"\\e92d\";\n  margin-left: -1em;\n  color: rgb(255, 255, 255);\n}\n.zb-all-icon-arrow-left:before {\n  content: \"\\e92e\";\n}\n.zb-all-icon-arrow-right:before {\n  content: \"\\e92f\";\n}\n.zb-all-icon-attach:before {\n  content: \"\\e930\";\n}\n.zb-all-icon-bundle:before {\n  content: \"\\e931\";\n}\n.zb-all-icon-buyx-for-money:before {\n  content: \"\\e932\";\n}\n.zb-all-icon-buyx-gety:before {\n  content: \"\\e933\";\n}\n.zb-all-icon-calender:before {\n  content: \"\\e934\";\n}\n.zb-all-icon-cart-discount:before {\n  content: \"\\e935\";\n}\n.zb-all-icon-check:before {\n  content: \"\\e936\";\n}\n.zb-all-icon-close:before {\n  content: \"\\e937\";\n}\n.zb-all-icon-close-01:before {\n  content: \"\\e938\";\n}\n.zb-all-icon-close-02:before {\n  content: \"\\e939\";\n}\n.zb-all-icon-document:before {\n  content: \"\\e93a\";\n}\n.zb-all-icon-free-gift:before {\n  content: \"\\e93b\";\n}\n.zb-all-icon-product-discount:before {\n  content: \"\\e93c\";\n}\n.zb-all-icon-x:before {\n  content: \"\\e93d\";\n}\n.zb-all-imageicon:before {\n  content: \"\\e93e\";\n}\n.zb-all-integration:before {\n  content: \"\\e93f\";\n}\n.zb-all-lightbulb:before {\n  content: \"\\e940\";\n}\n.zb-all-menu-dot:before {\n  content: \"\\e941\";\n}\n.zb-all-monitor:before {\n  content: \"\\e942\";\n}\n.zb-all-more:before {\n  content: \"\\e943\";\n}\n.zb-all-move:before {\n  content: \"\\e944\";\n}\n.zb-all-noun_add:before {\n  content: \"\\e945\";\n}\n.zb-all-on_icon:before {\n  content: \"\\e946\";\n}\n.zb-all-plus-2:before {\n  content: \"\\e947\";\n}\n.zb-all-plus-3:before {\n  content: \"\\e948\";\n}\n.zb-all-pluss:before {\n  content: \"\\e949\";\n}\n.zb-all-quote-01:before {\n  content: \"\\e94a\";\n}\n.zb-all-scheduling:before {\n  content: \"\\e94b\";\n}\n.zb-all-search_01:before {\n  content: \"\\e94c\";\n}\n.zb-all-selectt:before {\n  content: \"\\e94d\";\n}\n.zb-all-setting-01:before {\n  content: \"\\e94e\";\n}\n.zb-all-settings:before {\n  content: \"\\e94f\";\n}\n.zb-all-settings_icon:before {\n  content: \"\\e950\";\n}\n.zb-all-trash:before {\n  content: \"\\e951\";\n}\n.zb-all-trash_02:before {\n  content: \"\\e952\";\n}\n.zb-all-webpage-multiple:before {\n  content: \"\\e953\";\n}\n.zb-all-zotabox-logo:before {\n  content: \"\\e954\";\n  color: #db2c2c;\n}\n.zb-all-zotabox-z-logo:before {\n  content: \"\\e955\";\n  color: #db2c2c;\n}\n\n\n\n\n@media print {\n    body [data-wzb]{\n        display: none !important;\n    }\n}\n";
            }
            Zotabox.prototype.setLastAccessTime = function() {
                var currentTime = new Date().getTime();
                this.Cookies.Session.options.expires = 365;
                this.localStorage("_ZB_STATIC_LAST_ACCESS_TIME", currentTime);
                this.Cookies.Session.options.expires = null;
            }
            Zotabox.prototype.getAllCookies = function() {
                var pairs = document.cookie.split(";");
                var cookies = {};
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split("=");
                    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
                }
                return cookies;
            }
            Zotabox.prototype.checkAndClearSessionCookie = function() {
                var _super = this;
                var currentTime = new Date().getTime();
                var lastAccessTime = this.localStorage("_ZB_STATIC_LAST_ACCESS_TIME");
                if ((currentTime - lastAccessTime) > 3600 * 1000) {
                    var listCookiePrefix = ['_ZB_STATIC_SS', '_ZB_STATS_SS'],
                        cookies = this.getAllCookies();
                    this._.each(cookies, function(value, cookieName) {
                        _super._.each(listCookiePrefix, function(value, key) {
                            if (cookieName.search(value) >= 0) {
                                console.log("ZB DELETE COOKIE", cookieName);
                                document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            }
                        })
                    })
                    try {
                        var sessions = Object.keys(parent.window.sessionStorage);
                        for (var i = 0; i < sessions.length; i++) {
                            var cookieName = sessions[i];
                            _super._.each(listCookiePrefix, function(value, key) {
                                if (cookieName.search(value) >= 0) {
                                    console.log("ZB DELETE SESSION STORAGE", cookieName);
                                    _super.deleteSessionStorage(cookieName);
                                }
                            })
                        }
                    } catch (err) {}
                    try {
                        var sessions = Object.keys(parent.window.localStorage);
                        for (var i = 0; i < sessions.length; i++) {
                            var cookieName = sessions[i];
                            _super._.each(listCookiePrefix, function(value, key) {
                                if (cookieName.search(value) >= 0) {
                                    console.log("ZB DELETE LOCAL STORAGE", cookieName);
                                    _super.deleteLocalStorage(cookieName);
                                }
                            })
                        }
                    } catch (err) {}
                }
                this.setLastAccessTime();
                return true;
            };
            Zotabox.prototype.sessionStorage = function(name, value) {
                return ZB_STORAGE.sessionStorage(name, value);
            }
            Zotabox.prototype.deleteSessionStorage = function(name) {
                return ZB_STORAGE.deleteSessionStorage(name);
            }
            Zotabox.prototype.deleteCookie = function(name) {
                return ZB_STORAGE.deleteCookie(name);
            }
            Zotabox.prototype.localStorage = function(name, value) {
                return ZB_STORAGE.localStorage(name, value);
            }
            Zotabox.prototype.deleteLocalStorage = function(name) {
                return ZB_STORAGE.deleteLocalStorage(name);
            }
            window.__ZBWG__ = window.__ZBWG__ || {};
            window.__ZBSTY__ = window.__ZBSTY__ || {};
            window.__ZBDR__ = window.__ZBDR__ || bootstrap.root;
            window.__ZBDU__ = window.__ZBDU__ || bootstrap.domains;
            window.__ZBTPL__ = window.__ZBTPL__ || {};
            window.__ZB_EVENT_HANDLERS__ = window.__ZB_EVENT_HANDLERS__ || {};
            window.__ZBMBT__ = window.__ZBMBT__ || false;
            var _refreshMuse = function(timeout) {
                var running = 0;
                var t = setInterval(function() {
                    if (running >= 3000) return clearInterval(t);
                    if (document.readyState === "complete") {
                        setTimeout(function() {
                            return window.require(['jquery'], function(jQuery) {
                                if (jQuery('body > .breakpoint').hasClass('active')) return;
                                jQuery('.breakpoint').registerBreakpoint();
                            });
                        }, (timeout || 0));
                        return clearInterval(t);
                    };
                    running++;
                }, 10);
            }
            if (typeof window.Zotabox !== 'undefined') {
                if (window.Muse) {
                    _refreshMuse(100);
                }
                return false;
            }
            window.Zotabox = new Zotabox();
            if (window.Muse) {
                window.Zotabox.onInitialized = function() {
                    _refreshMuse();
                };
            }
        }).call(this, {
            root: "//static.zotabox.com/9/5/9538b289eeb024c3e03b31bf47611be6",
            domains: {
                "stats": "//stats.zotabox.com",
                "static": "//static.zbcdn2.net",
                "connect_app": "https://static.zotabox.com",
                "file": "//file.zotabox.com",
                "push": "https://zotabox.me",
                "setting": "https://zotabox.com",
                "actions": "https://actions.zotabox.com",
                "static2": ["//static.zbcdn.net", "//static.zbcdn2.net", "//static.zbcdn3.net"],
                "file2": ["//file.zbcdn.net", "//file.zbcdn2.net", "//file.zbcdn3.net"],
                "trial_days": 30,
                "total_servers": 3,
                "imageResize": true
            },
            staticURL: "//static.zbcdn2.net",
            dataURL: '//static.zbcdn2.net/9/5/9538b289eeb024c3e03b31bf47611be6/data.js?1648190295354',
            bundleURL: '//static.zbcdn2.net/__cqxnjiy/asset/bundle.js',
            widgetURLs: ["//static.zbcdn2.net/__cqxnjiy/facebook_chat/default.js"],
            widgetInstallerClasses: ["Widgets.FacebookChat.Default.Installer"],
            data: {
                "embedWidgets": [],
                "domain": {
                    "id": 503923,
                    "secure_id": "9538b289eeb024c3e03b31bf47611be6",
                    "name": "propertyfinder.com.lr",
                    "phone_number": null,
                    "registed_domain": "propertyfinder.com.lr",
                    "sms_number": null,
                    "email_address": null,
                    "whatsapp_contact_id": null,
                    "skype_profile_name": null,
                    "facebook_fanpage": "",
                    "facebook_likepage": null,
                    "facebook_state": "1",
                    "twitter_siteurl": null,
                    "twitter_tweet_text": null,
                    "twitter_username": "",
                    "twitter_state": 1,
                    "google_plus_url": "",
                    "google_plus_siteurl": null,
                    "google_plus_state": 1,
                    "vimeo_username": null,
                    "youtube_channel_url": "",
                    "pinterest_username": null,
                    "instagram_username": null,
                    "tumblr_url": null,
                    "blogger_url": null,
                    "linked_in_url": null,
                    "blocked_url_patterns": null,
                    "customer_id": 467243,
                    "status": 1,
                    "countdown_translation": {
                        "days": "Days",
                        "hours": "Hours",
                        "minutes": "Minutes",
                        "seconds": "Seconds",
                        "short_days": "Days",
                        "short_hours": "Hrs",
                        "short_minutes": "Min",
                        "short_seconds": "Sec"
                    },
                    "shopify_currency": null,
                    "nofollow_on": 0,
                    "nofollow_url_matching": null,
                    "weibo_url": null,
                    "vk_url": null,
                    "ok_url": null,
                    "stumbleupon_url": null,
                    "getpocket_url": null,
                    "css_conflict": null,
                    "ignore_embed_elements": "",
                    "custom_css": null,
                    "custom_script": null,
                    "google_tracking": 0,
                    "facebook_tracking": 0,
                    "date_format": null,
                    "updated_time": 1580480260,
                    "use_captcha": 0,
                    "locale": null,
                    "conversion_tracking_url": "",
                    "average_cart": 0,
                    "free_website": 2,
                    "monitor_id": "4t8JUCey"
                },
                "customer": {
                    "disable_tools_type": 0,
                    "id": 467243,
                    "membership": 0,
                    "zotabox_logo": 1,
                    "time_zone": "Africa/Casablanca",
                    "time_zone_offset": "00",
                    "isAnonymous": false,
                    "customerConfig": [],
                    "monitor_id": "49kNWyGy"
                }
            },
            version: 'cqxnjiy',
            timestamp: '1648190295354',
            imageResize: true,
            gCaptchaSiteKeyV2: '6LektKoUAAAAAFTSxvJZIXR5XNNKyrZZucAtJV05',
            gCaptchaSiteKeyV3: '6LeZtKoUAAAAANmaNZodkLlVdJqpePrJX0A30Txk'
        });
    }
    window.Zotabox_Init();
}