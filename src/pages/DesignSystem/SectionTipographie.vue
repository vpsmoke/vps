<template>
  <q-card class="p-16">
    <span class="text-neutral-70">Display - IBM Plex Sans</span>
    <div class="flex items-end gap-8">
      <h1 class="text-display">Display</h1>
      <token-clipboard>text-display</token-clipboard>
    </div>
    <div class="flex items-end gap-8">
      <h2 class="text-title-1">Title 1</h2>
      <token-clipboard>text-title-1</token-clipboard>
    </div>
    <div class="flex items-end gap-8">
      <h3 class="text-title-2">Title 2</h3>
      <token-clipboard>text-title-2</token-clipboard>
    </div>
    <div class="flex items-end gap-8">
      <h4 class="text-title-3">Title 3</h4>
      <token-clipboard>text-title-3</token-clipboard>
    </div>
    <div class="flex items-end gap-8">
      <h5 class="text-title-4">Title 4</h5>
      <token-clipboard>text-title-4</token-clipboard>
    </div>
    <div class="flex items-end gap-8">
      <h6 class="text-title-5">Title 5</h6>
      <token-clipboard>text-title-5</token-clipboard>
    </div>

    <div class="flex mt-32 gap-64 justify-evelyn">
      <div class="flex flex-col gap-4">
        <span class="text-neutral-70 mb-16">Headline - IBM Plex Sans</span>
        <div class="flex items-end gap-8">
          <p class="text-headline-1">Headline 1 - 18</p>
          <token-clipboard>text-headline-1</token-clipboard>
        </div>
        <div class="flex items-end gap-8">
          <p class="text-headline-2">Headline 2 - 16</p>
          <token-clipboard>text-headline-2</token-clipboard>
        </div>
        <div class="flex items-end gap-8">
          <p class="text-headline-3">Headline 3 - 14</p>
          <token-clipboard>text-headline-3</token-clipboard>
        </div>
        <div class="flex items-end gap-8">
          <p class="text-headline-4">Headline 4 - 12</p>
          <token-clipboard>text-headline-4</token-clipboard>
        </div>
        <div class="flex items-end gap-8">
          <p class="text-headline-5">Headline 5 - 10</p>
          <token-clipboard>text-headline-5</token-clipboard>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <span class="text-neutral-70 mb-16">Paragraph - IBM Plex Sans</span>
        <div class="flex items-center gap-8">
          <p class="text-paragraph-1">Paragraph 1 - 16</p>
          <token-clipboard>text-paragraph-1</token-clipboard>
        </div>
        <div class="flex items-center gap-8">
          <p class="text-paragraph-2">Paragraph 2 - 14</p>
          <token-clipboard>text-paragraph-2</token-clipboard>
        </div>
        <div class="flex items-center gap-8">
          <p class="text-paragraph-3">Paragraph 3 - 12</p>
          <token-clipboard>text-paragraph-3</token-clipboard>
        </div>
        <div class="flex items-center gap-8">
          <p class="text-paragraph-4">Paragraph 4 - 10</p>
          <token-clipboard>text-paragraph-4</token-clipboard>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <span class="text-neutral-70 mb-16">CAPS - IBM Plex Sans</span>
        <div class="flex items-center gap-8">
          <p class="text-caps-1">Caps 1 - 14 Semibold</p>
          <token-clipboard>text-caps-1</token-clipboard>
        </div>
        <div class="flex items-center gap-8">
          <p class="text-caps-2">Caps 2 - 12 Semibold</p>
          <token-clipboard>text-caps-2</token-clipboard>
        </div>
        <div class="flex items-center gap-8">
          <p class="text-caps-3">Caps 3 - 10 Semibold</p>
          <token-clipboard>text-caps-3</token-clipboard>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import TokenClipboard from 'src/components/DesignSystem/TokenClipboard.vue'
</script>

<style lang="scss" scoped></style>
