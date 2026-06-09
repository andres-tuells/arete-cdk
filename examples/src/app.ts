import * as cdk from 'aws-cdk-lib';
import { ExampleStaticSiteStack } from './example-static-site-stack';

const app = new cdk.App();

new ExampleStaticSiteStack(app, 'ExampleStaticSite');

app.synth();
