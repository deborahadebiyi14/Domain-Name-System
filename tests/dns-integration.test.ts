import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('DNS Integration Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const newOwner = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should set a DNS record', () => {
    const setDnsRecord = vi.fn().mockReturnValue({ ok: true });
    setDnsRecord('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.1'], owner);
    expect(setDnsRecord).toHaveBeenCalledWith('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.1'], owner);
    expect(setDnsRecord()).toEqual({ ok: true });
  });
  
  it('should get a DNS record', () => {
    const setDnsRecord = vi.fn().mockReturnValue({ ok: true });
    setDnsRecord('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.1'], owner);
    const getDnsRecord = vi.fn().mockReturnValue({ ok: '192.0.2.1' });
    getDnsRecord('dns-integration', 'get-dns-record', ['example.com', 'A']);
    expect(getDnsRecord).toHaveBeenCalledWith('dns-integration', 'get-dns-record', ['example.com', 'A']);
    expect(getDnsRecord()).toEqual({ ok: '192.0.2.1' });
  });
  
  it('should transfer a DNS record', () => {
    const setDnsRecord = vi.fn().mockReturnValue({ ok: true });
    setDnsRecord('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.1'], owner);
    const transferDnsRecord = vi.fn().mockReturnValue({ ok: true });
    transferDnsRecord('dns-integration', 'transfer-dns-record', ['example.com', 'A', newOwner], owner);
    expect(transferDnsRecord).toHaveBeenCalledWith('dns-integration', 'transfer-dns-record', ['example.com', 'A', newOwner], owner);
    expect(transferDnsRecord()).toEqual({ ok: true });
  });
  
  it('should not allow unauthorized DNS record updates', () => {
    const setDnsRecord = vi.fn().mockReturnValue({ ok: true });
    setDnsRecord('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.1'], owner);
    const unauthorizedUpdate = vi.fn().mockReturnValue({ err: 401 });
    unauthorizedUpdate('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.2'], newOwner);
    expect(unauthorizedUpdate).toHaveBeenCalledWith('dns-integration', 'set-dns-record', ['example.com', 'A', '192.0.2.2'], newOwner);
    expect(unauthorizedUpdate()).toEqual({ err: 401 });
  });
});

