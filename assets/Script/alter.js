cc.Class({
  extends: cc.Component,

  properties: {
    // 再玩一次的按钮
    restartBtn: cc.Button,
    // 返回首页的按钮
    backBtn: cc.Button,
  },

  onLoad() {
    // 监听事件
    this.restartBtn.node.on(
      cc.Node.EventType.MOUSE_DOWN,
      this.goRestart().bind(this)
    )
    this.backBtn.node.on(cc.Node.EventType.MOUSE_DOWN, this.goBack)
  },

  // 再玩一次的回调
  goRestart() {
    return function () {
      cc.director.loadScene(this.node.parent.parent.name)
    }
  },

  // 返回首页的按钮
  goBack() {
    cc.director.loadScene('start')
  },
})
