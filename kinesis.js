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

    function AmazonKinesisQueryNode(n) {
        RED.nodes.createNode(this,n);
        this.awsConfig = RED.nodes.getNode(n.aws);
        this.region = n.region;
        this.operation = n.operation;
        this.streamname = n.streamname;
        this.shardid = n.shardid;
        this.iteratortype = n.iteratortype;
        this.partitionkey = n.partitionkey;
        this.explicithashkey = n.explicithashkey;
        this.sequencenumber = n.sequencenumber;
        this.limit = n.limit;
        this.accessKey = this.awsConfig.accessKey;
        this.secretKey = this.awsConfig.secretKey;

        var node = this;
        var AWS = require("aws-sdk");
          AWS.config.update({
            accessKeyId: this.accessKey,
            secretAccessKey: this.secretKey,
            region: this.region
          });        if (!AWS) {
            node.warn("Missing AWS credentials");
            return;
        }

//        var kinesis = new AWS.Kinesis();
        var kinesis = new AWS.Kinesis( { 'region': node.region } );

        node.on("input", function(msg) {
            node.sendMsg = function (err, data) {
              if (err) {
                node.status({fill:"red",shape:"ring",text:"error"});
                node.error("failed: " + err.toString(),msg);
                return;
              } else {
                msg.payload = data;
                if(data.ShardId) msg.shardid = data.ShardId;
                if(data.SequenceNumber) msg.sequencenumber = data.SequenceNumber;
                if(data.ShardIterator) msg.sharditerator = data.ShardIterator;
                if(data.NextShardIterator) msg.sharditerator = data.NextShardIterator;
              }
              node.status({});
              node.send(msg);
            };

            switch (node.operation) {
              case 'putrecord':
                node.status({fill:"blue",shape:"dot",text:"puts data record"});
                var params = {
                      Data: msg.payload,
                      StreamName: node.streamname || msg.streamname,
                      PartitionKey: node.partitionkey || msg.partitionkey,
                      ExplicitHashKey: node.explicithashkey || msg.explicithashkey,
                      SequenceNumberForOrdering: node.sequencenumber || msg.sequencenumber
                    };
                kinesis.putRecord(params, node.sendMsg);
                break;
              case 'getrecords':
                node.status({fill:"blue",shape:"dot",text:"gets data records"});
                var params = {
                      ShardIterator: msg.sharditerator,
                      Limit: msg.limit || node.limit || 1
                    };
                kinesis.getRecords(params, node.sendMsg);
                break;
              case 'getsharditerator':
                node.status({fill:"blue",shape:"dot",text:"Gets a shard iterator"});
                var itrType = node.iteratortype;
                var params = {
                      StreamName: node.streamname || msg.streamname,
                      ShardId: node.shardid || msg.shardid,
                      ShardIteratorType: itrType
                    };
                if( itrType == "AT_SEQUENCE_NUMBER" || itrType == "AFTER_SEQUENCE_NUMBER" ) {
                    params.StartingSequenceNumber =  msg.sequencenumber || node.sequencenumber;
                }
                kinesis.getShardIterator(params, node.sendMsg);
                break;
            }
        });
    }
    RED.nodes.registerType("amazon kinesis", AmazonKinesisQueryNode);


    RED.httpAdmin.get('/amazon-kinesis/liststreams', function(req, res) {
      var kinesisNode = RED.nodes.getNode(req.query.id);
      var kinesisRegion = req.query.region;

      var AWS = null;
//      var AWS = kinesisNode.awsConfig ? kinesisNode.awsConfig.AWS : null;
      if (kinesisNode) {
        AWS = kinesisNode.awsConfig ? kinesisNode.awsConfig.AWS : null;
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

//        var kinesis = new AWS.Kinesis();
      var kinesis = new AWS.Kinesis( { 'region': kinesisRegion } );

      kinesis.listStreams({}, function(err, data) {
        if (err) {
          return res.send('{"error": "error:' + err.toString() + '"}');
        }
        res.send(data);
      });
    });


    RED.httpAdmin.get('/amazon-kinesis/describestream', function(req, res) {
      var kinesisNode = RED.nodes.getNode(req.query.id);
      var kinesisRegion = req.query.region;
      var streamName = req.query.streamname;

      var AWS = null;
//      var AWS = kinesisNode.awsConfig ? kinesisNode.awsConfig.AWS : null;
      if (kinesisNode) {
        AWS = kinesisNode.awsConfig ? kinesisNode.awsConfig.AWS : null;
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

//        var kinesis = new AWS.Kinesis();
      var kinesis = new AWS.Kinesis( { 'region': kinesisRegion } );

      kinesis.describeStream({ StreamName: streamName }, function(err, data) {
        if (err) {
          return res.send('{"error": "error:' + err.toString() + '"}');
        }
        res.send(data);
      });
    });

};
