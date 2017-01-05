<style lang=scss>
  @import '../../styles/variables.scss';

  .app {
    margin: 1em;
    width: 100%;
    max-width: 400px;

    border-radius: 5px;
    box-shadow: 0 3px 10px 2px rgba(desaturate(darken($color-border, 20%), 40%), 0.2);

    background-color: white;
  }

  .virtual-input__wrapper {
    position: relative;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid $color-border;
    border-top: none;
  }

  .color-display {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: inset 0 0 0 1px rgba(black, 0.15);
    overflow: hidden;
  }

  .color-display__name {
    font-family: $font-monospace;
  }

  .color-display__name__container--is-valid {
    cursor: pointer;
  }

  .color-display__name__container--is-valid:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    box-shadow: inset 0 0 10em 0 rgba(black, 0.4);
  }

  .color-display__name__container--is-valid:after {
    content: 'Click to copy name to clipboard!';

    position: absolute;
    bottom: 0.8em;
    left: 0;
    right: 0;

    font-family: $font-sans-serif;
    font-weight: bold;
    letter-spacing: 0.03em;
    font-size: 0.8em;
    text-align: center;
    color: white;
    text-shadow: 0 1px 4px rgba(black, 0.3);

    opacity: 0;
    transform: translateY(2em);
    transition: all 0.28s ease-in-out;
  }

  .color-display__name__container--is-valid:hover:before, {
    opacity: 1;
  }

  .color-display__name__container--is-valid:hover:after {
    opacity: 1;
    transform: none;
  }

  .color-display__message {
    text-align: center;
    font-weight: 100;
    color: $color-message-text;
    line-height: 1.5;
    // Text below the message
    &__hint {
      opacity: 0.8;
    }
  }

  .color-display__btn {
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0.8em;
    right: 0.8em;

    cursor: pointer;
    overflow: hidden;

    border-radius: 100%;
    border: 1px solid rgba(black, 0.1);

    box-shadow: 0 1px 2px 1px rgba(black, 0.1);

    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }

  }

  .color-display__notification {
    position: absolute;
    left: 0.7em;
    top: 0.7em;
    font-size: 0.85rem;
    color: rgba(white, 0.9);
    background-color: rgba(black, 0.8);
    padding: 0.3em 0.8em;
    border-radius: 1em;
  }

  .notification-enter-active, .notification-leave-active {
    transition:
    transform 0.2s ease-in-out,
    opacity .15s ease-in-out;
  }
  .notification-enter, .notification-leave-active {
    opacity: 0;
    transform: translateY(-2em);
  }

</style>

<template>
  <main class="app">

    <!-- Color display -->
    <div
      class="color-display"
      @click="copyNameToClipboard"
      :style="{ backgroundColor: validHexColor ? validHexColor : '#F8F9FA'  }">

      <transition name="notification" mode="out-in">
        <div class="color-display__notification" v-if="colorWasCopiedToClipBoard">
          Copied name!
        </div>
      </transition>

      <div class="color-display__name__container" :class="validHexColor ? 'color-display__name__container--is-valid' : ''">
        <div
          class="color-display__name"
          :style="{ color: colorDisplayNameTextColor }"
          v-if="validHexColor">
          {{ colorName }}
        </div>
        <div class="color-display__message color-display__message--is-emtpy" v-else-if="color === ''">
          Please insert a color
        </div>
        <div class="color-display__message color-display__message--is-invalid" v-else>
          Not a valid color: '{{ color }}'<br>
          <small class="color-display__message__hint">Allowed formats: HEX, rgb(a), hsl(a)</small>
        </div>
      </div>

      <button class="color-display__btn" @click.stop="launchNativeColorPicker">
        <input class="virtually-hidden" type="color" v-model="color">
        <img src="./assets/colorwheel@1x.jpg" srcset="./assets/colorwheel@2x.jpg 2x" alt="Colorinspector">
      </button>
    </div>

    <div class="virtual-input__wrapper">
      <virtual-input
        placeholder="Paste your color"
        autofocus
        :is-valid-color="validHexColor ? true : false"
        @enterpress="copyNameToClipboard"
        v-model="color"
        >
      </virtual-input>
    </div>

  </main>
</template>

<script>
  // Packages
  import tinycolor from 'tinycolor2'
  import copyToClipboard from 'copy-to-clipboard'

  // Utilities
  import colorLib from './utils/colorLib'
  import { lightenDarkenColor } from './utils/colorUtils'

  // Components
  import VirtualInput from '../VirtualInput'

  export default {

    mounted () {
      this.color = ''
      colorLib.init()
    },

    data: () => ({
      color: undefined,
      colorWasCopiedToClipBoard: false,
    }),

    computed: {

      /**
       * Return the name for a color string
       *
       * @return {string} Name from color table
       */
      colorName () {
        if (!this.validHexColor) return
        return colorLib.name(this.validHexColor)[1]
      },

      /**
       * Convert string to a tinyColor object
       * https://github.com/bgrins/TinyColor
       *
       * @return {obj} tinycolor object
       */
      tinycolor () {
        return tinycolor(this.color)
      },

      /**
       * Convert the color to hex color if the color is valid
       *
       * @return {string} Converted Hex Color
       */
      validHexColor () {
        if (this.tinycolor.isValid()) {
          return this.tinycolor.toHexString()
        }
      },

      /**
       * Set the color name color to either white or black
       * Dependant on the brightness of the current color
       *
       * @return {string} css color value of either 'white' or 'black'
       */
      colorDisplayNameTextColor () {
        if (this.validHexColor) {
          return this.tinycolor.isLight() ? 'black' : 'white'
        }
      },

    },

    methods: {

      /**
       * Copy the current Color name to the clipboard
       * https://www.npmjs.com/package/clipboard
       */
      copyNameToClipboard () {
        if (!this.colorName) return
        this.triggerCopyNotification()
        copyToClipboard(this.colorName)
      },

      /**
       * Trigger the fade-in-out of the 'copied' message notification
       * When this function gets called multiple times reset the notification
       * animation time
       */
      triggerCopyNotification () {
        this.colorWasCopiedToClipBoard = true
        if (this.notificationTimeout) window.clearTimeout(this.notificationTimeout)
        this.notificationTimeout = window.setTimeout(_ => {
          this.colorWasCopiedToClipBoard = false
        }, 1500)
      },

      /**
       * Clicks the hidden color input to trigger the native color picker
       */
      launchNativeColorPicker () {
        if (!this.colorInput) {
          this.colorInput = this.$el.querySelector('input[type=color]')
        }
        this.colorInput.click()
      },

      /**
       * Darken the current color by -10 brightness
       * This function emulates the SCSS darken function
       */
      darken () {
        this.color = lightenDarkenColor(this.color, -10)
      },

      /**
       * Lighten the current color by +10 brightness
       * This function emulates the SCSS lighten function
       */
      lighten () {
        this.color = lightenDarkenColor(this.color, 10)
      },

    },

    components: {
      VirtualInput,
    },

  }
</script>
