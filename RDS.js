
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

		var awsService = new AWS.RDS( { 'region': node.region } );

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

		
		service.AddRoleToDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.addRoleToDBCluster(params,cb);
		}

		
		service.AddSourceIdentifierToSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			copyArg(n,"SourceIdentifier",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SourceIdentifier",params,undefined,false); 
			

			svc.addSourceIdentifierToSubscription(params,cb);
		}

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.ApplyPendingMaintenanceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdentifier",params,undefined,false); 
			copyArg(n,"ApplyAction",params,undefined,false); 
			copyArg(n,"OptInType",params,undefined,false); 
			
			copyArg(msg,"ResourceIdentifier",params,undefined,false); 
			copyArg(msg,"ApplyAction",params,undefined,false); 
			copyArg(msg,"OptInType",params,undefined,false); 
			

			svc.applyPendingMaintenanceAction(params,cb);
		}

		
		service.AuthorizeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArg(msg,"CIDRIP",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupId",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeDBSecurityGroupIngress(params,cb);
		}

		
		service.BacktrackDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"BacktrackTo",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"BacktrackTo",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			copyArg(msg,"UseEarliestTimeOnPointInTimeUnavailable",params,undefined,false); 
			

			svc.backtrackDBCluster(params,cb);
		}

		
		service.CopyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBClusterParameterGroupDescription",params,undefined,false); 
			
			copyArg(msg,"SourceDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBClusterParameterGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copyDBClusterParameterGroup(params,cb);
		}

		
		service.CopyDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PreSignedUrl",params,undefined,false); 
			copyArg(msg,"CopyTags",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			

			svc.copyDBClusterSnapshot(params,cb);
		}

		
		service.CopyDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBParameterGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBParameterGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBParameterGroupDescription",params,undefined,false); 
			
			copyArg(msg,"SourceDBParameterGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBParameterGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBParameterGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copyDBParameterGroup(params,cb);
		}

		
		service.CopyDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"SourceDBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"CopyTags",params,undefined,false); 
			copyArg(msg,"PreSignedUrl",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			

			svc.copyDBSnapshot(params,cb);
		}

		
		service.CopyOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceOptionGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetOptionGroupIdentifier",params,undefined,false); 
			copyArg(n,"TargetOptionGroupDescription",params,undefined,false); 
			
			copyArg(msg,"SourceOptionGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetOptionGroupIdentifier",params,undefined,false); 
			copyArg(msg,"TargetOptionGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copyOptionGroup(params,cb);
		}

		
		service.CreateDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"CharacterSetName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MasterUsername",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"ReplicationSourceIdentifier",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"StorageEncrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PreSignedUrl",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"BacktrackWindow",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"EngineMode",params,undefined,false); 
			copyArg(msg,"ScalingConfiguration",params,undefined,true); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			

			svc.createDBCluster(params,cb);
		}

		
		service.CreateDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBClusterParameterGroup(params,cb);
		}

		
		service.CreateDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBClusterSnapshot(params,cb);
		}

		
		service.CreateDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"DBInstanceClass",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			
			copyArg(msg,"DBName",params,undefined,false); 
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"AllocatedStorage",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"MasterUsername",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"DBSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"CharacterSetName",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"TdeCredentialArn",params,undefined,false); 
			copyArg(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArg(msg,"StorageEncrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"MonitoringInterval",params,undefined,false); 
			copyArg(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArg(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArg(msg,"PromotionTier",params,undefined,false); 
			copyArg(msg,"Timezone",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.createDBInstance(params,cb);
		}

		
		service.CreateDBInstanceReadReplica=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"SourceDBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"MonitoringInterval",params,undefined,false); 
			copyArg(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PreSignedUrl",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			

			svc.createDBInstanceReadReplica(params,cb);
		}

		
		service.CreateDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params,undefined,false); 
			copyArg(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBParameterGroup(params,cb);
		}

		
		service.CreateDBSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params,undefined,false); 
			copyArg(n,"DBSecurityGroupDescription",params,undefined,false); 
			
			copyArg(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArg(msg,"DBSecurityGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBSecurityGroup(params,cb);
		}

		
		service.CreateDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBSnapshot(params,cb);
		}

		
		service.CreateDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params,undefined,false); 
			copyArg(n,"DBSubnetGroupDescription",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupDescription",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDBSubnetGroup(params,cb);
		}

		
		service.CreateEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			copyArg(n,"SnsTopicArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"EventCategories",params,undefined,true); 
			copyArg(msg,"SourceIds",params,undefined,true); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEventSubscription(params,cb);
		}

		
		service.CreateOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params,undefined,false); 
			copyArg(n,"EngineName",params,undefined,false); 
			copyArg(n,"MajorEngineVersion",params,undefined,false); 
			copyArg(n,"OptionGroupDescription",params,undefined,false); 
			
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"EngineName",params,undefined,false); 
			copyArg(msg,"MajorEngineVersion",params,undefined,false); 
			copyArg(msg,"OptionGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createOptionGroup(params,cb);
		}

		
		service.DeleteDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SkipFinalSnapshot",params,undefined,false); 
			copyArg(msg,"FinalDBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBCluster(params,cb);
		}

		
		service.DeleteDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			

			svc.deleteDBClusterParameterGroup(params,cb);
		}

		
		service.DeleteDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBClusterSnapshot(params,cb);
		}

		
		service.DeleteDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"SkipFinalSnapshot",params,undefined,false); 
			copyArg(msg,"FinalDBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBInstance(params,cb);
		}

		
		service.DeleteDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			

			svc.deleteDBParameterGroup(params,cb);
		}

		
		service.DeleteDBSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"DBSecurityGroupName",params,undefined,false); 
			

			svc.deleteDBSecurityGroup(params,cb);
		}

		
		service.DeleteDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBSnapshot(params,cb);
		}

		
		service.DeleteDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			

			svc.deleteDBSubnetGroup(params,cb);
		}

		
		service.DeleteEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			

			svc.deleteEventSubscription(params,cb);
		}

		
		service.DeleteOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params,undefined,false); 
			
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			

			svc.deleteOptionGroup(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CertificateIdentifier",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCertificates(params,cb);
		}

		
		service.DescribeDBClusterBacktracks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"BacktrackIdentifier",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterBacktracks(params,cb);
		}

		
		service.DescribeDBClusterParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterParameterGroups(params,cb);
		}

		
		service.DescribeDBClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterParameters(params,cb);
		}

		
		service.DescribeDBClusterSnapshotAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			

			svc.describeDBClusterSnapshotAttributes(params,cb);
		}

		
		service.DescribeDBClusterSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotType",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"IncludeShared",params,undefined,false); 
			copyArg(msg,"IncludePublic",params,undefined,false); 
			

			svc.describeDBClusterSnapshots(params,cb);
		}

		
		service.DescribeDBClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusters(params,cb);
		}

		
		service.DescribeDBEngineVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"DefaultOnly",params,undefined,false); 
			copyArg(msg,"ListSupportedCharacterSets",params,undefined,false); 
			copyArg(msg,"ListSupportedTimezones",params,undefined,false); 
			

			svc.describeDBEngineVersions(params,cb);
		}

		
		service.DescribeDBInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBInstances(params,cb);
		}

		
		service.DescribeDBLogFiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"FilenameContains",params,undefined,false); 
			copyArg(msg,"FileLastWritten",params,undefined,false); 
			copyArg(msg,"FileSize",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBLogFiles(params,cb);
		}

		
		service.DescribeDBParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBParameterGroups(params,cb);
		}

		
		service.DescribeDBParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBParameters(params,cb);
		}

		
		service.DescribeDBSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBSecurityGroups(params,cb);
		}

		
		service.DescribeDBSnapshotAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.describeDBSnapshotAttributes(params,cb);
		}

		
		service.DescribeDBSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotType",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"IncludeShared",params,undefined,false); 
			copyArg(msg,"IncludePublic",params,undefined,false); 
			

			svc.describeDBSnapshots(params,cb);
		}

		
		service.DescribeDBSubnetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDBSubnetGroups(params,cb);
		}

		
		service.DescribeEngineDefaultClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupFamily",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultClusterParameters(params,cb);
		}

		
		service.DescribeEngineDefaultParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupFamily",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultParameters(params,cb);
		}

		
		service.DescribeEventCategories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.describeEventCategories(params,cb);
		}

		
		service.DescribeEventSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEventSubscriptions(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceIdentifier",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"EventCategories",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeOptionGroupOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngineName",params,undefined,false); 
			
			copyArg(msg,"EngineName",params,undefined,false); 
			copyArg(msg,"MajorEngineVersion",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeOptionGroupOptions(params,cb);
		}

		
		service.DescribeOptionGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"EngineName",params,undefined,false); 
			copyArg(msg,"MajorEngineVersion",params,undefined,false); 
			

			svc.describeOptionGroups(params,cb);
		}

		
		service.DescribeOrderableDBInstanceOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Engine",params,undefined,false); 
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"Vpc",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeOrderableDBInstanceOptions(params,cb);
		}

		
		service.DescribePendingMaintenanceActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceIdentifier",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describePendingMaintenanceActions(params,cb);
		}

		
		service.DescribeReservedDBInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedDBInstanceId",params,undefined,false); 
			copyArg(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"ProductDescription",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedDBInstances(params,cb);
		}

		
		service.DescribeReservedDBInstancesOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"ProductDescription",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedDBInstancesOfferings(params,cb);
		}

		
		service.DescribeSourceRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RegionName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.describeSourceRegions(params,cb);
		}

		
		service.DescribeValidDBInstanceModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			

			svc.describeValidDBInstanceModifications(params,cb);
		}

		
		service.DownloadDBLogFilePortion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"LogFileName",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"LogFileName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"NumberOfLines",params,undefined,false); 
			

			svc.downloadDBLogFilePortion(params,cb);
		}

		
		service.FailoverDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBInstanceIdentifier",params,undefined,false); 
			

			svc.failoverDBCluster(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyCurrentDBClusterCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"Capacity",params,undefined,false); 
			copyArg(msg,"SecondsBeforeTimeout",params,undefined,false); 
			copyArg(msg,"TimeoutAction",params,undefined,false); 
			

			svc.modifyCurrentDBClusterCapacity(params,cb);
		}

		
		service.ModifyDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"NewDBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"BacktrackWindow",params,undefined,false); 
			copyArg(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"ScalingConfiguration",params,undefined,true); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.modifyDBCluster(params,cb);
		}

		
		service.ModifyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(n,"Parameters",params,undefined,true); 
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.modifyDBClusterParameterGroup(params,cb);
		}

		
		service.ModifyDBClusterSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"AttributeName",params,undefined,false); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"AttributeName",params,undefined,false); 
			copyArg(msg,"ValuesToAdd",params,undefined,true); 
			copyArg(msg,"ValuesToRemove",params,undefined,true); 
			

			svc.modifyDBClusterSnapshotAttribute(params,cb);
		}

		
		service.ModifyDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"AllocatedStorage",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"DBSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"NewDBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"TdeCredentialArn",params,undefined,false); 
			copyArg(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArg(msg,"CACertificateIdentifier",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"MonitoringInterval",params,undefined,false); 
			copyArg(msg,"DBPortNumber",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArg(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArg(msg,"PromotionTier",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArg(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.modifyDBInstance(params,cb);
		}

		
		service.ModifyDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params,undefined,false); 
			copyArg(n,"Parameters",params,undefined,true); 
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.modifyDBParameterGroup(params,cb);
		}

		
		service.ModifyDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			

			svc.modifyDBSnapshot(params,cb);
		}

		
		service.ModifyDBSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"AttributeName",params,undefined,false); 
			
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"AttributeName",params,undefined,false); 
			copyArg(msg,"ValuesToAdd",params,undefined,true); 
			copyArg(msg,"ValuesToRemove",params,undefined,true); 
			

			svc.modifyDBSnapshotAttribute(params,cb);
		}

		
		service.ModifyDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupDescription",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyDBSubnetGroup(params,cb);
		}

		
		service.ModifyEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"EventCategories",params,undefined,true); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.modifyEventSubscription(params,cb);
		}

		
		service.ModifyOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params,undefined,false); 
			
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"OptionsToInclude",params,undefined,false); 
			copyArg(msg,"OptionsToRemove",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.modifyOptionGroup(params,cb);
		}

		
		service.PromoteReadReplica=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			

			svc.promoteReadReplica(params,cb);
		}

		
		service.PromoteReadReplicaDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.promoteReadReplicaDBCluster(params,cb);
		}

		
		service.PurchaseReservedDBInstancesOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedDBInstancesOfferingId",params,undefined,false); 
			
			copyArg(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArg(msg,"ReservedDBInstanceId",params,undefined,false); 
			copyArg(msg,"DBInstanceCount",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.purchaseReservedDBInstancesOffering(params,cb);
		}

		
		service.RebootDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"ForceFailover",params,undefined,false); 
			

			svc.rebootDBInstance(params,cb);
		}

		
		service.RemoveRoleFromDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.removeRoleFromDBCluster(params,cb);
		}

		
		service.RemoveSourceIdentifierFromSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			copyArg(n,"SourceIdentifier",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SourceIdentifier",params,undefined,false); 
			

			svc.removeSourceIdentifierFromSubscription(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"ResetAllParameters",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.resetDBClusterParameterGroup(params,cb);
		}

		
		service.ResetDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"ResetAllParameters",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.resetDBParameterGroup(params,cb);
		}

		
		service.RestoreDBClusterFromS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			copyArg(n,"MasterUsername",params,undefined,false); 
			copyArg(n,"MasterUserPassword",params,undefined,false); 
			copyArg(n,"SourceEngine",params,undefined,false); 
			copyArg(n,"SourceEngineVersion",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			copyArg(n,"S3IngestionRoleArn",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"CharacterSetName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MasterUsername",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"StorageEncrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"SourceEngine",params,undefined,false); 
			copyArg(msg,"SourceEngineVersion",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"S3Prefix",params,undefined,false); 
			copyArg(msg,"S3IngestionRoleArn",params,undefined,false); 
			copyArg(msg,"BacktrackWindow",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBClusterFromS3(params,cb);
		}

		
		service.RestoreDBClusterFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"BacktrackWindow",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"EngineMode",params,undefined,false); 
			copyArg(msg,"ScalingConfiguration",params,undefined,true); 
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBClusterFromSnapshot(params,cb);
		}

		
		service.RestoreDBClusterToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			copyArg(n,"SourceDBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RestoreType",params,undefined,false); 
			copyArg(msg,"SourceDBClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RestoreToTime",params,undefined,false); 
			copyArg(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"BacktrackWindow",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBClusterToPointInTime(params,cb);
		}

		
		service.RestoreDBInstanceFromDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"DBName",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"TdeCredentialArn",params,undefined,false); 
			copyArg(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBInstanceFromDBSnapshot(params,cb);
		}

		
		service.RestoreDBInstanceFromS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"DBInstanceClass",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			copyArg(n,"SourceEngine",params,undefined,false); 
			copyArg(n,"SourceEngineVersion",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			copyArg(n,"S3IngestionRoleArn",params,undefined,false); 
			
			copyArg(msg,"DBName",params,undefined,false); 
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"AllocatedStorage",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"MasterUsername",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"DBSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"StorageEncrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"MonitoringInterval",params,undefined,false); 
			copyArg(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"SourceEngine",params,undefined,false); 
			copyArg(msg,"SourceEngineVersion",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"S3Prefix",params,undefined,false); 
			copyArg(msg,"S3IngestionRoleArn",params,undefined,false); 
			copyArg(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArg(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBInstanceFromS3(params,cb);
		}

		
		service.RestoreDBInstanceToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArg(n,"TargetDBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"TargetDBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"RestoreTime",params,undefined,false); 
			copyArg(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArg(msg,"DBInstanceClass",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArg(msg,"MultiAZ",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"LicenseModel",params,undefined,false); 
			copyArg(msg,"DBName",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"OptionGroupName",params,undefined,false); 
			copyArg(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"TdeCredentialArn",params,undefined,false); 
			copyArg(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArg(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArg(msg,"ProcessorFeatures",params,undefined,true); 
			copyArg(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArg(msg,"DBParameterGroupName",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBInstanceToPointInTime(params,cb);
		}

		
		service.RevokeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArg(msg,"CIDRIP",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupId",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeDBSecurityGroupIngress(params,cb);
		}

		
		service.StartDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.startDBCluster(params,cb);
		}

		
		service.StartDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			

			svc.startDBInstance(params,cb);
		}

		
		service.StopDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.stopDBCluster(params,cb);
		}

		
		service.StopDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArg(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArg(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.stopDBInstance(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS RDS", AmazonAPINode);

};
