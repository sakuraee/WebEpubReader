<template>
  <div class="ebook">
    <transition name="slide-down">
    <div class="title-wrapper" v-show="ifTitleAndMenuShow">
      <div class="left">
        <span class="iconfont icon-arrow-left-bold"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="iconfont icon-gouwuche" ></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon-gengduo-shuxiang"></span>
        </div>
        <input type="file"  @input="test($event.target.files[0])" >
      </div>
    </div>
    </transition>
    <div class="read-wrapper">
      <div id="read"></div> 
      <div class="mask">
          <div class="left" @click="prevPage"></div>
          <div class="center" @click="ToggleTitleAndMenu">
            
          </div>
          <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <transition name="slide-up">
    <div class="menu-wrapper" v-show="ifTitleAndMenuShow"
    :class="{'hide-box-shadow':ifSetFontShow}">
      <div class="icon-wrapper">
        <span class="iconfont icon-danlieliebiao" @click="contentShow()"></span>
      </div>
      <div class="icon-wrapper">
        <span class="iconfont icon-shangchuandaochu" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="iconfont icon-liangdu" @click="showSetting(1)"></span>
      </div>
      <div class="icon-wrapper" @click="showSetting(0)">
        <span class="iconfont icon-a">A</span>
      </div>
    </div>
    </transition>
    <transition name="slide-right">

      <div class="Content" v-if="IfContentShow && contentAvailable" >
      <div class="text" v-for="(item,index) in navigation" :key="index" @click="jumpTo(item.href)" >{{item.label}}</div>
      </div>
    </transition>
    <transition name="slide-up">
    <div class="setting-wrapper" v-show="ifSetFontShow && contentAvailable">

      <div class="setting-font-size" v-if="showTag === 0">
        <div class="preview" :style="{'fontSize':fontSizeList[0].fontSize+'px'}">A</div>
         <div class="select-wrapper" v-for="item in fontSizeList" @click="setFontSize(item.fontSize)">
        <div class="line" v-show="item.showno"></div>
        <div class="point-wrapper">
          <div class="point" v-show="defaultFont === item.fontSize">
          <div class="small-point">

          </div>
          </div>
        </div>
        <div class="line" v-show="item.shown"></div>
      </div>

       <div class="preview" :style="{'fontSize':fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
      
      
      
      
      </div>
      <div class="setting-theme" v-else-if=" showTag === 1" v-for="(item,index) in themeList" :key="index" @click="setTheme(item.name)">
        <div class="setting-theme-item">
          <div class="preview" :style="{background : item.style.body.background}" :class="{'no-border' : item.style.body.background!== '#fff'}"></div>
          <div class="text" :class="{'selected': item.name == defaultTheme}" >{{item.name}}</div>
        </div>
      </div>
      <div class="setting-location" v-if="showTag === 3 ">
        <div class="progress-wrapper">
          <input type="range" class="progress"
          max="100" min="0" step="1" @change="onProgressChange($event.target.value)" @input="onInputChange($event.target.value)"
          :value="progress" :disale = "!bookAvailable" ref="progress">
          <div class="text">
            {{progressText}}
        </div>
        </div>
        
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import Epub from 'epubjs'
import { resolve } from 'path';
const DOWNLOAD_URL = '/myreader/static/book1.epub'
//const DOWNLOAD_URL = '/static/book1.epub'
export default {
   data()
   {
     return {
       temp: 0,
     book : {},
     rendition:{},
     filename:"",
     navigation: {} ,
     IfContentShow : false,
     auto:0,
     speed : 5,
     progressText: " 加载中...... ",
     progress: 0 ,
     contentAvailable: false,
     bookAvailable : false,
     showTag: 0 ,
     defaultFont : 18 ,
     defaultTheme: 'default',
     themeList:[
       {
         name : "default",
         style : {
           body:{
             'color' : '#000','background':'#fff'
           }
         }
       },
       {
         name : "eye",
         style : {
           body:{
             'color' : '#000','background':'#ceeeba'
           }
         }
       },
       {
         name : "night",
         style : {
           body:{
             'color' : 'rgb(255,255,255)','background':'rgb(0,0,0)'
           }
         }
       },
       {
         name : "gold",
         style : {
           body:{
             'color' : '#000','background':'rgb(241,236,226)'
           }
         }
       },
     ],
     fontSizeList:[
       {fontSize : 12,showno:false,shown:true},
       {fontSize : 14,showno:true,shown:true},
       {fontSize : 16,showno:true,shown:true},
       {fontSize : 18,showno:true,shown:true},
       {fontSize : 20,showno:true,shown:true},
       {fontSize : 22,showno:true,shown:true},
       {fontSize : 24,showno:true,shown:false},
     ],
     ifTitleAndMenuShow: false,
     ifSetFontShow : false
   };

 },
  methods: {
    contentShow(){
      this.IfContentShow = !this.IfContentShow
    },
    jumpTo(href){
      this.rendition.display(+href)
      console.log(href)
    },
    autoRead(){
      const timer = setInterval(()=>{
      // if(this.auto==1)
	    this.rendition.next();
      if(auto == 0)
      clearInterval(timer);
      }, this.speed*1000) 
    },
    onInputChange(th){
      this.progress = th
      this.progressText = this.progress +"%"
    },
    onProgressChange(progress){
      const precentage = progress/100
      const locations = precentage > 0 ? this.locations.cfiFromPercentage(precentage) : 0
      this.rendition.display(locations)
    },
    setTheme(the){
      this.defaultTheme = the;
      this.themes.select(this.defaultTheme)
      console.log(this.defaultTheme)
    },
    showSetting(tag){
        if(tag===this.showTag){
        this.ifSetFontShow = ! this.ifSetFontShow;
        return 
        }
        this.showTag = tag;
        if(!this.ifSetFontShow)
        this.ifSetFontShow = ! this.ifSetFontShow;
    },
    registerTheme(){
        this.themeList.forEach(theme=>{
          this.themes.register(theme.name , theme.style)
          console.log(theme)
        })
    },
    ToggleTitleAndMenu(){
        this.ifTitleAndMenuShow = ! this.ifTitleAndMenuShow;
        this.$set(this,'ifSetFontShow',false);
        this.$set(this,'IfContentShow',false);
    },
    ToggleFontSetting(){
        this.ifSetFontShow = ! this.ifSetFontShow
    },
    test(event){
    var fileread = new FileReader();
    this.book.destroy()
    new Promise(()=>{
      fileread.readAsArrayBuffer(event);
      const newbook = new Epub();
      
      fileread.onload = (e)=>{
       newbook.open(e.target.result)
       this.book = newbook
       this.rendition  = this.book.renderTo("read",{
         widht : window.innerWidth,
         height : window.innerHeight
       })
       this.rendition.display()
       this.themes = this.rendition.themes
          this.themes.fontSize(this.defaultFont + 'px')
          this.registerTheme()
          this.book.ready.then(()=>{
              
              this.contentAvailable = true       
              return this.book.locations.generate()
          }).then(result =>{
              this.locations = this.book.locations
              this.bookAvailable = true;
              this.navigation = this.book.navigation.toc
              console.log(this.navigation)
              
              this.progressText = "0%";
              
          })

      }
      resolve()
    }).then(()=>{
      console.log(123123)
    })
    

    },
      prevPage(){
        if(this.rendition){
          this.rendition.prev()
        }
        
      },
      nextPage(){
        if(this.rendition){
          this.rendition.next()
          console.log(this.book)
          console.log(123)
        }
      },
      setFontSize(fontSize)
      {
        this.defaultFont = fontSize
        this.themes.fontSize(this.defaultFont + 'px')
      },
      showEpub(){
          this.book = new Epub(DOWNLOAD_URL)
          
          this.rendition = this.book.renderTo('read',{
          widht : window.innerWidth,
          height : window.innerHeight
          })
           
          this.rendition.display();
          this.themes = this.rendition.themes
          this.themes.fontSize(this.defaultFont + 'px')
          this.registerTheme()
          this.book.ready.then(()=>{
              
              this.contentAvailable = true       
              return this.book.locations.generate()
          }).then(result =>{
              this.locations = this.book.locations
              this.bookAvailable = true;
              this.navigation = this.book.navigation.toc
              console.log(this.navigation)
              
              this.progressText = "0%";
              
          })
      }
  
  },

  mounted(){
      this.showEpub();
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global';
.ebook{
  .setting-wrapper{
    position: absolute;
    bottom: 1.4rem;
    left: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    height: 1.2rem;
    background-color: white;
    box-shadow: 0 -8px 8px rgba(0,0,0,.15);
    .setting-font-size{
        width: 100%;
        display: flex;
        
       .preview{
         @include center;
         flex : 0 0 1.1rem ;
       }
       .select-wrapper{
         @include center;
         flex:1;
         
         
         .line{
           flex:1;
           height: 0;;
           border-top: 0.03px solid #ccc;
         }

         .point-wrapper{
           position: relative;
           flex: 0 0 0 ;
           width: 0;
           height: 0.2rem;
           border-left: 0.03px solid #ccc;
           .point{
             position: absolute;
             top: -0.2rem;
             left: -0.35rem;
             width: 0.5rem;
             height: 0.5rem;
             border-radius: 50%;
             background-color: white;
             border: 2px;
             box-shadow: 0 4px 4px rgba(0,0,0,.15);
             .small-point{
                position: absolute;
                top: 35%;
                left: 33%;
                width :0.15rem;
                height: 0.15rem;
                background-color: black;
                border-radius: 50%;
             }
           }
         }
       }
    }
    .setting-theme{
        width :100%;
        display: flex;
      .setting-theme-item{
        flex : 1;
        display: flex;
        flex-direction: column;
        margin: 0.1rem;
        .preview{
          flex : 1;
          border: 1px solid #ccc;
        }
        .no-border{
          border: none
        }
        .text{
          @include center;
          flex : 0 0 0.5rem;
          font-size: 16px;
          color: #ccc;
          &.selected{
            color : #333;
          }
        }
      }
    }
    .setting-location{
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper{
        width: 100%;
        height: 100%;
        @include center;
        padding : 0 0.8rem;
        box-sizing :border-box;
        display: flex;
        flex-direction: column;
        .progress{
          width: 100%;
          height: 3px;
          background : -webkit-linear-gradient(#999,#999) no-repeat, #ccc;
          background-size: 0 100%;
          &:foucus{
            outline: none;
          }
        }
        .text{
          margin-top: 5px;
          font-size: 20px;
        }
      }
    }
  }
  .slide-right-enter,.slide-right-leave-to{
    transform: translate3d(-100%,0,0);
  }
  .slide-right-leave,.slide-right-enter-to{
    transform: translate3d(0,0,0);
  }
  .slide-right-enter-active , .slide-right-leave-active{
   transition: all .2s linear;  
  }
  
  .Content{
    z-index: 100;
    position:absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 30%;
    box-shadow: 8px 0 8px rgba(0,0,0,.15);
    background-color: white;
    .text{
      
      font-size: 20px;
      height: 20px;
      margin-top: 3px;
    }
  }
  .slide-up-enter , .slide-up-leave-to{
    transform: translate3d(0,2.6rem,0);
  }
  .slide-up-enter-to,.slide-up-leave{
    transform: translate3d(0,0,0);
  }
  .slide-up-enter-active , .slide-up-leave-active{
   transition: all .2s linear;  
  }
  .slide-down-enter,.slide-down-leave-to{
    transform: translate3d(0,-100%,0);
  }
  .slide-down-enter-to,.slide-down-leave{
    transform: translate3d(0,0,0);
  }
  .slide-down-enter-active,.slide-down-leave-active{
    transition: all .2s linear;
  }
  .menu-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    height: 1.4rem;
    background-color: white;
    box-shadow: 0 -8px 8px rgba(0,0,0,.15);
    &hide-box-shadow{
      box-shadow: none;
    }
    .icon-wrapper{
      flex : 1;
      @include center;
    }
  }
  .title-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    height: 1.4rem;
    background-color: white;
    box-shadow: 0 8px 8px rgba(0,0,0,.15);
    .left{
      flex : 0 0 0.5rem;
      @include center;
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper{
        flex : 0 0 1rem;
        @include center;
        margin-left: .3rem;
      }
    }
  }
  position: relative;
  .read-wrapper{
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      display: flex;
      .left{
       flex: 0 0 1rem
      }
      .center{
        flex: 1
      }
      .right{
       flex: 0 0 1rem
      }
    }

  }
}
</style>
