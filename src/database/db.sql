begin;

drop table if exists users, posts, comments;

create table users (
  userId serial primary key,
  name varchar(255) not null,
  email varchar(255) not null UNIQUE,
  password varchar(255) not null
);

create table posts (
  postId serial primary key,
  userId integer references users(userId),
  post text not null,
  postType boolean not null
);

create table comments (
  commentId serial primary key,
  postId integer references posts(postId) ON DELETE CASCADE,
  userId integer references users(userId),
  comment text not null
);

insert into users (name, email, password) values ('aballah', 'abdallah@gmail.com', '$2b$10$bdltXPJZEX.u9jyPCEqY9eVmg6.z8Pqc.TdyBAeoPDpRWKpiUV7bG');
insert into users (name, email, password) values ('amin', 'amin@gmail.com', '$2b$10$bdltXPJZEX.u9jyPCEqY9eVmg6.z8Pqc.TdyBAeoPDpRWKpiUV7bG');

insert into posts (userId, post, postType) values ('1', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?', true);
insert into posts (userId, post, postType) values ('1', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?', true);
insert into posts (userId, post, postType) values ('2', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?', true);
insert into posts (userId, post, postType) values ('2', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?', false);

insert into comments (postId, userId, comment) values ('1', '2', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?');
insert into comments (postId, userId, comment) values ('2', '2', 'I would love to start a blog and help parents learn about teaching their children how to read at a young age. I developed a reading program about 7 years ago and used it in my preschool. My last year teaching, I ended with 98% kindergarten and first grade readers that were only 3-5 years old. Do you think a blog would be a place to talk about helping the parents teach their children and have them purchase pdf’s of my program?');

commit;