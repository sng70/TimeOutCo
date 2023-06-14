USE master
GO
IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = N'ERP'
)
CREATE DATABASE ERP
GO
DROP DATABASE ERP;

USE ERP

Select * from Brands;

CREATE TABLE Brands (
 id INT IDENTITY(0, 1),
 name VARCHAR(50) NOT NULL,
 subscription_type VARCHAR(10) NOT NULL,
 hq_address VARCHAR(50),
 brands_password VARCHAR(50) NOT NULL,
 brand_mail VARCHAR(50) UNIQUE NOT NULL,
 CONSTRAINT Brands_brands_password_CHK CHECK(LEN(brands_password) >= 8 AND brands_password LIKE '%[0-9]%' AND brands_password LIKE '%[A-Z]%' AND brands_password LIKE '%[a-z]%' AND brands_password LIKE '%[^a-zA-Z0-9]%'),
 CONSTRAINT Brand_mail_CHK CHECK(brand_mail like '%@%'),
 CONSTRAINT Brand_PK PRIMARY KEY(id)
);

CREATE TABLE Employees(
 id INT NOT NULL IDENTITY(0, 1),
 brand_id INT NOT NULL,
 name VARCHAR(20) NOT NULL,
 surname VARCHAR(20) NOT NULL,
 mail VARCHAR(50) UNIQUE NOT NULL,
 phone_number CHAR(9),
 position VARCHAR(40),
 employees_password VARCHAR(50) NOT NULL,
 role VARCHAR(10) NOT NULL,
 holidays_days_ammount INT NOT NULL,
 CONSTRAINT Employees_employees_password_CHK CHECK(LEN(employees_password) >= 8 AND employees_password LIKE '%[0-9]%' AND employees_password LIKE '%[A-Z]%' AND employees_password LIKE '%[a-z]%' AND employees_password LIKE '%[^a-zA-Z0-9]%'),
 CONSTRAINT Employees_mail_CHK CHECK(mail like '%@%'),
 CONSTRAINT Employees_phone_number_CHK CHECK(phone_number like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
 CONSTRAINT Employees_PK PRIMARY KEY(id),
 CONSTRAINT Employees_brand_FK FOREIGN KEY(brand_id) REFERENCES Brands(id),
 CONSTRAINT Employees_hda_CHK CHECK(holidays_days_ammount >= 0)
);

INSERT into Employees (brand_id, name, surname, mail, phone_number, position, employees_password, is_admin, holidays_days_ammount) VALUES
(0, 'admin', 'admin', 'admin@admin.com', '123456789', 'admin admin', 'admin123@!', 1, 19)

SELECT name, surname
FROM Employees
WHERE mail = 'aleks.haouema@gmail.com' AND employees_password = 'cvh-dab@QTQ3fer2vqr';


CREATE TABLE Holidays (
 id INT IDENTITY(0, 1) NOT NULL,
 employee_id INT NOT NULL,
 cause VARCHAR(50),
 application_state VARCHAR(10) NOT NULL,
 begin_date DATE NOT NULL,
 end_date DATE NOT NULL,
 CONSTRAINT Holidays_PK PRIMARY KEY(id),
 CONSTRAINT Holidays_employees_FK FOREIGN KEY(employee_id) REFERENCES Employees(id),
 CONSTRAINT Holidays_date_CHK CHECK(begin_date <= end_date)
);

CREATE TABLE National_holidays(
id INT NOT NULL IDENTITY(0, 1),
name varchar(30) NOT NULL,
begin_date DATE NOT NULL,
end_date DATE NOT NULL,
CONSTRAINT National_holidays_PK PRIMARY KEY(id),
CONSTRAINT National_holidays_date_CHK CHECK(begin_date <= end_date)
);




INSERT INTO Brands (name, subscription_type, hq_address, brands_password, brand_mail) VALUES
('Nike', 'Basic', 'Londonin 6 ,Dublin City, Ireland', 'Nike@123BestCompany', 'nike@nike.com'),
('Adidas', 'Premium', 'Californin 2323, Los Angeles, USA ', 'AdidasTopG123@', 'adidasIs@itbest.com'),
('Puma', 'Platinium', 'NSDAP 5, Berlin, Germany', 'FührerIsTheBest123@', 'adolf@germany.com'),
('Technischools', 'Premium', 'Okopowa 59a, Warsaw, Poland', 'MatiToGigachad123@', 'technischools@technischools.com'),
('IGT', 'Platinium', '300 S Wells Ave, Reno, Nevada, USA', 'MichałTaborowskiToKok@123s', 'usa@igt.com'),
('Discord', 'Platinium', '4097 17th St, San Francisco, California', 'DiscordIsNice@123', 'discord@bin.com'),
('MongoDB', 'Basic', '725 5th Ave, New York, New York, USA ', 'mongoDB123@', 'mongoDB@mongoDB.com'),
('Zając Drug Industries', 'Premium', 'Ćpuni, Lutynia, Dolny Śląsk, Polska', 'iLikeDrugs@Za1jącTomasz', 'tomasz@zajac.com'),
('Rockstar', 'Premium', '725 5th Ave, New York, New York, USA', 'Rockstar@WeAreTheBest123@', 'we@rockstar.com'),
('Firefox', 'Basic', '3097 17th St, San Francisco, California', 'FirefoxIsTheBestBrowser123@', 'we@firefox.com');

USE ERP

-- Roles: sa, admin, user
INSERT into Employees (brand_id, name, surname, mail, phone_number, position, employees_password, role, holidays_days_ammount) VALUES
( 1, 'Aleks', 'Haouem', 'aleks.haouema@gmail.com', '603110131', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqr', 'sa', 23),
( 2, 'Tomasz', 'Zając', 'tomasz.zajacb@gmail.com', '414696420', 'Front-End Dev', 'cvh-dab@QTQ3fer2vqa', 'sa', 21),
( 5, 'Michał', 'Taborowski', 'michal.tcaborowski@igt.com', '134239023', 'Consultant', 'cvh-dab@QTQ3fer2vqc', 'sa', 25),
(0, 'Katarzyna', 'Kowalska', 'katarzynda.kowalska@gmail.com', '720433779', 'HR Manager', 'cvh-dab@QTQ3fer2vqg', 'admin', 30),
(4, 'Anna', 'Nowak', 'anna.nowak@companay.com', '695771022', 'Project Manager', 'cvh-dab@QTQ3fer2vqf', 'admin', 28),
(2, 'Piotr', 'Kowalczyk', 'piotr.kowalczsyk@gmail.com', '538458997', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqj', 'admin', 24),
(1, 'Dominik', 'Szymański', 'dominik.szymdanski@gmail.com', '601252443', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqe', 'user', 22),
(3, 'Kacper', 'Wójcik', 'kacper.wojcik@gmaail.com', '781334855', 'Tester', 'cvh-dab@QTQ3fer2vql', 'user', 20),
(4, 'Jan', 'Kowalski', 'jan.kowalski@gmaidl.com', '605704819', 'Project Manager', 'cvh-dab@QTQ3fer2vqf', 'user', 26),
(6, 'Anna', 'Nowakowska', 'anna.nowakowsska@gmail.com', '602301124', 'UX/UI Designer', 'cvh-dab@QTQ3fer2vqg', 'user', 20),
(2, 'Marcin', 'Wójcik', 'marcin.wojcsik@abc.com', '567890123', 'Software Developer', 'cvh-dab@QTQ3fer2vqh', 'user', 24),
(5, 'Monika', 'Kowalczyk', 'monika.kocwalczyk@igt.com', '456789012', 'IT Consultant', 'cvh-dab@QTQ3fer2vqi', 'user', 27),
(3, 'Adam', 'Kowalski', 'adam.kowalsski@gmail.com', '501234567', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqj', 'user', 22),
(4, 'Marek', 'Kowalski', 'marek.kowaljski@xyz.com', '987654321', 'Software Engineer', 'cvh-dab@QTQ3fer2vqk', 'user', 26),
(6, 'Karolina', 'Nowak', 'karolina.nowsak@gmail.com', '509887766', 'UI Designer', 'cvh-dab@QTQ3fer2vql', 'user', 21),
(1, 'Kamil', 'Wójcik', 'kamil.wojcik@gmfail.com', '602304050', 'Software Developer', 'cvh-dab@QTQ3fer2vqm', 'user', 25),
(1, 'Adam', 'Nowak', 'adam.nowak@gmaial.com', '123456789', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 20),
(3, 'Anna', 'Kowalska', 'anna.kowalskaaa@gmail.com', '987654321', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 22),
(2, 'Jan', 'Kowalski', 'jan.kowalski@gmsail.com', '777888999', 'Designer', 'cvh-dab@QTQ3fer2vqk', 'user', 18),
(4, 'Maria', 'Nowakowska', 'maria.nowakodwska@gmail.com', '555666777', 'Project Manager', 'cvh-dab@QTQ3fer2vqk', 'user', 30),
(6, 'Piotr', 'Nowacki', 'piotr.nowacki@gmgail.com', '111222333', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 20),
(5, 'Marta', 'Kowalczyk', 'marta.kowalczwyk@gmail.com', '222333444', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 22),
(1, 'Bartosz', 'Lis', 'bartosz.lis@gmail.com', '444555666', 'Designer', 'cvh-dab@QTQ3fer2vqk', 'user', 18),
(3, 'Alicja', 'Nowicka', 'alicja.nowiacka@gmail.com', '999888777', 'Project Manager', 'cvh-dab@QTQ3fer2vqk', 'user', 30),
(2, 'Katarzyna', 'Wójcik', 'katarzyna.wcojcik@gmail.com', '111444777', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 20),
(4, 'Krzysztof', 'Kowalewski', 'krzysztow.kowalewski@gmail.com', '333444555', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 22),
(6, 'Magdalena', 'Czarnecka', 'magdalena.dzarnecka@gmail.com', '111555999', 'Designer', 'cvh-dab@QTQ3fer2vqk', 'user', 18),
(5, 'Marcin', 'Lewandowski', 'marcin.lewandoowski@gmail.com', '666777888', 'Project Manager', 'cvh-dab@QTQ3fer2vqk', 'user', 30),
(1, 'Marek', 'Kamiński', 'marek.kaminski@gmaail.com', '222777888', 'Back-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 20),
(3, 'Natalia', 'Górska', 'natalia.gorska@gmawil.com', '666777888', 'Front-End Developer', 'cvh-dab@QTQ3fer2vqk', 'user', 22),
(2, 'Andrzej', 'Wiśniewski', 'andrzej.wisniewskiii@gmail.com', '222111555', 'Designer', 'cvh-dab@QTQ3fer2vqk', 'user', 18),
(4, 'Jolanta', 'Zielińska', 'jolanta.zielinskaaaa@gmail.com', '444888999', 'Project Manager', 'cvh-dab@QTQ3fer2vqk', 'user', 30);


INSERT INTO Holidays (employee_id, cause, application_state, begin_date, end_date) VALUES
    (1, 'L4', 'pending', '2023-04-29', '2023-05-03'),
    (2, 'Cancer', 'accepted', '2023-04-24', '2023-12-24'),
    (3, 'Children', 'pending', '2023-04-24', '2024-10-24'),
    (4, 'Period', 'denied', '2023-04-27', '2024-04-30'),
    (5, 'GrandFather died last night','accepted', '2023-04-22', '2023-04-24'),
    (6, 'Wedding', 'pending', '2023-05-12', '2023-05-14'),
    (7, 'Sabbatical', 'accepted', '2023-06-01', '2023-09-01'),
    (8, 'Surgery', 'pending', '2023-06-15', '2023-06-20'),
    (9, 'Vacation', 'accepted', '2023-07-10', '2023-07-24'),
    (10, 'Religious Holiday', 'pending', '2023-08-16', '2023-08-18');



INSERT INTO National_holidays VALUES
         ('Nowy Rok', '2023-01-01', '2023-01-01'),
         ('Święto Trzech Króli', '2023-06-01', '2023-06-01'),
         ('Wielkanoc', '2023-04-09', '2023-04-10'),
         ('Święto Pracy', '2023-05-01', '2023-05-01'),
         ('Święto Konstytucji 3 Maja', '2023-05-03', '2023-05-03'),
         ('Zielone Świątki', '2023-05-28', '2023-05-28'),
         ('Boże Ciało', '2023-06-08', '2023-06-08'),
         ('Święto Wojska Polskiego', '2023-08-15', '2023-08-15'),
         ('Wszystkich Świętych', '2023-11-01', '2023-11-01'),
         ('Święto Niepodległości', '2023-11-11', '2023-11-11'),
         ('Święta Bożego Narodzenia', '2023-12-25', '2023-12-26');

SELECT * from Brands
SELECT * from Employees
SELECT * from Holidays
SELECT * from National_holidays
SELECT brand_id, COUNT(*) from Employees GROUP BY brand_id;

GO

CREATE OR ALTER TRIGGER EmployeesInsertSecurity ON Employees AFTER INSERT AS
BEGIN
    DECLARE @basic_subscription_limit INT = 10;
    DECLARE @premium_subscription_limit INT = 25;
    DECLARE @platinum_subscription_limit INT = 50;
    DECLARE @brand_id INT = (SELECT brand_id FROM inserted);
    DECLARE @employees_no INT = (SELECT COUNT(id) FROM Employees WHERE brand_id=@brand_id GROUP BY brand_id);
    IF (SELECT subscription_type FROM brands WHERE id=@brand_id)='Basic' AND @employees_no > @basic_subscription_limit
    BEGIN
        THROW 51000, 'Met the limit of employees.', 1;
    END
    IF (SELECT subscription_type FROM brands WHERE id=@brand_id)='Premium' AND @employees_no > @premium_subscription_limit
    BEGIN
        THROW 51000, 'Met the limit of employees.', 1;
    END 
    IF (SELECT subscription_type FROM brands WHERE id=@brand_id)='Platinum' AND @employees_no > @platinum_subscription_limit
    BEGIN
        THROW 51000, 'Met the limit of employees.', 1;
    END 
END

GO

CREATE OR ALTER TRIGGER HolidaysStateUpdateSecurity ON Holidays AFTER UPDATE AS
BEGIN
    DECLARE @old_state VARCHAR(10) = (SELECT application_state FROM deleted);
    DECLARE @new_state VARCHAR(10) = (SELECT application_state FROM inserted);
    IF @old_state != 'pending' OR (@new_state != 'accepted' OR @new_state != 'denied')
    BEGIN
        THROW 52000, 'Invalid update of application state.', 1;
    END
    COMMIT TRANSACTION
END