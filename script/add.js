let tbody = document.querySelector('#product');

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
restoRef
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            td3.innerHTML = `<a href="#" _ngcontent-gty-c9="" class="btn btn-sm btn-default" type="button"><em _ngcontent-gty-c9="" class="fa fa-eye"></em></a>`;

            let td4 = document.createElement('td');
            td4.innerHTML = `<a href="editProduct.html" _ngcontent-gty-c9="" class="btn btn-sm btn-primary" type="submit"><em _ngcontent-gty-c9="" class="fa fa-pencil"></em></a>`;
            let td5 = document.createElement('td');
            td5.innerHTML = `<button _ngcontent-gty-c9="" id="deleteButton" class="btn btn-sm btn-danger" type="submit"><em _ngcontent-gty-c9="" class="fa fa-trash-o" ></em></button>`;
            td.innerText = doc.data().Title;
            td2.innerText = doc.data().Price + ' CFA';
            tr.append(td, td2, td3, td4, td5);
            tbody.append(tr);
            td3.addEventListener('click', () => {
                console.log(td.innerText);
            });
        });
    });
    