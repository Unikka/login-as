## [2.0.1](https://github.com/unikka/login-as/compare/v2.0.0...v2.0.1) (2021-03-09)


### Build

* Add CodeQL test ([186f0fe](https://github.com/unikka/login-as/commit/186f0fe1ffae0769f6161b30509f548a8d7fb37f))

### Fix

* Limit LayoutPath override to packages of Neos/Neos ([c75c93b](https://github.com/unikka/login-as/commit/c75c93b23b3c1ad320b7ae49a7bda7fed7fd2a68)), closes [#9](https://github.com/unikka/login-as/issues/9)

# [2.0.0](https://github.com/unikka/login-as/compare/v1.2.2...v2.0.0) (2021-03-06)


### Breaking

* Change license from MIT to GPL-3.0 ([c3c5658](https://github.com/unikka/login-as/commit/c3c5658d9fbb31c293eac912d8102cb014dc7cea))

### Build

* Add compiled assets ([6334212](https://github.com/unikka/login-as/commit/63342122c058d11c6bfdd61b89c09a73226d2faa))
* Add react-ui plugin node_modules to the git ignore list ([d61c693](https://github.com/unikka/login-as/commit/d61c6935022847611455deea1e844726df937c40))

### Docs

* Document the new features of the package ([5757eab](https://github.com/unikka/login-as/commit/5757eabb775fcd5a75940e3ba9661f80e1829033))

### Fix

* Remove console.log ([98a14ce](https://github.com/unikka/login-as/commit/98a14ce5de48c9fd05c772b4b8b556537edb0d11))
* Remove unused action impersonateWithResponse ([f68b571](https://github.com/unikka/login-as/commit/f68b5717a09d814387df7d6a80e1ca968b467c44))

### New

* Add neos 7 as compatible version ([5def263](https://github.com/unikka/login-as/commit/5def263ac2b184ea35c2eda5b1b19cc08148dc4e))
* Add new react-ui extension for the user menu ([a4abda0](https://github.com/unikka/login-as/commit/a4abda09acfaa73c0e4883f24677c6623624ab68))
* Add restore button label and some translations ([1dfeb5b](https://github.com/unikka/login-as/commit/1dfeb5b6de92ccbeda1c1c1c0919a196afd36e2c))
* Add restore button title translations ([40e1ca5](https://github.com/unikka/login-as/commit/40e1ca5b1de16560449038fdc4abf755a6a264b6))
* Extract API service to own package ([0c44d3f](https://github.com/unikka/login-as/commit/0c44d3ffffc85c97631ee89a4ea8f0fed1250d03))

### Upgrade

* Update @unikka/loginas-api to version 1.1.0 ([1bd425d](https://github.com/unikka/login-as/commit/1bd425d9807debcec8e8b8a9f2f8bf56e7737ec5))

## [1.2.2](https://github.com/unikka/login-as/compare/v1.2.1...v1.2.2) (2021-02-25)


### Fix

* Uncomment reload action on restore or impersonate of a user ([5270191](https://github.com/unikka/login-as/commit/5270191e73a2f07755083b5c84d65b010384803c))

## [1.2.1](https://github.com/unikka/login-as/compare/v1.2.0...v1.2.1) (2021-02-25)


### Fix

* Add missing javascript assets ([52d45dc](https://github.com/unikka/login-as/commit/52d45dcba0d3d5ff4a29723d555cefefba668502))

# [1.2.0](https://github.com/unikka/login-as/compare/v1.1.0...v1.2.0) (2021-02-25)


### Build

* Add public JS assets and the .cache folder to git ignore ([9da6929](https://github.com/unikka/login-as/commit/9da69293992a6b71a74cbc1927a8dbb3ab126b70))
* Adding prettier as dependency ([7ca36a2](https://github.com/unikka/login-as/commit/7ca36a290908e8ba1de5a854679e18e70d820eb5))

### Fix

* Make the package work with neos 5.3 ([b7fc59d](https://github.com/unikka/login-as/commit/b7fc59dbc08213b235d6c17527f0fc876466b25e))
* Prevent ReadableStream as endpoint response ([f67614f](https://github.com/unikka/login-as/commit/f67614f6bffa9b5b5033c6b64c101ca05fc74c9a))
* Prevent usage in teh media module and history module ([73578b6](https://github.com/unikka/login-as/commit/73578b6c9cbf55d54242a1cdbb11965ea86b5a75))

### New

* Add new localisations ([f1b7c53](https://github.com/unikka/login-as/commit/f1b7c5386f7ef803833076ba81e067cafaf9c785))
* Add parcel bundler for assets ([414ff66](https://github.com/unikka/login-as/commit/414ff66ff72fefefa64b64737d6edb90d0326bbb))
* Implement backend action to impersonate users ([95668ca](https://github.com/unikka/login-as/commit/95668ca36ceae5c596add99bd126879402c003e3))
* Implement basic javascript component for the user module ([1abe72f](https://github.com/unikka/login-as/commit/1abe72fc047601b94fa83a43cdae660b3802f0c6))
* Implement user restore and add button to the user module ([c52447f](https://github.com/unikka/login-as/commit/c52447f264fa54582d63613ac0f75b28aede60ba))
* Override Neos.Neos Layout to generally add javascript sources ([7104628](https://github.com/unikka/login-as/commit/71046281c3a5743b5e316c4873f52090fa3a6171))

### Update

* Adds neos 4.3 to supported versions ([d6a6f8c](https://github.com/unikka/login-as/commit/d6a6f8c26530c4475950dd22aad5e17e1ba48623))

# [1.1.0](https://github.com/unikka/login-as/compare/v1.0.2...v1.1.0) (2020-10-28)


### New

* Ignore some file on export ([d197af6](https://github.com/unikka/login-as/commit/d197af6a71315103a92d043e269bf55917867e57))

## [1.0.2](https://github.com/unikka/login-as/compare/v1.0.1...v1.0.2) (2020-08-05)


### Fix

* Prevent redirect when still in impersonate mode ([407fbbe](https://github.com/unikka/login-as/commit/407fbbecb3efdef9a152112b32be79b056feaa43))

## [1.0.1](https://github.com/unikka/login-as/compare/v1.0.0...v1.0.1) (2020-06-04)


### Fix

* Redirect to configured action ([b96c86b](https://github.com/unikka/login-as/commit/b96c86bf46d4ad6f263810c8b585eac8ac132fde))

# 1.0.0 (2020-06-04)


### Build

* Remove yarn build command from circleCI ([67f98e4](https://github.com/unikka/login-as/commit/67f98e4a1b7a6be40e7b03ff7bcf601ca1f3b908))

### Chore

* Optimize redirect option handling ([7cde234](https://github.com/unikka/login-as/commit/7cde234a31cd521057c989f9869c3c58d0b1ba0b))

### Docs

* Adding example config for redirect options ([83f8484](https://github.com/unikka/login-as/commit/83f848455fe869e0e6e26cafc91d5bcb4a3d2955))

### FEATURE

* Adding policies for the impersonate and restore action ([2d76ae3](https://github.com/unikka/login-as/commit/2d76ae3ccb537d6e73846ded0779d1bae888c53d))
* Implement Impersonate Service with controller ([b111fa5](https://github.com/unikka/login-as/commit/b111fa5fb8f7c9f8aa4502daa464ea8c822a4515))
* Initial commit with package skeleton ([2c7bc5d](https://github.com/unikka/login-as/commit/2c7bc5decf8fde77a73c55c4ef371b595be9fa1f))

### Upgrade

* Upgrade dependencies for sematic release and commitizen ([26d92d0](https://github.com/unikka/login-as/commit/26d92d0ad8987e7c186b8a10e1a10339a2666fc2))
