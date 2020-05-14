var request = require('request');
var fs = require('fs');
var CronJob = require('cron').CronJob;

function luu(txt) {
	fs.writeFile('index.html', txt, 'utf8', function (err) {
    if (err)
        throw err;
    
});
}
var load = 0;
var list = [];
var lichsu = [];
class TeaMobi
{
	/*
	- Author: Tran Do Duc Nghia.
	- Facebook : https://fb.com/ducnghiait
	- Email : Trandoducnghia@gmail.com
	- Function Name: TeaMobi auto login & tim.
	- Date of writing : 7h - 14/05/2020.
	- Complete and share : 12h - 14/05/2020.
	- Last updated : 18h25 - 14/05/2020.
	- Version : 1.0 (phiên bản cuối cùng, hoạt động ổn định nhất, mượt nhất.)
	- Vui lòng không sửa nguồn, vui lòng sử dụng đúng mục đích, src chia sẻ mang tính chất
	học tập, từ đây có thể viết ra các code khác như : bình luận, new toppic. Nhưng xin lưu ý hãy xử dụng
	với mục đích học tập, xin đừng phá hoại.
	- Cách thức hoạt động là nó hoạt động theo ID nhé mọi người, ID nào tìm thấy trước sẽ like trước.
	*/
	constructor(taikhoan,matkhau)
	{
		this.taikhoan = taikhoan;
		this.matkhau  = matkhau;
	}
	checklist(id)
    {
    for (var i=0; i<list.length;i++)
	{
		if(list[i].id == id)
		{
			return list[i]
		}
	}
	return false;
    }
    listlichsu(id)
    {
	for(var i=0;i<lichsu.length;i++)
	{
		if(lichsu[i].time <= Date.now())
		{
		    lichsu.splice(i, 1);

		}
		if(lichsu[i].id == id) 
		{
			return lichsu[i];
		}
	}
	return false;
    }

	curl()
	{
		request.post(
        {
        headers:
        {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': '',
                'Accept': '/',
                'Connection': 'keep-alive'
        },
        url: 'http://my.teamobi.com/app/login.php',
        body: "mes=heydude"
        },(err, res, body) =>
         {
			 this.cookie = res.caseless.dict['set-cookie'];
			 this.t1 = body.split('"checkru" value="')[1];
			 this.t2 = this.t1.split('"')[0];
			 this.login(this.t2); 
		 }
		 );
		
	}
	login(token)
	{
		request.post(
        {
        headers:
        {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': this.cookie,
                'Accept': '/',
                'Connection': 'keep-alive'
        },
        url: 'http://my.teamobi.com/app/index.php?do=login',
        body: "user="+this.taikhoan+"&pass="+this.matkhau+"&checkru="+token+""
        },(err, res, body) =>
         {
		   console.log('Hoan thanh login. Neu tai khoan hoac mat khau sai se bi dis.');	
		 }
		 );
		
	}
	
	baiviet()
	{
		request.post(
        {
        headers:
        {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': this.cookie,
                'Accept': '/',
                'Connection': 'keep-alive'
        },
        url: 'http://my.teamobi.com/beta/forum.html',
        body: "mes=ducnghia"
        },(err, res, body) =>
         {
			 this.timkiem(body);
		 }
		 );
		
	}
	timkiem(data)
	{
		
		for(var i =1;i<data.split('"alert alert-info">').length;i++)
		{
			this.center = data.split('"alert alert-info">')[i].split("</div>")[0];
            this.url    = this.center.split('href="')[1].split('"')[0];
            this.list(this.url);		
		}
		
	}
	list(http)
	{
		request.post(
        {
        headers:
        {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': this.cookie,
                'Accept': '/',
                'Connection': 'keep-alive'
        },
        url: http,
        body: "mes=ducnghia"
        },(err, res, body) =>
         {
			 this.like(body);
		 }
		 );
		
	}
	like(data)
	{
		
		for(var k=1;k<data.split('"box_timee_bviet">').length;k++)
		{
		  this.centex = data.split('"box_timee_bviet">')[k].split("</div>")[0];
          this.href  = 'http://my.teamobi.com/beta/app/?for=forum&do=list&uid='+this.centex.split('padding-right: 3px;" href="http://my.teamobi.com/beta/app/?for=forum&do=list&uid=')[1].split('"')[0];
		 
          this.uid = 	this.href.split("&likec=")[1];	
		  if(!this.listlichsu(this.uid) && !this.checklist(this.uid))
		  {
			list.push({url : this.href, id : this.uid , time : Date.now()+900000 });  
		  }
		}
		
		
	}
	rand(min,max)
	{
		min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
	}
	xoalist(id)
	{
		for(var i =0;i<list.length;i++)
		{
			if(list[i].id == id )
			{
				list.splice(i, 1);
			}
	}
	}
	send()
	{
		if(load !=0)
		{
			return false;
		}
		if(list.length <=0)
		{
			return false;
		}
		this.dulieu = list[this.rand(0,list.length)];
		load =1;
	request.post(
        {
        headers:
        {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': this.cookie,
                'Accept': '/',
                'Connection': 'keep-alive'
        },
        url: this.dulieu.url,
        body: "mes=ducnghia"
        },(err, res, body) =>
         {
			 luu(body);
			 console.log('Like: '+this.dulieu.url);
             console.log('Con '+list.length+' cho, va '+lichsu.length+' song.');			 
			load = 0;
			lichsu.push({url : this.dulieu.href, id : this.dulieu.id , time : Date.now()+900000 }); 
			this.xoalist(this.dulieu.id);
			 
		 }
		 );	
	}
	
	
	get tym()
	{
		this.code = this.curl();
		this.baiviet();
		this.date = 0;
	}
	
}
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

	
