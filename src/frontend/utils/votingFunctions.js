// POST request for voting
import request from './requester';
import { basicURL } from './commonconstants';

export  async function updateVote(e,url,body) {
  return await request(`${basicURL}${url}`, 'POST', body);
}
