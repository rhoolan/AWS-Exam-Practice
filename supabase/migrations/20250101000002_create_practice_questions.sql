-- Practice questions table
CREATE TABLE IF NOT EXISTS public.practice_questions (
  id             INTEGER     PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_text  TEXT        NOT NULL,
  answer_a       TEXT,
  answer_b       TEXT,
  answer_c       TEXT,
  answer_d       TEXT,
  answer_e       TEXT,
  correct_answer TEXT        NOT NULL,
  explanation    TEXT,
  exam_id        INTEGER     NOT NULL,
  domain_id      INTEGER     NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practice_questions_domain ON public.practice_questions (domain_id);
CREATE INDEX IF NOT EXISTS idx_practice_questions_exam   ON public.practice_questions (exam_id);
