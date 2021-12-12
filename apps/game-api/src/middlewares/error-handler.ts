import { Context, Next } from 'koa';

export function errorHandler() {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      console.error(error);
      ctx.body = {
        data: null,
        error: {
          message: error.message,
          code: error.code || 500,
        },
      };
      ctx.status = 500;
    }
  };
}
