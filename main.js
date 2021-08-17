const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: false,
    loop: 'all',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    lrcType: 1,
    fixed: true,
});

var app = new Vue({
    el: '#app',
    data:{
        activeName:'alert',
        updateInfo:{},
        tableData: [],
        yishiyaoData:[],
        jsgmData:[],
        search: '',
        loading: true,
        form:{
            item:'',
            platform:'',
            url:''
        },
        rules:{
            item: [
                { required: true, message: '请输入作品名', trigger: 'blur' }
            ],
            platform: [
                { required: true, message: '请选择发布平台', trigger: 'blur' }
            ],
            url: [
                { required: true, message: '请输入作品链接', trigger: 'blur' }
            ]
        }
    },
    computed: {
        scaleFun: function () {
          var scale = 1;
          var hight = 170
          if (document.body.clientWidth > 870) {
            scale = 1
            hight = 170
          } else {
            scale = (document.body.clientWidth-70) / 800
            hight = 170
          }
          return `width: 800px;height:${hight}px;transform:scale(${scale});transform-origin: left;`;
        },
    },
    mounted: function() {
        var now = new Date().getTime()
        if (this.isToday("2021-5-6")) {
            this.$http.get('./info_hb.json?t='+now, this.formquery,{emulateJSON:true}).then(function(response){
                this.updateInfo = response.data;
                this.draw_calendar()
                this.loading = false
            }, function(response){
            // 响应错误回调
            });
        } else {
            this.$http.get('./info.json?t='+now, this.formquery,{emulateJSON:true}).then(function(response){
                this.updateInfo = response.data;
                this.draw_calendar()
                this.loading = false
            }, function(response){
            // 响应错误回调
            });
        }
    },
    methods:{
        isToday(str){
            var d = new Date();
            var y = d.getFullYear(); // 年
            var m = d.getMonth() + 1; // 月份从0开始的
            var d = d.getDate(); //日
            return str == (y + '-' + m + '-' + d);
        },
        onGoto(url) {
            if(url){
                window.open(url)
            } else {
                this.$message('本歌曲无连接，请至作品集中查看');
            }
        },
        haveUrl(url){
            if(url == "" || url == null){
                return false
            } else {
                return true
            }
        },
        handleDropdown(command){
            this.onGoto(command)
        },
        onSubmit(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.$http.post('https://1509749986895836.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/Automatic/neris-message/',this.form).then(function(response){
                        this.$message({
                            message: response.data.message,
                            type: response.data.type
                        });
                    }, function(response){
                        // 响应错误回调
                    });
                } else {
                    return false
                }
            })
        },
        loaddata(tab){
            if(tab.name=="sixia" && this.tableData.length === 0){
                this.loading = true
                var now = new Date().getTime()
                this.$http.get('./sixia.json?t='+now, this.formquery,{emulateJSON:true}).then(function(response){
                    this.tableData = response.data.tableData;
                    this.loading = false
                }, function(response){
                    this.loading = false
                });
            }
            if(tab.name=="yishiyao" && this.yishiyaoData.length === 0){
                this.loading = true
                var now = new Date().getTime()
                this.$http.get('./yishiyao.json?t='+now, this.formquery,{emulateJSON:true}).then(function(response){
                    this.yishiyaoData = response.data.tableData;
                    this.loading = false
                }, function(response){
                    this.loading = false
                });
            }
            if(tab.name=="jsgm" && this.jsgmData.length === 0){
                this.loading = true
                var now = new Date().getTime()
                this.$http.get('./jsgm.json?t='+now, this.formquery,{emulateJSON:true}).then(function(response){
                    this.jsgmData = response.data.tableData;
                    this.loading = false
                }, function(response){
                    this.loading = false
                });
            }
        },
        draw_calendar(){
            var myChart = echarts.init(document.getElementById('calendar'))
            myChart.setOption({
                visualMap: {
                    categories:["0","1","2"],
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        color: '#000'
                    },
                    show:true,
                    inRange:{
                        color:['#a6f0c6','#51c2d5','#eaac7f']
                    },
                    formatter: function (value, value2) {
                        if(value=="0"){
                            return "司夏"
                        } else if(value == "1"){
                            return "异世谣"
                        } else if(value == "2"){
                            return "今时古梦"
                        }
                    }
                },
                tooltip: {
                    formatter:function (obj){
                        var value = obj.value
                        if(value[1] == 0){
                            return value[0] + " 司夏"
                        } else if(value[1] == 1){
                            return value[0] + " 异世谣"
                        } else if(value[1] == 2){
                            return value[0] + " 今时古梦"
                        }
                    }
                },
                calendar: {
                    top:55,
                    left: 30,
                    right: 30,
                    cellSize: ['auto', 13],
                    range: [this.updateInfo.calendar.st,this.updateInfo.calendar.et],
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#ddd'
                    },
                    yearLabel: {show: false},
                    dayLabel: {show: false},
                    splitLine:{show: false}
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: this.updateInfo.calendar.list
                }
            })
        },
        playOnline(row, column, event) {
          var title = row.title
          var audiolink = row.filepath
          var netease_url = row.netease
          var baseUrl = "http://mass-storage.21hz.top/ariel-melody/"
          reg_res = /[0-9]{4,}/.exec(netease_url)
          if(reg_res){
            netease_id = reg_res[0]
            this.$http.get('https://1509749986895836.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/xiguo_sixia/CoverLrcGet/?id='+netease_id).then(function(response){
              ap.list.add({
                name:title,
                artist:"司夏",
                url:baseUrl+audiolink+title+'.mp3',
                lrc:response.data.lrc,
                cover:response.data.cover
              })
              ap.list.switch(ap.list.audios.length-1)
              ap.play()
            }, function(response){
            // 响应错误回调
              ap.list.add({
                name:title,
                artist:"司夏",
                url:baseUrl+audiolink+title+'.mp3',
              })
              ap.list.switch(ap.list.audios.length-1)
              ap.play()
            });
          }
          else{
            ap.list.add({
              name:title,
              artist:"司夏",
              url:baseUrl+audiolink+title+'.mp3',
            })
            ap.list.switch(ap.list.audios.length-1)
            ap.play()
          }
        }
    }
});