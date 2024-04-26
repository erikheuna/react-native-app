import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  //Sign In the user
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, passWord);
      console.log(response);
      alert("Logged In Successfully");
    } catch (error) {
      console.log(error);
      alert("Login Failed :" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        passWord
      );
      console.log(response);
      alert("Account created successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/*Avoir keyboard showing on TextInput */}
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require("../../assets/work.png")}
          />
        </View>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={passWord}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassWord(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#D5D5D5" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.loginText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderRadius: 40,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#6D64FF",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
});

export default Login;
