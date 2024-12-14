;; Domain Registry Contract

(define-map domain-registrations
  { name: (string-ascii 63) }
  { owner: principal, expiration: uint }
)

(define-data-var registration-fee uint u100000) ;; 0.1 STX
(define-data-var registration-period uint u52560) ;; ~1 year in blocks

(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u401))
(define-constant err-domain-taken (err u402))
(define-constant err-insufficient-funds (err u403))
(define-constant err-domain-not-found (err u404))

(define-public (register-domain (name (string-ascii 63)))
  (let
    (
      (existing-registration (map-get? domain-registrations { name: name }))
    )
    (asserts! (is-none existing-registration) err-domain-taken)
    (try! (stx-transfer? (var-get registration-fee) tx-sender (as-contract tx-sender)))
    (ok (map-set domain-registrations
      { name: name }
      { owner: tx-sender, expiration: (+ block-height (var-get registration-period)) }
    ))
  )
)

(define-public (renew-domain (name (string-ascii 63)))
  (let
    (
      (existing-registration (unwrap! (map-get? domain-registrations { name: name }) err-domain-not-found))
    )
    (asserts! (is-eq tx-sender (get owner existing-registration)) err-unauthorized)
    (try! (stx-transfer? (var-get registration-fee) tx-sender (as-contract tx-sender)))
    (ok (map-set domain-registrations
      { name: name }
      (merge existing-registration { expiration: (+ (get expiration existing-registration) (var-get registration-period)) })
    ))
  )
)

(define-public (transfer-domain (name (string-ascii 63)) (new-owner principal))
  (let
    (
      (existing-registration (unwrap! (map-get? domain-registrations { name: name }) err-domain-not-found))
    )
    (asserts! (is-eq tx-sender (get owner existing-registration)) err-unauthorized)
    (ok (map-set domain-registrations
      { name: name }
      (merge existing-registration { owner: new-owner })
    ))
  )
)

(define-read-only (get-domain-info (name (string-ascii 63)))
  (ok (map-get? domain-registrations { name: name }))
)

(define-public (update-registration-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (ok (var-set registration-fee new-fee))
  )
)

(define-public (update-registration-period (new-period uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (ok (var-set registration-period new-period))
  )
)

