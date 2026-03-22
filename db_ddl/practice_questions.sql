
CREATE TABLE practice_questions (
    id             INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- Question body
    question_text  TEXT         NOT NULL,
    -- Answer options — A–D are always present; E is nullable
    answer_a       TEXT,
    answer_b       TEXT,
    answer_c       TEXT,
    answer_d       TEXT,
    answer_e       TEXT,
    -- Correct answer(s): single letter ('A') or comma-separated ('B, E')
    correct_answer TEXT         NOT NULL,
    -- Full explanation text
    explanation    TEXT,
    -- The exam this question belongs to
    exam_id        INTEGER         NOT NULL,
    domain_id      INTEGER         NOT NULL,
    -- Audit columns
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index on domain for filtered queries (e.g. revision by topic)
CREATE INDEX idx_practice_questions_domain ON practice_questions (domain_id);
-- Index on exam for multi-exam setups
CREATE INDEX idx_practice_questions_exam   ON practice_questions (exam_id);