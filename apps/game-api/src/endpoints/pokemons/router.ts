import Router from '@koa/router';
import { findAll, create } from './controller';

const router = new Router({ prefix: '/api/v1/pokemons' });

router.post('/', create);
router.get('/', findAll);

export default router.routes();
