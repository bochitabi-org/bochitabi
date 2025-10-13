-- book mark
create table if not exists book_marks (
    id uuid primary key default gen_random_uuid(),
    title varchar(255) not null
);

-- spot on map
create table if not exists spots (
    id uuid primary key default gen_random_uuid(),
    spot_name text,
    description text,
    latitude double precision,
    longitude double precision,
    book_id uuid references book_marks(id) on delete cascade
);