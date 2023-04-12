# gulululight(后端)
项目的名字为gulululight，想表达的是源源不断的灵感（类似话唠？🤔）。正好对应了项目的功能


## 项目简介

项目是采用react开发，是个人开发项目gulululight项目的后端部分，主要的功能是做一个基础的留言板功能，可以自己创建账号，用账号发表留言板的相关内容。



项目的前端地址指路👉 - <https://github.com/ZhiyingMar/gulululight>

## 安装要求

1.安装NodeJS
>[NodeJS安装](https://nodejs.org/zh-cn) v16.13.0  
>**Node的版本安装需要>=14**  

2.数据库mongodb账号申请，并且创建数据库(个人项目申请免费的就可以🌝)  
>[mongodb注册/登录](https://cloud.mongodb.com/)

3.设置专属于自己的密钥(不要分享给其他人🤫)


## 技术栈

express + jsonwebtoken + mongoose

## 项目运行

#### 依赖安装
`npm install`

#### 项目运行 
`PASSWORD=<mongodb数据库创建的账号密码> SECRET=<刚才设置的密钥> npm start`  
**在utils/config文件中可以直接替换mongoose复制的地址**  

项目在本地运行的时候可以创建.env文件报错密码和密钥，并且安装`nodemon`,可以使用命令:  
`npm run dev`


## 项目展示地址

 🌐 <https://zhiyingmar.github.io/gulululight/>

## 个人项目总结

### 项目难点

#### 1.password保存值的时候加密保存。

解决方式：  
使用 bcrypt对创建账号的密码进行加密处理
  
    const passwordHash = await bcrypt.hash(password, saltRounds);
    //...之后调用方法把这些保存到数据库中

#### 2.中间件的提取处理

解决方式：
把错误处理放到一个中间件方法当中

    //middleware文件
    // 问题处理
    const errorHandler=(err, req, res, next)=>{
        //...
        next(err)
    }   

在app.js引入`express-async-errors`,并且把中间件引入

    require('express-async-errors');
    //...
    app.use(middleware.errorHandler);


#### 3.前后端的跨域处理

解决方式：
使用已有方式cors库处理跨域的问题

    app.use(cors())






### 项目亮点

1.项目将错误处理进行集中的处理，简化了代码，能更好的进行之后的项目维护

2.将password进行加密处理使数据库存储的数据安全性提高

3.将用户的信息保存到传递的token当中，减少了传递的参数
