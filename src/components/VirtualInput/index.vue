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
    pointer-events: none;
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

    // When the color is valid show the 'copy' message in the input field
    isValidColor: {
      type: Boolean,
      default: false,
    },

    // If the field should be focused on mount
    autofocus: {
      type: Boolean,
      default: false,
    },

    // Color props
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
    // Get the input element from the components dom children
    this.inputEl = Array.from(this.$el.children)[0]

    // Insert the passed value property and Highlight it
    if (this.value && this.value !== '') {
      this.innerHTML = this.highlightText(this.value)
    }

    this.addEventListeners()

    // Autofocus on the input
    if (this.autofocus) {
      this.inputEl.focus()
    }
  },

  watch: {
    /**
     * When the color value gets changed from outside update the input value
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
     * Add keyboard eventlisteners to to the component
     */
    addEventListeners () {
      this.inputEl.addEventListener('keydown', event => this.changeValue(event))
      this.inputEl.addEventListener('keyup', event => this.changeValue(event))
    },

    /**
     * Highlight a string by wrapping specific characters in span tags
     * Highlighted characters: #,()
     *
     * @param {string} text Input text
     * @return {string} HTML markup string
     */
    highlightText (text) {
      // Strip newline characters in case they get inserted via clipboard paste
      text = text.replace(/(\r\n|\n|\r)/gm, '');

      // Wrap the # symbol at the beginning of the text
      text = text.replace(
        /^#/ig,
        `<span style="color: ${this.colors.highlight}">#</span>`
      )

      // Highlight rgb/hsl with optional a for opacity
      text = text.replace(
        /^(rgb|hsl)(a)?/ig,
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
     * Change and highlight the input value
     */
    changeValue (event) {

      // Disable enter key
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

      // Emit the new color value to the parent component
      this.$emit('input', event.target.innerText)
    },

    /**
     * Emit enterpress event to the parent,
     * which will take care of copying the value to the clipboard.
     */
    copyNameToClipboard () {
      this.$emit('enterpress')
    }

  },

}
</script>
