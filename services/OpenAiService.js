const ApiRequestService = require("./ApiRequestService");
// eslint-disable-next-line no-undef
const API_SERVER = "https://api.openai.com/v1";

const TOKEN = process.env.AI_TOKEN || "-";
const ENGINE = process.env.AI_ENGINE || "text-davinci-003";
const MAX_TOKENS = process.env.AI_MAXTOKENS || 4000;


class OpenAiService {
  constructor() {
    this.service = new ApiRequestService();
  }

  async asyncRequest(question) {
    const url = `${API_SERVER}/completions`;

    const body = {
        'model': ENGINE,
        'prompt': question,
        'max_tokens': MAX_TOKENS
    }

    let options = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

    return this.service.postFetch(url, options);
  }

  request(callback, question) {
    const service = this;
    (async () => {
        const result = await service.asyncRequest(question);
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

}

module.exports = OpenAiService;
