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

    function AmazonIOTQueryNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = n.region;
        this.operation = n.operation;
        this.thingName = n.thingName;
        this.endPoint= n.endPoint;
        this.region = this.awsConfig.region;
        this.accessKey = this.awsConfig.accessKey;
        this.secretKey = this.awsConfig.secretKey;
        this.functionname = n.functionname;

        var node = this;
        var AWS = require("aws-sdk");
          AWS.config.update({
            accessKeyId: this.accessKey,
            secretAccessKey: this.secretKey,
            region: this.region
          });
        if (!AWS) {
            node.warn("Missing AWS credentials");
            return;
        }

        var iot = new AWS.Iot( { 'region': node.region } );

        node.on("input", function(msg) {
            node.sendMsg = function (err, data) {
              if (err) {
                node.status({fill:"red",shape:"ring",text:"error"});
                node.error("failed: " + err.toString(),msg);
                return;
              } else {
                msg.payload = data;
                node.status({});
              }
              node.send(msg);
            };

            var thingName = msg.thingName || node.thingName;
            if (thingName === "" && node.operation != "list") {
                node.error("No Thing specified",msg);
                return;
            }
            switch (node.operation) {
              case 'update':
                node.status({fill:"blue",shape:"dot",text:"updating"});
                var params = {
                      thingName: thingName,
                      attributePayload: {
                          attributes:msg.payload,
                          merge: msg.merge !== false //defaults to true
                      },
                      removeThingType: msg.removeThingType || false,
                    };
                if (msg.thingTypeName){
                  params.thingTypeName=msg.thingTypeName
                }
                if (msg.expectedVersion){
                  params.expectedVersion= msg.expectedVersion;

                }

                iot.updateThing(params, node.sendMsg);
                break;
              case 'describe':
                node.status({fill:"blue",shape:"dot",text:"Getting"});
                var params = {
                  thingName: thingName
                };

                iot.describeThing(params, node.sendMsg);
                break;
              case 'list':
                node.status({fill:"blue",shape:"dot",text:"Listing"});
                var params = msg.query || msg.payload || {};
                iot.listThings(params, node.sendMsg);
                break;
              case 'getThingShadow':
                node.status( {fill:"blue",shape:"dot",text:"Getting Shadow"});
                var iotd=new AWS.IotData({endpoint: node.endPoint});
                var params = { thingName: thingName};
                iotd.getThingShadow(params,node.sendMsg);
              break;
              case 'updateThingShadow':
                node.status({fill:"blue",shape:"dot",text:"Updating Shadow"});
                var iotd=new AWS.IotData({endpoint: node.endPoint});
                var params = { thingName: thingName, payload: JSON.stringify(msg.payload)};
                iotd.updateThingShadow(params,node.sendMsg);
              break;
              case 'deleteThingShadow':
                node.status({fill:"blue",shape:"dot",text:"Deleting Shadow"});
                var iotd=new AWS.IotData({endpoint: node.endPoint});
                var params = { thingName: thingName};
                iotd.deleteThingShadow(params,node.sendMsg);
              break;
              case 'publish':
                node.status({fill:"blue",shape:"dot",text:"Publishing"});
                var iotd=new AWS.IotData({endpoint: node.endPoint});
                var params = { topic: msg.topic || "" ,
                              qos: msg.qos || 0,
                              payload:JSON.stringify(msg.payload)
                            };
                iotd.publish(params,node.sendMsg);
              break;
            };


        });
    }
    RED.nodes.registerType("amazon iot", AmazonIOTQueryNode);

};
