import superagent from 'superagent';

const API = 'http://localhost:3000'
const responseBody = (res: any) => {
  return res.body;
};

const httpHeaders = (req: any) => {
  req.set('Accept', 'application/json');
};

const requests = {
  del: (url: string) =>
    superagent.del(`${url}`).use(httpHeaders).then(responseBody),
  get: (url: string) =>
    superagent.get(`${url}`).use(httpHeaders).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${url}`, body).use(httpHeaders).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${url}`, body).use(httpHeaders).then(responseBody),
};

const Request = {
  api: () =>
    requests.get(`https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&famrs_tbl_staked_gte=10000000`),
};

export default {
  Request,
};
