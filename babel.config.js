module.exports = {
  presets: [
    [
      "next/babel",
      {
        "@babel/preset-typescript": {},
        "@babel/preset-env": {
          targets: {
            node: "current",
          },
        },
      },
    ],
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "~": "./src",
        },
      },
    ],
  ],
};
