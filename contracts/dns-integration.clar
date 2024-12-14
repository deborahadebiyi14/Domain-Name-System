;; DNS Integration Contract

(define-map dns-records
  { domain: (string-ascii 63), record-type: (string-ascii 10) }
  { value: (string-ascii 255), owner: principal }
)

(define-constant err-unauthorized (err u401))
(define-constant err-record-not-found (err u404))

(define-public (set-dns-record (domain (string-ascii 63)) (record-type (string-ascii 10)) (value (string-ascii 255)))
  (let
    (
      (existing-record (map-get? dns-records { domain: domain, record-type: record-type }))
    )
    (asserts! (or (is-none existing-record) (is-eq tx-sender (get owner (unwrap! existing-record err-record-not-found)))) err-unauthorized)
    (ok (map-set dns-records
      { domain: domain, record-type: record-type }
      { value: value, owner: tx-sender }
    ))
  )
)

(define-read-only (get-dns-record (domain (string-ascii 63)) (record-type (string-ascii 10)))
  (ok (get value (default-to { value: "", owner: tx-sender } (map-get? dns-records { domain: domain, record-type: record-type }))))
)

(define-public (transfer-dns-record (domain (string-ascii 63)) (record-type (string-ascii 10)) (new-owner principal))
  (let
    (
      (existing-record (unwrap! (map-get? dns-records { domain: domain, record-type: record-type }) err-record-not-found))
    )
    (asserts! (is-eq tx-sender (get owner existing-record)) err-unauthorized)
    (ok (map-set dns-records
      { domain: domain, record-type: record-type }
      (merge existing-record { owner: new-owner })
    ))
  )
)

