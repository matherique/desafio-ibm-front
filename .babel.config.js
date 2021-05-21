module.exports = {
  "env": {
    "test": {
      "presets": ["next/babel"]
    }
  },
  "presets": [
    "next/babel", 
    "@babel/preset-typescript",
    "@babel/preset-env",
  ],
  "plugins": [["styled-components", { "ssr": true }]]
}
