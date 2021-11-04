CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
	refereeId int PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    fName varchar(20) NOT NULL,
    lName varchar(20) NOT NULL,
    age   int         NOT NULL,
    grade int         NOT NULL,
    rating int        NOT NULL
);

INSERT INTO referee (refereeId, fName, lName, age, grade, rating) VALUES 
(10001, 'John', 'Smith', 23, 7, 72),
(10002, 'Craig', 'Lawson', 27, 8, 67),
(10003, 'Clint', 'Lawson', 34, 4, 90),
(10004, 'Avery', 'Good', 19, 9, 60),
(10005, 'Rachel', 'Greene', 28, 6, 78),
;

DROP TABLE IF EXISTS match;
CREATE TABLE match (
	id int PRIMARY KEY AUTO_INCREMENT,
    matchId int NOT NULL REFERENCES match(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	matchDate date NOT NULL,
    matchTime time NOT NULL,
    field varchar(20) NOT NULL,
	level varchar(20) NOT NULL
);

INSERT INTO match(id, matchId, matchDate, matchTime, field, level) VALUES
  (1, 0001, '2021-08-01', '12:30', 1, 'Recreational'),
  (2, 0002, '2021-08-03', '11:30', 2, 'Youth Competitive'),
  (3, 0003, '2021-08-04', '19:30', 3, 'Recreational'),
  (4, 0004, '2021-08-05', '7:30', 4, 'Adult Competitive'),
  (5, 0005, '2021-08-06', '9:30', 5, 'Recreational')
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
	userId int PRIMARY KEY AUTO_INCREMENT,
	fName varchar(20) NOT NULL,
    lName varchar(20) NOT NULL,
    assignorRole boolean NOT NULL
);

INSERT INTO user(userId, fName, lName, assignorRole) VALUES
  (60001, 'Mary', 'Love', 1),
  (60002, 'Avery', 'Good', 0),
  (60003, 'Craig', 'Lawson', 0),
  (60004, 'Claire', 'Lawson', 1),
  (60005, 'Rachel', 'Greene', 0)
);

DROP TABLE IF EXISTS assignment;
CREATE TABLE assignment (
	assignmentId int PRIMARY KEY AUTO_INCREMENT,
    refereeId int NOT NULL,
	matchId int NOT NULL,
    position varchar(20) NOT NULL,
    status varchar(20) NOT NULL,

    FOREIGN KEY (refereeId) REFERENCES referee(refereeId),
    FOREIGN KEY (matchId) REFERENCES match(matchId)
);

INSERT INTO assignment(assignmentId, refereeId, matchID, position,status) VALUES
  (20001,10001,0001, 'Head Referee', 'Unassigned'),
  (20002,10002,0001, 'Assistant Referee', 'Tentative'),
  (20003,10002,0002, 'Assistant Referee', 'Assigned'),
  (20004,10003,0001,'Head Referee', 'Unassigned'),
  (20005,10003,0004,'Fourth Official', 'Accepted')
); 
