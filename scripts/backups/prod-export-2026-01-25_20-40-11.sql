--
-- PostgreSQL database dump
--

\restrict G3W4K7l22mnKvkLbTvlqINPt7ohsQn1evAkT1ug3np2rnj0zmpjLBhmVJ9fUzs9

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.server_tour_types DROP CONSTRAINT IF EXISTS server_tour_types_tourtype_id_5d0cd182_fk_server_tourtype_id;
ALTER TABLE IF EXISTS ONLY public.server_tour_types DROP CONSTRAINT IF EXISTS server_tour_types_tour_id_aeb73d99_fk_server_tour_id;
ALTER TABLE IF EXISTS ONLY public.server_tour DROP CONSTRAINT IF EXISTS server_tour_category_id_a66e6680_fk_server_tourcategory_id;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_p_solar_id_a87ce72c_fk_django_ce;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_p_interval_id_a8ca27da_fk_django_ce;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_p_crontab_id_d3cba168_fk_django_ce;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_p_clocked_id_47a69f82_fk_django_ce;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_user_id_c564eba6_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_group_id_97559544_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
DROP INDEX IF EXISTS public.server_tour_types_tourtype_id_5d0cd182;
DROP INDEX IF EXISTS public.server_tour_types_tour_id_aeb73d99;
DROP INDEX IF EXISTS public.server_tour_slug_91b02364_like;
DROP INDEX IF EXISTS public.server_tour_category_id_a66e6680;
DROP INDEX IF EXISTS public.server_socialmediapost_url_91572985_like;
DROP INDEX IF EXISTS public.django_session_session_key_c0390e0f_like;
DROP INDEX IF EXISTS public.django_session_expire_date_a5c62663;
DROP INDEX IF EXISTS public.django_celery_results_taskresult_task_id_de0d95bf_like;
DROP INDEX IF EXISTS public.django_celery_results_groupresult_group_id_a085f1a9_like;
DROP INDEX IF EXISTS public.django_celery_results_chordcounter_group_id_1f70858c_like;
DROP INDEX IF EXISTS public.django_celery_beat_periodictask_solar_id_a87ce72c;
DROP INDEX IF EXISTS public.django_celery_beat_periodictask_name_265a36b7_like;
DROP INDEX IF EXISTS public.django_celery_beat_periodictask_interval_id_a8ca27da;
DROP INDEX IF EXISTS public.django_celery_beat_periodictask_crontab_id_d3cba168;
DROP INDEX IF EXISTS public.django_celery_beat_periodictask_clocked_id_47a69f82;
DROP INDEX IF EXISTS public.django_cele_worker_d54dd8_idx;
DROP INDEX IF EXISTS public.django_cele_task_na_08aec9_idx;
DROP INDEX IF EXISTS public.django_cele_status_9b6201_idx;
DROP INDEX IF EXISTS public.django_cele_periodi_1993cf_idx;
DROP INDEX IF EXISTS public.django_cele_date_do_f59aad_idx;
DROP INDEX IF EXISTS public.django_cele_date_do_caae0e_idx;
DROP INDEX IF EXISTS public.django_cele_date_cr_f04a50_idx;
DROP INDEX IF EXISTS public.django_cele_date_cr_bd6c1d_idx;
DROP INDEX IF EXISTS public.django_admin_log_user_id_c564eba6;
DROP INDEX IF EXISTS public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX IF EXISTS public.auth_user_username_6821ab7c_like;
DROP INDEX IF EXISTS public.auth_user_user_permissions_user_id_a95ead1b;
DROP INDEX IF EXISTS public.auth_user_user_permissions_permission_id_1fbb5f2c;
DROP INDEX IF EXISTS public.auth_user_groups_user_id_6a12ed8b;
DROP INDEX IF EXISTS public.auth_user_groups_group_id_97559544;
DROP INDEX IF EXISTS public.auth_permission_content_type_id_2f476e4b;
DROP INDEX IF EXISTS public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX IF EXISTS public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX IF EXISTS public.auth_group_name_a6ea08ec_like;
ALTER TABLE IF EXISTS ONLY public.server_tourtype DROP CONSTRAINT IF EXISTS server_tourtype_pkey;
ALTER TABLE IF EXISTS ONLY public.server_tour_types DROP CONSTRAINT IF EXISTS server_tour_types_tour_id_tourtype_id_bebb214e_uniq;
ALTER TABLE IF EXISTS ONLY public.server_tour_types DROP CONSTRAINT IF EXISTS server_tour_types_pkey;
ALTER TABLE IF EXISTS ONLY public.server_tour DROP CONSTRAINT IF EXISTS server_tour_slug_91b02364_uniq;
ALTER TABLE IF EXISTS ONLY public.server_tour DROP CONSTRAINT IF EXISTS server_tour_pkey;
ALTER TABLE IF EXISTS ONLY public.server_socialmediapost DROP CONSTRAINT IF EXISTS server_socialmediapost_url_91572985_uniq;
ALTER TABLE IF EXISTS ONLY public.server_socialmediapost DROP CONSTRAINT IF EXISTS server_socialmediapost_pkey;
ALTER TABLE IF EXISTS ONLY public.server_notification DROP CONSTRAINT IF EXISTS server_notification_pkey;
ALTER TABLE IF EXISTS ONLY public.server_tourcategory DROP CONSTRAINT IF EXISTS server_category_pkey;
ALTER TABLE IF EXISTS ONLY public.django_session DROP CONSTRAINT IF EXISTS django_session_pkey;
ALTER TABLE IF EXISTS ONLY public.django_migrations DROP CONSTRAINT IF EXISTS django_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_taskresult DROP CONSTRAINT IF EXISTS django_celery_results_taskresult_task_id_key;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_taskresult DROP CONSTRAINT IF EXISTS django_celery_results_taskresult_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_groupresult DROP CONSTRAINT IF EXISTS django_celery_results_groupresult_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_groupresult DROP CONSTRAINT IF EXISTS django_celery_results_groupresult_group_id_key;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_chordcounter DROP CONSTRAINT IF EXISTS django_celery_results_chordcounter_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_results_chordcounter DROP CONSTRAINT IF EXISTS django_celery_results_chordcounter_group_id_key;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_solarschedule DROP CONSTRAINT IF EXISTS django_celery_beat_solarschedule_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_solarschedule DROP CONSTRAINT IF EXISTS django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictasks DROP CONSTRAINT IF EXISTS django_celery_beat_periodictasks_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_periodictask_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_periodictask DROP CONSTRAINT IF EXISTS django_celery_beat_periodictask_name_key;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_intervalschedule DROP CONSTRAINT IF EXISTS django_celery_beat_intervalschedule_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_crontabschedule DROP CONSTRAINT IF EXISTS django_celery_beat_crontabschedule_pkey;
ALTER TABLE IF EXISTS ONLY public.django_celery_beat_clockedschedule DROP CONSTRAINT IF EXISTS django_celery_beat_clockedschedule_pkey;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_user DROP CONSTRAINT IF EXISTS auth_user_username_key;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_user DROP CONSTRAINT IF EXISTS auth_user_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_user_id_group_id_94350c0c_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_name_key;
DROP TABLE IF EXISTS public.server_tourtype;
DROP TABLE IF EXISTS public.server_tour_types;
DROP TABLE IF EXISTS public.server_tour;
DROP TABLE IF EXISTS public.server_socialmediapost;
DROP TABLE IF EXISTS public.server_notification;
DROP TABLE IF EXISTS public.server_tourcategory;
DROP TABLE IF EXISTS public.django_session;
DROP TABLE IF EXISTS public.django_migrations;
DROP TABLE IF EXISTS public.django_content_type;
DROP TABLE IF EXISTS public.django_celery_results_taskresult;
DROP TABLE IF EXISTS public.django_celery_results_groupresult;
DROP TABLE IF EXISTS public.django_celery_results_chordcounter;
DROP TABLE IF EXISTS public.django_celery_beat_solarschedule;
DROP TABLE IF EXISTS public.django_celery_beat_periodictasks;
DROP TABLE IF EXISTS public.django_celery_beat_periodictask;
DROP TABLE IF EXISTS public.django_celery_beat_intervalschedule;
DROP TABLE IF EXISTS public.django_celery_beat_crontabschedule;
DROP TABLE IF EXISTS public.django_celery_beat_clockedschedule;
DROP TABLE IF EXISTS public.django_admin_log;
DROP TABLE IF EXISTS public.auth_user_user_permissions;
DROP TABLE IF EXISTS public.auth_user_groups;
DROP TABLE IF EXISTS public.auth_user;
DROP TABLE IF EXISTS public.auth_permission;
DROP TABLE IF EXISTS public.auth_group_permissions;
DROP TABLE IF EXISTS public.auth_group;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_beat_clockedschedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_clockedschedule (
    id integer NOT NULL,
    clocked_time timestamp with time zone NOT NULL
);


--
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_beat_clockedschedule ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_beat_clockedschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_beat_crontabschedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_crontabschedule (
    id integer NOT NULL,
    minute character varying(240) NOT NULL,
    hour character varying(96) NOT NULL,
    day_of_week character varying(64) NOT NULL,
    day_of_month character varying(124) NOT NULL,
    month_of_year character varying(64) NOT NULL,
    timezone character varying(63) NOT NULL
);


--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_beat_crontabschedule ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_beat_crontabschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_beat_intervalschedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_intervalschedule (
    id integer NOT NULL,
    every integer NOT NULL,
    period character varying(24) NOT NULL
);


--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_beat_intervalschedule ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_beat_intervalschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_beat_periodictask; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_periodictask (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    task character varying(200) NOT NULL,
    args text NOT NULL,
    kwargs text NOT NULL,
    queue character varying(200),
    exchange character varying(200),
    routing_key character varying(200),
    expires timestamp with time zone,
    enabled boolean NOT NULL,
    last_run_at timestamp with time zone,
    total_run_count integer NOT NULL,
    date_changed timestamp with time zone NOT NULL,
    description text NOT NULL,
    crontab_id integer,
    interval_id integer,
    solar_id integer,
    one_off boolean NOT NULL,
    start_time timestamp with time zone,
    priority integer,
    headers text NOT NULL,
    clocked_id integer,
    expire_seconds integer,
    CONSTRAINT django_celery_beat_periodictask_expire_seconds_check CHECK ((expire_seconds >= 0)),
    CONSTRAINT django_celery_beat_periodictask_priority_check CHECK ((priority >= 0)),
    CONSTRAINT django_celery_beat_periodictask_total_run_count_check CHECK ((total_run_count >= 0))
);


--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_beat_periodictask ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_beat_periodictask_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_beat_periodictasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_periodictasks (
    ident smallint NOT NULL,
    last_update timestamp with time zone NOT NULL
);


--
-- Name: django_celery_beat_solarschedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_beat_solarschedule (
    id integer NOT NULL,
    event character varying(24) NOT NULL,
    latitude numeric(9,6) NOT NULL,
    longitude numeric(9,6) NOT NULL
);


--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_beat_solarschedule ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_beat_solarschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_results_chordcounter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_results_chordcounter (
    id integer NOT NULL,
    group_id character varying(255) NOT NULL,
    sub_tasks text NOT NULL,
    count integer NOT NULL,
    CONSTRAINT django_celery_results_chordcounter_count_check CHECK ((count >= 0))
);


--
-- Name: django_celery_results_chordcounter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_results_chordcounter ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_results_chordcounter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_results_groupresult; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_results_groupresult (
    id integer NOT NULL,
    group_id character varying(255) NOT NULL,
    date_created timestamp with time zone NOT NULL,
    date_done timestamp with time zone NOT NULL,
    content_type character varying(128) NOT NULL,
    content_encoding character varying(64) NOT NULL,
    result text
);


--
-- Name: django_celery_results_groupresult_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_results_groupresult ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_results_groupresult_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_celery_results_taskresult; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_celery_results_taskresult (
    id integer NOT NULL,
    task_id character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    content_type character varying(128) NOT NULL,
    content_encoding character varying(64) NOT NULL,
    result text,
    date_done timestamp with time zone NOT NULL,
    traceback text,
    meta text,
    task_args text,
    task_kwargs text,
    task_name character varying(255),
    worker character varying(100),
    date_created timestamp with time zone NOT NULL,
    periodic_task_name character varying(255),
    date_started timestamp with time zone
);


--
-- Name: django_celery_results_taskresult_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_celery_results_taskresult ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_celery_results_taskresult_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


--
-- Name: server_tourcategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_tourcategory (
    id bigint NOT NULL,
    name_ru character varying(200) NOT NULL,
    name_ua character varying(200) NOT NULL,
    name_en character varying(200) NOT NULL,
    ordering integer NOT NULL
);


