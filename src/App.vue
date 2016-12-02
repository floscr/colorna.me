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
  import colorNames from './data/colors'
  import _ from 'lodash'

  export default {

    data: () => ({
      color: '',
    }),

    computed: {
      colorName () {
        let color = this.color.replace('#', '')
        if (color.length === 3) {
          color = color + color
        }
        return colorNames[color]
      },
    },

  }
</script>


