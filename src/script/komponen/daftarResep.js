import './resep.js';
import DataResep from '../data/dataResep.js';

const elemenDaftarResep = document.querySelector('daftar-resep');

class DaftarResep extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    this._liked = [];
    this.daftar = [];
  }

  set daftar(resep) {
    this._daftar = resep;
    this.render();
  }

  set liked(suka) {
    this._liked = suka;
  }

  get liked() {
    return this._liked;
  }

  renderError(pesan) {
    /*html*/
    this.shadowDOM.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${pesan}
        </div>`;
  }

  setModal(resep) {
    this.setModalTitle(resep.title);
    this.setModalBody(resep);
  }

  setModalTitle(title) {
    document.querySelector('#modalDetailResep .modal-title').innerHTML = title;
  }

  setModalBody(resep) {
    document.querySelector(
      '#modalDetailResep .modal-body'
    ).innerHTML = /*html*/ `
      <img
        src="https://spoonacular.com/recipeImages/${resep.id}-556x370.jpg"
        class="card-img-top"
      /><br /><br />
      Serving Time : ${resep.readyInMinutes}<br />
      Serving Table : ${resep.servings}<br />
      <div class="instructions"></div>
      `;
    this.setAnalyzedInstructions(resep.id);
  }

  async setAnalyzedInstructions(id) {
    let instructions = document.querySelector(
      '#modalDetailResep .modal-body .instructions'
    );

    const equipments = await DataResep.equipments(id);
    const ingredients = await DataResep.ingredients(id);
    const analyzed = await DataResep.info(id);
    instructions.innerHTML = 
    `<style>
    h4{
      color:var(--dark);
    }
    </style>`;
    instructions.innerHTML += equipments;
    instructions.innerHTML += `<br/><br/>
    <div className="h4" style="color:var(--dark);">Ingredients :`;
    instructions.innerHTML += ingredients;
    instructions.innerHTML += `<br/><br/> Instructions :</div>`;

    let i = 0;
    analyzed[0].steps.forEach((step) => {
      i++;
      instructions.innerHTML += /*html*/ `
        <div className="step" style="color:var(--dark); display:block;">
          ${i}. ${step.step}
        </div>
      `;
    });
    instructions.innerHTML += `<br/><br/>`;
  }

  saveData(resep) {
    sessionStorage.setItem(resep.id, JSON.stringify(resep));
    if (
      sessionStorage.getItem('liked_recipe') === null ||
      sessionStorage.getItem('liked_recipe') == 'null'
    ) {
      this._liked = [];
    } else {
      console.log(
        'INI SESSION LIKED ' + sessionStorage.getItem('liked_recipe')
      );
      this._liked = JSON.parse(sessionStorage.getItem('liked_recipe'));
    }
    console.log(this._liked);
    if (!this._liked.includes(resep.id)) {
      this._liked.push(resep.id);
      sessionStorage.setItem('liked_recipe', JSON.stringify(this._liked));
    }

    console.log('Data saved' + sessionStorage.getItem('liked_recipe'));
    console.log('Data saved' + sessionStorage.getItem(resep.id));
  }

  setLikeButton(tombol, elm) {
    console.log(elm);
    if (
      sessionStorage.getItem(elm.id) === 'null' ||
      sessionStorage.getItem(elm.id) == 'no' ||
      sessionStorage.getItem(elm.id) == null ||
      sessionStorage.getItem(elm.id) == 'null'
    ) {
      tombol.classList.add('heart');
      console.log('INI resep YES ' + elm.id + 'INI TOMBOL' + tombol);
      this.saveData(elm);
      console.log(elm.id + ' berhasil disimpan');
    } else {
      tombol.classList.remove('heart');
      sessionStorage.removeItem(elm.id);
      console.log('INI resep NO ' + elm.id + 'INI TOMBOL' + tombol);
    }
  }

  cekLike(tombol, resep) {
    if (
      sessionStorage.getItem(resep) == null ||
      sessionStorage.getItem(resep) == 'no' ||
      sessionStorage.getItem(resep) == null ||
      sessionStorage.getItem(resep) == 'null'
    ) {
      tombol.classList.remove('heart');
      console.log('BELUM DI LIKE');
    } else {
      tombol.classList.add('heart');
      console.log('SUDAH DI LIKE');
    }
  }

  renderLikedRecipesCounter() {
    document.querySelector('#numLiked').innerHTML = this._liked.length;
  }

  render() {
    this.shadowDOM.innerHTML = '';
    let i = 0;
    this._daftar.forEach((makan) => {
      if ((i + 1) % 3 == 0) {
        elemenDaftarResep.classList.add('row');
      }
      const elemenResep = document.createElement('re-sep');
      elemenResep.resep = makan;

      elemenResep.clickEvent = () => {
        this.setModal(elemenResep.resep);
        $('#modalDetailResep').modal('toggle');
        const tombolLike = document.querySelector('#like');
        this.cekLike(tombolLike, elemenResep.resep.id);
        tombolLike.addEventListener('click', () => {
          this.setLikeButton(tombolLike, makan);
          this.renderLikedRecipesCounter();
        });
      };
      this.shadowDOM.appendChild(elemenResep);

      i++;
    });
  }
}
customElements.define('daftar-resep', DaftarResep);
