
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

		var awsService = new AWS.Rekognition( { 'region': node.region } );

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
		}

		var service={};

		
		service.CompareFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceImage",params); 
			copyArg(n,"TargetImage",params); 
			
			copyArg(msg,"SourceImage",params); 
			copyArg(msg,"TargetImage",params); 
			copyArg(msg,"SimilarityThreshold",params); 
			

			svc.compareFaces(params,cb);
		}

		
		service.CreateCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			

			svc.createCollection(params,cb);
		}

		
		service.CreateStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Input",params); 
			copyArg(n,"Output",params); 
			copyArg(n,"Name",params); 
			copyArg(n,"Settings",params); 
			copyArg(n,"RoleArn",params); 
			
			copyArg(msg,"Input",params); 
			copyArg(msg,"Output",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"Settings",params); 
			copyArg(msg,"RoleArn",params); 
			

			svc.createStreamProcessor(params,cb);
		}

		
		service.DeleteCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			

			svc.deleteCollection(params,cb);
		}

		
		service.DeleteFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"FaceIds",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"FaceIds",params); 
			

			svc.deleteFaces(params,cb);
		}

		
		service.DeleteStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.deleteStreamProcessor(params,cb);
		}

		
		service.DescribeStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.describeStreamProcessor(params,cb);
		}

		
		service.DetectFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.detectFaces(params,cb);
		}

		
		service.DetectLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"MaxLabels",params); 
			copyArg(msg,"MinConfidence",params); 
			

			svc.detectLabels(params,cb);
		}

		
		service.DetectModerationLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"MinConfidence",params); 
			

			svc.detectModerationLabels(params,cb);
		}

		
		service.DetectText=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			

			svc.detectText(params,cb);
		}

		
		service.GetCelebrityInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Id",params); 
			

			svc.getCelebrityInfo(params,cb);
		}

		
		service.GetCelebrityRecognition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SortBy",params); 
			

			svc.getCelebrityRecognition(params,cb);
		}

		
		service.GetContentModeration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SortBy",params); 
			

			svc.getContentModeration(params,cb);
		}

		
		service.GetFaceDetection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.getFaceDetection(params,cb);
		}

		
		service.GetFaceSearch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SortBy",params); 
			

			svc.getFaceSearch(params,cb);
		}

		
		service.GetLabelDetection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SortBy",params); 
			

			svc.getLabelDetection(params,cb);
		}

		
		service.GetPersonTracking=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params); 
			
			copyArg(msg,"JobId",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SortBy",params); 
			

			svc.getPersonTracking(params,cb);
		}

		
		service.IndexFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"Image",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"Image",params); 
			copyArg(msg,"ExternalImageId",params); 
			copyArg(msg,"DetectionAttributes",params); 
			

			svc.indexFaces(params,cb);
		}

		
		service.ListCollections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.listCollections(params,cb);
		}

		
		service.ListFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.listFaces(params,cb);
		}

		
		service.ListStreamProcessors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.listStreamProcessors(params,cb);
		}

		
		service.RecognizeCelebrities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			

			svc.recognizeCelebrities(params,cb);
		}

		
		service.SearchFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"FaceId",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"FaceId",params); 
			copyArg(msg,"MaxFaces",params); 
			copyArg(msg,"FaceMatchThreshold",params); 
			

			svc.searchFaces(params,cb);
		}

		
		service.SearchFacesByImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"Image",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"Image",params); 
			copyArg(msg,"MaxFaces",params); 
			copyArg(msg,"FaceMatchThreshold",params); 
			

			svc.searchFacesByImage(params,cb);
		}

		
		service.StartCelebrityRecognition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startCelebrityRecognition(params,cb);
		}

		
		service.StartContentModeration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"MinConfidence",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startContentModeration(params,cb);
		}

		
		service.StartFaceDetection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"FaceAttributes",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startFaceDetection(params,cb);
		}

		
		service.StartFaceSearch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"FaceMatchThreshold",params); 
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startFaceSearch(params,cb);
		}

		
		service.StartLabelDetection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"MinConfidence",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startLabelDetection(params,cb);
		}

		
		service.StartPersonTracking=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Video",params); 
			
			copyArg(msg,"Video",params); 
			copyArg(msg,"ClientRequestToken",params); 
			copyArg(msg,"NotificationChannel",params); 
			copyArg(msg,"JobTag",params); 
			

			svc.startPersonTracking(params,cb);
		}

		
		service.StartStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.startStreamProcessor(params,cb);
		}

		
		service.StopStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.stopStreamProcessor(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Rekognition", AmazonAPINode);

};
