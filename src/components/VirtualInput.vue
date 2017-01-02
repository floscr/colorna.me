<style lang=scss scoped>

@import '../styles/variables.scss';

.virtual-input {
  font-size: 1em;

  overflow: hidden;
  border: 1px solid $grey-50;
  border-radius: 5px;
}

.input {
  padding: 0.6em 0.55em;
  min-width: 500px;

  font-size: 1.6em;
  font-family: 'Menlo', monospace;
  font-weight: 100;

  height: 30px;


  outline: none;
}

</style>

<template>
  <div class="virtual-input">
    <div class="input" contenteditable="true">
    </div>
  </div>
</template>

<script>
export default {

  data: () => ({
    value: '',
  }),

  props: {
    placeholder: String,
  },

  mounted () {
    // Get the input element from the children
    this.inputEl = Array.from(this.$el.children)[0]

    this.addEventListeners()
  },

  methods: {

    changeValue (event) {
      let text = event.target.innerText

      if (text[0] === '#') {
        text = text.substring(1);
        event.target.innerHTML = '<span color="grey">#</span>${text}'
      }

      this.value = text
    },

    addEventListeners () {
      this.inputEl.addEventListener('input', event => this.changeValue(event))
    },

  },

}
</script>
