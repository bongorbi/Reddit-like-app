import Router from 'koa-router';
import { getAllPosts, postNewComment, postNewPost } from './methods';

const router = new Router();

//GET request
router.get('/', async (ctx) => {
  const response = getAllPosts();
  ctx.body = {
    posts: response.body
  };

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


});

export default router;
