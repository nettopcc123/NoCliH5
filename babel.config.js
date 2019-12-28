module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    "transform-vue-jsx",
    ["@babel/plugin-transform-runtime",{
      "corejs": 2,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }],
    "@babel/plugin-syntax-dynamic-import",
  ]
};
