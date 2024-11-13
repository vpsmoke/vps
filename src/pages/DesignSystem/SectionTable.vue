<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Table</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/table"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <div class="flex flex-col gap-32">
        <div>
          <p class="text-caps1">Primary</p>
          <o-table :rows="rows" :columns="columns" row-key="name" primary>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">
                  <div class="flex gap-8 items-center">
                    <q-avatar size="2rem">
                      <img
                        src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/01/272659509_640826040498160_305754906527072885_n-e1643549776803.jpg?w=876&h=484&crop=1"
                        alt=""
                      />
                    </q-avatar>
                    <div class="flex flex-col">
                      <p class="text-paragraph-2">
                        {{ props.row.name }}
                      </p>
                      <p
                        class="text-paragraph-3 text-neutral-70 dark:text-white/50"
                      >
                        Colaborador
                      </p>
                    </div>
                  </div>
                </q-td>
                <q-td key="calories" :props="props">
                  {{ props.row.calories }}
                </q-td>
                <q-td key="fat" :props="props">
                  {{ props.row.fat }}
                </q-td>
                <q-td key="carbs" :props="props">
                  {{ props.row.carbs }}
                </q-td>
                <q-td key="protein" :props="props">
                  {{ props.row.protein }}
                </q-td>
                <q-td key="sodium" :props="props" :auto-width="true">
                  <o-button class="mx-16" size="sm" primary
                    >Adicionar ao carrinho</o-button
                  >
                </q-td>
                <q-td key="calcium" :props="props">
                  <o-badge size="sm"
                    ><template #content>{{
                      props.row.calcium
                    }}</template></o-badge
                  >
                </q-td>
                <q-td key="iron" :props="props">
                  <o-button
                    size="sm"
                    secondary
                    icon="search"
                    class="shadow-sm !p-0 w-32 h-32"
                  >
                  </o-button>
                </q-td>
              </q-tr>
            </template>
          </o-table>
        </div>

        <div>
          <p>Border cell</p>
          <o-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            primary
            separator="cell"
          ></o-table>
        </div>
        <div>
          <div class="flex items-center justify-between mb-8">
            <p class="text-caps1">Secondary Sticky</p>
            <q-btn
              secondary
              icon-right="archive"
              label="Exportar para Excel"
              no-caps
              @click="exportTable"
            >
              <q-tooltip>Exportação ingenua, necessita de um parser</q-tooltip>
            </q-btn>
          </div>
          <o-table
            class="sticky-header-table"
            :rows="rows"
            :columns="columns"
            row-key="name"
            secondary
            :rows-per-page-options="[0]"
          >
          </o-table>
        </div>

        <div>
          <p class="text-caps1">Tertiary sem footer</p>
          <o-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            tertiary
            hide-bottom
          ></o-table>
        </div>

        <div>
          <o-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            :visible-columns="visibleColumns"
          >
            <template v-slot:top="props">
              <div class="col-2 q-table__title">
                FullScreen e colunas visiveis
              </div>

              <q-space />

              <o-select
                size="md"
                v-model="visibleColumns"
                multiple
                options-dense
                :display-value="$q.lang.table.columns"
                emit-value
                map-options
                :options="columns"
                option-value="name"
                style="min-width: 150px"
              />

              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
              />
            </template>
          </o-table>
        </div>

        <div>
          <o-table
            title="Grid Style"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <template v-slot:top-right>
              <o-input
                size="md"
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <o-button size="md" tertiary>
                    <q-icon name="search"
                  /></o-button>
                </template>
              </o-input>
            </template>
          </o-table>
        </div>
      </div>

      <div>
        <o-table
          title="Com Expansão"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary-pure"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  Oi amiguinho 🤔😁🍃 nome da linha:{{ props.row.name }}.
                </div>
              </q-td>
            </q-tr>
          </template>
        </o-table>
      </div>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import oButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import { exportFile, useQuasar } from 'quasar'
import OBadge from 'src/components/Badge/OBadge.vue'
import OSelect from 'src/components/Select/OSelect.vue'

const $q = useQuasar()
const visibleColumns = ref([
  'calories',
  'desc',
  'fat',
  'carbs',
  'protein',
  'sodium',
  'calcium',
  'iron',
])
const filter = ref('')
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'right',
    label: 'Calories',
    field: 'calories',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'fat',
    label: 'Fat (g)',
    field: 'fat',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'carbs',
    label: 'Carbs (g)',
    field: 'carbs',
  },
  {
    style: 'width: auto',
    name: 'protein',
    label: 'Protein (g)',
    field: 'protein',
  },
  {
    style: 'width: auto',
    name: 'sodium',
    label: 'Sodium (mg)',
    field: 'sodium',
    align: 'center',
  },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    style: 'width: 100px',
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
]
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile('table-export.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}
const code = `

//A table usa as mesma props que o Qtable, apenas usar o wrapper OTable
// todos as variaçoes metodos e propriedades vc encontra na documentaçao
// https://quasar.dev/vue-components/table 
`
</script>

<style lang="sass"></style>
