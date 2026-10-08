DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    sender VARCHAR(100) NOT NULL,
    receiver VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_time DATETIME NOT NULL
);


DROP TABLE IF EXISTS player_match_scores;

CREATE TABLE player_match_scores (
    id INTEGER PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    match_number INTEGER NOT NULL,
    match_date DATE NOT NULL,
    runs INTEGER NOT NULL
);