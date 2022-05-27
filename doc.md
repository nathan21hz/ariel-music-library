# Xiguo Melody API

### 获取概况

[GET] http://melody.xiguo.net/data/info.json

获取更新时间、作品数量、更新日历等信息。（此数据可能与数据库不一致）

响应示例：

```json
{
	"updateTime": "2022/05/24",
	"sixia": 477,
	"yishiyao": 28,
	"jsgm": 33,
	"updateInfo": "更新近期作品",
	"calendar": {
		"st": "2021-05-24", 
		"et": "2022-05-24", 
		"list": [ ..., ["2019-12-29", 0], ["2020-01-05", 0], ... ]
	}
}
```



### 获取歌曲列表

**司夏** [GET] http://melody.xiguo.net/data/sixia.json

**今时古梦** [GET] http://melody.xiguo.net/data/sixia.json 

**异世谣** [GET] http://melody.xiguo.net/data/yishiyao.json 

获取歌曲基本信息列表。（此数据可能与数据库不一致）

响应示例：

```json
{
    "baseUrl": "http://mass-storage.21hz.top/ariel-melody/", 
    "updateTime": "2022/05/24",
    "tableData": [... ,
        {
            "id":1,
            "inner_id":"6243d285bff8861de22064ad",
            "artists":"司夏",
            "title":"红嫁衣",
            "group":"2022",
            "info":"绝对演绎剧本推广曲",
            "netease":"",
            "sing":"",
            "qqmusic":"https://y.qq.com/n/ryqq/songDetail/001zaARc3P2Xfa",
            "other":"https://www.bilibili.com/video/BV15Y411J7eK",
            "filepath":"2022/",
            "time":"2022-03-30",
            "staff":"演唱: 司夏 | 作词: 锦衣小盆友 | 作曲: 潮汐-tide | 编曲: 1AN 孙毅然 | 混音: FionaGwon | 修音: MT | 和声: 阿南sara | ",
            "description":""
        }, ...
    ]
}
```



### 获取歌曲详情

[GET] https://fc.21hz.top/sixia-music?play=<0>&type=<sixia>&id=<inner_id>

获取歌曲详细信息，包括播放链接，歌词等。

请求参数：

- play：是否获取播放链接、歌词及封面，0：否，1：是（默认），不需要以上信息时都建议取0，速度更快；
- type：歌曲类型，"sixia"（默认）, "jsgm", "yishiyao" 其中之一；
- id：歌曲 Inner ID

响应示例：

```json
{
    "status":"ok",
    "inner_id":"61a4fa9d6b9528fa036413a4",
    "artists":"司夏",
    "title":"迢迢",
    "group":"2021",
    "netease":"",
    "sing":"",
    "qqmusic":"https://y.qq.com/n/ryqq/songDetail/003D2IDL3aQLbf",
    "time":"2021-11-30",
    "staff":[
        ...
        {"type":"演唱", "name":"司夏"},
        {"type":"作词","name":"沈行之"},
        ...
    ],
    "url":"http://xxxx.mp3",
    "cover":"https://xxxx.jpg",
    "lrc":"...\n[02:23.22]意难平\n[02:25.05]\n只续续低语诉与琵琶\n[02:29.16]可怜迢迢迢迢迢迢山水又千重云霞\n... "
}
```



### 歌词搜索

[GET] https://fc.21hz.top/sixia-lyric?q=<key_word>

在司夏的歌词中搜索关键字

请求参数：

- q：关键字，长度必须大于等于2；

响应示例：

```json
{
    "status":"success",
    "data":[
		...,
        {
            "inner_id":"611157cb1ee8cba96eec8c5d",
            "title":"长安落花",
            "artists":"司夏",
            "time":"2021-07-27",
            "lyrics":[
                { "time_mark":"00:45.99", "text":"从此风雨同舟" },
                { "time_mark":"02:20.82", "text":"从此风雨同舟" }
            ]
        },
        {
            "inner_id":"601c0949809e5a1e2c13928b",
            "title":"白衣渡我",
            "artists":"司夏",
            "time":"",
            "lyrics":[
                { "time_mark":"00:33.70", "text":"风雨歇处便江湖" }
            ]
        },
        ...
    ],
    "msg":"success"
}
```



### 提交歌曲信息

[POST] https://fc.21hz.top/sixia-update?action=submit

**提交新歌曲**

请求体（JSON）：

```json
{
      "scale":"new",	// 固定为new
      "type":"sixia",	// sixia, jsgm, yishiyao 之一
      "data":{
          "type":"sixia",	// 同上 "type"
          "title":"歌曲名称",
          "artists":"演唱者",
          "group":"分组",
          "date":"上传日期",
          "netease":"网易云音乐链接",
          "qqmusic":"QQ音乐链接",
          "bilibili":"B站链接"
      }
}
```

**提交Staff信息**

请求体（JSON）：

```json
{
    "scale":"staff",		// 固定为staff
    "type":"sixia",			// sixia, jsgm, yishiyao 之一
    "data":{
        "type":"sixia",		// 同上 "type"
        "title":"歌曲名称",
        "inner_id":"歌曲 Inner ID",
        "staff":[			//Staff 列表
            {"type":"演唱", "name":"司夏"},
            {"type":"作曲", "name":"AAA; BBB"}
        ]
    }
}
```

响应示例：

```json
{
    message: "通过成功", 
    type: "success"
}
```



