import "regenerator-runtime";
import "./css/style.css";
import "./script/view/utama.js";
import utama from "./script/view/utama.js";
import logo from "./img/logo.png";
import wave from "./img/wave1.png";
import wavee from "./img/wave2.png";
import whats from "./img/whatsapp-icon.png";
import fb from "./img/facebook-icon.png";
import ig from "./img/instagram-icon.png";
import linkedin from "./img/linkedin-icon.png";
import lkd from "./img/lkd.png";
import sb from "./img/sb.png";
import "../smooth-scroll.js"

const initImage = () => {
  let logoKoki = document.getElementById("logoKoki");
  let ombak = document.getElementById("ombak");
  let ombak2= document.getElementById("ombak2");
  let facebook=document.getElementById("facebook");
  let wap=document.getElementById("wap");
  let insta=document.getElementById("insta");
  let linke=document.getElementById("linke");
  let lf=document.getElementById('logoFoot');
  let lP=document.getElementById('lPic');
  let sP=document.getElementById('sPic');

  sP.src=sb;
  lP.src=lkd;
  facebook.src=fb;
  insta.src=ig;
  linke.src=linkedin;
  logoKoki.src = logo;
  lf.src = logo;
  ombak.src = wave;
  ombak2.src=wavee;
  wap.src=whats
};

initImage();

document.addEventListener("DOMContentLoaded", utama);
