import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  RemovalPolicy,
} from 'aws-cdk-lib';

export interface StaticSiteProps {
  readonly bucketName?: string;
  readonly websiteIndexDocument?: string;
  readonly websiteErrorDocument?: string;
  readonly removalPolicy?: RemovalPolicy;
  readonly sourcePath?: string;
}

export class StaticSite extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;
  public readonly distributionDomainName: string;

  constructor(scope: Construct, id: string, props: StaticSiteProps = {}) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.DESTROY;

    this.bucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: props.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy,
      autoDeleteObjects: removalPolicy === RemovalPolicy.DESTROY,
    });

    const accessControl = new cloudfront.S3OriginAccessControl(this, 'SiteOAC', {
      signing: {
        protocol: cloudfront.SigningProtocol.SIGV4,
        behavior: cloudfront.SigningBehavior.ALWAYS,
      },
    });

    this.distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultRootObject: props.websiteIndexDocument ?? 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket, {
          originAccessControl: accessControl,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: props.websiteErrorDocument
        ? [
            {
              httpStatus: 404,
              responseHttpStatus: 404,
              responsePagePath: `/${props.websiteErrorDocument}`,
            },
          ]
        : undefined,
    });

    if (props.sourcePath) {
      new s3deploy.BucketDeployment(this, 'SiteDeployment', {
        sources: [s3deploy.Source.asset(props.sourcePath)],
        destinationBucket: this.bucket,
        distribution: this.distribution,
        distributionPaths: ['/*'],
      });
    }

    this.distributionDomainName = this.distribution.distributionDomainName;
  }
}
