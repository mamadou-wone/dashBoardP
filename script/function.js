let formData = document.querySelector("#addData");
let productPrice = document.querySelector('#price');
let productName = document.querySelector('#name');
let productCategorie = document.querySelector('#select');
let firstImage = document.querySelector('#firstImage');
let secondImage = document.querySelector('#secondImage');
let productDescription = document.querySelector('#description');
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwrq31O5HTiAitdZOmVRcEhosipAyoGOE",
    authDomain: "my-resto-app-4679a.firebaseapp.com",
    databaseURL: "https://my-resto-app-4679a.firebaseio.com",
    projectId: "my-resto-app-4679a",
    storageBucket: "my-resto-app-4679a.appspot.com",
    messagingSenderId: "680485121633",
    appId: "1:680485121633:web:9359cac376a38d8bffc420"
};
// const db = firebase.firestore();
// const restoRef = firebase.firestore().collection('test');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const restoRef = firebase.firestore().collection('resto');
// restoRef
//     .get()
//     .then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             console.log(doc.data());
//         })
//     })
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
    const task = ref.child("img1/" + firstImageName).put(firstImage, metadata);

    const secoundImage = document.querySelector('#secondImage').files[0];
    const secoundImageName = (+new Date()) + '-' + secoundImage.name;
    const metadata2 = {
        contentType: secoundImage.type
    };
    const task2 = ref.child("img2/" + secoundImageName).put(secoundImage, metadata2);
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
                        alert("Data Saved !");
                    });
                })
        });

}