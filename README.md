<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/unikka/unikka.de/src/assets/unikka_with_background.svg" width="300" />
</p>

[![Packagist](https://img.shields.io/packagist/l/unikka/login-as.svg?style=flat-square)](https://packagist.org/packages/unikka/login-as)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/Unikka/login-as)
[![Packagist](https://img.shields.io/packagist/v/unikka/login-as.svg?style=flat-square)](https://packagist.org/packages/unikka/login-as)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# LoginAs package 

This package enables users to login as another user. So that the users can give better support. 

## Installation

```bash
composer require unikka/login-as --no-update
```

The --no-update command prevents the automatic update of the dependencies. After the package was added to your theme `composer.json`, go back to the root of the Neos installation and run composer update. Your desired package is now installed correctly.

## Configuration

```yaml
Unikka:
  LoginAs:

## Contribution

We'd love you to contribute to LoginAs. We try to make it as easy as possible.
We are using semantic versioning to have more time to concentrate on important stuff
instead of struggling in the dependency or release hell.

Therefore the first rule is to follow the [eslint commit message guideline](https://github.com/conventional-changelog-archived-repos/conventional-changelog-eslint/blob/master/convention.md).
It is really easy if you always commit via `yarn commit`. Commitizen will guide you.

All PRs will be merged into the master branch. Travis and semantic release will check the commit messages and start
building a new release when the analysis of the latest commits will trigger that.

If you have questions just ping us on Twitter or Github.

## About

The package is based on a pull request from Dominique Feyer (@dfeyer). We are thankful for the basis.

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
