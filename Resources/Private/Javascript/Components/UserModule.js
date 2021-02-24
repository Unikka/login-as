import {isNil} from '../Helper'
import ApiService from '../Service/ApiService'

export default class UserModule {
    constructor(_root) {
        this._root = _root
        this._csrfToken = this._root.getAttribute('data-csrf-token')
        this._apiService = new ApiService(this._csrfToken)

        if (!isNil(_root)) {
            this._initialize()
            this._setupEventListeners()
        }
    }

    _initialize() {
        this._renderImpersonateButtons()
    }

    _setupEventListeners() {
        const impersonateButtons = this._root.querySelectorAll('a.impersonate-user')
        impersonateButtons.forEach(_impersonateButton => {
            _impersonateButton.addEventListener('click', this._impersonateUser.bind(this));
        });
    }

    _renderImpersonateButtons() {
        const userTableActionButtons = Array.from(this._root.querySelectorAll('.neos-table .neos-action'))
        console.log(userTableActionButtons)
        console.log('render impersonate button')
    }

    _impersonateUser(event) {
        event.preventDefault();
        const button = event.currentTarget;
        if (isNil(button)) {
            return false
        }

        const response = this._apiService.callUserChange('870a0028-1adf-4cd6-a6df-6547a315a874');
        response
            .then((data) => {
                console.log(data.body)
            })
            .catch(function (error) {
                if (window.Typo3Neos) {
                    message = window.Typo3Neos.I18n.translate('error.impersonateUser', 'Could not switch to the given user.', 'Unikka.LoginAs')
                    window.Typo3Neos.Notification.error(message)
                }
            });

        const foo = this._apiService.callStatus()
    }
}
