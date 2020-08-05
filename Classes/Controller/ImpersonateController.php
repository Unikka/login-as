<?php

namespace Unikka\LoginAs\Controller;

/*
 * This file is part of the LoginAs package.
 *
 * (c) unikka, dfeyer
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\Exception\StopActionException;
use Neos\Flow\Mvc\Routing\UriBuilder;
use Neos\Flow\Mvc\View\JsonView;
use Neos\Flow\Security\Account;
use Neos\Neos\Domain\Model\User;
use Unikka\LoginAs\Service\ImpersonateService;
use Neos\Party\Domain\Service\PartyService;

/**
 * The Impersonate controller
 *
 * @Flow\Scope("singleton")
 */
class ImpersonateController extends ActionController
{
    /**
     * @var ImpersonateService
     * @Flow\Inject
     */
    protected $impersonateService;

    /**
     * @var PartyService
     * @Flow\Inject
     */
    protected $partyService;

    /**
     * @var string
     */
    protected $defaultViewImplementation = JsonView::class;

    /**
     * @var JsonView
     */
    protected $view = null;

    /**
     * @var array
     */
    protected $supportedMediaTypes = ['application/json'];

    /**
     * @param string $actionName Name of the action to forward to
     * @param string $controllerName Unqualified object name of the controller to forward to. If not specified, the current controller is used.
     * @param string $packageKey Key of the package containing the controller to forward to. If not specified, the current package is assumed.
     * @param array $arguments Array of arguments for the target action
     * @param integer $delay (optional) The delay in seconds. Default is no delay.
     * @param integer $statusCode (optional) The HTTP status code for the redirect. Default is "303 See Other"
     * @param string $format The format to use for the redirect URI
     * @see redirect()
     */
    protected function redirectWithParentRequest($actionName, $controllerName = null, $packageKey = null, array $arguments = [], $delay = 0, $statusCode = 303, $format = null)
    {
        $request = $this->getControllerContext()->getRequest()->getMainRequest();
        $uriBuilder = new UriBuilder();
        $uriBuilder->setRequest($request);

        if ($packageKey !== null && strpos($packageKey, '\\') !== false) {
            list($packageKey, $subpackageKey) = explode('\\', $packageKey, 2);
        } else {
            $subpackageKey = null;
        }
        if ($format === null) {
            $uriBuilder->setFormat($this->request->getFormat());
        } else {
            $uriBuilder->setFormat($format);
        }

        $uri = $uriBuilder->setCreateAbsoluteUri(true)->uriFor($actionName, $arguments, $controllerName, $packageKey, $subpackageKey);
        $this->redirectToUri($uri, $delay, $statusCode);
    }

    /**
     * Fetching possible redirect options for the given action method and if everything is set we redirect to the
     * configured controller action.
     *
     * @param string $actionName
     * @return void
     */
    protected function redirectIfPossible($actionName)
    {
        $action = $this->settings['redirectOptions'][$actionName]['action'] ?? '';
        $controller = $this->settings['redirectOptions'][$actionName]['controller'] ?? '';
        $package = $this->settings['redirectOptions'][$actionName]['package'] ?? '';

        if ($action !== '' && $controller !== '' && $package !== '' && $this->impersonateService->getImpersonation() === null) {
            $this->redirectWithParentRequest($action, $controller, $package);
        }
    }

    /**
     * @param Account $account
     * @return void
     */
    public function impersonateAction(Account $account)
    {
        $this->impersonateService->impersonate($account);
        $this->redirectIfPossible('impersonate');
    }

    /**
     * @return void
     * @throws StopActionException
     */
    public function restoreAction()
    {
        $this->impersonateService->restoreOriginalIdentity();
        $this->redirectIfPossible('restore');
    }

    /**
     * @return void
     */
    public function statusAction()
    {
        $this->response = $this->response->withAddedHeader('Content-Type', 'application/json');

        if ($this->impersonateService->isActive()) {
            $this->response = $this->response->withStatus(200);

            $currrentImpersonation = $this->impersonateService->getImpersonation();
            /** @var User $user */
            $user = $this->partyService->getAssignedPartyOfAccount($currrentImpersonation);

            $this->view->setVariablesToRender(['accountIdentifier', 'fullName']);

            $this->view
                ->assign('accountIdentifier', $currrentImpersonation->getAccountIdentifier())
                ->assign('fullName', $user->getName()->getFullName());
        } else {
            $this->response = $this->response->withStatus(404);
        }
    }
}
