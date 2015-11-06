<template>
  <div class="modal" v-show="show" transition="modal">
  <div class="modal-mask" @click="closeModal"></div>
  <div class="modal-container">
    <slot></slot>
  </div>
</div>
</template>

<style lang="sass">

@import "../sass/_variables";
@import "../sass/_extends";
@import "../sass/_mixins";

.modal{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity .3s ease;
}
.modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}

.modal-container {
  position:absolute;
    width: 90%;
    max-height:90%;
    overflow:auto;
    -webkit-overflow-scrolling:touch;
  z-index:2;
  top:50%;
  left:50%;
  transform:translate3d(-50%,-50%,0);
    transition: transform .3s ease;
    border-radius: 2px;
    background-color: #fff;
}

.modal-header {
  line-height:48px;
  text-align:center;
  background-color: $orange;
  h1{
    color:#fff;
    font-size:16px;
  }
}

.modal-body {
    padding: 0 16px 40px 16px;
    h2{
      padding:16px 0;
      text-align:center;
      font-size:15px;
    }
    p{
      color:$gray;
      line-height:1.5;
    }
}


/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter,
.modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    transform:translate3d(-50%,-50%,0) scale(1.1);
}

</style>


<script>
module.exports = {
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        close:{

        }
    },
    watch: {
        show:function(val, oldVal) {
            console.log(val)
            console.log(val)
            if(val == true){
                $('body,.router').addClass('no-scroll')
            }
            else{
                $('body,.router').removeClass('no-scroll')
            }
        }
    },
    methods:{
      closeModal:function(){
        if(this.close){
          this.show = false
        }
      },
      altalt:function(){
        alert(1)
      }
    }
}

</script>
