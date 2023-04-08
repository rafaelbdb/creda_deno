import { Context, Middleware } from '../../deps.ts';

export const isAuthenticated: Middleware = async (
    ctx: Context,
    next: () => Promise<void>
): Promise<void> => {
    const authorizationHeader = ctx.request.headers.get('Authorization');

    if (!authorizationHeader) {
        ctx.response.status = 401;
        return;
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        ctx.response.status = 401;
        return;
    }

    // TODO: Validate token and set user object on context if token is valid

    await next();
};
