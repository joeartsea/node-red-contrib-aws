
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

		var awsService = new AWS.EC2( { 'region': node.region } );

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

		
		service.AcceptReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstanceIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ReservedInstanceIds",params,undefined,true); 
			copyArg(msg,"TargetConfigurations",params,undefined,true); 
			

			svc.acceptReservedInstancesExchangeQuote(params,cb);
		}

		
		service.AcceptVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.acceptVpcEndpointConnections(params,cb);
		}

		
		service.AcceptVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.acceptVpcPeeringConnection(params,cb);
		}

		
		service.AdvertiseByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.advertiseByoipCidr(params,cb);
		}

		
		service.AllocateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"Address",params,undefined,false); 
			copyArg(msg,"PublicIpv4Pool",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.allocateAddress(params,cb);
		}

		
		service.AllocateHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"Quantity",params,undefined,false); 
			
			copyArg(msg,"AutoPlacement",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"Quantity",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			

			svc.allocateHosts(params,cb);
		}

		
		service.AssignIpv6Addresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArg(msg,"Ipv6Addresses",params,undefined,true); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.assignIpv6Addresses(params,cb);
		}

		
		service.AssignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"AllowReassignment",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"PrivateIpAddresses",params,undefined,true); 
			copyArg(msg,"SecondaryPrivateIpAddressCount",params,undefined,false); 
			

			svc.assignPrivateIpAddresses(params,cb);
		}

		
		service.AssociateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AllocationId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			copyArg(msg,"AllowReassociation",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"PrivateIpAddress",params,undefined,false); 
			

			svc.associateAddress(params,cb);
		}

		
		service.AssociateDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpOptionsId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DhcpOptionsId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.associateDhcpOptions(params,cb);
		}

		
		service.AssociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamInstanceProfile",params,undefined,true); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"IamInstanceProfile",params,undefined,true); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.associateIamInstanceProfile(params,cb);
		}

		
		service.AssociateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params,undefined,false); 
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			

			svc.associateRouteTable(params,cb);
		}

		
		service.AssociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			

			svc.associateSubnetCidrBlock(params,cb);
		}

		
		service.AssociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArg(msg,"CidrBlock",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.associateVpcCidrBlock(params,cb);
		}

		
		service.AttachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Groups",params,undefined,true); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.attachClassicLinkVpc(params,cb);
		}

		
		service.AttachInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InternetGatewayId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.attachInternetGateway(params,cb);
		}

		
		service.AttachNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceIndex",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"DeviceIndex",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.attachNetworkInterface(params,cb);
		}

		
		service.AttachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Device",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"Device",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.attachVolume(params,cb);
		}

		
		service.AttachVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"VpnGatewayId",params,undefined,false); 
			
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"VpnGatewayId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.attachVpnGateway(params,cb);
		}

		
		service.AuthorizeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			copyArg(msg,"CidrIp",params,undefined,false); 
			copyArg(msg,"FromPort",params,undefined,false); 
			copyArg(msg,"IpProtocol",params,undefined,false); 
			copyArg(msg,"ToPort",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeSecurityGroupEgress(params,cb);
		}

		
		service.AuthorizeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CidrIp",params,undefined,false); 
			copyArg(msg,"FromPort",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			copyArg(msg,"IpProtocol",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArg(msg,"ToPort",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.authorizeSecurityGroupIngress(params,cb);
		}

		
		service.BundleInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Storage",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Storage",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.bundleInstance(params,cb);
		}

		
		service.CancelBundleTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BundleId",params,undefined,false); 
			
			copyArg(msg,"BundleId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.cancelBundleTask(params,cb);
		}

		
		service.CancelCapacityReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CapacityReservationId",params,undefined,false); 
			
			copyArg(msg,"CapacityReservationId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.cancelCapacityReservation(params,cb);
		}

		
		service.CancelConversionTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConversionTaskId",params,undefined,false); 
			
			copyArg(msg,"ConversionTaskId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ReasonMessage",params,undefined,false); 
			

			svc.cancelConversionTask(params,cb);
		}

		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExportTaskId",params,undefined,false); 
			
			copyArg(msg,"ExportTaskId",params,undefined,false); 
			

			svc.cancelExportTask(params,cb);
		}

		
		service.CancelImportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CancelReason",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ImportTaskId",params,undefined,false); 
			

			svc.cancelImportTask(params,cb);
		}

		
		service.CancelReservedInstancesListing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstancesListingId",params,undefined,false); 
			
			copyArg(msg,"ReservedInstancesListingId",params,undefined,false); 
			

			svc.cancelReservedInstancesListing(params,cb);
		}

		
		service.CancelSpotFleetRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestIds",params,undefined,true); 
			copyArg(n,"TerminateInstances",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestIds",params,undefined,true); 
			copyArg(msg,"TerminateInstances",params,undefined,false); 
			

			svc.cancelSpotFleetRequests(params,cb);
		}

		
		service.CancelSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotInstanceRequestIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"SpotInstanceRequestIds",params,undefined,true); 
			

			svc.cancelSpotInstanceRequests(params,cb);
		}

		
		service.ConfirmProductInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ProductCode",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ProductCode",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.confirmProductInstance(params,cb);
		}

		
		service.CopyFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceFpgaImageId",params,undefined,false); 
			copyArg(n,"SourceRegion",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"SourceFpgaImageId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.copyFpgaImage(params,cb);
		}

		
		service.CopyImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceImageId",params,undefined,false); 
			copyArg(n,"SourceRegion",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SourceImageId",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.copyImage(params,cb);
		}

		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceRegion",params,undefined,false); 
			copyArg(n,"SourceSnapshotId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DestinationRegion",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PresignedUrl",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			copyArg(msg,"SourceSnapshotId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.copySnapshot(params,cb);
		}

		
		service.CreateCapacityReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"InstancePlatform",params,undefined,false); 
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			copyArg(n,"InstanceCount",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"InstancePlatform",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Tenancy",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,false); 
			copyArg(msg,"EphemeralStorage",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"EndDateType",params,undefined,false); 
			copyArg(msg,"InstanceMatchCriteria",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createCapacityReservation(params,cb);
		}

		
		service.CreateCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BgpAsn",params,undefined,false); 
			copyArg(n,"PublicIp",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"BgpAsn",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createCustomerGateway(params,cb);
		}

		
		service.CreateDefaultSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createDefaultSubnet(params,cb);
		}

		
		service.CreateDefaultVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createDefaultVpc(params,cb);
		}

		
		service.CreateDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpConfigurations",params,undefined,false); 
			
			copyArg(msg,"DhcpConfigurations",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createDhcpOptions(params,cb);
		}

		
		service.CreateEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.createEgressOnlyInternetGateway(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchTemplateConfigs",params,undefined,false); 
			copyArg(n,"TargetCapacitySpecification",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"SpotOptions",params,undefined,false); 
			copyArg(msg,"OnDemandOptions",params,undefined,false); 
			copyArg(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArg(msg,"LaunchTemplateConfigs",params,undefined,false); 
			copyArg(msg,"TargetCapacitySpecification",params,undefined,true); 
			copyArg(msg,"TerminateInstancesWithExpiration",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"ValidFrom",params,undefined,false); 
			copyArg(msg,"ValidUntil",params,undefined,false); 
			copyArg(msg,"ReplaceUnhealthyInstances",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIds",params,undefined,true); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"TrafficType",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DeliverLogsPermissionArn",params,undefined,false); 
			copyArg(msg,"LogGroupName",params,undefined,false); 
			copyArg(msg,"ResourceIds",params,undefined,true); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"TrafficType",params,undefined,false); 
			copyArg(msg,"LogDestinationType",params,undefined,false); 
			copyArg(msg,"LogDestination",params,undefined,false); 
			

			svc.createFlowLogs(params,cb);
		}

		
		service.CreateFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputStorageLocation",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InputStorageLocation",params,undefined,true); 
			copyArg(msg,"LogsStorageLocation",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createFpgaImage(params,cb);
		}

		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NoReboot",params,undefined,false); 
			

			svc.createImage(params,cb);
		}

		
		service.CreateInstanceExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ExportToS3Task",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"TargetEnvironment",params,undefined,false); 
			

			svc.createInstanceExportTask(params,cb);
		}

		
		service.CreateInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createInternetGateway(params,cb);
		}

		
		service.CreateKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params,undefined,false); 
			
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createKeyPair(params,cb);
		}

		
		service.CreateLaunchTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchTemplateName",params,undefined,false); 
			copyArg(n,"LaunchTemplateData",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"LaunchTemplateData",params,undefined,true); 
			

			svc.createLaunchTemplate(params,cb);
		}

		
		service.CreateLaunchTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchTemplateData",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"LaunchTemplateId",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			copyArg(msg,"SourceVersion",params,undefined,false); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"LaunchTemplateData",params,undefined,true); 
			

			svc.createLaunchTemplateVersion(params,cb);
		}

		
		service.CreateNatGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AllocationId",params,undefined,false); 
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"AllocationId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			

			svc.createNatGateway(params,cb);
		}

		
		service.CreateNetworkAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.createNetworkAcl(params,cb);
		}

		
		service.CreateNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params,undefined,false); 
			copyArg(n,"NetworkAclId",params,undefined,false); 
			copyArg(n,"Protocol",params,undefined,false); 
			copyArg(n,"RuleAction",params,undefined,false); 
			copyArg(n,"RuleNumber",params,undefined,false); 
			
			copyArg(msg,"CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Egress",params,undefined,false); 
			copyArg(msg,"IcmpTypeCode",params,undefined,true); 
			copyArg(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArg(msg,"NetworkAclId",params,undefined,false); 
			copyArg(msg,"PortRange",params,undefined,true); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"RuleAction",params,undefined,false); 
			copyArg(msg,"RuleNumber",params,undefined,false); 
			

			svc.createNetworkAclEntry(params,cb);
		}

		
		service.CreateNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArg(msg,"Ipv6Addresses",params,undefined,true); 
			copyArg(msg,"PrivateIpAddress",params,undefined,false); 
			copyArg(msg,"PrivateIpAddresses",params,undefined,true); 
			copyArg(msg,"SecondaryPrivateIpAddressCount",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			

			svc.createNetworkInterface(params,cb);
		}

		
		service.CreateNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			copyArg(n,"Permission",params,undefined,false); 
			
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AwsService",params,undefined,false); 
			copyArg(msg,"Permission",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createNetworkInterfacePermission(params,cb);
		}

		
		service.CreatePlacementGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"Strategy",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Strategy",params,undefined,false); 
			

			svc.createPlacementGroup(params,cb);
		}

		
		service.CreateReservedInstancesListing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"InstanceCount",params,undefined,false); 
			copyArg(n,"PriceSchedules",params,undefined,false); 
			copyArg(n,"ReservedInstancesId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"PriceSchedules",params,undefined,false); 
			copyArg(msg,"ReservedInstancesId",params,undefined,false); 
			

			svc.createReservedInstancesListing(params,cb);
		}

		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArg(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArg(msg,"GatewayId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NatGatewayId",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.createRoute(params,cb);
		}

		
		service.CreateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.createRouteTable(params,cb);
		}

		
		service.CreateSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createSecurityGroup(params,cb);
		}

		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createSnapshot(params,cb);
		}

		
		service.CreateSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			

			svc.createSpotDatafeedSubscription(params,cb);
		}

		
		service.CreateSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CidrBlock",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"CidrBlock",params,undefined,false); 
			copyArg(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createSubnet(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resources",params,undefined,true); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Resources",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.CreateVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Size",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"VolumeType",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createVolume(params,cb);
		}

		
		service.CreateVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CidrBlock",params,undefined,false); 
			
			copyArg(msg,"CidrBlock",params,undefined,false); 
			copyArg(msg,"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceTenancy",params,undefined,false); 
			

			svc.createVpc(params,cb);
		}

		
		service.CreateVpcEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"ServiceName",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcEndpointType",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"ServiceName",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			copyArg(msg,"RouteTableIds",params,undefined,true); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"PrivateDnsEnabled",params,undefined,false); 
			

			svc.createVpcEndpoint(params,cb);
		}

		
		service.CreateVpcEndpointConnectionNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionNotificationArn",params,undefined,false); 
			copyArg(n,"ConnectionEvents",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"VpcEndpointId",params,undefined,false); 
			copyArg(msg,"ConnectionNotificationArn",params,undefined,false); 
			copyArg(msg,"ConnectionEvents",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createVpcEndpointConnectionNotification(params,cb);
		}

		
		service.CreateVpcEndpointServiceConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkLoadBalancerArns",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"AcceptanceRequired",params,undefined,false); 
			copyArg(msg,"NetworkLoadBalancerArns",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createVpcEndpointServiceConfiguration(params,cb);
		}

		
		service.CreateVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"PeerOwnerId",params,undefined,false); 
			copyArg(msg,"PeerVpcId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"PeerRegion",params,undefined,false); 
			

			svc.createVpcPeeringConnection(params,cb);
		}

		
		service.CreateVpnConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomerGatewayId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"VpnGatewayId",params,undefined,false); 
			
			copyArg(msg,"CustomerGatewayId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"VpnGatewayId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,false); 
			

			svc.createVpnConnection(params,cb);
		}

		
		service.CreateVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationCidrBlock",params,undefined,false); 
			copyArg(n,"VpnConnectionId",params,undefined,false); 
			
			copyArg(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArg(msg,"VpnConnectionId",params,undefined,false); 
			

			svc.createVpnConnectionRoute(params,cb);
		}

		
		service.CreateVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"AmazonSideAsn",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createVpnGateway(params,cb);
		}

		
		service.DeleteCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomerGatewayId",params,undefined,false); 
			
			copyArg(msg,"CustomerGatewayId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteCustomerGateway(params,cb);
		}

		
		service.DeleteDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpOptionsId",params,undefined,false); 
			
			copyArg(msg,"DhcpOptionsId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteDhcpOptions(params,cb);
		}

		
		service.DeleteEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EgressOnlyInternetGatewayId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			

			svc.deleteEgressOnlyInternetGateway(params,cb);
		}

		
		service.DeleteFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetIds",params,undefined,true); 
			copyArg(n,"TerminateInstances",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FleetIds",params,undefined,true); 
			copyArg(msg,"TerminateInstances",params,undefined,false); 
			

			svc.deleteFleets(params,cb);
		}

		
		service.DeleteFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowLogIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FlowLogIds",params,undefined,true); 
			

			svc.deleteFlowLogs(params,cb);
		}

		
		service.DeleteFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FpgaImageId",params,undefined,false); 
			

			svc.deleteFpgaImage(params,cb);
		}

		
		service.DeleteInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InternetGatewayId",params,undefined,false); 
			

			svc.deleteInternetGateway(params,cb);
		}

		
		service.DeleteKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params,undefined,false); 
			
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteKeyPair(params,cb);
		}

		
		service.DeleteLaunchTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LaunchTemplateId",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			

			svc.deleteLaunchTemplate(params,cb);
		}

		
		service.DeleteLaunchTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Versions",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LaunchTemplateId",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			copyArg(msg,"Versions",params,undefined,true); 
			

			svc.deleteLaunchTemplateVersions(params,cb);
		}

		
		service.DeleteNatGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NatGatewayId",params,undefined,false); 
			
			copyArg(msg,"NatGatewayId",params,undefined,false); 
			

			svc.deleteNatGateway(params,cb);
		}

		
		service.DeleteNetworkAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkAclId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkAclId",params,undefined,false); 
			

			svc.deleteNetworkAcl(params,cb);
		}

		
		service.DeleteNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params,undefined,false); 
			copyArg(n,"NetworkAclId",params,undefined,false); 
			copyArg(n,"RuleNumber",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Egress",params,undefined,false); 
			copyArg(msg,"NetworkAclId",params,undefined,false); 
			copyArg(msg,"RuleNumber",params,undefined,false); 
			

			svc.deleteNetworkAclEntry(params,cb);
		}

		
		service.DeleteNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.deleteNetworkInterface(params,cb);
		}

		
		service.DeleteNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfacePermissionId",params,undefined,false); 
			
			copyArg(msg,"NetworkInterfacePermissionId",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteNetworkInterfacePermission(params,cb);
		}

		
		service.DeletePlacementGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			

			svc.deletePlacementGroup(params,cb);
		}

		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArg(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			

			svc.deleteRoute(params,cb);
		}

		
		service.DeleteRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			

			svc.deleteRouteTable(params,cb);
		}

		
		service.DeleteSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSecurityGroup(params,cb);
		}

		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}

		
		service.DeleteSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSpotDatafeedSubscription(params,cb);
		}

		
		service.DeleteSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSubnet(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resources",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Resources",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVolume(params,cb);
		}

		
		service.DeleteVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpc(params,cb);
		}

		
		service.DeleteVpcEndpointConnectionNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionNotificationIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ConnectionNotificationIds",params,undefined,true); 
			

			svc.deleteVpcEndpointConnectionNotifications(params,cb);
		}

		
		service.DeleteVpcEndpointServiceConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceIds",params,undefined,true); 
			

			svc.deleteVpcEndpointServiceConfigurations(params,cb);
		}

		
		service.DeleteVpcEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.deleteVpcEndpoints(params,cb);
		}

		
		service.DeleteVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.deleteVpcPeeringConnection(params,cb);
		}

		
		service.DeleteVpnConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpnConnectionId",params,undefined,false); 
			
			copyArg(msg,"VpnConnectionId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpnConnection(params,cb);
		}

		
		service.DeleteVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationCidrBlock",params,undefined,false); 
			copyArg(n,"VpnConnectionId",params,undefined,false); 
			
			copyArg(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArg(msg,"VpnConnectionId",params,undefined,false); 
			

			svc.deleteVpnConnectionRoute(params,cb);
		}

		
		service.DeleteVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpnGatewayId",params,undefined,false); 
			
			copyArg(msg,"VpnGatewayId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpnGateway(params,cb);
		}

		
		service.DeprovisionByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deprovisionByoipCidr(params,cb);
		}

		
		service.DeregisterImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deregisterImage(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AttributeNames",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"PublicIps",params,undefined,false); 
			copyArg(msg,"AllocationIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeAddresses(params,cb);
		}

		
		service.DescribeAggregateIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeAggregateIdFormat(params,cb);
		}

		
		service.DescribeAvailabilityZones=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ZoneNames",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeAvailabilityZones(params,cb);
		}

		
		service.DescribeBundleTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BundleIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeBundleTasks(params,cb);
		}

		
		service.DescribeByoipCidrs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaxResults",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeByoipCidrs(params,cb);
		}

		
		service.DescribeCapacityReservations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CapacityReservationIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeCapacityReservations(params,cb);
		}

		
		service.DescribeClassicLinkInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeClassicLinkInstances(params,cb);
		}

		
		service.DescribeConversionTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConversionTaskIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeConversionTasks(params,cb);
		}

		
		service.DescribeCustomerGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CustomerGatewayIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeCustomerGateways(params,cb);
		}

		
		service.DescribeDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DhcpOptionsIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeDhcpOptions(params,cb);
		}

		
		service.DescribeEgressOnlyInternetGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EgressOnlyInternetGatewayIds",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEgressOnlyInternetGateways(params,cb);
		}

		
		service.DescribeElasticGpus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ElasticGpuIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeElasticGpus(params,cb);
		}

		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExportTaskIds",params,undefined,false); 
			

			svc.describeExportTasks(params,cb);
		}

		
		service.DescribeFleetHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EventType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			

			svc.describeFleetHistory(params,cb);
		}

		
		service.DescribeFleetInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.describeFleetInstances(params,cb);
		}

		
		service.DescribeFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"FleetIds",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.describeFleets(params,cb);
		}

		
		service.DescribeFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"FlowLogIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFlowLogs(params,cb);
		}

		
		service.DescribeFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params,undefined,false); 
			copyArg(n,"Attribute",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FpgaImageId",params,undefined,false); 
			copyArg(msg,"Attribute",params,undefined,false); 
			

			svc.describeFpgaImageAttribute(params,cb);
		}

		
		service.DescribeFpgaImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FpgaImageIds",params,undefined,false); 
			copyArg(msg,"Owners",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeFpgaImages(params,cb);
		}

		
		service.DescribeHostReservationOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"MaxDuration",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"MinDuration",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"OfferingId",params,undefined,false); 
			

			svc.describeHostReservationOfferings(params,cb);
		}

		
		service.DescribeHostReservations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"HostReservationIdSet",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeHostReservations(params,cb);
		}

		
		service.DescribeHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"HostIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeHosts(params,cb);
		}

		
		service.DescribeIamInstanceProfileAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssociationIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeIamInstanceProfileAssociations(params,cb);
		}

		
		service.DescribeIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Resource",params,undefined,false); 
			

			svc.describeIdFormat(params,cb);
		}

		
		service.DescribeIdentityIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PrincipalArn",params,undefined,false); 
			
			copyArg(msg,"PrincipalArn",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,false); 
			

			svc.describeIdentityIdFormat(params,cb);
		}

		
		service.DescribeImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeImageAttribute(params,cb);
		}

		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExecutableUsers",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ImageIds",params,undefined,false); 
			copyArg(msg,"Owners",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeImages(params,cb);
		}

		
		service.DescribeImportImageTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ImportTaskIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeImportImageTasks(params,cb);
		}

		
		service.DescribeImportSnapshotTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ImportTaskIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeImportSnapshotTasks(params,cb);
		}

		
		service.DescribeInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.describeInstanceAttribute(params,cb);
		}

		
		service.DescribeInstanceCreditSpecifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceCreditSpecifications(params,cb);
		}

		
		service.DescribeInstanceStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"IncludeAllInstances",params,undefined,false); 
			

			svc.describeInstanceStatus(params,cb);
		}

		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstances(params,cb);
		}

		
		service.DescribeInternetGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InternetGatewayIds",params,undefined,true); 
			

			svc.describeInternetGateways(params,cb);
		}

		
		service.DescribeKeyPairs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"KeyNames",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeKeyPairs(params,cb);
		}

		
		service.DescribeLaunchTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LaunchTemplateId",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			copyArg(msg,"Versions",params,undefined,true); 
			copyArg(msg,"MinVersion",params,undefined,false); 
			copyArg(msg,"MaxVersion",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.describeLaunchTemplateVersions(params,cb);
		}

		
		service.DescribeLaunchTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LaunchTemplateIds",params,undefined,true); 
			copyArg(msg,"LaunchTemplateNames",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeLaunchTemplates(params,cb);
		}

		
		service.DescribeMovingAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PublicIps",params,undefined,true); 
			

			svc.describeMovingAddresses(params,cb);
		}

		
		service.DescribeNatGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NatGatewayIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeNatGateways(params,cb);
		}

		
		service.DescribeNetworkAcls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkAclIds",params,undefined,true); 
			

			svc.describeNetworkAcls(params,cb);
		}

		
		service.DescribeNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.describeNetworkInterfaceAttribute(params,cb);
		}

		
		service.DescribeNetworkInterfacePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NetworkInterfacePermissionIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeNetworkInterfacePermissions(params,cb);
		}

		
		service.DescribeNetworkInterfaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeNetworkInterfaces(params,cb);
		}

		
		service.DescribePlacementGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupNames",params,undefined,false); 
			

			svc.describePlacementGroups(params,cb);
		}

		
		service.DescribePrefixLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PrefixListIds",params,undefined,true); 
			

			svc.describePrefixLists(params,cb);
		}

		
		service.DescribePrincipalIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Resources",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePrincipalIdFormat(params,cb);
		}

		
		service.DescribePublicIpv4Pools=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PoolIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describePublicIpv4Pools(params,cb);
		}

		
		service.DescribeRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"RegionNames",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeRegions(params,cb);
		}

		
		service.DescribeReservedInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"OfferingClass",params,undefined,false); 
			copyArg(msg,"ReservedInstancesIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			

			svc.describeReservedInstances(params,cb);
		}

		
		service.DescribeReservedInstancesListings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ReservedInstancesId",params,undefined,false); 
			copyArg(msg,"ReservedInstancesListingId",params,undefined,false); 
			

			svc.describeReservedInstancesListings(params,cb);
		}

		
		service.DescribeReservedInstancesModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ReservedInstancesModificationIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeReservedInstancesModifications(params,cb);
		}

		
		service.DescribeReservedInstancesOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"IncludeMarketplace",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"MaxDuration",params,undefined,false); 
			copyArg(msg,"MaxInstanceCount",params,undefined,false); 
			copyArg(msg,"MinDuration",params,undefined,false); 
			copyArg(msg,"OfferingClass",params,undefined,false); 
			copyArg(msg,"ProductDescription",params,undefined,false); 
			copyArg(msg,"ReservedInstancesOfferingIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceTenancy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			

			svc.describeReservedInstancesOfferings(params,cb);
		}

		
		service.DescribeRouteTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RouteTableIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeRouteTables(params,cb);
		}

		
		service.DescribeScheduledInstanceAvailability=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirstSlotStartTimeRange",params,undefined,false); 
			copyArg(n,"Recurrence",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"FirstSlotStartTimeRange",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"MaxSlotDurationInHours",params,undefined,false); 
			copyArg(msg,"MinSlotDurationInHours",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Recurrence",params,undefined,false); 
			

			svc.describeScheduledInstanceAvailability(params,cb);
		}

		
		service.DescribeScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ScheduledInstanceIds",params,undefined,false); 
			copyArg(msg,"SlotStartTimeRange",params,undefined,false); 
			

			svc.describeScheduledInstances(params,cb);
		}

		
		service.DescribeSecurityGroupReferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			

			svc.describeSecurityGroupReferences(params,cb);
		}

		
		service.DescribeSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"GroupIds",params,undefined,true); 
			copyArg(msg,"GroupNames",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeSecurityGroups(params,cb);
		}

		
		service.DescribeSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeSnapshotAttribute(params,cb);
		}

		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"OwnerIds",params,undefined,true); 
			copyArg(msg,"RestorableByUserIds",params,undefined,false); 
			copyArg(msg,"SnapshotIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}

		
		service.DescribeSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeSpotDatafeedSubscription(params,cb);
		}

		
		service.DescribeSpotFleetInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestId",params,undefined,false); 
			

			svc.describeSpotFleetInstances(params,cb);
		}

		
		service.DescribeSpotFleetRequestHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EventType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			

			svc.describeSpotFleetRequestHistory(params,cb);
		}

		
		service.DescribeSpotFleetRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestIds",params,undefined,true); 
			

			svc.describeSpotFleetRequests(params,cb);
		}

		
		service.DescribeSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"SpotInstanceRequestIds",params,undefined,true); 
			

			svc.describeSpotInstanceRequests(params,cb);
		}

		
		service.DescribeSpotPriceHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"InstanceTypes",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ProductDescriptions",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			

			svc.describeSpotPriceHistory(params,cb);
		}

		
		service.DescribeStaleSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.describeStaleSecurityGroups(params,cb);
		}

		
		service.DescribeSubnets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SubnetIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeSubnets(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}

		
		service.DescribeVolumeAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVolumeAttribute(params,cb);
		}

		
		service.DescribeVolumeStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"VolumeIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVolumeStatus(params,cb);
		}

		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"VolumeIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVolumes(params,cb);
		}

		
		service.DescribeVolumesModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VolumeIds",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeVolumesModifications(params,cb);
		}

		
		service.DescribeVpcAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpcAttribute(params,cb);
		}

		
		service.DescribeVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcIds",params,undefined,true); 
			

			svc.describeVpcClassicLink(params,cb);
		}

		
		service.DescribeVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"VpcIds",params,undefined,true); 
			

			svc.describeVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.DescribeVpcEndpointConnectionNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ConnectionNotificationId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointConnectionNotifications(params,cb);
		}

		
		service.DescribeVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointConnections(params,cb);
		}

		
		service.DescribeVpcEndpointServiceConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceIds",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServiceConfigurations(params,cb);
		}

		
		service.DescribeVpcEndpointServicePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServicePermissions(params,cb);
		}

		
		service.DescribeVpcEndpointServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceNames",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServices(params,cb);
		}

		
		service.DescribeVpcEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcEndpointIds",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpoints(params,cb);
		}

		
		service.DescribeVpcPeeringConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionIds",params,undefined,true); 
			

			svc.describeVpcPeeringConnections(params,cb);
		}

		
		service.DescribeVpcs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"VpcIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpcs(params,cb);
		}

		
		service.DescribeVpnConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"VpnConnectionIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpnConnections(params,cb);
		}

		
		service.DescribeVpnGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"VpnGatewayIds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpnGateways(params,cb);
		}

		
		service.DetachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.detachClassicLinkVpc(params,cb);
		}

		
		service.DetachInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InternetGatewayId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.detachInternetGateway(params,cb);
		}

		
		service.DetachNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AttachmentId",params,undefined,false); 
			
			copyArg(msg,"AttachmentId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.detachNetworkInterface(params,cb);
		}

		
		service.DetachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"Device",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.detachVolume(params,cb);
		}

		
		service.DetachVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"VpnGatewayId",params,undefined,false); 
			
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"VpnGatewayId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.detachVpnGateway(params,cb);
		}

		
		service.DisableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayId",params,undefined,false); 
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"GatewayId",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			

			svc.disableVgwRoutePropagation(params,cb);
		}

		
		service.DisableVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.disableVpcClassicLink(params,cb);
		}

		
		service.DisableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.disableVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.DisassociateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateAddress(params,cb);
		}

		
		service.DisassociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateIamInstanceProfile(params,cb);
		}

		
		service.DisassociateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateRouteTable(params,cb);
		}

		
		service.DisassociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateSubnetCidrBlock(params,cb);
		}

		
		service.DisassociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateVpcCidrBlock(params,cb);
		}

		
		service.EnableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayId",params,undefined,false); 
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"GatewayId",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			

			svc.enableVgwRoutePropagation(params,cb);
		}

		
		service.EnableVolumeIO=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			

			svc.enableVolumeIO(params,cb);
		}

		
		service.EnableVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.enableVpcClassicLink(params,cb);
		}

		
		service.EnableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.enableVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.GetConsoleOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Latest",params,undefined,false); 
			

			svc.getConsoleOutput(params,cb);
		}

		
		service.GetConsoleScreenshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"WakeUp",params,undefined,false); 
			

			svc.getConsoleScreenshot(params,cb);
		}

		
		service.GetHostReservationPurchasePreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIdSet",params,undefined,true); 
			copyArg(n,"OfferingId",params,undefined,false); 
			
			copyArg(msg,"HostIdSet",params,undefined,true); 
			copyArg(msg,"OfferingId",params,undefined,false); 
			

			svc.getHostReservationPurchasePreview(params,cb);
		}

		
		service.GetLaunchTemplateData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.getLaunchTemplateData(params,cb);
		}

		
		service.GetPasswordData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.getPasswordData(params,cb);
		}

		
		service.GetReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstanceIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ReservedInstanceIds",params,undefined,true); 
			copyArg(msg,"TargetConfigurations",params,undefined,true); 
			

			svc.getReservedInstancesExchangeQuote(params,cb);
		}

		
		service.ImportImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Architecture",params,undefined,false); 
			copyArg(msg,"ClientData",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DiskContainers",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Hypervisor",params,undefined,false); 
			copyArg(msg,"LicenseType",params,undefined,false); 
			copyArg(msg,"Platform",params,undefined,false); 
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.importImage(params,cb);
		}

		
		service.ImportInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Platform",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DiskImages",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LaunchSpecification",params,undefined,false); 
			copyArg(msg,"Platform",params,undefined,false); 
			

			svc.importInstance(params,cb);
		}

		
		service.ImportKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params,undefined,false); 
			copyArg(n,"PublicKeyMaterial",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"PublicKeyMaterial",params,undefined,false); 
			

			svc.importKeyPair(params,cb);
		}

		
		service.ImportSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClientData",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DiskContainer",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.importSnapshot(params,cb);
		}

		
		service.ImportVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			copyArg(n,"Image",params,undefined,true); 
			copyArg(n,"Volume",params,undefined,true); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Image",params,undefined,true); 
			copyArg(msg,"Volume",params,undefined,true); 
			

			svc.importVolume(params,cb);
		}

		
		service.ModifyCapacityReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CapacityReservationId",params,undefined,false); 
			
			copyArg(msg,"CapacityReservationId",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"EndDateType",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifyCapacityReservation(params,cb);
		}

		
		service.ModifyFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"TargetCapacitySpecification",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"TargetCapacitySpecification",params,undefined,true); 
			

			svc.modifyFleet(params,cb);
		}

		
		service.ModifyFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FpgaImageId",params,undefined,false); 
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"OperationType",params,undefined,false); 
			copyArg(msg,"UserIds",params,undefined,true); 
			copyArg(msg,"UserGroups",params,undefined,true); 
			copyArg(msg,"ProductCodes",params,undefined,true); 
			copyArg(msg,"LoadPermission",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.modifyFpgaImageAttribute(params,cb);
		}

		
		service.ModifyHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoPlacement",params,undefined,false); 
			copyArg(n,"HostIds",params,undefined,true); 
			
			copyArg(msg,"AutoPlacement",params,undefined,false); 
			copyArg(msg,"HostIds",params,undefined,true); 
			

			svc.modifyHosts(params,cb);
		}

		
		service.ModifyIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"UseLongIds",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"UseLongIds",params,undefined,false); 
			

			svc.modifyIdFormat(params,cb);
		}

		
		service.ModifyIdentityIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PrincipalArn",params,undefined,false); 
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"UseLongIds",params,undefined,false); 
			
			copyArg(msg,"PrincipalArn",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"UseLongIds",params,undefined,false); 
			

			svc.modifyIdentityIdFormat(params,cb);
		}

		
		service.ModifyImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"LaunchPermission",params,undefined,false); 
			copyArg(msg,"OperationType",params,undefined,false); 
			copyArg(msg,"ProductCodes",params,undefined,true); 
			copyArg(msg,"UserGroups",params,undefined,true); 
			copyArg(msg,"UserIds",params,undefined,true); 
			copyArg(msg,"Value",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifyImageAttribute(params,cb);
		}

		
		service.ModifyInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"SourceDestCheck",params,undefined,true); 
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"BlockDeviceMappings",params,undefined,false); 
			copyArg(msg,"DisableApiTermination",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,true); 
			copyArg(msg,"EnaSupport",params,undefined,true); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"InstanceInitiatedShutdownBehavior",params,undefined,true); 
			copyArg(msg,"InstanceType",params,undefined,true); 
			copyArg(msg,"Kernel",params,undefined,true); 
			copyArg(msg,"Ramdisk",params,undefined,true); 
			copyArg(msg,"SriovNetSupport",params,undefined,true); 
			copyArg(msg,"UserData",params,undefined,false); 
			copyArg(msg,"Value",params,undefined,false); 
			

			svc.modifyInstanceAttribute(params,cb);
		}

		
		service.ModifyInstanceCapacityReservationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"CapacityReservationSpecification",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"CapacityReservationSpecification",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifyInstanceCapacityReservationAttributes(params,cb);
		}

		
		service.ModifyInstanceCreditSpecification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceCreditSpecifications",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"InstanceCreditSpecifications",params,undefined,false); 
			

			svc.modifyInstanceCreditSpecification(params,cb);
		}

		
		service.ModifyInstancePlacement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Affinity",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"HostId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Tenancy",params,undefined,false); 
			

			svc.modifyInstancePlacement(params,cb);
		}

		
		service.ModifyLaunchTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"LaunchTemplateId",params,undefined,false); 
			copyArg(msg,"LaunchTemplateName",params,undefined,false); 
			copyArg(msg,"DefaultVersion",params,undefined,false); 
			

			svc.modifyLaunchTemplate(params,cb);
		}

		
		service.ModifyNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"Attachment",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"SourceDestCheck",params,undefined,true); 
			

			svc.modifyNetworkInterfaceAttribute(params,cb);
		}

		
		service.ModifyReservedInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstancesIds",params,undefined,true); 
			copyArg(n,"TargetConfigurations",params,undefined,false); 
			
			copyArg(msg,"ReservedInstancesIds",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"TargetConfigurations",params,undefined,false); 
			

			svc.modifyReservedInstances(params,cb);
		}

		
		service.ModifySnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"CreateVolumePermission",params,undefined,false); 
			copyArg(msg,"GroupNames",params,undefined,true); 
			copyArg(msg,"OperationType",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"UserIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifySnapshotAttribute(params,cb);
		}

		
		service.ModifySpotFleetRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params,undefined,false); 
			
			copyArg(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestId",params,undefined,false); 
			copyArg(msg,"TargetCapacity",params,undefined,false); 
			

			svc.modifySpotFleetRequest(params,cb);
		}

		
		service.ModifySubnetAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"AssignIpv6AddressOnCreation",params,undefined,true); 
			copyArg(msg,"MapPublicIpOnLaunch",params,undefined,true); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			

			svc.modifySubnetAttribute(params,cb);
		}

		
		service.ModifyVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"Size",params,undefined,false); 
			copyArg(msg,"VolumeType",params,undefined,false); 
			copyArg(msg,"Iops",params,undefined,false); 
			

			svc.modifyVolume(params,cb);
		}

		
		service.ModifyVolumeAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"AutoEnableIO",params,undefined,true); 
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVolumeAttribute(params,cb);
		}

		
		service.ModifyVpcAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"EnableDnsHostnames",params,undefined,true); 
			copyArg(msg,"EnableDnsSupport",params,undefined,true); 
			copyArg(msg,"VpcId",params,undefined,false); 
			

			svc.modifyVpcAttribute(params,cb);
		}

		
		service.ModifyVpcEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcEndpointId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcEndpointId",params,undefined,false); 
			copyArg(msg,"ResetPolicy",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			copyArg(msg,"AddRouteTableIds",params,undefined,true); 
			copyArg(msg,"RemoveRouteTableIds",params,undefined,true); 
			copyArg(msg,"AddSubnetIds",params,undefined,true); 
			copyArg(msg,"RemoveSubnetIds",params,undefined,true); 
			copyArg(msg,"AddSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"RemoveSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"PrivateDnsEnabled",params,undefined,false); 
			

			svc.modifyVpcEndpoint(params,cb);
		}

		
		service.ModifyVpcEndpointConnectionNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionNotificationId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ConnectionNotificationId",params,undefined,false); 
			copyArg(msg,"ConnectionNotificationArn",params,undefined,false); 
			copyArg(msg,"ConnectionEvents",params,undefined,true); 
			

			svc.modifyVpcEndpointConnectionNotification(params,cb);
		}

		
		service.ModifyVpcEndpointServiceConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"AcceptanceRequired",params,undefined,false); 
			copyArg(msg,"AddNetworkLoadBalancerArns",params,undefined,true); 
			copyArg(msg,"RemoveNetworkLoadBalancerArns",params,undefined,true); 
			

			svc.modifyVpcEndpointServiceConfiguration(params,cb);
		}

		
		service.ModifyVpcEndpointServicePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"AddAllowedPrincipals",params,undefined,true); 
			copyArg(msg,"RemoveAllowedPrincipals",params,undefined,true); 
			

			svc.modifyVpcEndpointServicePermissions(params,cb);
		}

		
		service.ModifyVpcPeeringConnectionOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArg(msg,"AccepterPeeringConnectionOptions",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RequesterPeeringConnectionOptions",params,undefined,true); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.modifyVpcPeeringConnectionOptions(params,cb);
		}

		
		service.ModifyVpcTenancy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"InstanceTenancy",params,undefined,false); 
			
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"InstanceTenancy",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpcTenancy(params,cb);
		}

		
		service.MonitorInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.monitorInstances(params,cb);
		}

		
		service.MoveAddressToVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicIp",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			

			svc.moveAddressToVpc(params,cb);
		}

		
		service.ProvisionByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			copyArg(msg,"CidrAuthorizationContext",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.provisionByoipCidr(params,cb);
		}

		
		service.PurchaseHostReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIdSet",params,undefined,true); 
			copyArg(n,"OfferingId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"CurrencyCode",params,undefined,false); 
			copyArg(msg,"HostIdSet",params,undefined,true); 
			copyArg(msg,"LimitPrice",params,undefined,false); 
			copyArg(msg,"OfferingId",params,undefined,false); 
			

			svc.purchaseHostReservation(params,cb);
		}

		
		service.PurchaseReservedInstancesOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceCount",params,undefined,false); 
			copyArg(n,"ReservedInstancesOfferingId",params,undefined,false); 
			
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"ReservedInstancesOfferingId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"LimitPrice",params,undefined,false); 
			

			svc.purchaseReservedInstancesOffering(params,cb);
		}

		
		service.PurchaseScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PurchaseRequests",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"PurchaseRequests",params,undefined,false); 
			

			svc.purchaseScheduledInstances(params,cb);
		}

		
		service.RebootInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.rebootInstances(params,cb);
		}

		
		service.RegisterImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ImageLocation",params,undefined,false); 
			copyArg(msg,"Architecture",params,undefined,false); 
			copyArg(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EnaSupport",params,undefined,false); 
			copyArg(msg,"KernelId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BillingProducts",params,undefined,false); 
			copyArg(msg,"RamdiskId",params,undefined,false); 
			copyArg(msg,"RootDeviceName",params,undefined,false); 
			copyArg(msg,"SriovNetSupport",params,undefined,false); 
			copyArg(msg,"VirtualizationType",params,undefined,false); 
			

			svc.registerImage(params,cb);
		}

		
		service.RejectVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.rejectVpcEndpointConnections(params,cb);
		}

		
		service.RejectVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.rejectVpcPeeringConnection(params,cb);
		}

		
		service.ReleaseAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AllocationId",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.releaseAddress(params,cb);
		}

		
		service.ReleaseHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIds",params,undefined,true); 
			
			copyArg(msg,"HostIds",params,undefined,true); 
			

			svc.releaseHosts(params,cb);
		}

		
		service.ReplaceIamInstanceProfileAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamInstanceProfile",params,undefined,true); 
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"IamInstanceProfile",params,undefined,true); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.replaceIamInstanceProfileAssociation(params,cb);
		}

		
		service.ReplaceNetworkAclAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"NetworkAclId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkAclId",params,undefined,false); 
			

			svc.replaceNetworkAclAssociation(params,cb);
		}

		
		service.ReplaceNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params,undefined,false); 
			copyArg(n,"NetworkAclId",params,undefined,false); 
			copyArg(n,"Protocol",params,undefined,false); 
			copyArg(n,"RuleAction",params,undefined,false); 
			copyArg(n,"RuleNumber",params,undefined,false); 
			
			copyArg(msg,"CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Egress",params,undefined,false); 
			copyArg(msg,"IcmpTypeCode",params,undefined,true); 
			copyArg(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArg(msg,"NetworkAclId",params,undefined,false); 
			copyArg(msg,"PortRange",params,undefined,true); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"RuleAction",params,undefined,false); 
			copyArg(msg,"RuleNumber",params,undefined,false); 
			

			svc.replaceNetworkAclEntry(params,cb);
		}

		
		service.ReplaceRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArg(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArg(msg,"GatewayId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NatGatewayId",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.replaceRoute(params,cb);
		}

		
		service.ReplaceRouteTableAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"RouteTableId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"RouteTableId",params,undefined,false); 
			

			svc.replaceRouteTableAssociation(params,cb);
		}

		
		service.ReportInstanceStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Instances",params,undefined,true); 
			copyArg(n,"ReasonCodes",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Instances",params,undefined,true); 
			copyArg(msg,"ReasonCodes",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.reportInstanceStatus(params,cb);
		}

		
		service.RequestSpotFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestConfig",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"SpotFleetRequestConfig",params,undefined,true); 
			

			svc.requestSpotFleet(params,cb);
		}

		
		service.RequestSpotInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AvailabilityZoneGroup",params,undefined,false); 
			copyArg(msg,"BlockDurationMinutes",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"LaunchGroup",params,undefined,false); 
			copyArg(msg,"LaunchSpecification",params,undefined,false); 
			copyArg(msg,"SpotPrice",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"ValidFrom",params,undefined,false); 
			copyArg(msg,"ValidUntil",params,undefined,false); 
			copyArg(msg,"InstanceInterruptionBehavior",params,undefined,false); 
			

			svc.requestSpotInstances(params,cb);
		}

		
		service.ResetFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"FpgaImageId",params,undefined,false); 
			copyArg(msg,"Attribute",params,undefined,false); 
			

			svc.resetFpgaImageAttribute(params,cb);
		}

		
		service.ResetImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.resetImageAttribute(params,cb);
		}

		
		service.ResetInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.resetInstanceAttribute(params,cb);
		}

		
		service.ResetNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"SourceDestCheck",params,undefined,false); 
			

			svc.resetNetworkInterfaceAttribute(params,cb);
		}

		
		service.ResetSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params,undefined,false); 
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"Attribute",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.resetSnapshotAttribute(params,cb);
		}

		
		service.RestoreAddressToClassic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicIp",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			

			svc.restoreAddressToClassic(params,cb);
		}

		
		service.RevokeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			copyArg(msg,"CidrIp",params,undefined,false); 
			copyArg(msg,"FromPort",params,undefined,false); 
			copyArg(msg,"IpProtocol",params,undefined,false); 
			copyArg(msg,"ToPort",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeSecurityGroupEgress(params,cb);
		}

		
		service.RevokeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CidrIp",params,undefined,false); 
			copyArg(msg,"FromPort",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			copyArg(msg,"IpProtocol",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArg(msg,"ToPort",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.revokeSecurityGroupIngress(params,cb);
		}

		
		service.RunInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaxCount",params,undefined,false); 
			copyArg(n,"MinCount",params,undefined,false); 
			
			copyArg(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArg(msg,"Ipv6Addresses",params,undefined,true); 
			copyArg(msg,"KernelId",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"MaxCount",params,undefined,false); 
			copyArg(msg,"MinCount",params,undefined,false); 
			copyArg(msg,"Monitoring",params,undefined,true); 
			copyArg(msg,"Placement",params,undefined,true); 
			copyArg(msg,"RamdiskId",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"UserData",params,undefined,false); 
			copyArg(msg,"AdditionalInfo",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DisableApiTermination",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,false); 
			copyArg(msg,"IamInstanceProfile",params,undefined,true); 
			copyArg(msg,"InstanceInitiatedShutdownBehavior",params,undefined,false); 
			copyArg(msg,"NetworkInterfaces",params,undefined,true); 
			copyArg(msg,"PrivateIpAddress",params,undefined,false); 
			copyArg(msg,"ElasticGpuSpecification",params,undefined,false); 
			copyArg(msg,"TagSpecifications",params,undefined,true); 
			copyArg(msg,"LaunchTemplate",params,undefined,false); 
			copyArg(msg,"InstanceMarketOptions",params,undefined,false); 
			copyArg(msg,"CreditSpecification",params,undefined,true); 
			copyArg(msg,"CpuOptions",params,undefined,false); 
			copyArg(msg,"CapacityReservationSpecification",params,undefined,true); 
			

			svc.runInstances(params,cb);
		}

		
		service.RunScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchSpecification",params,undefined,false); 
			copyArg(n,"ScheduledInstanceId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			copyArg(msg,"LaunchSpecification",params,undefined,false); 
			copyArg(msg,"ScheduledInstanceId",params,undefined,false); 
			

			svc.runScheduledInstances(params,cb);
		}

		
		service.StartInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AdditionalInfo",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.startInstances(params,cb);
		}

		
		service.StopInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.stopInstances(params,cb);
		}

		
		service.TerminateInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.terminateInstances(params,cb);
		}

		
		service.UnassignIpv6Addresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ipv6Addresses",params,undefined,true); 
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"Ipv6Addresses",params,undefined,true); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.unassignIpv6Addresses(params,cb);
		}

		
		service.UnassignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			copyArg(n,"PrivateIpAddresses",params,undefined,true); 
			
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"PrivateIpAddresses",params,undefined,true); 
			

			svc.unassignPrivateIpAddresses(params,cb);
		}

		
		service.UnmonitorInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.unmonitorInstances(params,cb);
		}

		
		service.UpdateSecurityGroupRuleDescriptionsEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IpPermissions",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			

			svc.updateSecurityGroupRuleDescriptionsEgress(params,cb);
		}

		
		service.UpdateSecurityGroupRuleDescriptionsIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IpPermissions",params,undefined,true); 
			
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"IpPermissions",params,undefined,true); 
			

			svc.updateSecurityGroupRuleDescriptionsIngress(params,cb);
		}

		
		service.WithdrawByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.withdrawByoipCidr(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS EC2", AmazonAPINode);

};
