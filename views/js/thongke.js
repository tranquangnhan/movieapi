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

getAllData('products').then(value => {
    document.getElementById('sanpham').innerHTML = value.length;
})

getAllData('categories').then(value => {
    document.getElementById('dm').innerHTML = value.length;
})

getAllData('hoadon').then(value => {
    document.getElementById('donhang').innerHTML = value.length;
})



google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);
var d = new Date();
var n = d.getMonth();

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Ngày', 'Tháng Này', 'Tháng Trước'],
        [1, 100, 0],
        [15, 251110, 251110 / 3],
        [30, 125555, 251110 / 4]
    ]);

    var options = {
        title: 'Tổng Số Lượt Xem',
        width: 900,
        height: 300,
        hAxis: {
            title: 'Ngày',
            titleTextStyle: {
                color: '#333'
            }
        },
        vAxis: {
            minValue: 0
        }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart'));
    chart.draw(data, options);
}



getAllData('hoadon').then(value => {

    const kq = value.filter(vl => {
        return (new Date().getMonth() + 1) == (new Date(vl.date).getMonth() + 1)
    })
    var arr = [];
    kq.forEach(element => {
        var check = arr.findIndex(value => value.date == new Date(element.date).getDate());
        if (check !== -1) {
            arr[check]['tongtien'] += element.tongtien;
        } else {
            arr.push({
                "date": new Date(element.date).getDate(),
                "tongtien": element.tongtien
            });
        }
    });
    return arr
}).then(dulieu => {
    var labels = dulieu.map(val => val.date);
    var data = dulieu.map(val => val.tongtien);

    var ctx = document.getElementById('columnchart_values').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: labels,
            datasets: [{
                label: 'Thống kê doanh thu trong tháng',
                data: data,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
})