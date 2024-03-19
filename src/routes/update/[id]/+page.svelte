<script lang="ts">
	import type { PageData } from './$types';
	import NavBar from '$components/navbar.svelte';
	import type { Stop } from '$lib/types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	let updateStop: Stop;
	updateStop = JSON.parse(data.data.updateStop);
	let error = '';

	let stopData = {
		id: updateStop._id,
		custName: updateStop.custName,
		address: updateStop.address,
		suite: updateStop.suite,
		city: updateStop.city,
		deliveryLocation: updateStop.deliveryLocation,
		notes: updateStop.notes,
		signers: updateStop.signers
	};
</script>

<svelte:head>
	<title>Update Note</title>
</svelte:head>

<div class="main">
	<NavBar />
	<h1 class="updateTitle">Update Stop</h1>
	<p>{error}</p>
	<form
		class="updateForm"
		use:enhance={({ formData }) => formData.append('stopId', stopData.id)}
		action="?/updateNote"
		method="POST"
	>
		<input name="custName" type="text" placeholder="Customer Name" bind:value={stopData.custName} />
		<input name="address" type="text" placeholder="Address" bind:value={stopData.address} />
		<input name="suite" type="text" placeholder="Suite" bind:value={stopData.suite} />
		<input name="city" type="text" placeholder="City" bind:value={stopData.city} />
		<input
			name="deliveryLocation"
			type="text"
			placeholder="Delivery Location"
			bind:value={stopData.deliveryLocation}
		/>
		<input name="notes" type="text" placeholder="Notes" bind:value={stopData.notes} />
		<input name="signers" type="text" placeholder="Signers" bind:value={stopData.signers} />
		<input type="submit" value="Update Note" />
	</form>
</div>

<style>
	.main {
		background: #c0c6c8;
	}

	.updateTitle {
		font-size: 3rem;
		color: red;
		text-align: center;
	}

	.updateForm {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.updateForm input[type='text'] {
		margin: 0.5rem 0;
		padding: 1rem;
		width: 50%;
		border-radius: 8px;
		border: solid 1px #c0c6c8;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	}

	.updateForm input[type='submit'] {
		background: #767676;
		width: 7rem;
		padding: 1rem;
		margin-top: 0.5rem;
		border: solid 1px #767676;
		border-radius: 8px;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	}
</style>
