node-red-contrib-aws
========================
A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="http://aws.amazon.com/" target="_new">AWS</a>.

Nodes & Functions
-----------------

* Lambda - Invoke
* EC2 - Stop, Start, Reboot, Describe, Kinesis, Put, Get Shard Iterator, Get
* S3 - Put, Get, Delete, List Objects
* SNS - Publish
* DynamoDB - Put, Get, Scan
* SQS (alpha release) - Send Message, Receive Message, Delete Message, Purge Queue
* IoT - Describe, Update, List, Get/Update/Delete Shadow & Publish
* AWS config - Common config for all nodes above, looks after the credentials

Payload returned from the AWS SDK is sometimes (particularly S3.Get) encoded in a BUFFER.  To parse this to a string pass the output into a function with msg.payload=Buffer.from(msg.payload.Body).toString("utf-8") or similar to decode strings.

Make sure that the AWS IAM User you are using has sufficient permisisons for the function you are using.  If you dont you will get an error message.

Feature requests are welcome, submit an issue at https://github.com/daniel-t/node-red-contrib-aws

Acknowledgements
----------------

The node-red-contrib-aws uses the following open source software:

- [AWS SDK for JavaScript] (https://github.com/aws/aws-sdk-js): AWS SDK for JavaScript in the browser and Node.js.

License
-------

See [license] (https://github.com/daniel-t/node-red-contrib-aws/blob/master/LICENSE) (Apache License Version 2.0).
