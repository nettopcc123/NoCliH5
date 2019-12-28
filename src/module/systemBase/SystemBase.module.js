/**
 * Author: Fay(tigertop001@gmail.com)
 * Date: 2019/10/30
 * Last Modified by: Fay
 * Copyright (c) 2019, HuaSheng, Inc.
 *
 * Description: 系统基类
 */
// import '@m/tcaptcha/TCaptcha.module'; // 图形验证码
import { verifyCode } from '@m/http/Api.module' // api接口
import Observer from '@/module/observer/Observer.module';
class SystemBase extends Observer {
  constructor() {
    super();
  }
  getTCjs(){
    let captcha = document.getElementById('captcha');
    if(captcha) return
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.id = 'captcha';
    s.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
    document.body.appendChild(s);
  }

  verifyCode(username, code) { // 获取防水增墻验证码
    let param = {
      mobile: username,
      code: code
    }

  return new Promise((resolve, reject) => {
    verifyCode(param).then( response => {
      let res = response
      if(res.success == 1) {
        window.f.tips.success('验证码已发送');
        window.f.systemEvent.trigger('verifyCodeFirst', true);
      }else{
        let arr = ['300001', '300017', '300020']
        if(arr.includes(res.respCode)) {
          window.f.tips.error(res.respMsg)
          resolve(res)
          return
        }
        if(res.respCode == '300009') {
          const isEnv = process.env.NODE_ENV;
          let appId = '2073030387'
          if(isEnv == 'uat') appId = '2047397221'
          if(isEnv == 'prod') appId = '2091084354'
          var capuche1 = new TencentCaptcha(appId,
              (r) => {
                let parm = {
                  ticket: r.ticket,
                  randstr: r.randstr
                }
                Object.assign(param, parm)
                verifyCode(param).then( response => {  // 防水墙请求
                  let res = response
                  if(res.success == 1) {
                    window.f.systemEvent.trigger('verifyCodeSecond', true);
                    window.f.tips.success('验证码已发送');
                  }else{
                    window.f.tips.error(res.respMsg)
                    if(res.respCode == '300001') {
                      window.f.tips.error(res.respMsg)
                      resolve(res)
                      return
                    }
                    window.f.systemEvent.trigger('verifyCodeSecond', false);
                  }
                })
              }
          );
          capuche1.show();
          return
        }
        window.f.systemEvent.trigger('verifyCodeFirst', false);
      }
      resolve(res)
    })
  })

  }

}

SystemBase.of = function() {
  return new SystemBase();
};

export default SystemBase;