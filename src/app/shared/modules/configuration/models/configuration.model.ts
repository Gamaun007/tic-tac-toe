export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  databaseURL: string,
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface EnvironmentConfig {
  firebase: FirebaseConfig;
}
