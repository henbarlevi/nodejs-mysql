"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql"); //MYSQL
//connection to db
let db;
class MySqldb {
    createConnection() {
        //create connection https://stackoverflow.com/questions/14412876/what-does-connection-connect-do-in-node-mysql
        db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'mysqldb'
        });
    }
    createdb(dbname) {
        return new Promise((resolve, reject) => {
            let sql = 'CREATE DATABASE ' + dbname;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
        });
    }
    query(sql, row) {
        return new Promise((resolve, reject) => {
            row ?
                db.query(sql, row, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                })
                :
                    db.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
        });
    }
    connect() {
        db.connect((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('my sql connected');
            }
        });
    }
}
exports.MySqldb = MySqldb;
// 001
// 1. Login to MySQL
// 002
// 003
//     a. mysql5 -u mysqladmin -p
// 004
// 005
// 2. quit -  a. Quit MySQL
// 006
// 3. show databases; -   a. Display all databases
// 4. CREATE DATABASE test2; -  a. Create a database
// 5. USE test2;
//     a. Make test2 the active database
// 6. SELECT DATABASE();
//     a. Show the currently selected database
// 7. DROP DATABASE IF EXISTS test2;
//     a. Delete the named database
//     b. Slide about building tables (2)
//===================================
// 8. CREATE TABLE student(
// first_name VARCHAR(30) NOT NULL,
// last_name VARCHAR(30) NOT NULL,
// email VARCHAR(60) NULL,
// street VARCHAR(50) NOT NULL,
// city VARCHAR(40) NOT NULL,
// state CHAR(2) NOT NULL DEFAULT "PA",
// zip MEDIUMINT UNSIGNED NOT NULL,
// phone VARCHAR(20) NOT NULL,
// birth_date DATE NOT NULL,
// sex ENUM('M', 'F') NOT NULL,
// date_entered TIMESTAMP,
// lunch_cost FLOAT NULL,
// student_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
// );
//===================================== 
// a. VARCHAR(30) : Characters with an expected max length of 30
// 048
// 049
// b. NOT NULL : Must contain a value
// 050
// 051
// c. NULL : Doesn't require a value
// 052
// 053
// d. CHAR(2) : Contains exactly 2 characters
// 054
// 055
// e. DEFAULT "PA" : Receives a default value of PA
// 056
// 057
// f. MEDIUMINT : Value no greater then 8,388,608
// 058
// 059
// g. UNSIGNED : Can't contain a negative value
// 060
// 061
// h. DATE : Stores a date in the format YYYY-MM-DD
// 062
// 063
// i. ENUM('M', 'F') : Can contain either a M or F
// 064
// 065
// j. TIMESTAMP : Stores date and time in this format YYYY-MM-DD-HH-MM-SS
// 066
// 067
// k. FLOAT: A number with decimal spaces, with a value no bigger than 1.1E38 or smaller than -1.1E38
// 068
// 069
// l. INT : Contains a number without decimals
// 070
// 071
// m. AUTO_INCREMENT : Generates a number automatically that is one greater then the previous row
// 072
// 073
// n. PRIMARY KEY (SLIDE): Unique ID that is assigned to this row of data
// 074
// 075
//     I. Uniquely identifies a row or record
// 076
// 077
//     II. Each Primary Key must be unique to the row
// 078
// 079
//     III. Must be given a value when the row is created and that value canâ��t be NULL
// 080
// 081
//     IV. The original value canâ��t be changed It should be short
// 082
// 083
//     V. Itâ��s probably best to auto increment the value of the key
// 084
// 085
// o. Atomic Data & Table Templating
// 086
// 087
// As your database increases in size, you are going to want everything to be organized, so that it can perform your queries quickly. If your tables are set up properly, your database will be able to crank through hundreds of thousands of bits of data in seconds.
// 088
// 089
// How do you know how to best set up your tables though? Just follow some simple rules:
// 090
// 091
// Every table should focus on describing just one thing. Ex. Customer Table would have name, age, location, contact information. It shouldnâ��t contain lists of anything such as interests, job history, past address, products purchased, etc.
// 092
// After you decide what one thing your table will describe, then decide what things you need to describe that thing. Refer to the customer example given in the last step.
// 093
// 094
// Write out all the ways to describe the thing and if any of those things requires multiple inputs, pull them out and create a new table for them. For example, a list of past employers.
// 095
// 096
// Once your table values have been broken down, we refer to these values as being atomic. Be careful not to break them down to a point in which the data is harder to work with. It might make sense to create a different variable for the house number, street name, apartment number, etc.; but by doing so you may make your self more work? That decision is up to you?
// 097
// 098
// p. Some additional rules to help you make your data atomic: Donâ��t have multiple columns with the same sort of information. Ex. If you wanted to include a employment history you should create job1, job2, job3 columns. Make a new table with that data instead.
// 099
// 100
// Donâ��t include multiple values in one cell. Ex. You shouldnâ��t create a cell named jobs and then give it the value: McDonalds, Radio Shack, Walmart,â�¦ Normalized Tables
// 101
// 102
// q. What does normalized mean?
// 103
// 104
// Normalized just means that the database is organized in a way that is considered standardized by professional SQL programmers. So if someone new needs to work with the tables theyâ��ll be able to understand how to easily.
// 105
// 106
// Another benefit to normalizing your tables is that your queries will run much quicker and the chance your database will be corrupted will go down.
// 107
// 108
// r. What are the rules for creating normalized tables:
// 109
// 110
// The tables and variables defined in them must be atomic Each row must have a Primary Key defined. Like your social security number identifies you, the Primary Key will identify your row.
// 111
// 112
// You also want to eliminate using the same values repeatedly in your columns. Ex. You wouldnâ��t want a column named instructors, in which you hand typed in their names each time. You instead, should create an instructor table and link to itâ��s key.
// 113
// 114
// Every variable in a table should directly relate to the primary key. Ex. You should create tables for all of your customers potential states, cities and zip codes, instead of including them in the main customer table. Then you would link them using foreign keys. Note: Many people think this last rule is overkill and can be ignored!
// 115
// 116
// No two columns should have a relationship in which when one changes another must also change in the same table. This is called a Dependency. Note: This is another rule that is sometimes ignored.
// 117
// 118
// ------------ Numeric Types ------------
// 119
// 120
// TINYINT: A number with a value no bigger than 127 or smaller than -128
// 121
// SMALLINT: A number with a value no bigger than 32,768 or smaller than -32,767
// 122
// MEDIUM INT: A number with a value no bigger than 8,388,608 or smaller than -8,388,608
// 123
// INT: A number with a value no bigger than 2^31 or smaller than 2^31 â�� 1
// 124
// BIGINT: A number with a value no bigger than 2^63 or smaller than 2^63 â�� 1
// 125
// FLOAT: A number with decimal spaces, with a value no bigger than 1.1E38 or smaller than -1.1E38
// 126
// DOUBLE: A number with decimal spaces, with a value no bigger than 1.7E308 or smaller than -1.7E308
// 127
// 128
// ------------ String Types ------------
// 129
// 130
// CHAR: A character string with a fixed length
// 131
// VARCHAR: A character string with a length thatâ��s variable
// 132
// BLOB: Can contain 2^16 bytes of data
// 133
// ENUM: A character string that has a limited number of total values, which you must define.
// 134
// SET: A list of legal possible character strings. Unlike ENUM, a SET can contain multiple values in comparison to the one legal value with ENUM.
// 135
// 136
// ------------ Date & Time Types ------------
// 137
// 138
// DATE: A date value with the format of (YYYY-MM-DD)
// 139
// TIME: A time value with the format of (HH:MM:SS)
// 140
// DATETIME: A time value with the format of (YYYY-MM-DD HH:MM:SS)
// 141
// TIMESTAMP: A time value with the format of (YYYYMMDDHHMMSS)
// 142
// YEAR: A year value with the format of (YYYY)
// 143
// 144
// 9. DESCRIBE student;
// 145
// 146
//     a. Show the table set up
// 147
// 148
// 10. INSERT INTO student VALUES('Dale', 'Cooper', 'dcooper@aol.com',
// 149
//     '123 Main St', 'Yakima', 'WA', 98901, '792-223-8901', "1959-2-22",
// 150
//     'M', NOW(), 3.50, NULL);
// 151
// 152
//     a. Inserting Data into a Table
// 153
// 154
//     b. INSERT INTO student VALUES('Harry', 'Truman', 'htruman@aol.com',
// 155
//     '202 South St', 'Vancouver', 'WA', 98660, '792-223-9810', "1946-1-24",
// 156
//     'M', NOW(), 3.50, NULL);
// 157
// 158
//     INSERT INTO student VALUES('Shelly', 'Johnson', 'sjohnson@aol.com',
// 159
//     '9 Pond Rd', 'Sparks', 'NV', 89431, '792-223-6734', "1970-12-12",
// 160
//     'F', NOW(), 3.50, NULL);
// 161
// 162
//     INSERT INTO student VALUES('Bobby', 'Briggs', 'bbriggs@aol.com',
// 163
//     '14 12th St', 'San Diego', 'CA', 92101, '792-223-6178', "1967-5-24",
// 164
//     'M', NOW(), 3.50, NULL);
// 165
// 166
//     INSERT INTO student VALUES('Donna', 'Hayward', 'dhayward@aol.com',
// 167
//     '120 16th St', 'Davenport', 'IA', 52801, '792-223-2001', "1970-3-24",
// 168
//     'F', NOW(), 3.50, NULL);
// 169
// 170
//     INSERT INTO student VALUES('Audrey', 'Horne', 'ahorne@aol.com',
// 171
//     '342 19th St', 'Detroit', 'MI', 48222, '792-223-2001', "1965-2-1",
// 172
//     'F', NOW(), 3.50, NULL);
// 173
// 174
//     INSERT INTO student VALUES('James', 'Hurley', 'jhurley@aol.com',
// 175
//     '2578 Cliff St', 'Queens', 'NY', 11427, '792-223-1890', "1967-1-2",
// 176
//     'M', NOW(), 3.50, NULL);
// 177
// 178
//     INSERT INTO student VALUES('Lucy', 'Moran', 'lmoran@aol.com',
// 179
//     '178 Dover St', 'Hollywood', 'CA', 90078, '792-223-9678', "1954-11-27",
// 180
//     'F', NOW(), 3.50, NULL);
// 181
// 182
//     INSERT INTO student VALUES('Tommy', 'Hill', 'thill@aol.com',
// 183
//     '672 High Plains', 'Tucson', 'AZ', 85701, '792-223-1115', "1951-12-21",
// 184
//     'M', NOW(), 3.50, NULL);
// 185
// 186
//     INSERT INTO student VALUES('Andy', 'Brennan', 'abrennan@aol.com',
// 187
//     '281 4th St', 'Jacksonville', 'NC', 28540, '792-223-8902', "1960-12-27",
// 188
//     'M', NOW(), 3.50, NULL);
// 189
// 190
// 11. SELECT * FROM student;
// 191
// 192
//     a. Shows all the student data
// 193
// 194
// 12. CREATE TABLE class(
// 195
//     name VARCHAR(30) NOT NULL,
// 196
//     class_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY);
// 197
// 198
//     a. Create a separate table for all classes
// 199
// 200
// 13. show tables;
// 201
// 202
//     a. Show all the tables
// 203
// 204
// 14. INSERT INTO class VALUES
// 205
// ('English', NULL), ('Speech', NULL), ('Literature', NULL),
// 206
// ('Algebra', NULL), ('Geometry', NULL), ('Trigonometry', NULL),
// 207
// ('Calculus', NULL), ('Earth Science', NULL), ('Biology', NULL),
// 208
// ('Chemistry', NULL), ('Physics', NULL), ('History', NULL),
// 209
// ('Art', NULL), ('Gym', NULL);
// 210
// 211
//     a. Insert all possible classes
// 212
// 213
//     b. select * from class;
// 214
// 215
// 15. CREATE TABLE test(
// 216
//     date DATE NOT NULL,
// 217
//     type ENUM('T', 'Q') NOT NULL,
// 218
//     class_id INT UNSIGNED NOT NULL,
// 219
//     test_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY);
// 220
// 221
//     a. class_id is a foreign key
// 222
// 223
//     I. Used to make references to the Primary Key of another table
// 224
// 225
//     II. Example: If we have a customer and city table. If the city table had a column which listed the unique primary key of all the customers, that Primary Key listing in the city table would be considered a Foreign Key.
// 226
// 227
//     III. The Foreign Key can have a different name from the Primary Key name.
// 228
// 229
//     IV. The value of a Foreign Key can have the value of NULL.
// 230
// 231
//     V. A Foreign Key doesnâ��t have to be unique
// 232
// 233
// 16. CREATE TABLE score(
// 234
//     student_id INT UNSIGNED NOT NULL,
// 235
//     event_id INT UNSIGNED NOT NULL,
// 236
//     score INT NOT NULL,
// 237
//     PRIMARY KEY(event_id, student_id));
// 238
// 239
//     a. We combined the event and student id to make sure we don't have
// 240
//     duplicate scores and it makes it easier to change scores
// 241
// 242
//     b. Since neither the event or the student ids are unique on their
// 243
//     own we are able to make them unique by combining them
// 244
// 245
// 17. CREATE TABLE absence(
// 246
//     student_id INT UNSIGNED NOT NULL,
// 247
//     date DATE NOT NULL,
// 248
//     PRIMARY KEY(student_id, date));
// 249
// 250
//     a. Again we combine 2 items that aren't unique to generate a
// 251
//     unique key
// 252
// 253
// 18. Add a max score column to test
// 254
// 255
//     a. ALTER TABLE test ADD maxscore INT NOT NULL AFTER type;
// 256
// 257
//     b. DESCRIBE test;
// 258
// 259
// 19. Insert Tests
// 260
// 261
//     a. INSERT INTO test VALUES
// 262
//     ('2014-8-25', 'Q', 15, 1, NULL),
// 263
//     ('2014-8-27', 'Q', 15, 1, NULL),
// 264
//     ('2014-8-29', 'T', 30, 1, NULL),
// 265
//     ('2014-8-29', 'T', 30, 2, NULL),
// 266
//     ('2014-8-27', 'Q', 15, 4, NULL),
// 267
//     ('2014-8-29', 'T', 30, 4, NULL);
// 268
// 269
//     b. select * FROM test;
// 270
// 271
// 20. ALTER TABLE score CHANGE event_id test_id
// 272
//     INT UNSIGNED NOT NULL;
// 273
// 274
//     a. Change the name of event_id in score to test_id
// 275
// 276
//     b. DESCRIBE score;
// 277
// 278
// 279
// 21. Enter student scores
// 280
// 281
//     a. INSERT INTO score VALUES
// 282
//     (1, 1, 15),
// 283
//     (1, 2, 14),
// 284
//     (1, 3, 28),
// 285
//     (1, 4, 29),
// 286
//     (1, 5, 15),
// 287
//     (1, 6, 27),
// 288
//     (2, 1, 15),
// 289
//     (2, 2, 14),
// 290
//     (2, 3, 26),
// 291
//     (2, 4, 28),
// 292
//     (2, 5, 14),
// 293
//     (2, 6, 26),
// 294
//     (3, 1, 14),
// 295
//     (3, 2, 14),
// 296
//     (3, 3, 26),
// 297
//     (3, 4, 26),
// 298
//     (3, 5, 13),
// 299
//     (3, 6, 26),
// 300
//     (4, 1, 15),
// 301
//     (4, 2, 14),
// 302
//     (4, 3, 27),
// 303
//     (4, 4, 27),
// 304
//     (4, 5, 15),
// 305
//     (4, 6, 27),
// 306
//     (5, 1, 14),
// 307
//     (5, 2, 13),
// 308
//     (5, 3, 26),
// 309
//     (5, 4, 27),
// 310
//     (5, 5, 13),
// 311
//     (5, 6, 27),
// 312
//     (6, 1, 13),
// 313
//     (6, 2, 13),
// 314
//     # Missed this day (6, 3, 24),
// 315
//     (6, 4, 26),
// 316
//     (6, 5, 13),
// 317
//     (6, 6, 26),
// 318
//     (7, 1, 13),
// 319
//     (7, 2, 13),
// 320
//     (7, 3, 25),
// 321
//     (7, 4, 27),
// 322
//     (7, 5, 13),
// 323
//     # Missed this day (7, 6, 27),
// 324
//     (8, 1, 14),
// 325
//     # Missed this day (8, 2, 13),
// 326
//     (8, 3, 26),
// 327
//     (8, 4, 23),
// 328
//     (8, 5, 12),
// 329
//     (8, 6, 24),
// 330
//     (9, 1, 15),
// 331
//     (9, 2, 13),
// 332
//     (9, 3, 28),
// 333
//     (9, 4, 27),
// 334
//     (9, 5, 14),
// 335
//     (9, 6, 27),
// 336
//     (10, 1, 15),
// 337
//     (10, 2, 13),
// 338
//     (10, 3, 26),
// 339
//     (10, 4, 27),
// 340
//     (10, 5, 12),
// 341
//     (10, 6, 22);
// 342
// 343
// 22. Fill in the absences
// 344
// 345
//     a. INSERT INTO absence VALUES
// 346
//     (6, '2014-08-29'),
// 347
//     (7, '2014-08-29'),
// 348
//     (8, '2014-08-27');
// 349
// 350
// 23. SELECT * FROM student;
// 351
// 352
//     a. Shows everything in the student table
// 353
// 354
// 24. SELECT FIRST_NAME, last_name
// 355
//     FROM student;
// 356
// 357
//     a. Show just selected data from the table (Not Case Sensitive)
// 358
// 359
// 25. RENAME TABLE
// 360
//     absence to absences,
// 361
//     class to classes,
// 362
//     score to scores,
// 363
//     student to students,
// 364
//     test to tests;
// 365
// 366
//     a. Change all the table names SHOW TABLES;
// 367
// 368
// 26. SELECT first_name, last_name, state
// 369
//     FROM students
// 370
//     WHERE state="WA";
// 371
// 372
//     a. Show every student born in the state of Washington
// 373
// 374
// 27. SELECT first_name, last_name, birth_date
// 375
//     FROM students
// 376
//     WHERE YEAR(birth_date) >= 1965;
// 377
// 378
//     a. You can compare values with =, >, <, >=, <=, !=
// 379
// 380
//     b. To get the month, day or year of a date use MONTH(), DAY(), or YEAR()
// 381
// 382
// 27. SELECT first_name, last_name, birth_date
// 383
//     FROM students
// 384
//     WHERE MONTH(birth_date) = 2 OR state="CA";
// 385
// 386
//     a. AND, && : Returns a true value if both conditions are true
// 387
// 388
//     b. OR, || : Returns a true value if either condition is true
// 389
// 390
//     c. NOT, ! : Returns a true value if the operand is false
// 391
// 392
// 28. SELECT last_name, state, birth_date
// 393
//     FROM students
// 394
//     WHERE DAY(birth_date) >= 12 && (state="CA" || state="NV");
// 395
// 396
//     a. You can use compound logical operators
// 397
// 398
// 29. SELECT last_name
// 399
//     FROM students
// 400
//     WHERE last_name IS NULL;
// 401
// 402
//     SELECT last_name
// 403
//     FROM students
// 404
//     WHERE last_name IS NOT NULL;
// 405
// 406
//     a. If you want to check for NULL you must use IS NULL or IS NOT NULL
// 407
// 408
// 30. SELECT first_name, last_name
// 409
//     FROM students
// 410
//     ORDER BY last_name;
// 411
// 412
//     a. ORDER BY allows you to order results. To change the order use
// 413
//     ORDER BY col_name DESC;
// 414
// 415
// 31. SELECT first_name, last_name, state
// 416
//     FROM students
// 417
//     ORDER BY state DESC, last_name ASC;
// 418
// 419
//     a. If you use 2 ORDER BYs it will order one and then the other
// 420
// 421
// 32. SELECT first_name, last_name
// 422
//     FROM students
// 423
//     LIMIT 5;
// 424
// 425
//     a. Use LIMIT to limit the number of results
// 426
// 427
// 33. SELECT first_name, last_name
// 428
//     FROM students
// 429
//     LIMIT 5, 10;
// 430
// 431
//     a. You can also get results 5 through 10
// 432
// 433
// 34. SELECT CONCAT(first_name, " ", last_name) AS 'Name',
// 434
//     CONCAT(city, ", ", state) AS 'Hometown'
// 435
//     FROM students;
// 436
// 437
//     a. CONCAT is used to combine results
// 438
// 439
//     b. AS provides for a way to define the column name
// 440
// 441
// 35. SELECT last_name, first_name
// 442
//     FROM students
// 443
//     WHERE first_name LIKE 'D%' OR last_name LIKE '%n';
// 444
// 445
//     a. Matchs any first name that starts with a D, or ends with a n
// 446
// 447
//     b. % matchs any sequence of characters
// 448
// 449
// 36. SELECT last_name, first_name
// 450
//     FROM students
// 451
//     WHERE first_name LIKE '___y';
// 452
// 453
//     a. _ matchs any single character
// 454
// 455
// 37. SELECT DISTINCT state
// 456
//     FROM students
// 457
//     ORDER BY state;
// 458
// 459
//     a. Returns the states from which students are born because DISTINCT
// 460
//     eliminates duplicates in results
// 461
// 462
// 38. SELECT COUNT(DISTINCT state)
// 463
//     FROM students;
// 464
// 465
//     a. COUNT returns the number of matchs, so we can get the number
// 466
//     of DISTINCT states from which students were born
// 467
// 468
// 39. SELECT COUNT(*)
// 469
//     FROM students;
// 470
// 471
//     SELECT COUNT(*)
// 472
//     FROM students
// 473
//     WHERE sex='M';
// 474
// 475
//     a. COUNT returns the total number of records as well as the total
// 476
//     number of boys
// 477
// 478
// 40. SELECT sex, COUNT(*)
// 479
//     FROM students
// 480
//     GROUP BY sex;
// 481
// 482
//     a. GROUP BY defines how the results will be grouped
// 483
// 484
// 41. SELECT MONTH(birth_date) AS 'Month', COUNT(*)
// 485
//     FROM students
// 486
//     GROUP BY Month
// 487
//     ORDER BY Month;
// 488
// 489
//     a. We can get each month in which we have a birthday and the total
// 490
//     number for each month
// 491
// 492
// 42. SELECT state, COUNT(state) AS 'Amount'
// 493
//     FROM students
// 494
//     GROUP BY state
// 495
//     HAVING Amount > 1;
// 496
// 497
//     a. HAVING allows you to narrow the results after the query is executed
// 498
// 499
// 43. SELECT
// 500
//     test_id AS 'Test',
// 501
//     MIN(score) AS min,
// 502
//     MAX(score) AS max,
// 503
//     MAX(score)-MIN(score) AS 'range',
// 504
//     SUM(score) AS total,
// 505
//     AVG(score) AS average
// 506
//     FROM scores
// 507
//     GROUP BY test_id;
// 508
// 509
//     a. There are many math functions built into MySQL. Range had to be quoted because it is a reserved word.
// 510
// 511
//     b. You can find all reserved words here http://dev.mysql.com/doc/mysqld-version-reference/en/mysqld-version-reference-reservedwords-5-5.html
// 512
// 513
// 44. The Built in Numeric Functions (SLIDE)
// 514
// 515
// ABS(x) : Absolute Number: Returns the absolute value of the variable x.
// 516
// 517
// ACOS(x), ASIN(x), ATAN(x), ATAN2(x,y), COS(x), COT(x), SIN(x), TAN(x) :Trigonometric Functions : They are used to relate the angles of a triangle to the lengths of the sides of a triangle.
// 518
// 519
// AVG(column_name) : Average of Column : Returns the average of all values in a column. SELECT AVG(column_name) FROM table_name;
// 520
// 521
// CEILING(x) : Returns the smallest number not less than x.
// 522
// 523
// COUNT(column_name) : Count : Returns the number of non null values in the column. SELECT COUNT(column_name) FROM table_name;
// 524
// 525
// DEGREES(x) : Returns the value of x, converted from radians to degrees.
// 526
// 527
// EXP(x) : Returns e^x
// 528
// 529
// FLOOR(x) : Returns the largest number not grater than x
// 530
// 531
// LOG(x) : Returns the natural logarithm of x
// 532
// 533
// LOG10(x) : Returns the logarithm of x to the base 10
// 534
// 535
// MAX(column_name) : Maximum Value : Returns the maximum value in the column. SELECT MAX(column_name) FROM table_name;
// 536
// 537
// MIN(column_name) : Minimum : Returns the minimum value in the column. SELECT MIN(column_name) FROM table_name;
// 538
// 539
// MOD(x, y) : Modulus : Returns the remainder of a division between x and y
// 540
// 541
// PI() : Returns the value of PI
// 542
// 543
// POWER(x, y) : Returns x ^ Y
// 544
// 545
// RADIANS(x) : Returns the value of x, converted from degrees to radians
// 546
// 547
// RAND() : Random Number : Returns a random number between the values of 0.0 and 1.0
// 548
// 549
// ROUND(x, d) : Returns the value of x, rounded to d decimal places
// 550
// 551
// SQRT(x) : Square Root : Returns the square root of x
// 552
// 553
// STD(column_name) : Standard Deviation : Returns the Standard Deviation of values in the column. SELECT STD(column_name) FROM table_name;
// 554
// 555
// SUM(column_name) : Summation : Returns the sum of values in the column. SELECT SUM(column_name) FROM table_name;
// 556
// 557
// TRUNCATE(x) : Returns the value of x, truncated to d decimal places
// 558
// 559
// 45. SELECT * FROM absences;
// 560
// 561
//     DESCRIBE scores;
// 562
// 563
//     SELECT student_id, test_id
// 564
//     FROM scores
// 565
//     WHERE student_id = 6;
// 566
// 567
//     INSERT INTO scores VALUES
// 568
//     (6, 3, 24);
// 569
// 570
//     DELETE FROM absences
// 571
//     WHERE student_id = 6;
// 572
// 573
//     a. Look up students that missed a test
// 574
// 575
//     b. Look up the specific test missed by student 6
// 576
// 577
//     c. Insert the make up test result
// 578
// 579
//     d. Delete the record in absences
// 580
// 581
// 46. ALTER TABLE absences
// 582
//     ADD COLUMN test_taken CHAR(1) NOT NULL DEFAULT 'F'
// 583
//     AFTER student_id;
// 584
// 585
//     a. Use ALTER to add a column to a table. You can use AFTER
// 586
//     or BEFORE to define the placement
// 587
// 588
// 47. ALTER TABLE absences
// 589
//     MODIFY COLUMN test_taken ENUM('T','F') NOT NULL DEFAULT 'F';
// 590
// 591
//     a. You can change the data type with ALTER and MODIFY COLUMN
// 592
// 593
// 48. ALTER TABLE absences
// 594
//     DROP COLUMN test_taken;
// 595
// 596
//     a. ALTER and DROP COLUMN can delete a column
// 597
// 598
// 49. ALTER TABLE absences
// 599
//     CHANGE student_id student_id INT UNSIGNED NOT NULL;
// 600
// 601
//     a. You can change the data type with ALTER and CHANGE
// 602
// 603
// 50. SELECT *
// 604
//     FROM scores
// 605
//     WHERE student_id = 4;
// 606
// 607
//     UPDATE scores SET score=25
// 608
//     WHERE student_id=4 AND test_id=3;
// 609
// 610
//     a. Use UPDATE to change a value in a row
// 611
// 612
// 51. SELECT first_name, last_name, birth_date
// 613
//     FROM students
// 614
//     WHERE birth_date
// 615
//     BETWEEN '1960-1-1' AND '1970-1-1';
// 616
// 617
//     a. Use BETWEEN to find matches between a minimum and maximum
// 618
// 619
// 52. SELECT first_name, last_name
// 620
//     FROM students
// 621
//     WHERE first_name IN ('Bobby', 'Lucy', 'Andy');
// 622
// 623
//     a. Use IN to narrow results based on a predefined list of options
// 624
// 625
// 53. SELECT student_id, date, score, maxscore
// 626
//     FROM tests, scores
// 627
//     WHERE date = '2014-08-25'
// 628
//     AND tests.test_id = scores.test_id;
// 629
// 630
//     a. To combine data from multiple tables you can perform a JOIN
// 631
//     by matching up common data like we did here with the test ids
// 632
// 633
//     b. You have to define the 2 tables to join after FROM
// 634
// 635
//     c. You have to define the common data between the tables after WHERE
// 636
// 637
// 54. SELECT scores.student_id, tests.date, scores.score, tests.maxscore
// 638
//     FROM tests, scores
// 639
//     WHERE date = '2014-08-25'
// 640
//     AND tests.test_id = scores.test_id;
// 641
// 642
//     a. It is good to qualify the specific data needed by proceeding
// 643
//     it with the tables name and a period
// 644
// 645
//     b. The test_id that is in scores is an example of a foreign key, which
// 646
//     is a reference to a primary key in the tests table
// 647
// 648
// 55. SELECT CONCAT(students.first_name, " ", students.last_name) AS Name,
// 649
//     tests.date, scores.score, tests.maxscore
// 650
//     FROM tests, scores, students
// 651
//     WHERE date = '2014-08-25'
// 652
//     AND tests.test_id = scores.test_id
// 653
//     AND scores.student_id = students.student_id;
// 654
// 655
//     a. You can JOIN more then 2 tables as long as you define the like
// 656
//     data between those tables
// 657
// 658
// 56. SELECT students.student_id,
// 659
//     CONCAT(students.first_name, " ", students.last_name) AS Name,
// 660
//     COUNT(absences.date) AS Absences
// 661
//     FROM students, absences
// 662
//     WHERE students.student_id = absences.student_id
// 663
//     GROUP BY students.student_id;
// 664
// 665
//     a. If we wanted a list of the number of absences per student we
// 666
//     have to group by student_id or we would get just one result
// 667
// 668
// 57. SELECT students.student_id,
// 669
//     CONCAT(students.first_name, " ", students.last_name) AS Name,
// 670
//     COUNT(absences.date) AS Absences
// 671
//     FROM students LEFT JOIN absences
// 672
//     ON students.student_id = absences.student_id
// 673
//     GROUP BY students.student_id;
// 674
// 675
//     a. If we need to include all information from the table listed
// 676
//     first "FROM students", even if it doesn't exist in the table on
// 677
//     the right "LEFT JOIN absences", we can use a LEFT JOIN.
// 678
// 679
// 58. SELECT students.first_name,
// 680
//     students.last_name,
// 681
//     scores.test_id,
// 682
//     scores.score
// 683
//     FROM students
// 684
//     INNER JOIN scores
// 685
//     ON students.student_id=scores.student_id
// 686
//     WHERE scores.score <= 15
// 687
//     ORDER BY scores.test_id;
// 688
// 689
//     a. An INNER JOIN gets all rows of data from both tables if there
// 690
//     is a match between columns in both tables
// 691
// 692
//     b. Here I'm getting all the data for all quizzes and matching that
// 693
//     data up based on student ids
// 694
// 695
// 59. One-to-One Relationship (SLIDE)
// 696
// 697
//     a. In this One-to-One relationship there can only be one social security number per person. Hence,  each social security number can be associated with one person. As well, one person in the other table only matches up with one social security number.
// 698
// 699
//     b. One-to-One relationships can be identified also in that the foreign keys never duplicate across all rows.
// 700
// 701
//     c. If you are confused by the One-to-One relationship it is understandable, because they are not often used. Most of the time if a value never repeats it should remain in the parent table being customer in this case. Just understand that in a One-to-One relationship, exactly one row in a parent table is related to exactly one row of a child table.
// 702
// 703
// 60. One-to-Many Relationship
// 704
// 705
//     a. When we are talking about One-to-Many relationships think about the table diagram here. If you had a list of customers chances are some of them would live in the same state. Hence, in the state column in the parent table, it would be common to see a duplication of states. In this example, each customer can only live in one state so their would only be one id used for each customer.
// 706
// 707
//     b. Just remember that, a One-to-Many relationship is one in which a record in the parent table can have many matching records in the child table, but a record in the child can only match one record in the parent. A customer can choose to live in any state, but they can only live in one at a time.
// 708
// 709
// 61. Many-to-Many Relationship
// 710
// 711
//     a. Many people can own many different products. In this example, you can see an example of a Many-to-Many relationship. This is a sign of a non-normalized database, by the way. How could you ever access this information:
// 712
// 713
//     b. If a customer buys more than one product, you will have multiple product idâ��s associated with each customer. As well, you would have multiple customer idâ��s associated with each product. 
