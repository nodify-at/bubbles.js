'use strict';

(function() {
    var app = angular.module('tribefire.bubble', []);
    app.directive('tribefireBubble', TribefireBubble);

    TribefireBubble.$inject = ['DataParser', 'BubbleTreeFactory'];
    function TribefireBubble(DataParser, BubbleTreeFactory) {
        return {
            'restrict': 'A',
            'scope'   : {
                'nodeSelected': '=',
                'navigateTo'  : '=',
                'data'        : '=',
                'scaleFactor' : '@',
                'disableNavigationSingleNode': '@',
                'enableDrop'  : '@',
                'enableFlip'  : '@',
                'handleDrop'  : '='
            },
            'link'    : link
        };

        function link(scope, element, attrs) {

            var options = {
                enableDrop: scope.enableDrop,
                handleDrop: scope.handleDrop,
                enableFlip: scope.enableFlip,

                disableNavigationSingleNode: scope.disableNavigationSingleNode,
                scaleFactor: scope.scaleFactor,
                ready: function(nodes) {
                },
                navigateTo: scope.navigateTo,
                onClick: function(node) {
                    if (typeof scope.nodeSelected === 'function') {
                        scope.nodeSelected(node);
                    }

                    node.clickCount = node.clickCount ? node.clickCount + 1 : 1;
                    if (node.detail) {
                        // $('.label.' + node.id).flip();
                    }
                }
            };
            var container = $('.bubbletree').get(0);

            var tree;
            scope.$watch('data', function(oldValue, newValue){
                if (oldValue === newValue) {
                    return;
                }
                if (tree) {
                    return;
                }
                var parsed = DataParser.parse(scope.data);
                tree = BubbleTreeFactory.build(parsed, container, options);
            }, true);
        }
    }
})();
'use strict';

