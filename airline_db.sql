DROP TABLE IF EXISTS airport CASCADE;

DROP TABLE IF EXISTS flights CASCADE;

DROP TABLE IF EXISTS flight_leg CASCADE; 

DROP TABLE IF EXISTS flight_info CASCADE;

DROP TABLE IF EXISTS bookings CASCADE;

DROP TABLE IF EXISTS passenger_info CASCADE;

DROP TABLE IF EXISTS payment CASCADE;

DROP TABLE IF EXISTS boarding CASCADE;

DROP TABLE IF EXISTS ticket CASCADE;

DROP TABLE IF EXISTS baggage CASCADE;


/* create tables */
CREATE TABLE airport (
    airport_code char(3) NOT NULL,
    airport_name char(40),
    city char(20),
    state char(20),
    PRIMARY KEY (airport_code)
);


CREATE TABLE flights (
    flight_id integer NOT NULL,
    departure_airport character(3) NOT NULL,
    arrival_airport character(3) NOT NULL,
    type character varying(20) NOT NULL,
    seats_available integer NOT NULL,
    /* seats_booked integer NOT NULL,*/
    PRIMARY KEY (flight_id),
    CONSTRAINT flights_arrival_airport_fkey FOREIGN KEY (arrival_airport) REFERENCES airport(airport_code),
    CONSTRAINT flights_departure_airport_fkey FOREIGN KEY (departure_airport) REFERENCES airport(airport_code),

    CONSTRAINT flights_type_check CHECK (
        (
            (type)::text = ANY (
                ARRAY [('Direct'::character varying)::text, ('Indirect'::character varying)::text]
            )
        )
    )
);


CREATE TABLE flight_leg (
	leg_no integer NOT NULL,
    flight_id integer NOT NULL,
    departure_airport character(3) NOT NULL,
    scheduled_departure timestamp WITH time zone NOT NULL,
    arrival_airport character(3) NOT NULL,
    scheduled_arrival timestamp WITH time zone NOT NULL,
    actual_departure timestamp WITH time zone,
    actual_arrival timestamp WITH time zone,
    
    PRIMARY KEY (leg_no),
    CONSTRAINT leg_arrival_airport_fkey FOREIGN KEY (arrival_airport) REFERENCES airport(airport_code),
    CONSTRAINT leg_departure_airport_fkey FOREIGN KEY (departure_airport) REFERENCES airport(airport_code),
    CONSTRAINT leg_flight_id FOREIGN KEY (flight_id) REFERENCES flights(flight_id),
    CONSTRAINT flights_check CHECK ((scheduled_arrival > scheduled_departure))
);


CREATE TABLE flight_info (
	flight_id integer NOT NULL,
	movie boolean,
	meal boolean,
	internet boolean,

	PRIMARY KEY (flight_id),
	FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);


CREATE TABLE bookings (
    book_ref BIGSERIAL NOT NULL,
    book_date timestamp WITH time zone NOT NULL,
    waitlist boolean NOT NULL,
    total_amount numeric(10, 2) NOT NULL,
    PRIMARY KEY(book_ref)
);


CREATE TABLE passenger_info (
	passenger_id varchar(20) NOT NULL,
	book_ref BIGSERIAL,
	passenger_name text,
	phone char(15),
	email char(50),
	passenger_created timestamp WITH time zone NOT NULL,

	PRIMARY KEY (passenger_id),
	CONSTRAINT passenger_bookings FOREIGN KEY (book_ref) REFERENCES bookings(book_ref)
);



CREATE TABLE payment (
	passenger_id varchar(20) NOT NULL,
	card_number integer,
	taxes numeric(5, 2),
	discounts numeric(5, 2),

	PRIMARY KEY (passenger_id),
	FOREIGN KEY (passenger_id) REFERENCES passenger_info(passenger_id)
);


CREATE TABLE ticket (
	ticket_no BIGSERIAL NOT NULL,
	flight_id integer NOT NULL,
	book_ref BIGSERIAL NOT NULL,
	ticket_booked timestamp WITH time zone NOT NULL,


	PRIMARY KEY (ticket_no, flight_id),
	CONSTRAINT ticket_bookings FOREIGN KEY (book_ref) REFERENCES bookings(book_ref),
	CONSTRAINT ticket_flights FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);


CREATE TABLE boarding (
	ticket_no BIGSERIAL NOT NULL,
	flight_id integer NOT NULL,
	boarding_no integer,
	boarding_time timestamp WITH time zone,
	gate character varying(10),
	checked_bags integer,

	PRIMARY KEY (ticket_no, flight_id),
	CONSTRAINT boarding_ticket FOREIGN KEY (ticket_no, flight_id) REFERENCES ticket(ticket_no, flight_id)
);


CREATE TABLE baggage (
	ticket_no BIGSERIAL NOT NULL,
	flight_id integer NOT NULL,
	claim_gate character varying(10),
	claim_no char(10),

	PRIMARY KEY (ticket_no, flight_id),
	CONSTRAINT baggage_ticket FOREIGN KEY (ticket_no, flight_id) REFERENCES ticket(ticket_no, flight_id)
);



/* INSERT VALUES */

/* airport table */
INSERT INTO airport
VALUES (
        'HOU',
        'George Bush Airport',
        'Houston',
        'TX'
    );

