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

var vis4 = function() {};

vis4.log = function() {
	try {
		if (window.console !== null) console.log.apply(this, arguments);
	} catch (e) {};
};

vis4.str2time = function(s) {
	var p = s.split(".");
	return Math.round(Date.UTC(2000+p[0], p[1]-1, p[2])*0.001);
};

vis4.round = function(val, prec) {
	var d = Math.pow(10, prec);
	return Math.round(val*d)/d;
};
vis4.formatNumber_ksep = '.';
vis4.formatNumber_dsep = ',';
vis4.formatNumber = function(nr, round) {
	//if (nr > 999999 && round) return (''+vis4.round(nr/1000000,1)).replace(".",vis4.formatNumber_dsep)+"&nbsp;Mio";
	nr = ''+nr;
	var out = '', c=0;
	for (var i=nr.length-1;i>=0;i--) {
		if (c > 0 && c < nr.length && c%3==0) out = vis4.formatNumber_ksep + out;
		out = nr[i] + out;
		c++;
	}
	return out;
};
vis4.parseTSV = function(raw, asObject) {
	var lines = raw.split("\n");
	var data = [];
	var props;
	var l;
	for (l=0; l<lines.length; l++) {
		var line = lines[l];
		if (line !== '') {
			//if (line != lines[lines.length-1]) line = StringUtil.trim(line);
			if (asObject) {
				if (l === 0) props = line.split("\t");
				else {
					var obj = { };
					var values = line.split("\t");
					if (values.length != props.length) {
						return "wrong tsv format";
					}
					for (var p = 0; p < props.length; p++) {
						obj[$.trim(props[p])] = $.trim(values[p]);
					}
					data.push(obj);
				}
			} else {
				data.push(line.split("\t"));
			}
		}
	}
	return data;
};

vis4.map = function(arr, idCol) {
	var map = {};
	for (var i=0; i<arr.length; i++) {
		map[arr[i][idCol]] = arr[i];
	}
	return map;
};

vis4.DelayedTask = function(/* delay, scope, func, args */) {
	
	var me = this;
	
	me.init = function(args) {
		var me = this, taskArgs = [];	
		for (var i in args) {
			if (i > 2) taskArgs.push(args[i]);
		}
		me.func = args[2];
		me.scope = args[1];
		me.args = taskArgs;
		me.running = true;
		me.timer = window.setTimeout(this.run.bind(me), args[0]);
	};
	
	me.run = function() {
		var me = this;
		me.func.apply(me.scope, me.args);
		me.running = false;
	};
	
	me.cancel = function() {
		vis4.log('canceling timer', this);
		window.clearTimeout(this.timer);
		this.running = false;
	};
	
	me.init(arguments);
};

var vis4loadingItem = function(url, id, type, ldr) { 
	this.url = url; this.id = id; this.type = type; this.loader = ldr;
	
	this.load = function() {
		$.get(this.url, this.processContent.bind(this));
	};

	this.processContent = function(content) {
		if (this.type == 'tsv') this.data = vis4.parseTSV(content, true);
		else if (this.type == 'json') this.data = (typeof(content) == "string") ? $.parseJSON(content) : content;
		else this.data = content;
		this.loader.itemLoaded();
	};
	
};

/*
 * usage:
 *
 * var ldr = new vis4loader();
 * ldr.add('data.txt', 'id1');
 * ldr.add('data/employes.tsv', 'employes', 'tsv');
 * ldr.add('data/list.json', 'list', 'json');
 * ldr.load(function(ldr) 
 *
 */
var vis4loader = function() { 
	this.items = []; this.byID = {}; 
	
	this.add = function(url, id, type) {
		if (type === null) type = 'text';
		var item = new vis4loadingItem(url, id, type, this);
		this.items.push(item);
		this.byID[id] = item;
	};

	this.load = function(callback) {
		this.callback = callback;
		this.loaded = 0;
		for (var i=0;i<this.items.length;i++) {
			this.items[i].load();
		}
	};

	this.itemLoaded = function() {
		this.loaded++;
		if (this.loaded == this.items.length) this.callback(this);
	};

	this.get = function(id) {
		return this.byID[id].data;
	};
};

Function.prototype.bind = function(scope) {
  var _function = this;
  return function() {
    return _function.apply(scope, arguments);
  };
};


