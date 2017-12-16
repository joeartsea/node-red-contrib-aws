
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
		var copyArg=function(src,arg,out,outArg){
			outArg = (typeof outArg !== 'undefined') ? outArg : arg;
			if (typeof src[arg] !== 'undefined'){
				out[outArg]=src[arg];
			}
                        //AWS API takes 'Payload' not 'payload' (see Lambda)
                        if (arg=="Payload" && typeof src[arg] == 'undefined'){
                                out[arg]=src["payload"];
                        }

		}

		var service={};

		
		service.AddApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"CloudWatchLoggingOption",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"CloudWatchLoggingOption",params); 
			

			svc.addApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.AddApplicationInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"Input",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"Input",params); 
			

			svc.addApplicationInput(params,cb);
		}

		
		service.AddApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"InputId",params); 
			copyArg(n,"InputProcessingConfiguration",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"InputId",params); 
			copyArg(msg,"InputProcessingConfiguration",params); 
			

			svc.addApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.AddApplicationOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"Output",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"Output",params); 
			

			svc.addApplicationOutput(params,cb);
		}

		
		service.AddApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"ReferenceDataSource",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"ReferenceDataSource",params); 
			

			svc.addApplicationReferenceDataSource(params,cb);
		}

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"ApplicationDescription",params); 
			copyArg(msg,"Inputs",params); 
			copyArg(msg,"Outputs",params); 
			copyArg(msg,"CloudWatchLoggingOptions",params); 
			copyArg(msg,"ApplicationCode",params); 
			

			svc.createApplication(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CreateTimestamp",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CreateTimestamp",params); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"CloudWatchLoggingOptionId",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"CloudWatchLoggingOptionId",params); 
			

			svc.deleteApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.DeleteApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"InputId",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"InputId",params); 
			

			svc.deleteApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.DeleteApplicationOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"OutputId",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"OutputId",params); 
			

			svc.deleteApplicationOutput(params,cb);
		}

		
		service.DeleteApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"ReferenceId",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"ReferenceId",params); 
			

			svc.deleteApplicationReferenceDataSource(params,cb);
		}

		
		service.DescribeApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			
			copyArg(msg,"ApplicationName",params); 
			

			svc.describeApplication(params,cb);
		}

		
		service.DiscoverInputSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceARN",params); 
			copyArg(msg,"RoleARN",params); 
			copyArg(msg,"InputStartingPositionConfiguration",params); 
			copyArg(msg,"S3Configuration",params); 
			copyArg(msg,"InputProcessingConfiguration",params); 
			

			svc.discoverInputSchema(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"ExclusiveStartApplicationName",params); 
			

			svc.listApplications(params,cb);
		}

		
		service.StartApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"InputConfigurations",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"InputConfigurations",params); 
			

			svc.startApplication(params,cb);
		}

		
		service.StopApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			
			copyArg(msg,"ApplicationName",params); 
			

			svc.stopApplication(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params); 
			copyArg(n,"CurrentApplicationVersionId",params); 
			copyArg(n,"ApplicationUpdate",params); 
			
			copyArg(msg,"ApplicationName",params); 
			copyArg(msg,"CurrentApplicationVersionId",params); 
			copyArg(msg,"ApplicationUpdate",params); 
			

			svc.updateApplication(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Kinesisanalytics", AmazonAPINode);

};
