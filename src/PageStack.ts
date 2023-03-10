/* 页面堆栈实例 */
class PageStack {
    private stack!: string[]
    private getCurrentPage: () => string

    constructor (props: {
        getCurrentPage: () => string
    }) {
        const { getCurrentPage } = props
        this.getCurrentPage = getCurrentPage
        this.stack = []
    }

    push() {
        this.stack.push(this.getCurrentPage())
    }

    pop() {
        this.stack.pop()
    }

    getCurrentStack() {
        const { stack } = this
        return stack[stack.length - 1]
    }
}

export default PageStack