SET check_function_bodies = false;
CREATE TABLE public.challenge_user (
    id integer DEFAULT pg_backend_pid() NOT NULL,
    user_id integer NOT NULL,
    challenge_id integer NOT NULL,
    start_time timestamp with time zone DEFAULT now(),
    stop_time timestamp with time zone,
    completed_at_time timestamp with time zone
);
CREATE TABLE public.challenges (
    id integer NOT NULL,
    challenge_name text NOT NULL,
    question_text text NOT NULL
);
CREATE SEQUENCE public.challenges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.challenges_id_seq OWNED BY public.challenges.id;
CREATE TABLE public."user" (
    id integer NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    sat_exam_date timestamp with time zone NOT NULL,
    target_sat_score integer NOT NULL,
    total_time_spent bigint DEFAULT '0'::bigint
);
CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
ALTER TABLE ONLY public.challenges ALTER COLUMN id SET DEFAULT nextval('public.challenges_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.challenge_user
    ADD CONSTRAINT challenge_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.challenges
    ADD CONSTRAINT challenges_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.challenge_user
    ADD CONSTRAINT challenge_user_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenges(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.challenge_user
    ADD CONSTRAINT challenge_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
