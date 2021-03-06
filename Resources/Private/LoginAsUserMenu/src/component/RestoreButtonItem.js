import React from 'react'
import ApiService from '@unikka/loginas-api'

import { Icon } from '@neos-project/react-ui-components'
import I18n from '@neos-project/neos-ui-i18n'

import buttonTheme from './dropdown.css'

const BASE_PATH = '/neos/impersonate/'

const restoreUser = (i18nRegistry, addFlashMessage) => {
    const { csrfToken } = document.getElementById('appContainer').dataset
    new ApiService(BASE_PATH, csrfToken)
        .callRestore()
        .then((data) => {
            const { origin, impersonate } = data
            const restoreMessage = i18nRegistry.translate(
                'success.restoreUser',
                'Switched back from {0} to the orginal user {1}.',
                {
                    0: impersonate.accountIdentifier,
                    1: origin.accountIdentifier,
                },
                'Unikka.LoginAs',
                'Main'
            )
            addFlashMessage(
                'restoreUserImpersonateUser',
                restoreMessage,
                'success'
            )

            // load default backend, so we don't need to care for the module permissions.
            // because in not every neos version the users have by default the content module or user module
            window.location.pathname = '/neos'
        })
        .catch(function (error) {
            const errorMessage = i18nRegistry.translate(
                'error.restoreUser',
                'Could not switch back to the original user.',
                {},
                'Unikka.LoginAs',
                'Main'
            )
            addFlashMessage('restoreUserImpersonateUser', errorMessage, 'error')
        })
}

const RestoreButtonItem = (props) => {
    const { user, i18nRegistry, addFlashMessage } = props

    const title = i18nRegistry.translate(
        'title.restoreUserButton',
        'Switch back to the orginal user account',
        {},
        'Unikka.LoginAs',
        'Main'
    )

    return user ? (
        <li className={buttonTheme.dropDown__item}>
            <button
                title={title}
                onClick={() => restoreUser(i18nRegistry, addFlashMessage)}
            >
                <Icon
                    icon="random"
                    aria-hidden="true"
                    className={buttonTheme.dropDown__itemIcon}
                />
                <I18n
                    id="label.restoreUserButton"
                    sourceName="Main"
                    packageKey="Unikka.LoginAs"
                    fallback={`Back to user "${user}"`}
                    params={{ 0: user }}
                />
            </button>
        </li>
    ) : null
}

export default RestoreButtonItem
