import { StackContext, Api, Config, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { rdsCluster, parameters } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [rdsCluster, ...parameters],
        environment: {
          STAGE: stack.stage,
        },
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "packages/functions/src/graphql.handler",
      },
      "GET /migrate": "packages/functions/src/migrator.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    rdsClusterDb: rdsCluster.defaultDatabaseName,
    rdsClusterArn: rdsCluster.clusterArn,
    rdsClusterSecretArn: rdsCluster.clusterArn,
    rdsClusterEndpoint: `${rdsCluster.clusterEndpoint.hostname}/${rdsCluster.clusterEndpoint.port}/${rdsCluster.clusterEndpoint.socketAddress}`,
  });
}
