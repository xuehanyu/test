!(function (e, n) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = n())
        : 'function' == typeof define && define.amd
        ? define([], n)
        : 'object' == typeof exports
        ? (exports.BdVirtualNum = n())
        : (e.BdVirtualNum = n());
})(window, function () {
    return (function (e) {
        var n = {};
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = (n[r] = { i: r, l: !1, exports: {} });
            return e[r].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
        }
        return (
            (t.m = e),
            (t.c = n),
            (t.d = function (e, n, r) {
                t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
            }),
            (t.r = function (e) {
                'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (t.t = function (e, n) {
                if ((1 & n && (e = t(e)), 8 & n)) return e;
                if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
                var r = Object.create(null);
                if ((t.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e))
                    for (var i in e)
                        t.d(
                            r,
                            i,
                            function (n) {
                                return e[n];
                            }.bind(null, i)
                        );
                return r;
            }),
            (t.n = function (e) {
                var n =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return t.d(n, 'a', n), n;
            }),
            (t.o = function (e, n) {
                return Object.prototype.hasOwnProperty.call(e, n);
            }),
            (t.p = ''),
            t((t.s = 10))
        );
    })([
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.createId = function () {
                    return 'p' + new Date().getTime().toString(16) + parseInt(1e6 * Math.random(), 10).toString(16);
                }),
                (n.ch2channel = function (e) {
                    var n = { 3: '3', 4: '1' };
                    if (void 0 !== n[e]) return n[e];
                    return null;
                }),
                (n.sdkHost = function (e, n) {
                    if (n && /^https?:\/\/[^\/]+\.baidu\.com:\d+$/.test(n)) return e.replace('https://ada.baidu.com', n);
                    return e;
                });
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.init = function (e) {
                    var n = e.key;
                    if (!n) return;
                    return (e.status = 0), (e.pvt = +new Date()), (i[n] = e), e;
                }),
                (n.getData = a),
                (n.setPhone = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        n = arguments[1];
                    if (!n) return;
                    var t = a(n);
                    if (t) {
                        t.phone = Array.isArray(e) ? e : [e];
                        for (var r = 0; r < t.phone.length; r++) {
                            var i = t.phone[r];
                            'click' === i.mode && (o = !0), (i.time = +new Date()), (i.expiredFuncs = []), !t.uid && i.useridInBase64 && (t.uid = i.useridInBase64), c(i);
                        }
                    }
                }),
                (n.getPhone = u),
                (n.setLastUser = function (e) {
                    i.lastUid = e;
                }),
                (n.getLastUser = function () {
                    return i.lastUid;
                }),
                (n.setStatus = function (e, n) {
                    var t = i[n];
                    if (!t) return;
                    'loading' === e ? (t.status = 1) : 'end' === e && (t.status = 2);
                }),
                (n.setExpiredTime = function (e, n, t, r) {
                    var i = u(e, n);
                    if (!i) return !1;
                    (i.time = +new Date()), (i.expiredTime = t), (i.hasHeart = r), c(i);
                }),
                (n.startCountdown = c),
                (n.setValue = function (e, n, t) {
                    var r = i[e];
                    if (!r) return !1;
                    r[n] = t;
                }),
                (n.generateKeyForStore = function (e) {
                    var n = e.uid,
                        t = e.sid;
                    if (!n && !t) return null;
                    var r = n || t,
                        i = e.solutionIds || '',
                        o = e.realPhones || '';
                    return (r += i.replace(/![0-9,a-z,A-z]/g, '') + o.replace(/![0-9,a-z,A-z]/g, '') + (e.mode || ''));
                }),
                (n.checkExpired = function (e) {
                    var n = e.time,
                        t = e.expiredTime,
                        r = e.hasHeart,
                        i = e.clickLeftTime || 60,
                        o = e.heartClickLeftTime || 5;
                    if (+new Date() - n > 1e3 * (t - (r ? o : i))) return !0;
                    return !1;
                }),
                (n.isClickMode = function () {
                    return o;
                });
            var r = t(2),
                i = {},
                o = !1;
            function a(e) {
                return i[e];
            }
            function u(e, n) {
                var t = [];
                if (i[e]) {
                    var o = i[e] || {};
                    t = o.phone || [];
                    Array.isArray(t) || (t = [t]);
                    for (var a = 0; a < t.length; a++) (t[a].datakey = e), (t[a].datafrom = o.from), (t[a].datapvt = o.pvt), (t[a].datapageid = o.pageid);
                } else
                    for (var u in i) {
                        var c = i[u];
                        if (c.uid === e || c.sid === e) {
                            var l = c.phone || [];
                            Array.isArray(t) || (l = [l]);
                            for (var d = 0; d < l.length; d++) (l[d].datakey = u), (l[d].datafrom = c.from), (l[d].datapvt = c.pvt), (l[d].datapageid = c.pageid);
                            t = t.concat(l);
                        }
                    }
                for (var s = null, f = 0; f < t.length; f++) {
                    var p = t[f],
                        h = p.realPhone,
                        v = p.virtualPhone;
                    if ((0, r.isSamePhoneNum)(h, n) || (0, r.isSamePhoneNum)(v, n)) {
                        s = p;
                        break;
                    }
                }
                return s || (s = t[0]), s;
            }
            function c(e) {
                var n = e.dynamicPhone,
                    t = e.hasHeart,
                    r = e.timeoutHandle,
                    i = e.expiredTime,
                    o = e.time,
                    a = e.heartClickLeftTime,
                    u = e.clickLeftTime,
                    c = e.expiredFuncs,
                    l = void 0 === c ? [] : c;
                if (n) {
                    r && ((e.timeoutHandle = null), clearTimeout(r));
                    var d = 1e3 * i - 1e3 * (t ? a : u) - (+new Date() - o);
                    d > 0
                        ? (e.timeoutHandle = setTimeout(function () {
                              l.forEach(function (e) {
                                  e();
                              });
                          }, d))
                        : l.forEach(function (e) {
                              e();
                          });
                }
            }
        },
        function (e, n, t) {
            'use strict';
            function r() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').replace(/-/g, '').replace(/\+/g, '').replace(/\s/, '');
            }
            function i() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
                return 11 === (e = a(e)).length && 0 === e.indexOf('1');
            }
            function o() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
                return 0 === (e = a(e)).indexOf('400') && 10 === e.length;
            }
            function a(e) {
                return 0 === e.indexOf('86') ? e.substring(2) : 0 === e.indexOf('+86') ? e.substring(3) : e;
            }
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.isSamePhoneNum = function (e, n) {
                    if (((e = a(r(e))), (n = a(r(n))), e === n)) return !0;
                    var t = e.indexOf(n),
                        i = n.indexOf(e);
                    if ((3 === t || 4 === t) && 0 === e.indexOf('0')) return !0;
                    if ((3 === i || 4 === i) && 0 === n.indexOf('0')) return !0;
                    return !1;
                }),
                (n.removeSymbol = r),
                (n.isMobileNum = i),
                (n.is400 = o),
                (n.getNumReplaceText = function (e) {
                    if (o((e = a((e = r(e)))))) {
                        var n = [e.substring(0, 3), e.substring(3, 6), e.substring(6, 10)],
                            t = [e.substring(0, 4), e.substring(4, 7), e.substring(7, 10)];
                        return [e, n.join(' '), n.join('-'), t.join(' '), t.join('-')];
                    }
                    if (i(e)) return ['+86' + e, '86' + e, e];
                    var u = ['+86' + e, '86' + e, e];
                    if (0 === e.indexOf('0')) {
                        var c = [],
                            l = e.length;
                        10 === l ? c.push(3) : 12 === l ? c.push(4) : 11 === l && (c = [3, 4]),
                            c.forEach(function (n) {
                                var t = [e.substring(0, n), e.substring(n)];
                                u = [].concat(
                                    (function (e) {
                                        if (Array.isArray(e)) {
                                            for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
                                            return t;
                                        }
                                        return Array.from(e);
                                    })(u),
                                    [t.join(' '), t.join('-'), '+86' + e.substring(n), '86' + e.substring(n), e.substring(n)]
                                );
                            });
                    }
                    return u;
                }),
                (n.remove86 = a);
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 });
            var r =
                Object.assign ||
                function (e) {
                    for (var n = 1; n < arguments.length; n++) {
                        var t = arguments[n];
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    }
                    return e;
                };
            (n.init = function (e) {
                e.logUtil && (i = e.logUtil);
            }),
                (n.click = l),
                (n.clickStatic = function (e, n, t) {
                    l(e, n, t, 'clickStatic');
                }),
                (n.clickDynamic = function (e, n, t) {
                    l(e, n, t, 'clickDynamic');
                }),
                (n.show = function (e) {
                    d('show', e);
                }),
                (n.requestExpired = function (e) {
                    d('requestExpired', e);
                }),
                (n.pv = function (e) {
                    d('pv', e);
                }),
                (n.nomatch = function (e, n) {
                    f(e, { logtype: 'nomatch', mtPhone: n });
                }),
                (n.log = d),
                (n.addComputeParams = s);
            n.version = '3.0.14';
            var i = null,
                o = { ad: 'ecom_virtual_phone', lp: 'ec_bcp_virtualNum' },
                a = { bcp: 'https://ada.baidu.com/phone-tracker/clicklog', fclick: 'https://fclick.baidu.com/w.gif' },
                u = { show: 'fclick', click: ['bcp', 'fclick'], requestExpired: 'fclick', pv: 'fclick', nomatch: 'fclick', clickStatic: ['bcp', 'fclick'], clickDynamic: 'fclick' },
                c = { clickStatic: 'click', clickDynamic: 'click' };
            function l(e, n, t, r) {
                var i = { logtype: r || 'click' };
                'ad' === e.from && (i.phoneNum = n), 'lp' === e.from && ((i.virtualPhone = n), (i.realPhone = t)), f(e, i);
            }
            function d() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                e && u[e] && ((t.logtype = e), f(n, t));
            }
            function s(e, n) {
                n.timestamp = +new Date();
                var t = e.from || 'lp';
                n.tag = o[t];
                var r = (e.phone || []).map(function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = e.dynamicPhone,
                        t = void 0 === n ? '' : n,
                        r = e.virtualPhone,
                        i = void 0 === r ? '' : r,
                        o = e.realPhone,
                        a = void 0 === o ? '' : o;
                    return t + '_' + i + '_' + a;
                });
                (n.phones = r.join('|')),
                    e.bdVid && (n.bdVid = e.bdVid),
                    e.pvt && (n.duration = +new Date() - e.pvt),
                    'native-smart-app' === e.client && ((n.appName = e.appName), (n.appKey = e.appKey)),
                    e.sourceType && (n.lpFrom = e.sourceType);
            }
            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (i) {
                    var t = {};
                    [
                        'uid',
                        'siteid',
                        'baiduid',
                        'pageid',
                        'kDomain',
                        'fid',
                        'spid',
                        'xst',
                        'ch',
                        'status',
                        'channel',
                        'dpopen',
                        'url',
                        'referrer',
                        'lpType',
                        'sdkType',
                        'sdkVersion',
                        'query',
                        'client',
                        'expired',
                        'solutionId',
                    ].forEach(function (n) {
                        t[n] = e[n];
                    }),
                        r(t, n),
                        s(e, t),
                        (function (e) {
                            var n = e.logtype,
                                t = u[n] || [];
                            'string' == typeof t && (t = [t]),
                                t.forEach(function (t) {
                                    c[n] && (e.logtype = c[n]), i(a[t], e);
                                });
                        })(t);
                }
            }
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }), (n.init = n.LPTYPE = void 0);
            var r = t(5),
                i = (n.LPTYPE = { SMARTLP: 1, AIPAGE: 2, NA: 3, JIMUYU: 4, THIRD: 5, PREVIEW: 6, BAOZHANG: 7, OTHER: 0 }),
                o = [33001, 33002, 33003];
            function a(e) {
                return -1 !== e.indexOf('slp.baidu.com') || -1 !== e.indexOf('sp0.baidu.com/5bgWsjip0QIZ8tyhnq');
            }
            function u(e) {
                return -1 !== e.indexOf('aipage.cn');
            }
            function c(e) {
                return -1 !== e.indexOf('fix=1') && navigator && navigator.userAgent && navigator.userAgent.match(/baiduboxapp\/([\d+.]+)/);
            }
            function l(e) {
                for (
                    var n = ['isite.baidu.com', 'sjh.baidu.com', 'wejianzhan.com', 'sitei.baidu.com', 'shj.baidu.com', 'wjz.baidu.com', 'wzj.baidu.com', 'jzw.baidu.com'], t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (-1 !== e.indexOf(r)) return !0;
                }
            }
            function d(e) {
                for (
                    var n = [
                            'preview-sjh-offline.baidu.com',
                            'preview-sjh-preonline.baidu.com',
                            'preview-sjh.baidu.com',
                            'audit-sjh-offline.baidu.com',
                            'audit-sjh-preonline.baidu.com',
                            'audit-sjh.baidu.com',
                        ],
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (-1 !== e.indexOf(r)) return !0;
                }
            }
            function s(e) {
                return !(-1 !== e.indexOf('baidu.com') || a(e) || u(e) || c(e) || l(e));
            }
            function f(e) {
                return o.indexOf(e) >= 0;
            }
            n.init = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = i.OTHER;
                void 0 !== e.type && (n = e.type);
                var t = location.href;
                a(t) ? (n = i.SMARTLP) : u(t) ? (n = i.AIPAGE) : c(t) ? (n = i.NA) : l(t) ? (n = i.JIMUYU) : s(t) ? (n = i.THIRD) : d(t) && (n = i.PREVIEW),
                    f(e.sourceType) && (n = i.BAOZHANG);
                var o = { lpType: n, url: location.href, referrer: document.referrer };
                (0, r.getQuery)('sdkhost', 'search') && (o.sdkhost = (0, r.getQuery)('sdkhost', 'search'));
                try {
                    if (d(t) || l(t)) {
                        var p = window.location.pathname.split('/').pop(),
                            h = (0, r.getCookie)(p);
                        o.expInfo = h;
                    }
                } catch (e) {
                    console.log(e);
                }
                return n === i.PREVIEW && (o.previewChannel = (0, r.getQuery)('channel', 'search')), o;
            };
        },
        function (e, n, t) {
            'use strict';
            function r(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'search',
                    t = new RegExp('(^|&|\\?)' + e + '=([^&]*)(&|$)'),
                    r = window.location[n].substr(1).match(t);
                return null != r ? unescape(r[2]) : null;
            }
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.getQuery = r),
                (n.getReferrerQuery = function (e) {
                    var n = document.referrer,
                        t = new RegExp('(\\?|&)' + e + '=[^&]*');
                    if (t.test(n)) return n.match(t)[0].split('=')[1];
                }),
                (n.getParam = function (e) {
                    return r(e, 'search') || r(e, 'hash');
                }),
                (n.getCookie = function (e) {
                    var n = new RegExp('(^| )' + e + '=([^;]*)(;|$)'),
                        t = document.cookie.match(n);
                    if (t) return unescape(t[2]);
                    return null;
                });
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.isFromAd = a),
                (n.isChargeUrl = u),
                (n.initAdParams = function (e) {
                    var n = {
                        uid:
                            e.uid ||
                            window.bdDataLayer.uid ||
                            (0, r.getReferrerQuery)('cegduid') ||
                            (0, r.getReferrerQuery)('cegduid', 'search') ||
                            (0, r.getReferrerQuery)('cegduid', 'hash') ||
                            (0, r.getReferrerQuery)('BD_FC_UID'),
                        sid: window.bdDataLayer.sid,
                        baiduid: (0, r.getCookie)('BAIDUID'),
                        dpopen: e.dpopen || window.bdDataLayer.dpopen || (0, r.getReferrerQuery)('dpopen') || 1,
                        bdRank: e.bdRank || (0, r.getReferrerQuery)('bdrank'),
                        kDomain: e.kDomain || c(),
                        channel: e.channel,
                        query: e.query,
                    };
                    e.solutionId && !e.solutionIds && ((n.solutionIds = e.solutionId), delete e.solutionId);
                    e.realPhone && !e.realPhones && (n.realPhones = e.realPhone);
                    if ('lp' === e.from) {
                        n.siteid = n.sid;
                        for (var t = ['fid', 'ch', 'spid', 'xst'], a = 0; a < t.length; a++) {
                            var u = t[a];
                            n[u] = e[u] || (0, r.getParam)(u);
                        }
                        void 0 !== n.channel ||
                            n.kDomain ||
                            (4 === e.lpType && n.ch && n.fid
                                ? (n.channel = (0, i.ch2channel)(n.ch))
                                : e.previewChannel
                                ? (n.channel = e.previewChannel)
                                : 6 === e.lpType
                                ? (n.channel = '5')
                                : (n.channel = '4'));
                    }
                    return (n.fromAd = !!('ad' === e.from || n.kDomain || n.fid || n.spid || n.xst || 4 === e.lpType || 6 === e.lpType || e.lpType === o.LPTYPE.BAOZHANG)), n;
                });
            var r = t(5),
                i = t(0),
                o = t(4);
            function a() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return u(document.referrer);
            }
            function u() {
                return -1 !== (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').indexOf('baidu.php');
            }
            function c() {
                if (!a()) return '';
                var e = document.referrer,
                    n = /url=([^\.]+\.)([^\.]+\.)([^&]+)/,
                    t = /sc\.([^\.]+\.)([^\.]+\.)([^&]+)/;
                return n.test(e) ? n.exec(e)[3] : t.test(e) ? t.exec(e)[3] : void 0;
            }
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }),
                (n.default = function (e, n, t) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    try {
                        var i = function (e) {
                            document.getElementsByTagName('head')[0].removeChild(f), delete window[o], r.onEnd && r.onEnd(n);
                        };
                        if (!e || !n) return;
                        t = t || function () {};
                        var o = 'bcpDynamic',
                            a = 1e7;
                        (o += new Date().getTime() % a), (o += (Math.random() * a).toFixed(0)), (window[o] = t), (n.callback = o);
                        var u = [],
                            c = Object.prototype.toString;
                        for (var l in n) {
                            var d = '',
                                s = void 0;
                            if (('number' == typeof n[l] && (d = 0), '[object Object]' === c.call(n[l]))) {
                                try {
                                    s = JSON.stringify(n[l]);
                                } catch (e) {
                                    s = '{}';
                                }
                                u.push(l + '=' + encodeURIComponent(s));
                            } else u.push(l + '=' + encodeURIComponent(n[l] || d));
                        }
                        delete n.callback, (u = u.join('&')), -1 !== e.indexOf('?') ? (e += '&' + u) : (e += '?' + u);
                        var f = document.createElement('script');
                        f.setAttribute('async', 'true'),
                            f.addEventListener('load', i, !1),
                            f.addEventListener(
                                'error',
                                function (e) {
                                    document.getElementsByTagName('head')[0].removeChild(f), delete window[o], r.onError && r.onError(n);
                                },
                                !1
                            ),
                            document.getElementsByTagName('head')[0].appendChild(f),
                            (f.src = e);
                    } catch (e) {
                        console.error(e);
                    }
                }),
                (n.log = function (e, n) {
                    var t = [];
                    for (var r in n) n.hasOwnProperty(r) && t.push(r + '=' + encodeURIComponent(void 0 === n[r] ? '' : n[r]));
                    t.push('rand=' + new Date().getTime()), (e += '?' + t.join('&'));
                    var i = new Image(),
                        o = 0;
                    (i.onload = i.onerror = i.onabort = function (n) {
                        if ('error' === n.type && o < 2) return o++, void (i.src = e + '&retryCount=' + o);
                        (i.onload = i.onerror = i.onabort = null), (i = null);
                    }),
                        (i.src = e);
                });
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 }), (n.version = void 0);
            var r =
                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e;
                          }
                        : function (e) {
                              return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                          },
                i =
                    Object.assign ||
                    function (e) {
                        for (var n = 1; n < arguments.length; n++) {
                            var t = arguments[n];
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        }
                        return e;
                    };
            (n.init = m),
                (n.getCallNumber = function (e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        t = {};
                    'object' === (void 0 === e ? 'undefined' : r(e)) ? ((t = e).key = t.key || t.uid || t.sid) : ((t.realPhone = e), n || (n = (0, c.getLastUser)()), (t.key = n));
                    var o = (0, c.isClickMode)() || 'click' === t.mode,
                        a = y(t.realPhone, t.key);
                    t.callback && ((a.type = 'show'), t.callback(a));
                    if (o && t.callback)
                        var u = m(
                            i(
                                {
                                    from: t.from || 'lp',
                                    mode: 'click',
                                    requestUtil: h.default,
                                    logUtil: p.log,
                                    sdkType: t.sdkType || 'api',
                                    client: t.client || 'h5',
                                    pageInitFunc: s.init,
                                    adInitFunc: f.initAdParams,
                                },
                                t,
                                {
                                    callback: function () {
                                        var e = y(t.realPhone, u);
                                        1 === e.status && ((e.type = 'click'), t.callback(e));
                                    },
                                }
                            )
                        );
                    return a;
                }),
                (n.getShowCallNumber = y),
                (n.delayTime = function (e, n, t) {
                    var r = (0, c.getData)(e),
                        o = (0, c.getPhone)(e, t);
                    if (o.dynamicPhone && (0, d.isSamePhoneNum)(n, o.dynamicPhone)) {
                        var a = {
                            onResult: function (n) {
                                (0, c.setExpiredTime)(e, t, n.expiredTime, n.hasHeart), (o.hasHeart = n.hasHeart), g(e, o);
                            },
                            onError: function (e) {},
                        };
                        (0, u.delayPhoneTime)(i({}, r, a, { phone: o }), t);
                    }
                }),
                (n.checkHeart = g);
            var o,
                a = t(0),
                u = t(9),
                c = t(1),
                l = t(3),
                d = t(2),
                s = t(4),
                f = t(6),
                p = t(7),
                h = (o = p) && o.__esModule ? o : { default: o };
            var v = (n.version = '3.0.14');
            function m() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = e.pageInitFunc ? e.pageInitFunc(e) : {},
                    t = e.adInitFunc ? e.adInitFunc(i({}, e, n)) : {},
                    r = (0, a.createId)(),
                    o = i({}, e, n, t, { pageid: r });
                if (((o.key = (0, c.generateKeyForStore)(o)), (o.sdkVersion = v), (0, u.init)(o), (0, l.init)(o), o.fromAd && o.key)) {
                    var d = (0, c.getData)(o.key);
                    return d && d.status
                        ? (setTimeout(function () {
                              e.callback && e.callback();
                          }, 10),
                          o.key)
                        : ((0, c.init)(o),
                          (0, l.pv)(o),
                          (function (e, n) {
                              var t = e.key,
                                  r = (0, c.getData)(t),
                                  o = {
                                      onResult: function (n) {
                                          if (((0, c.setPhone)(n, t), e.replaceFunc)) e.replaceFunc(e);
                                          else {
                                              var i = !1;
                                              Array.isArray(n) && n[0] && (n[0].virtualPhone || n[0].dynamicPhone) ? (i = !0) : (n.virtualPhone || n.dynamicPhone) && (i = !0),
                                                  i && (g(t), (0, l.show)(r), e.callback && e.callback());
                                          }
                                      },
                                      onError: function (e) {},
                                  };
                              (0, u.loadPhoneNumber)(i({}, r, o, { mode: n }));
                          })(o, e.mode || 'show'),
                          o.key);
                }
            }
            function y(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
                    t = (0, c.getPhone)(n, e) || {},
                    r = (n.indexOf('click'), {});
                if ((t || (r = { status: 4, virtualPhone: e, realPhone: null }), n && (t.dynamicPhone || t.virtualPhone)))
                    if ('ad' === t.datafrom || (0, d.isSamePhoneNum)(e, t.realPhone))
                        if (t.dynamicPhone) {
                            new Date();
                            (0, c.checkExpired)(t)
                                ? ((0, c.setValue)(n, 'expired', 1),
                                  (r = { status: 0, virtualPhone: t.virtualPhone ? (0, d.remove86)(t.virtualPhone) : e, realPhone: e, key: t.datakey }))
                                : (r = {
                                      status: 1,
                                      virtualPhone: (0, d.remove86)(t.dynamicPhone),
                                      realPhone: e,
                                      time: t.time,
                                      expiredTime: t.expiredTime,
                                      backPhone: t.virtualPhone ? (0, d.remove86)(t.virtualPhone) : e,
                                      key: t.datakey,
                                  });
                        } else t.virtualPhone && (r = { status: 0, virtualPhone: (0, d.remove86)(t.virtualPhone), realPhone: e, key: t.datakey });
                    else r = { status: 3, virtualPhone: e, realPhone: null, key: t.datakey };
                else r = { status: 2, virtualPhone: e, realPhone: null, key: t.datakey };
                return (
                    (r.pageid = t.datapageid),
                    t.datapvt && (r.duration = +new Date() - t.datapvt),
                    0 !== r.status && 1 !== r.status && r.key && (r.status = 0),
                    (0 !== r.status && 1 !== r.status) || (r.success = !0),
                    !r.virtualPhone && e && (r.virtualPhone = e),
                    r
                );
            }
            function g(e, n) {
                var t = (0, c.getData)(e);
                (n ? [n] : t.phone || []).forEach(function (n) {
                    var r = n.dynamicPhone,
                        o = n.hasHeart,
                        a = n.heartHandle,
                        l = n.time,
                        d = n.expiredTime,
                        s = n.heartLeftTime,
                        f = void 0 === s ? 10 : s,
                        p = n.heartClickLeftTime,
                        h = void 0 === p ? 5 : p,
                        v = n.needHeart;
                    if (r && o && !1 !== v) {
                        a && (clearTimeout(a), (n.heartHandle = null));
                        var m = +new Date() - l;
                        if (1e3 * (d - h) > m) {
                            var y = 1e3 * (d - f) - m;
                            n.heartHandle = setTimeout(
                                function () {
                                    n.heartHandle = null;
                                    var r = {
                                        onResult: function (t) {
                                            (0, c.setExpiredTime)(e, n.realPhone, t.expiredTime, t.hasHeart), g(e, n);
                                        },
                                        onError: function (e) {},
                                    };
                                    (document && document.visibilityState && 'visible' !== document.visibilityState) || (0, u.startHeart)(i({}, t, { phone: n }, r));
                                },
                                y > 0 ? y : 0
                            );
                        }
                    } else a && (clearTimeout(a), (t.heartHandle = null));
                });
            }
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 });
            var r =
                Object.assign ||
                function (e) {
                    for (var n = 1; n < arguments.length; n++) {
                        var t = arguments[n];
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    }
                    return e;
                };
            (n.loadPhoneNumber = function (e) {
                var n = d(e),
                    t = n.params,
                    o = n.onResult,
                    u = n.onError,
                    s = {
                        onResult: function () {
                            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            (0, i.setStatus)('end', e.key);
                            var t = n.channel,
                                r = n.baiduid;
                            void 0 !== t && (0, i.setValue)(e.key, 'channel', t), r && (0, i.setValue)(e.key, 'baiduid', r), o(n);
                        },
                        onError: function (n) {
                            (0, i.setStatus)('end', e.key), u(n);
                        },
                    };
                if (!c) return;
                (t.mode = e.mode), (t.expInfo = e.expInfo);
                var f = e.realPhones || '',
                    p = f.split('|').map(function (e) {
                        return (0, a.removeSymbol)((0, a.remove86)(e));
                    });
                (f = p.join('|')), c(l + 'getNumber', r({}, t, { realPhones: f }), s.onResult, s), (0, i.setLastUser)(e.key), (0, i.setStatus)('loading', e.key);
            }),
                (n.init = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.requestUtil && (c = e.requestUtil);
                    l = (0, o.sdkHost)(l, e.sdkhost);
                }),
                (n.delayPhoneTime = function (e, n) {
                    var t = d(e) || {},
                        i = t.params,
                        o = t.onResult,
                        a = t.onError;
                    (i.dynamicPhone = e.phone.dynamicPhone),
                        (i.reqMd5 = e.phone.reqMd5),
                        (i.clicklog = 1),
                        (i.ch = e.ch),
                        (i.status = e.status),
                        (i.referrer = e.referrer),
                        (i.lpType = e.lpType),
                        (i.sdkType = e.sdkType),
                        (i.expired = e.expired),
                        (0, u.addComputeParams)(r({}, e, { phone: [e.phone] }), i),
                        (i.rand = i.timestamp),
                        'ad' === e.from && (i.phoneNum = i.dynamicPhone);
                    'lp' === e.from && ((i.virtualPhone = i.dynamicPhone), (i.realPhone = n));
                    c(l + 'delayPhoneTime', i, o, { onResult: o, onError: a });
                }),
                (n.startHeart = function (e) {
                    var n = d(e) || {},
                        t = n.params,
                        r = n.onResult,
                        i = n.onError;
                    (t.dynamicPhone = e.phone.dynamicPhone), (t.reqMd5 = e.phone.reqMd5), c(l + 'startHeart', t, r, { onResult: r, onError: i });
                });
            var i = t(1),
                o = t(0),
                a = t(2),
                u = t(3),
                c = null,
                l = 'https://ada.baidu.com/phone-tracker/';
            function d(e) {
                var n = e.uid,
                    t = e.sid,
                    r = e.baiduid,
                    i = e.channel,
                    o = e.dpopen,
                    a = e.kDomain,
                    u = e.fid,
                    c = e.spid,
                    l = e.query,
                    d = (e.from, e.lpType, e.xst),
                    s = e.sdkVersion,
                    f = e.client;
                return {
                    params: {
                        useridInBase64: n,
                        siteid: t,
                        baiduid: r,
                        channel: i,
                        dpopen: o,
                        query: l,
                        kDomain: a,
                        fid: u,
                        spid: c,
                        xst: d,
                        sdkVersion: s,
                        url: e.url,
                        client: f,
                        pageid: e.pageid,
                        sourceType: e.sourceType,
                        solutionIds: e.solutionIds,
                    },
                    onResult: function () {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = n.errors,
                            r = n.status,
                            i = n.data;
                        200 === r ? e.onResult(i) : e.onError && e.onError(t);
                    },
                    onError: function (n) {
                        e.onError && e.onError(n);
                    },
                };
            }
        },
        function (e, n, t) {
            'use strict';
            Object.defineProperty(n, '__esModule', { value: !0 });
            var r,
                i =
                    Object.assign ||
                    function (e) {
                        for (var n = 1; n < arguments.length; n++) {
                            var t = arguments[n];
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        }
                        return e;
                    },
                o = t(4),
                a = t(6),
                u = t(8),
                c = t(7),
                l = (r = c) && r.__esModule ? r : { default: r },
                d = t(3),
                s = t(1);
            (window.bdDataLayer = window.bdDataLayer || {}),
                (n.default = {
                    init: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        'string' == typeof e && (e = { uid: e });
                        var n = i(
                            { from: 'lp', mode: 'show', requestUtil: l.default, logUtil: c.log, sdkType: 'api', client: 'h5', pageInitFunc: o.init, adInitFunc: a.initAdParams },
                            e
                        );
                        return (0, u.init)(n);
                    },
                    getCallNumber: function () {
                        var e = u.getCallNumber.apply(void 0, arguments);
                        return (
                            (0 !== e.status && 1 !== e.status) ||
                                (1 === e.status
                                    ? ((0, u.delayTime)(e.key, e.virtualPhone, e.realPhone), (0, d.clickDynamic)((0, s.getData)(e.key), e.virtualPhone, e.realPhone))
                                    : (0, d.clickStatic)((0, s.getData)(e.key), e.virtualPhone, e.realPhone)),
                            4 === e.status && (0, d.requestExpired)((0, s.getData)(e.key)),
                            e
                        );
                    },
                    version: u.version,
                });
        },
    ]).default;
});
