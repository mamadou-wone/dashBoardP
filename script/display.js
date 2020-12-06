let tbody = document.querySelector('#product');
let deleteButton = document.querySelector('#deleteButton');
let parity = 0;

var firebaseConfig = {
    apiKey: "AIzaSyAwrq31O5HTiAitdZOmVRcEhosipAyoGOE",
    authDomain: "my-resto-app-4679a.firebaseapp.com",
    databaseURL: "https://my-resto-app-4679a.firebaseio.com",
    projectId: "my-resto-app-4679a",
    storageBucket: "my-resto-app-4679a.appspot.com",
    messagingSenderId: "680485121633",
    appId: "1:680485121633:web:9359cac376a38d8bffc420"
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
            td4.innerHTML = `<a href="#" _ngcontent-gty-c9="" class="btn btn-sm btn-primary" type="submit"><em _ngcontent-gty-c9="" class="fa fa-pencil" id="edit"  data-toggle="modal" data-target="#exampleModal3"></em></a>`;
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

            td4.addEventListener('click', () => {
                document.body.append(editmodalView);
                // let editButton = document.querySelector("#editButton");
                // editButton.addEventListener('click', () => {
                //     console.log(doc.id);
                // })
                editProduct(doc.id);
            })

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
            <button type="button" class="btn btn-outline-danger" id ='confDelete'>Delete</button>
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
            <button type="button" class="btn btn-primary" id =''>Delete</button>
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

let editmodalView = document.createElement('div');
editmodalView.innerHTML = `<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModal3Label"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
        </div>
        <div class="modal-body">
        <form method="post" class="user" enctype="multipart/form-data" action="">

        <div class="form-group row">
        <div class="col-sm-6 mb-3 mb-sm-0">
            <input type="text" class="form-control form-control-user" id="productName" placeholder="Name" name="name" required>
        </div>
        <div class="col-sm-6">
            <input type="number" class="form-control form-control-user" id="productPrice" placeholder="Price" name="price" required>
        </div>
    </div>

            <div class="form-group">
            <select class="form-control" id="selectValue" name="select" id="select" required>
    <option value="" disabled selected>Choisissez la catégorie</option>
    <option value="drinks" >Drinks</option>
    <option value="desert">Desert</option>
    <option value="fast food">Fast Food</option>
    <option value="repas">Repas</option>
    </select>
        </div>
<div class="form-group">
<input type="text" class="form-control form-control-user" id="productDescription" placeholder="Description" name="description" required>
</div>

        </form>
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id ="editButton">Save Change</button>
        </div>
    </div>
</div>
</div>`;



let editProduct = (id) => {
    restoRef
        .doc(id)
        .get()
        .then((snapshot) => {
            // console.log(snapshot.id);
            document.querySelector("#exampleModal3Label").innerText = snapshot.data().name;
            document.querySelector('#productName').value = snapshot.data().name;
            document.querySelector('#productPrice').value = snapshot.data().price;
            document.querySelector('#selectValue').value = snapshot.data().category;
            document.querySelector('#productDescription').value = snapshot.data().description;
            document.querySelector("#editButton").addEventListener('click', () => {
                updateProduct(snapshot.id, document.querySelector('#productName').value, document.querySelector('#productPrice').value, document.querySelector('#selectValue').value, document.querySelector('#productDescription').value);
            });
        })
}

let updateProduct = (id, name, price, category, description) => {
    restoRef
        .doc(id)
        .update({
            name: name,
            price: price,
            category: category,
            description: description
        }).then(() => {
            console.log("the doc " + id + " " + " updated");
        })
}