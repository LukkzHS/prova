import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <View style={[styles.item, styles[`priority_${task.priority.toLowerCase()}`]]}>
      <View>
        <Text style={styles.title}>{task.name}</Text>
        <Text>{task.description}</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Editar" onPress={() => onEdit(task)} />
        <Button title="Excluir" onPress={() => onDelete(task.id)} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  priority_alta: {
    borderColor: 'red',
  },
  priority_média: {
    borderColor: 'orange',
  },
  priority_baixa: {
    borderColor: 'green',
  },
});

export default TaskItem;
