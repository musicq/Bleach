import { fork } from 'child_process';

/**
 * dispatch task in child process
 * @param task task name
 * @param args pramaters
 */
export function dispatch<T>(task: string, ...args: any[]): Promise<T> {
  return tasks[task](...args);
}

const tasks = {
  extract: <T>(...args: any[]): Promise<T> => {
    const file = args[0];
    const extractExcelWorker = fork('./release/extract-excel.worker.js');

    extractExcelWorker.send(file);

    return new Promise(resolve => {
      extractExcelWorker.on('message', data => resolve(data));
    });
  }
};
