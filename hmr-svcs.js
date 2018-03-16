/**
* @name hmr-svcs
* @summary Hydra Express service entry point
* @description Hydra Message Relay Service
*/
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

let main = async() => {
  try {
    let serviceInfo = await hydraExpress.init(`${__dirname}/config/config.json`, () => {
      hydraExpress.registerRoutes({
        '/v1/hmr': require('./routes/hmr-v1-routes')
      });
    });

    let serviceName = hydra.getServiceName();
    let instanceVersion = hydra.getInstanceVersion();
    let instanceID = hydra.getInstanceID();
    let logEntry = `Started ${serviceName} (v.${instanceVersion})`;
    console.log(logEntry);
    console.log(serviceInfo);

    hydra.on('message', (message) => {
      hydra.sendReplyMessage(message, {
        bdy: {
          message: `Message reply to mid (${message.mid}) by ${serviceName} instance ${instanceID}`
        }
      });
    });
  } catch (err) {
    console.log('err', err);
  }
};

main();
