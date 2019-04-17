# 常用指令

* `ionic start app-name blank/tabs/sidemenu`
	* 创建一个ionic项目，空的/带有标签页/带有侧边栏。
* `npm/cnpm install`
	* 安装依赖的node包，注意最好选择淘宝镜像，或者直接使用cnpm
* `ionic build`
	* 构建项目
* `ionic serve`
	* 启动项目，完成后会自动打开浏览器
* `ionic capacitor add android`
	* 安装Android平台的支持
* `ionic cordova build android`
	* 构建项目的APK

生成APK后还不能直接安装，因为未签名。

* `keytool -genkey -alias [alias_name] -keyalg RSA -validity 40000 -keystore [keystore_name]`
	* 生成密钥
	* 要求填写口令时，口令内容是不显示的。
	* `genkey`：生成密钥
	* `-alias [alias_name]`：设置密钥的别名
	* `-keyalg RSA`：使用RSA算法对签名加密
	* `-validity 4000`：设置密钥的有效期为4000天
	* `-keystore [keystore_name]`：设置密钥库的别名，最好与之前的别名相同
* `jarsigner -verbose -keystore [keystore_name] -signedjar [signed_apk_name] [apk_name] [alias_name]`
	* 给要发布的APK签名。
	* `-verbose`：输出签名的详细信息
	* `-keystore  [keystore_name]`：密钥库名称，实际上是全路径
	* `-signedjar [signed_apk_name]`：签名后的APK文件名
	* `[apk_name] [alias_name]`:要签名的APK文件名，以及密钥的别名，实际上是全路径。

也可以在构建过程中自动添加签名，方法如下：  
在platforms\android目录新建名为release-signing.properties的文件，文件内容如下：

```
storeFile=path/to/keystore
keyAlias=your key aliasstore
Password=your store passwordkey
Password=your key password
```

使用`ionic build --release android`构建后，文件即是已签名的安装包。

# 问题解决

## 下载sass库超时

依次执行下面三个指令：
	
* `npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/`
* `npm uninstall node-sass`
* `npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`

也可以在项目根目录添加文件`.npmrc`：

```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```

## 构建项目APK中出错：requirements check failed for jdk 1.8

检查以下系统环境变量是否已经妥善配置：

* `JAVA_HOME`
* `ANDROID_HOME`
* `GRADE_HOME`
* 相关的`PATH`环境变量

创建新的用户环境变量，然后：

* 指定`JAVA_HOME`为jdk1.8
* 添加用户环境变量对应的`bin`地址到`PATH`系统环境变量，注意不要引用`%JAVA_HOME%`，直接使用绝对地址
