CREATE TABLE public."Order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    building_id integer NOT NULL,
    room_id integer NOT NULL,
    description text NOT NULL,
    problem text NOT NULL,
    complete boolean NOT NULL
);
CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;
ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);
ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);