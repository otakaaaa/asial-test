USE employee;
START TRANSACTION;
INSERT INTO tbl_syain (`name`, `nyusya_ymd`, `role_id`, `created_at`) 
VALUES('ハリー・ポッター', '2022-04-01', 1, now()),
('ネビル・ロングボトム', '2022-04-01', 2, now()),
('ハーマイオニー・グレンジャー', '2022-04-01', 3, now()),
('ロン・ウィーズリー', '2022-04-01', 4, now()),
('ドラコ・マルフォイ', '2022-04-01', 5, now());
INSERT INTO m_role (`role_name`) VALUES('社長'),
('部長'),
('課長'),
('係長'),
('主任');
COMMIT;