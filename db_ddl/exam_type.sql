CREATE TABLE exam_types (
    id        INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    exam_code VARCHAR(25)  NOT NULL UNIQUE,
    exam_name VARCHAR(100) NOT NULL,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()

);

INSERT INTO exam_types (exam_code, exam_name) VALUES
('CLF-C02', 'AWS Certified Cloud Practitioner'),
('AIF-C01', 'AWS Certified AI Practitioner'),
('SAA-C03', 'AWS Certified Solutions Architect – Associate');