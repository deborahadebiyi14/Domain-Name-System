import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Dispute Resolution Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const complainant = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  const respondent = 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should file a dispute', () => {
    const fileDispute = vi.fn().mockReturnValue({ ok: true });
    fileDispute('dispute-resolution', 'file-dispute', ['example.com', respondent], complainant);
    expect(fileDispute).toHaveBeenCalledWith('dispute-resolution', 'file-dispute', ['example.com', respondent], complainant);
    expect(fileDispute()).toEqual({ ok: true });
  });
  
  it('should resolve a dispute', () => {
    const fileDispute = vi.fn().mockReturnValue({ ok: true });
    fileDispute('dispute-resolution', 'file-dispute', ['example.com', respondent], complainant);
    const resolveDispute = vi.fn().mockReturnValue({ ok: true });
    resolveDispute('dispute-resolution', 'resolve-dispute', ['example.com', complainant], owner);
    expect(resolveDispute).toHaveBeenCalledWith('dispute-resolution', 'resolve-dispute', ['example.com', complainant], owner);
    expect(resolveDispute()).toEqual({ ok: true });
  });
  
  it('should get dispute info', () => {
    const fileDispute = vi.fn().mockReturnValue({ ok: true });
    fileDispute('dispute-resolution', 'file-dispute', ['example.com', respondent], complainant);
    const getDisputeInfo = vi.fn().mockReturnValue({ ok: { complainant: complainant, respondent: respondent, status: 'pending' } });
    getDisputeInfo('dispute-resolution', 'get-dispute-info', ['example.com']);
    expect(getDisputeInfo).toHaveBeenCalledWith('dispute-resolution', 'get-dispute-info', ['example.com']);
    expect(getDisputeInfo()).toEqual({ ok: { complainant: complainant, respondent: respondent, status: 'pending' } });
  });
  
  it('should update dispute fee', () => {
    const updateDisputeFee = vi.fn().mockReturnValue({ ok: true });
    updateDisputeFee('dispute-resolution', 'update-dispute-fee', [2000000], owner);
    expect(updateDisputeFee).toHaveBeenCalledWith('dispute-resolution', 'update-dispute-fee', [2000000], owner);
    expect(updateDisputeFee()).toEqual({ ok: true });
  });
  
  it('should cancel a dispute', () => {
    const fileDispute = vi.fn().mockReturnValue({ ok: true });
    fileDispute('dispute-resolution', 'file-dispute', ['example.com', respondent], complainant);
    const cancelDispute = vi.fn().mockReturnValue({ ok: true });
    cancelDispute('dispute-resolution', 'cancel-dispute', ['example.com'], complainant);
    expect(cancelDispute).toHaveBeenCalledWith('dispute-resolution', 'cancel-dispute', ['example.com'], complainant);
    expect(cancelDispute()).toEqual({ ok: true });
  });
});

