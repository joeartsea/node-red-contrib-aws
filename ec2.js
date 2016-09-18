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

    function AmazonEC2QueryNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = n.region;
        this.operation = n.operation;
        this.region = n.region;
        this.instanceid = n.instanceid;
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
//        var ec2 = new AWS.EC2();
        var ec2 = new AWS.EC2( { 'region': node.region } );

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

            var instanceid = msg.instanceid || node.instanceid;
            if (instanceid === "") {
                node.error("No InstanceId specified",msg);
                return;
            }
            msg.instanceid = instanceid;
            switch (node.operation) {
              case 'reboot':
                node.status({fill:"blue",shape:"dot",text:"rebooting"});
                var params = {
                      InstanceIds: [
                        instanceid
                      ],
                      DryRun: false
                    };

                ec2.rebootInstances(params, node.sendMsg);
                break;
              case 'start':
                node.status({fill:"blue",shape:"dot",text:"starting"});
                var params = {
                      InstanceIds: [
                        instanceid
                      ],
                      DryRun: false
                    };

                ec2.startInstances(params, node.sendMsg);
                break;
              case 'describe':
                node.status({fill:"blue",shape:"dot",text:"describe"});
                var params = {
                      InstanceIds: [
                        instanceid
                      ],
                    };

                ec2.describeInstances(params, node.sendMsg);
                break;
              case 'stop':
                node.status({fill:"blue",shape:"dot",text:"stopping"});
                var params = {
                      InstanceIds: [
                        instanceid
                      ],
                      Force: false,
                      DryRun: false
                    };

                ec2.stopInstances(params, node.sendMsg);
                break;
            }
        });
    }
    RED.nodes.registerType("amazon ec2", AmazonEC2QueryNode);


    RED.httpAdmin.get('/amazon-ec2/describeinstances', function(req, res) {
      var ec2Node = RED.nodes.getNode(req.query.id);
      var ec2Region = req.query.region;

      var AWS = null;
//      var AWS = ec2Node.awsConfig ? ec2Node.awsConfig.AWS : null;
      if (ec2Node) {
        AWS = ec2Node.awsConfig ? ec2Node.awsConfig.AWS : null;
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

//        var ec2 = new AWS.EC2();
      var ec2 = new AWS.EC2( { 'region': ec2Region } );

      ec2.describeInstances({}, function(err, data) {
        if (err) {
          return res.send('{"error": "error:' + err.toString() + '"}');
        }
        res.send(data);
      });
  });

};
