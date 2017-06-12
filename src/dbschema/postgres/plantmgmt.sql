--added on 09-10-2015

-- Table: accounts

-- DROP TABLE accounts;

CREATE TABLE accounts
(
  accountid serial NOT NULL,
  accountcode text NOT NULL,
  accountname text,
  CONSTRAINT pm_accountid_pk PRIMARY KEY (accountid),
  CONSTRAINT pm_accountcode_uk UNIQUE (accountcode)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE accounts OWNER TO postgres;


-- Table: pwr_invertermodel

-- DROP TABLE pwr_invertermodel;

CREATE TABLE pwr_invertermodel
(
  invertermodelid serial NOT NULL,
  invmake text,
  invmodel text,
  accountid integer,
  CONSTRAINT pm_invertermodelid_pk PRIMARY KEY (invertermodelid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_invertermodel OWNER TO postgres;


-- Table: pwr_inverters

-- DROP TABLE pwr_inverters;

CREATE TABLE pwr_inverters
(
  pwrinverterid serial NOT NULL,
  invertername text,
  invertercode text,
  invmodelid integer,
  invplantid integer,
  invcapacity numeric(18,4),
  noofstrings integer,
  CONSTRAINT pm_pwrinverterid_pk PRIMARY KEY (pwrinverterid),
  CONSTRAINT pm_invplantid_invertercode_uk UNIQUE (invplantid, invertercode)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_inverters OWNER TO postgres;


-- Table: pwr_panelmodel

-- DROP TABLE pwr_panelmodel;

CREATE TABLE pwr_panelmodel
(
  pwrpanelmodelid serial NOT NULL,
  panelmake text,
  panelmodel text,
  accountid integer,
  CONSTRAINT pm_panelmodelid_pk PRIMARY KEY (pwrpanelmodelid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_panelmodel OWNER TO postgres;


-- Table: pwr_panels

-- DROP TABLE pwr_panels;

CREATE TABLE pwr_panels
(
  pwrpanelid serial NOT NULL,
  panelmodelid integer,
  panelvoltage numeric(18,4),
  panelcurrent numeric(18,4),
  panelcapacity numeric(18,4),
  pwrstringid integer,
  CONSTRAINT pm_pwrpanelid_pk PRIMARY KEY (pwrpanelid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_panels OWNER TO postgres;


-- Table: pwr_plant

-- DROP TABLE pwr_plant;

CREATE TABLE pwr_plant
(
  pwrplantid serial NOT NULL,
  accountid integer,
  pwrplantname text,
  pwrplantcode text,
  pwrinstalledcapacity numeric(18,4),
  areaofpv numeric(18,4),
  pwractualcapacity numeric(18,4),
  CONSTRAINT pm_pwrplantid_pk PRIMARY KEY (pwrplantid),
  CONSTRAINT pm_accountid_pwrplantcode_uk UNIQUE (accountid, pwrplantcode)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plant OWNER TO postgres;


-- Table: pwr_strings

-- DROP TABLE pwr_strings;

CREATE TABLE pwr_strings
(
  pwrstringid serial NOT NULL,
  strcapacity numeric(18,4),
  stringname text,
  inverterid integer,
  panelmodelid integer,
  CONSTRAINT pm_pwrstringid_pk PRIMARY KEY (pwrstringid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_strings OWNER TO postgres;


-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  userid serial NOT NULL,
  accountid integer,
  username text,
  loginid text,
  pwd text,
  userrole integer,
  isactive character(1) DEFAULT 'n'::bpchar,
  CONSTRAINT pm_userid_pk PRIMARY KEY (userid),
  CONSTRAINT pm_loginid_uk UNIQUE (loginid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users OWNER TO postgres;

--added on 12-10-2015

-- Column: stringcode

-- ALTER TABLE pwr_strings DROP COLUMN stringcode;

ALTER TABLE pwr_strings ADD COLUMN stringcode text;


--added on 14-10-2015

-- Column: accountid

-- ALTER TABLE pwr_strings DROP COLUMN accountid;

ALTER TABLE pwr_strings ADD COLUMN accountid integer;


-- Column: accountid

-- ALTER TABLE pwr_inverters DROP COLUMN accountid;

ALTER TABLE pwr_inverters ADD COLUMN accountid integer;

--added by murali  on 14-10-2015

-- Column: accountid

-- ALTER TABLE pwr_panels DROP COLUMN accountid;

ALTER TABLE pwr_panels ADD COLUMN accountid integer;

--added on 24-11-2015 

-- Table: pwr_plantdata

-- DROP TABLE pwr_plantdata;

CREATE TABLE pwr_plantdata
(
  pwrplantdataid serial NOT NULL,
  forplantid integer,
  pwrplantdatats timestamp without time zone,
  plantpower numeric(18,4),
  meterreading numeric(18,4),
  plantdatairradiance numeric(18,4),
  plantmoduletemp numeric(18,4),
  plantambtemp numeric(18,4),
  CONSTRAINT pwr_plantdata_pk PRIMARY KEY (pwrplantdataid),
  CONSTRAINT pwr_plantdata_forplantid FOREIGN KEY (forplantid)
      REFERENCES pwr_plant (pwrplantid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plantdata OWNER TO postgres;


-- Table: pwr_inverterdata

-- DROP TABLE pwr_inverterdata;

CREATE TABLE pwr_inverterdata
(
  pwrinvdataid serial NOT NULL,
  forinverterid integer,
  pwrinvdatats timestamp without time zone,
  phonevolt numeric(18,4),
  phonecurr numeric(18,4),
  phonefreq numeric(18,4),
  phtwovolt numeric(18,4),
  phtwocurr numeric(18,4),
  phtwofreq numeric(18,4),
  phthreevolt numeric(18,4),
  phthreecurr numeric(18,4),
  phthreefreq numeric(18,4),
  netvolt numeric(18,4),
  netcurr numeric(18,4),
  netfreq numeric(18,4),
  powerfactor numeric(18,4),
  phonepower numeric(18,4),
  phtwopower numeric(18,4),
  phthreepower numeric(18,4),
  invpower numeric(18,4),
  currdayenergy numeric(18,4),
  invtemp numeric(18,4),
  CONSTRAINT pwr_inverterdata_pk PRIMARY KEY (pwrinvdataid),
  CONSTRAINT pwr_inverterdata_forinverterid_fk FOREIGN KEY (forinverterid)
      REFERENCES pwr_inverters (pwrinverterid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_inverterdata OWNER TO postgres;


-- Table: pwr_stringdata

-- DROP TABLE pwr_stringdata;

CREATE TABLE pwr_stringdata
(
  pwrstringdataid serial NOT NULL,
  pwrstringdatats timestamp without time zone,
  forstringid integer,
  stringdcvoltage numeric(18,4),
  stringdccurrent numeric(18,4),
  CONSTRAINT pwr_stringdata_pk PRIMARY KEY (pwrstringdataid),
  CONSTRAINT pwr_stringdata_forstringid_fk FOREIGN KEY (forstringid)
      REFERENCES pwr_strings (pwrstringid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_stringdata OWNER TO postgres;




--added by murali on 10-12-2015


-- Column: installedinvcapacity

-- ALTER TABLE pwr_inverters DROP COLUMN installedinvcapacity;

ALTER TABLE pwr_inverters ADD COLUMN installedinvcapacity numeric(18,4);

-- Column: numpanels

-- ALTER TABLE pwr_strings DROP COLUMN numpanels;

ALTER TABLE pwr_strings ADD COLUMN numpanels integer;

-- Column: panelvoc

-- ALTER TABLE pwr_panelmodel DROP COLUMN panelvoc;

ALTER TABLE pwr_panelmodel ADD COLUMN panelvoc numeric(18,4);

-- Column: panelvmp

-- ALTER TABLE pwr_panelmodel DROP COLUMN panelvmp;

ALTER TABLE pwr_panelmodel ADD COLUMN panelvmp numeric(18,4);

-- Column: panelimp

-- ALTER TABLE pwr_panelmodel DROP COLUMN panelimp;

ALTER TABLE pwr_panelmodel ADD COLUMN panelimp numeric(18,4);

-- Column: panelpmpp

-- ALTER TABLE pwr_panelmodel DROP COLUMN panelpmpp;

ALTER TABLE pwr_panelmodel ADD COLUMN panelpmpp numeric(18,4);


--added on 11-12-2015

-- Column: nextts

-- ALTER TABLE pwr_inverterdata DROP COLUMN nextts;

ALTER TABLE pwr_inverterdata ADD COLUMN nextts timestamp without time zone;

-- Column: plantcurdayenegry

-- ALTER TABLE pwr_plantdata DROP COLUMN plantcurdayenegry;

ALTER TABLE pwr_plantdata ADD COLUMN plantcurdayenegry numeric(18,4);

-- Column: iscalulatedfrominv

-- ALTER TABLE pwr_plantdata DROP COLUMN iscalulatedfrominv;

ALTER TABLE pwr_plantdata ADD COLUMN iscalulatedfrominv character(1);
ALTER TABLE pwr_plantdata ALTER COLUMN iscalulatedfrominv SET DEFAULT 'n'::bpchar;

-- Column: plantlat

-- ALTER TABLE pwr_plant DROP COLUMN plantlat;

ALTER TABLE pwr_plant ADD COLUMN plantlat numeric(18,4);

-- Column: plantlong

-- ALTER TABLE pwr_plant DROP COLUMN plantlong;

ALTER TABLE pwr_plant ADD COLUMN plantlong numeric(18,4);


-- Function: pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone)

-- DROP FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone);

CREATE OR REPLACE FUNCTION pwrplant_usp_calculate_pwrplantadata(v_plantid integer, v_accountid integer, v_calcsettingmins integer, v_ts timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
    v_currdayenergy numeric(18,4);
    v_invpower numeric(18,4);
BEGIN
    SELECT SUM(currdayenergy),SUM(invpower) INTO v_currdayenergy,v_invpower from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and pwrinvdatats >= (date_trunc('minute',v_ts) - (('0:'||v_calcsettingmins)::time)) and (invdata.nextts > v_ts or invdata.nextts is null) 
    and inv.invplantid = v_plantid and inv.accountid = v_accountid group by inv.invplantid;
    IF(v_currdayenergy is not null and v_invpower is not null) THEN
        INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, plantcurdayenegry, iscalulatedfrominv)  VALUES (v_plantid, v_ts, v_invpower, v_currdayenergy, 'y');
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone) OWNER TO postgres;


-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_accountid integer;
    v_plantid integer;
    v_calcsettingmins integer;
    v_mod integer;
    v_ts timestamp without time zone;
    v_additionalmins integer;
    v_pwrinvdataid integer;
    v_pwrinvdatats timestamp without time zone;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
        IF(v_pwrinvdataid is not null) THEN
            UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
        END IF;
        SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
        IF(v_pwrinvdatats is not null) THEN
            UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
        END IF;
        SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
        SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
        v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
        IF(v_mod = 0) THEN
            v_ts = NEW.pwrinvdatats;
        ELSE
            v_additionalmins = v_calcsettingmins - v_mod;
            v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
        END IF;
        PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);

    ELSEIF (TG_OP = 'UPDATE') THEN
        
    ELSEIF (TG_OP = 'DELETE') THEN
        
    END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;



-- Trigger: tggr_pwrplant_inverterdata on pwr_inverterdata

-- DROP TRIGGER tggr_pwrplant_inverterdata ON pwr_inverterdata;

CREATE TRIGGER tggr_pwrplant_inverterdata
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_inverterdata
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwrplant_inverterdata();
  
  
-- Table: pwr_calcsetting

-- DROP TABLE pwr_calcsetting;

CREATE TABLE pwr_calcsetting
(
  pwrcalcsettingid serial NOT NULL,
  accountid integer,
  calcsettingmins integer,
  CONSTRAINT pwr_calcsetting_pk PRIMARY KEY (pwrcalcsettingid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_calcsetting OWNER TO postgres;



--added by murali on 11-12-2015

-- Function: torp_usp_recalculate_pwr_inverters_installedinvcapacity(integer, integer)

-- DROP FUNCTION torp_usp_recalculate_pwr_inverters_installedinvcapacity(integer, integer);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_inverters_installedinvcapacity(v_accountid integer, v_inverterid integer)
  RETURNS integer AS
$BODY$
DECLARE
    
BEGIN

        update pwr_inverters  set 
        installedinvcapacity= (select sum(strcapacity) from pwr_strings where accountid=v_accountid and inverterid=v_inverterid)
        where  accountid=V_accountid and pwrinverterid=v_inverterid;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_inverters_installedinvcapacity(integer, integer) OWNER TO postgres;



-- Function: torp_usp_recalculate_pwr_strings_updatestrcapacity(numeric, integer, integer)

-- DROP FUNCTION torp_usp_recalculate_pwr_strings_updatestrcapacity(numeric, integer, integer);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_strings_updatestrcapacity(v_panelpmpp numeric, v_accountid integer, v_pwrpanelmodelid integer)
  RETURNS integer AS
$BODY$
DECLARE
    
BEGIN

        update pwr_strings  set 
        strcapacity= numpanels*v_panelpmpp
        where  panelmodelid = v_pwrpanelmodelid and accountid=V_accountid;

    
RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_strings_updatestrcapacity(numeric, integer, integer) OWNER TO postgres;



-- Function: tggrfunc_pwr_panelmodel()

-- DROP FUNCTION tggrfunc_pwr_panelmodel();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_panelmodel()
  RETURNS trigger AS
$BODY$
BEGIN
    
    IF (TG_OP = 'INSERT') THEN
        PERFORM torp_usp_recalculate_pwr_strings_updatestrcapacity(NEW.panelpmpp,NEW.accountid,NEW.pwrpanelmodelid);              
    END IF;

    IF (TG_OP = 'UPDATE') THEN
        PERFORM torp_usp_recalculate_pwr_strings_updatestrcapacity(NEW.panelpmpp,NEW.accountid,NEW.pwrpanelmodelid);
    END IF;

    
  RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_panelmodel() OWNER TO postgres;





-- Trigger: tggr_onpwr_panelmodel on pwr_panelmodel

-- DROP TRIGGER tggr_onpwr_panelmodel ON pwr_panelmodel;

CREATE TRIGGER tggr_onpwr_panelmodel
  AFTER INSERT OR UPDATE
  ON pwr_panelmodel
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_panelmodel();

  
  
  -- Function: tggrfunc_pwr_strings()

-- DROP FUNCTION tggrfunc_pwr_strings();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_strings()
  RETURNS trigger AS
$BODY$
DECLARE
  v_panelpmpp numeric;
  
BEGIN
    
    IF (TG_OP = 'INSERT') THEN
            select panelpmpp into v_panelpmpp  from pwr_panelmodel where  pwrpanelmodelid=NEW.panelmodelid and accountid=NEW.accountid;
            PERFORM torp_usp_recalculate_pwr_strings_updatestrcapacity(v_panelpmpp,NEW.accountid,NEW.panelmodelid);     
    END IF;

    IF (TG_OP = 'UPDATE') THEN
        IF (NEW.numpanels != OLD.numpanels) THEN
            select panelpmpp into v_panelpmpp  from pwr_panelmodel where  pwrpanelmodelid=NEW.panelmodelid and accountid=NEW.accountid;
            PERFORM torp_usp_recalculate_pwr_strings_updatestrcapacity(v_panelpmpp,NEW.accountid,NEW.panelmodelid);
        END IF;
        PERFORM torp_usp_recalculate_pwr_inverters_installedinvcapacity(NEW.accountid,NEW.inverterid);
    END IF;
    IF (TG_OP = 'DELETE') THEN
        PERFORM torp_usp_recalculate_pwr_inverters_installedinvcapacity(OLD.accountid,OLD.inverterid);
    END IF;
  RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_strings() OWNER TO postgres;

  

-- Trigger: tggr_onpwr_strings on pwr_strings

-- DROP TRIGGER tggr_onpwr_strings ON pwr_strings;

CREATE TRIGGER tggr_onpwr_strings
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_strings
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_strings();

  
  -- Column: invcapacity

-- ALTER TABLE pwr_invertermodel DROP COLUMN invcapacity;

ALTER TABLE pwr_invertermodel ADD COLUMN invcapacity numeric(18,4);
ALTER TABLE pwr_calcsetting OWNER TO postgres;


--added on 11-12-2015


-- Column: nextts

-- ALTER TABLE pwr_plantdata DROP COLUMN nextts;

ALTER TABLE pwr_plantdata ADD COLUMN nextts timestamp without time zone;


-- Rule: pwrplant_insert_no_duplicate_entry ON pwr_plantdata

-- DROP RULE pwrplant_insert_no_duplicate_entry ON pwr_plantdata;

CREATE OR REPLACE RULE pwrplant_insert_no_duplicate_entry AS
    ON INSERT TO pwr_plantdata
   WHERE (EXISTS ( SELECT 1
           FROM pwr_plantdata plnt
          WHERE plnt.pwrplantdatats = new.pwrplantdatats AND plnt.forplantid = new.forplantid AND plnt.iscalulatedfrominv = new.iscalulatedfrominv)) DO INSTEAD NOTHING;

          
          
-- Rule: pwrplant_insert_no_duplicate_entry ON pwr_inverterdata

-- DROP RULE pwrplant_insert_no_duplicate_entry ON pwr_inverterdata;

CREATE OR REPLACE RULE pwrplant_insert_no_duplicate_entry AS
    ON INSERT TO pwr_inverterdata
   WHERE (EXISTS ( SELECT 1
           FROM pwr_inverterdata inv
          WHERE inv.pwrinvdatats = new.pwrinvdatats AND inv.forinverterid = new.forinverterid)) DO INSTEAD NOTHING;

          
-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_pwrplantdataid integer;
    v_pwrplantdatats timestamp without time zone;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
        and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
        IF(v_pwrplantdataid is not null) THEN
            UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
        END IF;
        SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
        and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
        IF(v_pwrplantdatats is not null) THEN
            UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
        END IF;
    ELSEIF (TG_OP = 'UPDATE') THEN
        
    ELSEIF (TG_OP = 'DELETE') THEN
        
    END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;


-- Trigger: tggr_pwr_plantdata on pwr_plantdata

-- DROP TRIGGER tggr_pwr_plantdata ON pwr_plantdata;

CREATE TRIGGER tggr_pwr_plantdata
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_plantdata
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_plantdata();
  
  
-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_accountid integer;
    v_plantid integer;
    v_calcsettingmins integer;
    v_mod integer;
    v_ts timestamp without time zone;
    v_additionalmins integer;
    v_pwrinvdataid integer;
    v_pwrinvdatats timestamp without time zone;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
        IF(v_pwrinvdataid is not null) THEN
            UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
        END IF;
        SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
        IF(v_pwrinvdatats is not null) THEN
            UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
        END IF;
        SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
        SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
        v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
        IF(v_mod = 0) THEN
            v_ts = NEW.pwrinvdatats;
        ELSE
            v_additionalmins = v_calcsettingmins - v_mod;
            v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
        END IF;
        DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts;
        PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);

    ELSEIF (TG_OP = 'UPDATE') THEN
        
    ELSEIF (TG_OP = 'DELETE') THEN
        
    END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;


--added on 06-01-2016

-- Function: pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone)

-- DROP FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone);

CREATE OR REPLACE FUNCTION pwrplant_usp_calculate_pwrplantadata(v_plantid integer, v_accountid integer, v_calcsettingmins integer, v_ts timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
    v_currdayenergy numeric(18,4);
    v_invpower numeric(18,4);
BEGIN
    SELECT SUM(invpower) INTO v_invpower from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and pwrinvdatats >= (date_trunc('minute',v_ts) - (('0:'||v_calcsettingmins)::time)) and (invdata.nextts > v_ts or invdata.nextts is null) 
    and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and inv.accountid = v_accountid group by inv.invplantid;
    SELECT SUM(currdayenergy) INTO v_currdayenergy from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and (invdata.nextts > v_ts or invdata.nextts is null) and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and 
    inv.accountid = v_accountid group by inv.invplantid;
    IF(v_currdayenergy is not null and v_invpower is not null) THEN
        INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, plantcurdayenegry, iscalulatedfrominv)  VALUES (v_plantid, v_ts, v_invpower, v_currdayenergy, 'y');
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone) OWNER TO postgres;

--added on 08-01-2016

-- Function: torp_usp_recalculate_pwr_plant_installeddccapacity(integer, integer)

-- DROP FUNCTION torp_usp_recalculate_pwr_plant_installeddccapacity(integer, integer);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plant_installeddccapacity(v_accountid integer, v_plantid integer)
  RETURNS integer AS
$BODY$
DECLARE
    
BEGIN
    update pwr_plant set pwrinstalledcapacity = (select sum(installedinvcapacity) from pwr_inverters where accountid=v_accountid and invplantid = v_plantid)
    where accountid=v_accountid and pwrplantid=v_plantid;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plant_installeddccapacity(integer, integer) OWNER TO postgres;


-- Function: tggrfunc_pwr_inverters()

-- DROP FUNCTION tggrfunc_pwr_inverters();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_inverters()
  RETURNS trigger AS
$BODY$
DECLARE  
BEGIN
    IF (TG_OP = 'INSERT') THEN
        PERFORM torp_usp_recalculate_pwr_plant_installeddccapacity(NEW.accountid,NEW.invplantid);     
    END IF;

    IF (TG_OP = 'UPDATE') THEN
        IF (NEW.installedinvcapacity != OLD.installedinvcapacity) THEN
            PERFORM torp_usp_recalculate_pwr_plant_installeddccapacity(NEW.accountid,NEW.invplantid);
        END IF;
    END IF;
    IF (TG_OP = 'DELETE') THEN
        PERFORM torp_usp_recalculate_pwr_plant_installeddccapacity(OLD.accountid,OLD.invplantid);
    END IF;
  RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_inverters() OWNER TO postgres;


-- Trigger: tggr_on_pwr_inverters on pwr_inverters

-- DROP TRIGGER tggr_on_pwr_inverters ON pwr_inverters;

CREATE TRIGGER tggr_on_pwr_inverters
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_inverters
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_inverters();
  
--added on 08-02-2016

-- Column: tzdiffinmins

-- ALTER TABLE pwr_plant DROP COLUMN tzdiffinmins;

ALTER TABLE pwr_plant ADD COLUMN tzdiffinmins numeric(18,4);

--added on 10-02-2016

-- Function: tggrfunc_before_insert_pwr_plantdata()

-- DROP FUNCTION tggrfunc_before_insert_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_before_insert_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_meterreading numeric(18,4);
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF(NEW.iscalulatedfrominv = 'm') THEN
            SELECT meterreading INTO v_meterreading from pwr_plantdata where date(pwrplantdatats) < date(NEW.pwrplantdatats) and forplantid = NEW.forplantid 
            and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
            IF(v_meterreading is not null and (NEW.meterreading - v_meterreading) >= 0) THEN
                NEW.plantcurdayenegry = NEW.meterreading - v_meterreading;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_before_insert_pwr_plantdata() OWNER TO postgres;


-- Trigger: tggr_before_insert_pwr_plantdata on pwr_plantdata

-- DROP TRIGGER tggr_before_insert_pwr_plantdata ON pwr_plantdata;

CREATE TRIGGER tggr_before_insert_pwr_plantdata
  BEFORE INSERT
  ON pwr_plantdata
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_before_insert_pwr_plantdata();


-- Function: torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(v_timestamp timestamp without time zone, v_forplantid integer, v_meterreading numeric)
  RETURNS integer AS
$BODY$
DECLARE
    p_meterreading numeric;
BEGIN
    SELECT meterreading INTO p_meterreading from pwr_plantdata where date(pwrplantdatats) < date(v_timestamp) and forplantid = v_forplantid
    and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
    IF(p_meterreading is not null) THEN
        IF(v_meterreading - p_meterreading >= 0) THEN
            UPDATE pwr_plantdata set plantcurdayenegry = (v_meterreading - p_meterreading) where pwrplantdatats = v_timestamp and forplantid = v_forplantid 
            and iscalulatedfrominv = 'm';
        END IF;
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric) OWNER TO postgres;

--added on 22-02-2016

-- Table: userplants

-- DROP TABLE userplants;

CREATE TABLE userplants
(
  userid integer NOT NULL,
  allowedplants integer[],
  CONSTRAINT userplants_userid_pk PRIMARY KEY (userid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE userplants OWNER TO postgres;


--added on 24-02-2016

-- Table: pwr_plantdatadup

-- DROP TABLE pwr_plantdatadup;

CREATE TABLE pwr_plantdatadup
(
  pwr_plantdatadupid serial NOT NULL,
  forplantid integer,
  pwrplantdatats timestamp without time zone,
  plantdatairradiance numeric(18,4),
  plantmoduletemp numeric(18,4),
  plantambtemp numeric(18,4),
  iscalulatedfrominv character(1) DEFAULT 'n'::bpchar,
  CONSTRAINT pwr_plantdatadup_pk PRIMARY KEY (pwr_plantdatadupid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plantdatadup OWNER TO postgres;

-- Rule: pwrplant_insert_no_duplicate_entry ON pwr_plantdata

-- DROP RULE pwrplant_insert_no_duplicate_entry ON pwr_plantdata;

CREATE OR REPLACE RULE pwrplant_insert_no_duplicate_entry AS
    ON INSERT TO pwr_plantdata
   WHERE (EXISTS ( SELECT 1
           FROM pwr_plantdata plnt
          WHERE plnt.pwrplantdatats = new.pwrplantdatats AND plnt.forplantid = new.forplantid AND plnt.iscalulatedfrominv = new.iscalulatedfrominv)) DO INSTEAD
          INSERT INTO pwr_plantdatadup(forplantid, pwrplantdatats, plantdatairradiance, 
            plantmoduletemp, plantambtemp, iscalulatedfrominv) VALUES (new.forplantid, new.pwrplantdatats, new.plantdatairradiance, 
            new.plantmoduletemp, new.plantambtemp, new.iscalulatedfrominv);

            
--added on 25-02-2015

DROP RULE pwrplant_insert_no_duplicate_entry ON pwr_inverterdata;

-- Constraint: pwr_inverterdata_inverterid_pdts_uk

-- ALTER TABLE pwr_inverterdata DROP CONSTRAINT pwr_inverterdata_inverterid_pdts_uk;

ALTER TABLE pwr_inverterdata
  ADD CONSTRAINT pwr_inverterdata_inverterid_pdts_uk UNIQUE(forinverterid, pwrinvdatats);
  
-- Constraint: pwr_plantdata_forplantid_pdts_iscal_uk

-- ALTER TABLE pwr_plantdata DROP CONSTRAINT pwr_plantdata_forplantid_pdts_iscal_uk;

ALTER TABLE pwr_plantdata
  ADD CONSTRAINT pwr_plantdata_forplantid_pdts_iscal_uk UNIQUE(forplantid, pwrplantdatats, iscalulatedfrominv);
  
    
-- Fix in dropped pwr_plantdata (FIX in Delete before recalc, delete only calculated records)

-- Mahesh, 06/03/2016 - Fix in dropped pwr_plantdata (FIX in Delete before recalc, delete only calculated records)

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_accountid integer;
    v_plantid integer;
    v_calcsettingmins integer;
    v_mod integer;
    v_ts timestamp without time zone;
    v_additionalmins integer;
    v_pwrinvdataid integer;
    v_pwrinvdatats timestamp without time zone;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
        IF(v_pwrinvdataid is not null) THEN
            UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
        END IF;
        SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
        IF(v_pwrinvdatats is not null) THEN
            UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
        END IF;
        SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
        SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
        v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
        IF(v_mod = 0) THEN
            v_ts = NEW.pwrinvdatats;
        ELSE
            v_additionalmins = v_calcsettingmins - v_mod;
            v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
        END IF;
        DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
        PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);

    ELSEIF (TG_OP = 'UPDATE') THEN
        
    ELSEIF (TG_OP = 'DELETE') THEN
        
    END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;

-- Fix in dropped pwr_plantdata (FIX in Delete before recalc, delete only calculated records)


-- Function: pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone)

-- DROP FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone);

CREATE OR REPLACE FUNCTION pwrplant_usp_calculate_pwrplantadata(v_plantid integer, v_accountid integer, v_calcsettingmins integer, v_ts timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
    v_currdayenergy numeric(18,4);
    v_invpower numeric(18,4);
BEGIN
    SELECT SUM(invpower) INTO v_invpower from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and pwrinvdatats >= (date_trunc('minute',v_ts) - (('0:'||v_calcsettingmins)::time)) and (invdata.nextts > v_ts or invdata.nextts is null) 
    and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and inv.accountid = v_accountid group by inv.invplantid;
    SELECT SUM(currdayenergy) INTO v_currdayenergy from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and (invdata.nextts > v_ts or invdata.nextts is null) and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and 
    inv.accountid = v_accountid group by inv.invplantid;
    IF(v_currdayenergy is not null and v_invpower is not null) THEN
        DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
        INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, plantcurdayenegry, iscalulatedfrominv)  VALUES (v_plantid, v_ts, v_invpower, v_currdayenergy, 'y');
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone) OWNER TO postgres;

--added on 09-03-2016

-- Function: torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(v_timestamp timestamp without time zone, v_forplantid integer, v_meterreading numeric)
  RETURNS integer AS
$BODY$
DECLARE
    p_meterreading numeric;
BEGIN
    SELECT meterreading INTO p_meterreading from pwr_plantdata where date(pwrplantdatats) < date(v_timestamp) and forplantid = v_forplantid
    and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
    IF(p_meterreading is not null) THEN
        IF(v_meterreading - p_meterreading >= 0) THEN
            UPDATE pwr_plantdata set plantcurdayenegry = (v_meterreading - p_meterreading) where pwrplantdatats = v_timestamp and forplantid = v_forplantid 
            and iscalulatedfrominv = 'm';
        END IF;
    ELSE
        UPDATE pwr_plantdata set plantcurdayenegry = v_meterreading where pwrplantdatats = v_timestamp and forplantid = v_forplantid 
            and iscalulatedfrominv = 'm';
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric) OWNER TO postgres;


-- Function: tggrfunc_before_insert_pwr_plantdata()

-- DROP FUNCTION tggrfunc_before_insert_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_before_insert_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_meterreading numeric(18,4);
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF(NEW.iscalulatedfrominv = 'm') THEN
            SELECT meterreading INTO v_meterreading from pwr_plantdata where date(pwrplantdatats) < date(NEW.pwrplantdatats) and forplantid = NEW.forplantid 
            and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
            IF(v_meterreading is not null and (NEW.meterreading - v_meterreading) >= 0) THEN
                NEW.plantcurdayenegry = NEW.meterreading - v_meterreading;
            ELSE
                NEW.plantcurdayenegry = NEW.meterreading;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_before_insert_pwr_plantdata() OWNER TO postgres;


-- Mahesh, 21/03/2016 Script to delete duplicate records for pwr_inverterdata (run repeatedly until no duplicates found)

delete from pwr_inverterdata where pwrinvdataid in (select min(pwrinvdataid) from pwr_inverterdata group by forinverterid, pwrinvdatats having count(*) > 1);


--added on 24-03-2016

-- Table: pwr_plantmeters

-- DROP TABLE pwr_plantmeters;

CREATE TABLE pwr_plantmeters
(
  pwrplantmeterid serial NOT NULL,
  forplantid integer,
  accountid integer,
  metername text,
  metercode text,
  CONSTRAINT pwr_plantmeters_pk PRIMARY KEY (pwrplantmeterid),
  CONSTRAINT pwr_plantmeters_forplantid_fk FOREIGN KEY (forplantid)
      REFERENCES pwr_plant (pwrplantid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT pwr_plantmeters_forplantid_metercode_uk UNIQUE (forplantid, metercode)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plantmeters OWNER TO postgres;


--added on 31-03-2016

-- Column: invstatus

-- ALTER TABLE pwr_inverterdata DROP COLUMN invstatus;

ALTER TABLE pwr_inverterdata ADD COLUMN invstatus integer;

-- Column: inverrorcode

-- ALTER TABLE pwr_inverterdata DROP COLUMN inverrorcode;

ALTER TABLE pwr_inverterdata ADD COLUMN inverrorcode integer;


--  Mahesh, 20/04/2016 sp to recalculate nextts for pwr_plantdata record

-- Function: torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_nextts(v_for_pwrplantdataid integer)
  RETURNS integer AS
$BODY$
DECLARE
	v_pwrplantdatats timestamp without time zone;
	v_forplantid integer;
	v_iscalculatedforminv character(1);
	v_pwrplantdataid integer;
BEGIN
		select pwrplantdatats,forplantid,iscalulatedfrominv into v_pwrplantdatats, v_forplantid, v_iscalculatedforminv 
		from pwr_plantdata where pwrplantdataid = v_for_pwrplantdataid;
		if (v_pwrplantdatats is null) THEN
			RETURN 1;
		END IF;
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < v_pwrplantdatats and forplantid = v_forplantid 
		and iscalulatedfrominv = v_iscalculatedforminv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > v_pwrplantdatats and forplantid = v_forplantid 
		and iscalulatedfrominv = v_iscalculatedforminv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = v_for_pwrplantdataid;
		END IF;
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_nextts(integer) OWNER TO postgres;


--added on 22-04-2016

-- Column: cotwosavedperkwh

-- ALTER TABLE pwr_plant DROP COLUMN cotwosavedperkwh;

ALTER TABLE pwr_plant ADD COLUMN cotwosavedperkwh numeric(18,4);

--added on 01-06-2016

-- Table: files

-- DROP TABLE files;

CREATE TABLE files
(
  fileid serial NOT NULL,
  storageid integer,
  filename character varying(128),
  accountid integer,
  doctypeid integer,
  uploadedby integer,
  storagetype integer,
  uploadedtime timestamp without time zone DEFAULT now(),
  contenttype character varying(100),
  filesize integer,
  fileextension character varying(50),
  ishide character(1) DEFAULT 'n'::bpchar,
  filetype integer,
  CONSTRAINT files_pkey PRIMARY KEY (fileid),
  CONSTRAINT files_account_fkey FOREIGN KEY (accountid)
      REFERENCES accounts (accountid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT users_userid_fk FOREIGN KEY (uploadedby)
      REFERENCES users (userid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE files OWNER TO postgres;

-- Table: filestoredb

-- DROP TABLE filestoredb;

CREATE TABLE filestoredb
(
  filestoreid serial NOT NULL,
  "content" bytea,
  CONSTRAINT filestoredb_pkey PRIMARY KEY (filestoreid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE filestoredb OWNER TO postgres;

-- Table: pwr_plantdocs

-- DROP TABLE pwr_plantdocs;

CREATE TABLE pwr_plantdocs
(
  pwrplantsdocid serial NOT NULL,
  pdocname text,
  pdocdate timestamp without time zone,
  pdoctype integer,
  createdby integer,
  createddate timestamp without time zone,
  forplantid integer,
  docfileid integer,
  accountid integer,
  CONSTRAINT pwr_plantdocs_pk PRIMARY KEY (pwrplantsdocid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plantdocs OWNER TO postgres;


-- Mahesh, 09/06/2016, ignore zero value columns

-- Function: torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(v_timestamp timestamp without time zone, v_forplantid integer, v_meterreading numeric)
  RETURNS integer AS
$BODY$
DECLARE
    p_meterreading numeric;
BEGIN
    SELECT meterreading INTO p_meterreading from pwr_plantdata where date(pwrplantdatats) < date(v_timestamp) and forplantid = v_forplantid
    and iscalulatedfrominv = 'm' and meterreading > 0 order by pwrplantdatats desc limit 1;
    IF(p_meterreading is not null) THEN
        IF(v_meterreading - p_meterreading >= 0) THEN
            UPDATE pwr_plantdata set plantcurdayenegry = (v_meterreading - p_meterreading) where pwrplantdatats = v_timestamp and forplantid = v_forplantid 
            and iscalulatedfrominv = 'm';
        END IF;
    ELSE
        UPDATE pwr_plantdata set plantcurdayenegry = v_meterreading where pwrplantdatats = v_timestamp and forplantid = v_forplantid 
            and iscalulatedfrominv = 'm';
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_for_meterreading(timestamp without time zone, integer, numeric) OWNER TO postgres;


--added on 14-06-2016

-- Column: irradiancefromplantid

-- ALTER TABLE pwr_plant DROP COLUMN irradiancefromplantid;

ALTER TABLE pwr_plant ADD COLUMN irradiancefromplantid integer;

-- added on 08-08-2016

-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_irradiancefromplantid integer;
	v_pwrplantdatats timestamp without time zone;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		SELECT irradiancefromplantid INTO v_irradiancefromplantid FROM pwr_plant where pwrplantid = NEW.forplantid;
		IF(v_irradiancefromplantid is not null and v_irradiancefromplantid > 0) THEN
			SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = v_irradiancefromplantid
			and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
			IF(v_pwrplantdataid is null) THEN
				INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
				VALUES (v_irradiancefromplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
			END IF;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;


--added on 11-08-2016

-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        v_pwrplantid integer;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			SELECT pwrplantid INTO v_pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid;
			IF(v_pwrplantid is not null and v_pwrplantid > 0) THEN
				SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = v_pwrplantid
				and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
				IF(v_pwrplantdataid is null) THEN
					INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
					VALUES (v_pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
				ELSE
					UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
				END IF;
			END IF;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;


--added on 22-08-2016

-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;

-- Mahesh, 14/10/2016 ignore zero meter reading

-- Function: tggrfunc_before_insert_pwr_plantdata()

-- DROP FUNCTION tggrfunc_before_insert_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_before_insert_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_meterreading numeric(18,4);
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF(NEW.iscalulatedfrominv = 'm') THEN
            SELECT meterreading INTO v_meterreading from pwr_plantdata where date(pwrplantdatats) < date(NEW.pwrplantdatats) and meterreading > 0 and  forplantid = NEW.forplantid 
            and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
            IF(v_meterreading is not null and (NEW.meterreading - v_meterreading) >= 0) THEN
                NEW.plantcurdayenegry = NEW.meterreading - v_meterreading;
            ELSE
                NEW.plantcurdayenegry = NEW.meterreading;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_before_insert_pwr_plantdata() OWNER TO postgres;


-- Mahesh, 31/10/16, Performance improvements - indexes 


create index pm_idx_inverters_code on pwr_inverters (invertercode);

create index pm_idx_strings_inverterid on pwr_strings (inverterid);

create index pm_plantdata_forplantid on pwr_plantdata (forplantid);

create index pm_idx_inverterdata on pwr_inverterdata (forinverterid);

create index pm_idx_invdatats on pwr_inverterdata (pwrinvdatats desc);

create index pm_idx_invdatats_asc on pwr_inverterdata (pwrinvdatats asc);

-- added on 08-11-2016

-- Column: hasmeterreading

-- ALTER TABLE pwr_plant DROP COLUMN hasmeterreading;

ALTER TABLE pwr_plant ADD COLUMN hasmeterreading character(1);
ALTER TABLE pwr_plant ALTER COLUMN hasmeterreading SET DEFAULT 'n'::bpchar;

-- Column: meterreadinginterval

-- ALTER TABLE pwr_plant DROP COLUMN meterreadinginterval;

ALTER TABLE pwr_plant ADD COLUMN meterreadinginterval integer;
ALTER TABLE pwr_plant ALTER COLUMN meterreadinginterval SET DEFAULT 0;

-- Column: hasinverterdata

-- ALTER TABLE pwr_plant DROP COLUMN hasinverterdata;

ALTER TABLE pwr_plant ADD COLUMN hasinverterdata character(1);
ALTER TABLE pwr_plant ALTER COLUMN hasinverterdata SET DEFAULT 'n'::bpchar;

-- Column: minirradianceforpower

-- ALTER TABLE pwr_plant DROP COLUMN minirradianceforpower;

ALTER TABLE pwr_plant ADD COLUMN minirradianceforpower numeric(10,4);
ALTER TABLE pwr_plant ALTER COLUMN minirradianceforpower SET DEFAULT 0;

-- Column: alertsto

-- ALTER TABLE pwr_plant DROP COLUMN alertsto;

ALTER TABLE pwr_plant ADD COLUMN alertsto text;

-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
	v_plantRecord pwr_plant;
	v_irradiance numeric(18,4);
	v_email text;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
		IF((NEW.iscalulatedfrominv = 'm' or NEW.iscalulatedfrominv = 'y') and NEW.plantpower = 0) THEN
			SELECT * INTO v_plantRecord from pwr_plant where pwrplantid = NEW.forplantid;
			IF(v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = NEW.forplantid 
				and pwrplantdatats >= NEW.pwrplantdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrplantdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
					(v_email, 'Alert:Plant Power Zero', 
					E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
					v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
				END IF;
			END IF;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;


-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_accountid integer;
	v_plantid integer;
	v_calcsettingmins integer;
	v_mod integer;
	v_ts timestamp without time zone;
	v_additionalmins integer;
	v_pwrinvdataid integer;
	v_pwrinvdatats timestamp without time zone;
	v_invdata pwr_inverters;	
	v_plantRecord pwr_plant;
	v_email text;
	v_irradiance numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
		IF(v_pwrinvdataid is not null) THEN
			UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
		END IF;
		SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
		IF(v_pwrinvdatats is not null) THEN
			UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
		END IF;
		SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
		SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
		v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
		IF(v_mod = 0) THEN
			v_ts = NEW.pwrinvdatats;
		ELSE
			v_additionalmins = v_calcsettingmins - v_mod;
			v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
		END IF;
		DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
		PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);
		IF(NEW.invpower = 0) THEN
			SELECT * INTO v_invdata from pwr_inverters where pwrinverterid = NEW.forinverterid;
			SELECT plnt.* INTO v_plantRecord from pwr_plant plnt join pwr_inverters inv on(inv.invplantid = plnt.pwrplantid) where inv.pwrinverterid = NEW.forinverterid;
			IF(v_plantRecord.hasinverterdata is not null and v_plantRecord.hasinverterdata ='y' and v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = v_plantRecord.pwrplantid 
				and pwrplantdatats >= NEW.pwrinvdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrinvdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
					(v_email, 'Alert:Inverter Power Zero', 
					E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
					v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
				END IF;
			END IF;
		END IF;

	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;


--added on 21-11-2016


-- Column: powerdownstatus

-- ALTER TABLE pwr_inverters DROP COLUMN powerdownstatus;

ALTER TABLE pwr_inverters ADD COLUMN powerdownstatus integer;
ALTER TABLE pwr_inverters ALTER COLUMN powerdownstatus SET DEFAULT 0;

-- Column: powerdownstatusalerttime

-- ALTER TABLE pwr_inverters DROP COLUMN powerdownstatusalerttime;

ALTER TABLE pwr_inverters ADD COLUMN powerdownstatusalerttime timestamp without time zone;

-- Column: powerdownstatus

-- ALTER TABLE pwr_plant DROP COLUMN powerdownstatus;

ALTER TABLE pwr_plant ADD COLUMN powerdownstatus integer;
ALTER TABLE pwr_plant ALTER COLUMN powerdownstatus SET DEFAULT 0;

-- Column: powerdownstatusalerttime

-- ALTER TABLE pwr_plant DROP COLUMN powerdownstatusalerttime;

ALTER TABLE pwr_plant ADD COLUMN powerdownstatusalerttime timestamp without time zone;

-- Column: meterreadingstatus

-- ALTER TABLE pwr_plant DROP COLUMN meterreadingstatus;

ALTER TABLE pwr_plant ADD COLUMN meterreadingstatus integer;
ALTER TABLE pwr_plant ALTER COLUMN meterreadingstatus SET DEFAULT 0;

-- Column: lastmeterreadingalerttime

-- ALTER TABLE pwr_plant DROP COLUMN lastmeterreadingalerttime;

ALTER TABLE pwr_plant ADD COLUMN lastmeterreadingalerttime timestamp without time zone;
-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
	v_plantRecord pwr_plant;
	v_irradiance numeric(18,4);
	v_email text;
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
		SELECT * INTO v_plantRecord from pwr_plant where pwrplantid = NEW.forplantid;
		IF((NEW.iscalulatedfrominv = 'm' or NEW.iscalulatedfrominv = 'y') and NEW.plantpower = 0) THEN
			IF(v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = NEW.forplantid 
				and pwrplantdatats >= NEW.pwrplantdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrplantdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_plantRecord.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Plant Power Zero', 
						E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_plant set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval
						where pwrplantid = v_plantRecord.pwrplantid 
						and accountid = v_plantRecord.accountid;
					ELSE 
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_plantRecord.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_plantRecord.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_plantRecord.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Plant Power Zero', 
							E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_plant set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval
							where pwrplantid = v_plantRecord.pwrplantid and accountid = v_plantRecord.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_plant set powerdownstatus = 0, powerdownstatusalerttime = null where pwrplantid = v_plantRecord.pwrplantid 
			and accountid = v_plantRecord.accountid;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;


-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_accountid integer;
	v_plantid integer;
	v_calcsettingmins integer;
	v_mod integer;
	v_ts timestamp without time zone;
	v_additionalmins integer;
	v_pwrinvdataid integer;
	v_pwrinvdatats timestamp without time zone;
	v_invdata pwr_inverters;	
	v_plantRecord pwr_plant;
	v_email text;
	v_irradiance numeric(18,4);
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
		IF(v_pwrinvdataid is not null) THEN
			UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
		END IF;
		SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
		IF(v_pwrinvdatats is not null) THEN
			UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
		END IF;
		SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
		SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
		v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
		IF(v_mod = 0) THEN
			v_ts = NEW.pwrinvdatats;
		ELSE
			v_additionalmins = v_calcsettingmins - v_mod;
			v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
		END IF;
		DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
		PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);
		SELECT * INTO v_invdata from pwr_inverters where pwrinverterid = NEW.forinverterid;
		IF(NEW.invpower = 0) THEN
			SELECT plnt.* INTO v_plantRecord from pwr_plant plnt join pwr_inverters inv on(inv.invplantid = plnt.pwrplantid) where inv.pwrinverterid = NEW.forinverterid;
			IF(v_plantRecord.hasinverterdata is not null and v_plantRecord.hasinverterdata ='y' and v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = v_plantRecord.pwrplantid 
				and pwrplantdatats >= NEW.pwrinvdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrinvdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_invdata.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Inverter Power Zero', 
						E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_inverters set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
						where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
					ELSE
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_invdata.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_invdata.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_invdata.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Inverter Power Zero', 
							E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_inverters set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
							where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_inverters set powerdownstatus = 0, powerdownstatusalerttime = null where pwrinverterid = v_invdata.pwrinverterid 
			and accountid = v_invdata.accountid;
		END IF;

	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;



--added on 18-01-2017


-- Column: inverterdatainterval

-- ALTER TABLE pwr_plant DROP COLUMN inverterdatainterval;

ALTER TABLE pwr_plant ADD COLUMN inverterdatainterval integer;

-- Column: lastinverterdataalerttime

-- ALTER TABLE pwr_plant DROP COLUMN lastinverterdataalerttime;

ALTER TABLE pwr_plant ADD COLUMN lastinverterdataalerttime timestamp without time zone;

-- Column: inverterdownstatus

-- ALTER TABLE pwr_plant DROP COLUMN inverterdownstatus;

ALTER TABLE pwr_plant ADD COLUMN inverterdownstatus integer;
ALTER TABLE pwr_plant ALTER COLUMN inverterdownstatus SET DEFAULT 0;


-- Column: lastinverterdatats

-- ALTER TABLE pwr_inverters DROP COLUMN lastinverterdatats;

ALTER TABLE pwr_inverters ADD COLUMN lastinverterdatats timestamp without time zone;

-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_accountid integer;
	v_plantid integer;
	v_calcsettingmins integer;
	v_mod integer;
	v_ts timestamp without time zone;
	v_additionalmins integer;
	v_pwrinvdataid integer;
	v_pwrinvdatats timestamp without time zone;
	v_invdata pwr_inverters;	
	v_plantRecord pwr_plant;
	v_email text;
	v_irradiance numeric(18,4);
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
	v_lastinverterdatats timestamp without time zone;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
		IF(v_pwrinvdataid is not null) THEN
			UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
		END IF;
		SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
		IF(v_pwrinvdatats is not null) THEN
			UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
		END IF;
		SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
		SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
		v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
		IF(v_mod = 0) THEN
			v_ts = NEW.pwrinvdatats;
		ELSE
			v_additionalmins = v_calcsettingmins - v_mod;
			v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
		END IF;
		DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
		PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);
		SELECT * INTO v_invdata from pwr_inverters where pwrinverterid = NEW.forinverterid;
		IF(NEW.invpower = 0) THEN
			SELECT plnt.* INTO v_plantRecord from pwr_plant plnt join pwr_inverters inv on(inv.invplantid = plnt.pwrplantid) where inv.pwrinverterid = NEW.forinverterid;
			IF(v_plantRecord.hasinverterdata is not null and v_plantRecord.hasinverterdata ='y' and v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = v_plantRecord.pwrplantid 
				and pwrplantdatats >= NEW.pwrinvdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrinvdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_invdata.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Inverter Power Zero', 
						E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_inverters set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
						where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
					ELSE
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_invdata.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_invdata.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_invdata.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Inverter Power Zero', 
							E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_inverters set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
							where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_inverters set powerdownstatus = 0, powerdownstatusalerttime = null where pwrinverterid = v_invdata.pwrinverterid; 
			
		END IF;
		SELECT lastinverterdatats into v_lastinverterdatats from pwr_inverters where pwrinverterid = NEW.forinverterid;
		IF(v_lastinverterdatats is null or v_lastinverterdatats < NEW.pwrinvdatats) THEN
			UPDATE pwr_inverters SET lastinverterdatats = NEW.pwrinvdatats where pwrinverterid = NEW.forinverterid;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;


--added on 20-01-2017


-- Column: powerdowntime

-- ALTER TABLE pwr_plant DROP COLUMN powerdowntime;

ALTER TABLE pwr_plant ADD COLUMN powerdowntime timestamp without time zone;

-- Column: lastmeterreadingtime

-- ALTER TABLE pwr_plant DROP COLUMN lastmeterreadingtime;

ALTER TABLE pwr_plant ADD COLUMN lastmeterreadingtime timestamp without time zone;

-- Function: tggrfunc_pwr_plant()

-- DROP FUNCTION tggrfunc_pwr_plant();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plant()
  RETURNS trigger AS
$BODY$
BEGIN
	IF (TG_OP = 'INSERT') THEN
		
	ELSEIF (TG_OP = 'UPDATE') THEN
		IF(NEW.powerdownstatus = 0 and OLD.powerdownstatus > 0) THEN
			UPDATE pwr_plant SET powerdowntime = null where pwrplantid = NEW.pwrplantid;
		END IF;
		IF(NEW.meterreadingstatus = 0 and OLD.meterreadingstatus > 0) THEN
			UPDATE pwr_plant SET lastmeterreadingtime = null where pwrplantid = NEW.pwrplantid;
		END IF;
		IF(NEW.meterreadingstatus > 0 and OLD.meterreadingstatus = 0) THEN
			UPDATE pwr_plant SET lastmeterreadingtime = now() where pwrplantid = NEW.pwrplantid;
		END IF;

	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plant() OWNER TO postgres;


-- Trigger: tggr_pwr_plant on pwr_plant

-- DROP TRIGGER tggr_pwr_plant ON pwr_plant;

CREATE TRIGGER tggr_pwr_plant
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_plant
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_plant();

  
-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
	v_plantRecord pwr_plant;
	v_irradiance numeric(18,4);
	v_email text;
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
		SELECT * INTO v_plantRecord from pwr_plant where pwrplantid = NEW.forplantid;
		IF((NEW.iscalulatedfrominv = 'm' or NEW.iscalulatedfrominv = 'y') and NEW.plantpower = 0) THEN
			IF(v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = NEW.forplantid 
				and pwrplantdatats >= NEW.pwrplantdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrplantdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_plantRecord.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Plant Power Zero', 
						E'Dear Sir/Madam,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||' as of' ||now()+v_plantRecord.tzdiffinmins*60::text::interval||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_plant set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval,
						powerdowntime = now()+v_plantRecord.tzdiffinmins*60::text::interval
						where pwrplantid = v_plantRecord.pwrplantid 
						and accountid = v_plantRecord.accountid;
					ELSE 
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_plantRecord.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_plantRecord.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_plantRecord.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Plant Power Zero', 
							E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power since '|| v_plantRecord.powerdowntime ||', but irradiance is '|| v_irradiance ||' as of '|| now()+v_plantRecord.tzdiffinmins*60::text::interval ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_plant set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval
							where pwrplantid = v_plantRecord.pwrplantid and accountid = v_plantRecord.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_plant set powerdownstatus = 0, powerdownstatusalerttime = null, powerdowntime=null where pwrplantid = v_plantRecord.pwrplantid 
			and accountid = v_plantRecord.accountid;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;

--added on 24-01-2017

-- Column: datakey

-- ALTER TABLE pwr_plantmeters DROP COLUMN datakey;

ALTER TABLE pwr_plantmeters ADD COLUMN datakey text;

-- Table: pwr_meterdata

-- DROP TABLE pwr_meterdata;

CREATE TABLE pwr_meterdata
(
  pwrmeterdataid serial NOT NULL,
  pwrplantid integer,
  pwrmeterid integer,
  meterdatats timestamp without time zone,
  meterdata numeric(18,4),
  CONSTRAINT pwr_meterdata_pk PRIMARY KEY (pwrmeterdataid),
  CONSTRAINT pwr_meterdata_fk FOREIGN KEY (pwrplantid)
      REFERENCES pwr_plant (pwrplantid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_meterdata OWNER TO postgres;


--added on 08-03-2017

-- Table: pwr_plantdatasummaries

-- DROP TABLE pwr_plantdatasummaries;

CREATE TABLE pwr_plantdatasummaries
(
  pwrplantdatasummaryid serial NOT NULL,
  pwrplantid integer,
  periodtype integer,
  periodfromdate timestamp without time zone,
  periodtodate timestamp without time zone,
  maxpower numeric(18,4),
  iscalculatefrominv character(1),
  CONSTRAINT pwr_plantdatasummaries_pk PRIMARY KEY (pwrplantdatasummaryid),
  CONSTRAINT pwr_plantdatasummaries_pwrplantid_fk FOREIGN KEY (pwrplantid)
      REFERENCES pwr_plant (pwrplantid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pwr_plantdatasummaries OWNER TO postgres;

-- Function: torp_usp_insert_or_update_max_power_plantdatasummary(integer, timestamp without time zone, numeric, integer, character)

-- DROP FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(integer, timestamp without time zone, numeric, integer, character);

CREATE OR REPLACE FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid integer, v_pwrplantdatats timestamp without time zone, v_maxpower numeric, v_periodtype integer, v_iscalulatedfrominv character)
  RETURNS integer AS
$BODY$
DECLARE
	v_pwrplantdatasummaryid integer;
BEGIN
		IF(v_periodtype = 3) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv;
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantid = v_pwrplantdatasummaryid;
			END IF;
		ELSIF(v_periodtype = 1) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv and date(periodfromdate) = date(date_trunc('month',v_pwrplantdatats)) 
			and date(periodtodate) = date(date_trunc('month', v_pwrplantdatats)+'1month');
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, periodfromdate, periodtodate, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, date(date_trunc('month',v_pwrplantdatats))::timestamp, date(date_trunc('month', v_pwrplantdatats)+'1month')::timestamp,
				v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantdatasummaryid = v_pwrplantdatasummaryid;
			END IF;
		ELSIF(v_periodtype = 2) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv and date(periodfromdate) = date(date_trunc('year',v_pwrplantdatats))
			and date(periodtodate) = date(date_trunc('year',v_pwrplantdatats)+'1year');
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, periodfromdate, periodtodate, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, date(date_trunc('year',v_pwrplantdatats))::timestamp, date(date_trunc('year',v_pwrplantdatats)+'1year')::timestamp,
				v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantdatasummaryid = v_pwrplantdatasummaryid;
			END IF;
		END IF;
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(integer, timestamp without time zone, numeric, integer, character) OWNER TO postgres;



-- Function: torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone)

-- DROP FUNCTION torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_max_powerplantdata(v_pwrplantid integer, v_iscalulatedfrominv character, v_pwrplantdatats timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
	v_maxpower numeric(18,4);
BEGIN
		v_maxpower = 0;
		SELECT max(plantpower) INTO v_maxpower FROM pwr_plantdata where forplantid = v_pwrplantid and iscalulatedfrominv = v_iscalulatedfrominv;
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 3, v_iscalulatedfrominv);
		select max(plantpower) INTO v_maxpower FROM pwr_plantdata where date(pwrplantdatats) >= date(date_trunc('month',v_pwrplantdatats)) 
		and date(pwrplantdatats) < date(date_trunc('month', v_pwrplantdatats)+'1month') and iscalulatedfrominv = v_iscalulatedfrominv;
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 1, v_iscalulatedfrominv);
		select max(plantpower) INTO v_maxpower FROM pwr_plantdata where	date(pwrplantdatats) >= date(date_trunc('year',v_pwrplantdatats))
		and date(pwrplantdatats) < date(date_trunc('year',v_pwrplantdatats)+'1year') and iscalulatedfrominv = v_iscalulatedfrominv; 
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 2, v_iscalulatedfrominv);
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone) OWNER TO postgres;


-- Function: tggrfunc_pwr_plantdata()

-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
	v_plantRecord pwr_plant;
	v_irradiance numeric(18,4);
	v_email text;
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
		SELECT * INTO v_plantRecord from pwr_plant where pwrplantid = NEW.forplantid;
		IF((NEW.iscalulatedfrominv = 'm' or NEW.iscalulatedfrominv = 'y') and NEW.plantpower = 0) THEN
			IF(v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = NEW.forplantid 
				and pwrplantdatats >= NEW.pwrplantdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrplantdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_plantRecord.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Plant Power Zero', 
						E'Dear Sir/Madam,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||' as of' ||now()+v_plantRecord.tzdiffinmins*60::text::interval||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_plant set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval,
						powerdowntime = now()+v_plantRecord.tzdiffinmins*60::text::interval
						where pwrplantid = v_plantRecord.pwrplantid 
						and accountid = v_plantRecord.accountid;
					ELSE 
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_plantRecord.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_plantRecord.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_plantRecord.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Plant Power Zero', 
							E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power since '|| v_plantRecord.powerdowntime ||', but irradiance is '|| v_irradiance ||' as of '|| now()+v_plantRecord.tzdiffinmins*60::text::interval ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_plant set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval
							where pwrplantid = v_plantRecord.pwrplantid and accountid = v_plantRecord.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_plant set powerdownstatus = 0, powerdownstatusalerttime = null, powerdowntime=null where pwrplantid = v_plantRecord.pwrplantid 
			and accountid = v_plantRecord.accountid;
		END IF;
		PERFORM torp_usp_recalculate_max_powerplantdata(NEW.forplantid, NEW.iscalulatedfrominv, NEW.pwrplantdatats);
	ELSEIF (TG_OP = 'UPDATE') THEN
		PERFORM torp_usp_recalculate_max_powerplantdata(NEW.forplantid, NEW.iscalulatedfrominv, NEW.pwrplantdatats);
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;

-- Mahesh, 12/03/2017 - Fix in checking maxpower and updating

-- DROP FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(integer, timestamp without time zone, numeric, integer, character);

CREATE OR REPLACE FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid integer, v_pwrplantdatats timestamp without time zone, v_maxpower numeric, v_periodtype integer, v_iscalulatedfrominv character)
  RETURNS integer AS
$BODY$
DECLARE
	v_pwrplantdatasummaryid integer;
BEGIN
		IF(v_periodtype = 3) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv;
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantid = v_pwrplantdatasummaryid and v_maxpower > maxpower;
			END IF;
		ELSIF(v_periodtype = 1) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv and date(periodfromdate) = date(date_trunc('month',v_pwrplantdatats)) 
			and date(periodtodate) = date(date_trunc('month', v_pwrplantdatats)+'1month');
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, periodfromdate, periodtodate, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, date(date_trunc('month',v_pwrplantdatats))::timestamp, date(date_trunc('month', v_pwrplantdatats)+'1month')::timestamp,
				v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantdatasummaryid = v_pwrplantdatasummaryid  and v_maxpower > maxpower;
			END IF;
		ELSIF(v_periodtype = 2) THEN
			SELECT pwrplantdatasummaryid INTO  v_pwrplantdatasummaryid from pwr_plantdatasummaries where pwrplantid = v_pwrplantid and periodtype = v_periodtype 
			and iscalculatefrominv = v_iscalulatedfrominv and date(periodfromdate) = date(date_trunc('year',v_pwrplantdatats))
			and date(periodtodate) = date(date_trunc('year',v_pwrplantdatats)+'1year');
			IF(v_pwrplantdatasummaryid is null) THEN
				INSERT INTO pwr_plantdatasummaries(pwrplantid, periodtype, periodfromdate, periodtodate, maxpower, iscalculatefrominv) 
				VALUES (v_pwrplantid, v_periodtype, date(date_trunc('year',v_pwrplantdatats))::timestamp, date(date_trunc('year',v_pwrplantdatats)+'1year')::timestamp,
				v_maxpower, v_iscalulatedfrominv);
			ELSE
				UPDATE pwr_plantdatasummaries set maxpower = v_maxpower where pwrplantdatasummaryid = v_pwrplantdatasummaryid  and v_maxpower > maxpower;
			END IF;
		END IF;
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_insert_or_update_max_power_plantdatasummary(integer, timestamp without time zone, numeric, integer, character) OWNER TO postgres;



-- Do not recalculate maxpower, check current value and change only if required
-- DROP FUNCTION tggrfunc_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_pwrplantdataid integer;
	v_pwrplantdatats timestamp without time zone;
        recordObj record;
	v_plantRecord pwr_plant;
	v_irradiance numeric(18,4);
	v_email text;
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrplantdataid INTO v_pwrplantdataid from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats desc limit 1;
		IF(v_pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set nextts = NEW.pwrplantdatats where pwrplantdataid = v_pwrplantdataid;
		END IF;
		SELECT pwrplantdatats INTO v_pwrplantdatats from pwr_plantdata where pwrplantdatats > NEW.pwrplantdatats and forplantid = NEW.forplantid 
		and iscalulatedfrominv = NEW.iscalulatedfrominv order by pwrplantdatats asc limit 1;
		IF(v_pwrplantdatats is not null) THEN
			UPDATE pwr_plantdata set nextts = v_pwrplantdatats where pwrplantdataid = NEW.pwrplantdataid;
		END IF;
		IF(NEW.plantdatairradiance is not null and NEW.plantdatairradiance > 0 and NEW.iscalulatedfrominv != 'y') THEN
			For recordObj in  SELECT pwrplantid FROM pwr_plant where irradiancefromplantid = NEW.forplantid
			LOOP
				IF(recordObj.pwrplantid is not null and recordObj.pwrplantid > 0) THEN
					SELECT pwrplantdataid into v_pwrplantdataid from pwr_plantdata where forplantid = recordObj.pwrplantid
					and pwrplantdatats = NEW.pwrplantdatats and iscalulatedfrominv = NEW.iscalulatedfrominv;
					IF(v_pwrplantdataid is null) THEN
						INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantdatairradiance, iscalulatedfrominv)
						VALUES (recordObj.pwrplantid,NEW.pwrplantdatats,NEW.plantdatairradiance, NEW.iscalulatedfrominv);
					ELSE
						UPDATE pwr_plantdata SET plantdatairradiance = NEW.plantdatairradiance where pwrplantdataid = v_pwrplantdataid;
					END IF;
				END IF;
			END LOOP;
		END IF;
		SELECT * INTO v_plantRecord from pwr_plant where pwrplantid = NEW.forplantid;
		IF((NEW.iscalulatedfrominv = 'm' or NEW.iscalulatedfrominv = 'y') and NEW.plantpower = 0) THEN
			IF(v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = NEW.forplantid 
				and pwrplantdatats >= NEW.pwrplantdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrplantdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_plantRecord.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Plant Power Zero', 
						E'Dear Sir/Madam,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||' as of' ||now()+v_plantRecord.tzdiffinmins*60::text::interval||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_plant set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval,
						powerdowntime = now()+v_plantRecord.tzdiffinmins*60::text::interval
						where pwrplantid = v_plantRecord.pwrplantid 
						and accountid = v_plantRecord.accountid;
					ELSE 
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_plantRecord.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_plantRecord.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_plantRecord.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Plant Power Zero', 
							E'Dear Sir/Madadm,\n The Plant '|| v_plantRecord.pwrplantname ||' is not generating power since '|| v_plantRecord.powerdowntime ||', but irradiance is '|| v_irradiance ||' as of '|| now()+v_plantRecord.tzdiffinmins*60::text::interval ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_plant set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval
							where pwrplantid = v_plantRecord.pwrplantid and accountid = v_plantRecord.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_plant set powerdownstatus = 0, powerdownstatusalerttime = null, powerdowntime=null where pwrplantid = v_plantRecord.pwrplantid 
			and accountid = v_plantRecord.accountid;
		END IF;
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 3, NEW.iscalulatedfrominv);
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 2, NEW.iscalulatedfrominv);
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 1, NEW.iscalulatedfrominv);

		
	ELSEIF (TG_OP = 'UPDATE') THEN
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 3, NEW.iscalulatedfrominv);
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 2, NEW.iscalulatedfrominv);
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(NEW.forplantid, NEW.pwrplantdatats, NEW.plantpower, 1, NEW.iscalulatedfrominv);
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata() OWNER TO postgres;

--
-- Mahesh, 12/03/2016 ignore zero meter reading

-- Function: tggrfunc_before_insert_pwr_plantdata()

-- DROP FUNCTION tggrfunc_before_insert_pwr_plantdata();

CREATE OR REPLACE FUNCTION tggrfunc_before_insert_pwr_plantdata()
  RETURNS trigger AS
$BODY$
DECLARE
    v_meterreading numeric(18,4);
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF(NEW.iscalulatedfrominv = 'm') THEN
            SELECT meterreading INTO v_meterreading from pwr_plantdata where pwrplantdatats < NEW.pwrplantdatats and date(pwrplantdatats) < date(NEW.pwrplantdatats) and meterreading > 0 and  forplantid = NEW.forplantid 
            and iscalulatedfrominv = 'm' order by pwrplantdatats desc limit 1;
            IF(v_meterreading is not null and (NEW.meterreading - v_meterreading) >= 0) THEN
                NEW.plantcurdayenegry = NEW.meterreading - v_meterreading;
            ELSE
                NEW.plantcurdayenegry = NEW.meterreading;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_before_insert_pwr_plantdata() OWNER TO postgres;

-- mahesh, Remove group by inv.invplantid as it is not needed

-- Function: pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone)

-- DROP FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone);

CREATE OR REPLACE FUNCTION pwrplant_usp_calculate_pwrplantadata(v_plantid integer, v_accountid integer, v_calcsettingmins integer, v_ts timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
    v_currdayenergy numeric(18,4);
    v_invpower numeric(18,4);
BEGIN
    SELECT SUM(invpower) INTO v_invpower from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and pwrinvdatats >= (date_trunc('minute',v_ts) - (('0:'||v_calcsettingmins)::time)) and (invdata.nextts > v_ts or invdata.nextts is null) 
    and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and inv.accountid = v_accountid ;
    SELECT SUM(currdayenergy) INTO v_currdayenergy from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and (invdata.nextts > v_ts or invdata.nextts is null) and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and 
    inv.accountid = v_accountid ;
    IF(v_currdayenergy is not null and v_invpower is not null) THEN
        DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
        INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, plantcurdayenegry, iscalulatedfrominv)  VALUES (v_plantid, v_ts, v_invpower, v_currdayenergy, 'y');
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone) OWNER TO postgres;


-- Mahesh, 14/3/2017 Avoiding date comparison

CREATE OR REPLACE FUNCTION pwrplant_usp_calculate_pwrplantadata(v_plantid integer, v_accountid integer, v_calcsettingmins integer, v_ts timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
    v_currdayenergy numeric(18,4);
    v_invpower numeric(18,4);
BEGIN
    SELECT SUM(invpower) INTO v_invpower from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and pwrinvdatats >= (date_trunc('minute',v_ts) - (('0:'||v_calcsettingmins)::time)) and (invdata.nextts > v_ts or invdata.nextts is null) 
    and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and inv.accountid = v_accountid ;
    SELECT SUM(currdayenergy) INTO v_currdayenergy from pwr_inverterdata invdata join pwr_inverters inv on(inv.pwrinverterid = invdata.forinverterid) 
    where pwrinvdatats <= v_ts and (invdata.nextts > v_ts or invdata.nextts is null) and pwrinvdatats >= date(v_ts) and date(v_ts)=date(pwrinvdatats) and inv.invplantid = v_plantid and 
    inv.accountid = v_accountid ;
    IF(v_currdayenergy is not null and v_invpower is not null) THEN
        DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
        INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, plantcurdayenegry, iscalulatedfrominv)  VALUES (v_plantid, v_ts, v_invpower, v_currdayenergy, 'y');
    END IF;
    RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION pwrplant_usp_calculate_pwrplantadata(integer, integer, integer, timestamp without time zone) OWNER TO postgres;


-- Truncate seconds from plantdata calculated timestamp

-- Function: tggrfunc_pwrplant_inverterdata()

-- DROP FUNCTION tggrfunc_pwrplant_inverterdata();

CREATE OR REPLACE FUNCTION tggrfunc_pwrplant_inverterdata()
  RETURNS trigger AS
$BODY$
DECLARE
	v_accountid integer;
	v_plantid integer;
	v_calcsettingmins integer;
	v_mod integer;
	v_ts timestamp without time zone;
	v_additionalmins integer;
	v_pwrinvdataid integer;
	v_pwrinvdatats timestamp without time zone;
	v_invdata pwr_inverters;	
	v_plantRecord pwr_plant;
	v_email text;
	v_irradiance numeric(18,4);
	v_now timestamp without time zone;
	v_seconds numeric(18,4);
	v_lastinverterdatats timestamp without time zone;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		SELECT pwrinvdataid INTO v_pwrinvdataid from pwr_inverterdata where pwrinvdatats < NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats desc limit 1;
		IF(v_pwrinvdataid is not null) THEN
			UPDATE pwr_inverterdata set nextts = NEW.pwrinvdatats where pwrinvdataid = v_pwrinvdataid;
		END IF;
		SELECT pwrinvdatats INTO v_pwrinvdatats from pwr_inverterdata where pwrinvdatats > NEW.pwrinvdatats and forinverterid = NEW.forinverterid order by pwrinvdatats asc limit 1;
		IF(v_pwrinvdatats is not null) THEN
			UPDATE pwr_inverterdata set nextts = v_pwrinvdatats where pwrinvdataid = NEW.pwrinvdataid;
		END IF;
		SELECT invplantid,accountid INTO v_plantid,v_accountid from pwr_inverters where pwrinverterid = NEW.forinverterid;
		SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
		v_mod = mod((EXTRACT(HOUR FROM NEW.pwrinvdatats)*60+EXTRACT(MINUTE FROM NEW.pwrinvdatats))::integer,v_calcsettingmins);
		IF(v_mod = 0) THEN
			v_ts = date_trunc('minute',NEW.pwrinvdatats);
		ELSE
			v_additionalmins = v_calcsettingmins - v_mod;
			v_ts = date_trunc('minute',NEW.pwrinvdatats) + (('0:'||v_additionalmins)::time);
		END IF;
		DELETE from pwr_plantdata where forplantid = v_plantid and pwrplantdatats = v_ts and iscalulatedfrominv='y';
		PERFORM pwrplant_usp_calculate_pwrplantadata(v_plantid, v_accountid, v_calcsettingmins, v_ts);
		SELECT * INTO v_invdata from pwr_inverters where pwrinverterid = NEW.forinverterid;
		IF(NEW.invpower = 0) THEN
			SELECT plnt.* INTO v_plantRecord from pwr_plant plnt join pwr_inverters inv on(inv.invplantid = plnt.pwrplantid) where inv.pwrinverterid = NEW.forinverterid;
			IF(v_plantRecord.hasinverterdata is not null and v_plantRecord.hasinverterdata ='y' and v_plantRecord.minirradianceforpower > 0) THEN
				SELECT plantdatairradiance INTO v_irradiance from pwr_plantdata where iscalulatedfrominv = 'n' and forplantid = v_plantRecord.pwrplantid 
				and pwrplantdatats >= NEW.pwrinvdatats - INTERVAL '10 minutes' 
				and pwrplantdatats < NEW.pwrinvdatats order by pwrplantdatats desc limit 1;
				SELECT email INTO v_email from smtp_info limit 1; 
				IF(v_irradiance is not null and v_irradiance > v_plantRecord.minirradianceforpower) THEN
					IF(v_invdata.powerdownstatus = 0) THEN
						INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
						(v_email, 'Alert:Inverter Power Zero', 
						E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
						v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
						UPDATE pwr_inverters set powerdownstatus = 1, powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
						where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
					ELSE
						v_now = now()+v_plantRecord.tzdiffinmins*60::text::interval;
						SELECT EXTRACT(EPOCH FROM v_now - v_invdata.powerdownstatusalerttime) INTO v_seconds;
						IF(v_seconds >= v_invdata.powerdownstatus*2*v_plantRecord.meterreadinginterval*60 or 
						date(now()+v_plantRecord.tzdiffinmins*60::text::interval) > date(v_invdata.powerdownstatusalerttime)) THEN
							INSERT INTO emailnotifications(fromid,subject, content, accountid, toids) VALUES 
							(v_email, 'Alert:Inverter Power Zero', 
							E'Dear Sir/Madadm,\n The Inverter '|| v_invdata.invertername ||' of plant '|| v_plantRecord.pwrplantname ||' is not generating power, but irradiance is '|| v_irradiance ||'.',
							v_plantRecord.accountid, string_to_array(v_plantRecord.alertsto,','));
							UPDATE pwr_inverters set powerdownstatus = 2*powerdownstatus, 
							powerdownstatusalerttime = now()+v_plantRecord.tzdiffinmins*60::text::interval 
							where pwrinverterid = v_invdata.pwrinverterid and accountid = v_invdata.accountid;
						END IF;
					END IF;
				END IF;
			END IF;
		ELSE
			UPDATE pwr_inverters set powerdownstatus = 0, powerdownstatusalerttime = null where pwrinverterid = v_invdata.pwrinverterid; 
			
		END IF;
		SELECT lastinverterdatats into v_lastinverterdatats from pwr_inverters where pwrinverterid = NEW.forinverterid;
		IF(v_lastinverterdatats is null or v_lastinverterdatats < NEW.pwrinvdatats) THEN
			UPDATE pwr_inverters SET lastinverterdatats = NEW.pwrinvdatats where pwrinverterid = NEW.forinverterid;
		END IF;
	ELSEIF (TG_OP = 'UPDATE') THEN
		
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwrplant_inverterdata() OWNER TO postgres;

-- Mahesh, 23/03/17 Fix in checking for plantid

-- Function: torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone)

-- DROP FUNCTION torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_max_powerplantdata(v_pwrplantid integer, v_iscalulatedfrominv character, v_pwrplantdatats timestamp without time zone)
  RETURNS integer AS
$BODY$
DECLARE
	v_maxpower numeric(18,4);
BEGIN
		v_maxpower = 0;
		SELECT max(plantpower) INTO v_maxpower FROM pwr_plantdata where forplantid = v_pwrplantid and iscalulatedfrominv = v_iscalulatedfrominv;
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 3, v_iscalulatedfrominv);
		select max(plantpower) INTO v_maxpower FROM pwr_plantdata where forplantid = v_pwrplantid and date(pwrplantdatats) >= date(date_trunc('month',v_pwrplantdatats)) 
		and date(pwrplantdatats) < date(date_trunc('month', v_pwrplantdatats)+'1month') and iscalulatedfrominv = v_iscalulatedfrominv;
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 1, v_iscalulatedfrominv);
		select max(plantpower) INTO v_maxpower FROM pwr_plantdata where forplantid = v_pwrplantid and 	date(pwrplantdatats) >= date(date_trunc('year',v_pwrplantdatats))
		and date(pwrplantdatats) < date(date_trunc('year',v_pwrplantdatats)+'1year') and iscalulatedfrominv = v_iscalulatedfrominv; 
		PERFORM torp_usp_insert_or_update_max_power_plantdatasummary(v_pwrplantid, v_pwrplantdatats, v_maxpower, 2, v_iscalulatedfrominv);
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_max_powerplantdata(integer, character, timestamp without time zone) OWNER TO postgres;

-- Prevent duplicates on pwr_inverterdata

create unique index uniqee_pwr_inv_data  on pwr_inverterdata using btree (pwrinvdatats,forinverterid);

alter table pwr_inverterdata add  unique using index uniqee_pwr_inv_data;

-- Replace with rule to ignore duplicate insert (also for pwr_plantdata)



-- Recalculate summaries

select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2017-03-01') from pwr_plant;
select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2017-02-01') from pwr_plant;
select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2017-01-01') from pwr_plant;
select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2016-12-01') from pwr_plant;
select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2016-11-01') from pwr_plant;
select torp_usp_recalculate_max_powerplantdata(pwrplantid,'y','2016-10-01') from pwr_plant;

--added on 24-03-2017

-- Column: isdeleted

-- ALTER TABLE pwr_inverters DROP COLUMN isdeleted;

ALTER TABLE pwr_inverters ADD COLUMN isdeleted integer;
ALTER TABLE pwr_inverters ALTER COLUMN isdeleted SET DEFAULT 0;

--added on 04-04-2017

-- Column: isdeleted

-- ALTER TABLE pwr_plant DROP COLUMN isdeleted;

ALTER TABLE pwr_plant ADD COLUMN isdeleted integer;
ALTER TABLE pwr_plant ALTER COLUMN isdeleted SET DEFAULT 0;

-- Column: invplantpower

-- ALTER TABLE pwr_plantdata DROP COLUMN invplantpower;

ALTER TABLE pwr_plantdata ADD COLUMN invplantpower numeric(18,4);

-- Column: invplantcurdayenergy

-- ALTER TABLE pwr_plantdata DROP COLUMN invplantcurdayenergy;

ALTER TABLE pwr_plantdata ADD COLUMN invplantcurdayenergy numeric(18,4);

-- Function: torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(v_pwr_plantdata pwr_plantdata)
  RETURNS integer AS
$BODY$
DECLARE
	v_m_rec_pwr_plantdata record;
	v_y_rec_pwr_plantdata record;
	v_n_rec_pwr_plantdata record;
	v_c_rec_pwr_plantdata record;
BEGIN
		SELECT * INTO v_m_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'm' and pwrplantdatats > v_pwr_plantdata.pwrplantdatats - '10 minutes'::interval and 
		pwrplantdatats < v_pwr_plantdata.pwrplantdatats and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_n_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'n' and pwrplantdatats > v_pwr_plantdata.pwrplantdatats - '10 minutes'::interval and 
		pwrplantdatats < v_pwr_plantdata.pwrplantdatats and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_y_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'y' and pwrplantdatats > v_pwr_plantdata.pwrplantdatats - '10 minutes'::interval and 
		pwrplantdatats < v_pwr_plantdata.pwrplantdatats and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_c_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'c' and pwrplantdatats = v_y_rec_pwr_plantdata.pwrplantdatats 
		and forplantid = v_pwr_plantdata.forplantid and iscalulatedfrominv = 'c' order by pwrplantdatats desc limit 1;
		
		IF(v_c_rec_pwr_plantdata.pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set plantpower = v_m_rec_pwr_plantdata.plantpower, meterreading = v_m_rec_pwr_plantdata.meterreading, 
			plantdatairradiance = v_n_rec_pwr_plantdata.plantdatairradiance, plantmoduletemp = v_n_rec_pwr_plantdata.plantmoduletemp,
			plantambtemp = v_n_rec_pwr_plantdata.plantambtemp, plantcurdayenegry = v_n_rec_pwr_plantdata.plantcurdayenegry, 
			invplantpower = v_y_rec_pwr_plantdata.plantpower, invplantcurdayenergy = v_y_rec_pwr_plantdata.plantcurdayenegry 
			where pwrplantdataid = v_c_rec_pwr_plantdata.pwrplantdataid ;
		ELSE
			INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, meterreading,  plantdatairradiance, plantmoduletemp, plantambtemp, 
			plantcurdayenegry, iscalulatedfrominv, invplantpower, invplantcurdayenergy)  VALUES (v_pwr_plantdata.forplantid, v_y_rec_pwr_plantdata.pwrplantdatats,
			v_m_rec_pwr_plantdata.plantpower, v_m_rec_pwr_plantdata.meterreading, v_n_rec_pwr_plantdata.plantdatairradiance, v_n_rec_pwr_plantdata.plantmoduletemp,
			v_n_rec_pwr_plantdata.plantambtemp, v_n_rec_pwr_plantdata.plantcurdayenegry, 'c', 			
			v_y_rec_pwr_plantdata.plantpower, v_y_rec_pwr_plantdata.plantcurdayenegry);
		END IF;
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata) OWNER TO postgres;


-- Function: tggrfunc_pwr_plantdata_calculated_record()

-- DROP FUNCTION tggrfunc_pwr_plantdata_calculated_record();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata_calculated_record()
  RETURNS trigger AS
$BODY$
BEGIN
	IF (TG_OP = 'INSERT' or TG_OP = 'UPDATE') THEN
		PERFORM torp_usp_recalculate_pwr_plantdata_calculated_record(NEW);
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata_calculated_record() OWNER TO postgres;

-- Trigger: tggr_pwr_plantdata_calculated_record on pwr_plantdata

-- DROP TRIGGER tggr_pwr_plantdata_calculated_record ON pwr_plantdata;

CREATE TRIGGER tggr_pwr_plantdata_calculated_record
  AFTER INSERT OR UPDATE OR DELETE
  ON pwr_plantdata
  FOR EACH ROW
  EXECUTE PROCEDURE tggrfunc_pwr_plantdata_calculated_record();

  
--added on 07-04-2017

-- Function: tggrfunc_pwr_plantdata_calculated_record()

-- DROP FUNCTION tggrfunc_pwr_plantdata_calculated_record();

CREATE OR REPLACE FUNCTION tggrfunc_pwr_plantdata_calculated_record()
  RETURNS trigger AS
$BODY$
BEGIN
	IF (TG_OP = 'INSERT' or TG_OP = 'UPDATE') THEN
		IF(NEW.iscalulatedfrominv != 'c') THEN
			PERFORM torp_usp_recalculate_pwr_plantdata_calculated_record(NEW);
		END IF;
	ELSEIF (TG_OP = 'DELETE') THEN
		
	END IF;
RETURN NULL;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION tggrfunc_pwr_plantdata_calculated_record() OWNER TO postgres;


-- Function: torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata)

-- DROP FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata);

CREATE OR REPLACE FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(v_pwr_plantdata pwr_plantdata)
  RETURNS integer AS
$BODY$
DECLARE
	v_m_rec_pwr_plantdata record;
	v_y_rec_pwr_plantdata record;
	v_n_rec_pwr_plantdata record;
	v_c_rec_pwr_plantdata record;
	v_plantpower numeric(18,4);
	v_meterreading numeric(18,4);
	v_plantdatairradiance numeric(18,4);
	v_plantmoduletemp numeric(18,4);
	v_plantambtemp numeric(18,4);
	v_plantcurdayenegry numeric(18,4);
	v_invplantpower numeric(18,4);
	v_invplantcurdayenergy numeric(18,4);
	v_ts timestamp without time zone;
	v_additionalmins integer;
	v_calcsettingmins integer;
	v_mod integer;
	v_accountid integer;

BEGIN
		v_plantpower = 0;
		v_meterreading = 0;
		v_plantdatairradiance = 0;
		v_plantmoduletemp = 0;
		v_plantambtemp = 0;
		v_plantcurdayenegry = 0;
		v_invplantpower = 0;
		v_invplantcurdayenergy = 0;

		SELECT accountid INTO v_accountid from pwr_plant where pwrplantid = v_pwr_plantdata.forplantid;
		SELECT calcsettingmins INTO v_calcsettingmins from pwr_calcsetting where accountid = v_accountid;
		v_mod = mod((EXTRACT(HOUR FROM v_pwr_plantdata.pwrplantdatats)*60+EXTRACT(MINUTE FROM v_pwr_plantdata.pwrplantdatats))::integer,v_calcsettingmins);
		IF(v_mod = 0) THEN
			v_ts = date_trunc('minute',v_pwr_plantdata.pwrplantdatats);
		ELSE
			v_additionalmins = v_calcsettingmins - v_mod;
			v_ts = date_trunc('minute',v_pwr_plantdata.pwrplantdatats) + (('0:'||v_additionalmins)::time);
		END IF;
		SELECT * INTO v_m_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'm' and pwrplantdatats > v_ts - '10 minutes'::interval and 
		pwrplantdatats <= v_ts and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_n_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'n' and pwrplantdatats > v_ts - '10 minutes'::interval and 
		pwrplantdatats <= v_ts and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_y_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'y' and pwrplantdatats > v_ts - '10 minutes'::interval and 
		pwrplantdatats <= v_ts and forplantid = v_pwr_plantdata.forplantid order by pwrplantdatats desc limit 1;
		SELECT * INTO v_c_rec_pwr_plantdata from pwr_plantdata where iscalulatedfrominv  = 'c' and pwrplantdatats = v_ts 
		and forplantid = v_pwr_plantdata.forplantid and iscalulatedfrominv = 'c' order by pwrplantdatats desc limit 1;
		IF(v_m_rec_pwr_plantdata.plantpower is not null) THEN
			v_plantpower = v_m_rec_pwr_plantdata.plantpower;
		END IF;
		IF(v_m_rec_pwr_plantdata.meterreading is not null) THEN
			v_meterreading = v_m_rec_pwr_plantdata.meterreading;
		END IF;
		IF(v_n_rec_pwr_plantdata.plantdatairradiance is not null) THEN
			v_plantdatairradiance = v_n_rec_pwr_plantdata.plantdatairradiance;
		END IF;
		IF(v_n_rec_pwr_plantdata.plantmoduletemp is not null) THEN
			v_plantmoduletemp = v_n_rec_pwr_plantdata.plantmoduletemp;
		END IF;
		IF(v_n_rec_pwr_plantdata.plantambtemp is not null) THEN
			v_plantambtemp = v_n_rec_pwr_plantdata.plantambtemp;
		END IF;
		IF(v_n_rec_pwr_plantdata.plantcurdayenegry is not null) THEN
			v_plantcurdayenegry = v_n_rec_pwr_plantdata.plantcurdayenegry;
		END IF;
		IF(v_y_rec_pwr_plantdata.plantpower is not null) THEN
			v_invplantpower = v_y_rec_pwr_plantdata.plantpower;
		END IF;
		IF(v_y_rec_pwr_plantdata.plantpower is not null) THEN
			v_invplantcurdayenergy = v_y_rec_pwr_plantdata.plantcurdayenegry;
		END IF;
		IF(v_c_rec_pwr_plantdata.pwrplantdataid is not null) THEN
			UPDATE pwr_plantdata set plantpower = v_plantpower, meterreading = v_meterreading, 
			plantdatairradiance = v_plantdatairradiance, plantmoduletemp = v_plantmoduletemp,
			plantambtemp = v_plantambtemp, plantcurdayenegry = v_plantcurdayenegry, 
			invplantpower = v_invplantpower, invplantcurdayenergy = v_invplantcurdayenergy 
			where pwrplantdataid = v_c_rec_pwr_plantdata.pwrplantdataid;
		ELSE
			INSERT INTO pwr_plantdata(forplantid, pwrplantdatats, plantpower, meterreading,  plantdatairradiance, plantmoduletemp, plantambtemp, 
			plantcurdayenegry, iscalulatedfrominv, invplantpower, invplantcurdayenergy)  VALUES (v_pwr_plantdata.forplantid, v_ts,
			v_plantpower, v_meterreading, v_plantdatairradiance, v_plantmoduletemp,	v_plantambtemp, v_plantcurdayenegry, 'c', 			
			v_invplantpower, v_invplantcurdayenergy);
		END IF;
		RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION torp_usp_recalculate_pwr_plantdata_calculated_record(pwr_plantdata) OWNER TO postgres;

