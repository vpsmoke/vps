<template>
  <q-card class="p-16 w-full pb-56">
    <h1 class="text-title-2">Design System</h1>
    <div
      class="text-neutral-70 mt-32 text-paragraph-2 gap-2 flex flex-col dark:text-white/80"
    >
      <p class="font-semibold text-neutral-100 dark:text-white">Sobre</p>
      <p>Bem vindo ao design system da nova data, aqui esta um guia basico</p>
      <p>Este design usa Vue e Quasar framework como base</p>
      <p>
        O Quasar é um (framework vue) cinto de ferramentas que tem uma game de
        utilidades
      </p>
      <p>
        é por padrao podemos usar todas elas ao inves de instalar varias
        bibliotecas de terceiros
      </p>

      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://vuejs.org/guide/introduction.html"
        >Vue Docs</a
      >
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://quasar.dev/introduction-to-quasar"
        >O que é Quasar</a
      >
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://quasar.dev/quasar-cli-webpack/quasar-config-js"
        >Configurando quasar.config.js</a
      >

      <p class="font-semibold text-neutral-100 dark:text-white mt-24">Icones</p>
      <p>
        Aqui é usado os icones svg do figma e o pacote de fontes Material
        Symbols
      </p>
      <p>
        Para usar um icone material é só usar o component
        <code
          class="bg-neutral-30 px-4 rounded dark:!bg-d-neutral-10 dark:border dark:border-white/10"
          >q-icon</code
        >
      </p>
      <p>
        por exemplo para o icone de `close` voce utilizaria dessa forma no
        q-icon `name='close'`
      </p>
      <br />
      <p>Ja para icones do figma, voce ira copiar o svg do icone</p>
      <p>transformar em symbol com um id dentro /publicicons.svg</p>
      <p>
        e vai referenciar no
        <code
          class="bg-neutral-30 px-4 rounded dark:!bg-d-neutral-10 dark:border dark:border-white/10"
          >q-icon</code
        >
        da seguinte forma
      </p>
      <p>name="svguse:/icons.svg#icon-1"</p>
      <br />

      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded"
        >Material Symbols</a
      >
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://quasar.dev/vue-components/icon#introduction"
        >Q-icon</a
      >
      <p class="mt-8">
        Para icones de favicon e icones para pwa, electron etc quasar tem um cli
        que automatiza tudo isto
      </p>
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://quasar.dev/icongenie/introduction"
        >Icon Genie CLI</a
      >
      <br />

      <p class="font-semibold text-neutral-100 dark:text-white mt-24">
        Estrutura
      </p>
      <p>
        Para duvidas sobre a estrutura do projeto consulte sobre a estrutura do
        quasar
      </p>
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://quasar.dev/quasar-cli-vite/directory-structure#introduction"
        >Estrutura do projeto</a
      >
      <br />
      <p class="font-semibold text-neutral-100 dark:text-white mt-24">
        Extensões
      </p>
      <p>
        Algumas extensões são extremamente importantes para um workflow mais
        produtivos
      </p>
      <p>
        Para isso irei deixar estas sugestoes dentro do .vscode/extensions.json/
      </p>
      <br />
      <p class="font-semibold text-neutral-100 dark:text-white mt-24">
        Boas Praticas
      </p>
      <p>
        Recomendado dar uma olhada no style guide do vue para seguir os padroes
        corretos
      </p>
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://vuejs.org/style-guide/"
        >Vue3 Style Guide</a
      >
      <p class="mt-8">
        Este projeto usa Eslint, portanto é muito importante a padronizaçao do
        codigo
      </p>
      <p>É uma má pratica desativar o Eslint</p>
      <p class="font-semibold text-neutral-100 dark:text-white mt-24">
        Components
      </p>
      <p>
        Este projeto usa uma logica de
        <strong class="font-semibold">wrappers</strong>
      </p>
      <p>
        que é basicamente uma camada de logica em volta de um componente do
        quasar
      </p>
      <p>então ao visualizar um component como o OButton, OCheck</p>
      <p>
        vera que por tras ha um component do quasar QBtn, Qcheckbox
        respectivamente
      </p>

      <p class="font-semibold text-neutral-100 dark:text-white mt-24">
        Comunidade
      </p>

      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://discord.gg/cXrcex9q"
        >Discord comunidade Quasar</a
      >
      <a
        target="_blank"
        class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
        href="https://github.com/quasarframework/quasar/discussions/"
        >Github comunidade Quasar</a
      >
    </div>

    <p class="font-semibold text-neutral-100 dark:text-white mt-24 mb-8">
      Links uteis
    </p>
    <a
      target="_blank"
      class="text-medium text-[#00b4ff] dark:text-opacity-80 border-b border-dashed w-max text-paragraph-2"
      href="https://vuecomponents.com/"
      >Vuecomponents</a
    >

    <p>Em breve...</p>
  </q-card>

  <!--
    prioridades para depois
    1*
      ALINHAR BREAKPOINTS tailwind/quasar/figma
      Criar estrutura de pagina exemplo 

    2*
      trocar toggle (fiel ao ds do andrei no figma)
      colocar um badge no select multiplo,  do tipo (item), (item), (+5)
      criar no DS outras variçoes de tabs
    3*
     tirar elevaçao do select ao selecionar
     trocar todos os icones default do pacote

   -->
</template>

<script setup>
import { ref } from 'vue'

const expanded = ref(['Estrutura do projeto'])
const simple = [
  {
    label: 'Estrutura do projeto',
    children: [
      {
        label: 'dist/',
        explanation: '# Destino',

        children: [{ label: 'assets' }],
      },
      {
        label: 'src/',
        explanation: '# Fonte',
        children: [{ label: 'assets' }, { label: 'boot' }],
      },
      { label: '.editorconfig' },
      { label: '.eslintrc.js' },
      { label: 'package.json' },
      { label: 'postcss.config.js' },
      { label: 'tailwind.config.cjs' },

      {
        label: 'quasar.config.js',
        explanation: '# Arquivo de configuração do quasar CLI',
      },
    ],
  },
]
</script>

<style lang="scss" scoped></style>
