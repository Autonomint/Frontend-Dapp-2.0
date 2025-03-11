import {
  aws_secret_name,
  sm_accessKeyId,
  sm_secretAccessKey,
} from "@/utils/constants";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const getSecretVar = async () => {
  debugger;
  const client = new SecretsManagerClient({
    region: "eu-north-1",
    credentials: {
      accessKeyId: sm_accessKeyId,
      secretAccessKey: sm_secretAccessKey,
    },
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: aws_secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = JSON.parse(response.SecretString || "{}");
  return secret;
};

export default getSecretVar;
