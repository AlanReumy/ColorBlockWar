cc.Class({
  extends: cc.Component,

  properties: {
    // 弹窗
    alter: cc.Node,
    // 人物精灵图
    pictures: [cc.SpriteFrame],
  },

  onLoad() {
    /**
     * 修改默认精灵图
     * pictures[0]：红色精灵图
     * pictures[1]：蓝色精灵图
     * pictures[2]：绿色精灵图
     */
    this.node.getComponent(cc.Sprite).spriteFrame = this.pictures[0]

    /**
     * sign 默认为1 代表为红色
     * 1：红色
     * 2：蓝色
     * 3：绿色
     */
    this.node.sign = 1

    // 开启物理碰撞
    cc.director.getPhysicsManager().enabled = true
    // 物理碰撞debug
    // cc.director.getPhysicsManager().debugDrawFlags = true

    // 判断人物是否死亡
    this.node.die = false
    // 是否碰撞标志 true为碰撞 false为非碰撞
    this.node.flag = false

    // 判断弹窗是否显示
    this.alter.active = this.node.die
    // 开启物理引擎
    cc.director.getPhysicsManager().enabled = true
    // 设置重力大小
    cc.director.getPhysicsManager().gravity = cc.v2(0, -1500)

    // 全局监听键盘事件
    cc.systemEvent.on('keydown', this.onKeyDown, this)
    cc.systemEvent.on('keyup', this.onKeyUp, this)

    // 是否跳跃
    this.isJump = false
  },

  // 碰撞开始的回调
  onBeginContact(contact, selfCollider, otherCollider) {
    // console.log(contact);
    // console.log(selfCollider)
    // console.log('other', otherCollider)
    // console.log(selfCollider.node.sign, otherCollider.node.sign)

    //判断地板颜色于角色颜色是否相同
    if (
      otherCollider.node.sign !== 4 &&
      selfCollider.node.sign !== otherCollider.node.sign
    ) {
      this.goDie()
    }
    console.log('人物: ', selfCollider.node.sign)
    console.log('地面: ', otherCollider.node.sign)
  },

  // 碰撞中的回调
  onPreSolve(contact, selfCollider, otherCollider) {
    // 如果不处于碰撞
    if (!this.node.flag) {
      // 处于碰撞
      this.node.flag = true
      // 非跳跃状态
      this.isJump = false
    }

    // console.log(otherCollider.node.sign,selfCollider.node.sign,'9999999')
    // 在碰撞中如果颜色不同
    if (
      otherCollider.node.sign !== 4 &&
      selfCollider.node.sign !== otherCollider.node.sign
    ) {
      // 死亡
      this.goDie()
    }
  },

  // 退出碰撞的回调
  onEndContact(other, self) {
    // 如果处于碰撞
    if (this.node.flag) {
      // 转为非碰撞状态
      this.node.flag = false
      // 跳跃状态
      this.isJump = true
    }
  },

  // 销毁的生命周期
  onDestroy() {
    // 取消监听
    cc.systemEvent.off('keydown', this.onKeyDown, this)
  },

  // 键盘按下的回调
  onKeyDown(e) {
    switch (e.keyCode) {
      // 跳跃
      case cc.macro.KEY.space:
        if (!this.isJump && !this.node.die) {
          this.isJump = true
          // this.node.runAction(this.jumpAction())
          this.jumpAction()
        }
        break
      // 改变颜色
      case cc.macro.KEY.j:
        this.node.sign = 1
        break
      case cc.macro.KEY.k:
        this.node.sign = 2
        break
      case cc.macro.KEY.l:
        this.node.sign = 3
        break
    }
  },

  // 键盘按下
  onKeyUp(event) {
    switch (event.keyCode) {
      // a键 向左移动
      case cc.macro.KEY.a:
        this.accLeft = false
        break
      // d键 向右移动
      case cc.macro.KEY.d:
        this.accRight = false
        break
    }
  },

  // 跳跃动画
  jumpAction() {
    let force = new cc.Vec2(0, 500)
    let rigidbody = this.node.getComponent(cc.RigidBody)
    // 线性速度
    rigidbody.linearVelocity = cc.Vec2(0, 700)
    rigidbody.applyForceToCenter(force)
  },

  //按键改变颜色的回调
  changeColor() {
    switch (this.node.sign) {
      case 1:
        this.node.getComponent(cc.Sprite).spriteFrame = this.pictures[0]
        break
      case 2:
        this.node.getComponent(cc.Sprite).spriteFrame = this.pictures[1]
        break
      case 3:
        this.node.getComponent(cc.Sprite).spriteFrame = this.pictures[2]
        break
    }
  },

  // 死亡的回调
  goDie() {
    // 死亡
    this.node.die = true
    // 弹窗出现
    this.alter.active = this.node.die
  },

  update(dt) {
    // 如果落到底部或者移出屏幕左侧
    if (this.node.y <= -360 || this.node.x <= -510 || this.node.x >= 500) {
      this.goDie()
    } else {
      // 改变颜色
      this.changeColor()
    }
  },
})
