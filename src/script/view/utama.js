import '../komponen/daftarResep.js';
import '../komponen/searchBar.js';
import '../komponen/pagination.js';
import DataResep from '../data/dataResep.js';

let searchElemen = document.querySelector('search-bar');
let dRsepElemen = document.querySelector('daftar-resep');
let paginate = document.querySelector('pagi-nation');
let page = 0;
let sPage = false;

const utama = async () => {
  await randomResep();
  searchElemen.clickEvent = tombolCariDitekan;
  paginate.prev = prev;
  paginate.next = next;
  searchElemen.listRec = likedRecipe;
};
const next = async () => {
  if (sPage == false) {
    alert('There is no next page');
  } else {
    try {
      const lanjut = await DataResep.offset(page);
      renderHasil(lanjut);
    } catch (error) {
      fallbackHasil(error);
    }
  }
};
const prev = async () => {
  if (sPage == false) {
    alert('There is no previous page');
  } else {
    try {
      page += -1;
      const sebelum = await DataResep.offset(page);
      renderHasil(sebelum);
    } catch (error) {
      fallbackHasil(error);
    }
  }
};
const likedRecipe = async () => {
  let idR = [];
  JSON.parse(sessionStorage.getItem('liked_recipe')).map((id) => {
    try {
      idR.push(JSON.parse(sessionStorage.getItem(id)));
      sPage = false;
    } catch (error) {
      console.log(error);
    }
  });

  if (typeof idR !== undefined) {
    console.log(idR);
    let likedRecipes = document.querySelector('#modalLikedResep .modal-body');
    likedRecipe.innerHTML = '';
    idR.forEach((data) => {
      if (data !== null) {
//        semua=+data;
        const elementResep = document.createElement('re-sep');
//        let rem=do
        elementResep.resep = data;
        likedRecipes.appendChild(elementResep);
      }
    });
    // dRsepElemen.daftar=semua;
    // console.log(semua);
  }

  document.querySelector('#modalLikedResep .modal-title').innerHTML =
    'Liked Recipes';

  $('#modalLikedResep').modal('toggle');
};

const randomResep = async () => {
  const el = (img, title, desc) => /*html*/ `
    <div class="col wadahRandom">
      <div class="diacak">
        <div class="fotoRandom">
          <img class="foto" src=${img} />
        </div>
        <div class="isiRandom">
          <div>
            <h4 class="acak-title">${title}</h4>
            <p class="acak-desc">${desc}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  const randomResepContainer = document.querySelector(
    '#random-resep-item-container'
  );

  const cK = 'hasilRandom';
  if (typeof Storage !== 'undefined') {
    if (
      sessionStorage.getItem(cK) === 'null' ||
      sessionStorage.getItem(cK) == null
    ) {
      let random = await DataResep.random();
      console.log(random);
      sessionStorage.setItem(cK, JSON.stringify(random));
    } else {
      JSON.parse(sessionStorage.getItem(cK)).map((data) => {
        randomResepContainer.innerHTML += el(
          data.image,
          data.title,
          data.title,
          data.instructions
        );
      });
    }
  } else {
    alert(
      'Your browser does not support web storage. Some functions would not run as it is'
    );
  }
};

const tombolCariDitekan = async () => {
  try {
    const hasil = await DataResep.cari(searchElemen.value, searchElemen.jenis);
    console.log(hasil);
    renderHasil(hasil);
    console.log(hasil);
    sPage = true;
    page = 0;
  } catch (error) {
    fallbackHasil(error);
  }
};
const renderHasil = (hasil) => {
  dRsepElemen.daftar = hasil;
};
const fallbackHasil = (pesan) => {
  dRsepElemen.renderError(pesan);
};

export default utama;
