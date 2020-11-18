let tbody = document.querySelector('#product');
let deleteButton = document.querySelector('#deleteButton');
let parity = 0;
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
            tr.className = 'odd';
            let td = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            td3.innerHTML = `<a href="#" _ngcontent-gty-c9="" class="btn btn-sm btn-default" type="button" ><em _ngcontent-gty-c9="" class="fa fa-eye" data-toggle="modal" data-target="#exampleModal2"></em></a>`;

            let td4 = document.createElement('td');
            td4.innerHTML = `<a href="editProduct.html" _ngcontent-gty-c9="" class="btn btn-sm btn-primary" type="submit"><em _ngcontent-gty-c9="" class="fa fa-pencil"></em></a>`;
            let td5 = document.createElement('td');
            td5.innerHTML = `<button _ngcontent-gty-c9="" id="deleteButton" class="btn btn-sm btn-danger" type="submit"  data-toggle="modal" data-target="#exampleModal"><em _ngcontent-gty-c9="" class="fa fa-trash-o" ></em></button>`;
            td.innerText = doc.data().name;
            td2.innerText = doc.data().price + ' CFA';
            tr.append(td, td2, td3, td4, td5);
            tbody.append(tr);


            td3.addEventListener('click', () => {
                document.body.append(modalView);
                displayInfo(doc.id);
            });

            td5.addEventListener('click', () => {
                document.body.append(modal);
                let confDelete = document.querySelector('#confDelete');
                confDelete.addEventListener('click', () => {
                    deleteItem(doc.id);
                    setTimeout(intervale, 500);
                });

            });

        });
        let test = document.querySelectorAll('.odd');
        for (let index = 0; index < test.length; index++) {
            const element = test[index];
            if (index % 2 == 0) {
                test[index].className = 'even';
            }
        }
    });

intervale = () => {
    location.reload()
}


let modal = document.createElement('div');
modal.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Attention</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="modal-body">
            Confirmez la Suppression!
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id ='confDelete'>Save danger</button>
        </div>
    </div>
</div>
</div>`;

let modalView = document.createElement('div');
modalView.innerHTML = `<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModal2Label">Apperçu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="modal-body">
        
        <img alt="" width="150px" height="150px" id="imgView">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id =''>Save danger</button>
        </div>
    </div>
</div>
</div>`;

let deleteItem = (id) => {
    // console.log(id);
    restoRef
        .doc(id)
        .delete()
        .then(() => console.log("Document deleted")) // Document deleted
        .catch((error) => console.error("Error deleting document", error));
}

let displayInfo = (id) => {
    restoRef
        .doc(id)
        .get()
        .then((snapshot) => {
            let img = snapshot.data().firstImage;
            document.querySelector('#imgView').src = img;
        });
}