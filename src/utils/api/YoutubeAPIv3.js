const API_ENDPOINTS = {
  SEARCH: 'search',
  CHANNELS: 'channels',
  VIDEOS: 'videos'
};

const QUERY_PARTS = {
  SNIPPET: 'snippet',
  STATISTICS: 'statistics',
  ID: 'id'
};

const HEADERS = {
  X_API_KEY: 'X-RapidAPI-Key',
  X_HOST: 'X-RapidAPI-Host'
};

const QUERY_PARAMS_DEFAULTS = {
  maxResults: 50,
  order: 'date'
};

class YoutubeAPIv3 {
  constructor(protocol, host, apiKey) {
    this.protocol = protocol;
    this.host = host;
    this.apiKey = apiKey;
  }

  composeQueryString(params) {
    const queryParams = new URLSearchParams();
    const keys = Object.keys(params);
    for (const key of keys) {
      queryParams.append(key, params[key]);
    }
    const result = queryParams.toString();
    return result;
  }

  async getData(endpoint, params) {
    const method = 'GET';
    const urlParts = [this.host, endpoint];
    const query = Object.keys(params).length > 0 ?
      this.composeQueryString(params) :
      '';
  
    const url = query.length > 0 ?
      `${this.protocol}://${urlParts.join('/')}?${query}`:
      `${this.protocol}://${urlParts.join('/')}`;

    const options = {
      method,
      headers: {
        [HEADERS.X_API_KEY]: this.apiKey,
        [HEADERS.X_HOST]: this.host
      }
    };
    
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.code}`);
    }
    const data = await res.json();
    return data;
  }

  async getVideosByCategory(category) {
    const endpoint = API_ENDPOINTS.SEARCH;
    const { SNIPPET, ID } = QUERY_PARTS;
    const params = {
      q: category,
      part: [SNIPPET, ID].join(','),
      ...QUERY_PARAMS_DEFAULTS
    };
    const data = await this.getData(endpoint, params);
    return data;
  }

  async getChannelDetails(id) {
    const endpoint = API_ENDPOINTS.CHANNELS;
    const { SNIPPET, STATISTICS } = QUERY_PARTS;
    const params = {
      id,
      part: [SNIPPET, STATISTICS].join(',')
    };
    const data = await this.getData(endpoint, params);
    return data.items[0];
  }

  async getChannelVideos(channelId) {
    const endpoint = API_ENDPOINTS.SEARCH;
    const { SNIPPET, ID } = QUERY_PARTS;
    const params = {
      channelId,
      part: [SNIPPET, ID].join(','),
      ...QUERY_PARAMS_DEFAULTS
    };
    const data = await this.getData(endpoint, params);
    return data;
  }

  async getVideoDetails() {}
}

const PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
const HOST = import.meta.env.VITE_API_HOST;
const API_KEY = import.meta.env.VITE_API_KEY;

const youtubeAPI = new YoutubeAPIv3(PROTOCOL, HOST, API_KEY);

export default youtubeAPI;
