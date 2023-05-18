import { TaskList } from '$lib/TaskList';
import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import type { Task } from '$lib/Task';

function setTasks() {
	const { subscribe, update, set } = writable<Task[]>([]);

	if (browser) {
		const tasksList = new TaskList();
		set(tasksList.tasks);
	}

	return {
		subscribe,
		add: (title: string) =>
			update(() => {
				const tasksList = new TaskList();
				return tasksList.addItem(title);
			}),
		edit: (id: string, title: string) =>
			update(() => {
				const tasksList = new TaskList();
				return tasksList.updateItem(id, title);
			}),
		remove: (id: string) =>
			update(() => {
				const tasksList = new TaskList();
				return tasksList.removeItem(id);
			}),
		reset: () =>
			update(() => {
				const tasksList = new TaskList();
				tasksList.reset();
				return [];
			})
	};
}

export const allTasks = setTasks();
