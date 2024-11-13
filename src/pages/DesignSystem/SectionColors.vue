<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Colors</h1>
      </div>
    </section>

    <section>
      <p class="text-title-3">Light</p>
      <div
        class="grid grid-cols-6 gap-12 gap-y-32 max-w-[1000px] sm:flex sm:flex-wrap"
      >
        <span
          v-for="(item, key) in colorsWhite"
          :key="item"
          class="inline-flex flex-col"
        >
          <div
            class="w-[80px] h-[80px] rounded-lg overflow-hidden"
            :style="{
              background: `rgba(${item[0]},${item[1]}, ${item[2]}, 1)`,
            }"
          ></div>

          <p class="text-headline-4">
            rgb({{ item[0] }}, {{ item[0] }}, {{ item[0] }})
          </p>
          <TokenClipboard class="w-max px-8 text-headline-3">
            --{{ key }}
          </TokenClipboard>
        </span>
      </div>

      <p class="text-title-3 mt-24 mb-4">Dark</p>
      <div
        class="grid grid-cols-6 gap-12 gap-y-32 max-w-[1000px] sm:flex sm:flex-wrap"
      >
        <span
          v-for="(item, key) in colorsDark"
          :key="item"
          class="inline-flex flex-col"
        >
          <div
            class="w-[80px] h-[80px] rounded-lg overflow-hidden"
            :style="{
              background: `rgba(${item[0]},${item[1]}, ${item[2]}, 1)`,
            }"
          ></div>

          <p class="text-headline-4">
            rgb({{ item[0] }}, {{ item[0] }}, {{ item[0] }})
          </p>
          <TokenClipboard class="w-max px-8 text-headline-3">
            --{{ key }}
          </TokenClipboard>
        </span>
      </div>
    </section>
  </q-card>
</template>

<script setup>
import TokenClipboard from 'src/components/DesignSystem/TokenClipboard.vue'

const colorsWhite = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  'neutral-100': [9, 18, 28],
  'neutral-70': [75, 82, 89],
  'neutral-60': [97, 104, 109],
  'neutral-30': [239, 239, 239],
  'neutral-20': [245, 245, 245],
  'neutral-10': [250, 250, 250],
  'branding-light': [55, 217, 140],
  'primary-pure-10': [232, 245, 254],
  'primary-pure': [16, 147, 236],
  'primary-pure-dark': [0, 89, 150],
  'alert-error-10': [253, 234, 234],
  'alert-error': [233, 44, 44],
  'alert-warning-10': [251, 247, 230],
  'alert-warning': [210, 175, 0],
  /* dark */
}
const colorsDark = {
  'd-neutral-10': [18, 18, 18],
  'd-neutral-20': [23, 23, 23],
  'd-neutral-30': [31, 31, 31],
  'd-neutral-40': [36, 36, 36],
  'd-primary-pure-10': [17, 41, 29],
  'd-primary-light': [46, 248, 152],
  'd-primary-pure': [6, 247, 132],
  'd-primary-pure-dark': [5, 207, 111],
  'd-error': [247, 65, 65],
  'd-error-10': [255, 236, 236],
  'd-warning': [250, 206, 34],
  'd-warning-10': [41, 37, 19],
  'd-success': [0, 186, 97],
  'd-success-10': [230, 249, 240],
}
</script>

<style lang="sass"></style>
import SyntaxHighlight from
'src/components/DesignSystem/SyntaxHighlight.vue'import oButton from
'src/components/Button/OButton.vue'import { ref } from 'vue'import OInput from
'src/components/Input/OInput.vue'
