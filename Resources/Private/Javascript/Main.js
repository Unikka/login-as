import 'core-js/stable'
import 'regenerator-runtime/runtime'
import {UserModule, UserMenu} from './Components'
import {isNil} from './Helper'

document.addEventListener('DOMContentLoaded', function () {
    const initialize = () => {
        const userModuleContainer = document.querySelector(
            '.neos-module-administration-users'
        )
        if (!isNil(userModuleContainer)) {
            Array.from(userModuleContainer.querySelectorAll('.neos-table')).forEach(
                (_userModule) => {
                    if (!isNil(_userModule)) {
                        new UserModule(_userModule)
                    }
                }
            )
        }

        const userMenuContainer = document.querySelector(
            '#neos-top-bar .neos-user-menu'
        )
        if (!isNil(userMenuContainer)) {
            new UserMenu(userMenuContainer)
        }
    }

    if (window.Typo3Neos.I18n.initialized) {
        initialize()
    } else {
        const interval = setInterval(() => {
            if (window.Typo3Neos.I18n.initialized) {
                clearInterval(interval)
                initialize()
            }
        }, 50)
    }
})
