import { View, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { createTasks, deleteTasks, fetchTasks, updateTasks } from '../api/tasks';
import TaskItem from './TaskItem';
import AddItem from './AddItem';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task: any) => {
    try {
       await createTasks(task);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id: any, updatedFields: any) => {
    try {
      await updateTasks(id, updatedFields);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: any) => {
    try {
      await deleteTasks(id);
      await loadTasks();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <TaskItem task={item} onUpdate={updateTask} onDelete={deleteTask} />
    ),
    [tasks]
  );

  return (
    <View>
      <View style={styles.container}>
        <AddItem onAdd={addTask} />
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id+"ddd"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default TaskList;
