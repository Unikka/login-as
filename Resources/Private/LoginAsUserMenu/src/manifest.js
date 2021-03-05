import manifest from '@neos-project/neos-ui-extensibility';

import extendUserDropDown from './component/ExtendedUserDropDown';

manifest('Unikka.LoginAs:LoginAsUserMenu', {}, globalRegistry => {
    const containerRegistry = globalRegistry.get('containers');

    const OriginalUserDropDown = containerRegistry.get('PrimaryToolbar/Right/UserDropDown')

    containerRegistry.set('PrimaryToolbar/Right/UserDropDown', extendUserDropDown(OriginalUserDropDown));

});
