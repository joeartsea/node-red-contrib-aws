/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";

    function AmazonLambdaQueryNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = n.region;
        this.operation = n.operation;
        this.functionname = n.functionname;

        var node = this;
        var AWS = this.awsConfig ? this.awsConfig.AWS : null;
        if (!AWS) {
            node.warn("Missing AWS credentials");
            return;
        }

//        var lambda = new AWS.Lambda();
        var lambda = new AWS.Lambda( { 'region': node.region } );

        node.on("input", function(msg) {
            node.convType = function (payload) {
              if (typeof payload === 'object') {
                payload = JSON.stringify(payload);
              } else {
                payload = payload;
              }
              return payload;
            };
            node.sendMsg = function (err, data) {
              if (err) {
                node.status({fill:"red",shape:"ring",text:"error"});
                node.error("failed: " + err.toString(),msg);
                return;
              } else {
                node.status({});
              }
              msg.payload = data;
              node.send(msg);
            };

            switch (node.operation) {
              case 'invoke':
                node.status({fill:"blue",shape:"dot",text:"invoke lambda function"});
                var params = {
                  FunctionName: node.functionname,
                  InvocationType: 'RequestResponse',
                  LogType: 'Tail',
                  Payload: node.convType(msg.payload)
                };
                lambda.invoke(params, node.sendMsg);
                break;
            }
        });
    }
    RED.nodes.registerType("amazon lambda", AmazonLambdaQueryNode);


    RED.httpAdmin.get('/amazon-lambda/listfunctions', function(req, res) {
      var lambdaNode = RED.nodes.getNode(req.query.id);
      var lambdaRegion = req.query.region;

      var AWS = null;
//      var AWS = lambdaNode.awsConfig ? lambdaNode.awsConfig.AWS : null;
      if (lambdaNode) {
        AWS = lambdaNode.awsConfig ? lambdaNode.awsConfig.AWS : null;
      } else {
        AWS = require("aws-sdk");
        AWS.config.update({
                accessKeyId: req.query.accesskeyid,
                secretAccessKey: req.query.secretaccesskey,
            });
      }

      if (!AWS) {
        return node.send('{"error": "Missing AWS credentials"}');
      }

//        var lambda = new AWS.Lambda();
      var lambda = new AWS.Lambda( { 'region': lambdaRegion } );

      var params = {};
      lambda.listFunctions(params, function(err, data) {
          if (err) {
            return res.send('{"error": "error:' + err.toString() + '"}');
          }
          res.send(data);
      });
    });

};
