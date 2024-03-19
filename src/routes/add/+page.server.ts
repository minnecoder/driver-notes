import db from "$lib/db";
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    addNote: async ({ request }) => {
        // Get all  of the data from the form
        const formData = await request.formData()
        const custName = formData.get('custName') as unknown as string
        const address = formData.get('address') as unknown as string
        const suite = formData.get('suite') as unknown as string
        const city = formData.get('city') as unknown as string
        const deliveryLocation = formData.get('deliveryLocation') as unknown as string
        const notes = formData.get('notes') as unknown as string
        const signers = formData.get('signers') as unknown as Array<string>

        // Create the note
        const addNote = await db.collection('notes').insertOne({
            custName: custName,
            address: address,
            suite: suite,
            city: city,
            deliveryLocation: deliveryLocation,
            notes: notes,
            signers: signers
        })

        if (!addNote) {
            return fail(400, { message: 'Note was not added' })
        }

        throw redirect(302, '/stops')
    }
}