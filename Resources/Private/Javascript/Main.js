import 'core-js/stable';
import 'regenerator-runtime/runtime';
import UserModule from './Components/UserModule';
import {isNil} from "./Helper";

document.addEventListener('DOMContentLoaded', function () {
    const userModuleContainer = document.querySelector('.neos-module-administration-users');
    Array.from(userModuleContainer.querySelectorAll('.neos-table')).forEach(_userModule => {
        if (!isNil(_userModule)) {
            new UserModule(_userModule);
        }
    });
})
