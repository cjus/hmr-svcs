/**
 * @name hmr-v1-api
 * @description This module packages the hmr API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = hydra.getServerResponseHelper();
let serverResponse = new ServerResponse();

let api = express.Router(); //eslint-disable-line

/**
 * @name [GET]/replay
 * @description responds to a relay get request
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @return {undefined}
 */
api.get('/relay', (req, res) => {
  serverResponse.sendOk(res, {
    result: {
      from: `${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

/**
 * @name [POST]/relay
 * @description responds to a relay post request by sending back the received message payload
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @return {undefined}
 */
api.post('/relay', (req, res) => {
  let response = {
    result: {
      from: `${hydra.getServiceName()} - ${hydra.getInstanceID()}`,
      body: req.body
    }
  };
  serverResponse.sendOk(res, response);
});

/**
 * @name [GET]/health
 * @description responds with service health information. This is mostly used by the DOCKER container healthcheck
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @return {undefined}
 */
api.get('/health', (req, res) => {
  let healthInfo = hydra.getHealth();
  serverResponse.sendOk(res, {
    result: healthInfo
  });
});

module.exports = api;
