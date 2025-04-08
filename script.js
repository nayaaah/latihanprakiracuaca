//akses API desa kelurahan
fetch('https://24252-if21-pw1-omega.vercel.app/javascript/wilayah.json')
.then( response => response.json() )
.then( data => {
    console.log(data);
    data.forEach( (item) => {
        document.getElementById("list-desa").innerHTML += `<li onclick='detail("${item.kode}")'> ${item.kode} ${item.nama} </li>`
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
            document.getElementById("list-cuaca").innerHTML += `${cuaca.weather_desc} `
            })
        })
    })
 }