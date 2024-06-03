import { ApiFetch, jsonResponseFromFetchResponse } from './fetchApi';

const apiCoreInstance = new ApiFetch();

export const fetchTasks = async () => {
  const res = await apiCoreInstance.get('/tasks', {});
  return jsonResponseFromFetchResponse(res);
};

export const fetchTask = async (id: any) => {
  const res = await apiCoreInstance.get(`/tasks/${id}`, {});
  return jsonResponseFromFetchResponse(res);
};

export const updateTasks = async (id: any, body:any) => {
  const res = await apiCoreInstance.put(`/tasks/${id}`, body);
  return jsonResponseFromFetchResponse(res);
};

export const createTasks = async (body: any) => {
  const res = await apiCoreInstance.post(`/tasks/`, body);
  return jsonResponseFromFetchResponse(res);
};

export const deleteTasks = async (id:any) => {
  const res = await apiCoreInstance.delete(`/tasks/${id}`);

};