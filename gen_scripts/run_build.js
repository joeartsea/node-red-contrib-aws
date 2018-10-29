tools=require('./gen.js');
var files = [
'../node_modules/aws-sdk/apis/dynamodb-2012-08-10.min.json',
'../node_modules/aws-sdk/apis/ec2-2016-11-15.min.json',
'../node_modules/aws-sdk/apis/ecs-2014-11-13.min.json',
'../node_modules/aws-sdk/apis/es-2015-01-01.min.json',
'../node_modules/aws-sdk/apis/firehose-2015-08-04.min.json',
'../node_modules/aws-sdk/apis/iot-2015-05-28.min.json',
'../node_modules/aws-sdk/apis/iot-data-2015-05-28.min.json',
'../node_modules/aws-sdk/apis/kinesis-2013-12-02.min.json',
'../node_modules/aws-sdk/apis/kms-2014-11-01.min.json',
'../node_modules/aws-sdk/apis/lambda-2015-03-31.min.json',
'../node_modules/aws-sdk/apis/polly-2016-06-10.min.json',
'../node_modules/aws-sdk/apis/rds-2014-10-31.min.json',
'../node_modules/aws-sdk/apis/rekognition-2016-06-27.min.json',
'../node_modules/aws-sdk/apis/resourcegroupstaggingapi-2017-01-26.min.json',
'../node_modules/aws-sdk/apis/s3-2006-03-01.min.json',
'../node_modules/aws-sdk/apis/sns-2010-03-31.min.json',
    '../node_modules/aws-sdk/apis/sqs-2012-11-05.min.json',
'../node_modules/aws-sdk/apis/redshift-2012-12-01.min.json'];

files.map(tools.buildService);
