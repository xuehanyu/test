## 同源策略（浏览器的同源策略，）
同域：协议、域名、端口号相同

## 为什么浏览器不支持跨域
1、cookie、LocalStorage （http协议是无状态的，需要记录用户信息，服务器会给浏览器类似于sessionId之类的值用于标示用户身份，所以为了用户安全不能跨域）
2、DOM元素也有同源策略 iframe（iframe可以嵌套其他页面，同域可以操作元素，不同域名为了安全起见不允许跨域）
3、ajax 也不支持跨域

## 实现跨域（前端和后段分别放在不同服务器地址上，想通信）
- jsonp(只能发送get请求，不安全xss攻击)
- cors 存后端提供
- postMessage（两个页面之间通信）
- document.domain(子域和父域通信)
- window.name
- location.hash
- http-proxy (代理，所谓中间件，反向代理)
- nginx
- websocket
