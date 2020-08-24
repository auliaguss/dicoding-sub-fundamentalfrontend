class Pagination extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback(){
      this.render();
  }
  set prev(event) {
      this._prev= event;
      console.log("PAGINATION PREV");
      this.render();
  }
  set next(event) {
      this._next = event;
      console.log("PAGINATION NEXT");
      this.render();
  }
  render(){
    /*html*/
      this.shadowDOM.innerHTML=`
      
      <style>
        a{
          cursor:pointer;
          width:100px;
          color:var(--coklat);
          border:1px solid var(--coklat);
          transition:.8s;
          font-size:2em;
          padding: 0px 5px 0px 5px;
        }
        a:hover{
          background:var(--coklat);
          color:var(--netral);
        }
      </style>
      <center>
      <a id="prev">&laquo;</a>
      <a id="next">&raquo;</a>
      </center>
      `;
      this.shadowDOM.querySelector("#prev").addEventListener("click", this._prev);
      this.shadowDOM.querySelector("#next").addEventListener("click", this._next);
  }
}
customElements.define("pagi-nation", Pagination);