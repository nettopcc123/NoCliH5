import IndexPage from '@p/home/Index.view.vue';
const vueComponentIndexPage = () => import('@p/home/Index.view.vue');
const vueComponentHomePage = () => import('@p/home/Main.view.vue');
const vueComponentSportMain = () => import('@p/home/SportMain.view.vue');
const vueComponentLogin = () => import('@p/login/Login.view.vue');
const vueComponentLoginVerif = () => import('@p/login/LoginVerif.view.vue');
const vueComponentForgetPwd = () => import('@p/login/ForgetPwd.view.vue');
const vueComponentRegistered = () => import('@p/login/Registered.view.vue');
const vueComponentMember = () => import('@p/member/Member.view.vue');
const vueComponentPersonalInfo = () => import('@p/member/PersonalInfo.view.vue');
const vueComponentAbout = () => import('@p/member/About.view.vue');
const vueComponentWallet = () => import('@p/member/Wallet.view.vue');
const vueComponentBetRecord = () => import('@p/member/BetRecord.view.vue');
const vueComponentPrefer = () => import('@p/preferential/Prefer.view.vue');
const vueComponentFundRecord = () => import('@p/member/FundRecord.view.vue');
const vueComponentRecharge = () => import('@p/member/Recharge.view.vue');
const vueComponentFundDetails = () => import('@p/member/FundDetails.view.vue');
const vueComponentFundBank = () => import('@p/member/FundBank.view.vue');
const vueComponentWithdrawal = () => import('@p/member/withdrawal/Withdrawal.view.vue');
const vueComponentWithdrawPwd = () => import('@p/member/pwd/WithdrawPwd.view.vue');
const vueComponentChangeLoginPwd = () => import('@p/member/pwd/ChangeLoginPwd.view.vue');
const vueComponentChangeWithPwd = () => import('@p/member/pwd/ChangeWithPwd.view.vue');
const vueComponentBindBank = () => import('@p/member/bindBank/BindBank.view.vue');
const vueComponentBankBranch = () => import('@p/member/bindBank/BankBranch.view.vue');
const vueComponentLinkUrl = () => import('@p/linkUrl/LinkUrl.view.vue');


export default [
  {
    name: 'home',
    path: '/',
    component: IndexPage,
  },
  {
    name: 'index',
    path: '/index',
    component: IndexPage,
  },
  {
    name: 'main',
    path: '/main',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentHomePage().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    name: 'sportMain',
    path: '/sportMain',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentSportMain().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/login',
    name: 'login',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentLogin().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/loginverif',
    name: 'loginverif',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentLoginVerif().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentForgetPwd().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/registered',
    name: 'registered',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentRegistered().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/member',
    name: 'member',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentMember().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentPersonalInfo().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/about',
    name: 'about',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentAbout().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/wallet',
    name: 'wallet',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentWallet().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/betRecord',
    name: 'betRecord',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentBetRecord().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/prefer',
    name: 'prefer',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentPrefer().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/fundrecord',
    name: 'fundrecord',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentFundRecord().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/recharge',
    name: 'recharge',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentRecharge().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/fundDetails',
    name: 'fundDetails',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentFundDetails().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/fundBank',
    name: 'fundBank',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentFundBank().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentWithdrawal().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/withdrawPwd',
    name: 'withdrawPwd',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentWithdrawPwd().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/changeLoginPwd',
    name: 'changeLoginPwd',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentChangeLoginPwd().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/changeWithPwd',
    name: 'changeWithPwd',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentChangeWithPwd().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/bindBank',
    name: 'bindBank',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentBindBank().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/bankBranch',
    name: 'bankBranch',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentBankBranch().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: '/linkUrl',
    name: 'linkUrl',
    async(routeTo, routeFrom, resolve, reject) {
      vueComponentLinkUrl().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
];