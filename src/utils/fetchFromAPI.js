const API_PORT = 'https';
const API_HOST = 'youtube-v31.p.rapidapi.com';
const API_KEY = 'dd402e372bmshd0feb2a16d5fc0ep14e8f1jsne5c65f10e641';
const mockQuery = 'relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';

const composeQueryString = (params) => {
  const queryParams = new URLSearchParams();
  const keys = Object.keys(params);
  for (const key of keys) {
    queryParams.append(key, params[key]);
  }
  const result = queryParams.toString();
  console.log({queryParams: result});
  return result;
};

export const fetchFromAPI = async (path = 'search', searchParams = {}, method = 'GET') => {
  // const url = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
  // https://youtube-v31.p.rapidapi.com/search/relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50
  const urlParts = [API_HOST, path];
  const query = Object.keys(searchParams).length > 0 ?
    composeQueryString(searchParams) :
    null;
  
  const url = query ?
    `${API_PORT}://${urlParts.join('/')}?${query}`:
    `${API_PORT}://${urlParts.join('/')}`;
  const options = {
    method,
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };
  console.log({url});
  
  const response = await fetch(url, options);
  if (response.status === 404) {
    return null;
  }
  if (response.status !== 200) {
    throw new Error('Request failed with code', response.status);
  }
  const data = await response.json();
  
  return data;
};

// const url = 'https://youtube-v31.p.rapidapi.com/captions?part=snippet&videoId=M7FIvfx5J10';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '6046f7474emsha3581556b65e005p10d311jsn489a85467995',
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// };

// (async () => {
//   const params = {
//     relatedToVideoId: '7ghhRHRP6t4',
//     part: 'id,snippet',
//     type: 'video',
//     maxResults: 50
//   };

//   try {
//     const data = await fetchFromAPI('search', params);
//     console.log({data});
//   } catch (error) {
//     console.error(error);
//   }
// })();

