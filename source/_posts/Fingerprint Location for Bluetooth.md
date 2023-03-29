---
title: Fingerprint Location for Bluetooth 
date: 2021-05-04 21:11:42
categories: Bluetooth
tags:
    - Bluetooth
    - GEO Location
---



Recently, I found a source code about Bluetooth positioning and navigation. Through its analysis and research, I have a deep understanding of the positioning and navigation process of the entire Bluetooth algorithm. Learn about Bluetooth signal acquisition, distance estimation, positioning calculation, Kalman model and other aspects.

<!-- more -->


### structure 

LocationEngine core modules include: model manager, Bluetooth locator, geo-locator, motion detector, area monitor and other modules.

```
                i.modelManager = new T.ModelManager(t), 
                i.roadNetData = new d.RoadNetData(t),  
                i.navProcessor = new g.NavigationProcessor(t), 
                i.bluetoothLocator = new l.BluetoothLocator(t), 
                i.geoLocator = new c.GeoLocator(t), 
                i.motionDetector = new u.MotionDetector(t), 
                i.areaChecker = new f.AreaChecker(t), 
```

 - ModelManager: Model manager.
 - RoadNetData: configuration-based road network data.
 - NavigationProcessor: Navigation processor.
 - BluetoothLocator: Bluetooth locator.
 - MotionDetector: Motion detector.
 
 ### Bluetooth Locator
 
Locator initialization, default parameter settings and Bluetooth configuration information settings.

 - set default parameters.
 
```
                value: function(t) {
                    t || (t = {}),
                    this.REC_INTERVAL = t.RecInterval ? t.RecInterval : 5e3,
                    this.QUERY_INTERVAL = t.QueryInterval ? t.QueryInterval : 2e3,
                    this.Z_CHECK_INTERVAL = t.ZCheckInterval ? t.ZCheckInterval : 3e3,
                    this.ZInitTimeout = t.ZInitTimeout ? t.ZInitTimeout : 3e3,
                    this.deviceType = void 0 !== t.deviceType ? t.deviceType : s.CONSTANTS.DEVICE.ANDROID
                }
```

- Configure Bluetooth beacons.
 
```
                key: "addAps",
                value: function(t) {
                    t && (t.forEach(function(t) {
                        void 0 === t.z && (t.z = t.re),
                        t.rssiList = []
                    }),
                    this._aps = this._aps.concat(t))
                }
```

- By obtaining the Bluetooth signal data, LocationEngine calls the bluetoothLocator.updateBeacons() method to calculate the location.

```
var n = this.bluetoothLocator.updateBeacons(i, t.value, this.posMode, this.isIndoor, this.kfPos)
```

 - Filter non-Bluetooth configuration beacons and invalid rssi signals, and update the Bluetooth beacon signal queue.
```
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
``` 
 
 - Get the current Bluetooth beacon, sort according to the signal strength, and set the Bluetooth beacon information strength.
 
```
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
```
 
 - Filter the beacons whose distance between the beacon position and the last beacon position is greater than 100, and the time is greater than 2s.
 
```
 h = (a = a.filter(function(t) {
                return !s || r.LocationUtils.distance(s, t) <= 100 
            })).filter(function(e) {
                return t - e.timestamp < o.QUERY_INTERVAL
            })
```
 
 -  The filtered Bluetooth signals are sorted, and the first 5 are selected for weight and calculation, and the x and y position information is calculated according to the weight of the Bluetooth beacon.
 
```
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
                  , c = t.calNearAPCount(a, o, r, s
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
                    z: parseFloat(i), //
                    c: l, 
                    p: c, 
                    s: u, 
                    m: f 
                }
            }
```
### Motion Detector

- LocationEngine update accelerometer mode.

```
    key: "updateAccSensorMode", 
    value: function() {
        this.motionDetector ? this.accSensorStatus = this.motionDetector.getAccSensorStatus() : this.accSensorStatus = P.CONSTANTS.ACC_SENSOR_STATUS.EMPTY
    }
```
 - Set accelerometer mode according to accelerometer frequency.
 
```
    key: "checkAccSensorMode", 
    value: function(t) {
        t - this.startTime < this.gravityTimeLen || (this.gravityList && 0 === this.gravityList.length && (this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.EMPTY),
        this.accCompBuffer.reduce(function(t, e) {
            return t + e
        }, 0) / this.accCompBufferLen > 9 && (this.accFreq = 1e3 * this.gravityList.length / this.gravityTimeLen,
        this.accFreq < 13 ? this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.LOW_FREQ : this.accFreq >= 22 && (this.accSensorStatus = o.CONSTANTS.ACC_SENSOR_STATUS.NORMAL)))
    }
```

 -  By obtaining the compass data, LocationEngine calls the motionDetector.updateHeading() method and passes in the angle value of the current device.

