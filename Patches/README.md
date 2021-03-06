## Patching the EmberJS UI

If you are still using the EmberJS based Neos Ui, the content module is currently not automatically extended with the new button. If you log in as an editor who only has permissions for the content module, you can only get back to your user by logging out and logging in again.

We provide in the package a patch file to adjust the template of `Neos/Neos` so that you also get this button rendered.

This patch could be installed automatically using the package `cweagans/composer-patches`.
For more information visit [usage of composer-patches](https://github.com/cweagans/composer-patches#usage)
