window.onload = () => {
    showCat()
}
const url = 'http://localhost:3000/';
const fetchAPi = async(url, option) => {
    const dulieu = await fetch(url, option);
    return dulieu.json();
}


const getAllData = async(subUrl) => {
    var baseUrl = url + subUrl;
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    return await fetchAPi(baseUrl, options);
}

const addData = async(subUrl, body) => {
    var baseUrl = url + subUrl;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetchAPi(baseUrl, options);
}

const updateData = async(subUrl, body, id) => {
    var baseUrl = url + subUrl + '/' + id;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetchAPi(baseUrl, options);
}

const showCat = () => {
    getAllData('categories').then((data) => {
        var kq = data.reduce((acc, value, index) => {
            acc += ` <tr>
                    <td>${index}</td>
                    <td>${value.name}</td>
                    <td>
                        <a onclick="xoa(${value.id})"><i class="fa fa-trash mr-3" ></i></a>
                        <a onclick="sua(${value.id})" data-toggle="modal" data-target="#modelId"><i class="fa fa-edit"></i></a>
                    </td>
                </tr>`;
            return acc;
        }, '')
        document.getElementById('result').innerHTML = kq
    })
}

const xoa = async function(id) {
    Swal.fire({
        title: 'Xoá?',
        text: "Bạn có chắc xoá không!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vâng, xoá!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Đã xoá!',
                'Xoá thành công.',
                'success'
            )
            var baseUrl = url + 'categories/' + id;
            const option = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            await fetchAPi(baseUrl, option);
            showCat();
        }
    })
}


document.getElementById("adddm").addEventListener("submit", function(event) {
    event.preventDefault();

    var namedm = document.getElementById('namedm').value;
    if (namedm == '') {
        Swal.fire(
            'Lỗi!',
            'Vui lòng nhập tên danh mục.',
            'error'
        )
    } else {
        var body = {
            name: namedm,
        }

        addData('categories', body);
        showCat();
    }

    $('#modelId2').modal('hide');
    document.getElementById("adddm").reset();
});


const sua = async(id) => {
    var baseUrl = url + 'categories/' + id;
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    var dm = await fetchAPi(baseUrl, options);
    renderData(dm);
}

const renderData = (dm) => {
    document.getElementById('iddmedit').value = dm.id;
    document.getElementById('namedmedit').value = dm.name;
}

const save = async() => {
    var id = document.getElementById('iddmedit').value;
    var name = document.getElementById('namedmedit').value;

    if (name == "") {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập đầy đủ thông tin!',
        })
    } else {
        var body = {
            name: name,
        }
        updateData('categories', body, id);
        showCat();
        $('#modelId').modal('hide');
    }
}