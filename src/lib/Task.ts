import { TASKS_NAME } from './config';

export class Task {
	readonly id: string;
	title: string;
	total_minutes_spent: number;
	total_minutes_left: number;
	isCompleted: boolean;

	constructor(title: string) {
		this.id = window.crypto.randomUUID();
		this.title = title;
		this.total_minutes_left = 10000 * 60;
		this.total_minutes_spent = 0;
		this.isCompleted = false;
	}
	static getStorageItems() {
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
