<template>
  <q-card class="p-16 w-full">
    <h1 class="text-title-2 mb-24">Badge, Status & Chips</h1>

    <div class="flex items-center justify-between">
      <h1 class="text-paragraph-1 mb-18">Badge</h1>
      <o-button
        secondary
        type="a"
        href="https://quasar.dev/vue-components/chip#introduction"
        target="_blank"
      >
        QDocs
        <q-icon class="!text-20" name="arrow_outward"></q-icon>
      </o-button>
    </div>
    <o-badge size="sm" :badge="true" color="var(--alert-warning)">
      <template v-slot:content>Badge sm text</template>
    </o-badge>

    <o-badge size="md" :badge="true" color="var(--primary-pure)">
      <template v-slot:content>Badge MD color</template>
    </o-badge>

    <o-badge size="lg" :badge="true" color="var(--alert-success)">
      <template v-slot:content>Badge LG</template>
    </o-badge>

    <o-badge size="lg" :badge="true" color="var(--alert-error)" square>
      <template v-slot:content>Badge LG Square</template>
    </o-badge>

    <o-badge size="lg" :badge="false" color="var(--alert-success)">
      <template v-slot:content>
        <q-avatar icon="star" size="1.35rem" class="m-2" /> With Icon
      </template>
    </o-badge>

    <o-badge size="lg" :badge="false" color="var(--alert-success)">
      <template v-slot:content>
        <q-avatar
          size="1.35rem"
          class="m-2"
          icon="img:https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
        />
        With IMG
      </template>
    </o-badge>

    <p class="mt-16 mb-8">Chip</p>
    <div class="flex gap-8">
      <o-chip size="sm" icon-right="arrow_outward" square>Chip SM</o-chip>
      <o-chip size="md" square>Chip MD</o-chip>
      <o-chip size="lg" square>Chip LG</o-chip>
      <o-chip size="lg" icon="done">Chip MD rounded</o-chip>
      <o-chip size="lg" icon-right="done">Chip MD rounded</o-chip>
    </div>
    <div class="flex-col flex">
      <p class="mt-16 mb-8">clicavel com v-model</p>
      <div class="flex gap-8">
        <o-chip size="md" v-model:selected="desert.Icecream">Recentes</o-chip>
        <o-chip size="md" v-model:selected="desert.Eclair">Frete Gratis</o-chip>
        <o-chip size="md" v-model:selected="desert.Cupcake">Populares</o-chip>
      </div>
    </div>

    <p class="mt-16 mb-8">Status</p>
    <div class="flex gap-8">
      <q-badge rounded class="bg-primary-pure w-8 h-8"></q-badge>
      <q-badge rounded class="bg-alert-sucess w-8 h-8"></q-badge>
      <q-badge rounded class="bg-alert-error w-8 h-8"></q-badge>
      <q-badge rounded class="bg-alert-warning w-8 h-8"></q-badge>
    </div>

    <p class="mt-16 mb-8">Counter</p>
    <div class="flex gap-8">
      <o-counter
        bg="var(--primary-pure)"
        color="var(--neutral-100)"
        @click="count++"
        >{{ count }}</o-counter
      >
      <o-counter
        bg="var(--neutral-100)"
        color="var(--white)"
        @click="count--"
        >{{ count }}</o-counter
      >
    </div>
    <syntax-highlight :code="code"></syntax-highlight>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OChip from 'src/components/Chip/OChip.vue'
import OCounter from 'src/components/Counter/OCounter.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import { ref } from 'vue'

const code = `import OBadge from "src/components/OBadge.vue";
import OCounter from "src/components/OCounter.vue";
import OChip from "src/components/OChip.vue";
// Badge -------------------
<o-badge
  size="lg"
  :badge="true"
  bg="--alert-success">
  <template v-slot:content>Tag LG</template>
</o-badge>
// size: sm, md, lg
// badge: tem ou nao a bolinha
// bg: nome da variavel css Ex: --primary-pure
// color: nome da variavel css
// slots: content

//Status
<q-badge rounded class="bg-primary-pure w-8 h-8"></q-badge>

//Counter
<o-counter bg="--primary-pure" color="--neutral-100">1</o-counter>

//Chip
<o-chip size="md">Chip MD</o-chip>
//size: sm, md, lg
//[square] borda flat
//Chip é um q-chip por traz, portanto tem todas as props do mesmo
//[v-model:selected] https://quasar.dev/vue-components/chip#example--selected
`

const count = ref(1)

const desert = ref({
  Icecream: false,
  Eclair: false,
  Cupcake: false,
  Gingerbread: false,
})
</script>

<style lang="sass" scoped>
.overlapping
  border: 2px solid white
  position: absolute
</style>
