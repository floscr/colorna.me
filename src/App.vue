<style>
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .control {
    width: 500px;
    max-width: 100%;
  }

  .input.is-huge {
    height: 40px;
  }

  main {
    display: block;
    padding: 2em;
    background-color: white;
  }
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

<template>
  <div class="wrap" :style="{ backgroundColor: color }">
    <main>
      <div class="control">
        <div class="control">{{ colorName }}</div>
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
    </main>
  </div>
</template>

<script>
  import colorLib from './components/Color/colorLib'
  import lightenDarkenColorLib from './components/Color/lightenDarkenColorLib'

  export default {

    mounted () {
      colorLib.init()
    },

    data: () => ({
      color: '',
      amount: 10,
    }),

    computed: {
      safeColor () {

      },

      colorName () {
        if (this.color !== '' && this.color.length >= 3) {
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
    },

  }
</script>


