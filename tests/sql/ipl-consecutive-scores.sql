WITH ordered_scores AS (
    SELECT
        player_name,
        match_number,
        match_date,
        runs,

        LAG(runs, 1) OVER (
            PARTITION BY player_name
            ORDER BY match_number
        ) AS previous_runs,

        LAG(runs, 2) OVER (
            PARTITION BY player_name
            ORDER BY match_number
        ) AS two_matches_ago
    FROM player_match_scores
)

SELECT
    player_name,
    two_matches_ago,
    previous_runs,
    runs,
    (
        SELECT match_date
        FROM player_match_scores p
        WHERE p.player_name = ordered_scores.player_name
          AND p.match_number = ordered_scores.match_number - 2
    ) AS streak_start_date
FROM ordered_scores
WHERE two_matches_ago >= 30
  AND previous_runs >= 30
  AND runs >= 30
ORDER BY player_name;