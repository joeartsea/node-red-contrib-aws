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

    function AmazonSNSNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = this.awsConfig.region;
        this.accessKey = this.awsConfig.accessKey;
        this.secretKey = this.awsConfig.secretKey;
        this.operation = n.operation;
        this.arn = n.arn;

        var node = this;
	      var AWS = require("aws-sdk");
        AWS.config.update({
                accessKeyId: this.accessKey,
                secretAccessKey: this.secretKey,
		            region: this.region
            });

        var sns = new AWS.SNS();

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
              case 'publishTopic':
                node.status({fill:"blue",shape:"dot",text:"Sending to Topic"});
                var params = {
                  TopicArn: msg.arn || this.arn,
                  Message: msg.payload
                };
                if (msg.messageStructure=="json"){
                  params.MessageStructure="json"
                }
                sns.publish(params, node.sendMsg);
                break;
                case 'publishTarget':
                  node.status({fill:"blue",shape:"dot",text:"Sending to Target"});
                  var params = {
                    TargetArn: msg.arn || this.arn,
                    Message: msg.payload,
                  };
                  if (msg.messageStructure=="json"){
                    params.MessageStructure="json"
                  }
                  sns.publish(params, node.sendMsg);
                  break;            }
        });
    }
    RED.nodes.registerType("amazon sns", AmazonSNSNode);
};
