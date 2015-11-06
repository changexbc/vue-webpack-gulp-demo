<style lang="sass">

@import "../sass/variables";
@import "../sass/extends";
@import "../sass/mixins";

.page-index{
  padding:0 8px 0px 8px;
}
.index-no-data{
  text-align:center;
  padding-top:48px;
  .no-data-img{
    display:inline-block;
    width:128px;
    height:128px;
    background: url('../images/noData.png') center center no-repeat;
    background-size:128px 128px;
  }
  p{
    color:#cccccc;
    padding-top:24px;
  }
}
.car-license{
  font-size:16px;
  font-weight:bold;
}
.car-complement{
  color:$orange;
}
.car-info{
  color:$gray;

}
.car-edit{
  display:block;
  width:30px;
  height:30px;
  background: url(../images/icon-edit.png) no-repeat center center;
  background-size: 16px 16px;
}
.car-inspection{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.inspection-info{
  position:relative;
  width:206px;
  height:206px;
  background: url(../images/circle.png) no-repeat 0px center;
  background-size:200px  auto;
}
.inspection-info-inner{
  text-align:center;
  position:absolute;
  width:100%;
  top:50%;
  left:50%;
  transform:translate3d(-50%,-50%,0)
}
.inspection-days{
  h1{
    display:inline-block;
    font-size:60px;
    color:$orange;
    text-align:center;
    position:relative;
    i{
      position:absolute;
      left:100%;
      bottom:6px;
      font-size:14px;
      white-space: nowrap;
      color:$textColor;
    }
  }
}
.inspection-text{
  padding:22px 0 10px 0;
}
.inspection-status{
  span{
    display:inline-block;
    color:#fff;
    background-color: #32a597;
    border-radius:10px;
    padding:5px 10px;
  }
}
.inspection-last{
  display:block;
  padding-top:10px;
  padding-bottom:10px;
}
.inspection-last__item{
  display:flex;
  justify-content:space-between;
  padding:4px 0;

}
.inspection-time{
  color:$gray;
  margin-top:0;
  .card-item:first-child{
    border-top:1px solid $grayLight;
  }
}
.index-tips{
  color:#cccccc;
  padding:15px 0;
  text-align:center;
}
.inspection-type{
  font-size:12px;
  position:relative;
  padding-right:22px;

}
.inspection-type:after{
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
.inspection-help{
  padding-top:16px;
  padding-bottom:16px;
  .link{
    flex:1;
    padding:16px 0;
    display:block;
    background-color: $orange;
    font-size:16px;
    color:#fff;
    text-align:center;
    border-radius:3px;
    &:active{
      background-color: darken($orange,10%);
    }
  }
}
</style>
<template>
  <div class="page-index">
  <div class="index-no-data" v-if="noData">
    <span class="no-data-img"></span>
    <p>车库中空空如也～</p>
    <p class="index-tips">请在违章查询中添加车辆</p>
  </div>
  <div class="index-content" v-if="!noData">
    <div class="car" v-for='car in car_info'>
      <div class="card" v-if="!car.regDate">
        <a class="card-item" v-link="{
          name:'car-complete',
          params:{
            license:encodeURI(car.vehicleNum),
          }
        }">
          <h1 class="car-license">{{car.vehicleNum}}</h1>
          <span class="car-complement">补全车辆信息</span>
        </a>
        <section class="card-item">
          <p class="car-info">年检信息无法获取</p>
        </section>
      </div>
      <template v-if="car.regDate">
        <div class="card">
          <a class="card-item"
            v-link="{
              name:'car-edit',
              params:{
                license:encodeURI(car.vehicleNum),
                regDate:car.regDate,
                injured:car.accident||'未选择'
              }
            }">
            <h1 class="car-license">{{car.vehicleNum}}</h1>
            <span class="car-edit"></span>
          </a>
          <section class="card-item">
            <div class="car-inspection">
              <div class="inspection-info">
                <div class="inspection-info-inner">
                  <div class="inspection-days"><h1>{{car.diff_time}} <i>{{car.time_unit}}</i></h1></div>
                  <p class="inspection-text">{{car.time_status | time2text}}</p>
                  <div class="inspection-status"><span>{{car.time_status | time2status}}</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="card inspection-time">
          <template v-if="car.time_status == 'end'">
            <section class="card-item">
              <p>年检时间</p>
              <p>{{car.inspection_min_time}} 到 {{car.inspection_max_time}}</p>
            </section>
            <section class="card-item" @click="modalRule">
              <p>年检方式</p>
              <p class="inspection-type">{{car.inspection_type}}</p>
            </section>
            <section class="card-item inspection-help" @click="goInspection">
              <span class="link">年检代办 VIP一对一服务</span>
            </section>
          </template>
          <template v-if="car.time_status == 'start'">
            <section class="card-item">
              <p>上次年检</p>
              <p>{{car.last_inspection_min_time}} 到 {{car.last_inspection_max_time}}</p>
            </section>
            <section class="card-item inspection-last">
              <div class="inspection-last__item">
                <p>下次年检</p>
                <p>{{car.inspection_min_time}} 到 {{car.inspection_max_time}}</p>
              </div>
              <div class="inspection-last__item" @click="modalRule">
                <p>年检方式</p>
                <p class="inspection-type">{{car.inspection_type}}</p>
              </div>
            </section>
            <section class="card-item inspection-help" v-if="car.time_unit == '天'" @click="goInspection">
              <span class="link">年检代办 VIP一对一服务</span>
            </section>
          </template>
        </div>
      </template>
    </div>
  </div>
  <modal class="modal-rule" :show.sync="showModal" :close="maskClose">
    <div class="modal-header">
        <h1>年检方式</h1>
    </div>
    <div class="modal-body">
        <h2>上线验车</h2>
        <p>全称机动车安全技术检验,需要开车前往车辆检测点进行完整的车辆检验</p>
        <h2>免检验车</h2>
        <p>6年以内的非营运轿车和其他小型、微型载客汽车（面包车、7座及7座以上车辆除外）免除上线验车。在此期间，每2年提供交强险凭证、车船税纳税或免征证明后，直接向公安交管部门申领检验标志。</p>
    </div>
  </modal>
