import { Context } from 'koa';

export async function create(ctx) {
  ctx.body = {
    data: 'hello create',
  };
}

export async function findAll(ctx: Context) {
  ctx.body = {
    data: 'hello findAll',
  };
}
