
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

		var awsService = new AWS.Kinesisanalytics( { 'region': node.region } );

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

		
		service.AddApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"CloudWatchLoggingOption",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"CloudWatchLoggingOption",params,undefined,true); 
			

			svc.addApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.AddApplicationInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"Input",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"Input",params,undefined,true); 
			

			svc.addApplicationInput(params,cb);
		}

		
		service.AddApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"InputId",params,undefined,false); 
			copyArg(n,"InputProcessingConfiguration",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"InputId",params,undefined,false); 
			copyArg(msg,"InputProcessingConfiguration",params,undefined,true); 
			

			svc.addApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.AddApplicationOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"Output",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"Output",params,undefined,true); 
			

			svc.addApplicationOutput(params,cb);
		}

		
		service.AddApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"ReferenceDataSource",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"ReferenceDataSource",params,undefined,false); 
			

			svc.addApplicationReferenceDataSource(params,cb);
		}

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"ApplicationDescription",params,undefined,false); 
			copyArg(msg,"Inputs",params,undefined,false); 
			copyArg(msg,"Outputs",params,undefined,false); 
			copyArg(msg,"CloudWatchLoggingOptions",params,undefined,false); 
			copyArg(msg,"ApplicationCode",params,undefined,false); 
			

			svc.createApplication(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CreateTimestamp",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CreateTimestamp",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"CloudWatchLoggingOptionId",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"CloudWatchLoggingOptionId",params,undefined,false); 
			

			svc.deleteApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.DeleteApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"InputId",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"InputId",params,undefined,false); 
			

			svc.deleteApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.DeleteApplicationOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"OutputId",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"OutputId",params,undefined,false); 
			

			svc.deleteApplicationOutput(params,cb);
		}

		
		service.DeleteApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"ReferenceId",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"ReferenceId",params,undefined,false); 
			

			svc.deleteApplicationReferenceDataSource(params,cb);
		}

		
		service.DescribeApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			

			svc.describeApplication(params,cb);
		}

		
		service.DiscoverInputSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"InputStartingPositionConfiguration",params,undefined,true); 
			copyArg(msg,"S3Configuration",params,undefined,false); 
			copyArg(msg,"InputProcessingConfiguration",params,undefined,true); 
			

			svc.discoverInputSchema(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ExclusiveStartApplicationName",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.StartApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"InputConfigurations",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"InputConfigurations",params,undefined,false); 
			

			svc.startApplication(params,cb);
		}

		
		service.StopApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			

			svc.stopApplication(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(n,"ApplicationUpdate",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArg(msg,"ApplicationUpdate",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Kinesisanalytics", AmazonAPINode);

};
