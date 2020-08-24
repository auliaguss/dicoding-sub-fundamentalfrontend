class Resep extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set clickEvent(event) {
    this._clickEvent = event;
  }

  set resep(makan) {
    this._resep = makan;
    this.render();
  }

  get resep() {
    return this._resep;
  }

  render() {
    /*html*/
    this.innerHTML = `
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <style>
        .kotak{
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          transform-style: preserve-3d;
        }
        .dalamKotak{
          position: relative;
          height: 300px;
          width:330px;
          margin: 10px 0px;
          perspective:  1000px;
          transform-style: preserve-3d;
          overflow: hidden;
          box-shadow: 0 0 40px var(--dark);
        }
        .dalamKotak .kotakFoto{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: top;
          transform-style: preserve-3d;
          transition: .5s;
          transition-delay: .2s;
        }
        .dalamKotak:hover .kotakFoto{
          transform: rotateX(-90deg);
          opacity: 0;
          transition-delay: 0s;
        }
        .kotakFoto .foto{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .kotakIsi{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
          transform-origin: bottom;
          transform-style: preserve-3d;
          transition: .5s;
          transform: rotateX(90deg);
          opacity: 0;
          color: var(--dark);
        }
        .dalamKotak:hover .kotakIsi{
          transform: rotateX(0deg);
          opacity: 1;
          transition-delay: .2s;
        }
        .kotakIsi div div{
          padding:10px;
        }
        h4{
          padding:10%;
          background: var(--dark);
          color: var(--netral);
        }
        .btn{
          background: var(--coklat);
          color: var(--netral);
        }
        .btn:hover{
          box-shadow:0px 0px 10px var(--dark);
          background: var(--coklat);
        }
      </style>

      <div class="col kotak">
        <div class="dalamKotak">
          <div class="kotakFoto">
            <img class="foto" src="https://spoonacular.com/recipeImages/${this._resep.id}-556x370.jpg" />
          </div>
          <div class="kotakIsi">
          <div>
          <center>
              <h4>${this._resep.title}</h4>
              <div>
              <p class="desc">
              Ready In : ${this._resep.readyInMinutes} Minutes ⌛<br>
              Servings Table : ${this._resep.servings} 🍴</p>
              <a
                type="button"
                class="btn toggle-modal btnReadMore"
                style="color:var(--netral);"
                data-toggle="modal"
                data-target="#exampleModalScrollable" 
              >
                Read More
            </a>
            </center>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.querySelector('.toggle-modal').addEventListener(
      'click',
      this._clickEvent
    );
  }
}
customElements.define('re-sep', Resep);
