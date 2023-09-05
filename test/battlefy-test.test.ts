import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as BattlefyTest from '../lib/battlefy-test-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/battlefy-test-stack.ts
describe('CDK Stack', () => {
  let template: cdk.assertions.Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new BattlefyTest.BattlefyTestStack(app, 'MyTestStack');
    template = Template.fromStack(stack);
  });

  test('DynamoDB Table Created', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: 'shortlink',
    });
  });

  test('Create Shortlink Lambda Created', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.createShortlinkHandler',
      Runtime: 'nodejs18.x',
    });
  });

  test('Get Shortlink Lambda Created', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.getShortlinkHandler',
      Runtime: 'nodejs18.x',
    });
  });
});
