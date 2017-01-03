<style lang=scss>
  @import './styles/base.scss';
  @import './styles/variables.scss';

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #EFF3F3;
  }

  .app {
    max-width: 400px;
    margin: 1em;
    width: 100%;

    border-radius: 5px;
    box-shadow: 0 3px 10px 2px rgba(desaturate(darken($color-border, 20%), 40%), 0.2);

    background-color: white;

    > * + * {
      border-top: inherit;
    }
  }

  .virtual-input__wrapper {
    position: relative;
    border-color: inherit;
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

    /* transition: background-color 0.08s; */

    &__name {
      font-family: 'Menlo', monospace;
    }
  }

  .color-display__message {
    text-align: center;
    font-weight: 100;
    color: #666F80;
    line-height: 1.5;
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
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid rgba(black, 0.1);
    box-shadow: 0 1px 2px 1px rgba(black, 0.1);
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
  <div class="container">

    <main class="app">

      <div class="color-display" :style="{ backgroundColor: validHexColor ? validHexColor : '#F8F9FA'  }">

        <transition name="notification" mode="out-in">
          <div class="color-display__notification" v-if="colorWasCopiedToClipBoard">
            Copied name!
          </div>
        </transition>

        <div class="color-display__name__container">
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
            <small class="color-display__message__hint">Allowed formats are: HEX, rgb(a)</small>
          </div>
        </div>

        <button class="color-display__btn" @click="launchNativeColorPicker">
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
        <!-- <div class="control is&#45;grouped"> -->
        <!--   <button @click="lighten" class="button control">Lighten</button> -->
        <!--   <button @click="darken" class="button control">Darken</button> -->
        <!-- </div> -->
      </div>


    </main>

  </div>
</template>

<script>
  // Packages
  import tinycolor from 'tinycolor2'
  import copyToClipboard from 'copy-to-clipboard'

  // Utilities
  import colorLib from './components/Color/colorLib'
  import { lightenDarkenColor } from './components/Color/colorUtils'

  // Components
  import VirtualInput from './components/VirtualInput.vue'

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
       * Return a hex color string if the input color is either a
       * - Valid hex number
       *
       * Convert valid non hex color formats to hex
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

      triggerCopyNotification () {
        this.colorWasCopiedToClipBoard = true
        if (this.notificationTimeout) window.clearTimeout(this.notificationTimeout)
        this.notificationTimeout = window.setTimeout(_ => {
          this.colorWasCopiedToClipBoard = false
        }, 1500)
      },

      /**
       * Click the hidden color input to trigger the native color picker
       */
      launchNativeColorPicker () {
        if (!this.colorInput) {
          this.colorInput = this.$el.querySelector('input[type=color]')
        }
        this.colorInput.click()
      },

      darken () {
        this.color = lightenDarkenColor(this.color, -10)
      },

      lighten () {
        this.color = lightenDarkenColor(this.color, 10)
      },

    },

    components: {
      VirtualInput,
    },

  }
</script>