</div>

</template>

<script>
import moment from 'moment'
import utils from '../libs/utils/utils'
import storage from '../libs/utils/storage'

const convertParams = utils.convertParams
var convertRequestURL = require('../libs/utils/utils').convertRequestURL
// const setFirstRouter = utils.setFirstRouter
const getQueryString = utils.getQueryString
const showLoading = utils.showLoading
const hideLoading = utils.hideLoading

export default {
    data: function() {
        return {
            car_info: [],
            showModal:false,
            maskClose:true,
            noData:false,
        }
    },
    ready:function(){
        // setFirstRouter(this.$route)
    },
    route: {
        data: function(transition) {
            showLoading()
          $.ajax({
                type:"get",
                url:'src/data/query.json',
                // url:convertRequestURL('searchNianJian/query.htm'),
                data:convertParams({
                    // uid: 9312,
                    // userId: 5123753
                    uid: storage.getUid(),
                    userId: storage.getUserId()
                }),
                dataType:"json",
                success:function(resp){
                    hideLoading()
                    resp = resp.data.list
                    if(resp.length == 0){
                        transition.next({
                          noData: true
                        })
                        return
                    }
                  var _nowTime = moment()
                  function computedTime(_inspectionMinTime,_inspection_type,_injured,years){
              var setReturnObj = function(timeType,timeStatus){
                var _diffTime = timeType.diff(_nowTime,'months')
              var _timeUnit = '个月'
                if(_diffTime < 1){
                  _diffTime = timeType.diff(_nowTime,'days')
                                // alert(timeType)
                  var _timeUnit = '天'
                }
                return {
                    inspection_min_time:_inspectionMinTime.format("YYYY-MM-DD"),
                    inspection_max_time:_inspectionMaxTime.format("YYYY-MM-DD"),
                    diff_time:_diffTime,
                    time_unit:_timeUnit,
                    time_status:timeStatus,
                    inspection_type:_inspection_type
                }
              }
                    var minTime = _inspectionMinTime.clone()
                    var _inspectionMaxTime = minTime.add(2,'months').subtract(1,'seconds')
              var _isBefore = _nowTime.isBefore(_inspectionMinTime)
              var _isBetween = _nowTime.isBetween(_inspectionMinTime,_inspectionMaxTime)

                        if(!_inspection_type){
                            var _after = _inspectionMaxTime.isAfter('2014-09-01')
                            if (_after && _injured == 'N' && years < 6) {
                                var _inspection_type = '免检验车'
                            } else {
                                var _inspection_type = '上线验车'
                            }
                        }
              if(_isBefore){
                return setReturnObj(_inspectionMinTime,'start')
              }
              if(_isBetween){
                return setReturnObj(_inspectionMaxTime,'end')
              }
                  }
                  function _inspectionRule(diffTime,regTime,inspection_type,_injured){
              regTime = regTime.subtract(1,'month').startOf('months')
                  if(diffTime < 6){
                    for(var i=2;i<=6;i=i+2){

                                // 复制 _regTime
                        var _regTime = regTime.clone()
                                var _inspectionMinTime = _regTime.add(i,'years')

                                // 复制 _inspectionMinTime
                                var _cloneMin = _inspectionMinTime.clone()
                                var _lastInspectionMinTime = _cloneMin.subtract(2,'years')

                                // 复制 _lastInspectionMinTime
                                var _cloneLast = _lastInspectionMinTime.clone()
                                var _lastInspectionMaxTime = _cloneLast.add(2,'months').subtract(1,'seconds')


                      var _timeObj = computedTime(_inspectionMinTime,inspection_type,_injured,i)
                      if(_timeObj){
                                    _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                                    _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                        return _timeObj
                      }
                    }
                  }
                  else if(diffTime >= 6 && diffTime<=15){
                            if(diffTime <= 7){
                                // 复制 _regTime
                                var _lastRegTime = regTime.clone()
                                var _lastInspectionMinTime = _lastRegTime.add(5,'years')

                                // 复制 _inspectionMinTime
                                var _cloneLast = _lastInspectionMinTime.clone()
                                var _lastInspectionMaxTime = _cloneLast.add(2,'months').subtract(1,'seconds')
                            }
                      var _inspection_type = '上线验车'
                    for(var i=0;i<=9;i++){
                        var _regTime = regTime.clone()
                      var _inspectionMinTime = _regTime.add(6+i,'years')

                                if(diffTime > 7){
                                    // 复制 _inspectionMinTime
                                    var _cloneMin = _inspectionMinTime.clone()
                                    var _lastInspectionMinTime = _cloneMin.subtract(1,'years')

                                    // 复制 _inspectionMinTime
                                    var _cloneLast = _lastInspectionMinTime.clone()
                                    var _lastInspectionMaxTime = _cloneLast.add(2,'months').subtract(1,'seconds')
                                }

                      var _timeObj = computedTime(_inspectionMinTime,_inspection_type)
                      if(_timeObj){
                                    _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                                    _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                        return _timeObj
                      }
                    }
                  }
                  else{
                            if(diffTime <= 16){
                                // 复制 _regTime
                                var _lastRegTime = regTime.clone()
                                var _lastInspectionMinTime = _lastRegTime.add(14,'years')

                                // 复制 _inspectionMinTime
                                var _cloneLast = _lastInspectionMinTime.clone()
                                var _lastInspectionMaxTime = _cloneLast.add(2,'months').subtract(1,'seconds')
                            }
                      var _inspection_type = '上线验车'
                    for(var i=0;;i++){
                        var _regTime = regTime.clone()
                      var _inspectionMinTime = _regTime.add(6*(30+i),'months')

                                if(diffTime > 16){
                                    // 复制 _inspectionMinTime
                                    var _cloneMin = _inspectionMinTime.clone()
                                    var _lastInspectionMinTime = _cloneMin.subtract(6,'months')

                                    // 复制 _inspectionMinTime
                                    var _cloneLast = _lastInspectionMinTime.clone()
                                    var _lastInspectionMaxTime = _cloneLast.add(2,'months').subtract(1,'seconds')
                                }

                    var _timeObj = computedTime(_inspectionMinTime,_inspection_type)
                    if(_timeObj){
                                    _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                                    _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                      return _timeObj
                    }
                    }
                  }
                  }
                    _.each(resp,function(value,key){
                      var _date = value.regDate
                  if(!_date){
                    return
                  }
                      var _injured = value.accident
                  var _reg = moment(_date)
                  var _after = _reg.isAfter('2014-09-01')
                  var _diff = _nowTime.diff(_date,'years')
                  console.log('_date:'+_date+'   _injured:'+_injured+'   _reg:'+_reg+'   _after:'+_after+'   _diff:'+_diff)

                  var _timeObject = _inspectionRule(_diff,_reg,value.inspection_type,_injured)
                  // console.log(_timeObject)
                  if(_timeObject) {
                            value.inspection_min_time = _timeObject.inspection_min_time
                            value.inspection_max_time = _timeObject.inspection_max_time
                            value.last_inspection_min_time = _timeObject.last_inspection_min_time
                            value.last_inspection_max_time = _timeObject.last_inspection_max_time
                      value.diff_time = _timeObject.diff_time
                value.time_unit = _timeObject.time_unit
                value.time_status = _timeObject.time_status
                      value.inspection_type = _timeObject.inspection_type
                    }
                    })
                transition.next({
                car_info: resp
              })

                },
                error:function(){
                    Daze.showMsg('请求失败！')
                }
            })
        }
    },
    filters:{
        time2text:function(value){
            if(value == 'start'){
                return '距离下次年检开始还有'
            }
            else{
                return '距离本次年检结束还剩'
            }
        },
        time2status:function(value){
            if(value == 'start'){
                return '年检未开始'
            }
            else{
                return '可办理年检'
            }
        }
    },
    methods:{
        modalRule: function() {
            this.showModal=true
            this.maskClose=true
        },
        goInspection:function(){
            Daze.pushWindow({
                appId:'10000003',
                url:'index.html?cityId='+getQueryString().cityId+'&cityName='+getQueryString().cityName+'&serviceId=2&serviceName=机动车年检'
            })
        }
    },
    computed: {

    },
    components:{
        modal:require('../components/Modal.vue')
    }
}

</script>


