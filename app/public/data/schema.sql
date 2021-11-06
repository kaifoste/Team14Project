CREATE DATABASE IF NOT EXISTS finaldb;
USE finaldb;

DROP TABLE IF EXISTS referees;
CREATE TABLE referees (
	refereeId int PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    fName varchar(20) NOT NULL,
    lName varchar(20) NOT NULL,
    age   int         NOT NULL,
    grade int         NOT NULL,
    rating int        NOT NULL
);

INSERT INTO referees (refereeId, fName, lName, age, grade, rating) VALUES 
(10001, 'John', 'Smith', 23, 7, 72),
(10002, 'Craig', 'Lawson', 27, 8, 67),
(10003, 'Clint', 'Lawson', 34, 4, 90),
(10004, 'Avery', 'Good', 19, 9, 60),
(10005, 'Rachel', 'Greene', 28, 6, 78)
;

DROP TABLE IF EXISTS matches;
CREATE TABLE matches (
	matchId int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	matchDate date NOT NULL ,
    matchTime time NOT NULL ,
    field int NOT NULL ,
	  grade int NOT NULL
);

INSERT INTO matches(matchId, matchDate, matchTime, field, grade) VALUES
  (0001, '2021-08-01', '12:30:00', 1, 8),
  (0002, '2021-08-03', '11:30:00', 2, 8),
  (0003, '2021-08-04', '19:30:00', 3, 7),
  (0004, '2021-08-05', '07:30:00', 4, 4),
  (0005, '2021-08-06', '09:30:00', 5, 5)
;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	userId int PRIMARY KEY AUTO_INCREMENT,
	fName varchar(20) NOT NULL,
    lName varchar(20) NOT NULL,
    assignorRole boolean NOT NULL
);

INSERT INTO users(userId, fName, lName, assignorRole) VALUES
  (60001, 'Mary', 'Love', 1),
  (60002, 'Avery', 'Good', 0),
  (60003, 'Craig', 'Lawson', 0),
  (60004, 'Claire', 'Lawson', 1),
  (60005, 'Rachel', 'Greene', 0)
;

DROP TABLE IF EXISTS assignments;
CREATE TABLE assignments (
	assignmentId int PRIMARY KEY AUTO_INCREMENT,
  refereeId int NOT NULL REFERENCES referees(refereeId)
    ON DELETE CASCADE ON UPDATE CASCADE,
	matchId int NOT NULL REFERENCES matches(matchId)
    ON DELETE CASCADE ON UPDATE CASCADE,
  position varchar(20) NOT NULL,
  status varchar(20) NOT NULL
);

INSERT INTO assignments(assignmentId, refereeId, matchID, position,status) VALUES
  (20001,10001,0001, 'Head Referee', 'Unassigned'),
  (20002,10002,0001, 'Assistant Referee 1', 'Tentative'),
  (20003,10002,0002, 'Assistant Referee 2', 'Assigned'),
  (20004,10003,0001,'Head Referee', 'Unassigned'),
  (20005,10003,0004,'Fourth Official', 'Accepted')
;