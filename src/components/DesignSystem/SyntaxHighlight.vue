<template>
  <q-list
    class="w-full !rounded-[1rem] overflow-hidden mt-24 text-neutral-60 code_high"
    v-if="dev"
  >
    <q-expansion-item
      icon="code"
      label="Code"
      class="highlited dark:!text-neutral-80"
    >
      <q-card>
        <highlightjs language="vue" :code="code" />
      </q-card>
    </q-expansion-item>
  </q-list>
  <div></div>
</template>

<script setup>
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/common'

const dev = process.env.development
const highlightjs = hljsVuePlugin.component

defineProps({
  code: String,
})
</script>

<style lang="sass">
.code_high
  height: max-content !important

  pre code.hljs
    display: block
    overflow-x: auto
    padding: 1em

  code.hljs
    padding: 3px 5px

  .hljs
    color: #abb2bf
    background: #222222 !important
    border-radius: 0 0 1rem 1rem !important

  .hljs-comment,
  .hljs-quote
    color: #5c6370
    font-style: italic

  .hljs-doctag,
  .hljs-formula,
  .hljs-keyword
    color: #c678dd

  .hljs-deletion,
  .hljs-name,
  .hljs-section,
  .hljs-selector-tag,
  .hljs-subst
    color: #e06c75

  .hljs-literal
    color: #56b6c2

  .hljs-addition,
  .hljs-attribute,
  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-string
    color: #98c379

  .hljs-attr,
  .hljs-number,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-pseudo,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable
    color: #d19a66

  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-symbol,
  .hljs-title
    color: #61aeee

  .hljs-built_in,
  .hljs-class .hljs-title,
  .hljs-title.class_
    color: #e6c07b

  .hljs-emphasis
    font-style: italic

  .hljs-strong
    font-weight: 700

  .hljs-link
    text-decoration: underline
</style>
