importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCUq1mw38y6Lc8hn0TZOlLUBWth14YU5sg",
    authDomain: "bunyachon-abb2b.firebaseapp.com",
    projectId: "bunyachon-abb2b",
    storageBucket: "bunyachon-abb2b.firebasestorage.app",
    messagingSenderId: "296149186478",
    appId: "1:296149186478:web:648ce827de3024f2a6fa3f"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
