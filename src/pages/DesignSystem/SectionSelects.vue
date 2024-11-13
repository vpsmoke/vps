<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Selects</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/select#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <!-- <o-select v-model="model" :options="options" size="sm"></o-select>
      <o-select v-model="model" :options="options" size="md"></o-select>
 -->
      <div class="grid grid-cols-2 gap-12">
        <o-select
          v-model="model"
          :options="options"
          size="sm"
          option-label
          behavior="menu"
          label="Select SM"
          :clearable="true"
        ></o-select>

        <o-select
          v-model="model"
          :options="options"
          size="md"
          option-label
          behavior="menu"
          label="Select MD"
          :clearable="true"
        ></o-select>

        <o-select
          v-model="model"
          :options="options"
          size="lg"
          behavior="menu"
          label="Select LG"
          :clearable="true"
          ref="select"
        ></o-select>

        <o-select
          v-model="model2"
          :options="options2"
          label="Multi com toggle"
          size="lg"
          multiple
        >
          <template #option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </o-select>

        <o-select
          v-model="model2"
          :options="options2"
          label="Multi com check"
          size="lg"
          multiple
        >
          <template #option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps" class="pl-8 items-center">
              <q-item-section side class="pr-8">
                <o-check
                  size="md"
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                ></o-check>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </o-select>

        <o-select
          v-model="model3"
          :options="options3"
          label="Com Avatar"
          size="lg"
          multiple
        >
          <template #option="{ itemProps, opt }">
            <q-item v-bind="itemProps" class="pl-8">
              <q-item-section side class="pr-8">
                <q-avatar size="28px">
                  <img :src="opt.img" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template #selected-item="scope">
            <o-chip size="sm">
              <q-avatar size="18px">
                <img :src="scope.opt.img" />
              </q-avatar>
              <p>{{ scope.opt.label }}</p>
            </o-chip>
          </template>
        </o-select>
      </div>

      <syntax-highlight :code="code"> </syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import oButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OChip from 'src/components/Chip/OChip.vue'
import OCheck from 'src/components/Checkbox/OCheck.vue'

const soltaConsole = (...props) => {
  console.log(...props)
  return 'oi'
}
const model = ref('')
const options = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])

const select = ref(null)

const model2 = ref([])
const options2 = [
  {
    label: 'Google',
    value: 1,
  },
  {
    label: 'Facebook',
    value: 2,
  },
  {
    label: 'Twitter',
    value: 3,
  },
  {
    label: 'Apple',
    value: 4,
  },
  {
    label: 'Oracle',
    value: 5,
  },
]
const model3 = ref([])

const options3 = [
  {
    label: 'Google',
    img: 'https://files.tecnoblog.net/wp-content/uploads/2021/09/logotipo_da_empresa_google.jpg',
    value: 1,
  },
  {
    label: 'Facebook',
    img: 'https://www.facebook.com/images/fb_icon_325x325.png',
    value: 2,
  },
  {
    label: 'Twitter',
    img: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
    value: 3,
  },
  {
    label: 'Apple',
    img: 'https://files.tecnoblog.net/wp-content/uploads/2020/11/apple-logo.jpg',
    value: 4,
  },
  {
    label: 'Oracle',
    img: 'https://yt3.ggpht.com/bf3tO-EefcSglyKMZUBp_o-GuBfd0PGm_U6f7L_64CyKd3iMPiAfRkHeLfrCwLfMmCc3IMlk=s900-c-k-c0x00ffffff-no-rj',
    value: 5,
  },
]
// onMounted(() => {
//   starti();
// });
// onUnmounted(() => {
//   clearInterval(interval.value);
// });

const code = `
<script>
import OSelect         from "src/components/OSelect.vue"
<${'/'}script>

<o-select
  v-model="model"
  :options="options"
  size="sm"
  behavior="menu"
  label="Select SM"
  :clearable="true"
></o-select>

//size: sm, md, lg
// para mais infos consulte a documentaçao do Qselect
`
</script>

<style lang="sass"></style>
