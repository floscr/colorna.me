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

      <div class="color-display">
        <div class="color-display__name">{{ colorName }}</div>
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

      colorPickerFallbackColor () {
        return this.color || '#FFF'
      },

      colorName () {
        if (!this.color) return

        if (this.color.length >= 3) {
          return colorLib.name(this.color)[1]
        }

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


