mui.init();
var pageId;
var send_area = document.getElementById('send_area');
var send_area_text = document.getElementById('send_area_text');
mui.plusReady(function() {
	// 获取当前页面pageId
	pageId = plus.webview.currentWebview().id;
	var start_address = '';
	var end_address = '';

	var c2 = ''; //发货区位置
	var c6 = ''; //发货省份
	var c8 = ''; //发货市位置


	//获取MapMain传过来的值
	/**
	 * 发货位置
	 */
	send_area.addEventListener('tap', function(event) {
		//创建弹窗
		var webView = mui.openWindow({
			url: '../city_pick/city_pick.html',
			id: 'city_pick',
			styles: {
				height: '510px',
				bottom: '0%',
			},
			extras: {
				c8: '',
				pageId: pageId,
				c6: '',
				c2: '',
			},
			show: {
				aniShow: 'slide-in-bottom'
			}
		});
		//创建蒙版
		var mask = mui.createMask(function() {
			webView.close();
		});
		mask.show();
		document.addEventListener('pick1', function(event) {
			// 数据都在event.detail里面
			var city1 = event.detail.c8;
			var province = event.detail.c6;
			var area = event.detail.c2;
			c8 = city1;
			if (city1 != undefined) {
				send_area_text.value = province + city1 + area;
			}
			mask.close();
		});
	}, false);

	plus.geolocation.getCurrentPosition(function(position) {
		longitude = position.coords.longitude;
		latitude = position.coords.latitude;
		CarAddress = position.address.province + position.address.city + position.address.district;
		console.log("longitude:" + longitude + "latitude:" + latitude + "CarAddress:" + CarAddress);
		send_area_text.value = position.address.province + position.address.city;
		c8 = position.address.city;
	});
})
