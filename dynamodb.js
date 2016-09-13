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

    function AmazonDynamoDBNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = this.awsConfig.region;
        this.accessKey = this.awsConfig.accessKey;
        this.secretKey = this.awsConfig.secretKey;
        this.operation = n.operation;
        this.tablename = n.tablename;
        this.keyname= n.keyname;

        var node = this;

      	var AWS = require("aws-sdk");
        AWS.config.update({
          accessKeyId: this.accessKey,
          secretAccessKey: this.secretKey,
          region: this.region });

        var dDB = new AWS.DynamoDB();

        node.on("input", function(msg) {
            node.convType = function (payload) {
              payload = JSON.stringify(payload);
              return payload;
            };
            node.sendMsg = function (err, data) {
              if (err) {
                node.status({fill:"red",shape:"ring",text:"error"});
                node.error("failed: " + err.toString() ,msg);
                return;
              } else {
                node.status({});
              }
              msg.payload = data;
              node.send(msg);
            };

            switch (node.operation) {
              case 'get':
                node.status({fill:"blue",shape:"dot",text:"Getting Object"});
                var params = {
                  TableName: msg.tablename || this.tablename,
                  Key: msg.payload
                };
                dDB.getItem(params, node.sendMsg);
                break;
              case 'scan':
                  node.status({fill:"blue",shape:"dot",text:"Scanning Objects"});
                  var params = {
                    TableName: msg.tablename || this.tablename,
                  };
                  if (typeof msg.payload === 'string' && msg.payload != "") {
                    params.FilterExpression= msg.payload
                  }
                  dDB.scan(params, node.sendMsg);
                  break;

              case 'put':
                node.status({fill:"blue",shape:"dot",text:"Putting Object"});
                var params = {
                  TableName: msg.tablename || this.tablename,
                  Item: msg.payload,
                  ReturnValues: msg.returnValues || "NONE",
                  ConditionExpression: msg.conditionExpression || null
                };
                dDB.putItem(params, node.sendMsg);
                break;
            }
        });
    }
    RED.nodes.registerType("amazon dynamodb", AmazonDynamoDBNode);


};
