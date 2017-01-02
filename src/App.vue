<style lang=scss>
  @import './styles/base.scss';
  @import './styles/variables.scss';

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    // Default background color
    background-color: $grey-10;
  }
</style>

<template>
  <div class="container" :style="{ backgroundColor: color }">
    <div class="control">{{ colorName }}</div>

    <!-- <div class="control"> -->
    <!--   <chrome @change&#45;color="onChangeColor" v&#45;model="colorPickerFallbackColor"></chrome> -->
    <!-- </div> -->

    <input
    v-model="color"
    class="input is-large control"
    type="text"
    placeholder="Your Color (ex.: #FFF)">

    <div class="control is-grouped">
      <button @click="lighten" class="button control">Lighten</button>
      <button @click="darken" class="button control">Darken</button>
    </div>
  </div>
</template>

<script>
  import colorLib from './components/Color/colorLib'
  import lightenDarkenColorLib from './components/Color/lightenDarkenColorLib'

  import { Chrome } from 'vue-color'

  export default {

    mounted () {
      colorLib.init()
    },

    data: () => ({
      color: undefined,
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
      Chrome,
    },

  }
</script>


