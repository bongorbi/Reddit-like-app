import Router from 'koa-router';
import { deletePost, editComment, getAllPosts, postNewComment, postNewPost, vote } from './methods';
import { commentVoting } from './Posts';

const router = new Router();

//getting all the posts
router.get('/', async (ctx) => {
  const response = getAllPosts();
  ctx.body = response.body;

// commenting post
  router.post('/new_comment', async (ctx) => {
    let bodyParams = ctx.request.body;
    const response = postNewComment(bodyParams);
    ctx.response.status = 200;
    ctx.body = response;
  });
// creating new post
  router.post('/new_post', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = postNewPost(bodyParams);
    ctx.response.status = 200;
    ctx.body = post;
  });
//voting post
  router.post('/post_vote', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = vote(bodyParams);
    ctx.response.status = 200;
    ctx.body = post;
  });
  //voting comment
  router.post('/comment_vote', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = commentVoting(bodyParams);
    ctx.response.status = 200;
    ctx.body = post;
  });
  //deleting comment
  router.delete('/delete_post', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = deletePost(bodyParams);
    ctx.response.status = 200;
    ctx.body = post;
  });
  //editing comment
  router.put('/edit_comment', async (ctx) => {
    let bodyParams = ctx.request.body;
    let post = editComment(bodyParams);
    ctx.response.status = 200;
    ctx.body = post;
  });

});

export default router;
