cc.Class({
  extends: cc.Component,

  properties: {
    label: cc.Label,
  },

  onLoad() {
    /**
     *  this.schedule的使用方法说明：
        延迟3秒后，输出abc，此后每隔1秒输出abc，重复5次。 所以最终会输出5+1次abc。　
        this.schedule(()=>{console.log("abc")},1,5,3);
     */

    // 开启计时器
    this.schedule(
      this.changeTime,
      1,
      (parseInt(this.label.string) - 1).toString(),
      0
    )
  },

  // 改变时间的回调
  changeTime() {
    this.label.string = (parseInt(this.label.string) - 1).toString()
  },

  onDestroy() {
    // 关闭定时器
    this.unschedule(this.changeTime)
  },

  update(dt) {
    if(this.node.parent.children[2].die){
      // 如果人物死亡则关闭定时器
      this.unschedule(this.changeTime)
    }
  },
})
