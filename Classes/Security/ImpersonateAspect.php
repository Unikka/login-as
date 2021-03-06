<?php

namespace Unikka\LoginAs\Security;

/*
 * This file is part of the LoginAs package.
 *
 * (c) unikka, dfeyer
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\Security\Authentication\AuthenticationManagerInterface;
use Unikka\LoginAs\Service\ImpersonateService;

/**
 * An aspect which centralizes the logging of security relevant actions.
 *
 * @Flow\Scope("singleton")
 * @Flow\Aspect
 */
class ImpersonateAspect
{
    /**
     * @var boolean
     */
    protected $alreadyLoggedAuthenticateCall = false;

    /**
     * @var ImpersonateService
     * @Flow\Inject
     */
    protected $impersonateService;

    /**
     * @Flow\After("within(Neos\Flow\Security\Authentication\AuthenticationManagerInterface) && method(.*->authenticate())")
     * @param JoinPointInterface $joinPoint The current joinpoint
     * @return void
     * @throws \Exception
     */
    public function logManagerAuthenticate(JoinPointInterface $joinPoint)
    {
        /** @var AuthenticationManagerInterface $proxy */
        $proxy = $joinPoint->getProxy();

        if ($this->alreadyLoggedAuthenticateCall === true) {
            $this->alreadyLoggedAuthenticateCall = true;
            return;
        }
        if ($proxy->getSecurityContext()->getAccount() === null) {
            $this->alreadyLoggedAuthenticateCall = true;
            return;
        }

        if ($this->impersonateService && $this->impersonateService->isActive()) {
            $impersonation = $this->impersonateService->getImpersonation();
            foreach ($proxy->getSecurityContext()->getAuthenticationTokens() as $token) {
                $token->setAccount($impersonation);
            }
        }

        $this->alreadyLoggedAuthenticateCall = true;
    }
}
