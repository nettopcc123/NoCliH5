const result = () => ({
  // 列表数据
  tableList: [],
  // 每页显示条数
  size: 20,
  // 总页数
  total: 0,
  // 当前页码
  page: 0,
  tableLoading: false,
  tableFinished: false,
  requestFinished: true
});

export { result };

export default {
  ...result(),
};
