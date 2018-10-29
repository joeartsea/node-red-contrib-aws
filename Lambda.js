
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
		this.region = n.region;
		this.operation = n.operation;
		this.name = n.name;
		this.region = this.awsConfig.region;
		this.accessKey = this.awsConfig.accessKey;
		this.secretKey = this.awsConfig.secretKey;

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

        if (this.awsConfig.proxyRequired){
            var proxy = require('proxy-agent');
            AWS.config.update({
                httpOptions: { agent: new proxy(this.awsConfig.proxy) }
            });
        }

		var awsService = new AWS.Lambda( { 'region': node.region } );

		node.on("input", function(msg) {
			node.sendMsg = function (err, data) {
				if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} else {
				msg.payload = data;
				node.status({});
				}
				node.send([msg,null]);
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

		
		service.AddPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"StatementId",params,undefined,false); 
			copyArg(n,"Action",params,undefined,false); 
			copyArg(n,"Principal",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"StatementId",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"SourceAccount",params,undefined,false); 
			copyArg(msg,"EventSourceToken",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FunctionVersion",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FunctionVersion",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoutingConfig",params,undefined,true); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EventSourceArn",params,undefined,false); 
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"BatchSize",params,undefined,false); 
			copyArg(msg,"StartingPosition",params,undefined,false); 
			copyArg(msg,"StartingPositionTimestamp",params,undefined,false); 
			

			svc.createEventSourceMapping(params,cb);
		}

		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"Runtime",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"Handler",params,undefined,false); 
			copyArg(n,"Code",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Runtime",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"Handler",params,undefined,false); 
			copyArg(msg,"Code",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MemorySize",params,undefined,false); 
			copyArg(msg,"Publish",params,undefined,false); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"DeadLetterConfig",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			copyArg(msg,"KMSKeyArn",params,undefined,false); 
			copyArg(msg,"TracingConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFunction(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params,undefined,false); 
			
			copyArg(msg,"UUID",params,undefined,false); 
			

			svc.deleteEventSourceMapping(params,cb);
		}

		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}

		
		service.DeleteFunctionConcurrency=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			

			svc.deleteFunctionConcurrency(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAlias(params,cb);
		}

		
		service.GetEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params,undefined,false); 
			
			copyArg(msg,"UUID",params,undefined,false); 
			

			svc.getEventSourceMapping(params,cb);
		}

		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}

		
		service.GetFunctionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			

			svc.getFunctionConfiguration(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.Invoke=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"InvocationType",params,undefined,false); 
			copyArg(msg,"LogType",params,undefined,false); 
			copyArg(msg,"ClientContext",params,undefined,false); 
			copyArg(msg,"Payload",params,undefined,true); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			

			svc.invoke(params,cb);
		}

		
		service.InvokeAsync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"InvokeArgs",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"InvokeArgs",params,undefined,false); 
			

			svc.invokeAsync(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"FunctionVersion",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListEventSourceMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listEventSourceMappings(params,cb);
		}

		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MasterRegion",params,undefined,false); 
			copyArg(msg,"FunctionVersion",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListVersionsByFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listVersionsByFunction(params,cb);
		}

		
		service.PublishVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"CodeSha256",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.publishVersion(params,cb);
		}

		
		service.PutFunctionConcurrency=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"ReservedConcurrentExecutions",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"ReservedConcurrentExecutions",params,undefined,false); 
			

			svc.putFunctionConcurrency(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"StatementId",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"StatementId",params,undefined,false); 
			copyArg(msg,"Qualifier",params,undefined,false); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FunctionVersion",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoutingConfig",params,undefined,true); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params,undefined,false); 
			
			copyArg(msg,"UUID",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"BatchSize",params,undefined,false); 
			

			svc.updateEventSourceMapping(params,cb);
		}

		
		service.UpdateFunctionCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"ZipFile",params,undefined,true); 
			copyArg(msg,"S3Bucket",params,undefined,false); 
			copyArg(msg,"S3Key",params,undefined,false); 
			copyArg(msg,"S3ObjectVersion",params,undefined,false); 
			copyArg(msg,"Publish",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.updateFunctionCode(params,cb);
		}

		
		service.UpdateFunctionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"Handler",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MemorySize",params,undefined,false); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			copyArg(msg,"Runtime",params,undefined,false); 
			copyArg(msg,"DeadLetterConfig",params,undefined,true); 
			copyArg(msg,"KMSKeyArn",params,undefined,false); 
			copyArg(msg,"TracingConfig",params,undefined,true); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.updateFunctionConfiguration(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Lambda", AmazonAPINode);

};
