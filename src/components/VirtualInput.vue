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


  outline: none;

}

[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color: #CDDAE2;
  display: block; /* For Firefox */
}

</style>

<template>
  <div class="virtual-input">
    <div
      class="input"
      :placeholder="placeholder"
      contenteditable="true">
    </div>
  </div>
</template>

<script>

import { saveSelection, restoreSelection } from './cursorUtil.js'

export default {
  props: {
    // Placeholder when the input is empty
    placeholder: {
      type: String,
      default: 'Test placeholder',
    },

    // If the field should be focused on mount
    autofocus: {
      type: Boolean,
      default: true,
    },

    colors: {
      type: Object,
      default: _ => ({
        placeholder: '#CDDAE2',
        highlight: '#CDDAE2',
      }),
    },
  },

  data: () => ({
    value: '',
  }),

  mounted () {
    // Get the input element from the children
    this.inputEl = Array.from(this.$el.children)[0]

    this.addEventListeners()

    if (this.autofocus) {
      this.inputEl.focus()
    }
  },

  methods: {

    changeValue (event) {
      let text = event.target.innerText

      // Save the current cursor position
      const savedSelection = saveSelection(this.inputEl)

      let html = this.inputEl.innerHTML

      // Remove all previous html tags
      html = html.replace(/(<([^>]+)>)/ig, '')

      // Wrap the # symbol at the beginning of the text
      html = html.replace(
        /^#/ig,
        `<span style="color: ${this.colors.highlight}">#</span>`
      )

      // Highlight rgb with optional a
      html = html.replace(
        /^(rgb)(a)?/ig,
        `<span style="color: ${this.colors.highlight}">$1$2</span>`
      )

      // Highlight brackets and colons
      html = html.replace(
        /([,()])/ig,
        `<span style="color: ${this.colors.highlight}">$1</span>`
      )

      this.inputEl.innerHTML = html

      // Restore the cursor position
      // contenteditable resets the cursor position by default
      // when the content gets changed programaticaly
      restoreSelection(this.inputEl, savedSelection)

      this.value = text
    },

    addEventListeners () {
      this.inputEl.addEventListener('input', event => this.changeValue(event))
    },

  },

}
</script>
