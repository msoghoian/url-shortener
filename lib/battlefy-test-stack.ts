import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { useLambdas } from './lambdas';
import { useApiGateway } from './apiGateway';
import { useDynamoDB } from './dynamoDB';
import { usePolicyStatements } from './policyStatements';
import {
  DynamoDBResources,
  LambdaResources,
  PolicyResources,
  PolicyStatements,
} from './types';
import { usePolicies } from './policies';

export class BattlefyTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create resources
    const lambdas: LambdaResources = useLambdas(this);
    const dynamoDB: DynamoDBResources = useDynamoDB(this);
    useApiGateway(this, lambdas);

    // define policies
    const policyStatements: PolicyStatements = usePolicyStatements(dynamoDB);
    const policies: PolicyResources = usePolicies(this, policyStatements);

    // attach policies to resources
    lambdas.createShortlinkLambda.role?.attachInlinePolicy(
      policies.createShortlinkLambdaPolicy,
    );
    lambdas.getShortlinkLambda.role?.attachInlinePolicy(
      policies.getShortlinkLambdaPolicy,
    );
  }
}
