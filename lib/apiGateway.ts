import { Stack } from 'aws-cdk-lib';
import { ApiGatewayResources, LambdaResources } from './types';
import {
  EndpointType,
  LambdaIntegration,
  Method,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { HttpMethod } from 'aws-cdk-lib/aws-events';

const useApiGateway = (
  context: Stack,
  lambdas: LambdaResources,
): ApiGatewayResources => {
  const api: RestApi = new RestApi(context, 'Api', {
    restApiName: 'ShortlinkAPI',
    endpointConfiguration: {
      types: [EndpointType.REGIONAL],
    },
    deploy: true,
    retainDeployments: false,
    disableExecuteApiEndpoint: false,
  });

  const postMethod: Method = api.root.addMethod(
    HttpMethod.POST,
    new LambdaIntegration(lambdas.createShortlinkLambda),
  );

  const getMethod: Method = api.root
    .addResource('{shortlink}')
    .addMethod(
      HttpMethod.GET,
      new LambdaIntegration(lambdas.getShortlinkLambda),
    );

  return {
    api,
    postMethod,
    getMethod,
  };
};

export { useApiGateway };
