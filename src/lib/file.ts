import type { Task } from './Task';

export const exportTasks = (tasks: Task[]) => {
	const url =
		'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));

	const a = document.createElement('a');
	a.setAttribute('download', `tasks.json`);
	a.setAttribute('href', url);
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
