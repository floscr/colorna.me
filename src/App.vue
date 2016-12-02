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
</style>

<template>
  <main class="container is-fluid">
    <div class="control">
      {{ colorName }}
      <input
      v-model="color"
      class="input is-large is-huge"
      type="text"
      placeholder="Your Color (ex.: #FFF)">
    </div>
  </main>
</template>

<script>
  import colorLib from './components/Color/colorLib'

  export default {

    mounted () {
      colorLib.init()
    },

    data: () => ({
      color: '',
    }),

    computed: {
      colorName () {
        if (this.color !== '' && this.color.length >= 3) {
          return colorLib.name(this.color)[1]
        }
      },
    },

  }
</script>


