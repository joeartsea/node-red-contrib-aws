module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.accessKey = n.accessKey;
        this.secretKey = n.secretKey;
	this.region = n.region;
	this.name = n.name;
    }
    RED.nodes.registerType("aws-config",RemoteServerNode);
}
