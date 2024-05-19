import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join} from 'path';
import * as path from "path";
import * as glob from "glob";
import { HttpLambdaProps } from '../types/types';




export class OnlineBookStack extends cdk.Stack {
  private api: RestApi
  private lambdaIntegrations = new Map<string, LambdaIntegration>();
  
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    this.api = new RestApi(this, 'MyOnlineBookApi')

    this.buildRestIntegration()
  }
  
  getLambdasFromPath() {
    const SRC_PATH = path.resolve(__dirname, "../../Lambda")
    const src = SRC_PATH + "/lambdas";
    const lambdaFiles = glob.sync(`${src}/*.ts`);
  
    return Promise.all(
      lambdaFiles.map(async (file) => ({
        file,
        content: await import(file),
      }))
    )
  }
  
  
   async buildRestIntegration(): Promise<void> {
    const lambdas = await this.getLambdasFromPath();
  
    for (const { file, content } of lambdas) {
      const {
        config: { routes, props },
      } = content;
  
      if (!props) {
        throw new Error(`no props configured for http lambda ${file}`);
      }
  
      if (!routes) {
        throw new Error(`no routes configured for http lambda ${file}`);
      }
  
      const lambda = this.buildHttpLambda({
        description: props.description,
        rdsAccess: props.rdsAccess,
        name: props.name ,
      });
  
      routes.forEach((route: string) => {
        const [method, path] = route.trim().split(/\s+/);

        const resource = this.api.root.addResource(`${props.name}`)
  
        resource.addMethod(method, lambda);
      });
    }
  }
  


  buildHttpLambda({name,description,rdsAccess}: HttpLambdaProps): LambdaIntegration {

    const lambdaProps: NodejsFunctionProps = {
      entry: join(__dirname, '..','lambdas', `${name}.ts`),
            handler: 'handler',
            description: description,
    };
  
    const lambdaFn = new NodejsFunction(this, name, lambdaProps);
  
  
    const integration = new LambdaIntegration(lambdaFn);
  
    // this.lambdaIntegrations.set(name, integration);
  
    return integration;
  }

 
  
  
}




