import bcrypt from 'bcryptjs'
import db from '$lib/db'
import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        // Get user name and password
        const formData = await request.formData()
        const user = formData.get('userName') as unknown as string
        const password = formData.get('password') as unknown as string

        // TODO: Change the error message before deploying
        // Check if user name is in the database
        const isUserValid = await db.collection('users').findOne({ userName: user })
        if (!isUserValid) {
            return fail(400, { message: 'The user name does not exist' })
        }

        // TODO: Change the error message before deploying
        // Check that the password that is given is correct
        const isPasswordValid = await bcrypt.compare(password, isUserValid.password)
        if (!isPasswordValid) {
            return fail(400, { message: 'The password is wrong' })
        }

        const authenticatedUser = await db
            .collection('users')
            .findOneAndUpdate(
                { email: isUserValid.email },
                { $set: { userAuthToken: crypto.randomUUID() } },
                { returnDocument: 'after' }
            );

        cookies.set('session', authenticatedUser?.value?.userAuthToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30
        });

        throw redirect(302, '/');



    }

}