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
  </div>
</template>

<script>
  import ColorNamePicker from './components/ColorNamePicker'
  import GithubCorner from 'vue-github-corners'

  export default {
    components: {
      ColorNamePicker,
      GithubCorner,
    },
  }
</script>


