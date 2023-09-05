import { Stack } from 'aws-cdk-lib';
import { PolicyResources, PolicyStatements } from './types';
import { Policy } from 'aws-cdk-lib/aws-iam';

const usePolicies = (
  context: Stack,
  policyStatements: PolicyStatements,
): PolicyResources => {
  const createShortlinkLambdaPolicy = new Policy(
    context,
    'createShortlinkLambdaPolicy',
    {
      statements: [
        policyStatements.queryDynamoPS,
        policyStatements.writeDynamoPS,
      ],
    },
  );

  const getShortlinkLambdaPolicy = new Policy(
    context,
    'getShortlinkLambdaPolicy',
    {
      statements: [policyStatements.queryDynamoPS],
    },
  );

  return {
    createShortlinkLambdaPolicy,
    getShortlinkLambdaPolicy,
  };
};

export { usePolicies };
