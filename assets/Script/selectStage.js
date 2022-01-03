const bg = require('bg')
cc.Class({
  extends: cc.Component,

  properties: {
    // 第一关按钮
    firstStage: cc.Sprite,
    // 第二关按钮
    secondStage: cc.Sprite,
    // 第三关按钮
    backStart: cc.Sprite,
  },

  onLoad() {
    // 绑定按钮的事件监听
    this.firstStage.node.on(cc.Node.EventType.MOUSE_DOWN, this.goFirstStage)
    this.secondStage.node.on(cc.Node.EventType.MOUSE_DOWN, this.goSecondStage)
    this.backStart.node.on(cc.Node.EventType.MOUSE_DOWN, this.goBackStart)
  },

  // 去第一关
  goFirstStage() {
    window.localStorage.setItem('stage','1')
    cc.director.loadScene('firstStage')
  },

  // 去第二关
  goSecondStage() {
    window.localStorage.setItem('stage','2')
    cc.director.loadScene('secondStage')
  },

  // 返回首页
  goBackStart() {
    cc.director.loadScene('start')
  },
})
