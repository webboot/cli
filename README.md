## @webboot/cli

[webboot](https://webboot.github.io) command line interface.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@webboot/cli.svg
[npm-url]: https://www.npmjs.com/package/@webboot/cli
[travis-image]: https://img.shields.io/travis/com/webboot/cli/master
[travis-url]: https://travis-ci.com/webboot/cli
[appveyor-image]: https://img.shields.io/appveyor/ci/webboot/cli/master.svg
[appveyor-url]: https://ci.appveyor.com/project/webboot/cli/branch/master
[coveralls-image]: https://coveralls.io/repos/github/webboot/cli/badge.svg
[coveralls-url]: https://coveralls.io/github/webboot/cli
[greenkeeper-image]: https://badges.greenkeeper.io/webboot/cli.svg
[greenkeeper-url]: https://badges.greenkeeper.io/webboot/cli.svg
[snyk-image]: https://snyk.io/test/github/webboot/cli/badge.svg
[snyk-url]: https://snyk.io/test/github/webboot/cli


* [install](#install)
* [usage](#usage)
* [cli](#cli)
  * [generate](#cli-generate)
  * [verify](#cli-verify)
  * [sign](#cli-sign)
  * [release](#cli-release)

## <a name="install"></a>install

```bash
// globally installed cli
npm install -g @webboot/cli

// locally in your app
npm install --save-dev --save-exact @webboot/cli
```

## <a name="usage"></a>usage
after installing globally, `webboot` will be available as an executable on the PATH.

if installed as local app npm dependency, `webboot`
will be available in package.json npm run scripts,
and installed in node_modules/.bin/webboot.

### ## <a name="cli"></a>cli

./docs is the default directory to build hashes for.

#### <a name="cli-generate"></a>generate
generate sri-hashes.json
```bash
webboot generate --dir docs
```

#### <a name="cli-verify"></a>verify
verify sri-hashes.json
```bash
webboot verify --dir docs
```

#### <a name="cli-sign"></a>sign
sign sri-hashes.json
```bash
webboot sign --dir docs
```

#### <a name="cli-release"></a>release
release sri-hashes.json to the webboot network
```bash
webboot release --dir docs
```

### changelog

#### 0.0.1-alpha.0
preview release.

#### 0.0.1-alpha.1
use npm packages for @webboot dependencies

#### 0.0.1-alpha.2
update dependencies

#### 0.0.1-alpha.3
update dependencies

#### 0.0.1 - unreleased
first release
