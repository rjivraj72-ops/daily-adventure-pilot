-- Starter schema for Daily Adventure Pilot.
-- Review with a technical/privacy advisor before using with real families.

create table families (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  parent_email text,
  family_pin_hash text,
  consent_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

create table learners (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  first_name text not null,
  age_range text,
  starting_level text not null default 'growing',
  interests text[] not null default '{}',
  goals text[] not null default '{}',
  voice_style text not null default 'playful_hype',
  voice_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table activity_sessions (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  learner_id uuid not null references learners(id) on delete cascade,
  session_date date not null default current_date,
  completed_rounds int not null default 0,
  total_rounds int not null default 8,
  mood text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table activity_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references activity_sessions(id) on delete cascade,
  learner_id uuid not null references learners(id) on delete cascade,
  skill_area text not null,
  question_level text,
  question_key text not null,
  question_text text not null,
  selected_answer text,
  correct_answer text,
  is_correct boolean,
  attempt_number int not null default 1,
  created_at timestamptz not null default now()
);

create table talk_time_responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references activity_sessions(id) on delete cascade,
  learner_id uuid not null references learners(id) on delete cascade,
  prompt text not null,
  response text not null,
  answer_style text,
  created_at timestamptz not null default now()
);

create table parent_notes (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  learner_id uuid not null references learners(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table pilot_feedback (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  setup_ease text,
  learner_enjoyed text,
  what_was_confusing text,
  add_next text,
  created_at timestamptz not null default now()
);
