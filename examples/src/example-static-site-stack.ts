import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite } from 'arete-cdk';

export class ExampleStaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new StaticSite(this, 'ExampleStaticSite', {
      sourcePath: 'site',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      removalPolicy: undefined,
    });
  }
}
