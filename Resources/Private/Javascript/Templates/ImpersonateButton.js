import {isNil} from "../Helper"

const impersonateIcon = '<i class="fas fa-random icon-white"></i>'

const ImpersonateButton = (identifier, disabled) => {
    const attributesObject = {
        'data-neos-toggle': 'tooltip',
        'data-original-title': 'Benutzer einloggen',
        'data-user-identifier': identifier,
        class: 'neos-button neos-button-primary impersonate-user',
    }

    if (!isNil(disabled) && disabled === true) {
        attributesObject.disabled = true
        attributesObject.class += ' neos-disabled'
    }

    let attributes = ''
    Object.keys(attributesObject).forEach(key => {
        attributes += `${key}="${attributesObject[key]}" `
    })

    return `<button ${attributes}>${impersonateIcon}</button>`
}

export {ImpersonateButton}
