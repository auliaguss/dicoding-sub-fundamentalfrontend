class SearchBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  set clickEvent(event) {
    console.log('Ini SEARCH');
    this._clickEvent = event;
    this.render();
  }
  set listRec(event) {
    this._listRec = event;
    this.render();
  }
  get value() {
    return document.querySelector('#search').value;
  }

  get jenis() {
    return document.getElementById('berdasarkan').value;
  }
  render() {
    /*html*/
    this.innerHTML = `
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <style>
        *, .btn{
          color:#fff3e0;
        }
        .box,
        .box select {
          float: left;
          display: flex;
          background: var(--dark);
          color: white;
          padding: 5px;
          outline: none;
        }
        .kolomCari,
        .seleksi {
          margin: 5% 0px 10% 0px;
        }
        .seleksi {
          float: right;
          padding: 5px;
          height: 50px;
        }
        .seleksi button {
          background-color: var(--coklat);
          outline: none;
        }
        .seleksi button:hover {
          background-color: var(--netral);
          border:1px solid var(--coklat);
          color:var(--coklat);
        }
        .seleksi button:nth-child(2) {
          background: none;
          border: 1px solid var(--coklat);
          color:var(--coklat);
        }
        .seleksi button:nth-child(2):hover {
          background:var(--coklat);
          color:var(--netral);
        }
        #search {
          outline: none;
          color: white;
          height: 40px;
          margin-left: 5px;
          background: none;
          padding: 0;
          border: none;
        }
        .box a {
          padding: auto;
          margin: auto 10px;
          cursor: pointer;
        }
        #likedList{
          color: var(--tema1);
          outline: none;
          background:none;
          border-color: var(--tema1);
        }
        #likedList:hover, #likedList:focus {
          background: var(--tema1);
          color:var(--netral);
        }
        .fa-search:hover{
          color: var(--tema1);
        }
        #numLiked{
          color:var(--tema1);
          text-shadow:1px 1px 1px white;
        }
      </style>

      <div class="row">
        <div class="col">
          <div class="kolomCari">
            <div class="box">
              <select id="berdasarkan">
                <option value="nama">Search By</option>
                <option value="nama">Recipe Name</option>
                <option value="daerah">Cuisine</option>
                <option value="intolerances">Intolerances</option>
                <option value="xBahan">Exclude Ingredients</option>
              </select>
              <input id="search" type="text" placeholder="Ketik Disini" />
              <a class="tombol" id="tombolCari">
                <i class="fa fa-search" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        <div class="col-md-6 ml-auto" style="padding-right:10px; margin-right:10px;">
          <div class="seleksi">
<!--            <button type="button" class="btn">
              Price ⇅
            </button>
            <button type="button" class="btn">
              Ingredients ⇅
            </button>
            <button type="button" class="btn">
              Serving Time ⇅
            </button>-->
            <button type="button" id="likedList" class="btn">
            Liked Recipes ♥ <span id="numLiked">0</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.querySelector('#numLiked').innerHTML =
      JSON.parse(sessionStorage.getItem('liked_recipe') || '[]').length || 0;
    document
      .querySelector('#likedList')
      .addEventListener('click', this._listRec);
    document
      .querySelector('#tombolCari')
      .addEventListener('click', this._clickEvent);
  }
}
customElements.define('search-bar', SearchBar);
