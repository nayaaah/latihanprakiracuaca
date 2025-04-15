//akses API desa kelurahan
fetch('https://24252-if21-pw1-omega.vercel.app/javascript/wilayah.json')
.then( response => response.json() )
.then( data => {
    console.log(data);
    data.forEach( (item) => {
        document.getElementById("list-desa").innerHTML += `<li class="list-group-item" onclick='detail("${item.kode}")'> ${item.kode} ${item.nama} </li>`
    })
})
 function detail(kode) {
    console.log(kode);
    // akses API cuaca BMKG berdasarkan kode wilayah desa/kelurahan
    fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${kode}`)
    .then( response => response.json() )
    .then( data => {
        console.log(data);
        document.getElementById('desa').innerHTML = data.lokasi.desa;
        document.getElementById('kecamatan').innerHTML = data.lokasi.kecamatan;
        document.getElementById('kotkab').innerHTML = data.lokasi.kotkab;
        document.getElementById('provinsi').innerHTML = data.lokasi.provinsi;
// cara untuk menampilkan cuaca, dipisahkan dengan . karena respon dari API nya membuat folder didalam folder
        data.data[0].cuaca.forEach( (item) => {
            console.log(item);
            item.forEach( (cuaca) => {
            document.getElementById("list-cuaca").innerHTML += 
// margin itu sisi luar/tabelnya, padding sisi dalam/cardnya
            `<div class="col-lg-3 p-2">
            <div class="card">
            <img src="${cuaca.image}" class="card-img-top p-2" alt="...">
            <div class="card-body">
                <h6 class="card-title">${cuaca.weather_desc}</h6>
                <p class="card-text">${cuaca.utc_datetime}</p>
            </div>
            </div>
            </div>`
            })
        })
    })
 }

//  Akses API data Gempa BMKG
function gempaterkini(){
    fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
    .then( response => response.json()) 
    .then( data => {
        console.log(data.Infogempa.gempa);
        document.getElementById('gempa-terkini').innerHTML += `
        <div class="card">
            <img src="https://data/bmkg.go.id/DataMKG/TEWS/${data.Infogempa.gempa.Shakemap} " 
            class="card-img-top p-2" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.Infogempa.gempa.Wilayah}</h5>
        <p class="card-text">${data.Infogempa.gempa.Potensi} </p>
        <div class="row">
        <div class="col" ${data.Infogempa.gempa.Tanggal}</div>
        div class="col">${data.Infogempa.gempa.Jam}</div>
        </div>
        </div>
        </div>`
    })
}