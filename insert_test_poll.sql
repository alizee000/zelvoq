-- Insert a new community decision for the default testing society (KOODU-2026)
INSERT INTO polls (id, society_id, title, description, created_by, status)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1),
  'Install EV Chargers in Basement 2?',
  'Should we allocate ₹50,000 from the maintenance fund to install 4 new electric vehicle fast-chargers in Basement 2?',
  'System Admin',
  'active'
);
