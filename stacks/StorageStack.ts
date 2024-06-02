import { StackContext, RDS, Config } from "sst/constructs";
import * as rds from "aws-cdk-lib/aws-rds";

const prodConfig = {
  autoPause: false,
  minCapacity: "ACU_2" as keyof typeof rds.AuroraCapacityUnit,
  maxCapacity: "ACU_8" as keyof typeof rds.AuroraCapacityUnit,
};
const devConfig = {
  autoPause: true,
  minCapacity: "ACU_2" as keyof typeof rds.AuroraCapacityUnit,
  maxCapacity: "ACU_2" as keyof typeof rds.AuroraCapacityUnit,
};

export function StorageStack({ stack, app }: StackContext) {
  const rdsCluster = new RDS(stack, "Database", {
    engine: "postgresql13.9",
    defaultDatabaseName: "my_database",
    scaling: app.stage === "prod" ? prodConfig : devConfig,
  });

  return {
    rdsCluster,
    parameters: [
      new Config.Parameter(stack, "RDS_DATABASE", {
        value: rdsCluster.defaultDatabaseName,
      }),
      new Config.Parameter(stack, "RDS_SECRET_ARN", {
        value: rdsCluster.secretArn,
      }),
      new Config.Parameter(stack, "RDS_CLUSTER_ARN", {
        value: rdsCluster.clusterArn,
      }),
    ],
  };
}
