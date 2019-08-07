<template>
  <div class="content">
    <div class="w-box w-cloud"></div>
  </div>
</template>

<style lang="stylus" scoped>
* {
  padding: 0;
  margin: 0;
}

.content {
  background: #22aee6;
  width: 100%;
  padding: 50px 0;
}

.w-box {
  padding: 20px 0;
  position: relative;
}

.w-box.w-cloud {
  width: 100px;
  margin: 0 auto;
}

.w-box.w-cloud::before {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 20px -20px 0 12px #fff, 60px -10px 0 6px #fff, 35px -10px 0 15px #fff, 25px -25px 0 12px #d2d2d2, 65px -15px 0 6px #d2d2d2, 40px -15px 0 15px #d2d2d2;
}
.w-box.w-cloud::after {
  content: "";
  display: block;
  width: 4px;
  height: 10px;
  background: #fff;
  border-radius: 2px;
  position: absolute;
  top: 30px;
  left: 30px;
  transform: rotate(10deg);
  box-shadow: 10px 10px 0 0 #fff, 20px 0px 0 0 #fff, 30px 10px 0 0 #fff, 0 15px 0 0 #fff, 10px 25px 0 #fff, 20px 15px 0 #fff, 30px 25px 0 #fff, 0 30px 0 0 #fff, 10px 40px 0 #fff, 20px 30px 0 #fff, 30px 40px 0 #fff;
  animation: rain 1s linear infinite;
}

@keyframes rain {
  0% {
    transform: rotate(10deg) translateY(0);
  }
  100% {
    transform: rotate(10deg) translateY(15px);
    box-shadow: 10px 10px 0 0 #fff, 20px 0px 0 0 #fff, 30px 10px 0 0 #fff, 0 15px 0 0 #fff, 10px 25px 0 #fff, 20px 15px 0 #fff, 30px 25px 0 #fff, 0 30px 0 0 rgba(255, 255, 255, 0), 10px 40px 0 rgba(255, 255, 255, 0), 20px 30px 0 rgba(255, 255, 255, 0), 30px 40px 0 rgba(255, 255, 255, 0);
  }
}
</style>