/*
 * vis4color.fromHex("#FF0000").saturation("*.5").lightness(.8).hue("+10").hex;
 *
 *
 */

var vis4color = function(mode) {
	
	this.h = 0; this.s = 0.5; this.l = 0.8; this.v = 1; this.i = 1; this.r = 255; this.g = 0; this.b = 0; 
	this.x = "#FF0000"; this.u = 0; this.br = 1; this.K = 1/180*Math.PI;
	if (mode == 'hsi' || mode == 'hsl' || mode == 'hsb' || mode == 'hsv') this.mode = mode;

	this.log = function(s) {
		if (window.console !== null) console.log(s);
	};
	
	this.cos = function(d) {
		return Math.cos(d*this.K);
	};

	this.trim = function(value) {
		return Math.max(0, Math.min(1, value));
	};

	this.setMode = function(mode) {
		if (mode != 'hsv' && mode != 'hsi' && mode != 'hsl' && mode != 'hsb') {
			this.log("unknown color mode "+mode);
		}
		this.mode = mode;
		// recalc hsx-color
		this.rgb2hsx();	
	};

	this.setHexColor = function(hex) {
		if (hex.charAt(0) != "#") hex = "#"+hex;
		if (hex.length == 4) hex = "#"+hex.charAt(1)+hex.charAt(1)+hex.charAt(2)+hex.charAt(2)+hex.charAt(3)+hex.charAt(3);
		if (hex.length != 7) this.log("invalid hex color");
		this.x = hex;
		this.hex2int();
		this.int2rgb();
		this.rgb2hsx();
	};

	this.setRGBColor = function(r,g,b) {
		this.r = r; this.b = b; this.g = g;
		this.rgb2int();
		this.int2hex();
		this.rgb2hsx();
	};

	this.setHSVColor = function(h,s,v) {
		if (this.mode != 'hsv') this.mode = 'hsv';
		this.h = h; this.s = this.trim(s); this.v = this.trim(v);
		this.hsv2rgb();
		this.rgb2int();
		this.int2hex();
	};

	this.setHSLColor = function(h,s,l) {
		if (this.mode != 'hsl') this.mode = 'hsl';
		this.h = h; this.s = this.trim(s); this.l = this.trim(l);
		this.hsl2rgb();
		this.rgb2int();
		this.int2hex();
	};

	this.setHSBColor = function(h,s,b) {
		if (this.mode != 'hsb') this.mode = 'hsb';
		this.h = h; this.s = this.trim(s); this.b = this.trim(b);
		this.hsb2rgb();
		this.rgb2int();
		this.int2hex();
	};

	this.setHSIColor = function(h,s,i) {
		if (this.mode != 'hsi') this.mode = 'hsi';
		this.h = h; this.s = this.trim(s); this.i = this.trim(i);
		this.hsi2rgb();
		this.rgb2int();
		this.int2hex();
	};

	// private methods

	this.onChange = function() { };

	this.rgb2int = function() {
		this.u = this.r << 16 | this.g << 8 | this.b;
		this.onChange();
	};

	this.int2rgb = function() {
		this.r = this.u >> 16;
		this.g = this.u >> 8 & 0xFF;
		this.b = this.u & 0xFF;	
	};

	this.hex2int = function() {
		this.u = parseInt(this.x.substr(1), 16);
		this.onChange();
	};

	this.int2hex = function() {
		var str = "000000" + this.u.toString(16).toUpperCase();
		this.x = "#" + str.substr(str.length - 6);
		this.onChange();
	};

	this.int2rgb = function() {
		this.r = this.u >> 16;
		this.g = this.u >> 8 & 0xFF;
		this.b = this.u & 0xFF;	
	};

	this.hsx2rgb = function() {
		switch (this.mode) {
			case 'hsv': this.hsv2rgb(); break;
			case 'hsi': this.hsi2rgb(); break;
			case 'hsl': this.hsl2rgb(); break;
			case 'hsb': this.hsb2rgb(); break;
		}
	};

	this.rgb2hsx = function() {
		switch (this.mode) {
			case 'hsv': this.rgb2hsv(); break;
			case 'hsi': this.rgb2hsi(); break;
			case 'hsl': this.rgb2hsl(); break;
			case 'hsb': this.rgb2hsb(); break;
		}
	};

	this.hue = function(h) {
		this._evaluate(h, "h");
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this.saturation = function(s) {
		this._evaluate(s, "s"); 
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this.lightness = function(l) {
		if (this.mode != "hsl") { this.log("WARNING: lightness property not available in "+this.mode+" mode"); return; }
		this._evaluate(l, "l"); 
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this.brightness = function(br) {
		if (this.mode != "hsb") { this.log("WARNING: brightness property not available in "+this.mode+" mode"); return; }
		this._evaluate(br, "br");
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this.value = function(v) {
		if (this.mode != "hsv") { this.log("WARNING: value property not available in "+this.mode+" mode"); return; }
		this._evaluate(v, "v");
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this.intensity = function(i) {
		if (this.mode != "hsi") { this.log("WARNING: intensity property not available in "+this.mode+" mode"); return; }
		this._evaluate(i, "i"); 
		this.hsx2rgb();
		this.rgb2int();
		this.int2hex();
		return this;
	};

	this._evaluate = function(val, propName) {
		if (typeof(val) == "string") {
			if (val.charAt(0) == "+" && !isNaN(val.substr(1))) {
				this[propName] = Number(this[propName]) + Number(val.substr(1));
			} else if (val.charAt(0) == "-" && !isNaN(val.substr(1))) {
				this[propName] = this[propName] - Number(val.substr(1));
			} if (val.charAt(0) == "*" && !isNaN(val.substr(1))) {
				this[propName] = this[propName] * Number(val.substr(1));
			} else if (val.charAt(0) == "/" && !isNaN(val.substr(1))) {
				this[propName] = this[propName] / Number(val.substr(1));
			} 
		} else if (!isNaN(val)) {
			this[propName] = Number(val);
		}
	};

	this.rgb = function() { return [this.r,this.g,this.b]; };
	this.hsl = function() { return [this.h,this.s,this.l]; };

	// hsv magic

	this.rgb2hsv = function() {
		var min = Math.min(Math.min(this.r, this.g), this.b),
			max = Math.max(Math.max(this.r, this.g), this.b),
			delta = max - min;
		
		this.v = max/255;
		this.s = delta / max;
		if (this.s === 0) {
			this.h = undefined;
		} else {
			if (this.r == max) this.h = (this.g - this.b) / delta;
			if (this.g == max) this.h = 2+(this.b - this.r) / delta;
			if (this.b == max) this.h = 4+(this.r - this.g) / delta;
			this.h *= 60;
			if (this.h < 0) this.h += 360;
		}
	};

	this.hsv2rgb = function() {
		var h = this.h, s = this.s, _rgb = this._rgb, v = this.v*255, i, f, p, q, t;
		
		if (this.s === 0 && isNaN(h)) {
			this.r = this.g = this.b = v;
		} else {
			if (h == 360) h = 0;
			h /= 60;
			i = Math.floor(h);
			f = h - i;
			p = v * (1 - s);
			q = v * (1 - s * f);
			t = v * (1 - s * (1 - f));
			
			switch (i) {
				case 0: _rgb(v, t, p); break;
				case 1: _rgb(q, v, p); break;
				case 2: _rgb(p, v, t); break;
				case 3: _rgb(p, q, v); break;
				case 4: _rgb(t, p, v); break;
				case 5: _rgb(v, p, q); 
			}
		}			
	};

	this._rgb = function(r,g,b) {
		this.r = r; this.g = g; this.b = b;
	};
	// hsl magic

	this.rgb2hsl = function() {
		var r = this.r / 255, 
			g = this.g / 255, 
			b = this.b / 255,
			min = Math.min(Math.min(r, g), b),
			max = Math.max(Math.max(r, g), b);
		
		this.l = (max + min) / 2;
		if (max == min) {
			this.s = 0;
			this.h = undefined;
		} else {
			if (this.l < 0.5) {
				this.s = (max - min) / (max + min);
			} else {
				this.s = (max - min) / (2 - max - min);
			}
		}
		if (r == max) this.h = (g - b) / (max - min);
		else if (g == max) this.h = 2 + (b - r) / (max - min);
		else if (b == max) this.h = 4 + (r - g) / (max - min);
		
		this.h *= 60;
		if (this.h < 0) this.h += 360;
	};

	this.hsl2rgb = function() {
		if (this.s === 0) {
			this.r = this.g = this.b = this.l*255;
		} else {
			var t1, t2, t3 = [0,0,0], c = [0,0,0];
			if (this.l < 0.5) {
				t2 = this.l * (1 + this.s);
			} else {
				t2 = this.l + this.s - this.l * this.s;
			}
			t1 = 2 * this.l - t2;
			var h = this.h / 360;
			t3[0] = h + 1 / 3;
			t3[1] = h;
			t3[2] = h - 1 / 3;
			for (var i = 0; i < 3; i++) {
				if (t3[i] < 0) t3[i] += 1;
				if (t3[i] > 1) t3[i] -= 1;
				
				if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
				else if (2 * t3[i] < 1) c[i] = t2;
				else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
				else c[i] = t1;
			}
			this.r = c[0] * 255;
			this.g = c[1] * 255;
			this.b = c[2] * 255;
		}
	};

	// hsb magic

	this.rgb2hsb = function() {
		this.rgb2hsl();
		this.br = this._rgbLuminance();
	};

	this._rgbLuminance = function() {
		return (0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b) / 255; 
	};

	this.hsb2rgb = function() {
		var treshold = 0.001;
		var l_min = 0, l_max = 1, l_est = 0.5;
		var current_brightness;
		
		// first try
		this.l = l_est;
		this.hsl2rgb();
		current_brightness = this._rgbLuminance();
		var trys = 0;
		
		while (Math.abs(current_brightness - this.br) > treshold && trys < 100) {
			
			if (current_brightness > this.br) {
				// too bright, next try darker
				l_max = l_est;					
			} else {
				// too dark, next try brighter
				l_min = l_est;
			}
			l_est = (l_min + l_max) / 2;
			this.l = l_est;
			this.hsl2rgb();
			current_brightness = this._rgbLuminance();
			trys++;
		}
		this.br = current_brightness;
	};

	// hsi magic

	this.rgb2hsi = function() { // http://fourier.eng.hmc.edu/e161/lectures/colorprocessing/node3.html
		var min, r = this.r, g = this.g, b = this.b,
			max = Math.max(Math.max(r, g), b),
			sum = r + g + b,
			delta = max - min;
		
		r = r / sum;
		g = g / sum;
		b = b / sum;
		
		min = Math.min(Math.min(r, g), b);
		//trace('rgb = ',r,g,b,' min = ' + min);
		
		this.i = (r + g + b) / 765;			
		this.h = this.acos((r - 0.5*g - 0.5*b) / Math.sqrt( (r - g) * (r - g) + (r - b) * (g - b)) );			
		this.s = 1 - 3 * min;
		
		if (b > g) this.h = 360 - this.h;
	};	
		
	this.hsi2rgb = function() { // http://fourier.eng.hmc.edu/e161/lectures/colorprocessing/node4.html
		var h = this.h,i=this.i,s=this.s, r, b, g, cos = this.cos;
		
		if (h <= 120) {
			b = (1 - s) / 3;
			r = (1 + (s * cos(h)) / cos(60 - h)) / 3;
			g = 1 - (b + r);
		} else if (h <= 240) {
			h -= 120;
			r = (1 - s) / 3;
			g = (1 + (s * cos(h)) / cos(60 - h)) / 3;
			b = 1 - (r + g);
		} else {
			h -= 240;
			g = (1 - s) / 3;
			b = (1 + (s * cos(h)) / cos(60 - h)) / 3;
			r = 1 - (g + b);
		}
		r = Math.min(255, r*i*3*255);
		g = Math.min(255, g*i*3*255);
		b = Math.min(255, b*i*3*255);			
	};
};

// static constructors
			
vis4color.fromHex = function(color, mode) {
	if (mode == null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setHexColor(color);
	return c;
};

vis4color.fromRGB = function(r, g, b, mode) {
	if (mode === null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setRGBolor(r,g,b);
	return c;
};

vis4color.fromHSV = function(h,s,v, mode) {
	if (mode === null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setHSVColor(h,s,v);
	return c;
};

vis4color.fromHSL = function(h,s,l, mode) {
	if (mode === null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setHSLColor(h,s,l);
	return c;
};

vis4color.fromHSB = function(h,s,b, mode) {
	if (mode === null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setHSBColor(h,s,b);
	return c;
};

vis4color.fromHSI = function(h,s,i, mode) {
	if (mode === null) mode = 'hsl';
	var c = new vis4color(mode);
	c.setHSIColor(h,s,i);
	return c;
};
