var app = new Vue({
    el: '#app',
    data:{
        activeName:'alert',
        updateTime:'',
        tableData: [],
        search: ''
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
        }
    }
});