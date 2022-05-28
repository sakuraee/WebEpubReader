<template>
    <div>
    <transition name="slide-down">
    <div class="title-wrapper" v-show="ifTitleAndMenuShow">
      <div class="left">
        <span class="iconfont icon-arrow-left-bold"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="iconfont icon-gouwuche"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon-gengduo-shuxiang"></span>
        </div>
      </div>
    </div>
    </transition>
    </div>
</template>

<script>
export default{
    data(){
        return{
            ifTitleAndMenuShow : false 
    }
}
}
</script>

<style lang="'scss" scoped>
@import '../assets/styles/global';
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
</style>