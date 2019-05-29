import firebaseConfig from "./config";
import "firebase/auth";
import app from "firebase/app";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}

const firebase = new Firebase();
export default firebase;
