<div class="card card-hover block">
	<div class="card-header text-3xl font-bold font-header">
		<slot name="title" />
	</div>

	<div class="p-2 text-xs">
		<slot name="subtitle" />
	</div>

	<div class="p-4">
		<slot />
	</div>

	<div class="card-footer">
		<slot name="footer" />
	</div>
</div>
