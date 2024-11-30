import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default TaskList;
