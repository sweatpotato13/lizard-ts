<h1 align="center">Welcome to lizard-ts 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sweatpotato13/lizard-ts" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/???/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Ethersdcan API library with typescript

### 🏠 [Homepage](https://github.com/sweatpotato13/lizard-ts)

## Install

```sh
npm i lizard-ts
yarn add lizard-ts
```

## Run tests

```sh
yarn test
```

## Usage

```ts
const plain = randomPlaintext();
const m_transpose = scalarMultiplyVector(128, plain);

const key = keyGeneration();

const enc = encrypt(m_transpose, key.pk);
const dec = decrypt(enc, key.sk);

const ms = plain.toString();
const ts = dec.toString();
if (ms === ts) {
    console.log("success");
} else {
    console.log("failed");
}
```

## Author

👤 **CuteWisp <sweatpotato13@gmail.com>**

-   Website: Cutewisp.com
-   Github: [@sweatpotato13](https://github.com/sweatpotato13)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sweatpotato13/lizard-ts/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
