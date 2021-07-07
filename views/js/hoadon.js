const url = 'http://localhost:3000/';
const fetchAPi = async(url, option) => {
    const dulieu = await fetch(url, option);
    return dulieu.json();
}

const getProduct = async() => {
    var baseUrl = url + 'hoadon';
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const res = await fetchAPi(baseUrl, options);
    var kq = res.slice(0, 10).reduce((kq, value, index) => {
        kq += ` <tr>
                    <td scope="row"><strong>${index+1}</strong></td>
                    <td><strong>${value.name}</strong></td>
                    <td><strong>${value.phone}</strong></td>
                    <td><strong>$ ${value.tongtien}</strong></td>
                    <td>${value.date}</td>
                    <td><strong>${value.trangthai ==1 ?  '<input type="radio" checked="checked" onclick="return false">' : '<input type="radio" onclick="return false">'}</strong></td>
                    <td>
                        <a href=""><i class="fa fa-trash mr-3" ></i></a>
                        <a><i class="fa fa-edit"  data-toggle="modal" data-target=".bd-example-modal-lg" onclick="detailHd(${value.id})"></i></a>
                    </td>
                </tr>`;
        return kq;
    }, '');
    document.getElementById('result').innerHTML = kq;
}

getProduct();


const detailHd = async(id) => {
    var baseUrl = url + 'hoadon/' + id;
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const res = await fetchAPi(baseUrl, options);
    var idsp = res.sp.map((value) => {
        return value.idsp;
    })

    getAllSpFormHd(idsp).then(value => {
            return {
                sp: value,
                kh: res
            }
        })
        .then(value => {
            var sp = '';
            value.sp.forEach(element => {
                sp += ` <tr>
                <td scope="row">
                    <img width="300" height="100" src="${element.img}" class="img-fluid imgsp">
                </td>
                <td>${element.name}</td>
                <td>$ ${element.gia}</td>
            </tr>`;
            });

            document.getElementById('result2').innerHTML = sp;
            document.getElementById('hoten').innerHTML = value.kh.name;
            document.getElementById('diachi').innerHTML = value.kh.address;
            document.getElementById('phone').innerHTML = value.kh.phone;
            document.getElementById('email').innerHTML = value.kh.email;
            document.getElementById('trangthai').innerHTML = value.kh.trangthai == 1 ? 'Đang xử lý' : 'Đã xử lý';
        })

}

const getAllSpFormHd = async(id) => {

    var baseUrl = url + 'products';
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const res = await fetchAPi(baseUrl, options);
    return res.filter((value) => {
        return id.includes((value.id).toString());
    })
}