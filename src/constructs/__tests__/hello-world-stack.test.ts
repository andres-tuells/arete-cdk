import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import { HelloWorldStack } from '../hello-world-stack';

describe('HelloWorldStack', () => {
  it('should create a stack', () => {
    const app = new cdk.App();
    const stack = new HelloWorldStack(app, 'TestStack');
    
    const template = Template.fromStack(stack);
    expect(template).toBeDefined();
  });
});
