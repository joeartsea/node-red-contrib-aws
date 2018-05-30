
/**
 * Copyright 2017 Daniel Thomas.
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

	function AmazonAPINode(n) {
		RED.nodes.createNode(this,n);
		this.awsConfig = RED.nodes.getNode(n.aws);
		this.operation = n.operation;
		this.name = n.name;
	
		var node = this;
		var AWS = require("aws-sdk");

		var awsService = AWS.DynamoDB.Converter;

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
		
			var _cb=function(err,data){
				node.sendMsg(err,data);
			}		

			if (typeof service[node.operation] == "function"){
				node.status({fill:"blue",shape:"dot",text:node.operation});
				service[node.operation](awsService,msg,_cb);
			} else {
				node.error("failed: Operation node defined - "+node.operation);
			}

		});
		var copyArg=function(src,arg,out,outArg,isObject){
			var tmpValue=src[arg];
			outArg = (typeof outArg !== 'undefined') ? outArg : arg;

			if (typeof src[arg] !== 'undefined'){
				if (isObject && typeof src[arg]=="string" && src[arg] != "") { 
					tmpValue=JSON.parse(src[arg]);
				}
				out[outArg]=tmpValue;
			}
                        //AWS API takes 'Payload' not 'payload' (see Lambda)
                        if (arg=="Payload" && typeof tmpValue == 'undefined'){
                                out[arg]=src["payload"];
                        }

		}

		var service={};

		
		service.Input=function(svc,msg,cb){
            var param = null;
            var options = {};
			//copyArgs
            copyArg(n, "convertEmptyValues", options, undefined, false); 						
            copyArg(n,"wrapNumbers",options,undefined,false); 			

            if (msg.data) {
                param = msg.param;
            } else {
                param = msg.payload;
            }

            cb(null,svc.input(param, options));
		}

        service.Output = function (svc, msg, cb) {
            var param = null;
            var options = {};
            //copyArgs
            copyArg(n, "convertEmptyValues", options, undefined, false);
            copyArg(n, "wrapNumbers", options, undefined, false);

            if (msg.data) {
                param = msg.param;
            } else {
                param = msg.payload;
            }

            cb(null, svc.output(param, options));
        }

        service.Marshall = function (svc, msg, cb) {
            var param = null;
            var options = {};
            //copyArgs
            copyArg(n, "convertEmptyValues", options, undefined, false);
            copyArg(n, "wrapNumbers", options, undefined, false);

            if (msg.data) {
                param = msg.param;
            } else {
                param = msg.payload;
            }
            cb(null, svc.marshall(param, options));
        }

        service.Unmarshall = function (svc, msg, cb) {
            var param = null;
            var options = {};
            //copyArgs
            copyArg(n, "convertEmptyValues", options, undefined, false);
            copyArg(n, "wrapNumbers", options, undefined, false);

            if (msg.data) {
                param = msg.param;
            } else {
                param = msg.payload;
            }

            cb(null, svc.unmarshall(param, options));
        }

	}
	RED.nodes.registerType("AWS DynamoDB Converter", AmazonAPINode);

};
