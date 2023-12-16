import { Configuration, OpenAIApi } from 'openai';
import stream from 'utils/stream';

import { catchErrors } from 'errors';

export const makeStream = catchErrors((req, res) => {
  // @ts-ignore
  res.flush = (): undefined => undefined;
  return stream.init(req, res);
});

export const makePrompt = catchErrors(async (req, res) => {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const OpenAI = new OpenAIApi(configuration);
  try {
    const response = await OpenAI.createChatCompletion({
      model: process.env.OPENAI_MODEL || '',
      messages: req.body.messages,
    });
    res.status(200).send(response.data.choices[0]);
  } catch (e) {
    res.status(200).send({});
  }
});

export const makeStreamPrompt = catchErrors(async (req, res) => {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const OpenAI = new OpenAIApi(configuration);
  // @ts-ignore
  res.flush = (): undefined => undefined;
  try {
    const response = await OpenAI.createChatCompletion(
      {
        model: process.env.OPENAI_MODEL || '',
        messages: req.body.messages,
        stream: true,
      },
      { responseType: 'stream' },
    );
    // @ts-ignore
    response.data.on('data', data => {
      const lines = data
        .toString()
        .split('\n')
        .filter(line => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          return; // Stream finished
        }
        try {
          const parsed = JSON.parse(message);
          const { id } = parsed;
          const role = 'assistant';
          const { content } = parsed.choices[0].delta;

          if (content) {
            stream.send(
              {
                id,
                role,
                content,
              },
              req.body.deviceId,
            );
          }
          if (parsed.choices[0].finish_reason === 'stop') {
            res.end();
          }
        } catch (error) {
          console.log('Caught Error', error);
        }
      }
    });
  } catch (e) {
    const error: any = e;
    if (error.response && error.response.status) {
      console.error(error.response.status, error.message);
      error.response.data.on('data', data => {
        const message = data.toString();
        try {
          const parsed = JSON.parse(message);
          console.error('An error occurred during OpenAI request: ', parsed);
        } catch (err) {
          console.error('An error occurred during OpenAI request: ', err, message);
        }
      });
    } else {
      console.error('An error occurred during OpenAI request', error);
    }
  }
});
