import { TASKS_NAME } from './config';
import { Task } from './Task';

export class TaskList {
	tasks: Task[];

	constructor() {
		const items = this.getStorageItems();
		this.tasks = items;
	}

	addItem(title: string) {
		const task = new Task(title);
		const tasks = this.getStorageItems();
		tasks.push(task);
		localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks }));
		this.tasks = tasks;
		return this.tasks;
	}

	updateItem(id: string, title: string) {
		const tasks = this.getStorageItems();
		const task = tasks.findIndex((t) => t.id === id);
		if (task !== -1) {
			tasks[task].title = title;
			localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks }));
			this.tasks = tasks;
		}

		return this.tasks;
	}

	updateTimer(id: string, time_spent: Task['total_minutes_spent']) {
		const tasks = this.getStorageItems();
		const task = tasks.findIndex((t) => t.id === id);
		if (task !== -1) {
			tasks[task].total_minutes_spent += time_spent;
			tasks[task].total_minutes_left -= time_spent;
			localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks }));
			this.tasks = tasks;
		}

		return this.tasks;
	}

	removeItem(id: string) {
		const tasks = this.getStorageItems();
		const filteredTasks = tasks.filter((t) => t.id !== id);
		localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks: filteredTasks }));
		this.tasks = filteredTasks;
		return this.tasks;
	}

	updateAllItems(newTasks: Task[]) {
		const tasks = this.getStorageItems();
		for (let count = 0; count < newTasks.length; count++) {
			const task = tasks.findIndex((t) => t.id === newTasks[count].id);
			if (task !== -1) {
				tasks[task] = newTasks[count];
			} else {
				tasks.push(newTasks[count]);
			}
		}
		localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks }));
		this.tasks = tasks;

		return this.tasks;
	}

	reset() {
		localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks: [] }));
		this.tasks = this.getStorageItems();
	}

	private getStorageItems() {
		const storage = localStorage.getItem(TASKS_NAME);
		if (!storage) {
			localStorage.setItem(TASKS_NAME, JSON.stringify({ tasks: [] }));
			const items = localStorage.getItem(TASKS_NAME);
			if (items) {
				return JSON.parse(items)['tasks'] as Task[];
			}
			throw new Error('Could not get items');
		}
		return JSON.parse(storage)['tasks'] as Task[];
	}
}
