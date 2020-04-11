const Book = (() => {
    class Interactive {
        constructor(dom) {
            this.dom = dom;
        }
    }
    Interactive["plug-ins"] = { };
    class Book {
        constructor(dom) {
            this.dom = dom;
        }
        render() {
            function render(element) {
                let attrArr = element.attributes;
                let attrs = { };
                for (let attr of attrArr) attrs[attr.name] = attr;
                switch (element.tagName.toLowerCase()) {
                    case "import":
                        switch (attrs.type.value) {
                            case "css": {
                                let link = document.createElement("link");
                                link.rel = "stylesheet";
                                link.type = "text/css";
                                link.href = attrs.src.value;
                                document.body.append(link);
                                break;
                            }
                            case "js":
                            case "plug": {
                                let script = document.createElement("script");
                                script.type = "text/javascript";
                                script.src = attrs.src.value;
                                document.body.append(script);
                                break;
                            }
                        }
                        break;
                    default:
                        for (let ele of element.children) render(ele);
                        break;
                }
            }
            for (let element of this.dom.children) render(element);
        }
        interactive(selector) {
            return new Interactive(document.querySelector(selector));
        }
    }
    class DefinePlugIns {
        constructor(name, methods) {
            Interactive["plug-ins"][name] = this;
            this.name = name;
            for (let methodName in methods) this[methodName] = methods[methodName];
            let self = this;
            Interactive.prototype[name] = function (...args) {
                Interactive["plug-ins"][name].init.call(this, this.dom, ...args);
                return new RuntimePlugIns(this.dom, self);
            }
        }
    }
    class RuntimePlugIns {
        constructor(dom, definePlugIns) {
            for (let methodName in definePlugIns) this[methodName] = definePlugIns[methodName];
            this.dom = dom;
        }
    }
    Book.DefinePlugIns = DefinePlugIns;
    Book.RuntimePlugIns = RuntimePlugIns;
    return Book;
})();