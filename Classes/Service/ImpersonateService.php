<?php

namespace Unikka\LoginAs\Service;

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
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\Context;
use Neos\Flow\Security\Policy\PolicyService;
use Neos\Flow\Session\Exception\SessionNotStartedException;
use Neos\Flow\Session\SessionInterface;

/**
 * Impersonate Service
 */
class ImpersonateService
{
    /**
     * @var Context
     * @Flow\Inject
     */
    protected $securityContext;

    /**
     * @var SessionInterface
     * @Flow\Inject
     */
    protected $session;

    /**
     * @var PersistenceManagerInterface
     * @Flow\Inject
     */
    protected $persistenceManager;

    /**
     * @var PolicyService
     * @Flow\Inject
     */
    protected $policyService;

    /**
     * @param Account $account
     * @return void
     * @throws SessionNotStartedException
     */
    public function impersonate($account): void
    {
        $currentAccount = $this->securityContext->getAccount();
        $this->writeSession('OriginalIdentity', $this->persistenceManager->getIdentifierByObject($currentAccount));

        $this->refreshTokens($account);

        $this->writeSession('Impersonate', $this->persistenceManager->getIdentifierByObject($account));
    }

    /**
     * @return void
     * @throws SessionNotStartedException
     */
    public function restoreOriginalIdentity(): void
    {
        $account = $this->getOriginalIdentity();
        $this->refreshTokens($account);
        $this->writeSession('Impersonate', null);
    }

    /**
     * @return Account|null
     * @throws SessionNotStartedException
     */
    public function getImpersonation(): ?Account
    {
        $impersonation = $this->getSessionData('Impersonate');
        if ($impersonation !== null) {
            return $this->persistenceManager->getObjectByIdentifier($impersonation, Account::class);
        }
        return null;
    }

    /**
     * @return bool
     * @throws SessionNotStartedException
     */
    public function isActive()
    {
        return $this->getImpersonation() instanceof Account;
    }

    /**
     * @return Account|null
     */
    public function getCurrentUser(): ?Account
    {
        return $this->securityContext->getAccount();
    }

    /**
     * @return Account|null
     * @throws SessionNotStartedException
     */
    public function getOriginalIdentity(): ?Account
    {
        $originalIdentity = $this->getSessionData('OriginalIdentity');
        if ($originalIdentity !== null) {
            return $this->persistenceManager->getObjectByIdentifier($originalIdentity, Account::class);
        }
        return $this->securityContext->getAccount();
    }

    /**
     * @return array
     * @throws SessionNotStartedException
     */
    public function getOriginalIdentityRoles(): array
    {
        $originalAccount = $this->getOriginalIdentity();
        $roles = $originalAccount ? $originalAccount->getRoles() : [];
        foreach ($roles as $role) {
            foreach ($this->policyService->getAllParentRoles($role) as $parentRole) {
                if (!in_array($parentRole, $roles)) {
                    $roles[$parentRole->getIdentifier()] = $parentRole;
                }
            }
        }
        return $roles;
    }

    /**
     * @param Account|null $account
     * @return void
     */
    protected function refreshTokens(Account $account = null)
    {
        if ($account === null) {
            return;
        }

        $tokens = $this->securityContext->getAuthenticationTokens();
        foreach ($tokens as $token) {
            $token->setAccount($account);
        }
    }

    /**
     * @param string $key
     * @param string|null $value
     * @return void
     * @throws SessionNotStartedException
     */
    protected function writeSession(string $key, ?string $value): void
    {
        if ($this->session->isStarted()) {
            $this->session->putData($key, $value);
        }
    }

    /**
     * @param string $key
     * @throws SessionNotStartedException
     */
    protected function getSessionData(string $key): mixed
    {
        return $this->session->isStarted() && $this->session->hasKey($key) ? $this->session->getData($key) : null;
    }
}
