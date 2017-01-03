<style lang=scss>
  @import './styles/base.scss';
  @import './styles/variables.scss';

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: $grey-10;
  }

  .app {
    max-width: 400px;
    margin: 1em;
    width: 100%;

    background-color: white;

    border-radius: 5px;
    border: 1px solid $color-border;
    box-shadow: 0 3px 10px 2px rgba(desaturate(darken($color-border, 20%), 40%), 0.2);

    > * + * {
      border-top: inherit;
    }
  }

  .virtual-input__wrapper {
    position: relative;
    border-color: inherit
  }

  .color-display {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    &__name {
      font-family: 'Menlo', monospace;
    }
  }

</style>

<template>
  <div class="container">

    <main class="app">

      <div class="color-display" :style="{ backgroundColor: validHexColor }">
        <div class="color-display__name" v-if="validHexColor">{{ colorName }}</div>
        <div class="color-display__name--is-emtpy" v-else-if="color === ''">
          Please insert a color
        </div>
        <div class="color-display__name--is-invalid" v-else>
          Not a valid color: '{{ color }}'
        </div>
      </div>

      <div class="virtual-input__wrapper">
        <virtual-input
          placeholder="Paste your color"
          v-model="color"
          v-on:input="updateColorFromInput"
          >
        </virtual-input>
        <!-- <div class="control is&#45;grouped"> -->
        <!--   <button @click="lighten" class="button control">Lighten</button> -->
        <!--   <button @click="darken" class="button control">Darken</button> -->
        <!-- </div> -->
      </div>


    </main>

  </div>
</template>

<script>
  import colorLib from './components/Color/colorLib'
  import lightenDarkenColorLib from './components/Color/lightenDarkenColorLib'

  import { isHex } from './components/Color/colorValidation.js'

  import VirtualInput from './components/VirtualInput.vue'
  import { Chrome } from 'vue-color'

  export default {

    mounted () {
      colorLib.init()
    },

    data: () => ({
      // color: undefined,
      color: '#A7C265',
      amount: 10,
    }),

    computed: {

      /**
       * Return a hex color string if the input color is either a
       * - Valid hex number
       *
       * Convert valid non hex color formats to hex
       *
       * @return {string} Converted Hex Color
       */
      validHexColor () {
        if (isHex(this.color)) {
          return this.color
        }
      },

      colorName () {
        if (!this.validHexColor) return

        console.log(this.color)
        console.log(colorLib.name(this.validHexColor)[1])

        return colorLib.name(this.validHexColor)[1]
      },
    },

    methods: {

      updateColorFromInput (color) {
        console.log(color)
      },

      darken () {
        this.color = lightenDarkenColorLib(this.color, -10)
      },

      lighten () {
        this.color = lightenDarkenColorLib(this.color, 10)
      },

      // onChange method called when the event 'change-color' is emitted
      onChangeColor (val) {
        this.color = val.hex
      },

    },

    components: {
      VirtualInput,
      Chrome,
    },

  }
</script>


