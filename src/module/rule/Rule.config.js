const rulesConfig = [
  {
    name: 'tel',
    reg: /^1\d{10}$/,
    desc: '请输入11位手机号码'
  },
  {
    name: 'passWord',
    reg: /^([A-Za-z0-9]){6,12}$/,
    desc: '请输入6-12位数字和字母的密码'
  },
  {
    name: 'vcode',
    reg: /^\d{4}$/,
    desc: '请输入4位数字的验证码'
  },
  {
    name: 'realName',
    reg: /^([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]|[·]){1,19}$/,
    desc: '请输入2-20位中文可含特殊字符 . '
  },
  {
    name: 'bankCard',
    reg: /^([1-9]{1})(\d{14,18})$/,
    desc: '银行卡必须是15到19位的数字'
  },
  {
    name: 'wAmount',
    reg: /^\d+(\.\d{0,2})?$/,
    desc: '提款金额只能是数字或含两位小数'
  },
];
export default rulesConfig;
