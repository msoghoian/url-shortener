import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import dayjs from 'dayjs';

const saveCode = async (code: string, url: string): Promise<void> => {
  console.log('saveCode', code, url);
  const ttl: number = dayjs().add(1, 'month').unix();

  const client: DynamoDBClient = new DynamoDBClient({
    region: 'us-west-2',
  });
  const input: PutItemCommandInput = {
    TableName: 'shortlink',
    Item: {
      shortcode: { S: code },
      originalUrl: { S: url },
      ttl: { N: ttl.toString() },
    },
  };

  const command: PutItemCommand = new PutItemCommand(input);

  try {
    await client.send(command);

    return;
  } catch (error) {
    console.error('error saving', error);
    throw error;
  }
};

export { saveCode };
