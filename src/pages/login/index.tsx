import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Layout from "@/layout";
import {useTheme} from "@/context/useThemeContext";
import useToast from "@/hooks/useToast";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {theme} = useTheme();
  const {toast} = useToast();

  const onClickLoginBtn = () => {
    if (!email || !password) {
      return toast.warning("Please enter email and password");
    }
  };

  return (
    <Layout style={styles.layout}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.logoView}>
          <Image
            source={require("@/assets/skout_logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={email}
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#AFAFAF"
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={password}
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#AFAFAF"
            secureTextEntry
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.loginBtn,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={onClickLoginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity style={{marginHorizontal: 15}}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                styles.singUp,
                {
                  color: theme.primary,
                },
              ]}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#fff",
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
    width: 250,
    height: 100,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#EAEAEA",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#777777",
    fontWeight: "800",
  },
  singUp: {
    fontWeight: "500",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  logoView: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    marginTop: 0,
  },
  forgot: {
    fontWeight: "normal",
  },
});
