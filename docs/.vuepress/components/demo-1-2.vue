<template>
  <div>
    <div class="box box1" v-show="show === 'demo1'">
      demo1
    </div>
    <div class="box box2" v-show="show === 'demo2'">
      demo2
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: String
    }
  }
}
</script>


<style lang="stylus" scoped>
.box 
  width 100px
  height 100px
  color #ffffff
  display flex
  justify-content center
  align-items center
  margin 0 auto
  background #409EFF
  &1
    border 10px solid #67C23A
    outline 5px solid #E6A23C
  &2
    margin 50px auto
    box-shadow 0 0 0 10px #67C23A, 0 0 0 20px #F56C6C, 0 0 0 30px #E6A23C
    
</style>

