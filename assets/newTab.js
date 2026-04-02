// Internal links (to this site pages) → Open in same tab
// External links (X.com, other websites) → Open in new tab automatically
var mylinks = document.getElementsByTagName("a");

var i;
for (i=0; i < mylinks.length-1; i++) {
    var mylink = mylinks[i];
    if (!(mylink.href.includes(":4000/") || mylink.href.includes("//eri329.github.io/"))) {
        mylink.target="_blank";
        mylink.rel="noopener noreferrer";
    }
}

//js
// var aTagArr = [].slice.apply(document.getElementsByTagName("a"));

// aTagArr.forEach(function (e, i) {
//   e.href.indexOf("_blank") > -1 ? e.target = "_blank" : null;
// });
// 版权声明：本文为CSDN博主「sakulanbo」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/gao497278979/article/details/52089399