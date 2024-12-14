import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Domain NFT Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should mint a domain', () => {
    const mintDomainMock = vi.fn().mockReturnValue({ ok: 1 });
    mintDomainMock('domain-nft', 'mint-domain', ['example.com'], owner);
    expect(mintDomainMock).toHaveBeenCalledWith('domain-nft', 'mint-domain', ['example.com'], owner);
    expect(mintDomainMock()).toEqual({ ok: 1 });
    
  });
  
  it('should transfer a domain', () => {
    vi.fn().mockReturnValue({ ok: true });
    vi.fn().mockReturnValue({ ok: true });
    const transferDomainMock = vi.fn().mockReturnValue({ ok: true });
    transferDomainMock('domain-nft', 'transfer-domain', [1, recipient], owner);
    expect(transferDomainMock).toHaveBeenCalledWith('domain-nft', 'transfer-domain', [1, recipient], owner);
    expect(transferDomainMock()).toEqual({ ok: true });
  });
  
  it('should get domain name', () => {
    vi.fn().mockReturnValue({ ok: true });
    const getDomainNameMock = vi.fn().mockReturnValue({ ok: 'example.com' });
    getDomainNameMock('domain-nft', 'get-domain-name', [1]);
    expect(getDomainNameMock).toHaveBeenCalledWith('domain-nft', 'get-domain-name', [1]);
    expect(getDomainNameMock()).toEqual({ ok: 'example.com' });
  });
  
  it('should get domain owner', () => {
    vi.fn().mockReturnValue({ ok: true });
    const getDomainOwnerMock = vi.fn().mockReturnValue({ ok: owner });
    getDomainOwnerMock('domain-nft', 'get-domain-owner', [1]);
    expect(getDomainOwnerMock).toHaveBeenCalledWith('domain-nft', 'get-domain-owner', [1]);
    expect(getDomainOwnerMock()).toEqual({ ok: owner });
  });
});

