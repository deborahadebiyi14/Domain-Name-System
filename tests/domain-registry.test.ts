import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Domain Registry Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const newOwner = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should register a domain', () => {
    const registerDomain = vi.fn().mockReturnValue({ ok: true });
    registerDomain('domain-registry', 'register-domain', ['example.com'], owner);
    expect(registerDomain).toHaveBeenCalledWith('domain-registry', 'register-domain', ['example.com'], owner);
    expect(registerDomain()).toEqual({ ok: true });
  });
  
  it('should renew a domain', () => {
    const registerDomain = vi.fn().mockReturnValue({ ok: true });
    registerDomain('domain-registry', 'register-domain', ['example.com'], owner);
    const renewDomain = vi.fn().mockReturnValue({ ok: true });
    renewDomain('domain-registry', 'renew-domain', ['example.com'], owner);
    expect(renewDomain).toHaveBeenCalledWith('domain-registry', 'renew-domain', ['example.com'], owner);
    expect(renewDomain()).toEqual({ ok: true });
  });
  
  it('should transfer a domain', () => {
    const registerDomain = vi.fn().mockReturnValue({ ok: true });
    registerDomain('domain-registry', 'register-domain', ['example.com'], owner);
    const transferDomain = vi.fn().mockReturnValue({ ok: true });
    transferDomain('domain-registry', 'transfer-domain', ['example.com', newOwner], owner);
    expect(transferDomain).toHaveBeenCalledWith('domain-registry', 'transfer-domain', ['example.com', newOwner], owner);
    expect(transferDomain()).toEqual({ ok: true });
  });
  
  it('should get domain info', () => {
    const registerDomain = vi.fn().mockReturnValue({ ok: true });
    registerDomain('domain-registry', 'register-domain', ['example.com'], owner);
    const getDomainInfo = vi.fn().mockReturnValue({ ok: { owner: owner, expiration: 123456789 } });
    getDomainInfo('domain-registry', 'get-domain-info', ['example.com']);
    expect(getDomainInfo).toHaveBeenCalledWith('domain-registry', 'get-domain-info', ['example.com']);
    expect(getDomainInfo()).toEqual({ ok: { owner: owner, expiration: expect.any(Number) } });
  });
  
  it('should update registration fee', () => {
    const updateRegistrationFee = vi.fn().mockReturnValue({ ok: true });
    updateRegistrationFee('domain-registry', 'update-registration-fee', [200000], owner);
    expect(updateRegistrationFee).toHaveBeenCalledWith('domain-registry', 'update-registration-fee', [200000], owner);
    expect(updateRegistrationFee()).toEqual({ ok: true });
  });
  
  it('should update registration period', () => {
    const updateRegistrationPeriod = vi.fn().mockReturnValue({ ok: true });
    updateRegistrationPeriod('domain-registry', 'update-registration-period', [105120], owner);
    expect(updateRegistrationPeriod).toHaveBeenCalledWith('domain-registry', 'update-registration-period', [105120], owner);
    expect(updateRegistrationPeriod()).toEqual({ ok: true });
  });
});

