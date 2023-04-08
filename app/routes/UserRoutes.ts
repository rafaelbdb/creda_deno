import {
    Context,
    MongoClient,
    Router,
    UserModelInterface
} from '../../deps.ts';

const client = new MongoClient();
await client.connect('mongodb://localhost:27017');

const db = client.database('creda');
const User = db.collection<UserModelInterface>('User');

const UserRouter = new Router();

UserRouter.post('/User', async (ctx: Context) => {
    const body = await ctx.request.body();

    if (!body.value || !body.value.name || !body.value.email) {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Invalid request body' };
        return;
    }

    const existingUserModelInterface = await User.findOne({
        email: body.value.email
    });
    if (existingUserModelInterface) {
        ctx.response.status = 409;
        ctx.response.body = { message: 'UserModelInterface already exists' };
        return;
    }

    const { name, email } = body.value;
    const { $oid } = await User.insertOne({ name, email });
    ctx.response.status = 201;
    ctx.response.body = { id: $oid };
});

UserRouter.get('/User', async (ctx: Context) => {
    const allUserModelInterfaces = await User.find({});
    ctx.response.body = allUserModelInterfaces;
});

UserRouter.get('/User/:id', async (ctx: Context) => {
    const { id } = ctx.params;
    const user = await User.findOne({ _id: { $oid: id } });
    if (!user) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'UserModelInterface not found' };
        return;
    }
    ctx.response.body = user;
});

UserRouter.put('/User/:id', async (ctx: Context) => {
    const { id } = ctx.params;
    const body = await ctx.request.body();

    if (!body.value || !body.value.name || !body.value.email) {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Invalid request body' };
        return;
    }

    const existingUserModelInterface = await User.findOne({
        email: body.value.email
    });
    if (
        existingUserModelInterface &&
        existingUserModelInterface._id.$oid !== id
    ) {
        ctx.response.status = 409;
        ctx.response.body = { message: 'UserModelInterface already exists' };
        return;
    }

    const { name, email } = body.value;
    await User.updateOne({ _id: { $oid: id } }, { $set: { name, email } });
    ctx.response.status = 204;
});

UserRouter.delete('/User/:id', async (ctx: Context) => {
    const { id } = ctx.params;
    await User.deleteOne({ _id: { $oid: id } });
    ctx.response.status = 204;
});

export default UserRouter;
