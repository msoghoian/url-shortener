import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

const lambdaProps: NodejsFunctionProps = {
  bundling: {
    preCompilation: false,
    target: 'es2022',
    minify: true,
    sourceMap: true,
    sourcesContent: false,
  },
  runtime: Runtime.NODEJS_18_X,
  logRetention: RetentionDays.ONE_MONTH,
};

export { lambdaProps };
