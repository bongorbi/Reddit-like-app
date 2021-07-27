import Router from 'koa-router';
import { getAllPosts, postNewComment, postNewPost, vote } from './methods';
import { commentVoting } from './Posts';

const router = new Router();

//GET request
router.get('/', async (ctx) => {
  const response = getAllPosts();
  ctx.body = response.body;

  router.post('/new_comment', async (ctx) => {
    let bodyParams = ctx.request.body;
    const response = postNewComment(bodyParams);
    ctx.response.status = 200;
    ctx.body = response;
  });

  router.post('/new_post', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = postNewPost(bodyParams);
    //If the post is added successfully 200 status code is sent as the response
    ctx.response.status = 200;
    ctx.body = post;
  });

  router.post('/vote', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = vote(bodyParams);
    //If the post is added successfully 200 status code is sent as the response
    ctx.response.status = 200;
    ctx.body = post;
  });
  router.post('/comment_vote', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = commentVoting(bodyParams);
    //If the post is added successfully 200 status code is sent as the response
    ctx.response.status = 200;
    ctx.body = post;
  });


});

export default router;
