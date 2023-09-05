import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Method, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export interface LambdaResources {
  createShortlinkLambda: NodejsFunction;
  getShortlinkLambda: NodejsFunction;
}

export interface ApiGatewayResources {
  api: RestApi;
  postMethod: Method;
  getMethod: Method;
}

export interface EventsResources {
  eventBus: EventBus;
}

export interface DynamoDBResources {
  shortlinkTable: Table;
}

export interface PolicyStatements {
  queryDynamoPS: PolicyStatement;
  writeDynamoPS: PolicyStatement;
}

export interface PolicyResources {
  createShortlinkLambdaPolicy: Policy;
  getShortlinkLambdaPolicy: Policy;
}
