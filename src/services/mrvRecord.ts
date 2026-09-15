import type { CarbonLedgerEntry, MrvRecord } from '../types'

export function createMrvRecord(entry: CarbonLedgerEntry): MrvRecord {
  return {
    id: `mrv-${entry.id}`,
    ledgerEntryId: entry.id,
    txnId: entry.txnId,
    status: 'evidence_pending',
    evidence: [
      { item: 'Weighbridge slip (demo)', done: true },
      { item: 'Collection GPS timestamp', done: true },
      { item: 'Buyer receipt', done: false },
      { item: 'Pathway utilisation attestation', done: false },
    ],
    provenance: 'DEMONSTRATION_DATA',
  }
}
