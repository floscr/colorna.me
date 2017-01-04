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
  </div>
</template>

<script>
  import ColorNamePicker from './components/ColorNamePicker'

  export default {

    components: {
      ColorNamePicker,
    },

  }
</script>


