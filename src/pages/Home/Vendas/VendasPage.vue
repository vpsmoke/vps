<template>
  <q-layout class="VendasPage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card>
          <div
            class="flex justify-between items-center p-24 md:flex-wrap div-title"
          >
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_vendas"
              ></q-icon>
              <p class="text-title-3">Vendas</p>
            </div>
            <OButton
              size="lg"
              primary
              text-color="white"
              icon="svguse:/icons.svg#icon_add_circle_white"
              class="new-venda"
              href="/"
              >Nova venda</OButton
            >
          </div>
          <q-tabs
            v-model="tab"
            class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max"
            dense
            active-color="primary-pure"
          >
            <q-tab name="vendas" label="Minhas vendas"></q-tab>
            <q-tab name="allVendas" label="Todas as vendas"></q-tab>
            <q-tab name="tempoEntrega" label="Tempo de entrega"></q-tab>
            <q-tab name="estudoEntrega" label="Estudo de entrega"></q-tab>
            <q-tab name="estudoPagamento" label="Estudo de Pagamento"></q-tab>
          </q-tabs>
          <!-- v-if="
                user && (user.groups?.includes('Gerente') || user.is_superuser)
              " -->

          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="vendas">
              <o-table
                :filter="searchTable"
                class="w-full flex-nowrap p-24"
                :rows="mySales"
                :columns="columns"
                row-key="name"
                secondary
                separator="cell"
                @request="getMySales"
                v-model:pagination="initialPagination"
              >
                <template v-slot:top-left>
                  <o-input
                    size="md"
                    debounce="300"
                    v-model="searchTable"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <o-button size="md" tertiary>
                        <q-icon name="search"
                      /></o-button>
                    </template>
                  </o-input>
                </template>

                <template v-slot:top-right>
                  <div class="flex flex-1 justify-end gap-32 items-center">
                    <OButton
                      @click="initExportMyTable"
                      class="sm:w-full w-max"
                      :class="[
                        loadingExcel ? 'opacity-70 pointer-events-none' : '',
                      ]"
                      size="md"
                      primary
                      text-color="white"
                      :loading="loadingExcel"
                      icon="svguse:/icons.svg#icon_xlsx"
                    >
                      Exportar tabela
                    </OButton>

                    <OButton class="btnFilter md:w-full" size="md" secondary>
                      <q-icon
                        size="0.8rem"
                        name="svguse:/icons.svg#icon_filter_option"
                      ></q-icon>
                      Filtrar

                      <q-popup-proxy
                        default
                        breakpoint="280"
                        class="popup-proxy w-[25.4375rem] flex flex-col gap-16 flex-nowrap"
                      >
                        <o-select
                          v-model="filter.regiao"
                          :options="optionsFilter.regioes"
                          emit-value
                          use-input
                          map-options
                          multiple
                          size="md"
                          behavior="menu"
                          label="Região"
                          :clearable="true"
                        ></o-select>
                        <o-select
                          v-model="filter.bairro"
                          :options="bairros"
                          multiple
                          use-input
                          emit-value
                          map-options
                          size="md"
                          behavior="menu"
                          label="Bairro"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-if="tab === 'allVendas'"
                          v-model="filter.vendedor"
                          :options="optionsFilter.vendedores"
                          emit-value
                          map-options
                          size="md"
                          behavior="menu"
                          label="Vendedores"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-model="filter.origem"
                          :options="optionsFilter.origens"
                          emit-value
                          map-options
                          size="md"
                          behavior="menu"
                          label="Origem"
                          :clearable="true"
                        ></o-select>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data realizada Inicial"
                            size="lg"
                            v-model="filter.dataRealizadaInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data realizada Final"
                            size="lg"
                            v-model="filter.dataRealizadaFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Inicial"
                            size="lg"
                            v-model="filter.dataPagamentoInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Final"
                            size="lg"
                            v-model="filter.dataPagamentoFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>
                        <div class="flex items-center justify-end gap-4 mt-8">
                          <o-button size="md" secondary @click="closeFilter"
                            >Cancelar</o-button
                          >
                          <o-button
                            size="md"
                            primary
                            @click="
                              getMySales({
                                pagination: initialPagination,
                              })
                            "
                            >Consultar</o-button
                          >
                        </div>
                      </q-popup-proxy>
                    </OButton>
                    <div class="flex gap-8 items-center">
                      <p>Mostrar</p>
                      <o-select
                        v-model="modelViewPerPage"
                        class="min-w-[4.625rem]"
                        :options="optionsSelect"
                        size="md"
                        option-label
                        behavior="menu"
                        :clearable="true"
                      ></o-select>
                      <p>Linhas por página</p>
                    </div>
                  </div>
                </template>

                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      @click="(e) => handleSort(col.name)"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    @click.prevent="handleClickDetails(props.row.id)"
                    class="cursor-pointer"
                  >
                    <q-td key="id" :props="props">
                      {{ props.row.id }}
                    </q-td>
                    <q-td key="nome_vendedor" :props="props">
                      {{ props.row.nome_vendedor }}
                    </q-td>
                    <q-td key="nome_cliente" :props="props">
                      {{ props.row.nome_cliente }}
                    </q-td>
                    <q-td key="regiao" :props="props">
                      {{ props.row.bairro_read.regiao }}
                    </q-td>
                    <q-td key="bairro" :props="props">
                      {{ props.row.bairro_read.nome }}
                    </q-td>
                    <q-td key="dia_semana_venda" :props="props">
                      {{ GLOBAL.formatData(String()) }}
                    </q-td>
                    <q-td key="data_venda" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_venda)) }}
                    </q-td>
                    <q-td key="data_pagamento" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_pagamento)) }}
                    </q-td>
                    <q-td key="valor_total" :props="props">
                      {{ GLOBAL.currencyBR(props.row.valor_total.toFixed(2)) }}
                    </q-td>
                    <q-td
                      key="quantidade_unidades"
                      :props="props"
                      :auto-width="true"
                    >
                      {{ props.row.quantidade_unidades }}
                    </q-td>
                    <q-td
                      key="actions"
                      :props="props"
                      class="flex items-center justify-center"
                      @click.stop
                    >
                      <div
                        class="w-max flex gap-8 items-center justify-between"
                      >
                        <OButton
                          @click.stop="handleClickEdit(props.row.id)"
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_edit"
                        ></OButton>
                        <OButton
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_lupa"
                          @click.stop="handleClickDetails(props.row.id)"
                        ></OButton>

                        <OButton
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_trash"
                          @click.stop="handleClickDelete(props.row.id)"
                        ></OButton>
                      </div>
                    </q-td>
                  </q-tr>
                </template>
              </o-table>
            </q-tab-panel>

            <q-tab-panel name="allVendas">
              <o-table
                :filter="searchTabAllVendas"
                class="w-full flex-nowrap p-24"
                :rows="allSales"
                :columns="columns"
                row-key="name"
                secondary
                separator="cell"
                v-model:pagination="initialPaginationAllVendas"
                @request="getAllSales"
              >
                <template v-slot:top-left>
                  <o-input
                    size="md"
                    debounce="300"
                    v-model="searchTabAllVendas"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <o-button size="md" tertiary>
                        <q-icon name="search"
                      /></o-button>
                    </template>
                  </o-input>
                </template>

                <template v-slot:top-right>
                  <div class="flex flex-1 justify-end gap-32 items-center">
                    <OButton
                      @click="initExportAllTable"
                      class="sm:w-full w-max"
                      :class="[
                        loadingExcel ? 'opacity-70 pointer-events-none' : '',
                      ]"
                      size="md"
                      primary
                      text-color="white"
                      :loading="loadingExcel"
                      icon="svguse:/icons.svg#icon_xlsx"
                    >
                      Exportar tabela
                    </OButton>
                    <OButton class="btnFilter md:w-full" size="md" secondary>
                      <q-icon
                        size="0.8rem"
                        name="svguse:/icons.svg#icon_filter_option"
                      ></q-icon>
                      Filtrar

                      <q-popup-proxy
                        default
                        :breakpoint="280"
                        class="popup-proxy w-[25.4375rem] flex flex-col gap-16 flex-nowrap"
                      >
                        <o-select
                          v-model="filter.regiao"
                          :options="optionsFilter.regioes"
                          emit-value
                          map-options
                          multiple
                          use-input
                          size="md"
                          behavior="menu"
                          label="Região"
                          :clearable="true"
                        ></o-select>
                        <o-select
                          v-model="filter.bairro"
                          :options="bairros"
                          multiple
                          emit-value
                          use-input
                          map-options
                          size="md"
                          behavior="menu"
                          label="Bairro"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-model="filter.vendedor"
                          :options="optionsFilter.vendedores"
                          size="md"
                          emit-value
                          map-options
                          behavior="menu"
                          label="Vendedores"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-model="filter.origem"
                          :options="optionsFilter.origens"
                          size="md"
                          emit-value
                          map-options
                          behavior="menu"
                          label="Origem"
                          :clearable="true"
                        ></o-select>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data realizada Inicial"
                            size="lg"
                            v-model="filter.dataRealizadaInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data realizada Final"
                            size="lg"
                            v-model="filter.dataRealizadaFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Inicial"
                            size="lg"
                            v-model="filter.dataPagamentoInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Final"
                            size="lg"
                            v-model="filter.dataPagamentoFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>

                        <div class="flex items-center justify-end gap-4 mt-8">
                          <o-button size="md" secondary @click="closeFilter"
                            >Cancelar</o-button
                          >
                          <o-button
                            size="md"
                            primary
                            @click="
                              getAllSales({
                                pagination: initialPaginationAllVendas,
                              })
                            "
                            >Consultar</o-button
                          >
                        </div>
                      </q-popup-proxy>
                    </OButton>
                    <div class="flex gap-8 items-center">
                      <p>Mostrar</p>
                      <o-select
                        v-model="modelViewPerPageAllSales"
                        class="min-w-[4.625rem]"
                        :options="optionsSelect"
                        size="md"
                        option-label
                        behavior="menu"
                        :clearable="true"
                      ></o-select>
                      <p>Linhas por página</p>
                    </div>
                  </div>
                </template>
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      @click="(e) => handleSortAll(col.name)"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    class="cursor-pointer"
                    @click.prevent="
                      handleClickDetails(props.row.id, props.row.vendedor)
                    "
                  >
                    <q-td key="id" :props="props">
                      {{ props.row.id }}
                    </q-td>
                    <q-td key="nome_vendedor" :props="props">
                      {{ props.row.nome_vendedor }}
                    </q-td>
                    <q-td key="nome_cliente" :props="props">
                      {{ props.row.nome_cliente }}
                    </q-td>
                    <q-td key="regiao" :props="props">
                      {{ props.row.bairro_read.regiao }}
                    </q-td>
                    <q-td key="bairro" :props="props">
                      {{ props.row.bairro_read.nome }}
                    </q-td>
                    <q-td key="data_venda" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_venda)) }}
                    </q-td>
                    <q-td key="data_pagamento" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_pagamento)) }}
                    </q-td>
                    <q-td key="valor_total" :props="props">
                      {{ GLOBAL.currencyBR(props.row.valor_total.toFixed(2)) }}
                    </q-td>
                    <q-td
                      key="quantidade_unidades"
                      :props="props"
                      :auto-width="true"
                    >
                      {{ props.row.quantidade_unidades }}
                    </q-td>
                    <q-td
                      key="actions"
                      :props="props"
                      class="flex items-center justify-center"
                      @click.stop
                    >
                      <div
                        class="w-max flex gap-8 items-center justify-between"
                      >
                        <!-- :class="
                            !handleStatusLine(props.row.vendedor) &&
                            !user.is_superuser
                              ? '!opacity-50'
                              : ''
                          "
                          :disabled="
                            !handleStatusLine(props.row.vendedor) &&
                            !user.is_superuser
                          " -->
                        <OButton
                          @click.stop="handleClickEdit(props.row.id)"
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_edit"
                        ></OButton>
                        <OButton
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_lupa"
                          @click.stop="handleClickDetails(props.row.id)"
                        ></OButton>

                        <!-- :class="
                            !handleStatusLine(props.row.vendedor) &&
                            !user.is_superuser
                              ? '!opacity-50'
                              : ''
                          "
                          :disabled="
                            !handleStatusLine(props.row.vendedor) &&
                            !user.is_superuser
                          " -->
                        <OButton
                          size="sm"
                          secondary
                          icon="svguse:/icons.svg#icon_trash"
                          @click.stop="handleClickDelete(props.row.id)"
                        ></OButton>
                      </div>
                    </q-td>
                  </q-tr>
                </template>
              </o-table>
            </q-tab-panel>
            <q-tab-panel name="tempoEntrega">
              <o-table
                :filter="searchTabAllVendas"
                class="w-full flex-nowrap p-24"
                :rows="allSales"
                :columns="columnsTempoEntrega"
                row-key="name"
                secondary
                separator="cell"
                v-model:pagination="initialPaginationAllVendas"
                @request="getAllSales"
              >
                <template v-slot:top-left>
                  <o-input
                    size="md"
                    debounce="300"
                    v-model="searchTabAllVendas"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <o-button size="md" tertiary>
                        <q-icon name="search"
                      /></o-button>
                    </template>
                  </o-input>
                </template>

                <template v-slot:top-right>
                  <div class="flex flex-1 justify-end gap-32 items-center">
                    <OButton
                      @click="initExportAllTableDelivery"
                      class="sm:w-full w-max"
                      :class="[
                        loadingExcel ? 'opacity-70 pointer-events-none' : '',
                      ]"
                      size="md"
                      primary
                      text-color="white"
                      :loading="loadingExcel"
                      icon="svguse:/icons.svg#icon_xlsx"
                    >
                      Exportar tabela
                    </OButton>
                    <OButton
                      class="btnFilter md:w-full"
                      size="md"
                      secondary
                      @click="handleClickOpenModalTempoMedio"
                    >
                      Tempo médio de entrega
                    </OButton>
                    <OButton class="btnFilter md:w-full" size="md" secondary>
                      <q-icon
                        size="0.8rem"
                        name="svguse:/icons.svg#icon_filter_option"
                      ></q-icon>
                      Filtrar

                      <q-popup-proxy
                        default
                        :breakpoint="280"
                        class="popup-proxy w-[25.4375rem] flex flex-col gap-16 flex-nowrap"
                      >
                        <o-select
                          v-model="filter.regiao"
                          :options="optionsFilter.regioes"
                          emit-value
                          map-options
                          multiple
                          use-input
                          size="md"
                          behavior="menu"
                          label="Região"
                          :clearable="true"
                        ></o-select>
                        <o-select
                          v-model="filter.bairro"
                          :options="bairros"
                          multiple
                          emit-value
                          use-input
                          map-options
                          size="md"
                          behavior="menu"
                          label="Bairro"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-model="filter.vendedor"
                          :options="optionsFilter.vendedores"
                          size="md"
                          emit-value
                          map-options
                          behavior="menu"
                          label="Vendedores"
                          :clearable="true"
                        ></o-select>

                        <o-select
                          v-model="filter.origem"
                          :options="optionsFilter.origens"
                          size="md"
                          emit-value
                          map-options
                          behavior="menu"
                          label="Origem"
                          :clearable="true"
                        ></o-select>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data realizada Inicial"
                            size="lg"
                            v-model="filter.dataRealizadaInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data realizada Final"
                            size="lg"
                            v-model="filter.dataRealizadaFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataRealizadaFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>

                        <div class="!flex gap-8 items-center md:flex-col">
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Inicial"
                            size="lg"
                            v-model="filter.dataPagamentoInicial"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoInicial"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                          <o-input
                            class="w-full"
                            label="Data de Pagamento Final"
                            size="lg"
                            v-model="filter.dataPagamentoFinal"
                            placeholder="Até"
                            type="date"
                            mask="DD-MM-YYYY"
                            append-size="32px"
                          >
                            <template v-slot:append>
                              <OButton rounded>
                                <q-icon
                                  name="calendar_today"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="filter.dataPagamentoFinal"
                                      mask="YYYY-MM-DD"
                                    >
                                      <div class="row items-center justify-end">
                                        <OButton
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </OButton>
                            </template>
                          </o-input>
                        </div>

                        <div class="flex items-center justify-end gap-4 mt-8">
                          <o-button size="md" secondary @click="closeFilter"
                            >Cancelar</o-button
                          >
                          <o-button
                            size="md"
                            primary
                            @click="
                              getAllSales({
                                pagination: initialPaginationAllVendas,
                              })
                            "
                            >Consultar</o-button
                          >
                        </div>
                      </q-popup-proxy>
                    </OButton>
                    <div class="flex gap-8 items-center">
                      <p>Mostrar</p>
                      <o-select
                        v-model="modelViewPerPageAllSales"
                        class="min-w-[4.625rem]"
                        :options="optionsSelect"
                        size="md"
                        option-label
                        behavior="menu"
                        :clearable="true"
                      ></o-select>
                      <p>Linhas por página</p>
                    </div>
                  </div>
                </template>
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      @click="(e) => handleSortAll(col.name)"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    class="cursor-pointer"
                    @click.prevent="
                      handleClickDetails(props.row.id, props.row.vendedor)
                    "
                  >
                    <q-td key="id" :props="props">
                      {{ props.row.id }}
                    </q-td>
                    <q-td key="nome_vendedor" :props="props">
                      {{ props.row.nome_vendedor }}
                    </q-td>
                    <q-td key="nome_cliente" :props="props">
                      {{ props.row.nome_cliente }}
                    </q-td>
                    <q-td key="regiao" :props="props">
                      {{ props.row.bairro_read.regiao }}
                    </q-td>
                    <q-td key="bairro" :props="props">
                      {{ props.row.bairro_read.nome }}
                    </q-td>
                    <q-td key="dia_semana_venda" :props="props">
                      {{ props.row.dia_semana_venda }}
                    </q-td>
                    <q-td key="data_venda" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_venda)) }}
                    </q-td>
                    <q-td key="data_pagamento" :props="props">
                      {{ GLOBAL.formatData(String(props.row.data_pagamento)) }}
                    </q-td>
                    <q-td key="horario_saida" :props="props">
                      {{ GLOBAL.formatData(String(props.row.horario_saida)) }}
                    </q-td>
                    <q-td key="horario_entrega" :props="props">
                      {{ GLOBAL.formatData(String(props.row.horario_entrega)) }}
                    </q-td>
                    <q-td key="tempo_entrega" :props="props">
                      {{ props.row.tempo_entrega }}
                    </q-td>
                  </q-tr>
                </template>
              </o-table>
            </q-tab-panel>
            <q-tab-panel name="estudoEntrega">
              <div class="relative p-24">
                <EstudoEntrega :optionsFilter="optionsFilter" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="estudoPagamento">
              <div>
                <EstudoPagamento />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </main>
    </q-scroll-area>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="p-12 py-10 w-[400px]">
        <q-form class="flex items-center">
          <p class="text-title-4 p-8 text-center">
            Deseja realmente deletar essa venda?
          </p>
          <q-card-actions class="w-full flex justify-end">
            <OButton
              class="h-48 bg-primary-pure text-white flex-1"
              @click="onDialogCancel"
            >
              Cancelar
            </OButton>
            <OButton
              :loading="isLoading"
              class="h-48 bg-alert-error/90 text-white flex-1"
              @click="handleDelete"
            >
              Sim, desejo
            </OButton>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-layout>
  <ModalTempoMedio ref="modalTempoMedioRef" />
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref, onMounted, watch } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OTable from 'src/components/Table/OTable.vue'
import { useRouter, useRoute } from 'vue-router'
import EstudoEntrega from 'src/components/Vendas/EstudoEntrega.vue'
import EstudoPagamento from 'src/components/Vendas/EstudoPagamento.vue'
import {
  Notify,
  QField,
  useDialogPluginComponent,
  QTabs,
  QTab,
  QIcon,
  QSeparator,
  QTabPanel,
  QTabPanels,
  QCard,
  QPopupProxy,
} from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
import { api } from 'src/boot/axios'
import {
  columns,
  prepareRel,
  columnsTempoEntrega,
  prepareRelTempoEntrega,
} from './data.js'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import ModalTempoMedio from 'src/components/Modal/ModalTempoMedio.vue'

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
const mySales = ref([])
const allSales = ref([])
const loadingExcel = ref(false)
const router = useRouter()

