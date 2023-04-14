declare class PageStack {
    private stack;
    private getCurrentPage;
    constructor(props: {
        getCurrentPage: () => string;
    });
    push(): void;
    pop(): void;
    getCurrentStack(): string;
}
export default PageStack;
