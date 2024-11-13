import { api } from 'src/boot/axios'
import { exportExcel } from 'src/utils/exportExcel'

export const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID do cliente',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'nome',
    required: true,
    label: 'Nome',
    align: 'left',
    field: 'nome',
    sortable: true,
  },
  {
    name: 'data_nascimento',
    required: true,
    label: 'Data de nascimento',
    align: 'left',
    field: 'data_nascimento',
    sortable: true,
  },
  {
    name: 'genero',
    required: true,
    label: 'Gênero',
    align: 'left',
    field: 'genero',
    sortable: true,
  },
  {
    name: 'whatsapp',
    required: true,
    label: 'Whatsapp',
    align: 'left',
    field: 'whatsapp',
    sortable: true,
  },
  {
    name: 'bairro',
    required: true,
    label: 'Bairro',
    align: 'left',
    field: 'bairro',
    sortable: true,
  },

  {
    name: 'ultimo_vendedor',
    align: 'left',
    label: 'Vendedor',
    field: 'ultimo_vendedor',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: '',
    field: 'actions',
  },
]
export const prepareRel = async (url, name) => {
  const {
    data: { results },
  } = await api.get(url)

  const objs = results.map((obj) => ({
    id: obj.id,
    nome: obj.nome,
    data_nascimento: obj.data_nascimento,
    genero: obj.genero,
    whatsapp: obj?.whatsapp,
    bairro: obj.bairro,
    email: obj.email,
    vendedor: obj.ultimo_vendedor,
  }))
  await exportExcel(objs, name)
  return true
}
