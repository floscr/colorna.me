<style lang="scss" scoped>

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
      v-html="innerHTML"
      contenteditable="true">
    </div>
  </div>
</template>

<script>

import { saveSelection, restoreSelection } from './cursorUtil.js'

export default {
  props: {
    value: undefined,

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
    innerHTML: '',
  }),

  mounted () {
    // Get the input element from the components children
    this.inputEl = Array.from(this.$el.children)[0]

    this.addEventListeners()

    // Autofocus when the prop is set to true
    if (this.autofocus) {
      this.inputEl.focus()
    }
  },

  watch: {
    value (newValue) {
      if (newValue === this.innerText) return

      this.inputEl.innerHTML = this.highlightText(newValue)
    },
  },

  methods: {

    /**
     * Add eventlisteners to to the component
     */
    addEventListeners () {
      this.inputEl.addEventListener('keyup', event => this.changeValue(event))
    },

    /**
     * Highlight a string by wrapping characters in span tags
     *
     * @param {string} text Input text
     * @return {string} HTML markup string
     */
    highlightText (text) {
      // Remove all previous html tags
      text = text.replace(/(<([^>]+)>)/ig, '')

      // Wrap the # symbol at the beginning of the text
      text = text.replace(
        /^#/ig,
        `<span style="color: ${this.colors.highlight}">#</span>`
      )

      // Highlight rgb with optional a
      text = text.replace(
        /^(rgb)(a)?/ig,
        `<span style="color: ${this.colors.highlight}">$1$2</span>`
      )

      // Highlight brackets and colons
      text = text.replace(
        /([,()])/ig,
        `<span style="color: ${this.colors.highlight}">$1</span>`
      )

      return text
    },

    changeValue (event) {
      this.textValue = event.target.innerText

      let text = event.target.innerText

      // Save the current cursor position
      const savedSelection = saveSelection(this.inputEl)

      // Highlight and adapt the current inner html text
      this.innerHTML = this.highlightText(text)

      /**
       * Restore the cursor position.
       *
       * Contenteditable would reset the cursor position
       * when the innerHTML gets changed programaticaly.
       *
       * Call this on the next VUE tick, after the content has changed.
       */
      this.$nextTick(() => {
        restoreSelection(this.inputEl, savedSelection)
      })

      // Emit text value throguh the input event
      this.$emit('input', event.target.innerText)
    },


  },

}
</script>
