const firebaseConfig = {
    apiKey: "AIzaSyDoFwUuRJYFxm0PN4XPYEvQN42wpRa4-Cc",
    authDomain: "loginfirebase--poo.firebaseapp.com",
    projectId: "loginfirebase--poo",
    storageBucket: "loginfirebase--poo.appspot.com",
    messagingSenderId: "353807816038",
    appId: "1:353807816038:web:c3b85a60544cfb88e964a7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('cadastro').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    auth.createUserWithEmailAndPassword(email, senha).then((userCredential) => {
        window.alert('O usuário foi cadastrado com sucesso!');
    }).catch((error) => {
        window.alert('Erro ao cadastrar');
    });
});

document.getElementById('login').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    auth.signInWithEmailAndPassword(email, senha).then((userCredential) => {
        window.location.href = 'site.html';
    }).catch((error) => {
        window.alert('Erro ao Logar');
    });
});



