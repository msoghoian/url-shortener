import { DynamoDBResources, PolicyStatements } from './types';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

const usePolicyStatements = (dynamoDb: DynamoDBResources): PolicyStatements => {
  const queryDynamoPS: PolicyStatement = new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['dynamodb:Query'],
    resources: [
      dynamoDb.shortlinkTable.tableArn,
      dynamoDb.shortlinkTable.tableArn + '/index/originalUrl',
    ],
  });

  const writeDynamoPS: PolicyStatement = new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['dynamodb:PutItem'],
    resources: [dynamoDb.shortlinkTable.tableArn],
  });

  return {
    queryDynamoPS,
    writeDynamoPS,
  };
};

export { usePolicyStatements };
