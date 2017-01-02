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


  .color__name {
  }

  .color__input {
    padding: 0.6em 0.55em;
    min-width: 500px;

    font-size: 1.6em;
    font-family: 'Menlo', monospace;
    font-weight: 100;

    border: 1px solid $grey-50;
    border-radius: 5px;

    &__container {
      position: relative;
    }

    &__wheel {
      $radius: 2.2em;
      height: $radius;
      width: $radius;

      position: absolute;
      right: 0.8em;
      top: 50%;
      transform:  translateY(-50%);

      background-color: white;
      border: 1px solid $grey-50;
      border-radius: 100%;
    }

  }

</style>

<template>
  <div class="container">

    <main class="app">

      <div class="color__name">{{ colorName }}</div>

      <!-- <div class="control"> -->
        <!--   <chrome @change&#45;color="onChangeColor" v&#45;model="colorPickerFallbackColor"></chrome> -->
        <!-- </div> -->

      <div class="color__input__container">
        </div>
        <input
        v-model="color"
        class="color__input"
        type="text"
        placeholder="Your Color (ex.: #FFF)">
      </div>

      <!-- <div class="control is&#45;grouped"> -->
        <!--   <button @click="lighten" class="button control">Lighten</button> -->
        <!--   <button @click="darken" class="button control">Darken</button> -->
        <!-- </div> -->

    </main>

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


