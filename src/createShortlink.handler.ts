import { constants } from 'http2';
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { CreateShortlinkRequest, Response, Shortlink } from './types';
import { generateLetterCode } from './utils/generateLetterCode';
import { isUnique } from './utils/isUnique';
import { saveCode } from './utils/saveCode';
import { getExistingCodeFromUrl } from './utils/getExistingCodeFromUrl';

const createShortlinkHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response<string>>,
): Promise<void> => {
  if (!event?.body) {
    console.error('No body found in event');
    return callback(null, {
      statusCode: constants.HTTP_STATUS_BAD_REQUEST,
    });
  }

  try {
    const body: CreateShortlinkRequest = JSON.parse(event.body);

    if (!body?.url) {
      console.error('No url found in body');
      return callback(null, {
        statusCode: constants.HTTP_STATUS_BAD_REQUEST,
      });
    }

    let code: string = (await getExistingCodeFromUrl(body.url)) || '';

    if (!code) {
      let isUniqueCode: boolean = false;
      let remainingAttempts: number = 10;
      do {
        code = generateLetterCode();
        isUniqueCode = await isUnique(code);
        console.log('isUniqueCode', code, isUniqueCode);
        remainingAttempts--;
      } while (!isUniqueCode && remainingAttempts > 0);

      if (!isUniqueCode) {
        console.error('Could not generate unique code');
        return callback(null, {
          statusCode: constants.HTTP_STATUS_UNPROCESSABLE_ENTITY,
        });
      }

      await saveCode(code, body.url);
    }

    //TODO: move to lambda env var
    const baseUrl: string =
      'https://xb066xfo08.execute-api.us-west-2.amazonaws.com/prod/';
    const responseBody: Shortlink = {
      originalUrl: body.url,
      baseUrl,
      code,
      shortlink: `${baseUrl}${code}`,
    };

    return callback(null, {
      statusCode: constants.HTTP_STATUS_CREATED,
      body: JSON.stringify(responseBody),
    });
  } catch (error) {
    console.error('createShortlink error', error);
    return callback(null, {
      statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    });
  }
};

export { createShortlinkHandler };
