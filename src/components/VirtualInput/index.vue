<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .virtual-input {
    font-size: 1em;
    overflow: hidden;
  }

  .input {
    width: 100%;
    padding: 0.6em 0.55em;

    font-size: 1.6em;
    font-family: 'Menlo', monospace;
    font-weight: 100;

    outline: none;
  }

  .info {
    position: absolute;
    bottom: 0.6em;
    right: 0.5em;

    font-family: $font-sans-serif;
    opacity: 0.35;
    font-size: 0.7em;
    font-weight: 500;
  }

  // Show info only on input focus
  .info { display: none; }
  .input:focus + .info { display: block; }

  [contenteditable=true]:empty:before{
    content: attr(placeholder);
    color: #c6cbce;
    letter-spacing: -0.01em;
    display: block; /* For Firefox */
  }
</style>

<template>
  <div class="virtual-input">
    <div
      class="input"
      :placeholder="placeholder"
      v-html="innerHTML"
      @keyup.enter="copyNameToClipboard"
      contenteditable="true">
    </div>
    <div class="info" v-if="isValidColor">Press enter to copy name</div>
  </div>
</template>

<script>

import { saveSelection, restoreSelection } from './utils/cursorHelper.js'

export default {
  props: {
    value: undefined,

    // Placeholder when the input is empty
    placeholder: {
      type: String,
      default: 'Test placeholder',
    },

    isValidColor: {
      type: Boolean,
      default: false,
    },

    // If the field should be focused on mount
    autofocus: {
      type: Boolean,
      default: false,
    },

    colors: {
      type: Object,
      default: _ => ({
        highlight: '#c7cacc',
      }),
    },
  },

  data: () => ({
    innerHTML: '',
  }),

  mounted () {
    // Get the input element from the components children
    this.inputEl = Array.from(this.$el.children)[0]

    // Update the innerHTML to passed value when its not empty
    if (this.value && this.value !== '') {
      this.innerHTML = this.highlightText(this.value)
    }

    this.addEventListeners()

    // Autofocus when the prop is set to true
    if (this.autofocus) {
      this.inputEl.focus()
    }
  },

  watch: {
    /**
     * Watch if the value gets changed from outside
     * Exit when typing into the field
     *
     * @param {string} newValue New value from vue
     */
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
      this.inputEl.addEventListener('keydown', event => this.changeValue(event))
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
      // text = text.replace(/(<([^>]+)>)/ig, '')

      // Strip newline characters in case they get inserted via clipboard paste
      text = text.replace(/(\r\n|\n|\r)/gm, '');

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

    /**
     * Change and highlight the innerHTML
     */
    changeValue (event) {

      // Disable enter
      if (event.which === 13) event.preventDefault()

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

    copyNameToClipboard () {
      this.$emit('enterpress')
    }

  },

}
</script>
