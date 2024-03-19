import db from '$lib/db'
import { ObjectId } from 'mongodb'
import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const response = await db.collection('notes').findOne({ _id: new ObjectId(params.id) })
    const updateStop = JSON.stringify(response)

    return {
        data: {
            updateStop: updateStop
        }
    }
}

export const actions: Actions = {
    updateNote: async ({ request }) => {
        // Get all  of the data from the form
        const formData = await request.formData()
        const custName = formData.get('custName') as unknown as string
        const address = formData.get('address') as unknown as string
        const suite = formData.get('suite') as unknown as string
        const city = formData.get('city') as unknown as string
        const deliveryLocation = formData.get('deliveryLocation') as unknown as string
        const notes = formData.get('notes') as unknown as string
        const signers = formData.get('signers') as unknown as Array<string>
        const stopId = formData.get('stopId') as unknown as string


        // Update the note information on the database
        const updateNote = await db.collection('notes').updateOne(
            { _id: new ObjectId(stopId) },
            {
                $set: {
                    custName: custName,
                    address: address,
                    suite: suite,
                    city: city,
                    deliveryLocation: deliveryLocation,
                    notes: notes,
                    signers: signers
                }
            }
        );

        if (updateNote.matchedCount === 1) {
            throw redirect(302, '/stops');
        } else {
            return fail(500, { message: 'Server Error' });
        }
    }
}