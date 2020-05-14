Giới thiệu
========
viết trên Nodejs, sử dụng để tự động thả thích các bình luận tại diễn đàn teamobi.com
Nếu có bất kì câu hỏi nào cần hỗ trợ xin vui lòng liên hệ https://fb.com/ducnghiait.

Installation
============

Yêu cầu máy bạn phải có sẵn nodejs, CD tới mục chứa code rồi thực hiện các lệnh NPM sau :

    npm install request
    npm install fs
    npm install cron
    node team.js

Mở team.js chỉnh sửa mục, rồi chỉnh sửa tài khoản mật khẩu
```javascript
var taikhoan = '';
var matkhau  = '';
```


```javascript
var taikhoan = '';
var matkhau  = '';
var tim = new TeaMobi(taikhoan,matkhau);
console.log('Dang tien hanh khoi dong he thong, dang dang nhap...');
tim.tym;
var job = new CronJob('*/5 * * * * *', function() {
	tim.send();
}, null, true, 'America/Los_Angeles');
var job2 = new CronJob('*/20 * * * * *', function() {
	tim.tym;
}, null, true, 'America/Los_Angeles');
job.start();
job2.start();
```
**Cron job/5** : 5 là 5s, nhỏ nhất là 2s, mỗi 2s tự động like bài viết, tránh bị lỗi mạng và bị out.
**Cron job/20** : 20 là 20s, mỗi 20s tự động cập nhật ID bài viết.

Function
============
```javascript
var tim = new TeaMobi(taikhoan,matkhau); // bắt đầu class function bot.
tim.tym; // bắt đầu một lệnh toàn tập mới ( login, curl)
tim.send() // tiến hành like.

```
