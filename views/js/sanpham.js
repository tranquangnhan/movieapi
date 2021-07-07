// window.onload = () => {
//     showPro();
// }
// const url = 'http://localhost:3000/';
// const fetchAPi = async(url, option) => {
//     const dulieu = await fetch(url, option);
//     return dulieu.json();
// }


// const getAllData = async(subUrl) => {
//     var baseUrl = url + subUrl;
//     const options = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }
//     return await fetchAPi(baseUrl, options);
// }
// const addData = async(subUrl, body) => {
//     var baseUrl = url + subUrl;
//     const options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     }
//     return await fetchAPi(baseUrl, options);
// }

// const updateData = async(subUrl, body, id) => {
//     var baseUrl = url + subUrl + '/' + id;
//     const options = {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     }
//     return await fetchAPi(baseUrl, options);
// }
// const showPro = () => {
//     getAllData('products').then((res) => {
//         var kq = res.reduce((kq, value) => {
//             kq += ` <tr>
//         <td scope="row"><strong>1</strong></td>
//         <td><img width="200" height="100" src="${value.img}" class="img-fluid imgsp"></td>
//         <td><strong><a class="namesp" href="">${value.name}</a> <input type="radio" checked=""></strong></td>
//         <td><strong>$ ${value.gia}</strong></td>
//         <td>${value.date}</td>
//         <td>
//             <a onclick="xoa(${value.id})" class="btn btn-danger"><i  class="fa fa-trash" ></i></a>
//             <a onclick="sua(${value.id})" class="btn btn-primary" data-toggle="modal" data-target="#modelId"><i class="fa fa-edit"></i></a>
//         </td>
//     </tr>`;
//             return kq;
//         }, '');
//         document.getElementById('result').innerHTML = kq;
//     })
// }


// const getClassById = async(id) => {
//     var baseUrl = url + 'lophoc';
//     const options = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }
//     const res = await fetchAPi(baseUrl, options);
//     return res.filter((val) => {
//         return id.includes(val.id);
//     })
// }


// const sua = async(id) => {
//     var baseUrl = url + 'products/' + id;
//     const options = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }
//     var sv = await fetchAPi(baseUrl, options);
//     renderData(sv);
// }


// const renderData = (sv) => {
//     document.getElementById('idedit').value = sv.id;
//     document.getElementById('nameedit').value = sv.name;

//     getAllData('categories').then(value => {
//         var kq = value.reduce((kq, value) => {
//             if (sv.iddm == value.id) {
//                 kq += `<option value="${value.id}" selected>${value.name}</option>`;
//             } else {
//                 kq += `<option value="${value.id}" >${value.name}</option>`;
//             }
//             return kq;
//         }, '');
//         document.getElementById('dmedit').innerHTML = kq;
//     })

//     document.getElementById('imgedit').setAttribute('src', sv.img);
//     document.getElementById('priceedit').value = sv.gia;
// }

// const save = async() => {
//     var id = document.getElementById('idedit').value;
//     var name = document.getElementById('nameedit').value;
//     var price = document.getElementById('priceedit').value;
//     var dm = document.getElementById('dmedit').value;

//     if (price == "" || name == "" || dm == "") {
//         Swal.fire({
//             icon: 'error',
//             title: 'Lỗi',
//             text: 'Vui lòng nhập đầy đủ thông tin!',
//         })
//     } else {

//         var formFileAdd = document.querySelector("#anhsua").files;

//         imgUpload(formFileAdd).then((downloadURL) => {

//             var img = downloadURL;
//             var body = {
//                 name: name,
//                 iddm: dm,
//                 gia: price,
//                 img: img,
//                 date: getDate()
//             }
//             updateData('products', body, id);
//             showPro();
//             $('#modelId').modal('hide');

//         })
//     }
// }




// const xoa = async function(id) {
//     Swal.fire({
//         title: 'Xoá?',
//         text: "Bạn có chắc xoá không!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Vâng, xoá!'
//     }).then(async(result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Đã xoá!',
//                 'Xoá thành công.',
//                 'success'
//             )
//             var baseUrl = url + 'products/' + id;
//             const option = {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }
//             await fetchAPi(baseUrl, option);
//             showPro();
//         }
//     })


// }

// function getDate() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//     today = mm + '/' + dd + '/' + yyyy;
//     return today;
// }

// getAllData('categories').then(value => {
//     var kq = value.reduce((kq, value) => {
//         kq += `<option value="${value.id}">${value.name}</option>`;
//         return kq;
//     }, '');
//     document.getElementById('dm').innerHTML = kq;
// })

// document.getElementById("addpro").addEventListener("submit", function(event) {
//     event.preventDefault();

//     var formFileAdd = document.querySelector("#imgadd").files;

//     imgUpload(formFileAdd).then((downloadURL) => {
//         var name = document.getElementById('name').value;
//         var dm = document.getElementById('dm').value
//         var price = document.getElementById('price').value;
//         var img = downloadURL;
//         var body = {
//             name: name,
//             iddm: dm,
//             gia: price,
//             img: img,
//             date: getDate()
//         }
//         addData('products', body);
//         showPro();
//         $('#modelId2').modal('hide');
//     })
// });

// const imgUpload = async(files) => {
//     var file = files[0]

//     var storageRef = firebase.storage().ref();
//     var fileName = file.name

//     var imageRef = storageRef.child('images/' + fileName);

//     return await imageRef.put(file).then(async function(snapshot) {

//         return await snapshot.ref.getDownloadURL().then(function(downloadURL) {

//             return downloadURL;
//         });
//     });
// }