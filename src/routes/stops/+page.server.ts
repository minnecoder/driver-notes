import db from '$lib/db';
import type { Actions } from './$types'
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async () => {
    const response = await db.collection('notes').find({}).toArray();
    const allStops = JSON.stringify(response);

    return {
        data: {
            stops: allStops,
        }
    };
};

export const actions: Actions = {
    addSigner: async ({ request }) => {
        // Get the signer's name to add
        const formData = await request.formData()
        const custName = formData.get('signersName') as unknown as string
        // @ts-ignore
        const stopData = JSON.parse(formData.get('stopData'))
        stopData.signers.push(custName)

        //Add the signer's name to the array in the database
        const updateSigners = await db.collection('notes').updateOne(
            { _id: new ObjectId(stopData._id) },

            {
                $set: {
                    signers: stopData.signers
                }
            }

        )
    }
}