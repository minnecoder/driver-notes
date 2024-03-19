<script lang="ts">
	import NavBar from '../../components/navbar.svelte';
	import type { Stop } from '$lib/types';
	import { enhance } from '$app/forms';

	let stop: Stop = {
		_id: '',
		custName: '',
		address: '',
		suite: '',
		city: '',
		deliveryLocation: '',
		notes: '',
		signers: []
	};
	let error = '';
</script>

<svelte:head>
	<title>Add Note</title>
</svelte:head>

<div class="main">
	<NavBar />
	<h1 class="addTitle">Add Stop</h1>
	<p>{error}</p>
	<form
		class="addForm"
		use:enhance={({ formData }) => formData.append('stopId', JSON.stringify(stop._id))}
		action="?/addNote"
		method="POST"
	>
		<input name="custName" type="text" placeholder="Customer Name" bind:value={stop.custName} />
		<input name="address" type="text" placeholder="Address" bind:value={stop.address} />
		<input name="suite" type="text" placeholder="Suite" bind:value={stop.suite} />
		<input name="city" type="text" placeholder="City" bind:value={stop.city} />
		<input
			name="deliveryLocation"
			type="text"
			placeholder="Delivery Location"
			bind:value={stop.deliveryLocation}
		/>
		<input name="notes" type="text" placeholder="Notes" bind:value={stop.notes} />
		<input name="signers" type="text" placeholder="Signers" bind:value={stop.signers} />
		<input type="submit" value="Add Note" />
	</form>
</div>

<style>
	.main {
		background: #c0c6c8;
	}

	.addTitle {
		font-size: 3rem;
		color: red;
		text-align: center;
	}

	.addForm {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.addForm input[type='text'] {
		margin: 0.5rem 0;
		padding: 1rem 0.5rem;
		width: 50%;
		border-radius: 8px;
		border: solid 1px #c0c6c8;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	}

	.addForm input[type='submit'] {
		background: #767676;
		width: 5rem;
		padding: 1rem 0;
		margin-top: 0.5rem;
		border: solid 1px #767676;
		border-radius: 8px;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	}
</style>
