CREATE TABLE "bochitabi"."users"
( 
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "name" VARCHAR(255) NOT NULL,
  "mail_address" VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
 );

 CREATE TABLE "bochitabi"."records"
( 
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "user_id" uuid NOT NULL,
  "trip_name" VARCHAR(255) NOT NULL,
  "record_date" TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) references "bochitabi"."users" (id)
 );

 CREATE TABLE "bochitabi"."memories"
 (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "record_id" uuid NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "story" TEXT,
  "latitude" VARCHAR(50),
  "longitude" VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (record_id) references "bochitabi"."records" (id)
 );

 CREATE TABLE "bochitabi"."pictures"
 (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "memory_id" uuid,
  "url" VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (memory_id) references "bochitabi"."memories" (id)
 );