```
   key: "updateHeading", 
                value: function(t) {
                    this.headingChange = this.headingFlag ? t.value.heading - this.headingDeg : 0,
                    this.headingDeg = t.value.heading, 
                    this.motionDetector.updateHeading(t.timestamp, t.value.heading),
                    this.headingFlag = !0
                }
```

 - LocationEngine calls the motionDetector.detectMotion() method to process the acceleration data.
 
```
 key: "updateAcc", 
    var n = this.motionDetector.detectMotion(t, e, i);  
```

 -  By analyzing and processing the motion state of the device, the number of steps, step length, mobile phone posture, motion state, etc. are obtained.
 
```
 this.motionResult = Object.assign({
                        t: t,  
                        stepDetected: a, 
                        step: h,
                        phonePlacement: this.phonePlacement,
                        motionState: this.motionState 
                    }, l  )
```

- step counting
```
  key: "detectStep", 
                value: function(t, e, i) {
                    var n = !1; 
                    return 0 !== this.peakTime   
                                && this.peakValleyPair.pvDiff > this.PeakValleyTh 
                                && t - this.peakTime > this.MinPeakInterval 
                                && this.peakTime - this.stepTime > this.MinStepInterval 
                                && (this.stepTime = this.peakTime,
                                       this.stepCount += 1,
                                       this.saver && 
                                       this.saver.saveStepResult(this.stepTime, this.peakValleyPair.peak, this.peakValleyPair.valley, this.PeakValleyTh),
                                       n = !0),
                                e < this.valleyValue 
                                && (this.valleyValue = e,this.valleyTime = t),
                               this.validValleyValue = t - this.lastValleyVTime < 2 * this.MinStepInterval 
                                    && this.lastValleyVTime > this.stepTime 
                                    && this.lastValleyValue < this.valleyValue ? this.lastValleyValue : this.valleyValue,
                               0 !== i && 1 === this.detectPeak(t, e, i)  
                                     && i - this.validValleyValue > 1.3 
                                     && (this.saver && this.saver.savePeakResult(t, i, this.validValleyValue, i - this.validValleyValue), //
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
                              t - this.peakTime <= this.MinPeakInterval 
                                 && i > this.peakValleyPair.peak && (this.peakTime = t,
                                        this.validValleyValue = this.validValleyValue < this.peakValleyPair.valley ? this.validValleyValue : this.peakValleyPair.valley,
                                        this.peakValleyPair = {
                                             peak: i,
                                             valley: this.validValleyValue,
                                             pvDiff: i - this.validValleyValue
                                })),
                             n
                }
```

### Model Manager

 - Kalman filter model setting parameters。
```
    i.pdrKf = new o.KalmanFilterPDR(i.t,a.KF_TYPE.PDR_WLK,t.deviceType,t.params),
    i.diffKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_WLK,t.deviceType,t.params),
    i.baseKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_BASE,t.deviceType,t.params),
    i.drvKf = new s.KalmanFilterDiffHeading(i.t,a.KF_TYPE.DIFF_DRV,t.deviceType,t.params),
```

- When the location engine gets new location information, it will pass this information to the model manager for processing and analysis. The model manager updates the Kalman filter model based on the current location state and historical data.
```
    key: "updateFusionModels", 
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
```

- Kafman filter direction angle。

```
    key: "getHeadingDeg",
    value: function() {
        if (this.kalmanModel)
            return h.Numerical.rad2deg(Math.atan2(this.kalmanModel.x_k.elements[1], this.kalmanModel.x_k.elements[3]))
    }
 ``` 
 
  - Get Kalman filter position.
 
 ```
    key: "getPosition",
    value: function() {
        if (this.kalmanModel)
            return {
                x: this.kalmanModel.x_k.elements[0],
                y: this.kalmanModel.x_k.elements[2]
            }
    }
  ```
  
   - Get the Kalman filter speed.
 
  ```
    key: "getVelocity",
    value: function() {
        if (this.kalmanModel)
            return {
                x: this.kalmanModel.x_k.elements[1],
                y: this.kalmanModel.x_k.elements[3]
            }
    }
```
