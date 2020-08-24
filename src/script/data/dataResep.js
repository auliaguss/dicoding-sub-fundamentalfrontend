const base = 'https://api.spoonacular.com/recipes/';
const apiKey = 'fc506f0ab5a04a73831d4c5730d27f90';
//"18b1a7e9f7a245b582a8ed552c28bb8f"
//"d59f92e332344083ad006a671c208571";
//"4dd413209c0e4318bd97c5789da1ce3f";

class DataResep {
  set perintah(value) {
    this._perintah = value;
  }
  get perintah() {
    return this._perintah;
  }
  set offs(value) {
    this._offs = value;
  }
  get offs() {
    return this._offs;
  }
  set qO(value) {
    this._qO = value;
  }
  get qO() {
    return this._qO;
  }
  static info(id) {
    return fetch(`${base}${id}/analyzedInstructions?apiKey=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson);
        } else {
          return Promise.reject('Maaf, Tidak Bisa Koneksi!');
        }
      });
  }
  static offset(val) {
    console.log('MASUKKK KE OFFSET VAL ' + val);
    this._offs = val * 9;
    console.log('MASUKKK KE OFFFFSSSSSS' + this._offs);
    if (this._offs < 0) {
      console.log('Sorry, already reach the beginning of the page');
    } else if (this._offs > 99) {
      console.log('Sorry, already reach the end of the page');
    } else {
      this._qO = `${this._perintah}&offset=${this._offs}`;
      return fetch(this._qO)
        .then(async (response) => {
          return await response.json();
        })
        .then((responseJson) => {
          if (responseJson.results) {
            console.log(responseJson.results);
            return Promise.resolve(responseJson.results);
          } else if (responseJson) {
            return Promise.resolve(responseJson);
          } else {
            return Promise.reject(`Sorry, ${keyword} Is Not Found! :(`);
          }
        });
    }
  }
  static random() {
    return fetch(`${base}random?apiKey=${apiKey}&number=2`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log('ini random ' + responseJson);
        if (responseJson.recipes) {
          return Promise.resolve(responseJson.recipes);
        } else {
          return Promise.reject(`Maaf, Koneksi Gagal!`);
        }
      });
  }
  static cari(keyword, jenis) {
    console.log('MASUKKK CARIII');
    switch(jenis) {
      case "nama":
        this._perintah = `${base}search?apiKey=${apiKey}&query=${keyword}&number=9`;
        break;
      case "xBahan":
        this._perintah = `${base}search?apiKey=${apiKey}&excludeIngredients=${keyword}&number=9`;
        break;
      case "daerah":
        this._perintah = `${base}search?apiKey=${apiKey}&cuisine=${keyword}&number=9`;
        break;
      case "intolerances":
        this._perintah = `${base}search?apiKey=${apiKey}&intolerances=${keyword}&number=9`;
        break;
    }
    console.log(this._perintah);

    return fetch(this._perintah)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.results) {
          return Promise.resolve(responseJson.results);
        } else if (responseJson) {
          return Promise.resolve(responseJson);
        } else {
          console.log(jenis);
          return Promise.reject(`Sorry, ${keyword} Is Not Found! :(`);
        }
      });
  }

  static async equipments(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/equipmentWidget?defaultCss=true`;
    try {
      let res = await fetch(url);
      return res.text();
    } catch (error) {
      console.log(error);
    }
  }

  static async ingredients(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget?defaultCss=true`;
    try {
      let res = await fetch(url);
      return res.text();
    } catch (error) {
      console.log(error);
    }
  }
}
export default DataResep;