(function() {
    var app = angular.module('tribefire.bubble');
    app.factory('BubbleTreeFactory', BubbleTreeFactory);

    function BubbleTreeFactory() {
        return {
            build: build
        };

        function build(data, container, options) {
            var config          = {};
            config.enableDrop   = options.enableDrop;
            config.handleDrop   = options.handleDrop;
            config.enableFlip   = options.enableFlip;

            config.disableNavigationSingleNode = options.disableNavigationSingleNode;
            config.data         = data;
            config.container    = container;
            config.bubbleType   = 'donut';
            config.scaleFactor  = options.scaleFactor;

            config.ready        = function(node, fromUrlChanged) {
                $('.amount').remove();
                options.ready(data);
            };
            config.navigateTo   = options.navigateTo;
            config.onClick      = options.onClick;

            config.rootPath     = './';
            return new BubbleTree(config);
        }
    }
})();
/*!
 * jQuery Browser Plugin 0.0.8
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 05-07-2015
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], function (b) {
        return a(b)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = a(require("jquery")) : a(window.jQuery)
}(function (a) {
    "use strict";
    function b(a) {
        void 0 === a && (a = window.navigator.userAgent), a = a.toLowerCase();
        var b = /(edge)\/([\w.]+)/.exec(a) || /(opr)[\/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [], c = /(ipad)/.exec(a) || /(ipod)/.exec(a) || /(iphone)/.exec(a) || /(kindle)/.exec(a) || /(silk)/.exec(a) || /(android)/.exec(a) || /(windows phone)/.exec(a) || /(win)/.exec(a) || /(mac)/.exec(a) || /(linux)/.exec(a) || /(cros)/.exec(a) || /(playbook)/.exec(a) || /(bb)/.exec(a) || /(blackberry)/.exec(a) || [], d = {}, e = {
            browser: b[5] || b[3] || b[1] || "",
            version: b[2] || b[4] || "0",
            versionNumber: b[4] || b[2] || "0",
            platform: c[0] || ""
        };
        if (e.browser && (d[e.browser] = !0, d.version = e.version, d.versionNumber = parseInt(e.versionNumber, 10)), e.platform && (d[e.platform] = !0), (d.android || d.bb || d.blackberry || d.ipad || d.iphone || d.ipod || d.kindle || d.playbook || d.silk || d["windows phone"]) && (d.mobile = !0), (d.cros || d.mac || d.linux || d.win) && (d.desktop = !0), (d.chrome || d.opr || d.safari) && (d.webkit = !0), d.rv || d.edge) {
            var f = "msie";
            e.browser = f, d[f] = !0
        }
        if (d.safari && d.blackberry) {
            var g = "blackberry";
            e.browser = g, d[g] = !0
        }
        if (d.safari && d.playbook) {
            var h = "playbook";
            e.browser = h, d[h] = !0
        }
        if (d.bb) {
            var i = "blackberry";
            e.browser = i, d[i] = !0
        }
        if (d.opr) {
            var j = "opera";
            e.browser = j, d[j] = !0
        }
        if (d.safari && d.android) {
            var k = "android";
            e.browser = k, d[k] = !0
        }
        if (d.safari && d.kindle) {
            var l = "kindle";
            e.browser = l, d[l] = !0
        }
        if (d.safari && d.silk) {
            var m = "silk";
            e.browser = m, d[m] = !0
        }
        return d.name = e.browser, d.platform = e.platform, d
    }

    return window.jQBrowser = b(window.navigator.userAgent), window.jQBrowser.uaMatch = b, a && (a.browser = window.jQBrowser), window.jQBrowser
});
/*
 * Raphael 1.5.2 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function () {
    function a() {
        if (a.is(arguments[0], G)) {
            var b = arguments[0], d = bV[m](a, b.splice(0, 3 + a.is(b[0], E))), e = d.set();
            for (var g = 0, h = b[w]; g < h; g++) {
                var i = b[g] || {};
                c[f](i.type) && e[L](d[i.type]().attr(i))
            }
            return e
        }
        return bV[m](a, arguments)
    }

    a.version = "1.5.2";
    var b = /[, ]+/, c = {
        circle: 1,
        rect: 1,
        path: 1,
        ellipse: 1,
        text: 1,
        image: 1
    }, d = /\{(\d+)\}/g, e = "prototype", f = "hasOwnProperty", g = document, h = window, i = {
        was: Object[e][f].call(h, "Raphael"),
        is: h.Raphael
    }, j = function () {
        this.customAttributes = {}
    }, k, l = "appendChild", m = "apply", n = "concat", o = "createTouch" in g, p = "", q = " ", r = String, s = "split", t = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[s](q), u = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
    }, v = "join", w = "length", x = r[e].toLowerCase, y = Math, z = y.max, A = y.min, B = y.abs, C = y.pow, D = y.PI, E = "number", F = "string", G = "array", H = "toString", I = "fill", J = Object[e][H], K = {}, L = "push", M = /^url\(['"]?([^\)]+?)['"]?\)$/i, N = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, O = {
        "NaN": 1,
        Infinity: 1,
        "-Infinity": 1
    }, P = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, Q = y.round, R = "setAttribute", S = parseFloat, T = parseInt, U = " progid:DXImageTransform.Microsoft", V = r[e].toUpperCase, W = {
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        fill: "#fff",
        "fill-opacity": 1,
        font: "10px \"Arial\"",
        "font-family": "\"Arial\"",
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: 0,
        height: 0,
        href: "http://raphaeljs.com/",
        opacity: 1,
        path: "M0,0",
        r: 0,
        rotation: 0,
        rx: 0,
        ry: 0,
        scale: "1 1",
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        "text-anchor": "middle",
        title: "Raphael",
        translation: "0 0",
        width: 0,
        x: 0,
        y: 0
    }, X = {
        along: "along",
        blur: E,
        "clip-rect": "csv",
        cx: E,
        cy: E,
        fill: "colour",
        "fill-opacity": E,
        "font-size": E,
        height: E,
        opacity: E,
        path: "path",
        r: E,
        rotation: "csv",
        rx: E,
        ry: E,
        scale: "csv",
        stroke: "colour",
        "stroke-opacity": E,
        "stroke-width": E,
        translation: "csv",
        width: E,
        x: E,
        y: E
    }, Y = "replace", Z = /^(from|to|\d+%?)$/, $ = /\s*,\s*/, _ = {
        hs: 1,
        rg: 1
    }, ba = /,?([achlmqrstvxz]),?/gi, bb = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, bc = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, bd = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/, be = function (a, b) {
        return a.key - b.key
    };
    a.type = h.SVGAngle || g.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
    if (a.type == "VML") {
        var bf = g.createElement("div"), bg;
        bf.innerHTML = "<v:shape adj=\"1\"/>";
        bg = bf.firstChild;
        bg.style.behavior = "url(#default#VML)";
        if (!(bg && typeof bg.adj == "object"))return a.type = null;
        bf = null
    }
    a.svg = !(a.vml = a.type == "VML");
    j[e] = a[e];
    k = j[e];
    a._id = 0;
    a._oid = 0;
    a.fn = {};
    a.is = function (a, b) {
        b = x.call(b);
        if (b == "finite")return !O[f](+a);
        return b == "null" && a === null || b == typeof a || b == "object" && a === Object(a) || b == "array" && Array.isArray && Array.isArray(a) || J.call(a).slice(8, -1).toLowerCase() == b
    };
    a.angle = function (b, c, d, e, f, g) {
        {
            if (f == null) {
                var h = b - d, i = c - e;
                if (!h && !i)return 0;
                return ((h < 0) * 180 + y.atan(-i / -h) * 180 / D + 360) % 360
            }
            return a.angle(b, c, f, g) - a.angle(d, e, f, g)
        }
    };
    a.rad = function (a) {
        return a % 360 * D / 180
    };
    a.deg = function (a) {
        return a * 180 / D % 360
    };
    a.snapTo = function (b, c, d) {
        d = a.is(d, "finite") ? d : 10;
        if (a.is(b, G)) {
            var e = b.length;
            while (e--)if (B(b[e] - c) <= d)return b[e]
        } else {
            b = +b;
            var f = c % b;
            if (f < d)return c - f;
            if (f > b - d)return c - f + b
        }
        return c
    };
    function bh() {
        var a = [], b = 0;
        for (; b < 32; b++)a[b] = (~(~(y.random() * 16)))[H](16);
        a[12] = 4;
        a[16] = (a[16] & 3 | 8)[H](16);
        return "r-" + a[v]("")
    }

    a.setWindow = function (a) {
        h = a;
        g = h.document
    };
    var bi = function (b) {
        if (a.vml) {
            var c = /^\s+|\s+$/g, d;
            try {
                var e = new ActiveXObject("htmlfile");
                e.write("<body>");
                e.close();
                d = e.body
            } catch (a) {
                d = createPopup().document.body
            }
            var f = d.createTextRange();
            bi = bm(function (a) {
                try {
                    d.style.color = r(a)[Y](c, p);
                    var b = f.queryCommandValue("ForeColor");
                    b = (b & 255) << 16 | b & 65280 | (b & 16711680) >>> 16;
                    return "#" + ("000000" + b[H](16)).slice(-6)
                } catch (a) {
                    return "none"
                }
            })
        } else {
            var h = g.createElement("i");
            h.title = "Raphaël Colour Picker";
            h.style.display = "none";
            g.body[l](h);
            bi = bm(function (a) {
                h.style.color = a;
                return g.defaultView.getComputedStyle(h, p).getPropertyValue("color")
            })
        }
        return bi(b)
    }, bj = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")"
    }, bk = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")"
    }, bl = function () {
        return this.hex
    };
    a.hsb2rgb = function (b, c, d, e) {
        if (a.is(b, "object") && "h" in b && "s" in b && "b" in b) {
            d = b.b;
            c = b.s;
            b = b.h;
            e = b.o
        }
        return a.hsl2rgb(b, c, d / 2, e)
    };
    a.hsl2rgb = function (b, c, d, e) {
        if (a.is(b, "object") && "h" in b && "s" in b && "l" in b) {
            d = b.l;
            c = b.s;
            b = b.h
        }
        if (b > 1 || c > 1 || d > 1) {
            b /= 360;
            c /= 100;
            d /= 100
        }
        var f = {}, g = ["r", "g", "b"], h, i, j, k, l, m;
        if (c) {
            d < 0.5 ? h = d * (1 + c) : h = d + c - d * c;
            i = 2 * d - h;
            for (var n = 0; n < 3; n++) {
                j = b + 1 / 3 * -(n - 1);
                j < 0 && j++;
                j > 1 && j--;
                j * 6 < 1 ? f[g[n]] = i + (h - i) * 6 * j : j * 2 < 1 ? f[g[n]] = h : j * 3 < 2 ? f[g[n]] = i + (h - i) * (2 / 3 - j) * 6 : f[g[n]] = i
            }
        } else f = {r: d, g: d, b: d};
        f.r *= 255;
        f.g *= 255;
        f.b *= 255;
        f.hex = "#" + (16777216 | f.b | f.g << 8 | f.r << 16).toString(16).slice(1);
        a.is(e, "finite") && (f.opacity = e);
        f.toString = bl;
        return f
    };
    a.rgb2hsb = function (b, c, d) {
        if (c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
            d = b.b;
            c = b.g;
            b = b.r
        }
        if (c == null && a.is(b, F)) {
            var e = a.getRGB(b);
            b = e.r;
            c = e.g;
            d = e.b
        }
        if (b > 1 || c > 1 || d > 1) {
            b /= 255;
            c /= 255;
            d /= 255
        }
        var f = z(b, c, d), g = A(b, c, d), h, i, j = f;
        {
            if (g == f)return {h: 0, s: 0, b: f, toString: bj};
            var k = f - g;
            i = k / f;
            b == f ? h = (c - d) / k : c == f ? h = 2 + (d - b) / k : h = 4 + (b - c) / k;
            h /= 6;
            h < 0 && h++;
            h > 1 && h--
        }
        return {h: h, s: i, b: j, toString: bj}
    };
    a.rgb2hsl = function (b, c, d) {
        if (c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
            d = b.b;
            c = b.g;
            b = b.r
        }
        if (c == null && a.is(b, F)) {
            var e = a.getRGB(b);
            b = e.r;
            c = e.g;
            d = e.b
        }
        if (b > 1 || c > 1 || d > 1) {
            b /= 255;
            c /= 255;
            d /= 255
        }
        var f = z(b, c, d), g = A(b, c, d), h, i, j = (f + g) / 2, k;
        if (g == f)k = {h: 0, s: 0, l: j}; else {
            var l = f - g;
            i = j < 0.5 ? l / (f + g) : l / (2 - f - g);
            b == f ? h = (c - d) / l : c == f ? h = 2 + (d - b) / l : h = 4 + (b - c) / l;
            h /= 6;
            h < 0 && h++;
            h > 1 && h--;
            k = {h: h, s: i, l: j}
        }
        k.toString = bk;
        return k
    };
    a._path2string = function () {
        return this.join(",")[Y](ba, "$1")
    };
    function bm(a, b, c) {
        function d() {
            var g = Array[e].slice.call(arguments, 0), h = g[v]("►"), i = d.cache = d.cache || {}, j = d.count = d.count || [];
            if (i[f](h))return c ? c(i[h]) : i[h];
            j[w] >= 1000 && delete i[j.shift()];
            j[L](h);
            i[h] = a[m](b, g);
            return c ? c(i[h]) : i[h]
        }

        return d
    }

    a.getRGB = bm(function (b) {
        if (!b || !(!((b = r(b)).indexOf("-") + 1)))return {r: -1, g: -1, b: -1, hex: "none", error: 1};
        if (b == "none")return {r: -1, g: -1, b: -1, hex: "none"};
        !(_[f](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = bi(b));
        var c, d, e, g, h, i, j, k = b.match(N);
        if (k) {
            if (k[2]) {
                g = T(k[2].substring(5), 16);
                e = T(k[2].substring(3, 5), 16);
                d = T(k[2].substring(1, 3), 16)
            }
            if (k[3]) {
                g = T((i = k[3].charAt(3)) + i, 16);
                e = T((i = k[3].charAt(2)) + i, 16);
                d = T((i = k[3].charAt(1)) + i, 16)
            }
            if (k[4]) {
                j = k[4][s]($);
                d = S(j[0]);
                j[0].slice(-1) == "%" && (d *= 2.55);
                e = S(j[1]);
                j[1].slice(-1) == "%" && (e *= 2.55);
                g = S(j[2]);
                j[2].slice(-1) == "%" && (g *= 2.55);
                k[1].toLowerCase().slice(0, 4) == "rgba" && (h = S(j[3]));
                j[3] && j[3].slice(-1) == "%" && (h /= 100)
            }
            if (k[5]) {
                j = k[5][s]($);
                d = S(j[0]);
                j[0].slice(-1) == "%" && (d *= 2.55);
                e = S(j[1]);
                j[1].slice(-1) == "%" && (e *= 2.55);
                g = S(j[2]);
                j[2].slice(-1) == "%" && (g *= 2.55);
                (j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
                k[1].toLowerCase().slice(0, 4) == "hsba" && (h = S(j[3]));
                j[3] && j[3].slice(-1) == "%" && (h /= 100);
                return a.hsb2rgb(d, e, g, h)
            }
            if (k[6]) {
                j = k[6][s]($);
                d = S(j[0]);
                j[0].slice(-1) == "%" && (d *= 2.55);
                e = S(j[1]);
                j[1].slice(-1) == "%" && (e *= 2.55);
                g = S(j[2]);
                j[2].slice(-1) == "%" && (g *= 2.55);
                (j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
                k[1].toLowerCase().slice(0, 4) == "hsla" && (h = S(j[3]));
                j[3] && j[3].slice(-1) == "%" && (h /= 100);
                return a.hsl2rgb(d, e, g, h)
            }
            k = {r: d, g: e, b: g};
            k.hex = "#" + (16777216 | g | e << 8 | d << 16).toString(16).slice(1);
            a.is(h, "finite") && (k.opacity = h);
            return k
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1}
    }, a);
    a.getColor = function (a) {
        var b = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: a || 0.75
            }, c = this.hsb2rgb(b.h, b.s, b.b);
        b.h += 0.075;
        if (b.h > 1) {
            b.h = 0;
            b.s -= 0.2;
            b.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: b.b})
        }
        return c.hex
    };
    a.getColor.reset = function () {
        delete this.start
    };
    a.parsePathString = bm(function (b) {
        if (!b)return null;
        var c = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0}, d = [];
        a.is(b, G) && a.is(b[0], G) && (d = bo(b));
        d[w] || r(b)[Y](bb, function (a, b, e) {
            var f = [], g = x.call(b);
            e[Y](bc, function (a, b) {
                b && f[L](+b)
            });
            if (g == "m" && f[w] > 2) {
                d[L]([b][n](f.splice(0, 2)));
                g = "l";
                b = b == "m" ? "l" : "L"
            }
            while (f[w] >= c[g]) {
                d[L]([b][n](f.splice(0, c[g])));
                if (!c[g])break
            }
        });
        d[H] = a._path2string;
        return d
    });
    a.findDotsAtSegment = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i, k = C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g, l = C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h, m = a + 2 * i * (c - a) + i * i * (e - 2 * c + a), n = b + 2 * i * (d - b) + i * i * (f - 2 * d + b), o = c + 2 * i * (e - c) + i * i * (g - 2 * e + c), p = d + 2 * i * (f - d) + i * i * (h - 2 * f + d), q = (1 - i) * a + i * c, r = (1 - i) * b + i * d, s = (1 - i) * e + i * g, t = (1 - i) * f + i * h, u = 90 - y.atan((m - o) / (n - p)) * 180 / D;
        (m > o || n < p) && (u += 180);
        return {x: k, y: l, m: {x: m, y: n}, n: {x: o, y: p}, start: {x: q, y: r}, end: {x: s, y: t}, alpha: u}
    };
    var bn = bm(function (a) {
        if (!a)return {x: 0, y: 0, width: 0, height: 0};
        a = bw(a);
        var b = 0, c = 0, d = [], e = [], f;
        for (var g = 0, h = a[w]; g < h; g++) {
            f = a[g];
            if (f[0] == "M") {
                b = f[1];
                c = f[2];
                d[L](b);
                e[L](c)
            } else {
                var i = bv(b, c, f[1], f[2], f[3], f[4], f[5], f[6]);
                d = d[n](i.min.x, i.max.x);
                e = e[n](i.min.y, i.max.y);
                b = f[5];
                c = f[6]
            }
        }
        var j = A[m](0, d), k = A[m](0, e);
        return {x: j, y: k, width: z[m](0, d) - j, height: z[m](0, e) - k}
    }), bo = function (b) {
        var c = [];
        if (!a.is(b, G) || !a.is(b && b[0], G))b = a.parsePathString(b);
        for (var d = 0, e = b[w]; d < e; d++) {
            c[d] = [];
            for (var f = 0, g = b[d][w]; f < g; f++)c[d][f] = b[d][f]
        }
        c[H] = a._path2string;
        return c
    }, bp = bm(function (b) {
        if (!a.is(b, G) || !a.is(b && b[0], G))b = a.parsePathString(b);
        var c = [], d = 0, e = 0, f = 0, g = 0, h = 0;
        if (b[0][0] == "M") {
            d = b[0][1];
            e = b[0][2];
            f = d;
            g = e;
            h++;
            c[L](["M", d, e])
        }
        for (var i = h, j = b[w]; i < j; i++) {
            var k = c[i] = [], l = b[i];
            if (l[0] != x.call(l[0])) {
                k[0] = x.call(l[0]);
                switch (k[0]) {
                    case"a":
                        k[1] = l[1];
                        k[2] = l[2];
                        k[3] = l[3];
                        k[4] = l[4];
                        k[5] = l[5];
                        k[6] = +(l[6] - d).toFixed(3);
                        k[7] = +(l[7] - e).toFixed(3);
                        break;
                    case"v":
                        k[1] = +(l[1] - e).toFixed(3);
                        break;
                    case"m":
                        f = l[1];
                        g = l[2];
                    default:
                        for (var m = 1, n = l[w]; m < n; m++)k[m] = +(l[m] - (m % 2 ? d : e)).toFixed(3)
                }
            } else {
                k = c[i] = [];
                if (l[0] == "m") {
                    f = l[1] + d;
                    g = l[2] + e
                }
                for (var o = 0, p = l[w]; o < p; o++)c[i][o] = l[o]
            }
            var q = c[i][w];
            switch (c[i][0]) {
                case"z":
                    d = f;
                    e = g;
                    break;
                case"h":
                    d += +c[i][q - 1];
                    break;
                case"v":
                    e += +c[i][q - 1];
                    break;
                default:
                    d += +c[i][q - 2];
                    e += +c[i][q - 1]
            }
        }
        c[H] = a._path2string;
        return c
    }, 0, bo), bq = bm(function (b) {
        if (!a.is(b, G) || !a.is(b && b[0], G))b = a.parsePathString(b);
        var c = [], d = 0, e = 0, f = 0, g = 0, h = 0;
        if (b[0][0] == "M") {
            d = +b[0][1];
            e = +b[0][2];
            f = d;
            g = e;
            h++;
            c[0] = ["M", d, e]
        }
        for (var i = h, j = b[w]; i < j; i++) {
            var k = c[i] = [], l = b[i];
            if (l[0] != V.call(l[0])) {
                k[0] = V.call(l[0]);
                switch (k[0]) {
                    case"A":
                        k[1] = l[1];
                        k[2] = l[2];
                        k[3] = l[3];
                        k[4] = l[4];
                        k[5] = l[5];
                        k[6] = +(l[6] + d);
                        k[7] = +(l[7] + e);
                        break;
                    case"V":
                        k[1] = +l[1] + e;
                        break;
                    case"H":
                        k[1] = +l[1] + d;
                        break;
                    case"M":
                        f = +l[1] + d;
                        g = +l[2] + e;
                    default:
                        for (var m = 1, n = l[w]; m < n; m++)k[m] = +l[m] + (m % 2 ? d : e)
                }
            } else for (var o = 0, p = l[w]; o < p; o++)c[i][o] = l[o];
            switch (k[0]) {
                case"Z":
                    d = f;
                    e = g;
                    break;
                case"H":
                    d = k[1];
                    break;
                case"V":
                    e = k[1];
                    break;
                case"M":
                    f = c[i][c[i][w] - 2];
                    g = c[i][c[i][w] - 1];
                default:
                    d = c[i][c[i][w] - 2];
                    e = c[i][c[i][w] - 1]
            }
        }
        c[H] = a._path2string;
        return c
    }, null, bo), br = function (a, b, c, d) {
        return [a, b, c, d, c, d]
    }, bs = function (a, b, c, d, e, f) {
        var g = 1 / 3, h = 2 / 3;
        return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
    }, bt = function (a, b, c, d, e, f, g, h, i, j) {
        var k = D * 120 / 180, l = D / 180 * (+e || 0), m = [], o, p = bm(function (a, b, c) {
            var d = a * y.cos(c) - b * y.sin(c), e = a * y.sin(c) + b * y.cos(c);
            return {x: d, y: e}
        });
        if (j) {
            G = j[0];
            H = j[1];
            E = j[2];
            F = j[3]
        } else {
            o = p(a, b, -l);
            a = o.x;
            b = o.y;
            o = p(h, i, -l);
            h = o.x;
            i = o.y;
            var q = y.cos(D / 180 * e), r = y.sin(D / 180 * e), t = (a - h) / 2, u = (b - i) / 2, x = t * t / (c * c) + u * u / (d * d);
            if (x > 1) {
                x = y.sqrt(x);
                c = x * c;
                d = x * d
            }
            var z = c * c, A = d * d, C = (f == g ? -1 : 1) * y.sqrt(B((z * A - z * u * u - A * t * t) / (z * u * u + A * t * t))), E = C * c * u / d + (a + h) / 2, F = C * -d * t / c + (b + i) / 2, G = y.asin(((b - F) / d).toFixed(9)), H = y.asin(((i - F) / d).toFixed(9));
            G = a < E ? D - G : G;
            H = h < E ? D - H : H;
            G < 0 && (G = D * 2 + G);
            H < 0 && (H = D * 2 + H);
            g && G > H && (G = G - D * 2);
            !g && H > G && (H = H - D * 2)
        }
        var I = H - G;
        if (B(I) > k) {
            var J = H, K = h, L = i;
            H = G + k * (g && H > G ? 1 : -1);
            h = E + c * y.cos(H);
            i = F + d * y.sin(H);
            m = bt(h, i, c, d, e, 0, g, K, L, [H, J, E, F])
        }
        I = H - G;
        var M = y.cos(G), N = y.sin(G), O = y.cos(H), P = y.sin(H), Q = y.tan(I / 4), R = 4 / 3 * c * Q, S = 4 / 3 * d * Q, T = [a, b], U = [a + R * N, b - S * M], V = [h + R * P, i - S * O], W = [h, i];
        U[0] = 2 * T[0] - U[0];
        U[1] = 2 * T[1] - U[1];
        {
            if (j)return [U, V, W][n](m);
            m = [U, V, W][n](m)[v]()[s](",");
            var X = [];
            for (var Y = 0, Z = m[w]; Y < Z; Y++)X[Y] = Y % 2 ? p(m[Y - 1], m[Y], l).y : p(m[Y], m[Y + 1], l).x;
            return X
        }
    }, bu = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i;
        return {
            x: C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g,
            y: C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h
        }
    }, bv = bm(function (a, b, c, d, e, f, g, h) {
        var i = e - 2 * c + a - (g - 2 * e + c), j = 2 * (c - a) - 2 * (e - c), k = a - c, l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i, n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i, o = [b, h], p = [a, g], q;
        B(l) > "1e12" && (l = 0.5);
        B(n) > "1e12" && (n = 0.5);
        if (l > 0 && l < 1) {
            q = bu(a, b, c, d, e, f, g, h, l);
            p[L](q.x);
            o[L](q.y)
        }
        if (n > 0 && n < 1) {
            q = bu(a, b, c, d, e, f, g, h, n);
            p[L](q.x);
            o[L](q.y)
        }
        i = f - 2 * d + b - (h - 2 * f + d);
        j = 2 * (d - b) - 2 * (f - d);
        k = b - d;
        l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i;
        n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i;
        B(l) > "1e12" && (l = 0.5);
        B(n) > "1e12" && (n = 0.5);
        if (l > 0 && l < 1) {
            q = bu(a, b, c, d, e, f, g, h, l);
            p[L](q.x);
            o[L](q.y)
        }
        if (n > 0 && n < 1) {
            q = bu(a, b, c, d, e, f, g, h, n);
            p[L](q.x);
            o[L](q.y)
        }
        return {min: {x: A[m](0, p), y: A[m](0, o)}, max: {x: z[m](0, p), y: z[m](0, o)}}
    }), bw = bm(function (a, b) {
        var c = bq(a), d = b && bq(b), e = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, f = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
        }, g = function (a, b) {
            var c, d;
            if (!a)return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
            !(a[0] in {T: 1, Q: 1}) && (b.qx = b.qy = null);
            switch (a[0]) {
                case"M":
                    b.X = a[1];
                    b.Y = a[2];
                    break;
                case"A":
                    a = ["C"][n](bt[m](0, [b.x, b.y][n](a.slice(1))));
                    break;
                case"S":
                    c = b.x + (b.x - (b.bx || b.x));
                    d = b.y + (b.y - (b.by || b.y));
                    a = ["C", c, d][n](a.slice(1));
                    break;
                case"T":
                    b.qx = b.x + (b.x - (b.qx || b.x));
                    b.qy = b.y + (b.y - (b.qy || b.y));
                    a = ["C"][n](bs(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                    break;
                case"Q":
                    b.qx = a[1];
                    b.qy = a[2];
                    a = ["C"][n](bs(b.x, b.y, a[1], a[2], a[3], a[4]));
                    break;
                case"L":
                    a = ["C"][n](br(b.x, b.y, a[1], a[2]));
                    break;
                case"H":
                    a = ["C"][n](br(b.x, b.y, a[1], b.y));
                    break;
                case"V":
                    a = ["C"][n](br(b.x, b.y, b.x, a[1]));
                    break;
                case"Z":
                    a = ["C"][n](br(b.x, b.y, b.X, b.Y));
                    break
            }
            return a
        }, h = function (a, b) {
            if (a[b][w] > 7) {
                a[b].shift();
                var e = a[b];
                while (e[w])a.splice(b++, 0, ["C"][n](e.splice(0, 6)));
                a.splice(b, 1);
                k = z(c[w], d && d[w] || 0)
            }
        }, i = function (a, b, e, f, g) {
            if (a && b && a[g][0] == "M" && b[g][0] != "M") {
                b.splice(g, 0, ["M", f.x, f.y]);
                e.bx = 0;
                e.by = 0;
                e.x = a[g][1];
                e.y = a[g][2];
                k = z(c[w], d && d[w] || 0)
            }
        };
        for (var j = 0, k = z(c[w], d && d[w] || 0); j < k; j++) {
            c[j] = g(c[j], e);
            h(c, j);
            d && (d[j] = g(d[j], f));
            d && h(d, j);
            i(c, d, e, f, j);
            i(d, c, f, e, j);
            var l = c[j], o = d && d[j], p = l[w], q = d && o[w];
            e.x = l[p - 2];
            e.y = l[p - 1];
            e.bx = S(l[p - 4]) || e.x;
            e.by = S(l[p - 3]) || e.y;
            f.bx = d && (S(o[q - 4]) || f.x);
            f.by = d && (S(o[q - 3]) || f.y);
            f.x = d && o[q - 2];
            f.y = d && o[q - 1]
        }
        return d ? [c, d] : c
    }, null, bo), bx = bm(function (b) {
        var c = [];
        for (var d = 0, e = b[w]; d < e; d++) {
            var f = {}, g = b[d].match(/^([^:]*):?([\d\.]*)/);
            f.color = a.getRGB(g[1]);
            if (f.color.error)return null;
            f.color = f.color.hex;
            g[2] && (f.offset = g[2] + "%");
            c[L](f)
        }
        for (d = 1, e = c[w] - 1; d < e; d++) {
            if (!c[d].offset) {
                var h = S(c[d - 1].offset || 0), i = 0;
                for (var j = d + 1; j < e; j++) {
                    if (c[j].offset) {
                        i = c[j].offset;
                        break
                    }
                }
                if (!i) {
                    i = 100;
                    j = e
                }
                i = S(i);
                var k = (i - h) / (j - d + 1);
                for (; d < j; d++) {
                    h += k;
                    c[d].offset = h + "%"
                }
            }
        }
        return c
    }), by = function (b, c, d, e) {
        var f;
        if (a.is(b, F) || a.is(b, "object")) {
            f = a.is(b, F) ? g.getElementById(b) : b;
            if (f.tagName)return c == null ? {
                container: f,
                width: f.style.pixelWidth || f.offsetWidth,
                height: f.style.pixelHeight || f.offsetHeight
            } : {container: f, width: c, height: d}
        } else return {container: 1, x: b, y: c, width: d, height: e}
    }, bz = function (a, b) {
        var c = this;
        for (var d in b) {
            if (b[f](d) && !(d in a))switch (typeof b[d]) {
                case"function":
                    (function (b) {
                        a[d] = a === c ? b : function () {
                            return b[m](c, arguments)
                        }
                    })(b[d]);
                    break;
                case"object":
                    a[d] = a[d] || {};
                    bz.call(this, a[d], b[d]);
                    break;
                default:
                    a[d] = b[d];
                    break
            }
        }
    }, bA = function (a, b) {
        a == b.top && (b.top = a.prev);
        a == b.bottom && (b.bottom = a.next);
        a.next && (a.next.prev = a.prev);
        a.prev && (a.prev.next = a.next)
    }, bB = function (a, b) {
        if (b.top === a)return;
        bA(a, b);
        a.next = null;
        a.prev = b.top;
        b.top.next = a;
        b.top = a
    }, bC = function (a, b) {
        if (b.bottom === a)return;
        bA(a, b);
        a.next = b.bottom;
        a.prev = null;
        b.bottom.prev = a;
        b.bottom = a
    }, bD = function (a, b, c) {
        bA(a, c);
        b == c.top && (c.top = a);
        b.next && (b.next.prev = a);
        a.next = b.next;
        a.prev = b;
        b.next = a
    }, bE = function (a, b, c) {
        bA(a, c);
        b == c.bottom && (c.bottom = a);
        b.prev && (b.prev.next = a);
        a.prev = b.prev;
        b.prev = a;
        a.next = b
    }, bF = function (a) {
        return function () {
            throw new Error("Raphaël: you are calling to method “" + a + "” of removed object")
        }
    };
    a.pathToRelative = bp;
    if (a.svg) {
        k.svgns = "http://www.w3.org/2000/svg";
        k.xlink = "http://www.w3.org/1999/xlink";
        Q = function (a) {
            return +a + (~(~a) === a) * 0.5
        };
        var bG = function (a, b) {
            if (b)for (var c in b)b[f](c) && a[R](c, r(b[c])); else {
                a = g.createElementNS(k.svgns, a);
                a.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
                return a
            }
        };
        a[H] = function () {
            return "Your browser supports SVG.\nYou are running Raphaël " + this.version
        };
        var bH = function (a, b) {
            var c = bG("path");
            b.canvas && b.canvas[l](c);
            var d = new bN(c, b);
            d.type = "path";
            bK(d, {fill: "none", stroke: "#000", path: a});
            return d
        }, bI = function (a, b, c) {
            var d = "linear", e = 0.5, f = 0.5, h = a.style;
            b = r(b)[Y](bd, function (a, b, c) {
                d = "radial";
                if (b && c) {
                    e = S(b);
                    f = S(c);
                    var g = (f > 0.5) * 2 - 1;
                    C(e - 0.5, 2) + C(f - 0.5, 2) > 0.25 && (f = y.sqrt(0.25 - C(e - 0.5, 2)) * g + 0.5) && f != 0.5 && (f = f.toFixed(5) - 0.00001 * g)
                }
                return p
            });
            b = b[s](/\s*\-\s*/);
            if (d == "linear") {
                var i = b.shift();
                i = -S(i);
                if (isNaN(i))return null;
                var j = [0, 0, y.cos(i * D / 180), y.sin(i * D / 180)], k = 1 / (z(B(j[2]), B(j[3])) || 1);
                j[2] *= k;
                j[3] *= k;
                if (j[2] < 0) {
                    j[0] = -j[2];
                    j[2] = 0
                }
                if (j[3] < 0) {
                    j[1] = -j[3];
                    j[3] = 0
                }
            }
            var m = bx(b);
            if (!m)return null;
            var n = a.getAttribute(I);
            n = n.match(/^url\(#(.*)\)$/);
            n && c.defs.removeChild(g.getElementById(n[1]));
            var o = bG(d + "Gradient");
            o.id = bh();
            bG(o, d == "radial" ? {fx: e, fy: f} : {x1: j[0], y1: j[1], x2: j[2], y2: j[3]});
            c.defs[l](o);
            for (var q = 0, t = m[w]; q < t; q++) {
                var u = bG("stop");
                bG(u, {offset: m[q].offset ? m[q].offset : q ? "100%" : "0%", "stop-color": m[q].color || "#fff"});
                o[l](u)
            }
            bG(a, {fill: "url(#" + o.id + ")", opacity: 1, "fill-opacity": 1});
            h.fill = p;
            h.opacity = 1;
            h.fillOpacity = 1;
            return 1
        }, bJ = function (b) {
            var c = b.getBBox();
            bG(b.pattern, {patternTransform: a.format("translate({0},{1})", c.x, c.y)})
        }, bK = function (c, d) {
            var e = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            }, h = c.node, i = c.attrs, j = c.rotate(), k = function (a, b) {
                b = e[x.call(b)];
                if (b) {
                    var c = a.attrs["stroke-width"] || "1", f = ({
                            round: c,
                            square: c,
                            butt: 0
                        })[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0, g = [], i = b[w];
                    while (i--)g[i] = b[i] * c + (i % 2 ? 1 : -1) * f;
                    bG(h, {"stroke-dasharray": g[v](",")})
                }
            };
            d[f]("rotation") && (j = d.rotation);
            var m = r(j)[s](b);
            if (m.length - 1) {
                m[1] = +m[1];
                m[2] = +m[2]
            } else m = null;
            S(j) && c.rotate(0, true);
            for (var n in d) {
                if (d[f](n)) {
                    if (!W[f](n))continue;
                    var o = d[n];
                    i[n] = o;
                    switch (n) {
                        case"blur":
                            c.blur(o);
                            break;
                        case"rotation":
                            c.rotate(o, true);
                            break;
                        case"href":
                        case"title":
                        case"target":
                            var t = h.parentNode;
                            if (x.call(t.tagName) != "a") {
                                var u = bG("a");
                                t.insertBefore(u, h);
                                u[l](h);
                                t = u
                            }
                            n == "target" && o == "blank" ? t.setAttributeNS(c.paper.xlink, "show", "new") : t.setAttributeNS(c.paper.xlink, n, o);
                            break;
                        case"cursor":
                            h.style.cursor = o;
                            break;
                        case"clip-rect":
                            var y = r(o)[s](b);
                            if (y[w] == 4) {
                                c.clip && c.clip.parentNode.parentNode.removeChild(c.clip.parentNode);
                                var z = bG("clipPath"), A = bG("rect");
                                z.id = bh();
                                bG(A, {x: y[0], y: y[1], width: y[2], height: y[3]});
                                z[l](A);
                                c.paper.defs[l](z);
                                bG(h, {"clip-path": "url(#" + z.id + ")"});
                                c.clip = A
                            }
                            if (!o) {
                                var B = g.getElementById(h.getAttribute("clip-path")[Y](/(^url\(#|\)$)/g, p));
                                B && B.parentNode.removeChild(B);
                                bG(h, {"clip-path": p});
                                delete c.clip
                            }
                            break;
                        case"path":
                            c.type == "path" && bG(h, {d: o ? i.path = bq(o) : "M0,0"});
                            break;
                        case"width":
                            h[R](n, o);
                            if (i.fx) {
                                n = "x";
                                o = i.x
                            } else break;
                        case"x":
                            i.fx && (o = -i.x - (i.width || 0));
                        case"rx":
                            if (n == "rx" && c.type == "rect")break;
                        case"cx":
                            m && (n == "x" || n == "cx") && (m[1] += o - i[n]);
                            h[R](n, o);
                            c.pattern && bJ(c);
                            break;
                        case"height":
                            h[R](n, o);
                            if (i.fy) {
                                n = "y";
                                o = i.y
                            } else break;
                        case"y":
                            i.fy && (o = -i.y - (i.height || 0));
                        case"ry":
                            if (n == "ry" && c.type == "rect")break;
                        case"cy":
                            m && (n == "y" || n == "cy") && (m[2] += o - i[n]);
                            h[R](n, o);
                            c.pattern && bJ(c);
                            break;
                        case"r":
                            c.type == "rect" ? bG(h, {rx: o, ry: o}) : h[R](n, o);
                            break;
                        case"src":
                            c.type == "image" && h.setAttributeNS(c.paper.xlink, "href", o);
                            break;
                        case"stroke-width":
                            h.style.strokeWidth = o;
                            h[R](n, o);
                            i["stroke-dasharray"] && k(c, i["stroke-dasharray"]);
                            break;
                        case"stroke-dasharray":
                            k(c, o);
                            break;
                        case"translation":
                            var C = r(o)[s](b);
                            C[0] = +C[0] || 0;
                            C[1] = +C[1] || 0;
                            if (m) {
                                m[1] += C[0];
                                m[2] += C[1]
                            }
                            cz.call(c, C[0], C[1]);
                            break;
                        case"scale":
                            C = r(o)[s](b);
                            c.scale(+C[0] || 1, +C[1] || +C[0] || 1, isNaN(S(C[2])) ? null : +C[2], isNaN(S(C[3])) ? null : +C[3]);
                            break;
                        case I:
                            var D = r(o).match(M);
                            if (D) {
                                z = bG("pattern");
                                var E = bG("image");
                                z.id = bh();
                                bG(z, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                bG(E, {x: 0, y: 0});
                                E.setAttributeNS(c.paper.xlink, "href", D[1]);
                                z[l](E);
                                var F = g.createElement("img");
                                F.style.cssText = "position:absolute;left:-9999em;top-9999em";
                                F.onload = function () {
                                    bG(z, {width: this.offsetWidth, height: this.offsetHeight});
                                    bG(E, {width: this.offsetWidth, height: this.offsetHeight});
                                    g.body.removeChild(this);
                                    c.paper.safari()
                                };
                                g.body[l](F);
                                F.src = D[1];
                                c.paper.defs[l](z);
                                h.style.fill = "url(#" + z.id + ")";
                                bG(h, {fill: "url(#" + z.id + ")"});
                                c.pattern = z;
                                c.pattern && bJ(c);
                                break
                            }
                            var G = a.getRGB(o);
                            if (G.error)if ((({
                                    circle: 1,
                                    ellipse: 1
                                })[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper)) {
                                i.gradient = o;
                                i.fill = "none";
                                break
                            } else {
                                delete d.gradient;
                                delete i.gradient;
                                !a.is(i.opacity, "undefined") && a.is(d.opacity, "undefined") && bG(h, {opacity: i.opacity});
                                !a.is(i["fill-opacity"], "undefined") && a.is(d["fill-opacity"], "undefined") && bG(h, {"fill-opacity": i["fill-opacity"]})
                            }
                            G[f]("opacity") && bG(h, {"fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity});
                        case"stroke":
                            G = a.getRGB(o);
                            h[R](n, G.hex);
                            n == "stroke" && G[f]("opacity") && bG(h, {"stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity});
                            break;
                        case"gradient":
                            (({circle: 1, ellipse: 1})[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper);
                            break;
                        case"opacity":
                            i.gradient && !i[f]("stroke-opacity") && bG(h, {"stroke-opacity": o > 1 ? o / 100 : o});
                        case"fill-opacity":
                            if (i.gradient) {
                                var H = g.getElementById(h.getAttribute(I)[Y](/^url\(#|\)$/g, p));
                                if (H) {
                                    var J = H.getElementsByTagName("stop");
                                    J[J[w] - 1][R]("stop-opacity", o)
                                }
                                break
                            }
                        default:
                            n == "font-size" && (o = T(o, 10) + "px");
                            var K = n[Y](/(\-.)/g, function (a) {
                                return V.call(a.substring(1))
                            });
                            h.style[K] = o;
                            h[R](n, o);
                            break
                    }
                }
            }
            bM(c, d);
            m ? c.rotate(m.join(q)) : S(j) && c.rotate(j, true)
        }, bL = 1.2, bM = function (b, c) {
            if (b.type != "text" || !(c[f]("text") || c[f]("font") || c[f]("font-size") || c[f]("x") || c[f]("y")))return;
            var d = b.attrs, e = b.node, h = e.firstChild ? T(g.defaultView.getComputedStyle(e.firstChild, p).getPropertyValue("font-size"), 10) : 10;
            if (c[f]("text")) {
                d.text = c.text;
                while (e.firstChild)e.removeChild(e.firstChild);
                var i = r(c.text)[s]("\n");
                for (var j = 0, k = i[w]; j < k; j++)if (i[j]) {
                    var m = bG("tspan");
                    j && bG(m, {dy: h * bL, x: d.x});
                    m[l](g.createTextNode(i[j]));
                    e[l](m)
                }
            } else {
                i = e.getElementsByTagName("tspan");
                for (j = 0, k = i[w]; j < k; j++)j && bG(i[j], {dy: h * bL, x: d.x})
            }
            bG(e, {y: d.y});
            var n = b.getBBox(), o = d.y - (n.y + n.height / 2);
            o && a.is(o, "finite") && bG(e, {y: d.y + o})
        }, bN = function (b, c) {
            var d = 0, e = 0;
            this[0] = b;
            this.id = a._oid++;
            this.node = b;
            b.raphael = this;
            this.paper = c;
            this.attrs = this.attrs || {};
            this.transformations = [];
            this._ = {tx: 0, ty: 0, rt: {deg: 0, cx: 0, cy: 0}, sx: 1, sy: 1};
            !c.bottom && (c.bottom = this);
            this.prev = c.top;
            c.top && (c.top.next = this);
            c.top = this;
            this.next = null
        }, bO = bN[e];
        bN[e].rotate = function (c, d, e) {
            if (this.removed)return this;
            if (c == null) {
                if (this._.rt.cx)return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
                return this._.rt.deg
            }
            var f = this.getBBox();
            c = r(c)[s](b);
            if (c[w] - 1) {
                d = S(c[1]);
                e = S(c[2])
            }
            c = S(c[0]);
            d != null && d !== false ? this._.rt.deg = c : this._.rt.deg += c;
            e == null && (d = null);
            this._.rt.cx = d;
            this._.rt.cy = e;
            d = d == null ? f.x + f.width / 2 : d;
            e = e == null ? f.y + f.height / 2 : e;
            if (this._.rt.deg) {
                this.transformations[0] = a.format("rotate({0} {1} {2})", this._.rt.deg, d, e);
                this.clip && bG(this.clip, {transform: a.format("rotate({0} {1} {2})", -this._.rt.deg, d, e)})
            } else {
                this.transformations[0] = p;
                this.clip && bG(this.clip, {transform: p})
            }
            bG(this.node, {transform: this.transformations[v](q)});
            return this
        };
        bN[e].hide = function () {
            !this.removed && (this.node.style.display = "none");
            return this
        };
        bN[e].show = function () {
            !this.removed && (this.node.style.display = "");
            return this
        };
        bN[e].remove = function () {
            if (this.removed)return;
            bA(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            for (var a in this)delete this[a];
            this.removed = true
        };
        bN[e].getBBox = function () {
            if (this.removed)return this;
            if (this.type == "path")return bn(this.attrs.path);
            if (this.node.style.display == "none") {
                this.show();
                var a = true
            }
            var b = {};
            try {
                b = this.node.getBBox()
            } catch (a) {
            } finally {
                b = b || {}
            }
            if (this.type == "text") {
                b = {x: b.x, y: Infinity, width: 0, height: 0};
                for (var c = 0, d = this.node.getNumberOfChars(); c < d; c++) {
                    var e = this.node.getExtentOfChar(c);
                    e.y < b.y && (b.y = e.y);
                    e.y + e.height - b.y > b.height && (b.height = e.y + e.height - b.y);
                    e.x + e.width - b.x > b.width && (b.width = e.x + e.width - b.x)
                }
            }
            a && this.hide();
            return b
        };
        bN[e].attr = function (b, c) {
            if (this.removed)return this;
            if (b == null) {
                var d = {};
                for (var e in this.attrs)this.attrs[f](e) && (d[e] = this.attrs[e]);
                this._.rt.deg && (d.rotation = this.rotate());
                (this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
                d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
                return d
            }
            if (c == null && a.is(b, F)) {
                if (b == "translation")return cz.call(this);
                if (b == "rotation")return this.rotate();
                if (b == "scale")return this.scale();
                if (b == I && this.attrs.fill == "none" && this.attrs.gradient)return this.attrs.gradient;
                return this.attrs[b]
            }
            if (c == null && a.is(b, G)) {
                var g = {};
                for (var h = 0, i = b.length; h < i; h++)g[b[h]] = this.attr(b[h]);
                return g
            }
            if (c != null) {
                var j = {};
                j[b] = c
            } else b != null && a.is(b, "object") && (j = b);
            for (var k in this.paper.customAttributes)if (this.paper.customAttributes[f](k) && j[f](k) && a.is(this.paper.customAttributes[k], "function")) {
                var l = this.paper.customAttributes[k].apply(this, [][n](j[k]));
                this.attrs[k] = j[k];
                for (var m in l)l[f](m) && (j[m] = l[m])
            }
            bK(this, j);
            return this
        };
        bN[e].toFront = function () {
            if (this.removed)return this;
            this.node.parentNode[l](this.node);
            var a = this.paper;
            a.top != this && bB(this, a);
            return this
        };
        bN[e].toBack = function () {
            if (this.removed)return this;
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                bC(this, this.paper);
                var a = this.paper
            }
            return this
        };
        bN[e].insertAfter = function (a) {
            if (this.removed)return this;
            var b = a.node || a[a.length - 1].node;
            b.nextSibling ? b.parentNode.insertBefore(this.node, b.nextSibling) : b.parentNode[l](this.node);
            bD(this, a, this.paper);
            return this
        };
        bN[e].insertBefore = function (a) {
            if (this.removed)return this;
            var b = a.node || a[0].node;
            b.parentNode.insertBefore(this.node, b);
            bE(this, a, this.paper);
            return this
        };
        bN[e].blur = function (a) {
            var b = this;
            if (+a !== 0) {
                var c = bG("filter"), d = bG("feGaussianBlur");
                b.attrs.blur = a;
                c.id = bh();
                bG(d, {stdDeviation: +a || 1.5});
                c.appendChild(d);
                b.paper.defs.appendChild(c);
                b._blur = c;
                bG(b.node, {filter: "url(#" + c.id + ")"})
            } else {
                if (b._blur) {
                    b._blur.parentNode.removeChild(b._blur);
                    delete b._blur;
                    delete b.attrs.blur
                }
                b.node.removeAttribute("filter")
            }
        };
        var bP = function (a, b, c, d) {
            var e = bG("circle");
            a.canvas && a.canvas[l](e);
            var f = new bN(e, a);
            f.attrs = {cx: b, cy: c, r: d, fill: "none", stroke: "#000"};
            f.type = "circle";
            bG(e, f.attrs);
            return f
        }, bQ = function (a, b, c, d, e, f) {
            var g = bG("rect");
            a.canvas && a.canvas[l](g);
            var h = new bN(g, a);
            h.attrs = {
                x: b,
                y: c,
                width: d,
                height: e,
                r: f || 0,
                rx: f || 0,
                ry: f || 0,
                fill: "none",
                stroke: "#000"
            };
            h.type = "rect";
            bG(g, h.attrs);
            return h
        }, bR = function (a, b, c, d, e) {
            var f = bG("ellipse");
            a.canvas && a.canvas[l](f);
            var g = new bN(f, a);
            g.attrs = {cx: b, cy: c, rx: d, ry: e, fill: "none", stroke: "#000"};
            g.type = "ellipse";
            bG(f, g.attrs);
            return g
        }, bS = function (a, b, c, d, e, f) {
            var g = bG("image");
            bG(g, {x: c, y: d, width: e, height: f, preserveAspectRatio: "none"});
            g.setAttributeNS(a.xlink, "href", b);
            a.canvas && a.canvas[l](g);
            var h = new bN(g, a);
            h.attrs = {x: c, y: d, width: e, height: f, src: b};
            h.type = "image";
            return h
        }, bT = function (a, b, c, d) {
            var e = bG("text");
            bG(e, {x: b, y: c, "text-anchor": "middle"});
            a.canvas && a.canvas[l](e);
            var f = new bN(e, a);
            f.attrs = {x: b, y: c, "text-anchor": "middle", text: d, font: W.font, stroke: "none", fill: "#000"};
            f.type = "text";
            bK(f, f.attrs);
            return f
        }, bU = function (a, b) {
            this.width = a || this.width;
            this.height = b || this.height;
            this.canvas[R]("width", this.width);
            this.canvas[R]("height", this.height);
            return this
        }, bV = function () {
            var b = by[m](0, arguments), c = b && b.container, d = b.x, e = b.y, f = b.width, h = b.height;
            if (!c)throw new Error("SVG container not found.");
            var i = bG("svg");
            d = d || 0;
            e = e || 0;
            f = f || 512;
            h = h || 342;
            bG(i, {xmlns: "http://www.w3.org/2000/svg", version: 1.1, width: f, height: h});
            if (c == 1) {
                i.style.cssText = "position:absolute;left:" + d + "px;top:" + e + "px";
                g.body[l](i)
            } else c.firstChild ? c.insertBefore(i, c.firstChild) : c[l](i);
            c = new j;
            c.width = f;
            c.height = h;
            c.canvas = i;
            bz.call(c, c, a.fn);
            c.clear();
            return c
        };
        k.clear = function () {
            var a = this.canvas;
            while (a.firstChild)a.removeChild(a.firstChild);
            this.bottom = this.top = null;
            (this.desc = bG("desc"))[l](g.createTextNode("Created with Raphaël"));
            a[l](this.desc);
            a[l](this.defs = bG("defs"))
        };
        k.remove = function () {
            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var a in this)this[a] = bF(a)
        }
    }
    if (a.vml) {
        var bW = {
            M: "m",
            L: "l",
            C: "c",
            Z: "x",
            m: "t",
            l: "r",
            c: "v",
            z: "x"
        }, bX = /([clmz]),?([^clmz]*)/gi, bY = / progid:\S+Blur\([^\)]+\)/g, bZ = /-?[^,\s-]+/g, b$ = 1000 + q + 1000, b_ = 10, ca = {
            path: 1,
            rect: 1
        }, cb = function (a) {
            var b = /[ahqstv]/ig, c = bq;
            r(a).match(b) && (c = bw);
            b = /[clmz]/g;
            if (c == bq && !r(a).match(b)) {
                var d = r(a)[Y](bX, function (a, b, c) {
                    var d = [], e = x.call(b) == "m", f = bW[b];
                    c[Y](bZ, function (a) {
                        if (e && d[w] == 2) {
                            f += d + bW[b == "m" ? "l" : "L"];
                            d = []
                        }
                        d[L](Q(a * b_))
                    });
                    return f + d
                });
                return d
            }
            var e = c(a), f, g;
            d = [];
            for (var h = 0, i = e[w]; h < i; h++) {
                f = e[h];
                g = x.call(e[h][0]);
                g == "z" && (g = "x");
                for (var j = 1, k = f[w]; j < k; j++)g += Q(f[j] * b_) + (j != k - 1 ? "," : p);
                d[L](g)
            }
            return d[v](q)
        };
        a[H] = function () {
            return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
        };
        bH = function (a, b) {
            var c = cd("group");
            c.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
            c.coordsize = b.coordsize;
            c.coordorigin = b.coordorigin;
            var d = cd("shape"), e = d.style;
            e.width = b.width + "px";
            e.height = b.height + "px";
            d.coordsize = b$;
            d.coordorigin = b.coordorigin;
            c[l](d);
            var f = new bN(d, c, b), g = {fill: "none", stroke: "#000"};
            a && (g.path = a);
            f.type = "path";
            f.path = [];
            f.Path = p;
            bK(f, g);
            b.canvas[l](c);
            return f
        };
        bK = function (c, d) {
            c.attrs = c.attrs || {};
            var e = c.node, h = c.attrs, i = e.style, j, k = (d.x != h.x || d.y != h.y || d.width != h.width || d.height != h.height || d.r != h.r) && c.type == "rect", m = c;
            for (var n in d)d[f](n) && (h[n] = d[n]);
            if (k) {
                h.path = cc(h.x, h.y, h.width, h.height, h.r);
                c.X = h.x;
                c.Y = h.y;
                c.W = h.width;
                c.H = h.height
            }
            d.href && (e.href = d.href);
            d.title && (e.title = d.title);
            d.target && (e.target = d.target);
            d.cursor && (i.cursor = d.cursor);
            "blur" in d && c.blur(d.blur);
            if (d.path && c.type == "path" || k)e.path = cb(h.path);
            d.rotation != null && c.rotate(d.rotation, true);
            if (d.translation) {
                j = r(d.translation)[s](b);
                cz.call(c, j[0], j[1]);
                if (c._.rt.cx != null) {
                    c._.rt.cx += +j[0];
                    c._.rt.cy += +j[1];
                    c.setBox(c.attrs, j[0], j[1])
                }
            }
            if (d.scale) {
                j = r(d.scale)[s](b);
                c.scale(+j[0] || 1, +j[1] || +j[0] || 1, +j[2] || null, +j[3] || null)
            }
            if ("clip-rect" in d) {
                var o = r(d["clip-rect"])[s](b);
                if (o[w] == 4) {
                    o[2] = +o[2] + +o[0];
                    o[3] = +o[3] + +o[1];
                    var q = e.clipRect || g.createElement("div"), t = q.style, u = e.parentNode;
                    t.clip = a.format("rect({1}px {2}px {3}px {0}px)", o);
                    if (!e.clipRect) {
                        t.position = "absolute";
                        t.top = 0;
                        t.left = 0;
                        t.width = c.paper.width + "px";
                        t.height = c.paper.height + "px";
                        u.parentNode.insertBefore(q, u);
                        q[l](u);
                        e.clipRect = q
                    }
                }
                d["clip-rect"] || e.clipRect && (e.clipRect.style.clip = p)
            }
            c.type == "image" && d.src && (e.src = d.src);
            if (c.type == "image" && d.opacity) {
                e.filterOpacity = U + ".Alpha(opacity=" + d.opacity * 100 + ")";
                i.filter = (e.filterMatrix || p) + (e.filterOpacity || p)
            }
            d.font && (i.font = d.font);
            d["font-family"] && (i.fontFamily = "\"" + d["font-family"][s](",")[0][Y](/^['"]+|['"]+$/g, p) + "\"");
            d["font-size"] && (i.fontSize = d["font-size"]);
            d["font-weight"] && (i.fontWeight = d["font-weight"]);
            d["font-style"] && (i.fontStyle = d["font-style"]);
            if (d.opacity != null || d["stroke-width"] != null || d.fill != null || d.stroke != null || d["stroke-width"] != null || d["stroke-opacity"] != null || d["fill-opacity"] != null || d["stroke-dasharray"] != null || d["stroke-miterlimit"] != null || d["stroke-linejoin"] != null || d["stroke-linecap"] != null) {
                e = c.shape || e;
                var v = e.getElementsByTagName(I) && e.getElementsByTagName(I)[0], x = false;
                !v && (x = v = cd(I));
                if ("fill-opacity" in d || "opacity" in d) {
                    var y = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+a.getRGB(d.fill).o + 1 || 2) - 1);
                    y = A(z(y, 0), 1);
                    v.opacity = y
                }
                d.fill && (v.on = true);
                if (v.on == null || d.fill == "none")v.on = false;
                if (v.on && d.fill) {
                    var B = d.fill.match(M);
                    if (B) {
                        v.src = B[1];
                        v.type = "tile"
                    } else {
                        v.color = a.getRGB(d.fill).hex;
                        v.src = p;
                        v.type = "solid";
                        if (a.getRGB(d.fill).error && (m.type in {
                                circle: 1,
                                ellipse: 1
                            } || r(d.fill).charAt() != "r") && bI(m, d.fill)) {
                            h.fill = "none";
                            h.gradient = d.fill
                        }
                    }
                }
                x && e[l](v);
                var C = e.getElementsByTagName("stroke") && e.getElementsByTagName("stroke")[0], D = false;
                !C && (D = C = cd("stroke"));
                if (d.stroke && d.stroke != "none" || d["stroke-width"] || d["stroke-opacity"] != null || d["stroke-dasharray"] || d["stroke-miterlimit"] || d["stroke-linejoin"] || d["stroke-linecap"])C.on = true;
                (d.stroke == "none" || C.on == null || d.stroke == 0 || d["stroke-width"] == 0) && (C.on = false);
                var E = a.getRGB(d.stroke);
                C.on && d.stroke && (C.color = E.hex);
                y = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+E.o + 1 || 2) - 1);
                var F = (S(d["stroke-width"]) || 1) * 0.75;
                y = A(z(y, 0), 1);
                d["stroke-width"] == null && (F = h["stroke-width"]);
                d["stroke-width"] && (C.weight = F);
                F && F < 1 && (y *= F) && (C.weight = 1);
                C.opacity = y;
                d["stroke-linejoin"] && (C.joinstyle = d["stroke-linejoin"] || "miter");
                C.miterlimit = d["stroke-miterlimit"] || 8;
                d["stroke-linecap"] && (C.endcap = d["stroke-linecap"] == "butt" ? "flat" : d["stroke-linecap"] == "square" ? "square" : "round");
                if (d["stroke-dasharray"]) {
                    var G = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    C.dashstyle = G[f](d["stroke-dasharray"]) ? G[d["stroke-dasharray"]] : p
                }
                D && e[l](C)
            }
            if (m.type == "text") {
                i = m.paper.span.style;
                h.font && (i.font = h.font);
                h["font-family"] && (i.fontFamily = h["font-family"]);
                h["font-size"] && (i.fontSize = h["font-size"]);
                h["font-weight"] && (i.fontWeight = h["font-weight"]);
                h["font-style"] && (i.fontStyle = h["font-style"]);
                m.node.string && (m.paper.span.innerHTML = r(m.node.string)[Y](/</g, "&#60;")[Y](/&/g, "&#38;")[Y](/\n/g, "<br>"));
                m.W = h.w = m.paper.span.offsetWidth;
                m.H = h.h = m.paper.span.offsetHeight;
                m.X = h.x;
                m.Y = h.y + Q(m.H / 2);
                switch (h["text-anchor"]) {
                    case"start":
                        m.node.style["v-text-align"] = "left";
                        m.bbx = Q(m.W / 2);
                        break;
                    case"end":
                        m.node.style["v-text-align"] = "right";
                        m.bbx = -Q(m.W / 2);
                        break;
                    default:
                        m.node.style["v-text-align"] = "center";
                        break
                }
            }
        };
        bI = function (a, b) {
            a.attrs = a.attrs || {};
            var c = a.attrs, d, e = "linear", f = ".5 .5";
            a.attrs.gradient = b;
            b = r(b)[Y](bd, function (a, b, c) {
                e = "radial";
                if (b && c) {
                    b = S(b);
                    c = S(c);
                    C(b - 0.5, 2) + C(c - 0.5, 2) > 0.25 && (c = y.sqrt(0.25 - C(b - 0.5, 2)) * ((c > 0.5) * 2 - 1) + 0.5);
                    f = b + q + c
                }
                return p
            });
            b = b[s](/\s*\-\s*/);
            if (e == "linear") {
                var g = b.shift();
                g = -S(g);
                if (isNaN(g))return null
            }
            var h = bx(b);
            if (!h)return null;
            a = a.shape || a.node;
            d = a.getElementsByTagName(I)[0] || cd(I);
            !d.parentNode && a.appendChild(d);
            if (h[w]) {
                d.on = true;
                d.method = "none";
                d.color = h[0].color;
                d.color2 = h[h[w] - 1].color;
                var i = [];
                for (var j = 0, k = h[w]; j < k; j++)h[j].offset && i[L](h[j].offset + q + h[j].color);
                d.colors && (d.colors.value = i[w] ? i[v]() : "0% " + d.color);
                if (e == "radial") {
                    d.type = "gradientradial";
                    d.focus = "100%";
                    d.focussize = f;
                    d.focusposition = f
                } else {
                    d.type = "gradient";
                    d.angle = (270 - g) % 360
                }
            }
            return 1
        };
        bN = function (b, c, d) {
            var e = 0, f = 0, g = 0, h = 1;
            this[0] = b;
            this.id = a._oid++;
            this.node = b;
            b.raphael = this;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.Group = c;
            this.paper = d;
            this._ = {tx: 0, ty: 0, rt: {deg: 0}, sx: 1, sy: 1};
            !d.bottom && (d.bottom = this);
            this.prev = d.top;
            d.top && (d.top.next = this);
            d.top = this;
            this.next = null
        };
        bO = bN[e];
        bO.rotate = function (a, c, d) {
            if (this.removed)return this;
            if (a == null) {
                if (this._.rt.cx)return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
                return this._.rt.deg
            }
            a = r(a)[s](b);
            if (a[w] - 1) {
                c = S(a[1]);
                d = S(a[2])
            }
            a = S(a[0]);
            c != null ? this._.rt.deg = a : this._.rt.deg += a;
            d == null && (c = null);
            this._.rt.cx = c;
            this._.rt.cy = d;
            this.setBox(this.attrs, c, d);
            this.Group.style.rotation = this._.rt.deg;
            return this
        };
        bO.setBox = function (a, b, c) {
            if (this.removed)return this;
            var d = this.Group.style, e = this.shape && this.shape.style || this.node.style;
            a = a || {};
            for (var g in a)a[f](g) && (this.attrs[g] = a[g]);
            b = b || this._.rt.cx;
            c = c || this._.rt.cy;
            var h = this.attrs, i, j, k, l;
            switch (this.type) {
                case"circle":
                    i = h.cx - h.r;
                    j = h.cy - h.r;
                    k = l = h.r * 2;
                    break;
                case"ellipse":
                    i = h.cx - h.rx;
                    j = h.cy - h.ry;
                    k = h.rx * 2;
                    l = h.ry * 2;
                    break;
                case"image":
                    i = +h.x;
                    j = +h.y;
                    k = h.width || 0;
                    l = h.height || 0;
                    break;
                case"text":
                    this.textpath.v = ["m", Q(h.x), ", ", Q(h.y - 2), "l", Q(h.x) + 1, ", ", Q(h.y - 2)][v](p);
                    i = h.x - Q(this.W / 2);
                    j = h.y - this.H / 2;
                    k = this.W;
                    l = this.H;
                    break;
                case"rect":
                case"path":
                    if (this.attrs.path) {
                        var m = bn(this.attrs.path);
                        i = m.x;
                        j = m.y;
                        k = m.width;
                        l = m.height
                    } else {
                        i = 0;
                        j = 0;
                        k = this.paper.width;
                        l = this.paper.height
                    }
                    break;
                default:
                    i = 0;
                    j = 0;
                    k = this.paper.width;
                    l = this.paper.height;
                    break
            }
            b = b == null ? i + k / 2 : b;
            c = c == null ? j + l / 2 : c;
            var n = b - this.paper.width / 2, o = c - this.paper.height / 2, q;
            d.left != (q = n + "px") && (d.left = q);
            d.top != (q = o + "px") && (d.top = q);
            this.X = ca[f](this.type) ? -n : i;
            this.Y = ca[f](this.type) ? -o : j;
            this.W = k;
            this.H = l;
            if (ca[f](this.type)) {
                e.left != (q = -n * b_ + "px") && (e.left = q);
                e.top != (q = -o * b_ + "px") && (e.top = q)
            } else if (this.type == "text") {
                e.left != (q = -n + "px") && (e.left = q);
                e.top != (q = -o + "px") && (e.top = q)
            } else {
                d.width != (q = this.paper.width + "px") && (d.width = q);
                d.height != (q = this.paper.height + "px") && (d.height = q);
                e.left != (q = i - n + "px") && (e.left = q);
                e.top != (q = j - o + "px") && (e.top = q);
                e.width != (q = k + "px") && (e.width = q);
                e.height != (q = l + "px") && (e.height = q)
            }
        };
        bO.hide = function () {
            !this.removed && (this.Group.style.display = "none");
            return this
        };
        bO.show = function () {
            !this.removed && (this.Group.style.display = "block");
            return this
        };
        bO.getBBox = function () {
            if (this.removed)return this;
            if (ca[f](this.type))return bn(this.attrs.path);
            return {x: this.X + (this.bbx || 0), y: this.Y, width: this.W, height: this.H}
        };
        bO.remove = function () {
            if (this.removed)return;
            bA(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            this.Group.parentNode.removeChild(this.Group);
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var a in this)delete this[a];
            this.removed = true
        };
        bO.attr = function (b, c) {
            if (this.removed)return this;
            if (b == null) {
                var d = {};
                for (var e in this.attrs)this.attrs[f](e) && (d[e] = this.attrs[e]);
                this._.rt.deg && (d.rotation = this.rotate());
                (this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
                d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
                return d
            }
            if (c == null && a.is(b, "string")) {
                if (b == "translation")return cz.call(this);
                if (b == "rotation")return this.rotate();
                if (b == "scale")return this.scale();
                if (b == I && this.attrs.fill == "none" && this.attrs.gradient)return this.attrs.gradient;
                return this.attrs[b]
            }
            if (this.attrs && c == null && a.is(b, G)) {
                var g, h = {};
                for (e = 0, g = b[w]; e < g; e++)h[b[e]] = this.attr(b[e]);
                return h
            }
            var i;
            if (c != null) {
                i = {};
                i[b] = c
            }
            c == null && a.is(b, "object") && (i = b);
            if (i) {
                for (var j in this.paper.customAttributes)if (this.paper.customAttributes[f](j) && i[f](j) && a.is(this.paper.customAttributes[j], "function")) {
                    var k = this.paper.customAttributes[j].apply(this, [][n](i[j]));
                    this.attrs[j] = i[j];
                    for (var l in k)k[f](l) && (i[l] = k[l])
                }
                i.text && this.type == "text" && (this.node.string = i.text);
                bK(this, i);
                i.gradient && (({
                    circle: 1,
                    ellipse: 1
                })[f](this.type) || r(i.gradient).charAt() != "r") && bI(this, i.gradient);
                (!ca[f](this.type) || this._.rt.deg) && this.setBox(this.attrs)
            }
            return this
        };
        bO.toFront = function () {
            !this.removed && this.Group.parentNode[l](this.Group);
            this.paper.top != this && bB(this, this.paper);
            return this
        };
        bO.toBack = function () {
            if (this.removed)return this;
            if (this.Group.parentNode.firstChild != this.Group) {
                this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
                bC(this, this.paper)
            }
            return this
        };
        bO.insertAfter = function (a) {
            if (this.removed)return this;
            a.constructor == cC && (a = a[a.length - 1]);
            a.Group.nextSibling ? a.Group.parentNode.insertBefore(this.Group, a.Group.nextSibling) : a.Group.parentNode[l](this.Group);
            bD(this, a, this.paper);
            return this
        };
        bO.insertBefore = function (a) {
            if (this.removed)return this;
            a.constructor == cC && (a = a[0]);
            a.Group.parentNode.insertBefore(this.Group, a.Group);
            bE(this, a, this.paper);
            return this
        };
        bO.blur = function (b) {
            var c = this.node.runtimeStyle, d = c.filter;
            d = d.replace(bY, p);
            if (+b !== 0) {
                this.attrs.blur = b;
                c.filter = d + q + U + ".Blur(pixelradius=" + (+b || 1.5) + ")";
                c.margin = a.format("-{0}px 0 0 -{0}px", Q(+b || 1.5))
            } else {
                c.filter = d;
                c.margin = 0;
                delete this.attrs.blur
            }
        };
        bP = function (a, b, c, d) {
            var e = cd("group"), f = cd("oval"), g = f.style;
            e.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
            e.coordsize = b$;
            e.coordorigin = a.coordorigin;
            e[l](f);
            var h = new bN(f, e, a);
            h.type = "circle";
            bK(h, {stroke: "#000", fill: "none"});
            h.attrs.cx = b;
            h.attrs.cy = c;
            h.attrs.r = d;
            h.setBox({x: b - d, y: c - d, width: d * 2, height: d * 2});
            a.canvas[l](e);
            return h
        };
        function cc(b, c, d, e, f) {
            return f ? a.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", b + f, c, d - f * 2, f, -f, e - f * 2, f * 2 - d, f * 2 - e) : a.format("M{0},{1}l{2},0,0,{3},{4},0z", b, c, d, e, -d)
        }

        bQ = function (a, b, c, d, e, f) {
            var g = cc(b, c, d, e, f), h = a.path(g), i = h.attrs;
            h.X = i.x = b;
            h.Y = i.y = c;
            h.W = i.width = d;
            h.H = i.height = e;
            i.r = f;
            i.path = g;
            h.type = "rect";
            return h
        };
        bR = function (a, b, c, d, e) {
            var f = cd("group"), g = cd("oval"), h = g.style;
            f.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
            f.coordsize = b$;
            f.coordorigin = a.coordorigin;
            f[l](g);
            var i = new bN(g, f, a);
            i.type = "ellipse";
            bK(i, {stroke: "#000"});
            i.attrs.cx = b;
            i.attrs.cy = c;
            i.attrs.rx = d;
            i.attrs.ry = e;
            i.setBox({x: b - d, y: c - e, width: d * 2, height: e * 2});
            a.canvas[l](f);
            return i
        };
        bS = function (a, b, c, d, e, f) {
            var g = cd("group"), h = cd("image");
            g.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
            g.coordsize = b$;
            g.coordorigin = a.coordorigin;
            h.src = b;
            g[l](h);
            var i = new bN(h, g, a);
            i.type = "image";
            i.attrs.src = b;
            i.attrs.x = c;
            i.attrs.y = d;
            i.attrs.w = e;
            i.attrs.h = f;
            i.setBox({x: c, y: d, width: e, height: f});
            a.canvas[l](g);
            return i
        };
        bT = function (b, c, d, e) {
            var f = cd("group"), g = cd("shape"), h = g.style, i = cd("path"), j = i.style, k = cd("textpath");
            f.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
            f.coordsize = b$;
            f.coordorigin = b.coordorigin;
            i.v = a.format("m{0},{1}l{2},{1}", Q(c * 10), Q(d * 10), Q(c * 10) + 1);
            i.textpathok = true;
            h.width = b.width;
            h.height = b.height;
            k.string = r(e);
            k.on = true;
            g[l](k);
            g[l](i);
            f[l](g);
            var m = new bN(k, f, b);
            m.shape = g;
            m.textpath = i;
            m.type = "text";
            m.attrs.text = e;
            m.attrs.x = c;
            m.attrs.y = d;
            m.attrs.w = 1;
            m.attrs.h = 1;
            bK(m, {font: W.font, stroke: "none", fill: "#000"});
            m.setBox();
            b.canvas[l](f);
            return m
        };
        bU = function (a, b) {
            var c = this.canvas.style;
            a == +a && (a += "px");
            b == +b && (b += "px");
            c.width = a;
            c.height = b;
            c.clip = "rect(0 " + a + " " + b + " 0)";
            return this
        };
        var cd;
        g.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !g.namespaces.rvml && g.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            cd = function (a) {
                return g.createElement("<rvml:" + a + " class=\"rvml\">")
            }
        } catch (a) {
            cd = function (a) {
                return g.createElement("<" + a + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"rvml\">")
            }
        }
        bV = function () {
            var b = by[m](0, arguments), c = b.container, d = b.height, e, f = b.width, h = b.x, i = b.y;
            if (!c)throw new Error("VML container not found.");
            var k = new j, n = k.canvas = g.createElement("div"), o = n.style;
            h = h || 0;
            i = i || 0;
            f = f || 512;
            d = d || 342;
            f == +f && (f += "px");
            d == +d && (d += "px");
            k.width = 1000;
            k.height = 1000;
            k.coordsize = b_ * 1000 + q + b_ * 1000;
            k.coordorigin = "0 0";
            k.span = g.createElement("span");
            k.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
            n[l](k.span);
            o.cssText = a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d);
            if (c == 1) {
                g.body[l](n);
                o.left = h + "px";
                o.top = i + "px";
                o.position = "absolute"
            } else c.firstChild ? c.insertBefore(n, c.firstChild) : c[l](n);
            bz.call(k, k, a.fn);
            return k
        };
        k.clear = function () {
            this.canvas.innerHTML = p;
            this.span = g.createElement("span");
            this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
            this.canvas[l](this.span);
            this.bottom = this.top = null
        };
        k.remove = function () {
            this.canvas.parentNode.removeChild(this.canvas);
            for (var a in this)this[a] = bF(a);
            return true
        }
    }
    var ce = navigator.userAgent.match(/Version\\x2f(.*?)\s/);
    navigator.vendor == "Apple Computer, Inc." && (ce && ce[1] < 4 || navigator.platform.slice(0, 2) == "iP") ? k.safari = function () {
        var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
        h.setTimeout(function () {
            a.remove()
        })
    } : k.safari = function () {
    };
    var cf = function () {
        this.returnValue = false
    }, cg = function () {
        return this.originalEvent.preventDefault()
    }, ch = function () {
        this.cancelBubble = true
    }, ci = function () {
        return this.originalEvent.stopPropagation()
    }, cj = (function () {
        {
            if (g.addEventListener)return function (a, b, c, d) {
                var e = o && u[b] ? u[b] : b, g = function (e) {
                    if (o && u[f](b))for (var g = 0, h = e.targetTouches && e.targetTouches.length; g < h; g++) {
                        if (e.targetTouches[g].target == a) {
                            var i = e;
                            e = e.targetTouches[g];
                            e.originalEvent = i;
                            e.preventDefault = cg;
                            e.stopPropagation = ci;
                            break
                        }
                    }
                    return c.call(d, e)
                };
                a.addEventListener(e, g, false);
                return function () {
                    a.removeEventListener(e, g, false);
                    return true
                }
            };
            if (g.attachEvent)return function (a, b, c, d) {
                var e = function (a) {
                    a = a || h.event;
                    a.preventDefault = a.preventDefault || cf;
                    a.stopPropagation = a.stopPropagation || ch;
                    return c.call(d, a)
                };
                a.attachEvent("on" + b, e);
                var f = function () {
                    a.detachEvent("on" + b, e);
                    return true
                };
                return f
            }
        }
    })(), ck = [], cl = function (a) {
        var b = a.clientX, c = a.clientY, d = g.documentElement.scrollTop || g.body.scrollTop, e = g.documentElement.scrollLeft || g.body.scrollLeft, f, h = ck.length;
        while (h--) {
            f = ck[h];
            if (o) {
                var i = a.touches.length, j;
                while (i--) {
                    j = a.touches[i];
                    if (j.identifier == f.el._drag.id) {
                        b = j.clientX;
                        c = j.clientY;
                        (a.originalEvent ? a.originalEvent : a).preventDefault();
                        break
                    }
                }
            } else a.preventDefault();
            b += e;
            c += d;
            f.move && f.move.call(f.move_scope || f.el, b - f.el._drag.x, c - f.el._drag.y, b, c, a)
        }
    }, cm = function (b) {
        a.unmousemove(cl).unmouseup(cm);
        var c = ck.length, d;
        while (c--) {
            d = ck[c];
            d.el._drag = {};
            d.end && d.end.call(d.end_scope || d.start_scope || d.move_scope || d.el, b)
        }
        ck = []
    };
    for (var cn = t[w]; cn--;)(function (b) {
        a[b] = bN[e][b] = function (c, d) {
            if (a.is(c, "function")) {
                this.events = this.events || [];
                this.events.push({name: b, f: c, unbind: cj(this.shape || this.node || g, b, c, d || this)})
            }
            return this
        };
        a["un" + b] = bN[e]["un" + b] = function (a) {
            var c = this.events, d = c[w];
            while (d--)if (c[d].name == b && c[d].f == a) {
                c[d].unbind();
                c.splice(d, 1);
                !c.length && delete this.events;
                return this
            }
            return this
        }
    })(t[cn]);
    bO.hover = function (a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c)
    };
    bO.unhover = function (a, b) {
        return this.unmouseover(a).unmouseout(b)
    };
    bO.drag = function (b, c, d, e, f, h) {
        this._drag = {};
        this.mousedown(function (i) {
            (i.originalEvent || i).preventDefault();
            var j = g.documentElement.scrollTop || g.body.scrollTop, k = g.documentElement.scrollLeft || g.body.scrollLeft;
            this._drag.x = i.clientX + k;
            this._drag.y = i.clientY + j;
            this._drag.id = i.identifier;
            c && c.call(f || e || this, i.clientX + k, i.clientY + j, i);
            !ck.length && a.mousemove(cl).mouseup(cm);
            ck.push({el: this, move: b, end: d, move_scope: e, start_scope: f, end_scope: h})
        });
        return this
    };
    bO.undrag = function (b, c, d) {
        var e = ck.length;
        while (e--)ck[e].el == this && (ck[e].move == b && ck[e].end == d) && ck.splice(e++, 1);
        !ck.length && a.unmousemove(cl).unmouseup(cm)
    };
    k.circle = function (a, b, c) {
        return bP(this, a || 0, b || 0, c || 0)
    };
    k.rect = function (a, b, c, d, e) {
        return bQ(this, a || 0, b || 0, c || 0, d || 0, e || 0)
    };
    k.ellipse = function (a, b, c, d) {
        return bR(this, a || 0, b || 0, c || 0, d || 0)
    };
    k.path = function (b) {
        b && !a.is(b, F) && !a.is(b[0], G) && (b += p);
        return bH(a.format[m](a, arguments), this)
    };
    k.image = function (a, b, c, d, e) {
        return bS(this, a || "about:blank", b || 0, c || 0, d || 0, e || 0)
    };
    k.text = function (a, b, c) {
        return bT(this, a || 0, b || 0, r(c))
    };
    k.set = function (a) {
        arguments[w] > 1 && (a = Array[e].splice.call(arguments, 0, arguments[w]));
        return new cC(a)
    };
    k.setSize = bU;
    k.top = k.bottom = null;
    k.raphael = a;
    function co() {
        return this.x + q + this.y
    }

    bO.resetScale = function () {
        if (this.removed)return this;
        this._.sx = 1;
        this._.sy = 1;
        this.attrs.scale = "1 1"
    };
    bO.scale = function (a, b, c, d) {
        if (this.removed)return this;
        if (a == null && b == null)return {x: this._.sx, y: this._.sy, toString: co};
        b = b || a;
        !(+b) && (b = a);
        var e, f, g, h, i = this.attrs;
        if (a != 0) {
            var j = this.getBBox(), k = j.x + j.width / 2, l = j.y + j.height / 2, m = B(a / this._.sx), o = B(b / this._.sy);
            c = +c || c == 0 ? c : k;
            d = +d || d == 0 ? d : l;
            var r = this._.sx > 0, s = this._.sy > 0, t = ~(~(a / B(a))), u = ~(~(b / B(b))), x = m * t, y = o * u, z = this.node.style, A = c + B(k - c) * x * (k > c == r ? 1 : -1), C = d + B(l - d) * y * (l > d == s ? 1 : -1), D = a * t > b * u ? o : m;
            switch (this.type) {
                case"rect":
                case"image":
                    var E = i.width * m, F = i.height * o;
                    this.attr({height: F, r: i.r * D, width: E, x: A - E / 2, y: C - F / 2});
                    break;
                case"circle":
                case"ellipse":
                    this.attr({rx: i.rx * m, ry: i.ry * o, r: i.r * D, cx: A, cy: C});
                    break;
                case"text":
                    this.attr({x: A, y: C});
                    break;
                case"path":
                    var G = bp(i.path), H = true, I = r ? x : m, J = s ? y : o;
                    for (var K = 0, L = G[w]; K < L; K++) {
                        var M = G[K], N = V.call(M[0]);
                        {
                            if (N == "M" && H)continue;
                            H = false
                        }
                        if (N == "A") {
                            M[G[K][w] - 2] *= I;
                            M[G[K][w] - 1] *= J;
                            M[1] *= m;
                            M[2] *= o;
                            M[5] = +(t + u ? !(!(+M[5])) : !(+M[5]))
                        } else if (N == "H")for (var O = 1, P = M[w]; O < P; O++)M[O] *= I; else if (N == "V")for (O = 1, P = M[w]; O < P; O++)M[O] *= J; else for (O = 1, P = M[w]; O < P; O++)M[O] *= O % 2 ? I : J
                    }
                    var Q = bn(G);
                    e = A - Q.x - Q.width / 2;
                    f = C - Q.y - Q.height / 2;
                    G[0][1] += e;
                    G[0][2] += f;
                    this.attr({path: G});
                    break
            }
            if (this.type in {text: 1, image: 1} && (t != 1 || u != 1))if (this.transformations) {
                this.transformations[2] = "scale("[n](t, ",", u, ")");
                this.node[R]("transform", this.transformations[v](q));
                e = t == -1 ? -i.x - (E || 0) : i.x;
                f = u == -1 ? -i.y - (F || 0) : i.y;
                this.attr({x: e, y: f});
                i.fx = t - 1;
                i.fy = u - 1
            } else {
                this.node.filterMatrix = U + ".Matrix(M11="[n](t, ", M12=0, M21=0, M22=", u, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
                z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
            } else if (this.transformations) {
                this.transformations[2] = p;
                this.node[R]("transform", this.transformations[v](q));
                i.fx = 0;
                i.fy = 0
            } else {
                this.node.filterMatrix = p;
                z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
            }
            i.scale = [a, b, c, d][v](q);
            this._.sx = a;
            this._.sy = b
        }
        return this
    };
    bO.clone = function () {
        if (this.removed)return null;
        var a = this.attr();
        delete a.scale;
        delete a.translation;
        return this.paper[this.type]().attr(a)
    };
    var cp = {}, cq = function (b, c, d, e, f, g, h, i, j) {
        var k = 0, l = 100, m = [b, c, d, e, f, g, h, i].join(), n = cp[m], o, p;
        !n && (cp[m] = n = {data: []});
        n.timer && clearTimeout(n.timer);
        n.timer = setTimeout(function () {
            delete cp[m]
        }, 2000);
        if (j != null) {
            var q = cq(b, c, d, e, f, g, h, i);
            l = ~(~q) * 10
        }
        for (var r = 0; r < l + 1; r++) {
            if (n.data[j] > r)p = n.data[r * l]; else {
                p = a.findDotsAtSegment(b, c, d, e, f, g, h, i, r / l);
                n.data[r] = p
            }
            r && (k += C(C(o.x - p.x, 2) + C(o.y - p.y, 2), 0.5));
            if (j != null && k >= j)return p;
            o = p
        }
        if (j == null)return k
    }, cr = function (b, c) {
        return function (d, e, f) {
            d = bw(d);
            var g, h, i, j, k = "", l = {}, m, n = 0;
            for (var o = 0, p = d.length; o < p; o++) {
                i = d[o];
                if (i[0] == "M") {
                    g = +i[1];
                    h = +i[2]
                } else {
                    j = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6]);
                    if (n + j > e) {
                        if (c && !l.start) {
                            m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
                            k += ["C", m.start.x, m.start.y, m.m.x, m.m.y, m.x, m.y];
                            if (f)return k;
                            l.start = k;
                            k = ["M", m.x, m.y + "C", m.n.x, m.n.y, m.end.x, m.end.y, i[5], i[6]][v]();
                            n += j;
                            g = +i[5];
                            h = +i[6];
                            continue
                        }
                        if (!b && !c) {
                            m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
                            return {x: m.x, y: m.y, alpha: m.alpha}
                        }
                    }
                    n += j;
                    g = +i[5];
                    h = +i[6]
                }
                k += i
            }
            l.end = k;
            m = b ? n : c ? l : a.findDotsAtSegment(g, h, i[1], i[2], i[3], i[4], i[5], i[6], 1);
            m.alpha && (m = {x: m.x, y: m.y, alpha: m.alpha});
            return m
        }
    }, cs = cr(1), ct = cr(), cu = cr(0, 1);
    bO.getTotalLength = function () {
        if (this.type != "path")return;
        if (this.node.getTotalLength)return this.node.getTotalLength();
        return cs(this.attrs.path)
    };
    bO.getPointAtLength = function (a) {
        if (this.type != "path")return;
        return ct(this.attrs.path, a)
    };
    bO.getSubpath = function (a, b) {
        if (this.type != "path")return;
        if (B(this.getTotalLength() - b) < "1e-6")return cu(this.attrs.path, a).end;
        var c = cu(this.attrs.path, b, 1);
        return a ? cu(c, a).end : c
    };
    a.easing_formulas = {
        linear: function (a) {
            return a
        }, "<": function (a) {
            return C(a, 3)
        }, ">": function (a) {
            return C(a - 1, 3) + 1
        }, "<>": function (a) {
            a = a * 2;
            if (a < 1)return C(a, 3) / 2;
            a -= 2;
            return (C(a, 3) + 2) / 2
        }, backIn: function (a) {
            var b = 1.70158;
            return a * a * ((b + 1) * a - b)
        }, backOut: function (a) {
            a = a - 1;
            var b = 1.70158;
            return a * a * ((b + 1) * a + b) + 1
        }, elastic: function (a) {
            if (a == 0 || a == 1)return a;
            var b = 0.3, c = b / 4;
            return C(2, -10 * a) * y.sin((a - c) * (2 * D) / b) + 1
        }, bounce: function (a) {
            var b = 7.5625, c = 2.75, d;
            if (a < 1 / c)d = b * a * a; else if (a < 2 / c) {
                a -= 1.5 / c;
                d = b * a * a + 0.75
            } else if (a < 2.5 / c) {
                a -= 2.25 / c;
                d = b * a * a + 0.9375
            } else {
                a -= 2.625 / c;
                d = b * a * a + 0.984375
            }
            return d
        }
    };
    var cv = [], cw = function () {
        var b = +(new Date);
        for (var c = 0; c < cv[w]; c++) {
            var d = cv[c];
            if (d.stop || d.el.removed)continue;
            var e = b - d.start, g = d.ms, h = d.easing, i = d.from, j = d.diff, k = d.to, l = d.t, m = d.el, n = {}, o;
            if (e < g) {
                var r = h(e / g);
                for (var s in i)if (i[f](s)) {
                    switch (X[s]) {
                        case"along":
                            o = r * g * j[s];
                            k.back && (o = k.len - o);
                            var t = ct(k[s], o);
                            m.translate(j.sx - j.x || 0, j.sy - j.y || 0);
                            j.x = t.x;
                            j.y = t.y;
                            m.translate(t.x - j.sx, t.y - j.sy);
                            k.rot && m.rotate(j.r + t.alpha, t.x, t.y);
                            break;
                        case E:
                            o = +i[s] + r * g * j[s];
                            break;
                        case"colour":
                            o = "rgb(" + [cy(Q(i[s].r + r * g * j[s].r)), cy(Q(i[s].g + r * g * j[s].g)), cy(Q(i[s].b + r * g * j[s].b))][v](",") + ")";
                            break;
                        case"path":
                            o = [];
                            for (var u = 0, x = i[s][w]; u < x; u++) {
                                o[u] = [i[s][u][0]];
                                for (var y = 1, z = i[s][u][w]; y < z; y++)o[u][y] = +i[s][u][y] + r * g * j[s][u][y];
                                o[u] = o[u][v](q)
                            }
                            o = o[v](q);
                            break;
                        case"csv":
                            switch (s) {
                                case"translation":
                                    var A = r * g * j[s][0] - l.x, B = r * g * j[s][1] - l.y;
                                    l.x += A;
                                    l.y += B;
                                    o = A + q + B;
                                    break;
                                case"rotation":
                                    o = +i[s][0] + r * g * j[s][0];
                                    i[s][1] && (o += "," + i[s][1] + "," + i[s][2]);
                                    break;
                                case"scale":
                                    o = [+i[s][0] + r * g * j[s][0], +i[s][1] + r * g * j[s][1], 2 in k[s] ? k[s][2] : p, 3 in k[s] ? k[s][3] : p][v](q);
                                    break;
                                case"clip-rect":
                                    o = [];
                                    u = 4;
                                    while (u--)o[u] = +i[s][u] + r * g * j[s][u];
                                    break
                            }
                            break;
                        default:
                            var C = [].concat(i[s]);
                            o = [];
                            u = m.paper.customAttributes[s].length;
                            while (u--)o[u] = +C[u] + r * g * j[s][u];
                            break
                    }
                    n[s] = o
                }
                m.attr(n);
                m._run && m._run.call(m)
            } else {
                if (k.along) {
                    t = ct(k.along, k.len * !k.back);
                    m.translate(j.sx - (j.x || 0) + t.x - j.sx, j.sy - (j.y || 0) + t.y - j.sy);
                    k.rot && m.rotate(j.r + t.alpha, t.x, t.y)
                }
                (l.x || l.y) && m.translate(-l.x, -l.y);
                k.scale && (k.scale += p);
                m.attr(k);
                cv.splice(c--, 1)
            }
        }
        a.svg && m && m.paper && m.paper.safari();
        cv[w] && setTimeout(cw)
    }, cx = function (b, c, d, e, f) {
        var g = d - e;
        c.timeouts.push(setTimeout(function () {
            a.is(f, "function") && f.call(c);
            c.animate(b, g, b.easing)
        }, e))
    }, cy = function (a) {
        return z(A(a, 255), 0)
    }, cz = function (a, b) {
        if (a == null)return {x: this._.tx, y: this._.ty, toString: co};
        this._.tx += +a;
        this._.ty += +b;
        switch (this.type) {
            case"circle":
            case"ellipse":
                this.attr({cx: +a + this.attrs.cx, cy: +b + this.attrs.cy});
                break;
            case"rect":
            case"image":
            case"text":
                this.attr({x: +a + this.attrs.x, y: +b + this.attrs.y});
                break;
            case"path":
                var c = bp(this.attrs.path);
                c[0][1] += +a;
                c[0][2] += +b;
                this.attr({path: c});
                break
        }
        return this
    };
    bO.animateWith = function (a, b, c, d, e) {
        for (var f = 0, g = cv.length; f < g; f++)cv[f].el.id == a.id && (b.start = cv[f].start);
        return this.animate(b, c, d, e)
    };
    bO.animateAlong = cA();
    bO.animateAlongBack = cA(1);
    function cA(b) {
        return function (c, d, e, f) {
            var g = {back: b};
            a.is(e, "function") ? f = e : g.rot = e;
            c && c.constructor == bN && (c = c.attrs.path);
            c && (g.along = c);
            return this.animate(g, d, f)
        }
    }

    function cB(a, b, c, d, e, f) {
        var g = 3 * b, h = 3 * (d - b) - g, i = 1 - g - h, j = 3 * c, k = 3 * (e - c) - j, l = 1 - j - k;

        function m(a) {
            return ((i * a + h) * a + g) * a
        }

        function n(a, b) {
            var c = o(a, b);
            return ((l * c + k) * c + j) * c
        }

        function o(a, b) {
            var c, d, e, f, j, k;
            for (e = a, k = 0; k < 8; k++) {
                f = m(e) - a;
                if (B(f) < b)return e;
                j = (3 * i * e + 2 * h) * e + g;
                if (B(j) < 0.000001)break;
                e = e - f / j
            }
            c = 0;
            d = 1;
            e = a;
            if (e < c)return c;
            if (e > d)return d;
            while (c < d) {
                f = m(e);
                if (B(f - a) < b)return e;
                a > f ? c = e : d = e;
                e = (d - c) / 2 + c
            }
            return e
        }

        return n(a, 1 / (200 * f))
    }

    bO.onAnimation = function (a) {
        this._run = a || 0;
        return this
    };
    bO.animate = function (c, d, e, g) {
        var h = this;
        h.timeouts = h.timeouts || [];
        if (a.is(e, "function") || !e)g = e || null;
        if (h.removed) {
            g && g.call(h);
            return h
        }
        var i = {}, j = {}, k = false, l = {};
        for (var m in c)if (c[f](m)) {
            if (X[f](m) || h.paper.customAttributes[f](m)) {
                k = true;
                i[m] = h.attr(m);
                i[m] == null && (i[m] = W[m]);
                j[m] = c[m];
                switch (X[m]) {
                    case"along":
                        var n = cs(c[m]), o = ct(c[m], n * !(!c.back)), p = h.getBBox();
                        l[m] = n / d;
                        l.tx = p.x;
                        l.ty = p.y;
                        l.sx = o.x;
                        l.sy = o.y;
                        j.rot = c.rot;
                        j.back = c.back;
                        j.len = n;
                        c.rot && (l.r = S(h.rotate()) || 0);
                        break;
                    case E:
                        l[m] = (j[m] - i[m]) / d;
                        break;
                    case"colour":
                        i[m] = a.getRGB(i[m]);
                        var q = a.getRGB(j[m]);
                        l[m] = {r: (q.r - i[m].r) / d, g: (q.g - i[m].g) / d, b: (q.b - i[m].b) / d};
                        break;
                    case"path":
                        var t = bw(i[m], j[m]);
                        i[m] = t[0];
                        var u = t[1];
                        l[m] = [];
                        for (var v = 0, x = i[m][w]; v < x; v++) {
                            l[m][v] = [0];
                            for (var y = 1, z = i[m][v][w]; y < z; y++)l[m][v][y] = (u[v][y] - i[m][v][y]) / d
                        }
                        break;
                    case"csv":
                        var A = r(c[m])[s](b), B = r(i[m])[s](b);
                        switch (m) {
                            case"translation":
                                i[m] = [0, 0];
                                l[m] = [A[0] / d, A[1] / d];
                                break;
                            case"rotation":
                                i[m] = B[1] == A[1] && B[2] == A[2] ? B : [0, A[1], A[2]];
                                l[m] = [(A[0] - i[m][0]) / d, 0, 0];
                                break;
                            case"scale":
                                c[m] = A;
                                i[m] = r(i[m])[s](b);
                                l[m] = [(A[0] - i[m][0]) / d, (A[1] - i[m][1]) / d, 0, 0];
                                break;
                            case"clip-rect":
                                i[m] = r(i[m])[s](b);
                                l[m] = [];
                                v = 4;
                                while (v--)l[m][v] = (A[v] - i[m][v]) / d;
                                break
                        }
                        j[m] = A;
                        break;
                    default:
                        A = [].concat(c[m]);
                        B = [].concat(i[m]);
                        l[m] = [];
                        v = h.paper.customAttributes[m][w];
                        while (v--)l[m][v] = ((A[v] || 0) - (B[v] || 0)) / d;
                        break
                }
            }
        }
        if (k) {
            var G = a.easing_formulas[e];
            if (!G) {
                G = r(e).match(P);
                if (G && G[w] == 5) {
                    var H = G;
                    G = function (a) {
                        return cB(a, +H[1], +H[2], +H[3], +H[4], d)
                    }
                } else G = function (a) {
                    return a
                }
            }
            cv.push({start: c.start || +(new Date), ms: d, easing: G, from: i, diff: l, to: j, el: h, t: {x: 0, y: 0}});
            a.is(g, "function") && (h._ac = setTimeout(function () {
                g.call(h)
            }, d));
            cv[w] == 1 && setTimeout(cw)
        } else {
            var C = [], D;
            for (var F in c)if (c[f](F) && Z.test(F)) {
                m = {value: c[F]};
                F == "from" && (F = 0);
                F == "to" && (F = 100);
                m.key = T(F, 10);
                C.push(m)
            }
            C.sort(be);
            C[0].key && C.unshift({key: 0, value: h.attrs});
            for (v = 0, x = C[w]; v < x; v++)cx(C[v].value, h, d / 100 * C[v].key, d / 100 * (C[v - 1] && C[v - 1].key || 0), C[v - 1] && C[v - 1].value.callback);
            D = C[C[w] - 1].value.callback;
            D && h.timeouts.push(setTimeout(function () {
                D.call(h)
            }, d))
        }
        return this
    };
    bO.stop = function () {
        for (var a = 0; a < cv.length; a++)cv[a].el.id == this.id && cv.splice(a--, 1);
        for (a = 0, ii = this.timeouts && this.timeouts.length; a < ii; a++)clearTimeout(this.timeouts[a]);
        this.timeouts = [];
        clearTimeout(this._ac);
        delete this._ac;
        return this
    };
    bO.translate = function (a, b) {
        return this.attr({translation: a + " " + b})
    };
    bO[H] = function () {
        return "Raphaël’s object"
    };
    a.ae = cv;
    var cC = function (a) {
        this.items = [];
        this[w] = 0;
        this.type = "set";
        if (a)for (var b = 0, c = a[w]; b < c; b++) {
            if (a[b] && (a[b].constructor == bN || a[b].constructor == cC)) {
                this[this.items[w]] = this.items[this.items[w]] = a[b];
                this[w]++
            }
        }
    };
    cC[e][L] = function () {
        var a, b;
        for (var c = 0, d = arguments[w]; c < d; c++) {
            a = arguments[c];
            if (a && (a.constructor == bN || a.constructor == cC)) {
                b = this.items[w];
                this[b] = this.items[b] = a;
                this[w]++
            }
        }
        return this
    };
    cC[e].pop = function () {
        delete this[this[w]--];
        return this.items.pop()
    };
    for (var cD in bO)bO[f](cD) && (cC[e][cD] = (function (a) {
        return function () {
            for (var b = 0, c = this.items[w]; b < c; b++)this.items[b][a][m](this.items[b], arguments);
            return this
        }
    })(cD));
    cC[e].attr = function (b, c) {
        if (b && a.is(b, G) && a.is(b[0], "object"))for (var d = 0, e = b[w]; d < e; d++)this.items[d].attr(b[d]); else for (var f = 0, g = this.items[w]; f < g; f++)this.items[f].attr(b, c);
        return this
    };
    cC[e].animate = function (b, c, d, e) {
        (a.is(d, "function") || !d) && (e = d || null);
        var f = this.items[w], g = f, h, i = this, j;
        e && (j = function () {
            !(--f) && e.call(i)
        });
        d = a.is(d, F) ? d : j;
        h = this.items[--g].animate(b, c, d, j);
        while (g--)this.items[g] && !this.items[g].removed && this.items[g].animateWith(h, b, c, d, j);
        return this
    };
    cC[e].insertAfter = function (a) {
        var b = this.items[w];
        while (b--)this.items[b].insertAfter(a);
        return this
    };
    cC[e].getBBox = function () {
        var a = [], b = [], c = [], d = [];
        for (var e = this.items[w]; e--;) {
            var f = this.items[e].getBBox();
            a[L](f.x);
            b[L](f.y);
            c[L](f.x + f.width);
            d[L](f.y + f.height)
        }
        a = A[m](0, a);
        b = A[m](0, b);
        return {x: a, y: b, width: z[m](0, c) - a, height: z[m](0, d) - b}
    };
    cC[e].clone = function (a) {
        a = new cC;
        for (var b = 0, c = this.items[w]; b < c; b++)a[L](this.items[b].clone());
        return a
    };
    a.registerFont = function (a) {
        if (!a.face)return a;
        this.fonts = this.fonts || {};
        var b = {w: a.w, face: {}, glyphs: {}}, c = a.face["font-family"];
        for (var d in a.face)a.face[f](d) && (b.face[d] = a.face[d]);
        this.fonts[c] ? this.fonts[c][L](b) : this.fonts[c] = [b];
        if (!a.svg) {
            b.face["units-per-em"] = T(a.face["units-per-em"], 10);
            for (var e in a.glyphs)if (a.glyphs[f](e)) {
                var g = a.glyphs[e];
                b.glyphs[e] = {
                    w: g.w, k: {}, d: g.d && "M" + g.d[Y](/[mlcxtrv]/g, function (a) {
                        return ({l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"})[a] || "M"
                    }) + "z"
                };
                if (g.k)for (var h in g.k)g[f](h) && (b.glyphs[e].k[h] = g.k[h])
            }
        }
        return a
    };
    k.getFont = function (b, c, d, e) {
        e = e || "normal";
        d = d || "normal";
        c = +c || ({normal: 400, bold: 700, lighter: 300, bolder: 800})[c] || 400;
        if (!a.fonts)return;
        var g = a.fonts[b];
        if (!g) {
            var h = new RegExp("(^|\\s)" + b[Y](/[^\w\d\s+!~.:_-]/g, p) + "(\\s|$)", "i");
            for (var i in a.fonts)if (a.fonts[f](i)) {
                if (h.test(i)) {
                    g = a.fonts[i];
                    break
                }
            }
        }
        var j;
        if (g)for (var k = 0, l = g[w]; k < l; k++) {
            j = g[k];
            if (j.face["font-weight"] == c && (j.face["font-style"] == d || !j.face["font-style"]) && j.face["font-stretch"] == e)break
        }
        return j
    };
    k.print = function (c, d, e, f, g, h, i) {
        h = h || "middle";
        i = z(A(i || 0, 1), -1);
        var j = this.set(), k = r(e)[s](p), l = 0, m = p, n;
        a.is(f, e) && (f = this.getFont(f));
        if (f) {
            n = (g || 16) / f.face["units-per-em"];
            var o = f.face.bbox.split(b), q = +o[0], t = +o[1] + (h == "baseline" ? o[3] - o[1] + +f.face.descent : (o[3] - o[1]) / 2);
            for (var u = 0, v = k[w]; u < v; u++) {
                var x = u && f.glyphs[k[u - 1]] || {}, y = f.glyphs[k[u]];
                l += u ? (x.w || f.w) + (x.k && x.k[k[u]] || 0) + f.w * i : 0;
                y && y.d && j[L](this.path(y.d).attr({fill: "#000", stroke: "none", translation: [l, 0]}))
            }
            j.scale(n, n, q, t).translate(c - q, d - t)
        }
        return j
    };
    a.format = function (b, c) {
        var e = a.is(c, G) ? [0][n](c) : arguments;
        b && a.is(b, F) && e[w] - 1 && (b = b[Y](d, function (a, b) {
            return e[++b] == null ? p : e[b]
        }));
        return b || p
    };
    a.ninja = function () {
        i.was ? h.Raphael = i.is : delete Raphael;
        return a
    };
    a.el = bO;
    a.st = cC[e];
    i.was ? h.Raphael = a : Raphael = a
})()
// Tween.js - http://github.com/sole/tween.js
var TWEEN = TWEEN || function () {
        var a, e, c, d, f = [];
        return {
            start: function (g) {
                c = setInterval(this.update, 1E3 / (g || 60))
            }, stop: function () {
                clearInterval(c)
            }, add: function (g) {
                f.push(g)
            }, remove: function (g) {
                a = f.indexOf(g);
                a !== -1 && f.splice(a, 1)
            }, update: function () {
                a = 0;
                e = f.length;
                for (d = (new Date).getTime(); a < e;)if (f[a].update(d))a++; else {
                    f.splice(a, 1);
                    e--
                }
            }
        }
    }();
TWEEN.Tween = function (a) {
    var e = {}, c = {}, d = {}, f = 1E3, g = 0, j = null, n = TWEEN.Easing.Linear.EaseNone, k = null, l = null, m = null;
    this.to = function (b, h) {
        if (h !== null)f = h;
        for (var i in b)if (a[i] !== null)d[i] = b[i];
        return this
    };
    this.start = function () {
        TWEEN.add(this);
        j = (new Date).getTime() + g;
        for (var b in d)if (a[b] !== null) {
            e[b] = a[b];
            c[b] = d[b] - a[b]
        }
        return this
    };
    this.stop = function () {
        TWEEN.remove(this);
        return this
    };
    this.delay = function (b) {
        g = b;
        return this
    };
    this.easing = function (b) {
        n = b;
        return this
    };
    this.chain = function (b) {
        k = b
    };
    this.onUpdate =
        function (b) {
            l = b;
            return this
        };
    this.onComplete = function (b) {
        m = b;
        return this
    };
    this.update = function (b) {
        var h, i;
        if (b < j)return true;
        b = (b - j) / f;
        b = b > 1 ? 1 : b;
        i = n(b);
        for (h in c)a[h] = e[h] + c[h] * i;
        l !== null && l.call(a, i);
        if (b == 1) {
            m !== null && m.call(a);
            k !== null && k.start();
            return false
        }
        return true
    }
};
TWEEN.Easing = {
    Linear: {},
    Quadratic: {},
    Cubic: {},
    Quartic: {},
    Quintic: {},
    Sinusoidal: {},
    Exponential: {},
    Circular: {},
    Elastic: {},
    Back: {},
    Bounce: {}
};
TWEEN.Easing.Linear.EaseNone = function (a) {
    return a
};
TWEEN.Easing.Quadratic.EaseIn = function (a) {
    return a * a
};
TWEEN.Easing.Quadratic.EaseOut = function (a) {
    return -a * (a - 2)
};
TWEEN.Easing.Quadratic.EaseInOut = function (a) {
    if ((a *= 2) < 1)return 0.5 * a * a;
    return -0.5 * (--a * (a - 2) - 1)
};
TWEEN.Easing.Cubic.EaseIn = function (a) {
    return a * a * a
};
TWEEN.Easing.Cubic.EaseOut = function (a) {
    return --a * a * a + 1
};
TWEEN.Easing.Cubic.EaseInOut = function (a) {
    if ((a *= 2) < 1)return 0.5 * a * a * a;
    return 0.5 * ((a -= 2) * a * a + 2)
};
TWEEN.Easing.Quartic.EaseIn = function (a) {
    return a * a * a * a
};
TWEEN.Easing.Quartic.EaseOut = function (a) {
    return -(--a * a * a * a - 1)
};
TWEEN.Easing.Quartic.EaseInOut = function (a) {
    if ((a *= 2) < 1)return 0.5 * a * a * a * a;
    return -0.5 * ((a -= 2) * a * a * a - 2)
};
TWEEN.Easing.Quintic.EaseIn = function (a) {
    return a * a * a * a * a
};
TWEEN.Easing.Quintic.EaseOut = function (a) {
    return (a -= 1) * a * a * a * a + 1
};
TWEEN.Easing.Quintic.EaseInOut = function (a) {
    if ((a *= 2) < 1)return 0.5 * a * a * a * a * a;
    return 0.5 * ((a -= 2) * a * a * a * a + 2)
};
TWEEN.Easing.Sinusoidal.EaseIn = function (a) {
    return -Math.cos(a * Math.PI / 2) + 1
};
TWEEN.Easing.Sinusoidal.EaseOut = function (a) {
    return Math.sin(a * Math.PI / 2)
};
TWEEN.Easing.Sinusoidal.EaseInOut = function (a) {
    return -0.5 * (Math.cos(Math.PI * a) - 1)
};
TWEEN.Easing.Exponential.EaseIn = function (a) {
    return a == 0 ? 0 : Math.pow(2, 10 * (a - 1))
};
TWEEN.Easing.Exponential.EaseOut = function (a) {
    return a == 1 ? 1 : -Math.pow(2, -10 * a) + 1
};
TWEEN.Easing.Exponential.EaseInOut = function (a) {
    if (a == 0)return 0;
    if (a == 1)return 1;
    if ((a *= 2) < 1)return 0.5 * Math.pow(2, 10 * (a - 1));
    return 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
};
TWEEN.Easing.Circular.EaseIn = function (a) {
    return -(Math.sqrt(1 - a * a) - 1)
};
TWEEN.Easing.Circular.EaseOut = function (a) {
    return Math.sqrt(1 - --a * a)
};
TWEEN.Easing.Circular.EaseInOut = function (a) {
    if ((a /= 0.5) < 1)return -0.5 * (Math.sqrt(1 - a * a) - 1);
    return 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
};
TWEEN.Easing.Elastic.EaseIn = function (a) {
    var e, c = 0.1, d = 0.4;
    if (a == 0)return 0;
    if (a == 1)return 1;
    d || (d = 0.3);
    if (!c || c < 1) {
        c = 1;
        e = d / 4
    } else e = d / (2 * Math.PI) * Math.asin(1 / c);
    return -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - e) * 2 * Math.PI / d))
};
TWEEN.Easing.Elastic.EaseOut = function (a) {
    var e, c = 0.1, d = 0.4;
    if (a == 0)return 0;
    if (a == 1)return 1;
    d || (d = 0.3);
    if (!c || c < 1) {
        c = 1;
        e = d / 4
    } else e = d / (2 * Math.PI) * Math.asin(1 / c);
    return c * Math.pow(2, -10 * a) * Math.sin((a - e) * 2 * Math.PI / d) + 1
};
TWEEN.Easing.Elastic.EaseInOut = function (a) {
    var e, c = 0.1, d = 0.4;
    if (a == 0)return 0;
    if (a == 1)return 1;
    d || (d = 0.3);
    if (!c || c < 1) {
        c = 1;
        e = d / 4
    } else e = d / (2 * Math.PI) * Math.asin(1 / c);
    if ((a *= 2) < 1)return -0.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - e) * 2 * Math.PI / d);
    return c * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - e) * 2 * Math.PI / d) * 0.5 + 1
};
TWEEN.Easing.Back.EaseIn = function (a) {
    return a * a * (2.70158 * a - 1.70158)
};
TWEEN.Easing.Back.EaseOut = function (a) {
    return (a -= 1) * a * (2.70158 * a + 1.70158) + 1
};
TWEEN.Easing.Back.EaseInOut = function (a) {
    if ((a *= 2) < 1)return 0.5 * a * a * (3.5949095 * a - 2.5949095);
    return 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
};
TWEEN.Easing.Bounce.EaseIn = function (a) {
    return 1 - TWEEN.Easing.Bounce.EaseOut(1 - a)
};
TWEEN.Easing.Bounce.EaseOut = function (a) {
    return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
};
TWEEN.Easing.Bounce.EaseInOut = function (a) {
    if (a < 0.5)return TWEEN.Easing.Bounce.EaseIn(a * 2) * 0.5;
    return TWEEN.Easing.Bounce.EaseOut(a * 2 - 1) * 0.5 + 0.5
};
/*!
 * BubbleTree 2.0.1
 *
 * Copyright (c) 2011 Gregor Aisch (http://driven-by-data.net)
 * Licensed under the MIT license
 *
 */
/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global Raphael, TWEEN, vis4, vis4color, vis4loader */

var BubbleTree = function(config, onHover, onUnHover) {

    var me = this;

    me.version = "2.0.2";

    me.$container = $(config.container);

    me.config = $.extend({
        // this is where we look for the icons
        rootPath: '',
        // show full labels inside bubbles with min radius of 40px
        minRadiusLabels: 40,
        // just show the amounts inside bubbles with min radius of 20px
        minRadiusAmounts: 20,
        // hide labels at all for bubbles with min radius of 0 (deactivated by def)
        minRadiusHideLabels: 0,
        // trim labels after 50 characters
        cutLabelsAt: 50
    }, config);

    /*
     * this function is called when the user hovers a bubble
     */
    //me.onHover = onHover;

    //me.onUnHover = onUnHover;
    me.tooltip = config.tooltipCallback ? config.tooltipCallback : function() {};
    if (config.tooltip) me.tooltip = config.tooltip;

    /*
     * stylesheet JSON that contains colors and icons for the bubbles
     */
    me.style = config.bubbleStyles;

    me.ns = BubbleTree;

    /*
     * hashmap of all nodes by url token
     */
    me.nodesByUrlToken = {};

    /*
     * flat array of all nodes
     */
    me.nodeList = [];

    me.iconsByUrlToken = {};

    me.globalNodeCounter = 0;

    me.displayObjects = [];

    me.bubbleScale = 1;

    me.globRotation = 0;

    me.currentYear = config.initYear;

    me.currentCenter = undefined;

    me.currentTransition = undefined;

    me.baseUrl = '';

    /*
     * @public loadData
     */
    me.loadData = function(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: this.setData.bind(this)
        });
    };

    /*
     * is either called directly or by $.ajax when data json file is loaded
     */
    me.setData = function(data) {
        var me = this;
        if (!data) data = me.config.data; // IE fix
        me.initData(data);
        me.initPaper();
        me.initBubbles();
        me.initTween();
        me.initHistory();

        me.postProcess(data);
    };

    me.postProcess = function(data) {
        if (!data) {
            return;
        }
        var me = this;
        // instantiate progress

        angular.forEach(data.children, function(child) {
            me.postProcess(child);
        });
    };

    /*
     * initializes the data tree, adds links to parent node for easier traversal etc
     */
    me.initData = function(root) {
        var me = this;
        root.level = 0;
        me.preprocessData(root);
        me.traverse(root, 0);
        me.treeRoot = root;
    };

    me.preprocessData = function(root) {
        var me = this, maxNodes = me.config.maxNodesPerLevel;
        if (maxNodes) {
            if (maxNodes < root.children.length) {
                // take the smallest nodes
                // sort children
                var tmp = me.sortChildren(root.children);
                tmp.reverse();
                var keep = [], move = [], moveAmount = 0, breakdown;
                for (var i in root.children) {
                    if (i < maxNodes) {
                        keep.push(root.children[i]);
                    } else {
                        move.push(root.children[i]);
                        moveAmount += Math.max(0, root.children[i].amount);
                    }
                }
                root.children = keep;
                root.children.push({
                    'label': 'More',
                    'name': 'more',
                    'amount': moveAmount,
                    'children': move,
                    'breakdown': breakdown
                });
            }
        }
    };

    /*
     * used for recursive tree traversal
     */
    me.traverse = function(node, index) {
        var c, child, pc, me = this, urlTokenSource, styles = me.config.bubbleStyles;

        //if (node.amount <= 0) return;

        if (!node.children) node.children = [];

        // store node in flat node list
        me.nodeList.push(node);

        node.famount = me.ns.Utils.formatNumber(node.amount);
        if (node.parent) node.level = node.parent.level + 1;

        if (me.config.clearColors === true) node.color = false;

        if (styles) {

            var props = ['color', 'shortLabel', 'icon'];

            $.each(props, function (p, prop) {
                if (styles.hasOwnProperty('id') && styles.id.hasOwnProperty(node.id) && styles.id[node.id].hasOwnProperty(prop)) {
                    // use color by id
                    node[prop] = styles.id[node.id][prop];
                } else if (node.hasOwnProperty('name') && styles.hasOwnProperty('name') && styles.name.hasOwnProperty(node.name) && styles.name[node.name].hasOwnProperty(prop)) {
                    // use color by id
                    node[prop] = styles.name[node.name][prop];
                } else if (node.hasOwnProperty('taxonomy') && styles.hasOwnProperty(node.taxonomy) && styles[node.taxonomy].hasOwnProperty(node.name) && styles[node.taxonomy][node.name].hasOwnProperty(prop)) {
                    node[prop] = styles[node.taxonomy][node.name][prop];
                }
            });
        }

        if (!node.color) {
            // use color from parent node if no other match available
            if (node.level > 0) node.color = node.parent.color;
            else node.color = '#999999';
        }
        // lighten up the color if there are no children
        if (node.children.length < 2 && node.color) {
            node.color = vis4color.fromHex(node.color).saturation('*.86').x;
        }

        if (node.level > 0) {
            pc = node.parent.children;
            if (pc.length > 1) {
                node.left = pc[(index-1+pc.length) % pc.length];
                node.right = pc[(Number(index)+1) % pc.length];
                if (node.right == node.left) node.right = undefined;
            }
        }
        if (node.label !== undefined && node.label !== "") {
            urlTokenSource = node.label;
        } else if (node.token !== undefined && node.token !== "") {
            urlTokenSource = node.token;
        } else {
            urlTokenSource = ''+me.globalNodeCounter;
        }

        me.globalNodeCounter++;

        node.urlToken = urlTokenSource.toLowerCase().replace(/\W/g, "-");
        while (me.nodesByUrlToken.hasOwnProperty(node.urlToken)) {
            node.urlToken += '-';
        }
        me.nodesByUrlToken[node.urlToken] = node;
        node.maxChildAmount = 0;

        // sort children
        node.children = me.sortChildren(node.children, true, me.config.sortBy);

        $.each(node.children, function(c, child) {
            child.parent = node;
            node.maxChildAmount = Math.max(node.maxChildAmount, child.amount);
            me.traverse(child, c);
        });

        if (node.breakdowns) {
            node.breakdownsByName = {};
            $.each(node.breakdowns, function (c,bd) {
                bd.famount = me.ns.Utils.formatNumber(bd.amount);
                if (bd.name) node.breakdownsByName[bd.name] = bd;
            });
        }
    };

    me.sortChildren = function(children, alternate, sortBy) {
        var tmp = [], odd = true;
        if (sortBy == 'label') {
            sortBy = me.compareLabels;
            alternate = false;
        } else sortBy = me.compareAmounts;

        children.sort(sortBy);
        if (alternate) {
            while (children.length > 0) {
                tmp.push(odd ? children.pop() : children.shift());
                odd = !odd;
            }
            return tmp;
        } else {
            return children;
        }
    };

    /*
     * compares two items by amount
     */
    me.compareAmounts = function(a, b) {
        if (a.amount > b.amount) return 1;
        if (a.amount == b.amount) return 0;
        return -1;
    };

    /*
     * compares to item by label
     */
    me.compareLabels = function(a, b) {
        if (a.label > b.label) return 1;
        if (a.label == b.label) return 0;
        return -1;
    };

    /*
     * initializes all that RaphaelJS stuff
     */
    me.initPaper = function() {
        var me = this, $c = me.$container, rt = me.treeRoot,
            w = $c.width(), h = $c.height(),
            paper = Raphael($c[0], w, h),
            maxRad = Math.min(w, h) * 0.5 - 40,
            base, Vector = me.ns.Vector,
            origin = new Vector(w * 0.5, h * 0.5); // center

        me.width = w;
        me.height = h;
        me.paper = paper;
        base = Math.pow((Math.pow(rt.amount, 0.6) + Math.pow(rt.maxChildAmount, 0.6)*2) / maxRad, 1.6666666667);
        me.a2radBase = me.ns.a2radBase = base;

        me.origin = origin;

        $(window).resize(me.onResize.bind(me));
    };

    me.onResize = function() {
        var me = this, $c = me.$container, w = $c.width(), h = $c.height(),
            maxRad = Math.min(w, h) * 0.5 - 40, base, rt = me.treeRoot, b, obj;
        me.paper.setSize(w, h);
        me.origin.x = w * 0.5;
        me.origin.y = h * 0.5;
        me.width = w;
        me.height = h;
        base = Math.pow((Math.pow(rt.amount, 0.6) + Math.pow(rt.maxChildAmount, 0.6)*2) / maxRad, 1.6666666667);
        me.a2radBase = me.ns.a2radBase = base;

        $.each(me.displayObjects, function(b, obj) {
            if (obj.className == "bubble") {
                obj.bubbleRad = me.ns.Utils.amount2rad(obj.node.amount);
            }
        });
        // vis4.log(me);
        if (me.currentCenter) {
            me.changeView(me.currentCenter.urlToken);
        }
    };

    /*
     * initializes the Tweening engine
     */
    me.initTween = function() {
        this.tweenTimer = setInterval(this.loop, 500/120);
    };

    /*
     * creates instances for all bubbles in the dataset. the bubbles will
     * remain invisble until they enter the stage via changeView()
     */
    me.initBubbles = function() {
        //vis4.log('initBubbles');
        var me = this, rt = me.treeRoot, i, icons = false, Bubbles = me.ns.Bubbles, bubbleClass;

        me.bubbleClasses = [];

        // defaults to plain bubble
        if (!me.config.hasOwnProperty('bubbleType')) me.config.bubbleType = ['plain'];
        // convert to array if neccessairy
        if (!$.isArray(me.config.bubbleType)) me.config.bubbleType = [me.config.bubbleType];

        if ($.isArray(me.config.bubbleType)) {
            $.each(me.config.bubbleType, function(i) {
                if (me.config.bubbleType[i] == 'icon') icons = true;
                me.bubbleClasses.push(me.getBubbleType(me.config.bubbleType[i]));
            });
        }

        var rootBubble = me.createBubble(rt, me.origin, 0, 0, rt.color);
        me.traverseBubbles(rootBubble);
    };

    /*
     * returns the bubble class for a given bubble class id
     * e.g. 'icon' > BubbleTree.Bubbles.Icon
     */
    me.getBubbleType = function(id) {
        var me = this, Bubbles = me.ns.Bubbles;
        return Bubbles.Donut
    };

    /*
     * iterates over the complete tree and creates a bubble for
     * each node
     */
    me.traverseBubbles = function(parentBubble) {
        var me = this, ring,
            a2rad = me.ns.Utils.amount2rad,
            i, c, children, childBubble, childRadSum = 0, oa = 0, da, ca, twopi = Math.PI * 2;
        children = parentBubble.node.children;

        // sum radii of all children
        $.each(children, function(i,c) {
            childRadSum += a2rad(c.amount);
        });

        if (children.length > 0) {
            // create ring
            ring = me.createRing(parentBubble.node, parentBubble.pos, 0, { stroke: '#888', 'stroke-dasharray': "-" });
        }

        $.each(children, function(i,c) {

            da = a2rad(c.amount) / childRadSum * twopi;
            ca = oa + da*0.5;

            if (isNaN(ca)) vis4.log(oa, da, c.amount, childRadSum, twopi);

            c.centerAngle = ca;

            childBubble = me.createBubble(c, parentBubble.pos, 0, ca, c.color);
            // für jedes kind einen bubble anlegen und mit dem parent verbinden
            oa += da;

            me.traverseBubbles(childBubble);
        });

    };


    /*
     * creates a new bubble for a given node. the bubble type will be chosen
     * by the level of the node
     */
    me.createBubble = function(node, origin, rad, angle, color) {
        var me = this, ns = me.ns, i, b, bubble, classIndex = node.level;
        if (isNaN(classIndex)) classIndex = 0;
        classIndex = Math.min(classIndex, me.bubbleClasses.length-1);

        bubble = new me.bubbleClasses[classIndex](node, me, origin, rad, angle, color);
        me.displayObjects.push(bubble);
        return bubble;
    };

    me.createRing = function(node, origin, rad, attr) {
        var me = this, ns = me.ns, ring;
        ring = new ns.Ring(node, me, origin, rad, attr);
        me.displayObjects.push(ring);
        return ring;
    };

    /*
     * is called every time the user changes the view
     * each view is defined by the selected node (which is displayed
     */
    me.changeView = function(token) {
        var me = this,
            paper = me.paper,
            maxRad = Math.min(me.width, me.height) * 0.35,
            ns = me.ns,
            utils = ns.Utils,
            o = me.origin,
            l1attr = { stroke: '#ccc', 'stroke-dasharray': "- " },
            l2attr = { stroke: '#ccc', 'stroke-dasharray': ". " },
            a2rad = utils.amount2rad,
            root = me.treeRoot,
            nodesByUrlToken = me.nodesByUrlToken,
            node = nodesByUrlToken.hasOwnProperty(token) ? nodesByUrlToken[token] : null,
            t = new ns.Layout(),
            bubble, tr, i, twopi = Math.PI * 2,
            getBubble = me.getBubble.bind(me), getRing = me.getRing.bind(me),
            unify = me.unifyAngle;

        if (node !== null) {

            // what do you we have to do here?
            // - find out the origin position
            // -

            var parent, grandpa, sibling, c, cn, rad1, rad2, rad, srad, sang, ring, tgtScale,
                radSum, leftTurn = false, rightTurn = false;



            // initially we will mark all bubbles and rings for hiding
            // get....() will set this flag to false
            for (i in me.displayObjects) me.displayObjects[i].hideFlag = true;


            if (node == root || node.parent == root && node.children.length < 2) {

                t.$(me).bubbleScale = me.config.scaleFactor ? me.config.scaleFactor : 1.0;

                // move origin to center
                t.$(o).x = me.width * 0.5;
                t.$(o).y = me.height * 0.5;

                // make the root bubble visible
                parent = getBubble(root);

                //parent.childRotation = 0;

                if (node != root) {
                    parent.childRotation = -node.centerAngle;
                }

                rad1 = a2rad(root.amount) + a2rad(root.maxChildAmount) + 40;

                ring = getRing(root);
                t.$(ring).rad = rad1;

                for (i in root.children) {
                    cn = root.children[i];
                    // adjust rad and angle for children
                    bubble = getBubble(cn);
                    t.$(bubble).angle = unify(cn.centerAngle + parent.childRotation);
                    t.$(bubble).rad = rad1;
                }

            } else {

                // node is not the root node

                var origNode = node; // save the reference of the node..

                if (node.children.length < 2) { // ..because if it has no children..
                    tgtScale = 5;
                } else
                    tgtScale = maxRad / (a2rad(node.amount) + a2rad(node.maxChildAmount)*1.5);

                t.$(me).bubbleScale = tgtScale;

                parent = getBubble(node);

                if (me.currentCenter && me.currentCenter == node.left) rightTurn = true;
                else if (me.currentCenter && me.currentCenter == node.right) leftTurn = true;

                var sa = me.shortestAngleTo;
                if (leftTurn) sa = me.shortestLeftTurn;
                if (rightTurn) sa = me.shortestRightTurn;

                t.$(parent).angle = sa(parent.angle, 0);

                // find the sum of all radii from node to root
                rad1 = (a2rad(node.amount) + a2rad(node.maxChildAmount)) * tgtScale + 20;

                ring = getRing(node);
                t.$(ring).rad = rad1;

                grandpa = getBubble(node.parent);
                grandpa.childRotation = -node.centerAngle;

                var maybeRoot = grandpa;

                while (maybeRoot && maybeRoot.node.parent) {
                    maybeRoot = getBubble(maybeRoot.node.parent, true);
                    t.$(maybeRoot).rad = 0;
                }

                t.$(grandpa).rad = 0;
                //
                var hw = me.width * 0.5;

                rad2 = 0 - Math.max(
                        //hw *0.8 - tgtScale * (a2rad(node.parent.amount)+a2rad(node.amount)), // maximum visible part
                        hw * 0.8 - tgtScale * (a2rad(node.parent.amount) + a2rad(Math.max(node.amount*1.15 + node.maxChildAmount*1.15, node.left.amount * 0.85, node.right.amount * 0.85))),
                        tgtScale*a2rad(node.parent.amount)*-1 + hw*0.15 // minimum visible part
                    ) + hw;

                //vis4.log('rad (parent) = '+rad2,'   rad (center) = ',rad1);

                if (node.left && node.right) {
                    var maxSiblSize = tgtScale * a2rad(Math.max(node.left.amount, node.right.amount));
                }

                //rad2 = hw - (tgtScale*a2rad(node.parent.amount)*-1+ hw*0.15);

                radSum = rad1 + rad2;

                t.$(o).x = me.width * 0.5 - rad2 - (node != origNode ? rad1 * 0.35: 0);
                t.$(o).y = me.height * 0.5;

                //vis4.log('o.x = '+o.x,'    t.$(o).x = '+t.$(o).x);

                new vis4.DelayedTask(1500, vis4, vis4.log, o, grandpa.pos);

                rad2 += me.width * 0.1;

                ring = getRing(node.parent);
                t.$(ring).rad = rad2;

                t.$(parent).rad = rad2;

                var ao = 0-(node != origNode ? origNode.centerAngle + parent.childRotation: 0);
                // children
                for (i in node.children) {
                    cn = node.children[i];
                    // adjust rad and angle for children
                    bubble = getBubble(cn);
                    t.$(bubble).angle = me.shortestAngleTo(bubble.angle, cn.centerAngle + parent.childRotation + ao);
                    t.$(bubble).rad = rad1;
                }

                // left and right sibling

                var siblCut = me.height * 0.07;

                if (node.left) {
                    sibling = node.left;
                    srad = a2rad(sibling.amount)*tgtScale;
                    sang = twopi - Math.asin((me.paper.height*0.5 + srad - siblCut) / rad2);

                    bubble = getBubble(sibling);
                    t.$(bubble).rad = rad2;
                    t.$(bubble).angle = sa(bubble.angle, sang);
                }
                if (node.right) {
                    sibling = node.right;
                    srad = a2rad(sibling.amount)*tgtScale;
                    sang = Math.asin((me.paper.height*0.5 + srad - siblCut) / rad2);

                    bubble = getBubble(sibling);
                    t.$(bubble).rad = rad2;
                    t.$(bubble).angle = sa(bubble.angle, sang);
                }

                node = origNode;
            }

            // now we're going to check all hides and shows
            for (i in me.displayObjects) {
                var obj = me.displayObjects[i];
                if (obj.hideFlag && obj.visible) {
                    // bubble is on stage but shouldn't
                    t.$(obj).alpha = 0; // let it disappear
                    if (obj.className == "bubble" && obj.node.level > 1) t.$(obj).rad = 0; // move to center
                    //else t.$(obj).rad =
                    t.hide(obj); // remove from stage afterwards
                } else if (!obj.hideFlag) {
                    // bubble is not on stage but should
                    t.$(obj).alpha = 1;
                    if (!obj.visible) {
                        obj.alpha = 0;
                        t.show(obj);
                    }
                }
            }

            tr = new ns.Transitioner($.browser.msie || me.currentCenter == node ? 0 : 560);
            tr.changeLayout(t);
            me.currentTransition = tr;
            if (!me.currentCenter && $.isFunction(me.config.firstNodeCallback)) {
                me.config.firstNodeCallback(node);
            }
            me.currentCenter = node;
            // vis4.log('currentNode = '+me.currentCenter);

        } else {
            utils.log('node '+token+' not found');
        }
        // step1:

        // step2:
    };

    me.unifyAngle = function(a) {
        var pi = Math.PI, twopi = pi * 2;
        while (a >= twopi) a -= twopi;
        while (a < 0) a += twopi;
        return a;
    };

    me.shortestAngle = function(f, t) {
        var deg = function(a) { return Math.round(a/Math.PI*180)+''; };
        var pi = Math.PI, twopi = pi * 2, unify= me.unifyAngle;
        f = unify(f);
        t = unify(t);
        var sa = t - f;
        if (sa > pi) sa -= twopi;
        if (sa < -pi) sa += twopi;

        return sa;
    };

    me.shortestAngleTo = function(f, t) {
        return f+me.shortestAngle(f, t);
    };

    me.shortestLeftTurn = function(f, t) {
        var sa = me.shortestAngle(f, t);
        if (sa > 0) sa = sa - Math.PI*2;
        return f+sa;
    };

    me.shortestRightTurn = function(f, t) {
        var sa = me.shortestAngle(f, t);
        if (sa < 0) sa = Math.PI*2 + sa;
        return f+sa;
    };


    /*
     * returns the instance of a bubble for a given node
     */
    me.getBubble = function(node, keepHidden) {
        return this.getDisplayObject('bubble', node, keepHidden);
    };

    /*
     *
     */
    me.getRing = function(node) {
        return this.getDisplayObject('ring', node);
    };

    me.getDisplayObject = function(className, node, keepHidden) {
        var me = this, i, o;
        for (i in me.displayObjects) {
            o = me.displayObjects[i];
            if (o.className != className) continue;
            if (o.node == node) {
                if (!keepHidden) o.hideFlag = false;
                return o;
            }
        }
        vis4.log(className+' not found for node', node);
    };

    /*
     me.createRing = function(t, origin, rad, attr) {
     var me = this, ns = me.ns,
     ring = new ns.Ring(me, origin, attr, rad);
     ring.toBack();
     me.rings.push(ring);
     t.$(ring).rad = rad;
     return ring;
     };
     */

    me.initHistory = function() {
        $.history.init(me.urlChanged.bind(me), { unescape: ",/" });
    };

    me.freshUrl = '';

    /*
     * callback for every url change, either initiated by user or
     * by this class itself
     */
    me.urlChanged = function(hash) {
        var me = this, tr = me.currentTransition;

        if (!me.freshUrl) {
            // setting an url for the very first time
            if (hash.indexOf('/~/')) {
                me.baseUrl = hash.substr(0, hash.indexOf('/~/'));
            }
        }
        me.freshUrl = hash;

        if (tr && tr.running) {
            vis4.log('transition is running at the moment, adding listener');
            tr.onComplete(me.changeUrl.bind(me));
        } else {
            me.changeUrl();
        }
    };

    /*
     * this function initiate the action which follows the url change
     */
    me.changeUrl = function() {
        var me = this, parts = me.freshUrl.split('/'), token = parts[parts.length-1], url;

        // var urlParts = me.freshUrl.split('/~/');
        if (me.freshUrl === "") me.navigateTo(me.treeRoot);

        if (me.nodesByUrlToken.hasOwnProperty(token)) {
            url = me.getUrlForNode(me.nodesByUrlToken[token]);
            if (me.freshUrl != url) {
                // node found but url not perfect
                $.history.load(url);
            } else {
                me.navigateTo(me.nodesByUrlToken[token], true);
            }
        } else {
            me.navigateTo(me.treeRoot);
        }
    };

    me.navigateTo = function(node, fromUrlChange) {
        var me = this;

        if (typeof me.config.navigateTo === 'function') {
            console.log(fromUrlChange);
            me.config.navigateTo(node);
        }

        var url = me.getUrlForNode(node);
        // vis4.log('bc.navigateTo(',node,',',fromUrlChange,')');
        if (fromUrlChange) me.changeView(node.urlToken);
        else $.history.load(url);

        //
        $('.label, .label2').removeClass('current');
        $('.label2.'+ node.id).addClass('current');
        $('.label.'+ node.id).addClass('current');
    };

    /*
     * creates a valid url for a given node, e.g. /2010/health/medical-supplies
     */
    me.getUrlForNode = function(node) {
        var parts = [];
        parts.push(node.urlToken);
        while (node.parent) {
            parts.push(node.parent.urlToken);
            node = node.parent;
        }
        parts.reverse();
        return me.baseUrl+'/~/'+parts.join('/');
    };

    me.onNodeClick = function(node) {

    };

    // removes all nodes
    me.clean = function() {
        var me = this, i;
        $('.label').remove();
        /*for (i in me.displayObjects) {
         try {
         if ($.isFunction(me.displayObjects[i].hide)) me.displayObjects[i].hide();
         } catch (e) {

         }
         }*/
    };

    this.loop = function() {
        TWEEN.update();
    };

    if (!me.config.hasOwnProperty('data')) {
        throw new Error('no data');
    }

    if (typeof me.config.data == "string") {
        // use the given js object
        me.loadData();
    } else {
        // load local tree json file
        new vis4.DelayedTask(1000, me, me.setData, me.config.data);
    }
};

BubbleTree.Styles = {};
/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global Raphael, TWEEN, BubbleTree */

/*
 * stores visual attributes of all elements in the visualization
 *
 */
BubbleTree.Layout = function() {

    var me = this;
    me.objects = [];
    me.props = [];
    me.toHide = [];
    me.toShow = [];

    /*
     * flare-style transitioner syntax
     *
     * if you have an object bubble, you can easily change its properties with
     *
     * var l = new OpenSpendings.BubbleTree.Layout();
     * l.$(bubble).radius = 30;
     * l.$(bubble).angle = 3.14;
     */
    me.$ = function(obj) {
        var me = this, i, o, p;
        for (i in me.objects) {
            o = me.objects[i];
            if (o == obj) return me.props[i];
        }
        me.objects.push(obj);
        p = {};
        me.props.push(p);
        return p;
    };

    /*
     * use me function to mark objects that should be shown before
     * the transition
     */
    me.show = function(obj) {
        var me = this;
        me.toShow.push(obj);
    };


    /*
     * use me function to mark objects that should be hidden after
     * the transition
     */
    me.hide = function(obj) {
        var me = this;
        me.toHide.push(obj);
    };

};/*jshint undef: true, browser:true, jquery: true, devel: true */
/*global Raphael, TWEEN, BubbleTree */
/*
 * represents a radial line
 */
BubbleTree.Line = function(bc, attr, origin, angle, fromRad, toRad) {
    this.bc = bc;
    this.o = origin;
    this.angle = angle;
    this.fromRad = fromRad;
    this.attr = attr;
    this.toRad = toRad;

    this.getXY = function() {
        this.x1 = this.o.x + Math.cos(this.angle) * this.fromRad;
        this.y1 = this.o.y -Math.sin(this.angle) * this.fromRad;
        this.x2 = this.o.x + Math.cos(this.angle) * this.toRad;
        this.y2 = this.o.y  -Math.sin(this.angle) * this.toRad;
    };

    this.init = function() {
        this.getXY();
        console.log("foo", "M"+this.x1+" "+this.y1+"L"+this.x2+" "+this.y2, attr);
        this.path = this.bc.paper.path(
            "M"+this.x1+" "+this.y1+"L"+this.x2+" "+this.y2
        ).attr(this.attr);
    };

    this.draw = function() {
        //console.log('line.draw()', this.angle, this.fromRad, this.toRad);
        //console.log(this.x1, this);
        this.getXY();
        //console.log(this.x1);
        this.path.attr({ path: "M"+this.x1+" "+this.y1+"L"+this.x2+" "+this.y2 });
    };


    this.init();

};/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global vis4, BubbleTree */

/*
 * loads the data and initializes the bubblechart
 * you need to include the bubblechart.min.js first
 */
BubbleTree.Loader = function(config) {

    var me = this;

    me.config = config;

    me.ns = BubbleTree;

    /*
     * loads data from a local JSON file
     */
    me.loadData = function() {
        var me = this, url = me.config.data;
        console.log('loading url ',url);
        $.ajax({
            url: url,
            context: me,
            dataType: 'json',
            success: function(data) {
                this.run(data);
            }
        });
    };

    /*
     * run will be called by dataLoaded once, well, the data is loaded
     */
    me.run = function(data) {
        var me = this;
        // initialize bubble chart
        var bubbleChart = new BubbleTree(
            me.config
        );
        bubbleChart.setData(data);
        me.config.instance = bubbleChart;
    };

    if (!me.config.hasOwnProperty('data')) {
        //console.error('BubbleTree Error: no data set', me.config);
    }
    if (typeof me.config.data == "string") {
        // use the given js object
        me.loadData();
    } else {
        // load local tree json file
        me.run(me.config.data);
    }
};

/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global vis4, BubbleTree */
/*
 * in JS there's no thing like mouse event capsulation, this
 * class will work around this. It makes it possible to set
 * events like click and hover for a group of objects that
 * belong together
 */
BubbleTree.MouseEventGroup = function(target, members) {

    var me = this;
    me.target = target; // e.g. instance of a bubble
    me.members = members; // e.g. raphael nodes or html elements

    /*
     * public interface for setting click handlers
     */
    me.click = function(callback) {
        var me = this, members = me.members, i, mem;
        me.clickCallback = callback;
        for (i in members) {
            mem = members[i];
            $(mem).click(me.handleClick.bind(me));
        }
    };

    me.handleClick = function(evt) {
        var me = this;
        me.clickCallback({ target: me.target, origEvent: evt, mouseEventGroup: me });
    };

    /*
     *
     */
    me.hover = function(callback) {
        var me = this, members = me.members, i, mem;
        me.hoverCallback = callback;
        for (i in members) {
            mem = members[i];
            $(mem).hover(me.handleMemberHover.bind(me), me.handleMemberUnHover.bind(me));
        }
    };

    /*
     * public interface for setting unhover callback
     */
    me.unhover = function(callback) {
        var me = this;
        me.unhoverCallback = callback;
    };

    /*
     * stores wether the mouse currently hover over any
     * object in our members list. this is used to check
     * wether a occuring hover event is an actual hover
     * event.
     */
    me.wasHovering = false;
    me.mouseIsOver = false;

    me.handleMemberHover = function(evt) {
        var me = this;
        // since we don't know which event will receive first, the unhover of the member
        // the mouse is leaving or the hover of the member the mouse is entering, we will
        // delay the final check a bit
        new vis4.DelayedTask(25, me, me.handleMemberHoverDelayed, evt);

    };

    /*
     * will be called after all unhover events are processed
     */
    me.handleMemberHoverDelayed = function(evt) {
        var me = this;
        // this will eventually override the false set by handleMemberUnHover a few
        // milliseconds ok. Exactly what we want!
        me.mouseIsOver = true;

        if (!me.wasHovering) {
            // the target is newly hovered

            me.wasHovering = true;
            if ($.isFunction(me.hoverCallback)) {
                me.hoverCallback({ target: me.target, origEvent: evt, mouseEventGroup: me });
            }
        } // else can be ignored, no news
    };


    me.handleMemberUnHover = function(evt) {
        var me = this;
        me.mouseIsOver = false;
        // we need to wait a bit to find out if this is a real unhover event
        // or just the change to another element in the member list
        // so we need to delay the final check a bit (let's say 30ms)
        new vis4.DelayedTask(40, me, me.handleMemberUnHoverDelayed, evt);
    };

    me.handleMemberUnHoverDelayed = function(evt) {
        var me = this;
        if (!me.mouseIsOver) {
            // well, finally no nasty hover event has disturbed our good unhover
            // process, so we can assume that this is a real unhover event

            me.wasHovering = false;
            if ($.isFunction(me.unhoverCallback)) {
                me.unhoverCallback({ target: me.target, origEvent: evt, mouseEventGroup: me });
            }
        }
    };

    /*
     * this function is used for later addition of member objects like dynamic tooltips
     */
    me.addMember = function(mem) {
        var me = this;
        // if (me.clickCallback && noClick) $(mem).click(me.handleClick.bind(me));
        if (me.hoverCallback) $(mem).hover(me.handleMemberHover.bind(me), me.handleMemberUnHover.bind(me));
        me.members.push(mem);
    };

    /*
     * this function is used for later removal of member objects like dynamic tooltips
     */
    me.removeMember = function(mem) {
        var me = this, members = me.members, i, tmp = [];
        if (me.clickCallback) $(mem).unbind('click');
        if (me.hoverCallback) $(mem).unbind('mouseenter mouseleave');
        for (i in members) {
            if (members[i] != mem) tmp.push(members[i]);
        }
        me.members = tmp;

    };
};
/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global Raphael, TWEEN, BubbleTree */

/*
 * represents a ring
 */
BubbleTree.Ring = function(node, bc, o, rad, attr) {

    var me = this;
    me.className = "ring";
    me.rad = rad;
    me.bc = bc;
    me.attr = attr;
    me.origin = o;
    me.alpha = 1;
    me.visible = false;
    me.node = node;

    me.init = function() {
        //var o = me.origin;
    };

    me.draw = function() {
        var me = this, o = me.origin;
        if (!me.visible) return;
        me.circle.attr({ cx: o.x, cy: o.y, r: me.rad, 'stroke-opacity': me.alpha });
    };

    /*
     * removes all raphael nodes from stage
     */
    me.hide = function() {
        var me = this;
        me.circle.remove();
        me.visible = false;
    };

    me.show = function() {
        var me = this;
        me.circle = me.bc.paper.circle(o.x, o.y, me.rad).attr(me.attr);
        me.visible = true;
        me.circle.toBack();
    };


    me.init();
};/*jshint undef: true, browser:true, jquery: true, devel: true */
/*global Raphael, TWEEN, vis4, BubbleTree */

/*
 * transforms the current display to a new layout
 * while transitioning, there are several possible cases:
 * - a node exists both before and after the transition
 * - a node appears at the beginning of the transition
 * - a node disappears at the end of the transtion
 */

BubbleTree.Transitioner = function(duration) {

    var me = this;

    me.duration = duration;
    me.running = false;
    me.completeCallbacks = [];

    me.changeLayout = function(layout) {
        var i, o, props, p, me = this;
        me.running = true;
        me.layout = layout;

        // at first show all objects that are marked for showing
        for (i in layout.toShow) {
            o = layout.toShow[i];
            if ($.isFunction(o.show)) o.show();
        }

        for (i in layout.objects) {
            o = layout.objects[i];
            if (o === undefined || o === null) continue;
            props = layout.props[i];

            if (me.duration > 0) {
                var tween = new TWEEN.Tween(o), toProps = {};

                for (p in props) {
                    //o[p] = props[p];
                    toProps[p] = props[p];
                }
                tween.to(toProps, me.duration * 0.6);
                tween.easing(TWEEN.Easing.Exponential.EaseOut);
                if ($.isFunction(o.draw)) tween.onUpdate(o.draw.bind(o));
                if (i == layout.objects.length-1) tween.onComplete(me._completed.bind(me));
                tween.start();
            } else {
                for (p in props) {
                    o[p] = props[p];
                }
                if (o && $.isFunction(o.draw)) o.draw();
            }
        }
        if (me.duration === 0) {
            // redraw all
            for (i in layout.objects) {
                o = layout.objects[i];
                if (o && $.isFunction(o.draw)) o.draw();
            }
            me._completed();
        }
    };

    me.onComplete = function(callback) {
        var me = this;
        try {
            if ($.isFunction(callback)) me.completeCallbacks.push(callback);
        } catch (e) {
            //vis4.log(e);
        }
    };

    me._completed = function() {
        var me = this, callbacks = me.completeCallbacks, i, obj;
        me.running = false;

        for (i in me.layout.objects) {
            obj = me.layout.objects[i];
            if (obj && $.isFunction(obj.draw)) obj.draw(); // the final draw
        }
        // now hide all objects marked for hiding
        for (i in me.layout.toHide) {
            obj = me.layout.toHide[i];
            if (obj && $.isFunction(obj.hide)) obj.hide();
        }

        for (i in callbacks) {
            callbacks[i]();
        }
    };

};/*jshint undef: true, browser:true, jquery: true, devel: true */
/*global Raphael, TWEEN, BubbleTree */

BubbleTree.Utils = {};

BubbleTree.Utils.log = function() {
    try {
        if (window.hasOwnProperty('console')) console.log.apply(this, arguments);
    } catch (e) {}
};

BubbleTree.Utils.amount2rad = function(a) {
    return Math.pow(Math.max(0, a) /BubbleTree.a2radBase, 0.6);
};

BubbleTree.Utils.formatNumber = function(n) {
    var prefix = '';
    if (n < 0) {
        n = n*-1;
        prefix = '-';
    }
    if (n >= 1000000000000) return prefix+Math.round(n / 100000000000)/10 + 't';
    if (n >= 1000000000) return prefix+Math.round(n / 100000000)/10 + 'b';
    if (n >= 1000000) return prefix+Math.round(n / 100000)/10 + 'm';
    if (n >= 1000) return prefix+Math.round(n / 100)/10 + 'k';
    else return prefix+n;

};
/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global BubbleTree */


BubbleTree.Vector = function(x,y) {
    var me = this;
    me.x = x;
    me.y = y;

    /*
     * calculates the length of the vector
     */
    me.length = function() {
        var me = this;
        return Math.sqrt(me.x*me.x + me.y * me.y);
    };

    /*
     * changes the length of the vector
     */
    me.normalize = function(len) {
        var me = this, l = me.length();
        if (!len) len = 1.0;
        me.x *= len/l;
        me.y *= len/l;
    };

    /*
     * creates an exact copy of this vector
     */
    me.clone = function() {
        var me = this;
        return new BubbleTree.Vector(me.x, me.y);
    };
};/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global Raphael, TWEEN, BubbleTree, vis4 */

BubbleTree.Bubbles = BubbleTree.Bubbles || {};

BubbleTree.Bubbles = BubbleTree.Bubbles || {};
/*
 * represents a bubble
 */
BubbleTree.Bubbles.Donut = function(node, bubblechart, origin, radius, angle, color) {

    var ns = BubbleTree, utils = ns.Utils, me = this;
    me.className = "bubble";
    me.node = node;
    me.paper = bubblechart.paper;
    me.origin = origin;
    me.bc = bubblechart;
    me.rad = radius;
    me.angle = angle;
    me.color = color;
    me.alpha = 1;
    me.visible = false;
    me.ns = ns;
    me.bubbleRad = utils.amount2rad(this.node.amount);

    /*
     * child rotation is just used from outside to layout possible child bubbles
     */
    me.childRotation = 0;


    /*
     * convertes polar coordinates to x,y
     */
    me.getXY = function() {
        var me = this, o = me.origin, a = me.angle, r = me.rad;
        me.pos.x = o.x + Math.cos(a) * r;
        me.pos.y = o.y - Math.sin(a) * r;
    };

    /*
     * inistalizes the bubble
     */
    me.init = function() {
        var me = this;
        me.pos = new me.ns.Vector(0,0);
        me.getXY();

        var breakdown = [], b, i, val, bd = [], styles = me.bc.config.bubbleStyles;

        if (!me.node.shortLabel) me.node.shortLabel = me.node.label.length > 50 ? me.node.label.substr(0, 30)+'...' : me.node.label;

        me.breakdownOpacities = [0.2, 0.7, 0.45, 0.6, 0.35];
        me.breakdownColors = [false, false, false, false, false, false, false, false, false, false];

        for (i in me.node.breakdowns) {
            b = me.node.breakdowns[i];
            b.famount = utils.formatNumber(b.amount);
            val = b.amount / me.node.amount;
            breakdown.push(val);
            bd.push(b);

            if (styles && styles.hasOwnProperty('name') && styles.name.hasOwnProperty(b.name) && styles.name[b.name].hasOwnProperty('opacity')) {
                me.breakdownOpacities[bd.length-1] = styles.name[b.name].opacity;
            }

            if (styles && styles.hasOwnProperty('name') && styles.name.hasOwnProperty(b.name) && styles.name[b.name].hasOwnProperty('color')) {
                me.breakdownColors[bd.length-1] = styles.name[b.name].color;
                me.breakdownOpacities[bd.length-1] = 1;
            }
        }
        me.node.breakdowns = bd;
        me.breakdown = breakdown;

        var showIcon = false; //this.bubbleRad * this.bc.bubbleScale > 30;
        // create label
        me.initialized = true;
        //me.show();
    };

    /*
     *
     */
    me.onclick = function(e) {
        var me = this;
        if (typeof me.bc.config.onClick === 'function') {
            me.bc.config.onClick(node);
        }
        me.bc.navigateTo(me.node);

    };

    me.onhover = function(e) {
        var me = this, c = me.bc.$container[0];
        e.node = me.node;
        e.target = me;
        e.bubblePos = { x:me.pos.x, y: me.pos.y };
        e.mousePos = { x:e.origEvent.pageX - c.offsetLeft, y: e.origEvent.pageY - c.offsetTop };
        e.type = 'SHOW';
        me.bc.tooltip(e);
    };

    me.onunhover = function(e) {
        var me = this, c = me.bc.$container[0];
        e.node = me.node;
        e.target = me;
        e.type = 'HIDE';
        e.bubblePos = { x:me.pos.x, y: me.pos.y };
        e.mousePos = { x:e.origEvent.pageX - c.offsetLeft, y: e.origEvent.pageY - c.offsetTop };
        me.bc.tooltip(e);
    };

    this.draw = function() {
        var me = this, r = Math.max(5, me.bubbleRad * me.bc.bubbleScale), ox = me.pos.x, oy = me.pos.y, devnull = me.getXY(), showLabel = r > 20, x = me.pos.x, y = me.pos.y;
        if (!me.visible) return;

        me.alpha = 0.0;
        var attributes = { cx: x, cy: y, r: r, 'fill-opacity': me.alpha, 'class': me.node.id + '-circle'};
        me.circle.attr(attributes);

        me.circle.node.setAttribute('class', 'circle-' + me.node.id);

        if (me.node.stroke) {
            me.dashedBorder.attr({ cx: x, cy: y, r: r, 'stroke-opacity': 1.0 });
            me.dashedBorder.node.setAttribute('class', me.node.strokeClass);
        } else if (me.node.dashed) {
            me.dashedBorder.attr({ cx: x, cy: y, r: r + 3, 'stroke-opacity': 1.0, 'stroke-dasharray': '- '});
            me.dashedBorder.node.setAttribute('class', 'dashed');
        }

        if (me.breakdown.length > 1) {
            // draw breakdown chart
            var i,x0,x1,x2,x3,y0,y1,y2,y3,ir = r*0.85, oa = -Math.PI * 0.5, da;
            for (i in me.breakdown) {
                da = me.breakdown[i] * Math.PI * 2;
                x0 = x+Math.cos((oa))*ir;
                y0 = y+Math.sin((oa))*ir;
                x1 = x+Math.cos((oa+da))*ir;
                y1 = y+Math.sin((oa+da))*ir;
                x2 = x+Math.cos((oa+da))*r;
                y2 = y+Math.sin((oa+da))*r;
                x3 = x+Math.cos((oa))*r;
                y3 = y+Math.sin((oa))*r;
                oa += da;
                var path = "M"+x0+" "+y0+" A"+ir+","+ir+" 0 "+(da > Math.PI ? "1,1" : "0,1")+" "+x1+","+y1+" L"+x2+" "+y2+" A"+r+","+r+" 0 "+(da > Math.PI ? "1,0" : "0,0")+" "+x3+" "+y3+" Z";

                me.breakdownArcs[i].attr({ path: path, 'stroke-opacity': me.alpha*0.2, 'fill-opacity': me.breakdownOpacities[i]*me.alpha });
            }
        }

        //me.label.attr({ x: me.pos.x, y: me.pos.y, 'font-size': Math.max(4, me.bubbleRad * me.bc.bubbleScale * 0.25) });
        me.label.show();
        me.label.css({width: 2 * r + 'px', height: 2 * r + 'px', opacity: 1.0});
        me.label.css({left: (me.pos.x - r) + 'px', top: (me.pos.y - r) + 'px'});
    };

    /*
     * removes all visible elements from the page
     */
    this.hide = function() {
        var me = this, i;
        me.circle.remove();
        me.dashedBorder.remove();
        me.label.remove();
        me.label2.remove();

        //me.bc.$container
        me.visible = false;
        for (i in me.breakdownArcs) {
            me.breakdownArcs[i].remove();
        }

        //if (me.icon) me.icon.remove();
    };

    /*
     * adds all visible elements to the page
     */
    me.show = function() {
        var me = this, i, r = Math.max(5, me.bubbleRad * me.bc.bubbleScale);

        var attributes = {
            stroke: false
        };
        if (!me.icon) {
            attributes.fill = me.color;
        } else {
            attributes['fill-opacity'] = 0;
        }

        me.circle = me.paper.circle(me.pos.x, me.pos.y, r).attr(attributes);

        if ($.isFunction(me.bc.config.initTooltip)) {
            me.bc.config.initTooltip(me.node, me.circle.node);
        }

        me.dashedBorder = me.paper.circle(me.pos.x, me.pos.y,  r*1.05)
            .attr({ stroke: me.node.stroke, 'stroke-opacity': 1.0, fill: false, 'class': 'dashed' });

        var content = '<div class="desc">'+me.node.shortLabel+'</div>';
        if (me.node.icon) {
            content += '<div class="icon-container"><img class="smooth node-img-' + me.node.id + '" src="' + me.node.icon + '"></div>';
        }

        if (me.node.images && me.node.images.length) {
            content += '<div class="images">';

            for(var i = 0; i < me.node.images.length; i++) {
                var image = node.images[i];
                content  += '<img src="' + image + '" alt="profile">';
            }

            content += '</div>';
        }

        var color = me.node.icon ? 'transparent' : me.color;

        var flip;
        if (me.node.detail && !me.node.icon) {
            flip = '<div class="card label ' + me.node.id + '" > ' +
                '<div class="front" style="background: ' + color + ';">' + me.node.shortLabel + '</div> ' +
                '<div class="back" style="background: white; color: black;">' + me.node.detailContent + '</div> ' +
                '</div>';
        }

        var label = flip ? flip : '<div class="label '+me.node.id + (me.node.icon ? ' iconized ': '') + '" style="background:' + color + '">' + content + '</div>';
        me.label = $(label);

        if (me.node.detail && !me.node.icon) {
            me.label.flip({
                'trigger': 'manual'
            });

            me.label.on('click', function(event) {
                if (me.label.hasClass('current')) {
                    $('.' + me.node.id).flip('toggle');
                }
            });
        }

        if (me.node.clazz) {
            me.label.addClass(me.node.clazz);
        }

        me.bc.$container.append(me.label);

        var data = me.node;
        label   = $('.label.' + data.id);

        if (me.node.droppable) {
            me.enableDrop(data);
        }

        if (data.timeProgress && data.timeProgress < 1.0) {
            if (data.timeProgressBar) {
                data.timeProgressBar.destroy();
            }
            if (label.length) {
                data.timeProgressBar = factory.build(label.get(0), '#009ddc', 'easeIn', data.timeProgress);
            }
        }

        if (me.node.children.length > 1) {
            $(me.circle.node).css({ cursor: 'pointer'});
            $(me.label).css({ cursor: 'pointer'});
        }

        // additional label
        me.label2 = $('<div class="label2 '+me.node.id+'"><span>'+me.node.shortLabel+'</span></div>');
        me.bc.$container.append(me.label2);

        var list = [me.circle.node, me.label];

        if (me.breakdown.length > 1) {
            me.breakdownArcs = {};

            for (i in me.breakdown) {
                var col = me.breakdownColors[i] ? me.breakdownColors[i] : '#fff',
                    arc = me.paper.path("M 0 0 L 2 2")
                        .attr({ fill: col, 'fill-opacity': Math.random()*0.4 + 0.3, stroke: '#fff'});
                me.breakdownArcs[i] = arc;
                // $(arc.node).hover(me.arcHover.bind(me), me.arcUnhover.bind(me));

                if ($.isFunction(me.bc.config.initTooltip)) {
                    me.bc.config.initTooltip(me.node.breakdowns[i], arc.node);
                }
            }

            for (i in me.breakdownArcs) {
                // we dont add the breakdown arcs to the list 'cause
                // we want them to fire different mouse over events
                // list.push(me.breakdownArcs[i].node);
                $(me.breakdownArcs[i].node).click(me.onclick.bind(me));
            }
        }

        var mgroup = new me.ns.MouseEventGroup(me, list);
        mgroup.click(me.onclick.bind(me));
        mgroup.hover(me.onhover.bind(me));
        mgroup.unhover(me.onunhover.bind(me));

        me.visible = true;

    };

    me.enableDrop = function(node) {
        console.log('Enabling drop');
        var element = $('.label.' + node.id),
            me      = this;

        element.attr('drop', 'true');
        element.addClass('droppable');

        element.off('dragover');
        element.off('dragleave');
        element.off('dropover');
        element.off('drop');

        element.droppable({
            over: function(event, ui) {
                element.addClass('dragover');
            },
            out: function(event, ui) {
                element.removeClass('dragover');
            }
        });

        element.on('dragover', function (event) {
            event.stopPropagation();
            event.preventDefault();

            element.addClass('dragover');
        });

        element.on('dragleave', function (event, drop, drag) {
            event.stopPropagation();
            event.preventDefault();

            console.log('Dragging leave');
            element.removeClass('dragover');
        });

        element.on('drop', function (event, drop, drag) {
            event.stopPropagation();
            event.preventDefault();
            element.removeClass('dragover');

            me.bc.config.handleDrop(event, node);
        });
    };

    me.arcHover = function(e) {
        var me = this, c = me.bc.$container[0], i,
            arcs = me.breakdownArcs, node,
            bd = me.node.breakdowns;

        for (i in arcs) {
            if (arcs[i].node == e.target) {
                e.node = bd[i];
                e.bubblePos = { x:me.pos.x, y: me.pos.y };
                e.mousePos = { x:e.pageX - c.offsetLeft, y: e.pageY - c.offsetTop };
                e.target = me;
                e.type = 'SHOW';
                me.bc.tooltip(e);
                return;
            }
        }

        vis4.log('cant find the breakdown node');
    };

    me.arcUnhover = function(e) {
        var me = this, c = me.bc.$container[0], i,
            arcs = me.breakdownArcs, node,
            bd = me.node.breakdowns;

        for (i in arcs) {
            if (arcs[i].node == e.target) {
                e.node = bd[i];
                e.bubblePos = { x:me.pos.x, y: me.pos.y };
                e.mousePos = { x:e.pageX - c.offsetLeft, y: e.pageY - c.offsetTop };
                e.type = 'HIDE';
                e.target = me;
                me.bc.tooltip(e);
                return;
            }
        }

        vis4.log('cant find the breakdown node');
    };

    me.init();
};/*jshint undef: true, browser:true, jquery: true, devel: true, smarttabs: true */
/*global Raphael, TWEEN, BubbleTree, vis4, vis4loader */

BubbleTree.Bubbles = BubbleTree.Bubbles || {};