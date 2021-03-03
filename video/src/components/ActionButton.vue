<template>

	<div :class="['button', 'button--' + buttonType]">{{ buttonText }}</div>
	
</template>

<script>


export default {
	name: 'ActionButton',
	props: ['buttonText', 'buttonType'],
	data: function () {
		return {
		}
	}
}
</script>

<style>
	.button{
		width: 125px;
		height: 39px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.3rem;
		font-weight: 600;
		border-radius: 6px;
		cursor: pointer;
		transition: all .3s;
	}
	.button--light{
		background-color: #E2E6F1;
		color: #212121;
	}
	.button--light:hover{
		opacity: .8;
	}
	.button--light:active{
		background-color: #CED5E3;
		box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
	}
	.button--dark{
		background-color: #374877;
		color: #fff;
	}
	.button--dark:hover{
		opacity: .8;
	}
	.button--dark:active{
		background-color: #283863;
		box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
	}
</style>