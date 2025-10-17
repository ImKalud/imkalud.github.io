## 前言摘要
起因是这样的 我在制作虫爱少女大礼包 里边有汉化与全CG存档        
但淫虫猎域并没有汉化补丁 于是我开始查询如何制作一个     
在本文章中如果有啥不懂的可以询问下Ai因为我肯定也不能写的面面俱到        
![alt text](/resource/articles/article21/image.png)  
之后我便在Being搜索了 搜到了这个Github项目与一个博客文章        
https://github.com/cqjjjzr/LCSELocalizationTools        
https://notes.sshwy.name/LCSE-rev-prog/     
然后我就开始了 过程具体不说 本篇内容较多为教程向 需要一定的电脑与编程知识基础       

## 初期的准备
1.文件准备 需要有ide(修改代码与转换文件)，winhex(查看Key值以解包)      
2.下载源代码 github上的项目 还有部分代码 之后将两个代码合并 这是合并后的效果图          
![alt text](/resource/articles/article21/image-1.png)
https://github.com/cqjjjzr/LCSELocalizationTools/files/9626995/snxutil.zip 这是转换文件的代码       
3.准备好你要解包的游戏本体

## 开始解包
1.将游戏文件中的lcsebody1与lcsebody1.lst 复制到单独的文件夹中 这个是由LC-Script引擎制作的游戏 所以有这个文件 这个文件会存储挺多的东西cg啥的        
2.搭建代码 环境 先用你的ide打开项目文件并且进行构建 我使用的是idea比较方面 如果遇到构建失败可以把报错代码给Ai然后自己修修      
3.用winhex打开lcsebody1.lst这个文件 并且看第一行有没有重复频繁出现的数字 我的这个KeyIndex的值便为02了       
4.之后开始解包游戏本体 打开LCSEPackageUtility项目并且修改变量 如图将keyIndex改为0202之类的 KeySnx先不管 那是解包游戏本体后的事情 然后编译将jar放到上文提到的文件夹下        
![alt text](/resource/articles/article21/image-2.png)
![alt text](/resource/articles/article21/image-3.png)       
5.因为作者没有制作图形化界面 所以要用命令行 这是我的命令行 参数的话可以查看github项目的文档 KeySnx为0是为了不影响后续KeySnx值的获取 下图是成功解包后的文件夹 还有些文件没有截图进  
```js        
java -jar .\LCSEPackageUtility-rv4.jar --unpack --list lcsebody1.lst --package lcsebody1 -s -d "输出解包文件的路径" --key 02 --key-snx 0        
pause       
```
![alt text](/resource/articles/article21/image-4.png)       
6.现在要开始获取KeySnx的值了 也如同KeyIndex值一样 随便打开个snx文件并查看 这里很多03值 说明这个KeySnx值就为03了 然后打开ide在修改变量重新编译 命令行也要把0改成03 这样比较保险      
![alt text](/resource/articles/article21/image-5.png)       
7.然后重新解包并且用winhex打开snx文件查看 如果很多都是00值则说明解包成功了 下一步就是转换snx文件为po文件了      
8.打开ide修改文件路径分别为输出与输入的路径 上边两个为你解包后snx文件存储位置 下边两个为转换后存储的位置    
![alt text](/resource/articles/article21/image-6.png)       
9.检测文件转换与解包是否成功 下面为部分文件的截图与打开的截图 事以至此就解包成功了 其他的文件我没有尝试 感兴趣的可以看看github的参数列表       
![alt text](/resource/articles/article21/image-7.png)       
![alt text](/resource/articles/article21/image-8.png)       
## 汉化过程
1.找ds随便写了个脚本调用有道翻译的API翻译的 原本想要ai如gork但文本量比较大就挺麻烦的 但不过做的挺烂的 但懒得管了        
![alt text](/resource/articles/article21/image-10.png)      

## 开始封包
1.汉化完后先将汉化好的po文件转换成snx在通过命令行与参数进行封包 第一个路径为汉化完po存放的路径 第二个为转换前snx的文件路径 第三个则为要用工具将po转换后snx的路径        
![alt text](/resource/articles/article21/image-9.png)       
2.进行封包 参数也可以看GitHub上的参数讲解 第一个路径为转换后snx的路径 第二个则是封包后路径存放的位置 在封包后将生成后的文件替换在游戏中原文件位置就行了        
```js 
java -jar .\LCSEPackageUtility-rv4.jar --patch --patch-dir "C:\Users\ImKalud\Desktop\Crack\in" --list lcsebody1.lst --package lcsebody1 -s -d "C:\Users\ImKalud\Desktop\Crack\mid" --key 02 --key-snx 03        
pause       
```

3.这时候你完成了一切 迫切的打开了游戏 结果发现了一堆乱码 这时候要开始逆向了。。。       
![alt text](/resource/articles/article21/a9c40e3d97688557a095972ae8daa79a.png)      

## 死亡逆向     
1.就很头疼哈 我以前是压根没有接触逆向与汇编相关的内容的 还好有前人先探过路      
