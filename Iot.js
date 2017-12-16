
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

		var awsService = new AWS.Iot( { 'region': node.region } );

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

		
		service.AcceptCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"setAsActive",params); 
			

			svc.acceptCertificateTransfer(params,cb);
		}

		
		service.AddThingToThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"thingGroupArn",params); 
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingArn",params); 
			

			svc.addThingToThingGroup(params,cb);
		}

		
		service.AssociateTargetsWithJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targets",params); 
			copyArg(n,"jobId",params); 
			
			copyArg(msg,"targets",params); 
			copyArg(msg,"jobId",params); 
			copyArg(msg,"comment",params); 
			

			svc.associateTargetsWithJob(params,cb);
		}

		
		service.AttachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"target",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"target",params); 
			

			svc.attachPolicy(params,cb);
		}

		
		service.AttachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"principal",params); 
			

			svc.attachPrincipalPolicy(params,cb);
		}

		
		service.AttachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"principal",params); 
			

			svc.attachThingPrincipal(params,cb);
		}

		
		service.CancelCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.cancelCertificateTransfer(params,cb);
		}

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			
			copyArg(msg,"jobId",params); 
			copyArg(msg,"comment",params); 
			

			svc.cancelJob(params,cb);
		}

		
		service.ClearDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.clearDefaultAuthorizer(params,cb);
		}

		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			copyArg(n,"authorizerFunctionArn",params); 
			copyArg(n,"tokenKeyName",params); 
			copyArg(n,"tokenSigningPublicKeys",params); 
			
			copyArg(msg,"authorizerName",params); 
			copyArg(msg,"authorizerFunctionArn",params); 
			copyArg(msg,"tokenKeyName",params); 
			copyArg(msg,"tokenSigningPublicKeys",params); 
			copyArg(msg,"status",params); 
			

			svc.createAuthorizer(params,cb);
		}

		
		service.CreateCertificateFromCsr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateSigningRequest",params); 
			
			copyArg(msg,"certificateSigningRequest",params); 
			copyArg(msg,"setAsActive",params); 
			

			svc.createCertificateFromCsr(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			copyArg(n,"targets",params); 
			
			copyArg(msg,"jobId",params); 
			copyArg(msg,"targets",params); 
			copyArg(msg,"documentSource",params); 
			copyArg(msg,"document",params); 
			copyArg(msg,"description",params); 
			copyArg(msg,"presignedUrlConfig",params); 
			copyArg(msg,"targetSelection",params); 
			copyArg(msg,"jobExecutionsRolloutConfig",params); 
			copyArg(msg,"documentParameters",params); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateKeysAndCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"setAsActive",params); 
			

			svc.createKeysAndCertificate(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyDocument",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyDocument",params); 
			

			svc.createPolicy(params,cb);
		}

		
		service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyDocument",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyDocument",params); 
			copyArg(msg,"setAsDefault",params); 
			

			svc.createPolicyVersion(params,cb);
		}

		
		service.CreateRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params); 
			copyArg(n,"roleArn",params); 
			
			copyArg(msg,"roleAlias",params); 
			copyArg(msg,"roleArn",params); 
			copyArg(msg,"credentialDurationSeconds",params); 
			

			svc.createRoleAlias(params,cb);
		}

		
		service.CreateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"attributePayload",params); 
			

			svc.createThing(params,cb);
		}

		
		service.CreateThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params); 
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"parentGroupName",params); 
			copyArg(msg,"thingGroupProperties",params); 
			

			svc.createThingGroup(params,cb);
		}

		
		service.CreateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"thingTypeProperties",params); 
			

			svc.createThingType(params,cb);
		}

		
		service.CreateTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			copyArg(n,"topicRulePayload",params); 
			
			copyArg(msg,"ruleName",params); 
			copyArg(msg,"topicRulePayload",params); 
			

			svc.createTopicRule(params,cb);
		}

		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			
			copyArg(msg,"authorizerName",params); 
			

			svc.deleteAuthorizer(params,cb);
		}

		
		service.DeleteCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.deleteCACertificate(params,cb);
		}

		
		service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"forceDelete",params); 
			

			svc.deleteCertificate(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.deletePolicyVersion(params,cb);
		}

		
		service.DeleteRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteRegistrationCode(params,cb);
		}

		
		service.DeleteRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params); 
			
			copyArg(msg,"roleAlias",params); 
			

			svc.deleteRoleAlias(params,cb);
		}

		
		service.DeleteThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"expectedVersion",params); 
			

			svc.deleteThing(params,cb);
		}

		
		service.DeleteThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params); 
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"expectedVersion",params); 
			

			svc.deleteThingGroup(params,cb);
		}

		
		service.DeleteThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			

			svc.deleteThingType(params,cb);
		}

		
		service.DeleteTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.deleteTopicRule(params,cb);
		}

		
		service.DeleteV2LoggingLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetType",params); 
			copyArg(n,"targetName",params); 
			
			copyArg(msg,"targetType",params); 
			copyArg(msg,"targetName",params); 
			

			svc.deleteV2LoggingLevel(params,cb);
		}

		
		service.DeprecateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"undoDeprecate",params); 
			

			svc.deprecateThingType(params,cb);
		}

		
		service.DescribeAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			
			copyArg(msg,"authorizerName",params); 
			

			svc.describeAuthorizer(params,cb);
		}

		
		service.DescribeCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.describeCACertificate(params,cb);
		}

		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.describeCertificate(params,cb);
		}

		
		service.DescribeDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeDefaultAuthorizer(params,cb);
		}

		
		service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"endpointType",params); 
			

			svc.describeEndpoint(params,cb);
		}

		
		service.DescribeEventConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeEventConfigurations(params,cb);
		}

		
		service.DescribeIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"indexName",params); 
			
			copyArg(msg,"indexName",params); 
			

			svc.describeIndex(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			
			copyArg(msg,"jobId",params); 
			

			svc.describeJob(params,cb);
		}

		
		service.DescribeJobExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"jobId",params); 
			copyArg(msg,"thingName",params); 
			copyArg(msg,"executionNumber",params); 
			

			svc.describeJobExecution(params,cb);
		}

		
		service.DescribeRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params); 
			
			copyArg(msg,"roleAlias",params); 
			

			svc.describeRoleAlias(params,cb);
		}

		
		service.DescribeThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			

			svc.describeThing(params,cb);
		}

		
		service.DescribeThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params); 
			
			copyArg(msg,"thingGroupName",params); 
			

			svc.describeThingGroup(params,cb);
		}

		
		service.DescribeThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params); 
			
			copyArg(msg,"taskId",params); 
			

			svc.describeThingRegistrationTask(params,cb);
		}

		
		service.DescribeThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			

			svc.describeThingType(params,cb);
		}

		
		service.DetachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"target",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"target",params); 
			

			svc.detachPolicy(params,cb);
		}

		
		service.DetachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"principal",params); 
			

			svc.detachPrincipalPolicy(params,cb);
		}

		
		service.DetachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"principal",params); 
			

			svc.detachThingPrincipal(params,cb);
		}

		
		service.DisableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.disableTopicRule(params,cb);
		}

		
		service.EnableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.enableTopicRule(params,cb);
		}

		
		service.GetEffectivePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"principal",params); 
			copyArg(msg,"cognitoIdentityPoolId",params); 
			copyArg(msg,"thingName",params); 
			

			svc.getEffectivePolicies(params,cb);
		}

		
		service.GetIndexingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getIndexingConfiguration(params,cb);
		}

		
		service.GetJobDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			
			copyArg(msg,"jobId",params); 
			

			svc.getJobDocument(params,cb);
		}

		
		service.GetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getLoggingOptions(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.getPolicyVersion(params,cb);
		}

		
		service.GetRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getRegistrationCode(params,cb);
		}

		
		service.GetTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.getTopicRule(params,cb);
		}

		
		service.GetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getV2LoggingOptions(params,cb);
		}

		
		service.ListAttachedPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"target",params); 
			
			copyArg(msg,"target",params); 
			copyArg(msg,"recursive",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			

			svc.listAttachedPolicies(params,cb);
		}

		
		service.ListAuthorizers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			copyArg(msg,"status",params); 
			

			svc.listAuthorizers(params,cb);
		}

		
		service.ListCACertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCACertificates(params,cb);
		}

		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCertificates(params,cb);
		}

		
		service.ListCertificatesByCA=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificateId",params); 
			
			copyArg(msg,"caCertificateId",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCertificatesByCA(params,cb);
		}

		
		service.ListIndices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listIndices(params,cb);
		}

		
		service.ListJobExecutionsForJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params); 
			
			copyArg(msg,"jobId",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"nextToken",params); 
			

			svc.listJobExecutionsForJob(params,cb);
		}

		
		service.ListJobExecutionsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"nextToken",params); 
			

			svc.listJobExecutionsForThing(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"status",params); 
			copyArg(msg,"targetSelection",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"thingGroupId",params); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListOutgoingCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listOutgoingCertificates(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPolicyPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPolicyPrincipals(params,cb);
		}

		
		service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.listPolicyVersions(params,cb);
		}

		
		service.ListPrincipalPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params); 
			
			copyArg(msg,"principal",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPrincipalPolicies(params,cb);
		}

		
		service.ListPrincipalThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params); 
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"principal",params); 
			

			svc.listPrincipalThings(params,cb);
		}

		
		service.ListRoleAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listRoleAliases(params,cb);
		}

		
		service.ListTargetsForPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			

			svc.listTargetsForPolicy(params,cb);
		}

		
		service.ListThingGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"parentGroup",params); 
			copyArg(msg,"namePrefixFilter",params); 
			copyArg(msg,"recursive",params); 
			

			svc.listThingGroups(params,cb);
		}

		
		service.ListThingGroupsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listThingGroupsForThing(params,cb);
		}

		
		service.ListThingPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			

			svc.listThingPrincipals(params,cb);
		}

		
		service.ListThingRegistrationTaskReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params); 
			copyArg(n,"reportType",params); 
			
			copyArg(msg,"taskId",params); 
			copyArg(msg,"reportType",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listThingRegistrationTaskReports(params,cb);
		}

		
		service.ListThingRegistrationTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"status",params); 
			

			svc.listThingRegistrationTasks(params,cb);
		}

		
		service.ListThingTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"thingTypeName",params); 
			

			svc.listThingTypes(params,cb);
		}

		
		service.ListThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"attributeName",params); 
			copyArg(msg,"attributeValue",params); 
			copyArg(msg,"thingTypeName",params); 
			

			svc.listThings(params,cb);
		}

		
		service.ListThingsInThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params); 
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"recursive",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listThingsInThingGroup(params,cb);
		}

		
		service.ListTopicRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"topic",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"ruleDisabled",params); 
			

			svc.listTopicRules(params,cb);
		}

		
		service.ListV2LoggingLevels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"targetType",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listV2LoggingLevels(params,cb);
		}

		
		service.RegisterCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificate",params); 
			copyArg(n,"verificationCertificate",params); 
			
			copyArg(msg,"caCertificate",params); 
			copyArg(msg,"verificationCertificate",params); 
			copyArg(msg,"setAsActive",params); 
			copyArg(msg,"allowAutoRegistration",params); 
			copyArg(msg,"registrationConfig",params); 
			

			svc.registerCACertificate(params,cb);
		}

		
		service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificatePem",params); 
			
			copyArg(msg,"certificatePem",params); 
			copyArg(msg,"caCertificatePem",params); 
			copyArg(msg,"setAsActive",params); 
			copyArg(msg,"status",params); 
			

			svc.registerCertificate(params,cb);
		}

		
		service.RegisterThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateBody",params); 
			
			copyArg(msg,"templateBody",params); 
			copyArg(msg,"parameters",params); 
			

			svc.registerThing(params,cb);
		}

		
		service.RejectCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"rejectReason",params); 
			

			svc.rejectCertificateTransfer(params,cb);
		}

		
		service.RemoveThingFromThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"thingGroupArn",params); 
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingArn",params); 
			

			svc.removeThingFromThingGroup(params,cb);
		}

		
		service.ReplaceTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			copyArg(n,"topicRulePayload",params); 
			
			copyArg(msg,"ruleName",params); 
			copyArg(msg,"topicRulePayload",params); 
			

			svc.replaceTopicRule(params,cb);
		}

		
		service.SearchIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryString",params); 
			
			copyArg(msg,"indexName",params); 
			copyArg(msg,"queryString",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"queryVersion",params); 
			

			svc.searchIndex(params,cb);
		}

		
		service.SetDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			
			copyArg(msg,"authorizerName",params); 
			

			svc.setDefaultAuthorizer(params,cb);
		}

		
		service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}

		
		service.SetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loggingOptionsPayload",params); 
			
			copyArg(msg,"loggingOptionsPayload",params); 
			

			svc.setLoggingOptions(params,cb);
		}

		
		service.SetV2LoggingLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logTarget",params); 
			copyArg(n,"logLevel",params); 
			
			copyArg(msg,"logTarget",params); 
			copyArg(msg,"logLevel",params); 
			

			svc.setV2LoggingLevel(params,cb);
		}

		
		service.SetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"roleArn",params); 
			copyArg(msg,"defaultLogLevel",params); 
			copyArg(msg,"disableAllLogs",params); 
			

			svc.setV2LoggingOptions(params,cb);
		}

		
		service.StartThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateBody",params); 
			copyArg(n,"inputFileBucket",params); 
			copyArg(n,"inputFileKey",params); 
			copyArg(n,"roleArn",params); 
			
			copyArg(msg,"templateBody",params); 
			copyArg(msg,"inputFileBucket",params); 
			copyArg(msg,"inputFileKey",params); 
			copyArg(msg,"roleArn",params); 
			

			svc.startThingRegistrationTask(params,cb);
		}

		
		service.StopThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params); 
			
			copyArg(msg,"taskId",params); 
			

			svc.stopThingRegistrationTask(params,cb);
		}

		
		service.TestAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authInfos",params); 
			
			copyArg(msg,"principal",params); 
			copyArg(msg,"cognitoIdentityPoolId",params); 
			copyArg(msg,"authInfos",params); 
			copyArg(msg,"clientId",params); 
			copyArg(msg,"policyNamesToAdd",params); 
			copyArg(msg,"policyNamesToSkip",params); 
			

			svc.testAuthorization(params,cb);
		}

		
		service.TestInvokeAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			copyArg(n,"token",params); 
			copyArg(n,"tokenSignature",params); 
			
			copyArg(msg,"authorizerName",params); 
			copyArg(msg,"token",params); 
			copyArg(msg,"tokenSignature",params); 
			

			svc.testInvokeAuthorizer(params,cb);
		}

		
		service.TransferCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			copyArg(n,"targetAwsAccount",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"targetAwsAccount",params); 
			copyArg(msg,"transferMessage",params); 
			

			svc.transferCertificate(params,cb);
		}

		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params); 
			
			copyArg(msg,"authorizerName",params); 
			copyArg(msg,"authorizerFunctionArn",params); 
			copyArg(msg,"tokenKeyName",params); 
			copyArg(msg,"tokenSigningPublicKeys",params); 
			copyArg(msg,"status",params); 
			

			svc.updateAuthorizer(params,cb);
		}

		
		service.UpdateCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"newStatus",params); 
			copyArg(msg,"newAutoRegistrationStatus",params); 
			copyArg(msg,"registrationConfig",params); 
			copyArg(msg,"removeAutoRegistration",params); 
			

			svc.updateCACertificate(params,cb);
		}

		
		service.UpdateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			copyArg(n,"newStatus",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"newStatus",params); 
			

			svc.updateCertificate(params,cb);
		}

		
		service.UpdateEventConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"eventConfigurations",params); 
			

			svc.updateEventConfigurations(params,cb);
		}

		
		service.UpdateIndexingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingIndexingConfiguration",params); 
			

			svc.updateIndexingConfiguration(params,cb);
		}

		
		service.UpdateRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params); 
			
			copyArg(msg,"roleAlias",params); 
			copyArg(msg,"roleArn",params); 
			copyArg(msg,"credentialDurationSeconds",params); 
			

			svc.updateRoleAlias(params,cb);
		}

		
		service.UpdateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"attributePayload",params); 
			copyArg(msg,"expectedVersion",params); 
			copyArg(msg,"removeThingType",params); 
			

			svc.updateThing(params,cb);
		}

		
		service.UpdateThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params); 
			copyArg(n,"thingGroupProperties",params); 
			
			copyArg(msg,"thingGroupName",params); 
			copyArg(msg,"thingGroupProperties",params); 
			copyArg(msg,"expectedVersion",params); 
			

			svc.updateThingGroup(params,cb);
		}

		
		service.UpdateThingGroupsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingGroupsToAdd",params); 
			copyArg(msg,"thingGroupsToRemove",params); 
			

			svc.updateThingGroupsForThing(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Iot", AmazonAPINode);

};
