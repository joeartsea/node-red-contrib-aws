node-red-contrib-aws
========================
A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="http://aws.amazon.com/" target="_new">AWS</a>.

Nodes (All AWS API functions are available)
-----------------

* Lamba
* EC2
* Kinesis
* S3
* SNS
* DynamoDB
* SQS (alpha release)
* IoT
* IotData
* RDS
* Firehose
* KMS
* AWS config

Payload returned from the AWS SDK is sometimes (particularly S3.Get) encoded in a BUFFER.  To parse this to a string pass the output into a function with msg.payload=Buffer.from(msg.payload.Body).toString("utf-8") or similar to decode strings.

Make sure that the AWS IAM User you are using has sufficient permissions for the function you are using.  If you dont you will get an error message.

Feature requests are welcome, submit an issue at https://github.com/daniel-t/node-red-contrib-aws

Usage
---
Almost all nodes are direct wrappers for the AWS Javascript API, so for information about available parameters consult the API docs https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html

Parameters need to be specified as per the AWS API (typically LeadingUpperCase).


WARNING
----
Only cursory testing of nodes has occured at this stage, please test and report issues.

Acknowledgements
----------------

The node-red-contrib-aws uses the following open source software:

- [AWS SDK for JavaScript] (https://github.com/aws/aws-sdk-js): AWS SDK for JavaScript in the browser and Node.js.

License
-------

See [license] (https://github.com/daniel-t/node-red-contrib-aws/blob/master/LICENSE) (Apache License Version 2.0).

Contributions
----

If you want to add a new node to this library, here's some pointers.
- I only accept nodes which are built from the run_build.js script without modification.   This is to ensure that I can keep things up to date as the AWS API changes.   If for some reason you cant do that (such as with the IOT node), please also supply a contextual Diff against the automatically built node and an explanation of why it has to be this way.   It's OK to propose changes to the gen scripts, but they need to be as generic as possible.
	- The exception to this are utility nodes, such as DynamoDBConvert
- Please only submit changes to one node per pull request.  If there's a problem with one node, it will delay getting them all in.
- If you update the build scripts, please submit those in a seperate request to any new/modified nodes
- Dont submit a complete set of nodes which have only been updated due to a new version of the AWS API.  if you need to features, submit individual nodes or create an issue and I will raise the AWS API level across the board.

How to build nodes:

- Make sure you have a working install, and can create flows with some of the existing nodes
- Switch into the gen_scripts directory
- Make a directory called 'build'
- Run 'nodejs run_build.js' - this will automatically generate the entire node set for all AWS services, many which haven't been validated so aren't part of the library
- Copy the files for the service of interest from 'build' to the parent directory
- update package.json to reference the new js file
- Restart node red
- If it works please submit a pull request and let me know how extensively its been tested.

Donations
---
If you like this library and would like to financially support its ongoing developement, you can make donations by
Paypal https://www.paypal.me/DanielT253
Bitcoin 124fjAWzBYxhW4CtEj8g9uZqc15z97Fu9A
