// import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutHome from 'src/layouts/LayoutHome.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'
import PageBlank from 'src/pages/Blank/PageBlank.vue'
import CadastrarVenda from 'src/pages/Home/Vendas/CadastrarVenda/CadastrarVenda.vue'
import CadastrarCompra from 'src/pages/Home/CadastrarCompra/CadastrarCompra.vue'
import ListagemVendas from 'src/pages/Home/Vendas/VendasPage.vue'
import EstoquePage from 'src/pages/Home/Estoque/EstoquePage.vue'
import SaldoCaixaPage from 'src/pages/Home/SaldoCaixa/SaldoCaixa.vue'
import DrePage from 'src/pages/Home/DRE/DrePage.vue'
import FluxoCaixa from 'src/pages/Home/FluxoCaixa/FluxoCaixa.vue'
import ResultadoCliente from 'src/pages/Home/ResultadoCliente/ResultadoCliente.vue'
import DesempenhoVendedorPage from 'src/pages/Home/Desempenho/porVendedor/porVendedor.vue'
import DesempenhoProdutoPage from 'src/pages/Home/Desempenho/porProduto/porProduto.vue'
import ContasReceberPage from 'src/pages/Home/ContasReceber/ContasReceber.vue'
import ContasPagarPage from 'src/pages/Home/ContasAPagar/ContasAPagar.vue'
import DesempenhoRegiaoPage from 'src/pages/Home/Desempenho/porRegiao/porRegiao.vue'
import ResetPasswordPage from 'src/pages/ResetPassword/PageResetPassword.vue'
import ClientesPage from 'src/pages/Home/Clientes/ClientesPage.vue'

export const routes = [
  {
    path: '/design-system',
    component: () => import('src/pages/DesignSystem/DesignSystem.vue'),
  },
  {
    name: 'home',
    redirect: '/',
    path: '/',
    children: [
      {
        path: '/',
        component: CadastrarVenda,
        name: 'cadastrar-venda',
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Cadastrar venda', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Cadastrar venda', name: '' }],
          title: 'Cadastrar venda',
        },
        props: true,
      },
      {
        path: '/:id',
        component: CadastrarVenda,
        name: 'editar-venda',
        access: 'Pode acessar a página de Cadastrar Vendas',
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Atualizar venda', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Atualizar venda', name: '' }],
          title: 'Atualizar venda',
        },
        props: true,
      },
      {
        path: '/:id/:mode',
        component: CadastrarVenda,
        name: 'detalhes-venda',
        access: 'Pode acessar a página de Cadastrar Vendas',
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Conferir venda', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Conferir venda', name: '' }],
          title: 'Conferir venda',
        },
        props: true,
      },
      {
        path: '/contas-receber',
        component: ContasReceberPage,
        access: ['Pode acessar a página de Contas a Receber'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Contas a receber', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Contas a receber', name: '' }],
          title: 'Contas a receber',
        },
      },

      {
        path: '/contas-pagar',
        component: ContasPagarPage,
        // access: ['Pode acessar a página de Contas a Receber'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Contas a pagar', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Contas a pagar', name: '' }],
          title: 'Contas a pagar',
        },
      },
      {
        path: '/clientes',
        component: ClientesPage,
        access: ['Pode acessar a página de Clientes'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Clientes', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Clientes', name: '' }],
          title: 'Clientes',
        },
      },
      {
        path: '/desempenho/por-vendedor',
        component: DesempenhoVendedorPage,
        access: ['Pode acessar a página de Desempenho por Vendedor'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Desempenho por vendedor', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Desempenho por vendedor', name: '' }],
          title: 'Desempenho por vendedor',
        },
      },
      {
        path: '/desempenho/por-produto',
        component: DesempenhoProdutoPage,
        access: ['Pode acessar a página de Desempenho por Produto'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Desempenho por produto', name: '' },
          ],
          title: 'Desempenho por produto',
          breadcrumbsMobile: [{ label: 'Desempenho por produto', name: '' }],
        },
      },
      {
        path: '/desempenho/por-regiao',
        component: DesempenhoRegiaoPage,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Desempenho por região', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Desempenho por região', name: '' }],
          itle: 'Desempenho por região',
        },
      },
      {
        path: '/resultado-por-cliente',
        component: ResultadoCliente,
        access: ['Pode acessar a página de Resultado por Cliente'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Resultado por cliente', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Resultado por cliente', name: '' }],
          title: 'Resultado por cliente',
        },
      },
      {
        path: '/dre',
        component: DrePage,
        access: ['Pode acessar a página de DRE'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Demostração Resultado do Exercício', name: '' },
          ],
          breadcrumbsMobile: [
            { label: 'Demostração Resultado do Exercício', name: '' },
          ],
          title: 'Demostração Resultado do Exercício',
        },
      },

      {
        path: '/cadastrar-compra',
        component: CadastrarCompra,
        access: ['Pode acessar a página de Cadastrar Compras'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Cadastrar compra', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Cadastrar compra', name: '' }],
          title: 'Cadastrar compra',
        },
      },
      {
        path: '/saldo-caixa',
        component: SaldoCaixaPage,
        access: ['Pode acessar a página de Saldo Caixa'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Saldo caixa', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Saldo caixa', name: '' }],
          title: 'Saldo de caixa',
        },
      },
      {
        path: '/calculo-margem',
        component: () => import('src/pages/Home/Margens/CalculoMargens.vue'),
        access: ['Pode acessar a página de Saldo Caixa'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Calculo Margem', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Calculo Margem', name: '' }],
          title: 'Calculo Margem',
        },
      },
      {
        path: '/estoque',
        component: EstoquePage,
        access: ['Pode acessar a página de Estoque'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Estoque', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Estoque', name: '' }],
          title: 'Estoque',
        },
      },
      {
        path: '/listagem-vendas',
        component: ListagemVendas,
        access: ['Pode acessar a página de Vendas'],
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Vendas', name: '' },
          ],
          breadcrumbsMobile: [{ label: 'Vendas', name: '' }],
          title: 'Vendas',
        },
      },
    ],
    component: LayoutHome,
  },

  {
    path: '/login',
    name: 'login',
    component: PageLogin,
    meta: {
      title: 'Login',
    },
    // meta: { transition: 'slide-right' },
  },

  {
    path: '/password/reset/confirm/:uid/:token',
    name: 'redefinir-senha',
    component: ResetPasswordPage,
    meta: {
      title: 'Redefinir senha',
    },
    props: true,
    strict: true,
  },

  { path: '/:pathMatch(.*)*', component: PageBlank },
]

export default routes
