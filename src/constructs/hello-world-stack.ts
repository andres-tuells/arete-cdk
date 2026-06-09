import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * A simple example stack that demonstrates the library structure
 */
export class HelloWorldStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // TODO: Add your constructs here
    // Example: new s3.Bucket(this, 'MyBucket');
  }
}