--
-- Name: server_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_tourcategory ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_notification (
    id bigint NOT NULL,
    title_ru character varying(100) NOT NULL,
    title_ua character varying(100) NOT NULL,
    title_en character varying(100) NOT NULL,
    description_ru text NOT NULL,
    description_ua text NOT NULL,
    description_en text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: server_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_notification ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_socialmediapost; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_socialmediapost (
    id bigint NOT NULL,
    url character varying(500) NOT NULL,
    social_media character varying(100) NOT NULL,
    image character varying(100),
    display_order integer NOT NULL,
    is_active boolean NOT NULL,
    oembed_html text,
    thumbnail_url character varying(1000),
    title character varying(500),
    CONSTRAINT server_socialmediapost_display_order_check CHECK ((display_order >= 0))
);


--
-- Name: server_socialmediapost_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_socialmediapost ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_socialmediapost_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_tour; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_tour (
    id bigint NOT NULL,
    title_ru character varying(100) NOT NULL,
    title_ua character varying(100) NOT NULL,
    title_en character varying(100) NOT NULL,
    image character varying(100),
    description_en text NOT NULL,
    description_ru text NOT NULL,
    description_ua text NOT NULL,
    cost_from integer NOT NULL,
    cost_to integer NOT NULL,
    is_available boolean NOT NULL,
    category_id bigint NOT NULL,
    slug character varying(120) NOT NULL
);


--
-- Name: server_tour_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_tour ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_tour_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_tour_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_tour_types (
    id bigint NOT NULL,
    tour_id bigint NOT NULL,
    tourtype_id bigint NOT NULL
);


--
-- Name: server_tour_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_tour_types ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_tour_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_tourtype; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_tourtype (
    id bigint NOT NULL,
    name_ru character varying(200) NOT NULL,
    name_ua character varying(200) NOT NULL,
    name_en character varying(200) NOT NULL,
    ordering integer NOT NULL
);


--
-- Name: server_tourtype_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.server_tourtype ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.server_tourtype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add Тур	7	add_tour
26	Can change Тур	7	change_tour
27	Can delete Тур	7	delete_tour
28	Can view Тур	7	view_tour
29	Can add Тип Тура	8	add_tourtype
30	Can change Тип Тура	8	change_tourtype
31	Can delete Тип Тура	8	delete_tourtype
32	Can view Тип Тура	8	view_tourtype
33	Can add Категорию Тура	9	add_tourcategory
34	Can change Категорию Тура	9	change_tourcategory
35	Can delete Категорию Тура	9	delete_tourcategory
36	Can view Категорию Тура	9	view_tourcategory
37	Can add Пост Социальной Сети	10	add_socialmediapost
38	Can change Пост Социальной Сети	10	change_socialmediapost
39	Can delete Пост Социальной Сети	10	delete_socialmediapost
40	Can view Пост Социальной Сети	10	view_socialmediapost
41	Can add Уведомление	11	add_notification
42	Can change Уведомление	11	change_notification
43	Can delete Уведомление	11	delete_notification
44	Can view Уведомление	11	view_notification
45	Can add crontab	12	add_crontabschedule
46	Can change crontab	12	change_crontabschedule
47	Can delete crontab	12	delete_crontabschedule
48	Can view crontab	12	view_crontabschedule
49	Can add interval	13	add_intervalschedule
50	Can change interval	13	change_intervalschedule
51	Can delete interval	13	delete_intervalschedule
52	Can view interval	13	view_intervalschedule
53	Can add periodic task	14	add_periodictask
54	Can change periodic task	14	change_periodictask
55	Can delete periodic task	14	delete_periodictask
56	Can view periodic task	14	view_periodictask
57	Can add periodic task track	15	add_periodictasks
58	Can change periodic task track	15	change_periodictasks
59	Can delete periodic task track	15	delete_periodictasks
60	Can view periodic task track	15	view_periodictasks
61	Can add solar event	16	add_solarschedule
62	Can change solar event	16	change_solarschedule
63	Can delete solar event	16	delete_solarschedule
64	Can view solar event	16	view_solarschedule
65	Can add clocked	17	add_clockedschedule
66	Can change clocked	17	change_clockedschedule
67	Can delete clocked	17	delete_clockedschedule
68	Can view clocked	17	view_clockedschedule
69	Can add task result	18	add_taskresult
70	Can change task result	18	change_taskresult
71	Can delete task result	18	delete_taskresult
72	Can view task result	18	view_taskresult
73	Can add chord counter	19	add_chordcounter
74	Can change chord counter	19	change_chordcounter
75	Can delete chord counter	19	delete_chordcounter
76	Can view chord counter	19	view_chordcounter
77	Can add group result	20	add_groupresult
78	Can change group result	20	change_groupresult
79	Can delete group result	20	delete_groupresult
80	Can view group result	20	view_groupresult
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
2	pbkdf2_sha256$870000$iS2oUBucRADq8Nh9VFXtar$BU5bUGV1JlwLwVug7T6XWMeGPrIgxMOYVzf5QDHBnQ8=	2025-03-03 11:09:49.469513+00	t	anna.bezai				t	t	2025-01-19 22:33:13.547853+00
1	pbkdf2_sha256$1000000$brjDN1TVGsdGV0J67MhMfe$YcPcCiomL/3n3jXUi8S5Folb9RnRBie+ArMjW4o6Rjc=	2026-01-25 23:51:32.095923+00	t	viktor.bezai			viktorbezai@gmail.com	t	t	2025-01-19 22:31:43.041941+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2025-01-19 22:51:48.315165+00	1	Популярные	1	[{"added": {}}]	9	1
2	2025-01-19 22:52:30.746229+00	1	Индивидуальные	1	[{"added": {}}]	8	1
3	2025-01-19 23:45:12.743626+00	2	Групповые	1	[{"added": {}}]	9	1
4	2025-01-19 23:45:50.763519+00	1	Экскурсия в Каир и Пирамиды Гизы	1	[{"added": {}}]	7	1
5	2025-01-19 23:46:28.392404+00	1	Индивидуальные	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Name (English)", "\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	9	1
6	2025-01-19 23:47:14.727589+00	1	Морские	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Name (English)"]}}]	8	1
7	2025-01-19 23:47:24.818871+00	2	Популярные	1	[{"added": {}}]	8	1
8	2025-01-19 23:47:28.53511+00	1	Морские	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	8	1
9	2025-01-19 23:47:56.891334+00	1	Экскурсия в Каир и Пирамиды Гизы	2	[{"changed": {"fields": ["types"]}}]	7	1
10	2025-01-19 23:49:13.84637+00	2	Луксор и Долина Царей	1	[{"added": {}}]	7	1
11	2025-01-19 23:50:20.141201+00	3	Морская прогулка на остров Тиран или Рас-Мохаммед	1	[{"added": {}}]	7	1
12	2025-01-19 23:52:21.798737+00	1	Экскурсия в Каир и Пирамиды Гизы	2	[{"changed": {"fields": ["Image"]}}]	7	1
13	2025-01-19 23:53:45.004433+00	2	Луксор и Долина Царей	2	[{"changed": {"fields": ["Image"]}}]	7	1
14	2025-01-19 23:58:23.119559+00	3	Морская прогулка на остров Тиран	2	[{"changed": {"fields": ["Image", "\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)"]}}]	7	1
15	2025-01-19 23:58:54.42761+00	3	Трансфер	1	[{"added": {}}]	9	1
16	2025-01-20 00:24:42.543747+00	29	https://www.tiktok.com/@assis_travel/video/7461272290186120453	3		10	1
17	2025-01-22 23:01:51.41128+00	2	Луксор	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)", "types", "\\u041e\\u043f\\u0438\\u0441\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u043e\\u0442", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u0434\\u043e"]}}]	7	2
18	2025-01-22 23:04:20.639462+00	1	Морские	2	[]	8	2
19	2025-01-22 23:04:29.002431+00	2	Популярные	2	[]	8	2
20	2025-01-22 23:04:44.947403+00	2	Популярные	2	[]	8	2
21	2025-01-22 23:06:14.583085+00	3	Семйные	1	[{"added": {}}]	8	2
22	2025-01-22 23:08:20.363927+00	4	Развлекательные	1	[{"added": {}}]	8	2
23	2025-01-22 23:13:45.235681+00	5	Исторические	1	[{"added": {}}]	8	2
24	2025-01-22 23:14:50.673634+00	6	Сафари	1	[{"added": {}}]	8	2
25	2025-01-22 23:16:06.391434+00	7	SPA	1	[{"added": {}}]	8	2
26	2025-01-22 23:17:21.79382+00	3	Семейные	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)"]}}]	8	2
27	2025-01-22 23:18:13.12177+00	2	Луксор	2	[{"changed": {"fields": ["types"]}}]	7	2
28	2025-01-22 23:24:40.371973+00	4	Из Хургады	1	[{"added": {}}]	9	2
29	2025-01-22 23:26:07.080669+00	5	Из Шарм эль Шейха	1	[{"added": {}}]	9	2
30	2025-01-22 23:26:22.992378+00	5	Из Шарм эль Шейха	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	9	2
31	2025-01-22 23:26:32.722415+00	2	Групповые	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	9	2
32	2025-01-22 23:26:43.216369+00	1	Индивидуальные	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	9	2
33	2025-01-22 23:26:56.023921+00	3	Трансфер	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	9	2
34	2025-01-22 23:28:33.722196+00	4	Из Хургады	2	[]	9	2
35	2025-01-22 23:29:18.409869+00	2	Луксор	2	[{"changed": {"fields": ["Category"]}}]	7	2
36	2025-01-22 23:30:24.098221+00	2	Луксор	2	[]	7	2
37	2025-01-22 23:32:19.688847+00	4	Из Хургады	3		9	2
38	2025-01-22 23:32:27.933693+00	5	Из Шарм эль Шейха	3		9	2
39	2025-01-22 23:34:09.443795+00	8	Из Хургады	1	[{"added": {}}]	8	2
40	2025-01-22 23:34:24.687566+00	2	Популярные	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	8	2
41	2025-01-22 23:34:47.343633+00	1	Морские	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	8	2
42	2025-01-22 23:35:05.752303+00	6	Сафари	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	8	2
43	2025-01-22 23:35:13.307585+00	7	SPA	2	[{"changed": {"fields": ["\\u041f\\u043e\\u0440\\u044f\\u0434\\u043a\\u043e\\u0432\\u044b\\u0439 \\u043d\\u043e\\u043c\\u0435\\u0440"]}}]	8	2
44	2025-01-22 23:36:01.813544+00	9	Из Шарм эль Шейха	1	[{"added": {}}]	8	2
45	2025-01-22 23:41:56.626711+00	4	Экскурсия в Луксор и Долину Царей	1	[{"added": {}}]	7	1
46	2025-01-22 23:42:43.110247+00	4	Экскурсия в Луксор и Долину Царей	2	[{"changed": {"fields": ["Image"]}}]	7	1
47	2025-01-22 23:50:10.67174+00	4	Экскурсия в Луксор (разные программы)	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)", "types", "\\u041e\\u043f\\u0438\\u0441\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u043e\\u0442", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u0434\\u043e"]}}]	7	2
48	2025-01-22 23:51:22.386266+00	4	Экскурсия в Луксор (разные программы)	2	[]	7	2
49	2025-01-22 23:51:37.097707+00	1	Экскурсия в Каир и Пирамиды Гизы	2	[]	7	2
50	2025-01-22 23:51:51.398882+00	4	Экскурсия в Луксор (разные программы)	2	[{"changed": {"fields": ["Is available"]}}]	7	2
51	2025-02-06 00:09:35.011078+00	4	Экскурсия в Луксор из Хургады (разные программы)	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)"]}}]	7	2
52	2025-02-06 00:28:17.879011+00	5	Сафари в Хургаде (разные программы)	1	[{"added": {}}]	7	2
53	2025-02-06 00:48:45.254053+00	3	Морская прогулка на остров Оранж	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)", "types", "\\u041e\\u043f\\u0438\\u0441\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u043e\\u0442", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u0434\\u043e"]}}]	7	2
54	2025-03-03 12:19:27.509073+00	6	Экскурсия в Каир из Хургады (супер программа)	1	[{"added": {}}]	7	2
55	2025-03-03 12:31:18.08128+00	1	Экскурсия в Каир и Пирамиды Гизы из Хургады(стандартна программа)	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)", "types", "\\u041e\\u043f\\u0438\\u0441\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u043e\\u0442", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u0434\\u043e"]}}]	7	2
56	2025-03-03 12:47:53.457677+00	7	Экскурсия в Каир из Хургады (эконом программа)	1	[{"added": {}}]	7	2
57	2025-03-07 14:09:11.769335+00	8	Экскурсия в Каир из Хургады на самолете	1	[{"added": {}}]	7	2
58	2025-03-07 14:36:40.587918+00	9	Морская экскурсия на остров Парадайс (Hula – Hula)	1	[{"added": {}}]	7	2
59	2025-03-07 14:38:33.421525+00	3	Морская экскурсия на остров Оранж	2	[{"changed": {"fields": ["\\u041d\\u0430\\u0437\\u0432\\u0430\\u043d\\u0438\\u0435 (\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439)", "\\u041d\\u0430\\u0437\\u0432\\u0430 (\\u0423\\u043a\\u0440\\u0430i\\u043d\\u0441\\u044c\\u043a\\u0430)", "Title (English)", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u043e\\u0442", "\\u0421\\u0442\\u043e\\u0438\\u043c\\u043e\\u0441\\u0442\\u044c \\u0434\\u043e"]}}]	7	2
60	2025-03-07 14:45:41.143986+00	10	Морская экскурсия Дом дельфинов	1	[{"added": {}}]	7	2
61	2025-03-07 15:17:21.740353+00	11	Морская экскурсия Все включено 5 в 1	1	[{"added": {}}]	7	2
62	2025-03-07 17:02:28.244549+00	12	Батискаф (полуподводная лодка) и снорклинг	1	[{"added": {}}]	7	2
63	2025-03-07 17:06:12.94904+00	1	Морские	2	[]	8	2
64	2026-01-25 21:13:01.492981+00	39	TikTok: https://www.tiktok.com/@assis_travel/video/7560021421074681099	1	[{"added": {}}]	10	1
65	2026-01-25 21:13:15.57904+00	39	TikTok: https://www.tiktok.com/@assis_travel/video/7560021421074681099	2	[{"changed": {"fields": ["Title"]}}]	10	1
66	2026-01-25 21:16:38.697573+00	40	TikTok: https://www.tiktok.com/@assis_travel/video/7567412356125576459	1	[{"added": {}}]	10	1
67	2026-01-25 21:23:20.692895+00	20	Instagram: https://www.instagram.com/p/DCje24CNMoO	3		10	1
68	2026-01-25 21:23:20.692929+00	19	Instagram: https://www.instagram.com/p/DCtSuN3N-ZB	3		10	1
69	2026-01-25 21:23:20.692942+00	18	Instagram: https://www.instagram.com/p/DCxULOnNazh	3		10	1
70	2026-01-25 21:23:20.692952+00	17	Instagram: https://www.instagram.com/p/DC7VG5zt8G7	3		10	1
71	2026-01-25 21:23:20.692961+00	16	Instagram: https://www.instagram.com/p/DDAcypnNNnw	3		10	1
72	2026-01-25 21:23:20.69297+00	15	Instagram: https://www.instagram.com/p/DDFeqDcNjje	3		10	1
73	2026-01-25 21:23:20.692979+00	14	Instagram: https://www.instagram.com/p/DDIFyfgNP3H	3		10	1
74	2026-01-25 21:23:20.692988+00	13	Instagram: https://www.instagram.com/p/DDJvWzIN7ls	3		10	1
75	2026-01-25 21:23:20.692996+00	12	Instagram: https://www.instagram.com/p/DDerdFGtIF9	3		10	1
76	2026-01-25 21:23:20.693005+00	11	Instagram: https://www.instagram.com/p/DDfUdECNAYH	3		10	1
77	2026-01-25 21:23:20.693014+00	10	Instagram: https://www.instagram.com/p/DDkaRTTt2uQ	3		10	1
78	2026-01-25 21:23:20.693022+00	9	Instagram: https://www.instagram.com/p/DDsH30dNjq6	3		10	1
79	2026-01-25 21:23:20.693031+00	8	Instagram: https://www.instagram.com/p/DDsWiHLNl5W	3		10	1
80	2026-01-25 21:23:20.69305+00	7	Instagram: https://www.instagram.com/p/DD-KQwbtEDZ	3		10	1
81	2026-01-25 21:23:20.693061+00	6	Instagram: https://www.instagram.com/p/DEPzx1-tPJ_	3		10	1
82	2026-01-25 21:23:20.693069+00	5	Instagram: https://www.instagram.com/p/DEnG-putdVz	3		10	1
83	2026-01-25 21:23:20.693078+00	4	Instagram: https://www.instagram.com/p/DEs0op8N_fo	3		10	1
84	2026-01-25 21:23:20.693086+00	3	Instagram: https://www.instagram.com/p/DExwyStNnYA	3		10	1
85	2026-01-25 21:23:20.693094+00	2	Instagram: https://www.instagram.com/p/DE5164CN_Rd	3		10	1
86	2026-01-25 21:23:20.693102+00	1	Instagram: https://www.instagram.com/p/DFAqfhRtkTL	3		10	1
87	2026-01-25 21:24:01.560632+00	44	Instagram: https://www.instagram.com/p/DTuspKcAp5e/	1	[{"added": {}}]	10	1
88	2026-01-25 21:24:09.752028+00	44	Instagram: https://www.instagram.com/p/DTuspKcAp5e/	2	[]	10	1
89	2026-01-25 21:24:20.323007+00	44	Instagram: https://www.instagram.com/p/DTuspKcAp5e/	2	[]	10	1
90	2026-01-25 21:26:21.988248+00	44	Instagram: https://www.instagram.com/p/DTuspKcAp5e/	2	[]	10	1
91	2026-01-26 00:23:23.193756+00	1	Экскурсия в Каир и Пирамиды Гизы из Хургады(стандартна программа)	2	[{"changed": {"fields": ["Image"]}}]	7	1
92	2026-01-26 00:38:45.286183+00	1	Экскурсия в Каир и Пирамиды Гизы из Хургады(стандартна программа)	2	[]	7	1
93	2026-01-26 00:39:05.150608+00	3	Морская экскурсия на остров Оранж	2	[{"changed": {"fields": ["Slug"]}}]	7	1
94	2026-01-26 00:39:53.394458+00	3	Морская экскурсия на остров Оранж	2	[{"changed": {"fields": ["Image"]}}]	7	1
95	2026-01-26 00:40:23.710782+00	3	Морская экскурсия на остров Оранж	2	[]	7	1
96	2026-01-26 00:40:54.557507+00	4	Экскурсия в Луксор из Хургады (разные программы)	2	[{"changed": {"fields": ["Slug"]}}]	7	1
97	2026-01-26 00:41:26.086513+00	4	Экскурсия в Луксор из Хургады (разные программы)	2	[{"changed": {"fields": ["Image"]}}]	7	1
98	2026-01-26 00:44:36.607743+00	12	Батискаф (полуподводная лодка) и снорклинг	2	[{"changed": {"fields": ["Image"]}}]	7	1
99	2026-01-26 00:46:48.939992+00	7	Экскурсия в Каир из Хургады (эконом программа)	2	[{"changed": {"fields": ["Image"]}}]	7	1
100	2026-01-26 00:48:03.574117+00	11	Морская экскурсия Все включено 5 в 1	2	[]	7	1
101	2026-01-26 00:48:35.543443+00	11	Морская экскурсия Все включено 5 в 1	2	[{"changed": {"fields": ["Image"]}}]	7	1
102	2026-01-26 00:50:40.755726+00	10	Морская экскурсия Дом дельфинов	2	[{"changed": {"fields": ["Image"]}}]	7	1
103	2026-01-26 00:52:29.775677+00	9	Морская экскурсия на остров Парадайс (Hula – Hula)	2	[{"changed": {"fields": ["Image"]}}]	7	1
104	2026-01-26 00:54:17.120942+00	6	Экскурсия в Каир из Хургады (супер программа)	2	[{"changed": {"fields": ["Image"]}}]	7	1
105	2026-01-26 00:56:19.144056+00	8	Экскурсия в Каир из Хургады на самолете	2	[{"changed": {"fields": ["Image"]}}]	7	1
106	2026-01-26 00:58:06.028883+00	5	Сафари в Хургаде (разные программы)	2	[{"changed": {"fields": ["Image"]}}]	7	1
\.


--
-- Data for Name: django_celery_beat_clockedschedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_clockedschedule (id, clocked_time) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_crontabschedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_crontabschedule (id, minute, hour, day_of_week, day_of_month, month_of_year, timezone) FROM stdin;
1	0	4	*	*	*	UTC
\.


--
-- Data for Name: django_celery_beat_intervalschedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_intervalschedule (id, every, period) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_periodictask; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_periodictask (id, name, task, args, kwargs, queue, exchange, routing_key, expires, enabled, last_run_at, total_run_count, date_changed, description, crontab_id, interval_id, solar_id, one_off, start_time, priority, headers, clocked_id, expire_seconds) FROM stdin;
1	celery.backend_cleanup	celery.backend_cleanup	[]	{}	\N	\N	\N	\N	t	\N	0	2026-01-25 20:53:01.716623+00		1	\N	\N	f	\N	\N	{}	\N	43200
\.


--
-- Data for Name: django_celery_beat_periodictasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_periodictasks (ident, last_update) FROM stdin;
1	2026-01-25 20:53:01.716971+00
\.


--
-- Data for Name: django_celery_beat_solarschedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_beat_solarschedule (id, event, latitude, longitude) FROM stdin;
\.


--
-- Data for Name: django_celery_results_chordcounter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_results_chordcounter (id, group_id, sub_tasks, count) FROM stdin;
\.


--
-- Data for Name: django_celery_results_groupresult; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_results_groupresult (id, group_id, date_created, date_done, content_type, content_encoding, result) FROM stdin;
\.


--
-- Data for Name: django_celery_results_taskresult; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_celery_results_taskresult (id, task_id, status, content_type, content_encoding, result, date_done, traceback, meta, task_args, task_kwargs, task_name, worker, date_created, periodic_task_name, date_started) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	server	tour
8	server	tourtype
9	server	tourcategory
10	server	socialmediapost
11	server	notification
12	django_celery_beat	crontabschedule
13	django_celery_beat	intervalschedule
14	django_celery_beat	periodictask
15	django_celery_beat	periodictasks
16	django_celery_beat	solarschedule
17	django_celery_beat	clockedschedule
18	django_celery_results	taskresult
19	django_celery_results	chordcounter
20	django_celery_results	groupresult
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2025-01-19 21:09:08.890768+00
2	auth	0001_initial	2025-01-19 21:09:09.001387+00
3	admin	0001_initial	2025-01-19 21:09:09.028373+00
4	admin	0002_logentry_remove_auto_add	2025-01-19 21:09:09.039944+00
5	admin	0003_logentry_add_action_flag_choices	2025-01-19 21:09:09.050536+00
6	contenttypes	0002_remove_content_type_name	2025-01-19 21:09:09.076074+00
7	auth	0002_alter_permission_name_max_length	2025-01-19 21:09:09.088057+00
8	auth	0003_alter_user_email_max_length	2025-01-19 21:09:09.099313+00
9	auth	0004_alter_user_username_opts	2025-01-19 21:09:09.109684+00
10	auth	0005_alter_user_last_login_null	2025-01-19 21:09:09.121301+00
11	auth	0006_require_contenttypes_0002	2025-01-19 21:09:09.123641+00
12	auth	0007_alter_validators_add_error_messages	2025-01-19 21:09:09.134079+00
13	auth	0008_alter_user_username_max_length	2025-01-19 21:09:09.151404+00
14	auth	0009_alter_user_last_name_max_length	2025-01-19 21:09:09.166985+00
15	auth	0010_alter_group_name_max_length	2025-01-19 21:09:09.184063+00
16	auth	0011_update_proxy_permissions	2025-01-19 21:09:09.193948+00
17	auth	0012_alter_user_first_name_max_length	2025-01-19 21:09:09.204098+00
18	server	0001_initial	2025-01-19 21:09:09.231819+00
19	server	0002_tourtype_rename_category_tourcategory_and_more	2025-01-19 21:09:09.315565+00
20	server	0003_socialmediapost	2025-01-19 21:09:09.326031+00
21	server	0004_alter_socialmediapost_image_url	2025-01-19 21:09:09.331896+00
22	server	0005_notification	2025-01-19 21:09:09.342635+00
23	server	0006_rename_description_ukr_notification_description_ua_and_more	2025-01-19 21:09:09.366257+00
24	server	0007_tour_slug	2025-01-19 21:09:09.3982+00
25	server	0008_alter_tour_slug	2025-01-19 21:09:09.416296+00
26	server	0009_tourcategory_ordering_tourtype_ordering	2025-01-19 21:09:09.430654+00
27	sessions	0001_initial	2025-01-19 21:09:09.452472+00
28	django_celery_beat	0001_initial	2026-01-25 20:39:49.941219+00
29	django_celery_beat	0002_auto_20161118_0346	2026-01-25 20:39:49.949198+00
30	django_celery_beat	0003_auto_20161209_0049	2026-01-25 20:39:49.952174+00
31	django_celery_beat	0004_auto_20170221_0000	2026-01-25 20:39:49.953346+00
32	django_celery_beat	0005_add_solarschedule_events_choices	2026-01-25 20:39:49.954463+00
33	django_celery_beat	0006_auto_20180322_0932	2026-01-25 20:39:49.967663+00
34	django_celery_beat	0007_auto_20180521_0826	2026-01-25 20:39:49.973477+00
35	django_celery_beat	0008_auto_20180914_1922	2026-01-25 20:39:49.985522+00
36	django_celery_beat	0006_auto_20180210_1226	2026-01-25 20:39:49.992079+00
37	django_celery_beat	0006_periodictask_priority	2026-01-25 20:39:49.995853+00
38	django_celery_beat	0009_periodictask_headers	2026-01-25 20:39:49.999291+00
39	django_celery_beat	0010_auto_20190429_0326	2026-01-25 20:39:50.0635+00
40	django_celery_beat	0011_auto_20190508_0153	2026-01-25 20:39:50.071389+00
41	django_celery_beat	0012_periodictask_expire_seconds	2026-01-25 20:39:50.074601+00
42	django_celery_beat	0013_auto_20200609_0727	2026-01-25 20:39:50.078291+00
43	django_celery_beat	0014_remove_clockedschedule_enabled	2026-01-25 20:39:50.079736+00
44	django_celery_beat	0015_edit_solarschedule_events_choices	2026-01-25 20:39:50.080846+00
45	django_celery_beat	0016_alter_crontabschedule_timezone	2026-01-25 20:39:50.084538+00
46	django_celery_beat	0017_alter_crontabschedule_month_of_year	2026-01-25 20:39:50.087384+00
47	django_celery_beat	0018_improve_crontab_helptext	2026-01-25 20:39:50.090366+00
48	django_celery_beat	0019_alter_periodictasks_options	2026-01-25 20:39:50.09116+00
49	django_celery_results	0001_initial	2026-01-25 20:39:50.097002+00
50	django_celery_results	0002_add_task_name_args_kwargs	2026-01-25 20:39:50.099154+00
51	django_celery_results	0003_auto_20181106_1101	2026-01-25 20:39:50.100013+00
52	django_celery_results	0004_auto_20190516_0412	2026-01-25 20:39:50.109528+00
53	django_celery_results	0005_taskresult_worker	2026-01-25 20:39:50.112388+00
54	django_celery_results	0006_taskresult_date_created	2026-01-25 20:39:50.120826+00
55	django_celery_results	0007_remove_taskresult_hidden	2026-01-25 20:39:50.122658+00
56	django_celery_results	0008_chordcounter	2026-01-25 20:39:50.128147+00
57	django_celery_results	0009_groupresult	2026-01-25 20:39:50.160007+00
58	django_celery_results	0010_remove_duplicate_indices	2026-01-25 20:39:50.162018+00
59	django_celery_results	0011_taskresult_periodic_task_name	2026-01-25 20:39:50.163202+00
60	django_celery_results	0012_taskresult_date_started	2026-01-25 20:39:50.164472+00
61	django_celery_results	0013_taskresult_django_cele_periodi_1993cf_idx	2026-01-25 20:39:50.167094+00
62	django_celery_results	0014_alter_taskresult_status	2026-01-25 20:39:50.168053+00
63	server	0010_socialmediapost_image_and_more	2026-01-25 20:40:02.180185+00
64	server	0010_alter_socialmediapost_options_and_more	2026-01-25 21:08:20.882514+00
65	server	0011_alter_socialmediapost_thumbnail_url_and_more	2026-01-25 21:12:52.360114+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
enh8utk019h8qfdneg53ej38pyrslauh	.eJxVjDsOwjAQBe_iGln-xg4lPWew1rtrHECOFCcV4u4QKQW0b2beSyTY1pq2zkuaSJyFFqffLQM-uO2A7tBus8S5rcuU5a7Ig3Z5nYmfl8P9O6jQ67f2QLbEWAIiKwNKq0hupOKBccCgvLIlB6Do_ICjs5ZMYYacQZuAhOL9AQNsORY:1tZdpj:_dbzzQXT0JByE7cKy41_2ek3cs__NIqsCjNkUhabCnw	2025-02-02 22:31:55.102852+00
arjgdngzppt94da9kjvdr1h30boctfzo	.eJxVjDsOwjAQBe_iGln-xg4lPWew1rtrHECOFCcV4u4QKQW0b2beSyTY1pq2zkuaSJyFFqffLQM-uO2A7tBus8S5rcuU5a7Ig3Z5nYmfl8P9O6jQ67f2QLbEWAIiKwNKq0hupOKBccCgvLIlB6Do_ICjs5ZMYYacQZuAhOL9AQNsORY:1tZfKO:-eEZmLHAVVHHAg6ErQz5Ephmi16w9SWZobHBmhnyUnA	2025-02-03 00:07:40.827073+00
19gqtvhh2gv68u5dtqjl2ex4fp866ynh	.eJxVjDEOAiEQRe9CbQigwGBp7xnIDDCyaiBZdivj3XWTLbT9773_EhHXpcZ1lDlOWZyFEYffjTA9SttAvmO7dZl6W-aJ5KbInQ557bk8L7v7d1Bx1G-t2APrIybNxgTrPDGhUwgOQBtLBAjKB_BZg2cXFDliLsb6UzAlBfH-ANe2N5U:1tajdw:Rn_GJwRsKo6hytBVyM4oQaUa4ARGhmrrM7LnGCMWWVQ	2025-02-05 22:56:16.396446+00
h15hujucal42qmt7ga3psf8zjnbpo9wt	.eJxVjDsOwjAQBe_iGln-xg4lPWew1rtrHECOFCcV4u4QKQW0b2beSyTY1pq2zkuaSJyFFqffLQM-uO2A7tBus8S5rcuU5a7Ig3Z5nYmfl8P9O6jQ67f2QLbEWAIiKwNKq0hupOKBccCgvLIlB6Do_ICjs5ZMYYacQZuAhOL9AQNsORY:1takA8:qahTXVXOrXco_jZ8za8xuapGbzDWvToQSWvFka9ju38	2025-02-05 23:29:32.624452+00
2il94hm7a4deji71zme4dnn4qllu6k7l	.eJxVjDEOAiEQRe9CbQigwGBp7xnIDDCyaiBZdivj3XWTLbT9773_EhHXpcZ1lDlOWZyFEYffjTA9SttAvmO7dZl6W-aJ5KbInQ557bk8L7v7d1Bx1G-t2APrIybNxgTrPDGhUwgOQBtLBAjKB_BZg2cXFDliLsb6UzAlBfH-ANe2N5U:1tfpRq:HhaaEvt2pR97DZxtcTlbUgfePLIZ17aBJ5qOFiAPAJ0	2025-02-20 00:08:50.835002+00
qeno6ksuzqoj9mljwd35x59f9knlbl1u	.eJxVjDsOwjAQBe_iGln-xg4lPWew1rtrHECOFCcV4u4QKQW0b2beSyTY1pq2zkuaSJyFFqffLQM-uO2A7tBus8S5rcuU5a7Ig3Z5nYmfl8P9O6jQ67f2QLbEWAIiKwNKq0hupOKBccCgvLIlB6Do_ICjs5ZMYYacQZuAhOL9AQNsORY:1tgqNK:RWfOC_967PujzOtzea5kYCuXRMYSXxUxMuvHS-qYDw4	2025-02-22 19:20:22.325978+00
i52nh2448vyxrmw7984y7iarlj44mf1f	.eJxVjDEOAiEQRe9CbQigwGBp7xnIDDCyaiBZdivj3XWTLbT9773_EhHXpcZ1lDlOWZyFEYffjTA9SttAvmO7dZl6W-aJ5KbInQ557bk8L7v7d1Bx1G-t2APrIybNxgTrPDGhUwgOQBtLBAjKB_BZg2cXFDliLsb6UzAlBfH-ANe2N5U:1tp3gD:hIkGth-sT16eu6YCYV8l_nmcUMF9pwv2QWws50VCKoY	2025-03-17 11:09:49.488237+00
0k8sba64oy76td5xonwlmy05v0mywi2b	.eJxVjMEOwiAQBf-FsyFAgQWP3v0GsiwgVQNJaU_Gf9cmPej1zcx7sYDbWsM28hLmxM5MstPvFpEeue0g3bHdOqfe1mWOfFf4QQe_9pSfl8P9O6g46rdGUiqBtgKic5MHncAYkYuOZNBnA2KKxpqShCzOFglZIulCHrzSQmr2_gDSVDdQ:1vk6uk:zuU5NweK8_KoTmBf1SbzpB88wl1txmAq8kxiq3c0-OE	2026-02-08 20:40:54.346408+00
a8xxk841yt2704e5q0on41rh4048oa83	.eJxVjMEOwiAQBf-FsyFAgQWP3v0GsiwgVQNJaU_Gf9cmPej1zcx7sYDbWsM28hLmxM5MstPvFpEeue0g3bHdOqfe1mWOfFf4QQe_9pSfl8P9O6g46rdGUiqBtgKic5MHncAYkYuOZNBnA2KKxpqShCzOFglZIulCHrzSQmr2_gDSVDdQ:1vk9W4:CIVt2sF3WrXEQGw9BPmV0_oJJul7s1AcpIyrWndey3s	2026-02-08 23:27:36.406894+00
4xtwxlzn62lf16mqshu3p07jnk2eoy0l	.eJxVjMEOwiAQBf-FsyFAgQWP3v0GsiwgVQNJaU_Gf9cmPej1zcx7sYDbWsM28hLmxM5MstPvFpEeue0g3bHdOqfe1mWOfFf4QQe_9pSfl8P9O6g46rdGUiqBtgKic5MHncAYkYuOZNBnA2KKxpqShCzOFglZIulCHrzSQmr2_gDSVDdQ:1vk9tE:L5XWyrZ-Y4av5YU4emKqa58MhNtDn9zVJAiC_a6lOUI	2026-02-08 23:51:32.104789+00
\.


--
-- Data for Name: server_notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_notification (id, title_ru, title_ua, title_en, description_ru, description_ua, description_en, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: server_socialmediapost; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_socialmediapost (id, url, social_media, image, display_order, is_active, oembed_html, thumbnail_url, title) FROM stdin;
40	https://www.tiktok.com/@assis_travel/video/7567412356125576459	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7567412356125576459" data-video-id="7567412356125576459" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p>Ответ пользователю @Nati <a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7567412385301023500?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/o8QHEfGgBgM0ih2CvEi2mjIXgAkIycGoxwIIxA~tplv-tiktokx-origin.image?dr=14575&x-expires=1769547600&x-signature=3MPwBpJBwtzqzXvoNM03K4SU22Y%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2	Ответ пользователю @Nati #anna_egypt 
39	https://www.tiktok.com/@assis_travel/video/7560021421074681099	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7560021421074681099" data-video-id="7560021421074681099" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> <a title="hurghadaegypt" target="_blank" href="https://www.tiktok.com/tag/hurghadaegypt?refer=embed">#hurghadaegypt</a> <a title="hurghada" target="_blank" href="https://www.tiktok.com/tag/hurghada?refer=embed">#hurghada</a> <a title="egypt" target="_blank" href="https://www.tiktok.com/tag/egypt?refer=embed">#egypt</a> <a title="хургада" target="_blank" href="https://www.tiktok.com/tag/%D1%85%D1%83%D1%80%D0%B3%D0%B0%D0%B4%D0%B0?refer=embed">#хургада</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7560021563370703627?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oYJDUgfijod40EykYIAsIiA6dlI8iZCaB63Ulq~tplv-tiktokx-origin.image?dr=14575&x-expires=1769547600&x-signature=1QgBL0ozNpRQ9lmibpHEAJwwrrM%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2	#anna_egypt #hurghadaegypt #hurghada #egypt #хургада
41	https://www.tiktok.com/@assis_travel/video/7599396086460992789	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7599396086460992789" data-video-id="7599396086460992789" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p>Для бронирования индивидуальных экскурсий в Каир пишите в личные сообщения <a title="египет" target="_blank" href="https://www.tiktok.com/tag/%D0%B5%D0%B3%D0%B8%D0%BF%D0%B5%D1%82?refer=embed">#египет</a> <a title="сфинкс" target="_blank" href="https://www.tiktok.com/tag/%D1%81%D1%84%D0%B8%D0%BD%D0%BA%D1%81?refer=embed">#сфинкс</a> <a title="пирамиды" target="_blank" href="https://www.tiktok.com/tag/%D0%BF%D0%B8%D1%80%D0%B0%D0%BC%D0%B8%D0%B4%D1%8B?refer=embed">#пирамиды</a> <a title="пирамида" target="_blank" href="https://www.tiktok.com/tag/%D0%BF%D0%B8%D1%80%D0%B0%D0%BC%D0%B8%D0%B4%D0%B0?refer=embed">#пирамида</a> <a title="экскурсиявкаир" target="_blank" href="https://www.tiktok.com/tag/%D1%8D%D0%BA%D1%81%D0%BA%D1%83%D1%80%D1%81%D0%B8%D1%8F%D0%B2%D0%BA%D0%B0%D0%B8%D1%80?refer=embed">#экскурсиявкаир</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7599396139015670546?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/okpszgQIfTj2PgWgaCLSAeDGA444TD6oeP7IM3~tplv-tiktokx-origin.image?dr=14575&x-expires=1769547600&x-signature=fj%2FTWZfUmi1hClBZ21%2B2EADVYzE%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2	Для бронирования индивидуальных экскурсий в Каир пишите в личные сообщения #египет #сфинкс #пирамиды #пирамида #экскурсиявкаир 
42	https://www.tiktok.com/@assis_travel/video/7599356907958144277	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7599356907958144277" data-video-id="7599356907958144277" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="вэтотдень" target="_blank" href="https://www.tiktok.com/tag/%D0%B2%D1%8D%D1%82%D0%BE%D1%82%D0%B4%D0%B5%D0%BD%D1%8C?refer=embed">#ВэтотДень</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7599356972626021140?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/owi4EBAFrIlsBRAgrcEdqZIl0TV6DfbBcuupf2~tplv-tiktokx-origin.image?dr=14575&x-expires=1769547600&x-signature=%2B3c5IHVFLdZ%2F5BQDTuXWBe5SdIY%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2	#ВэтотДень 
43	https://www.tiktok.com/@assis_travel/video/7599003872367054100	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7599003872367054100" data-video-id="7599003872367054100" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p>Вечером Старый Каир и Эль-Муиз как живая сказка. Огни фонарей, тёплый камень, тени веков на стенах… Идёшь и сердце тихо сдаётся. Кажется, я влюбилась… Кто со мной за этими ощущениями? Пишите в личку </p> <a target="_blank" title="♬ الصوت الأصلي - YASMEN 🌸🌸" href="https://www.tiktok.com/music/الصوت-الأصلي-7168160109683264261?refer=embed">♬ الصوت الأصلي - YASMEN 🌸🌸</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oEYFdFVt0dAzlsN1AwiiwmBfCuAIlYLIIgvouo~tplv-tiktokx-origin.image?dr=14575&x-expires=1769547600&x-signature=TESqgoPGnifeCy4BicT3kULvBBI%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2	Вечером Старый Каир и Эль-Муиз как живая сказка. Огни фонарей, тёплый камень, тени веков на стенах… Идёшь и сердце тихо сдаётся. Кажется, я влюбилась… Кто со мной за этими ощущениями? Пишите в личку 
44	https://www.instagram.com/p/DTuspKcAp5e/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTuspKcAp5e/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
45	https://www.instagram.com/p/DT55pplgiZv/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DT55pplgiZv/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
46	https://www.instagram.com/p/DTxLZw2gn4M/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTxLZw2gn4M/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
47	https://www.instagram.com/p/DTsYr9Jgt4S/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTsYr9Jgt4S/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
48	https://www.instagram.com/p/DTpXyakgqwc/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTpXyakgqwc/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
49	https://www.instagram.com/p/DTXsybCAiaR/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTXsybCAiaR/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
50	https://www.instagram.com/p/DTOgkHbguML/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTOgkHbguML/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
51	https://www.instagram.com/p/DS-XcisAqgM/	Instagram	\N	0	t	<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DS-XcisAqgM/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>	\N	\N
52	https://www.tiktok.com/@assis_travel/video/7586377307502169355?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7586377307502169355" data-video-id="7586377307502169355" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> </p> <a target="_blank" title="♬ Збився Рахунок - Олена Петренко" href="https://www.tiktok.com/music/Збився-Рахунок-7586549771650975761?refer=embed">♬ Збився Рахунок - Олена Петренко</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oocBwCpIUDSDyB1MQNJJDfEBFCAVpLVfXFDS4I~tplv-tiktokx-origin.image?dr=14575&x-expires=1769562000&x-signature=UO28qQfv8QExGdaL79Ntn3cqVRk%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt 
53	https://www.tiktok.com/@assis_travel/video/7551485415279054136?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7551485415279054136" data-video-id="7551485415279054136" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> <a title="egypt" target="_blank" href="https://www.tiktok.com/tag/egypt?refer=embed">#egypt</a> <a title="египет" target="_blank" href="https://www.tiktok.com/tag/%D0%B5%D0%B3%D0%B8%D0%BF%D0%B5%D1%82?refer=embed">#египет</a> <a title="hurghada" target="_blank" href="https://www.tiktok.com/tag/hurghada?refer=embed">#hurghada</a> <a title="хургада" target="_blank" href="https://www.tiktok.com/tag/%D1%85%D1%83%D1%80%D0%B3%D0%B0%D0%B4%D0%B0?refer=embed">#хургада</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7551485430236990220?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oYSnmoejXQgGIDyCIRHga0GYLBeLACfmMgCxZX~tplv-tiktokx-origin.image?dr=14575&x-expires=1769562000&x-signature=qjjLxsurhu%2B6U%2BYpyD46Wm%2Fpjvk%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt #egypt #египет #hurghada #хургада 
54	https://www.tiktok.com/@assis_travel/video/7594147688782859532?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7594147688782859532" data-video-id="7594147688782859532" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> <a title="хабибскиеистории" target="_blank" href="https://www.tiktok.com/tag/%D1%85%D0%B0%D0%B1%D0%B8%D0%B1%D1%81%D0%BA%D0%B8%D0%B5%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8?refer=embed">#хабибскиеистории</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7594148391895059212?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oo1JEJRueBAR1t3uyei7BRpBpE8QWBuYItPrji~tplv-tiktokx-origin.image?dr=14575&x-expires=1769562000&x-signature=VmVoWzxe0oJlIlx01mltP2y5LgQ%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt #хабибскиеистории 
55	https://www.tiktok.com/@assis_travel/video/7484561069369855287?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7484561069369855287" data-video-id="7484561069369855287" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> </p> <a target="_blank" title="♬ Just Saying - Alina Eremia" href="https://www.tiktok.com/music/Just-Saying-7074369055628478466?refer=embed">♬ Just Saying - Alina Eremia</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oMKEIfoexQyRDpAQA2wEAsCJgB3FICRcnBCUAG~tplv-tiktokx-origin.image?dr=14575&x-expires=1769562000&x-signature=tcOLvt0LPy1ECK%2B9UX1x69BzAUk%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt 
56	https://www.tiktok.com/@assis_travel/video/7529186088519322886?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7529186088519322886" data-video-id="7529186088519322886" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> <a title="хургада" target="_blank" href="https://www.tiktok.com/tag/%D1%85%D1%83%D1%80%D0%B3%D0%B0%D0%B4%D0%B0?refer=embed">#хургада</a> <a title="hurghada" target="_blank" href="https://www.tiktok.com/tag/hurghada?refer=embed">#hurghada</a> <a title="hurghadaegypt" target="_blank" href="https://www.tiktok.com/tag/hurghadaegypt?refer=embed">#hurghadaegypt</a> <a title="египет" target="_blank" href="https://www.tiktok.com/tag/%D0%B5%D0%B3%D0%B8%D0%BF%D0%B5%D1%82?refer=embed">#египет</a> <a title="отдыхвегипте" target="_blank" href="https://www.tiktok.com/tag/%D0%BE%D1%82%D0%B4%D1%8B%D1%85%D0%B2%D0%B5%D0%B3%D0%B8%D0%BF%D1%82%D0%B5?refer=embed">#отдыхвегипте</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7529186088486996741?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/oUIQBsZPFAGi2p3Eax0WHBB9CSiIhuaUB5gWZ~tplv-tiktokx-dmt-logom:tos-useast2a-v-0068/oMD9IozH0EEACAgxCBPihBViIyBAGuAAtofRtL.image?dr=14573&x-expires=1769562000&x-signature=RtWAdSYUp5sCxxU%2B07Us8dxzcb4%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt #хургада #hurghada #hurghadaegypt #египет #отдыхвегипте 
57	https://www.tiktok.com/@assis_travel/video/7472082398797253893?q=annaegypt&t=1769376141868	TikTok	\N	0	t	<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@assis_travel/video/7472082398797253893" data-video-id="7472082398797253893" data-embed-from="oembed" style="max-width:605px; min-width:325px;"> <section> <a target="_blank" title="@assis_travel" href="https://www.tiktok.com/@assis_travel?refer=embed">@assis_travel</a> <p><a title="anna_egypt" target="_blank" href="https://www.tiktok.com/tag/anna_egypt?refer=embed">#anna_egypt</a> </p> <a target="_blank" title="♬ оригинальный звук - Anna_Egypt" href="https://www.tiktok.com/music/оригинальный-звук-7472082402070661893?refer=embed">♬ оригинальный звук - Anna_Egypt</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>	https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/ooBIoi2BIVuEzAKfy672WR1oYYXBCAiLkL7gcL~tplv-tiktokx-origin.image?dr=14575&x-expires=1769562000&x-signature=5CGYfK%2FrzkSgjqUI6AXQYahB%2FXc%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=sg1	#anna_egypt 
\.


--
-- Data for Name: server_tour; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_tour (id, title_ru, title_ua, title_en, image, description_en, description_ru, description_ua, cost_from, cost_to, is_available, category_id, slug) FROM stdin;
4	Экскурсия в Луксор из Хургады (разные программы)	Екскурсія до Луксора (різні програми)	Tour to Luxor (different programs)	tours/luxor-from-hurghada.png	<p>&nbsp;</p>	<p>Давайте отправимся в Луксор – город, где встречаются века, а река Нил течет словно живая лента времени. Ее воды несут с собой тайны Древнего Египта, мифы и легенды.</p><p>Есть несколько программ в Луксор из Хургады. Они все интересные и вы можете выбрать любую, которая вам нравится.</p><p>Экскурсия проводится на большом комфортабельном автобусе с кондиционером и туалетом. Квалифицированный гид историк проведет экскурсию на выбранном вами языке (русском, английском, немецком и других языках по запросу).</p><p>Вы посетите Карнакский храм, самый большой храмовый комплекс Древнего Египта. Карнакский храм — это магическое место, где древность и величие сливаются в одно.&nbsp;</p><p>Каждый камень Карнакского храма хранит историю. Сфинксы, обелиски, священное озеро — все это можно запечатлеть на фото.</p><p>Также вы посетите уникальный храм женщины фараона Хатшепсут. Она стала известна как первая великая женщина в истории, о которой до нас дошли сведения. И этот храм является поистине уникальным архитектурным памятником технологического искусства и культуры Древнего Египта.</p><p>Остановка возле Колоссов Мемнона –&nbsp;<span style="background-color:white;">две массивные каменные статуи&nbsp;изображающие&nbsp;</span><a href="https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D1%80%D0%B0%D0%BE%D0%BD"><span style="background-color:white;color:windowtext;">фараона</span></a><span style="background-color:white;">&nbsp;</span><a href="https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B5%D0%BD%D1%85%D0%BE%D1%82%D0%B5%D0%BF_III"><span style="background-color:white;color:windowtext;">Аменхотепа III</span></a>.&nbsp;<span style="background-color:white;">Его руки положены на колени, а взгляд обращён на восток к реке и восходящему солнцу.&nbsp;</span></p><p><span style="background-color:#F3F4E3;">Долина царей в Египте — один из самых известных археологических памятников в мире,&nbsp;</span><span style="background-color:white;">содержит более 60 гробниц, построенных для фараонов и других знатных людей во времена различных династий.&nbsp;</span><span style="background-color:#F3F4E3;">Это место на протяжении веков очаровывало историков, археологов и туристов своими сложными гробницами и богато украшенными камерами.</span></p><p><span style="background-color:#FDF6F4;">Долина Цариц — это древнее некрополь, который служил последним пристанищем для цариц и королевских детей в период Нового царства.&nbsp;Известная в древние времена как Та-Сет-Неферу, что переводится как "Место Красоты".</span></p><p><span style="background-color:#FDF6F4;"><strong>Программа № 1 - Луксор стандарт. Карнакский храм, Храм Хатшепсут, Колоссы Мемнона.</strong></span></p><p><span style="background-color:#FDF6F4;">Стоимость взрослый 45$, ребенок до 12 лет 23$</span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Понедельник, Четверг, Пятница</span></p><p><span style="background-color:#FDF6F4;"><strong>Программа № 2 – Луксор + Долина цариц</strong></span></p><p><span style="background-color:#FDF6F4;">Стоимость – взрослый 50$, ребенок до 12 лет 25$</span></p><p><span style="background-color:#FDF6F4;">Дни проведения= Понедельник, Пятница</span></p><p><span style="background-color:#FDF6F4;"><strong>Программа № 3 – Луксор + Долина царей</strong></span></p><p><span style="background-color:#FDF6F4;">Стоимость – взрослый 70$, ребенок до 12 лет 35</span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Понедельник, Пятница</span></p><p><span style="background-color:#FDF6F4;"><strong>Программа № 4 Новый Луксор (Луксорский храм)&nbsp;</strong></span></p><p><span style="background-color:#FDF6F4;">Стоимость – взрослый 45$, ребенок 23$</span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Понедельник, Четверг</span></p><p>&nbsp;</p><p><span style="background-color:white;">Дорога до Луксора занимает около 4 часов. По дороге делается остановка для отдыха/туалета.</span></p><p><span style="background-color:white;">Выезд из отелей начиная с 03:30, в зависимости от нахождения отеля. Возврат к 21:30-22:30.</span></p><p style="margin-left:0cm;text-align:justify;"><u>Доплата за трансфер за обе стороны:</u></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади и&nbsp;Сахл Хашиш</p><p style="margin-left:0cm;text-align:justify;">- 20$ за гостя&nbsp;из отелей Эль Гуны&nbsp;</p><p>&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии включено:</u></strong></p><p style="margin-left:0cm;text-align:justify;">- входные билеты&nbsp;по программе;</p><p style="margin-left:0cm;text-align:justify;">- обед (шведский стол);</p><p style="margin-left:0cm;text-align:justify;">- услуги гида;</p><p style="margin-left:0cm;text-align:justify;">- пересечение Нила на лодке;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;транспортное обслуживание по маршруту Хургада-Луксор-Хургада.</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии не включено</u></strong>&nbsp;(оплачивается по желанию гостя):</p><p style="margin-left:0cm;text-align:justify;">- посещение Бананового острова;</p><p style="margin-left:0cm;text-align:justify;">- личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- напитки за обедом.</p><p style="margin-left:0cm;text-align:justify;"><strong>Необходимо взять с собой:</strong></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;фото&nbsp;паспорта на телефоне;</p><p style="margin-left:0cm;text-align:justify;">- удобная одежда и обувь, головной убор, солнцезащитные очки;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;ланчбокс (заранее заказывается на ресепшене отеля);</p><p style="margin-left:0cm;text-align:justify;">- воду;</p><p style="margin-left:0cm;text-align:justify;">- подушка (при необходимости);</p><p style="margin-left:0cm;text-align:justify;">- деньги на личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- телефон или камеру.</p><p>&nbsp;</p>	<p>&nbsp;</p>	45	70	t	2	luxor-from-hurghada
7	Экскурсия в Каир из Хургады (эконом программа)	Екскурсія до Каїра з Хургади (економ програма)	Excursion to Cairo from Hurghada (budget program)	tours/excursion-to-cairo-from-hurghada-budget-program.png	<p>&nbsp;</p>	<p><strong>Экскурсия в Каир из Хургады (эконом программа)</strong></p><p>Посетите&nbsp;единственное сохранившееся чудо света — Великие пирамиды Гизы и Сфинкса.</p><p>Экскурсия проводится на большом комфортабельном автобусе с кондиционером и туалетом. Квалифицированный гид историк проведет экскурсию на выбранном вами языке (русском, английском, немецком и других языках по запросу).</p><p><span style="background-color:#FDF6F4;"><strong>Стоимость взрослый 45$, ребенок до 12 лет 23$</strong></span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Вторник, Среда, Суббота</span></p><p>&nbsp;</p><p><span style="background-color:white;">Дорога до Каира занимает около 7 часов. По дороге делаются остановка для отдыха/туалета.</span></p><p><span style="background-color:white;">Выезд из отелей начиная с 01:00, в зависимости от нахождения отеля. Возврат к 22:30-23:30.</span></p><p style="margin-left:0cm;text-align:justify;"><u>Доплата за трансфер за обе стороны:</u></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади и&nbsp;Сахл Хашиш</p><p style="margin-left:0cm;text-align:justify;">- 20$ за гостя&nbsp;из отелей Эль Гуны&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии включено:</u></strong></p><p style="margin-left:0cm;text-align:justify;">- входные билеты&nbsp;по программе;</p><p style="margin-left:0cm;text-align:justify;">- обед (шведский стол);</p><p style="margin-left:0cm;text-align:justify;">- услуги гида;</p><p style="margin-left:0cm;text-align:justify;">- прогулка Нила на лодке;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;транспортное обслуживание по маршруту Хургада-Луксор-Хургада.</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии не включено</u></strong>&nbsp;(оплачивается по желанию гостя):</p><p style="margin-left:0cm;text-align:justify;">- личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- напитки за обедом.</p><p style="margin-left:0cm;text-align:justify;"><strong>Необходимо взять с собой:</strong></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;фото&nbsp;паспорта на телефоне;</p><p style="margin-left:0cm;text-align:justify;">- удобная одежда и обувь, головной убор, солнцезащитные очки;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;ланчбокс (заранее заказывается на ресепшене отеля);</p><p style="margin-left:0cm;text-align:justify;">- воду;</p><p style="margin-left:0cm;text-align:justify;">- подушка (при необходимости);</p><p style="margin-left:0cm;text-align:justify;">- деньги на личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- телефон или камеру.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>	<p>&nbsp;</p>	45	23	t	2	excursion-to-cairo-from-hurghada-budget-program
9	Морская экскурсия на остров Парадайс (Hula – Hula)	Морська екскурсія на острів Парадайс (Hula – Hula)	Boat excursion to Paradise Island (Hula – Hula)	tours/boat-excursion-to-paradise-island-hula-hula.png	<p>&nbsp;</p>	<p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;"><strong>Морская экскурсия на остров Парадайс (Hula&nbsp;–&nbsp;Hula)</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Райский остров – Парадайс (Hula&nbsp;–&nbsp;Hula). Красивое место с белоснежным песком, бирюзовой водой. На острове хорошо оборудованный пляж/&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#212121;"><strong>Стоимость взрослый&nbsp;23$, ребенок до 12 лет&nbsp;12$ Дети до 5 лет бесплатно.</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В программу экскурсии входит:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пребывание на&nbsp;острове Парадайс&nbsp;1,5 – 2 часа;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- несколько остановок для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед на яхте, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В стоимость экскурсии включено:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- транспортное обслуживание;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- оборудование для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- услуги гида.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- купальные принадлежности;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- крем от или для загара;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пляжное полотенце;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Выезд из отелей начиная с 08:30, в зависимости от нахождения отеля. Возврат к 16:30-17:00.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Доплата за человека за трансфер в обе стороны из отелей :</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;10$ Сахл Хашиш, Эль Гуны и Макади</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;20$&nbsp;Сома Бей и&nbsp;Сафаги</span></p>	<p>&nbsp;</p>	23	12	t	2	boat-excursion-to-paradise-island-hula-hula
6	Экскурсия в Каир из Хургады (супер программа)	Екскурсія до Каїра з Хургади (супер програма)	Excursion to Cairo from Hurghada (super program)	tours/excursion-to-cairo-from-hurghada-super-program.png	<p>&nbsp;</p>	<p><strong>Экскурсия в Каир из Хургады (супер программа)</strong></p><p>В этой программе вы увидите Великие пирамиды и Сфинкса. Посетите Каирский национальный музей, где хранятся сокровища из гробницы Тутанхамона.</p><p>Увидите христианские святыни Египта. Древние церкви, связанные с бегством Святого семейства. А, так же, старый исламский Каир.</p><p>В стоимость экскурсии входит прогулка по Нилу на лодке.&nbsp;</p><p>Из программы исключены посещения магазинов и фабрик.&nbsp;</p><p>Экскурсия проводится на большом комфортабельном автобусе с кондиционером и туалетом. Квалифицированный гид историк проведет экскурсию на выбранном вами языке (русском, английском, немецком и других языках по запросу).</p><p><span style="background-color:#FDF6F4;"><strong>Стоимость взрослый 60$, ребенок до 12 лет 30$</strong></span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Вторник, Среда, Суббота</span></p><p>&nbsp;</p><p><span style="background-color:white;">Дорога до Каира занимает около 7 часов. По дороге делаются остановка для отдыха/туалета.</span></p><p><span style="background-color:white;">Выезд из отелей начиная с 01:00, в зависимости от нахождения отеля. Возврат к 22:30-23:30.</span></p><p style="margin-left:0cm;text-align:justify;"><u>Доплата за трансфер за обе стороны:</u></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади и&nbsp;Сахл Хашиш</p><p style="margin-left:0cm;text-align:justify;">- 20$ за гостя&nbsp;из отелей Эль Гуны&nbsp;</p><p>&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии включено:</u></strong></p><p style="margin-left:0cm;text-align:justify;">- входные билеты&nbsp;по программе;</p><p style="margin-left:0cm;text-align:justify;">- обед (шведский стол);</p><p style="margin-left:0cm;text-align:justify;">- услуги гида;</p><p style="margin-left:0cm;text-align:justify;">- прогулка Нила на лодке;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;транспортное обслуживание по маршруту Хургада-Луксор-Хургада.</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии не включено</u></strong>&nbsp;(оплачивается по желанию гостя):</p><p style="margin-left:0cm;text-align:justify;">- личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- напитки за обедом.</p><p style="margin-left:0cm;text-align:justify;"><strong>Необходимо взять с собой:</strong></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;фото&nbsp;паспорта на телефоне;</p><p style="margin-left:0cm;text-align:justify;">- удобная одежда и обувь, головной убор, солнцезащитные очки;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;ланчбокс (заранее заказывается на ресепшене отеля);</p><p style="margin-left:0cm;text-align:justify;">- воду;</p><p style="margin-left:0cm;text-align:justify;">- подушка (при необходимости);</p><p style="margin-left:0cm;text-align:justify;">- деньги на личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- телефон или камеру.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>	<p>&nbsp;</p>	60	30	t	2	excursion-to-cairo-from-hurghada-super-program
8	Экскурсия в Каир из Хургады на самолете	Екскурсія в Каїр з Хургади літаком	Excursion to Cairo from Hurghada by plane	tours/excursion-to-cairo-from-hurghada-by-plane.png	<p>&nbsp;</p>	<p><strong>Экскурсия в Каир из Хургады на самолете</strong></p><p>Это отличная возможность быстро попасть в Каир. Вы посетите&nbsp;единственное сохранившееся чудо света — Великие пирамиды Гизы и Сфинкса. Экскурсия включает посещение&nbsp;Каирского национального музея, где хранятся сокровища из гробницы Тутанхамона.</p><p><span style="background-color:#FDF6F4;"><strong>Стоимость 220$ с человека. Для ребенка до 2-х лет бесплатно, без предоставления отдельного места. Для детей старше этого возраста, стоимость как для взрослого.</strong></span></p><p><span style="background-color:#FDF6F4;">Экскурсия бронируется за несколько дней. Предоплата 100</span>$</p><p><span style="background-color:white;">Выезд из отелей начиная с 05:00, в зависимости от&nbsp;рейса. Возврат к 22.00</span></p><p style="margin-left:0cm;text-align:justify;"><u>Доплата за трансфер за обе стороны:</u></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади и&nbsp;Сахл Хашиш</p><p style="margin-left:0cm;text-align:justify;">- 20$ за гостя&nbsp;из отелей Эль Гуны&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии включено:</u></strong></p><p style="margin-left:0cm;text-align:justify;">- входные билеты&nbsp;по программе;</p><p style="margin-left:0cm;text-align:justify;">- обед (шведский стол);</p><p style="margin-left:0cm;text-align:justify;">- услуги гида;</p><p style="margin-left:0cm;text-align:justify;">- перелет Хургада – Каир –Хургада;</p><p style="margin-left:0cm;text-align:justify;">- трансфер в аэропорт и обратно.</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии не включено</u></strong>&nbsp;(оплачивается по желанию гостя):</p><p style="margin-left:0cm;text-align:justify;">- личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- напитки за обедом.</p><p style="margin-left:0cm;text-align:justify;"><strong>Необходимо взять с собой:</strong></p><p style="margin-left:0cm;text-align:justify;">- паспорт;</p><p style="margin-left:0cm;text-align:justify;">- удобная одежда и обувь, головной убор, солнцезащитные очки;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;ланчбокс (заранее заказывается на ресепшене отеля);</p><p style="margin-left:0cm;text-align:justify;">- воду;</p><p style="margin-left:0cm;text-align:justify;">- подушка (при необходимости);</p><p style="margin-left:0cm;text-align:justify;">- деньги на личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- телефон или камеру.</p>	<p>&nbsp;</p>	200	200	t	2	excursion-to-cairo-from-hurghada-by-plane
5	Сафари в Хургаде (разные программы)	Сафарі у Хургаді (різні програми)	Safari in Hurghada (various programs)	tours/safari-in-hurghada-various-programs.png	<p>&nbsp;</p>	<p>Сафари – это настоящее приключение. Тут можно получить незабываемые эмоции. Это надо испытать!&nbsp;</p><p>Выбирайте любую программу и готовьтесь к захватывающему приключению.</p><p><strong>Программа № 1 – Супер сафари. </strong><span style="background-color:#FDF6F4;color:#212121;"><strong>Стоимость взрослый&nbsp;25$, ребенок до 12 лет&nbsp;13$. Индивидуально +20$ с человека.</strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Продолжительность 5 часов</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- трансфер до станции квадроциклов;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- инструктаж управления квадроциклом;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- поездка на квадроциклах около 40 минут;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на багги около 15 минут;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- поездка на джипах&nbsp;по пустыне&nbsp;в&nbsp;бедуинскую деревню;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- посещение бедуинской деревни, знакомство с жизненным укладом поселения, приготовление лепёшек;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на верблюде;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- ужин;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;шоу программа;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- трансфер в отель.</span></p><p>&nbsp;</p><p><strong>Программа № 2 - Семейное сафари.&nbsp;</strong><span style="background-color:#FDF6F4;color:#212121;"><strong>Стоимость взрослый&nbsp;20$, ребенок до 12 лет&nbsp;10$. Индивидуально +20$ с человека.</strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Продолжительность 4 часа</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- трансфер до станции квадроциклов;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- инструктаж управления квадроциклом;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- поездка на квадроциклах около 40 минут;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на багги около 15 минут;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- поездка на джипах&nbsp;по пустыне&nbsp;в&nbsp;бедуинскую деревню;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- посещение бедуинской деревни, чаепитие;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на верблюде;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- трансфер в отель.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong>Программа № 3 – Мото сафари. Стоимость посадка один гость на квадроцикле (сингл) 18$, посадка два гостя на одном квадроцикле (дабл)&nbsp;23$ за двоих. Индивидуально + 20$ с человека. Дети и подростки до 12 лет не допускаются.</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Продолжительность 3 часа</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- трансфер до станции квадроциклов;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- инструктаж управления квадроциклом;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пересечение пустыни на квадроциклах в деревню бедуинов (около 20 км);</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на верблюдах;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- чаепитие;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- возвращение на станцию на квадроциклах (около 20 км).</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong>Внимание! За руль допускаются люди старше 14 лет.</strong></span></p><p style="text-align:justify;"><span style="color:#212121;"><u>Доплата за трансфер за обе стороны:</u></span></p><p style="text-align:justify;"><span style="color:#212121;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади,&nbsp;Сахл Хашиш, Эль Гуна&nbsp;</span></p><p style="text-align:justify;"><span style="color:#212121;">- 20$ за гостя&nbsp;из отелей&nbsp;Сома Бей, Сафага</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- удобную одежду и обувь;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- арафатку;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- воду.</span></p><p style="text-align:justify;">&nbsp;</p>	<p>&nbsp;</p>	18	25	t	2	safari-in-hurghada-various-programs
1	Экскурсия в Каир и Пирамиды Гизы из Хургады(стандартна программа)	Екскурсія в Каїр та Піраміди Гізи з Хургади (стандартна програма)	Excursion to Cairo and the Pyramids of Giza from Hurghada (standard program)	tours/111.png	<p>Visit one of the wonders of the world — the Great Pyramids and the Sphinx. Includes a visit to the Egyptian Museum with its unique antiquities.</p>	<p><strong>Экскурсия в Каир из Хургады (стандартная программа)</strong></p><p>Посетите&nbsp;единственное сохранившееся чудо света — Великие пирамиды Гизы и Сфинкса. Экскурсия включает посещение&nbsp;Каирского национального музея, где хранятся сокровища из гробницы Тутанхамона.</p><p>В стоимость экскурсии входит прогулка по Нилу на лодке.&nbsp;</p><p>Экскурсия проводится на большом комфортабельном автобусе с кондиционером и туалетом. Квалифицированный гид историк проведет экскурсию на выбранном вами языке (русском, английском, немецком и других языках по запросу).</p><p><span style="background-color:#FDF6F4;"><strong>Стоимость взрослый 50$, ребенок до 12 лет 25$</strong></span></p><p><span style="background-color:#FDF6F4;">Дни проведения – Понедельник, Вторник, Среда</span></p><p>&nbsp;</p><p><span style="background-color:white;">Дорога до Каира занимает около 7 часов. По дороге делаются остановка для отдыха/туалета.</span></p><p><span style="background-color:white;">Выезд из отелей начиная с 01:00, в зависимости от нахождения отеля. Возврат к 22:30-23:30.</span></p><p style="margin-left:0cm;text-align:justify;"><u>Доплата за трансфер за обе стороны:</u></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;10$&nbsp;за одного гостя из отелей&nbsp;Макади и&nbsp;Сахл Хашиш</p><p style="margin-left:0cm;text-align:justify;">- 20$ за гостя&nbsp;из отелей Эль Гуны&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии включено:</u></strong></p><p style="margin-left:0cm;text-align:justify;">- входные билеты&nbsp;по программе;</p><p style="margin-left:0cm;text-align:justify;">- обед (шведский стол);</p><p style="margin-left:0cm;text-align:justify;">- услуги гида;</p><p style="margin-left:0cm;text-align:justify;">- прогулка Нила на лодке;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;транспортное обслуживание по маршруту Хургада-Луксор-Хургада.</p><p style="margin-left:0cm;text-align:justify;"><strong><u>В стоимость экскурсии не включено</u></strong>&nbsp;(оплачивается по желанию гостя):</p><p style="margin-left:0cm;text-align:justify;">- личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- напитки за обедом.</p><p style="margin-left:0cm;text-align:justify;"><strong>Необходимо взять с собой:</strong></p><p style="margin-left:0cm;text-align:justify;">-&nbsp;фото&nbsp;паспорта на телефоне;</p><p style="margin-left:0cm;text-align:justify;">- удобная одежда и обувь, головной убор, солнцезащитные очки;</p><p style="margin-left:0cm;text-align:justify;">-&nbsp;ланчбокс (заранее заказывается на ресепшене отеля);</p><p style="margin-left:0cm;text-align:justify;">- воду;</p><p style="margin-left:0cm;text-align:justify;">- подушка (при необходимости);</p><p style="margin-left:0cm;text-align:justify;">- деньги на личные расходы;</p><p style="margin-left:0cm;text-align:justify;">- телефон или камеру.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>	<p>Відвідайте одне з чудес світу — Великі піраміди та Сфінкс. У програмі також огляд Єгипетського музею з унікальними артефактами.</p>	50	25	t	2	cairo-and-giza
12	Батискаф (полуподводная лодка) и снорклинг	Батискаф (напівпідводний човен) та снорклінг	Bathyscaphe (semi-submarine) and snorkeling	tours/bathyscaphe-semi-submarine-and-snorkeling.png	<p>&nbsp;</p>	<p><strong>Батискаф (полуподводная лодка) и снорклинг</strong></p><p>Очень популярная экскурсия для детей и для взрослых. На ней вы можете увидеть красоты Красного моря из панорамных окон батискафа. Они расположены на глубине 2-3 метра под водой, и вы сможете наблюдать за интересным подводным миром.</p><p>А еще будет остановка, на которой вы сможете поплавать и заняться снорклингом.&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#212121;"><strong>Стоимость взрослый&nbsp;12$, ребенок до 12 лет&nbsp;6$ Дети до 5 лет бесплатно.</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В программу экскурсии входит:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;остановка для снорклинга</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В стоимость экскурсии включено:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- транспортное обслуживание;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- оборудование для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- услуги&nbsp;сопровождающего.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- купальные принадлежности;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- крем от или для загара;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пляжное полотенце;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Выезд из отелей с 10:30,&nbsp;11.30, 14.00.&nbsp;&nbsp;Возврат к 16,00, 15.00,&nbsp;18:00.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Доплата за человека за трансфер в обе стороны из отелей :</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;10$ Сахл Хашиш, Эль Гуны и Макади</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;20$&nbsp;Сома Бей и&nbsp;Сафаги</span></p>	<p>&nbsp;</p>	12	6	t	2	bathyscaphe-semi-submarine-and-snorkeling
11	Морская экскурсия Все включено 5 в 1	Морська екскурсія Все включено 5 в 1	Sea excursion All inclusive 5 in 1	tours/sea-excursion-all-inclusive-5-in-1.png	<p>&nbsp;</p>	<p>&nbsp;</p>	<p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;"><strong>Морская экскурсия Все включено 5 в 1&nbsp;</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Эта программа включает в себя все, чтобы вы почувствовали и релакс и адреналин. Вы проведете прекрасный день на яхте в Красном море на которой вы поплывете к мету обитания дельфинов.. Здесь моно увидеть дельфинов в их естественной среде обитания.&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Во время экскурсии будут остановки возле коралловых рифов, где вы можете поплавать с маской и увидеть кораллы и красивых рыбок.&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Дайвинг – одно погружение с инструктором да 15 минут, глубина до 7 метров.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Массаж спины.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Катание на банане и таблетке.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">И, конечно, вкусный обед на яхте.&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#212121;"><strong>Стоимость взрослый&nbsp;25$, ребенок до 12 лет&nbsp;13$ Дети до 5 лет бесплатно.</strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Дни экскурсии – Вторник, Четверг, Пятница, Воскресенье</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В программу экскурсии входит:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-день на яхте;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- дайвинг;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- несколько остановок для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- массаж спины;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед на яхте, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В стоимость экскурсии включено:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- транспортное обслуживание;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- оборудование для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- услуги гида.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- купальные принадлежности;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- крем от или для загара;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пляжное полотенце;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Выезд из отелей начиная с 08:30, в зависимости от нахождения отеля. Возврат к 16:30-17:00.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Доплата за человека за трансфер в обе стороны из отелей :</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;10$ Сахл Хашиш, Эль Гуны и Макади</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;20$&nbsp;Сома Бей и&nbsp;Сафаги</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p>&nbsp;</p>	25	13	t	2	sea-excursion-all-inclusive-5-in-1
3	Морская экскурсия на остров Оранж	Морська екскурсія на острів Оранж	Sea excursion to Orange Island	tours/sea-trip-orange.png	<p>Dive into the crystal-clear waters of the Red Sea, teeming with coral reefs and vibrant marine life.</p>	<p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Хотите насладиться бирюзовой водой и белым песком? Сделать красивые фото на интересных локациях? Тогда вам на остров Оранж. Это прекрасный вариант для отдыха.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#212121;"><strong>Стоимость взрослый&nbsp;25$, ребенок до 12 лет&nbsp;13$. Дети до 5 лет бесплатно.</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В программу экскурсии входит:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пребывание на пляже Оранж Бей 15 – 2 часа;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- несколько остановок для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед на яхте, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В стоимость экскурсии включено:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- транспортное обслуживание;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- оборудование для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- услуги гида.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- купальные принадлежности;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- крем от или для загара;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пляжное полотенце;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Выезд из отелей начиная с 08:30, в зависимости от нахождения отеля. Возврат к 16:30-17:00.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Доплата за человека за трансфер в обе стороны из отелей :</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;10$ Сахл Хашиш, Эль Гуны и Макади</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;20$&nbsp;Сома Бей и&nbsp;Сафаги</span></p>	<p>Пірнайте в кришталево чисті води Червоного моря, повні коралів і яскравої морської фауни.</p>	25	13	t	2	sea-trip-orange
10	Морская экскурсия Дом дельфинов	Морська екскурсія Будинок дельфінів	Sea excursion Dolphin House	tours/sea-excursion-dolphin-house.png	<p>&nbsp;</p>	<p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;"><strong>Морская экскурсия Дом дельфинов</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Вы проведете прекрасный день на яхте в Красном море на которой вы поплывете в бухту дельфинов. Здесь моно увидеть дельфинов в их естественной среде обитания.&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#555555;">Во время экскурсии будут остановки возле коралловых рифов, где вы можете поплавать с маской и увидеть кораллы и красивых рыбок.&nbsp;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:#212121;"><strong>Стоимость взрослый&nbsp;23$, ребенок до 12 лет&nbsp;12$ Дети до 5 лет бесплатно.</strong></span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В программу экскурсии входит:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-день на яхте;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- несколько остановок для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед на яхте, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>В стоимость экскурсии включено:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- транспортное обслуживание;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- обед, включая безалкогольные напитки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- катание на банане и таблетке;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- оборудование для снорклинга;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- услуги гида.</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;"><strong><u>Необходимо взять с собой:</u></strong></span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- купальные принадлежности;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- головной убор;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- солнцезащитные очки;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- крем от или для загара;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- пляжное полотенце;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- телефон или камеру;</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">- деньги на личные расходы.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Выезд из отелей начиная с 08:30, в зависимости от нахождения отеля. Возврат к 16:30-17:00.</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">Доплата за человека за трансфер в обе стороны из отелей :</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;10$ Сахл Хашиш, Эль Гуны и Макади</span></p><p style="margin-left:0cm;text-align:justify;"><span style="color:black;">-&nbsp;20$&nbsp;Сома Бей и&nbsp;Сафаги</span></p><p style="margin-left:0cm;text-align:justify;">&nbsp;</p><p>&nbsp;</p>	<p>&nbsp;</p>	25	13	t	2	sea-excursion-dolphin-house
\.


--
-- Data for Name: server_tour_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_tour_types (id, tour_id, tourtype_id) FROM stdin;
1	1	2
3	3	1
4	3	2
8	4	8
9	4	2
10	4	3
11	4	5
12	5	8
13	5	2
14	5	3
15	5	6
16	3	8
17	3	3
18	6	2
19	6	3
20	6	5
21	1	8
22	1	3
23	1	5
24	7	8
25	7	2
26	7	3
27	7	5
28	8	8
29	8	2
30	8	3
31	8	5
32	9	8
33	9	1
34	9	2
35	9	3
36	10	8
37	10	1
38	10	2
39	10	3
40	11	8
41	11	1
42	11	2
43	11	3
44	12	8
45	12	1
46	12	2
47	12	3
\.


--
-- Data for Name: server_tourcategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_tourcategory (id, name_ru, name_ua, name_en, ordering) FROM stdin;
2	Групповые	Груповi	Group	2
1	Индивидуальные	Iндивiдуальнi	Individual	3
3	Трансфер	Трансфер	Transfer	4
\.


--
-- Data for Name: server_tourtype; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.server_tourtype (id, name_ru, name_ua, name_en, ordering) FROM stdin;
4	Развлекательные	Розважальні	Entertainment	4
5	Исторические	Історичні	Historical	5
3	Семейные	Сімейні	Family	3
8	Из Хургады	З Хургади	From Hurghada	0
2	Популярные	Популярнi	Popular	2
6	Сафари	Сафарі	Safari	7
7	SPA	SPA	SPA	8
9	Из Шарм эль Шейха	Із Шарм ель Шейха	From Sharm El Sheikh	1
1	Морские	Морські	Sea	6
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 80, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 106, true);


--
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_beat_clockedschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_beat_crontabschedule_id_seq', 1, true);


--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_beat_intervalschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_beat_periodictask_id_seq', 1, true);


--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_beat_solarschedule_id_seq', 1, false);


--
-- Name: django_celery_results_chordcounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_results_chordcounter_id_seq', 1, false);


--
-- Name: django_celery_results_groupresult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_results_groupresult_id_seq', 1, false);


--
-- Name: django_celery_results_taskresult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_celery_results_taskresult_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 20, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 65, true);


--
-- Name: server_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_category_id_seq', 5, true);


--
-- Name: server_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_notification_id_seq', 1, false);


--
-- Name: server_socialmediapost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_socialmediapost_id_seq', 57, true);


--
-- Name: server_tour_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_tour_id_seq', 12, true);


--
-- Name: server_tour_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_tour_types_id_seq', 47, true);


--
-- Name: server_tourtype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.server_tourtype_id_seq', 9, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_clockedschedule django_celery_beat_clockedschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_clockedschedule
    ADD CONSTRAINT django_celery_beat_clockedschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_crontabschedule django_celery_beat_crontabschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_crontabschedule
    ADD CONSTRAINT django_celery_beat_crontabschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_intervalschedule django_celery_beat_intervalschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_intervalschedule
    ADD CONSTRAINT django_celery_beat_intervalschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_periodictask django_celery_beat_periodictask_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_periodictask_name_key UNIQUE (name);


--
-- Name: django_celery_beat_periodictask django_celery_beat_periodictask_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_periodictask_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_periodictasks django_celery_beat_periodictasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictasks
    ADD CONSTRAINT django_celery_beat_periodictasks_pkey PRIMARY KEY (ident);


--
-- Name: django_celery_beat_solarschedule django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_solarschedule
    ADD CONSTRAINT django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq UNIQUE (event, latitude, longitude);


--
-- Name: django_celery_beat_solarschedule django_celery_beat_solarschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_solarschedule
    ADD CONSTRAINT django_celery_beat_solarschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_chordcounter django_celery_results_chordcounter_group_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_chordcounter
    ADD CONSTRAINT django_celery_results_chordcounter_group_id_key UNIQUE (group_id);


--
-- Name: django_celery_results_chordcounter django_celery_results_chordcounter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_chordcounter
    ADD CONSTRAINT django_celery_results_chordcounter_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_groupresult django_celery_results_groupresult_group_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_groupresult
    ADD CONSTRAINT django_celery_results_groupresult_group_id_key UNIQUE (group_id);


--
-- Name: django_celery_results_groupresult django_celery_results_groupresult_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_groupresult
    ADD CONSTRAINT django_celery_results_groupresult_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_taskresult django_celery_results_taskresult_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_taskresult
    ADD CONSTRAINT django_celery_results_taskresult_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_taskresult django_celery_results_taskresult_task_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_results_taskresult
    ADD CONSTRAINT django_celery_results_taskresult_task_id_key UNIQUE (task_id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: server_tourcategory server_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tourcategory
    ADD CONSTRAINT server_category_pkey PRIMARY KEY (id);


--
-- Name: server_notification server_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_notification
    ADD CONSTRAINT server_notification_pkey PRIMARY KEY (id);


--
-- Name: server_socialmediapost server_socialmediapost_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_socialmediapost
    ADD CONSTRAINT server_socialmediapost_pkey PRIMARY KEY (id);


--
-- Name: server_socialmediapost server_socialmediapost_url_91572985_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_socialmediapost
    ADD CONSTRAINT server_socialmediapost_url_91572985_uniq UNIQUE (url);


--
-- Name: server_tour server_tour_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour
    ADD CONSTRAINT server_tour_pkey PRIMARY KEY (id);


--
-- Name: server_tour server_tour_slug_91b02364_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour
    ADD CONSTRAINT server_tour_slug_91b02364_uniq UNIQUE (slug);


--
-- Name: server_tour_types server_tour_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour_types
    ADD CONSTRAINT server_tour_types_pkey PRIMARY KEY (id);


--
-- Name: server_tour_types server_tour_types_tour_id_tourtype_id_bebb214e_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour_types
    ADD CONSTRAINT server_tour_types_tour_id_tourtype_id_bebb214e_uniq UNIQUE (tour_id, tourtype_id);


--
-- Name: server_tourtype server_tourtype_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tourtype
    ADD CONSTRAINT server_tourtype_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_cele_date_cr_bd6c1d_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_date_cr_bd6c1d_idx ON public.django_celery_results_groupresult USING btree (date_created);


--
-- Name: django_cele_date_cr_f04a50_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_date_cr_f04a50_idx ON public.django_celery_results_taskresult USING btree (date_created);


--
-- Name: django_cele_date_do_caae0e_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_date_do_caae0e_idx ON public.django_celery_results_groupresult USING btree (date_done);


--
-- Name: django_cele_date_do_f59aad_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_date_do_f59aad_idx ON public.django_celery_results_taskresult USING btree (date_done);


--
-- Name: django_cele_periodi_1993cf_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_periodi_1993cf_idx ON public.django_celery_results_taskresult USING btree (periodic_task_name);


--
-- Name: django_cele_status_9b6201_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_status_9b6201_idx ON public.django_celery_results_taskresult USING btree (status);


--
-- Name: django_cele_task_na_08aec9_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_task_na_08aec9_idx ON public.django_celery_results_taskresult USING btree (task_name);


--
-- Name: django_cele_worker_d54dd8_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_cele_worker_d54dd8_idx ON public.django_celery_results_taskresult USING btree (worker);


--
-- Name: django_celery_beat_periodictask_clocked_id_47a69f82; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_beat_periodictask_clocked_id_47a69f82 ON public.django_celery_beat_periodictask USING btree (clocked_id);


--
-- Name: django_celery_beat_periodictask_crontab_id_d3cba168; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_beat_periodictask_crontab_id_d3cba168 ON public.django_celery_beat_periodictask USING btree (crontab_id);


--
-- Name: django_celery_beat_periodictask_interval_id_a8ca27da; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_beat_periodictask_interval_id_a8ca27da ON public.django_celery_beat_periodictask USING btree (interval_id);


--
-- Name: django_celery_beat_periodictask_name_265a36b7_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_beat_periodictask_name_265a36b7_like ON public.django_celery_beat_periodictask USING btree (name varchar_pattern_ops);


--
-- Name: django_celery_beat_periodictask_solar_id_a87ce72c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_beat_periodictask_solar_id_a87ce72c ON public.django_celery_beat_periodictask USING btree (solar_id);


--
-- Name: django_celery_results_chordcounter_group_id_1f70858c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_results_chordcounter_group_id_1f70858c_like ON public.django_celery_results_chordcounter USING btree (group_id varchar_pattern_ops);


--
-- Name: django_celery_results_groupresult_group_id_a085f1a9_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_results_groupresult_group_id_a085f1a9_like ON public.django_celery_results_groupresult USING btree (group_id varchar_pattern_ops);


--
-- Name: django_celery_results_taskresult_task_id_de0d95bf_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_celery_results_taskresult_task_id_de0d95bf_like ON public.django_celery_results_taskresult USING btree (task_id varchar_pattern_ops);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: server_socialmediapost_url_91572985_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX server_socialmediapost_url_91572985_like ON public.server_socialmediapost USING btree (url varchar_pattern_ops);


--
-- Name: server_tour_category_id_a66e6680; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX server_tour_category_id_a66e6680 ON public.server_tour USING btree (category_id);


--
-- Name: server_tour_slug_91b02364_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX server_tour_slug_91b02364_like ON public.server_tour USING btree (slug varchar_pattern_ops);


--
-- Name: server_tour_types_tour_id_aeb73d99; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX server_tour_types_tour_id_aeb73d99 ON public.server_tour_types USING btree (tour_id);


--
-- Name: server_tour_types_tourtype_id_5d0cd182; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX server_tour_types_tourtype_id_5d0cd182 ON public.server_tour_types USING btree (tourtype_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_clocked_id_47a69f82_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_clocked_id_47a69f82_fk_django_ce FOREIGN KEY (clocked_id) REFERENCES public.django_celery_beat_clockedschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_crontab_id_d3cba168_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_crontab_id_d3cba168_fk_django_ce FOREIGN KEY (crontab_id) REFERENCES public.django_celery_beat_crontabschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_interval_id_a8ca27da_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_interval_id_a8ca27da_fk_django_ce FOREIGN KEY (interval_id) REFERENCES public.django_celery_beat_intervalschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_solar_id_a87ce72c_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_solar_id_a87ce72c_fk_django_ce FOREIGN KEY (solar_id) REFERENCES public.django_celery_beat_solarschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: server_tour server_tour_category_id_a66e6680_fk_server_tourcategory_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour
    ADD CONSTRAINT server_tour_category_id_a66e6680_fk_server_tourcategory_id FOREIGN KEY (category_id) REFERENCES public.server_tourcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: server_tour_types server_tour_types_tour_id_aeb73d99_fk_server_tour_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour_types
    ADD CONSTRAINT server_tour_types_tour_id_aeb73d99_fk_server_tour_id FOREIGN KEY (tour_id) REFERENCES public.server_tour(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: server_tour_types server_tour_types_tourtype_id_5d0cd182_fk_server_tourtype_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_tour_types
    ADD CONSTRAINT server_tour_types_tourtype_id_5d0cd182_fk_server_tourtype_id FOREIGN KEY (tourtype_id) REFERENCES public.server_tourtype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\unrestrict G3W4K7l22mnKvkLbTvlqINPt7ohsQn1evAkT1ug3np2rnj0zmpjLBhmVJ9fUzs9

