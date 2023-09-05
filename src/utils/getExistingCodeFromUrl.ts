import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from '@aws-sdk/client-dynamodb';

const getExistingCodeFromUrl = async (url: string): Promise<string | void> => {
  if (!url) {
    throw new Error('No url provided');
  }
  console.log('getExistingCodeFromUrl', url);

  const client: DynamoDBClient = new DynamoDBClient({
    region: 'us-west-2',
  });

  // query the dynamodb table "shortlink" on the index "url" to see if the url exists
  // if it does, return the code, otherwise return an empty string
  const input: QueryCommandInput = {
    TableName: 'shortlink',
    IndexName: 'originalUrl',
    KeyConditionExpression: 'originalUrl = :originalUrl',
    ExpressionAttributeValues: {
      ':originalUrl': { S: url },
    },
  };

  const command: QueryCommand = new QueryCommand(input);

  try {
    const result: QueryCommandOutput = await client.send(command);
    console.log('result', result);

    if (!Array.isArray(result.Items) || result.Items.length === 0) {
      return;
    }

    return result.Items[0].shortcode.S;
  } catch (error) {
    console.error('error', error);
    return;
  }
};

export { getExistingCodeFromUrl };