const modelViewPerPage = ref('5')
const modelViewPerPageAllSales = ref('5')
const modalTempoMedioRef = ref(null)

const {
  getDetailsCurrentUser,
  getOrigens,
  getVendedores,
  getRegiao,
  getBairros,
} = useContextStore()

const { currentUser, origens, vendedores, bairros, regiao } = storeToRefs(
  useContextStore()
)
const optionsSelect = ref(['1', '5', '10', '15', '20', '25', '50'])

const closeFilter = (e) => {
  document.querySelector('.VendasPage .btnFilter').click()
}
const tab = ref('vendas')
const searchTable = ref('')
const searchTabAllVendas = ref('')
const user = ref('')
const idDelete = ref()
const isLoading = ref(false)

const initialPagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
  sortBy: 'nome_cliente',
  descending: false,
})

const handleSort = (col) => {
  initialPagination.value.descending = !initialPagination.value.descending
  initialPagination.value.sortBy = col
}

const handleClickDelete = (id) => {
  idDelete.value = id
  dialogRef.value.show()
}

const handleDelete = () => {
  isLoading.value = true
  api
    .delete(`/venda/${idDelete.value}/`)
    .then((response) => {
      isLoading.value = false
      getAllSales({
        pagination: initialPaginationAllVendas.value,
      })
      getMySales({
        pagination: initialPagination.value,
      })
      Notify.create({
        type: 'positive',
        icon: '',
        iconColor: '#fff',
        message: `Venda deletada com sucesso :)`,
        position: 'top',
        timeout: 2500,
        html: true,
      })
      dialogRef.value.hide()
    })
    .catch((err) => {
      isLoading.value = false
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar deletar venda.`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
      return err
    })
}

const handleSortAll = (col) => {
  initialPaginationAllVendas.value.descending =
    !initialPaginationAllVendas.value.descending
  initialPaginationAllVendas.value.sortBy = col

  console.log('COLL', col)
  if (col === 'id') {
    initialPaginationAllVendas.value.descendingID
      ? (initialPaginationAllVendas.value.descendingID = false)
      : (initialPaginationAllVendas.value.descendingID = true)
  }
}

const handleStatusLine = (idVendedor) => {
  const result = vendedoresAcesso.value.some(
    (vendedor) => vendedor.id === idVendedor
  )
  return result
}

const initialPaginationAllVendas = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
  descendingID: true,
})
const optionsFilter = ref({
  vendedores,
  origens,
  regioes: regiao,
})

const filter = ref({
  vendedor: '',
  origem: '',
  bairro: [],
  regiao: [],
  dataRealizadaInicial: '',
  dataRealizadaFinal: '',
  dataPagamentoInicial: '',
  dataPagamentoFinal: '',
})

const handleClickEdit = (id) => {
  router.push({
    name: 'editar-venda',
    params: { id },
  })
}

const handleClickDetails = (id, idVendedor) => {
  // if (idVendedor) {
  //   if (!handleStatusLine(idVendedor)) return
  // }
  router.push({
    name: 'detalhes-venda',
    params: { id, mode: 'read' },
  })
}

const getAllSales = async (props) => {
  const { page, rowsPerPage, rowsNumber, sortBy, descendingID } =
    props.pagination
  const { data } = await api.get(
    `/venda/?search=${
      searchTabAllVendas.value || ''
    }&page=${page}&page_size=${rowsPerPage}&vendedor=${
      filter.value.vendedor || ''
    }&origem=${filter.value.origem || ''}&cliente__fk_bairro__regiao__in=${
      filter.value.regiao || ''
    }&cliente__fk_bairro=${filter.value.bairro || ''}&data_inicio_venda=${
      filter.value.dataRealizadaInicial || ''
    }&data_final_venda=${
      filter.value.dataRealizadaFinal
        ? filter.value.dataRealizadaFinal
        : filter.value.dataRealizadaInicial
        ? filter.value.dataRealizadaInicial
        : ''
    }&data_inicio_pagamento=${
      filter.value.dataPagamentoInicial || ''
    }&data_final_pagamento=${
      filter.value.dataPagamentoFinal
        ? filter.value.dataPagamentoFinal
        : filter.value.dataPagamentoInicial
        ? filter.value.dataPagamentoInicial
        : ''
    }&ordering=${descendingID ? '-id' : 'id'}`
  )

  const col = initialPaginationAllVendas.value.sortBy
  const sortFn = initialPaginationAllVendas.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  allSales.value = data.results.sort(sortFn)
  console.log('ALL SALES', data.results.sort(sortFn))
  initialPaginationAllVendas.value = {
    ...initialPaginationAllVendas.value,
    rowsNumber: data.count,
    page,
  }
  return data
}

// const handleSort = (evt, arr, col, type) => {

// }

watch(
  () => [tab.value],
  () => {
    filter.value = {
      bairro: [],
      origem: '',
      vendedor: '',
    }
    searchTabAllVendas.value = ''
    searchTable.value = ''
    getAllSales({
      pagination: initialPaginationAllVendas.value,
    })
    getMySales({
      pagination: initialPagination.value,
    })
  }
)

const initExportMyTable = async () => {
  console.warn('origem', filter.value.origem)
  const arrRegioes = filter.value.regiao?.map((regiao) => regiao)
  loadingExcel.value = true
  await prepareRel(
    `/venda/?search=${searchTable.value || ''}&page_size=999&vendedor=${
      filter.value.vendedor || ''
    }&origem=${filter.value.origem || ''}&cliente__fk_bairro__regiao__in=${
      filter.value.regiao ? arrRegioes : ''
    }&cliente__fk_bairro=${filter.value.bairro || ''}&vendedor__usuario=${
      currentUser.value.id
    }&data_inicio_venda=${
      filter.value.dataRealizadaInicial || ''
    }&data_final_venda=${
      filter.value.dataRealizadaFinal
        ? filter.value.dataRealizadaFinal
        : filter.value.dataRealizadaInicial
        ? filter.value.dataRealizadaInicial
        : ''
    }&data_inicio_pagamento=${
      filter.value.dataPagamentoInicial || ''
    }&data_final_pagamento=${
      filter.value.dataPagamentoFinal
        ? filter.value.dataPagamentoFinal
        : filter.value.dataPagamentoInicial
        ? filter.value.dataPagamentoInicial
        : ''
    }&ordering=-id`,
    'minhas_vendas'
  )
  loadingExcel.value = false
}

const initExportAllTable = async () => {
  const origemValue = filter.value.origem || ''
  const { descendingID } = initialPaginationAllVendas.value
  loadingExcel.value = true

  const arrRegioes = filter.value.regiao?.map((regiao) => regiao)
  await prepareRel(
    `/venda/?search=${
      searchTabAllVendas.value || ''
    }&page_size=999999&vendedor=${
      filter.value.vendedor || ''
    }&origem=${origemValue}&cliente__fk_bairro__regiao__in=${
      filter.value.regiao ? arrRegioes : ''
    }&cliente__fk_bairro=${filter.value.bairro || ''}&data_inicio_venda=${
      filter.value.dataRealizadaInicial || ''
    }&data_final_venda=${
      filter.value.dataRealizadaFinal
        ? filter.value.dataRealizadaFinal
        : filter.value.dataRealizadaInicial
        ? filter.value.dataRealizadaInicial
        : ''
    }&data_inicio_pagamento=${
      filter.value.dataPagamentoInicial || ''
    }&data_final_pagamento=${
      filter.value.dataPagamentoFinal
        ? filter.value.dataPagamentoFinal
        : filter.value.dataPagamentoInicial
        ? filter.value.dataPagamentoInicial
        : ''
    }&ordering=${descendingID ? '-id' : 'id'}`,
    'Todas_as_vendas'
  )
  loadingExcel.value = false
}

const initExportAllTableDelivery = async () => {
  const origemValue = filter.value.origem || ''
  const { descendingID } = initialPaginationAllVendas.value
  loadingExcel.value = true

  const arrRegioes = filter.value.regiao?.map((regiao) => regiao)
  await prepareRelTempoEntrega(
    `/venda/?search=${
      searchTabAllVendas.value || ''
    }&page_size=999999&vendedor=${
      filter.value.vendedor || ''
    }&origem=${origemValue}&cliente__fk_bairro__regiao__in=${
      filter.value.regiao ? arrRegioes : ''
    }&cliente__fk_bairro=${filter.value.bairro || ''}&data_inicio_venda=${
      filter.value.dataRealizadaInicial || ''
    }&data_final_venda=${
      filter.value.dataRealizadaFinal
        ? filter.value.dataRealizadaFinal
        : filter.value.dataRealizadaInicial
        ? filter.value.dataRealizadaInicial
        : ''
    }&data_inicio_pagamento=${
      filter.value.dataPagamentoInicial || ''
    }&data_final_pagamento=${
      filter.value.dataPagamentoFinal
        ? filter.value.dataPagamentoFinal
        : filter.value.dataPagamentoInicial
        ? filter.value.dataPagamentoInicial
        : ''
    }&ordering=${descendingID ? '-id' : 'id'}`,
    'Todas_as_vendas'
  )
  loadingExcel.value = false
}

const getMySales = async (props) => {
  if (currentUser.value.id === undefined) return
  const { page, rowsPerPage } = props.pagination

  const { data } = await api.get(
    // ?page=${page}&page_size=${rowsPerPage}&
    `/venda/?search=${
      searchTable.value || ''
    }&page=${page}&page_size=${rowsPerPage}&vendedor=${
      filter.value.vendedor || ''
    }&origem=${filter.value.origem || ''}&cliente__fk_bairro__regiao__in=${
      filter.value.regiao || ''
    }&cliente__fk_bairro=${filter.value.bairro || ''}&vendedor__usuario=${
      currentUser.value.id
    }&data_inicio_venda=${
      filter.value.dataRealizadaInicial || ''
    }&data_final_venda=${
      filter.value.dataRealizadaFinal
        ? filter.value.dataRealizadaFinal
        : filter.value.dataRealizadaInicial
        ? filter.value.dataRealizadaInicial
        : ''
    }&data_inicio_pagamento=${
      filter.value.dataPagamentoInicial || ''
    }&data_final_pagamento=${
      filter.value.dataPagamentoFinal
        ? filter.value.dataPagamentoFinal
        : filter.value.dataPagamentoInicial
        ? filter.value.dataPagamentoInicial
        : ''
    }&ordering=-id`
  )
  const col = initialPagination.value.sortBy
  const sortFn = initialPagination.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  mySales.value = data.results.sort(sortFn)

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    page,
  }

  return data
}

watch(
  () => [origens.value, vendedores.value, bairros.value, regiao.value],
  async () => {
    console.log('teste', vendedores.value)
    optionsFilter.value = {
      vendedores,
      origens,
      bairros,
      regioes: regiao,
    }
  }
)

watch(
  () => filter.value.regiao,
  (v) => {
    if (v) {
      getBairros({ regiao: v })
    }
  }
)

watch(
  () => modalTempoMedioRef.value?.state,
  (v) => {
    console.log('MODAL', v)
    if (v.open) {
      getBairros()
    }
  }
)

watch(
  () => [modelViewPerPage.value],
  async () => {
    initialPagination.value.rowsPerPage = modelViewPerPage.value || 5
    getMySales({ pagination: initialPagination.value })
  }
)

watch(
  () => [modelViewPerPageAllSales.value],
  async () => {
    initialPaginationAllVendas.value.rowsPerPage =
      modelViewPerPageAllSales.value || 5
    getAllSales({ pagination: initialPaginationAllVendas.value })
  }
)

const vendedoresAcesso = ref([])

const handleClickOpenModalTempoMedio = () => {
  console.log(modalTempoMedioRef)
  modalTempoMedioRef.value.setState({
    header: {
      hidden: false,
      title: 'Tempo médio de entrega',
    },
    data: {
      vendedores,
      regioes: regiao,
      bairros,
    },
    style: { width: '36.25rem', minHeight: '25rem' },
  })
  modalTempoMedioRef.value.open()
}

onMounted(async () => {
  user.value = await getDetailsCurrentUser()
  vendedoresAcesso.value = await getVendedores({ usuario: user.value.id })

  getRegiao()
  getVendedores()
  getOrigens()
  getAllSales({
    pagination: initialPaginationAllVendas.value,
  })
  getMySales({
    pagination: initialPagination.value,
  })
})
</script>

<style lang="sass">
.VendasPage
  @media(max-width: 767px)
    .q-table-control
      width: 100%
      margin-bottom: 8px
    .q-table__control
      width: 100%
    .div-title
      flex-direction: column
      gap: 1rem
      .new-venda
        width: 100%
  .q-table__control:nth-child(2)
    display: none
</style>
