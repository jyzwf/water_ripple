
	var water_ripple_slide = {
					obj:null,
					flag:false, //用于判断是否第一次点击

					// 增加水波纹样式
					 water_ripple_style : function(){

						var str = '.ripple{\
							width:100px;\
							height:100px;\
							border-radius:50%;\
							background:'+this.obj.ripple_color+';\
							-webkit-transform:scale(0);\
							position:absolute;\
							opacity:1;\
						}\
						.ripple_effect{\
							-webkit-animation:ripple_drop '+this.obj.ripple_time+' linear;\
							animation:ripple_drop '+this.obj.ripple_time+' linear;\
						}\
						@-webkit-keyframes ripple_drop{\
							100%{\
								-webkit-transform:scale('+this.obj.ripple_scale+');\
								transform:scale('+this.obj.ripple_scale+');\
								opacity:0;\
							}\
						}';

						var style = $('<style>'+str+'</style>');
						$('head').append(style);

						// 设置自己相对定位
						this.obj.dom.css({
							position:'relative',
							overflow:'hidden'
						})
					},

					// 增加点击事件
					bind_click : function(e){

						this.obj.dom.find('.ripple').removeClass('ripple_effect');

						var data = this.base_data(e);

						if(!this.flag){

							this.water_ripple_style();

							this.obj.dom.prepend('<span class="ripple"></span>').find('.ripple').css({
								width:data.ripple_size,
								height:data.ripple_size,
								left:data.ripple_l+'px',
								top:data.ripple_t+'px'
							}).addClass('ripple_effect');
						}
						else{
							
							this.obj.dom.find('.ripple').css({
								left:data.ripple_l+'px',
								top:data.ripple_t+'px'
							}).addClass('ripple_effect');
						}

						this.flag = true;
					},

					// 获取点击时候的数据
					base_data : function(e){
						var ripple_size = this.obj.dom.width() > this.obj.dom.height() ? this.obj.dom.width() : this.obj.dom.height();

						var ripple_l = e.pageX - this.obj.dom.offset().left - ripple_size/2,
							ripple_t = e.pageY - this.obj.dom.offset().top - ripple_size/2;

						return {
							ripple_size : ripple_size,
							ripple_l : ripple_l,
							ripple_t : ripple_t
						}
					},

					// 初始化
					init:function(obj){
						var _this = this;
							this.obj = obj;
						this.obj.dom.on('click',function(e){
							_this.bind_click(e);
						})
					}


				};
