import * as cdk from 'aws-cdk-lib';
import { HelloWorldStack } from 'arete-cdk';

const app = new cdk.App();

new HelloWorldStack(app, 'HelloWorldStack', {
  // You can add stack properties here
  // env: { account: '123456789012', region: 'us-east-1' }
});

app.synth();
