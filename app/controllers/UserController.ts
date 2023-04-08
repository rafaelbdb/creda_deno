import { Context } from 'https://deno.land/x/oak/mod.ts';

export const createUser = async (ctx: Context) => {
    const { value } = await ctx.request.body();
    const user: User = value;

    // Insert the new user into the database
    const insertResult = await usersCollection.insertOne(user);

    ctx.response.body = insertResult;
};

export const getUsers = async (ctx: Context) => {
    // Find all users in the database
    const users = await usersCollection.find().toArray();

    ctx.response.body = users;
};

export const getUserById = async (ctx: Context) => {
    const { id } = ctx.params;

    // Find the user with the given ID in the database
    const user = await usersCollection.findOne({ _id: { $oid: id } });

    if (!user) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'User not found' };
        return;
    }

    ctx.response.body = user;
};

export const updateUserById = async (ctx: Context) => {
    const { id } = ctx.params;
    const { value } = await ctx.request.body();
    const user: User = value;

    // Update the user with the given ID in the database
    const updateResult = await usersCollection.updateOne(
        { _id: { $oid: id } },
        { $set: user }
    );

    ctx.response.body = updateResult;
};

export const deleteUserById = async (ctx: Context) => {
    const { id } = ctx.params;

    // Delete the user with the given ID from the database
    const deleteResult = await usersCollection.deleteOne({ _id: { $oid: id } });

    ctx.response.body = deleteResult;
};
