mui.init();
var table = document.body.querySelector('#city_list');
// 记录当前页面为城市页面还是省页面
var page_status = 'province';
// 遍历所有省
for (var i = 0; i < cityData3.length; i++) {
	var li = document.createElement('button');
	li.className = 'mui-col-xs-3';
	li.id = 'province' + i;
	li.value = cityData3[i].text;
	li.innerHTML = cityData3[i].text;
	table.appendChild(li);
	findProvince(cityData3[i].children, i, cityData3[i].text);
}

/**
 * 绑定省市点击事件，并遍历出省市的所有城市
 * @param {Object} children
 * @param {Object} i
 */
function findProvince(children, i, provinceName) {
	var pdoc = document.getElementById('province' + i);
	pdoc.addEventListener('tap', function() {
		console.info(111);
		document.getElementById("city_list").innerHTML = "";
		if (children.length != 0) {
			for (var j = 0; j < children.length; j++) {
				var li = document.createElement('button');
				li.className = 'mui-col-xs-6';
				li.id = 'city' + j;
				li.value = children[j].text;
				li.innerHTML = children[j].text;
				table.appendChild(li);
				if (children[j].children != '[]') {
					findCity(j, children[j].children, provinceName, children[j].text);
				}
			}
		}
	}, false);
}

/**
 * 绑定城市点击事件，并遍历出城市所有区的信息
 * @param {Object} children
 * @param {Object} i
 */
function findCity(i, city, provinceName, cityName) {
	page_status = "city";
	var doc = document.getElementById('city' + i);
	doc.addEventListener('tap', function() {
		if (city != undefined) {
			document.getElementById("city_list").innerHTML = "";
			for (var j = 0; j < city.length; j++) {
				var li = document.createElement('button');
				li.className = 'mui-col-xs-6';
				li.id = 'area' + j;
				li.value = city[j].text;
				li.innerHTML = city[j].text;
				table.appendChild(li);
				findArea(provinceName, cityName, j);
			}
		} else {
			mui.plusReady(function() {
				var value = plus.webview.currentWebview().pageId;
				var c8 = plus.webview.currentWebview().c8;
				var c3 = plus.webview.currentWebview().c3;
				var c7 = plus.webview.currentWebview().c7;
				var c9 = plus.webview.currentWebview().c9;
				if (c8 == '') {
					var id = plus.webview.getWebviewById(value);
					mui.fire(id, 'pick1', {
						c8: doc.value, // 市
						c6: provinceName, // 省
						c2: '',
						c3: c3,
						c7: c7,
						c9: c9
					})
				} else {
					var id = plus.webview.getWebviewById(value);
					mui.fire(id, 'pick1', {
						c9: doc.value, // 市
						c7: provinceName, // 省
						c3: ''
					})
				}
				mui.back();
			})
		}
	});
}

/**
 * 绑定区的点击事件
 */
function findArea(province, city, i) {
	page_status = "area";
	var area = document.getElementById('area' + i);
	area.addEventListener('tap', function() {
		mui.plusReady(function() {
			var value = plus.webview.currentWebview().pageId;
			var c8 = plus.webview.currentWebview().c8;
			var c3 = plus.webview.currentWebview().c3;
			var c7 = plus.webview.currentWebview().c7;
			var c9 = plus.webview.currentWebview().c9;
			if (c8 == '') {
				var id = plus.webview.getWebviewById(value);
				mui.fire(id, 'pick1', {
					c8: city, // 市
					c6: province, // 省
					c2: area.value, // 区
					c3: c3,
					c7: c7,
					c9: c9
				})
			} else {
				var id = plus.webview.getWebviewById(value);
				mui.fire(id, 'pick1', {
					c7: province, // 省
					c3: city, // 区
					c9: area.value,
				})
			}
			mui.back();
		})
	})
}

/**
 * 返回键处理
 */
document.getElementById("city_select").addEventListener('tap', function() {
	if (page_status == 'province') {
		mui.back();
	} else if (page_status == 'city') {
		document.getElementById("city_select").addEventListener('tap', function() {
			page_status = "province";
			document.getElementById("city_list").innerHTML = "";
			for (var i = 0; i < cityData3.length; i++) {
				var li = document.createElement('button');
				li.className = 'mui-col-xs-3';
				li.id = 'province' + i;
				li.value = cityData3[i].text;
				li.innerHTML = cityData3[i].text;
				table.appendChild(li);
				findProvince(cityData3[i].children, i, cityData3[i].text);
			}
		})
	} else if (page_status == 'area') {
		page_status = "city";
		document.getElementById("city_list").innerHTML = "";
		for (var i = 0; i < cityData3.length; i++) {
			var li = document.createElement('button');
			li.className = 'mui-col-xs-3';
			li.id = 'province' + i;
			li.value = cityData3[i].text;
			li.innerHTML = cityData3[i].text;
			table.appendChild(li);
			findProvince(cityData3[i].children, i, cityData3[i].text);
		}
	}
});
