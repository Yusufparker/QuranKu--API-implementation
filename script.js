

$(document).ready(function(){
    showListSurat()
    
})

$('.btn-home').on('click', function(){

    showListSurat()
    window.location.reload();


    
})






$('.btn-search-ayat').on('click', function(){
    let nama_surat = $('.input-surat').val().toLowerCase()
    //console.log(nama_surat);
    showSuratBesertaIsi(nama_surat)
    

})



function showSuratBesertaIsi(nama_surat){
    $.ajax({
        url: 'https://equran.id/api/surat',
        success: function(data) {
        let i = data.findIndex((surat) => surat.nama_latin.toLowerCase() === nama_surat)
        //console.log(data[i]);
        let surat = i+1;
        $.ajax({
            url: 'https://equran.id/api/surat/'+surat,
            success: function (data_surat){
                let isi_ayat = `<div class="container body-quran">
                <div class="row mb-5 shadow-sm">
                <div class="col p-3 text-center">
                        <h5>${data_surat.nama_latin} • ${data_surat.nama}</h5>
                        <h6>${data_surat.tempat_turun} • ${data_surat.jumlah_ayat} Ayat </h6>
                    </div>
                    </div>`;
                //console.log(data_surat);
                data_surat.ayat.forEach(s => {
                    isi_ayat+=showAyat(s);
                    //console.log(s);
                });

                $('.body-quran').html(isi_ayat)
                $('.btn-tafsir-ayat').on('click',function(){
                    let ayat = $(this).data('ayat')-1;
                    let isi_surat = $(this).data('isi')
                    $.ajax({
                        url:'https://equran.id/api/tafsir/'+surat,
                        success: function(data_tafsir){
                            //console.log(data_tafsir.tafsir[ayat].tafsir);
                            $('.modal-content').html(showModal(data_tafsir, ayat, isi_surat))
                        }
                    })

                })
                $('.btn-home').removeClass('d-none')
                //console.log(data_surat.ayat[0].ar);
            },error: e => console.log(e.status)
        })
        },
        error: function(error) {
            console.error(error);
        }
        });
}


function showListSurat(){
    let cover_surat = '';
    $.ajax({
        url : 'https://equran.id/api/surat',
        success: data =>{
            data.forEach(s => {
                cover_surat+= showCoverSurat(s);
                //console.log(s);
            });
            $('.cover-quran').html(cover_surat)
            $('.cover-surat').on('click', function(){
                let surat = $(this).data('surat').toLowerCase()
                //console.log(surat);
                showSuratBesertaIsi(surat)
                
            })
        }
    })
    }

function showAyat(s){
    return `
    <div class="row d-flex justify-content-between ps-5 pe-5 pt-3 pb-3 shadow-sm ">
    <div class="col-1">
            <div class="dropdown">
            <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${s.surah} : ${s.nomor}
                </button>
                <ul class="dropdown-menu menu-ayat">
                    <li><a class="dropdown-item" href="#">Copy <i class="bi bi-clipboard"></i></a></li>
                    <li><a class="dropdown-item btn-tafsir-ayat" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-ayat="${s.nomor}" data-isi="${s.ar}">Tafsir <i class="bi bi-journals"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="col-11">
            <div class="row text-end"><p class="fs-2 ayat-suci">${s.ar}</p></div>
            <div class="row text-start"><p class="fw-light"><i>${s.tr}</i></p></div>
            <div class="row text-start"><p class="">${s.idn}</p></div>
            
        </div>
    </div>
</div>`
    }



function showModal(s, ayat, isi_surat){
    return `<div class="modal-header">
    <h1 class="modal-title fs-5 fw-light" id="staticBackdropLabel">Tafsir Q.S ${s.nomor}:${ayat+1}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body p-5">
    <div class="row text-end">
        <p class="fs-2 ayat-suci">${isi_surat}</p>
    </div>
    <div class="row mt-3">
        <p class="fw-bold">Tafsir</p>
        <p>${s.tafsir[ayat].tafsir}</p>  
    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
</div>`
}


function showCoverSurat(s){
    return `<div class="col-3 shadow-sm  p-3 cover-surat" data-surat="${s.nama_latin}">
    <div class="row d-flex justify-content-between">
        <div class="col-md-5">
            <p class=" fw-semibold cover-nama-latin">${s.nama_latin}</p>
            <p class="cover-arti-nama">${s.arti}</p>
            
        </div>
        <div class="col-md-7 text-end">
            <p class="fw-bold fs-3 ayat-suci cover-nama-surat">${s.nama}</p>
        </div>
    </div>
    
</div>`
}




//untuk surat dan ayat
// $.ajax({
//     url: 'https://equran.id/api/surat/1',
//     success: data => {
//         data.ayat.forEach(i => {
//             console.log(i);
//         });
//         // for (let i =0; i < data.ayat.length; i++){
//         //     console.log(data.ayat[i].ar);

//         // }
//     },
//     error: function(xhr, status, error) {
//         console.error(error);
//     }
//   });
  
//   $.get('https://equran.id/api/surat', { q: 'surat ke-1' }, function(data) {
//     console.log(data);
//   }).fail(function(error) {
//     console.error(error);
//   });
  