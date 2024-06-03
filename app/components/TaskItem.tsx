import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskItem = ({ task, onUpdate, onDelete }: any) => {
    console.log(task)
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{task.title}</Text>
      <Button title={task.completed ? "Incomplete" : "Complete"} onPress={() => onUpdate(task.id, { completed: !task.completed })} />
      <Button title="Delete" onPress={() => onDelete(task.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap:2,
    width: "100%",
    alignItems:'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
});

export default React.memo(TaskItem);
