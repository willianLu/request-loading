import './loading.scss'

type IconType = 'default' | 'bar' | 'dot'

export interface LoadingOptions {
  zIndex?: number
  delay?: number
  icon?: IconType
  iconTemplate?: string
}

export default class Loading {
  private mask!: HTMLDivElement
  private load!: HTMLDivElement
  private icon: IconType = 'default'
  private zIndex = 3000
  private delay = 500
  private timestemp = 0
  private timeoutId: ReturnType<typeof setTimeout> | null = null
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
    this.zIndex = options.zIndex || this.zIndex
    this.delay = options.delay || 500
    if (options.iconTemplate) {
      this.load.innerHTML = options.iconTemplate
    } else if (options.icon) {
      this.load.innerHTML = this.getIconTemplate(options.icon)
    }
  }
  // 获取当前视图中，最高的z-index，最小为3000
  private getViewTopZIndex() {
    let el = document.elementFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2
    )
    let max = this.zIndex
    while (
      el &&
      el.tagName.toLocaleLowerCase() !== 'body' &&
      el.parentElement
    ) {
      const zIndex = Number(getComputedStyle(el).zIndex)
      if (zIndex && zIndex > max) {
        max = zIndex + 1
      }
      el = el.parentElement
    }
    return max
  }
  show() {
    // 防止连续多次调用show，已最初的调用为准
    if (this.timestemp > 0) return
    this.timestemp = Date.now()
    const zIndex = this.getViewTopZIndex()
    console.log('[ 当前视图最高zIndex ]', zIndex)
    this.mask.style.zIndex = `${zIndex}`
    this.load.style.zIndex = `${zIndex + 1}`
    document.body.appendChild(this.mask)
    this.timeoutId = setTimeout(() => {
      document.body.appendChild(this.load)
      this.timeoutId = null
    }, this.delay)
  }
  hide() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    const currentTimestemp = this.timestemp
    this.timestemp = 0
    if (this.load.parentElement) {
      // 弹窗show -> hide的持续时间
      const duration = Date.now() - currentTimestemp
      const long =
        duration - this.delay < 300 ? 300 - (duration - this.delay) : 0
      setTimeout(
        () => {
          document.body.removeChild(this.load)
          if (this.mask.parentElement) {
            document.body.removeChild(this.mask)
          }
        },
        // 展示不足300ms的，延迟补足到300ms消失
        long
      )
    } else if (this.mask.parentElement) {
      document.body.removeChild(this.mask)
    }
  }
}
