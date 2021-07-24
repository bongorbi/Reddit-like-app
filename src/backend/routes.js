import Router from 'koa-router'
import getAllPosts from './methods';

const router = new Router();

//GET request
router.get('/', async (ctx) => {
  const response = await getAllPosts();
  ctx.body = response.body;
});

export default router
