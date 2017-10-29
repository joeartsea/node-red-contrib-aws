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

	function AmazonRDSNode(n) {
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

		var rds = new AWS.RDS( { 'region': node.region } );

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

			var name = msg.name || node.name;
			if ((name === ""|| typeof name == "undefined") && node.operation != "describeDBInstances") {
				node.error("No name specified",msg);
				return;
			}
			//Alternate technique
			var iParams={name:name};
			if (typeof service[node.operation] == "function"){
				node.status({fill:"blue",shape:"dot",text:node.operation});
				service[node.operation](rds,msg,iParams,_cb);
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
		service.describeDBInstances=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBInstanceIdentifier");
			copyArg(msg,"Filters",params);
			copyArg(msg,"MaxRecords",params);
			copyArg(msg,"Marker",params);


			svc.describeDBInstances(params, cb);
		};

		service.describeDBParameterGroups=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBParameterGroupName");
			copyArg(msg,"Filters",params);
			copyArg(msg,"MaxRecords",params);
			copyArg(msg,"Marker",params);
			svc.describeDBParameterGroups(params, cb);
		};

		service.describeDBParameters=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBParameterGroupName");
			copyArg(msg,"Filters",params);
			copyArg(msg,"MaxRecords",params);
			copyArg(msg,"Marker",params);
			svc.describeDBParameters(params, cb);

		};

		service.describeDBSecurityGroups=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBSecurityGroupName");
			copyArg(msg,"Filters",params);
			copyArg(msg,"MaxRecords",params);
			copyArg(msg,"Marker",params);
			svc.describeDBSecurityGroups(params, cb);
		};


		service.applyPendingMaintenanceAction=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"ResourceIdentifier");
			copyArg(msg,"ResourceIdentifier",params);
			copyArg(msg,"ApplyAction",params);
			copyArg(msg,"OptInType",params);
			copyArg(msg,"Filters",params);
			copyArg(msg,"MaxRecords",params);
			copyArg(msg,"Marker",params);
			svc.applyPendingMaintenanceAction(params, cb);
		};

		service.modifyDBInstance=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBInstanceIdentifier");
			copyArg(msg,"AllocatedStorage",params);
			copyArg(msg,"AllowMajorVersionUpgrade",params);
			copyArg(msg,"ApplyImmediately",params);
			copyArg(msg,"AutoMinorVersionUpgrade",params);
			copyArg(msg,"BackupRetentionPeriod",params);
			copyArg(msg,"CACertificateIdentifier",params);
			copyArg(msg,"CopyTagsToSnapshot",params);
			copyArg(msg,"DBInstanceClass",params);
			copyArg(msg,"DBParameterGroupName",params);
			copyArg(msg,"DBPortNumber",params);
			copyArg(msg,"DBSecurityGroups",params);
			copyArg(msg,"DBSubnetGroupName",params);
			copyArg(msg,"Domain",params);
			copyArg(msg,"DomainIAMRoleName",params);
			copyArg(msg,"EnableIAMDatabaseAuthentication",params);
			copyArg(msg,"EngineVersion",params);
			copyArg(msg,"Iops",params);
			copyArg(msg,"LicenseModel",params);
			copyArg(msg,"MasterUserPassword",params);
			copyArg(msg,"MonitoringInterval",params);
			copyArg(msg,"MonitoringRoleArn",params);
			copyArg(msg,"MultiAZ",params);
			copyArg(msg,"NewDBInstanceIdentifier",params);
			copyArg(msg,"OptionGroupName",params);
			copyArg(msg,"PreferredBackupWindow",params);
			copyArg(msg,"PreferredMaintenanceWindow",params);
			copyArg(msg,"PromotionTier",params);
			copyArg(msg,"PubliclyAccessible",params);
			copyArg(msg,"StorageType",params);
			copyArg(msg,"TdeCredentialArn",params);
			copyArg(msg,"TdeCredentialPassword",params);
			copyArg(msg,"VpcSecurityGroupIds",params);
			svc.applyPendingMaintenanceAction(params, cb);
		};

		service.rebootDBInstance=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBInstanceIdentifier");

			svc.rebootDBInstance(params, cb);
		};

		service.startDBInstance=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBInstanceIdentifier");

			svc.startDBInstance(params, cb);
		};

		service.stopDBInstance=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBInstanceIdentifier");

			svc.stopDBInstance(params, cb);
		};

		service.describeDBEngineVersions=function(svc,msg,iParams,cb){
			var params={};
			copyArg(iParams,"name",params,"DBParameterGroupFamily");
			copyArg(iParams,"DBParameterGroupFamily",params,"DBParameterGroupFamily");

			copyArg(msg,"DefaultOnly",params);
			copyArg(msg,"Engine",params);
			copyArg(msg,"EngineVersion",params);
			copyArg(msg,"Filters",params);

			copyArg(msg,"ListSupportedCharacterSets",params);
			copyArg(msg,"ListSupportedTimezones",params);
			copyArg(msg,"Marker",params);
			copyArg(msg,"MaxRecords",params);
			svc.describeDBEngineVersions(params, cb);
		};


	}
	RED.nodes.registerType("amazon rds", AmazonRDSNode);

};
