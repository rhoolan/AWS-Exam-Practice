CREATE TABLE domain_types (
    id              INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    domain_name     VARCHAR(100) NOT NULL,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO domain_types (domain_name) VALUES
('Billing, Pricing, and Support'),
('Security and Compliance'),
('Cloud Technology and Services'),
('Cloud Concepts')