import {isNil} from '../Helper'
import ApiService from '../Service/ApiService'
import {ImpersonateButton} from '../Templates/ImpersonateButton'

export default class UserModule {
    constructor(_root) {
        const csfrTokenField = _root.querySelector('input[name="__csrfToken"]')
        this._root = _root
        this._csrfToken = !isNil(csfrTokenField) ? csfrTokenField.getAttribute('value') : ''
        this._apiService = new ApiService(this._csrfToken)

        if (!isNil(_root)) {
            this._initialize()
        }
    }

    _initialize() {
        this._renderImpersonateButtons()
        this._setupEventListeners()
    }

    _setupEventListeners() {
        const impersonateButtons = this._root.querySelectorAll('button.impersonate-user')
        impersonateButtons.forEach(_impersonateButton => {
            _impersonateButton.addEventListener('click', this._impersonateUser.bind(this));
        });
    }

    _renderImpersonateButtons() {
        const userTableActionButtons = Array.from(this._root.querySelectorAll('.neos-table .neos-action'))
        userTableActionButtons.forEach(_actionContainer => {
            const deleteButton = _actionContainer.querySelector('button.neos-button-danger')
            const showButton = _actionContainer.querySelector('a[href*="administration/users/show"]')
            if (isNil(showButton)) {
                return false
            }

            const showButtonUri = new URL(decodeURIComponent(showButton.getAttribute('href')))
            const showButtonUriParameter = new URLSearchParams(showButtonUri.search)

            // user information from DOM
            const userIdentifier = showButtonUriParameter.get('moduleArguments[user][__identity]')
            const isCurrentUser = !isNil(deleteButton) && deleteButton.classList.contains('neos-disabled')

            const impersonateButtonMarkup = ImpersonateButton(userIdentifier, isCurrentUser)
            showButton.parentElement.innerHTML += impersonateButtonMarkup
        })
    }

    _impersonateUser(event) {
        event.preventDefault();
        const button = event.currentTarget;
        if (isNil(button)) {
            return false
        }

        const identifier = button.getAttribute('data-user-identifier')
        const response = this._apiService.callUserChange(identifier);
        response
            .then((data) => {
                const {user, status} = data
                const username = isNil(user) ? '' : user.accountIdentifier
                const message = window.Typo3Neos.I18n.translate('success.impersonateUser', 'Switched to the new user {0}.', 'Unikka.LoginAs', 'Main', {0: username})
                window.Typo3Neos.Notification.ok(message)

                // load default backend, so we don't need to care for the module permissions.
                // because in not every neos version the users have by default the content module or user module
                window.location.pathname = '/neos'
            })
            .catch(function (error) {
                if (window.Typo3Neos) {
                    const message = window.Typo3Neos.I18n.translate('error.impersonateUser', 'Could not switch to the requested user.', 'Unikka.LoginAs')
                    window.Typo3Neos.Notification.error(message)
                }
            });
    }
}
