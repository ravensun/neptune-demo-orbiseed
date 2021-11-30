"use strict";

import express from "express";
import makeResponse from "../utilities/response";
import logger from "../utilities/logger";
import gremlin from "gremlin";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get("/health", (_, res) => {
  logger.info(`Health 200`);
  return makeResponse(res, 200, "Healthy");
});

router.get("/queryAll", (_, res) => {
  const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
  const Graph = gremlin.structure.Graph;

  const clusterEndpoint = process.env.CLUSTER_ENDPOINT;

  const dcReader = new DriverRemoteConnection("wss://" + clusterEndpoint + ":8182/gremlin", {});
  console.log("driver remote connection reader", dcReader);
  const graphReader = new Graph();
  console.log("graph reader", graphReader);
  const gR = graphReader.traversal().withRemote(dcReader);
  console.log("traversal reader", gR);
  gR.V()
    .limit(200)
    .count()
    .next()
    .then((data) => {
      console.log(data);
      dcReader.close();
      return makeResponse(res, 200, "Data", data);
    })
    .catch((error) => {
      console.log("ERROR getting vectors", error);
      dcReader.close();
      return makeResponse(res, 500, "Error", error);
    });
});

router.post("/createBrands", (req, res) => {
  const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
  const Graph = gremlin.structure.Graph;

  const clusterEndpoint = process.env.CLUSTER_ENDPOINT;

  const dcReader = new DriverRemoteConnection("wss://" + clusterEndpoint + ":8182/gremlin", {});
  console.log("driver remote connection reader", dcReader);
  const graphReader = new Graph();
  console.log("graph reader", graphReader);
  const gR = graphReader.traversal().withRemote(dcReader);
  console.log("traversal reader", gR);
  const { label, name } = req.body;
  const id = uuidv4();
  gR.addV({ label, id, name })
    .then((data) => {
      console.log(data);
      dcReader.close();
      return makeResponse(res, 200, "Data", data);
    })
    .catch((error) => {
      console.log("ERROR getting vectors", error);
      dcReader.close();
      return makeResponse(res, 500, "Error", error);
    });
});

export default router;
