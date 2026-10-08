DELETE FROM transactions;

INSERT INTO transactions
    (id, sender, receiver, amount, transaction_time)
VALUES
    (1, 'Alice', 'Bob', 1000.00, '2024-04-01 10:00:00'),
    (2, 'Bob', 'Alice', 950.00, '2024-04-01 18:00:00'),

    (3, 'John', 'David', 2000.00, '2024-04-02 09:00:00'),
    (4, 'David', 'John', 1700.00, '2024-04-02 20:00:00'),

    (5, 'Rahul', 'Amit', 5000.00, '2024-04-03 10:00:00'),
    (6, 'Amit', 'Rahul', 5300.00, '2024-04-04 12:00:00'),

    (7, 'Neha', 'Priya', 3000.00, '2024-04-05 10:00:00'),
    (8, 'Priya', 'Neha', 3050.00, '2024-04-05 15:00:00');


DELETE FROM player_match_scores;

INSERT INTO player_match_scores
    (id, player_name, match_number, match_date, runs)
VALUES
    -- Virat Kohli: qualifying 3-match streak
    (1, 'Virat Kohli', 1, '2024-03-22', 45),
    (2, 'Virat Kohli', 2, '2024-03-25', 62),
    (3, 'Virat Kohli', 3, '2024-03-28', 38),
    (4, 'Virat Kohli', 4, '2024-04-01', 12),

    -- Rohit Sharma: no 3-match qualifying streak
    (5, 'Rohit Sharma', 1, '2024-03-22', 55),
    (6, 'Rohit Sharma', 2, '2024-03-25', 20),
    (7, 'Rohit Sharma', 3, '2024-03-28', 45),
    (8, 'Rohit Sharma', 4, '2024-04-01', 50),

    -- Shubman Gill: two qualifying, then one below 30
    (9, 'Shubman Gill', 1, '2024-03-23', 40),
    (10, 'Shubman Gill', 2, '2024-03-26', 35),
    (11, 'Shubman Gill', 3, '2024-03-29', 22),
    (12, 'Shubman Gill', 4, '2024-04-02', 44),

    -- Suryakumar Yadav: qualifying 3-match streak
    (13, 'Suryakumar Yadav', 1, '2024-04-05', 32),
    (14, 'Suryakumar Yadav', 2, '2024-04-08', 70),
    (15, 'Suryakumar Yadav', 3, '2024-04-11', 41);