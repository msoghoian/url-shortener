import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { DynamoDBResources } from './types';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';

const useDynamoDB = (context: Stack): DynamoDBResources => {
  const shortlinkTable: Table = new Table(context, 'shortlinkTable', {
    tableName: 'shortlink',
    billingMode: BillingMode.PAY_PER_REQUEST,
    timeToLiveAttribute: 'ttl',
    partitionKey: { name: 'shortcode', type: AttributeType.STRING },
    removalPolicy: RemovalPolicy.DESTROY,
  });

  shortlinkTable.addGlobalSecondaryIndex({
    indexName: 'originalUrl',
    partitionKey: { name: 'originalUrl', type: AttributeType.STRING },
  });

  return {
    shortlinkTable,
  };
};

export { useDynamoDB };
