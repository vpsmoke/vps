const dev = process.env.development

export const menuList = [
  {
    title: 'Cadastrar venda',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_add_menulist',
    href: '/',
    access: ['Pode acessar a página de Cadastrar Vendas'],
  },
  {
    title: 'Vendas',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_vendas_menulist',
    href: '/listagem-vendas',
    access: ['Pode acessar a página de Vendas'],
  },
  {
    title: 'Clientes',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_clientes',
    href: '/clientes',
    access: ['Pode acessar a página de Clientes'],
  },
  {
    title: 'Cadastrar compra',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_shopping',
    href: '/cadastrar-compra',
    access: ['Pode acessar a página de Cadastrar Compras'],
  },
  {
    title: 'Contas a receber',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_clock_time',
    href: '/contas-receber',
    access: ['Pode acessar a página de Contas a Receber'],
  },
  {
    title: 'Contas a pagar',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_clock_time',
    href: '/contas-pagar',
    // access: ['Pode acessar a página de Contas a Receber']
  },
  {
    title: 'Desempenho por produto',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_desempenho_produto_menulist',
    href: '/desempenho/por-produto',
    access: ['Pode acessar a página de Desempenho por Produto'],
  },
  {
    title: 'Desempenho por vendedor',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_desempenho_regiao_menulist',
    href: '/desempenho/por-vendedor',
    access: ['Pode acessar a página de Desempenho por Vendedor'],
  },
  // {
  //   title: 'Desempenho por região',
  //   nivel: 0,
  //   icon: 'svguse:/icons.svg#icon_desempenho_vendedor_menulist',
  //   href: '/desempenho/por-regiao',
  //   access: ['Pode acessar a página de Desempenho por Região']
  // },
  {
    title: 'Resultado por cliente',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_resultado_cliente_menulist',
    href: '/resultado-por-cliente',
    access: ['Pode acessar a página de Resultado por Cliente'],
  },
  // {
  //   title: 'Fluxo de caixa',
  //   nivel: 0,
  //   icon: 'svguse:/icons.svg#icon_fluxo_caixa_menulist',
  //   href: '/fluxo-caixa',
  // },
  {
    title: 'DRE',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_dre_menulist',
    href: '/dre',
    access: ['Pode acessar a página de DRE'],
  },
  {
    title: 'Estoque',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_estoque_menulist',
    href: '/estoque',
    access: ['Pode acessar a página de Estoque'],
  },
  {
    title: 'Saldo caixa',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_saldo_caixa_menulist',
    href: '/saldo-caixa',
    access: ['Pode acessar a página de Saldo Caixa'],
  },
  {
    title: 'Calculo Margens',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_saldo_caixa_menulist',
    href: '/calculo-margem',
    access: ['Pode acessar a página de Saldo Caixa'],
  },
  {
    title: 'Admin',
    nivel: 0,
    icon: 'svguse:/icons.svg#icon_settings_ms',
    external: process.env.BACKEND_URL + '/admin',
  },

  // {
  //   title: 'Financeiro',
  //   nivel: 0,
  //   icon: 'credit_score',
  //   submenu: [
  //     {
  //       title: 'Calendário de Produção',
  //       nivel: 1,
  //       add: '#',
  //       list: '#',
  //     },
  //     {
  //       title: 'Produtos  nivel: 1',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'Produtos nivel: 2',
  //           nivel: 2,
  //         },
  //         {
  //           title: 'Sub Produtos',
  //           nivel: 2,
  //         },
  //         {
  //           title: 'Insumo',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Previsão de Consumo   nivel: 1,',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'Previsão de Consumo  nivel: 2',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'NF de entrada',
  //       // link: 'https://www.google.com',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'NF de entrada',
  //           // link: 'https://www.google.com',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //   ],
  // },
]

if (dev)
  menuList.push({
    title: 'Design system',
    nivel: 0,
    icon: 'design_services',
    href: '/design-system',
  })
