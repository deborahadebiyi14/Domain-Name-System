;; Dispute Resolution Contract

(define-map disputes
  { domain: (string-ascii 63) }
  { complainant: principal, respondent: principal, status: (string-ascii 20) }
)

(define-data-var dispute-fee uint u1000000) ;; 1 STX
(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u401))
(define-constant err-dispute-exists (err u402))
(define-constant err-insufficient-funds (err u403))
(define-constant err-dispute-not-found (err u404))
(define-constant err-invalid-status (err u405))

(define-public (file-dispute (domain (string-ascii 63)) (respondent principal))
  (let
    (
      (existing-dispute (map-get? disputes { domain: domain }))
    )
    (asserts! (is-none existing-dispute) err-dispute-exists)
    (try! (stx-transfer? (var-get dispute-fee) tx-sender (as-contract tx-sender)))
    (ok (map-set disputes
      { domain: domain }
      { complainant: tx-sender, respondent: respondent, status: "pending" }
    ))
  )
)

(define-public (resolve-dispute (domain (string-ascii 63)) (winner principal))
  (let
    (
      (dispute (unwrap! (map-get? disputes { domain: domain }) err-dispute-not-found))
    )
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (asserts! (or (is-eq winner (get complainant dispute)) (is-eq winner (get respondent dispute))) err-unauthorized)
    (ok (map-set disputes
      { domain: domain }
      (merge dispute { status: "resolved" })
    ))
  )
)

(define-read-only (get-dispute-info (domain (string-ascii 63)))
  (ok (map-get? disputes { domain: domain }))
)

(define-public (update-dispute-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (ok (var-set dispute-fee new-fee))
  )
)

(define-public (cancel-dispute (domain (string-ascii 63)))
  (let
    (
      (dispute (unwrap! (map-get? disputes { domain: domain }) err-dispute-not-found))
    )
    (asserts! (is-eq tx-sender (get complainant dispute)) err-unauthorized)
    (asserts! (is-eq (get status dispute) "pending") err-invalid-status)
    (ok (map-set disputes
      { domain: domain }
      (merge dispute { status: "cancelled" })
    ))
  )
)

