<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let user = {
		userName: '',
		password: '',
		error: ''
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="main">
	<h1 class="login-title">Delivery Notes</h1>
	{#if form?.message}
		<p class="error">{form?.message}</p>
	{/if}
	<form class="login-form" action="?/login" method="POST">
		<input name="userName" type="text" placeholder="User Name" value={user.userName} />

		<input name="password" type="password" placeholder="Password" value={user.password} />

		<input class="loginBtn" type="submit" value="Submit" />
		<div>
			<p>
				Don't have an account? <a class="link" href="/register">Register User</a>
			</p>
			<p>
				Login as a Demo User <a class="link" href="/demo">Click Here</a>
			</p>
		</div>
	</form>
</div>

<style>
	.main {
		background: #c0c6c8;
	}

	.login-title {
		text-align: center;
		margin-top: 4rem;
	}

	.error {
		text-align: center;
		color: red;
		font-weight: bold;
	}

	.loginBtn {
		display: inline-block;
		text-decoration: none;
		font-weight: bold;
		color: white;
		overflow: hidden;
		background-color: #767676;
		margin: 1rem 0;
		padding: 0.5rem 1rem;
		border: 1px solid #767676;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
	}

	.login-form {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.login-form input {
		width: 20rem;
		margin: 0.5rem 0;
		padding: 1rem 0;
		text-align: center;
		border-radius: 8px;
		border: solid 1px #c0c6c8;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	}

	.login-form input[type='submit'] {
		width: 5rem;
		background: #767676;
		color: white;
		border: solid 1px #767676;
	}

	.link {
		text-decoration: none;
	}
</style>
