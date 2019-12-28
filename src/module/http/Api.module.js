import request from '@m/http/Request.module'
import qs from 'qs';

export function loginByPwd(param) { // 密码登入
  return request({
    url: '/api/ca4/front/h5/login',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function loginByCode(param) { // 验证码登入
  return request({
    url: '/api/ca4/front/h5/mobileLogin',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function verifyCode(param) { // 验证码
  return request({
    url: '/api/ca4/front/h5/verifiyCode',
    method: 'post',
    data: qs.stringify(param)
  })
}
 
export function register(param) { // 注册
  return request({
    url: '/api/ca4/front/h5/register',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function forgetPwd(param) { // 忘记密码
  return request({
    url: '/api/ca4/front/h5/forgetPasswd',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function logout() { // 退出登录
  return request({
    url: '/api/ca4/front/h5/logout',
    method: 'post'
  })
}

export function notice() { // 弹窗公告
  return request({
    url: '/api/ca4/front/h5/notice',
    method: 'post'
  })
}

export function getHomeUrl() { // 门户
  return request({
    url: '/api/ca4/front/h5/home',
    method: 'post'
  })
}

export function account() { // 个人中心
  return request({
    url: '/api/ca4/front/h5/account',
    method: 'post'
  })
}

export function accountRefresh() { // 总资产刷新
  return request({
    url: '/api/ca4/front/h5/accountRefresh',
    method: 'post'
  })
}

export function memberInfo() { // 个人资料
  return request({
    url: '/api/ca4/front/h5/memberInfo',
    method: 'post'
  })
}

export function perferent(param) { // 优惠活动
  return request({
    url: '/api/ca4/front/h5/findActivityList',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function perferentDetails(param) { // 优惠活动详细列表
  return request({
    url: '/api/ca4/front/h5/findArticleById',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function fundRecord(param) { // 资金记录
  return request({
    url: '/api/ca4/front/h5/findAllTradePage',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function fundDetail(param) { // 订单详情
  return request({
    url: '/api/ca4/front/h5/tradeDetail',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function rechargeList() { // 获取充值列表
  return request({
    url: '/api/ca4/front/h5/findPayTypeList',
    method: 'post',
    data: qs.stringify()
  })
}

export function recharge(param) { // 充值
  return request({
    url: '/api/ca4/front/h5/pay',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function toWithdrawal() { // 进入提款页面
  return request({
    url: '/api/ca4/front/h5/toDraw',
    method: 'post',
    data: qs.stringify()
  })
}

export function recover() { // 一键回收
  return request({
    url: '/api/ca4/front/h5/recover',
    method: 'post',
    data: qs.stringify()
  })
}

export function transferTo(data) { // 转账
  return request({
    url: '/api/ca4/front/h5/transferTo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function readBank(param) { // 识别银行卡
  return request({
    url: '/api/ca4/front/h5/readBank',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function findBankArea() { // 识别配置信息
  return request({
    url: '/api/ca4/front/h5/findBankArea',
    method: 'post',
  })
}

export function addBankCard(param) { // 【新增】银行卡
  return request({
    url: '/api/ca4/front/h5/persistBank',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function modifyBankCard(param) { // 【修改】银行卡
  return request({
    url: '/api/ca4/front/h5/mergeBank',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function addDrawPwd(param) { // 无提款密码
  return request({
    url: '/api/ca4/front/h5/persistDrawPasswd',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function modifyDrawPwd(param) { // 有提款密码
  return request({
    url: '/api/ca4/front/h5/mergerDrawPasswd',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function modifyLoginPwd(param) { // 修改登录密码
  return request({
    url: '/api/ca4/front/h5/mergerPasswd',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function withdraw(param) { // 提款
  return request({
    url: '/api/ca4/front/h5/withdraw',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function betRecord(param) { // 投注记录查询
  return request({
    url: '/api/ca4/front/h5/findOrderBetPage',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function findOrderBetDetail(param) { // 投注详情
  return request({
    url: '/api/ca4/front/h5/findOrderBetDetail',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function cancelOrder(param) { // 取消订单
  return request({
    url: '/api/ca4/front/h5/cancalDepositTrade',
    method: 'post',
    data: qs.stringify(param)
  })
}


export function broadNotice(param) { // 门户-跑马灯【新】
  return request({
    url: '/api/ca4/front/h5/broadNotice',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function homeBanner(param) { // 门户-banner【新】
  return request({
    url: '/api/ca4/front/h5/banner',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function bannerHot(param) { // 热门赛事
  return request({
    url: '/api/ca4/front/h5/bannerHot',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function historyNotice(param) { // 历史公告【新】
  return request({
    url: '/api/ca4/front/h5/historyNotice',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function loginRG() { // 登录RG
  return request({
    url: '/api/ca4/front/h5/loginRG',
    method: 'post'
  })
}


export function loginJBB(param) { // 登录JBB
  return request({
    url: '/api/ca4/front/h5/loginJBB',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function getHit() { // 个人中心验证是否在线
  return request({
    url: '/api/ca4/front/h5/hit',
    method: 'post'
  })
}

export function centerAmount() { // 中心钱包
  return request({
    url: '/api/ca4/front/h5/centerAmount',
    method: 'post'
  })
}

