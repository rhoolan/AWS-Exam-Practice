-- Exam types lookup table
CREATE TABLE IF NOT EXISTS public.exam_types (
  id         INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  exam_code  VARCHAR(25)  NOT NULL UNIQUE,
  exam_name  VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO public.exam_types (exam_code, exam_name) VALUES
  ('CLF-C02', 'AWS Certified Cloud Practitioner'),
  ('AIF-C01', 'AWS Certified AI Practitioner'),
  ('SAA-C03', 'AWS Certified Solutions Architect – Associate')
ON CONFLICT (exam_code) DO NOTHING;

-- Domain types lookup table
CREATE TABLE IF NOT EXISTS public.domain_types (
  id          INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  domain_name VARCHAR(100) NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO public.domain_types (domain_name) VALUES
  ('Billing, Pricing, and Support'),
  ('Security and Compliance'),
  ('Cloud Technology and Services'),
  ('Cloud Concepts')
ON CONFLICT DO NOTHING;
