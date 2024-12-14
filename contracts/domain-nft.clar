;; Domain NFT Contract

(define-non-fungible-token domain uint)

(define-data-var last-domain-id uint u0)

(define-map domain-names
  { domain-id: uint }
  { name: (string-ascii 63) }
)

(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u401))
(define-constant err-domain-not-found (err u404))

(define-read-only (get-last-domain-id)
  (ok (var-get last-domain-id))
)

(define-public (mint-domain (name (string-ascii 63)))
  (let
    (
      (domain-id (+ (var-get last-domain-id) u1))
    )
    (try! (nft-mint? domain domain-id tx-sender))
    (map-set domain-names { domain-id: domain-id } { name: name })
    (var-set last-domain-id domain-id)
    (ok domain-id)
  )
)

(define-public (transfer-domain (domain-id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (nft-get-owner? domain domain-id) err-domain-not-found)) err-unauthorized)
    (try! (nft-transfer? domain domain-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-domain-name (domain-id uint))
  (ok (get name (map-get? domain-names { domain-id: domain-id })))
)

(define-read-only (get-domain-owner (domain-id uint))
  (ok (nft-get-owner? domain domain-id))
)

