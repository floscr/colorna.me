<style lang=scss>
  @import './styles/base.scss';

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #EFF3F3;
  }

  .contact-info {
    position: absolute;
    bottom: 1em;
    right: 1em;
    font-family: $font-sans-serif;
    font-size: 0.7em;
    color: $color-info-text;
    a {
      color: $color-info-text;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>

<template>
  <div class="container">
    <color-name-picker></color-name-picker>
    <github-corner
      cornerColor="#c2cbce"
      gitColor="#EFF3F3"
      :size="60"
      url="https://github.com/floscr/colorna.me">
    </github-corner>
    <div class="contact-info">
      Built by <a id="feedback" href="http://florianschroedl.com">Florian Schrödl</a>. Send me some <a href="#" @click="openDoorbell">Feedback</a>
    </div>
  </div>
</template>

<script>
  import ColorNamePicker from './components/ColorNamePicker'
  import GithubCorner from 'vue-github-corners'

  export default {

    methods: {
      /**
       * Open doorbell feedback modal
       */
      openDoorbell () {
        window.doorbell.show()
      },
    },

    components: {
      ColorNamePicker,
      GithubCorner,
    },
  }
</script>


