"use strict";
var Eureka = require('eureka-js-client').Eureka;
var eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
var eurekaPort = 8761;
var hostName = (process.env.HOSTNAME || 'localhost');
var ipAddr = '172.0.0.1';
exports.registerWithEureka = function (appName, PORT) {
    var client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': 'true'
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn'
            }
        },
        //retry 10 time for 3 minute 20 seconds.
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: '/eureka/apps/',
            maxRetries: 10,
            requestRetryDelay: 2000
        }
    });
    client.logger.level('debug');
    client.start(function (error) {
        console.log(error || "user service registered");
    });
    function exitHandler(options, exitCode) {
        if (options.cleanup) {
        }
        if (exitCode || exitCode === 0)
            console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }
    client.on('deregistered', function () {
        process.exit();
        console.log('after deregistered');
    });
    client.on('started', function () {
        console.log("eureka host  " + eurekaHost);
    });
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};
