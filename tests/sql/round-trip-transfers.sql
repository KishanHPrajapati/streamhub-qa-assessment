SELECT
    t1.sender AS sender,
    t1.receiver AS receiver,
    t1.amount AS outgoing_amount,
    t2.amount AS return_amount,
    t1.transaction_time AS outgoing_time,
    t2.transaction_time AS return_time
FROM transactions t1
JOIN transactions t2
    ON t1.sender = t2.receiver
    AND t1.receiver = t2.sender
    AND t1.id < t2.id
    AND ABS(t1.amount - t2.amount) <= t1.amount * 0.10
    AND ABS(
        (julianday(t2.transaction_time) - julianday(t1.transaction_time))
    ) * 24 <= 24
ORDER BY t1.id;