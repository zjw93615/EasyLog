/* 页面堆栈实例 */
var PageStack = /** @class */ (function () {
    function PageStack(props) {
        var getCurrentPage = props.getCurrentPage;
        this.getCurrentPage = getCurrentPage;
        this.stack = [];
    }
    PageStack.prototype.push = function () {
        this.stack.push(this.getCurrentPage());
    };
    PageStack.prototype.pop = function () {
        this.stack.pop();
    };
    PageStack.prototype.getCurrentStack = function () {
        var stack = this.stack;
        return stack[stack.length - 1];
    };
    return PageStack;
}());
export default PageStack;
