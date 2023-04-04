!function(t, e) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var i = e();
        for (var n in i)
            ("object" == typeof exports ? exports : t)[n] = i[n]
    }
}(this, function() {
    return function(t) {
        var e = {};
        function i(n) {
            if (e[n])
                return e[n].exports;
            var r = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(r.exports, r, r.exports, i),
            r.l = !0,
            r.exports
        }
        return i.m = t,
        i.c = e,
        i.d = function(t, e, n) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        i.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(t, e) {
            if (1 & e && (t = i(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (i.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var r in t)
                    i.d(n, r, function(e) {
                        return t[e]
                    }
                    .bind(null, r));
            return n
        }
        ,
        i.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return i.d(e, "a", e),
            e
        }
        ,
        i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        i.p = "",
        i(i.s = 32)
    }([
        function(t, e, i) {    
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = {
            DEVICE: {
                ANDROID: 0,
                IOS: 1
            },
            PHONE_PLACEMENT: { 
                HOLD: 0,     
                OTHER: 1     
            },
            ACC_SENSOR_STATUS: { 
                EMPTY: -1,
                LOW_FREQ: 1,
                NORMAL: 2
            },
            DRIVING_MODE: {
                INDOOR: 0,
                OUTDOOR: 1
            },
            HEADSTATUS: {
                NORMAL: 0,
                DRIFT: 1,
                ERROR: 2
            },
            FUSION_MODEL: {
                DIFF: 0,
                PDR: 1
            },
            POSITION: {
                MODE: {
                    DRIVING: 0,
                    WALKING: 1
                }
            }
        };
        e.CONSTANTS = n,
        e.KF_TYPE = {
            PDR_WLK: 0,
            PDR_NAV: 1,
            DIFF_WLK: 2,
            DIFF_BASE: 3,
            DIFF_DRV: 4,
            DIFF_DRV_OUT_AND: 5,
            DIFF_DRV_OUT_IOS: 6
        },
        e.LOC_AREA_STATUS = {
            BUILDING: 1,
            OUT_BUILDING: 2,
            EXCEED: 3,
            UNSET: 4
        },
        e.POSITION_MODE = {
            DRIVING: 0,
            WALKING: 1
        },
        e.MOTION_STATE = {
            UNCERTAIN: 0,
            STATIC: 1,
            WALKING: 2,
            RUN: 3,
            DRIVING: 4
        },
        e.TRANS_FLOOR_TYPE = {
            NULL: 0,
            STAIRS: 1,
            ELEVATOR: 2,
            LIFT: 3
        },
        e.ACCORD_LEVEL = {
            DEVIATED: -1,
            UNCERTAIN: 0,
            GOOD: 1,
            FINE: 2
        }
    }
    , function(t, e, i) {   
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.Geometric = void 0;
        var n = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , s = i(4)
          , o = i(5);
        var a = function() {
            function t() {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            return r(t, null, [{
                key: "angleDiffRad",
                value: function(t, e) {
                    var i = t - e;
                    return i >= Math.PI && (i -= 2 * Math.PI),
                    i <= -Math.PI && (i += 2 * Math.PI),
                    i
                }
            }, {
                key: "angleDiffDeg",
                value: function(t, e) {
                    var i = t - e;
                    return i >= 180 && (i -= 360),
                    i <= -180 && (i += 360),
                    i
                }
            }, {
                key: "angleBetweenVectors",
                value: function(t, e) {
                    var i = t[0]
                      , n = t[1]
                      , r = e[0]
                      , o = e[1]
                      , a = Math.sqrt(i * i + n * n) * Math.sqrt(r * r + o * o);
                    if (0 === a)
                        return 0;
                    var h = i * o - n * r > 0 ? -1 : 1
                      , l = i * r + n * o;
                    (l > a || -l > a) && (l = a);
                    var c = l / a;
                    return s.Numerical.toFixed(h * Math.acos(c), 2)
                }
            }, {
                key: "angleBetweenVectors3D",
                value: function(t, e) {
                    var i = t[0]
                      , n = t[1]
                      , r = t[2]
                      , o = e[0]
                      , a = e[1]
                      , h = e[2]
                      , l = Math.sqrt(i * i + n * n + r * r) * Math.sqrt(o * o + a * a + h * h);
                    if (0 === l)
                        return 0;
                    var c = i * o + n * a + r * h;
                    return (c > l || -c > l) && (c = l),
                    s.Numerical.toFixed(Math.acos(c / l), 2)
                }
            }, {
                key: "euclideanDistance",
                value: function(e, i) {
                    var n = t.formatPoint(e)
                      , r = t.formatPoint(i);
                    if (!n || !r)
                        return -1;
                    var o = Math.sqrt(Math.pow(n.x - r.x, 2) + Math.pow(n.y - r.y, 2) + Math.pow(n.z - r.z, 2));
                    return s.Numerical.toFixed(o, 2)
                }
            }, {
                key: "projectPoint2Segment",
                value: function(e, i, n) {
                    var r = t.formatPoint(e)
                      , s = t.formatPoint(i)
                      , o = t.formatPoint(n)
                      , a = (r.x - s.x) * (o.x - s.x) + (r.y - s.y) * (o.y - s.y) + (r.z - s.z) * (o.z - s.z);
                    if (a <= 0)
                        return [t.euclideanDistance(r, s), s, 0];
                    var h = Math.pow(t.euclideanDistance(s, o), 2);
                    if (a >= h)
                        return [t.euclideanDistance(r, o), o, 2];
                    var l = a / h
                      , c = {
                        x: s.x + l * (o.x - s.x),
                        y: s.y + l * (o.y - s.y),
                        z: s.z + l * (o.z - s.z)
                    };
                    return [t.euclideanDistance(r, c), c, 1]
                }
            }, {
                key: "vectorDirDeg",
                value: function(t, e) {
                    return 180 * Math.atan2(e.x - t.x, e.y - t.y) / Math.PI
                }
            }, {
                key: "vectorDirRad",
                value: function(t, e) {
                    return Math.atan2(e.x - t.x, e.y - t.y)
                }
            }, {
                key: "rotateAngle",
                value: function(t, e) {
                    if (void 0 === e || null == e)
                        return null;
                    var i = Math.sin(t)
                      , n = Math.cos(t)
                      , r = i * Math.cos(e) + n * Math.sin(e)
                      , o = n * Math.cos(e) - i * Math.sin(e);
                    return s.Numerical.toFixed(Math.atan2(r, o), 2)
                }
            }, {
                key: "isPointInPolygon",
                value: function(e, i, n) {
                    var r = t.formatPolygon(i, n)
                      , s = t.formatPoint(e);
                    if (!s || !r)
                        return !1;
                    for (var o = !1, a = 0, h = r.length - 1; a < r.length; h = a++) {
                        var l = r[a].x
                          , c = r[a].y
                          , u = r[h].x
                          , f = r[h].y;
                        if (t.projectPoint2Segment(s, r[a], r[h])[0] < 1e-8)
                            return !0;
                        c > s.y != f > s.y && s.x < (u - l) * (s.y - c) / (f - c) + l && (o = !o)
                    }
                    return o
                }
            }, {
                key: "isPointInRoad",
                value: function(e, i, n) {
                    var r = void 0;
                    switch (i.type) {
                    case o.RoadType.POLYGON:
                        r = i.vertexes;
                        break;
                    case o.RoadType.MULTIPOLYGON:
                        r = i.vertexes[0];
                        break;
                    default:
                        return !1
                    }
                    return t.isPointInPolygon(e, r, n)
                }
            }, {
                key: "getCompletePolygon",
                value: function(t, e) {
                    var i = [];
                    return t.forEach(function(t) {
                        i.push(e[t])
                    }),
                    i
                }
            }, {
                key: "dim2List2ObjList",
                value: function(t, e) {
                    void 0 === e && (e = 0);
                    var i = [];
                    return t.forEach(function(t) {
                        i.push({
                            x: t[0],
                            y: t[1],
                            z: e
                        })
                    }),
                    i
                }
            }, {
                key: "formatPolygon",
                value: function(e, i) {
                    var n = e;
                    if (!Array.isArray(e))
                        return null;
                    if (Array.isArray(e[0]))
                        n = t.dim2List2ObjList(e);
                    else if (e[0].hasOwnProperty("x"))
                        ;
                    else {
                        if (!i)
                            return null;
                        n = t.getCompletePolygon(e, i)
                    }
                    return n[0].x === n[n.length - 1].x && n[0].y === n[n.length - 1].y && n.shift(),
                    n
                }
            }, {
                key: "formatPoint",
                value: function(t) {
                    var e = {};
                    if (Array.isArray(t))
                        2 === t.length && (e = {
                            x: t[0],
                            y: t[1],
                            z: 0
                        }),
                        3 === t.length && (e = {
                            x: t[0],
                            y: t[1],
                            z: t[2]
                        });
                    else {
                        if (!t.hasOwnProperty("x") || !t.hasOwnProperty("y"))
                            return null;
                        e = {
                            x: t.x,
                            y: t.y,
                            z: t.z
                        },
                        t.hasOwnProperty("z") || (e.z = 0)
                    }
                    return e
                }
            }, {
                key: "projectPoint2Road",
                value: function(e, i, n) {
                    if (i.type === o.RoadType.LINE)
                        return t.projectPoint2Segment(e, n[i.vertexes[0]], n[i.vertexes[1]]);
                    if (t.isPointInRoad(e, i, n)) {
                        if (i.type === o.RoadType.MULTIPOLYGON)
                            for (var r = 1; r < i.vertexes.length; r++)
                                if (t.isPointInPolygon(e, i.vertexes[r], n))
                                    return t.projectPoint2PolygonEdge(e, i.vertexes[r], n);
                        return [0, e]
                    }
                    var s = void 0;
                    return i.type === o.RoadType.POLYGON ? s = i.vertexes : i.type === o.RoadType.MULTIPOLYGON && (s = i.vertexes[0]),
                    t.projectPoint2Polygon(e, s, n)
                }
            }, {
                key: "projectPoint2Polygon",
                value: function(e, i, n) {
                    return t.isPointInPolygon(e, i, n) ? [0, t.formatPoint(e)] : t.projectPoint2PolygonEdge(e, i, n)
                }
            }, {
                key: "projectPoint2PolygonEdge",
                value: function(e, i, n) {
                    var r = Number.MAX_VALUE
                      , o = void 0
                      , a = t.formatPolygon(i, n)
                      , h = t.formatPoint(e);
                    if (!h || !a)
                        return [r, o];
                    for (var l = 0, c = a.length - 1; l < a.length; c = l++) {
                        var u = a[l]
                          , f = a[c]
                          , d = t.projectPoint2Segment(h, u, f);
                        r > d[0] && (r = d[0],
                        o = d[1])
                    }
                    return [r = s.Numerical.toFixed(r, 2), o]
                }
            }, {
                key: "projectPoint2Path",
                value: function(e, i, r) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "region";
                    e.z = i;
                    for (var o = [], a = Number.MAX_VALUE, h = void 0, l = void 0, c = 0; c < r.length; c++)
                        if (i === r[c][s])
                            if (r[c + 1] && r[c + 1][s] === r[c][s]) {
                                var u = t.projectPoint2Segment(e, r[c], r[c + 1])
                                  , f = n(u, 2)
                                  , d = f[0]
                                  , v = f[1];
                                d < a && (h = v,
                                a = d,
                                o = [c, c + 1])
                            } else {
                                var p = t.euclideanDistance(e, r[c]);
                                p < a && (a = p,
                                l = void 0 !== r[c].type ? r[c].type : -1,
                                h = r[c],
                                o = [c])
                            }
                        else if ("z" === s && r[c + 1] && (i - r[c + 1].z) * (i - r[c].z) < 0) {
                            var y = t.projectPoint2Segment(e, r[c], r[c + 1])
                              , m = n(y, 2)
                              , g = m[0]
                              , P = m[1];
                            g < a && g < 12 && (h = P,
                            a = g,
                            o = [c, c + 1])
                        }
                    return [a, h ? {
                        x: h.x,
                        y: h.y,
                        region: r[o[0]].region,
                        z: r[o[0]].z,
                        buildingCode: r[o[0]].buildingCode,
                        type: l
                    } : void 0, o]
                }
            }, {
                key: "pathRouteDistance",
                value: function(e, i, n, r, s) {
                    n = parseInt(n),
                    s = parseInt(s);
                    var o = 0 === n ? e[0] : t.projectPoint2Segment(i, e[n - 1], e[n])[1]
                      , a = 0 === s ? e[0] : t.projectPoint2Segment(r, e[s - 1], e[s])[1]
                      , h = void 0;
                    if (n === s)
                        h = t.euclideanDistance(o, a);
                    else if (n < s)
                        if (o.z !== a.z)
                            h = 0;
                        else {
                            h = t.euclideanDistance(o, e[n]) + t.euclideanDistance(a, e[s - 1]);
                            for (var l = n; l < s - 1; l++)
                                h += t.euclideanDistance(e[l], e[l + 1])
                        }
                    else if (o.z !== a.z)
                        h = Number.MAX_VALUE;
                    else {
                        h = t.euclideanDistance(o, e[n - 1]) + t.euclideanDistance(a, e[s]);
                        for (var c = s; c < n - 1; c++)
                            h += t.euclideanDistance(e[c], e[c + 1])
                    }
                    return [h, Math.abs(h - t.euclideanDistance(i, r))]
                }
            }, {
                key: "checkAlongPath",
                value: function(e, i, n, r, s) {
                    return (n = parseInt(n)) === (s = parseInt(s)) ? t.euclideanDistance(i, e[n]) >= t.euclideanDistance(r, e[n]) : n < s
                }
            }]),
            t
        }();
        e.Geometric = a
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.LocationUtils = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(1);
        var s = function() {
            function t() {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            return n(t, null, [{  
                key: "checkInRegion", 
                value: function(t, e, i) {
                    var n = !1;
                    if (e && t)
                        for (var s = 0; s < t.length; ++s)
                            if ((void 0 === i || i === t[s].z || void 0 === t[s].z && !t[s].zs || t[s].zs && t[s].zs.includes(i)) && (0 === t[s].polygon || r.Geometric.isPointInPolygon(e, t[s].polygon))) {
                                n = !0;
                                break
                            }
                    return n
                }
            }, {
                key: "initCheckInRegion",
                value: function(t, e, i) {
                    var n = !1;
                    if (e && t)
                        for (var s = 0; s < t.length; ++s)
                            if ((void 0 === i || i === t[s].z || "top_open" === t[s].type) && (0 === t[s].polygon || r.Geometric.isPointInPolygon(e, t[s].polygon))) {
                                n = !0;
                                break
                            }
                    return n
                }
            }, {
                key: "checkInWhichRegion",
                value: function(t, e, i) {
                    var n = -1;
                    if (e && t)
                        for (var s = 0; s < t.length; ++s)
                            if ((void 0 === i || i === t[s].z || void 0 === t[s].z && !t[s].zs || t[s].zs && t[s].zs.includes(i)) && (0 === t[s].polygon || r.Geometric.isPointInPolygon(e, t[s].polygon))) {
                                n = s;
                                break
                            }
                    return n
                }
            }, {
                key: "loadRegionPolygons",
                value: function(t) {
                    if (t && t.length > 0 && "polygon"in t[0])
                        return t;
                    var e = [];
                    return t.forEach(function(t) {
                        var i = {
                            polygon: t.map(function(t) {
                                return [t[0], t[1]]
                            }),
                            z: t[0][2]
                        };
                        e.push(i)
                    }),
                    e
                }
            }, {
                key: "angleDiff", 
                value: function(t, e) {
                    var i = t - e;
                    return i >= 180 && (i -= 360),
                    i <= -180 && (i += 360),
                    i
                }
            }, {
                key: "standardDeviation",
                value: function(t) {
                    var e = function(t, e) {
                        return t + e
                    }
                      , i = t.reduce(e, 0) / t.length
                      , n = t.map(function(t) {
                        return t - i
                    });
                    return Math.sqrt(n.map(function(t) {
                        return t * t
                    }).reduce(e, 0) / (t.length - 1))
                }
            }, {
                key: "distance",
                value: function(t, e) {
                    return t && e ? Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : -1
                }
            }, {
                key: "debugMessage",
                value: function(t) {
                    try {
                        var e = document.getElementById("debug_message_container");
                        if (e || (e = document.createElement("div"),
                        document.body.appendChild(e),
                        e.setAttribute("id", "debug_message_container"),
                        e.setAttribute("style", "position:absolute;top:20%;color:red;z-index:99;background-color: rgba(255,255,255,0.25);font-size:10px"),
                        e.onclick = function() {
                            e.innerHTML = ""
                        }
                        ),
                        t) {
                            var i = e.innerHTML.split("<br>")
                              , n = "";
                            t.includes("---") ? n = t : i.length > 0 && i[0].includes("---") && (n = i[0]);
                            var r = "";
                            t.includes("+++") ? r = t : i.length > 1 && i[1].includes("+++") && (r = i[1]);
                            var s = "";
                            t.includes("***") ? s = t : i.length > 2 && i[2].includes("***") && (s = i[2]);
                            var o = n + "<br>" + r + "<br>" + s;
                            e.innerHTML = o + "<br>"
                        } else
                            e.innerHTML = ""
                    } catch (t) {}
                }
            }, {
                key: "copyInstance",
                value: function(t) {
                    return Object.assign(Object.create(Object.getPrototypeOf(t)), t)
                }
            }]),
            t
        }();
        e.LocationUtils = s
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        e.default = function t(e) {
            var i = void 0;
            if ("object" === (void 0 === e ? "undefined" : n(e)))
                if (Array.isArray(e))
                    for (var r in i = [],
                    e)
                        i[r] = t(e[r]);
                else if (null === e)
                    i = null;
                else if (e.constructor === RegExp)
                    i = e;
                else
                    for (var s in i = {},
                    e)
                        i[s] = t(e[s]);
            else
                i = e;
            return i
        }
    }
    , function(t, e, i) {   
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function t() {
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, t)
        };
        n.toFixed = function(t, e) {
            var i = 0;
            try {
                i = t.toFixed(e)
            } catch (t) {}
            return parseFloat(i)
        }
        ,
        n.RAD2DEG = 180 / Math.PI,
        n.DEG2RAD = Math.PI / 180,
        n.rad2deg = function(t) {
            return (t * n.RAD2DEG).toFixed(1)
        }
        ,
        n.deg2rad = function(t) {
            return (t * n.DEG2RAD).toFixed(3)
        }
        ,
        e.Numerical = n
    }
    , function(t, e, i) {  
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.HMMUtils = e.HmmHelper = e.RoadType = e.Road = e.Point = void 0;
        var n, r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), s = i(3), o = (n = s) && n.__esModule ? n : {
            default: n
        }, a = i(1);
        function h(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var l = function t() {
            h(this, t)
        };
        l.point2PathDistance = function(t, e) {
            for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "region", n = [], r = Number.MAX_VALUE, s = void 0, o = "z" !== i, h = 0; h < e.length; h++)
                if (t[i] === e[h][i]) {
                    var l = new c(t.x,t.y,t.region);
                    l.z = t.z;
                    var u = new c(e[h].x,e[h].y,e[h].region);
                    if (u.z = e[h].z,
                    e[h + 1] && e[h + 1][i] === e[h][i]) {
                        var f = new c(e[h + 1].x,e[h + 1].y,e[h + 1].region);
                        f.z = e[h + 1].z;
                        var d = a.Geometric.projectPoint2Segment(l, u, f);
                        d[0] < r && (r = d[0],
                        s = {
                            x: d[1].x,
                            y: d[1].y,
                            region: e[h].region,
                            z: e[h].z,
                            buildingCode: e[h].buildingCode
                        },
                        n = [h, h + 1])
                    } else {
                        var v = a.Geometric.euclideanDistance(l, u);
                        if (v < r) {
                            r = v;
                            var p = -1
                              , y = e[h].type;
                            void 0 !== y && (p = y),
                            s = {
                                x: u.x,
                                y: u.y,
                                region: e[h].region,
                                z: e[h].z,
                                buildingCode: e[h].buildingCode,
                                type: p
                            },
                            n = [h]
                        }
                    }
                } else if (!o && e[h + 1]) {
                    var m = e[h].z
                      , g = e[h + 1].z
                      , P = t.z;
                    if ((g - P) * (P - m) > 0) {
                        var T = new c(t.x,t.y,t.region);
                        T.z = 0;
                        var b = new c(e[h].x,e[h].y,e[h].region);
                        b.z = 0;
                        var x = new c(e[h + 1].x,e[h + 1].y,e[h + 1].region);
                        x.z = 0;
                        var k = a.Geometric.projectPoint2Segment(T, b, x);
                        k[0] < r && k[0] < 12 && (r = k[0],
                        s = {
                            x: k[1].x,
                            y: k[1].y,
                            region: t.region,
                            z: t.z,
                            buildingCode: t.buildingCode
                        },
                        n = [h, h + 1])
                    }
                }
            return [r, s, n]
        }
        ,
        l.point2SegmentDistance = function(t, e, i) {
            var n = (t.x - e.x) * (i.x - e.x) + (t.y - e.y) * (i.y - e.y) + (t.z - e.z) * (i.z - e.z);
            if (n <= 0)
                return [a.Geometric.euclideanDistance(t, e), e, 0];
            var r = Math.pow(a.Geometric.euclideanDistance(e, i), 2);
            if (n >= r)
                return [a.Geometric.euclideanDistance(t, i), i, 2];
            var s = n / r
              , o = new c(e.x + s * (i.x - e.x),e.y + s * (i.y - e.y),e.z + s * (i.z - e.z));
            return [a.Geometric.euclideanDistance(t, o), o, 1]
        }
        ;
        var c = function() {
            function t(e, i, n, r, s, o, a, l) {
                h(this, t),
                this.x = e,
                this.y = i,
                this.z = n,
                this.re = n,
                this.ne = r,
                this.type = s,
                this.cost = o,
                this.factor = void 0 === a ? {} : a,
                this.special = l
            }
            return r(t, [{
                key: "isSameRegionWithRoad",
                value: function(t, e) {
                    var i = t.intersections[0];
                    return this.z === e[i].z
                }
            }]),
            t
        }()
          , u = {
            LINE: 1,
            POLYGON: 2,
            MULTIPOLYGON: 3
        }
          , f = function() {
            function t(e, i, n, r, s) {
                h(this, t),
                this.isOneWay = e || !1,
                this.factor = void 0 === r ? 1 : r,
                this.vertexes = (0,
                o.default)(i),
                this.buildingCode = (0,
                o.default)(s) || "",
                i[0].constructor === Array ? this.type = u.MULTIPOLYGON : i.length > 2 ? this.type = u.POLYGON : this.type = u.LINE,
                this.hasWidth = this.type !== u.LINE,
                this.hasWidth ? (this.isOneWay = !1,
                this.intersections = (0,
                o.default)(n)) : this.intersections = (0,
                o.default)(i)
            }
            return r(t, [{
                key: "isValidLine",
                value: function(t, e, i) {
                    if (!this.hasWidth)
                        return !1;
                    var n = function(t, e) {
                        return function(i, n) {
                            if (t.x - e.x == 0 && t.y - e.y == 0) {
                                var r = .01 * (n - e.y);
                                return Math.abs(r) > .01 ? r : 0
                            }
                            var s = (n - e.y) * (t.x - e.x) - (i - e.x) * (t.y - e.y);
                            return Math.abs(s) > .01 ? s : 0
                        }
                    }
                      , r = 1
                      , s = 2
                      , o = 3
                      , h = function(t, e, i, a) {
                        var h = n(i, a);
                        if (Math.abs(h(t.x, t.y)) < 1e-8 && Math.abs(h(e.x, e.y)) < 1e-8) {
                            var l = void 0
                              , c = void 0
                              , u = void 0
                              , f = void 0
                              , d = void 0;
                            Math.abs(t.x - e.x) > Math.abs(t.y - e.y) ? (l = Math.min(t.x, e.x),
                            c = Math.max(t.x, e.x),
                            u = Math.min(i.x, a.x),
                            f = Math.max(i.x, a.x),
                            d = Math.abs(t.x - e.x)) : (l = Math.min(t.y, e.y),
                            c = Math.max(t.y, e.y),
                            u = Math.min(i.y, a.y),
                            f = Math.max(i.y, a.y),
                            d = Math.abs(t.y - e.y));
                            var v = Math.max(l, u)
                              , p = Math.min(c, f);
                            return v >= p ? o : p - v >= d - .001 ? r : s
                        }
                        return o
                    }
                      , l = void 0;
                    for (var f in this.type === u.POLYGON ? l = [this.vertexes] : this.type === u.MULTIPOLYGON && (l = this.vertexes),
                    l)
                        for (var d = l[f].length, v = 0, p = d - 1; v < d; p = v++) {
                            switch (h(t, e, i[l[f][v]], i[l[f][p]])) {
                            case r:
                                return !0;
                            case s:
                                return !1
                            }
                        }
                    var y, m, g, P, T, b, x, k, M, S, O = new c((t.x + e.x) / 2,(t.y + e.y) / 2,t.z), _ = !0;
                    for (var D in l) {
                        for (var L = l[D].length, I = 0, A = L - 1; I < L; A = I++) {
                            var N = i[l[D][I]]
                              , R = i[l[D][A]];
                            if (g = N,
                            P = R,
                            T = void 0,
                            void 0,
                            void 0,
                            k = void 0,
                            void 0,
                            void 0,
                            T = n(y = t, m = e),
                            b = T(g.x, g.y),
                            x = T(P.x, P.y),
                            k = n(g, P),
                            M = k(y.x, y.y),
                            S = k(m.x, m.y),
                            b * x < 0 && M * S < 0) {
                                _ = !1;
                                break
                            }
                        }
                        if (!(_ = _ && a.Geometric.isPointInPolygon(O, l[D], i) === (0 == D)))
                            return !1
                    }
                    return !0
                }
            }, {
                key: "distanceWithPoint",
                value: function(t, e) {
                    return a.Geometric.projectPoint2Road(t, this, e)
                }
            }, {
                key: "angle_to",
                value: function(t, e) {
                    if (this.hasWidth || t.hasWidth)
                        return null;
                    var i = e[this.vertexes[this.vertexes.length - 1]].x - e[this.vertexes[0]].x
                      , n = e[this.vertexes[this.vertexes.length - 1]].y - e[this.vertexes[0]].y
                      , r = e[t.vertexes[t.vertexes.length - 1]].x - e[t.vertexes[0]].x
                      , s = e[t.vertexes[t.vertexes.length - 1]].y - e[t.vertexes[0]].y;
                    return a.Geometric.angleBetweenVectors([i, n], [r, s])
                }
            }, {
                key: "angleWith",
                value: function(t, e) {
                    if (this.hasWidth)
                        return null;
                    var i = e[this.vertexes[this.vertexes.length - 1]].x - e[this.vertexes[0]].x
                      , n = e[this.vertexes[this.vertexes.length - 1]].y - e[this.vertexes[0]].y;
                    return a.Geometric.angleBetweenVectors([Math.sin(t), Math.cos(t)], [i, n])
                }
            }]),
            t
        }()
          , d = function t() {
            h(this, t)
        };
        d.findAllShortestDistance2 = function(t, e, i, n) {
            for (var r in t) {
                var s = t[r = parseInt(r)];
                for (var o in e[r] = new c(s.x,s.y,s.z),
                s.ne) {
                    var h = s.ne[o]
                      , l = new f(!0,[r, h]);
                    i.push(l)
                }
            }
            for (var u = 0; u < e.length; u++) {
                for (var d = [], v = 0; v < e.length; v++)
                    d[v] = u !== v ? Number.MAX_VALUE : 0;
                n[u] = d
            }
            for (var p in i) {
                var y = i[p]
                  , m = e[y.vertexes[0]]
                  , g = e[y.vertexes[1]]
                  , P = a.Geometric.euclideanDistance(m, g);
                n[y.vertexes[0]][y.vertexes[1]] = P,
                y.isOneWay || (n[y.vertexes[1]][y.vertexes[0]] = P)
            }
            for (var T = 0; T < e.length; T++)
                for (var b = 0; b < e.length; b++)
                    for (var x = 0; x < e.length; x++)
                        n[b][x] > n[b][T] + n[T][x] && (n[b][x] = n[b][T] + n[T][x]);
            for (var k = 0; k < e.length; k++)
                for (var M = 0; M < e.length; M++)
                    n[k][M] > 20 && (n[k][M] = 99999)
        }
        ,
        e.Point = c,
        e.Road = f,
        e.RoadType = u,
        e.HmmHelper = l,
        e.HMMUtils = d
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }();
        var r = function() {
            function t() {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this.listeners = {}
            }
            return n(t, [{
                key: "on",
                value: function(t, e) {
                    "function" == typeof e && (this.listeners[t] || (this.listeners[t] = []),
                    this.listeners[t].indexOf(e) < 0 && this.listeners[t].push(e))
                }
            }, {
                key: "emit",
                value: function(t) {
                    var e = this.listeners[t]
                      , i = Array.prototype.slice.call(arguments);
                    if (i.shift(),
                    e)
                        for (var n = 0, r = e.length; n < r; n++)
                            e[n].apply(this, i)
                }
            }, {
                key: "off",
                value: function(t, e) {
                    this.listeners[t] && (void 0 === e ? delete this.listeners[t] : this.listeners[t] = this.listeners[t].filter(function(t) {
                        return e !== t
                    }))
                }
            }, {
                key: "offAllEvents",
                value: function() {
                    this.listeners = []
                }
            }]),
            t
        }();
        e.DEventDispatcherES6 = r
    }
    , function(t, e, i) {  
        "use strict";
        i.r(e),
        i.d(e, "FLOOR", function() {
            return r
        }),
        i.d(e, "HEIGHT", function() {
            return n
        });
        const n = {
            NULL: -1e4,
            LIFTS: -10001,   
            STAIRS: -10002,  
            ELEVATOR: -10003 
        }
          , r = {
            LIFTS: -1,
            STAIRS: -2,
            ELEVATOR: -3,
            NULL: -4
        }
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.HMM = void 0;
        var n = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , s = i(5)
          , o = i(0)
          , a = i(1);
        i(4);
        var h = function() {
            function t(e) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e = e || {},
                this.roadNetData = {},
                this.wlkParams = e.wlkHmmParams ? e.wlkHmmParams : {
                    sigma: 5,
                    beta: 2,
                    maxDistance: 20
                },
                this.drvParams = e.drvHmmParams ? e.drvHmmParams : {
                    sigma: 5,
                    beta: 2,
                    maxDistance: 20
                },
                this.drvOutParams = e.drvOutHmmParams ? e.drvOutHmmParams : {
                    sigma: 15,
                    beta: 5,
                    maxDistance: 100
                },
                this.posMode = o.POSITION_MODE.WALKING,
                this.drvMode = o.CONSTANTS.DRIVING_MODE.INDOOR,
                this.sigma = this.wlkParams.sigma || 5,
                this.beta = this.wlkParams.beta || 2,
                this.maxDistanceThreshold = this.wlkParams.maxDistance || 20,
                this.id2Points = [],
                this.roads = [],
                this.shortestDis = [],
                this.transFloorRoads = [],
                this.reset()
            }
            return r(t, [{
                key: "reset",
                value: function() {
                    this.point = void 0,
                    this.mapPoint = void 0,
                    this.roadProbs = void 0,
                    this.roadKey = void 0,
                    this.dirAmbigious = !0,
                    this.posList = []
                }
            }, {
                key: "setParams2posMode",
                value: function(t, e) {
                    this.posMode = void 0 !== t ? t : o.POSITION_MODE.WALKING,
                    this.drvMode = void 0 !== e ? e : o.CONSTANTS.DRIVING_MODE.INDOOR;
                    var i = t === o.POSITION_MODE.WALKING ? this.roadNetData.wlkRoadNet : this.roadNetData.drvRoadNet;
                    i && (this.id2Points = i.vertices,
                    this.roads = i.roads,
                    this.shortestDis = i.shortestDists,
                    this.transFloorRoads = i.transFloorRoads),
                    t === o.POSITION_MODE.WALKING ? (this.sigma = this.wlkParams.sigma || 5,
                    this.beta = this.wlkParams.beta || 2,
                    this.maxDistanceThreshold = this.wlkParams.maxDistance || 20) : this.drvMode === o.CONSTANTS.DRIVING_MODE.OUTDOOR ? (this.sigma = this.drvOutParams.sigma || 15,
                    this.beta = this.drvOutParams.beta || 5,
                    this.maxDistanceThreshold = this.drvOutParams.maxDistance || 100) : (this.sigma = this.drvParams.sigma || 5,
                    this.beta = this.drvParams.beta || 2,
                    this.maxDistanceThreshold = this.drvParams.maxDistance || 20)
                }
            }, {
                key: "setRoadNet",  
                value: function(t) {
                    this.roadNetData = t
                }
            }, {
                key: "minDist2Roads", 
                value: function(t, e) {
                    var i = Number.POSITIVE_INFINITY;
                    for (var n in t) {
                        var r = t[n]
                          , s = a.Geometric.projectPoint2Road(e, r, this.id2Points)[0];
                        s < i && (i = s)
                    }
                    return i
                }
            }, {
                key: "checkExceedRoadBoundary", 
                value: function(t, e) {
                    if (!e)
                        return !0;
                    var i = Number.POSITIVE_INFINITY;
                    if (void 0 !== t.z && null !== t.z && e[t.z]) {
                        if (e[t.z]) {
                            var n = this.minDist2Roads(e[t.z], t);
                            i = i < n ? i : n
                        }
                    } else
                        for (var r in e) {
                            var s = this.minDist2Roads(e[r], t);
                            i = i < s ? i : s
                        }
                    return i > 30
                }
            }, {
                key: "checkExceedPositionLimit", 
                value: function(t) {
                    var e = !1
                      , i = !1;
                    return e = !(!this.roadNetData || !this.roadNetData.wlkRoadNet) || this.checkExceedRoadBoundary(t, this.roadNetData.wlkRoadNet.roads),
                    i = !(!this.roadNetData || !this.roadNetData.drvRoadNet) || this.checkExceedRoadBoundary(t, this.roadNetData.drvRoadNet.roads),
                    e && i
                }
            }, {
                key: "measurementProbabilities",
                value: function(e, i) {
                    var n = [];
                    for (var r in this.roads[e.z]) {
                        var s = this.roads[e.z][r]
                          , o = a.Geometric.projectPoint2Road(e, s, this.id2Points)[0];
                        s.vertexes[0] !== s.vertexes[s.vertexes.length - 1] && o < this.maxDistanceThreshold && (n[r] = t.measurementProb(o, this.sigma))
                    }
                    return n
                }
            }, {
                key: "transitionProbabilities", 
                value: function(e, i, n, r, s, h) {
                    var l = [];
                    for (var c in i)
                        for (var u in r) {
                            var f = t.routeDistance(e, c, n, u, this.roads, this.id2Points, this.shortestDis)
                              , d = f[0]
                              , v = f[1]
                              , p = Math.abs(a.Geometric.euclideanDistance(e, n) - d);
                            if ((this.drvMode === o.CONSTANTS.DRIVING_MODE.OUTDOOR || !(d > 40 || p > 20)) && (l[[c, u]] = 1 / this.beta * Math.exp(-p / this.beta),
                            h === o.MOTION_STATE.WALKING && void 0 !== s && void 0 !== v && this.posMode === o.POSITION_MODE.WALKING)) {
                                var y = a.Geometric.angleDiffRad(v, s);
                                l[[c, u]] *= Math.pow(.5, 3 * Math.abs(y) / Math.PI)
                            }
                        }
                    return l
                }
            }, {
                key: "getBestIdx", 
                value: function(t) {
                    var e = 0
                      , i = -1;
                    for (var n in t)
                        t[n] > e && (e = t[n],
                        i = n);
                    return [i, e]
                }
            }, {
                key: "calHiddenState", 
                value: function(t, e) {
                    for (var i = [], n = void 0, r = t.length - 1; r >= 0; r--)
                        void 0 === n && Object.keys(t[r]).length > 0 && (n = this.getBestIdx(t[r])[0]),
                        i.push(n),
                        n = e[r].hasOwnProperty(n) ? e[r][n] : void 0;
                    return i.reverse(),
                    i
                }
            }, {
                key: "mapMatchingInRealTime", 
                value: function(e, i, n, r) {
                    if (!i || !this.roads || !this.roads[i.z])
                        return null;
                    this.point && this.point.z !== i.z && this.reset();
                    var s = void 0
                      , o = void 0
                      , a = void 0;
                    try {
                        if (this.point && this.roadProbs) {
                            o = this.measurementProbabilities(i),
                            t.checkBrokenChain(o),
                            a = t.stateNormalization(o);
                            var h = this.transitionProbabilities(this.point, this.roadProbs, i, a, n, r)
                              , l = t.viterbi(this.roadProbs, a, h);
                            s = t.stateNormalization(l[1])
                        } else
                            o = this.measurementProbabilities(i, void 0),
                            t.checkBrokenChain(o),
                            s = t.stateNormalization(o)
                    } catch (e) {
                        s = t.stateNormalization(a)
                    }
                    return this.calMapResult(e, i, s, n)
                }
            }, {
                key: "calMapResult", 
                value: function(t, e, i, r) {
                    if (0 === Object.keys(i).length)
                        return this.reset(),
                        null;
                    var s, o, h = this.getBestIdx(i)[0], l = a.Geometric.projectPoint2Road(e, this.roads[e.z][h], this.id2Points)[1], c = this.adjustState4doubleRoad(t, e.z, h, l, i, r), u = n(c, 3);
                    return s = u[0],
                    i = u[1],
                    o = u[2],
                    this.roadKey = h,
                    this.mapPoint = l,
                    this.point = e,
                    this.roadProbs = i,
                    {
                        point: l,
                        prob: i[h],
                        key: h,
                        direction: s,
                        ambiguous: o
                    }
                }
            }, {
                key: "adjustState4doubleRoad", 
                value: function(t, e, i, n, r, o) {
                    var h = this.roads[e][i]
                      , l = o
                      , c = !1
                      , u = void 0;
                    if (h.type === s.RoadType.LINE) {
                        u = a.Geometric.vectorDirRad(this.id2Points[h.intersections[0]], this.id2Points[h.intersections[1]]);
                        var f = this.findOppositeRoad(e, i, r);
                        if (c = void 0 !== f && Math.abs(r[i] - r[f]) < .01,
                        i === this.roadKey) {
                            var d = this.id2Points[h.intersections[0]]
                              , v = a.Geometric.euclideanDistance(this.mapPoint, d) <= a.Geometric.euclideanDistance(n, d);
                            for (this.posList.push({
                                t: t,
                                dist: a.Geometric.euclideanDistance(n, this.mapPoint),
                                dir: v
                            }); this.posList.length > 0 && t - this.posList[0].t > 1e4; )
                                this.posList.shift()
                        } else
                            this.posList = [];
                        var p = this.calMoveDir(this.posList)
                          , y = u;
                        if (-1 === p || 1 === p) {
                            if (-1 === p) {
                                if (y = -u,
                                !c) {
                                    var m = r[i];
                                    r[i] = r[f],
                                    r[f] = m
                                }
                                var g = i;
                                i = f,
                                f = g
                            } else
                                1 === p && (y = u);
                            c && (r[i] = r[i] + r[f] - .01,
                            r[f] = .01,
                            c = !1)
                        }
                        r[i] > .8 ? this.dirAmbigious = !1 : c && (this.dirAmbigious = !0),
                        l = this.dirAmbigious ? o : y
                    }
                    return [l, r, this.dirAmbigious]
                }
            }, {
                key: "calMoveDir",
                value: function(t) {
                    var e = this.drvMode === o.CONSTANTS.DRIVING_MODE.OUTDOOR ? 30 : 15;
                    if (t.length >= 7) {
                        for (var i = 0, n = 0, r = 0; r < t.length; r++)
                            i += t[r].dist * (t[r].dir ? 1 : -1),
                            n += t[r].dist;
                        return i >= e && (n - i) / i <= .15 ? 1 : (i = -i) >= e && (n - i) / i <= .15 ? -1 : 0
                    }
                    return 0
                }
            }, {
                key: "findOppositeRoad",
                value: function(t, e) {
                    var i = this.roads[t][e];
                    e = parseInt(e);
                    var n = void 0;
                    if (i.type === s.RoadType.LINE) {
                        var r = function(t, e, i, n) {
                            return !!(t && t[e] && t[e][i] && t[e][n] && t[e][i].intersections[0] === t[e][n].intersections[1] && t[e][i].intersections[1] === t[e][n].intersections[0])
                        };
                        0 !== e && r(this.roads, t, e, e - 1) ? n = e - 1 : r(this.roads, t, e, e + 1) && (n = e + 1)
                    }
                    return n
                }
            }, {
                key: "getBuildingCode",
                value: function() {
                    return this.roads[this.point.z][this.roadKey].buildingCode
                }
            }, {
                key: "calShortestDistance", 
                value: function(t, e) {
                    if (t === e)
                        return 0;
                    var i = this.id2Points[t]
                      , n = this.id2Points[e]
                      , r = a.Geometric.euclideanDistance(i, n);
                    if (!(r >= 20)) {
                        var s = Number.MAX_VALUE;
                        Array.isArray(i.ne) || (i.ne = []);
                        var o = !0
                          , h = !1
                          , l = void 0;
                        try {
                            for (var c, u = i.ne[Symbol.iterator](); !(o = (c = u.next()).done); o = !0) {
                                var f = c.value;
                                if (f === e)
                                    return r;
                                var d = this.id2Points[f];
                                Array.isArray(d.ne) || (d.ne = []);
                                var v = !0
                                  , p = !1
                                  , y = void 0;
                                try {
                                    for (var m, g = d.ne[Symbol.iterator](); !(v = (m = g.next()).done); v = !0) {
                                        if (m.value === e) {
                                            var P = a.Geometric.euclideanDistance(i, d) + a.Geometric.euclideanDistance(d, n);
                                            P < s && (s = P)
                                        }
                                    }
                                } catch (t) {
                                    p = !0,
                                    y = t
                                } finally {
                                    try {
                                        !v && g.return && g.return()
                                    } finally {
                                        if (p)
                                            throw y
                                    }
                                }
                            }
                        } catch (t) {
                            h = !0,
                            l = t
                        } finally {
                            try {
                                !o && u.return && u.return()
                            } finally {
                                if (h)
                                    throw l
                            }
                        }
                        return s < 20 ? s : void 0
                    }
                }
            }], [{
                key: "routeDistance",
                value: function(t, e, i, n, r, o, h) {
                    var l = r[t.z][e]
                      , c = r[i.z][n]
                      , u = a.Geometric.projectPoint2Road(t, l, o)[1]
                      , f = a.Geometric.projectPoint2Road(i, c, o)[1]
                      , d = void 0;
                    if (d = l.type === s.RoadType.LINE && c.type !== s.RoadType.LINE || l.type !== s.RoadType.LINE && c.type === s.RoadType.LINE ? Math.atan2(f.x - u.x, f.y - u.y) : l.type === s.RoadType.LINE && c.type === s.RoadType.LINE ? a.Geometric.vectorDirRad(o[c.intersections[0]], o[c.intersections[1]]) : Math.atan2(f.x - u.x, f.y - u.y),
                    e === n)
                        return [a.Geometric.euclideanDistance(u, f), d];
                    var v = l.hasWidth ? l.intersections : [l.intersections[l.intersections.length - 1]]
                      , p = c.hasWidth ? c.intersections : [c.intersections[0]]
                      , y = Number.MAX_VALUE
                      , m = !0
                      , g = !1
                      , P = void 0;
                    try {
                        for (var T, b = v[Symbol.iterator](); !(m = (T = b.next()).done); m = !0) {
                            var x = T.value
                              , k = !0
                              , M = !1
                              , S = void 0;
                            try {
                                for (var O, _ = p[Symbol.iterator](); !(k = (O = _.next()).done); k = !0) {
                                    var D = O.value
                                      , L = void 0;
                                    if (h && (L = x === D ? 0 : x < D ? h[[x, D]] : h[[D, x]]),
                                    void 0 !== L) {
                                        var I = L + a.Geometric.euclideanDistance(u, o[x]) + a.Geometric.euclideanDistance(f, o[D]);
                                        y = Math.min(y, I)
                                    }
                                }
                            } catch (t) {
                                M = !0,
                                S = t
                            } finally {
                                try {
                                    !k && _.return && _.return()
                                } finally {
                                    if (M)
                                        throw S
                                }
                            }
                        }
                    } catch (t) {
                        g = !0,
                        P = t
                    } finally {
                        try {
                            !m && b.return && b.return()
                        } finally {
                            if (g)
                                throw P
                        }
                    }
                    return [y, d]
                }
            }, {
                key: "measurementProb",
                value: function(t, e) {
                    var i = 0;
                    return i = 1 / e * Math.exp(-.5 * Math.pow(t / e, 2)),
                    isNaN(i) && (i = 0),
                    i
                }
            }, {
                key: "viterbi",
                value: function(t, e, i) {
                    var n = []
                      , r = [];
                    for (var s in e) {
                        var o = 0
                          , a = void 0;
                        for (var h in t) {
                            var l = t[h] * i[[h, s]] * e[s];
                            o < l && (o = l,
                            a = h)
                        }
                        a && (r[s] = o,
                        n[s] = a)
                    }
                    return [n, r]
                }
            }, {
                key: "checkBrokenChain",
                value: function(t) {
                    var e = Object.keys(t);
                    e.sort(function(e, i) {
                        return t[i] - t[e]
                    });
                    var i = e.slice(0, 16);
                    for (var n in t)
                        t[n] > 1e-20 && i.indexOf(n) >= 0 || delete t[n]
                }
            }, {
                key: "stateNormalization",
                value: function(t) {
                    var e = t.reduce(function(t, e) {
                        return t + e
                    }, 0);
                    return t = t.map(function(t) {
                        return t / e
                    })
                }
            }]),
            t
        }();
        e.HMM = h
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.KalmanFilterPDR = void 0;  
        var n, r = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(), s = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), o = i(10), a = i(15), h = i(2), l = i(3), c = (n = l) && n.__esModule ? n : {
            default: n
        };
        i(0);
        var u = function() {
            function t(e, i, n, r) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this.t = e,
                this.deviceType = n,
                this.kfType = i,
                this.penaltyL1 = 5,
                this.penaltyL2 = 10,
                this.resetCntTh1 = 4,
                this.resetCntTh2 = 3,
                this.setDefaultTypeParams(),
                this.reset(),
                this.setParameters(r, i, n)
            }
            return s(t, [{
                key: "setDefaultTypeParams", 
                value: function() {
                    this.kfTypeParams = {
                        0: {
                            btObrVar: 36,
                            geoObrVar: 36,
                            processStd: .5,
                            distThresholdL1: 10,
                            distThresholdL2: 20,
                            distThresholdFar: 20
                        },
                        1: {
                            btObrVar: 36,
                            geoObrVar: 36,
                            processStd: .5,
                            distThresholdL1: 10,
                            distThresholdL2: 20,
                            distThresholdFar: 20
                        },
                        2: {
                            btObrVar: 900,
                            geoObrVar: 900,
                            processStd: .5,
                            distThresholdL1: 12,
                            distThresholdL2: 15,
                            distThresholdFar: 20
                        },
                        3: {
                            btObrVar: 900,
                            geoObrVar: 900,
                            processStd: .5,
                            distThresholdL1: 10,
                            distThresholdL2: 20,
                            distThresholdFar: 20
                        },
                        4: {
                            btObrVar: 400,
                            geoObrVar: 400,
                            processStd: 2,
                            distThresholdL1: 15,
                            distThresholdL2: 20,
                            distThresholdFar: 20
                        },
                        5: {
                            btObrVar: 1600,
                            geoObrVar: 400,
                            processStd: 2,
                            distThresholdL1: 30,
                            distThresholdL2: 50,
                            distThresholdFar: 50
                        },
                        6: {
                            btObrVar: 6400,
                            geoObrVar: 400,
                            processStd: 2,
                            distThresholdL1: 30,
                            distThresholdL2: 50,
                            distThresholdFar: 50
                        }
                    }
                }
            }, {
                key: "reset", 
                value: function() {
                    this.kalmanModel = null,
                    this.observerModel = null,
                    this.cnt = 0,
                    this.penalty1 = 1,
                    this.penalty2 = 1,
                    this.resetCnt1 = 0,
                    this.resetCnt2 = 0,
                    this.unReliableBtCnt = 0,
                    this.lastBtPosTime = null,
                    this.lastGeoPosTime = null,
                    this.lastPos = null,
                    this.moveDist = -1
                }
            }, {
                key: "setParameters",
                value: function(t) {
                    "kfParams"in (t = t || {}) && (this.kfTypeParams = t.kfParams),
                    this.btObrVar = 36,
                    this.geoObrVar = 36,
                    this.prsStd = .5,
                    this.distThL1 = 10,
                    this.distThL2 = 20,
                    this.distThLFar = 20,
                    this.setTypeParameters(this.kfType)
                }
            }, {
                key: "setTypeParameters",
                value: function(t) {
                    var e = this.kfTypeParams[t];
                    e && ("btObrVar"in e && (this.btObrVar = e.btObrVar),
                    "geoObrVar"in e && (this.geoObrVar = e.geoObrVar),
                    "processStd"in e && (this.prsStd = e.processStd),
                    "distThresholdL1"in e && (this.distThL1 = e.distThresholdL1),
                    "distThresholdL2"in e && (this.distThL2 = e.distThresholdL2),
                    "distThresholdFar"in e && (this.distThLFar = e.distThresholdFar))
                }
            }, {
                key: "startKF", 
                value: function(t, e) {
                    if (t || e) {
                        t && (this.lastBtPosTime = t.t),
                        e && (this.lastGeoPosTime = e.t);
                        var i = this.calInitPosition(t, e)
                          , n = this.initKFModel(i, this.prsStd, this.btObrVar, this.geoObrVar)
                          , s = r(n, 2);
                        this.kalmanModel = s[0],
                        this.observerModel = s[1],
                        this.cnt = this.resetCnt1 = this.resetCnt2 = this.unReliableBtCnt = 0
                    }
                }
            }, {
                key: "calInitPosition", 
                value: function(t, e) {
                    var i = t && 0 !== t.c
                      , n = e && 0 !== e.c
                      , r = null;
                    if (i && !n)
                        r = t;
                    else if (!i && n)
                        r = e;
                    else if (i && n) {
                        var s = Math.sqrt(this.btObrVar / this.geoObrVar)
                          , o = s / t.c + 1 / e.c;
                        r = {
                            x: (t.x / t.c * s + e.x / e.c) / o,
                            y: (t.y / t.c * s + e.y / e.c) / o
                        }
                    } else
                        r = this.lastPos;
                    return r
                }
            }, {
                key: "initKFModel",  
                value: function(t, e, i, n) {
                    var r = o.Vector.create([t.x, t.y])
                      , s = o.Matrix.Diagonal([900, 900])
                      , h = o.Matrix.create([[1, 0], [0, 1]])
                      , l = o.Vector.create([0, 0])
                      , c = o.Matrix.Diagonal([0, 0])
                      , u = o.Matrix.create([[1, 0], [0, 1]])
                      , f = o.Matrix.Diagonal([e * e, e * e])
                      , d = o.Matrix.create([[1, 0], [0, 1]])
                      , v = new a.KalmanModel(r,s,h,l,c,u,f,d)
                      , p = o.Vector.create([t.x, t.y, t.x, t.y])
                      , y = o.Matrix.create([[1, 0], [0, 1], [1, 0], [0, 1]])
                      , m = o.Matrix.Diagonal([i, i, n, n]);
                    return [v, new a.KalmanObservation(p,y,m)]
                }
            }, {
                key: "calPdrDisplacement", 
                value: function(t, e, i) {
                    return t || 0 === t ? o.Vector.create([e * i * Math.sin(t), e * i * Math.cos(t)]) : o.Vector.create([0, 0])
                }
            }, {
                key: "calPenalty", 
                value: function(t, e, i) {
                    var n = h.LocationUtils.distance(t, e)
                      , r = i ? this.distThL1 : this.distThL2
                      , s = this.distThLFar;
                    return n < r ? 1 : n < s ? this.penaltyL1 : this.penaltyL2
                }
            }, {
                key: "checkReset",
                value: function(t, e, i) {
                    this.penalty1 = this.calPenalty(t, this.lastPos, i),
                    this.penalty2 = this.calPenalty(e, this.lastPos, i),
                    e && e.c < 2.5 && this.penalty2 >= 5 ? (t && t.c < 3 || (this.unReliableBtCnt += 1),
                    this.resetCnt2 += 1) : this.resetCnt2 = this.unReliableBtCnt = 0,
                    t && this.penalty1 > 0 && this.penalty1 < 5 || e && this.penalty2 > 0 && this.penalty2 < 5 ? this.resetCnt1 = 0 : (t && t.c < 3 || e && e.c < 3) && (this.resetCnt1 += 1);
                    var n = t && t.c < 4 || e && e.c < 3
                      , r = this.resetCnt1 >= this.resetCntTh1
                      , s = this.resetCnt2 >= this.resetCntTh2 && this.unReliableBtCnt > 0;
                    n && (r || s) && this.startKF(t, e)
                }
            }, {
                key: "updateKfModel", 
                value: function(t, e, i) {
                    !i && t && (t.c = 1),
                    t || (t = {
                        x: 0,
                        y: 0,
                        c: 0,
                        t: 0
                    }),
                    e || (e = {
                        x: 0,
                        y: 0,
                        c: 0,
                        t: 0
                    }),
                    this.observerModel.z_k = o.Vector.create([t.x, t.y, e.x, e.y]),
                    this.observerModel.R_k = this.calObserveCov(this.btObrVar, t.c, this.penalty1, this.geoObrVar, e.c, this.penalty2),
                    this.kalmanModel.update(this.observerModel),
                    this.moveDist = h.LocationUtils.distance(this.getPosition(), this.lastPos),
                    this.lastPos = this.getPosition()
                }
            }, {
                key: "getObrMeasurements", 
                value: function(t, e) {
                    var i = (0,
                    c.default)(t)
                      , n = (0,
                    c.default)(e);
                    return i && (i.t < this.t - 1e3 || i.t === this.lastBtPosTime ? i = null : this.lastBtPosTime = i.t),
                    n && (n.t < this.t - 1500 || n.timestamp === this.lastGeoPosTime ? n = null : this.lastGeoPosTime = n.timestamp),
                    [i, n]
                }
            }, {
                key: "update", 
                value: function(t, e, i, n, s, o, a, h) {
                    if (this.t = t,
                    this.kalmanModel || this.startKF(e, i),
                    this.kalmanModel) {
                        this.cnt++;
                        var l = this.getObrMeasurements(e, i)
                          , c = r(l, 2)
                          , u = c[0]
                          , f = c[1];
                        this.checkReset(u, f, h),
                        this.kalmanModel.u_k = this.calPdrDisplacement(n, s, o),
                        this.updateKfModel(u, f, a)
                    }
                }
            }, {
                key: "setState",
                value: function(t) {
                    t && "x"in t && this.kalmanModel && (this.kalmanModel.x_k = o.Vector.create([t.x, t.y]))
                }
            }, {
                key: "setBtObrVar",
                value: function(t) {
                    this.btObrVar = t
                }
            }, {
                key: "setProcessCov",
                value: function(t) {
                    this.prsStd = t,
                    this.kalmanModel.Q_k = o.Matrix.Diagonal([t * t, t * t])
                }
            }, {
                key: "calObserveCov",
                value: function(t, e, i, n, r, s) {
                    return 0 === e || 0 === i ? t = Number.POSITIVE_INFINITY : t *= Math.pow(e * i, 2),
                    0 === r || 0 === s ? n = Number.POSITIVE_INFINITY : n *= Math.pow(r * s, 2),
                    o.Matrix.Diagonal([t, t, n, n])
                }
            }, {
                key: "getPosition", 
                value: function() {
                    if (this.kalmanModel)
                        return {
                            x: this.kalmanModel.x_k.elements[0],
                            y: this.kalmanModel.x_k.elements[1]
                        }
                }
            }, {
                key: "getDspInfo",
                value: function() {
                    var t = "type:" + this.kfType;
                    return this.kalmanModel && (t += " x:" + this.kalmanModel.x_k.elements[0].toFixed(1) + " y:" + this.kalmanModel.x_k.elements[1].toFixed(1)),
                    t
                }
            }, {
                key: "getMoveDist",  
                value: function() {
                    return this.moveDist
                }
            }]),
            t
        }();
        e.KalmanFilterPDR = u
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(12);
        Object.defineProperty(e, "Vector", {
            enumerable: !0,
            get: function() {
                return n.Vector
            }
        });
        var r = i(14);
        Object.defineProperty(e, "Matrix", {
            enumerable: !0,
            get: function() {
                return r.Matrix
            }
        })
    }
    , function(t, e) {}
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(13)
          , r = i(14);
        function s() {}
        s.prototype = {
            norm: function() {
                for (var t = this.elements.length, e = 0; t--; )
                    e += Math.pow(this.elements[t], 2);
                return Math.sqrt(e)
            },
            e: function(t) {
                return t < 1 || t > this.elements.length ? null : this.elements[t - 1]
            },
            dimensions: function() {  
                return {
                    rows: 1,
                    cols: this.elements.length
                }
            },
            rows: function() {
                return 1
            },
            cols: function() {
                return this.elements.length
            },
            modulus: function() {
                return Math.sqrt(this.dot(this))
            },
            eql: function(t) {
                var e = this.elements.length
                  , i = t.elements || t;
                if (e != i.length)
                    return !1;
                for (; e--; )
                    if (Math.abs(this.elements[e] - i[e]) > n.precision)
                        return !1;
                return !0
            },
            dup: function() {
                return s.create(this.elements)
            },
            map: function(t) {
                var e = [];
                return this.each(function(i, n) {
                    e.push(t(i, n))
                }),
                s.create(e)
            },
            each: function(t) {
                for (var e = this.elements.length, i = 0; i < e; i++)
                    t(this.elements[i], i + 1)
            },
            toUnitVector: function() {
                var t = this.modulus();
                return 0 === t ? this.dup() : this.map(function(e) {
                    return e / t
                })
            },
            angleFrom: function(t) {
                var e = t.elements || t 
                  , i = this.elements.length;
                if (i != e.length)
                    return null;
                var n = 0
                  , r = 0
                  , s = 0;
                if (this.each(function(t, i) {
                    n += t * e[i - 1],
                    r += t * t,
                    s += e[i - 1] * e[i - 1]
                }),
                r = Math.sqrt(r),
                s = Math.sqrt(s),
                r * s == 0)
                    return null;
                var o = n / (r * s);
                return o < -1 && (o = -1),
                o > 1 && (o = 1),
                Math.acos(o)
            },
            isParallelTo: function(t) {
                var e = this.angleFrom(t);
                return null === e ? null : e <= n.precision
            },
            isAntiparallelTo: function(t) { 
                var e = this.angleFrom(t);
                return null === e ? null : Math.abs(e - Math.PI) <= n.precision
            },
            isPerpendicularTo: function(t) {
                var e = this.dot(t);
                return null === e ? null : Math.abs(e) <= n.precision
            },
            add: function(t) {
                var e = t.elements || t;
                return this.elements.length != e.length ? this.map(function(e) {
                    return e + t
                }) : this.map(function(t, i) {
                    return t + e[i - 1]
                })
            },
            subtract: function(t) {
                if ("number" == typeof t)
                    return this.map(function(e) {
                        return e - t
                    });
                var e = t.elements || t;
                return this.elements.length != e.length ? null : this.map(function(t, i) {
                    return t - e[i - 1]
                })
            },
            multiply: function(t) {
                return this.map(function(e) {
                    return e * t
                })
            },
            elementMultiply: function(t) {
                return this.map(function(e, i) {
                    return t.e(i) * e
                })
            },
            sum: function() {
                var t = 0;
                return this.map(function(e) {
                    t += e
                }),
                t
            },
            chomp: function(t) {
                for (var e = [], i = t; i < this.elements.length; i++)
                    e.push(this.elements[i]);
                return s.create(e)
            },
            top: function(t) {
                for (var e = [], i = 0; i < t; i++)
                    e.push(this.elements[i]);
                return s.create(e)
            },
            augment: function(t) {
                for (var e = this.elements, i = 0; i < t.length; i++)
                    e.push(t[i]);
                return s.create(e)
            },
            x: function(t) {
                return this.multiply(t)
            },
            log: function() {
                return s.log(this)
            },
            elementDivide: function(t) {
                return this.map(function(e, i) {
                    return e / t.e(i)
                })
            },
            product: function() {
                var t = 1;
                return this.map(function(e) {
                    t *= e
                }),
                t
            },
            dot: function(t) {
                var e = t.elements || t
                  , i = 0
                  , n = this.elements.length;
                if (n != e.length)
                    return null;
                for (; n--; )
                    i += this.elements[n] * e[n];
                return i
            },
            cross: function(t) {
                var e = t.elements || t;
                if (3 != this.elements.length || 3 != e.length)
                    return null;
                var i = this.elements;
                return s.create([i[1] * e[2] - i[2] * e[1], i[2] * e[0] - i[0] * e[2], i[0] * e[1] - i[1] * e[0]])
            },
            max: function() {
                for (var t = 0, e = this.elements.length; e--; )
                    Math.abs(this.elements[e]) > Math.abs(t) && (t = this.elements[e]);
                return t
            },
            maxIndex: function() {
                for (var t = 0, e = this.elements.length, i = -1; e--; )
                    Math.abs(this.elements[e]) > Math.abs(t) && (t = this.elements[e],
                    i = e + 1);
                return i
            },
            indexOf: function(t) {
                for (var e = null, i = this.elements.length, n = 0; n < i; n++)
                    null === e && this.elements[n] == t && (e = n + 1);
                return e
            },
            toDiagonalMatrix: function() {
                return r.Diagonal(this.elements)
            },
            round: function() {
                return this.map(function(t) {
                    return Math.round(t)
                })
            },
            transpose: function() {
                for (var t = this.elements.length, e = [], i = 0; i < t; i++)
                    e.push([this.elements[i]]);
                return r.create(e)
            },
            snapTo: function(t) {
                return this.map(function(e) {
                    return Math.abs(e - t) <= n.precision ? t : e
                })
            },
            distanceFrom: function(t) {
                if (t.anchor || t.start && t.end)
                    return t.distanceFrom(this);
                var e = t.elements || t;
                if (e.length != this.elements.length)
                    return null;
                var i, n = 0;
                return this.each(function(t, r) {
                    i = t - e[r - 1],
                    n += i * i
                }),
                Math.sqrt(n)
            },
            liesOn: function(t) {
                return t.contains(this)
            },
            liesIn: function(t) {
                return t.contains(this)
            },
            rotate: function(t, e) {
                var i, n, o, a, h = null;
                switch (t.determinant && (h = t.elements),
                this.elements.length) {
                case 2:
                    return 2 != (i = e.elements || e).length ? null : (h || (h = r.Rotation(t).elements),
                    n = this.elements[0] - i[0],
                    o = this.elements[1] - i[1],
                    s.create([i[0] + h[0][0] * n + h[0][1] * o, i[1] + h[1][0] * n + h[1][1] * o]));
                case 3:
                    if (!e.direction)
                        return null;
                    var l = e.pointClosestTo(this).elements;
                    return h || (h = r.Rotation(t, e.direction).elements),
                    n = this.elements[0] - l[0],
                    o = this.elements[1] - l[1],
                    a = this.elements[2] - l[2],
                    s.create([l[0] + h[0][0] * n + h[0][1] * o + h[0][2] * a, l[1] + h[1][0] * n + h[1][1] * o + h[1][2] * a, l[2] + h[2][0] * n + h[2][1] * o + h[2][2] * a]);
                default:
                    return null
                }
            },
            reflectionIn: function(t) {
                if (t.anchor) {
                    var e = this.elements.slice()
                      , i = t.pointClosestTo(e).elements;
                    return s.create([i[0] + (i[0] - e[0]), i[1] + (i[1] - e[1]), i[2] + (i[2] - (e[2] || 0))])
                }
                var n = t.elements || t;
                return this.elements.length != n.length ? null : this.map(function(t, e) {
                    return n[e - 1] + (n[e - 1] - t)
                })
            },
            to3D: function() {
                var t = this.dup();
                switch (t.elements.length) {
                case 3:
                    break;
                case 2:
                    t.elements.push(0);
                    break;
                default:
                    return null
                }
                return t
            },
            inspect: function() {
                return "[" + this.elements.join(", ") + "]"
            },
            setElements: function(t) {
                return this.elements = (t.elements || t).slice(),
                this
            }
        },
        s.create = function(t) {
            return (new s).setElements(t)
        }
        ,
        s.i = s.create([1, 0, 0]),
        s.j = s.create([0, 1, 0]),
        s.k = s.create([0, 0, 1]),
        s.Random = function(t) {
            for (var e = []; t--; )
                e.push(Math.random());
            return s.create(e)
        }
        ,
        s.Fill = function(t, e) {
            for (var i = []; t--; )
                i.push(e);
            return s.create(i)
        }
        ,
        s.Zero = function(t) {
            return s.Fill(t, 0)
        }
        ,
        s.One = function(t) {
            return s.Fill(t, 1)
        }
        ,
        s.log = function(t) {
            return t.map(function(t) {
                return Math.log(t)
            })
        }
        ,
        e.Vector = s
    }
    , function(t, e, i) {
        "use strict";
        t.exports = {
            precision: 1e-6,
            approxPrecision: 1e-5
        }
    }
    , function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.Matrix = void 0;
        var r = n(12)
          , s = n(11)
          , o = n(13);
        function a(t, e, i, n) {
            for (var r = t.elements, s = n - 1; s--; ) {
                for (var o = [], a = 0; a < i; a++)
                    o.push(a == s ? 1 : 0);
                r.unshift(o)
            }
            for (s = n - 1; s < e; s++)
                for (; r[s].length < i; )
                    r[s].unshift(0);
            return f.create(r)
        }
        function h() {
            for (var t = this, e = f.I(t.rows()), i = t.transpose(), n = f.I(t.cols()), s = Number.MAX_VALUE, o = 0; s > 2.2737e-13 && o < 100; ) {
                var a = i.transpose().qrJs();
                i = a.R,
                e = e.x(a.Q),
                a = i.transpose().qrJs(),
                n = n.x(a.Q);
                var h = (i = a.R).triu(1).unroll().norm()
                  , l = i.diagonal().norm();
                0 == l && (l = 1),
                s = h / l,
                o++
            }
            var c = i.diagonal()
              , u = [];
            for (o = 1; o <= c.cols(); o++) {
                var d = c.e(o);
                if (u.push(Math.abs(d)),
                d < 0)
                    for (var v = 0; v < n.rows(); v++)
                        e.elements[v][o - 1] = -e.elements[v][o - 1]
            }
            return {
                U: n,
                S: r.Vector.create(u).toDiagonalMatrix(),
                V: e
            }
        }
        function l() {
            var t = v.sgesvd("A", "A", this.elements);
            return {
                U: f.create(t.U),
                S: f.create(t.S).column(1).toDiagonalMatrix(),
                V: f.create(t.VT).transpose()
            }
        }
        function c() {
            for (var t = this.rows(), e = this.cols(), i = f.I(t), n = this, s = 1; s < Math.min(t, e); s++) {
                for (var o = n.slice(s, 0, s, s).col(1), h = [1]; h.length <= t - s; )
                    h.push(0);
                h = r.Vector.create(h);
                var l = o.add(h.x(o.norm() * Math.sign(o.e(1))))
                  , c = f.create(l)
                  , u = a(f.I(t - s + 1).subtract(c.x(2).x(c.transpose()).div(c.transpose().x(c).e(1, 1))), t, e, s);
                n = u.x(n),
                i = i.x(u)
            }
            return {
                Q: i,
                R: n
            }
        }
        function u() {
            var t = v.qr(this.elements);
            return {
                Q: f.create(t.Q),
                R: f.create(t.R)
            }
        }
        function f() {}
        function d() {
            var t = v.lu(this.elements);
            return {
                L: f.create(t.L),
                U: f.create(t.U),
                P: f.create(t.P)
            }
        }
        f.prototype = {
            solve: function(t) {
                var e = this.lu();
                t = e.P.x(t);
                var i = e.L.forwardSubstitute(t)
                  , n = e.U.backSubstitute(i);
                return e.P.x(n)
            },
            pcaProject: function(t, e) {
                var i, n, r = (e = e || (i = this,
                n = i.transpose().x(i).x(1 / i.rows()).svd(),
                {
                    U: n.U,
                    S: n.S
                }).U).slice(1, e.rows(), 1, t);
                return {
                    Z: this.x(r),
                    U: e
                }
            },
            pcaRecover: function(t) {
                var e = this.cols()
                  , i = t.slice(1, t.rows(), 1, e);
                return this.x(i.transpose())
            },
            triu: function(t) {
                return t || (t = 0),
                this.map(function(e, i, n) {
                    return n - i >= t ? e : 0
                })
            },
            unroll: function() {
                for (var t = [], e = 1; e <= this.cols(); e++)
                    for (var i = 1; i <= this.rows(); i++)
                        t.push(this.e(i, e));
                return r.Vector.create(t)
            },
            slice: function(t, e, n, r) {
                var s = [];
                for (0 == e && (e = this.rows()),
                0 == r && (r = this.cols()),
                i = t; i <= e; i++) {
                    var o = [];
                    for (j = n; j <= r; j++)
                        o.push(this.e(i, j));
                    s.push(o)
                }
                return f.create(s)
            },
            e: function(t, e) {
                return t < 1 || t > this.elements.length || e < 1 || e > this.elements[0].length ? null : this.elements[t - 1][e - 1]
            },
            row: function(t) {
                return t > this.elements.length ? null : r.Vector.create(this.elements[t - 1])
            },
            col: function(t) {
                if (t > this.elements[0].length)
                    return null;
                for (var e = [], i = this.elements.length, n = 0; n < i; n++)
                    e.push(this.elements[n][t - 1]);
                return r.Vector.create(e)
            },
            dimensions: function() {
                return {
                    rows: this.elements.length,
                    cols: this.elements[0].length
                }
            },
            rows: function() {
                return this.elements.length
            },
            cols: function() {
                return this.elements[0].length
            },
            approxEql: function(t) {
                return this.eql(t, o.approxPrecision)
            },
            eql: function(t, e) {
                var i = t.elements || t;
                if (void 0 === i[0][0] && (i = f.create(i).elements),
                this.elements.length != i.length || this.elements[0].length != i[0].length)
                    return !1;
                for (var n, r = this.elements.length, s = this.elements[0].length; r--; )
                    for (n = s; n--; )
                        if (Math.abs(this.elements[r][n] - i[r][n]) > (e || o.precision))
                            return !1;
                return !0
            },
            dup: function() {
                return f.create(this.elements)
            },
            map: function(t) {
                for (var e, i = [], n = this.elements.length, r = this.elements[0].length; n--; )
                    for (e = r,
                    i[n] = []; e--; )
                        i[n][e] = t(this.elements[n][e], n + 1, e + 1);
                return f.create(i)
            },
            isSameSizeAs: function(t) {
                var e = t.elements || t;
                return void 0 === e[0][0] && (e = f.create(e).elements),
                this.elements.length == e.length && this.elements[0].length == e[0].length
            },
            add: function(t) {
                if ("number" == typeof t)
                    return this.map(function(e, i, n) {
                        return e + t
                    });
                var e = t.elements || t;
                return void 0 === e[0][0] && (e = f.create(e).elements),
                this.isSameSizeAs(e) ? this.map(function(t, i, n) {
                    return t + e[i - 1][n - 1]
                }) : null
            },
            subtract: function(t) {
                if ("number" == typeof t)
                    return this.map(function(e, i, n) {
                        return e - t
                    });
                var e = t.elements || t;
                return void 0 === e[0][0] && (e = f.create(e).elements),
                this.isSameSizeAs(e) ? this.map(function(t, i, n) {
                    return t - e[i - 1][n - 1]
                }) : null
            },
            canMultiplyFromLeft: function(t) {
                var e = t.elements || t;
                return void 0 === e[0][0] && (e = f.create(e).elements),
                this.elements[0].length == e.length
            },
            mulOp: function(t, e) {
                if (!t.elements)
                    return this.map(function(i) {
                        return e(i, t)
                    });
                var i = !!t.modulus;
                if (void 0 === (p = t.elements || t)[0][0] && (p = f.create(p).elements),
                !this.canMultiplyFromLeft(p))
                    return null;
                for (var n, r, s, o, a, h = this.elements, l = [], c = h.length, u = p[0].length, d = h[0].length, v = c; v--; ) {
                    for (r = [],
                    n = h[v],
                    o = u; o--; ) {
                        for (s = 0,
                        a = d; a--; )
                            s += e(n[a], p[a][o]);
                        r[o] = s
                    }
                    l[v] = r
                }
                var p = f.create(l);
                return i ? p.col(1) : p
            },
            div: function(t) {
                return this.mulOp(t, function(t, e) {
                    return t / e
                })
            },
            multiply: function(t) {
                return this.mulOp(t, function(t, e) {
                    return t * e
                })
            },
            x: function(t) {
                return this.multiply(t)
            },
            elementMultiply: function(t) {
                return this.map(function(e, i, n) {
                    return t.e(i, n) * e
                })
            },
            sum: function() {
                var t = 0;
                return this.map(function(e) {
                    t += e
                }),
                t
            },
            mean: function() {
                for (var t = this.dimensions(), e = [], i = 1; i <= t.cols; i++)
                    e.push(this.col(i).sum() / t.rows);
                return r.Vector.create(e)
            },
            column: function(t) {
                return this.col(t)
            },
            log: function() {
                return this.map(function(t) {
                    return Math.log(t)
                })
            },
            minor: function(t, e, i, n) {
                for (var r, s, o, a = [], h = i, l = this.elements.length, c = this.elements[0].length; h--; )
                    for (a[r = i - h - 1] = [],
                    s = n; s--; )
                        o = n - s - 1,
                        a[r][o] = this.elements[(t + r - 1) % l][(e + o - 1) % c];
                return f.create(a)
            },
            transpose: function() {
                for (var t, e = this.elements.length, i = [], n = this.elements[0].length; n--; )
                    for (t = e,
                    i[n] = []; t--; )
                        i[n][t] = this.elements[t][n];
                return f.create(i)
            },
            isSquare: function() {
                return this.elements.length == this.elements[0].length
            },
            max: function() {
                for (var t, e = 0, i = this.elements.length, n = this.elements[0].length; i--; )
                    for (t = n; t--; )
                        Math.abs(this.elements[i][t]) > Math.abs(e) && (e = this.elements[i][t]);
                return e
            },
            indexOf: function(t) {
                var e, i, n = this.elements.length, r = this.elements[0].length;
                for (e = 0; e < n; e++)
                    for (i = 0; i < r; i++)
                        if (this.elements[e][i] == t)
                            return {
                                i: e + 1,
                                j: i + 1
                            };
                return null
            },
            diagonal: function() {
                if (!this.isSquare)
                    return null;
                for (var t = [], e = this.elements.length, i = 0; i < e; i++)
                    t.push(this.elements[i][i]);
                return r.Vector.create(t)
            },
            toRightTriangular: function() {
                var t, e, i, n, r = this.dup(), s = this.elements.length, o = this.elements[0].length;
                for (e = 0; e < s; e++) {
                    if (0 == r.elements[e][e])
                        for (i = e + 1; i < s; i++)
                            if (0 != r.elements[i][e]) {
                                for (t = [],
                                n = 0; n < o; n++)
                                    t.push(r.elements[e][n] + r.elements[i][n]);
                                r.elements[e] = t;
                                break
                            }
                    if (0 != r.elements[e][e])
                        for (i = e + 1; i < s; i++) {
                            var a = r.elements[i][e] / r.elements[e][e];
                            for (t = [],
                            n = 0; n < o; n++)
                                t.push(n <= e ? 0 : r.elements[i][n] - r.elements[e][n] * a);
                            r.elements[i] = t
                        }
                }
                return r
            },
            toUpperTriangular: function() {
                return this.toRightTriangular()
            },
            determinant: function() {
                if (!this.isSquare())
                    return null;
                if (1 == this.cols && 1 == this.rows)
                    return this.row(1);
                if (0 == this.cols && 0 == this.rows)
                    return 1;
                for (var t = this.toRightTriangular(), e = t.elements[0][0], i = t.elements.length, n = 1; n < i; n++)
                    e *= t.elements[n][n];
                return e
            },
            det: function() {
                return this.determinant()
            },
            isSingular: function() {
                return this.isSquare() && 0 === this.determinant()
            },
            trace: function() {
                if (!this.isSquare())
                    return null;
                for (var t = this.elements[0][0], e = this.elements.length, i = 1; i < e; i++)
                    t += this.elements[i][i];
                return t
            },
            tr: function() {
                return this.trace()
            },
            rank: function() {
                for (var t, e = this.toRightTriangular(), i = 0, n = this.elements.length, r = this.elements[0].length; n--; )
                    for (t = r; t--; )
                        if (Math.abs(e.elements[n][t]) > o.precision) {
                            i++;
                            break
                        }
                return i
            },
            rk: function() {
                return this.rank()
            },
            augment: function(t) {
                var e = t.elements || t;
                void 0 === e[0][0] && (e = f.create(e).elements);
                var i, n = this.dup(), r = n.elements[0].length, s = n.elements.length, o = e[0].length;
                if (s != e.length)
                    return null;
                for (; s--; )
                    for (i = o; i--; )
                        n.elements[s][r + i] = e[s][i];
                return n
            },
            inverse: function() {
                if (!this.isSquare() || this.isSingular())
                    return null;
                for (var t, e, i, n, r, s = this.elements.length, o = s, a = this.augment(f.I(s)).toRightTriangular(), h = a.elements[0].length, l = []; o--; ) {
                    for (i = [],
                    l[o] = [],
                    n = a.elements[o][o],
                    e = 0; e < h; e++)
                        r = a.elements[o][e] / n,
                        i.push(r),
                        e >= s && l[o].push(r);
                    for (a.elements[o] = i,
                    t = o; t--; ) {
                        for (i = [],
                        e = 0; e < h; e++)
                            i.push(a.elements[t][e] - a.elements[o][e] * a.elements[t][o]);
                        a.elements[t] = i
                    }
                }
                return f.create(l)
            },
            inv: function() {
                return this.inverse()
            },
            round: function() {
                return this.map(function(t) {
                    return Math.round(t)
                })
            },
            snapTo: function(t) {
                return this.map(function(e) {
                    return Math.abs(e - t) <= o.precision ? t : e
                })
            },
            inspect: function() {
                for (var t = [], e = this.elements.length, i = 0; i < e; i++)
                    t.push(r.Vector.create(this.elements[i]).inspect());
                return t.join("\n")
            },
            toArray: function() {
                for (var t = [], e = this.elements.length, i = 0; i < e; i++)
                    t.push(this.elements[i]);
                return t
            },
            setElements: function(t) {
                var e, i, n = t.elements || t;
                if (void 0 !== n[0][0]) {
                    for (e = n.length,
                    this.elements = []; e--; )
                        for (i = n[e].length,
                        this.elements[e] = []; i--; )
                            this.elements[e][i] = n[e][i];
                    return this
                }
                var r = n.length;
                for (this.elements = [],
                e = 0; e < r; e++)
                    this.elements.push([n[e]]);
                return this
            },
            maxColumnIndexes: function() {
                for (var t = [], e = 1; e <= this.rows(); e++) {
                    for (var i = null, n = -1, s = 1; s <= this.cols(); s++)
                        (null === i || this.e(e, s) > i) && (i = this.e(e, s),
                        n = s);
                    t.push(n)
                }
                return r.Vector.create(t)
            },
            maxColumns: function() {
                for (var t = [], e = 1; e <= this.rows(); e++) {
                    for (var i = null, n = 1; n <= this.cols(); n++)
                        (null === i || this.e(e, n) > i) && (i = this.e(e, n));
                    t.push(i)
                }
                return r.Vector.create(t)
            },
            minColumnIndexes: function() {
                for (var t = [], e = 1; e <= this.rows(); e++) {
                    for (var i = null, n = -1, s = 1; s <= this.cols(); s++)
                        (null === i || this.e(e, s) < i) && (i = this.e(e, s),
                        n = s);
                    t.push(n)
                }
                return r.Vector.create(t)
            },
            minColumns: function() {
                for (var t = [], e = 1; e <= this.rows(); e++) {
                    for (var i = null, n = 1; n <= this.cols(); n++)
                        (null === i || this.e(e, n) < i) && (i = this.e(e, n));
                    t.push(i)
                }
                return r.Vector.create(t)
            },
            partialPivot: function(t, e, i, n, r) {
                for (var s = 0, o = 0, a = t; a <= n.rows(); a++)
                    Math.abs(n.e(a, e)) > o && (o = Math.abs(n.e(t, e)),
                    s = a);
                if (s != t) {
                    var h = n.elements[t - 1];
                    n.elements[t - 1] = n.elements[s - 1],
                    n.elements[s - 1] = h,
                    i.elements[t - 1][t - 1] = 0,
                    i.elements[t - 1][s - 1] = 1,
                    i.elements[s - 1][s - 1] = 0,
                    i.elements[s - 1][t - 1] = 1
                }
                return i
            },
            forwardSubstitute: function(t) {
                for (var e = [], i = 1; i <= this.rows(); i++) {
                    for (var n = 0, s = 1; s < i; s++)
                        n += this.e(i, s) * e[s - 1];
                    e.push((t.e(i) - n) / this.e(i, i))
                }
                return r.Vector.create(e)
            },
            backSubstitute: function(t) {
                for (var e = [], i = this.rows(); i > 0; i--) {
                    for (var n = 0, s = this.cols(); s > i; s--)
                        n += this.e(i, s) * e[this.rows() - s];
                    e.push((t.e(i) - n) / this.e(i, i))
                }
                return r.Vector.create(e.reverse())
            },
            luPack: d,
            luJs: p,
            svdJs: h,
            svdPack: l,
            qrJs: c,
            qrPack: u
        };
        var v;
        function p() {
            for (var t = this.dup(), e = f.I(t.rows()), i = f.I(t.rows()), n = f.Zeros(t.rows(), t.cols()), r = 1, s = 1; s <= Math.min(t.cols(), t.rows()); s++) {
                i = t.partialPivot(s, r, i, t, e);
                for (var o = s + 1; o <= t.rows(); o++) {
                    var a = t.e(o, r) / t.e(s, r);
                    e.elements[o - 1][s - 1] = a;
                    for (var h = s + 1; h <= t.cols(); h++)
                        t.elements[o - 1][h - 1] -= t.e(s, h) * a
                }
                for (h = s; h <= t.cols(); h++)
                    n.elements[s - 1][h - 1] = t.e(s, h);
                r < t.cols() && r++
            }
            return {
                L: e,
                U: n,
                P: i
            }
        }
        (v = function() {
            try {
                return n(!function() {
                    var t = new Error("Cannot find module 'lapack'");
                    throw t.code = "MODULE_NOT_FOUND",
                    t
                }())
            } catch (t) {}
        }()) ? (f.prototype.svd = l,
        f.prototype.qr = u,
        f.prototype.lu = d) : (f.prototype.svd = h,
        f.prototype.qr = c,
        f.prototype.lu = p),
        f.create = function(t, e) {
            return (new f).setElements(t)
        }
        ,
        f.I = function(t) {
            for (var e, i = [], n = t; n--; )
                for (e = t,
                i[n] = []; e--; )
                    i[n][e] = n == e ? 1 : 0;
            return f.create(i)
        }
        ,
        f.loadFile = function(t) {
            for (var e = [], i = s.readFileSync(t, "utf-8").split("\n"), n = 0; n < i.length; n++) {
                var r = i[n].split(",");
                r.length > 1 && e.push(r)
            }
            return (new f).setElements(e)
        }
        ,
        f.Diagonal = function(t) {
            for (var e = t.length, i = f.I(e); e--; )
                i.elements[e][e] = t[e];
            return i
        }
        ,
        f.Rotation = function(t, e) {
            if (!e)
                return f.create([[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]]);
            var i = e.dup();
            if (3 != i.elements.length)
                return null;
            var n = i.modulus()
              , r = i.elements[0] / n
              , s = i.elements[1] / n
              , o = i.elements[2] / n
              , a = Math.sin(t)
              , h = Math.cos(t)
              , l = 1 - h;
            return f.create([[l * r * r + h, l * r * s - a * o, l * r * o + a * s], [l * r * s + a * o, l * s * s + h, l * s * o - a * r], [l * r * o - a * s, l * s * o + a * r, l * o * o + h]])
        }
        ,
        f.RotationX = function(t) {
            var e = Math.cos(t)
              , i = Math.sin(t);
            return f.create([[1, 0, 0], [0, e, -i], [0, i, e]])
        }
        ,
        f.RotationY = function(t) {
            var e = Math.cos(t)
              , i = Math.sin(t);
            return f.create([[e, 0, i], [0, 1, 0], [-i, 0, e]])
        }
        ,
        f.RotationZ = function(t) {
            var e = Math.cos(t)
              , i = Math.sin(t);
            return f.create([[e, -i, 0], [i, e, 0], [0, 0, 1]])
        }
        ,
        f.Random = function(t, e) {
            return 1 === arguments.length && (e = t),
            f.Zero(t, e).map(function() {
                return Math.random()
            })
        }
        ,
        f.Fill = function(t, e, i) {
            2 === arguments.length && (i = e,
            e = t);
            for (var n, r = [], s = t; s--; )
                for (n = e,
                r[s] = []; n--; )
                    r[s][n] = i;
            return f.create(r)
        }
        ,
        f.Zero = function(t, e) {
            return f.Fill(t, e, 0)
        }
        ,
        f.Zeros = function(t, e) {
            return f.Zero(t, e)
        }
        ,
        f.One = function(t, e) {
            return f.Fill(t, e, 1)
        }
        ,
        f.Ones = function(t, e) {
            return f.One(t, e)
        }
        ,
        e.Matrix = f
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.KalmanObservation = e.KalmanModel = void 0;
        var n = i(10)
          , r = function() {
            function t(t, e, i, n, r, s, o, a) {
                this.x_k = t,
                this.P_k = e,
                this.F_k = i,
                this.u_k = n,
                this.U_k = r,
                this.B_k = s,
                this.Q_k = o,
                this.N_k = a
            }
            return t.prototype.predict = function() {
                this.I = n.Matrix.I(this.P_k.rows()),
                this.x_k_ = this.x_k,
                this.P_k_ = this.P_k,
                this.x_k_k_ = this.F_k.x(this.x_k_).add(this.B_k.x(this.u_k)),
                this.P_k_k_ = this.F_k.x(this.P_k_.x(this.F_k.transpose())).add(this.B_k.x(this.U_k.x(this.B_k.transpose()))).add(this.N_k.x(this.Q_k).x(this.N_k.transpose()))
            }
            ,
            t.prototype.update = function(t) {
                this.I = n.Matrix.I(this.P_k.rows()),
                this.x_k_ = this.x_k,
                this.P_k_ = this.P_k,
                this.x_k_k_ = this.F_k.x(this.x_k_).add(this.B_k.x(this.u_k)),
                this.P_k_k_ = this.F_k.x(this.P_k_.x(this.F_k.transpose())).add(this.B_k.x(this.U_k.x(this.B_k.transpose()))).add(this.N_k.x(this.Q_k).x(this.N_k.transpose())),
                this.y_k = t.z_k.subtract(t.H_k.x(this.x_k_k_)),
                this.S_k = t.H_k.x(this.P_k_k_.x(t.H_k.transpose())).add(t.R_k),
                this.K_k = this.P_k_k_.x(t.H_k.transpose().x(this.S_k.inverse())),
                this.x_k = this.x_k_k_.add(this.K_k.x(this.y_k)),
                this.P_k = this.I.subtract(this.K_k.x(t.H_k)).x(this.P_k_k_)
            }
            ,
            t
        }()
          , s = function() {
            return function(t, e, i) {
                this.z_k = t,
                this.H_k = e,
                this.R_k = i
            }
        }();
        e.KalmanModel = r,
        e.KalmanObservation = s
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.RoadDataProcessor = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(5);
        var s = function() {
            function t(e, i) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this._vertices = t.buildVertices(e),
                this._pathPlanRoads = t.buildPathPlanRoads(i),
                t.buildVerticeFactor(this._vertices, this._pathPlanRoads),
                this._hmmRoads = t.buildHmmRoads(i),
                this._shortestDist = t.buildShortestDist(i)
            }
            return n(t, [{
                key: "getHMMInfo",  
                value: function() {
                    return [this._vertices, this._hmmRoads, this._shortestDist]
                }
            }, {
                key: "getPathPlanInfo", 
                value: function() {
                    return [this._vertices, this._pathPlanRoads]
                }
            }], [{
                key: "buildVertices",
                value: function(t) {
                    var e = [];
                    for (var i in t) {
                        var n = t[i];
                        e[i] = new r.Point(n.x,n.y,n.re,n.ne,n.type,n.cost,n.factor,n.special)
                    }
                    return e
                }
            }, {
                key: "buildPathPlanRoads",
                value: function(t) {
                    var e = t.roads
                      , i = [];
                    for (var n in e) {
                        i[n] = [];
                        var s = !0
                          , o = !1
                          , a = void 0;
                        try {
                            for (var h, l = e[n][Symbol.iterator](); !(s = (h = l.next()).done); s = !0) {
                                var c = h.value;
                                i[n].push(new r.Road(c.one_way,c.vertexes,c.intersections,c.factor))
                            }
                        } catch (t) {
                            o = !0,
                            a = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (o)
                                    throw a
                            }
                        }
                    }
                    return i
                }
            }, {
                key: "buildVerticeFactor",
                value: function(t, e) {
                    for (var i in e) {
                        var n = e[i]
                          , s = !0
                          , o = !1
                          , a = void 0;
                        try {
                            for (var h, l = n[Symbol.iterator](); !(s = (h = l.next()).done); s = !0) {
                                var c = h.value;
                                if (c.type === r.RoadType.LINE)
                                    for (var u = 1; u < c.vertexes.length; u++) {
                                        var f = c.vertexes[u - 1]
                                          , d = c.vertexes[u];
                                        t[f].factor[d] = c.factor,
                                        c.isOneWay || (t[d].factor[f] = c.factor)
                                    }
                                else if (1 !== c.factor) {
                                    var v = void 0;
                                    switch (c.type) {
                                    case r.RoadType.MULTIPOLYGON:
                                        var p = c.intersections
                                          , y = !0
                                          , m = !1
                                          , g = void 0;
                                        try {
                                            for (var P, T = c.vertexes[Symbol.iterator](); !(y = (P = T.next()).done); y = !0) {
                                                var b = P.value;
                                                p = p.concat(b)
                                            }
                                        } catch (t) {
                                            m = !0,
                                            g = t
                                        } finally {
                                            try {
                                                !y && T.return && T.return()
                                            } finally {
                                                if (m)
                                                    throw g
                                            }
                                        }
                                        v = new Set(p);
                                        break;
                                    default:
                                        v = new Set(c.intersections.concat(c.vertexes))
                                    }
                                    var x = !0
                                      , k = !1
                                      , M = void 0;
                                    try {
                                        for (var S, O = v[Symbol.iterator](); !(x = (S = O.next()).done); x = !0) {
                                            var _ = S.value
                                              , D = !0
                                              , L = !1
                                              , I = void 0;
                                            try {
                                                for (var A, N = v[Symbol.iterator](); !(D = (A = N.next()).done); D = !0) {
                                                    var R = A.value;
                                                    t[_].factor[R] = c.factor
                                                }
                                            } catch (t) {
                                                L = !0,
                                                I = t
                                            } finally {
                                                try {
                                                    !D && N.return && N.return()
                                                } finally {
                                                    if (L)
                                                        throw I
                                                }
                                            }
                                        }
                                    } catch (t) {
                                        k = !0,
                                        M = t
                                    } finally {
                                        try {
                                            !x && O.return && O.return()
                                        } finally {
                                            if (k)
                                                throw M
                                        }
                                    }
                                }
                            }
                        } catch (t) {
                            o = !0,
                            a = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (o)
                                    throw a
                            }
                        }
                    }
                }
            }, {
                key: "buildHmmRoads",
                value: function(t) {
                    var e = t.roads
                      , i = [];
                    for (var n in e) {
                        i[n] = [];
                        var s = !0
                          , o = !1
                          , a = void 0;
                        try {
                            for (var h, l = e[n][Symbol.iterator](); !(s = (h = l.next()).done); s = !0) {
                                var c = h.value;
                                i[n].push(new r.Road(!0,c.vertexes,c.intersections,c.factor,c.buildingCode)),
                                2 === c.vertexes.length && c.vertexes[0].constructor !== Array && i[n].push(new r.Road(c.one_way,c.vertexes.slice().reverse(),void 0,c.buildingCode))
                            }
                        } catch (t) {
                            o = !0,
                            a = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (o)
                                    throw a
                            }
                        }
                    }
                    return i
                }
            }, {
                key: "buildShortestDist",
                value: function(t) {
                    return t.shortestDistance
                }
            }]),
            t
        }();
        e.RoadDataProcessor = s
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.FloorMapper = void 0;
        var n, r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), s = i(7), o = i(3), a = (n = o) && n.__esModule ? n : {
            default: n
        };
        var h = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this.floor2ZMaps = e,
                this.z2FloorMaps = i,
                this.currIndexing = -1e4,
                this.mapIndex = {},
                this.createBasicMap()
            }
            return r(t, [{
                key: "createBasicMap",
                value: function() {
                    for (var t in this.height2FloorMap = {},
                    this.floor2HeightMap = {},
                    s.HEIGHT)
                        this.height2FloorMap[s.HEIGHT[t]] = s.FLOOR[t],
                        this.floor2HeightMap[s.FLOOR[t]] = s.HEIGHT[t]
                }
            }, {
                key: "regionMapDecode",
                value: function(t, e) {
                    return this.mapZ2Region(t, e)
                }
            }, {
                key: "mapZ2Region",
                value: function(t, e) {
                    if (this.z2FloorMaps[t]) {
                        var i = this.z2FloorMaps[t][e];
                        return void 0 === i ? e : i
                    }
                    return e
                }
            }, {
                key: "regionMapEncode",
                value: function(t, e) {
                    return this.mapRegion2Z(e, t)
                }
            }, {
                key: "mapRegion2Z",
                value: function(t, e) {
                    if (this.floor2ZMaps[t]) {
                        var i = this.floor2ZMaps[t][e];
                        return void 0 === i ? e : i
                    }
                    return e
                }
            }, {
                key: "getMapIndex",
                value: function() {
                    return this.mapIndex
                }
            }, {
                key: "loadMapping",
                value: function(t, e) {
                    if (this.currIndexing += 1e4,
                    this.mapIndex[e] = this.currIndexing,
                    void 0 !== t[0].z) {
                        var i = (0,
                        a.default)(this.floor2HeightMap)
                          , n = (0,
                        a.default)(this.height2FloorMap)
                          , r = !0
                          , s = !1
                          , o = void 0;
                        try {
                            for (var h, l = t[Symbol.iterator](); !(r = (h = l.next()).done); r = !0) {
                                var c = h.value;
                                i[c.region] = c.z,
                                n[c.z] = c.region
                            }
                        } catch (t) {
                            s = !0,
                            o = t
                        } finally {
                            try {
                                !r && l.return && l.return()
                            } finally {
                                if (s)
                                    throw o
                            }
                        }
                        this.floor2ZMaps[e] = i,
                        this.z2FloorMaps[e] = n
                    }
                }
            }]),
            t
        }();
        e.FloorMapper = h
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.LocationInterface = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(19)
          , s = i(6)
          , o = i(0);
        var a = function(t) {
            function e(t) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                t = t || {},
                i._sensorManager = t.sensorManager || {},  
                t.locateOptions = t.locateOptions || {};   
                var n = !1;
                return void 0 === t.locateOptions.isIOS && (n = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
                i.deviceType = n ? o.CONSTANTS.DEVICE.IOS : o.CONSTANTS.DEVICE.ANDROID, //设备类型 IOS 、android
                t.locateOptions.deviceType = i.deviceType,
                i._dLocation = new r.LocationEngine(t.locateOptions),
                i._defEvtHandlerFunc(), 
                i._setSensorEvtHandler(!0), 
                i._initDLocationEvtHandler(), 
                i._bGeolocation = !0,
                i._gpsStartTimer = void 0,
                i._sensorManager.beaconSensor && i._sensorManager.beaconSensor.start().then(function() {}),
                i._locateStarted = !1,
                i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, s.DEventDispatcherES6),
            n(e, [{
                key: "dispose",
                value: function() {
                    this.listeners = [],
                    this._dLocation.listeners = [],
                    this._setSensorEvtHandler(!1)
                }
            }, {
                key: "reset",
                value: function() {}
            }, {
                key: "loadBuildingInfo",
                value: function(t) {
                    var e = t.buildingCode;
                    this.addAps(t.aps);
                    var i = !1
                      , n = void 0;
                    t.locateOptions && (this._dLocation.addLocationOptions(e, t.locateOptions, t.isBuilding),
                    i = !!t.locateOptions.geoActive,
                    t.locateOptions.bufferArea && (n = t.locateOptions.bufferArea));
                    var r = void 0;
                    t.locateOptions && t.locateOptions.boundaryBufferAreas ? t.locateOptions.boundaryBufferAreas.boundaryArea ? r = [{
                        polygon: t.locateOptions.boundaryBufferAreas.boundaryArea
                    }] : t.locateOptions.boundaryBufferAreas.area ? r = t.locateOptions.boundaryBufferAreas.area : t.locateOptions.boundaryBufferAreas.areas && (r = t.locateOptions.boundaryBufferAreas.areas) : t.floorBoundaries && (r = t.floorBoundaries),
                    this._dLocation.loadBuildingArea(e, r, t.isBuilding, i, n)
                }
            }, {
                key: "resetLocation",
                value: function() {
                    this._dLocation.reset()
                }
            }, {
                key: "_defEvtHandlerFunc",
                value: function() {
                    var t = this;
                    this.bt_statusChanged = function(e) {
                        t.emit("le_btStatusChanged", e)
                    }
                    ,
                    this.bt_scanresult = function(e) {
                        setTimeout(function() {
                            t.emit("le_btScanResult", e)
                        }, 0);
                        var i = t._dLocation.updateBeacons(e);
                        t.emit("le_btPosition", i)
                    }
                    ,
                    this.bt_error = function(e) {
                        t.emit("le_btError", e)
                    }
                    ,
                    this.bt_scansuccess = function(e) {
                        t.emit("le_btScanSuccess", e)
                    }
                    ,
                    this.md_sensorAcc = function(e) {
                        if (t._locateStarted && (t.emit("le_sensorAcc", e),
                        e.value.gravity && e.value.accelerationIncludingGravity)) {
                            var i = e.value.gravity;
                            t.deviceType === o.CONSTANTS.DEVICE.IOS && i && (i.x = -i.x,
                            i.y = -i.y,
                            i.z = -i.z),
                            t._dLocation.updateAcc(e.value.timestamp, e.value.accelerationIncludingGravity, i)
                        }
                    }
                    ,
                    this.md_headingChanged = function(e) {
                        t._locateStarted && (t._dLocation.updateHeading(e),
                        t.emit("le_orientationChanged", e))
                    }
                    ,
                    this.geo_positionChanged = function(e) {
                        t._locateStarted && (t._dLocation.updateGeoPosition(e),
                        t.emit("le_geoPositionChanged", e))
                    }
                    ,
                    this.geo_needStartLocate = function(e) {
                        t.emit("le_needStartLocate", e)
                    }
                    ,
                    this.geo_needStopLocate = function(e) {
                        t.emit("le_needStopLocate", e)
                    }
                }
            }, {
                key: "_setSensorEvtHandler",
                value: function(t) {
                    var e = t ? "on" : "off";
                    this._sensorManager.beaconSensor && (this._sensorManager.beaconSensor[e]("bt_statusChanged", this.bt_statusChanged),
                    this._sensorManager.beaconSensor[e]("bt_scanresult", this.bt_scanresult),
                    this._sensorManager.beaconSensor[e]("bt_error", this.bt_error),
                    this._sensorManager.beaconSensor[e]("bt_scansuccess", this.bt_scansuccess)),
                    this._sensorManager.accSensor && this._sensorManager.accSensor[e]("md_sensorAcc", this.md_sensorAcc),
                    this._sensorManager.deviceMotionSensor && this._sensorManager.deviceMotionSensor[e]("md_headingChanged", this.md_headingChanged),
                    this._sensorManager.geoSensor && (this._sensorManager.geoSensor[e]("geo_positionChanged", this.geo_positionChanged),
                    this._sensorManager.geoSensor[e]("geo_needStartLocate", this.geo_needStartLocate),
                    this._sensorManager.geoSensor[e]("geo_needStopLocate", this.geo_needStopLocate))
                }
            }, {
                key: "_initDLocationEvtHandler",
                value: function() {
                    var t = this;
                    this._dLocation.on("dl_headingChanged", function(e) {
                        t._locateStarted && t.emit("le_headingChanged", e)
                    }),
                    this._dLocation.on("dl_positionChanged", function(e) {
                        t._locateStarted && t.emit("le_positionChanged", e)
                    }),
                    this._dLocation.on("dl_regionChanged", function(e) {
                        t._locateStarted && t.emit("le_regionChanged", e)
                    }),
                    this._dLocation.on("dl_headingSensorStatusChanged", function(e) {
                        t.emit("le_headingSensorStatusChanged", e)
                    }),
                    this._dLocation.on("dl_stepChanged", function(e) {
                        t.emit("le_stepChanged", e)
                    }),
                    this._dLocation.on("dl_exceedPositionLimit", function(e) {
                        t.emit("le_exceedPositionLimit", e)
                    })
                }
            }, {
                key: "startLocate",
                value: function() {
                    var t = this;
                    this._locateStarted || (this._locateStarted = !0,
                    this._sensorManager.deviceMotionSensor && this._sensorManager.deviceMotionSensor.start(),
                    this._sensorManager.accSensor && this._sensorManager.accSensor.start(),
                    this._sensorManager.beaconSensor && this._sensorManager.beaconSensor.start().then(function() {
                        t._btReady = !0
                    }),
                    this._dLocation.start(),
                    void 0 !== this._gpsStartTimer && (clearTimeout(this._gpsStartTimer),
                    this._gpsStartTimer = void 0),
                    this._bGeolocation && this.delayStartGeoSensor())
                }
            }, {
                key: "stopLocate",
                value: function() {
                    this._locateStarted && (this._locateStarted = !1,
                    void 0 !== this._gpsStartTimer && (clearTimeout(this._gpsStartTimer),
                    this._gpsStartTimer = void 0),
                    this._sensorManager.beaconSensor && this._sensorManager.beaconSensor.stop(),
                    this._sensorManager.geoSensor && this._sensorManager.geoSensor.stop(),
                    this._sensorManager.deviceMotionSensor && this._sensorManager.deviceMotionSensor.stop(),
                    this._sensorManager.accSensor && this._sensorManager.accSensor.stop(),
                    this._dLocation.stop())
                }
            }, {
                key: "addAps",
                value: function(t) {
                    this._dLocation.addAps(t)
                }
            }, {
                key: "setPositionMode",
                value: function(t) {
                    this._dLocation.setPositionMode(t)
                }
            }, {
                key: "setDrivingMode",
                value: function() {
                    this._dLocation.setPositionMode(o.POSITION_MODE.DRIVING)
                }
            }, {
                key: "setWalkingMode",
                value: function() {
                    this._dLocation.setPositionMode(o.POSITION_MODE.WALKING)
                }
            }, {
                key: "delayStartGeoSensor",
                value: function() {
                    var t = this;
                    clearTimeout(this._gpsStartTimer),
                    this._gpsStartTimer = setTimeout(function() {
                        t._sensorManager.geoSensor && t._sensorManager.geoSensor.start()
                    }, 5e3)
                }
            }, {
                key: "enableGeolocation",
                value: function(t) {
                    this._bGeolocation && (void 0 !== this._gpsStartTimer && (clearTimeout(this._gpsStartTimer),
                    this._gpsStartTimer = void 0),
                    this._sensorManager.geoSensor && (t ? this.delayStartGeoSensor() : this._sensorManager.geoSensor.stop()))
                }
            }, {
                key: "setNavigationPaths",
                value: function(t) {
                    this._dLocation.setNavigationPaths(t)
                }
            }, {
                key: "setARInitPos",
                value: function(t) {
                    this._dLocation.startAR(t)
                }
            }, {
                key: "setARLastPos",
                value: function(t) {
                    this._dLocation.stopAR(t)
                }
            }, {
                key: "updateNavMessage",
                value: function(t) {}
            }, {
                key: "initHmm",
                value: function(t) {
                    this._dLocation.initHmm(t)
                }
            }, {
                key: "enableHMM",
                value: function(t) {
                    this._dLocation.enableHMM(t)
                }
            }, {
                key: "getLocationVersion",
                value: function() {
                    var t = "DiffAngle";
                    return this._dLocation && (this._dLocation.floorModelMap ? (t = "mix, current model:",
                    this._dLocation.fusionType === o.CONSTANTS.FUSION_MODEL.PDR ? t += "pdr+" : t += "diffAngle") : this._dLocation.defaultWlkFusionType === o.CONSTANTS.FUSION_MODEL.PDR && (t = "pdr+")),
                    "2.6.4 branch:dev time:2021-07-10 17:51 model type:" + t
                }
            }]),
            e
        }();
        a.Version = "2.6.4 branch:dev time:2021-07-10 17:51",
        e.LocationInterface = a
    }
    , function(t, e, i) {   
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.LocationEngine = void 0;
        var n, r = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(), s = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), o = i(6), a = i(2), h = i(4), l = i(20), c = i(21), u = i(22), f = i(24), d = i(25), v = i(8), p = i(26), y = i(3), m = (n = y) && n.__esModule ? n : {
            default: n
        }, g = i(27), P = i(0), T = i(29);
        var b = function(t) {
            function e(t) {        
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                t || (t = {});
                var n = i.t = t.startTime || (new Date).getTime();
                return i.locationStarted = !1,
                i.isSimulation = !!("simulation"in t && t.simulation),
                i.locateOptionsMap = {},
                i.modelManager = new T.ModelManager(t),
                i.roadNetData = new d.RoadNetData(t),
                i.hmm = new v.HMM(t),
                i.zChecker = new p.ZChecker,
                i.navProcessor = new g.NavigationProcessor(t),   
                i.bluetoothLocator = new l.BluetoothLocator(t),  
                i.geoLocator = new c.GeoLocator(t),              
                i.motionDetector = new u.MotionDetector(t),     
                i.areaChecker = new f.AreaChecker(t),            
                i.locationTimer = null,
                i.posMode = P.POSITION_MODE.WALKING,
                i.phonePlacement = P.CONSTANTS.PHONE_PLACEMENT.HOLD,
                i.drvMode = P.CONSTANTS.DRIVING_MODE.INDOOR,
                i.buildingCode = null,
                i.exceedPositionLimit = !1,
                i.accuracy = 4,
                i.fusionType = P.CONSTANTS.FUSION_MODEL.PDR,
                i.headingSatus = P.CONSTANTS.HEADSTATUS.NORMAL,
                i.notifyRenavTime = n,
                i.navStatus = !1,
                i.ARNavStatus = !1,
                i.paths = null,
                i.headingDeg = 0,
                i.kfVelocity = {
                    x: 0,
                    y: 0
                },
                i.kfHeading = void 0,
                i.isIndoor = !0,
                i.isBuilding = !0,
                i.cnt = 0,
                i.firstBeaconsTime = null,
                i.firstBtPosTime = null,
                i.geoZ = 0,
                i.geoDisableAreas = [],
                i.geoEnableAreas = [],
                i.allGeoActive = !1,
                i.setParams(t),
                i.currentZ = i.geoZ,
                i.reset(),
                i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, o.DEventDispatcherES6),
            s(e, [{
                key: "setParams",  
                value: function(t) {
                    t || (t = {}),
                    this.listTimeLen = 6e3,
                    this.geoZ = t.geoZ ? t.geoZ : 0,
                    this.geoActive = void 0 === t.geoActive || t.geoActive,
                    this.stepLen = t.stepLen ? t.stepLen : .72,
                    this.deviceType = void 0 !== t.deviceType ? t.deviceType : P.CONSTANTS.DEVICE.ANDROID,
                    this.useHMM = void 0 === t.useHMM || t.useHMM,
                    this.useBtConfidence = void 0 === t.useBtConfidence || t.useBtConfidence, 
                    this.defaultWlkFusionType = void 0 !== t.defaultWlkFusionType ? t.defaultWlkFusionType : P.CONSTANTS.FUSION_MODEL.PDR,
                    this.floorModelMap = t.floorModelMap ? t.floorModelMap : void 0,
                    this.drivingGPSRegion = t.drivingGPSRegion ? a.LocationUtils.loadRegionPolygons(t.drivingGPSRegion) : void 0
                }
            }, {
                key: "refreshParams",  
                value: function(t) {
                    this.setParams(t),
                    this.zChecker.setParams(t),
                    this.navProcessor.setParams(t),
                    this.bluetoothLocator.setParams(t),
                    this.motionDetector.setParams(t),
                    this.geoLocator.setParams(this.locateOptionsMap.default),
                    this.areaChecker.setParams(t)
                }
            }, {
                key: "reset",  
                value: function() {
                    this.modelManager && this.modelManager.reset(),
                    this.bluetoothLocator && this.bluetoothLocator.reset(),
                    this.navProcessor.reset(this.paths),
                    this.motionState = P.MOTION_STATE.UNCERTAIN,
                    this.accSensorStatus = P.CONSTANTS.ACC_SENSOR_STATUS.NORMAL,
                    this.fusionType = P.CONSTANTS.FUSION_MODEL.PDR,
                    this.stepNum = 0,
                    this.lastStepTime = 0,
                    this.stepTurnAngle = 0,
                    this.btRes = null,
                    this.btPos = null,
                    this.lastBtTime = 0,
                    this.geoPos = null,
                    this.lastValidSignalTime = null,
                    this.headingFlag = !1,
                    this.headingChange = 0,
                    this.notifyTime = 0,
                    this.kfPos = null,
                    this.checkFloorPos = null,
                    this.lastNotifyLocPos = void 0,
                    this.hmmPos = null,
                    this.hmmDir = null,
                    this.hmmProb = null,
                    this.dirAmbiguous = !0,
                    this.navRes = null
                }
            }, {
                key: "initHmm",  
                value: function(t) {
                    this.loadRoadNet(t)
                }
            }, {
                key: "loadRoadNet", 
                value: function(t) {
                    t = t || {},
                    this.roadNetData.loadRoadInfo(t),
                    this.hmm.setRoadNet(this.roadNetData),
                    this.zChecker.setRoadNet(this.roadNetData)
                }
            }, {
                key: "loadBuildingArea", 
                value: function(t, e, i, n, r) {
                    this.areaChecker && this.areaChecker.loadBuildingArea(t, e, i, n, r),
                    i && n && (this.zChecker.loadZAreas(t, e),
                    this.geoEnableAreas = this.geoEnableAreas.concat(e))
                }
            }, {
                key: "changeZ",    
                value: function(t) {
                    if (t !== this.currentZ) {
                        var e = this.currentZ;
                        this.currentZ = t,
                        this.emit("dl_regionChanged", {
                            value: {
                                or: e,
                                nr: t
                            }
                        })
                    }
                }
            }, {
                key: "updateFusionType", 
                value: function() {
                    if (this.posMode === P.POSITION_MODE.DRIVING) {
                        this.setFusionType(P.CONSTANTS.FUSION_MODEL.DIFF);
                        var t = a.LocationUtils.checkInRegion(this.drivingGPSRegion, this.kfPos, this.currentZ) || !this.isBuilding ? P.CONSTANTS.DRIVING_MODE.OUTDOOR : P.CONSTANTS.DRIVING_MODE.INDOOR;
                        this.drvMode !== t && (this.hmm && this.hmm.setParams2posMode(this.posMode, t),
                        this.modelManager.changeState(this.drvMode, t),
                        this.drvMode = t)
                    } else if (this.posMode === P.POSITION_MODE.WALKING)
                        if (!this.isIndoor || this.phonePlacement === P.CONSTANTS.PHONE_PLACEMENT.HOLD && this.accSensorStatus >= P.CONSTANTS.ACC_SENSOR_STATUS.NORMAL && this.headingSatus === P.CONSTANTS.HEADSTATUS.NORMAL) {
                            var e = this.getWlkFusionType2Floor();
                            e === P.CONSTANTS.FUSION_MODEL.PDR && this.fusionType !== P.CONSTANTS.FUSION_MODEL.PDR && this.reset(),
                            this.setFusionType(e) 
                        } else
                            this.setFusionType(P.CONSTANTS.FUSION_MODEL.DIFF)
                }
            }, {
                key: "getWlkFusionType2Floor",
                value: function() {
                    var t = this.defaultWlkFusionType;
                    return this.floorModelMap && this.posMode === P.POSITION_MODE.WALKING && (t = this.currentZ in this.floorModelMap && this.floorModelMap[this.currentZ] === P.CONSTANTS.FUSION_MODEL.DIFF ? P.CONSTANTS.FUSION_MODEL.DIFF : P.CONSTANTS.FUSION_MODEL.PDR),
                    t
                }
            }, {
                key: "updateBdCodeAndConfig", 
                value: function(t) {
                    var e = t.status === P.LOC_AREA_STATUS.UNSET ? this.hmm && this.hmm.checkExceedPositionLimit(this.kfPos) : t.locStatus === P.LOC_AREA_STATUS.EXCEED;
                    e && !this.exceedPositionLimit ? this.emit("dl_exceedPositionLimit", {
                        value: !0
                    }) : !e && this.exceedPositionLimit && this.emit("dl_exceedPositionLimit", {
                        value: !1
                    }),
                    this.exceedPositionLimit = e;
                    var i = t.buildingCode;
                    if (this.isBuilding = t.isBuilding,
                    this.isIndoor = t.isIndoor,
                    i && this.buildingCode !== i) {
                        this.buildingCode = i;
                        var n = this.locateOptionsMap[this.buildingCode];
                        this.refreshParams(n)
                    }
                }
            }, {
                key: "updateAccSensorMode", 
                value: function() {
                    this.motionDetector ? this.accSensorStatus = this.motionDetector.getAccSensorStatus() : this.accSensorStatus = P.CONSTANTS.ACC_SENSOR_STATUS.EMPTY
                }
            }, {
                key: "updateZ", 
                value: function(t, e) {
                    var i = void 0
                      , n = void 0
                      , r = void 0;
                    this.btRes && this.btRes[this.btRes.maxZ] && (r = this.btRes.maxZ,
                    i = this.btRes[r],
                    n = this.btRes.maxZWeight);
                    var s = this.zChecker.checkZ(t, e, i, r, n, this.drvMode, this.geoPos, this.isBuilding, this.cnt);
                    void 0 !== s && s !== this.currentZ && (this.changeZ(s),
                    this.stepTurnAngle = 0,
                    this.getBtPos(t))
                }
            }, {
                key: "getBtPos", 
                value: function(t) {
                    !this.btRes || this.btRes.t < t - 3e3 ? this.btPos = void 0 : this.kfPos ? this.btRes[this.currentZ] && (this.btPos = this.btRes[this.currentZ],
                    this.btPos.t = this.btRes.t,
                    this.btPos.zWeights = this.btRes.zWeights) : (this.btPos = this.btRes[this.btRes.maxZ],
                    this.btPos.t = this.btRes.t,
                    this.btPos.zWeights = this.btRes.zWeights)
                }
            }, {
                key: "boundaryAdjust", 
                value: function() {
                    this.btPos && this.btPos.s && this.geoPos && (this.geoPos.c < 2.5 && this.geoPos.accuracy < 4.5 && this.btPos.m < -65 || this.geoPos.c < 4.5 && this.geoPos.accuracy < 12 && this.btPos.m < -75) && (this.btPos.c += 4,
                    this.geoPos.c = this.geoPos.c > 1.5 ? this.geoPos.c - 1.5 : this.geoPos.c)
                }
            }, {
                key: "kfProcess", 
                value: function(t, e) {
                    this.checkPosState(e),
                    this.kfPos = e.pos;
                    var i = this.getFloorPos();
                    this.updateZ(t, i),
                    this.kfPos.z = this.currentZ,
                    this.kfVelocity = e.velocity, //速度
                    this.kfHeading = e.heading
                }
            }, {
                key: "hmmProcess",
                value: function(t, e) {
                    t && t.point ? (this.hmmPos = t.point,
                    this.hmmDir = h.Numerical.rad2deg(t.direction),
                    this.hmmProb = t.prob,
                    this.dirAmbiguous = t.ambiguous) : (this.hmmDir = this.headingDeg,
                    this.hmmProb = .5,
                    this.hmmPos = e,
                    this.dirAmbiguous = !0)
                }
            }, {
                key: "navProcess",
                value: function(t, e, i, n, r, s) {
                    return this.navRes = t,
                    t.accordLevel !== P.ACCORD_LEVEL.DEVIATED && t.mapPoint && (e = i = t.mapPoint,
                    this.checkFloorPos = t.navPos,
                    this.dirAmbiguous || (s = t.pathHeading)),
                    r = t.accordLevel === P.ACCORD_LEVEL.DEVIATED,
                    t.transFloorType !== P.TRANS_FLOOR_TYPE.NULL && t.transFloorPoint && a.LocationUtils.distance(e, t.transFloorPoint) < 12 && (i = t.transFloorPoint,
                    n = t.transFloorType,
                    r = !1),
                    r && t.mapPoint && a.LocationUtils.distance(e, this.lastNotifyLocPos) < 2 && (r = !1),
                    [e, i, n, r, s]
                }
            }, {
                key: "updatePosition", 
                value: function(t) {
                    this.getBtPos(t),
                    this.updateFusionType(),
                    this.updateAccSensorMode(),
                    this.checkValidSignal(t),
                    this.boundaryAdjust();
                    var e = this.headingFlag ? h.Numerical.deg2rad(this.headingDeg) : void 0;
                    this.bBtConf = this.useBtConfidence && this.currentZ >= this.geoZ,
                    this.modelManager.updateFusionModels(t, this.currentZ, this.kfPos, this.btPos, this.geoPos, e, this.stepLen, this.stepNum, this.bBtConf, this.isIndoor);
                    var i = this.modelManager.getStates(this.posMode, this.fusionType, this.drvMode);
                    if (i.pos) {
                        this.kfProcess(t, i);
                        var n = this.compensatePosition(this.kfPos, this.kfVelocity, this.posMode, this.fusionType, this.deviceType)
                          , s = this.mapPoint2Road(this.t, n, this.kfPos, e);
                        this.hmmProcess(s, n);
                        var o = this.modelManager.getBaseKfInfos()
                          , a = this.navProcessor.updateNavigation(t, this.currentZ, n, this.kfPos, this.stepNum, this.btPos, this.geoPos, e, this.posMode, this.drvMode, this.isIndoor, this.accSensorStatus, this.motionState, this.stepTurnAngle, o, this.fusionType)
                          , l = this.useHMM && !this.exceedPositionLimit ? this.hmmPos : n
                          , c = this.useHMM && !this.exceedPositionLimit ? this.hmmPos : n
                          , u = P.TRANS_FLOOR_TYPE.NULL
                          , f = !1
                          , d = this.getEstDirection();
                        if (a) {
                            var v = this.navProcess(a, l, c, u, f, d)
                              , p = r(v, 5);
                            l = p[0],
                            c = p[1],
                            u = p[2],
                            f = p[3],
                            d = p[4]
                        }
                        var y = this.areaChecker.checkArea(l, this.currentZ);
                        this.updateBdCodeAndConfig(y),
                        this.notifyControl(t, l, c, f, u, d)
                    }
                }
            }, {
                key: "notifyControl", 
                value: function(t, e, i, n, r, s) {
                    var o = t - this.notifyTime;
                    if (this.posMode === P.POSITION_MODE.DRIVING) {
                        var h = this.kfVelocity.x * this.kfVelocity.x + this.kfVelocity.y * this.kfVelocity.y;
                        (o > 700 && h > 1 || 0 === this.notifyTime) && this.notifyPosition(t, e, i, n, r, s)
                    } else if (this.posMode === P.POSITION_MODE.WALKING)
                        if (this.fusionType === P.CONSTANTS.FUSION_MODEL.DIFF)
                            (o > 700 && t - this.lastStepTime <= 1500 || 0 === this.notifyTime || o > 700 && this.accSensorStatus === P.CONSTANTS.ACC_SENSOR_STATUS.EMPTY) && this.notifyPosition(t, e, i, n, r, s);
                        else if (this.fusionType === P.CONSTANTS.FUSION_MODEL.PDR) {
                            var l = o >= 2e3 && a.LocationUtils.distance(this.kfPos, this.lastNotifyLocPos) >= 5;
                            (this.stepNum > 0 || 0 === this.notifyTime || l) && this.notifyPosition(t, e, i, n, r, s)
                        }
                }
            }, {
                key: "notifyPosition", 
                value: function(t, e, i, n, r, s) {
                    this.cnt += 1,
                    this.notifyTime,
                    this.notifyTime = t,
                    this.lastNotifyLocPos = e;
                    var o = !1;
                    n && t - this.notifyRenavTime > 6e3 && (this.notifyRenavTime = t,
                    o = !0);
                    var a = {
                        t: t,
                        x: e.x,
                        y: e.y,
                        x_display: i.x,
                        y_display: i.y,
                        vx: this.kfVelocity.x,
                        vy: this.kfVelocity.y,
                        z: this.currentZ,
                        buildingCode: this.buildingCode,
                        isIndoor: this.isIndoor,
                        direction: this.headingDeg,
                        kf_direction: this.kfHeading,
                        display_direction: s,
                        hmmDir: this.hmmDir,
                        hmmProb: this.hmmProb,
                        dirAmbiguous: this.dirAmbiguous,
                        bt_x: this.btPos ? this.btPos.x : void 0,
                        bt_y: this.btPos ? this.btPos.y : void 0,
                        geo_x: this.geoPos ? this.geoPos.x : void 0,
                        geo_y: this.geoPos ? this.geoPos.y : void 0,
                        kf_x: this.kfPos ? this.kfPos.x : void 0,
                        kf_y: this.kfPos ? this.kfPos.y : void 0,
                        hmm_x: this.hmmPos ? this.hmmPos.x : void 0,
                        hmm_y: this.hmmPos ? this.hmmPos.y : void 0,
                        mapMatchingStatus: !0,
                        pos2PathDis: this.navRes ? this.navRes.dist2Path : void 0,
                        betweenNavPointInfo: this.navRes ? this.navRes.betweenNavPointInfo : void 0,
                        drivingMode: this.drvMode,
                        accuracy: this.accuracy,
                        deviateNaviPath: o,
                        transFloorState: r,
                        exceedPositionLimit: this.exceedPositionLimit
                    };
                    this.isSimulation && (a = this.getSimData(a)),
                    this.isBuilding || 0 === a.z || (a.z = 0),
                    e && this.emit("dl_positionChanged", {
                        value: a
                    })
                }
            }, {
                key: "getSimData", 
                value: function(t) {
                    return t.geo_c = this.geoPos && this.geoPos.c ? this.geoPos.c : null,
                    t.bt_c = this.btPos && this.btPos.c ? this.btPos.c : null,
                    t.vx_back = this.kfVelocity.x,
                    t.vy_back = this.kfVelocity.y,
                    t.kf_direction_back = h.Numerical.rad2deg(Math.atan2(this.kfVelocity.x, this.kfVelocity.y)),
                    t
                }
            }, {
                key: "checkValidSignal", 
                value: function(t) {
                    this.lastValidSignalTime && t - this.lastValidSignalTime > 1e4 && this.reset(),
                    this.geoPos && (!this.lastValidSignalTime || this.geoPos.t > this.lastValidSignalTime) && (this.lastValidSignalTime = this.geoPos.t);
                    var e = a.LocationUtils.checkInRegion(this.geoDisableAreas, this.geoPos, this.currentZ)
                      , i = void 0;
                    if (i = 0 === this.notifyTime ? a.LocationUtils.initCheckInRegion(this.geoEnableAreas, this.geoPos, this.currentZ) : a.LocationUtils.checkInRegion(this.geoEnableAreas, this.geoPos, this.currentZ),
                    e || !this.allGeoActive)
                        this.geoPos = void 0;
                    else if (this.geoPos) {
                        this.exceedPositionLimit || this.geoPos.place === P.LOC_AREA_STATUS.EXCEED || this.drvMode === P.CONSTANTS.DRIVING_MODE.OUTDOOR || this.geoActive && (i || !(this.geoPos.place === P.LOC_AREA_STATUS.BUILDING)) || (this.geoPos = void 0)
                    }
                    this.btRes && (!this.lastValidSignalTime || this.btRes.t > this.lastValidSignalTime) && (this.lastValidSignalTime = this.btRes.t)
                }
            }, {
                key: "compensatePosition",
                value: function(t, e, i, n, r) {
                    var s = (0,
                    m.default)(t);
                    if (n === P.CONSTANTS.FUSION_MODEL.DIFF) {
                        var o = void 0;
                        i === P.POSITION_MODE.DRIVING ? Math.abs(this.headingChange) >= 30 ? o = P.CONSTANTS.DEVICE.IOS ? .5 : 0 : (P.CONSTANTS.DEVICE.IOS,
                        o = 2.5) : o = r === P.CONSTANTS.DEVICE.IOS ? 1.5 : 1;
                        var a = Math.sqrt(e.x * e.x + e.y * e.y)
                          , h = 1;
                        a > 10 && (h = 10 / a),
                        s.x = t.x + e.x * o * h,
                        s.y = t.y + e.y * o * h
                    }
                    return s
                }
            }, {
                key: "mapPoint2Road", 
                value: function(t, e, i, n) {
                    var r = void 0;
                    if (this.hmm) {
                        var s = this.navStatus ? i : e;
                        r = this.hmm.mapMatchingInRealTime(t, s, n, this.motionState)
                    }
                    return this.mapMatchingStatus = !0,
                    r
                }
            }, {
                key: "getEstDirection", 
                value: function() {
                    var t = this.headingDeg;
                    return (this.posMode === P.POSITION_MODE.DRIVING && Math.pow(this.kfVelocity.x, 2) + Math.pow(this.kfVelocity.y, 2) > 1 || this.ARNavStatus) && (t = this.kfHeading),
                    this.posMode !== P.POSITION_MODE.DRIVING && !this.ARNavStatus || void 0 === this.hmmDir || null === this.hmmDir || (t = this.hmmDir),
                    t
                }
            }, {
                key: "getFloorPos",
                value: function() {
                    var t = void 0;
                    return this.checkFloorPos ? (t = this.checkFloorPos,
                    this.checkFloorPos = null) : t = this.kfPos,
                    t
                }
            }, {
                key: "updatePhonePlacement", 
                value: function(t) {
                    void 0 !== t && (this.phonePlacement = t)
                }
            }, {
                key: "updateHeading", 
                value: function(t) {
                    this.headingChange = this.headingFlag ? t.value.heading - this.headingDeg : 0,
                    this.headingDeg = t.value.heading,
                    this.motionDetector.updateHeading(t.timestamp, t.value.heading),
                    this.headingFlag = !0
                }
            }, {
                key: "updateAcc", 
                value: function(t, e, i) {
                    var n = this.motionDetector.detectMotion(t, e, i);
                    n && (this.motionState = n.motionState,
                    n.step && (this.stepTurnAngle = n.turnAngle,
                    this.updateStep(n.t, 1),
                    this.emit("dl_stepChanged", {
                        value: {
                            timestamp: n.t,
                            steps: 1
                        }
                    })),
                    this.updatePhonePlacement(n.phonePlacement))
                }
            }, {
                key: "updateStep",
                value: function(t, e) {
                    this.stepNum = e,
                    this.lastStepTime = t,
                    this.fusionType === P.CONSTANTS.FUSION_MODEL.PDR && (this.updateTime(t),
                    this.updatePosition(t)),
                    this.stepNum = 0
                }
            }, {
                key: "updateGeoPosition", 
                value: function(t) {
                    var e = t.value;
                    if (e && !(e.accuracy <= 0) && void 0 !== e.x && null !== e.x && void 0 !== e.y && null !== e.y) {
                        var i = this.areaChecker.checkLocArea(e, this.geoZ).locStatus
                          , n = i === P.LOC_AREA_STATUS.EXCEED
                          , r = this.geoLocator.updatePosition(t.value, this.headingDeg, this.posMode, this.buildingCode, this.btPos, n);
                        n || (i = this.areaChecker.checkLocArea(r, this.geoZ).locStatus),
                        r && r.accuracy > 0 ? (this.geoPos = (0,
                        m.default)(r),
                        this.geoPos.place = i) : this.geoPos = void 0
                    }
                }
            }, {
                key: "addAps",
                value: function(t, e) {
                    t.forEach(function(t) {
                        e && (t.x -= e.x,
                        t.y -= e.y)
                    }),
                    this.bluetoothLocator.addAps(t)
                }
            }, {
                key: "addLocationOptions", 
                value: function(t, e, i) {
                    if (e) {
                        var n = e.geoDisableAreas ? a.LocationUtils.loadRegionPolygons(e.geoDisableAreas) : [];
                        this.geoDisableAreas = this.geoDisableAreas.concat(n);
                        var r = e.geoEnableAreas ? a.LocationUtils.loadRegionPolygons(e.geoEnableAreas) : [];
                        r.forEach(function(t) {
                            t && 0 !== t.z && (t.type = "top_open")
                        }),
                        this.geoEnableAreas = this.geoEnableAreas.concat(r),
                        void 0 !== e.allGeoActive && (this.allGeoActive = e.allGeoActive),
                        this.zChecker.addGeoZAreas(r),
                        this.zChecker.loadZAreas(t, e.zAreas),
                        this.areaChecker.loadIndoorAreas(e.indoorAreas),
                        this.areaChecker.loadOutsideAreas(e.outsideAreas),
                        this.areaChecker.loadOutsideAreas(e.outsideArea),
                        this.areaChecker.loadOutsideAreas(r),
                        void 0 !== e.apBoundary && this.bluetoothLocator.loadApBoundary(e.apBoundary),
                        this.locateOptionsMap[t] = e,
                        this.locateOptionsMap.default && i || (this.locateOptionsMap.default = e)
                    }
                }
            }, {
                key: "updateBeacons", 
                value: function(t) {
                    var e = {
                        value: null
                    };
                    if (!this.locationStarted)
                        return e;
                    var i = t.timestamp;
                    this.firstBeaconsTime || (this.firstBeaconsTime = i);
                    var n = this.bluetoothLocator.updateBeacons(i, t.value, this.posMode, this.isIndoor, this.kfPos);
                    if (n && n[n.maxZ]) {
                        this.btRes = n,
                        this.lastBtTime = n.t,
                        this.firstBtPosTime || (this.firstBtPosTime = n.t),
                        this.locationStarted && (this.fusionType === P.CONSTANTS.FUSION_MODEL.DIFF && n.t > this.t || 0 === this.notifyTime) && (this.updateTime(n.t),
                        this.updatePosition(n.t));
                        var r = n.maxZ <= -1e4 ? this.currentZ : n.maxZ;
                        e.value = {
                            type: "btPos",
                            x: n[n.maxZ].x,
                            y: n[n.maxZ].y,
                            z: r,
                            timestamp: i,
                            confidence: n[n.maxZ].c
                        }
                    }
                    return e
                }
            }, {
                key: "updateTime", 
                value: function(t) {
                    this.t = t
                }
            }, {
                key: "start",  
                value: function() {
                    var t = this;
                    this.locationStarted = !0,
                    this.reset();
                    var e = 0;
                    null === this.locationTimer && (this.locationTimer = setInterval(function() {
                        var i = (new Date).getTime();
                        i - t.t > 990 && (t.updateTime(i),
                        t.updatePosition(i)),
                        0 === (e = (e + 1) % 2) && t.motionDetector && t.motionDetector.checkAccSensorMode(i)
                    }, 1e3))
                }
            }, {
                key: "stop", 
                value: function() {
                    this.locationStarted = !1,
                    this.locationTimer && clearInterval(this.locationTimer),
                    this.reset()
                }
            }, {
                key: "setFusionType",
                value: function(t) {
                    this.fusionType !== t && (this.fusionType = t)
                }
            }, {
                key: "setPositionMode", 
                value: function(t) {
                    t !== this.posMode && (this.reset(),
                    this.hmm.reset()),
                    this.posMode = t,
                    this.hmm.setParams2posMode(this.posMode, this.drvMode),
                    this.zChecker.setParams2posMode(this.posMode)
                }
            }, {
                key: "setNavigationPaths", 
                value: function(t) {
                    if (t) {
                        this.navStatus = !0;
                        var e = (0,
                        m.default)(t);
                        this.paths = e.originPath,
                        this.navProcessor.setPath(this.t, e.originPath, e.path)
                    } else
                        this.navStatus = !1,
                        this.paths = null,
                        this.navProcessor.setPath(this.t)
                }
            }, {
                key: "checkPosState",  
                value: function(t) {
                    a.LocationUtils.distance(t.pos, this.lastNotifyLocPos) > 4 && (!this.areaChecker.checkLocArea(t.pos).isIndoor && this.isIndoor && this.geoPos && this.btPos && this.btPos.s && this.geoPos.c < 3 && (this.hmm.reset(),
                    this.currentZ = this.zChecker.z = 0))
                }
            }, {
                key: "startAR",  
                value: function(t) {
                    t && (this.ARNavStatus = !0,
                    this.navProcessor.setARInitPos(t))
                }
            }, {
                key: "stopAR",  
                value: function(t) {
                    t && (this.ARNavStatus = !1,
                    this.extraReset(),
                    this.modelManager.setARLastPos(t))
                }
            }, {
                key: "extraReset", 
                value: function() {
                    this.reset(),
                    this.zChecker.reset()
                }
            }, {
                key: "enableHMM",
                value: function(t) {
                    this.useHMM = t
                }
            }, {
                key: "dispose",
                value: function() {
                    this.reset(),
                    this.hmm && (this.hmm.dispose(),
                    this.hmm = null),
                    this.offAllEvents()
                }
            }]),
            e
        }();
        e.LocationEngine = b
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.BluetoothLocator = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(2)
          , s = i(0)
          , o = i(7)
          , a = i(1);
        function h(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var l = function() {  
            function t() {
                h(this, t)
            }
            return n(t, null, [{
                key: "calBtPos", 
                value: function(e, i, n, r, s) { 
                    if (0 === e.length)
                        return null;
                    e.sort(function(t, e) {
                        return e.rssi - t.rssi
                    });
                    var o = e[0].rssi
                      , a = e.slice(0, 5);
                    t.calGradientWeight(a, o); 
                    var h = a.reduce(function(t, e) {
                        return t + e.weight
                    }, 0)
                      , l = t.calConfidence(a)
                      , c = t.calNearAPCount(a, o, r, s)
                      , u = t.checkBoundaryState(a, n)
                      , f = a.reduce(function(t, e) {
                        return t + e.rssi
                    }, 0) / a.length;
                    return {
                        x: a.reduce(function(t, e) {
                            return t + e.x * e.weight
                        }, 0) / h,
                        y: a.reduce(function(t, e) {
                            return t + e.y * e.weight
                        }, 0) / h,
                        z: parseFloat(i),
                        c: l,
                        p: c,
                        s: u,
                        m: f
                    }
                }
            }, {
                key: "getMostProbZ", 
                value: function(e) {
                    if (!e || e.length < 1)
                        return {
                            zWeights: {},
                            maxZ: -1e4,
                            maxZWeight: 0
                        };
                    e.sort(function(t, e) {
                        return e.rssi - t.rssi
                    });
                    var i = e.slice(0, 10)
                      , n = i[0].rssi
                      , r = {}
                      , s = 0;
                    i.forEach(function(e) {
                        var i = t.weight(n, e.rssi);
                        s += i,
                        e.z in r ? r[e.z] += i : r[e.z] = i
                    });
                    var o = 0
                      , a = "-10000";
                    for (var h in r) {
                        var l = parseFloat(r[h]) / s;
                        r[h] = l,
                        l > o && (a = h,
                        o = l)
                    }
                    return {
                        zWeights: r,
                        maxZ: parseFloat(a),
                        maxZWeight: o
                    }
                }
            }, {
                key: "weight",  
                value: function(t, e) {
                    return 3 / (3 + 3083.5 / (1 + (-3.5 + t) * (-3.5 + t)) * Math.abs(t - e))
                }
            }, {
                key: "printBeacons",  
                value: function(t) {
                    (t = t.sort(function(t, e) {
                        var i = e.rssi - t.rssi;
                        return 0 !== i ? i : e.ts - t.ts
                    })).forEach(function(t) {})
                }
            }, {
                key: "divergence",  
                value: function(t) {
                    for (var e = 0, i = 0, n = 0; n < t.length - 1; n++)
                        for (var r = 1; r < t.length; r++)
                            e += 1,
                            i += Math.sqrt(Math.pow(t[n].x - t[r].x, 2) + Math.pow(t[n].y - t[r].y, 2));
                    return e > 0 ? i / e : 0
                }
            }, {
                key: "calGradientWeight", 
                value: function(t, e) {
                    t.map(function(t) {
                        var i = 0
                          , n = e - t.rssi;
                        i = n < 3 ? 1 : n <= 8 ? .66 : 0,
                        t.weight = i
                    })
                }
            }, {
                key: "calNearAPCount", 
                value: function(t, e, i, n) {
                    var r = 0;
                    if (i && n === s.POSITION_MODE.WALKING)
                        for (var o = 0; o < t.length; o++)
                            (i.x - t[o].x) * (i.x - t[o].x) + (i.y - t[o].y) * (i.y - t[o].y) < 400 && (t[o].rssi > e - 10 || t[o].rssi > -78) && (r += 1);
                    return r
                }
            }, {
                key: "calConfidence", 
                value: function(e) {
                    var i = 1
                      , n = e.reduce(function(t, e) {
                        return t + e.rssi
                    }, 0) / e.length;
                    n < -78 && (i = 3 + (-78 - n) / 4);
                    var r = t.divergence(e)
                      , s = 1;
                    return r > 20 && (s = 3 + (r - 20) / 5),
                    i > s ? i : s
                }
            }, {
                key: "checkBoundaryState", 
                value: function(t, e) {
                    var i = 0;
                    if (e && t.forEach(function(t) {
                        if (void 0 === t.boundary) 
                            for (var n = {
                                x: t.x,
                                y: t.y,
                                z: 0
                            }, r = 0, s = e.length - 1; r < e.length; s = r++) {
                                if (a.Geometric.projectPoint2Segment(n, e[r], e[s])[0] < 10) {
                                    i += 1,
                                    t.boundary = 1;
                                    break
                                }
                            }
                        else
                            1 === t.boundary && (i += 1)
                    }),
                    i / t.length >= .6)
                        return !0
                }
            }]),
            t
        }()
          , c = function() {
            function t(e) {
                h(this, t),
                this._aps = [],
                this.apBoundary = null,
                e || (e = {}),
                this.startTime = e.startTime || (new Date).getTime(),
                this.setParams(e),
                this.reset()
            }
            return n(t, [{
                key: "setParams",  
                value: function(t) {
                    t || (t = {}),
                    this.REC_INTERVAL = t.RecInterval ? t.RecInterval : 5e3,
                    this.QUERY_INTERVAL = t.QueryInterval ? t.QueryInterval : 2e3,
                    this.Z_CHECK_INTERVAL = t.ZCheckInterval ? t.ZCheckInterval : 3e3,
                    this.ZInitTimeout = t.ZInitTimeout ? t.ZInitTimeout : 3e3,
                    this.deviceType = void 0 !== t.deviceType ? t.deviceType : s.CONSTANTS.DEVICE.ANDROID
                }
            }, {
                key: "reset",
                value: function() {
                    this.cnt = 0,
                    this.curZCnt = 0,
                    this.z = void 0,
                    this.startFlag = 0,
                    this.btPosList = [],
                    this.cMean = void 0,
                    this.listTimeLen = 5e3
                }
            }, {
                key: "addAps", 
                value: function(t) {
                    t && (t.forEach(function(t) {
                        void 0 === t.z && (t.z = t.re),
                        t.rssiList = []
                    }),
                    this._aps = this._aps.concat(t))
                }
            }, {
                key: "resetAps", 
                value: function() {
                    this._aps && this._aps.forEach(function(t) {
                        t.rssiList = []
                    })
                }
            }, {
                key: "_matchAp", 
                value: function(t, e) {
                    if (!this._aps)
                        return null;
                    for (var i = 0; i < this._aps.length; i++) {
                        var n = this._aps[i];
                        if (parseInt(n.ma) === parseInt(t) && parseInt(n.mi) === parseInt(e))
                            return n
                    }
                    return null
                }
            }, {
                key: "getCurrentBeacons", 
                value: function(t, e, i) {
                    var n = []
                      , r = !0
                      , s = !1
                      , o = void 0;
                    try {
                        for (var a, h = t[Symbol.iterator](); !(r = (a = h.next()).done); r = !0) {
                            var l = a.value;
                            if (l.rssiList.length > 0) {
                                var c = !0
                                  , u = !1
                                  , f = void 0;
                                try {
                                    for (var d, v = l.rssiList[Symbol.iterator](); !(c = (d = v.next()).done); c = !0) {
                                        var p = d.value;
                                        i - p.timestamp < this.REC_INTERVAL && n.push({
                                            major: l.ma,
                                            minor: l.mi,
                                            x: l.x,
                                            y: l.y,
                                            region: l.re,
                                            timestamp: p.timestamp,
                                            rssi: p.rssi,
                                            z: l.z
                                        })
                                    }
                                } catch (t) {
                                    u = !0,
                                    f = t
                                } finally {
                                    try {
                                        !c && v.return && v.return()
                                    } finally {
                                        if (u)
                                            throw f
                                    }
                                }
                            }
                        }
                    } catch (t) {
                        s = !0,
                        o = t
                    } finally {
                        try {
                            !r && h.return && h.return()
                        } finally {
                            if (s)
                                throw o
                        }
                    }
                    return n.sort(function(t, e) {
                        return e.rssi !== t.rssi ? e.rssi - t.rssi : e.ts - t.ts
                    }),
                    n
                }
            }, {
                key: "calNearAP", 
                value: function(t, e) {
                    return this._aps.filter(function(i) {
                        return t && r.LocationUtils.distance(t, i) <= e
                    }).length
                }
            }, {
                key: "updateBtPosList", 
                value: function(t, e) {
                    for (e.t = t,
                    e.dist2Navi = 0,
                    this.btPosList.push(e); this.btPosList.length > 0 && e.t - this.btPosList[0].t > this.listTimeLen; )
                        this.btPosList.shift();
                    this.cMean = e.cMean = this.getMeanBtConfidence()
                }
            }, {
                key: "getMeanBtConfidence", 
                value: function() {
                    var t = this.btPosList.length / this.listTimeLen * 1e3
                      , e = this.btPosList.length > 0 ? this.btPosList.reduce(function(t, e) {
                        return t + e.c
                    }, 0) / this.btPosList.length : 1;
                    return t < .8 && (e += (1 - t) / .5),
                    e
                }
            }, {
                key: "calBtConfidence",
                value: function() {}
            }, {
                key: "checkBtReceiving", 
                value: function(t, e, i) {
                    var n = this.getCurrentBeacons(this._aps, 5e3, t);
                    i || (i = 20);
                    var s = this.calNearAP(e, i)
                      , o = n.filter(function(t) {
                        return !e || r.LocationUtils.distance(e, t) <= i
                    });
                    e && s >= 8 && o.length
                }
            }, {
                key: "checkBeaconReceiving", 
                value: function(t) {
                    var e = this.getCurrentBeacons(this._aps, 1e4, t);
                    return this.startFlag && e.length < 1 ? (this.reset(),
                    0) : 1
                }
            }, {
                key: "updateApsByReceivedBeacons",
                value: function(t, e) {
                    var i = this;
                    e.forEach(function(e) {
                        var n = i._matchAp(e.major, e.minor);
                        if (n && "-100" !== e.rssi && "0" !== e.rssi && 0 !== e.rssi && -100 !== e.rssi) {
                            var r = n.rssiList.push({
                                timestamp: t,
                                rssi: parseInt(e.rssi)
                            });
                            n.status = 1,
                            r > 15 && n.rssiList.shift()
                        }
                    })
                }
            }, {
                key: "locate", 
                value: function(t, e) {
                    if (!t || void 0 === e)
                        return null;
                    var i = t.filter(function(t) {
                        return t.z === e
                    })
                      , n = l.calBtPos(i)
                      , s = t.filter(function(t) {
                        return t.z === e || t.z <= o.HEIGHT.STAIRS || r.LocationUtils.distance(t, n) < 12
                    });
                    return l.calBtPos(s, e, this.apBoundary)
                }
            }, {
                key: "loadApBoundary", 
                value: function(t) {
                    this.apBoundary = t
                }
            }, {
                key: "updateBeacons",
                value: function(t, e, i, n, s) {
                    var o = this;
                    if (!e)
                        return null;
                    this.cnt += 1,
                    this.updateApsByReceivedBeacons(t, e);
                    var a = this.getCurrentBeacons(this._aps, this.Z_CHECK_INTERVAL, t)
                      , h = (a = a.filter(function(t) {
                        return !s || r.LocationUtils.distance(s, t) <= 100
                    })).filter(function(e) {
                        return t - e.timestamp < o.QUERY_INTERVAL
                    })
                      , c = a.filter(function(e) {
                        return t - e.timestamp < o.Z_CHECK_INTERVAL
                    });
                    if (0 === c.length || 0 === h.length)
                        return null;
                    var u = l.getMostProbZ(c);
                    for (var f in u.t = t,
                    u.zWeights)
                        u[f] = this.locate(h, parseFloat(f));
                    return this.updateBtPosList(t, u[u.maxZ]),
                    this.z === u.maxZ ? (u.maxZWeight > .7 && u[u.maxZ].c < 7 && (this.curZCnt += 1),
                    (!n && this.curZCnt > 8 && this.cMean < 3 || n && this.curZCnt > 6 && this.cMean < 1.5 || this.curZCnt > 10) && (u.maxZWeight = 1.1)) : (this.curZCnt = 0,
                    this.z = u.maxZ),
                    this.startFlag || (this.cnt >= 2 && this.cMean <= 3 || t - this.startTime > 3e3) && (this.startFlag = !0),
                    this.startFlag ? u : void 0
                }
            }]),
            t
        }();
        e.BluetoothLocator = c
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.GeoLocator = void 0;
        var n, r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), s = i(2), o = i(3), a = (n = o) && n.__esModule ? n : {
            default: n
        }, h = i(0);
        var l = {
            PI: 3.141592653589793,
            x_pi: 52.35987755982988,
            delta: function(t, e) {  
                var i = 6378245
                  , n = .006693421622965943
                  , r = this.transformLat(e - 105, t - 35) 
                  , s = this.transformLon(e - 105, t - 35) 
                  , o = t / 180 * this.PI
                  , a = Math.sin(o);
                a = 1 - n * a * a;
                var h = Math.sqrt(a);
                return {
                    lat: r = 180 * r / (i * (1 - n) / (a * h) * this.PI),
                    lon: s = 180 * s / (i / h * Math.cos(o) * this.PI)
                }
            },
            gcj_encrypt: function(t, e) {
                if (this.outOfChina(t, e))
                    return {
                        lat: t,
                        lon: e
                    };
                var i = this.delta(t, e);
                return {
                    lat: t + i.lat,
                    lon: e + i.lon
                }
            },
            gcj_decrypt: function(t, e) {
                if (this.outOfChina(t, e))
                    return {
                        lat: t,
                        lon: e
                    };
                var i = this.delta(t, e);
                return {
                    lat: t - i.lat,
                    lon: e - i.lon
                }
            },
            gcj_decrypt_exact: function(t, e) {
                for (var i, n, r = .01, s = .01, o = t - r, a = e - s, h = t + r, l = e + s, c = 0; ; ) {
                    i = (o + h) / 2,
                    n = (a + l) / 2;
                    var u = this.gcj_encrypt(i, n);
                    if (r = u.lat - t,
                    s = u.lon - e,
                    Math.abs(r) < 1e-9 && Math.abs(s) < 1e-9)
                        break;
                    if (r > 0 ? h = i : o = i,
                    s > 0 ? l = n : a = n,
                    ++c > 1e4)
                        break
                }
                return {
                    lat: i,
                    lon: n
                }
            },
            bd_encrypt: function(t, e) {
                var i = e
                  , n = t
                  , r = Math.sqrt(i * i + n * n) + 2e-5 * Math.sin(n * this.x_pi)
                  , s = Math.atan2(n, i) + 3e-6 * Math.cos(i * this.x_pi)
                  , o = r * Math.cos(s) + .0065;
                return {
                    lat: r * Math.sin(s) + .006,
                    lon: o
                }
            },
            bd_decrypt: function(t, e) {
                var i = e - .0065
                  , n = t - .006
                  , r = Math.sqrt(i * i + n * n) - 2e-5 * Math.sin(n * this.x_pi)
                  , s = Math.atan2(n, i) - 3e-6 * Math.cos(i * this.x_pi)
                  , o = r * Math.cos(s);
                return {
                    lat: r * Math.sin(s),
                    lon: o
                }
            },
            mercator_encrypt: function(t, e) {
                var i = 20037508.34 * e / 180
                  , n = Math.log(Math.tan((90 + t) * this.PI / 360)) / (this.PI / 180);
                return {
                    lat: n = 20037508.34 * n / 180,
                    lon: i
                }
            },
            mercator_decrypt: function(t, e) {
                var i = e / 20037508.34 * 180
                  , n = t / 20037508.34 * 180;
                return {
                    lat: n = 180 / this.PI * (2 * Math.atan(Math.exp(n * this.PI / 180)) - this.PI / 2),
                    lon: i
                }
            },
            distance: function(t, e, i, n) {
                var r = Math.cos(t * this.PI / 180) * Math.cos(i * this.PI / 180) * Math.cos((e - n) * this.PI / 180) + Math.sin(t * this.PI / 180) * Math.sin(i * this.PI / 180);
                r > 1 && (r = 1),
                r < -1 && (r = -1);
                var s = 6371e3 * Math.acos(r);
                return s
            },
            outOfChina: function(t, e) { 
                return e < 72.004 || e > 137.8347 || (t < .8293 || t > 55.8271)
            },
            transformLat: function(t, e) {   
                var i = 2 * t - 100 + 3 * e + .2 * e * e + .1 * t * e + .2 * Math.sqrt(Math.abs(t));
                return i += 2 * (20 * Math.sin(6 * t * this.PI) + 20 * Math.sin(2 * t * this.PI)) / 3,
                i += 2 * (20 * Math.sin(e * this.PI) + 40 * Math.sin(e / 3 * this.PI)) / 3,
                i += 2 * (160 * Math.sin(e / 12 * this.PI) + 320 * Math.sin(e * this.PI / 30)) / 3
            },
            transformLon: function(t, e) { 
                var i = 300 + t + 2 * e + .1 * t * t + .1 * t * e + .1 * Math.sqrt(Math.abs(t));
                return i += 2 * (20 * Math.sin(6 * t * this.PI) + 20 * Math.sin(2 * t * this.PI)) / 3,
                i += 2 * (20 * Math.sin(t * this.PI) + 40 * Math.sin(t / 3 * this.PI)) / 3,
                i += 2 * (150 * Math.sin(t / 12 * this.PI) + 300 * Math.sin(t / 30 * this.PI)) / 3
            }
        }
          , c = function() {
            function t(e) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e || (e = {}),
                this.setParams(e),
                this.reset()
            }
            return r(t, [{
                key: "setParams",
                value: function(t) {
                    t || (t = {}),
                    this.geoShift = t.geoShift ? t.geoShift : {
                        x: 0,
                        y: 0
                    },
                    this.geoDenominator = t.geoDenominator ? t.geoDenominator : 4,  //地理分母
                    this.geoAdjustParams = t.geoAdjustParams ? t.geoAdjustParams : null //地理调整参数
                }
            }, {
                key: "reset", 
                value: function() {
                    this.position = null,
                    this.infoList = [],
                    this.infoTimeLen = 6e3,
                    this.gcjLat = null,
                    this.gcjLon = null,
                    this.wgsLat = null,
                    this.wgsLon = null,
                    this.latLonList = [],
                    this.llLen = 6
                }
            }, {
                key: "saveInfoList", 
                value: function(t, e) {
                    var i = {
                        timestamp: t.timestamp,
                        x: t.x,
                        y: t.y,
                        accuracy: t.accuracy
                    };
                    for (this.position && t.timestamp !== this.position.timestamp && (i.v = 1e3 * s.LocationUtils.distance(t, this.position) / (this.position.timestamp - t.timestamp),
                    i.gpsHeading = 180 / Math.PI * Math.atan2(this.position.x - t.x, this.position.y - t.y),
                    i.compassHeading = e,
                    this.infoList.push(i)); this.infoList.length > 0 && t.timestamp - this.infoList[0].timestamp > this.infoTimeLen; )
                        this.infoList.shift()
                }
            }, {
                key: "calGeoReliability",
                value: function(t, e, i) {
                    var n = this.geoDenominator
                      , r = t.accuracy / n;
                    if (e === h.POSITION_MODE.DRIVING)
                        i >= 3 && (r = t.accuracy < 30 ? 1 : t.accuracy / 10);
                    else {
                        var o = this.infoList.length;
                        if (o >= this.infoTimeLen / 2e3) {
                            var a = void 0
                              , l = void 0
                              , c = void 0
                              , u = void 0
                              , f = void 0;
                            a = l = c = u = f = 0;
                            for (var d = 0; d < this.infoList.length; d++) {
                                var v = this.infoList[d];
                                a += v.accuracy,
                                l += s.LocationUtils.angleDiff(v.gpsHeading, v.compassHeading),
                                c += v.v,
                                d > 0 && (u += Math.abs(v.gpsHeading - this.infoList[d - 1].gpsHeading),
                                f += Math.abs(v.compassHeading - this.infoList[d - 1].compassHeading))
                            }
                            var p = c / o
                              , y = l / o;
                            a / o <= 15 && p < 2.5 && f / (o - 1) <= 17 && (y < 20 && (n *= 1.5),
                            y > 40 && (n /= 1.5)),
                            u / (o - 1) > 20 && p > 2.5 && n > 1 && (n = 1)
                        } else
                            n > 2 && (n = 2);
                        r = t.accuracy / n
                    }
                    return i <= 1.5 && (r += 2),
                    i > 3 && r > 3 && t.accuracy < 30 && (r -= 2),
                    r
                }
            }, {
                key: "updatePosition",
                value: function(t, e, i, n, r, s) {
                    if (t.t = t.timestamp,
                    t.gcjLat && t.gcjLon) {
                        var o = l.gcj_decrypt(t.gcjLat, t.gcjLon)
                          , h = l.mercator_encrypt(o.lat, o.lon);
                        t.x = h.lon,
                        t.y = h.lat
                    }
                    s || this.GpsAdjust(t, n),
                    this.saveInfoList(t, e);
                    var c = r ? r.cMean : 10;
                    return t.c = this.calGeoReliability(t, i, c), 
                    this.position = (0,
                    a.default)(t),
                    t
                }
            }, {
                key: "GpsAdjust", 
                value: function(t, e) {
                    e && e.indexOf("jjxz") >= 0 && e.indexOf("qh") >= 0 ? (t.x += .1 * (12679270 - t.x),
                    t.y += .16 * (2575760 - t.y)) : e && e.indexOf("byjc") >= 0 ? (t.x = (t.x + 1283821.07530271) / 1.10179052,
                    t.y = (t.y + 255901.81298499) / 1.09549352) : this.geoAdjustParams ? (t.x = (t.x - this.geoAdjustParams.bx) / this.geoAdjustParams.ax,
                    t.y = (t.y - this.geoAdjustParams.by) / this.geoAdjustParams.ay) : (t.x += this.geoShift.x,
                    t.y += this.geoShift.y)
                }
            }, {
                key: "GcjAnalysis",
                value: function(t) {
                    if (t.gcjLat && t.gcjLon) {
                        var e = l.gcj_decrypt(t.gcjLat, t.gcjLon)
                          , i = (l.mercator_encrypt(e.lat, e.lon),
                        l.mercator_encrypt(t.gcjLat, t.gcjLon),
                        l.distance(e.lat, e.lon, t.gcjLat, t.gcjLon));
                        this.wgsLat = e.lat,
                        this.wgsLon = e.lon,
                        this.gcjLat = t.gcjLat,
                        this.gcjLon = t.gcjLon;
                        var n = "--- gcj-wgs:" + i.toFixed(1);
                        s.LocationUtils.debugMessage(n)
                    }
                }
            }]),
            t
        }();
        e.GeoLocator = c
    }
    , function(t, e, i) { 
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.MotionDetector = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(23)
          , s = i(2)
          , o = i(0);
        function a(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var h = i(11)
          , l = (function() {
            function t(e) {
                a(this, t),
                this.filterX = new r.filter,
                this.filterY = new r.filter,
                this.filterZ = new r.filter,
                this.MAXPEAK = 8,
                this.MINPEAK = 1,
                e && e.peak && (this.MINPEAK = e.peak[0],
                this.MAXPEAK = e.peak[1]),
                this.maxPeakX = 0,
                this.maxPeakX = 0,
                this.maxPeakZ = 0,
                this.bufferLen = 100,
                this.dataBufferX = new Array(this.bufferLen),
                this.dataBufferY = new Array(this.bufferLen),
                this.dataBufferZ = new Array(this.bufferLen),
                this.index = 0,
                this.crossZeroState = 0,
                this.motionState = 3,
                this.lastTimeStamp = 0,
                this.lastStepTime = 0,
                this.stepCount = 0
            }
            n(t, [{
                key: "detectStep",
                value: function(t, e) {
                    this.dataBufferX[this.index] = this.filterX.filter(e.x),
                    this.dataBufferY[this.index] = this.filterY.filter(e.y),
                    this.dataBufferZ[this.index] = this.filterZ.filter(e.z);
                    var i = this.crossZeroDetect(t);
                    if (this.index = (this.index + 1) % this.bufferLen,
                    i > 0) {
                        this.lastStepTime = t,
                        this.stepCount += i;
                        this.stepCount
                    }
                    return {
                        timestamp: t,
                        stepNum: i
                    }
                }
            }, {
                key: "crossZeroDetect",
                value: function(t) {
                    var e = (this.index - 1 + this.bufferLen) % this.bufferLen;
                    this.dataBufferZ[this.index] > 0 && this.dataBufferZ[e] < 0 && this.crossZeroState++;
                    var i = 0;
                    if (1 === this.crossZeroState)
                        this.maxPeakX = this.maxPeakX < this.dataBufferX[this.index] ? this.dataBufferX[this.index] : this.maxPeakX,
                        this.maxPeakY = this.maxPeakY < this.dataBufferY[this.index] ? this.dataBufferY[this.index] : this.maxPeakY,
                        this.maxPeakZ = this.maxPeakZ < this.dataBufferZ[this.index] ? this.dataBufferZ[this.index] : this.maxPeakZ;
                    else if (2 === this.crossZeroState) {
                        this.crossZeroState = 1;
                        var n = this.maxPeakX + this.maxPeakY + this.maxPeakZ;
                        if (this.maxPeakX = this.maxPeakY = this.maxPeakZ = -5,
                        n > this.MINPEAK && n < this.MAXPEAK && (this.motionState < 1 && (this.motionState = this.motionState + 1),
                        this.motionState >= 1)) {
                            var r = 1e3 / (t - this.lastTimeStamp);
                            this.lastTimeStamp = t,
                            r > 1 && r < 2.2 && (i = 1)
                        }
                    }
                    return i
                }
            }])
        }(),
        function() {
            function t(e) {
                a(this, t),
                this.outDir = e,
                this.stepStr = "",
                this.peakStr = "",
                this.validPeakStr = "",
                this.interpResultStr = ""
            }
            return n(t, [{
                key: "createResultStr",
                value: function(t, e, i, n) {
                    return t + "," + e.toFixed(1) + "," + i.toFixed(1) + "," + n.toFixed(1) + "\n"
                }
            }, {
                key: "saveInterpResult",
                value: function(t, e) {
                    this.interpResultStr += t + "," + e + "\n"
                }
            }, {
                key: "saveStepResult",
                value: function(t, e, i, n) {
                    this.stepStr += this.createResultStr(t, e, i, n)
                }
            }, {
                key: "savePeakResult",
                value: function(t, e, i, n) {
                    this.peakStr += this.createResultStr(t, e, i, n)
                }
            }, {
                key: "saveValidPeakResult",
                value: function(t, e, i, n) {
                    this.validPeakStr += this.createResultStr(t, e, i, n)
                }
            }, {
                key: "save2File",
                value: function(t, e) {
                    h.writeFileSync(this.outDir + "_" + t, e, function(t) {})
                }
            }, {
                key: "saveAll",
                value: function() {
                    this.stepStr && this.save2File("stepResult.csv", this.stepStr),
                    this.peakStr && this.save2File("peakResult.csv", this.peakStr),
                    this.interpResultStr && this.save2File("interpResult.csv", this.interpResultStr)
                }
            }]),
            t
        }())
          , c = function() {
            function t(e) {
                a(this, t),
                e = e || {},
                this.startTime = e.startTime || (new Date).getTime();
                var i = e.outDir;
                this.accFreq = 50,
                this.headingFreq = 50,
                this.stepDector = new u(i),
                this.reset(e),
                this.setParams(e)
            }
            return n(t, [{
                key: "reset",   
                value: function(t) {
                    this.startTime = t && t.startTime ? t.startTime : (new Date).getTime(),
                    this.motionState = o.MOTION_STATE.UNCERTAIN, 
                    this.checkTime = this.startTime, 
                    this.accCompBufferLen = 25,
                    this.accCompBuffer = new Array(this.accCompBufferLen),
                    this.index = 0,
                    this.gravityList = [], 
                    this.gravityTimeLen = 5e3, 
                    this.placementCheckLen = 1500,
                    this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.NORMAL, 
                    this.phonePlacement = o.CONSTANTS.PHONE_PLACEMENT.HOLD,
                    this.headingFreq = null, 
                    this.heading = null, 
                    this.headingList = [], 
                    this.meanNaviHeadingDiff = 0, 
                    this.headingListTimeLen = 3e3, 
                    this.headingDiff = 0, 
                    this.stepsForTurn = [], 
                    this.stepList = [], 
                    this.stepListTime = 4e3, 
                    this.stepFreq = 0, 
                    this.interpolator = new r.interpolator, 
                    this.motionResult = { 
                        t: this.startTime,
                        stepDetected: !1, 
                        step: null, 
                        phonePlacement: this.phonePlacement,
                        motionState: this.motionState, 
                        turnDetected: !1, 
                        turnAngle: 0 
                    }
                }
            }, {
                key: "setParams", 
                value: function(t) {
                    t = t || {},
                    this.stepLen = t.stepLen ? t.stepLen : .7
                }
            }, {
                key: "detectTurn",
                value: function(t) {
                    var e = {
                        turnDetected: !1,
                        turnAngle: 0
                    };
                    if (t.length <= 1)
                        return e;
                    for (var i = t[t.length - 1], n = 0, r = t.length - 2; r >= 0; r--) {
                        var o = s.LocationUtils.angleDiff(i, t[r]);
                        Math.abs(o) > Math.abs(n) && (n = o)
                    }
                    return Math.abs(n) >= 45 && Math.abs(i - t[t.length - 2]) < 15 && (e = {
                        turnDetected: !0,
                        turnAngle: n
                    }),
                    e
                }
            }, {
                key: "detectDrivingTurn", 
                value: function(t) {}
            }, {
                key: "detectMotion", 
                value: function(t, e, i, n) {
                    if (0 === e.x && 0 === e.y && 0 === e.z)
                        return this.motionResult;
                    var r = t - this.startTime >= 5e3
                      , s = Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z)
                      , o = this.accCompBuffer[(this.index - 1 + this.accCompBufferLen) % this.accCompBufferLen];
                    this.saveAccData(t, i, s),
                    r && this.checkPhonePlacement(t);
                    var a = this.stepDector.detectStep(t, s, o)
                      , h = null
                      , l = {
                        turnDetected: !1,
                        turnAngle: 0
                    };
                    if (a) {
                        for (h = {
                            t: t,
                            stepLen: this.stepLen,
                            heading: this.heading
                        },
                        this.stepList.push(h),
                        this.stepsForTurn.push(h); this.stepsForTurn.length > 0 && t - this.stepsForTurn[0].t > 4e3 || this.stepsForTurn.length > 6; )
                            this.stepsForTurn.shift();
                        (l = this.detectTurn(this.stepsForTurn.map(function(t) {
                            return t.heading
                        }))).turnDetected && this.stepsForTurn.length > 2 && (this.stepsForTurn = this.stepsForTurn.slice(this.stepsForTurn.length - 2, this.stepsForTurn.length))
                    }
                    for (; this.stepList.length > 0 && t - this.stepList[0].t > this.stepListTime; )
                        this.stepList.shift();
                    return r && t - this.checkTime >= 500 && (this.checkTime = t,
                    this.motionState = this.checkMotionState(t, this.motionState, this.stepList, this.accCompBuffer)),
                    this.motionResult = Object.assign({
                        t: t,
                        stepDetected: a,
                        step: h,
                        phonePlacement: this.phonePlacement,
                        motionState: this.motionState
                    }, l),
                    this.motionResult
                }
            }, {
                key: "checkMotionState", 
                value: function(t, e, i, n) {
                    var r = e;
                    this.stepFreq = i.length / this.stepListTime * 1e3;
                    var a = s.LocationUtils.standardDeviation(n);
                    return e === o.MOTION_STATE.UNCERTAIN || e === o.MOTION_STATE.STATIC ? this.stepFreq >= 1 && a > 1 && (r = o.MOTION_STATE.WALKING) : e === o.MOTION_STATE.WALKING && this.stepFreq <= .75 && a < .7 && (r = o.MOTION_STATE.STATIC),
                    r
                }
            }, {
                key: "updateHeading", 
                value: function(t, e, i) {
                    this.heading && (this.headingDiff = s.LocationUtils.angleDiff(e - this.headingDiff)),
                    this.heading = e;
                    var n = void 0 !== i && null !== i ? s.LocationUtils.angleDiff(i, e) : 0;
                    for (this.headingList.push({
                        heading: this.heading,
                        t: t,
                        diff2Kf: n
                    }); this.headingList.length > 0 && t - this.headingList[0].t > this.headingListTimeLen; )
                        this.headingList.shift();
                    this.calHeadingSenorFreq(t)
                }
            }, {
                key: "getHeading2Navi", 
                value: function() {
                    return this.headingList.length > 0 ? this.headingList.reduce(function(t, e) {
                        return t + e.diff2Navi
                    }, 0) / this.headingList.length : 0
                }
            }, {
                key: "getHeading2Kf",
                value: function() {
                    return this.headingList.length > 0 ? this.headingList.reduce(function(t, e) {
                        return t + e.diff2Kf
                    }, 0) / this.headingList.length : 0
                }
            }, {
                key: "calHeadingSenorFreq", 
                value: function(t) {
                    t - this.startTime >= this.headingListTimeLen && (this.headingFreq = this.headingList.length / this.headingListTimeLen * 1e3)
                }
            }, {
                key: "checkHasHeading", 
                value: function() {
                    setTimeout(function() {}, 3e3)
                }
            }, {
                key: "getHeadingDiff", 
                value: function() {
                    return this.headingDiff
                }
            }, {
                key: "compareWithNaviDirection",
                value: function(t) {}
            }, {
                key: "compareWithBTHeading",
                value: function() {}
            }, {
                key: "saveAccData", 
                value: function(t, e, i) {
                    if (e) {
                        e.t = t;
                        var n = Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z)
                          , r = Math.sqrt(e.x * e.x + e.y * e.y);
                        for (e.norm = n,
                        e.gxy_norm = r,
                        this.gravityList.push(e); this.gravityList.length > 0 && t - this.gravityList[0].t > this.gravityTimeLen; )
                            this.gravityList.shift();
                        var s = this.gravityList.length;
                        s > 250 && (this.gravityList = this.gravityList.slice(s - 250, s)),
                        this.accCompBuffer[this.index] = i,
                        this.index = (this.index + 1) % this.accCompBufferLen
                    }
                }
            }, {
                key: "checkAccSensorMode", 
                value: function(t) {
                    t - this.startTime < this.gravityTimeLen || (this.gravityList && 0 === this.gravityList.length && (this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.EMPTY),
                    this.accCompBuffer.reduce(function(t, e) {
                        return t + e
                    }, 0) / this.accCompBufferLen > 9 && (this.accFreq = 1e3 * this.gravityList.length / this.gravityTimeLen,
                    this.accFreq < 13 ? this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.LOW_FREQ : this.accFreq >= 22 && (this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.NORMAL)))
                }
            }, {
                key: "checkPhonePlacement",
                value: function(t) {
                    var e = this
                      , i = this.gravityList.filter(function(i) {
                        return i.t >= t - e.placementCheckLen
                    })
                      , n = this.phonePlacement
                      , r = this.phonePlacement;
                    if (i.length > 0) {
                        var a = i.length
                          , h = (i.map(function(t) {
                            return t.y
                        }).reduce(function(t, e) {
                            return t + e
                        }, 0),
                        i.map(function(t) {
                            return t.z
                        }).reduce(function(t, e) {
                            return t + e
                        }, 0) / a);
                        h = Math.abs(h);
                        var l = i.map(function(t) {
                            return t.norm
                        }).reduce(function(t, e) {
                            return t + e
                        }, 0) / a
                          , c = s.LocationUtils.standardDeviation(i.map(function(t) {
                            return t.gxy_norm
                        }));
                        n === o.CONSTANTS.PHONE_PLACEMENT.HOLD ? (h < 5.886 && c > 3 || c > 4) && (r = o.CONSTANTS.PHONE_PLACEMENT.OTHER) : n === o.CONSTANTS.PHONE_PLACEMENT.OTHER && c < 2.5 && l > 8.81 && l < 10.81 && h > 4.4145 && (r = o.CONSTANTS.PHONE_PLACEMENT.HOLD)
                    }
                    this.phonePlacement = r
                }
            }, {
                key: "getAccSensorStatus", 
                value: function() {
                    return this.accSensorStatus
                }
            }, {
                key: "showResultOnScreen",
                value: function(t, e, i) {
                    var n = "--- gzMean" + e.toFixed(1) + " gNormM=" + i.toFixed(1) + " freq=" + this.accFreq.toFixed(1);
                    this.phonePlacement === o.CONSTANTS.PHONE_PLACEMENT.HOLD ? n += " hold" : this.phonePlacement === o.CONSTANTS.PHONE_PLACEMENT.OTHER ? n += " other" : n += " undefined",
                    s.LocationUtils.debugMessage(n)
                }
            }]),
            t
        }()
          , u = function() {
            function t(e) {
                a(this, t),
                this.stepTime = 0,
                this.stepCount = 0,
                e && (this.saver = new l(e)),
                this.reset()
            }
            return n(t, [{
                key: "reset",
                value: function() {
                    this.minPeakTh = 11.1, 
                    this.PeakValleyTh = 2, 
                    this.MinStepInterval = 330, 
                    this.MinPeakInterval = 200,
                    this.PeakIntervalThHigh = 2e3,  
                    this.valleyValue = 100, 
                    this.valleyTime = 0, 
                    this.validValleyValue = 100, 
                    this.peakValleyPair = { 
                        peak: 0,
                        valley: 100,
                        pvDiff: 0
                    },
                    this.peakTime = 0, 
                    this.peakValleyDiffs = [], 
                    this.pvDiffsNum = 4, 
                    this.meanPeriod = .6, 
                    this.isDirectionUp = !1, 
                    this.continueUpCount = 0, 
                    this.continueUpFormerCount = 0 
                }
            }, {
                key: "detectStep", 
                value: function(t, e, i) {
                    var n = !1;
                    return 0 !== this.peakTime && this.peakValleyPair.pvDiff > this.PeakValleyTh && t - this.peakTime > this.MinPeakInterval && this.peakTime - this.stepTime > this.MinStepInterval && (this.stepTime = this.peakTime,
                    this.stepCount += 1,
                    this.saver && this.saver.saveStepResult(this.stepTime, this.peakValleyPair.peak, this.peakValleyPair.valley, this.PeakValleyTh),
                    n = !0),
                    e < this.valleyValue && (this.valleyValue = e,
                    this.valleyTime = t),
                    this.validValleyValue = t - this.lastValleyVTime < 2 * this.MinStepInterval && this.lastValleyVTime > this.stepTime && this.lastValleyValue < this.valleyValue ? this.lastValleyValue : this.valleyValue,
                    0 !== i && 1 === this.detectPeak(t, e, i) && i - this.validValleyValue > 1.3 && (this.saver && this.saver.savePeakResult(t, i, this.validValleyValue, i - this.validValleyValue),
                    t - this.peakTime > this.MinPeakInterval && (this.PeakValleyTh = this.peakValleyThresholdUpdate(i - this.validValleyValue),
                    this.lastValleyValue = this.valleyValue,
                    this.lastValleyVTime = this.valleyTime,
                    this.valleyValue = 100,
                    this.peakTime = t,
                    this.peakValleyPair = {
                        peak: i,
                        valley: this.validValleyValue,
                        pvDiff: i - this.validValleyValue
                    }),
                    t - this.peakTime <= this.MinPeakInterval && i > this.peakValleyPair.peak && (this.peakTime = t,
                    this.validValleyValue = this.validValleyValue < this.peakValleyPair.valley ? this.validValleyValue : this.peakValleyPair.valley,
                    this.peakValleyPair = {
                        peak: i,
                        valley: this.validValleyValue,
                        pvDiff: i - this.validValleyValue
                    })),
                    n
                }
            }, {
                key: "detectPeak", 
                value: function(t, e, i) {
                    var n = this.isDirectionUp
                      , r = 0;
                    return e > i ? (this.isDirectionUp = !0,
                    this.continueUpCount++) : e < i && (this.continueUpFormerCount = this.continueUpCount,
                    this.continueUpCount = 0,
                    this.isDirectionUp = !1),
                    i > this.minPeakTh && !this.isDirectionUp && n && (this.continueUpFormerCount >= 1 || i >= 12) && (r = 1),
                    r
                }
            }, {
                key: "peakValleyThresholdUpdate", 
                value: function(t) {
                    var e = this.PeakValleyTh;
                    return this.peakValleyDiffs.length >= this.pvDiffsNum && this.peakValleyDiffs.shift(),
                    this.peakValleyDiffs.push(t),
                    this.peakValleyDiffs.length === this.pvDiffsNum && (e = this.gradientThreshold(this.peakValleyDiffs)),
                    e
                }
            }, {
                key: "gradientThreshold", 
                value: function(t) {
                    this.PeakValleyTh;
                    var e = t.reduce(function(t, e) {
                        return t + e
                    }, 0) / this.pvDiffsNum;
                    return e >= 8 ? 4.3 : e >= 7 && e < 8 ? 3.3 : e >= 4 && e < 7 ? 2.3 : e >= 3 && e < 4 ? 2 : 1.3
                }
            }, {
                key: "saveResult", 
                value: function() {
                    this.saver && this.saver.saveAll()
                }
            }]),
            t
        }();
        e.MotionDetector = c
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }();
        function r(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var s = function() {
            function t() {
                r(this, t),
                this.lastTime = 0,
                this.last3AxisData = {
                    x: 0,
                    y: 0,
                    z: 0
                },
                this.targetInterval = 20
            }
            return n(t, [{
                key: "linearInterpolate", //线性化
                value: function(t, e) {
                    var i, n, r, s, o, a = [], h = [];
                    if (0 === this.lastTime)
                        this.lastTime = t,
                        this.last3AxisData = e,
                        a.push(t),
                        h.push(e);
                    else if (t - this.lastTime >= this.targetInterval) {
                        for (var l = this.lastTime + this.targetInterval, c = {
                            x: 0,
                            y: 0,
                            z: 0
                        }; l <= t; ) {
                            for (var u in e) {
                                var f = (i = this.lastTime,
                                n = this.last3AxisData[u],
                                r = t,
                                s = e[u],
                                void 0,
                                void 0,
                                [o = (s - n) / (r - i), -o * i + n]);
                                c[u] = f[0] * l + f[1]
                            }
                            a.push(l),
                            h.push(c),
                            l += this.targetInterval
                        }
                        this.lastTime = l - this.targetInterval,
                        this.last3AxisData = c
                    }
                    return {
                        times: a,
                        dataList: h
                    }
                }
            }]),
            t
        }();
        var o = function() {
            function t() {  //初始化系数
                r(this, t),
                this.coeffients = [-.00868331738625167, -.00281935994810742, -.00283620174071117, -.00250768991491832, -.00179790389516092, -.000716919728262325, .0006927111857561, .00234179121345493, .00412333074914049, .00589285272443655, .00749969993475725, .00877894172772015, .00962269149842373, .00994153938983649, .00966378261817836, .00883840100294115, .00751801859529968, .00584526898045774, .00398928778908712, .00215769750280585, .000559210726540666, -.000618216471598856, -.0012317912864319, -.00120368229374989, -.00053389058089984, .000674109911503082, .00223907987608249, .00390195691851279, .00533849097203222, .00621165061009779, .00618366809924862, .00497745464625127, .0023947918507135, -.00163796765800328, -.00705280587105352, -.0136255848960293, -.0209837768438509, -.0286247148948028, -.0359412288773305, -.0422811919993904, -.0469905464323133, -.0494765763884226, -.049266061331278, -.0460508167884474, -.039736000885158, -.0304505930567507, -.0185625196346448, -.00465529784529705, .0105010765137949, .0260079086781106, .0409005746542444, .0542171334675495, .0650808900149999, .0727608365147878, .0767374483224153, .0767374483224153, .0727608365147878, .0650808900149999, .0542171334675495, .0409005746542444, .0260079086781106, .0105010765137949, -.00465529784529705, -.0185625196346448, -.0304505930567507, -.039736000885158, -.0460508167884474, -.049266061331278, -.0494765763884226, -.0469905464323133, -.0422811919993904, -.0359412288773305, -.0286247148948028, -.0209837768438509, -.0136255848960293, -.00705280587105352, -.00163796765800328, .0023947918507135, .00497745464625127, .00618366809924862, .00621165061009779, .00533849097203222, .00390195691851279, .00223907987608249, .000674109911503082, -.00053389058089984, -.00120368229374989, -.0012317912864319, -.000618216471598856, .000559210726540666, .00215769750280585, .00398928778908712, .00584526898045774, .00751801859529968, .00883840100294115, .00966378261817836, .00994153938983649, .00962269149842373, .00877894172772015, .00749969993475725, .00589285272443655, .00412333074914049, .00234179121345493, .0006927111857561, -.000716919728262325, -.00179790389516092, -.00250768991491832, -.00283620174071117, -.00281935994810742, -.00868331738625167],
                this.filterLen = this.coeffients.length,
                this.buffer = new Array(this.filterLen),
                this.index = 0
            }
            return n(t, [{
                key: "filter",
                value: function(t) {
                    this.buffer[this.index] = t,
                    this.index = (this.index + 1) % this.filterLen;
                    for (var e = 0, i = 0; i < this.filterLen; i++)
                        e += this.buffer[(this.index + i) % this.filterLen] * this.coeffients[i];
                    return e
                }
            }]),
            t
        }();
        e.filter = o,
        e.interpolator = s,
        e.getPearsonCorrCoef = function(t, e) { //皮尔逊校正系数
            var i = 0;
            i = t.length === e.length ? t.length : t.length > e.length ? e.length : t.length;
            for (var n = 0, r = 0, s = 0, o = 0, a = 0, h = 0; h < i; h++)
                n += t[h],
                r += e[h],
                s += t[h] * e[h],
                o += t[h] * t[h],
                a += e[h] * e[h];
            var l = i * o - n * n
              , c = i * a - r * r;
            return (i * s - n * r) / Math.sqrt(l * c)
        }
    }
    , function(t, e, i) { //区域信息
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.AreaChecker = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, //枚举值
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(2)
          , s = i(0)
          , o = i(1);
        var a = function() {  //初始化区域参数
            function t(e) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e = e || {},
                this.buildingInfos = {},
                this.wholeLocArea = {
                    area: null,
                    buildingCode: null
                },
                this.indoorAreas = [],
                this.outsideAreas = [],
                this.setParams(e),
                this.reset()
            }
            return n(t, [{
                key: "reset",  //区域 -重载 建筑编码信息
                value: function() {
                    this.res = {
                        buildingCode: this.wholeLocArea.buildingCode
                    }
                }
            }, {
                key: "setParams",
                value: function(t) {
                    t || (t = {})
                }
            }, {
                key: "loadIndoorAreas", //加载室内区域
                value: function(t) {
                    t && (this.indoorAreas = this.indoorAreas.concat(t))
                }
            }, {
                key: "loadOutsideAreas", //加载室外区域
                value: function(t) {
                    t && (this.outsideAreas = this.outsideAreas.concat(t))
                }
            }, {
                key: "checkArea", //判断区域
                value: function(t, e) {
                    var i = this.checkLocArea(t, e);
                    return r.LocationUtils.checkInRegion(this.wholeLocArea.bufferArea, t) ? this.res : (this.res = i,
                    i)
                }
            }, {
                key: "checkLocArea", //检查Loc区域
                value: function(t, e) {
                    var i = this.wholeLocArea.buildingCode
                      , n = s.LOC_AREA_STATUS.UNSET;
                    if (!this.wholeLocArea.buildingCode) {
                        if (1 !== Object.keys(this.buildingInfos).length)
                            return Object.keys(this.buildingInfos).length,
                            {
                                isIndoor: !0,
                                buildingCode: void 0,
                                isBuilding: !0,
                                locStatus: s.LOC_AREA_STATUS.UNSET
                            };
                        this.wholeLocArea.buildingCode = Object.keys(this.buildingInfos)[0],
                        this.wholeLocArea.area = this.buildingInfos[Object.keys(this.buildingInfos)[0]].area,
                        i = this.wholeLocArea.buildingCode
                    }
                    if (this.wholeLocArea.area)
                        if (r.LocationUtils.checkInRegion(this.wholeLocArea.area, t)) {
                            if (0 === Object.keys(this.buildingInfos).length && this.buildingInfos.constructor === Object)
                                n = s.LOC_AREA_STATUS.BUILDING;
                            else
                                for (var o in n = s.LOC_AREA_STATUS.OUT_BUILDING,
                                this.buildingInfos)
                                    if (r.LocationUtils.checkInRegion(this.buildingInfos[o].area, t, e)) {
                                        n = s.LOC_AREA_STATUS.BUILDING,
                                        i = o;
                                        break
                                    }
                        } else
                            n = s.LOC_AREA_STATUS.OUT_BUILDING,
                            t.z = e,
                            this.wholeLocArea && this.checkExceedLocationArea(t, this.wholeLocArea.area) && (n = s.LOC_AREA_STATUS.EXCEED);
                    else
                        n = s.LOC_AREA_STATUS.UNSET;
                    var a = n === s.LOC_AREA_STATUS.UNSET || n === s.LOC_AREA_STATUS.BUILDING;
                    return {
                        isIndoor: this.getIndoorStatus(t, e, i, a),
                        buildingCode: i,
                        isBuilding: a,
                        locStatus: n
                    }
                }
            }, {
                key: "checkExceedLocationArea", //检查并超出该区域的位置
                value: function(t, e) {
                    var i = Number.MAX_VALUE;
                    return e.forEach(function(e) {
                        var n = o.Geometric.projectPoint2PolygonEdge(t, e.polygon)[0];
                        n < i && (i = n)
                    }),
                    i > 20
                }
            }, {
                key: "getIndoorStatus", //获取室内状态
                value: function(t, e, i, n) {
                    if (t) {
                        if (r.LocationUtils.checkInRegion(this.indoorAreas, t, e))
                            return !0;
                        if (r.LocationUtils.checkInRegion(this.outsideAreas, t, e))
                            return !1
                    }
                    var s = n;
                    return n && this.buildingInfos[i] && this.buildingInfos[i].isOpenArea && (s = !1),
                    s
                }
            }, {
                key: "loadBuildingArea",  //加载区域
                value: function(t, e, i, n, r) {
                    i ? (void 0 === n && (n = !1),
                    this.buildingInfos[t] = {
                        area: e,
                        isOpenArea: n,
                        bufferArea: r
                    }) : this.wholeLocArea.buildingCode || (this.wholeLocArea = {
                        buildingCode: t,
                        area: e,
                        bufferArea: r
                    })
                }
            }]),
            t
        }();
        e.AreaChecker = a
    }
    , function(t, e, i) { //路网信息
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.RoadNetData = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(16);
        var s = function() {
            function t(e) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e = e || {},
                this.wlkRoadNet = null,
                this.drvRoadNet = null
            }
            return n(t, [{
                key: "reset",
                value: function() {}
            }, {
                key: "loadRoadInfo",  //加载路网信息
                value: function(t) {
                    t.walkingHmmInfo && t.walkingHmmInfo.roads && (this.wlkRoadNet = this.buildHmmInfo(t.walkingHmmInfo)),
                    t.drivingHmmInfo && t.drivingHmmInfo.roads && (this.drvRoadNet = this.buildHmmInfo(t.drivingHmmInfo))
                }
            }, {
                key: "buildHmmInfo", //绑定 -顶点 、路、最短距离、跨层道路
                value: function(t) {
                    var e = r.RoadDataProcessor.buildVertices(t.connection); 
                    return {
                        vertices: e,
                        roads: r.RoadDataProcessor.buildHmmRoads(t.roads),
                        shortestDists: r.RoadDataProcessor.buildShortestDist(t.roads),
                        transFloorRoads: this.getTransFloorRoads(e)
                    }
                }
            }, {
                key: "getTransFloorRoads",
                value: function(t) {
                    for (var e = [], i = function(i) {
                        var n = t[i];
                        n && void 0 !== n.type && n.ne.forEach(function(r) {
                            t[r].z !== n.z && (e[n.z] || (e[n.z] = []),
                            e[n.z].push([i, r]))
                        })
                    }, n = 0; n < t.length; n++)
                        i(n);
                    return e
                }
            }]),
            t
        }();
        e.RoadNetData = s
    }
    , function(t, e, i) {  //Z检查器
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.ZChecker = void 0;
        var n, r = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(), s = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), o = i(0), a = i(1), h = i(2), l = i(8), c = i(3), u = (n = c) && n.__esModule ? n : {
            default: n
        };
        var f = function() { 
            function t(e) { //初始化
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e = e || {},
                this.roadNetData = {},  //路网数据
                this.posMode = o.POSITION_MODE.WALKING,
                this.pos2transLineTh = 7,
                this.bt2Trans2pointTh = 6,
                this.zWeightTh = .5,
                this.geoZAreas = [],
                this.zAreas = [],
                this.id2Points = [],
                this.roads = [],
                this.transFloorRoads = [],
                this.shortestDists = [],
                this.setParams(e),
                this.reset()
            }
            return s(t, [{
                key: "reset",
                value: function() {
                    this.lastZChangeTime = 0,
                    this.inTrsFloorRegion = !1,
                    this.geoAreaId = void 0,
                    this.geoAreaCnt = 0,
                    this.z = void 0
                }
            }, {
                key: "setParams",
                value: function(t) {
                    t || (t = {}),
                    this.wlkPos2transLineTh = t.wlkPos2transLineTh ? t.wlkPos2transLineTh : 7,
                    this.wlkBt2Trans2pointTh = t.wlkBt2Trans2pointTh ? t.wlkBt2Trans2pointTh : 6,
                    this.drvPos2transLineTh = t.drvPos2transLineTh ? t.drvPos2transLineTh : 20,
                    this.drvBt2Trans2pointTh = t.drvBt2Trans2pointTh ? t.drvBt2Trans2pointTh : 20,
                    this.wlkZWeightTh = t.wlkZWeightTh ? t.wlkZWeightTh : .5,
                    this.drvZWeightTh = t.drvZWeightTh ? t.drvZWeightTh : .5,
                    this.paramsFresh()
                }
            }, {
                key: "paramsFresh",
                value: function() {
                    this.posMode === o.POSITION_MODE.WALKING ? (this.pos2transLineTh = this.wlkPos2transLineTh,
                    this.bt2Trans2pointTh = this.wlkBt2Trans2pointTh,
                    this.zWeightTh = this.wlkZWeightTh) : (this.pos2transLineTh = this.drvPos2transLineTh,
                    this.bt2Trans2pointTh = this.drvBt2Trans2pointTh,
                    this.zWeightTh = this.drvZWeightTh)
                }
            }, {
                key: "loadZAreas",
                value: function(t, e) {
                    e && (e.forEach(function(e) {
                        e.buidingCode = t,
                        void 0 === e.z && (e.z = 0)
                    }),
                    this.zAreas = this.zAreas.concat(e))
                }
            }, {
                key: "addGeoZAreas",
                value: function(t) {
                    t && (t.forEach(function(t) {
                        void 0 === t.z && (t.z = 0)
                    }),
                    this.geoZAreas = this.geoZAreas.concat(t))
                }
            }, {
                key: "setParams2posMode",
                value: function(t) {
                    this.posMode = void 0 !== t ? t : o.POSITION_MODE.WALKING;
                    var e = t === o.POSITION_MODE.WALKING ? this.roadNetData.wlkRoadNet : this.roadNetData.drvRoadNet;
                    e && (this.id2Points = e.vertices,
                    this.roads = e.roads,
                    this.transFloorRoads = e.transFloorRoads,
                    this.shortestDists = e.shortestDists),
                    this.paramsFresh()
                }
            }, {
                key: "setRoadNet",
                value: function(t) {
                    this.roadNetData = t
                }
            }, {
                key: "calShortestRouteDistance",
                value: function(t, e) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                      , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 2;
                    if (t.z !== e.z)
                        return -1;
                    var r = []
                      , s = []
                      , o = void 0
                      , h = void 0;
                    for (var c in this.roads[t.z]) {
                        var u = a.Geometric.projectPoint2Road(t, this.roads[t.z][c], this.id2Points)[0]
                          , f = a.Geometric.projectPoint2Road(e, this.roads[e.z][c], this.id2Points)[0];
                        u < i && r.push(c),
                        f < n && s.push(c)
                    }
                    var d = Number.MAX_VALUE
                      , v = !0
                      , p = !1
                      , y = void 0;
                    try {
                        for (var m, g = r[Symbol.iterator](); !(v = (m = g.next()).done); v = !0) {
                            o = m.value;
                            var P = !0
                              , T = !1
                              , b = void 0;
                            try {
                                for (var x, k = s[Symbol.iterator](); !(P = (x = k.next()).done); P = !0) {
                                    h = x.value;
                                    var M = l.HMM.routeDistance(t, o, e, h, this.roads, this.id2Points, this.shortestDists)[0];
                                    M < d && (d = M)
                                }
                            } catch (t) {
                                T = !0,
                                b = t
                            } finally {
                                try {
                                    !P && k.return && k.return()
                                } finally {
                                    if (T)
                                        throw b
                                }
                            }
                        }
                    } catch (t) {
                        p = !0,
                        y = t
                    } finally {
                        try {
                            !v && g.return && g.return()
                        } finally {
                            if (p)
                                throw y
                        }
                    }
                    return d
                }
            }, {
                key: "getTransType",
                value: function(t) {
                    if (t.type) {
                        if (1 !== t.type.length)
                            return "compound floor transition";
                        switch (t.type[0]) {
                        case 1024:
                            return "escalator";
                        case 3:
                            return "lift";
                        case 6:
                            return "stairs"
                        }
                    }
                }
            }, {
                key: "checkZByBt",
                value: function(t, e, i, n, s, l) {
                    if (e && i && !(l > 0 && void 0 === this.z && i.m < -80)) {
                        var c = this.z;
                        if (e.z = this.z,
                        void 0 === this.z || n === this.z)
                            c = n;
                        else if (s > 1)
                            this.transFloorRoads[n] && (c = n);
                        else if (s > this.zWeightTh)
                            if (this.transFloorRoads && this.transFloorRoads[this.z]) {
                                if (t - this.lastZChangeTime >= 4e3)
                                    for (var f = 0; f < this.transFloorRoads[this.z].length; f++) {
                                        var d = r(this.transFloorRoads[this.z][f], 2)
                                          , v = d[0]
                                          , p = d[1]
                                          , y = this.id2Points[v]
                                          , m = this.id2Points[p];
                                        if (h.LocationUtils.distance(m, i) < this.bt2Trans2pointTh) {
                                            var g = void 0
                                              , P = void 0;
                                            if (n <= -1e4) {
                                                this.inTrsFloorRegion = !0;
                                                break
                                            }
                                            if (y.type[0] === o.TRANS_FLOOR_TYPE.LIFT) {
                                                var T = (0,
                                                u.default)(m);
                                                T.z = n,
                                                g = this.calShortestRouteDistance(T, i)
                                            } else
                                                m.z === n && (g = this.posMode === o.POSITION_MODE.DRIVING ? a.Geometric.euclideanDistance(m, i) : this.calShortestRouteDistance(m, i));
                                            if (P = a.Geometric.projectPoint2Segment(e, y, m)[0],
                                            this.inTrsFloorRegion || g >= 0 && g < this.bt2Trans2pointTh && P < this.pos2transLineTh) {
                                                this.getTransType(y);
                                                c = n;
                                                break
                                            }
                                        }
                                    }
                            } else
                                c = n;
                        return n > -1e4 && (this.inTrsFloorRegion = !1),
                        c
                    }
                }
            }, {
                key: "getAreaZ",
                value: function(t, e, i) {
                    var n = void 0
                      , r = void 0;
                    return i && e && (r = h.LocationUtils.checkInWhichRegion(i, e)) > -1 && (n = i[r].z),
                    [n, r]
                }
            }, {
                key: "checkZByArea",
                value: function(t, e) {
                    var i = void 0;
                    if (void 0 === this.z) {
                        var n = this.getAreaZ(t, e, this.geoZAreas)[1];
                        void 0 === n || -1 === n || void 0 !== this.geoAreaId && n !== this.geoAreaId ? this.geoAreaCnt = 0 : (this.geoAreaId = n,
                        this.geoAreaCnt += 1),
                        this.geoAreaCnt >= 3 && (i = this.geoZAreas[n].z)
                    } else
                        this.geoAreaId = void 0,
                        this.geoAreaCnt = 0;
                    return void 0 === i && (i = this.getAreaZ(t, e, this.zAreas)[0]),
                    i
                }
            }, {
                key: "checkZ",
                value: function(t, e, i, n, r, s, o, a, h) {
                    var l = this.checkZByArea(t, e, i)
                      , c = void 0;
                    if ((void 0 === this.z && i && i.s && 0 !== n && r <= .6 || o && !a && n > 0 && o.c < 7) && (i = null),
                    r > 1 && e && i && n > -1e4)
                        c = n;
                    else if (null !== l && void 0 !== l)
                        c = l;
                    else {
                        var u = this.checkZByBt(t, e, i, n, r, h);
                        void 0 !== u && u > -1e4 && (c = u)
                    }
                    return void 0 !== c && null !== c && this.z !== c && (this.z = c,
                    this.lastZChangeTime = t),
                    this.z
                }
            }]),
            t
        }();
        e.ZChecker = f
    }
    , function(t, e, i) { //导航处理器
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.NavigationProcessor = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(7)
          , s = i(0)
          , o = i(2)
          , a = i(1)
          , h = i(28)
          , l = i(0)
          , c = i(4)
          , u = i(9);
        var f = 0
          , d = 1
          , v = 2
          , p = 3
          , y = function() {
            function t(e) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                e || (e = {}),
                this.z = void 0,
                this.indoor = !0,
                this.pathMatcher = new h.PathMapping,
                this.navKf = new u.KalmanFilterPDR(0,l.KF_TYPE.PDR_NAV,e.deviceType,e.params),
                this.ARInitPos = null,
                this.setParams(e),
                this.reset()
            }
            return n(t, [{
                key: "setParams",
                value: function(t) {
                    t = t || {},
                    this.devNavDistWlkInoor = t.devNavDistWlkInoor || 8,
                    this.devNavDistWlkOut = t.devNavDistWlkOut || 20,
                    this.devNavDistDrvIndoor = t.devNavDistDrvIndoor || 12,
                    this.devNavBtDistDrvIndoor = t.devNavBtDistDrvIndoor || 8,
                    this.devNavDistDrvOut = t.devNavDistDrvOut || 40,
                    this.slopeRegion = t.slopeRegion
                }
            }, {
                key: "reset",
                value: function(t) {
                    this.navKf.reset(),
                    this.path = t,
                    this.navPos = void 0,
                    this.accordLevel = s.ACCORD_LEVEL.UNCERTAIN,
                    this.pathHeading = null,
                    this.distNearTurn = 0,
                    this.point2Turn = null,
                    this.passedTurnIndex = [0],
                    this.bt2PathList = [],
                    this.geo2pathList = [],
                    this.base2PathList = [],
                    this.nav2baseList = [],
                    this.cHead2pathList = [],
                    this.kfHead2PathList = [],
                    this.timeLen = 6e3
                }
            }, {
                key: "setPath",
                value: function(t, e, i) {
                    this.reset(),
                    this.startTime = e ? t : null,
                    this.path = e,
                    this.transFloorPoints = this.getTransFloorPoints(e),
                    this.transFloorType = s.TRANS_FLOOR_TYPE.NULL,
                    this.transFloorPoint = {
                        placement: f
                    }
                }
            }, {
                key: "turnMatch",
                value: function(t, e) {
                    var i = null;
                    if (t && e && this.point2Turn) {
                        var n = o.LocationUtils.distance(t, this.point2Turn)
                          , r = Math.abs(o.LocationUtils.angleDiff(e, -1 * this.point2Turn.msg.theta));
                        if (r / Math.abs(this.point2Turn.msg.theta) < .45 && n < 6) {
                            var s = this.point2Turn.dir;
                            i = {
                                x: this.point2Turn.x,
                                y: this.point2Turn.y,
                                heading: s
                            },
                            this.passedTurnIndex.push(this.point2Turn.index),
                            this.point2Turn = null
                        }
                    }
                    return i
                }
            }, {
                key: "checkTransFloorPlacement",
                value: function(t, e, i) {
                    for (var n = f, r = 12, h = {}, l = 0; l < this.transFloorPoints.length; l++) {
                        var c = this.transFloorPoints[l];
                        if (e === c.z) {
                            if (0 === c.index)
                                return c.placement = p,
                                c;
                            if (this.path[c.index - 1].z !== this.path[c.index].z && a.Geometric.euclideanDistance(t, c) < 12)
                                return c.placement = p,
                                c;
                            var u = a.Geometric.projectPoint2Segment(t, c, this.path[c.index + 1]);
                            if (u[0] < r && (r = u[0],
                            h = c),
                            u[0] <= 8) {
                                n = d;
                                var y = a.Geometric.projectPoint2Segment(t, this.path[c.index - 1], c)
                                  , m = a.Geometric.vectorDirDeg(this.path[c.index - 1], c)
                                  , g = 45;
                                if (c.transType === s.TRANS_FLOOR_TYPE.STAIRS && (g = 60),
                                y[0] < 4 && Math.abs(o.LocationUtils.angleDiff(i, m)) < g) {
                                    if (1 === y[2])
                                        return c.placement = v,
                                        c;
                                    if (2 === y[2])
                                        return c.placement = p,
                                        c
                                }
                            }
                        }
                    }
                    return h.placement = n,
                    h
                }
            }, {
                key: "getTransFloorPoints",
                value: function(t) {
                    if (!t)
                        return [];
                    var e = [];
                    t[0].index = 0;
                    for (var i = 1; i < t.length; i++)
                        t[i].index = i,
                        t[i].z !== t[i - 1].z && ("stairs" === t[i - 1].type || "stairs" === t[i].type ? t[i - 1].transType = s.TRANS_FLOOR_TYPE.STAIRS : "lift" === t[i - 1].type || "lift" === t[i].type ? t[i - 1].transType = s.TRANS_FLOOR_TYPE.LIFT : "escalator" !== t[i - 1].type && "escalator" !== t[i].type || (t[i - 1].transType = s.TRANS_FLOOR_TYPE.ELEVATOR),
                        e.push(t[i - 1]));
                    return e
                }
            }, {
                key: "updateNavigation",
                value: function(t, e, i, n, r, o, a, h, u, f, d, v, p, y, m, g) {
                    if (this.path) {
                        var P = !1;
                        void 0 !== this.z && this.z !== e && (this.reset(this.path),
                        P = !0),
                        this.z = e;
                        var T = this.updateNavBaseDistList(t, this.navPos, m.pos);
                        if (u === l.POSITION_MODE.WALKING && g === s.CONSTANTS.FUSION_MODEL.PDR ? this.updateWlkNavKf(t, i, r, o, a, h, v, d, y, T) : g === s.CONSTANTS.FUSION_MODEL.DIFF && this.updateDiffNavPos(t, i),
                        this.navPos) {
                            var b = void 0
                              , x = this.pathMatcher.pathMatchingInRealTime(this.path, this.navPos, e, u, f, m)
                              , k = this.updateSig2PathDistList(t, this.bt2PathList, o, e, P)
                              , M = this.updateSig2PathDistList(t, this.base2PathList, m.pos, e, P)
                              , S = this.updateHead2PathList(t, this.cHead2pathList, c.Numerical.rad2deg(h))
                              , O = this.updateHead2PathList(t, this.kfHead2PathList, m.head);
                            this.checkNavAccordance(t, u, f, d, i, n, k, M, S, O, m.mSpeed),
                            x.mapPoint && (this.updateNavStateInfo(this.navPos, x.mapKey, x.mapPoint),
                            b = this.calBetweenNavPointInfo(x.mapPoint, this.path, x.mapKey));
                            var _ = o ? o.c : void 0
                              , D = o ? o.zWeights : void 0;
                            return this.checkTransFloorState(this.navPos, this.z, p, c.Numerical.rad2deg(h), _, D, r),
                            {
                                mapPoint: x.mapPoint,
                                mapKey: x.mapKey,
                                dist2Path: x.dist2path,
                                navPos: this.navPos,
                                accordLevel: this.accordLevel,
                                transFloorType: this.transFloorType,
                                transFloorPoint: this.transFloorPoint,
                                pathHeading: this.pathHeading,
                                betweenNavPointInfo: b
                            }
                        }
                    }
                }
            }, {
                key: "calBetweenNavPointInfo",
                value: function(t, e, i) {
                    var n = [];
                    if (0 === i) {
                        var r = a.Geometric.euclideanDistance(t, e[i]);
                        n.push({
                            navPointIndex: i,
                            dis: r
                        })
                    } else {
                        var s = a.Geometric.euclideanDistance(t, e[i - 1])
                          , o = a.Geometric.euclideanDistance(t, e[i]);
                        n.push({
                            navPointIndex: i - 1,
                            dis: s
                        }),
                        n.push({
                            navPointIndex: i,
                            dis: o
                        })
                    }
                    return n
                }
            }, {
                key: "updateWlkNavKf",
                value: function(t, e, i, n, r, a, h, l, u, f) {
                    var d = a;
                    this.accordLevel >= s.ACCORD_LEVEL.GOOD && void 0 !== this.pathHeading && Math.abs(o.LocationUtils.angleDiff(c.Numerical.rad2deg(a), this.pathHeading)) < 45 && (d = c.Numerical.deg2rad(this.pathHeading));
                    var v = this.turnMatch(this.navPos, u);
                    v && (d = c.Numerical.deg2rad(v.heading),
                    this.navKf.setState({
                        x: v.x,
                        y: v.y,
                        c: .001,
                        t: t
                    }),
                    this.pathMatcher.reset());
                    var p = h < s.CONSTANTS.ACC_SENSOR_STATUS.NORMAL ? 36 : 121;
                    this.navKf.setBtObrVar(p);
                    var y = this.checkInSlope(this.navPos) ? .4 : .7;
                    if (!this.navPos && this.ARInitPos) {
                        var m = this.isARInit(this.ARInitPos, e);
                        this.navKf.update(t, m, null, d, y, 0, 1, l)
                    } else
                        this.navKf.update(t, n, r, d, y, i, 1, l);
                    var g = this.navKf.getPosition();
                    g && (this.navPos = g)
                }
            }, {
                key: "updateDiffNavPos",
                value: function(t, e) {
                    this.navPos = e
                }
            }, {
                key: "updateNavStateInfo",
                value: function(t, e, i) {
                    e && this.path[e].z === this.path[e - 1].z ? (this.pathHeading = a.Geometric.vectorDirDeg(this.path[e - 1], this.path[e]),
                    this.distNearTurn = this.calDistNearTurn(t, this.path[e - 1], this.path[e]),
                    this.point2Turn = this.getPoint2Turn(t, this.path[e - 1], this.path[e])) : (this.distNearTurn = 0,
                    this.point2Turn = void 0,
                    this.pathHeading = void 0)
                }
            }, {
                key: "checkInSlope",
                value: function(t) {
                    return !!t && !(!o.LocationUtils.checkInRegion(this.slopeRegion, t, this.z) && this.transFloorType === s.TRANS_FLOOR_TYPE.NULL)
                }
            }, {
                key: "calDistNearTurn",
                value: function(t, e, i) {
                    var n = e.msg ? o.LocationUtils.distance(t, e) : 1e4
                      , r = i ? o.LocationUtils.distance(t, i) : 1e4;
                    return n < r ? n : r
                }
            }, {
                key: "getPoint2Turn",
                value: function(t, e, i) {
                    var n = null;
                    return o.LocationUtils.distance(t, e) < o.LocationUtils.distance(t, i) ? e.msg && e.msg.theta && !this.passedTurnIndex.includes(e.index) ? n = e : i.msg && i.msg.theta && (n = i) : i.msg && i.msg.theta && !this.passedTurnIndex.includes(i.index) && (n = i),
                    n
                }
            }, {
                key: "updateSig2PathDistList",
                value: function(t, e, i, n, r) {
                    if (this.path && i && (0 === e.length || e[e.length - 1].t !== t)) {
                        var s = a.Geometric.projectPoint2Path(i, n, this.path, "z")[0];
                        e.push({
                            t: t,
                            dist: s
                        })
                    }
                    return (e.length > 0 && t - e[0].t > this.timeLen || r) && e.shift(),
                    this.calMeanDist(e)
                }
            }, {
                key: "updateNavBaseDistList",
                value: function(t, e, i) {
                    if (e && i && (0 === this.nav2baseList.length || this.nav2baseList[this.nav2baseList.length - 1].t !== t)) {
                        var n = a.Geometric.euclideanDistance(e, i);
                        this.nav2baseList.push({
                            t: t,
                            dist: n
                        })
                    }
                    for (; this.nav2baseList.length > 0 && t - this.nav2baseList[0].t > this.timeLen; )
                        this.nav2baseList.shift();
                    return this.calMeanDist(this.nav2baseList)
                }
            }, {
                key: "calMeanDist",
                value: function(t) {
                    return t.length > 0 ? t.reduce(function(t, e) {
                        return t + e.dist
                    }, 0) / t.length : 0
                }
            }, {
                key: "updateHead2PathList",
                value: function(t, e, i) {
                    if ((0 === this.pathHeading || this.pathHeading) && (0 === i || i)) {
                        var n = a.Geometric.angleDiffDeg(this.pathHeading, i);
                        e.push({
                            t: t,
                            diff: n
                        })
                    }
                    for (; e.length > 0 && t - e[0].t > this.timeLen; )
                        e.shift();
                    return e.length > 0 ? e.reduce(function(t, e) {
                        return t + e.diff
                    }, 0) / e.length : 0
                }
            }, {
                key: "checkNavAccordance",
                value: function(t, e, i, n, r, o, h, c, u, f, d) {
                    if (!this.startTime || t - this.startTime < 6e3 || this.transFloorType !== s.TRANS_FLOOR_TYPE.NULL && e === l.POSITION_MODE.WALKING)
                        this.accordLevel = s.ACCORD_LEVEL.UNCERTAIN;
                    else if (e === l.POSITION_MODE.WALKING) {
                        var v = a.Geometric.projectPoint2Path(this.navPos, this.z, this.path, "z")[0]
                          , p = s.ACCORD_LEVEL.UNCERTAIN
                          , y = n && (v > this.devNavDistWlkInoor || c > this.devNavDistWlkInoor)
                          , m = !n && v > this.devNavDistWlkOut;
                        y || m ? p = s.ACCORD_LEVEL.DEVIATED : h < 5 && c < 4 ? (p = s.ACCORD_LEVEL.GOOD,
                        (d > .8 && f < 30 || u < 20) && (p = s.ACCORD_LEVEL.FINE)) : p = s.ACCORD_LEVEL.UNCERTAIN,
                        this.accordLevel = p
                    } else {
                        var g = a.Geometric.projectPoint2Path(o, this.z, this.path, "z")[0];
                        if (i === s.CONSTANTS.DRIVING_MODE.INDOOR) {
                            var P = g > this.devNavDistDrvIndoor;
                            n && this.devNavBtDistDrvIndoor;
                            !1,
                            this.accordLevel = P ? s.ACCORD_LEVEL.DEVIATED : s.ACCORD_LEVEL.UNCERTAIN
                        } else
                            g > this.devNavDistDrvOut ? this.accordLevel = s.ACCORD_LEVEL.DEVIATED : this.accordLevel = s.ACCORD_LEVEL.UNCERTAIN
                    }
                }
            }, {
                key: "checkHeading",
                value: function(t, e, i, n, r, o, a, h, l) {
                    var c = s.CONSTANTS.HEADSTATUS.NORMAL;
                    return this.distNearTurn > 5 && t === s.ACCORD_LEVEL.FINE && ((a < 2.5 && Math.abs(h) > 40 && i > 6 || i > 12) && (c = s.CONSTANTS.HEADSTATUS.DRIFT),
                    Math.abs(h) < 20 && Math.abs(e - this.pathHeading) < 20 && i < 4 && (c = s.CONSTANTS.HEADSTATUS.NORMAL)),
                    c
                }
            }, {
                key: "checkTransFloorState",
                value: function(t, e, i, n, o, h, l) {
                    if (this.transFloorType === s.TRANS_FLOOR_TYPE.NULL)
                        this.transFloorPoint.placement === f ? this.transFloorType = s.TRANS_FLOOR_TYPE.NULL : this.transFloorPoint.transType === s.TRANS_FLOOR_TYPE.STAIRS ? (this.transFloorPoint.placement === p || h && h[r.HEIGHT.STAIRS] >= .6) && (this.transFloorType = s.TRANS_FLOOR_TYPE.STAIRS) : this.transFloorPoint.transType === s.TRANS_FLOOR_TYPE.LIFT ? (h && h[r.HEIGHT.LIFTS] >= .7 && (this.transFloorType = s.TRANS_FLOOR_TYPE.LIFT),
                        this.transFloorPoint.placement === p && (this.transFloorType = s.TRANS_FLOOR_TYPE.LIFT),
                        this.transFloorPoint.placement === v && i === s.MOTION_STATE.STATIC && (this.transFloorType = s.TRANS_FLOOR_TYPE.LIFT)) : this.transFloorPoint.transType === s.TRANS_FLOOR_TYPE.ELEVATOR && (this.transFloorPoint.placement === p && (this.transFloorType = s.TRANS_FLOOR_TYPE.ELEVATOR),
                        this.transFloorPoint.placement === v && i === s.MOTION_STATE.STATIC && (this.transFloorType = s.TRANS_FLOOR_TYPE.ELEVATOR));
                    else {
                        if (void 0 === this.transFloorPoint.index)
                            return;
                        if (e === this.getNextZ(e)) {
                            if (this.transFloorType === s.TRANS_FLOOR_TYPE.ELEVATOR && !l)
                                return void (this.transFloorPoint = this.getNextPoint(e));
                            this.transFloorType = s.TRANS_FLOOR_TYPE.NULL
                        } else if (i === s.MOTION_STATE.WALKING && h && h[e] > .7) {
                            var c = a.Geometric.projectPoint2Segment(t, this.transFloorPoint, this.path[this.transFloorPoint.index + 1])[0];
                            (c > 8 && o <= 1 || c > 12 && o < 4.5) && (this.transFloorType = s.TRANS_FLOOR_TYPE.NULL)
                        }
                    }
                    var u = this.checkTransFloorPlacement(t, e, n);
                    void 0 !== u.index ? this.transFloorPoint = u : this.transFloorPoint.placement = f
                }
            }, {
                key: "getNextZ",
                value: function(t) {
                    for (var e = this.transFloorPoint.index + 1; e < this.path.length - 1; e++) {
                        if (!this.path[e + 1])
                            return this.path[e].z;
                        if (t === this.path[e].z && this.path[e].z === this.path[e + 1].z)
                            return this.path[e].z
                    }
                }
            }, {
                key: "getNextPoint",
                value: function(t) {
                    for (var e = 0; e < this.path.length - 1; e++)
                        if (t === this.path[e].z)
                            return this.path[e]
                }
            }, {
                key: "setARInitPos",
                value: function(t) {
                    this.ARInitPos = t
                }
            }, {
                key: "isARInit",
                value: function(t, e) {
                    var i = e;
                    return t && (i.x = this.ARInitPos.x,
                    i.y = this.ARInitPos.y,
                    i.c = 1,
                    this.ARInitPos = null),
                    i
                }
            }]),
            t
        }();
        e.NavigationProcessor = y
    }
    , function(t, e, i) { //路径映射
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.PathMapping = void 0;
        var n = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , s = i(0)
          , o = i(1)
          , a = i(8);
        var h = function() {
            function t(e, i, n) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this.path = void 0,
                this.z = void 0,
                this.setParams(e, i, n),
                this.reset()
            }
            return r(t, [{
                key: "setParams",
                value: function(t, e, i) {
                    this.sigmaGeneral = t || 5,
                    this.betaGeneral = e || 2,
                    this.maxDistanceThresholdGenaral = i || 20,
                    this.sigmaDrvOut = 15,
                    this.betaDrvOut = 5,
                    this.maxDistanceThresholdDrvOut = 100
                }
            }, {
                key: "setParams2posMode",
                value: function(t, e) {
                    e === s.CONSTANTS.DRIVING_MODE.OUTDOOR ? (this.sigma = this.sigmaDrvOut,
                    this.beta = this.betaDrvOut,
                    this.maxDistanceThreshold = this.maxDistanceThresholdDrvOut) : (this.sigma = this.sigmaGeneral,
                    this.beta = this.betaGeneral,
                    this.maxDistanceThreshold = this.maxDistanceThresholdGenaral)
                }
            }, {
                key: "reset",
                value: function() {
                    this.point = void 0,
                    this.state = void 0,
                    this.mapPoint = void 0,
                    this.mapKey = void 0,
                    this.dirList = []
                }
            }, {
                key: "setPath",
                value: function(t) {
                    this.reset(),
                    this.path = t
                }
            }, {
                key: "measurementProbabilities",
                value: function(t, e) {
                    var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
                      , n = [];
                    if (e === this.path[0].z && this.path[0].z !== this.path[1].z)
                        n[0] = a.HMM.measurementProb(o.Geometric.euclideanDistance(t, this.path[0]), this.sigma);
                    else
                        for (var r = 1; r < this.path.length; r++)
                            if (e === this.path[r].z) {
                                var s = void 0;
                                (s = this.path[r - 1].z !== this.path[r].z ? o.Geometric.euclideanDistance(t, this.path[r]) : o.Geometric.projectPoint2Segment(t, this.path[r - 1], this.path[r])[0]) < this.maxDistanceThreshold && (n[r] = a.HMM.measurementProb(s, this.sigma))
                            }
                    return a.HMM.checkBrokenChain(n),
                    i && (n = a.HMM.stateNormalization(n)),
                    n
                }
            }, {
                key: "transitionProbabilities",
                value: function(t, e, i, r) {
                    var s = [];
                    for (var a in e)
                        for (var h in r) {
                            var l = o.Geometric.pathRouteDistance(this.path, t, a, i, h)
                              , c = n(l, 2)
                              , u = (c[0],
                            c[1]);
                            s[[a, h]] = 1 / this.beta * Math.exp(-u / this.beta)
                        }
                    return s
                }
            }, {
                key: "pathMatchingInRealTime", //路径实时事件变化
                value: function(t, e, i, r, s, o) {
                    var h = !1;
                    this.path && this.path[0] === t[0] || (h = !0,
                    this.setPath(t)),
                    this.setParams2posMode(r, s);
                    var l = !1;
                    void 0 !== this.z && this.z !== i && (this.reset(),
                    l = !0),
                    this.z = i,
                    e.z = i;
                    var c, u = void 0, f = void 0;
                    if (c = this.measurementProbabilities(e, this.z),
                    this.point && this.state) {
                        var d = this.transitionProbabilities(this.point, this.state, e, c);
                        f = a.HMM.viterbi(this.state, c, d)[1],
                        u = a.HMM.stateNormalization(f)
                    } else
                        u = c;
                    var v = Number.MAX_VALUE
                      , p = void 0;
                    if (u && Object.keys(u).length > 0) {
                        var y = this.sortState(u)
                          , m = this.restrictInitState(u, y, h, l)
                          , g = n(m, 2);
                        u = g[0],
                        y = g[1],
                        p = parseInt(y[0]);
                        var P = this.calMapResult(e, p, r, s)
                          , T = n(P, 3);
                        v = T[0],
                        this.mapPoint = T[1],
                        this.mapKey = T[2],
                        this.checkUTurn(e, this.point, p, o),
                        this.point = e,
                        this.state = u
                    } else
                        this.reset();
                    return {
                        mapKey: this.mapKey,
                        mapPoint: this.mapPoint,
                        dist2path: v
                    }
                }
            }, {
                key: "sortState",
                value: function(t) {
                    var e = Object.keys(t);
                    return e.sort(function(e, i) {
                        return t[i] - t[e]
                    }),
                    e
                }
            }, {
                key: "restrictInitState",
                value: function(t, e, i, n) {
                    if (i)
                        (1 === e[0] || t[1] > .3) && (t = {
                            1: t[1]
                        });
                    else if (n) {
                        var r = Object.keys(t)
                          , s = t[r[0]]
                          , o = t[r[1]];
                        s > o && s > .03 ? ((t = {})[r[0]] = s,
                        e = [r[0]]) : o >= s && o > .03 && ((t = {})[r[1]] = o,
                        e = [r[1]])
                    }
                    return [t, e]
                }
            }, {
                key: "calMapResult",
                value: function(t, e, i, r) {
                    var a, h = 0, l = Number.MAX_VALUE, c = 0 === e ? this.path[0] : this.path[e - 1], u = this.path[e], f = o.Geometric.projectPoint2Segment(t, c, u), d = n(f, 3);
                    l = d[0],
                    a = d[1],
                    d[2];
                    var v = !this.mapPoint || o.Geometric.checkAlongPath(this.path, this.mapPoint, this.mapKey, a, e);
                    v || (h = o.Geometric.pathRouteDistance(this.path, this.mapPoint, this.mapKey, a, e)[0]);
                    var p = this.mapPoint
                      , y = this.mapKey;
                    return (v || !v && h < 80 && (h > 20 && r !== s.CONSTANTS.DRIVING_MODE.OUTDOOR || h > 30 && r === s.CONSTANTS.DRIVING_MODE.OUTDOOR)) && (p = a,
                    y = e),
                    [l, p, y]
                }
            }, {
                key: "checkUTurn",
                value: function(t, e, i, n) {
                    var r = 0
                      , s = 0 === i ? this.path[0] : this.path[i - 1]
                      , a = this.path[i]
                      , h = o.Geometric.vectorDirRad(s, a);
                    if (i === this.mapKey && e)
                        for (r = o.Geometric.euclideanDistance(t, e) * Math.cos(o.Geometric.vectorDirRad(e, t) - h),
                        this.dirList.push({
                            path: h,
                            dist: r,
                            head: n.head,
                            mCHead: n.mCHeadDiff
                        }); this.dirList.length > 0 && this.dirList.length > 3; )
                            this.dirList.shift();
                    else
                        this.dirList = [];
                    this.dirList.forEach(function(t) {
                        Math.abs(Math.abs(180 * t.path / Math.PI - t.head) - 180) < 25 && t.dist < 0 && Math.abs(t.mCHead) < 40 && (1,
                        t.dist)
                    })
                }
            }]),
            t
        }();
        e.PathMapping = h
    }
    , function(t, e, i) {  //模型管理器
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.ModelManager = void 0;
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , r = i(6)
          , s = i(30)
          , o = i(9)
          , a = i(0)
          , h = i(2)
          , l = i(1)
          , c = i(4);
        var u = function(t) {
            function e(t) {   //模型管理器 - 初始化
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return i.option = t || {},
                i.started = !1,
                i.z = void 0,
                i.startTime = t.startTime || (new Date).getTime(),
                i.t = i.startTime,
                i.pdrKf = new o.KalmanFilterPDR(i.t,a.KF_TYPE.PDR_WLK,t.deviceType,t.params),
                i.diffKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_WLK,t.deviceType,t.params), //卡
                i.baseKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_BASE,t.deviceType,t.params),
                i.drvKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_DRV,t.deviceType,t.params),
                (void 0 !== i.option.deviceType ? i.option.deviceType : a.CONSTANTS.DEVICE.ANDROID) === a.CONSTANTS.DEVICE.ANDROID ? i.drvOutKF = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_DRV_OUT_AND,t.deviceType,t.params) : i.drvOutKF = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_DRV_OUT_IOS,t.deviceType,t.params),
                i.arLastPos = null,
                i.reset(),
                i.setParams(t),
                i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, r.DEventDispatcherES6),
            n(e, [{
                key: "reset",  //模型管理器 - 重载
                value: function() {
                    this.started = !1,
                    this.pdrKf.reset(),
                    this.diffKf.reset(),
                    this.baseKf.reset(),
                    this.drvKf.reset(),
                    this.drvOutKF.reset(),
                    this.baseKfInfoList = []
                }
            }, {
                key: "reStartModels", //重启服务 - 重载
                value: function(t, e) {
                    this.pdrKf.startKF(t, e),
                    this.diffKf.startKF(t, e),
                    this.baseKf.startKF(t, e),
                    this.drvKf.startKF(t, e),
                    this.drvOutKF.startKF(t, e),
                    this.baseKfInfoList = []
                }
            }, {
                key: "setParams", //设置参数
                value: function(t) {}
            }, {
                key: "checkInitSignal", //检查初始化信号
                value: function(t, e, i) {
                    var n = e && e.cMean < 3
                      , r = e && e.cMean < 7 && t - this.startTime >= 5e3
                      , s = i && i.c < 4 && t - this.startTime >= 3e3
                      , o = i && i.c < 7 && t - this.startTime >= 5e3
                      , a = t - this.startTime >= 1e4 && (e || i);
                    return n || r || s || o || a
                }
            }, {
                key: "setARLastPos", //将AR设置为最后一个位置
                value: function(t) {
                    this.arLastPos = t
                }
            }, {
                key: "updateFusionModels", //更新融合模型
                value: function(t, e, i, n, r, s, o, a, l, u) {
                    if (this.started || this.checkInitSignal(t, n, r) && (this.t = t,
                    this.started = !0,
                    this.z = e,
                    this.isARLast(this.arLastPos, n, r)),
                    this.started) {
                        e !== this.z && (this.z = e,
                        h.LocationUtils.distance(i, n) < h.LocationUtils.distance(i, r) && h.LocationUtils.distance(i, n) < 10 ? this.reStartModels(n, null) : this.reStartModels(n, r));
                        this.t;
                        this.t = t,
                        this.pdrKf.update(t, n, r, s, o, a, l, u),
                        this.diffKf.update(t, n, r, s, l, u),
                        this.baseKf.update(t, n, r, void 0, u),
                        this.drvKf.update(t, n, r, s, !1, u),
                        this.drvOutKF.update(t, n, r, s, l),
                        this.updateBaseKfInfos(c.Numerical.rad2deg(s))
                    }
                }
            }, {
                key: "getStates", //更新状态
                value: function(t, e, i) {
                    var n = void 0
                      , r = void 0
                      , s = void 0;
                    return t === a.POSITION_MODE.WALKING ? (n = e === a.CONSTANTS.FUSION_MODEL.PDR ? this.pdrKf.getPosition() : this.diffKf.getPosition(),
                    r = this.diffKf.getVelocity()) : i === a.CONSTANTS.DRIVING_MODE.INDOOR ? (n = this.drvKf.getPosition(),
                    r = this.drvKf.getVelocity()) : (n = this.drvOutKF.getPosition(),
                    r = this.drvOutKF.getVelocity()),
                    r && (s = c.Numerical.rad2deg(Math.atan2(r.x, r.y))),
                    this.diffKf.getSpeed(),
                    {
                        velocity: r,
                        pos: n,
                        heading: s
                    }
                }
            }, {
                key: "changeState", //改变状态
                value: function(t, e) {
                    e === a.CONSTANTS.DRIVING_MODE.INDOOR ? this.drvKf.tranState(this.drvOutKF.getPosition(), this.drvOutKF.getVelocity()) : e === a.CONSTANTS.DRIVING_MODE.OUTDOOR && this.drvOutKF.tranState(this.drvKf.getPosition(), this.drvKf.getVelocity())
                }
            }, {
                key: "displayKfDebugInfo", //kf调试信息
                value: function(t, e, i, n) {
                    this.pdrKf.getDspInfo(),
                    this.diffKf.getDspInfo(),
                    this.baseKf.getDspInfo(),
                    e && (e.x.toFixed(1),
                    e.y.toFixed(1)),
                    i && (i.x.toFixed(1),
                    i.y.toFixed(1)),
                    h.LocationUtils.distance(this.baseKf.getPosition(), this.pdrKf.getPosition()).toFixed(1),
                    h.LocationUtils.distance(this.baseKf.getPosition(), this.diffKf.getPosition()).toFixed(1)
                }
            }, {
                key: "updateBaseKfInfos", //更新基础卡尔曼滤波模型
                value: function(t) {
                    if (this.started) {
                        var e = h.LocationUtils.distance(this.baseKf.getPosition(), this.pdrKf.getPosition())
                          , i = l.Geometric.angleDiffDeg(this.baseKf.getHeadingDeg(), t);
                        for (this.baseKfInfoList.push({
                            t: this.t,
                            speed: this.baseKf.getSpeed(),
                            pdr2baseDist: e,
                            cHeadDiff: i
                        }); this.baseKfInfoList.length > 0 && this.t - this.baseKfInfoList[0].t > 6e3; )
                            this.baseKfInfoList.shift();
                        for (var n = this.baseKfInfoList.length, r = 0, s = 0, o = 0, a = 0; a < n; a++)
                            r += this.baseKfInfoList[a].speed,
                            s += this.baseKfInfoList[a].pdr2baseDist,
                            o += this.baseKfInfoList[a].cHeadDiff;
                        n > 0 ? (this.mSpeed = r / n,
                        this.mPdr2baseDist = s / n,
                        this.mCHeadDiff = o / n) : (this.mSpeed = 0,
                        this.mPdr2baseDist = 0,
                        this.mCHeadDiff = 0)
                    } else
                        this.baseKfInfoList = []
                }
            }, {
                key: "getBaseKfInfos", //获取卡尔曼滤波信息
                value: function() {
                    return {
                        timeInterval: 0 === this.baseKfInfoList.length ? 0 : 1 === this.baseKfInfoList.length ? 1e3 : this.baseKfInfoList[this.baseKfInfoList.length - 1].t - this.baseKfInfoList[0].t,
                        pos: this.baseKf.getPosition(),
                        head: this.baseKf.getHeadingDeg(),
                        mSpeed: this.mSpeed,
                        mPdr2baseDist: this.mPdr2baseDist,
                        mCHeadDiff: this.mCHeadDiff
                    }
                }
            }, {
                key: "isARLast", //是最近AR
                value: function(t, e, i) {
                    t && (e && (e.x = t.x,
                    e.y = t.y,
                    e.c = 1),
                    i && (i.x = t.x,
                    i.y = t.y,
                    i.c = 1),
                    this.arLastPos = null)
                }
            }]),
            e
        }();
        e.ModelManager = u
    }
    , function(t, e, i) {  //卡尔曼滤波航向差分
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.KalmanFilterDiffHeading = void 0;
        var n = function() {
            return function(t, e) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return function(t, e) {
                        var i = []
                          , n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            s = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        return i
                    }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }()
          , s = i(10)
          , o = i(15)
          , a = i(9)
          , h = i(4)
          , l = i(0);
        var c = function(t) {
            function e(t, i, n, r, s) {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var o = function(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, n, r, s));
                return o.heading = null,
                o
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, a.KalmanFilterPDR),
            r(e, [{
                key: "initKFModel", //初始卡尔曼滤波器模型
                value: function(t, e, i, n) {
                    var r = s.Vector.create([t.x, 0, t.y, 0])
                      , a = s.Matrix.Diagonal([900, 900, 900, 900])
                      , h = s.Matrix.create([[1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]])
                      , l = s.Vector.create([0, 0])
                      , c = s.Matrix.Diagonal([.04, .04])
                      , u = s.Matrix.create([[0, 0], [1, 0], [0, 0], [0, 1]])
                      , f = s.Matrix.Diagonal([e * e, e * e])
                      , d = s.Matrix.create([[0, 0], [1, 0], [0, 0], [0, 1]])
                      , v = new o.KalmanModel(r,a,h,l,c,u,f,d)
                      , p = s.Vector.create([t.x, t.y, t.x, t.y])
                      , y = s.Matrix.create([[1, 0, 0, 0], [0, 0, 1, 0], [1, 0, 0, 0], [0, 0, 1, 0]])
                      , m = s.Matrix.Diagonal([i, i, n, n]);
                    return [v, new o.KalmanObservation(p,y,m)]
                }
            }, {
                key: "setVelocity", //设定速度
                value: function(t) {
                    this.kalmanModel && (this.kalmanModel.x_k.elements[1] = t.x,
                    this.kalmanModel.x_k.elements[3] = t.y)
                }
            }, {
                key: "calHeadingControlInput", //航向控制输入
                value: function(t, e, i) {
                    var n = 0;
                    !i && 0 !== i || !e && 0 !== e || ((n = e - i) > Math.PI ? n -= 2 * Math.PI : n < -Math.PI && (n += 2 * Math.PI)),
                    this.kfType !== l.KF_TYPE.DIFF_DRV && this.kfType !== l.KF_TYPE.DIFF_DRV_OUT_AND && this.kfType !== l.KF_TYPE.DIFF_DRV_OUT_IOS || Math.abs(n) > Math.PI / 2 && (n = 0);
                    var r = s.Vector.create([t.x, t.y]);
                    return s.Matrix.create([[Math.cos(n), Math.sin(n)], [-Math.sin(n), Math.cos(n)]]).x(r).subtract(r)
                }
            }, {
                key: "updateTransitionMatrix", //更新转移矩阵
                value: function(t) {
                    this.kalmanModel.F_k.elements[0][1] = t,
                    this.kalmanModel.F_k.elements[2][3] = t,
                    this.kalmanModel.N_k.elements[1][0] = t,
                    this.kalmanModel.N_k.elements[3][1] = t,
                    this.kalmanModel.N_k.elements[0][0] = t * t / 2,
                    this.kalmanModel.N_k.elements[2][1] = t * t / 2,
                    this.kalmanModel.B_k.elements[0][0] = t / 2,
                    this.kalmanModel.B_k.elements[2][1] = t / 2
                }
            }, {
                key: "updateControlInput", //更新控制输入
                value: function(t) {
                    void 0 === this.heading || null === this.heading ? this.heading = t : void 0 !== t && null !== t && (this.kalmanModel.u_k = this.calHeadingControlInput(this.getVelocity(), t, this.heading),
                    this.heading = t)
                }
            }, {
                key: "update",  // 卡尔曼滤波航向差分  -更新
                value: function(t, e, i, r, s) {
                    if (this.kalmanModel || this.startKF(e, i),
                    this.kalmanModel) {
                        this.cnt++;
                        var o = (t - this.t) / 1e3;
                        o > 2 && (o = 0),
                        this.t = t;
                        var a = this.getObrMeasurements(e, i)
                          , h = n(a, 2)
                          , l = h[0]
                          , c = h[1];
                        this.checkReset(l, c),
                        this.updateTransitionMatrix(o),
                        this.updateControlInput(r),
                        this.updateKfModel(l, c, s)
                    }
                }
            }, {
                key: "speedConstraint", //速度限制
                value: function() {
                    var t = 10;
                    t = this.kfType === l.KF_TYPE.DIFF_DRV_OUT_AND || this.kfType === l.KF_TYPE.DIFF_DRV_OUT_IOS ? 30 : 15;
                    var e = this.kalmanModel.x_k.elements[1]
                      , i = this.kalmanModel.y_k.elements[3]
                      , n = 1
                      , r = Math.sqrt(e * e + i * i);
                    r > t && (n = t / r),
                    this.kalmanModel.x_k.elements[1] = n * e,
                    this.kalmanModel.x_k.elements[3] = n * i
                }
            }, {
                key: "getPosition", //卡尔曼滤波航向差分 - 获得位置
                value: function() {
                    if (this.kalmanModel)
                        return {
                            x: this.kalmanModel.x_k.elements[0],
                            y: this.kalmanModel.x_k.elements[2]
                        }
                }
            }, {
                key: "getVelocity", //Velocity
                value: function() {
                    if (this.kalmanModel)
                        return {
                            x: this.kalmanModel.x_k.elements[1],
                            y: this.kalmanModel.x_k.elements[3]
                        }
                }
            }, {
                key: "tranState", //
                value: function(t, e) {
                    t && e && (this.kalmanModel.x_k = s.Vector.create([t.x, e.x, t.y, e.y]))
                }
            }, {
                key: "getSpeed", //获取速度
                value: function() {
                    return this.kalmanModel ? Math.sqrt(Math.pow(this.kalmanModel.x_k.elements[1], 2) + Math.pow(this.kalmanModel.x_k.elements[3], 2)).toFixed(2) : 0
                }
            }, {
                key: "getHeadingDeg", //航向角
                value: function() {
                    if (this.kalmanModel)
                        return h.Numerical.rad2deg(Math.atan2(this.kalmanModel.x_k.elements[1], this.kalmanModel.x_k.elements[3]))
                }
            }, {
                key: "getDspInfo", //dsp 信息
                value: function() {
                    var t = "type:" + this.kfType;
                    return this.kalmanModel && (t += " x:" + this.kalmanModel.x_k.elements[0].toFixed(1) + " y:" + this.kalmanModel.x_k.elements[2].toFixed(1) + " vx:" + this.kalmanModel.x_k.elements[1].toFixed(1) + " vy:" + this.kalmanModel.x_k.elements[3].toFixed(1)),
                    t
                }
            }]),
            e
        }();
        e.KalmanFilterDiffHeading = c
    }
    , function(t, e, i) { //Hmm数据加载器
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.HmmDataLoader = void 0;
        var n, r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }(), s = i(3), o = (n = s) && n.__esModule ? n : {
            default: n
        };
        var a = function() {
            function t() { //Hmm数据加载器 --初始化
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                this.currIndexing = -1e4,
                this.connection = {},
                this.roads = {
                    roads: {},
                    shortestDistance: {}
                },
                this.outside = void 0,
                this.pendingentries = [],
                this.outsideVertex = {}
            }
            return r(t, [{ 
                key: "loadData", //Hmm数据加载器 --加载数据
                value: function(t, e, i, n, r) {
                    var s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "walk";
                    void 0 === this.outside && (this.outside = i,
                    this.outsideVertex = t), //外侧顶点
                    this.currIndexing += 1e4,
                    this.addRoads(e, r, i), //添加路段
                    this.addVertex(t, r, i), //添加顶角
                    this.addShortestDistance(e), //最短距离
                    0 !== this.currIndexing && this.loadEntries(n, s, t, r, i)
                }
            }, {
                key: "pointDis",  //两点距离
                value: function(t, e) {
                    return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
                }
            }, {
                key: "matchPendingEntry", //匹配挂起的条目
                value: function(t, e, i, n) {
                    for (var r = 3, s = -1, o = 0; o < this.pendingentries.length; o++)
                        e === this.pendingentries[o].type && this.pointDis(this.pendingentries[o], t) < r && this.pendingentries[o].z === t.z && (r = this.pointDis(this.pendingentries[o], t),
                        s = o);
                    return -1 !== s && (this.matchPoints(this.pendingentries[s].index, i, n, e),
                    this.pendingentries.splice(s, 1),
                    !0)
                }
            }, {
                key: "matchOutside", //匹配外边线
                value: function(t, e, i, n) {
                    var r = 3
                      , s = -1;
                    for (var o in this.outsideVertex)
                        this.pointDis(this.connection[o], t) < r && this.connection[o].re === t.z && (r = this.pointDis(this.connection[o], t),
                        s = parseInt(o));
                    return -1 !== s && (this.matchPoints(s, i, n, e),
                    !0)
                }
            }, {
                key: "addToIntersection", //添加到交叉点
                value: function(t) {
                    var e = !0
                      , i = !1
                      , n = void 0;
                    try {
                        for (var r, s = this.roads.roads[this.connection[t].re][Symbol.iterator](); !(e = (r = s.next()).done); e = !0) {
                            var o = r.value;
                            if (o.vertexes.length > 2 && o.vertexes.indexOf(t) > 0 && o.intersections.indexOf(t) < 0) {
                                o.intersections.push(t);
                                break
                            }
                            if (o.vertexes[0].constructor === Array && o.vertexes[0].indexOf(t) > 0 && o.intersections.indexOf(t) < 0) {
                                o.intersections.push(t);
                                break
                            }
                        }
                    } catch (t) {
                        i = !0,
                        n = t
                    } finally {
                        try {
                            !e && s.return && s.return()
                        } finally {
                            if (i)
                                throw n
                        }
                    }
                }
            }, {
                key: "matchPoints", //匹配点
                value: function(t, e, i) {
                    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (this.connection[t].ne.push(e),
                    this.connection[e].ne.push(t),
                    this.connection[e].re !== this.connection[t].re ? (this.connection[e].type = [n],
                    this.connection[t].type = [n]) : 0 !== n && (this.connection[e].special ? (this.connection[e].special.ne.push(t),
                    this.connection[e].special.type.push([n])) : (this.connection[e].special = {},
                    this.connection[e].special.ne = [t],
                    this.connection[e].special.type = [[n]]),
                    this.connection[t].special ? (this.connection[t].special.ne.push(e),
                    this.connection[t].special.type.push([n])) : (this.connection[t].special = {},
                    this.connection[t].special.ne = [e],
                    this.connection[t].special.type = [[n]])),
                    this.addToIntersection(t),
                    this.addToIntersection(e),
                    this.connection[t].re === this.connection[e].re) {
                        for (var r in this.roads.roads[this.connection[e].re].push({
                            one_way: !1,
                            vertexes: [t, e],
                            factor: 1,
                            buildingCode: i
                        }),
                        this.roads.shortestDistance[t + "," + e] = 0,
                        this.connection[e].ne)
                            this.connection[e].ne[r] > e ? this.roads.shortestDistance[e + "," + this.connection[e].ne[r]] && (this.roads.shortestDistance[t + "," + this.connection[e].ne[r]] = this.roads.shortestDistance[e + "," + this.connection[e].ne[r]]) : this.roads.shortestDistance[this.connection[e].ne[r] + "," + e] && (this.roads.shortestDistance[t + "," + this.connection[e].ne[r]] = this.roads.shortestDistance[this.connection[e].ne[r] + "," + e]);
                        for (var s in this.connection[t].ne)
                            if (this.connection[t].ne[s] > t) {
                                if (this.roads.shortestDistance[t + "," + this.connection[t].ne[s]])
                                    for (var o in this.roads.shortestDistance[this.connection[t].ne[s] + "," + e] = this.roads.shortestDistance[t + "," + this.connection[t].ne[s]],
                                    this.connection[e].ne)
                                        this.connection[e].ne[o] > e ? this.roads.shortestDistance[e + "," + this.connection[e].ne[o]] && (this.roads.shortestDistance[this.connection[t].ne[s] + "," + this.connection[e].ne[o]] = this.roads.shortestDistance[e + "," + this.connection[e].ne[o]] + this.roads.shortestDistance[t + "," + this.connection[t].ne[s]]) : this.roads.shortestDistance[this.connection[e].ne[o] + "," + e] && (this.roads.shortestDistance[this.connection[t].ne[s] + "," + this.connection[e].ne[o]] = this.roads.shortestDistance[this.connection[e].ne[o] + "," + e] + this.roads.shortestDistance[t + "," + this.connection[t].ne[s]])
                            } else if (this.roads.shortestDistance[this.connection[t].ne[s]] + "," + t)
                                for (var a in this.roads.shortestDistance[this.connection[t].ne[s] + "," + e] = this.roads.shortestDistance[this.connection[t].ne[s] + "," + t],
                                this.connection[e].ne)
                                    this.connection[e].ne[a] > e ? this.roads.shortestDistance[e + "," + this.connection[e].ne[a]] && (this.roads.shortestDistance[this.connection[t].ne[s] + "," + this.connection[e].ne[a]] = this.roads.shortestDistance[e + "," + this.connection[e].ne[a]] + this.roads.shortestDistance[this.connection[t].ne[s] + "," + t]) : this.roads.shortestDistance[this.connection[e].ne[a] + "," + e] && (this.roads.shortestDistance[this.connection[t].ne[s] + "," + this.connection[e].ne[a]] = this.roads.shortestDistance[this.connection[e].ne[a] + "," + e] + this.roads.shortestDistance[this.connection[t].ne[s] + "," + t]);
                        for (var h in this.connection[e].ne)
                            this.connection[e].ne[h] > e ? this.roads.shortestDistance[e + "," + this.connection[e].ne[h]] && (this.roads.shortestDistance[t + "," + this.connection[e].ne[h]] = this.roads.shortestDistance[e + "," + this.connection[e].ne[h]]) : this.roads.shortestDistance[this.connection[e].ne[h] + "," + e] && (this.roads.shortestDistance[t + "," + this.connection[e].ne[h]] = this.roads.shortestDistance[this.connection[e].ne[h] + "," + e])
                    }
                }
            }, {
                key: "loadEntries", //加载入口
                value: function(t, e, i, n, r) {
                    for (var s in t)
                        if (t[s].entries) {
                            var o = !0
                              , a = !1
                              , h = void 0;
                            try {
                                for (var l, c = t[s].entries[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                                    var u = l.value;
                                    if (void 0 === u.mode && "walk" === e || u.mode && u.mode.indexOf(e) >= 0 || u.mode && u.mode.length >= 1 && "walk" === e && "drive" !== u.mode[0] || u.mode && u.mode.indexOf("drive") >= 0 && "car" === e) {
                                        var f = this.findClosestIndexInside(u, i, n, r)
                                          , d = 0;
                                        switch (u.type) {
                                        case "lift":
                                            d = 3;
                                            break;
                                        case "slope":
                                            d = 1;
                                            break;
                                        case "stairs":
                                            d = 6;
                                            break;
                                        case "escalator":
                                            d = 1024;
                                            break;
                                        default:
                                            d = 0
                                        }
                                        if (this.matchPendingEntry(u.out, d, f, r))
                                            continue;
                                        if (this.matchOutside(u.out, d, f, r))
                                            continue;
                                        var v = {
                                            x: u.in.x,
                                            y: u.in.y,
                                            z: u.in.z,
                                            index: f,
                                            type: d
                                        };
                                        this.pendingentries.push(v)
                                    }
                                }
                            } catch (t) {
                                a = !0,
                                h = t
                            } finally {
                                try {
                                    !o && c.return && c.return()
                                } finally {
                                    if (a)
                                        throw h
                                }
                            }
                        }
                }
            }, {
                key: "findClosestIndexInside", //在侧边中查找最近的索引
                value: function(t, e, i, n) {
                    var r = Number.MAX_VALUE
                      , s = "0";
                    for (var o in e)
                        i.regionMapEncode(e[o].re, n) === t.in.z && Math.sqrt(Math.pow(e[o].x - t.in.x, 2) + Math.pow(e[o].y - t.in.y, 2)) < r && (s = parseInt(o) + this.currIndexing,
                        r = Math.sqrt(Math.pow(e[o].x - t.in.x, 2) + Math.pow(e[o].y - t.in.y, 2)));
                    return s
                }
            }, {
                key: "addVertex", //添加顶角
                value: function(t, e, i) {
                    for (var n in t) {
                        var r = this.currIndexing + parseInt(n);
                        this.connection[r] = (0,
                        o.default)(t[n]);
                        var s = this.connection[r].ne;
                        if (s) {
                            for (var a = 0; a < s.length; a++)
                                s[a] += this.currIndexing;
                            this.connection[r].re = e.regionMapEncode(t[n].re, i)
                        } else
                            this.connection[r].re = e.regionMapEncode(t[n].re, i)
                    }
                }
            }, {
                key: "addRoads", //添加路线
                value: function(t, e, i) {
                    for (var n in t.roads)
                        for (var r in this.roads.roads.hasOwnProperty(e.regionMapEncode(n, i)) || (this.roads.roads[e.regionMapEncode(n, i)] = []),
                        t.roads[n]) {
                            var s = t.roads[n][r];
                            s.buildingCode = i;
                            for (var o = 0; o < s.vertexes.length; o++)
                                if (isNaN(s.vertexes[o]))
                                    for (var a = 0; a < s.vertexes[o].length; a++)
                                        s.vertexes[o][a] += this.currIndexing;
                                else
                                    s.vertexes[o] += this.currIndexing;
                            if (void 0 !== s.intersections)
                                for (var h = 0; h < s.intersections.length; h++)
                                    s.intersections[h] += this.currIndexing;
                            this.roads.roads[e.regionMapEncode(n, i)].push(s)
                        }
                }
            }, {
                key: "addShortestDistance", //添加最短距离
                value: function(t) {
                    for (var e in t.shortestDistance) {
                        var i = e.split(",")
                          , n = parseInt(i[0]) + this.currIndexing + "," + (parseInt(i[1]) + this.currIndexing);
                        this.roads.shortestDistance[n] = t.shortestDistance[e]
                    }
                }
            }]),
            t
        }();
        e.HmmDataLoader = a
    }
    , function(t, e, i) { //搜索车道引擎

        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.seeklaneEngine = void 0;
        var n = i(18)
          , r = i(0)
          , s = i(5)
          , o = i(31)
          , a = i(17)
          , h = function(t) {
            if (t && t.__esModule)
                return t;
            var e = {};
            if (null != t)
                for (var i in t)
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e.default = t,
            e
        }(i(33));
        var l = {
            cm: {
                fm: a.FloorMapper,
                hu: s.HMMUtils,
                hh: s.HmmHelper,
                hp: s.Point,
                hdl: o.HmmDataLoader
            },
            li: n.LocationInterface,
            lc: r.CONSTANTS,
            pf: h.default
        };
        l.pf.Version = "1.0.7 branch:dev time:2021-07-10 17:51",
        e.seeklaneEngine = l
    }
    , function(t, e, i) {
        "use strict";
        var n = i(34)
          , r = ["create", "planPath", "cancelAllPath"];
        t.exports = function() {
            var t = new Worker(URL.createObjectURL(new Blob(['!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HMMUtils=t.HmmHelper=t.RoadType=t.Road=t.Point=void 0;var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(1),a=(n=i)&&n.__esModule?n:{default:n},s=r(2);function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var l=function e(){c(this,e)};l.point2PathDistance=function(e,t){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"region",n=[],o=Number.MAX_VALUE,i=void 0,a="z"!==r,c=0;c<t.length;c++)if(e[r]===t[c][r]){var l=new u(e.x,e.y,e.region);l.z=e.z;var f=new u(t[c].x,t[c].y,t[c].region);if(f.z=t[c].z,t[c+1]&&t[c+1][r]===t[c][r]){var y=new u(t[c+1].x,t[c+1].y,t[c+1].region);y.z=t[c+1].z;var v=s.Geometric.projectPoint2Segment(l,f,y);v[0]<o&&(o=v[0],i={x:v[1].x,y:v[1].y,region:t[c].region,z:t[c].z,buildingCode:t[c].buildingCode},n=[c,c+1])}else{var h=s.Geometric.euclideanDistance(l,f);if(h<o){o=h;var d=-1,p=t[c].type;void 0!==p&&(d=p),i={x:f.x,y:f.y,region:t[c].region,z:t[c].z,buildingCode:t[c].buildingCode,type:d},n=[c]}}}else if(!a&&t[c+1]){var x=t[c].z,g=t[c+1].z,m=e.z;if((g-m)*(m-x)>0){var b=new u(e.x,e.y,e.region);b.z=0;var P=new u(t[c].x,t[c].y,t[c].region);P.z=0;var M=new u(t[c+1].x,t[c+1].y,t[c+1].region);M.z=0;var z=s.Geometric.projectPoint2Segment(b,P,M);z[0]<o&&z[0]<12&&(o=z[0],i={x:z[1].x,y:z[1].y,region:e.region,z:e.z,buildingCode:e.buildingCode},n=[c,c+1])}}return[o,i,n]},l.point2SegmentDistance=function(e,t,r){var n=(e.x-t.x)*(r.x-t.x)+(e.y-t.y)*(r.y-t.y)+(e.z-t.z)*(r.z-t.z);if(n<=0)return[s.Geometric.euclideanDistance(e,t),t,0];var o=Math.pow(s.Geometric.euclideanDistance(t,r),2);if(n>=o)return[s.Geometric.euclideanDistance(e,r),r,2];var i=n/o,a=new u(t.x+i*(r.x-t.x),t.y+i*(r.y-t.y),t.z+i*(r.z-t.z));return[s.Geometric.euclideanDistance(e,a),a,1]};var u=function(){function e(t,r,n,o,i,a,s,l){c(this,e),this.x=t,this.y=r,this.z=n,this.re=n,this.ne=o,this.type=i,this.cost=a,this.factor=void 0===s?{}:s,this.special=l}return o(e,[{key:"isSameRegionWithRoad",value:function(e,t){var r=e.intersections[0];return this.z===t[r].z}}]),e}(),f={LINE:1,POLYGON:2,MULTIPOLYGON:3},y=function(){function e(t,r,n,o,i){c(this,e),this.isOneWay=t||!1,this.factor=void 0===o?1:o,this.vertexes=(0,a.default)(r),this.buildingCode=(0,a.default)(i)||"",r[0].constructor===Array?this.type=f.MULTIPOLYGON:r.length>2?this.type=f.POLYGON:this.type=f.LINE,this.hasWidth=this.type!==f.LINE,this.hasWidth?(this.isOneWay=!1,this.intersections=(0,a.default)(n)):this.intersections=(0,a.default)(r)}return o(e,[{key:"isValidLine",value:function(e,t,r){if(!this.hasWidth)return!1;var n=function(e,t){return function(r,n){if(e.x-t.x==0&&e.y-t.y==0){var o=.01*(n-t.y);return Math.abs(o)>.01?o:0}var i=(n-t.y)*(e.x-t.x)-(r-t.x)*(e.y-t.y);return Math.abs(i)>.01?i:0}},o=1,i=2,a=3,c=function(e,t,r,s){var c=n(r,s);if(Math.abs(c(e.x,e.y))<1e-8&&Math.abs(c(t.x,t.y))<1e-8){var l=void 0,u=void 0,f=void 0,y=void 0,v=void 0;Math.abs(e.x-t.x)>Math.abs(e.y-t.y)?(l=Math.min(e.x,t.x),u=Math.max(e.x,t.x),f=Math.min(r.x,s.x),y=Math.max(r.x,s.x),v=Math.abs(e.x-t.x)):(l=Math.min(e.y,t.y),u=Math.max(e.y,t.y),f=Math.min(r.y,s.y),y=Math.max(r.y,s.y),v=Math.abs(e.y-t.y));var h=Math.max(l,f),d=Math.min(u,y);return h>=d?a:d-h>=v-.001?o:i}return a},l=void 0;for(var y in this.type===f.POLYGON?l=[this.vertexes]:this.type===f.MULTIPOLYGON&&(l=this.vertexes),l)for(var v=l[y].length,h=0,d=v-1;h<v;d=h++){switch(c(e,t,r[l[y][h]],r[l[y][d]])){case o:return!0;case i:return!1}}var p,x,g,m,b,P,M,z,w,F,D=new u((e.x+t.x)/2,(e.y+t.y)/2,e.z),S=!0;for(var O in l){for(var k=l[O].length,I=0,_=k-1;I<k;_=I++){var C=r[l[O][I]],j=r[l[O][_]];if(g=C,m=j,b=void 0,void 0,void 0,z=void 0,void 0,void 0,b=n(p=e,x=t),P=b(g.x,g.y),M=b(m.x,m.y),z=n(g,m),w=z(p.x,p.y),F=z(x.x,x.y),P*M<0&&w*F<0){S=!1;break}}if(!(S=S&&s.Geometric.isPointInPolygon(D,l[O],r)===(0==O)))return!1}return!0}},{key:"distanceWithPoint",value:function(e,t){return s.Geometric.projectPoint2Road(e,this,t)}},{key:"angle_to",value:function(e,t){if(this.hasWidth||e.hasWidth)return null;var r=t[this.vertexes[this.vertexes.length-1]].x-t[this.vertexes[0]].x,n=t[this.vertexes[this.vertexes.length-1]].y-t[this.vertexes[0]].y,o=t[e.vertexes[e.vertexes.length-1]].x-t[e.vertexes[0]].x,i=t[e.vertexes[e.vertexes.length-1]].y-t[e.vertexes[0]].y;return s.Geometric.angleBetweenVectors([r,n],[o,i])}},{key:"angleWith",value:function(e,t){if(this.hasWidth)return null;var r=t[this.vertexes[this.vertexes.length-1]].x-t[this.vertexes[0]].x,n=t[this.vertexes[this.vertexes.length-1]].y-t[this.vertexes[0]].y;return s.Geometric.angleBetweenVectors([Math.sin(e),Math.cos(e)],[r,n])}}]),e}(),v=function e(){c(this,e)};v.findAllShortestDistance2=function(e,t,r,n){for(var o in e){var i=e[o=parseInt(o)];for(var a in t[o]=new u(i.x,i.y,i.z),i.ne){var c=i.ne[a],l=new y(!0,[o,c]);r.push(l)}}for(var f=0;f<t.length;f++){for(var v=[],h=0;h<t.length;h++)v[h]=f!==h?Number.MAX_VALUE:0;n[f]=v}for(var d in r){var p=r[d],x=t[p.vertexes[0]],g=t[p.vertexes[1]],m=s.Geometric.euclideanDistance(x,g);n[p.vertexes[0]][p.vertexes[1]]=m,p.isOneWay||(n[p.vertexes[1]][p.vertexes[0]]=m)}for(var b=0;b<t.length;b++)for(var P=0;P<t.length;P++)for(var M=0;M<t.length;M++)n[P][M]>n[P][b]+n[b][M]&&(n[P][M]=n[P][b]+n[b][M]);for(var z=0;z<t.length;z++)for(var w=0;w<t.length;w++)n[z][w]>20&&(n[z][w]=99999)},t.Point=u,t.Road=y,t.RoadType=f,t.HmmHelper=l,t.HMMUtils=v},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=function e(t){var r=void 0;if("object"===(void 0===t?"undefined":n(t)))if(Array.isArray(t))for(var o in r=[],t)r[o]=e(t[o]);else if(null===t)r=null;else if(t.constructor===RegExp)r=t;else for(var i in r={},t)r[i]=e(t[i]);else r=t;return r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Geometric=void 0;var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(7),a=r(0);var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,null,[{key:"angleDiffRad",value:function(e,t){var r=e-t;return r>=Math.PI&&(r-=2*Math.PI),r<=-Math.PI&&(r+=2*Math.PI),r}},{key:"angleDiffDeg",value:function(e,t){var r=e-t;return r>=180&&(r-=360),r<=-180&&(r+=360),r}},{key:"angleBetweenVectors",value:function(e,t){var r=e[0],n=e[1],o=t[0],a=t[1],s=Math.sqrt(r*r+n*n)*Math.sqrt(o*o+a*a);if(0===s)return 0;var c=r*a-n*o>0?-1:1,l=r*o+n*a;(l>s||-l>s)&&(l=s);var u=l/s;return i.Numerical.toFixed(c*Math.acos(u),2)}},{key:"angleBetweenVectors3D",value:function(e,t){var r=e[0],n=e[1],o=e[2],a=t[0],s=t[1],c=t[2],l=Math.sqrt(r*r+n*n+o*o)*Math.sqrt(a*a+s*s+c*c);if(0===l)return 0;var u=r*a+n*s+o*c;return(u>l||-u>l)&&(u=l),i.Numerical.toFixed(Math.acos(u/l),2)}},{key:"euclideanDistance",value:function(t,r){var n=e.formatPoint(t),o=e.formatPoint(r);if(!n||!o)return-1;var a=Math.sqrt(Math.pow(n.x-o.x,2)+Math.pow(n.y-o.y,2)+Math.pow(n.z-o.z,2));return i.Numerical.toFixed(a,2)}},{key:"projectPoint2Segment",value:function(t,r,n){var o=e.formatPoint(t),i=e.formatPoint(r),a=e.formatPoint(n),s=(o.x-i.x)*(a.x-i.x)+(o.y-i.y)*(a.y-i.y)+(o.z-i.z)*(a.z-i.z);if(s<=0)return[e.euclideanDistance(o,i),i,0];var c=Math.pow(e.euclideanDistance(i,a),2);if(s>=c)return[e.euclideanDistance(o,a),a,2];var l=s/c,u={x:i.x+l*(a.x-i.x),y:i.y+l*(a.y-i.y),z:i.z+l*(a.z-i.z)};return[e.euclideanDistance(o,u),u,1]}},{key:"vectorDirDeg",value:function(e,t){return 180*Math.atan2(t.x-e.x,t.y-e.y)/Math.PI}},{key:"vectorDirRad",value:function(e,t){return Math.atan2(t.x-e.x,t.y-e.y)}},{key:"rotateAngle",value:function(e,t){if(void 0===t||null==t)return null;var r=Math.sin(e),n=Math.cos(e),o=r*Math.cos(t)+n*Math.sin(t),a=n*Math.cos(t)-r*Math.sin(t);return i.Numerical.toFixed(Math.atan2(o,a),2)}},{key:"isPointInPolygon",value:function(t,r,n){var o=e.formatPolygon(r,n),i=e.formatPoint(t);if(!i||!o)return!1;for(var a=!1,s=0,c=o.length-1;s<o.length;c=s++){var l=o[s].x,u=o[s].y,f=o[c].x,y=o[c].y;if(e.projectPoint2Segment(i,o[s],o[c])[0]<1e-8)return!0;u>i.y!=y>i.y&&i.x<(f-l)*(i.y-u)/(y-u)+l&&(a=!a)}return a}},{key:"isPointInRoad",value:function(t,r,n){var o=void 0;switch(r.type){case a.RoadType.POLYGON:o=r.vertexes;break;case a.RoadType.MULTIPOLYGON:o=r.vertexes[0];break;default:return!1}return e.isPointInPolygon(t,o,n)}},{key:"getCompletePolygon",value:function(e,t){var r=[];return e.forEach(function(e){r.push(t[e])}),r}},{key:"dim2List2ObjList",value:function(e,t){void 0===t&&(t=0);var r=[];return e.forEach(function(e){r.push({x:e[0],y:e[1],z:t})}),r}},{key:"formatPolygon",value:function(t,r){var n=t;if(!Array.isArray(t))return null;if(Array.isArray(t[0]))n=e.dim2List2ObjList(t);else if(t[0].hasOwnProperty("x"));else{if(!r)return null;n=e.getCompletePolygon(t,r)}return n[0].x===n[n.length-1].x&&n[0].y===n[n.length-1].y&&n.shift(),n}},{key:"formatPoint",value:function(e){var t={};if(Array.isArray(e))2===e.length&&(t={x:e[0],y:e[1],z:0}),3===e.length&&(t={x:e[0],y:e[1],z:e[2]});else{if(!e.hasOwnProperty("x")||!e.hasOwnProperty("y"))return null;t={x:e.x,y:e.y,z:e.z},e.hasOwnProperty("z")||(t.z=0)}return t}},{key:"projectPoint2Road",value:function(t,r,n){if(r.type===a.RoadType.LINE)return e.projectPoint2Segment(t,n[r.vertexes[0]],n[r.vertexes[1]]);if(e.isPointInRoad(t,r,n)){if(r.type===a.RoadType.MULTIPOLYGON)for(var o=1;o<r.vertexes.length;o++)if(e.isPointInPolygon(t,r.vertexes[o],n))return e.projectPoint2PolygonEdge(t,r.vertexes[o],n);return[0,t]}var i=void 0;return r.type===a.RoadType.POLYGON?i=r.vertexes:r.type===a.RoadType.MULTIPOLYGON&&(i=r.vertexes[0]),e.projectPoint2Polygon(t,i,n)}},{key:"projectPoint2Polygon",value:function(t,r,n){return e.isPointInPolygon(t,r,n)?[0,e.formatPoint(t)]:e.projectPoint2PolygonEdge(t,r,n)}},{key:"projectPoint2PolygonEdge",value:function(t,r,n){var o=Number.MAX_VALUE,a=void 0,s=e.formatPolygon(r,n),c=e.formatPoint(t);if(!c||!s)return[o,a];for(var l=0,u=s.length-1;l<s.length;u=l++){var f=s[l],y=s[u],v=e.projectPoint2Segment(c,f,y);o>v[0]&&(o=v[0],a=v[1])}return[o=i.Numerical.toFixed(o,2),a]}},{key:"projectPoint2Path",value:function(t,r,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"region";t.z=r;for(var a=[],s=Number.MAX_VALUE,c=void 0,l=void 0,u=0;u<o.length;u++)if(r===o[u][i])if(o[u+1]&&o[u+1][i]===o[u][i]){var f=e.projectPoint2Segment(t,o[u],o[u+1]),y=n(f,2),v=y[0],h=y[1];v<s&&(c=h,s=v,a=[u,u+1])}else{var d=e.euclideanDistance(t,o[u]);d<s&&(s=d,l=void 0!==o[u].type?o[u].type:-1,c=o[u],a=[u])}else if("z"===i&&o[u+1]&&(r-o[u+1].z)*(r-o[u].z)<0){var p=e.projectPoint2Segment(t,o[u],o[u+1]),x=n(p,2),g=x[0],m=x[1];g<s&&g<12&&(c=m,s=g,a=[u,u+1])}return[s,c?{x:c.x,y:c.y,region:o[a[0]].region,z:o[a[0]].z,buildingCode:o[a[0]].buildingCode,type:l}:void 0,a]}},{key:"pathRouteDistance",value:function(t,r,n,o,i){n=parseInt(n),i=parseInt(i);var a=0===n?t[0]:e.projectPoint2Segment(r,t[n-1],t[n])[1],s=0===i?t[0]:e.projectPoint2Segment(o,t[i-1],t[i])[1],c=void 0;if(n===i)c=e.euclideanDistance(a,s);else if(n<i)if(a.z!==s.z)c=0;else{c=e.euclideanDistance(a,t[n])+e.euclideanDistance(s,t[i-1]);for(var l=n;l<i-1;l++)c+=e.euclideanDistance(t[l],t[l+1])}else if(a.z!==s.z)c=Number.MAX_VALUE;else{c=e.euclideanDistance(a,t[n-1])+e.euclideanDistance(s,t[i]);for(var u=i;u<n-1;u++)c+=e.euclideanDistance(t[u],t[u+1])}return[c,Math.abs(c-e.euclideanDistance(r,o))]}},{key:"checkAlongPath",value:function(t,r,n,o,i){return(n=parseInt(n))===(i=parseInt(i))?e.euclideanDistance(r,t[n])>=e.euclideanDistance(o,t[n]):n<i}}]),e}();t.Geometric=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.DPathFinding=function(e){var t=void 0,r=void 0,s=void 0,c=null,l=void 0,u={};function f(e){(t=e.mapIndex)&&0!==Object.keys(t).length||(t={"":0}),s=new a.FloorMapper(e.floor2ZMaps,e.z2FloorMaps);var n=i.RoadDataProcessor.buildVertices(e.connection),f=i.RoadDataProcessor.buildPathPlanRoads(e.roads);if(i.RoadDataProcessor.buildVerticeFactor(n,f),r=n,c=null,null,!1,l=f,u={},e.policy&&0!==Object.keys(e.policy).length)for(var y in t)u[t[y]/1e4]=e.policy;else if(e.policies&&0!==Object.keys(e.policies).length)for(var v in e.policies)u[t[v]/1e4]=e.policies[v];else for(var h in t)u[t[h]/1e4]={id:"least_distance",name:"推荐路线",changeFloorWaitCost:{lift:80},changeFloorFactor:{stairs:24,lift:8,escalator:8},reason:"舒适快捷"};void 0!==r&&((c=new o.EasyStar.js).setVertexDict(r),c.setIterationsPerCalculation(3e3),c.setChangeFloorCost(u))}function y(e){var t=void 0,r=0,n=void 0,o=void 0,i=void 0,a=void 0;for(t=1;t<e.length;++t)n=e[t-1],o=e[t],i=n.x-o.x,a=n.y-o.y,r+=Math.sqrt(i*i+a*a);return r}function v(e,t,n,o){if(void 0!==r){var i=c.findPath(e,t,n,o,l);return c.calculate(),{id:i,status:1}}setTimeout(function(){o({len:0,path:void 0},n)},0)}f(e),this.planPath=function(e,o,i,a){var u=0,f=[];function h(e,r){if(null!==e&&0!==e.length){for(var n=[],o=[{x:e[0].x,y:e[0].y,z:e[0].z,type:e[0].type,buildingMap:e[0].buildingMap}],i=(e[0].buildingMap,1);i<e.length;i++)e[i-1].z===e[i].z?o.push({x:e[i].x,y:e[i].y,z:e[i].z,type:e[i].type,buildingMap:e[i].buildingMap}):(n.push(o),(o=[]).push({x:e[i].x,y:e[i].y,z:e[i].z,type:e[i].type,buildingMap:e[i].buildingMap}));n.push(o);for(var c=0;c<n.length;c++){var l=n[c],v=l;u+=y(v),f=f.concat(v)}f=t?f.map(function(e){var r=function(e,t){for(var r in e)if(e[r]===t)return r}(t,e.buildingMap);return{x:e.x,y:e.y,region:s.regionMapDecode(r,e.z),z:e.z,type:e.type,buildingCode:r}}):f.map(function(e){return{x:e.x,y:e.y,region:e.z,type:e.type}}),a(r,{path:f,len:u})}else a(r,{path:e,len:0})}if("object"===n(e[0]))e.forEach(function(e){void 0===e.z&&void 0!==e.re&&(e.z=e.re),void 0===e.z&&void 0!==e.region&&(e.z=e.region),e.buildingCode=t[e.buildingCode]}),o.forEach(function(e){void 0===e.z&&void 0!==e.re&&(e.z=e.re),void 0===e.z&&void 0!==e.region&&(e.z=e.region),e.buildingCode=t[e.buildingCode]}),function(e,t,n,o){if(void 0===r)return void setTimeout(function(){o({len:0,path:void 0},n)},0);var i=c.findPath(e,t,n,o,l);c.calculate()}(e,o,i,h);else if(s)e={x:e[0],y:e[1],z:t[e[2]],buildingCode:t[e[3]]},o={x:o[0],y:o[1],z:t[o[2]],buildingCode:t[o[3]]},v(e,o,i,h);else{var d={x:d[0],y:d[1],z:d[2]},p={x:p[0],y:p[1],z:p[2]};v(d,p,i,h)}},this.cancelAllPath=function(){c.cancelAllPath(),!1},this.setData=f};var o=r(6),i=r(8),a=r(9)},function(e,t,r){"use strict";class n extends Error{constructor(e){super(e||"Promise was canceled"),this.name="CancelError"}get isCanceled(){return!0}}class o{static fn(e){return(...t)=>new o((r,n,o)=>{t.push(o),e(...t).then(r,n)})}constructor(e){this._cancelHandlers=[],this._isPending=!0,this._isCanceled=!1,this._rejectOnCancel=!0,this._promise=new Promise((t,r)=>{this._reject=r;const n=e=>{if(!this._isPending)throw new Error("The `onCancel` handler was attached after the promise settled.");this._cancelHandlers.push(e)};return Object.defineProperties(n,{shouldReject:{get:()=>this._rejectOnCancel,set:e=>{this._rejectOnCancel=e}}}),e(e=>{this._isPending=!1,t(e)},e=>{this._isPending=!1,r(e)},n)})}then(e,t){return this._promise.then(e,t)}catch(e){return this._promise.catch(e)}finally(e){return this._promise.finally(e)}cancel(e){if(this._isPending&&!this._isCanceled){if(this._cancelHandlers.length>0)try{for(const e of this._cancelHandlers)e()}catch(e){this._reject(e)}this._isCanceled=!0,this._rejectOnCancel&&this._reject(new n(e))}}get isCanceled(){return this._isCanceled}}Object.setPrototypeOf(o.prototype,Promise.prototype),e.exports=o,e.exports.CancelError=n},function(e,t,r){"use strict";r.r(t),r.d(t,"create",function(){return c}),r.d(t,"planPath",function(){return l}),r.d(t,"cancelAllPath",function(){return u});var n=r(3),o=r(4),i=r.n(o);let a=void 0,s=void 0;function c(e){a=new n.DPathFinding(e)}function l(e,t,r){return s&&(s.cancel(),s=void 0,a.cancelAllPath()),s=new i.a((n,o,i)=>{try{a.planPath(e,t,r,function(e,t){n({status:0,param:e,pathInfo:t})})}catch(e){n({status:1,param:null,pathInfo:null})}})}function u(){a.cancelAllPath()}addEventListener("message",function(e){var r,n=e.data,o=n.type,i=n.method,a=n.id,s=n.params;"RPC"===o&&i&&((r=t[i])?Promise.resolve().then(function(){return r.apply(t,s)}):Promise.reject("No such method")).then(function(e){postMessage({type:"RPC",id:a,result:e})}).catch(function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:a,error:t})})}),postMessage({type:"RPC",method:"ready"})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EasyStar=void 0;"function"==typeof Symbol&&Symbol.iterator;var n,o=r(0),i=r(2),a=r(1),s=(n=a)&&n.__esModule?n:{default:n};var c=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}return r.m=e,r.c=t,r.p="",r(0)}([function(e,t,r){var n={},i=r(1),a=r(2),c=r(3);e.exports=n;var u=1;n.js=function(){var e=void 0,t={},r=[],n={},f=Number.MAX_VALUE,y={};this.setVertexDict=function(e){y=e},this.setIterationsPerCalculation=function(e){f=e},this.setChangeFloorCost=function(e){n=e},this.findPath=function(e,f,v,h,d){Array.isArray(e)||(e=[e]),Array.isArray(f)||(f=[f]);var p=function(e){setTimeout(function(){h(e,v)})},x=!0,m=!1,b=void 0;try{for(var P,M=e[Symbol.iterator]();!(x=(P=M.next()).done);x=!0){var z=P.value,w=!0,F=!1,D=void 0;try{for(var S,O=f[Symbol.iterator]();!(w=(S=O.next()).done);w=!0){var k=S.value;if(z.x===k.x&&z.y===k.y&&z.z===k.z)return void p([])}}catch(e){F=!0,D=e}finally{try{!w&&O.return&&O.return()}finally{if(F)throw D}}}}catch(e){m=!0,b=e}finally{try{!x&&M.return&&M.return()}finally{if(m)throw b}}var I=[],_=!0,C=!1,j=void 0;try{for(var L,R=e[Symbol.iterator]();!(_=(L=R.next()).done);_=!0){var T=L.value,E=new o.Point(T.x,T.y,T.z);I.push(E)}}catch(e){C=!0,j=e}finally{try{!_&&R.return&&R.return()}finally{if(C)throw j}}var A=[],G=!0,N=!1,H=void 0;try{for(var V,W=f[Symbol.iterator]();!(G=(V=W.next()).done);G=!0){var U=V.value,Y=new o.Point(U.x,U.y,U.z);A.push(Y)}}catch(e){N=!0,H=e}finally{try{!G&&W.return&&W.return()}finally{if(N)throw H}}var B=new i;B.openList=new c(function(e,t){return e.bestGuessDistance()-t.bestGuessDistance()}),B.extraWillingCost=v.extraWillingCost||1e4,B.isDoneCalculating=!1,B.nodeHash={},B.startPts=I,B.endPts=A,B.findType=v.type,B.spProjection=void 0===v.spProjection||v.spProjection,B.epProjection=void 0===v.epProjection||v.epProjection,B.callback=p,B.preference=v.preference||"",B.changeFloorCost=n||{},B.startKeys=[],B.endKeys=[],B.changeFloorExtraCost=v.changeFloorExtraCost||0,B.startBuilding=e[0].buildingCode,B.endBuilding=f[0].buildingCode,B.vertexDict=(0,s.default)(y),B.copyInd=5e5,B.copyIndMap={},B.transType={},l(B,I,A,d,y);var q=!0,Z=!1,K=void 0;try{for(var X,J=B.startKeys[Symbol.iterator]();!(q=(X=J.next()).done);q=!0){var Q=X.value,$=new a(Q,0,g(B,Q));B.openList.push($),B.costSoFar[Q]=0,B.cameFrom[Q]=void 0}}catch(e){Z=!0,K=e}finally{try{!q&&J.return&&J.return()}finally{if(Z)throw K}}var ee=u++;return t[ee]=B,r.push(ee),ee},this.cancelPath=function(e){return e in t&&(delete t[e],!0)},this.cancelAllPath=function(){for(var e in t)delete t[e]},this.calculate=function(){if(0!==r.length)for(;;)for(e=0;e<f;e++){if(0===r.length)return;0;var n=r[0],o=t[n];if(void 0!==o)if(0!==o.openList.size()&&0!==o.startKeys.length&&0!==o.endKeys.length){var i=o.openList.pop().key,a=parseInt(i/1e4);if(a<0&&(a=0),i>5e5&&(a=parseInt(o.copyIndMap[i]/1e4)),i<-1e3&&i>-1e4){for(var s=[],c=null;void 0!==i;){var l=o.vertexDict[i],u=i-i%1e4;i>5e5&&(u=o.copyIndMap[i]-o.copyIndMap[i]%1e4);var y={x:l.x,y:l.y,z:l.z,type:v(o,i),buildingMap:u};(i>-1e3||i>-11e3&&i<-1e4)&&i<0?y.buildingMap=o.startBuilding:i<0&&(y.buildingMap=o.endBuilding),null!==c&&Math.abs(l.x-c.x)<1e-7&&Math.abs(l.y-c.y)<1e-7&&0===Math.abs(l.re-c.z)&&u===s[s.length-1].buildingMap&&s.pop(),s.push(y),null!==c&&c.type===y.type&&3===y.type&&s.pop(),i=o.cameFrom[i],c=y}s.reverse();var h=s;o.callback(h),delete t[n],r.shift()}else{var p=o.vertexDict[i];if(void 0!==p.ne&&null!==p.ne){var x=!0,g=!1,m=void 0;try{for(var b,P=p.ne[Symbol.iterator]();!(x=(b=P.next()).done);x=!0){var M=b.value,z=o.vertexDict[M];if(p.z===z.z){if(void 0===o.changeFloorCost[a].changeFloorFactor.stairs&&o.vertexDict[i].special){var w=0;for(var F in p.special.ne)if(p.special.ne[F]===M&&JSON.stringify(p.special.type[F])===JSON.stringify([6])){w=1;break}if(1===w)continue}d(o,i,M,0,"")}else void 0!==p.type&&(""===o.preference||"default"===o.preference?-1===o.findType||p.type.includes(0)?d(o,i,M,0,""):p.type.includes(o.findType)?d(o,i,M,0,""):d(o,i,M,o.extraWillingCost,""):(p.type.includes(0)&&d(o,i,M,0,"1",0,0,0),p.type.includes(3)&&void 0!==o.changeFloorCost[a].changeFloorFactor.lift&&(o.changeFloorCost[a].changeFloorWaitCost?d(o,i,M,0,"1",o.changeFloorCost[a].changeFloorFactor.lift,o.changeFloorCost[a].changeFloorWaitCost.lift,3):d(o,i,M,0,"1",o.changeFloorCost[a].changeFloorFactor.lift,0,3)),p.type.includes(6)&&void 0!==o.changeFloorCost[a].changeFloorFactor.stairs&&d(o,i,M,0,"1",o.changeFloorCost[a].changeFloorFactor.stairs,0,6),p.type.includes(1024)&&void 0!==o.changeFloorCost[a].changeFloorFactor.escalator&&d(o,i,M,0,"1",o.changeFloorCost[a].changeFloorFactor.escalator,0,1024),p.type.includes(1)&&void 0!==o.changeFloorCost[a].changeFloorFactor.slope&&d(o,i,M,0,"1",o.changeFloorCost[a].changeFloorFactor.slope,0,1)))}}catch(e){g=!0,m=e}finally{try{!x&&P.return&&P.return()}finally{if(g)throw m}}}}}else o.callback(null),delete t[n],r.shift();else r.shift()}}}},function(e,t){e.exports=function(){this.callback,this.openList,this.cameFrom={},this.costSoFar={}}},function(e,t){e.exports=function(e,t,r){this.key=e,this.costSoFar=t,this.simpleDistanceToTarget=r,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}}},function(e,t,r){e.exports=r(4)},function(e,t,r){var n,o,i;(function(){var r,a,s,c,l,u,f,y,v,h,d,p,x,g,m;s=Math.floor,h=Math.min,a=function(e,t){return e<t?-1:e>t?1:0},v=function(e,t,r,n,o){var i=void 0;if(null==r&&(r=0),null==o&&(o=a),r<0)throw new Error("lo must be non-negative");for(null==n&&(n=e.length);r<n;)o(t,e[i=s((r+n)/2)])<0?n=i:r=i+1;return[].splice.apply(e,[r,r-r].concat(t)),t},u=function(e,t,r){return null==r&&(r=a),e.push(t),g(e,0,e.length-1,r)},l=function(e,t){var r,n;return null==t&&(t=a),r=e.pop(),e.length?(n=e[0],e[0]=r,m(e,0,t)):n=r,n},y=function(e,t,r){var n;return null==r&&(r=a),n=e[0],e[0]=t,m(e,0,r),n},f=function(e,t,r){var n;return null==r&&(r=a),e.length&&r(e[0],t)<0&&(t=(n=[e[0],t])[0],e[0]=n[1],m(e,0,r)),t},c=function(e,t){var r,n,o,i,c,l;for(null==t&&(t=a),c=[],n=0,o=(i=function(){l=[];for(var t=0,r=s(e.length/2);0<=r?t<r:t>r;0<=r?t++:t--)l.push(t);return l}.apply(this).reverse()).length;n<o;n++)r=i[n],c.push(m(e,r,t));return c},x=function(e,t,r){var n;if(null==r&&(r=a),-1!==(n=e.indexOf(t)))return g(e,0,n,r),m(e,n,r)},d=function(e,t,r){var n,o,i,s,l;if(null==r&&(r=a),!(o=e.slice(0,t)).length)return o;for(c(o,r),i=0,s=(l=e.slice(t)).length;i<s;i++)n=l[i],f(o,n,r);return o.sort(r).reverse()},p=function(e,t,r){var n,o,i,s,u,f,y,d,p;if(null==r&&(r=a),10*t<=e.length){if(!(i=e.slice(0,t).sort(r)).length)return i;for(o=i[i.length-1],s=0,f=(y=e.slice(t)).length;s<f;s++)r(n=y[s],o)<0&&(v(i,n,0,null,r),i.pop(),o=i[i.length-1]);return i}for(c(e,r),p=[],u=0,d=h(t,e.length);0<=d?u<d:u>d;0<=d?++u:--u)p.push(l(e,r));return p},g=function(e,t,r,n){var o,i,s;for(null==n&&(n=a),o=e[r];r>t&&n(o,i=e[s=r-1>>1])<0;)e[r]=i,r=s;return e[r]=o},m=function(e,t,r){var n,o,i,s,c;for(null==r&&(r=a),o=e.length,c=t,i=e[t],n=2*t+1;n<o;)(s=n+1)<o&&!(r(e[n],e[s])<0)&&(n=s),e[t]=e[n],n=2*(t=n)+1;return e[t]=i,g(e,c,t,r)},r=function(){function e(e){this.cmp=null!=e?e:a,this.nodes=[]}return e.push=u,e.pop=l,e.replace=y,e.pushpop=f,e.heapify=c,e.updateItem=x,e.nlargest=d,e.nsmallest=p,e.prototype.push=function(e){return u(this.nodes,e,this.cmp)},e.prototype.pop=function(){return l(this.nodes,this.cmp)},e.prototype.peek=function(){return this.nodes[0]},e.prototype.contains=function(e){return-1!==this.nodes.indexOf(e)},e.prototype.replace=function(e){return y(this.nodes,e,this.cmp)},e.prototype.pushpop=function(e){return f(this.nodes,e,this.cmp)},e.prototype.heapify=function(){return c(this.nodes,this.cmp)},e.prototype.updateItem=function(e){return x(this.nodes,e,this.cmp)},e.prototype.clear=function(){return this.nodes=[]},e.prototype.empty=function(){return 0===this.nodes.length},e.prototype.size=function(){return this.nodes.length},e.prototype.clone=function(){var t;return(t=new e).nodes=this.nodes.slice(0),t},e.prototype.toArray=function(){return this.nodes.slice(0)},e.prototype.insert=e.prototype.push,e.prototype.top=e.prototype.peek,e.prototype.front=e.prototype.peek,e.prototype.has=e.prototype.contains,e.prototype.copy=e.prototype.clone,e}(),o=[],void 0===(i="function"==typeof(n=function(){return r})?n.apply(t,o):n)||(e.exports=i)}).call(this)}]),l=function(e,t,r,n,o){var i=[],a=-1,s=!0,c=!1,l=void 0;try{for(var u,v=t[Symbol.iterator]();!(s=(u=v.next()).done);s=!0){var h=u.value,d=f(e,h,a,n,o);null!=d&&(i.push(d),e.startKeys.push(a),a-=1)}}catch(e){c=!0,l=e}finally{try{!s&&v.return&&v.return()}finally{if(c)throw l}}var p=[],x=-1001,g=!0,m=!1,b=void 0;try{for(var P,M=r[Symbol.iterator]();!(g=(P=M.next()).done);g=!0){var z=P.value,w=y(e,z,x,n,o);null!=w&&(p.push(w),e.endKeys.push(x),x-=1)}}catch(e){m=!0,b=e}finally{try{!g&&M.return&&M.return()}finally{if(m)throw b}}var F=!0,D=!1,S=void 0;try{for(var O,k=i[Symbol.iterator]();!(F=(O=k.next()).done);F=!0){var I=O.value,_=!0,C=!1,j=void 0;try{for(var L,R=p[Symbol.iterator]();!(_=(L=R.next()).done);_=!0){var T=L.value;if(I.road===T.road)if(I.road.hasWidth)I.road.isValidLine(I.intersection,T.intersection,o)&&e.vertexDict[I.key].ne.push(T.key);else{var E=[T.intersection.x-I.intersection.x,T.intersection.y-I.intersection.y],A=o[I.road.intersections[0]],G=o[I.road.intersections[I.road.intersections.length-1]],N=[G.x-A.x,G.y-A.y];I.road.isOneWay&&Math.sqrt(E[0]*E[0]+E[1]*E[1])<1e-5?e.vertexDict[I.key].ne.push.apply(e.vertexDict[I.key].ne,e.vertexDict[T.key].ne):(!I.road.isOneWay||E[0]*N[0]+E[1]*N[1]>0)&&e.vertexDict[I.key].ne.push(T.key)}}}catch(e){C=!0,j=e}finally{try{!_&&R.return&&R.return()}finally{if(C)throw j}}}}catch(e){D=!0,S=e}finally{try{!F&&k.return&&k.return()}finally{if(D)throw S}}},u=function(e,t,r,n){if(void 0===t[e.z])return null;var o=void 0,a=void 0,s=Number.MAX_VALUE,c=!0,l=!1,u=void 0;try{for(var f,y=t[e.z][Symbol.iterator]();!(c=(f=y.next()).done);c=!0){var v=f.value;if(""===n||!(v.vertexes[0]<n||v.vertexes[0]>n+1e4||v.vertexes[0][0]<n||v.vertexes[0][0]>n+1e4)){var h=i.Geometric.projectPoint2Road(e,v,r);h[0]<s&&(o=v,a=h[1],s=h[0])}}}catch(e){l=!0,u=e}finally{try{!c&&y.return&&y.return()}finally{if(l)throw u}}return void 0===o?null:{road:o,intersection:a,dmin:s}},f=function(e,t,r,n,i){var a=u(t,n,i,e.startBuilding);if(null===a)return null;var s=[];if(a.road.hasWidth){var c=void 0;switch(a.road.type){case o.RoadType.MULTIPOLYGON:var l=a.road.intersections,f=!0,y=!1,v=void 0;try{for(var h,d=a.road.vertexes[Symbol.iterator]();!(f=(h=d.next()).done);f=!0){var p=h.value;l=l.concat(p)}}catch(e){y=!0,v=e}finally{try{!f&&d.return&&d.return()}finally{if(y)throw v}}c=new Set(l);break;default:c=new Set(a.road.intersections.concat(a.road.vertexes))}var x=!0,g=!1,m=void 0;try{for(var b,P=c[Symbol.iterator]();!(x=(b=P.next()).done);x=!0){var M=b.value;a.road.isValidLine(a.intersection,i[M],i)&&s.push(M)}}catch(e){g=!0,m=e}finally{try{!x&&P.return&&P.return()}finally{if(g)throw m}}}else a.road.isOneWay?s.push(a.road.intersections[a.road.intersections.length-1]):s=a.road.intersections.concat();var z=r;return e.spProjection&&a.dmin>1e-7&&(z-=1e4,e.vertexDict[r]={x:t.x,y:t.y,z:t.z,ne:[z],factor:a.road.factor}),e.vertexDict[z]={x:a.intersection.x,y:a.intersection.y,z:a.intersection.z,ne:s,factor:a.road.factor},a.key=z,a},y=function(e,t,r,n,i){var a=u(t,n,i,e.endBuilding);if(null===a)return null;var s=!e.epProjection||a.dmin<1e-7?r:r-1e4;if(a.key=s,e.vertexDict[s]={x:a.intersection.x,y:a.intersection.y,z:a.intersection.z,ne:[],factor:a.road.factor},s!==r&&(e.vertexDict[s].ne.push(r),e.vertexDict[r]={x:t.x,y:t.y,z:t.z,ne:[],factor:a.road.factor}),a.road.hasWidth){var c=void 0;switch(a.road.type){case o.RoadType.MULTIPOLYGON:var l=a.road.intersections,f=!0,y=!1,v=void 0;try{for(var h,d=a.road.vertexes[Symbol.iterator]();!(f=(h=d.next()).done);f=!0){var p=h.value;l=l.concat(p)}}catch(e){y=!0,v=e}finally{try{!f&&d.return&&d.return()}finally{if(y)throw v}}c=new Set(l);break;default:c=new Set(a.road.intersections.concat(a.road.vertexes))}var x=!0,g=!1,m=void 0;try{for(var b,P=c[Symbol.iterator]();!(x=(b=P.next()).done);x=!0){var M=b.value;a.road.isValidLine(a.intersection,i[M],i)&&e.vertexDict[M].ne.push(s)}}catch(e){g=!0,m=e}finally{try{!x&&P.return&&P.return()}finally{if(g)throw m}}}else if(a.road.isOneWay)e.vertexDict[a.road.intersections[0]].ne.push(s),e.vertexDict[a.road.intersections[0]].x===e.vertexDict[s].x&&e.vertexDict[a.road.intersections[0]].y===e.vertexDict[s].y&&e.vertexDict[a.road.intersections[1]].ne.push(s);else{var z=!0,w=!1,F=void 0;try{for(var D,S=a.road.intersections[Symbol.iterator]();!(z=(D=S.next()).done);z=!0){var O=D.value;e.vertexDict[O].ne.push(s)}}catch(e){w=!0,F=e}finally{try{!z&&S.return&&S.return()}finally{if(w)throw F}}}return a},v=function(e,t){if(e.transType[t])return e.transType[t]},h=function(e,t,r){this.key=e,this.costSoFar=t,this.simpleDistanceToTarget=r,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}},d=function(e,t,r,n,o,i,a,s){var c=void 0;""===o||"default"===o?c=p(e,t,r,n):(3===s&&(e.copyIndMap[r]?r=e.copyIndMap[r]:(e.copyInd+=1,e.copyIndMap[e.copyInd]=r,e.copyIndMap[r]=e.copyInd,e.vertexDict[e.copyInd]=e.vertexDict[r],r=e.copyInd)),t>5e5&&(a=0),c=x(e,t,r,i,a,s)),void 0===e.costSoFar[r]?(e.openList.push(c),e.costSoFar[r]=c.costSoFar,e.cameFrom[r]=t,e.transType[r]=s):c.costSoFar<e.costSoFar[r]&&(e.openList.updateItem(c),e.costSoFar[r]=c.costSoFar,e.cameFrom[r]=t,e.transType[r]=s)},p=function(e,t,r,n){var o=g(e,r),i=e.vertexDict[t],a=e.vertexDict[r],s=i.cost||0,c=Math.sqrt(Math.pow(i.x-a.x,2)+Math.pow(i.y-a.y,2)+Math.pow(i.z-a.z,2)),l=i.factor[r]||1;t<0&&(l=i.factor),r<0&&(l=a.factor);var u=e.costSoFar[t]+n*Math.abs(i.z-a.z)+c*l+s+e.changeFloorExtraCost;return void 0!==e.nodeHash[r]?(e.nodeHash[r].costSoFar>u&&(e.nodeHash[r].costSoFar=u),e.nodeHash[r]):(e.nodeHash[r]=new h(r,u,o),e.nodeHash[r])},x=function(e,t,r,n,o,i){void 0===n&&(n=1),void 0===o&&(o=0);var a=g(e,r),s=e.vertexDict[t],c=e.vertexDict[r],l=s.cost||0;l&&t>5e5&&(l=0);var u=Math.abs(s.z-c.z);0===i&&(u=0);var f=e.costSoFar[t]+(u*n+o)+e.changeFloorExtraCost+l;return void 0!==e.nodeHash[r]?(e.nodeHash[r].costSoFar>f&&(e.nodeHash[r].costSoFar=f),e.nodeHash[r]):(e.nodeHash[r]=new h(r,f,a),e.nodeHash[r])},g=function(e,t){var r=Number.MAX_VALUE,n=!0,o=!1,i=void 0;try{for(var a,s=e.endKeys[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var c=a.value,l=m(e,t,c);r=r<l?r:l}}catch(e){o=!0,i=e}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r},m=function(e,t,r){var n=e.vertexDict[t],o=e.vertexDict[r],i=Math.abs(n.x-o.x),a=Math.abs(n.y-o.y),s=Math.abs(n.z-o.z);return Math.sqrt(i*i+a*a+s*s)};t.EasyStar=c},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)};n.toFixed=function(e,t){var r=0;try{r=e.toFixed(t)}catch(e){}return parseFloat(r)},n.RAD2DEG=180/Math.PI,n.DEG2RAD=Math.PI/180,n.rad2deg=function(e){return(e*n.RAD2DEG).toFixed(1)},n.deg2rad=function(e){return(e*n.DEG2RAD).toFixed(3)},t.Numerical=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RoadDataProcessor=void 0;var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0);var i=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._vertices=e.buildVertices(t),this._pathPlanRoads=e.buildPathPlanRoads(r),e.buildVerticeFactor(this._vertices,this._pathPlanRoads),this._hmmRoads=e.buildHmmRoads(r),this._shortestDist=e.buildShortestDist(r)}return n(e,[{key:"getHMMInfo",value:function(){return[this._vertices,this._hmmRoads,this._shortestDist]}},{key:"getPathPlanInfo",value:function(){return[this._vertices,this._pathPlanRoads]}}],[{key:"buildVertices",value:function(e){var t=[];for(var r in e){var n=e[r];t[r]=new o.Point(n.x,n.y,n.re,n.ne,n.type,n.cost,n.factor,n.special)}return t}},{key:"buildPathPlanRoads",value:function(e){var t=e.roads,r=[];for(var n in t){r[n]=[];var i=!0,a=!1,s=void 0;try{for(var c,l=t[n][Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value;r[n].push(new o.Road(u.one_way,u.vertexes,u.intersections,u.factor))}}catch(e){a=!0,s=e}finally{try{!i&&l.return&&l.return()}finally{if(a)throw s}}}return r}},{key:"buildVerticeFactor",value:function(e,t){for(var r in t){var n=t[r],i=!0,a=!1,s=void 0;try{for(var c,l=n[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value;if(u.type===o.RoadType.LINE)for(var f=1;f<u.vertexes.length;f++){var y=u.vertexes[f-1],v=u.vertexes[f];e[y].factor[v]=u.factor,u.isOneWay||(e[v].factor[y]=u.factor)}else if(1!==u.factor){var h=void 0;switch(u.type){case o.RoadType.MULTIPOLYGON:var d=u.intersections,p=!0,x=!1,g=void 0;try{for(var m,b=u.vertexes[Symbol.iterator]();!(p=(m=b.next()).done);p=!0){var P=m.value;d=d.concat(P)}}catch(e){x=!0,g=e}finally{try{!p&&b.return&&b.return()}finally{if(x)throw g}}h=new Set(d);break;default:h=new Set(u.intersections.concat(u.vertexes))}var M=!0,z=!1,w=void 0;try{for(var F,D=h[Symbol.iterator]();!(M=(F=D.next()).done);M=!0){var S=F.value,O=!0,k=!1,I=void 0;try{for(var _,C=h[Symbol.iterator]();!(O=(_=C.next()).done);O=!0){var j=_.value;e[S].factor[j]=u.factor}}catch(e){k=!0,I=e}finally{try{!O&&C.return&&C.return()}finally{if(k)throw I}}}}catch(e){z=!0,w=e}finally{try{!M&&D.return&&D.return()}finally{if(z)throw w}}}}}catch(e){a=!0,s=e}finally{try{!i&&l.return&&l.return()}finally{if(a)throw s}}}}},{key:"buildHmmRoads",value:function(e){var t=e.roads,r=[];for(var n in t){r[n]=[];var i=!0,a=!1,s=void 0;try{for(var c,l=t[n][Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value;r[n].push(new o.Road(!0,u.vertexes,u.intersections,u.factor,u.buildingCode)),2===u.vertexes.length&&u.vertexes[0].constructor!==Array&&r[n].push(new o.Road(u.one_way,u.vertexes.slice().reverse(),void 0,u.buildingCode))}}catch(e){a=!0,s=e}finally{try{!i&&l.return&&l.return()}finally{if(a)throw s}}}return r}},{key:"buildShortestDist",value:function(e){return e.shortestDistance}}]),e}();t.RoadDataProcessor=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FloorMapper=void 0;var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(10),a=r(1),s=(n=a)&&n.__esModule?n:{default:n};var c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.floor2ZMaps=t,this.z2FloorMaps=r,this.currIndexing=-1e4,this.mapIndex={},this.createBasicMap()}return o(e,[{key:"createBasicMap",value:function(){for(var e in this.height2FloorMap={},this.floor2HeightMap={},i.HEIGHT)this.height2FloorMap[i.HEIGHT[e]]=i.FLOOR[e],this.floor2HeightMap[i.FLOOR[e]]=i.HEIGHT[e]}},{key:"regionMapDecode",value:function(e,t){return this.mapZ2Region(e,t)}},{key:"mapZ2Region",value:function(e,t){if(this.z2FloorMaps[e]){var r=this.z2FloorMaps[e][t];return void 0===r?t:r}return t}},{key:"regionMapEncode",value:function(e,t){return this.mapRegion2Z(t,e)}},{key:"mapRegion2Z",value:function(e,t){if(this.floor2ZMaps[e]){var r=this.floor2ZMaps[e][t];return void 0===r?t:r}return t}},{key:"getMapIndex",value:function(){return this.mapIndex}},{key:"loadMapping",value:function(e,t){if(this.currIndexing+=1e4,this.mapIndex[t]=this.currIndexing,void 0!==e[0].z){var r=(0,s.default)(this.floor2HeightMap),n=(0,s.default)(this.height2FloorMap),o=!0,i=!1,a=void 0;try{for(var c,l=e[Symbol.iterator]();!(o=(c=l.next()).done);o=!0){var u=c.value;r[u.region]=u.z,n[u.z]=u.region}}catch(e){i=!0,a=e}finally{try{!o&&l.return&&l.return()}finally{if(i)throw a}}this.floor2ZMaps[t]=r,this.z2FloorMaps[t]=n}}}]),e}();t.FloorMapper=c},function(e,t,r){"use strict";r.r(t),r.d(t,"FLOOR",function(){return o}),r.d(t,"HEIGHT",function(){return n});const n={NULL:-1e4,LIFTS:-10001,STAIRS:-10002,ELEVATOR:-10003},o={LIFTS:-1,STAIRS:-2,ELEVATOR:-3,NULL:-4}}]);\n//# sourceMappingURL=workerize.worker.js.map'])),{
                name: "workerize.worker.js"
            });
            return n(t, r),
            t
        }
    }
    , function(t, e) {   //添加事件
        t.exports = function(t, e) {
            var i = 0
              , n = {};
            t.addEventListener("message", function(e) {
                var i = e.data;
                if ("RPC" === i.type)
                    if (i.id) {
                        var r = n[i.id];
                        r && (delete n[i.id],
                        i.error ? r[1](Object.assign(Error(i.error.message), i.error)) : r[0](i.result))
                    } else {
                        var s = document.createEvent("Event");
                        s.initEvent(i.method, !1, !1),
                        s.data = i.params,
                        t.dispatchEvent(s)
                    }
            }),
            e.forEach(function(e) {
                t[e] = function() {
                    var r = arguments;
                    return new Promise(function(s, o) {
                        var a = ++i;
                        n[a] = [s, o],
                        t.postMessage({
                            type: "RPC",
                            id: a,
                            method: e,
                            params: [].slice.call(r)
                        })
                    }
                    )
                }
            })
        }
    }
    ])
});
//# sourceMappingURL=se.js.map
