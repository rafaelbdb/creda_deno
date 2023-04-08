const version: string = '1.32.3';

export * as bcrypt from 'bcrypt';
export { UserModelInterface } from './app/contracts/interfaces/models/UserModelInterface';
export { UserRouter } from './app/routes/UserRoutes';
export { assertEquals } from `https://deno.land/std@${version}/testing/asserts.ts`;
export { MongoClient } from `https://deno.land/std@${version}/mongo/mod.ts`;
export {
    Application,
    Router,
    Context,
    Middleware
} from `https://deno.land/std@${version}/oak/mod.ts`;
export {
    makeJwt,
    setExpiration,
    Jose,
    Payload
} from `https://deno.land/std@${version}/djwt/create.ts`;
