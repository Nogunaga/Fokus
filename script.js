const html = document.querySelector("html");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonLargo = document.querySelector(".app__card-button--largo");

const banner = document.querySelector(".app__image");

const titulo = document.querySelector(".app__title");

const botones = document.querySelectorAll(".app__card-button");

const botonIniciarPausar = document.querySelector("#start-pause");
const inputMusicaEnfoque = document.querySelector("#alternar-musica");
const textoIniciarPausar = document.querySelector("#start-pause span");
const iconoIniciarPausar = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tiempoEnPantalla = document.querySelector("#timer");

const audioPlay = new Audio(" ./assets/img/sonidos/play.wav");
const audioPausa = new Audio("./assets/img/sonidos/pause.mp3 ");
const audioTiempoFinalizado = new Audio("./assets/img/sonidos/beep.mp3");

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

const iconoBoton = botonIniciarPausar.querySelector("img");

const inputMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./assets/img/sonidos/luna-rise-part-one.mp3");
musica.loop = true;
inputMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Remueve la clase "active" de todos los botones
    botones.forEach((b) => b.classList.remove("active"));

    // Añade la clase "active" solo al botón que fue clicado
    boton.classList.add("active");
  });
});

botonCorto.addEventListener("click", () => {
  tiempoTranscurridoEnSegundos = 300;
  cambiaContexto("descanso-corto");
});

botonEnfoque.addEventListener("click", () => {
  tiempoTranscurridoEnSegundos = 1500;
  cambiaContexto("enfoque");
});

botonLargo.addEventListener("click", () => {
  tiempoTranscurridoEnSegundos = 900;
  cambiaContexto("descanso-largo");
});

function cambiaContexto(contexto) {
  // Oculta el contexto actual
  mostrarTiempo();

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./assets/img/${contexto}.png`);

  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `
        Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>
        `;
      break;
    case "descanso-corto":
      titulo.innerHTML = `
        ¿Qué tal un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
        `;
      break;
    case "descanso-largo":
      titulo.innerHTML = `
        !Ya hiciste mucho¡.<strong class="app__title-strong"> Descansa un rato!.</strong>
        `;
      break;
    default:
      break;
  }
}

const cuentaRegresiva = () => {
  if (tiempoTranscurridoEnSegundos <= 0) {
    audioTiempoFinalizado.play();
    alert("¡Tiempo finalizado!");
    reiniciar();
    return;
  }
  textoIniciarPausar.textContent = "Pausar";
  iconoBoton.src = "./assets/img/pause.png";
  tiempoTranscurridoEnSegundos -= 1;
  mostrarTiempo();
};

botonIniciarPausar.addEventListener("click", iniciarOpausar);

function iniciarOpausar() {
  if (idIntervalo) {
    audioPausa.play();
    reiniciar();
    return;
  }
  audioPlay.play();
  idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
  clearInterval(idIntervalo);
  idIntervalo = null;
  textoIniciarPausar.textContent = "Comenzar";
  iconoBoton.src = "./assets/img/play_arrow.png";
}

function mostrarTiempo() {
  const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
  const tiempoFormateado = tiempo.toLocaleTimeString("es-ar", {
    minute: "2-digit",
    second: "2-digit",
  });
  tiempoEnPantalla.innerHTML = ` ${tiempoFormateado}`;
}
mostrarTiempo();
