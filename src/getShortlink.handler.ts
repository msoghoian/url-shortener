import { constants } from 'http2';
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { Response, Shortlink } from './types';
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from '@aws-sdk/client-dynamodb';

const getShortlinkHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response<Shortlink>>,
): Promise<void> => {
  const shortlinkPattern: RegExp = new RegExp(/^[a-zA-Z]{5}$/);
  const shortlink: string | undefined = event?.pathParameters?.shortlink;

  if (!shortlink || !shortlinkPattern.test(shortlink)) {
    console.error('Invalid or missing shortlink');
    return callback(null, {
      statusCode: constants.HTTP_STATUS_BAD_REQUEST,
    });
  }

  const client: DynamoDBClient = new DynamoDBClient({
    region: 'us-west-2',
  });

  const input: QueryCommandInput = {
    TableName: 'shortlink',
    KeyConditionExpression: 'shortcode = :shortcode',
    ExpressionAttributeValues: {
      ':shortcode': { S: shortlink },
    },
  };

  const command: QueryCommand = new QueryCommand(input);

  try {
    const result: QueryCommandOutput = await client.send(command);

    if (!Array.isArray(result.Items) || result.Items.length === 0) {
      return callback(null, {
        statusCode: constants.HTTP_STATUS_NOT_FOUND,
      });
    }

    const item = result.Items[0];
    const originalUrl = item.originalUrl.S;

    if (!originalUrl) {
      return callback(null, {
        statusCode: constants.HTTP_STATUS_NOT_FOUND,
      });
    }

    const hasProtocol: boolean =
      originalUrl.startsWith('http://') || originalUrl.startsWith('https://');

    return callback(null, {
      statusCode: constants.HTTP_STATUS_TEMPORARY_REDIRECT,
      headers: {
        Location: hasProtocol ? originalUrl : `https://${originalUrl}`,
      },
    });
  } catch (error) {
    console.error('error', error);
  }
};

export { getShortlinkHandler };
