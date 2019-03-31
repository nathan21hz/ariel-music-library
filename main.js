var app = new Vue({
    el: '#app',
    data:{
        activeName:'alert',
        updateTime:'',
        tableData: [],
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
        total: function () {
            if(this.loading)
                return 1
            else
                return this.tableData.length
        },
        netease_ratio:function(){
            if(this.loading)
                return 1
            else
                return (this.tableData.filter(data => data.netease != "").length / this.total * 100).toFixed(1)
        },
        sing_ratio:function(){
            if(this.loading)
                return 1
            else
                return (this.tableData.filter(data => data.sing != "").length / this.total * 100).toFixed(1)
        },
        qqmusic_ratio:function(){
            if(this.loading)
                return 1
            else
                return (this.tableData.filter(data => data.qqmusic != "").length / this.total * 100).toFixed(1)
        },
        other_ratio:function(){
            if(this.loading)
                return 1
            else
                return (this.tableData.filter(data => data.other != "").length / this.total * 100).toFixed(1)
        }
    },
    mounted: function() {
        this.$http.get('./data.json', this.formquery,{emulateJSON:true}).then(function(response){
          this.tableData = response.data.tableData;
          this.updateTime = response.data.updateTime;
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
        }
    }
});