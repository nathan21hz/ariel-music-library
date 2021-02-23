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
    },
    mounted: function() {
        var now = new Date().getTime()
        this.$http.get('./info.json', this.formquery,{emulateJSON:true}).then(function(response){
          this.updateInfo = response.data;
          this.draw_calendar()
          this.loading = false
        }, function(response){
        // 响应错误回调
        });
    },
    methods:{
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
                this.$http.get('./sixia.json', this.formquery,{emulateJSON:true}).then(function(response){
                    this.tableData = response.data.tableData;
                    this.loading = false
                }, function(response){
                    this.loading = false
                });
            }
            if(tab.name=="yishiyao" && this.yishiyaoData.length === 0){
                this.loading = true
                var now = new Date().getTime()
                this.$http.get('./yishiyao.json', this.formquery,{emulateJSON:true}).then(function(response){
                    this.yishiyaoData = response.data.tableData;
                    this.loading = false
                }, function(response){
                    this.loading = false
                });
            }
            if(tab.name=="jsgm" && this.jsgmData.length === 0){
                this.loading = true
                var now = new Date().getTime()
                this.$http.get('./jsgm.json', this.formquery,{emulateJSON:true}).then(function(response){
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
                    min: 0,
                    max: 2,
                    splitNumber:3,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 65,
                    textStyle: {
                        color: '#000'
                    },
                    show:false,
                    inRange:{
                        color:['#fff','#2c974b']
                    }
                },
                tooltip:{
                    formatter: '{c}首'
                },
                calendar: {
                    top:30,
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
        }
    }
});