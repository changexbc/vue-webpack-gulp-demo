<template>
  <router-view class="router" transition="router" transition-mode="out-in"></router-view>
</template>

<style lang="sass">

@import "../sass/_variables";
@import "../sass/_reset";
@import "../sass/_extends";
@import "../sass/_mixins";

html,body{
  height:100%;
}
body{
  position:relative;
}
.router {
  position:absolute;
  width:100%;
  height:100%;
  overflow:auto;
    -webkit-overflow-scrolling: touch;
  box-sizing:border-box;
  top:0;
  left:0;
  transition: all .3s ease;
  &.no-scroll{
    overflow:hidden;
  }
}
.router-enter, .router-leave {
  opacity: 0;
  transform: scale(.95);
}
.loading{
    @extend %loading;
}
.loading__icon{
    @extend %loading__icon;
}

.card{
  margin-top:15px;
  background-color: #fff;
}
.card-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:20px 0;
  margin:0 10px;
  border-bottom:1px solid $grayLight;
  &:last-child{
    border-bottom:none;
  }
}

</style>
