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
  overflow: hidden;

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

import { saveSelection, restoreSelection } from './cursorUtil.js'

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

      const savedSelection = saveSelection(this.inputEl)

      // Remove all html tags
      this.inputEl.innerHTML = this.inputEl.innerHTML.replace(/(<([^>]+)>)/ig, '')

      // Add all html tags again
      this.inputEl.innerHTML = this.inputEl.innerHTML.replace(/^#/ig, '<span style="color: red">#</span>')

      restoreSelection(this.inputEl, savedSelection)

      this.value = text
    },

    addEventListeners () {
      this.inputEl.addEventListener('input', event => this.changeValue(event))
    },

  },

}
</script>
