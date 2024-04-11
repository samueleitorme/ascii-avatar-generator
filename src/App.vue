<script setup>
import { ref } from "vue";
import ColorButton from "./components/ColorButton.vue";
import Demos from "./components/Demos.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import { useHtmlToImage } from "./composables/useHtmlToImage";

// REFS
const ascii = ref("=)");
const color = ref("#b2e8d2");
const size = ref(7);
const rotation = ref(90);
const transformX = ref(0);
const transformY = ref(0);

// Funciones
const add = () => {
  size.value++;
};
const subtract = () => {
  size.value--;
};

const rotateClockWise = () => {
  rotation.value += 90 % 360;
};
const rotateAntiClockWise = () => {
  rotation.value -= 90 % 360;
};

const setColor = (colorHexCode) => {
  color.value = colorHexCode;
};

const setAsciiFace = (face) => {
  console.log("Nueva cabeza: ", face);
  ascii.value = face;
};

const reset = () => {
  ascii.value = "=)";
  color.value = "#b2e8d2";
  size.value = 5;
  rotation.value = 90;
  transformX.value = 0;
  transformY.value = 0;
};

// Descargar Imagen
const avatar = ref(null);
const { generarImagen } = useHtmlToImage();

const descargarImagen = () => {
  console.log("Generando imagen...");
  generarImagen(avatar.value)
    .then((imagen) => {
      const enlace = document.createElement("a");
      enlace.href = imagen;
      enlace.download = "avatar.png";
      enlace.click();
    })
    .catch((error) => console.log(error));
};
</script>

<template>
  <Header />
  <main class="container">
    <div id="avatar_page" class="container grid">
      <!-- AVATAR -->
      <article>
        <header>
          <hgroup>
            <h2>Avatar</h2>
            <p>Vista previa</p>
          </hgroup>
        </header>
        <div class="avatar__father" ref="avatar">
          <div class="avatar" :style="`background-color: ${color}`">
            <span
              :style="`font-size: ${size}rem; rotate: ${rotation}deg; transform:translate(${transformX}px, ${transformY}px);`"
              style="transition: all 150ms ease"
              >{{ ascii }}</span
            >
          </div>
        </div>
        <footer>
          <div class="grid">
            <button class="secondary outline" role="button" @click="reset">
              Reiniciar
              <i class="ti ti-restore"></i>
            </button>
            <button role="button" @click="descargarImagen()">
              Descargar
              <i class="ti ti-download"></i>
            </button>
          </div>
        </footer>
      </article>
      <!-- CONTROLES -->
      <article>
        <header>
          <hgroup>
            <h2>Personalización </h2>
            <p>Hazlo a tu estilo</p>
          </hgroup>
        </header>

        <div class="grid">
          <!-- Izquierda -->
          <div>
            <!-- ASCII -->
            <label
              ><i class="ti ti-lego"></i> Emoji ascii
              <input
                type="text"
                maxlength="3"
                placeholder="u.u, =), xD..."
                v-model="ascii"
              />
            </label>
            <!-- BOTONES-->
            <div>
              <div class="grid" style="margin-bottom: 0.75rem">
                <!-- FONT SIZE -->
                <button @click="add" :disabled="size >= 10">
                  <i class="ti ti-plus"></i>
                </button>
                <button @click="subtract" :disabled="size <= 5">
                  <i class="ti ti-minus"></i>
                </button>
              </div>
              <div class="grid">
                <!-- ROTATION -->
                <button
                  @click="rotateAntiClockWise"
                  class="secondary"
                  aria-label="rotar sentido antihorario"
                  :disabled="rotation <= 0"
                >
                  <i class="ti ti-rotate-2"></i>
                </button>
                <button
                  @click="rotateClockWise"
                  class="secondary"
                  aria-label="rotar sentido horario"
                  :disabled="rotation >= 360"
                >
                  <i class="ti ti-rotate-clockwise-2"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- Derecha -->
          <div>
            <!-- COLOR -->
            <div>
              <div>
                <p><i class="ti ti-palette"></i> Colores</p>
                <div class="grid div_colores">
                  <ColorButton
                    color="fcc602"
                    @click="setColor('#fcc602')"
                    data-tooltip="Amarillo Oro"
                  />
                  <ColorButton
                    color="fa944e"
                    @click="setColor('#fa944e')"
                    data-tooltip="Naranja"
                  />
                  <ColorButton
                    color="ff6662"
                    @click="setColor('#ff6662')"
                    data-tooltip="Rojo"
                  />
                  <ColorButton
                    color="ff90ee"
                    @click="setColor('#ff90ee')"
                    data-tooltip="Rosa"
                  />
                </div>
                <div class="grid div_colores">
                  <ColorButton
                    color="4ca9fd"
                    @click="setColor('#4ca9fd')"
                    data-tooltip="Azul"
                  />
                  <ColorButton
                    color="8ff2d7"
                    @click="setColor('#8ff2d7')"
                    data-tooltip="Verde azulado"
                  />
                  <ColorButton
                    color="9be43a"
                    @click="setColor('#9be43a')"
                    data-tooltip="Verde"
                  />
                  <ColorButton
                    color="ad8fff"
                    @click="setColor('#ad8fff')"
                    data-tooltip="Morado"
                  />
                </div>
              </div>
              <label @click="mostarColor">
                <i class="ti ti-color-picker"></i>
                Color personalizado 
                <input type="color" v-model="color" />
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div class="grid">
          <div>
            <label
              ><i class="ti ti-axis-x"></i>
              <span class="mono">X: {{ transformX }}</span>
              <input type="range" max="50" min="-50" v-model="transformX" />
            </label>
            <label>
              <i class="ti ti-axis-y"></i>
              <span class="mono">Y: {{ transformY }}</span>
              <input type="range" max="50" min="-50" v-model="transformY" />
            </label>
          </div>
        </div>
      </article>
    </div>
    <article>
      <header>
        <hgroup>
          <h2>¿Poco inspirado?</h2>
          <p>Haz clic para asignar tu nueva cara</p>
        </hgroup>
      </header>
      <Demos @setAsciiFace="setAsciiFace" />
    </article>
  </main>
  <Footer />
</template>

<style scoped>
div.avatar__father {
  /* display: grid;
  place-items: center; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
div.avatar {
  border-radius: 99rem;
  border: 0.5rem solid #1e1e1e;
  display: grid;
  height: 20rem;
  width: 20rem;
  place-items: center;
  user-select: none;

  transition-duration: 300ms;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: 100ms;

  span {
    color: black;
    display: inline-block;
    font-family: "Consolas";
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
  }
}

@media (width <= 768px) {
  div.div_colores {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
span.mono {
  font-family: "Consolas", monospace;
  font-weight: normal;
  margin-left: 0.5rem;
}
</style>
