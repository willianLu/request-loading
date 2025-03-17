import './loading.scss'

type IconType = 'default' | 'bar' | 'dot'

export interface LoadingOptions {
  zIndex?: number
  delay?: number
  icon?: IconType
  iconTemplate?: string
}

export default class Loading {
  private mask!: Element
  private load!: Element
  private icon: IconType = 'default'
  private zIndex = 9999
  private delay = 500
  private timestemp = 0
  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private isShow = false
  constructor() {
    this.init()
  }
  private init() {
    const mask = document.createElement('div')
    mask.className = 'request-loading-mask'
    mask.style.position = 'fixed'
    mask.style.top = '0'
    mask.style.right = '0'
    mask.style.bottom = '0'
    mask.style.left = '0'
    mask.style.zIndex = `${this.zIndex}`
    this.mask = mask
    const load = document.createElement('div')
    load.className = 'request-loading-wrap'
    load.style.zIndex = `${this.zIndex + 1}`
    load.innerHTML = this.getIconTemplate(this.icon)
    this.load = load
  }
  private getIconTemplate(type?: IconType) {
    switch (type) {
      case 'bar':
        return '<div class="request-loading--bar"></div>'
      case 'dot':
        return '<div class="request-loading--dot"><div></div><div></div><div></div></div>'
      default:
        return '<div class="request-loading--default"></div>'
    }
  }
  setConfig(options: LoadingOptions) {
    this.zIndex = options.zIndex || 9999
    this.delay = options.delay || 500
    if (options.iconTemplate) {
      this.load.innerHTML = options.iconTemplate
    } else if (options.icon) {
      this.load.innerHTML = this.getIconTemplate(options.icon)
    }
  }
  show() {
    // 防止连续多次调用show，已最初的调用为准
    if (this.timestemp > 0) return
    this.timestemp = Date.now()
    document.body.appendChild(this.mask)
    this.timeoutId = setTimeout(() => {
      document.body.appendChild(this.load)
      this.timeoutId = null
      this.isShow = true
    }, this.delay)
  }
  hide() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    if (this.timestemp === 0 || !this.isShow) return
    document.body.removeChild(this.mask)
    // 弹窗show -> hide的持续时间
    const duration = Date.now() - this.timestemp
    this.timestemp = 0
    // 持续时间小于延迟时间，则没有展示弹窗，不做任何处理
    if (duration <= this.delay) return
    setTimeout(
      () => {
        document.body.removeChild(this.load)
        this.isShow = false
      },
      // 展示不足300ms的，延迟补足到300ms消失
      duration - this.delay < 300 ? 300 + this.delay - duration : 0
    )
  }
}
