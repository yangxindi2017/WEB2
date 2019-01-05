function animate(obj,json,callback){
		clearInterval(obj.timer);//给Obj对象添加timer属性
		obj.timer=setInterval(function(){
			var isStop=true;//标志所有变量都到达目标值
			for(var attr in json)//遍历所有属性
			{
				if(attr=='opacity')//如果属性是透明度（0-1）
				{
					var now=parseInt(getStyle(obj,attr)*100);
				}	
				else
				{
					var now=parseInt(getStyle(obj,attr));
				}
				var speed=(json[attr]-now)/5;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);//json[attr]==json.attr用json方式整理数据
				if(attr=='opacity')
				{
					obj.style[attr]=(now+speed)/100;
				}
				else
				{
					obj.style[attr]=now+speed+'px';
				}
				var current =now+speed;
				if(json[attr]!=current){
					isStop=false;
				}
			}
			if(isStop==true)
			{
				clearInterval(obj.timer);
				callback&&callback();
			}
		},50)
			
	}
	
	////******解决兼容性问题********////
	function getStyle(obj,style){
		if(getComputedStyle(obj))
		{
			return getComputedStyle(obj)[style];	
		}
		else{
			return obj.currentStyle[style];
		}
	}