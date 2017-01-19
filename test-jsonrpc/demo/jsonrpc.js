module.export = {
    request(reqdata) {
        //jsonrpc 签名等方法封装
        //...
        //...

        //这里假设最终jsonrpc 的 data 为 requestData
        requestData = {};


        wx.request({
            
            //... 这里正常发送ajax
            success(res){

                    res = res.data;

                    //成功后 判断配置文件 debug 是否为true
                    if(config['debug']) {
                        res = debug(requestData, res);
                    }


                    //这里处理其他业务
            }
        });
    }
}