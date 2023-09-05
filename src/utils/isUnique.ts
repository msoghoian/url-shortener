import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from '@aws-sdk/client-dynamodb';

const isUnique = async (code?: string): Promise<boolean> => {
  if (!code) {
    return false;
  }
  const client: DynamoDBClient = new DynamoDBClient({
    region: 'us-west-2',
  });
  // query the dynamodb table "shortlink" to see if the code exists
  // if it does, return false, otherwise return true
  const input: QueryCommandInput = {
    TableName: 'shortlink',
    KeyConditionExpression: 'shortcode = :shortcode',
    ExpressionAttributeValues: {
      ':shortcode': { S: code },
    },
  };

  const command: QueryCommand = new QueryCommand(input);

  try {
    const result: QueryCommandOutput = await client.send(command);
    console.log('result', result);

    return Array.isArray(result.Items) && result.Items.length === 0;
  } catch (error) {
    console.error('error', error);
    return false;
  }
};

export { isUnique };
