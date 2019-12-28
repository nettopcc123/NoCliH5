/**
 * Author: Fay(tigertop001@gmail.com)
 * Date: 2019/10/30
 * Last Modified by: Fay
 * Copyright (c) 2019, HuaSheng, Inc.
 *
 * Description: 工具类
 */
import md5 from 'js-md5'  // 加密
let instance = null;
class Utils{
  constructor() {
    if(instance) {
      return instance;
    }
    instance = this;
  }
  /**
   * 滚动条动缓慢动画效果
   * @param {String} ns // 滚动条所在位置
   * @param {String} ref  // 选中dom
   * @param {Number} newScroll  // 最新滚动条位置
   * @param {Number} step  // 移动位置
   */
  toScroll(ns, ref, newScroll, step) {
    newScroll = ref.scrollTop
    ref.scrollTop = newScroll + 2
    if (newScroll < ns + step) {
     var c = setTimeout(()=>this.toScroll(ns, ref, newScroll, step),16);
    }else {
     clearTimeout(c);
    }
  }
  /**
   * 银行卡4位个空格
   * @param {String} str 
   */
  spacesForma(str) {
    return (str || 0).toString().replace(/(.)(?=(?:.{4})+$)/g, '$1 ')
  }

  /**
   * 除前四, 后四位可见, 其它转 * 不可见
   * @param {String} str 
   */
  numHid(str) {
    let reg = /^(.{4})(.*)(.{4})$/,
        s = '',
        f4 = '',
        e4 = ''
    str = str.replace(reg, function(a, b, c, d) {
      f4 = b
      e4 = d
      s = c.replace(/./g, "*");
    });
    return f4 + ' ' + this.spacesForma(s) + ' ' + e4 + ''
  }
  
  /**
   * 除前三, 后四位可见, 其它转 * 不可见
   * @param {String} str 
   */
  numHidf3l4(str) {
    let reg = /^(.{3})(.*)(.{4})$/,
        s = '',
        f4 = '',
        e4 = ''
    str = str.replace(reg, function(a, b, c, d) {
      f4 = b
      e4 = d
      s = c.replace(/./g, "*");
    });
    return f4 + ' ' + this.spacesForma(s) + ' ' + e4 + ''
  }

  /**
   * 加密
   * @param {String} a 
   */
  md5(a) {
    let saltstart = "W$!",  //定义一个salt值，程序员规定下来的随机字符串
        saltlast = "*&g@5",  //定义一个salt值，程序员规定下来的随机字符串
        b = saltstart + a + saltlast;  //把密码和salt连接
        b = md5(b);  //执行MD5散列
        return b;  //返回散列 
  }

  toNum(num) {
    let n = num + ''
    return  Number(n.replace(/,/g, ''))
  }
  thousandBitForma(str) {
    return (str || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  decimalForma(num, float) {
    let f = 1;
    if(float) f = float
    if(isNaN(num)) return
    let fLen = (f.toString()).length - 1;
    let total = 0, // 预定义返回变量
        n = Math.floor(parseFloat(num*f).toFixed(fLen)) // 数值 * 转换的小数位
    let zs = (Math.floor(n * f) / f).toString(); // 整数部分
    let s = f +'',
        slen = (s.length - 1) - zs.length
    let xs = zs.substring(zs.length - fLen, zs.length) // 小数部分
    if(slen > 0) {
      for(let i=0; i<slen; i++) {
        xs = `0${xs}`
      }
    }
    zs =  parseInt(zs / f)
    if(f == 1) {
      total = this.thousandBitForma(zs)
    }else{
      total = this.thousandBitForma(zs) + '.' + this.thousandBitForma(xs)  // 返回保留两位小数的值
    }
    return total // 返回转换后带小数位的值
  }
  formatAmount(v) {
    let vv = v
    if(v && isNaN(v)) vv = v.replace(/,/g, '')
    let  num = this.decimalForma(vv, 100)
    if(!num) num = '0.00'
    return num
  }

  /**
   * 获取地址栏url参数
   * @param {String} name 
  */
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; // 返回参数值
  }

  /**
   * 是否开启cookies
  */
  cookieEnable() {
    var result=false;   
    if(navigator.cookiesEnabled)  return true;   
    document.cookie = "testcookie=yes;";   
    var cookieSet = document.cookie;   
    if (cookieSet.indexOf("testcookie=yes") > -1)  result=true;   
    document.cookie = "";   
    return result;   
  }

  /** 
   * 区间随机数
  */
  randomNumber(max,min) {
    let num = parseInt(Math.random()*(max-min+1)+min,10)
    return num
  }

 /**
  * 键盘显示页面往上移
  */
  shiftUp(v,upVal) {
    let val = upVal || 0
    if(v) {
      let arr = document.querySelectorAll('.shift-up')
      for(let i = 0; i < arr.length; i++) {
        arr[i].style.cssText = 
        `margin-top: -${val}rem;padding-bottom: ${val}rem;
         transition: all 0.4s;
        `
      }
    }else{
      let arr = document.querySelectorAll('.shift-up')
      for(let i = 0; i < arr.length; i++) {
        arr[i].style.cssText = `margin-top: 0rem;padding-bottom: 0rem;transition: all 0.4s;`
      }
    }
  }
}
Utils.of = function() {
  return new Utils();
}
window.utils = Utils;
export default Utils;