---
title: iBeacon distance measurement
date: 2021-09-24 21:11:42
categories: CS
tags:
    - Bluetooth
    - GEO Location
---


Bluetooth technology has been widely used in various devices, such as earphones, speakers, smart watches and so on. One of the important applications is Bluetooth positioning technology, which can determine the distance between devices by measuring the strength of Bluetooth signals. This method of distance estimation based on signal strength is called RSSI (Received Signal Strength Indication) ranging. In this article, we will discuss the principle, implementation, and related application scenarios of RSSI ranging.



RSSI ranging is a method of distance estimation by measuring the received signal strength indication (RSSI) of the Bluetooth signal. Generally speaking, the closer the distance between two devices, the greater the Bluetooth signal strength between them. Therefore, we can infer the distance between devices by measuring the change in this signal strength.
Specifically, when one device sends a Bluetooth signal, the other device receives this signal and uses the strength of the received signal to estimate the distance between them. Ideally, there is an inverse proportional relationship between the strength of the Bluetooth signal and the distance. That is, as the distance between two devices increases, the signal strength between them decreases, and vice versa.

In the process of RSSI ranging, we usually use the following formula to express the relationship between signal strength and distance：

```javascript
RSSI = A - 10nlog(d)
```

Among them, RSSI represents the received signal strength, A represents the reference signal strength at 1 meter, n represents the environmental attenuation factor, and d represents the distance between devices. This formula can help us estimate the distance between two devices, so as to realize the positioning and distance measurement based on Bluetooth technology.
Although the RSSI ranging formula seems simple, there are some problems in practical applications. Chief among them is the effect of environmental changes on signal strength. Since Bluetooth signals are susceptible to interference from walls, furniture, and other objects, the distance between devices is not always inversely proportional to signal strength.
For example, in a closed room, the signal strength between two devices may be more susceptible to interference than in an open, empty area, even if the distance between the two is the same. In this case, there may be errors in calculating the distance using the RSSI formula.
Additionally, the device itself can have an impact on signal strength. For example, different models or different brands of equipment may emit signals of different strengths, resulting in deviations in RSSI ranging.
In order to solve the above problems, various methods can be adopted to optimize the accuracy of RSSI ranging. For example, using multiple antennas to receive a signal, averaging RSSI values, using a Kalman filter, etc. These methods can help us eliminate the influence of signal strength changes, thereby improving the accuracy and reliability of RSSI ranging,
Here is a simple example of implementing RSSI ranging and Kalman filtering in Javascript:

    function calculateDistance(rssi) {
      var txPower = -59; 
      var n = 2.0;
      return Math.pow(10, (txPower - rssi) / (10 * n));
    }

    function KalmanFilter() {
      this.Q = 0.01; 
      this.R = 0.1; 
      this.x = 0; 
      this.P = 1; 

      this.update = function(z) {
        var x_pred = this.x;
        var P_pred = this.P + this.Q;

        var K = P_pred / (P_pred + this.R);
        this.x = x_pred + K * (z - x_pred);
        this.P = (1 - K) * P_pred;
        return this.x;
      }
    }

    var rssiValues = [-70, -75, -80, -85, -90];
    var distances = [];

    var kf = new KalmanFilter();
    for (var i = 0; i < rssiValues.length; i++) {
      var distance = calculateDistance(rssiValues[i]);
      var filteredDistance = kf.update(distance);
      distances.push(filteredDistance);
    }

    console.log(distances);

Calculates the distance between devices based on signal strength. Then, we implement a class KalmanFilter() of a Kalman filter, through which the measured values are smoothed and optimized.
Finally, in the test data, we simulate a set of RSSI signal strength values, and use the above two methods to calculate the distance corresponding to each signal, and perform Kalman filter optimization on the distance value. The final output is a filtered optimized distance array.
It should be noted that this is just a simple sample code, and more factors need to be considered in actual application, such as signal sampling rate, filter parameter adjustment, etc.
Another thing to note is that this method is not as accurate as we think it can't accurately distinguish between 1.1 or 1.2 meters of distance difference. As the distance increases, the estimated distance becomes less and less accurate.
Secondly, when the real distance is 2 meters, the calculated distance estimate may fluctuate around 2 meters, and the error range has doubled. As the distance increases, the error margin will continue to increase. Ultimately, the distance estimation has little accuracy at distances beyond 10 meters.
This is because the Bluetooth signal will gradually attenuate during transmission, and the Bluetooth transceiver itself is also a weak signal transmitter, and the maximum distance that can be sent is usually about 100 meters. Before reaching that distance, the signal becomes so weak that it is barely detectable, and at a distance of 30 meters the signal level also drops to about -100 dBm. This is usually the weakest signal level the receiver can hear. At 40 meters, the receiver won't be able to pick up most packets because the signal is so weak it's almost indistinguishable from background radio noise. So even if the receiver is able to receive the packet, it is only lucky to hear part of it.
Finally, since the signal strength looks almost the same in the receiver, the distance estimation simply cannot distinguish between a transmitter at 30 meters and a distance of 40 meters. In both cases, the signal strength is similarly weak, so we cannot accurately distinguish the distance difference between them by RSSI ranging method.
RSSI fingerprinting is an alternative technique. It builds a fingerprint map based on the Wi-Fi, Bluetooth and other wireless signal strength information data collected in advance, and determines the user's location by comparing the signal strength of the current location with the data in the fingerprint map to match.
This method requires the following steps：

*   Collect Wi-Fi and Bluetooth signal strength data in the area to be located, and generate a fingerprint database.
*   Obtain the signal strength of the current location through Bluetooth scanning, and compare it with the signal strength in the fingerprint database.
*   Determine the current location according to the degree of matching, usually using the nearest neighbor method (nearest neighbor) or cross-validation method (cross-validation) to select the optimal matching algorithm.

The following is a simple code snippet to show how to implement Bluetooth RSSI-based fingerprinting using Python:

    import math
    import pandas as pd


    def calculate_distance(x1, y1, x2, y2):
       return math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

    fingerprint_db = pd.read_csv('fingerprint_database.csv')

    current_rssi = -75

    min_distance = float('inf')
    location = ''
    for index, row in fingerprint_db.iterrows():
       distance = calculate_distance(row['x'], row['y'], current_x, current_y)
       if distance < min_distance:
           min_distance = distance
           location = row['location']
           
    print('Current location:', location)

