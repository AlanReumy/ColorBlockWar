cc.Class({
  extends: cc.Component,

  properties: {
    //记录上一个地面宽度
    tempWidth: 0,
    //记录上一个地面的 x
    priorX: 0,
    //地面移动速度
    speed: 4,
    // 地面移动的变化速度
    moveSpeed: 0.1,
    //地面
    groundNode: cc.Node,
    // 地面精灵图
    groundSprite: [cc.SpriteFrame],
  },

  onLoad() {
    // 判断关卡 不同的关卡地面移动速度不同
    if (window.localStorage.getItem('stage') == '1') {
      this.moveSpeed = 0.05
    } else {
      this.moveSpeed = 0.2
    }

    // 随着时间增加 地面移动速度越来越快
    this.timer = setInterval(() => {
      this.speed += this.moveSpeed
    }, 1000)

    // 初始化地面颜色
    let groundList = this.groundNode.children
    for (let i = 0; i < groundList.length; i++) {
      groundList[i].sign = 4
    }
  },

  onDestroy() {
    // 清除定时器
    clearInterval(this.timer)
  },

  getRandomY() {
    return Math.round(Math.random() * 200 + 100)
  },
  getRandomW() {
    return Math.round(Math.random() * 300 + 100)
  },
  setColor() {
    // 生成1到4的随机数
    let number = 1 + parseInt(Math.random() * (4 + 1 - 1))
    let colorObj = null
    switch (number) {
      case 1:
        colorObj = this.groundSprite[0]
        colorObj.sign = 1
        break
      case 2:
        colorObj = this.groundSprite[1]
        colorObj.sign = 2
        break
      case 3:
        colorObj = this.groundSprite[2]
        colorObj.sign = 3
        break
      case 4:
        colorObj = this.groundSprite[3]
        colorObj.sign = 4
        break
    }
    return colorObj
  },
  groundMove() {
    let groundList = this.groundNode.children
    for (let i = 0; i < groundList.length; i++) {
      let ground = groundList[i]
      const collider = ground.getComponent(cc.PhysicsBoxCollider)
      // todo
      // iTempWidth = ground.width / 2
      iTempWidth = 65
      ground.x += -this.speed
      if (ground.x < -iTempWidth) {
        //随机地面宽度
        ground.width = this.getRandomW()
        collider.size.width = ground.width

        //随机精灵图颜色
        let colorObj = this.setColor()
        // 修改地面精灵图
        let com = ground.getComponent(cc.Sprite)
        com.spriteFrame = colorObj
        ground.sign = colorObj.sign
        colorObj = null

        //下一个地面离上一个地面的距离
        ground.x = this.priorX + this.tempWidth + 100 + ground.width / 2
        //生成地面的Y轴位置
        ground.y = this.getRandomY()
        ground.active = false
        ground.active = true
      }
      this.tempWidth = ground.width / 2
      this.priorX = ground.x
    }
  },
  update(dt) {
    // 人物死亡 地面停止移动
    if (!this.node.parent.children[2].die) {
      this.groundMove()
    }
  },
})
