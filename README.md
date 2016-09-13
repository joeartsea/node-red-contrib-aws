node-red-contrib-aws
========================
A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="http://aws.amazon.com/" target="_new">AWS</a>.

Nodes & Functions
-----------------

* Lambda
  * Invoke
* EC2
  * Stop
  * Start
  * Reboot
  * Describe
* Kinesis
  * Put
  * Get Shard Iterator
  * Get
    * Feed the output of Get Shard Iterator into a Get
* S3
  * Put
    * msg.payload will be stringified prior to being saved into the specified bucket & key.
  * Get
    * For both functions if 'key' and/or 'bucket' are specified in the msg their values will be used instread of what is set in the config.
* SNS
  * Publish
    * msg.payload is send as the Message
    * If msg.messageStructure == "json", then the payload will be treated as JSON (see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#publish-property)
    * msg.arn can override the configured Topic ARN
* DynamoDB
  * Put
    * msg.payload is saved to DynamoDB
  * Get
    * msg.payload is used for the query expression
  * Scan
    * msg.payload (if not blank) is used as a FilterExpression
  * Msg.tablename will override the configured tablename
* SQS (alpha release)
  * Send Message
  * Receive Message
  * Delete Message
  * Purge Queue
  * msg.queue will override the configured Queue URL.
* AWS config
  * Common config for all nodes above, looks after the credentials
  * .

Payload returned from the AWS SDK is encoded in a BUFFER.  To parse this to a string pass the output into a function with msg.payload=Buffer.from(msg.payload.Body).toString("utf-8") or similar to decode strings.

Make sure that the AWS IAM User you are using has sufficient permisisons for the function you are using.  If you dont you will get an error message.



Acknowledgements
----------------

The node-red-contrib-force uses the following open source software:

- [AWS SDK for JavaScript] (https://github.com/aws/aws-sdk-js): AWS SDK for JavaScript in the browser and Node.js.
- [minimatch] (https://github.com/isaacs/minimatch): A minimal matching utility.

License
-------

See [license] (https://github.com/joeartsea/node-red-contrib-aws/blob/master/LICENSE) (Apache License Version 2.0).
