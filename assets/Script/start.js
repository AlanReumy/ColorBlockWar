cc.Class({
  extends: cc.Component,

  properties: {
    startBtn:cc.Sprite,
    selectStageBtn: cc.Sprite,
    exitBtn:cc.Sprite,
    helpBtn:cc.Sprite,
    helpAlter:cc.Node,
    closeAlter:cc.Label
  },

  onLoad() {
    this.helpAlter.active = false
    // 绑定事件
    this.startBtn.node.on(cc.Node.EventType.MOUSE_DOWN,this.startGame)
    this.exitBtn.node.on(cc.Node.EventType.MOUSE_DOWN,this.exitGame)
    this.selectStageBtn.node.on(cc.Node.EventType.MOUSE_DOWN,this.selectStage)
    this.helpBtn.node.on(cc.Node.EventType.MOUSE_DOWN,this.showHelpAlter().bind(this))
    this.closeAlter.node.on(cc.Node.EventType.MOUSE_DOWN,this.closeHelpAlter().bind(this))
  },

  // 开始游戏按钮的回调
  startGame() {
    // lodaScene()函数里面传入的是场景文件的名称
    window.localStorage.setItem('stage','1')
    cc.director.loadScene('firstStage')
  },

  // 选择关卡按钮的回调
  selectStage() {
    cc.director.loadScene('selectStage')
  },

  // 退出按钮的回调
  exitGame(){
    cc.game.end()
  },

  // 显示弹窗的回调
  showHelpAlter(){
    return function() {
      this.helpAlter.active = true
    }
  },

  // 关闭弹窗的回调
  closeHelpAlter(){
    return function(){
      this.helpAlter.active = false
    }
  }

})
