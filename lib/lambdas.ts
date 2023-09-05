import { Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaResources } from './types';
import { lambdaProps } from './utils/lambdaProps';

const useLambdas = (context: Stack): LambdaResources => {
  const createShortlinkLambda: NodejsFunction = new NodejsFunction(
    context,
    'createShortlinkLambda',
    {
      ...lambdaProps,
      description: 'Create a shortlink',
      handler: 'createShortlinkHandler',
      entry: './src/createShortlink.handler.ts',
    },
  );

  const getShortlinkLambda: NodejsFunction = new NodejsFunction(
    context,
    'getShortlinkLambda',
    {
      ...lambdaProps,
      description: 'Retrieve the original url associated with a shortlink',
      handler: 'getShortlinkHandler',
      entry: './src/getShortlink.handler.ts',
    },
  );

  return {
    createShortlinkLambda,
    getShortlinkLambda,
  };
};

export { useLambdas };
