var app = new Vue({
    el: '#app',
    data:{
        activeName:'alert',
        updateTime:'',
        tableData: [],
        search: '',
        form:{
            item:'',
            platform:'',
            url:''
        },
        rules:{
            item: [
                { required: true, message: '请输入作品id', trigger: 'blur' }
            ],
            platform: [
                { required: true, message: '请选择发布平台', trigger: 'blur' }
            ],
            url: [
                { required: true, message: '请输入作品链接', trigger: 'blur' }
            ]
        }
    },
    mounted: function() {
        this.$http.get('./data.json', this.formquery,{emulateJSON:true}).then(function(response){
          this.tableData = response.data.tableData;
          this.updateTime = response.data.updateTime;
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
            this.$http.post('https://1509749986895836.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/Automatic/neris-message/',this.form).then(function(response){
                this.$message({
                    message: response.data.message,
                    type: response.data.type
                });
            }, function(response){
                // 响应错误回调
            });
        }
    }
});