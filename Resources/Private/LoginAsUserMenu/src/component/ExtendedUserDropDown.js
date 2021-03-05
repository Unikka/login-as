import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { $get, $transform } from 'plow-js'
import { themr } from '@friendsofreactjs/react-css-themr'
import ApiService from '@unikka/loginas-api'

import { neos } from '@neos-project/neos-ui-decorators'
import {actions} from '@neos-project/neos-ui-redux-store';
import { Icon, DropDown } from '@neos-project/react-ui-components'
import I18n from '@neos-project/neos-ui-i18n'

import dropdownTheme from './dropdown.css'
import RestoreButtonItem from './RestoreButtonItem'

const BASE_PATH = '/neos/impersonate/'

@connect(
    $transform({
        userName: $get('user.name.fullName'),
    }),
    {
        addFlashMessage: actions.UI.FlashMessages.add,
    }
)
@neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get('i18n'),
}))
@themr('ExtendedUserDropDown', dropdownTheme)
class ExtendedUserDropDown extends PureComponent {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        i18nRegistry: PropTypes.object.isRequired,
        addFlashMessage: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = { originUser: null, activeImpersonation: false }
    }

    componentDidMount() {
        const { csrfToken } = document.getElementById('appContainer').dataset
        const apiService = new ApiService(BASE_PATH, csrfToken)
        apiService.callStatus().then((data) => {
            const { origin, status } = data
            const newState = { activeImpersonation: status }

            if (origin && 'accountIdentifier' in origin) {
                newState['originUser'] = origin.accountIdentifier
            }

            this.setState(newState)
        })
    }

    render() {
        const { originUser, activeImpersonation } = this.state
        const { neos, i18nRegistry, addFlashMessage } = this.props
        const logoutUri = $get('routes.core.logout', neos)
        const userSettingsUri = $get('routes.core.modules.userSettings', neos)
        const { csrfToken } = document.getElementById('appContainer').dataset

        return (
            <div className={dropdownTheme.wrapper}>
                <DropDown className={dropdownTheme.dropDown}>
                    <DropDown.Header className={dropdownTheme.dropDown__btn}>
                        <Icon
                            className={dropdownTheme.dropDown__btnIcon}
                            icon="user"
                        />
                        <span className={dropdownTheme.dropDown__userName}>
                            {this.props.userName}
                        </span>
                    </DropDown.Header>
                    <DropDown.Contents
                        className={dropdownTheme.dropDown__contents}
                    >
                        <li className={dropdownTheme.dropDown__item}>
                            <form
                                title="Logout"
                                action={logoutUri}
                                method="post"
                                role="presentation"
                            >
                                <input
                                    type="hidden"
                                    name="__csrfToken"
                                    value={csrfToken}
                                />
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    type="submit"
                                    name=""
                                    value="logout"
                                >
                                    <Icon
                                        icon="sign-out-alt"
                                        aria-hidden="true"
                                        className={
                                            dropdownTheme.dropDown__itemIcon
                                        }
                                    />
                                    <I18n
                                        id="logout"
                                        sourceName="Main"
                                        packageKey="Neos.Neos"
                                        fallback="Logout"
                                    />
                                </button>
                            </form>
                        </li>
                        <li className={dropdownTheme.dropDown__item}>
                            <a title="User Settings" href={userSettingsUri}>
                                <Icon
                                    icon="wrench"
                                    aria-hidden="true"
                                    className={dropdownTheme.dropDown__itemIcon}
                                />
                                <I18n
                                    id="userSettings.label"
                                    sourceName="Modules"
                                    packageKey="Neos.Neos"
                                    fallback="User Settings"
                                />
                            </a>
                        </li>
                        {activeImpersonation ? (
                            <RestoreButtonItem
                                user={originUser}
                                i18nRegistry={i18nRegistry}
                                addFlashMessage={addFlashMessage}
                            />
                        ) : null}
                    </DropDown.Contents>
                </DropDown>
            </div>
        )
    }
}

const extendUserDropDown = (OriginalUserDropDown) => {
    return ExtendedUserDropDown
}

export default extendUserDropDown
