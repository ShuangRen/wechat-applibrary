# json rpc 测试工具  (test-jsonrpc)

## debug模式

> 配置一个配置文件 设置一个debug参数 并 开启 debug, 

> 在jsonrpc 中 引入这个配置文件 并做如下判断

``` javascript

    //... 这里正常发送ajax
    success(res){

            res = res.data;

            //成功后 判断配置文件 debug 是否为true   这里的config 为 配置文件
            if(config['debug']) {
                res = debug(requestData, res);
            }


            //这里处理其他业务
    }

```

> 你需要在debug.js 的头部查看 接口对应的debug 文件存放路径  默认是 ./  ,  可修改

> 若开启,则可以在debug目录下建一个和接口同名的js文件, 如:user.get_user_info.js, 则表示这是debug getUserInfo 接口的

> 设置有3个大的参数值: result, error 以及rewrite 

> 默认是result和error 有书写的key 才会被替换

> 若要完全替换则rewrite 设置为 true, 则会无视接口返回强行替换result或者 error 

> 只需要写result和error其一即可,2个都写默认走 result 的流程

> 典型配置如下

```javascript

//表示 此接口 result 中的 activityAddress 会被替换成 111111111
module.exports = {
    result: {
        activityAddress:'11111111'
    }
}

//表示 此接口 error 中的 code 会被替换成 10000011
module.exports = {
    error: {
        code:'10000011'
    }
}

//表示 完全替换result整个
//假设原来接口返回的 error: {}, 那么现在会返回 result
module.exports = {
    result: {
        name:'abc',
        age:'22'
    },
    rewrite:true
}

```


# 封装了一些函数 (util)

## showModal

>  因为全局对象 wx 是只读,不可改写. 所以util 封装了一层方法 util.showModal


```javascript


	//默认
	//默认为: 无title的模态框,只有一个确认按钮
	//参数
	//参数1: 为字符串时,将作为content,为json时,则直接按照api字段传值并调用
	//参数2: 为字符串时,将作为title, 为function时,作为回调函数
	//参数3: 只有参数2为字符串时,作为回调函数,必须是function
	//示例
	util.showModal('我是一行提示文字');
	util.showModal('我是一行提示文字', '我是提示标题');
	util.showModal('我是一行提示文字', (res)=>{我是回调函数}));
	util.showModal('我是一行提示文字', '我是提示标题', (res)=>{我是回调函数}));

	//传json时 就和wx.showModal一致
	util.showModal({
		title: "弹窗标题",
	    content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
        showCancel: false,
        confirmText: "确定"
	});
	
```

## success

> success方法封装与wx.showToast方法,.默认显示success 的勾,默认提示为 :  成功

```javascript
	
	util.success();  //默认文字为 成功
	util.success('我是自定义提示');
```

## createWait / closeWait

> createWait 方法封装与wx.showToast方法,.默认显示loading 的菊花 ,默认提示为 :  请稍后

> closeWait 引用赋值于wx.hideToast

> 因为wx.showToast最大为10S, 所以这里也最多等待10S

```javascript
	
	util.createWait(); //默认文字为 请稍后
	util.createWait('我是自定义提示');
	
	//关闭wait 
	util.closeWait();  //推荐使用,这样逻辑代码清晰
	wx.hideToast();
```