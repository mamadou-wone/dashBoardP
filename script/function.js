let formData = document.querySelector("#addData");
let productPrice = document.querySelector('#price');
let productName = document.querySelector('#name');
let productCategorie = document.querySelector('#select');
let firstImage = document.querySelector('#firstImage');
let secondImage = document.querySelector('#secondImage');
let productDescription = document.querySelector('#description');
var firebaseConfig = {
    apiKey: "AIzaSyB8Nrcg0Pqz1zUDMJ44YztQ9Fgn-0yBRoE",
    authDomain: "resto-7e779.firebaseapp.com",
    databaseURL: "https://resto-7e779.firebaseio.com",
    projectId: "resto-7e779",
    storageBucket: "resto-7e779.appspot.com",
    messagingSenderId: "959213582091",
    appId: "1:959213582091:web:c355a806078099d349d40e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const restoRef = firebase.firestore().collection('resto');
formData.addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct(productName.value, productPrice.value, productCategorie.value, productDescription.value);
});


function addProduct(name, price, category, description) {
    const ref = firebase.storage().ref();
    const firstImage = document.querySelector('#firstImage').files[0];
    const firstImageName = (+new Date()) + '-' + firstImage.name;
    const metadata = {
        contentType: firstImage.type
    };
    const task = ref.child(firstImageName).put(firstImage, metadata);

    const secoundImage = document.querySelector('#secondImage').files[0];
    const secoundImageName = (+new Date()) + '-' + secoundImage.name;
    const metadata2 = {
        contentType: secoundImage.type
    };
    const task2 = ref.child(secoundImageName).put(secoundImage, metadata2);
    let url1;
    let url2;
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            url1 = url.toString();
            task2
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    url2 = url.toString();
                    restoRef.add({
                        name: name,
                        price: price,
                        category: category,
                        description: description,
                        firstImage: url1,
                        secondImage: url2
                    }).then(() => {
                        console.log('data saved');
                    });
                })
        });

}