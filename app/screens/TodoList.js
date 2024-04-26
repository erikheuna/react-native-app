import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FireBaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Ionicons  from "react-native-vector-icons/Ionicons"
import  Entypo  from 'react-native-vector-icons/Entypo'

const TodoList = ({ navigation }) => {
  //Array of Todos
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState("");

  const createTask = async () => {
    try {
        const createdTask = {
            title: task,
            completed: false
        }
      const docRef = await addDoc(collection(FIRESTORE_DB, "Tasks"), createdTask);
      alert("Task Added");
      setTask("");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  //Render the list of todos and track the changes
  useEffect(() => {
    const taskRef = collection(FIRESTORE_DB, "Tasks");

    //onSnapshot will trigger every time there is a change in tasks
    const subscriber = onSnapshot(taskRef, {
      next: (snapshot) => {
        const tasks = [];
        snapshot.docs.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTasks(tasks);
      },
    });

    //unsubscribe from events when no longer in use
    return () => subscriber();
  });

  //Rendering a todo
  const renderTask = ({ item }) => {
    const ref = doc(FIRESTORE_DB, `Tasks/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { completed: !item.completed });
    };


    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.task}>
            {item.completed && (
                <Ionicons name="checkmark-circle" size={32} color="green" />
            )}
            {!item.completed && <Entypo name="circle" size={32} color="black" />}
            <Text style={styles.taskText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteItem}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new Task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <Button onPress={createTask} title="Add Task" disabled={task === ""} />
      </View>

      {tasks.length > 0 && (
        <View>
            <FlatList 
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(task) => task.id}
            />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#6D64FF",
  },
  task: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
},
taskText: {
    flex: 1,
    paddingHorizontal: 4
},
  text: {
    fontSize: 12,
    fontWeight: "800",
    color: "white",
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4
}
});

export default TodoList;
