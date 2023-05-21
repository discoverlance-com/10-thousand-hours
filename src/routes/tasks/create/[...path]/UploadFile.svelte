<script lang="ts">
	import joi from 'joi';
	import { allTasks } from '$lib/stores/taskStore';
	import { goto } from '$app/navigation';

	const taskSchema = joi.array().items(
		joi.object({
			id: joi.string().required(),
			title: joi.string(),
			total_minutes_spent: joi.number().required(),
			total_minutes_left: joi.number().required(),
			isCompleted: joi.bool().required()
		})
	);

	function handleUpload(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const files = event.currentTarget.files;
		if (files) {
			const file = files[0];
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target) {
					//
					const content = ev.target.result;
					const contentAsString = content?.toString();
					if (contentAsString) {
						const tasks = JSON.parse(contentAsString);
						// validate tasks
						const { error, value } = taskSchema.validate(tasks);
						if (error) {
							alert('Error, file cannot be uploaded: ' + error.message);
							return;
						}
						// update all tasks
						allTasks.updateAllItems(value);
						goto('/');
					}
				}
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="flex justify-end mt-2 mb-4 gap-4">
	<label class="flex gap-2 items-center">
		<span>Import Tasks</span>
		<input type="file" class="input w-56" on:change={handleUpload} accept=".json" required />
	</label>
</div>