INSERT INTO airport
VALUES (
        'JFK',
        'John F Kennedy Airport',
        'New York',
        'NY'
    );

INSERT INTO airport
VALUES (
        'LAX',
        'Los Angeles Airport',
        'Los Angeles',
        'CA'
    );

INSERT INTO airport
VALUES ('ORD', 'O Hare Airport', 'Chicago', 'IL');

INSERT INTO airport
VALUES ('MIA', 'Miami Airport', 'Miami', 'FL');

INSERT INTO airport
VALUES ('PHL', 'Philadelphia Airport', 'Philadelphia', 'PA');


/*flights table*/
INSERT INTO flights
VALUES (
        1001,
        'HOU',
        'JFK',
        'Direct',
        50
    );

INSERT INTO flights
VALUES (
        1002,
        'LAX',
        'JFK',
        'Indirect',
        50
    );

INSERT INTO flights
VALUES (
        1003,
        'ORD',
        'MIA',
        'Direct',
        50
    );

INSERT INTO flights
VALUES (
        1004,
        'JFK',
        'ORD',
        'Direct',
        50
    );

INSERT INTO flights
VALUES (
        1005,
        'MIA',
        'LAX',
        'Indirect',
        50
    );

INSERT INTO flights
VALUES (
        1006,
        'JFK',
        'HOU',
        'Direct',
        70
    );

INSERT INTO flights
VALUES (
        1007,
        'JFK',
        'LAX',
        'Indirect',
        100
    );

INSERT INTO flights
VALUES (
        1008,
        'MIA',
        'ORD',
        'Direct',
        50
    );

/*INSERT INTO flights
VALUES (
        1009,
        'ORD',
        'JFK',
        'Direct',
        50,
        0
    );*/

/*INSERT INTO flights
VALUES (
        1010,
        'LAX',
        'MIA',
        'Indirect',
        50,
        0
    );*/

INSERT INTO flights
VALUES (
        1009,
        'LAX',
        'PHL',
        'Indirect',
        70
    );

INSERT INTO flights
VALUES (
        1010,
        'HOU',
        'LAX',
        'Direct',
        100
    );


/*flight_leg table*/
INSERT INTO flight_leg
VALUES (
		3991,
        1001,
        'HOU',
        '2020-12-10 09:50:00+03',
        'JFK',
        '2020-12-10 14:55:00+03',
        NULL,
        NULL
    );

INSERT INTO flight_leg
VALUES (
		3800,
		1002,
		'LAX',
		'2020-12-11 09:50:00+03',
		'HOU',
		'2020-12-11 11:50:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3825,
		1002,
		'HOU',
		'2020-12-11 13:50:00+03',
		'JFK',
		'2020-12-11 17:20:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3744,
		1003,
		'ORD',
		'2020-12-11 09:50:00+03',
		'MIA',
		'2020-12-11 14:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3555,
		1004,
		'JFK',
		'2020-12-12 09:50:00+03',
		'ORD',
		'2020-12-12 12:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3478,
		1005,
		'MIA',
		'2020-12-12 10:50:00+03',
		'HOU',
		'2020-12-12 12:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3469,
		1005,
		'HOU',
		'2020-12-12 15:30:00+03',
		'LAX',
		'2020-12-12 19:00:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3150,
		1006,
		'JFK',
		'2020-12-13 09:50:00+03',
		'HOU',
		'2020-12-13 12:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3226,
		1007,
		'JFK',
		'2020-12-14 09:50:00+03',
		'HOU',
		'2020-12-14 12:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3456,
		1007,
		'HOU',
		'2020-12-14 15:50:00+03',
		'LAX',
		'2020-12-14 19:55:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3915,
		1008,
		'MIA',
		'2020-12-14 13:50:00+03',
		'ORD',
		'2020-12-14 19:00:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		4555,
		1009,
		'LAX',
		'2020-12-15 07:50:00+03',
		'HOU',
		'2020-12-15 10:30:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		4632,
		1009,
		'HOU',
		'2020-12-15 12:30:00+03',
		'MIA',
		'2020-12-15 14:30:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		4773,
		1009,
		'MIA',
		'2020-12-15 17:00:00+03',
		'PHL',
		'2020-12-15 21:10:00+03',
		NULL,
		NULL
	);

INSERT INTO flight_leg
VALUES (
		3030,
		1010,
		'HOU',
		'2020-12-16 16:00:00+03',
		'LAX',
		'2020-12-16 18:50:00+03',
		NULL,
		NULL
	);


/* flight_info table */
INSERT INTO flight_info
VALUES (
		1001,
		'no',
		'yes',
		'yes'
);

INSERT INTO flight_info
VALUES (
		1002,
		'yes',
		'yes',
		'yes'
);

INSERT INTO flight_info
VALUES (
		1003,
		'no',
		'no',
		'no'
);

INSERT INTO flight_info
VALUES (
		1005,
		'yes',
		'yes',
		'yes'
);

INSERT INTO flight_info
VALUES (
		1006,
		'no',
		'yes',
		'no'
);

INSERT INTO flight_info
VALUES (
		1007,
		'yes',
		'no',
		'yes'
);

INSERT INTO flight_info
VALUES (
		1008,
		'yes',
		'yes',
		'no'
);

INSERT INTO flight_info
VALUES (
		1009,
		'no',
		'yes',
		'yes'
);

