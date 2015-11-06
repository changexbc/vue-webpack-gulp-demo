<template>
  <div class="page-car-edit">
  <div class="card" v-if="$route.params.regDate">
    <section class="card-item">
      <p>车牌号</p>
      <div class="edit-license">{{$route.params.license}}</div>
    </section>
  </div>
  <div class="card">
    <section class="card-item">
      <p class="edit-regdate" @click="modalExample">车辆注册日期</p>
      <div class="picker-wrap">
        <input v-mobiscroll-date="regDate" v-model="regDate">
      </div>
    </section>
    <section class="card-item">
      <p>伤亡事故</p>
      <div class="picker-wrap">
        <select v-mobiscroll-select="injured" v-model="injured">
          <option v-for="option in injuredOption" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </section>
  </div>

  <div class="edit-save">
    <a @click="goIndex">
      <span v-if="!$route.params.regDate">开始查询</span>
      <span v-if="$route.params.regDate">保存</span>
    </a>
  </div>

  <modal
   class="modal-rule"
   :show.sync="showModal"
   :close="maskClose ">
    <div class="modal-img"></div>
  </modal>
</div>

</template>

<script>
require('../libs/mobiscroll/mobiscroll')
var convertParams = require('../libs/utils/utils').convertParams
var convertRequestURL = require('../libs/utils/utils').convertRequestURL
// var setFirstRouter = require('../libs/utils/utils').setFirstRouter
var storage = require('../libs/utils/storage')

export default {
    data: function() {
        return {
            regDate: '未选择',
            injured: '未选择',
            injuredOption: [{
                text: '未选择',
                value: '未选择'
            }, {
                text: '没有发生过',
                value: '没有发生过'
            }, {
                text: '发生过',
                value: '发生过'
            }],
            showModal:false,
            maskClose:true
        }
    },
    ready:function(){
        // setFirstRouter(this.$route)
    },
    computed:{
        hasAccident:function(){
            if(this.injured == '未选择'){
                return ''
            }
            if(this.injured == '没有发生过'){
                return false
            }
            if(this.injured == '发生过'){
                return true
            }
        }
    },
    route: {
        data: function(transition) {
            var params = transition.to.params
            if (!params.regDate) {
                return
            }

            function injured2text(val) {
                if (val == 'N') {
                    return '没有发生过'
                }
                else if(val == 'Y') {
                    return '发生过'
                }
                else{
                    return '未选择'
                }
            }
            transition.next({
                regDate: params.regDate,
                injured: injured2text(params.injured)
            })
            console.log(params)
        }
    },
    methods: {
        goIndex: function() {
            if(this.regDate == '未选择'){
                Daze.showMsg('请选择车辆注册日期')
                return
            }
            else if(this.injured == '未选择'){
                Daze.showMsg('请选择是否发生伤亡事故')
                return
            }
            var self = this
            var router = self.$route.router;
            router.go({
                name: 'index'
            });
        },
        modalExample:function(){
            this.showModal=true
            this.maskClose=true
        }
    },
    directives: {
        mobiscrollDate: require('../directives/directive-mobiscroll').date,
        mobiscrollSelect: require('../directives/directive-mobiscroll').select,
    },
    components:{
        modal:require('../components/Modal.vue')
    }
}

</script>

<style lang="sass">
@import "../sass/variables";
@import "../sass/extends";
@import "../sass/mixins";

.page-car-edit{
  color:$gray;
  .card-item{
    padding:0;
    margin:0 15px;
  }
  .picker-wrap{
    flex:1;
    position:relative;
    select,input{
      width:100%;
      box-sizing:border-box;
      padding:20px 15px;
      color:$orange;
      background-color: #fff;
      text-align:right;
    }
    &:before{
      content:'';
      position:absolute;
      right:0px;
      top:50%;
      margin-top:-6px;
      @include triangle(12px,$orange,right)
    }
    &:after{
      content:'';
      position:absolute;
      right:3px;
      top:50%;
      margin-top:-6px;
      @include triangle(12px,#fff,right)
    }
  }
}
.edit-save{
  padding:24px 15px;
  a{
    display:block;
    font-size:16px;
    font-weight:bold;
    color:#fff;
    background-color: $orange;
    padding:12px 0;
    text-align:center;
    border-radius:2px;
    &:active{
      background-color: darken($orange,10%);
    }
  }
}
.edit-license{
  padding:20px 15px;
}
.edit-regdate{
  position:relative;
  padding: 20px 22px 20px 0;
  &:after{
    content:'';
    background: url('../images/tip.png') center center no-repeat;
    background-size:18px 18px;
    width:18px;
    height:18px;
    position:absolute;
    right:0px;
    top:50%;
    margin:-9px 0 0 0;
  }
}
.modal-img{
  display:inline-block;
  margin:0 auto;
  width:100%;
  padding-top:64%;
  background: url('../images/regexp.jpg') center center no-repeat;
  background-size:100% 100%;
}
</style>
